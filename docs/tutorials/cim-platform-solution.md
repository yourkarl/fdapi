---
title: 行业方案 · CIM 基础平台
sidebar_label: 行业方案 · CIM 基础平台
description: "城市级 CIM 基础平台数字孪生方案：CIM 时空数据底座多源融合、CIM 模拟分析、一张图可视化、数字驾驶舱、工程建设项目审批与 BIM 报建、城市运行管理（智慧城管/住建）的功能点与 fdapi 接口对照。"
---

### 方案概述

CIM（城市信息模型）基础平台以「现状 + 规划 + 建设 + 时空」多源数据为底座，
构建城市级三维数字孪生，向上支撑数字驾驶舱、工程建设项目审批（BIM 报建）、
城市运行管理与各类 CIM+ 应用（住建、城管、人防等）。飞渡 DTS（`fdapi`）作为 CIM
平台的三维可视化与分析引擎，承载多源融合渲染、模拟分析与一张图交互。

> 面向社区 / 网格层级的 CIM 应用见 [智慧社区与 CIM](/docs/tutorials/community-cim-solution)，本方案聚焦城市级基础平台。

---

## CIM 时空数据底座（多源融合）

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 实景 / 倾斜三维 | `tileLayer` / `cesium3dTileset` | 城市级实景、倾斜摄影底座加载与单体化 |
| BIM 模型 | `tileLayer` + `getObjectIDs` / `getActorInfo(FromDB)` | BIM 构件单体化拾取与属性关联 |
| 地形 / 影像 | `globeTerrain（球面）` / `imageryLayer2（球面）` | DEM 地形与 DOM 遥感影像叠加 |
| 点云 / 矢量 | `pointCloud` / `shapeFileLayer` / `geoJSONLayer` | 点云、地类图斑、规划矢量等多源数据 |
| 坐标统一 | `coord` | 多源 CIM 数据坐标系转换与统一 |
| 分层组织 | `infoTree` / `groupId` | 按现状 / 规划 / 建设、专题分级显隐 |

## CIM 模拟分析

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 日照分析 | `tools.startSunshineAnalysis` | 建筑日照时长分析〔授权〕 |
| 天际线 / 视域 | `tools.startSkylineAnalysis` / `startViewshedAnalysis` | 天际线、视域、通视、开敞度分析〔授权〕 |
| 填挖方 / 坡度 | `tools.startCutFillAnalysis` / `startTerrainSlopeAnalysis` | 场地填挖方、坡度坡向分析〔授权〕 |
| 淹没分析 | `floodFill` | 内涝 / 淹没影响范围推演〔授权〕 |
| 缓冲 / 查询 | `tools` / `queryOption` | 空间缓冲、条件查询与拾取 |

> 上述分析类多为**授权模块**，详见 [高级接口授权](/docs/tutorials/auth)。

## CIM 一张图可视化

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 专题点位 | `marker` / `markerLayer` + `customTag` | 设施、事件、项目点位专题标注与分组 |
| 区域高亮 | `highlightArea` / `geoJSONLayer` | 规划分区、管控范围、责任区高亮 |
| 密度热力 | `heatMap` / `heatMap3D` | 人口、产业、事件、项目密度热力 |
| 区域圈选统计 | `editHelper` 画范围 + 点在面内判断 | 框选统计范围内项目 / 设施并联动高亮 |

## 数字驾驶舱与专题

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 宏观驾驶舱 | `cameraTour` / `misc.enterReportMode` | 全景概览与各专题视点自动巡游 |
| 主题专题 | `infoTree.setVisibility` + `groupId` | 「全景」「大资源」「大监管」等专题场景组装 |
| 业务下钻 | `camera.lookAt` + `marker.focus` | 从驾驶舱下钻到片区 / 项目 / 设施 |
| 多视口比选 | `misc.enterMultiViewportMode` | 规划方案、多期成果并排比选 |

## 工程建设项目审批与 BIM 报建

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| BIM 报建模型 | `tileLayer` / `cesium3dTileset` + `getActorInfo(FromDB)` | 报建 BIM 单体化、构件属性与指标查询 |
| 方案比选 | `misc.enterMultiViewportMode` + 显隐 | 多方案并排、现状 / 方案叠合比对 |
| 剖切透视 | `enableClip` + `highlightActor` | 楼层 / 剖面剖切、关键构件高亮核查 |
| 规划指标核查 | `tools` + `queryOption` | 退线、间距、限高、日照等指标可视化核查 |

## 城市运行管理（智慧城管 / 住建）

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 城市部件 / 事件 | `marker` / `markerLayer` + `customTag` | 井盖、路灯、广告牌等部件与城管事件点位 |
| 事件热力 | `heatMap` / `heatMap3D` | 案件、投诉、隐患密度热力分布 |
| 视频融合 | `videoProjection` | 重点区域监控画面融合，联动 AI 识别 |
| 报警 / 案件定位 | `marker.focus` + `highlightArea` | 案件、报警列表联动定位与责任区高亮 |

---

## 要点

- CIM 底座数据量巨大，按**现状 / 规划 / 建设与专题分块 `tileLayer` + `groupId`** 组织，配合 LOD、缓存与视距裁剪保障性能；
- 多源实景、BIM、影像、矢量坐标须经 `coord` 统一到场景坐标系；
- 日照、天际线、视域、淹没等 CIM 模拟分析多为**授权模块**，详见 [高级接口授权](/docs/tutorials/auth)；
- 数据汇聚、治理、轻量化与格式转换等底座能力详见 [平台技术优势与性能指标](/docs/tutorials/platform-capabilities)。
