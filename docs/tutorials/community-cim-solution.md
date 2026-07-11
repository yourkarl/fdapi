---
title: 行业方案 · 智慧社区与 CIM
sidebar_label: 行业方案 · 智慧社区/CIM
description: "智慧社区与 CIM 基础平台数字孪生方案：CIM 三维底座、房屋分层分户、网格化管理、人口事件点位、空间圈选的功能点与 fdapi 接口对照。"
---
# 行业方案 · 智慧社区与 CIM


### 方案概述

智慧社区基于 CIM 基础平台，以三维底座叠加网格、房屋、人口与事件数据，支撑基层治理与服务，依托飞渡 DTS（`fdapi`）实现社区数字孪生。

---

## CIM 三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 地形 / 影像 / 建筑 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` / `tileLayer` | 社区地形影像与建筑实景 / BIM 底座 |
| 行政 / 网格边界 | `geoJSONLayer` / `shapeFileLayer` | 社区、网格、责任区矢量边界加载与高亮 |
| 设施分层 | `infoTree` | 按小区 / 楼栋 / 系统分级显隐 |

## 房屋与网格治理

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 房屋分层分户 | `tileLayer.getObjectIDs` / `getActorInfo(FromDB)` / `highlightActor` | 楼栋单体化、楼层 / 户室拾取与高亮，关联房屋 / 人口属性 |
| 网格化分区 | `polygon` / `highlightArea` + `geoJSONLayer` | 绘制 / 加载网格责任区面并着色高亮 |
| 人口 / 事件点位 | `marker` / `markerLayer` | 海量户籍、事件点批量加载、聚合分色，点击弹窗（`popupURL`） |
| 视频联网 | `videoProjection` | 社区监控视频融合 |
| 事件 / 人口热力 | `heatMap` / `heatMap3D` | 人口、事件、警情密度热力 |

## 空间查询与圈选

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 区域圈选 | `editHelper` 画范围 + 射线法点在面内判断（`coord`） | 框选网格 / 区域统计房屋、人口、事件并联动高亮 |
| 量算分析 | `tools` / `queryOption` | 距离 / 面积量算、条件 / 范围查询 |
| 坐标统一 | `coord` | WGS84 / GCJ02 / BD09 → 工程投影统一入库 |

---

## 要点

- 海量人口 / 事件点用 `markerLayer` 与可视距离聚合，`groupId` 按网格 / 类型分组显隐。
- 圈选统计采用批量更新接口优化命中对象的高亮渲染。
