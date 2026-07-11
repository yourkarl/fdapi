---
title: 行业方案 · 石油化工与油气田
sidebar_label: 行业方案 · 石油化工/油气田
description: "石油化工与油气田数字孪生方案：厂区/站库/罐区三维建模与单体化、井场与管线、设备与安全监测、可燃气体与应急联动的功能点与 fdapi 接口对照。"
---
# 行业方案 · 石油化工与油气田


### 方案概述

石油化工与油气田数字孪生以炼化厂区、站库、罐区、井场及管线的高精度三维建模为底座，
承载设备管理、生产监测、安全环保与应急联动，将 SCADA / IoT / 视频 / 气体监测数据
在三维场景中融合，依托飞渡 DTS（`fdapi`）构建「装置级」数字孪生。

---

## 厂区 / 站库三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 厂区 / 装置建模 | `tileLayer` / `cesium3dTileset` + `enableClip` | 炼化装置、管廊、罐区单体化与剖切 |
| 构件属性查询 | `getObjectIDs` / `getActorInfo(FromDB)` | 设备、管线、阀门台账属性拾取 |
| 地形 / 影像 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` | 井区、厂区地形与卫星影像底图 |
| 设施分层 | `infoTree` / `groupId` | 按装置、系统、专业分组显隐 |

## 井场与管线

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 井场 / 站点点位 | `marker` / `marker3d` + `customTag` | 井场、计量站、阀室点位与状态卡片 |
| 集输管线 | `polyline` / `tileLayer` | 管线走向、管径、介质属性可视化 |
| 管线流向 | `odLine` / `pathAnimation` | 油气集输流向与工艺流程动态演示 |
| 管线巡检 | `polyline` + `marker` | 巡线轨迹、缺陷点位与上报联动 |

## 设备与安全监测

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 设备状态监测 | `customTag` / `highlightActor` + `update` | 机泵、储罐、换热器运行状态分色刷新 |
| 工艺参数联动 | `marker.popupURL` | 温度、压力、液位等参数弹窗联动 |
| 可燃 / 有毒气体 | `heatMap` / `customTag` + 分级预警 | 气体探测点浓度、超限闪烁与扩散热力 |
| 视频融合 | `videoProjection` | 重点装置、罐区监控画面融合呈现 |

## 应急联动

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 报警定位 | `marker.focus` + `camera.lookAt` | 火气 / 设备报警列表联动定位放大 |
| 影响范围分析 | `highlightArea` / `heatMap3D` | 泄漏 / 火灾影响范围与扩散模拟展示 |
| 疏散 / 处置流线 | `polyline` / `pathAnimation` | 疏散路线、消防处置流线演示 |
| 预案推演 | `cameraTour` + `marker` | 应急预案分步推演与视点导览 |

---

## 要点

- 炼化装置构件量大，建议按**装置 / 专业分块 `tileLayer`** 并启用 LOD 与视距裁剪；
- 气体探测、设备工况等高频数据用 `update` 增量刷新，超限用 `highlightActor` / `highlightArea` 分级预警；
- 泄漏 / 扩散等高级仿真涉及 `heatMap3D`、`floodFill` 等分析类，部分为**授权模块**（详见「高级接口授权」）；
- 三维建模精度与坐标系需与厂区 CAD / GIS 统一，用 `coord` 做多源坐标转换。
