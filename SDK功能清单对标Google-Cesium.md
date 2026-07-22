# fdapi SDK 功能清单对标报告（vs Google Maps Platform / CesiumJS）

> 2026-07-14 · 依据：`static/dts-sdk.d.ts`（70 命名空间 / 1242 方法）与 133 篇 API 文档的静态盘点；Google Maps Platform、CesiumJS 现行能力清单来自公开文档检索（见文末 Sources）。
> 定位说明：fdapi 是**云渲染数字孪生 SDK**（UE 渲染、WebSocket 协议、二次开发导向），Google Maps Platform 是**互联网地图云服务矩阵**，CesiumJS 是**纯前端开源三维引擎**。三者赛道不同，逐条对比只为找差距，不代表 fdapi 应该三者都做。

## 一、fdapi 现有能力清单（按文档分类）

| 分类 | 覆盖能力 |
|------|---------|
| 快速上手 | DigitalTwinAPI 入口、DigitalTwinPlayer 播放器 |
| 相机操作 | 相机设置/飞行、导览路线与关键帧（CameraTour）、动画导航 |
| 图层操作 | 3dt 底座（TileLayer）、Cesium 3D Tiles、GeoJSON、Shapefile、WMTS/WMS/MVT/TMS 影像与地形、图层树、视频融合 |
| 模型操作 | 自定义模型（CustomObject）、程序化网格（CustomMesh）、3D 高斯泼溅 |
| 场景标记 | Marker、Marker3D、CustomTag |
| 矢量图形 | 折线/多边形/拉伸体/引导线/OD线/拓扑线/管线放样/向量场 |
| 覆盖物 | 热力图（2D/3D）、高亮区域、光源、全景、贴花、辐射点、视频投影 |
| 测量绘制 | 标绘（Plot）、编辑辅助（EditHelper） |
| 分析工具 | 测距/测面/天际线/通视/坡度/剖切/河道断面、土方量算 |
| 事件系统 | 点击/悬停/相机等事件回调 |
| 系统设置 | 场景设置、设置面板 |
| 环境天气 | 天气系统、杂项设置 |
| 信号仿真 | 天线方向图、波束、信号波 |
| 交通仿真 | 车辆(x2)、无人机、卫星、列车、触发器、交通流仿真 |
| 战场仿真 | 战场态势、标绘 |
| 水文仿真 | 11 个水利对象（一维/二维水动力、洪水淹没、流体、SPH 等） |
| 海洋气象仿真 | 海岸线、海洋热力 |
| 有限元仿真 | 有限元(x2) |
| 辅助工具 | 坐标转换、外部工具 |

行业垂直仿真能力（水利 11 类、信号 3 类、交通 7 类、战场 2 类、有限元 2 类）是 fdapi 相对两个对标对象**最大的差异化优势**——Google Maps 和 CesiumJS 均不做这类专业仿真，这部分是国产数字孪生赛道的护城河，评审应予以保留和强化，而非对标抹平。

## 二、能力缺口（按影响面排序）

### G1 · 地理编码 / POI 检索 / 路径规划 —— 完全空白 ⚠⚠⚠

静态检索结果：全站 0 处 geocoding、0 处 routing/directions、0 处独立 POI 搜索接口。现有 `marker`/`markerLayer` 只是"渲染点位"，不是"检索地点"。

对标：Google Maps Platform 的 Geocoding API（地址⇄坐标互转）、Places API（POI 搜索/详情/自动完成）、Routes API（路径规划/ETA）是其核心产品线三大支柱。

**影响**：任何"输入地址定位""搜索附近设施""算一条巡检路线"的业务需求，fdapi 使用者必须自己接入高德/百度/开源 Nominatim 等第三方服务再喂坐标给 fdapi。这是纯粹的能力空白，不是文档没写。

**建议**：不建议 fdapi 自建地图数据底座（成本不现实），但应该：一，官方教程给出"如何接入第三方地理编码/路径规划服务并把结果渲染进 fdapi"的标准范式（当前 `tutorials/coordinates` 只讲坐标系不讲检索）；二，评估与高德/腾讯地图开放平台做官方联名适配层，写进"实战配方"。

### G2 · 时间维度数据引擎（CZML 等价物）缺失 ⚠⚠

静态检索：0 处 CZML，"时间轴/Clock"仅 3 处提及且分散在水动力模型的 `startPlay/setTime`（各类各写一套）。

对标：CesiumJS 的核心心智模型是"实体 + 时间"，CZML 是标准化的时间动态数据格式，任何实体（位置、姿态、颜色）都可挂时间轴插值，配合全局 Clock/Timeline 部件统一驱动。

**影响**：fdapi 现状是每个仿真类（水动力、战场、导览）各自发明一套时间播放接口（`startPlay`/`setTime`/`CameraTour` 关键帧各不相同），开发者要学 N 套时间控制语法，无法用一个"当前时刻"驱动全场景（如"拖动时间轴，同时看到车辆位置、水位、天气都变化"）。

**建议**：中期抽象一个全局 `fdapi.clock`（当前时间、播放速率、时间范围），现有各仿真类的 `setTime` 对齐订阅它而非各自为政。这是一次内部重构，不需要对外暴露 CZML 格式本身。

### G3 · 通用几何图元库 vs 领域专用对象 ⚠⚠

CesiumJS 的 Entity API 提供一套通用图元（Point/Billboard/Polyline/Polygon/Ellipse/Wall/Corridor/Cylinder...）可自由组合表达任意语义；fdapi 则是"每个业务场景一个专用类"（`odline` 表迁徙、`guideLine` 表路径、`splineMesh` 表管线）。

**影响**：专用类对业务场景友好（Skill 段可以精准描述"OD线用于表现迁徙"），但通用几何缺失意味着遇到"专用类没预料到的可视化需求"时无路可走——比如想画一个"墙体"（Wall，常见于淹没边界/虚拟围栏可视化）、"走廊"（Corridor，常见于道路缓冲区），现有矢量家族里没有对应物，只能拿 Polygon3D 硬凑。

**建议**：非改设计不可，是补齐一个"通用几何"小分类（Wall、Corridor、Ellipse/Circle3D）作为专用类之外的兜底，成本远低于重做整个矢量体系。

### G4 · 剖切/裁剪能力未通用化 ⚠

现状：剖切能力挂在 `tools.showClipPanel`（UI 面板触发）和 `tileLayer.enableClip`（单个图层），不是可独立创建、可复用于任意图层组合的通用"裁剪平面/裁剪体"对象。

对标：CesiumJS 的 `ClippingPlaneCollection` 是独立实体，可挂到任意 Tileset/Model 甚至地球本身，支持多平面布尔组合。

**建议**：中期把裁剪能力从"tools 面板触发的操作"提升为"可编程创建、可挂载到任意图层的对象"，非破坏性增强（新增 API，旧的 `enableClip`/`showClipPanel` 保留）。

### G5 · 点云未独立建模 ⚠

点云能力（`highlightPoints`/`setPointCloudSize`/`setPointCloudStyle`）全部挂在 `tileLayer` 下作为附属方法，不是独立对象。对标 Cesium 的 3D Tiles 点云是与 mesh tileset 同级的一等公民，有独立的样式表达式语言（3D Tiles Styling）。

**影响**：当前只能通过属性字段做单一维度高亮，无法表达"根据高程 × 强度 × 分类号三维度组合渲染"这类点云专业需求（测绘/管线巡检场景常见）。

**建议**：评估是否值得为点云独立开一个轻量样式表达式（`condition: value 数组`已在部分类里出现雏形，见 hydro 参数表的 colorStops 结构，可复用）。

### G6 · 无障碍与国际化 —— 未见证据 ⚠

全站 0 处提及 accessibility/键盘导航；`i18n.locales` 仅 `zh-Hans` 一种。Google Maps Platform 有明确的无障碍规范（键盘可达、屏幕阅读器），这在政企项目的信创/无障碍合规审查中可能是硬指标。

**建议**：视目标客户群决定优先级——若面向政府项目，无障碍往往是采购硬性条款，建议至少评估现状差距。

## 三、护城河能力（不是缺口，是应保留和讲清楚的优势）

- **行业仿真广度**：水利 11 类 + 信号 3 类 + 交通 7 类 + 有限元 2 类 + 战场 2 类，这是 Google/Cesium 完全不覆盖的领域，是 GIS+BIM 数字孪生赛道的核心卖点，建议在市场物料/首页导航中比现在更突出（当前首页导航"空间智能工具"入口不足以体现这一优势）。
- **私有 pak 资产管线**：UE 蓝图 Actor 直接实例化驱动，动画/物理/交互能力上限高于 Cesium 的 glTF-only 模型加载，这是"云渲染"路线相对"纯前端渲染"路线的先天优势，应保持。
- **AI 就绪的文档结构**（Skill 段 + llms.txt + MCP Server）：目前领先于 Google/Cesium 官方文档，见此前《文档站优化建议报告》，此处不重复。

## 四、优先级建议

| 优先级 | 事项 | 性质 |
|--------|------|------|
| P0（教程可解决，无需改 SDK） | G1 补"接入第三方地理编码/路径规划"实战配方 | 纯文档 |
| P1 | G3 补通用几何图元小分类（Wall/Corridor/Circle3D） | 增量 API |
| P1 | G4 裁剪能力独立对象化 | 增量 API |
| P2 | G2 全局 Clock 抽象，统一各仿真类时间驱动 | 内部重构 |
| P2 | G5 点云独立建模 + 样式表达式 | 增量 API |
| 视客户群决定 | G6 无障碍与 i18n | 依赖商业判断 |

## P0 执行结果（2026-07-14）

G1（补"接入第三方地理编码/路径规划"实战配方）已完成，纯文档、不改 SDK：

新增 `docs/tutorials/recipes.md` 「配方四：接入第三方地理编码 / POI 检索与路径规划」，含两段可运行代码——地址/POI 检索后渲染为标注、起终点路径规划后绘制路线，并给出安全提醒（Key 不应在浏览器端暴露，应走后端代理）。

**过程中的意外收获**：核实 API 细节时发现 `marker.add`/`polyline.add` 等对象的 `coordinateType` 参数**本身就内置了 GCJ02/BD09 → WGS84/投影的纠偏转换**（取值 2/3），这意味着接入高德/腾讯/百度地图的检索结果时**不需要手写纠偏算法或额外转换步骤**，直接把第三方坐标和对应 `coordinateType` 传给 fdapi 即可——这是比最初设想更优的接入路径，已同步更新进 `coordinates.md` 坐标转换教程。

**顺带修复的历史遗留 bug（同一批"文档臆造 API"事故的新样本）**：
- `coordinates.md`、`faq.md` 两处的坐标转换代码使用了不存在的方法名 `pcsToGcs`/`gcsToPcs`/`screenToWorld`/`worldToScreen`，真实名称是 `gcs2pcs`/`pcs2gcs`/`screen2World`/`world2Screen`（且参数形态不同：后两者是逐个数字参数而非数组）；
- `faq.md` 引用了不存在的 `fdapi.coordType` 属性和 `marker.remove()` 方法（真实为 `marker.delete()`）；
- 原配方草稿一度沿用了同样臆造的 `camera.lookAt({coordinate, distance})` 对象参数和 `polyline.add` 的 `width`/`showArrow` 参数，均已对照 `camera.md`/`polyline.md`/`types.md`（`PolylineStyle` 枚举）改正为真实签名后才定稿。

这进一步印证了评审意见里提出的治理建议："契约先行，反转生成方向"——教程类文档里的 API 调用目前无人做机器校验，全靠人工/AI 逐条对照源码核实，这次又是靠该动作才没有把第 N 个臆造 API 写进文档。

## Sources

- [Photorealistic 3D Tiles overview](https://developers.google.com/maps/documentation/tile/3d-tiles-overview)
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/tile)
- [2D, 3D, and Street View Map Tiles - Google Maps Platform](https://mapsplatform.google.com/maps-products/map-tiles/)
- [CesiumJS Features Checklist · CesiumGS/cesium Wiki](https://github.com/CesiumGS/cesium/wiki/CesiumJS-Features-Checklist)
- [CesiumJS – Cesium](https://cesium.com/platform/cesiumjs/)
- [GitHub - CesiumGS/cesium](https://github.com/CesiumGS/cesium)
