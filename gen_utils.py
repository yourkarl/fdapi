# -*- coding: utf-8 -*-
"""生成脚本共享工具：原子写入。

直接 open(path,'w').write() 在写入过程中被中断（进程被杀、磁盘满、
编辑器/同步占用）时会留下「写了一半」的文件——表现为尾部空字节填充或
多字节汉字被截断，正是本工程曾出现的损坏来源。

atomic_write 先写到同目录下的临时文件并 fsync，再用 os.replace 原子改名，
保证任何时刻 path 要么是旧的完整内容、要么是新的完整内容，绝不出现半截文件。
"""
import os
import tempfile


def atomic_write(path, data, encoding='utf-8'):
    """以原子方式写入文本文件（统一 LF 换行）。"""
    d = os.path.dirname(os.path.abspath(path)) or '.'
    os.makedirs(d, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=d, suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding=encoding, newline='\n') as f:
            f.write(data)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise
