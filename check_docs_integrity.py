# -*- coding: utf-8 -*-
"""内容完整性检查 —— CI 门禁，杜绝「写了一半」的损坏文件进入主干。

检查范围：docs/**/*.md、sidebars.js、static/dts-sdk.d.ts、src/data/*.js

检查项（任一不通过即以非零退出码失败）：
  1. 合法 UTF-8                 —— 多字节汉字被截断
  2. 不含 NUL 空字节            —— 尾部空字节填充式半截写入
  3. front matter 可解析为 YAML（仅 .md，且仅在存在时）
  4. 代码块 ``` 成对闭合（仅 .md）—— 末尾代码块被截断
  5. 无未闭合的 Markdown 链接 ](（仅 .md）—— ASCII 中途截断（不触发 1/2）

用法：python3 check_docs_integrity.py  /  npm run check
说明：生成脚本 linkify_types.js 内部刻意用 NUL 作占位哨兵，不在检查范围内。
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

try:
    import yaml
    HAVE_YAML = True
except ImportError:
    HAVE_YAML = False

FM_RE = re.compile(r'^---\n(.*?)\n---', re.S)


def check_file(path, is_md):
    problems = []
    raw = open(path, 'rb').read()

    pos = raw.find(b'\x00')
    if pos != -1:
        problems.append('含 NUL 空字节（首个位于字节偏移 %d）—— 疑似半截写入损坏' % pos)

    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError as e:
        problems.append('非合法 UTF-8（%s）—— 疑似多字节字符被截断' % e)
        return problems

    if is_md:
        m = FM_RE.match(text.replace('\r\n', '\n'))
        if m and HAVE_YAML:
            try:
                yaml.safe_load(m.group(1))
            except Exception as e:
                problems.append('front matter YAML 解析失败：%s' % str(e).splitlines()[0])

        if text.count('```') % 2 != 0:
            problems.append('代码块未闭合（``` 数量为奇数）—— 疑似文档末尾被截断')

        for ln in text.split('\n'):
            broke = False
            for mm in re.finditer(r'\]\(', ln):
                if ')' not in ln[mm.end():]:
                    problems.append('存在未闭合的 Markdown 链接 ](  —— 疑似截断')
                    broke = True
                    break
            if broke:
                break

    return problems


def main():
    targets = []
    for f in glob.glob(os.path.join(ROOT, 'docs', '**', '*.md'), recursive=True):
        targets.append((f, True))
    for rel in ['sidebars.js', os.path.join('static', 'dts-sdk.d.ts')]:
        p = os.path.join(ROOT, rel)
        if os.path.isfile(p):
            targets.append((p, False))
    for f in glob.glob(os.path.join(ROOT, 'src', 'data', '*.js')):
        targets.append((f, False))

    failures = {}
    for path, is_md in targets:
        probs = check_file(path, is_md)
        if probs:
            failures[os.path.relpath(path, ROOT)] = probs

    total = len(targets)
    if failures:
        print('内容完整性检查未通过：%d / %d 个文件存在问题\n' % (len(failures), total))
        for rel in sorted(failures):
            print('  x %s' % rel)
            for p in failures[rel]:
                print('      - %s' % p)
        print('\n提示：损坏多由「写了一半」导致；请从源恢复或补全后再提交。')
        return 1

    note = '' if HAVE_YAML else '（未安装 PyYAML，已跳过 front matter YAML 校验）'
    print('内容完整性检查通过 OK —— 共 %d 个文件，UTF-8 / 无 NUL / front matter / 代码块 / 链接 均完整%s' % (total, note))
    return 0


if __name__ == '__main__':
    sys.exit(main())
