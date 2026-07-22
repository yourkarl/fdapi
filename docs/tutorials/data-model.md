---
title: 模型资产与 pak 管线
sidebar_label: 模型与 pak
description: "UE pak 模型资产的制作要求、三种挂载方式与 customObject 动态实体加载，以及 customMesh 程序化几何。"
---

# 模型资产与 pak 管线

车辆、无人机、设备等**动态实体模型**不走 3dt 底座，而是以 UE `.pak` 资产包交付，由 [`customObject`](/docs/api/model/custom-object) 在运行时实例化并驱动。这是 DTS 与纯 Web 3D 引擎（glTF 直加载）差异最大的一条数据管线，理解它可以避免大量返工。

## pak 资产的制作要求

pak 由美术侧在 UE 工程中打包产出，对接时向资产方明确两点：

1. **模型必须封装为蓝图 Actor 类**——`customObject` 通过蓝图 Actor 的工程内相对路径引用资产；
2. 交付物需包含：pak 文件 + 每个资产的 `assetPath`（蓝图 Actor 在 UE 工程的资源引用相对路径）。路径拿错是"添加成功但场景里看不到"的头号原因。

## 三种挂载方式

pak 需先挂载到云渲染实例才能实例化：

| 方式 | 操作 | 适用 |
|------|------|------|
| Cloud 文件资源（推荐） | pak 上传至 Cloud 文件资源目录，`@path:` 引用 | 生产环境的常规交付 |
| 热挂载已上传的 pak | 新 pak 复制入资源目录后调用 `fdapi.misc.reloadPak()` 重新挂载 | 不重启实例更新资产 |
| 实时指定路径 | `fdapi.settingsPanel.setPakFile()` / `setPakFolder()` | 开发调试期快速验证 |

## customObject 实例化与驱动

```js
// 从 pak 添加动态实体
fdapi.customObject.add({
  id: 'truck_01',
  pakFilePath: '@path:/pak/vehicles.pak',
  assetPath: '/Game/Vehicles/BP_Truck.BP_Truck_C',  // 蓝图 Actor 相对路径，以资产方提供为准
  coordinate: [x, y, z],
  rotation: [pitch, yaw, roll],
});

// 之后即可驱动：位置更新、姿态、动画
fdapi.customObject.update({ id: 'truck_01', coordinate: next });

// 相机跟随：不是 camera 侧发起，而是 customObject.focus 的 distance<0 或 ActionMode 跟随模式
fdapi.customObject.focus('truck_01', -1);   // distance=-1：相机自动跟随该对象移动
// 结束跟随：
fdapi.camera.cancelFollow();
```

高频轨迹驱动（GPS/IoT 回传）注意用 `updateBegin()` / `updateEnd()` 包裹批量更新，帧同步与插值策略见[帧同步与 FrameTick](/docs/tutorials/frame-tick)；相机跟随的完整参数（`ActionMode`、偏移量等）见 [CustomObject.focus](/docs/api/model/custom-object#focus) 与 [Camera.cancelFollow](/docs/api/camera/camera#cancelFollow)。

## customMesh：程序化几何

没有现成模型、需要按数据实时生成体块时（声场包络、信号覆盖体、自定义地形补丁），用 [`customMesh`](/docs/api/model/custom-mesh) 以顶点/索引数组直接构造网格并着色，全程无需美术资产。

## 沿线体量：splineMesh

管道、管廊、线缆等"有真实粗细的线状实体"介于矢量与模型之间：用 [`splineMesh`](/docs/api/vector/spline-mesh) 沿坐标轨迹放样截面即可，支持内置截面样式或引用自定义模型，不必为每段管线制作 pak。

## 对接流程建议

模型资产对接建议按此顺序推进：资产方交付 pak + assetPath 清单 → 开发期用 `setPakFile` 快速验证每个 assetPath 可实例化 → 验证通过后 pak 入 Cloud 文件资源、代码切换 `@path:` 引用 → 资产更新走 `reloadPak` 热挂载。将 assetPath 清单维护为配置文件而非散落在代码中，资产迭代时只改配置。
