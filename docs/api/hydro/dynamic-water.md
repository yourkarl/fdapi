---
title: DynamicWater
sidebar_label: DynamicWater
description: "DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。"
---

# DynamicWater

DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。

通过 `api.dynamicWater` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。
- **别名 / 不同行业叫法**：动态水面 / 动态水体 / 流动水面；在景观与城市表达中也称“水景水面”“面状水域”。
- **适用行业**：智慧水利、智慧城市、智慧园区、智慧交通（沿江沿河路网）、测绘与三维可视化。
- **使用场景**：
  - 智慧城市/园区底图中把河道、人工湖、景观水池渲染为带波纹的动态水面，提升场景真实感。
  - 水库、湖泊等大面积水域的常态化展示，按多边形勾勒水面范围并赋予流动质感。
  - 与建筑、桥梁、地形模型叠加，作为基础水域底景，无需精确仿真的轻量化表达。
- **注意事项**：
  - 属于效果型水面，不反映真实水深、流速与演进过程；需要真实数据驱动时应改用 HydroDynamic2D / HydroDynamic1D 等水动力对象。
  - coordinates 需注意坐标系类型（coordinateType），高程 Z 决定水面贴合地形的高度，避免水面穿模或悬空。
  - 多边形顶点过多或水面范围过大可能影响渲染性能，建议按可视范围合理控制面片规模。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个DynamicWater对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的DynamicWater | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个DynamicWater对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`focusAll`](#focusAll) | 自动定位到能观察所有DynamicWater对象的合适距离 | 相机定位到全部对象的合适视角 |
| [`get`](#get) | 根据ID获取DynamicWater的详细信息 | 查询对象信息，用于业务联动 |
| [`setCoordinates`](#setCoordinates) | 设置DynamicWater的坐标信息 |  |
| [`setStyle`](#setStyle) | 设置动态水的样式 |  |
| [`update`](#update) | 修改一个或多个DynamicWater对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个DynamicWater对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinates` | `array` | 是 | - | 坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `style` | `number` | 是 | - | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
fdapi.dynamicWater.clear();
await fdapi.dynamicWater.add({
    id: 'dy1',
    coordinates: [
        [494173.90625, 2491307.5, 0.95875000953674316],
        [494080.625, 2491060.75, 1.3939062356948853],
        [493967.5625, 2490980, 1.2018749713897705],
        [493865.09375, 2490651.25, 0.8790624737739563],
        [493701.90625, 2490626.25, 0.48812499642372131],
        [493494.6875, 2490660.75, 0.16062499582767487],
        [493598.75, 2491086.5, 0.25140625238418579],
        [493707.375, 2491471, 0.14765624701976776],
        [494149.3125, 2491321.25, 0.89968752861022949],
    ],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    style: 0 //水的样式：0（深蓝）、1（蓝）、2（湖水）
});
fdapi.dynamicWater.focus('dy1', 200);
```

---

### `clear(fn)` {#clear}

删除场景中所有的DynamicWater

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.dynamicWater.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个DynamicWater对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的DynamicWater对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.dynamicWater.delete('dy1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | DynamicWater对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.dynamicWater.focus('dy1', 100);
```

---

### `focusAll(distance, flyTime, rotation, fn)` {#focusAll}

自动定位到能观察所有DynamicWater对象的合适距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：FocusAll

```js
fdapi.dynamicWater.focusAll();
```

---

### `get(ids, fn)` {#get}

根据ID获取DynamicWater的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的DynamicWater对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
DynamicWater的详细信息
[{
            "id":	"dy1",
            "groupId":	"",
            "userData":	"",
            "style":	0
        }]
```

> 示例：Get

```js
fdapi.dynamicWater.get('dy1');
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置DynamicWater的坐标信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | DynamicWater对象ID |
| `newVal` | `array` | 是 | - | 坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.dynamicWater.setCoordinates('对象ID', []);
```

---

### `setStyle(id, newVal, fn)` {#setStyle}

设置动态水的样式

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | DynamicWater对象ID |
| `newVal` | `number` | 是 | - | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.dynamicWater.setStyle('对象ID', 0);
```

---

### `update(data, fn)` {#update}

修改一个或多个DynamicWater对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，请参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
await fdapi.dynamicWater.update({
    id: 'dy1',
    style: 2
});
fdapi.dynamicWater.focus('dy1', 200);
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

**返回：** 无返回值。

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) {
     fdapi.xxx.setColor(i, Color.Yellow);
} 
fdapi.xxx.updateEnd(function () {
     log('update finished!');
});
```

---

### `updateEnd(fn)` {#updateEnd}

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|---

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。
