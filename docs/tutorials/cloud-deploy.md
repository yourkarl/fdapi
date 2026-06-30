---
title: 云端部署说明
sidebar_label: 云端部署
description: "DTS 服务端部署环境要求、网络配置与前端接入指南"
---

## 架构说明

DTS 采用**云渲染**架构：三维场景在服务端 GPU 上渲染，通过 WebRTC 视频流推送到浏览器，前端 SDK 通过 WebSocket 发送 API 指令控制场景。

```
浏览器（前端 SDK）  ←─WebSocket API 指令─→  DTS 服务端
                   ←─WebRTC 视频流──────→  （GPU 渲染）
```

---

## 服务端环境要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows Server 2019 / Windows 10 64位 |
| GPU | 支持 DirectX 12 的独立显卡（推荐 NVIDIA RTX 系列） |
| 显存 | ≥ 8GB（复杂场景建议 16GB+） |
| 内存 | ≥ 16GB |
| 网络带宽（上行） | 每路视频流约 10~30 Mbps（取决于分辨率和帧率） |
| 端口 | 默认 8080（WebSocket），可在配置文件中修改 |

---

## 网络配置

### 局域网部署

前端页面与 DTS 服务在同一局域网内，直接使用内网 IP 接入：

```js
new DigitalTwinPlayer('192.168.1.100:8080', { domId: 'player', ... });
```

### 公网/跨网段部署

需在服务器或前置代理上配置以下内容：

1. **防火墙放行** WebSocket 端口（默认 8080）和视频流端口（默认 8554/UDP）。
2. **CORS 配置**：若前端页面与 DTS 不同源，需在服务端响应头中添加：
   ```
   Access-Control-Allow-Origin: *
   ```
3. **HTTPS 页面下**必须使用 `wss://`（WSS）协议，服务端需配置 SSL 证书。

---

## 多实例部署

一台服务器可运行多个 DTS 实例（受 GPU 显存限制），每个实例监听不同端口：

```js
// 实例 1
const player1 = new DigitalTwinPlayer('192.168.1.100:8080', { domId: 'view1', ... });

// 实例 2（不同端口）
const player2 = new DigitalTwinPlayer('192.168.1.100:8081', { domId: 'view2', ... });
```

多实例同屏渲染的完整示例参见 [多视频同屏渲染](/docs/tutorials/multi-video)。

---

## 前端部署注意事项

- 前端页面推荐部署在 **HTTPS** 域名下，避免混合内容（Mixed Content）拦截。
- SDK 文件 `ac.min.js` 建议放在**与业务代码同域**的静态服务器上，避免跨域问题。
- 对于 Vue / React / Angular 等 SPA 工程，参见 [框架集成指南](/docs/tutorials/framework-integration)。

---

## 常见部署问题

**视频流无法播放（黑屏）**：检查服务器防火墙是否放行了 UDP 视频流端口。

**WebSocket 连接失败（HTTPS 页面）**：HTTPS 页面不能使用 `ws://`，必须升级为 `wss://`，同时服务端配置 SSL。

**延迟高**：检查服务器上行带宽，确认编码器配置（建议 H.264 硬编码）。
