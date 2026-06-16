# encoding: utf-8
"""
解析 docs/api/**/*.md 的参数表，生成 src/data/param-meta.js。
供在线调试台的 lil-gui 参数面板按字段类型/默认值/取值范围/枚举渲染控件。

重新生成：python gen_param_meta.py
"""
import os, re, json, glob
from gen_utils import atomic_write

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, 'docs', 'api')
OUT = os.path.join(ROOT, 'src', 'data', 'param-meta.js')

# 类型 -> 控件种类（component 端最终仍会结合实参值做二次推断）
def control_of(typ, desc):
    t = (typ or '').lower()
    if 'bool' in t:
        return 'bool'
    if 'color' in t:
        return 'color'
    if 'number' in t or 'int' in t or 'float' in t:
        return 'number'
    if 'array' in t:
        return 'array'
    if 'object' in t:
        return 'object'
    if 'function' in t:
        return 'func'
    return 'string'

NUM = r'-?\d+(?:\.\d+)?'

def parse_default(desc):
    m = re.search(r'默认(?:值)?[白黑红绿蓝色]*\s*[:：]?\s*(\[[^\]]*\]|true|false|[A-Za-z][\w.]*|' + NUM + r')', desc)
    return m.group(1) if m else None

def parse_range(desc):
    m = re.search(r'取值范围\s*[:：]?\s*[\[\(]?\s*(' + NUM + r')\s*[~～,，\-]\s*(' + NUM + r')', desc)
    if m:
        return float(m.group(1)), float(m.group(2))
    return None, None

def parse_enum(desc):
    # 匹配 "0为Projection类型" / "1为WGS84" / "4：智能" 等枚举说明
    pairs = re.findall(r'(-?\d+)\s*[为=:：]\s*([^\s，,。；;\)\]]{1,16})', desc)
    out = []
    seen = set()
    for v, label in pairs:
        if v in seen:
            continue
        seen.add(v)
        out.append({'v': int(v), 'label': label})
    return out if len(out) >= 2 else None

def split_row(line):
    # 处理单元格内转义的竖线 \| ，再按 | 切分
    line = line.strip().strip('|')
    line = line.replace('\\|', '/')
    return [c.strip() for c in line.split('|')]

def clean(cell):
    return cell.replace('`', '').strip()

def parse_field_row(cells):
    """cells: [name, type, (必填), (默认值), desc] —— 列数不定，取首列名、第2列类型、末列说明"""
    if len(cells) < 3:
        return None
    name = clean(cells[0])
    if not re.match(r'^[A-Za-z_$][\w$]*$', name):
        return None
    typ = clean(cells[1])
    desc = cells[-1]
    ctrl = control_of(typ, desc)
    info = {'t': ctrl}
    dv = parse_default(desc)
    if dv is not None:
        info['d'] = dv
    lo, hi = parse_range(desc)
    if lo is not None:
        info['min'] = lo
        info['max'] = hi
    en = parse_enum(desc)
    if en:
        info['enum'] = en
        info['t'] = 'enum'
    d = re.sub(r'\[([^\]]*)\]\([^\)]*\)', r'\1', desc)
    d = re.sub(r'!\[[^\]]*\]\([^\)]*\)', '', d)
    d = re.sub(r'\s+', ' ', d).strip()
    if d:
        info['desc'] = d[:80]
    return name, info

def parse_doc(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    m = re.search(r'`api\.([A-Za-z0-9]+)`', text)
    ns = m.group(1) if m else os.path.splitext(os.path.basename(path))[0]
    ns = ns[0].lower() + ns[1:]  # 调试台命名空间首字母小写

    fields = {}
    methods = {}
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        hm = re.match(r'^###\s+`([A-Za-z_$][\w$]*)\s*\(([^)]*)\)`', line)
        if hm:
            methods[hm.group(1)] = {'params': [p.strip() for p in hm.group(2).split(',') if p.strip()]}
            i += 1
            continue
        if (line.strip().startswith('|') and ('参数' in line or '属性' in line)
                and i + 1 < len(lines) and re.match(r'^\s*\|[\s:\-|]+\|', lines[i + 1])):
            i += 2
            while i < len(lines) and lines[i].strip().startswith('|'):
                row = parse_field_row(split_row(lines[i]))
                if row:
                    name, info = row
                    if name not in fields or len(json.dumps(info)) > len(json.dumps(fields[name])):
                        fields[name] = info
                i += 1
            continue
        i += 1
    return ns, fields, methods

def main():
    by_ns = {}
    global_fields = {}
    for path in glob.glob(os.path.join(DOCS, '**', '*.md'), recursive=True):
        ns, fields, methods = parse_doc(path)
        if ns not in by_ns:
            by_ns[ns] = {'fields': {}, 'methods': {}}
        by_ns[ns]['fields'].update(fields)
        by_ns[ns]['methods'].update(methods)
        for k, v in fields.items():
            if k not in global_fields or len(json.dumps(v)) > len(json.dumps(global_fields[k])):
                global_fields[k] = v

    data = {'byNs': by_ns, 'fields': global_fields}
    js = ('// 自动生成：python gen_param_meta.py —— 解析 docs/api 参数表\n'
          '/* eslint-disable */\n'
          'export const PARAM_META = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    atomic_write(OUT, js)
    nf = sum(len(v['fields']) for v in by_ns.values())
    print('namespaces:', len(by_ns), ' fields(byNs):', nf, ' global fields:', len(global_fields))
    print('output:', OUT, round(len(js) / 1024, 1), 'KB')

if __name__ == '__main__':
    main()
