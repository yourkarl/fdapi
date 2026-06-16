---
title: MCP Server 使用说明
slug: /mcp-guide
description: "DTS Cloud 数字孪生 MCP 服务器的部署与使用说明，让 AI 通过标准 MCP 协议查询并操控三维场景。"
---

# dts-cloud-mcp

一个 **Model Context Protocol (MCP) 服务器**,让 AI 助手(如 Claude)能够查询并操控 **DTS(Digital Twin Scene,数字孪生场景)** 云渲染引擎。

DTS 的 SDK(`DigitalTwinPlayer`)是浏览器端 JavaScript SDK,无法在 Node 后端直接调用。本服务器用 **Puppeteer 启动无头浏览器**,在页面里加载 DTS SDK、建立到 DTS Cloud 实例的连接,再把 AI 发来的指令转发给引擎执行——相当于 AI 与 DTS Cloud 之间的桥梁。

---

## 架构

```
┌────────────┐   MCP/stdio   ┌─────────────────────────────┐
│  AI 客户端  │ ────────────▶ │   dts-cloud-mcp (Node)      │
│  (Claude)  │ ◀──────────── │   src/index.js              │
└────────────┘   工具结果      └──────────────┬──────────────┘
                                              │
                  ┌───────────────────────────┼───────────────────────────┐
                  │                           │                           │
            REST (http.get)            Puppeteer 无头浏览器          按需抓取文档
            /manage/instance           DigitalTwinPlayer            /locale/zh/doc/*.html
            /manage/instance/free      → window.fdapi               /locale/zh/manager.html
                  │                     → window._dtsCall()          api_examples.js
                  ▼                           ▼                           ▼
            ┌──────────────────────────────────────────────────────────────┐
            │                     DTS Cloud 服务器                           │
            │            渲染实例 + REST 管理接口 + 在线 API 文档              │
            └──────────────────────────────────────────────────────────────┘
```

### 源码结构(约 1700 行)

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/index.js` | ~940 | MCP 服务器主体:7 个工具、REST 调用、Puppeteer 连接与 API 转发 |
| `src/doc-parser.js` | ~700 | 解析 DTS 在线 API 文档(JSDoc HTML)与示例代码;内置 76 个 API 类索引 |
| `src/validator.js` | ~100 | 调用前的参数校验(必填项、嵌套属性)与默认值推断 |

---

## 工作流程

1. **连接** —— `dts_connect` 先通过 REST(`/manage/instance`)列出可用渲染实例;单实例自动选用,多实例可让用户选择或 `autoSelect` 自动挑一个空闲实例。
2. **建立会话** —— Puppeteer 打开实例页面 → 注入 DTS SDK(`/libac`)→ 初始化 `DigitalTwinPlayer` 并等待 `onReady`(带 3 次重试,应对慢启动实例)→ 注入 `window._dtsCall` 辅助函数。
3. **查文档** —— `dts_doc` / `dts_api_example` 按需从云端抓取类文档和真实示例代码,并缓存。
4. **执行** —— `dts_call` 把 `{class, method, params}` 在浏览器上下文里转成真正的 `fdapi.<class>.<method>(...)` 调用并返回结果。

---

## MCP 工具

| 工具 | 作用 |
|------|------|
| `dts_connect` | 启动无头浏览器并连接到 DTS Cloud 渲染实例。可指定 `iid`,或列出实例供选择,或 `autoSelect` 自动挑选空闲实例。 |
| `dts_manager_doc` | 抓取并解析 DTS Cloud 管理 API 文档(`/locale/zh/manager.html`),列出管理类 REST/WebSocket 接口,支持 `search` 关键字过滤。 |
| `dts_disconnect` | 关闭浏览器、清理资源。 |
| `dts_status` | 返回当前连接状态、服务器信息、SDK 版本、坐标系、已缓存的文档类数。 |
| `dts_doc` | 查询某个 API 类/方法的文档(从云端 `/locale/zh/doc/{Class}.html` 抓取)。省略 `class` 或传 `list`/`help` 列出全部 76 个类。 |
| `dts_api_example` | 获取某个类+方法的真实示例代码(来自 DTS 调试页的 `api_examples.js`)。建议在 `dts_call` 前先看示例。 |
| `dts_call` | 通过浏览器连接执行 DTS SDK API 调用。 |

### 参数约定

- **新增/更新类方法**:`{"class":"marker","method":"add","params":{"data":[{...}]}}` —— 负载放在 `data` 键里。
- **位置参数类方法**:`{"class":"marker","method":"focusAll","params":{"distance":1000,"flyTime":2}}` —— 按对象键的顺序作为位置参数传入。
- **颜色值**:DTS 使用 RGBA 数组 `[R,G,B,A]`,每个通道为 `0~1` 浮点数(原始 RGB 除以 255)。例:红=`[1,0,0,1]`,蓝=`[0,0,1,1]`,白=`[1,1,1,1]`。**不要**用 `"Color.Red"` 这类字符串,API 无法解析。

---

## 安装与运行

```bash
npm install
npm start            # 等价于 node src/index.js,以 stdio 方式启动 MCP 服务器
```

依赖:`@modelcontextprotocol/sdk`、`puppeteer`、`zod`。

浏览器自动探测顺序:环境变量 `PUPPETEER_CHROME_PATH` 优先,其次按操作系统扫描 Edge/Chrome/Brave 的常见安装路径(Windows / macOS / Linux),Linux/macOS 还会用 `which` 在 `PATH` 中查找。

### 作为 MCP 服务器接入(示例)

```json
{
  "mcpServers": {
    "dts-cloud": {
      "command": "node",
      "args": ["src/index.js"],
      "env": { "PUPPETEER_CHROME_PATH": "C:/Program Files/Google/Chrome/Application/chrome.exe" }
    }
  }
}
```

典型对话流程:`dts_connect`(连接)→ `dts_doc`(查方法签名)→ `dts_api_example`(看示例)→ `dts_call`(执行)→ `dts_disconnect`。

---

## 代码审查记录

### 已修复

- **跨服务器缓存失效**:`docIndex`(文档)与 `examplesCache`(示例)原本是全局缓存且从不失效。切换到另一台 DTS 服务器时会返回上一台服务器的陈旧文档/示例。现已让两者随目标 `host:port` 变化自动清空,并在 `dts_connect` 切换服务器时一并重置。
- **清理遗留死代码**:删除了 `doc-parser.js` 中基于本地 Markdown 文件、运行时从未调用的解析函数(`buildDocIndex`、`parseMethodDoc`、`parseClassDoc` 及相关辅助函数)以及随之不再需要的 `fs`/`path` 引用。文档现统一从 DTS Cloud HTML 在线获取。

### 仍需注意(未改动)

- **位置参数依赖键顺序**:`_dtsCall` 用 `Object.values(params)` 推断位置参数顺序,依赖调用方对象键的插入顺序。键序错乱会导致实参错位。
- **缺少管理接口鉴权**:`restGet` 只做 GET;管理文档中标注 "需登录" 的接口(需先 `POST /manage/login`)目前不支持。
- **HTML 解析较脆弱**:`doc-parser.js` 大量用正则解析 JSDoc HTML,对文档结构变化敏感。
- **结果截断**:`dts_call` 返回值 `slice(0, 30000)` 在超长时会产生被截断的非法 JSON 字符串(仅作预览,通常无碍)。
- **`--no-sandbox`**:无头浏览器以 `--no-sandbox` 启动,常见做法,但在不受信任环境中需评估安全影响。

---

## 许可证

MIT License。
