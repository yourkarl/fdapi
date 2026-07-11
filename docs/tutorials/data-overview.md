---
title: 数据接入总览
sidebar_label: 数据接入总览
description: "DTS 支持的数据类型、格式与接入通道总矩阵：三维底座、GIS 矢量影像、模型资产、业务动态数据分别走哪条路、用哪个 API。"
---

# 数据接入总览

数字孪生项目的大部分工作量在数据侧。本指南系列回答一个核心问题：**手里的数据是什么格式、应该走哪条通道进场景、用哪个 API 管理**。

## 四类数据，四条通道

| 数据类别 | 典型来源 | 格式/载体 | 接入 API | 详见 |
|---------|---------|----------|----------|------|
| **三维底座** | 倾斜摄影、BIM、人工建模 | `.3dt`（DTS 瓦片格式） | `tileLayer` | [3dt 三维底座接入](/docs/tutorials/data-3dt) |
| | 开放标准三维瓦片服务 | Cesium 3D Tiles（URL 服务） | `cesium3DTileset` | [开放三维格式](/docs/tutorials/data-3dtiles) |
| | 实景重建成果 | 3D 高斯泼溅 `.ply` | `gaussianSplatting` | [开放三维格式](/docs/tutorials/data-3dtiles) |
| **GIS 矢量与影像** | 规划、国土、测绘数据 | GeoJSON / Shapefile | `geoJSONLayer` / `shapeFileLayer` | [GIS 矢量与影像服务](/docs/tutorials/data-gis) |
| | 在线底图与地形服务 | WMTS / WMS / TMS / MVT / MapServer | `imageryLayer`（投影）/ `imageryLayer2`、`globeTerrain`（球面） | 同上 |
| **模型资产** | UE 资产、动态实体模型 | `.pak`（UE 打包） | `customObject` | [模型资产与 pak 管线](/docs/tutorials/data-model) |
| | 程序化几何 | 顶点/索引数组 | `customMesh` | 同上 |
| **业务动态数据** | IoT、GPS、业务系统 | JSON 点位/属性 | `marker` / `markerLayer` / `heatmap` 等 | [业务动态数据接入](/docs/tutorials/data-dynamic) |
| | 科学计算成果 | tif / bin 场数据、水动力模型 | `vectorField`、`floodFill` 等水利家族 | 同上 |
| | 实时视频 | RTSP/平台流 | `videoProjection`、`daHuaVideoFusion` | 同上 |

## 接入前先回答三个问题

**1. 场景是投影（PCS）还是球面（GCS）？**

由服务端工程配置决定，直接影响可用的图层 API（如影像服务：投影场景用 `imageryLayer`，球面场景用 `imageryLayer2` / `globeTerrain`）与坐标写法。用 `fdapi.coord` 查询当前场景坐标系，详见[坐标系与数据配准](/docs/tutorials/data-georeference)。

**2. 数据是"底座"还是"业务"？**

底座类数据（倾斜摄影、BIM、地形影像）体量大、更新频率低，应预先处理上传至服务端，以 `@path:` 协议引用；业务类数据（点位、状态、轨迹）由前端代码在运行时增删改查。两者的性能预算与管理方式完全不同，见[数据性能与体检清单](/docs/tutorials/data-checklist)。

**3. 文件引用还是服务流式？**

- 文件类（`.3dt`、`.shp`、`.ply`、`.pak`）：上传到 CloudMaster 文件资源后用 `@path:/目录/文件` 引用，避免网络加载超时；
- 服务类（WMTS/WMS、Cesium 3D Tiles）：直接填服务 URL，注意跨域（CORS）与内外网可达性。

资源引用规则详见[资源描述与引用](/docs/tutorials/resources)。

## 本系列目录

1. [坐标系与数据配准](/docs/tutorials/data-georeference) —— 所有数据问题里最先要排除的一类
2. [3dt 三维底座接入](/docs/tutorials/data-3dt) —— tileLayer 加载、单体化、属性查询、剖切
3. [开放三维格式](/docs/tutorials/data-3dtiles) —— Cesium 3D Tiles 与 3D 高斯泼溅，与 3dt 的选型
4. [GIS 矢量与影像服务](/docs/tutorials/data-gis) —— GeoJSON / Shapefile / OGC 服务
5. [模型资产与 pak 管线](/docs/tutorials/data-model) —— UE pak 挂载与 customObject
6. [业务动态数据接入](/docs/tutorials/data-dynamic) —— 点位、热力、场数据、水利仿真、视频
7. [数据性能与体检清单](/docs/tutorials/data-checklist) —— 大场景策略与上线前自查
