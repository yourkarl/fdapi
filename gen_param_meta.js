// 解析 docs/api/**/*.md 参数表 -> src/data/param-meta.js
// 与 gen_param_meta.py 等价的 Node 版本（本机无 Python 环境时使用）：node gen_param_meta.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOCS = path.join(ROOT, 'docs', 'api');
const OUT = path.join(ROOT, 'src', 'data', 'param-meta.js');
const NUM = '-?\\d+(?:\\.\\d+)?';

function controlOf(typ) {
  const t = (typ || '').toLowerCase();
  if (t.includes('bool')) return 'bool';
  if (t.includes('color')) return 'color';
  if (/number|int|float/.test(t)) return 'number';
  if (t.includes('array')) return 'array';
  if (t.includes('object')) return 'object';
  if (t.includes('function')) return 'func';
  return 'string';
}
function parseDefault(desc) {
  const m = desc.match(new RegExp('默认(?:值)?[白黑红绿蓝色]*\\s*[:：]?\\s*(\\[[^\\]]*\\]|true|false|[A-Za-z][\\w.]*|' + NUM + ')'));
  return m ? m[1] : null;
}
function parseRange(desc) {
  const m = desc.match(new RegExp('取值范围\\s*[:：]?\\s*[\\[\\(]?\\s*(' + NUM + ')\\s*[~～,，\\-]\\s*(' + NUM + ')'));
  return m ? [parseFloat(m[1]), parseFloat(m[2])] : [null, null];
}
function parseEnum(desc) {
  const re = /(-?\d+)\s*[为=:：]\s*([^\s，,。；;\)\]]{1,16})/g;
  const out = [], seen = new Set();
  let m;
  while ((m = re.exec(desc))) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    out.push({ v: parseInt(m[1], 10), label: m[2] });
  }
  return out.length >= 2 ? out : null;
}
function splitRow(line) {
  line = line.trim().replace(/^\|/, '').replace(/\|$/, '').replace(/\\\|/g, '/');
  return line.split('|').map((c) => c.trim());
}
const clean = (c) => c.replace(/`/g, '').trim();

function parseFieldRow(cells) {
  if (cells.length < 3) return null;
  const name = clean(cells[0]);
  if (!/^[A-Za-z_$][\w$]*$/.test(name)) return null;
  const typ = clean(cells[1]);
  const desc = cells[cells.length - 1];
  const info = { t: controlOf(typ) };
  const dv = parseDefault(desc);
  if (dv !== null) info.d = dv;
  const [lo, hi] = parseRange(desc);
  if (lo !== null) { info.min = lo; info.max = hi; }
  const en = parseEnum(desc);
  if (en) { info.enum = en; info.t = 'enum'; }
  let d = desc.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  if (d) info.desc = d.slice(0, 80);
  return [name, info];
}
function bigger(a, b) { return JSON.stringify(a).length > JSON.stringify(b).length; }

function parseDoc(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/`api\.([A-Za-z0-9]+)`/);
  let ns = m ? m[1] : path.basename(file, '.md');
  ns = ns[0].toLowerCase() + ns.slice(1);
  const fields = {}, methods = {};
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hm = line.match(/^###\s+`([A-Za-z_$][\w$]*)\s*\(([^)]*)\)`/);
    if (hm) {
      methods[hm[1]] = { params: hm[2].split(',').map((p) => p.trim()).filter(Boolean) };
      continue;
    }
    if (line.trim().startsWith('|') && (line.includes('参数') || line.includes('属性'))
        && i + 1 < lines.length && /^\s*\|[\s:\-|]+\|/.test(lines[i + 1])) {
      i += 2;
      for (; i < lines.length && lines[i].trim().startsWith('|'); i++) {
        const row = parseFieldRow(splitRow(lines[i]));
        if (row) {
          const [name, info] = row;
          if (!(name in fields) || bigger(info, fields[name])) fields[name] = info;
        }
      }
      i--;
    }
  }
  return { ns, fields, methods };
}
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function main() {
  const byNs = {}, globalFields = {};
  for (const file of walk(DOCS)) {
    const { ns, fields, methods } = parseDoc(file);
    if (!byNs[ns]) byNs[ns] = { fields: {}, methods: {} };
    Object.assign(byNs[ns].fields, fields);
    Object.assign(byNs[ns].methods, methods);
    for (const [k, v] of Object.entries(fields)) {
      if (!(k in globalFields) || bigger(v, globalFields[k])) globalFields[k] = v;
    }
  }
  const data = { byNs, fields: globalFields };
  const js = '// 自动生成：node gen_param_meta.js（等价 gen_param_meta.py）—— 解析 docs/api 参数表\n'
    + '/* eslint-disable */\n'
    + 'export const PARAM_META = ' + JSON.stringify(data) + ';\n';
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, js, 'utf8');
  const nf = Object.values(byNs).reduce((s, v) => s + Object.keys(v.fields).length, 0);
  console.log('namespaces:', Object.keys(byNs).length, ' fields(byNs):', nf, ' global:', Object.keys(globalFields).length);
  console.log('output:', OUT, (js.length / 1024).toFixed(1), 'KB');
}
main();
