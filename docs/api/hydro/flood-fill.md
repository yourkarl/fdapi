---
title: FloodFill
sidebar_label: FloodFill
description: "FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。"
---

# FloodFill

FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。

通过 `api.floodFill` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。
- **别名 / 不同行业叫法**：淹没分析 / 水淹分析 / 淹没范围模拟 / 洪水演进（淹没填充）/ 漫滩分析；应急领域常称“淹没范围推演”“受淹区识别”。
- **适用行业**：智慧水利、应急管理、智慧城市（内涝防治）、能源电力（库区/电站防洪）、海洋气象（风暴潮淹没）。
- **使用场景**：
  - 防汛应急中给定预测水位，快速推演城区或村镇的淹没范围，辅助受影响人口与设施研判。
  - 水库溃坝、超标洪水的“假设水位”淹没推演，支撑撤离路线与警戒区域划定。
  - 城市内涝低洼点积水范围模拟，配合地形 DEM 评估受淹道路与地下空间风险。
- **注意事项**：
  - 出水点 seed 必须落在 [min,max] 分析范围内且不被模型遮挡，否则结果无效；通常取地形高度上方的合法点位。
  - precision 越高精度越好但效率越低，大范围分析建议先用低精度试算再细化；分析范围 min/max 应贴合关注区域，避免无谓计算开销。
  - 属于基于水位的静态淹没填充，不含真实时序水动力过程；需要动态演进过程时应配合水动力模型对象使用。

## 构造函数

```js
new FloodFill()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个FloodFill对象， | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的FloodFill | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个FloodFill对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取FloodFill的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏FloodFill | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有FloodFill | 一键隐藏全部对象 |
| [`setColor`](#setColor) | 设置水颜色 |  |
| [`setElevation`](#setElevation) | 设置水位高度 |  |
| [`setPrecision`](#setPrecision) | 设置水淹模拟精度 |  |
| [`setRange`](#setRange) | 设置水淹分析范围 |  |
| [`setSeed`](#setSeed) | 设置出水点 |  |
| [`show`](#show) | 显示FloodFill | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有FloodFill | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个FloodFill对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个FloodFill对象，

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `min` | `array` | 水淹分析范围Min：[x,y]，数组元素取值：[任意数值] |
| `max` | `array` | 水淹分析范围Max：[x,y]，数组元素取值：[任意数值] |
| `seed` | `array` | 出水点，水淹分析范围[min~max]内的任意[x,y]，数组元素取值：[任意数值] 注意：出水点必须在水淹分析范围内，且不能被物体遮挡，否则会无效 |
| `elevation` | `number` | 水位高度，取值范围：[任意正数]，单位：米 |
| `color` | [`Color`](/docs/api/types#color) | 水颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `precision` | `number` | 水淹模拟精度，取值范围：[0~1] 精度越高效率会降低 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
fdapi.floodFill.clear();
let o = {
    id: 'fd1',
    min: [494023.875, 2491299.75],//水淹分析范围min
    max: [494564.21875, 2491845.5],//水淹分析范围max
    seed: [494084.9, 2491641],//出水点 注意：出水点一定要在水淹分析范围[min~max]内，否则接口会报错
    elevation: 2.5,//水位高度
    color: Color.LightSeaGreen,//水颜色
    precision: 0.5 //水淹模拟精度
}
await fdapi.floodFill.add(o);
fdapi.floodFill.focus(o.id);
```

---

### `clear(fn)` {#clear}

删除场景中所有的FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.floodFill.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个FloodFill对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的FloodFill对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.floodFill.delete('fd1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.floodFill.focus('fd1', 100);
```

---

### `get(ids, fn)` {#get}

根据ID获取FloodFill的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的FloodFill对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
FloodFill的详细信息
{
        "id": "fd1",
        "min": [495119.875, 2491031.25],//水淹分析范围min
        "max": [495386.625, 2491245.5],//水淹分析范围max
        "seed": [495304.9, 2491041],//出水点 注意：出水点[x,y]一定要在水淹分析范围[min~max]内，否则接口会报错
        "elevation": 3.5,//水位高度
        "color": [0,1,0,1],//水颜色
        "precision": 0.5 //水淹模拟精度
        }
```

> 示例：Get

```js
fdapi.floodFill.get('fd1');
```

---

### `hide(ids, fn)` {#hide}

隐藏FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.floodFill.hide('fd1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.floodFill.hideAll();
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置水颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.floodFill.setColor(id, newVal);
```

---

### `setElevation(id, newVal, fn)` {#setElevation}

设置水位高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.floodFill.setElevation(id, newVal);
```

---

### `setPrecision(id, newVal, fn)` {#setPrecision}

设置水淹模拟精度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.floodFill.setPrecision(id, newVal);
```

---

### `setRange(id, minArr, maxArr, fn)` {#setRange}

设置水淹分析范围 注意：出水点[x,y]一定要在新设置的水淹分析范围[min~max]内

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 水淹分析范围唯一标识，字符串类型的ID |
| `minArr` | `array` | 水淹分析范围Min：[x,y]，数组元素取值：[任意数值] |
| `maxArr` | `array` | 水淹分析范围Max：[x,y]，数组元素取值：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.floodFill.setRange(id, minArr, maxArr);
```

---

### `setSeed(id, newVal, fn)` {#setSeed}

设置出水点

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.floodFill.setSeed(id, newVal);
```

---

### `show(ids, fn)` {#show}

显示FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.floodFill.show('fd1');
```

---

### `showAll(fn)` {#showAll}

显示所有FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.floodFill.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个FloodFill对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let o = {
    id: 'fd1',
    min: [495119.875, 2491031.25],
    max: [495386.625, 2491245.5],
    seed: [495304.9, 2491041],
    elevation: 2.5,
    color: Color.DarkSeaGreen,
    precision: 0.25
}
await fdapi.floodFill.update(o);
fdapi.floodFill.focus(o.id);
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
|------|------|------|
| `fn` | `function` | 可选的回调

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。
