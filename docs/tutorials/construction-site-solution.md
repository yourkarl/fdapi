---
title: 行业方案 · 智慧工地
sidebar_label: 行业方案 · 智慧工地
description: "智慧工地数字孪生方案：工地三维底座、塔吊/升降机监测、劳务实名与人员定位、视频 AI 分析预警、智能安全帽、可燃气体监测、进度对比与质安巡检的功能点与 fdapi 接口对照。"
---
# 行业方案 · 智慧工地


### 方案概述

智慧工地以施工现场三维实景 / BIM 为底座，围绕「人、机、料、法、环」构建可视化管控，
覆盖项目监管、劳务实名、视频 AI 预警、危大工程监测、可燃气体监测、进度对比与质安巡检，
依托飞渡 DTS（`fdapi`）将物联感知、AI 分析与业务数据在三维场景中融合联动。

---

## 工地三维底座

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 工地实景 / BIM | `tileLayer` / `cesium3dTileset` + `getObjectIDs` | 现场倾斜实景、BIM 模型加载与构件单体化 |
| 地形 / 影像 | `globeTerrain（球面）` / `imageryLayer（投影）+imageryLayer2（球面）` | 场地地形与卫星影像底图 |
| 场区分层 | `infoTree` / `groupId` | 按作业区、栋号、楼层分组显隐 |
| 施工布点 | `marker` / `markerLayer` | 塔吊、出入口、监测点、摄像头等设施布点 |

## 危大工程与设备监测

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 塔吊 / 升降机状态 | `marker` / `customTag` + `update` | 载重、力矩、风速、运行状态实时点位刷新 |
| 群塔防碰撞 | `polyline` / `highlightArea` + `boxTrigger` | 作业半径可视化、交叉区域预警高亮 |
| 深基坑监测 | `customTag` / `heatMap` + `highlightActor` | 位移、支撑轴力、地下水位测点与超界预警 |
| 高支模 / 脚手架 | `marker` / `customTag` | 沉降、倾斜、荷载测点状态展示 |

## 劳务实名与人员定位

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 人员实时定位 | `marker` / `marker3d` + `moveTo` | UWB / 定位卡人员点位实时移动 |
| 人员分布热力 | `heatMap` / `heatMap3D` | 各区域在场人数密度热力 |
| 电子围栏 | `polygon3D` / `boxTrigger` | 危险区域闯入 / 越界告警联动 |
| 实名制 / 考勤 | `marker.popupURL` / `customTag` | 点位联动工种、考勤、培训、退场信息卡片 |

## 视频监控与 AI 预警

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 视频融合 | `videoProjection` / `videoFusion` | 摄像头画面投射融合到三维场景 |
| AI 分析预警 | `marker.focus` + `camera.lookAt` | 未戴安全帽 / 未穿反光衣 / 明火烟雾等 AI 报警定位 |
| 智能安全帽 | `marker` / `customTag` + `update` | 定位、SOS、脱帽告警点位状态 |
| 可燃气体监测 | `customTag` / `heatMap` + 分级预警 | 气体浓度测点数值、超限闪烁与区域热力 |

## 进度与质安管理

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 进度对比 | `tileLayer.hide/showActor` + 时间轴 | 按计划 / 实际形象进度分色显隐构件 |
| 形象进度模拟 | `pathAnimation` / `cameraTour` | 施工工序动画与进度导览 |
| 质安巡检 | `polyline` + `marker` | 巡检轨迹回放、问题点位与整改跟踪 |
| 巡检 APP 联动 | `marker.popupURL` | 现场上报照片、整改状态弹窗联动定位 |

---

## 要点

- 塔吊、气体、人员等**高频动态点位**用 `update` 增量刷新，海量点位配合 `updateBegin/End` 与 `groupId` 分组显隐；
- AI / 设备报警统一走「列表单击 → `marker.focus` + `camera.lookAt` 定位放大」交互；
- 危大工程超界预警用 `highlightActor` / `highlightArea` 构件闪烁 + 分级配色；
- 视频融合与 AI 分析建议限定重点区域摄像头，避免全场同时投射影响性能。
