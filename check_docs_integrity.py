# -*- coding: utf-8 -*-
"""内容完整性检查 —— CI 门禁，杜绝「写了一半」的损坏文件进入主干。

检查范围：
  docs/**/*.md            文档
  sidebars.js             侧边栏（生成物）
  static/dts-sdk.d.ts     TS 类型声明（生成物）
  src/data/*.js           调试台数据（生成物）

检查项（任一不通过即以非零退出码失败）：
  1. 合法 UTF-8         —— 捕获「多字节汉字被截断」一类损坏
  2. 不含 NUL 空字节    —— 捕获「尾部空字节填充」一类半截写入损坏
  3. front matter 可解析为 YAML（仅 .md，且仅在存在 front matter 时）

用法：
  python3 check_docs_integrity.py          # 检查，失败返回非零
  npm run check                            # 同上（见 package.json）

说明：生成脚本 linkify_types.js 内部刻意用 NUL 作占位哨兵，不在检查范围内。
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

try:
    import yaml  # PyYAML
    HAVE_YAML = True
except ImportError:
    HAVE_YAML = False

FM_RE = re.compile(r'^---\n(.*?)\n---', re.S)


def check_file(path, is_md):
    """返回该文件的问题列表（空列表表示通过）。"""
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
        # front matter 在 Docusaurus 中是可选的；仅当存在时才校验其 YAML。归一化换行兼容 CRLF。
        m = FM_RE.match(text.replace('\r\n', '\n'))
        if m and HAVE_YAML:
            try:
                yaml.safe_load(m.group(1))
            except Exception as e:
                problems.append('front matter YAML 解析失败：%s' % str(e).splitlines()[0])

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
        print('\n提示：损坏多由「写了一半」导致；生成脚本已改为原子写入，请重新生成相关文件或从版本库恢复后再提交。')
        return 1

    note = '' if HAVE_YAML else '（未安装 PyYAML，已跳过 front matter YAML 校验）'
    print('内容完整性检查通过 OK —— 共 %d 个文件，UTF-8 / 无 NUL / front matter 均正常%s' % (total, note))
    return 0


if __name__ == '__main__':
    sys.exit(main())
