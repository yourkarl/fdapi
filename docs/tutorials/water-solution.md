---
title: 行业方案 · 智慧水利水务
sidebar_label: 行业方案 · 智慧水利水务
description: "智慧水利水务数字孪生方案：三维水利底座、实时水体仿真、洪涝淹没推演、管网设施、调度分析的功能点与 fdapi 接口对照。"
---

### 方案概述

智慧水利水务围绕「监测—仿真—推演—调度」构建数字孪生，依托飞渡 DTS（`fdapi`）的水仿真能力族（`Fluid` / `HydroDynamic1D·2D` / `FloodFill` / `River` / `WaterMesh` / `WaterFlowField` / `SPH` / `OceanHeatMap` / `Coastline` / `VectorField`）实现防汛、排涝、河湖、管网等场景。

---

## 三维水利底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 地形 / 影像底图 | `globeTerrain` / `imageryLayer(2)` | 流域地形与卫星影像叠加 |
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

## 要点

- 大范围水体与淹没推演用 `updateBegin` / `updateEnd` 批量提交，配合 `FrameTick` 按时序平滑驱动。
- 流域坐标统一为工程投影系（如 EPSG:4549），WGS84 经纬度经 `coord` 转换后入库。
- 高级水仿真（`HydroDynamic2D`、`Fluid`、`WaterFlowField` 等）属水仿真授权模块，使用前确认授权。
