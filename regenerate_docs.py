# -*- coding: utf-8 -*-
"""docs/api 高保真生成器（bs4 解析 jsdoc 原始 HTML）
来源：
  参考资料/API原始参考文档/doc/doc/<Class>.html   方法/参数/嵌套属性/返回值/废弃说明/内置示例
  参考资料/API原始参考文档/doc/scripts/            api_examples(.ellipsoid).js + page_content.js 真实调用示例
输出：docs/api/<分类>/<文件>.md（分类来自 nav_data.json）
用法：python3 regenerate_docs.py [--doc-dir <jsdoc目录>]
"""
import os, re, json, argparse, textwrap, shutil
from bs4 import BeautifulSoup, NavigableString
from gen_utils import atomic_write

HERE = os.path.dirname(os.path.abspath(__file__))
_ap = argparse.ArgumentParser()
_ap.add_argument('--doc-dir', default=os.environ.get('DTS_DOC_DIR',
                 os.path.join(HERE, '参考资料', 'API原始参考文档', 'doc', 'doc')))
ARGS, _ = _ap.parse_known_args()
DOC_DIR = ARGS.doc_dir
SCRIPTS = os.path.join(HERE, '参考资料', 'API原始参考文档', 'doc', 'scripts')
DOCS_OUT = os.path.join(HERE, 'docs', 'api')
IMG_SRC = os.path.join(os.path.dirname(DOC_DIR), 'images')   # doc/images
IMG_OUT = os.path.join(HERE, 'static', 'img', 'refdoc')

CLASS_FILE_MAP = {
    'Camera':'camera','CameraTour':'camera-tour','CameraTourData':'camera-tour-data',
    'CameraTourKeyFrame':'camera-tour-key-frame',
    'DigitalTwinAPI':'digital-twin-api','DigitalTwinPlayer':'digital-twin-player',
    'BaseObject':'base-object','Coord':'coord',
    'TileLayer':'tile-layer','Cesium3DTileset':'cesium3dtileset','GeoJSONLayer':'geo-json-layer',
    'ShapeFileLayer':'shape-file-layer','ImageryLayer':'imagery-layer','ImageryLayer2':'imagery-layer-2',
    'MarkerLayer':'marker-layer','GlobeTerrain':'globe-terrain','DaHuaVideoFusion':'da-hua-video-fusion',
    'InfoTree':'info-tree','Settings':'settings','SettingsPanel':'settings-panel',
    'Weather':'weather','Misc':'misc','GaussianSplatting':'gaussian-splatting',
    'Plot':'plot','FdExternal':'fd-external','ExcavationAnalysis':'excavation-analysis',
    'EditHelper':'edit-helper','QueryOption':'query-option','Tools':'tools',
    'FloodFill':'flood-fill','DynamicWater':'dynamic-water','WaterMesh':'water-mesh',
    'WaterFlowField':'water-flow-field','River':'river','Fluid':'fluid',
    'HydroDynamic1D':'hydrodynamic1d','HydroDynamic2D':'hydrodynamic2d',
    'HydrodynamicModel':'hydrodynamic-model','HydrodynamicModel2':'hydrodynamic-model-2',
    'TrafficSimulation':'traffic-simulation','BattlefieldSimulation':'battlefield-simulation',
    'Vehicle':'vehicle','Vehicle2':'vehicle-2','Drone':'drone','Train':'train',
    'Satellite':'satellite','FiniteElement':'finite-element','FiniteElement2':'finite-element-2',
    'BoxTrigger':'box-trigger','SmoothedParticleHydrodynamics':'smoothed-particle-hydrodynamics',
    'Tag':'tag','CustomTag':'custom-tag','Polygon':'polygon','Polygon3D':'polygon3d',
    'Polyline':'polyline','HeatMap':'heatmap','HeatMap3D':'heatmap3d','ODLine':'odline',
    'HighlightArea':'highlight-area','Decal':'decal','Beam':'beam','SignalWave':'signal-wave',
    'RadiationPoint':'radiation-point','VectorField':'vector-field','TopologyLine':'topology-line',
    'SplineMesh':'spline-mesh','Light':'light','Panorama':'panorama',
    'VideoProjection':'video-projection','CustomMesh':'custom-mesh','CustomObject':'custom-object',
    'OceanHeatMap':'ocean-heatmap','GuideLine':'guide-line','Marker':'marker','Marker3D':'marker3d',
}

TUTORIAL_MAP = {
    'API_AsyncCall':'async-call','API_AuthSDK':'auth','API_Camera':'camera','API_Color':'color',
    'API_Coordinates':'coordinates','API_Event':'event','API_FrameTick':'frame-tick',
    'API_Introduction':'introduction','API_MultiVideoInPage':'multi-video','API_ResourceDesc':'resources',
    'API_Revision':'revision-history','Cloud':'cloud-deploy','Explorer':'explorer',
    'Explorer_Guidline':'explorer-guideline','HelloWorld':'hello-world',
}

# ---------------- 工具 ----------------
def esc(t):
    """MDX 安全转义（纯文本）"""
    t = t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    t = t.replace('{', '&#123;').replace('}', '&#125;')
    return t

def cell(t):
    """表格单元格：转义 + 去换行/竖线"""
    return esc(re.sub(r'\s+', ' ', t).strip()).replace('|', '\\|')

CLASS_CAT = {}   # className -> category id（main 中填充）

def conv_href(href):
    if not href:
        return None
    href = href.strip()
    if href.startswith(('http://', 'https://')):
        return href
    m = re.match(r'tutorial-([\w]+)\.html', href)
    if m and m.group(1) in TUTORIAL_MAP:
        return '/docs/tutorials/' + TUTORIAL_MAP[m.group(1)]
    m = re.match(r'([A-Za-z][\w]*)\.html(#[\w$]+)?', href)
    if m and m.group(1) in CLASS_FILE_MAP and m.group(1) in CLASS_CAT:
        return '/docs/api/%s/%s' % (CLASS_CAT[m.group(1)], CLASS_FILE_MAP[m.group(1)])
    return None

def conv_img(src):
    if not src:
        return None
    src = src.strip()
    if src.startswith(('http://', 'https://')):
        return src
    rel = re.sub(r'^(\.\./)*images/', '', src)
    # 原始文档存在引用了不存在图片的情况：跳过死图，避免构建失败
    if not os.path.isfile(os.path.join(IMG_SRC, rel)):
        return None
    return '/img/refdoc/' + rel

def inline_md(node):
    """行内节点 → markdown 文本（处理 a/img/code/b/strong）"""
    out = []
    for c in node.children if hasattr(node, 'children') else []:
        if isinstance(c, NavigableString):
            out.append(esc(str(c)))
        elif c.name == 'a':
            url = conv_href(c.get('href'))
            txt = inline_md(c) or esc(c.get_text())
            out.append('[%s](%s)' % (txt, url) if url else txt)
        elif c.name == 'img':
            url = conv_img(c.get('src'))
            if url:
                out.append('\n\n![%s](%s)\n\n' % (esc(c.get('alt') or ''), url))
        elif c.name == 'code':
            out.append('`%s`' % c.get_text().strip())
        elif c.name in ('b', 'strong'):
            t = inline_md(c).strip()
            if t:
                out.append('**%s**' % t)
        elif c.name == 'br':
            out.append('\n')
        else:
            out.append(inline_md(c))
    return ''.join(out)

def block_md(node):
    """块级容器（description 等）→ markdown 段落（p/ul/pre/img/table 原样降级）"""
    parts = []
    for c in node.children:
        if isinstance(c, NavigableString):
            t = esc(str(c).strip())
            if t:
                parts.append(t)
        elif c.name == 'p':
            t = inline_md(c).strip()
            if t:
                parts.append(t)
        elif c.name in ('ul', 'ol'):
            lis = []
            for li in c.find_all('li', recursive=False):
                lis.append('- ' + re.sub(r'\s+', ' ', inline_md(li)).strip())
            parts.append('\n'.join(lis))
        elif c.name == 'pre':
            parts.append('```js\n' + c.get_text().rstrip() + '\n```')
        elif c.name == 'img':
            url = conv_img(c.get('src'))
            if url:
                parts.append('![%s](%s)' % (esc(c.get('alt') or ''), url))
        else:
            t = inline_md(c).strip()
            if t:
                parts.append(t)
    return '\n\n'.join(p for p in parts if p)

# ---------------- 属性列表（li 递归） ----------------
TYPE_WORDS = r'string|number|boolean|bool|array|object|function|int|float|color|Color'

def extract_margin_props(container):
    """提取 <p style="margin:...">（jsdoc 缩进段落式子属性）并从 DOM 移除。
    形态：<p style="margin..."><b>name</b> (type) 说明</p> 或纯文本 name (type) 说明
    倒序处理，保证父段落的描述不混入子段落文本。"""
    plist = container.find_all('p', style=re.compile(r'margin'))
    results = []
    for idx, p in reversed(list(enumerate(plist))):
        gt = p.get_text(' ', strip=True)
        b = p.find(['b', 'strong'])
        if b:
            name = b.get_text(strip=True)
        else:
            mt = re.match(r'\s*([A-Za-z_$][\w$]*)\s*\(\s*(?:%s)' % TYPE_WORDS, gt)
            name = mt.group(1) if mt else ''
        if not name:
            p.extract()
            continue
        m = re.search(re.escape(name) + r'\s*\(([^)]{1,40})\)', gt)
        ptype = m.group(1).strip() if m else ''
        desc = re.sub(r'\s+', ' ', inline_md(p)).strip()
        desc = re.sub(r'^\**' + re.escape(name) + r'\**\s*', '', desc)
        if ptype:
            desc = re.sub(r'^\(\s*' + re.escape(esc(ptype)) + r'\s*\)\s*', '', desc)
        results.append((idx, (name, ptype, desc, [])))
        p.extract()
    results.sort(key=lambda x: x[0])
    return [r[1] for r in results]

def parse_li(li):
    """li → (name, type, desc_md, children)
    支持三种形态：
      A. <strong>name</strong> (type) 说明 [+ 子 ul / margin 段落]
      B. <p><font>name</font></p><ul><li>参数类型：..</li><li>参数说明：..[嵌套子属性ul]</li></ul>
      C. 缩进段落式（margin <p>）"""
    name, ptype = '', ''
    strong = li.find(['strong', 'b'])
    if strong:
        name = strong.get_text(strip=True)
    if not name:
        f = li.find('font')
        if f:
            t = f.get_text(strip=True)
            if re.match(r'^[A-Za-z_$][\w$]*$', t):
                name = t

    # —— 形态 B：参数类型/参数说明 元数据列表（DigitalTwinPlayer options 等）——
    sub0 = li.find('ul')
    if name and sub0:
        metas = sub0.find_all('li', recursive=False)
        if any(m.get_text(' ', strip=True).startswith('参数类型') for m in metas):
            ptype, descs, children = '', [], []
            for mli in metas:
                # 参数说明里递归嵌套的子属性列表（li 内带 font 名称）
                inner = mli.find('ul')
                if inner is not None and inner.find('font') is not None:
                    for sli in inner.find_all('li', recursive=False):
                        children.append(parse_li(sli))
                    inner.extract()
                t = re.sub(r'\s+', ' ', inline_md(mli)).strip()
                if t.startswith('参数类型：'):
                    raw = t[5:].strip()
                    mm = re.match(r'([A-Za-z |/\[\]]+?)\s*[，,]\s*(.+)$', raw)
                    if mm:
                        ptype = mm.group(1).strip()
                        descs.insert(0, mm.group(2).strip())
                    else:
                        ptype = raw
                elif t.startswith('参数说明：'):
                    descs.append(t[5:].strip())
                elif t:
                    descs.append(t)
            return (name, ptype, '；'.join(d for d in descs if d), children)
    txt = li.get_text(' ', strip=True)
    m = re.search(re.escape(name) + r'\s*\(([^)]{1,40})\)', txt) if name else None
    if m:
        ptype = m.group(1).strip()
    # 子属性：先收缩进段落式（colors/markers 等），再收 ul 嵌套式
    children = extract_margin_props(li)
    sub = li.find('ul')
    if sub:
        for sli in sub.find_all('li', recursive=False):
            children.append(parse_li(sli))
        sub.extract()
    desc = re.sub(r'\s+', ' ', inline_md(li)).strip()
    if name:
        desc = re.sub(r'^\**' + re.escape(name) + r'\**\s*', '', desc)
        if ptype:
            desc = re.sub(r'^\(\s*' + re.escape(esc(ptype)) + r'\s*\)\s*', '', desc)
    # 类型写在描述前缀里的情况：「参数类型：function，xxx」
    if not ptype:
        mm = re.match(r'参数类型：\s*([A-Za-z |/\[\]]+?)\s*(?:[，,；;]\s*|$)(.*)$', desc)
        if mm:
            ptype = mm.group(1).strip()
            desc = mm.group(2).strip()
    return (name, ptype, desc, children)

def props_rows(props, prefix=''):
    rows = []
    for name, ptype, desc, children in props:
        if not name:
            continue
        full = prefix + name
        ptype_md = re.sub(r'\s+', ' ', ptype or '-').strip().replace('|', '\\|')
        row = '| `%s` | `%s` | %s |' % (full, ptype_md, desc.replace('|', '\\|') or '—')
        if row not in rows:   # 源文档偶有完全相同的重复行，去重
            rows.append(row)
        rows += [r for r in props_rows(children, full + '.') if r not in rows]
    return rows

# ---------------- 真实示例（api_examples） ----------------
FUNC_LINE = re.compile(r'^(async\s+)?function\s+([\w$]+)\s*\(', re.M)

def parse_funcs(path):
    s = open(path, encoding='utf-8').read()
    out, ms = {}, list(FUNC_LINE.finditer(s))
    for i, m in enumerate(ms):
        b = s[m.start(): ms[i+1].start() if i+1 < len(ms) else len(s)]
        n1, n2 = b.find('{'), b.rfind('}')
        if n1 == -1 or n2 <= n1:
            continue
        body = textwrap.dedent(b[n1+1:n2].strip('\n')).strip()
        if body:
            out[m.group(2)] = body
    return out

def load_examples():
    funcs = parse_funcs(os.path.join(SCRIPTS, 'api_examples.js'))
    funcs.update(parse_funcs(os.path.join(SCRIPTS, 'api_examples_ellipsoid.js')))
    pc = open(os.path.join(SCRIPTS, 'page_content.js'), encoding='utf-8').read()
    i_pcs, i_gcs = pc.index('<div id="pcs">'), pc.index('<div id="gcs">')
    LINK_RE = re.compile(r'<a\s+id="(test_[\w$]+)"[^>]*>(.*?)</a>', re.S)
    TAG_RE = re.compile(r'<[^>]+>')
    out = {}
    # 投影区优先；球面区补充投影没有的类（Satellite/GlobeTerrain/ImageryLayer2 等）
    for html, cre in ((pc[i_pcs:i_gcs], re.compile(r'<div id="a_([^"]+)"')),
                      (pc[i_gcs:], re.compile(r'<div id="ellipsoid_a_([^"]+)"'))):
        ms = list(cre.finditer(html))
        for i, m in enumerate(ms):
            cls = m.group(1)
            if cls in out:
                continue
            seg = html[m.start(): ms[i+1].start() if i+1 < len(ms) else len(html)]
            lst = []
            for lm in LINK_RE.finditer(seg):
                f = lm.group(1)
                if f not in funcs:
                    continue
                label = re.sub(r'\s+', ' ', TAG_RE.sub('', lm.group(2))).replace('&nbsp;', ' ').strip()
                lst.append((f, label, funcs[f]))
            if lst:
                out[cls] = lst
    return out

EXAMPLES = load_examples()

def match_examples(cls, method_ids):
    """返回 {methodId: [(label, code)...]}, leftover [(label, code)...]"""
    lst = EXAMPLES.get(cls, [])
    if not lst:
        return {}, []
    by_m, leftover = {}, []
    lower_ids = {mid.lower(): mid for mid in method_ids}
    first = lst[0][0]
    first = first[len('test_ellipsoid_'):] if first.startswith('test_ellipsoid_') else first[len('test_'):]
    prefix = first.split('_')[0] if '_' in first else ''
    for fname, label, code in lst:
        rest = fname[len('test_ellipsoid_'):] if fname.startswith('test_ellipsoid_') else fname[len('test_'):]
        rest = rest[len(prefix)+1:] if prefix and rest.startswith(prefix + '_') else rest
        camel = re.sub(r'_([a-zA-Z])', lambda mm: mm.group(1).upper(), rest)
        cands = [rest, re.sub(r'\d+$', '', rest), camel, re.sub(r'\d+$', '', camel),
                 rest.split('_')[0], re.sub(r'\d+$', '', rest.split('_')[0])]
        hit = None
        for c in cands:
            if c.lower() in lower_ids:
                hit = lower_ids[c.lower()]
                break
        if hit:
            by_m.setdefault(hit, []).append((label, code))
        else:
            leftover.append((label, code))
    return by_m, leftover

# ---------------- 参数表 ----------------
def params_table(tbl):
    ths = [th.get_text(strip=True) for th in tbl.find('thead').find_all('th')]
    has_default = any('Default' in t for t in ths)
    head = '| 参数 | 类型 |' + (' 默认值 |' if has_default else '') + ' 说明 |'
    sep = '|------|------|' + ('--------|' if has_default else '') + '------|'
    rows, prop_blocks = [], []
    for tr in tbl.find('tbody').find_all('tr', recursive=False):
        tds = tr.find_all('td', recursive=False)
        if not tds:
            continue
        name = tds[0].get_text(strip=True)
        ptype = ' | '.join(t.get_text(strip=True) for t in tds[1].select('.param-type')) \
                or tds[1].get_text(' ', strip=True)
        dval = ''
        di = 2
        if has_default and len(tds) >= 4:
            dval = tds[2].get_text(strip=True)
            di = 3
        dtd = tds[di] if len(tds) > di else None
        desc, props = '', []
        if dtd:
            # 先固定顶层 ul 列表：parse_li 会摘除嵌套 ul，之后再判断父级会误判为顶层
            top_uls = [ul for ul in dtd.find_all('ul', recursive=True) if ul.find_parent('ul') is None]
            for ul in top_uls:
                for li in ul.find_all('li', recursive=False):
                    props.append(parse_li(li))
            for ul in top_uls:
                ul.extract()
            # 单元格里直接出现的缩进段落式子属性（不在 li 内）
            props += extract_margin_props(dtd)
            desc = re.sub(r'\s+', ' ', inline_md(dtd)).strip()
        # 类型单元格：规范空白后只转义一次竖线（双重转义会把表格行撑断）
        ptype_md = re.sub(r'\s+', ' ', ptype).strip().replace('|', '\\|')
        row = '| `%s` | `%s` |' % (name, ptype_md)
        if has_default:
            row += ' %s |' % (('`%s`' % dval) if dval else '—')
        row += ' %s |' % (desc.replace('|', '\\|') or '—')
        if row not in rows:   # 源文档偶有完全相同的重复参数行，去重
            rows.append(row)
        if props:
            prows = props_rows(props)
            if prows:
                prop_blocks.append('> **`%s` 对象属性：**\n\n| 属性 | 类型 | 说明 |\n|------|------|------|\n'
                                   % name + '\n'.join(prows))
    out = head + '\n' + sep + '\n' + '\n'.join(rows)
    if prop_blocks:
        out += '\n\n' + '\n\n'.join(prop_blocks)
    return out

# ---------------- 方法 ----------------
def method_md(h4, cls, ex_by_method, accessor=None):
    mid = h4.get('id')
    sig = h4.find('span', class_='signature')
    sig_txt = sig.get_text(strip=True) if sig else '()'
    dd = h4.find_parent('dt').find_next_sibling('dd')
    parts = ['### `%s%s`' % (mid, esc(sig_txt))]
    has_example = False
    if dd is None:
        return '\n\n'.join(parts)

    # 废弃标记（jsdoc：dl.details 里 dt.tag-deprecated + 后随 dd）
    dep_dt = dd.find('dt', class_='tag-deprecated')
    if dep_dt:
        dep_dd = dep_dt.find_next_sibling('dd')
        txt = re.sub(r'\s+', ' ', inline_md(dep_dd)).strip() if dep_dd else ''
        parts.append(':::caution 已废弃\n\n%s\n\n:::' % (txt or '此方法已废弃。'))

    desc = dd.find('div', class_='description', recursive=False)
    if desc:
        t = block_md(desc)
        if t:
            parts.append(t)

    tbl = dd.find('table', class_='params', recursive=False)
    if tbl:
        parts.append(params_table(tbl))

    # Returns
    for h5 in dd.find_all('h5', recursive=False):
        if 'Return' in h5.get_text():
            buf = []
            sib = h5.find_next_sibling()
            while sib is not None and sib.name not in ('h4', 'h5'):
                t = re.sub(r'\s+', ' ', inline_md(sib)).strip()
                if t:
                    buf.append(t)
                sib = sib.find_next_sibling()
            if buf:
                parts.append('**返回：** ' + ' '.join(buf))
        elif 'Example' in h5.get_text():
            pre = h5.find_next_sibling('pre')
            if pre:
                _code = re.sub(r'^(请求代码示例|返回[结果数据]+示例[如下：:]*)\s*\n', '', pre.get_text(), flags=re.M).rstrip()
                parts.append('```js\n' + _code + '\n```')
                has_example = True

    # 真实调用示例
    for label, code in ex_by_method.get(mid, []):
        parts.append('> 示例：%s\n\n```js\n%s\n```' % (esc(label), code))
        has_example = True

    # 兜底：按签名合成标准调用示例（仅当有访问器且完全没有示例时）
    if not has_example and accessor:
        base = 'fdapi' if accessor == 'fdapi' else accessor.replace('api.', 'fdapi.', 1)
        args = [a.strip() for a in sig_txt.strip('()').split(',') if a.strip()]
        args = [a for a in args if not re.match(r'^fn\d*$', a)]
        parts.append('> 示例代码如下：\n\n```js\nawait %s.%s(%s);\n```'
                     % (base, mid, ', '.join(args)))
    return '\n\n'.join(parts)

# ---------------- 单个类 ----------------
def gen_class_md(cls, accessor):
    path = os.path.join(DOC_DIR, cls + '.html')
    if not os.path.isfile(path):
        return None
    soup = BeautifulSoup(open(path, encoding='utf-8', errors='ignore').read(), 'html.parser')

    # 类描述
    cdesc = soup.find('div', class_='class-description') or soup.find('div', class_='description')
    cdesc_md = block_md(cdesc) if cdesc else ''
    first_line = re.sub(r'\s+', ' ', (cdesc.get_text(' ', strip=True) if cdesc else ''))[:150]

    # accessor 兜底：类描述里的「一般通过api.xxx调用其方法」
    if not accessor and cdesc is not None:
        m = re.search(r'通过\s*api\.([A-Za-z][\w]*)\s*调用', cdesc.get_text(' ', strip=True))
        if m and m.group(1) != 'xxx':
            accessor = 'api.' + m.group(1)

    method_h4s = []
    for h3 in soup.find_all('h3', class_='subsection-title'):
        if 'Methods' in h3.get_text():
            dl = h3.find_next_sibling('dl')
            if dl:
                method_h4s = dl.find_all('h4', class_='name')
    method_ids = [h.get('id') for h in method_h4s if h.get('id')]
    ex_by_m, leftover = match_examples(cls, method_ids)

    fm_desc = first_line.replace('"', "'")
    out = ['---', 'title: %s' % cls, 'sidebar_label: %s' % cls,
           'description: "%s"' % fm_desc, '---', '', '# %s' % cls, '']
    if cdesc_md:
        out += [cdesc_md, '']
    # 类级废弃标记（位于 container-overview 的 dl.details）
    ov = soup.find('div', class_='container-overview')
    dep_dt = ov.find('dt', class_='tag-deprecated') if ov else None
    if dep_dt:
        dep_dd = dep_dt.find_next_sibling('dd')
        txt = re.sub(r'\s+', ' ', inline_md(dep_dd)).strip() if dep_dd else ''
        out += [':::caution 已废弃\n\n%s\n\n:::' % (txt or '此类已废弃。'), '']
    if accessor:
        out += ['通过 `%s` 访问。' % accessor, '']

    # 构造函数
    overview = soup.find('div', class_='container-overview')
    if overview:
        ctor = overview.find('h4', class_='name')
        if ctor and ctor.get_text(strip=True).startswith('new'):
            out += ['## 构造函数', '']
            sigspan = ctor.find('span', class_='signature')
            out += ['```js', 'new %s%s' % (cls, sigspan.get_text(strip=True) if sigspan else '()'), '```', '']
            ct = overview.find('table', class_='params')
            if ct:
                out += [params_table(ct), '']

    # 成员（jsdoc：Members h3 → dl → dt.name/dd 对；类型在 See 链接里）
    for h3 in soup.find_all('h3', class_='subsection-title'):
        if 'Members' in h3.get_text():
            mdl = h3.find_next_sibling('dl')
            if not mdl:
                continue
            rows = []
            for dt in mdl.find_all('dt', class_='name', recursive=False):
                tname = dt.get('id')
                mdd = dt.find_next_sibling('dd')
                mdesc, ttype = '', ''
                if mdd:
                    dsc = mdd.find('div', class_='description')
                    if dsc:
                        mdesc = re.sub(r'\s+', ' ', dsc.get_text(' ', strip=True)).strip()
                    see = mdd.select_one('.tag-see a[href]')
                    if see:
                        ttype = re.sub(r'\.html.*$', '', see.get('href', ''))
                link = conv_href(ttype + '.html') if ttype else None
                tcell = '[`%s`](%s)' % (ttype, link) if link else ('`%s`' % ttype if ttype else '—')
                mprefix = 'api.' if cls == 'DigitalTwinAPI' else ''
                row = '| `%s%s` | %s | %s |' % (mprefix, tname, tcell, cell(mdesc) or '—')
                if row not in rows:   # 源文档 setter/getter 等完全相同的成员行去重
                    rows.append(row)
            if rows:
                out += ['## 成员（Members）', '',
                        '| 成员 | 类型 | 说明 |', '|------|------|------|']
                out += rows + ['']

    # 方法
    if method_h4s:
        out += ['---', '', '## 方法（Methods）', '']
        for h4 in method_h4s:
            out += [method_md(h4, cls, ex_by_m, accessor), '', '---', '']
        if out[-2] == '---':
            out = out[:-2]

    # 未匹配到具体方法的示例
    if leftover:
        out += ['', '## 更多示例', '']
        for label, code in leftover:
            out += ['> %s' % esc(label), '', '```js', code, '```', '']

    md = '\n'.join(out).rstrip() + '\n'
    # 兜底：jsdoc 注释里直接写的 Markdown 图片语法（被当作纯文本带入）
    def _fix_raw_img(m):
        url = conv_img(m.group(2))
        return '![%s](%s)' % (m.group(1), url) if url else ''
    md = re.sub(r'!\[([^\]]*)\]\(((?:\.\./)*images/[^)]+)\)', _fix_raw_img, md)
    return md

# ---------------- main ----------------
def main():
    global CLASS_CAT
    nav = json.load(open(os.path.join(HERE, 'nav_data.json'), encoding='utf-8'))['CATEGORIES']
    class_cat = {}
    for cat in nav:
        for item in cat['items']:
            hc = item.get('html_class')
            if hc and hc not in class_cat:
                class_cat[hc] = cat['id']
    CLASS_CAT.update(class_cat)

    # accessor 映射：来自 DigitalTwinAPI.html 的 Members
    # 特殊访问器：player 全局实例；CameraTour 描述未命中兜底正则
    acc = {'DigitalTwinAPI': 'fdapi', 'DigitalTwinPlayer': 'fdplayer', 'CameraTour': 'api.cameraTour'}
    soup = BeautifulSoup(open(os.path.join(DOC_DIR, 'DigitalTwinAPI.html'),
                              encoding='utf-8', errors='ignore').read(), 'html.parser')
    for h3 in soup.find_all('h3', class_='subsection-title'):
        if 'Members' in h3.get_text():
            mdl = h3.find_next_sibling('dl')
            if not mdl:
                continue
            for dt in mdl.find_all('dt', class_='name', recursive=False):
                mdd = dt.find_next_sibling('dd')
                see = mdd.select_one('.tag-see a[href]') if mdd else None
                if see:
                    t = re.sub(r'\.html.*$', '', see.get('href', ''))
                    if t and t not in acc:
                        acc[t] = 'api.' + dt.get('id')

    # 图片资源
    if os.path.isdir(IMG_SRC):
        os.makedirs(IMG_OUT, exist_ok=True)
        for root, dirs, files in os.walk(IMG_SRC):
            rel = os.path.relpath(root, IMG_SRC)
            td = os.path.join(IMG_OUT, rel) if rel != '.' else IMG_OUT
            os.makedirs(td, exist_ok=True)
            for f in files:
                if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')):
                    continue
                dst = os.path.join(td, f)
                if not os.path.isfile(dst):
                    shutil.copyfile(os.path.join(root, f), dst)

    ok = miss = 0
    for hc, cat_id in class_cat.items():
        md = gen_class_md(hc, acc.get(hc))
        if md is None:
            print('Missing HTML:', hc)
            miss += 1
            continue
        out_dir = os.path.join(DOCS_OUT, cat_id)
        os.makedirs(out_dir, exist_ok=True)
        fname = CLASS_FILE_MAP.get(hc, hc.lower()) + '.md'
        fname_stem = fname[:-3]
        # Docusaurus 3 bug: filename == parent dir → route 不注册，需加显式 slug
        if fname_stem == cat_id and 'slug:' not in md[:200]:
            md = md.replace('---\n', '---\nslug: /api/%s/%s\n' % (cat_id, fname_stem), 1)
        atomic_write(os.path.join(out_dir, fname), md)
        ok += 1
    print('生成 %d 个，缺失 %d 个' % (ok, miss))

if __name__ == '__main__':
    main()
