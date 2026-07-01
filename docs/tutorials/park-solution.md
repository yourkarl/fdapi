---
title: 行业方案 · 智慧园区
sidebar_label: 行业方案 · 智慧园区
description: "智慧园区数字孪生方案：园区三维底座、安防视频融合、人车轨迹、能耗 IoT 监控、周界报警的功能点与 fdapi 接口对照。"
---

### 方案概述

智慧园区以三维底座承载安防、运营、能耗与设施管理，依托飞渡 DTS（`fdapi`）实现「可视、可管、可控」的园区数字孪生。

---

## 园区三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 园区建筑 / BIM | `tileLayer` / `cesium3dTileset` | 楼宇、厂房 BIM / 实景加载与单体化拾取 |
| 地形 / 影像底图 | `globeTerrain（球面）` / `imageryLayer2（球面）` | 园区地形与卫星影像 |
| 设施分层管理 | `infoTree` | 按楼栋 / 楼层 / 系统分级显隐 |

## 安防与人车监控

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 监控视频融合 | `videoProjection` | 监控视频 / 视频流投影融合到三维场景 |
| 人 / 车模型与轨迹 | `customObject` / `vehicle` + `marker` | 人员、车辆模型沿轨迹移动，配合 `camera.follow` 跟踪 |
| 周界 / 电子围栏报警 | `boxTrigger` | 立体热区进 / 出检测，越界自动告警 |
| 重点目标跟踪 | `camera.follow` / `cancelFollow` | 相机锁定重点人 / 车动态观察 |

## 运营、能耗与设施

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 设备点位与状态 | `marker` / `marker3d` / `customTag` | 能耗表、安防、机电设备点位，点击弹窗（`popupURL`）展示实时 IoT |
| 能耗 / 客流热力 | `heatMap` / `heatMap3D` | 能耗、人流密度热力 |
| 楼宇单体化 | `tileLayer.getActorInfo` / `highlightActor` / `enableClip` | 楼栋拾取、高亮、剖切查看内部 |
| 漫游导览 | `cameraTour` | 园区汇报漫游与视点编排 |
| 环境氛围 | `weather` | 昼夜、天气氛围渲染 |
| 坐标统一 | `coord` | 多源坐标统一转换与屏幕拾取 |

---

## 要点

- 海量点位用 `marker.add`（数组）+ `groupId` 分组与可视距离自动聚合，降低渲染压力。
- 人车轨迹、IoT 状态用 `updateBegin` / `updateEnd` 批量提交，`FrameTick` 平滑驱动。
