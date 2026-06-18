import React, { useMemo, useState, useCallback } from 'react';
import { PARAM_META } from '../data/param-meta';

// ============================================================
// lil-gui 风格参数面板 —— 浮在视频流右上角
// 解析当前编辑器代码里第一处 fdapi/fdplayer API 调用的实参，
// 结合 docs/api 参数表元数据（param-meta.js）推断控件类型，
// 调节后将新值回写进代码字符串，交由上层更新编辑器并（可选）实时重跑。
// 数据源：① 代码实参的真实值/行内注释 ② 文档参数表的类型/默认值/范围/枚举
// ============================================================

// 常用 Color 常量 -> #rrggbb（SDK Color 取 CSS 命名色）
const COLOR_NAMES = {
  White: '#ffffff', Black: '#000000', Red: '#ff0000', Green: '#008000', Blue: '#0000ff',
  Yellow: '#ffff00', Cyan: '#00ffff', Magenta: '#ff00ff', Gray: '#808080', Grey: '#808080',
  Orange: '#ffa500', Purple: '#800080', Pink: '#ffc0cb', Brown: '#a52a2a', SpringGreen: '#00ff7f',
  Lime: '#00ff00', Navy: '#000080', Teal: '#008080', Gold: '#ffd700', Silver: '#c0c0c0',
  SkyBlue: '#87ceeb', DeepSkyBlue: '#00bfff', DodgerBlue: '#1e90ff', Crimson: '#dc143c',
  Tomato: '#ff6347', Coral: '#ff7f50', Violet: '#ee82ee', Indigo: '#4b0082', Aqua: '#00ffff',
};

// 参数名 -> 简洁中文标签（无行内注释时使用；通用 + 天气/相机等高频项）
const PARAM_CN = {
  id: '编号', groupId: '分组', userData: '自定义数据', name: '名称', text: '文字',
  coordinate: '坐标', coordinateType: '坐标类型', location: '位置', position: '观察点', target: '目标点',
  rotation: '旋转', scale: '缩放', offset: '偏移', anchors: '锚点', order: '层级',
  color: '颜色', fontColor: '字体颜色', backgroundColor: '背景色', fontSize: '字号',
  imagePath: '图片路径', imageSize: '图片尺寸', url: '链接', path: '路径', filePath: '文件路径', fileName: '文件名',
  size: '尺寸', radius: '半径', height: '高度', width: '宽度', length: '长度',
  opacity: '透明度', visible: '是否可见', range: '可视范围', distance: '距离', flyTime: '飞行时间',
  speed: '速度', time: '时间', duration: '时长', count: '数量', index: '索引',
  pitch: '俯仰', yaw: '航向', roll: '翻滚', enable: '启用', mode: '模式',
  strength: '强度', intensity: '强度', density: '密度',
  // 天气 / 雨雪雾云
  cloudThickness: '云层厚度', cloudDensity: '云层密度', raindropSize: '雨滴大小', rainColor: '雨滴颜色',
  alignCamera: '相机对齐', overcastStrength: '阴沉程度', snowSize: '雪花大小', fogDensity: '雾浓度',
};

// 方法名 -> 简洁中文（分组标题）
const METHOD_CN = {
  add: '添加', update: '更新', delete: '删除', clear: '清空', get: '查询',
  focus: '定位', show: '显示', hide: '隐藏', setVisible: '显隐',
  set: '设置相机', lookAt: '相机定位', flyAround: '相机环绕', playAnimation: '播放动画',
  setRainParam: '雨效', setSnowParam: '雪效', setFogParam: '雾效', setCloudParam: '云效',
  setCloudThickness: '云层厚度', setCloudDensity: '云层密度', setDateTime: '日期时间',
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const to2 = (n) => Math.round(n).toString(16).padStart(2, '0');

// [r,g,b](0..1 或 0..255) -> #rrggbb
function arrToHex(arr, scale255) {
  const f = scale255 ? 1 : 255;
  return '#' + to2(clamp((arr[0] || 0) * f, 0, 255)) + to2(clamp((arr[1] || 0) * f, 0, 255)) + to2(clamp((arr[2] || 0) * f, 0, 255));
}
function hexToArr(hex, scale255, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const f = scale255 ? 1 : 1 / 255;
  const round = (x) => scale255 ? Math.round(x) : Math.round(x * 1000) / 1000;
  const out = [round(r * f), round(g * f), round(b * f)];
  if (alpha != null) out.push(alpha);
  return out;
}

// ---------- 代码解析 ----------

// 找首个 fdapi/fdplayer/api 调用，返回 {ns, method, open, close, args}
function findPrimaryCall(code) {
  const re = /(?:fdapi|fdplayer|api)\.([\w$]+)(?:\.([\w$]+))?\s*\(/g;
  let m;
  while ((m = re.exec(code))) {
    const open = re.lastIndex - 1;
    const close = matchParen(code, open);
    if (close < 0) continue;
    const inner = code.slice(open + 1, close).trim();
    if (!inner) continue; // 无参方法跳过
    const ns = m[2] ? m[1] : null;           // fdapi.<ns>.<method>
    const method = m[2] || m[1];             // 或 fdapi.<method>
    return { ns, method, open, close, argsStart: open + 1, argsText: code.slice(open + 1, close) };
  }
  return null;
}

// 找出全部 fdapi/fdplayer/api 调用（跳过嵌套），用于多调用分组展示
function findAllCalls(code) {
  const re = /(?:fdapi|fdplayer|api)\.([\w$]+)(?:\.([\w$]+))?\s*\(/g;
  let m; const calls = [];
  while ((m = re.exec(code))) {
    const open = re.lastIndex - 1;
    const close = matchParen(code, open);
    if (close < 0) continue;
    re.lastIndex = close + 1;            // 跳过本次调用范围，避免重复匹配其参数内的嵌套调用
    const inner = code.slice(open + 1, close).trim();
    if (!inner) continue;
    const ns = m[2] ? m[1] : null;
    const method = m[2] || m[1];
    calls.push({ ns, method, open, close, argsStart: open + 1, argsText: code.slice(open + 1, close) });
  }
  return calls;
}

// 返回与 code[open]=='(' 匹配的 ')' 下标
function matchParen(code, open) {
  let depth = 0, str = null;
  for (let i = open; i < code.length; i++) {
    const c = code[i];
    if (str) { if (c === '\\') { i++; continue; } if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '(') depth++;
    else if (c === ')') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

// 在 text（绝对起点 base）内按顶层逗号切分，返回 [{text, start, end}]（start/end 为绝对偏移，已 trim 前后空白）
function splitTopLevel(text, base) {
  const out = [];
  let depth = 0, str = null, segStart = 0;
  const push = (s, e) => {
    while (s < e && /\s/.test(text[s])) s++;
    let te = e;
    while (te > s && /\s/.test(text[te - 1])) te--;
    if (te > s) out.push({ text: text.slice(s, te), start: base + s, end: base + te });
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (str) { if (c === '\\') { i++; continue; } if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')') depth--;
    else if (c === ',' && depth === 0) { push(segStart, i); segStart = i + 1; }
  }
  push(segStart, text.length);
  return out;
}

// 解析对象字面量 { ... } 的顶层 key: value（含偏移与行内注释）
function parseObject(objText, objBase) {
  // 去掉外层 { }
  const lb = objText.indexOf('{');
  const rb = objText.lastIndexOf('}');
  if (lb < 0 || rb <= lb) return null;
  const body = objText.slice(lb + 1, rb);
  const base = objBase + lb + 1;
  const entries = [];
  let i = 0, n = body.length;
  const skipWs = () => { while (i < n && /\s/.test(body[i])) i++; };
  while (i < n) {
    skipWs();
    if (i >= n) break;
    if (body[i] === ',') { i++; continue; }
    if (body.startsWith('//', i)) { while (i < n && body[i] !== '\n') i++; continue; }
    if (body.startsWith('/*', i)) { i = body.indexOf('*/', i); if (i < 0) break; i += 2; continue; }
    // key
    let key;
    if (body[i] === '"' || body[i] === "'") { const q = body[i++]; let s = ''; while (i < n && body[i] !== q) s += body[i++]; i++; key = s; }
    else { let s = ''; while (i < n && /[\w$]/.test(body[i])) s += body[i++]; key = s; }
    skipWs();
    if (body[i] !== ':') { // 非 key:value（shorthand / spread），跳到下个顶层逗号
      let depth = 0, str = null;
      while (i < n) { const c = body[i]; if (str) { if (c === '\\') { i += 2; continue; } if (c === str) str = null; i++; continue; } if (c === '"' || c === "'" || c === '`') { str = c; i++; continue; } if (c === '{' || c === '[' || c === '(') depth++; else if (c === '}' || c === ']' || c === ')') depth--; else if (c === ',' && depth === 0) break; i++; }
      continue;
    }
    i++; // :
    skipWs();
    const valStart = i;
    let depth = 0, str = null;
    while (i < n) {
      const c = body[i];
      if (str) { if (c === '\\') { i += 2; continue; } if (c === str) str = null; i++; continue; }
      if (c === '"' || c === "'" || c === '`') { str = c; i++; continue; }
      if (c === '{' || c === '[' || c === '(') depth++;
      else if (c === '}' || c === ']' || c === ')') depth--;
      else if (depth === 0 && (c === ',' || (c === '/' && body[i + 1] === '/'))) break;
      i++;
    }
    let valEnd = i;
    while (valEnd > valStart && /\s/.test(body[valEnd - 1])) valEnd--;
    const valueText = body.slice(valStart, valEnd).trim();
    let comment = '';
    if (body.startsWith('//', i)) { const cs = i + 2; while (i < n && body[i] !== '\n') i++; comment = body.slice(cs, i).trim(); }
    if (key) entries.push({ key, valueText, start: base + valStart, end: base + valStart + valueText.length, comment });
  }
  return entries;
}

// 解析单个值文本 -> {kind, value, extra}
function parseValue(vt) {
  if (/^(true|false)$/.test(vt)) return { kind: 'bool', value: vt === 'true' };
  if (/^-?\d+(\.\d+)?$/.test(vt)) return { kind: 'number', value: parseFloat(vt) };
  const sm = vt.match(/^(['"])([\s\S]*)\1$/);
  if (sm) {
    if (/^#[0-9a-fA-F]{6}$/.test(sm[2])) return { kind: 'color', value: sm[2], src: 'hexstr', quote: sm[1] };
    return { kind: 'string', value: sm[2], quote: sm[1] };
  }
  const cn = vt.match(/^Color\.([A-Za-z]+)$/);
  if (cn && COLOR_NAMES[cn[1]]) return { kind: 'color', value: COLOR_NAMES[cn[1]], src: 'name' };
  if (/^\[[\s\S]*\]$/.test(vt)) {
    const nums = vt.slice(1, -1).split(',').map((s) => s.trim());
    if (nums.length && nums.every((s) => /^-?\d+(\.\d+)?$/.test(s))) {
      return { kind: 'array', value: nums.map(parseFloat) };
    }
  }
  return { kind: 'expr', value: vt };
}

// 合并文档元信息 + 实参值 -> 控件描述
function buildControl(entry, ns) {
  const meta = (PARAM_META.byNs[ns] && PARAM_META.byNs[ns].fields[entry.key]) || PARAM_META.fields[entry.key] || {};
  const pv = parseValue(entry.valueText);
  // 标签优先用行内注释（通常简洁），否则用字段名；完整文档说明作为 tooltip
  const ctrl = { key: entry.key, label: entry.comment || PARAM_CN[entry.key] || entry.key, start: entry.start, end: entry.end, raw: entry.valueText, tip: meta.desc || entry.comment };

  // 枚举（文档声明 + 当前值是数值/字符串）
  if (meta.t === 'enum' && meta.enum && (pv.kind === 'number' || pv.kind === 'string')) {
    return { ...ctrl, kind: 'enum', value: pv.value, options: meta.enum };
  }
  if (pv.kind === 'bool') return { ...ctrl, kind: 'bool', value: pv.value };
  if (pv.kind === 'color') return { ...ctrl, kind: 'color', value: pv.value, src: pv.src, quote: pv.quote };
  if (pv.kind === 'number') {
    const hasRange = typeof meta.min === 'number' && typeof meta.max === 'number';
    const inUnit = pv.value >= 0 && pv.value <= 1;
    if (hasRange || inUnit) {
      const min = hasRange ? meta.min : 0;
      const max = hasRange ? meta.max : 1;
      const span = Math.abs(max - min);
      const step = span <= 2 ? 0.01 : span <= 50 ? 0.1 : 1;
      return { ...ctrl, kind: 'slider', value: pv.value, min, max, step };
    }
    return { ...ctrl, kind: 'number', value: pv.value };
  }
  if (pv.kind === 'array') {
    const len = pv.value.length;
    const rgbLen = len === 3 || len === 4;
    const isColorKey = /colou?r/i.test(entry.key);
    // 仅在以下情况视为颜色：文档声明 Color / 键名含 color / 三四元归一化 rgba 且文档未声明为普通数组
    // （文档声明为 array 的坐标、偏移等不被误判为颜色，即便其值恰好落在 [0,1]）
    const unitRgb = rgbLen && meta.t !== 'array' && pv.value.slice(0, 3).every((x) => x >= 0 && x <= 1);
    if (rgbLen && (meta.t === 'color' || isColorKey || unitRgb)) {
      const scale255 = pv.value.slice(0, 3).some((x) => x > 1);
      return { ...ctrl, kind: 'color', value: arrToHex(pv.value, scale255), src: 'array', scale255, alpha: pv.value[3] };
    }
    if (len >= 2 && len <= 4) return { ...ctrl, kind: 'vector', value: pv.value };
    return { ...ctrl, kind: 'expr', value: pv.value };   // 长数组（如 indices）不铺多输入框
  }
  if (pv.kind === 'string') return { ...ctrl, kind: 'string', value: pv.value, quote: pv.quote };
  return { ...ctrl, kind: 'expr', value: pv.value };
}

// 控件新值 -> 代码里的值文本
function serialize(ctrl, value) {
  switch (ctrl.kind) {
    case 'bool': return value ? 'true' : 'false';
    case 'number':
    case 'slider': return String(value);
    case 'enum': return typeof ctrl.value === 'string' ? (ctrl.quote || "'") + value + (ctrl.quote || "'") : String(value);
    case 'string': { const q = ctrl.quote || "'"; return q + value + q; }
    case 'vector': return '[' + value.join(', ') + ']';
    case 'color': {
      if (ctrl.src === 'array') return '[' + hexToArr(value, ctrl.scale255, ctrl.alpha).join(', ') + ']';
      const q = ctrl.quote || "'"; return q + value + q;   // hexstr / name 统一回写为 '#rrggbb'
    }
    default: return value;
  }
}

// ---------- 组件 ----------

export default function ParamPanel({ code, onTweak }) {
  const [collapsed, setCollapsed] = useState(false);

  const parsed = useMemo(() => {
    try {
      const calls = findAllCalls(code || '');
      if (!calls.length) return null;
      const groups = [];
      for (const call of calls) {
        const objStart = call.argsText.indexOf('{');
        let entries;
        if (objStart >= 0 && objStart < 3) {
          entries = parseObject(call.argsText, call.argsStart);
        } else {
          const params = (PARAM_META.byNs[call.ns] && PARAM_META.byNs[call.ns].methods[call.method]
            && PARAM_META.byNs[call.ns].methods[call.method].params) || [];
          entries = splitTopLevel(call.argsText, call.argsStart).map((seg, i) => ({
            key: params[i] && params[i] !== 'fn' ? params[i] : 'arg' + i,
            valueText: seg.text, start: seg.start, end: seg.end, comment: '',
          }));
        }
        if (!entries || !entries.length) continue;
        const controls = entries.map((e) => buildControl(e, call.ns)).filter((c) => c.kind !== 'expr');
        if (!controls.length) continue;
        groups.push({ title: METHOD_CN[call.method] || ((call.ns ? call.ns + '.' : '') + call.method), controls });
      }
      if (!groups.length) return null;
      const total = groups.reduce((s, g) => s + g.controls.length, 0);
      return { groups, total };
    } catch (e) {
      return null;
    }
  }, [code]);

  // 修改某控件值：按偏移把新值文本拼回代码（从当前 code 重新定位，避免偏移过期）
  const applyChange = useCallback((ctrl, newVal) => {
    const seg = serialize(ctrl, newVal);
    // 以 raw 文本在原位置精确替换；若偏移处文本已变，则回退为按内容查找
    let { start, end } = ctrl;
    if (code.slice(start, end) !== ctrl.raw) {
      const idx = code.indexOf(ctrl.raw);
      if (idx < 0) return;
      start = idx; end = idx + ctrl.raw.length;
    }
    onTweak(code.slice(0, start) + seg + code.slice(end));
  }, [code, onTweak]);

  if (!parsed) return null;

  return (
    <div className="lilgui">
      <style>{`
        .lilgui { position:absolute; top:10px; right:10px; width:262px; max-height:calc(100% - 20px);
          display:flex; flex-direction:column; z-index:20; border-radius:8px; overflow:hidden;
          background:rgba(12,16,22,0.92); backdrop-filter:blur(6px);
          border:1px solid rgba(34,211,238,0.25); box-shadow:0 8px 28px rgba(0,0,0,0.5);
          font-family:-apple-system,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif; color:#d7dee8; }
        .lilgui-hdr { display:flex; align-items:center; gap:8px; padding:7px 10px; cursor:pointer;
          background:rgba(34,211,238,0.10); border-bottom:1px solid rgba(34,211,238,0.18); flex-shrink:0; user-select:none; }
        .lilgui-arrow { font-size:0.55rem; color:#22d3ee; transition:transform .2s; }
        .lilgui-arrow.open { transform:rotate(90deg); }
        .lilgui-ttl { flex:1; font-size:0.74rem; font-weight:600; color:#e6f6fa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .lilgui-ttl code { color:#22d3ee; font-family:'JetBrains Mono',Consolas,monospace; }
        .lilgui-count { font-size:0.62rem; color:#5c6b7e; }
        .lilgui-body { overflow-y:auto; padding:4px 0; }
        .lilgui-row { display:flex; align-items:center; gap:8px; padding:4px 10px; min-height:26px; }
        .lilgui-row:hover { background:rgba(148,163,184,0.06); }
        .lilgui-lbl { flex:0 0 96px; font-size:0.68rem; color:#9fb0c3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .lilgui-ctl { flex:1; display:flex; align-items:center; gap:6px; min-width:0; }
        .lilgui-num, .lilgui-txt { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(148,163,184,0.18);
          border-radius:4px; color:#d7dee8; font-size:0.68rem; padding:2px 6px; outline:none; box-sizing:border-box; font-family:inherit; }
        .lilgui-num { text-align:right; }
        .lilgui-num:focus, .lilgui-txt:focus { border-color:#22d3ee; }
        .lilgui-num.sm { flex:1; min-width:0; }
        .lilgui-range { flex:1; min-width:0; accent-color:#22d3ee; height:3px; }
        .lilgui-numbox { flex:0 0 52px; }
        .lilgui-sel { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(148,163,184,0.18);
          border-radius:4px; color:#d7dee8; font-size:0.68rem; padding:2px 4px; outline:none; font-family:inherit; }
        .lilgui-chk { width:15px; height:15px; accent-color:#22d3ee; cursor:pointer; }
        .lilgui-color { flex:0 0 34px; height:18px; padding:0; border:1px solid rgba(148,163,184,0.25);
          border-radius:4px; background:none; cursor:pointer; }
        .lilgui-hex { flex:1; min-width:0; }
        .lilgui-group { padding:6px 10px 2px; font-size:0.64rem; font-weight:600; color:#22d3ee; }
        .lilgui-group code { font-family:'JetBrains Mono',Consolas,monospace; }
        .lilgui-foot { padding:6px 10px; border-top:1px solid rgba(148,163,184,0.10); font-size:0.6rem; color:#5c6b7e; flex-shrink:0; }
      `}</style>

      <div className="lilgui-hdr" onClick={() => setCollapsed((c) => !c)} title="点击折叠/展开参数面板">
        <span className={'lilgui-arrow' + (collapsed ? '' : ' open')}>▶</span>
        <span className="lilgui-ttl">⚙ {parsed.groups.length === 1 ? <code>{parsed.groups[0].title}</code> : '参数面板'}</span>
        <span className="lilgui-count">{parsed.total}</span>
      </div>

      {!collapsed && (
        <>
          <div className="lilgui-body">
            {parsed.groups.map((g, gi) => (
              <React.Fragment key={g.title + gi}>
                {parsed.groups.length > 1 && (
                  <div className="lilgui-group"><code>{g.title}</code></div>
                )}
                {g.controls.map((c, i) => (
                  <div className="lilgui-row" key={c.key + '-' + gi + '-' + i} title={c.tip || c.key}>
                    <span className="lilgui-lbl">{c.label}</span>
                    <span className="lilgui-ctl"><Control ctrl={c} onChange={(v) => applyChange(c, v)} /></span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="lilgui-foot">调节即写回代码 · 「立即执行」开启时实时生效</div>
        </>
      )}
    </div>
  );
}

function Control({ ctrl, onChange }) {
  const [local, setLocal] = useState(ctrl.value);
  // 当代码（外部）变化导致 ctrl.value 变化时同步
  React.useEffect(() => { setLocal(ctrl.value); }, [ctrl.value]);

  switch (ctrl.kind) {
    case 'bool':
      return <input type="checkbox" className="lilgui-chk" checked={!!local} onChange={(e) => { setLocal(e.target.checked); onChange(e.target.checked); }} />;
    case 'enum':
      return (
        <select className="lilgui-sel" value={local} onChange={(e) => {
          const v = typeof ctrl.value === 'number' ? Number(e.target.value) : e.target.value;
          setLocal(v); onChange(v);
        }}>
          {ctrl.options.map((o) => <option key={o.v} value={o.v}>{o.v} · {o.label}</option>)}
        </select>
      );
    case 'slider':
      return (
        <>
          <input type="range" className="lilgui-range" min={ctrl.min} max={ctrl.max} step={ctrl.step}
            value={local} onChange={(e) => { const v = Number(e.target.value); setLocal(v); onChange(v); }} />
          <input type="number" className="lilgui-num lilgui-numbox" step={ctrl.step}
            value={local} onChange={(e) => { const v = Number(e.target.value); setLocal(v); onChange(v); }} />
        </>
      );
    case 'number':
      return <input type="number" className="lilgui-num" value={local}
        onChange={(e) => { const v = e.target.value === '' ? '' : Number(e.target.value); setLocal(v); if (e.target.value !== '') onChange(v); }} />;
    case 'color':
      return (
        <>
          <input type="color" className="lilgui-color" value={local}
            onChange={(e) => { setLocal(e.target.value); onChange(e.target.value); }} />
          <input type="text" className="lilgui-txt lilgui-hex" value={local}
            onChange={(e) => { setLocal(e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) onChange(e.target.value); }} />
        </>
      );
    case 'vector':
      return (
        <>
          {local.map((n, i) => (
            <input key={i} type="number" className="lilgui-num sm" value={n}
              onChange={(e) => {
                const next = local.slice(); next[i] = e.target.value === '' ? 0 : Number(e.target.value);
                setLocal(next); onChange(next);
              }} />
          ))}
        </>
      );
    case 'string':
      return <input type="text" className="lilgui-txt" value={local}
        onChange={(e) => { setLocal(e.target.value); onChange(e.target.value); }} />;
    default:
      return <span style={{ fontSize: '0.66rem', color: '#5c6b7e' }}>{String(ctrl.value)}</span>;
  }
}
