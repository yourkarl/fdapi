---
title: 业务动态数据接入
sidebar_label: 业务动态数据
description: "IoT 点位、热力分布、风场洋流场数据、水利仿真与实时视频五类业务数据的接入通道与数据结构约定。"
---

# 业务动态数据接入

底座之上，数字孪生的价值来自持续流动的业务数据。本文按五类常见业务数据给出接入通道与数据结构建议。

## 点位类：marker 家族的量级选型

三者不是简单的"数量越大用越强的那个"，而是分别对应三种不同的呈现形态与交互诉求：

| 维度 | [`marker`](/docs/api/marker/marker) | [`marker3d`](/docs/api/marker/marker3d) | [`markerLayer`](/docs/api/layer/marker-layer) |
|------|------|------|------|
| 呈现形态 | 屏幕级 2D UI（图标+文字，始终朝向相机） | 三维立体标注，有真实的朝向/缩放/旋转，可叠加粒子/光效/蓝图特效 | 按相机距离自动分三级渲染（远：圆形点 → 中：图片 → 近：完整 Marker） |
| 典型量级 | 几十~几千 | 几个~几十（重点目标，不适合海量） | 成千上万到海量 |
| 交互能力 | 最强：图标/悬停图/文字/HTML 弹窗/视频弹窗，鼠标事件齐全 | 中：三维文字可固定朝向或随视角变化，交互不如 marker 丰富 | 点击弹窗展示详情，但单点不支持贴合运动 |
| 贴合运动 | 支持 `attachObject` 贴合 CustomObject 平滑跟随 | 支持 `attachObject` 贴合 CustomObject 平滑跟随 | 不支持——图层内部点位是静态/批量刷新的，不做单点跟随 |
| 适用场景 | 设备/传感器点位详情查看、告警点点击处置、需要弹窗展示业务系统数据 | 重点目标强调、应急告警的立体闪烁/光柱等动态特效提示 | 产业企业点位、人口/事件点位等海量 POI 上图，需要自动聚合防止拥挤 |
| 数量上限 | 单次 add 不超过 5000 个，单工程总量不超过 20 万个 | 无独立上限说明，但渲染开销高于普通 marker，应严格控制数量 | 专为海量设计，自带聚合式降载 |

**选型口诀**：要交互丰富（弹窗/视频/hover）且量不大 → `marker`；要三维表现力（旋转缩放特效）且只有少数重点目标 → `marker3d`；要扛住成千上万的点位又不能卡 → `markerLayer`。三者可在同一场景内组合使用（如：`markerLayer` 打底显示全部设备，用户点击聚合簇展开到具体区域后，再用 `marker`/`marker3d` 呈现该区域的重点设备详情）。

实践约定：点位 `id` 与业务系统主键一一对应；批量刷新用 `updateBegin()`/`updateEnd()` 包裹；不同业务域用 `groupId` 分组，按组显隐替代逐个操作；设置 `setViewHeightRange` 可视高度范围，避免全高度渲染。

```js
// IoT 设备状态轮询 → 批量更新点位
fdapi.marker.updateBegin();
for (const d of devices) {
  fdapi.marker.update({ id: d.deviceId, imagePath: iconOf(d.status) });
}
fdapi.marker.updateEnd();
```

## 密度类：热力图

离散点 + 权重值的空间密度表达走 [`heatmap`](/docs/api/overlay/heatmap)（地表二维热力）；立体热力与海洋温度场见 `heatmap3d` / `oceanHeatmap`。数据结构就是"坐标 + 热力值"数组，适合客流、告警密度、环境监测类数据，更新即重传点集。

## 场数据类：vectorField

风场、洋流、河流流场等科学计算成果（**tif / bin 格式**）走 [`vectorField`](/docs/api/vector/vector-field)，以向量场/箭头/烟雾形态动态渲染。这类数据由气象/海洋模型系统产出，前端只负责挂载与形态参数调优。

## 水利仿真类：hydro 家族

水利水务场景有专门的对象家族，按数据形态选择：

| 数据形态 | API |
|---------|-----|
| 淹没范围推演（水位驱动） | [`floodFill`](/docs/api/hydro/flood-fill) |
| 一维/二维水动力模型成果 | `hydrodynamic1d` / `hydrodynamic2d`、`HydrodynamicModel`（支持按时刻播放） |
| 自定义水面/水体网格 | [`waterMesh`](/docs/api/hydro/water-mesh) |
| 水面流场表现 | `waterFlowField`、`dynamicWater`、`river` |

水动力模型类对象支持 `startPlay` / `setTime` 时序播放，适合"降雨过程回放"类需求，完整清单见 API 文档「水利仿真」分类。

## 视频类：两条融合通道

| 通道 | API | 适用 |
|------|-----|------|
| 通用视频投影 | [`videoProjection`](/docs/api/overlay/video-projection) | 将视频流投射到场景表面，通用方案 |
| 大华 ICC 平台对接 | [`daHuaVideoFusion`](/docs/api/layer/da-hua-video-fusion) | 已建大华 ICC 的项目直连，含摄像头标签 |

窗口式视频播放（非融合）另见 `misc.playVideo` 与[多路视频教程](/docs/tutorials/multi-video)。

## 接入层架构建议

业务数据接入建议收敛为统一的"接入层"模块，职责：坐标清洗（见[坐标配准](/docs/tutorials/data-georeference)）、业务主键 ↔ 场景对象 id 映射、批量更新节流（updateBegin/End + 按帧合并）、断线重连后的状态重建。将 fdapi 调用集中在接入层，业务组件只面对领域模型——这是大型孪生项目可维护性的分水岭，参考[框架集成教程](/docs/tutorials/framework-integration)。
