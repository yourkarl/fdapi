---
title: 行业方案 · 港口航道与海洋
sidebar_label: 行业方案 · 港口航道/海洋
description: "港口航道与海洋数字孪生方案：海洋/港口三维底座、水面潮汐波浪、洋流风场、船舶态势与 AIS 轨迹、航道靠泊、港航安全预警、航标船闸设施的功能点与 fdapi 接口对照。"
---
# 行业方案 · 港口航道与海洋


### 方案概述

港口航道与海洋数字孪生以「海—岸—港—船」一体化底座承载航行安全、态势感知与港航运营，涵盖船舶态势、电子围栏、碰撞与碍航物预警、航道拥堵、靠泊监管、航标 / 船闸 / 卡口等，依托飞渡 DTS（`fdapi`）与海洋仿真类族构建港航数字孪生。

---

## 海洋与港口三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 港口 / 码头设施 | `tileLayer` / `cesium3dTileset` | 码头、港口设施 BIM / 实景加载与单体化 |
| 地形 / 影像 / 水下地形 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` | 岸线地形、卫星影像与海底 DEM 叠加 |
| 海岸线 | `coastline` | 海岸 / 岸线表达 |
| 设施分层 | `infoTree` / `groupId` | 按港区、设施类型分组显隐 |

## 水面、潮汐与海洋要素

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 水面 / 动态海水 | `waterMesh` / `dynamicWater` | 海面、动态海水与波浪表达 |
| 潮汐 / 漫滩 | `hydrodynamic2d` | 潮汐、漫滩二维水动力演进 |
| 洋流 / 风场 | `vectorField` | 基于 tif/bin 真实数据的洋流 / 风场仿真 |
| 海洋要素热力 | `oceanHeatMap` | 海温 / 盐度 / 水深等热力分布 |

## 船舶态势与航道

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 船舶态势与 AIS 轨迹 | `customObject` / `vehicle`（船舶模型）+ `camera.follow` + `moveTo` | 船舶实时位置、航迹与重点船舶跟踪，支持搜索 / 定位 |
| 航道 / 靠泊轨迹 | `polyline` / `splineMesh` | 航道走向、靠泊轨迹规划三维绘制 |
| 沿岸功能区 / 通航资源 | `polygon` / `highlightArea` + `geoJSONLayer` | 沿岸功能区、通航资源分区着色高亮 |
| 靠泊监管 | `customObject`（靠泊状态）+ `highlightArea`（泊位） | 船舶靠泊状态可视化与泊位监管 |

## 港航安全预警与设施

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 电子围栏 / 进出检测 | `boxTrigger` | 船舶航行电子围栏、重点区域进出检测 |
| 碰撞 / 拥堵 / 碍航物预警 | `boxTrigger` + `highlightArea` + `marker`（闪烁告警） | 船舶碰撞、航道拥堵、水下碍航物监测预警与定位 |
| 航标 / 卡口 / 船闸 | `marker` / `marker3d` / `customTag` + `popupURL` | 航标、卡口、船闸动态点位与状态弹窗 |
| 视频监控 | `videoProjection` + `marker`（摄像机点位） | 港区监控视频与三维融合 |
| 坐标统一 | `coord` | 经纬度↔投影↔屏幕互转，水深 / 高程基准统一 |

---

## 要点

- 船舶 AIS / 设备状态用 `updateBegin` / `updateEnd` 批量刷新，`FrameTick` 平滑驱动航迹，避免漂移卡顿。
- 水下地形与水面统一到工程投影与高程基准，多源海洋数据经 `coord` 转换后对齐。
- 洋流 / 风场（`VectorField`）、二维水动力（`HydroDynamic2D`）属海洋气象 / 水仿真授权模块，使用前确认授权。
