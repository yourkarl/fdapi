---
title: 行业方案 · 实景三维与测绘地理信息
sidebar_label: 行业方案 · 实景三维/测绘
description: "实景三维与测绘地理信息数字孪生方案：地形/城市/部件级实景三维底座、遥感影像统筹与地形叠加、点云与矢量专题、高逼真渲染、主题导览与大屏展示的功能点与 fdapi 接口对照。"
---
# 行业方案 · 实景三维与测绘地理信息


### 方案概述

实景三维与测绘地理信息以「地形级—城市级—部件级」实景三维为数字底座，
融合倾斜摄影、点云、DEM / DOM 遥感影像与矢量专题数据，支撑自然资源、林业、
测绘地理信息的一张图展示、主题导览与高逼真大屏，依托飞渡 DTS（`fdapi`）构建实景三维数字底座。

---

## 实景三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 倾斜摄影 / 实景模型 | `tileLayer` / `cesium3dTileset` | 城市级、地形级倾斜摄影与实景三维加载 |
| 模型单体化 | `getObjectIDs` / `getActorInfo(FromDB)` | 部件级单体化拾取与属性关联 |
| 地形级实景 | `globeTerrain（球面）` + `tileLayer` | 大范围地形级实景三维与 LOD 调度 |
| 图层分层 | `infoTree` / `groupId` | 按区域、数据类型、专题分组显隐 |

## 遥感影像与地形

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 正射影像（DOM） | `imageryLayer（投影）+imageryLayer2（球面）` | 遥感 / 航空正射影像统筹叠加与切换 |
| 数字高程（DEM） | `globeTerrain（球面）` | 地形高程加载与地形夸张 |
| 影像多源融合 | `imageryLayer（投影）+imageryLayer2（球面）` + `groupId` | 多期、多源影像分组比对 |
| 坐标统一 | `coord` | 多源测绘数据坐标系转换与统一 |

## 点云与矢量专题

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 点云数据 | `pointCloud` | 激光点云加载与浏览 |
| 矢量 Shp | `shapeFileLayer` | 行政区划、地类图斑、林班等矢量面 / 线 |
| 专题矢量 | `geoJSONLayer` + `highlightArea` | 专题边界渲染、区域高亮 |
| 专题点位 | `marker` / `markerLayer` + `customTag` | 界址点、监测点、兴趣点专题标注 |
| 专题热力 | `heatMap` / `heatMap3D` | 资源分布、密度、变化专题热力 |

## 高逼真渲染与主题导览

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 光照 / 时相 | `light` / `weather.setDateTime` | 日照、时相与光影高逼真表达 |
| 气象 / 季节 | `weather` | 雨雪雾与季节氛围，林相高逼真展示 |
| 动态水体 | `dynamicWater` / `waterMesh` | 湖库、水面动态渲染 |
| 主题导览 | `cameraTour` | 主题路线自动巡游、逐点讲解导览 |

## 大屏展示与汇报

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 汇报模式 | `misc.enterReportMode` | 大屏汇报视图与视点复位 |
| 多视口比选 | `misc.enterMultiViewportMode` | 多区域 / 多期成果并排展示 |
| 视点书签 | `camera.set` / `camera.get` | 关键视点保存与快速切换 |
| 专题联动 | `marker.focus` + `camera.lookAt` | 列表 / 图表联动定位到三维场景 |

---

## 要点

- 海量实景三维依赖 **LOD 与缓存调度**，按区域分块 `tileLayer` 并控制并发加载，保障大屏帧率；
- 多源遥感影像、点云、矢量坐标系须经 `coord` 统一到场景坐标；
- 高逼真渲染（光照 / 气象 / 水体）会增加开销，大屏场景建议按需开启；
- 数据治理、轻量化与格式转换等底座能力详见 [平台技术优势与性能指标](/docs/tutorials/platform-capabilities)。
