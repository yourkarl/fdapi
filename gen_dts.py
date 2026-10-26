# -*- coding: utf-8 -*-
"""从 docs/api/*.md 生成：
  1) static/dts-sdk.d.ts        —— fdapi TypeScript 类型声明（IDE 智能提示）
  2) src/data/api-completions.js —— 调试台 CodeMirror 自动补全数据
用法：python3 gen_dts.py

覆盖三类对象：
  - fdapi 根方法与各命名空间方法（常规 "### name(args)" 标题）
  - 构造函数式类（DigitalTwinPlayer，有「## 构造函数」段 → declare class）
  - 静态类（FdExternal，标题形如 "### .name(args)" → declare namespace）
未覆盖的文档类会在生成文件末尾列出，避免使用者误以为 d.ts 是全量声明。
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
# fdplayer / 静态类：文档通过反引号说明访问方式，但格式与 fdapi 不同
ACCESS_ANY_RE = re.compile(r'通过\s*`([a-zA-Z][\w.]*)`\s*访问')
# 常规方法标题：`name(args)`，可选 {#锚点}
METHOD_RE = re.compile(r'^###\s+`([\w$]+)\(([^)]*)\)`\s*(?:\{#[\w-]+\})?\s*$', re.M)
# 静态类方法标题：`.name(args)`（不带锚点），如 FdExternal 的 ### `.close()`
STATIC_METHOD_RE = re.compile(r'^###\s+`\.([\w$]+)\(([^)]*)\)`\s*(?:\{#[\w-]+\})?\s*$', re.M)
# 类型单元格里的竖线以 \| 转义出现（如 `object \| array`）
PARAM_ROW_RE = re.compile(r'^\|\s*`(\w+)`\s*\|\s*`([^`]+)`\s*\|', re.M)
# 构造函数签名：new Xxx(...) 之后的表格
CTOR_RE = re.compile(r'new\s+([A-Z]\w*)\s*\(([^)]*)\)')
FM_RE = re.compile(r'^---\n(.*?)\n---', re.S)

def esc_doc(t):
    return t.replace('*/', '*\\/').strip()

namespaces = {}   # ns(or '' for root) -> {'doc':, 'methods': {name: {...}}}
classes = {}      # 构造函数式类 -> {'doc':, 'ctor': (args, params), 'methods': {...}}
statics = {}      # 静态类 -> {'doc':, 'methods': {...}}
covered = set()   # 已进入 d.ts 的文档类名


def parse_methods(s, regex):
    """按方法标题切段，解析描述与参数类型。"""
    out = {}
    matches = list(regex.finditer(s))
    for i, m in enumerate(matches):
        name, sig = m.group(1), m.group(2)
        seg = s[m.end(): matches[i+1].start() if i+1 < len(matches) else len(s)]
        desc = ''
        in_admonition = False
        in_code = False
        for line in seg.split('\n'):
            t = line.strip()
            # 跳过代码块整体
            if t.startswith('```'):
                in_code = not in_code
                continue
            if in_code:
                continue
            # 跳过 Docusaurus 指令块（:::caution / :::tip …）整体
            if t.startswith(':::') and not in_admonition:
                in_admonition = True
                continue
            if in_admonition:
                if t.startswith(':::'):
                    in_admonition = False
                continue
            if not t or t.startswith(('|', '>', '#', '---', '**返回', '**参数')):
                if desc: break
                continue
            desc += ('' if not desc else ' ') + t
            if len(desc) > 160: break
        ptypes = dict(PARAM_ROW_RE.findall(seg))
        args = [a.strip() for a in sig.split(',') if a.strip()]
        params = [(a, map_type(ptypes.get(a, ''))) for a in args]
        # 废弃说明：优先取 `:::caution 已废弃` 块内首行正文（最贴近 JSDoc 原意），
        # 否则退回 `> ⚠️ **已废弃**：...` 引用行。
        # 注意：`:::caution` 还常用于非废弃提示，故仅在提示语或正文出现「废弃/弃用/deprecated」时才采信。
        dep = ''
        for am in re.finditer(r'^[ \t]*:::[a-z]+[ \t]*([^\n]*)\n([\s\S]*?)^[ \t]*:::[ \t]*$', seg, re.M):
            body = (am.group(1) + '\n' + am.group(2)).strip()
            if not re.search(r'废弃|弃用|deprecated', body, re.I):
                continue
            bl = [t.strip() for t in am.group(2).split('\n') if t.strip()]
            if bl:
                cand = bl[0]
                cand = re.sub(r'^>\s*', '', cand)
                cand = re.sub(r'^\u26a0\ufe0f\s*', '', cand)
                cand = re.sub(r'^\*\*已废弃\*\*\s*[：:]?\s*', '', cand)
                dep = cand.strip()
            break
        if not dep:
            dm = re.search(r'^[ \t]*>[ \t]*\u26a0\ufe0f[ \t]*\*\*已废弃\*\*[ \t]*[：:]?[ \t]*(.*?)[ \t]*$', seg, re.M)
            if dm:
                dep = dm.group(1).strip()
        out.setdefault(name, {'sig': sig, 'desc': desc[:200], 'params': params, 'dep': dep[:120]})
    return out


for f in sorted(glob.glob('docs/api/**/*.md', recursive=True)):
    s = open(f, encoding='utf-8').read()
    fm = FM_RE.match(s)
    cls_doc = ''
    cls = ''
    if fm:
        m = re.search(r'description:\s*"(.*?)"', fm.group(1))
        if m: cls_doc = m.group(1)
        m = re.search(r'^title:\s*(.+)$', fm.group(1), re.M)
        cls = m.group(1).strip() if m else ''

    # --- 分支 1：静态类（### `.name(args)`） ---
    if STATIC_METHOD_RE.search(s):
        m = ACCESS_ANY_RE.search(s)
        acc_name = m.group(1) if m else cls
        statics[acc_name] = {'doc': cls_doc or cls, 'methods': parse_methods(s, STATIC_METHOD_RE)}
        covered.add(cls or acc_name)
        continue

    # --- 分支 2：常规 fdapi 命名空间 / 根方法 ---
    acc = ACC_RE.search(s)
    if acc:
        ns = '' if acc.group(1) == 'fdapi' else acc.group(2)
        entry = namespaces.setdefault(ns, {'doc': cls_doc or cls, 'methods': {}})
        for name, info in parse_methods(s, METHOD_RE).items():
            entry['methods'].setdefault(name, info)
        covered.add(cls)
        continue

    # --- 分支 3：构造函数式类（有「## 构造函数」段 + new Xxx(...)） ---
    cm = re.search(r'^##\s*构造函数\s*$', s, re.M)
    ctor = None
    cseg = ''
    if cm:
        nxt = re.search(r'^##\s', s[cm.end():], re.M)
        cseg = s[cm.end(): cm.end() + nxt.start()] if nxt else s[cm.end():]
        ctor = CTOR_RE.search(cseg)
    if ctor:
        cname = ctor.group(1)
        cargs = [a.strip() for a in ctor.group(2).split(',') if a.strip()]
        ctypes = dict(PARAM_ROW_RE.findall(cseg))
        classes[cname] = {
            'doc': cls_doc or cls,
            'accessor': (ACCESS_ANY_RE.search(s).group(1) if ACCESS_ANY_RE.search(s) else cname[0].lower() + cname[1:]),
            'ctor': [(a, map_type(ctypes.get(a, 'any'))) for a in cargs],
            'methods': parse_methods(s, METHOD_RE),
        }
        covered.add(cname)

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
    dep = info.get('dep', '')
    if doc or dep:
        parts = []
        if doc: parts.append(esc_doc(doc))
        if dep: parts.append('@deprecated ' + esc_doc(dep))
        lines.append(pad + '/** ' + ' '.join(parts) + ' */')
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

# ---------- 构造函数式类（如 DigitalTwinPlayer） ----------
for cname, e in sorted(classes.items()):
    if e['doc']:
        out.append('/** %s */' % esc_doc(e['doc'])[:300])
    cps = ', '.join('%s?: %s' % (n, t) for n, t in e['ctor'])
    out.append('declare class %s {' % cname)
    out.append('  /** 构造：%s = new %s(%s) */' % (e['accessor'], cname, cps))
    out.append('  constructor(%s);' % cps)
    for name, info in sorted(e['methods'].items()):
        doc = info['desc']
        dep = info.get('dep', '')
        if doc or dep:
            parts = []
            if doc: parts.append(esc_doc(doc))
            if dep: parts.append('@deprecated ' + esc_doc(dep))
            out.append('  /** ' + ' '.join(parts) + ' */')
        ps = ', '.join('%s?: %s' % (n, t) for n, t in info['params'])
        out.append('  %s(%s): Promise<any>;' % (name, ps))
    out.append('}')
    out.append('')

# ---------- 静态类（如 FdExternal） ----------
for sname, e in sorted(statics.items()):
    out.append('declare namespace %s {' % sname)
    if e['doc']:
        out.append('  /** %s */' % esc_doc(e['doc'])[:300])
    for name, info in sorted(e['methods'].items()):
        doc = info['desc']
        dep = info.get('dep', '')
        if doc or dep:
            parts = []
            if doc: parts.append(esc_doc(doc))
            if dep: parts.append('@deprecated ' + esc_doc(dep))
            out.append('  /** ' + ' '.join(parts) + ' */')
        ps = ', '.join('%s?: %s' % (n, t) for n, t in info['params'])
        out.append('  function %s(%s): Promise<any>;' % (name, ps))
    out.append('}')
    out.append('')

out.append('/** 在线调试台/二开页面中与 fdapi 等价的全局对象 */')
out.append('declare const api: typeof fdapi;')
for cname, e in sorted(classes.items()):
    out.append('declare const %s: %s;' % (e['accessor'], cname))
out.append('declare const HostConfig: { API: string; Player: string; PlayerMapping?: string; Path: string; [k: string]: any };')
out.append('declare function log(msg: any, noLineBreak?: boolean, color?: string): void;')
out.append('declare function sleep(ms: number): Promise<void>;')

# ---------- 未覆盖清单（避免使用者误以为 d.ts 是全量声明） ----------
all_doc_cls = []
for f in sorted(glob.glob('docs/api/**/*.md', recursive=True)):
    s = open(f, encoding='utf-8').read()
    fm = FM_RE.match(s)
    if not fm:
        continue
    m = re.search(r'^title:\s*(.+)$', fm.group(1), re.M)
    if m:
        all_doc_cls.append(m.group(1).strip())
uncovered = [c for c in all_doc_cls
             if c not in covered
             and not any(c in e['methods'] or c == k for k, e in namespaces.items())
             and c not in ('Types', 'ErrorCodes')]
if uncovered:
    out.append('')
    out.append('/* 以下文档页未生成本文件的类型声明（多为数据容器 / 构造参数对象 / 枚举页），')
    out.append('   其字段定义见对应文档页： */')
    out.append('// ' + '、'.join(uncovered))
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
n_c = sum(len(e['methods']) for e in classes.values())
n_s = sum(len(e['methods']) for e in statics.values())
print('namespaces=%d root_methods=%d namespaced_methods=%d total=%d'
      % (n_ns, len(namespaces.get('', {'methods': {}})['methods']), n_m, n_m))
print('classes=%d methods=%d  statics=%d methods=%d  uncovered=%d'
      % (len(classes), n_c, len(statics), n_s, len(uncovered)))
