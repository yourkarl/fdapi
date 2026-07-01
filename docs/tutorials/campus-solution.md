---
title: 行业方案 · 智慧校园（CIM）
sidebar_label: 行业方案 · 智慧校园
description: "基于 CIM 的智慧校园数字孪生方案：校园三维底座与全景、空间数据可视化、实时数据接入与轨迹、视频图像接入、事件态势分析、运营中心的功能点与 fdapi 接口对照。"
---

### 方案概述

基于 CIM 的智慧校园以三维底座融合 GIS / BIM / 倾斜摄影与 GB/T28181 视频，承载校园全景、规划、施工监管与运营管理（安防、通行、资产、设备、能耗、环境），依托飞渡 DTS（`fdapi`）构建校园数字孪生。

---

## 校园三维底座与全景

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 校园建筑 / BIM | `tileLayer` / `cesium3dTileset` | 教学楼、宿舍等建筑实景 / BIM 加载与单体化 |
| 地形 / 影像底图 | `globeTerrain（球面）` / `imageryLayer2（球面）` | 校园地形与卫星 / 电子底图 |
| 全景展示 | `panorama` | 全景校园展示，辅助招生宣传与远程参观 |
| 基础地图操作 | `camera`（缩放 / 平移 / 鸟瞰 / 漫游） | 视图控制与浏览 |
| 量算 | `tools`（坐标 / 距离 / 面积） | 地图量算 |
| 设施分层 | `infoTree` | 按校区 / 楼栋 / 系统分级显隐 |

## 空间数据、可视化与实时接入

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 监测点位管理 | `marker` / `markerLayer` | 监测点分类展示、定位、海量聚合，点击弹窗（`popupURL`） |
| 分区 / 边界 | `geoJSONLayer` / `polygon` | 校区、功能区矢量分区与高亮 |
| 密度热力 | `heatMap` / `heatMap3D` | 人员密度、能耗、环境热力 |
| 实时数据接入与轨迹 | `customObject` / `vehicle` + `camera.follow` + `moveTo` / `updateBegin·End` | 人员 / 车辆 GPS 实时位置、动态跟踪与轨迹回放 |
| 视频图像接入 | `videoProjection` + `marker` | GB/T28181 监控视频融合、摄像头点位与实时播放 |
| 综合查询 | `tools` / `queryOption` | 属性查询与空间范围查询 |

## 事件态势与安防运营

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 事件态势标绘 | `plot`（态势标绘）+ `highlightArea` + `FrameTick` | 多事件时序组织、地图定位与态势图标绘 |
| 安防 / 通行 / 电子围栏 | `boxTrigger` + `videoProjection` | 区域进出检测告警、异常滞留可视化、联动周边视频 |
| 重点楼宇监测 | `tileLayer.highlightActor` / `enableClip` | 楼宇单体化、内部结构剖切与重点部位监测 |
| 设备 / 资产 / 能耗 / 环境 | `marker3d` / `customTag`（状态弹窗）+ `heatMap` | 供水电热、空调照明等设备状态与能耗环境监测 |

## 校园规划与施工监管

| 能力点 | fdapi 接口 | 说明 |
|------|-----------|------|
| 现状 / 规划成果展示 | `tileLayer` + `cameraTour` | 校园现状与规划成果三维展示与汇报漫游 |
| 方案比对 | `misc`（多视口分屏） | 多方案对比、相机 / 缩放联动 |
| 施工方案模拟 | `tileLayer`（BIM 分阶段显隐）+ `weather.simulateTime` | BIM + 时间的施工工序仿真与进度推演 |
| 坐标统一 | `coord` | 经纬度↔投影↔屏幕互转，多源数据统一入库 |

---

## 要点

- 海量监测点 / 人车用 `markerLayer` 聚合与 `updateBegin` / `updateEnd` 批量提交，`FrameTick` 平滑驱动轨迹。
- 视频按 GB/T28181 接入并经 `videoProjection` 与三维场景融合；摄像头地理分布用 `marker` 点位表达。
- 校园坐标统一为工程投影系，多源 GIS / BIM 数据经 `coord` 转换后对齐。
