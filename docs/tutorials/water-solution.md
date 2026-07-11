---
title: 行业方案 · 智慧水利水务
sidebar_label: 行业方案 · 智慧水利水务
description: "智慧水利水务数字孪生方案：三维水利底座、实时水体仿真、洪涝淹没推演、管网设施、调度分析的功能点与 fdapi 接口对照。"
---
# 行业方案 · 智慧水利水务


### 方案概述

智慧水利水务围绕「监测—仿真—推演—调度」构建数字孪生，依托飞渡 DTS（`fdapi`）的水仿真能力族（`Fluid` / `HydroDynamic1D·2D` / `FloodFill` / `River` / `WaterMesh` / `WaterFlowField` / `SPH` / `OceanHeatMap` / `Coastline` / `VectorField`）实现防汛、排涝、河湖、管网等场景。

---

## 三维水利底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 地形 / 影像底图 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` | 流域地形与卫星影像叠加 |
| 水库 / 泵站 / 管网 BIM | `tileLayer` / `cesium3dTileset` | 水利枢纽、泵闸、给排水管网三维加载与单体化 |
| 设施分层管理 | `infoTree` | 按流域 / 工程 / 设施类型分级显隐 |

## 实时水体与河湖仿真

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 三维水体仿真 | `fluid` | bbox 内实时流体，出水点驱动喷涌 / 漫流 / 注水 |
| 水面 / 水系 | `waterMesh` / `dynamicWater` | 河湖水面与动态水材质，水面起伏与反射 |
| 流速流向场 | `waterFlowField` | 精确控制水面各网格流向与流速 |
| 河道 | `river` | 河道水体与水位表达 |

## 洪涝与淹没推演

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 淹没分析 | `floodFill` | 按水位生成淹没范围，受影响区域推演 |
| 二维水动力 | `hydrodynamic2d` | 防洪排涝、漫滩、城市内涝二维演进 |
| 一维水动力 | `hydrodynamic1d` | 河道 / 管道一维水动力过程 |
| 溃坝 / 急流 | `smoothedParticleHydrodynamics` | SPH 粒子表达溃坝、急流冲击 |
| 受影响区高亮 | `highlightArea` | 淹没 / 受影响范围着色标识 |


### 防汛应急预警与预案推演

面向流域防汛抗旱与多灾种应急，将监测预警、预演过程与预案推演在三维场景中联动。

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 多灾种监测预警 | `marker` / `customTag` + `update` | 气象、地质灾害、防汛抗旱、森林防火监测点位与预警状态 |
| 风险区高亮 | `highlightArea` / `heatMap` | 隐患点、风险区、受威胁范围高亮与密度热力 |
| 雨水情 / 产汇流预演 | `hydrodynamic2d` / `hydrodynamic1d` + 时间轴 | 降雨产汇流、洪水演进、洪涝淹没过程分时演进 |
| 淹没过程 | `floodFill` + `highlightArea` | 按预演水位动态推演淹没范围与受影响区 |
| 预案推演 | `cameraTour` + `marker` / `polyline` | 应急预案分步演示，疏散 / 救援 / 转移流线 |
| 应急资源 | `marker` / `markerLayer` + `groupId` | 物资库、救援队伍、避险场所点位分组管理 |

## 海洋与河口

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 海洋热力 | `oceanHeatMap` | 海温 / 盐度等热力分布 |
| 海岸线 | `coastline` | 海岸 / 岸线表达 |
| 洋流 / 风场 | `vectorField` | 基于 tif/bin 真实数据的流场 / 风场仿真 |

## 雨情、管网与调度

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 降雨气象 | `weather`（降雨 / 时段） | 雨情仿真与昼夜时段推演 |
| 管线 / 设施点位 | `polyline` + `marker` / `marker3d` | 管网走向、水位站 / 泵站 / 闸门点位，点击弹窗（`popupURL`） |
| 调水流向 | `odLine` | 跨流域 / 区域调水流向飞线 |
| 量算分析 | `tools` | 淹没、填挖方、距离 / 面积 / 体积量算 |
| 监测热力 | `heatMap` / `heatMap3D` | 降雨 / 水位 / 流量热力密度 |
| 坐标统一 | `coord` | 经纬度↔投影↔屏幕互转，多源数据统一入库 |

---

## 水资源监管与水利工程管理

面向水资源节约集约利用监管，覆盖取水计量、灌区、调度、生态、供水与水利工程（枢纽 / 大坝）
的一体化管控，将取水、水位、水质、监测等数据在三维场景中融合，支撑数字驾驶舱与辅助决策。

### 取水计量与用水监管

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 取水口 / 计量点位 | `marker` / `customTag` + `update` | 取水口、计量设施点位与实时取水量刷新 |
| 用水强度热力 | `heatMap` / `heatMap3D` | 按区域 / 行业用水量、取用水强度热力 |
| 违法监管定位 | `marker.focus` + `highlightArea` | 超采、违规取水报警列表联动定位高亮 |
| 水权 / 台账 | `marker.popupURL` / `customTag` | 取水许可、水权、计量台账弹窗查询 |

### 灌区与水资源调度

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 灌区边界 | `geoJSONLayer` / `polygon3D` + `highlightArea` | 灌区、供水分区边界渲染与高亮 |
| 渠系 / 闸站 | `polyline` + `marker` / `customTag` | 干支渠走向、闸泵站点位与运行状态 |
| 调水线路 | `odLine` / `polyline` | 跨区域调水、水量分配流向飞线 |
| 调度指令 | `marker` / `customTag` + `update` | 调度指令、闸门开度在场景中跟踪 |

### 生态监管与城乡供水

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 水质监测点 | `marker` / `customTag` + `update` | 水质断面、生态流量监测点状态刷新 |
| 水质热力 | `heatMap` / `heatMap3D` | 水质指标、生态敏感区热力分布 |
| 供水厂 / 管网 | `marker` + `polyline` | 水厂、泵站点位与供水管网走向 |
| 视频融合 | `videoProjection` | 取水口、水厂、河湖岸线监控画面融合 |

### 水利枢纽与大坝安全监测

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 枢纽 BIM 单体化 | `tileLayer` / `cesium3dTileset` + `enableClip` | 大坝、泄洪、发电等枢纽构件单体化与剖切 |
| 安全测点状态 | `customTag` / `highlightActor` + `update` | 坝体位移、渗流、应力、扬压力测点刷新 |
| 超界预警 | `highlightActor` / `highlightArea` + 分级 | 测值超界构件闪烁、分级预警定位 |
| 库区水面 | `waterMesh` / `dynamicWater` | 库容水位涨落、库区动态水面表达 |

### 数字驾驶舱

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 宏观驾驶舱 | `cameraTour` / `misc.enterReportMode` | 全域概览与各业务视点自动巡游 |
| 业务下钻 | `camera.lookAt` + `marker.focus` | 从驾驶舱下钻到灌区 / 枢纽 / 监测点 |
| 场景切换 | `infoTree.setVisibility` + `groupId` | 按业务模块动态组装展示图层 |

---

## 要点

- 大范围水体与淹没推演用 `updateBegin` / `updateEnd` 批量提交，配合 `FrameTick` 按时序平滑驱动。
- 流域坐标统一为工程投影系（如 EPSG:4549），WGS84 经纬度经 `coord` 转换后入库。
- 高级水仿真（`HydroDynamic2D`、`Fluid`、`WaterFlowField` 等）属水仿真授权模块，使用前确认授权。
