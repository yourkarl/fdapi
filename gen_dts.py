# -*- coding: utf-8 -*-
"""从 docs/api/*.md 生成：
  1) static/dts-sdk.d.ts        —— fdapi TypeScript 类型声明（IDE 智能提示）
  2) src/data/api-completions.js —— 调试台 CodeMirror 自动补全数据
用法：python3 gen_dts.py
"""
import re, json, glob
from gen_utils import atomic_write

TYPE_MAP = {
    'string': 'string', 'number': 'number', 'boolean': 'boolean', 'bool': 'boolean',
    'array': 'any[]', 'object': 'Record<string, any>', 'function': '(...args: any[]) => void',
}

def map_type(t):
    t = t.replace('\\|', '|').strip().lower()
    if '/' in t or '|' in t:
        parts = re.split(r'[/|]', t)
        return ' | '.join(map_type(x) for x in parts if x.strip())
    return TYPE_MAP.get(t, 'any')

ACC_RE = re.compile(r'通过\s*`(fdapi|api\.([\w.]+))`\s*访问')
METHOD_RE = re.compile(r'^###\s+`([\w$]+)\(([^)]*)\)`\s*$', re.M)
# 类型单元格里的竖线以 \| 转义出现（如 `object \| array`）
PARAM_ROW_RE = re.compile(r'^\|\s*`(\w+)`\s*\|\s*`([^`]+)`\s*\|', re.M)
FM_RE = re.compile(r'^---\n(.*?)\n---', re.S)

def esc_doc(t):
    return t.replace('*/', '*\\/').strip()

namespaces = {}   # ns(or '' for root) -> {'doc':, 'methods': {name: {...}}}

for f in sorted(glob.glob('docs/api/**/*.md', recursive=True)):
    s = open(f, encoding='utf-8').read()
    fm = FM_RE.match(s)
    cls_doc = ''
    if fm:
        m = re.search(r'description:\s*"(.*?)"', fm.group(1))
        if m: cls_doc = m.group(1)
        m = re.search(r'^title:\s*(.+)$', fm.group(1), re.M)
        cls = m.group(1).strip() if m else ''
    acc = ACC_RE.search(s)
    if not acc:
        continue
    ns = '' if acc.group(1) == 'fdapi' else acc.group(2)
    entry = namespaces.setdefault(ns, {'doc': cls_doc or cls, 'methods': {}})

    # 按方法切分章节
    matches = list(METHOD_RE.finditer(s))
    for i, m in enumerate(matches):
        name, sig = m.group(1), m.group(2)
        seg = s[m.end(): matches[i+1].start() if i+1 < len(matches) else len(s)]
        # 描述：方法标题后的第一段普通文本
        desc = ''
        for line in seg.split('\n'):
            t = line.strip()
            if not t or t.startswith(('|', '>', '#', '```', '---')):
                if desc: break
                continue
            desc += ('' if not desc else ' ') + t
            if len(desc) > 160: break
        # 参数类型表（只取与签名参数同名的行）
        ptypes = dict(PARAM_ROW_RE.findall(seg))
        args = [a.strip() for a in sig.split(',') if a.strip()]
        params = []
        for a in args:
            ts = map_type(ptypes.get(a, ''))
            params.append((a, ts))
        entry['methods'].setdefault(name, {'sig': sig, 'desc': desc[:200], 'params': params})

# ---------- 生成 d.ts ----------
out = []
out.append('// DTS Cloud SDK v7.1 —— fdapi TypeScript 类型声明（自动生成：python3 gen_dts.py）')
out.append('// 用法：将本文件放入工程并在 tsconfig.json 的 include 中包含，或写 /// <reference path="./dts-sdk.d.ts" />')
out.append('')
out.append('declare namespace fdapi {')

def emit_fn(name, info, indent):
    pad = '  ' * indent
    lines = []
    doc = info['desc']
    if doc:
        lines.append(pad + '/** ' + esc_doc(doc) + ' */')
    ps = ', '.join('%s?: %s' % (n, t) for n, t in info['params'])
    lines.append(pad + 'function %s(%s): Promise<any>;' % (name, ps))
    return lines

# 根方法（fdapi.xxx）
for name, info in sorted(namespaces.get('', {'methods': {}})['methods'].items()):
    out += emit_fn(name, info, 1)

# 命名空间
for ns in sorted(k for k in namespaces if k):
    e = namespaces[ns]
    out.append('')
    if e['doc']:
        out.append('  /** ' + esc_doc(e['doc'])[:200] + ' */')
    out.append('  namespace %s {' % ns)
    for name, info in sorted(e['methods'].items()):
        out += emit_fn(name, info, 2)
    out.append('  }')

out.append('}')
out.append('')
out.append('/** 在线调试台/二开页面中与 fdapi 等价的全局对象 */')
out.append('declare const api: typeof fdapi;')
out.append('declare const fdplayer: any;')
out.append('declare const HostConfig: { API: string; Player: string; PlayerMapping?: string; Path: string; [k: string]: any };')
out.append('declare function log(msg: any, noLineBreak?: boolean, color?: string): void;')
out.append('declare function sleep(ms: number): Promise<void>;')
out.append('')
atomic_write('static/dts-sdk.d.ts', '\n'.join(out))

# ---------- 生成补全数据 ----------
comp = {'root': [], 'ns': {}}
for name, info in sorted(namespaces.get('', {'methods': {}})['methods'].items()):
    comp['root'].append({'label': name, 'detail': '(' + info['sig'] + ')', 'info': info['desc']})
for ns in sorted(k for k in namespaces if k):
    comp['ns'][ns] = [{'label': n, 'detail': '(' + i['sig'] + ')', 'info': i['desc']}
                      for n, i in sorted(namespaces[ns]['methods'].items())]
js = ('// 自动生成：调试台 fdapi 自动补全数据（python3 gen_dts.py）\n'
      '/* eslint-disable */\n'
      'export const API_COMPLETIONS = ' + json.dumps(comp, ensure_ascii=False) + ';\n')
atomic_write('src/data/api-completions.js', js)

n_ns = len([k for k in namespaces if k])
n_m = sum(len(e['methods']) for e in namespaces.values())
print('namespaces=%d root_methods=%d total_methods=%d' % (n_ns, len(namespaces.get('', {'methods': {}})['methods']), n_m))
