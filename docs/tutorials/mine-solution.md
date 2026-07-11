---
title: 行业方案 · 智慧矿山
sidebar_label: 行业方案 · 智慧矿山
description: "智慧矿山数字孪生方案：矿山信息模型（MIM）全生命周期、井上下三维一体化、生产工艺运行、设备与人员定位、安全监测预警的功能点与 fdapi 接口对照。"
---
# 行业方案 · 智慧矿山


### 方案概述

智慧矿山以矿山信息模型（MIM）为核心，构建井上、井下、巷道、采区一体化三维底座，
承载生产工艺运行、设备与人员定位、通风与安全监测，将机理模型与大数据、IoT 融合，
依托飞渡 DTS（`fdapi`）实现矿山全生命周期数字孪生与协同管控。

---

## 矿山三维底座（MIM）

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 井上下一体化 | `tileLayer` / `cesium3dTileset` + `enableClip` | 地表、井筒、巷道、采区单体化与剖切透视 |
| 地质 / 地形 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` | 矿区地形、影像与地质体叠加 |
| 构件属性 | `getObjectIDs` / `getActorInfo(FromDB)` | 巷道、硐室、设备台账属性查询 |
| 系统分层 | `infoTree` / `groupId` | 按开拓、采掘、运输、通风系统分组显隐 |

## 生产工艺与运行

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 生产工艺流程 | `pathAnimation` / `odLine` | 采掘、运输、提升工艺流程动态演示 |
| 设备状态监测 | `customTag` / `highlightActor` + `update` | 采煤机、皮带、水泵等设备运行状态分色 |
| 产量 / 能耗热力 | `heatMap` / `heatMap3D` | 采区产量、能耗、报警密度热力 |
| 协同调度 | `marker` / `customTag` + `update` | 调度指令、运行策略在场景中跟踪 |

## 定位与安全监测

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 人员 / 车辆定位 | `marker` / `marker3d` + `moveTo` | 井下人员、车辆实时定位与轨迹回放 |
| 分布热力 | `heatMap` / `heatMap3D` | 各采区在册人数密度热力 |
| 通风监测 | `customTag` / `vectorField` | 风速、风量、瓦斯浓度测点与风流场 |
| 安全预警 | `highlightActor` / `highlightArea` + 分级 | 瓦斯 / 顶板 / 水害超界闪烁预警定位 |

---

## 要点

- MIM 强调**全生命周期与多模型融合**，SDK 侧用 `tileLayer` 单体化 + `getActorInfoFromDB` 关联机理 / 业务数据；
- 井下人员定位、瓦斯浓度等高频数据用 `update` / `moveTo` 增量刷新；
- 井下巷道透视用 `enableClip` 剖切 + `highlightActor` 高亮，突出关键区域；
- 瓦斯扩散、水害演进等高级仿真涉及授权分析类，详见「高级接口授权」。
