// 从参考资料 global.html 提取所有 <constant> 类型/枚举定义（Color、各种 *Style、ResetType 等），
// 生成 docs/api/types.md 作为「类型与枚举」参考页，供参数表里的类型名链接落地。
// 运行：node gen_types.js
const fs = require('fs');
const path = require('path');
const { atomicWrite } = require('./gen_utils');

const ROOT = __dirname;
const SRC = path.join(ROOT, '参考资料', 'API原始参考文档', 'doc', 'doc', 'global.html');
const OUT = path.join(ROOT, 'docs', 'api', 'types.md');
const NAMES_OUT = path.join(ROOT, 'src', 'data', 'type-names.json'); // 供 linkify 用

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x?[0-9a-fA-F]+;/g, '').replace(/\s+/g, ' ').trim();

function parseConstants(html) {
  const out = [];
  // 每个常量定义：<dt class="name" id="X"><h4 ...>X<span ...> :type</span></h4></dt><dd>...</dd>
  const re = /<dt class="name" id="([A-Za-z][A-Za-z0-9]*)">\s*<h4[^>]*>\s*<span class="type-signature">&lt;constant>[^<]*<\/span>([A-Za-z0-9]+)<span class="type-signature">\s*:([^<]+)<\/span>/g;
  let m;
  const marks = [];
  while ((m = re.exec(html))) marks.push({ id: m[1], baseType: m[3].trim(), start: m.index });
  for (let i = 0; i < marks.length; i++) {
    const seg = html.slice(marks[i].start, i + 1 < marks.length ? marks[i + 1].start : html.length);
    // 描述
    const dm = seg.match(/<div class="description">([\s\S]*?)<\/div>/);
    const desc = dm ? strip(dm[1]) : '';
    // 成员表
    const members = [];
    const tb = seg.match(/<tbody>([\s\S]*?)<\/tbody>/);
    if (tb) {
      const rows = [...tb[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
      for (const r of rows) {
        const name = (r[1].match(/<td class="name">([\s\S]*?)<\/td>/) || [])[1];
        const def = (r[1].match(/<td class="default">([\s\S]*?)<\/td>/) || [])[1];
        const d = (r[1].match(/<td class="description[^"]*">([\s\S]*?)<\/td>/) || [])[1];
        if (name) members.push({ name: strip(name), value: def != null ? strip(def) : '', desc: d ? strip(d) : '' });
      }
    }
    out.push({ name: marks[i].id, baseType: marks[i].baseType, desc, members });
  }
  return out;
}

function anchor(name) { return name.toLowerCase(); }

function toMarkdown(consts) {
  let md = `---\nslug: /api/types\ntitle: 类型与枚举\nsidebar_label: 类型与枚举\ndescription: "API 参数中用到的对象类型与枚举常量（Color、各类 Style 样式、Mode 模式等）的取值参考"\n---\n\n`;
  md += '# 类型与枚举\n\n本页汇总 API 参数中常见的**对象类型**与**枚举常量**取值。参数表中的类型名（如 `Color`、`PolygonStyle`）均链接至此。\n\n';
  // 颜色单独提示指向更详细的教程
  md += '> 颜色相关参数（类型 `Color`）的四种取值格式与示例，另见 [颜色系统](/docs/tutorials/color)。\n\n';
  // 目录
  md += '## 索引\n\n';
  md += consts.map((c) => `[\`${c.name}\`](#${anchor(c.name)})`).join(' · ') + '\n\n';
  for (const c of consts) {
    md += `## ${c.name}\n\n`;
    md += `类型：\`${c.baseType}\`${c.desc ? ' — ' + c.desc : ''}\n\n`;
    if (c.members.length) {
      md += '| 成员 | 值 | 说明 |\n|------|------|------|\n';
      for (const mb of c.members) {
        md += `| \`${mb.name}\` | ${mb.value || '—'} | ${(mb.desc || '').replace(/\|/g, '\\|')} |\n`;
      }
      md += '\n';
    }
  }
  return md;
}

function main() {
  if (!fs.existsSync(SRC)) { console.error('找不到 global.html:', SRC); process.exit(1); }
  const html = fs.readFileSync(SRC, 'utf8');
  const consts = parseConstants(html);
  if (!consts.length) { console.error('未解析到任何 constant typedef，检查正则/HTML 结构'); process.exit(1); }
  atomicWrite(OUT, toMarkdown(consts));
  atomicWrite(NAMES_OUT, JSON.stringify(consts.map((c) => c.name)));
  console.log('解析常量类型数量:', consts.length);
  console.log('类型名:', consts.map((c) => c.name + '(' + c.members.length + ')').join(', '));
  console.log('输出:', OUT);
}
main();
