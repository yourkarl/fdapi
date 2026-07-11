---
title: 行业方案 · 智慧建筑
sidebar_label: 行业方案 · 智慧建筑
description: "智慧建筑数字孪生方案：BIM 单体化、楼层分户与爆炸拉抽屉、机电管线、设备运维、剖切透视的功能点与 fdapi 接口对照。"
---
# 行业方案 · 智慧建筑


### 方案概述

智慧建筑以 BIM 模型为核心，实现楼宇可视化、机电管线管理与设备运维，依托飞渡 DTS（`fdapi`）的单体化与剖切能力构建楼宇数字孪生。

---

## BIM 单体化与展示

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| BIM 加载与单体化 | `tileLayer` / `cesium3dTileset` `.getObjectIDs` / `getActorInfo(FromDB)` | 构件拾取、几何与 BIM 属性查询 |
| 高亮 / 显隐 | `highlightActor` / `highlightActorWithColor` / `hideActor` / `showActor` | 构件高亮、隐藏与单体控制 |
| 楼层分户 / 爆炸 / 拉抽屉 | `tileLayer`（分层显隐 + 构件平移） | 楼层分层、模型爆炸图、拉抽屉式细节展示 |
| 剖切 / X 光透视 | `tileLayer.enableClip` / `disableClip` + 样式（X 光 / 纯色） | 面 / 体剖切查看内部，半透明透视预埋管线 |

## 机电、管线与运维

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 机电管线 | `tileLayer`（管线 BIM）+ `polyline` | 给排水、强弱电、暖通管线三维表达 |
| 设备点位与状态 | `marker` / `marker3d` / `customTag` | 设备点位标注，点击弹窗（`popupURL`）展示运维 / IoT 状态 |
| 专业系统分层 | `infoTree` | 按建筑 / 结构 / 机电专业系统分级显隐 |
| 设施热力 | `heatMap` / `heatMap3D` | 能耗 / 温度 / 人流热力 |

## 漫游与环境

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 漫游导览 | `cameraTour` | 楼宇汇报漫游与视点编排 |
| 室内外环境 | `weather` | 昼夜与室内光照氛围 |
| 坐标统一 | `coord` | 坐标转换与屏幕↔世界拾取 |

---

## 要点

- 海量构件用 `updateBegin` / `updateEnd` 批量更新；单体化能力取决于 BIM 是否已切分入库。
- 构件业务属性通过 `getActorInfoFromDB` 从空间库读取，需先完成图属分离入库。
