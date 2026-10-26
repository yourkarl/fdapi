---
title: BaseObject
sidebar_label: BaseObject
description: "BaseObject 是三维场景对象的公共父类，提供 updateBegin / updateEnd 批量更新机制——把多次属性修改合并为一次提交，显著减少前端与云渲染服务之间的命令往返。"
---

# BaseObject

三维对象的父类

通过 `api.` 访问（无独立访问器，方法由各子类对象继承，如 `fdapi.marker`、`fdapi.polygon`、`fdapi.viewshed`）。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：BaseObject 是 SDK 中绝大多数三维对象类的公共基类，只定义一套批量更新协议：`updateBegin()` 开启批量事务 → 多次调用子类的 `setXXX` / `update` 修改属性 → `updateEnd(fn)` 一次性提交。Marker、Polygon、Viewshed、Rockburst、Fluid、WaterMesh 等对象均继承自它，因此凡是从 BaseObject 派生的类都天然具备批量更新能力。
- **别名 / 不同行业叫法**：对象基类 / 三维对象父类；批量更新协议（updateBegin-updateEnd）。
- **适用行业**：通用（所有涉及大批量对象属性修改的二次开发场景）。
- **使用场景**：
  - 灯光/信号灯成百上千次改颜色、透明度时，用批量更新把往返次数从 N 次降到 1 次。
  - 车辆编队、标注群组的实时位置刷新，逐帧批量更新优于逐个 `setXXX`。
  - 大屏联动刷新：一次业务数据变更触发多个对象改样式，统一在 `updateEnd` 后进入下一帧。
- **注意事项**：
  - `updateBegin()` **不是异步方法**，不需要 `await`、也没有回调；只有 `updateEnd(fn)` 是异步的。
  - 这套机制是给"循环调用 `setXXX` / `update` 改属性"用的，**批量新增对象请直接用 `add(数组)` 一次性提交，不要把 `add` 包进 `updateBegin/updateEnd`**。
  - `updateBegin` 与 `updateEnd` 必须成对出现，异常分支也要保证 `updateEnd` 被执行，否则会残留未提交的事务。
  - 各子类文档中的 `updateBegin` / `updateEnd` 说明与本页一致，不再重复展开。

**继承本类的常用对象**：[`Marker`](/docs/api/marker/marker) · [`Polygon`](/docs/api/vector/polygon) · [`Polygon3D`](/docs/api/vector/polygon3d) · [`Polyline`](/docs/api/vector/polyline) · [`Decal`](/docs/api/overlay/decal) · [`HeatMap`](/docs/api/overlay/heatmap) · [`Light`](/docs/api/overlay/light) · [`Viewshed`](/docs/api/analysis/viewshed) · [`Rockburst`](/docs/api/battle/rockburst) · [`Fluid`](/docs/api/hydro/fluid) · [`WaterMesh`](/docs/api/hydro/water-mesh) · [`Vehicle`](/docs/api/traffic/vehicle) · [`Antenna`](/docs/api/signal/antenna) · [`CustomObject`](/docs/api/model/custom-object)。

> 完整清单可在各页顶部查看「继承自 BaseObject」提示。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据 | 大批量改属性前开启事务 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 提交批量修改 |

## 方法（Methods）

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


