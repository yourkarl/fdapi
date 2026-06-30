---
title: 行业方案 · 交通产业数字孪生一张图
sidebar_label: 行业方案 · 交通一张图
description: "交通产业数字孪生一张图平台方案：公路大数据汇聚、数字化辅助决策（低空经济 / 监管分析）、GIS 一张图三大模块的功能点与 fdapi 接口对照、典型实现思路与性能要点。"
---

### 方案概述

交通产业数字孪生「一张图」平台围绕三大业务模块构建，均由飞渡 DTS 三维能力（`fdapi`）统一支撑：

1. **公路大数据汇聚与共享** —— 路桥 BIM 单体化、交通 IoT 车流仿真、数字化资料 / 资产管理。
2. **数字化辅助决策** —— 低空经济（无人机航线、空域管控、雷达信号）、公路数字化监管分析工具集。
3. **交通产业经济运行分析（GIS 一张图）** —— 多源底图与点位、空间分析、区域圈选统计。

下文给出各模块的「功能点 → fdapi 接口」对照与实现思路，便于二次开发选型。

---

## 一、公路大数据汇聚与共享

### 路桥模型属性数据查看

| 能力点 | fdapi 接口（类 / 方法） | 说明 |
|------|------------------------|------|
| 加载路桥模型 | `tileLayer.add` / `get` | 加载 3dt（倾斜 / BIM / 人工模型）图层，支持位置 / 旋转 / 缩放与样式 |
| 图层树与显隐 | `infoTree.get` / `setVisibility` / `show` / `hide` | 按目录树组织模型、分组显隐 |
| 点击拾取构件 | 事件 `LeftMouseButtonClick` | 返回 ObjectID、所属图层 Id、BoundsMin/Max、点击点坐标 |
| 取构件几何 / 包围盒 | `tileLayer.getObjectIDs` / `getActorInfo` | 返回 location、boundsMin/Max、rotation、scale |
| 取构件业务属性 | `tileLayer.getActorInfoFromDB` | 从 PG 空间库 / SDB 读取 BIM 构件详细属性（需先入库） |
| 高亮选中构件 | `highlightActor` / `highlightActorWithColor` / `unHighlightActor` | 单体化高亮，自定义颜色与线框 / 填充 |

### 交通车辆数字孪生（设备 IoT）

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 单车 / 车队建模驱动 | `vehicle` / `vehicle2` `.add` / `update` / `moveTo` | 逐车创建并沿车道行驶，设车型 / 速度 / 朝向 |
| 大规模交通仿真 | `trafficSimulation` `.add` / `update` / `updateBegin` / `updateEnd` | 十万级城市车辆仿真，按时刻 update 驱动 |
| 拥堵热力 / 标签 | `trafficSimulation.showHeatMap` / `showTextLabel` / `autoHighlight` | 以热力 / 标签表达实时拥堵与流量 |
| 实时驱动节奏 | 帧同步 `FrameTick` + `updateBegin` / `updateEnd` | 按 IoT 刷新频率批量提交，平滑过渡 |
| 相机跟随车辆 | `camera.follow` / `cancelFollow` | 跟随重点车辆 / 路段动态观察 |

### 数字化公路资料管理

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 资料关联模型 | `tileLayer.updateRecord` / `query` + `getActorInfoFromDB` | 养护 / 运营资料入 PG 空间库并按构件查询 |
| 落点标注 | `marker` / `marker3d` / `customTag` | 设施点位标注，承载文字与图标 |
| 点击弹窗展示 | `Marker.popupURL` / `popupSize` | 弹出 HTML 页面展示属性，支持自定义样式 / 视频 |
| 分组管理 | `groupId` + `infoTree` | 按公路 / 路段 / 资料类型分组显隐 |

---

## 公路资产构件清单（普通国省道）

公路资产按十大类组织，各类构件以车载 / 机载激光点云、低空航摄、BIM 示意等方式建模，并将属性字段图属分离入库（PG/SDB）。在 fdapi 中通过 `tileLayer.getActorInfoFromDB` 按构件查询这些属性，支撑资产管理与养护。

| 资产大类 | 主要构件（要素） |
|------|------|
| 路基与路面 | 路肩、防护工程、排水工程、车道、中央分隔带、路缘石 |
| 交叉工程 | 平面交叉、立体交叉 |
| 桥梁 | 上部结构、下部结构、附属结构 |
| 隧道 | 主体结构、附属设施 |
| 涵洞与渡口 | 涵洞、公路渡口 |
| 交通安全设施 | 交通标志、标线、防护设施、视线诱导、隔离设施、防眩设施、警示桩等 |
| 管理设施 | 监控、收费、广播、气象、交通信息、治超站、养护工区、泵站、信号灯等 |
| 服务设施 | 服务区、停车区、客运停靠站、加油 / 充电站、观景台等 |
| 机电设施 | 供配电、照明、通信、消防、通风、防雷等 |
| 绿化及其他 | 绿化工程、其他设施 |

> 各类构件的完整 BIM 属性字段（数据项 / 字段代码 / 类型 / 长度 / 必填）见 [公路资产 BIM 属性对照](/docs/tutorials/road-asset-attributes)。

---

## 二、数字化辅助决策

### 低空经济

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 无人机航道模拟 | `drone` `.add` / `moveTo` / `update` | 加载无人机并沿航道飞行，支持批量与第一视角 |
| 航线 / 空域体 | `polyline` / `polygon3d` / `splineMesh` / `guideLine` | 绘制三维航线、空域立体范围与航道带 |
| 空域管控触发 | `boxTrigger` | 长方体热区进 / 出检测，自动触发告警回调 |
| 信号 / 覆盖可视化 | `antenna` / `beam` / `signalWave` | 天线方向图、雷达 / 通信波束、信号扩散覆盖 |
| 实时气象同步 | `weather.setRainParam` / `setSnowParam` / `setDateTime` / `simulateTime` | 6 类气象仿真 + 24h 昼夜时光模拟 |
| 跟随无人机视角 | `camera.follow` / `cancelFollow` | 相机跟随无人机动态观察 |

### 公路数字化监管分析工具集

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 工程测量 | `plot.startDraw` / `stopDraw`、`editHelper`、枚举 `MeasurementMode` | 距离 / 面积 / 高度标绘测量，经 Measurement 事件回传 |
| 剖切分析 | `tileLayer.enableClip` / `disableClip`（事件 PlaneClipEdit / VolumeClipEdit） | 面 / 体剖切查看内部结构 |
| 空间分析 | `tools`（可视域 / 天际线 / 通视 / 淹没 / 日照 / 填挖方 / 坡度坡向 / 等高线） | 一行代码启动专业空间分析，配套专题图层与统计图表 |
| 时间昼夜 | `weather.setDateTime` / `simulateTime` | 24 小时光照、阴影、天空明暗推演 |
| 原始视点 | `camera.get` / `set` / `lookAt` / `enterWorld` | 保存与一键恢复初始机位 |
| 分屏比选 / 协同 | `misc.enterMultiViewportMode` / `setActiveViewport` / `setMultiviewportInteractSync`、`enterReportMode` | 双视口方案比选、远程同步鼠标、汇报导出 |
| 坐标转换 | `coord.gcs2pcs` / `pcs2gcs` / `screen2World` / `world2Screen` | 经纬度↔投影↔屏幕互转 |

---

## 三、交通产业经济运行分析（GIS 一张图）

### 一张图底图与点位

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 底图 / 地形 / 影像 | `globeTerrain` / `imageryLayer(2)` / `tileLayer` | 地形、影像与三维底图叠加 |
| 矢量边界 | `geoJSONLayer` / `shapeFileLayer` | 行政区划、园区边界等矢量面 / 线 |
| 产业 / 企业点位 | `marker` / `marker3d` / `markerLayer` / `customTag` | 批量点位，按产业类型分色、聚合、避让 |
| 点位批量加载 | `marker.add`（数组）+ `groupId` + `displayMode` | 海量点位批量添加、智能显示与分组 |

### GIS 空间分析

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 热力密度 | `heatMap` / `heatMap3D` | 按企业 / 产值 / 流量生成二 / 三维热力 |
| 产业分布 | 分类着色 `marker` + `highlightArea` + `geoJSONLayer` | 分色点位、区域高亮、园区面渲染 |
| 产业联系 / 流向 | `odLine` / `polyline` | 产业 OD、物流 / 产业链流向飞线 |
| 区域圈选统计 | `editHelper` 画范围 + 点在面内判断（射线法）+ 对象筛选 | 框选区域统计点位 / 构件并联动高亮 |
| 查询 / 缓冲分析 | `tools` / `queryOption` | 按条件 / 范围查询拾取，辅助布局优化 |

### 区域圈选典型流程

1. 启动多边形绘制（`editHelper`），左键打点、右键结束；
2. 捕获选区坐标，后台射线法判断构件 / 点位是否落在选区内（配合 `coord`）；
3. 命中对象批量高亮着色，未选中弱化显示；
4. 统计面板输出企业总数、道路里程、园区数量、区域总产值，并可导出 Excel；
5. 海量数据用 `updateBegin` / `updateEnd` 批量提交优化渲染。

---

## 接口能力总览

| 业务能力大类 | 核心 API 类 | 典型方法 / 事件 | 对应平台功能点 |
|------|------|------|------|
| 相机与视角控制 | Camera / CameraTour | `lookAt`、`set`、`get`、`enterWorld`、`follow`；CameraTour `add` / `play` | 动画导览、飞行器跟随、视点复位、方案比选同步 |
| 标注弹窗展示 | Marker / Marker3D / CustomTag | `add`、`update`、`popupURL`、`setText`、`focus` | 资产卡片、无人机平台弹窗、企业点位详情 |
| 三维 BIM 单体化 | TileLayer / Cesium3DTileset | `getObjectIDs`、`getActorInfo(FromDB)`、`hide/showActor`、`highlightActor`、`enableClip` | 路桥构件拾取、高亮、面 / 体剖切、X 光透视 |
| 矢量绘制工具 | Polyline / Polygon3D / ODLine / EditHelper / Plot | `add`、`editHelper.start/finish`、`plot.startDraw`、`updateBegin/End` | 航线绘制、面积距离测量、区域圈选、OD 飞线 |
| 交通 & 低空仿真 | Vehicle / TrafficSimulation / Drone / BoxTrigger / Antenna / Beam / SignalWave | `add`、`update`、`moveTo`、`showHeatMap`、进出触发 | 车流仿真、无人机模拟、空域告警、雷达信号 |
| 热力区域专题 | HeatMap / HeatMap3D / HighlightArea | `add`、`setStyle`、区域高亮 | 拥堵热力、产值热力、风险热力图 |
| 图层底图管理 | InfoTree / ImageryLayer / GeoJSONLayer / ShapeFileLayer / GlobeTerrain | `get`、`setVisibility`、`add` | 图层树、行政区划、卫星底图、设施分层 |
| 气象时间环境 | Weather | `setRainParam`、`setSnowParam`、`setDateTime`、`simulateTime` | 雨雪雾气象仿真、24h 昼夜时光 |
| 多视口演示 | Misc | `enterMultiViewportMode`、`setActiveViewport`、`enterReportMode` | 双视口方案比选、远程同步鼠标 |
| 坐标转换工具 | Coord / Tools / QueryOption | `gcs2pcs`、`pcs2gcs`、`screen2World`、`world2Screen` | 坐标测量、多源数据坐标统一、缓冲分析 |
| 全局事件回调 | DigitalTwinAPI | `setEventCallback`：LeftMouseButtonClick、CameraChanged、EditHelperFinished、Measurement、CameraTourFinished | 点击交互、绘制完成捕获、测量回传 |

---

## 性能与稳定性要点

- **批量提交**：海量标注、车辆、构件统一用 `updateBegin` / `updateEnd` 批量更新；十万级车流用 `TrafficSimulation` 大规模仿真；点位设置可视距离自动聚合。
- **坐标统一**：全平台统一工程投影坐标系 **EPSG:4549**；外部 WGS84 / GCJ02 / BD09 经纬度数据经 `coord` 转换后入库，杜绝定位偏移。
- **交互稳定**：导览自动锁定相机俯角防止朝天；低空飞行预留离地安全高度，插值增加过渡帧避免穿地。
- **帧同步驱动**：IoT 实时数据按 `FrameTick` 节奏批量刷新，保证车辆 / 飞行器平滑无卡顿。
