---
title: DTS MCP Server 使用说明
slug: /mcp-guide
description: "DTS MCP Server 的安装与使用说明。"
---

# DTS MCP Server 使用说明

**DTS MCP Server** 基于 [Model Context Protocol](https://modelcontextprotocol.io/) 协议，将数字孪生场景的核心能力（相机、标注、图层、仿真等）封装为标准工具，供支持 MCP 的 AI 客户端（如 Claude Desktop、Cursor 等）直接调用。

## 快速开始

### 1. 下载并解压

从[空间智能工具页面](/fdapi/spatial-tools)下载 `dts-mcp-server.zip`，解压到本地目录。

### 2. 配置 MCP 客户端

在你的 AI 客户端的 MCP 配置文件中添加以下内容：

```json
{
  "mcpServers": {
    "dts": {
      "command": "node",
      "args": ["path/to/dts-mcp-server/index.js"],
      "env": {
        "DTS_HOST": "your-dts-host:port"
      }
    }
  }
}
```

将 `path/to/dts-mcp-server/index.js` 替换为实际解压路径，`your-dts-host:port` 替换为 DTS 云渲染服务地址。

### 3. 连接场景并对话

配置完成后，AI 客户端即可通过自然语言直接操作数字孪生场景：

- "把相机移动到北京天安门"
- "在坐标 (116.39, 39.91) 添加一个红色标注"
- "隐藏所有交通图层"

## 可用工具列表

| 工具名 | 说明 |
| --- | --- |
| `camera_fly_to` | 相机飞行到指定坐标 |
| `add_marker` | 在场景中添加标注 |
| `toggle_layer` | 显示 / 隐藏图层 |
| `run_simulation` | 启动仿真 |

> 更多工具及参数说明请参见解压包内的 `README.md`。

## 系统要求

- Node.js 18+
- 已部署并可访问的 DTS 云渲染服务
- 支持 MCP 协议的 AI 客户端
