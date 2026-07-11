# -*- coding: utf-8 -*-
"""生成 llms.txt / llms-full.txt（https://llmstxt.org 规范）。

输入：docs/**/*.md 的 front matter（title/description/slug）
     + nav_data.json（API 分类中文标签）+ sidebars.js（教程分组与顺序）
输出：static/llms.txt       —— 站点地图式索引，供 AI 工具快速定位文档
     static/llms-full.txt  —— 全部文档正文拼接，供 AI 一次性摄入

部署后可访问 <SITE>/llms.txt 与 <SITE>/llms-full.txt。
挂在 `npm run gen` 中，文档更新后自动同步。
"""
import json
import os
import re

from gen_utils import atomic_write

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(ROOT, 'docs')
SITE = 'https://yourkarl.github.io/fdapi'


def parse_front_matter(path):
    """返回 (meta dict, 正文)。只做本工程需要的简单解析。"""
    with open(path, encoding='utf-8') as f:
        text = f.read()
    meta = {}
    body = text
    if text.startswith('---'):
        end = text.find('\n---', 3)
        if end != -1:
            for line in text[3:end].splitlines():
                m = re.match(r'^(\w[\w-]*):\s*(.*)$', line.strip())
                if m:
                    val = m.group(2).strip().strip('"').strip("'")
                    meta[m.group(1)] = val
            body = text[end + 4:]
    return meta, body.strip()


def doc_url(relpath, meta):
    """relpath 形如 api/camera/camera.md；slug 优先。"""
    route = meta.get('slug') or '/' + relpath[:-3].replace(os.sep, '/')
    return SITE + '/docs' + route


def collect(relpath):
    path = os.path.join(DOCS, relpath)
    meta, body = parse_front_matter(path)
    title = meta.get('title') or os.path.basename(relpath)[:-3]
    desc = meta.get('description', '')
    return {'title': title, 'desc': desc, 'url': doc_url(relpath, meta),
            'body': body, 'rel': relpath}


def api_categories():
    """按 nav_data.json 的顺序返回 [(中文标签, [doc, ...]), ...]。"""
    with open(os.path.join(ROOT, 'nav_data.json'), encoding='utf-8') as f:
        nav = json.load(f)
    labels = {c['id']: c['label'] for c in nav.get('CATEGORIES', [])}
    api_dir = os.path.join(DOCS, 'api')
    dirs = sorted(d for d in os.listdir(api_dir)
                  if os.path.isdir(os.path.join(api_dir, d)))
    ordered = [c['id'] for c in nav.get('CATEGORIES', []) if c['id'] in dirs]
    ordered += [d for d in dirs if d not in ordered]
    cats = []
    for d in ordered:
        docs = [collect(os.path.join('api', d, f))
                for f in sorted(os.listdir(os.path.join(api_dir, d)))
                if f.endswith('.md')]
        if docs:
            cats.append((labels.get(d, d), docs))
    # 顶层散页（如 types.md）
    top = [collect(os.path.join('api', f))
           for f in sorted(os.listdir(api_dir)) if f.endswith('.md')]
    if top:
        cats.append(('类型参考', top))
    return cats


def top_level_docs():
    """docs/ 顶层散页（MCP/Skill 使用说明等）。SKILL.md 是 skill 定义文件，
    front matter 无 title，自然被排除。"""
    out = []
    for f in sorted(os.listdir(DOCS)):
        if f.endswith('.md') and os.path.isfile(os.path.join(DOCS, f)):
            meta, _ = parse_front_matter(os.path.join(DOCS, f))
            if meta.get('title'):
                out.append(collect(f))
    return out


def tutorial_groups():
    """从 sidebars.js 的 tutorialsSidebar 提取 (分组标签, [doc, ...])。"""
    with open(os.path.join(ROOT, 'sidebars.js'), encoding='utf-8') as f:
        src = f.read()
    # 只取 tutorialsSidebar 段（到下一个顶层 sidebar 定义为止）
    m = re.search(r'tutorialsSidebar:\s*\[(.*?)\n  \],', src, re.S)
    seg = m.group(1) if m else src
    groups, cur_label, cur_items = [], None, []
    for lab, item in re.findall(r"label:\s*'([^']+)'|'tutorials/([\w-]+)'", seg):
        if lab:
            if cur_label and cur_items:
                groups.append((cur_label, cur_items))
            cur_label, cur_items = lab, []
        elif item:
            rel = os.path.join('tutorials', item + '.md')
            if os.path.exists(os.path.join(DOCS, rel)):
                cur_items.append(collect(rel))
    if cur_label and cur_items:
        groups.append((cur_label, cur_items))
    return groups


def line(d):
    desc = ' — ' + d['desc'] if d['desc'] else ''
    return '- [%s](%s)%s' % (d['title'], d['url'], desc)


def main():
    tut = tutorial_groups()
    api = api_categories()
    extras = top_level_docs()
    if extras:
        tut = tut + [('AI 与工具', extras)]

    out = []
    out.append('# DTS 数字孪生平台 · 二次开发 API 文档（Digital Twin SDK v7.1）')
    out.append('')
    out.append('> DTS 是数字孪生云渲染平台。JS SDK（fdapi）在浏览器中连接云渲染实例，'
               '以异步方式（所有接口返回 Promise）操控三维场景：相机、标注、图层、'
               '矢量、天气、交通/水利仿真等。适用于智慧城市、园区、交通、水利、'
               '能源等 GIS+BIM 数字孪生二次开发。')
    out.append('')
    out.append('关键约定：入口类 `DigitalTwinAPI`，实例化后通过全局对象 `fdapi` 调用；'
               '坐标分投影（Projection）与球面（WGS84）两套体系，需与工程一致；'
               '相机朝向 rotation 为 [pitch, yaw, roll]。'
               '在线调试台：%s/sandbox（可真实运行全部示例）。' % SITE)
    out.append('')
    for label, docs in tut:
        out.append('## 教程 · %s' % label)
        out.append('')
        out.extend(line(d) for d in docs)
        out.append('')
    for label, docs in api:
        out.append('## API · %s' % label)
        out.append('')
        out.extend(line(d) for d in docs)
        out.append('')
    out.append('## Optional')
    out.append('')
    out.append('- [llms-full.txt](%s/llms-full.txt) — 全部文档正文单文件版' % SITE)
    out.append('- [在线调试台](%s/sandbox) — 真实连接云渲染的 fdapi 调试环境' % SITE)
    out.append('')
    atomic_write(os.path.join(ROOT, 'static', 'llms.txt'), '\n'.join(out))

    # llms-full.txt：全文拼接
    full = ['# DTS 数字孪生平台 · 二次开发文档全文（Digital Twin SDK v7.1）', '',
            '> 本文件由 gen_llms_txt.py 自动生成，内容与 %s 一致。' % SITE, '']
    all_groups = [('教程 · ' + l, ds) for l, ds in tut] + \
                 [('API · ' + l, ds) for l, ds in api]
    for label, docs in all_groups:
        for d in docs:
            full.append('---')
            full.append('')
            full.append('# %s ｜ %s' % (d['title'], label))
            full.append('')
            full.append('来源: %s' % d['url'])
            if d['desc']:
                full.append('摘要: %s' % d['desc'])
            full.append('')
            # 根相对链接（/docs/... /img/...）转绝对 URL，离线阅读不失效
            body = re.sub(r'\]\(/(?!/)', '](%s/' % SITE, d['body'])
            full.append(body)
            full.append('')
    atomic_write(os.path.join(ROOT, 'static', 'llms-full.txt'), '\n'.join(full))

    # 覆盖率守卫：有 title 的文档若未收录（如教程忘挂 sidebars.js）则告警
    got = {d['rel'].replace(os.sep, '/') for _, ds in all_groups for d in ds}
    for r, _, fs in os.walk(DOCS):
        for f in fs:
            if not f.endswith('.md'):
                continue
            rel = os.path.relpath(os.path.join(r, f), DOCS).replace(os.sep, '/')
            if rel in got:
                continue
            meta, _b = parse_front_matter(os.path.join(r, f))
            if meta.get('title'):
                print('WARNING: 未收录进 llms.txt（是否忘挂 sidebars.js？）:', rel)

    n_docs = sum(len(ds) for _, ds in all_groups)
    print('llms.txt: %d 个分组 / %d 篇文档' % (len(all_groups), n_docs))
    print('llms-full.txt: %.1f MB' % (
        os.path.getsize(os.path.join(ROOT, 'static', 'llms-full.txt')) / 1e6))


if __name__ == '__main__':
    main()
