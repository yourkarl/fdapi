# DTS SDK 开发者平台升级设计方案

> 对标 Google Maps Platform 与 CesiumJS 生态，2026-07-10
> 前置：《文档站优化建议报告》已覆盖文档内容与工程质量层面；本方案聚焦**三大件（教程 / API 文档 / 调试台）之外的平台能力缺口**。

## 一、评估框架：开发者旅程

成熟 SDK 平台覆盖六个环节：**发现 → 学习 → 构建 → 调试 → 交付 → 运维**。

现状：学习（教程 18 篇 + 行业方案 17 篇）、构建参考（API 100 篇）、调试（sandbox）三个中间环节做得扎实，甚至有超出对标品的部分（AI 助手、面向 AI 的 Skill 结构、llms.txt）。缺口集中在**两端**：

- 前端缺"发现与起步"：SDK 如何获取、如何被现代前端工程消费（npm/loader/脚手架/框架封装）；
- 后端缺"交付与运维"：版本治理、兼容矩阵、数据接入规范、协议规范、社区反馈闭环。

## 二、差距矩阵

| 能力 | Google Maps Platform | CesiumJS | DTS 现状 |
|------|---------------------|----------|----------|
| SDK 分发 | CDN loader + `@googlemaps/js-api-loader` npm 包 | `cesium` npm 包 + CDN | 手动拷贝 `ac.min.js` ✗ |
| 类型系统 | `@types/google.maps` 随包 | 内置 d.ts | 有 d.ts 但需手动下载 △ |
| 框架封装 | react-google-maps 等官方/半官方库 | resium、vue-cesium（社区成熟） | 仅教程示例，无封装包 ✗ |
| 离线/Mock 开发 | 静态 key 即可跑 | 纯前端库，天然离线 | 必须连真实云渲染实例 ✗ |
| 数据规范 | — | 3D Tiles 开放标准 + ion 数据管线文档 | 零散提及，无专门板块 ✗ |
| 协议参考 | REST/gRPC reference | — | fdapi WebSocket 协议无文档 ✗ |
| 版本治理 | 版本渠道 + 12 个月弃用政策 | 月度版本 + CHANGES.md | 按日期流水账，无 semver/政策 △ |
| 示例中心 | 独立 Samples 站 | Sandcastle 画廊 | 示例埋在调试台内 △ |
| 社区反馈 | Issue Tracker + SO 标签 | 官方论坛 | 无入口 ✗ |
| 案例展示 | Customer stories | Cesium Stories/User stories | 行业方案教程（文字版）△ |

## 三、八个建议模块（按投入产出排序）

### M1 · SDK 分发与加载体系（最高优先级）

**问题**：hello-world 教程要求从内网地址拷贝 `ac.min.js`，且文档中 12 个文件硬编码 `192.168.x.x` 内网 IP。现代前端工程（Vite/Webpack + TS）消费全局 script 的体验与 2015 年无异。

**设计**：
1. 发布 `@dts/fdapi-loader` npm 包（仿 `@googlemaps/js-api-loader`，约 200 行）：
   ```js
   import { DTSLoader } from '@dts/fdapi-loader';
   const api = await new DTSLoader({ host, iid, password }).load();
   ```
   内部动态注入 `ac.min.js`、等待 `checkApiReady`、返回类型化的 fdapi 实例。d.ts 与包捆绑发布，`npm i` 即获智能提示（现有 `gen_dts.py` 产物直接进包）。
2. 云渲染服务侧固定 SDK 静态路由（如 `https://<cloud-host>/sdk/v7.1/ac.min.js`），文档统一以占位符 `<cloud-host>` 书写，消灭内网 IP。
3. `create-dts-app` 脚手架模板仓库：vanilla / React / Vue 三套模板，含 loader、d.ts、视频流容器、事件订阅样板。

### M2 · Mock 层与演示模式

**问题**：没有云渲染实例的开发者什么都跑不了，是获客与教学的最大瓶颈（Google 用 demo key、Cesium 纯前端可跑，均无此门槛）。

**设计**：`@dts/fdapi-mock`，两级能力：
1. **协议级 Mock**：拦截 WebSocket，按 API 签名返回合理的模拟数据（`marker.add` 返回成功 + id；`camera.get` 返回记录的相机状态）。数据源现成——调试台"执行JSON日志回放"已具备录制/回放雏形，将真实实例的请求-响应对录制为 fixture 包。
2. **演示模式**：调试台新增"无实例体验"开关——预录的视频流片段 + Mock 应答联动，让官网访客零门槛体验完整调用闭环。
CI 附带收益：教程代码可在 Mock 上做自动化冒烟测试，文档示例从"人肉保真"变"CI 保真"。

### M3 · 数据接入与格式指南（对标 Cesium 3D Tiles / ion 文档）

**问题**：数字孪生项目 60% 的工作量在数据侧，而文档对"什么数据、什么格式、怎么进场景"没有系统回答（平台明明已支持 Cesium3DTileset、GeoJSON、SHP、地形影像等）。

**设计**：新增顶层板块「数据指南」（约 8 篇）：支持格式总矩阵（倾斜摄影/BIM/点云/矢量/影像/地形 × 接入方式 × 对应 API）；坐标系配准实操（EPSG 选择、偏移调校，衔接现有 coordinates 教程）；3D Tiles 服务发布与 `cesium3DTileset` 加载调优；ACP 工程资产组织与 `projectAssetCount` 盘点；大场景 LOD 与流式加载策略；数据体检清单（常见崩溃/漂移/闪面归因）。

### M4 · fdapi 协议规范（Wire Protocol Reference）

**问题**：fdapi 本质是 WebSocket JSON-RPC，但协议层零文档。排错时开发者面对 DevTools 里的帧束手无策；非 JS 端（Unity/Android/服务端）想接入无从下手。

**设计**：一篇严谨的协议参考（对标 Google 的 REST reference 严谨度）：连接与鉴权握手时序、消息帧结构（请求/响应/事件推送/日志）、错误帧与错误码、心跳与断线重连语义、多实例并发约束。此文档同时是 M2 Mock 层和未来多语言 SDK 的实现依据。

### M5 · 框架生态封装

**设计**：`@dts/react`（对标 resium）：`<DTSPlayer>` 容器组件 + `useFdapi`/`useDTSEvent`/`useCamera` hooks，处理好 React 18 严格模式双挂载、实例生命周期、事件解绑三个坑（现有 framework-integration 教程已总结经验，直接产品化）。Vue 侧提供 composables 等价物。先发 alpha 收集反馈，不必一步到位。

### M6 · 示例中心（从调试台反哺）

前报告已提出，此处给实现路径：`real-examples.js`（1652 例）已含分类树，新建 `/examples` 路由渲染成可搜索卡片墙，每卡"看代码 / 在调试台运行（携 Mock 回退）"，API 文档页侧栏自动挂同类示例。纯前端工作量约 3 人日。

### M7 · 版本治理

1. `revision-history`（2634 行日期流水账）重构为 semver 锚定的 CHANGELOG：每条目归属版本号，分「新增/变更/废弃/修复」，废弃项标注移除时间表；
2. 发布《弃用政策》：承诺废弃 API 保留期（建议 ≥2 个次版本），对标 Google 12 个月政策；
3. 兼容矩阵页：SDK 版本 × Cloud 服务版本 × 浏览器支持；
4. SDK 7.2 发布时启用 Docusaurus versioning，新旧版文档并存（对标高德 v1.4/v2.0 双版本站）。

### M8 · 社区与运营面

每页「有帮助？」反馈组件 + GitHub issue 模板直达；GitHub Discussions 作轻量论坛（零成本起步）；Showcase 案例墙（行业方案教程已有素材，补真实项目截图/视频即可）；云渲染服务 status page（实例管理页已有基础，加历史可用性即可）。

## 四、信息架构调整

导航从「开发教程 / API 文档 / 在线调试」三项扩展为：

**学习**（教程 + Codelab 式实战） · **参考**（API + 类型 + 协议 + 错误码） · **数据**（M3 数据指南） · **示例**（M6 示例中心） · **生态**（loader/react/mock 包 + 脚手架 + MCP/Skill） · **资源**（CHANGELOG + 兼容矩阵 + 社区 + Showcase）

## 五、路线图与投入估算

| 阶段 | 内容 | 估算 |
|------|------|------|
| 第 1 月 | M1 loader 包 + 文档去内网 IP + M6 示例中心 + M7 CHANGELOG 重构 | ~4 人周 |
| 第 2-3 月 | M2 Mock/演示模式 + M3 数据指南 + M8 反馈组件与 Discussions | ~8 人周 |
| 第 4-6 月 | M4 协议规范 + M5 React/Vue 封装 alpha + M7 versioning + 脚手架 | ~10 人周 |

## 六、本次深查发现的立即修复项

1. **12 个文档文件硬编码 `192.168.x.x` 内网 IP**（hello-world、settings、weather 等）：统一替换为 `<cloud-host>` 占位符并在 hello-world 顶部解释取值——既是安全卫生，也是 M1 的前置。
2. `revision-history.md` 中同样存在内网地址（第 2362 行），一并处理。
