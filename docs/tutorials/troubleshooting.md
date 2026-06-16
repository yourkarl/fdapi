---
title: 排错与常见报错
sidebar_label: 排错指南
description: "DTS Cloud 二次开发常见报错与问题排查：连接失败、API 调用崩溃、版本不匹配、对象不显示或偏移、异步异常等，按「现象 → 原因 → 排查」组织。"
---

# 排错与常见报错

按「**现象 → 原因 → 排查**」组织 DTS 二次开发中最常见的问题。更偏使用层面的疑问见 [常见问题 FAQ](/docs/tutorials/faq)，整体机制见 [架构概览](/docs/tutorials/architecture)。

## 连接与初始化

### 调试台提示缺少 `ac.min.js` / `ac_conf.js`（红色提示）

- **原因**：SDK 运行文件未放入工程 `static/` 目录。
- **排查**：把 SDK 安装目录（如 `%AppData%/DTS Cloud/7.1/SDK/`）下的 `ac.min.js` 与 `ac_conf.js` 复制到 `static/`；这两个文件不入库，部署时单独拷贝。

### 连接不上 / 一直在「连接中」

- **原因**：服务地址或端口错误、云渲染服务未启动、实例被占满、网络不通。
- **排查**：确认 `IP:Port` 正确（Player 端口对应 CloudMaster → 服务设置里的端口；API 的 Port 是实例的 WebSocket 端口）；确认云渲染服务可达、有空闲实例；指定了正确的 `pid`（工程被锁定时切换其它工程会失败）。

### 调用 API 报「fdapi 未就绪」或页面崩溃

- **原因**：在工程加载完成前就调用了 API。
- **排查**：所有 API 调用必须放在 `onReady` 回调**之后**执行；只有 `new DigitalTwinAPI(...)` 且 `onReady` 触发后，全局 `fdapi` 才有效。

### 多窗口时 `fdapi` 指向不对

- **原因**：一个页面创建了多个视频流窗口，全局 `fdapi` 始终指向**最后一次**创建的实例。
- **排查**：多窗口场景下各自保存 `player.getAPI()` 的返回值，用各自的实例引用调用，别依赖全局 `fdapi`。

## 版本

### 日志警告「ac.min.js 版本和云渲染服务器版本不一致」

- **原因**：本地 `ac.min.js` 与 CloudMaster 安装版本不一致，可能导致接口调用错误。
- **排查**：将本地 `ac.min.js` 更新到与服务器 CloudMaster **相同版本**；底部 Version 标识可对比客户端 / 服务端版本（颜色不一致即不匹配）。

## 对象不显示 / 位置偏移

### 添加了对象但场景里看不到

- **原因**：坐标不在当前视野、可视范围裁剪过严、坐标系类型不匹配。
- **排查**：先用 `focus()` 把相机定位到对象确认是否存在；检查 `range` / `viewHeightRange` 是否把对象裁掉了；确认 `coordinateType`（0 投影 / 1 经纬度）与场景坐标系一致。

### 对象位置整体偏移

- **原因**：坐标系不一致——投影场景传了经纬度，或反之。
- **排查**：确认场景属于**投影**还是**球面**坐标系（见 [核心概念](/docs/tutorials/architecture)），用 [`Coord`](/docs/api/utils/coord) 做转换；坐标取值与单位参考 [坐标系与坐标转换](/docs/tutorials/coordinates)。

### 设置了 `bbox` 后 `location` / `scale` 不生效（如 Decal）

- **原因**：部分对象设置包围盒 `bbox` 后，`location` 与 `scale` 会失效，二者互斥。
- **排查**：按需二选一——用 `bbox` 框定范围，或用 `location` + `scale` 定位缩放，不要同时依赖。

## 异步与执行

### 回调没触发 / 结果拿不到 / 时序错乱

- **原因**：在同一函数体内混用了回调、`.then()` 与 `async/await` 三种异步写法。
- **排查**：同一段逻辑只用一种异步写法，详见 [异步调用方式](/docs/tutorials/async-call)；需要拿返回值的接口务必 `await` 或在回调/`.then` 中读取。

### 性能卡顿 / 大批量操作很慢

- **原因**：逐个调用导致海量命令往返，或同屏对象过多。
- **排查**：改用批量 `add(数组)` / `updateBegin`…`updateEnd`，设置可视范围裁剪，详见 [性能最佳实践](/docs/tutorials/performance)。

---

> 仍无法定位时，可在 [在线调试台](/sandbox) 复现：打开日志面板观察 `onLog` / `OnEvent` 输出，或用 AI 助手贴报错让其分析。
