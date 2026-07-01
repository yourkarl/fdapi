---
title: 行业方案 · 轨道交通（BIM+GIS）
sidebar_label: 行业方案 · 轨道交通
description: "轨道交通基于 BIM+GIS 全生命期一体化方案：一体化底座、线路隧道车站、列车运行仿真、设备资产、应急疏散的功能点与 fdapi 接口对照。"
---

### 方案概述

轨道交通基于 BIM+GIS 一体化，贯穿设计、施工、运维全生命期，依托飞渡 DTS（`fdapi`）实现线路、隧道、车站与列车的数字孪生。

---

## BIM+GIS 一体化底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 地形 / 影像 GIS 底座 | `globeTerrain（球面）` / `imageryLayer2（球面）` | 沿线地形与卫星影像 |
| 线路 / 隧道 / 车站 BIM | `tileLayer` / `cesium3dTileset` | 轨道、隧道、车站 BIM 加载与单体化拾取 |
| 全生命期属性 | `tileLayer.getActorInfo(FromDB)` | 构件几何与设计 / 施工 / 运维属性查询 |
| 设施分层 | `infoTree` | 按线路 / 区间 / 专业系统分级显隐 |

## 线路与列车仿真

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 线路 / 轨道走向 | `polyline` / `splineMesh` | 平滑生成轨道 / 线路三维走向 |
| 列车运行仿真 | `train` `.add` / `update` / `moveTo` | 列车沿轨道行驶，配合 `camera.follow` 跟随 |
| 单体化 / 剖切 | `tileLayer.highlightActor` / `enableClip` | 区间、车站构件高亮与剖切查看内部 |

## 设备、客流与应急

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 设备 / 资产点位 | `marker` / `marker3d` / `customTag` | 机电、信号、供电设备点位，点击弹窗（`popupURL`） |
| 车站点位 | `marker` / `markerLayer` | 车站、出入口海量点位标注与聚合 |
| 客流 / 能耗热力 | `heatMap` / `heatMap3D` | 客流密度、能耗热力 |
| 应急 / 疏散 | `boxTrigger` + `highlightArea` | 区域进出检测、疏散范围 / 受影响区高亮 |
| 坐标统一 | `coord` | 经纬度↔投影↔屏幕互转 |

---

## 要点

- 列车 / 设备状态用 `updateBegin` / `updateEnd` 批量更新，`FrameTick` 平滑驱动。
- 沿线坐标统一为工程投影系，多源 GIS 数据经 `coord` 转换后与 BIM 对齐。
