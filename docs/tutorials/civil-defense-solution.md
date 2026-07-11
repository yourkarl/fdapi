---
title: 行业方案 · 人防应急指挥
sidebar_label: 行业方案 · 人防应急指挥
description: "人防与应急指挥数字孪生方案：人防工程三维一体化、指挥一张图、预案推演、资源与力量调度、视频融合与态势标绘的功能点与 fdapi 接口对照。"
---
# 行业方案 · 人防应急指挥


### 方案概述

人防应急指挥以人防工程与城市三维底座为载体，构建指挥一张图，承载预案推演、
资源与救援力量调度、视频融合与态势标绘，将监测预警、物资、队伍等数据融合联动，
依托飞渡 DTS（`fdapi`）支撑「平战结合」的应急指挥与辅助决策。

---

## 三维指挥底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 人防工程建模 | `tileLayer` / `cesium3dTileset` + `enableClip` | 人防工程、地下空间单体化与剖切浏览 |
| 城市底座 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` / `geoJSONLayer` | 地形、影像、行政区划一张图底图 |
| 资源点位 | `marker` / `markerLayer` + `groupId` | 人防工程、物资库、避难场所、队伍点位 |
| 设施分层 | `infoTree` / `groupId` | 按工程、物资、力量、监测分组显隐 |

## 指挥一张图与态势标绘

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 态势标绘 | `plot.startDraw` | 军标 / 态势符号标绘（授权模块） |
| 区域圈划 | `polygon3D` / `editHelper` | 责任区、警戒区、疏散区圈划 |
| 密度热力 | `heatMap` / `heatMap3D` | 受灾点、人员、隐患密度热力 |
| 视频融合 | `videoProjection` | 现场监控画面融合呈现 |

## 预案推演与调度

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 预案分步推演 | `cameraTour` + `marker` / `plot` | 应急预案分步演示与视点导览 |
| 力量 / 资源调度 | `marker` / `marker3d` + `moveTo` | 救援队伍、车辆调度路径动态推进 |
| 疏散路线 | `polyline` / `pathAnimation` | 疏散、集结、救援流线演示 |
| 报警 / 事件定位 | `marker.focus` + `highlightArea` | 预警、事件列表联动定位高亮 |

---

## 要点

- 指挥一张图强调**多源点位分组管理**，用 `groupId` / `infoTree` 按物资 / 力量 / 监测分类显隐；
- 预案推演用 `cameraTour` 串联视点 + `marker` / `plot` 分步呈现，力量调度用 `moveTo` 推进；
- 态势标绘 `plot` 与部分分析类为**授权模块**，详见「高级接口授权」；
- 人防工程透视用 `enableClip` 剖切 + `highlightActor` 高亮关键部位。
