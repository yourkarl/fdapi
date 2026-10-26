---
title: Viewshed
sidebar_label: Viewshed
description: "Viewshed 可视域分析对象，从观察点按水平/俯仰角与横纵视角向外投射视锥，实时计算并着色地形与建筑的可见/不可见区域，用于监控布点、雷达/摄像头覆盖、观景视野评估。"
---

# Viewshed

Viewshed可视域分析对象相关的操作

通过 `api.viewshed` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Viewshed 在场景中创建一个视锥体（frustum），以观察点（location）、水平角（yaw）、俯仰角（pitch）、横向/纵向视角（fov_h / fov_v）与观察距离（distance）定义可视范围，并由引擎逐像素判定地形、建筑、模型的遮挡关系，把可见区域与不可见区域分别着色（默认绿色可见 / 红色不可见）。与 `tools.startViewshedAnalysis` 的"面板式一次性分析"不同，Viewshed 是**持久化的场景对象**：可批量 add、按 ID update、按分组 show/hide，并与相机、业务数据联动。
- **别名 / 不同行业叫法**：可视域分析 / 通视分析 / 视野分析 / 视锥分析；安防行业也称"监控覆盖分析""摄像头视野仿真"。
- **适用行业**：安防监控、智慧城市（摄像头/雷达布点）、园区与建筑规划（观景视野、日照通视）、军事与应急（观察哨视野、盲区排查）、通信基站与信号覆盖。
- **使用场景**：
  - 监控点位布设：在城市三维场景中批量创建摄像头视野，直观看出哪些区域是监控盲区。
  - 雷达/瞭望塔选址：调整 pitch 与 fov 参数对比不同点位的覆盖范围，辅助选址决策。
  - 建筑遮挡评估：新建楼栋前后对比可视域变化，评估对周边视野的遮挡影响。
  - 演练与汇报：把可视域对象与摄像头模型、标注联动显示，形成可交互的安防态势页面。
- **注意事项**：
  - `add` 返回前请等待回调或 `await`，不要立即 `focus` 不存在的 ID。
  - 视锥的可见性计算受地形与模型遮挡影响，工程需加载地形（见 [`GlobeTerrain`](/docs/api/layer/globe-terrain)）才有准确结果。
  - `interactiveLock` 开启后可视域区域不可被鼠标拾取，适合只做展示、不参与交互的场景。
  - `frustumVisible` 仅控制视锥线框显示，与可见/不可见着色互不影响。
  - 颜色参数遵循全局 `Color` 约定，详见 [`types`](/docs/api/types) 与 [`颜色教程`](/docs/tutorials/color)。

继承自 [`BaseObject`](/docs/api/utils/base-object)，具备 `updateBegin` / `updateEnd` 批量更新能力。

**相关对象**：需要「从哪里被看到」的判断可配合 [`ExcavationAnalysis`](/docs/api/analysis/excavation-analysis)（开挖分析）一起使用；批量改可视域样式前先看 [`BaseObject`](/docs/api/utils/base-object) 的批量更新协议。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Viewshed对象 | 批量创建对象 |
| [`clear`](#clear) | 清空场景中所有的Viewshed | 清空全部对象 |
| [`delete`](#delete) | 删除一个或多个Viewshed对象 | 按 ID 移除对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标 |
| [`get`](#get) | 根据ID获取Viewshed的详细信息 | 查询对象信息 |
| [`hide`](#hide) | 隐藏指定的Viewshed | 按条件隐藏 |
| [`hideAll`](#hideAll) | 隐藏所有Viewshed | 一键隐藏本类对象 |
| [`show`](#show) | 显示指定的Viewshed | 按条件显示 |
| [`showAll`](#showAll) | 显示所有Viewshed | 一键恢复显示 |
| [`update`](#update) | 修改一个或多个Viewshed对象 | 运行时改属性 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据 | 大批量改属性前开启事务 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 提交批量修改 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Viewshed对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data.id` | `string` | 是 | - | 字符串类型的ID |
| `data.groupId` | `string` | 否 | - | 可选，Group分组 |
| `data.userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `data.location` | `array` | 是 | - | 观察点位置坐标 |
| `data.yaw` | `number` | 是 | 0 | 水平角，取值范围：[-180°~180°]，默认值：0 |
| `data.pitch` | `number` | 是 | 0 | 俯仰角，取值范围：[-90°~90°]，默认值：0 |
| `data.fov_h` | `number` | 是 | 60 | 横向视角，取值范围：[1°~150°]，默认值：60 |
| `data.fov_v` | `number` | 是 | 30 | 纵向视角，取值范围：[1°~150°]，默认值：30 |
| `data.distance` | `number` | 是 | 100 | 观察距离（视锥远裁面 / 可视半径），默认值：100，单位：米 |
| `data.height` | `number` | 是 | 0 | 视点高度（相对 `location` 的抬升），默认值：0，单位：米 |
| `data.visibleColor` | `Color` | 是 | Color.Green | 可见区域颜色，默认值：Color.Green，支持四种格式，取值示例 |
| `data.invisibleColor` | `Color` | 是 | Color.Red | 不可见区域颜色，默认值：Color.Red，支持四种格式，取值示例 |
| `data.interactiveLock` | `boolean` | 是 | false | 是否开启交互锁定，默认值：false |
| `data.frustumVisible` | `boolean` | 是 | false | 是否显示可视域线框，默认值：false |


### `clear(fn)` {#clear}

清空场景中所有的Viewshed

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `delete(ids, fn)` {#delete}

删除一个或多个Viewshed对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的Viewshed对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Viewshed对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | - | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `get(ids, fn)` {#get}

根据ID获取Viewshed的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的Viewshed对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

```js
Viewshed的详细信息
{
        "id": "vs_01",
        "location": [486931.84, 2490639.75, 6.38],
        "yaw": 30, "pitch": -5,
        "fov_h": 120, "fov_v": 45,
        "distance": 800, "height": 10,
        "visibleColor": [0, 1, 0, 1],
        "invisibleColor": [1, 0, 0, 1],
        "interactiveLock": false
       }
```


### `hide(ids, fn)` {#hide}

隐藏指定的Viewshed

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Viewshed对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `hideAll(fn)` {#hideAll}

隐藏所有Viewshed

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `show(ids, fn)` {#show}

显示指定的Viewshed

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Viewshed对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `showAll(fn)` {#showAll}

显示所有Viewshed

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `update(data, fn)` {#update}

修改一个或多个Viewshed对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，请参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性 在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据 注意： updateBegin不是异步调用，不需要await，也没有回调函数参数

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) {
     fdapi.xxx.setColor(i, Color.Yellow);
} 
fdapi.xxx.updateEnd(function () {
     log('update finished!');
});
```


### `updateEnd(fn)` {#updateEnd}

用于批量多次修改对象的属性，与updateBegin配套使用 注意： updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


