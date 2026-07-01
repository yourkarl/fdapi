---
title: 行业方案 · 智慧工厂与生产管控
sidebar_label: 行业方案 · 智慧工厂
description: "智慧工厂与生产管控一体化数字孪生方案：厂区产线三维单体化、设备状态监测、生产运行监测、领导驾驶舱、调度指令、质量安全环保的功能点与 fdapi 接口对照。"
---

### 方案概述

智慧工厂与生产管控一体化以厂区 / 车间 / 产线三维模型为载体，汇聚生产、设备、监测、
业务多源数据，构建「多源汇聚—数据治理—场景组装—可视化展示」的全息管控底座，
支撑领导驾驶舱、生产运行监测、调度指令与质量安全环保，依托飞渡 DTS（`fdapi`）实现。

---

## 厂区与产线三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 厂区 / 车间 BIM | `tileLayer` / `cesium3dTileset` + `enableClip` | 厂房、车间单体化与楼层 / 剖面剖切 |
| 产线 / 设备单体化 | `getObjectIDs` / `getActorInfo(FromDB)` | 产线、设备构件拾取与台账属性查询 |
| 设施分层 | `infoTree` / `groupId` | 按车间、工段、系统分组显隐 |
| 设备点位 | `marker` / `markerLayer` + `customTag` | 设备铭牌、点检、运行状态点位 |

## 生产运行监测

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 设备状态监测 | `customTag` / `highlightActor` + `update` | 运行 / 停机 / 故障分色，实时数据刷新 |
| 工艺参数联动 | `marker.popupURL` | 温度、压力、产量等工艺参数弹窗联动 |
| 能耗 / 产能热力 | `heatMap` / `heatMap3D` | 车间能耗、产能、报警密度热力分布 |
| 物流 / 工序流向 | `odLine` / `pathAnimation` | 物料流转、AGV / 产线节拍动态演示 |

## 领导驾驶舱与场景组装

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 宏观驾驶舱 | `cameraTour` / `misc.enterReportMode` | 宏观概览与各业务视点自动巡游 |
| 业务下钻 | `camera.lookAt` + `marker.focus` | 从驾驶舱跳转下钻到具体车间 / 设备 |
| 多视口比选 | `misc.enterMultiViewportMode` | 多产线 / 方案并排对比 |
| 场景切换 | `infoTree.setVisibility` + `groupId` | 按应用模式动态组装展示图层 |

## 调度指令与质量安全环保

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 调度指令流转 | `marker` / `customTag` + `update` | 调度指令下发、执行状态在场景跟踪 |
| 报警定位 | `marker.focus` + `highlightArea` | 生产 / 安全报警列表联动定位高亮 |
| 视频融合 | `videoProjection` | 关键工位监控画面融合呈现 |
| 环保监测 | `heatMap` / `customTag` | 废气 / 废水 / 噪声监测点位与热力 |

---

## 要点

- 「多源汇聚—治理—场景组装」对应 SDK 侧的**图层分组（`groupId` / `infoTree`）+ 动态显隐**，按应用模式组装场景；
- 设备状态等高频数据用 `update` 增量刷新 + `highlightActor` 分色，避免整模型重载；
- 领导驾驶舱到车间的下钻统一用 `cameraTour` / `camera.lookAt` + `marker.focus`；
- 大型厂区建议按车间 / 系统分块 `tileLayer`，配合 LOD 与视距裁剪保障帧率。
