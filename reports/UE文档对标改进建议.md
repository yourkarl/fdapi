# UE / Google Maps / Cesium 对标 —— 文档改进建议

> 前几轮报告已覆盖功能对标（`SDK功能清单对标Google-Cesium.md`）、API 设计（`fdapi-API设计评审意见.md`）、平台化路线（`SDK开发者平台升级设计方案.md`）、工程质量（`文档站优化建议报告.md`）。本轮只记录这些报告未触及的新发现：**UE 渲染引擎相关的"桥接层"文档**，这是 DTS 区别于 Cesium/Google Maps 的独特部分（后两者不涉及游戏引擎桥接），却是当前文档体系最薄弱的一块。

## 一、UE 桥接机制：文档分散且无入口教程

实测走查（callBPFunction/BPFuncParamType/材质参数/Pak资产/多视口）发现的具体问题：

**1. 蓝图函数调用（`callBPFunction`）文档在 4 个类里逐字重复**：`info-tree.md`、`marker3d.md`、`custom-object.md`、`satellite.md` 参数表和示例完全相同。UE 官方文档从不在每个 Actor 页面重复讲 Blueprint Communication，而是统一收口到一篇手册、各处链接引用。建议：保留一处权威定义（`info-tree.md` 或新建独立页），其余三处改为链接引用。

**2. 缺一篇端到端的"蓝图函数集成"教程**：现状是每个类文档只给"调用示例"，从没有讲完整链路——UE 侧怎么建可调用的蓝图函数、打包 pak、JS 侧 `BPFuncParamType` 每种类型怎么映射、参数顺序不对时的报错长什么样、返回值怎么解析。这正是 UE 官方 Blueprint 教程最擅长的"端到端可复现步骤"，DTS 目前没有对应物。

**3. 材质自定义参数（`scalarParameters`/`vectorParameters`）只给了调用代码，没讲参数从哪来**：UE 材质实例文档有完整链路图解（声明 Parameter → 编译进材质实例 → 外部查询/覆盖）。DTS 文档里 `getMaterial()` 只是 `custom-object.md` 里的一行代码，没有独立说明返回值结构，也没讲清楚"我怎么知道这个模型的材质有哪些可调参数"。这是新手最容易卡住的一步。

**4. Pak 资产管线没有统一教程，散落在 5+ 个文件**：`resources.md` 只讲 `@path:` 协议和外部 URL，只字未提 pak 打包/挂载；`assetPath`、`pakFilePath`、`reloadPak`、`setPakFile` 分散在 `custom-object.md`、`marker.md`、`vehicle.md`、`settings.md`、`battlefield-simulation.md` 里各写一遍。建议参照 UE"Packaging Projects"文档模式，在 `resources.md` 或新建 `tutorials/asset-pipeline.md` 里收拢成一篇：UE 工程 → 打包 pak → 路径规范 → 动态挂载/重载 → 排障。

**5. `performance.md` 缺 UE 原生性能词汇**：已提到 LOD，但 Nanite、Draw Call、遮挡剔除（`pointOcclusionCull`/`setOcclusionCull`）都只是接口层面出现，没有概念解释。DTS 的目标开发者相当一部分有 UE 背景，这些术语是他们已有的心智模型，借力类比能显著缩短学习曲线，目前是被浪费的机会。

## 二、文档信息架构：可借鉴 Google Maps / Cesium 的地方

**概念页 vs 参考页分层不够**：Google Maps Platform 文档是"概念（Concepts）+ 参考（Reference）+ 指南（Guides）+ 示例库（Samples）"四层，每层互链。DTS 目前概念性内容（坐标系、UE 集成心智模型）都是穿插在具体教程里讲一遍，没有独立、可被搜索/AI 直接命中的"概念词条页"。上述蓝图/材质/pak 三块正好适合补成这种独立概念页。

**API 文档到可运行示例的跳转粒度太粗**：Cesium 每个类的文档页都链到对应的 Sandcastle demo（该方法级别的可运行示例）。DTS 已有 `/sandbox` 在线调试台，但目前从类文档跳转过去是"整站入口"，不是"这个方法对应的示例直接打开"。可考虑给高频/复杂方法生成深链接（如 `/sandbox?example=tileLayer.addSymbols`）。

**双轨读者画像可以显式区分**：UE 文档习惯给 C++ 和 Blueprint 用户分轨阅读。DTS 面对的也是两类人——纯前端开发者 vs 有 UE 背景的开发者。涉及蓝图/材质/pak 的页面可以加一个"UE 开发者速览"折叠块，让有背景的人跳过基础解释直接看参数映射。

## 三、优先级

| 优先级 | 事项 |
|---|---|
| P0 | 收敛 `callBPFunction` 四处重复文档为单一权威页 |
| P0 | 新增"蓝图函数集成"端到端教程 |
| P1 | 新增/扩写"Pak 资产管线"教程，收拢现有分散内容 |
| P1 | 补全材质自定义参数教程 + `getMaterial()` 独立文档 |
| P2 | `performance.md` 补 UE 性能概念速查（Nanite/Draw Call） |
| P2 | 坐标系、UE 集成心智模型独立成概念页 |
| P2 | 高频方法链接 sandbox 深链接 |
