// 生成脚本共享工具：原子写入。
//
// 直接 fs.writeFileSync 在写入过程中被中断时会留下「写了一半」的文件——
// 表现为尾部空字节或多字节汉字被截断，正是本工程曾出现的损坏来源。
// atomicWrite 先写到同目录临时文件，再 fs.renameSync 原子改名，
// 保证文件要么是旧的完整内容、要么是新的完整内容，绝不出现半截文件。
const fs = require('fs');
const path = require('path');

function atomicWrite(file, data) {
  const dir = path.dirname(path.resolve(file));
  fs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(dir, '.' + path.basename(file) + '.' + process.pid + '.tmp');
  try {
    fs.writeFileSync(tmp, data, 'utf8');
    fs.renameSync(tmp, file);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    throw e;
  }
}

module.exports = { atomicWrite };
