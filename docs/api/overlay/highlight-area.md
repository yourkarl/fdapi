---
title: HighlightArea
sidebar_label: HighlightArea
description: "HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。"
---

# HighlightArea

HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。



![](/img/refdoc/api/HlghlightArea.Update.gif)

通过 `api.highlightArea` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。
- **别名 / 不同行业叫法**：高亮区域、热区、责任区、网格、管辖范围、染色区、圈层、重点区域。
- **适用行业**：智慧城市、应急管理、园区、智慧水利、安防、交通。
- **使用场景**：
  - 应急 / 城市管理：高亮事件影响范围、风险责任区、网格化管理单元，配合调度指挥。
  - 园区 / 安防：突出显示重点防护区域、权属地块、围栏内建筑。
  - 水利行业：淹没范围、防洪责任段、河湖管理范围的区域强调。
- **注意事项**：
  - `heightRange` 用于限定染色的 Z 坐标区间，只有处于该区间的模型才会被染色，需结合实际高程设置。
  - `depthTest` 为 true 时高亮会被前方物体遮挡，需穿透显示时设为 false。
  - 多边形 `coordinates` 应保证闭合且无自相交，避免染色异常。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个HighlightArea对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的HighlightArea | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个HighlightArea对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取HighlightArea的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏HighlightArea | 按业务条件隐藏对象 |
| [`setColor`](#setColor) | 设置颜色 |  |
| [`setCoordinates`](#setCoordinates) | 设置坐标 |  |
| [`setDepthTest`](#setDepthTest) | 设置是否做深度检测 |  |
| [`setHeightRange`](#setHeightRange) | 设置高度范围 |  |
| [`setIntensity`](#setIntensity) | 设置亮度 |  |
| [`show`](#show) | 显示HighlightArea | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个HighlightArea对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个HighlightArea对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或者数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinates` | `array` | 多边形坐标数组（二维数组），[取值示例](/docs/tutorials/coordinates) |
| `color` | [`Color`](/docs/api/types#color) | 多边形高亮颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `heightRange` | `array` | 高亮染色区域高度范围：[min,max]，数组元素取值范围：[任意浮点数]，取值说明：Z坐标的区间，只有Z值这这个区间的模型才会被染色 |
| `intensity` | `number` | 高亮颜色的强度，取值范围：[0~1000] |
| `depthTest` | `boolean` | 是否做深度检测，默认为true（DepthTest=true会被遮挡，false的话不会被遮挡） |

> 示例：Add

```js
fdapi.highlightArea.clear();
let o = {
    id: '1',
    coordinates: [
        [488526.90625, 2488808.5, 2.4699218273162842],
        [489125.78125, 2490378.75, 4.0634374618530273],
        [489808.625, 2490836.5, 4.278437614440918],
        [490844.5, 2490698.75, 8.6131248474121094],
        [491145.71875, 2489830, 20.654062271118164],
        [491075.59375, 2488885.5, 21.038749694824219],
        [490706.875, 2487941.75, 4.1996874809265137],
        [490053.40625, 2486989, 17.100000381469727],
        [489206.875, 2487352.75, 16.781406402587891],
    ],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    color: [0, 1, 0, 0.8],      //多边形高亮颜色
    heightRange: [0.0, 200.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
    intensity: 1.0,             //高亮颜色的强度
    depthTest: true             //深度检测
};
await fdapi.highlightArea.add(o);
fdapi.highlightArea.focus(o.id);
```

---

### `clear(fn)` {#clear}

删除场景中所有的HighlightArea

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.highlightArea.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个HighlightArea对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HighlightArea对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.highlightArea.delete('1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HighlightArea对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.highlightArea.focus('1', 600);
```

---

### `get(ids, fn)` {#get}

根据ID获取HighlightArea的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HighlightArea对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
高亮区域的详细信息
{
            "id":	"1",
            "coordinates":	[],
            "color":	[1.000000, 0.000000, 0.000000, 0.800000],
            "heightRange":	[0.000000, 100.000000],
            "intensity":	5.000000
        }
```

> 示例：Get

```js
fdapi.highlightArea.get('1');
```

---

### `hide(ids, fn)` {#hide}

隐藏HighlightArea

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HighlightArea对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.highlightArea.hide('1');
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HighlightArea对象的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.setColor(id, newVal);
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HighlightArea对象的ID |
| `newVal` | `array` | 新的坐标值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.setCoordinates(id, newVal);
```

---

### `setDepthTest(id, newVal, fn)` {#setDepthTest}

设置是否做深度检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HighlightArea对象的ID |
| `newVal` | `boolean` | 是否做深度检测 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.setDepthTest(id, newVal);
```

---

### `setHeightRange(id, newVal, fn)` {#setHeightRange}

设置高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HighlightArea对象的ID |
| `newVal` | `array` | 高亮染色区域高度范围：[min,max] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.setHeightRange(id, newVal);
```

---

### `setIntensity(id, newVal, fn)` {#setIntensity}

设置亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HighlightArea对象的ID |
| `newVal` | `number` | 新的亮度值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.setIntensity(id, newVal);
```

---

### `show(ids, fn)` {#show}

显示HighlightArea

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HighlightArea对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.highlightArea.show('1');
```

---

### `update(data, fn)` {#update}

修改一个或多个HighlightArea对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或者数组，数据结构请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: '1',
    coordinates: [
        [488526.90625, 2488808.5, 2.4699218273162842],
        [489125.78125, 2490378.75, 4.0634374618530273],
        [489808.625, 2490836.5, 4.278437614440918],
        [490844.5, 2490698.75, 8.6131248474121094],
        [491145.71875, 2489830, 20.654062271118164],
        [491075.59375, 2488885.5, 21.038749694824219]
    ],
    color: [1, 0, 0, 0.5],      //多边形高亮颜色
    heightRange: [0.0, 300.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
    intensity: 2.0              //高亮颜色的强度
};
await fdapi.highlightArea.update(o);
fdapi.highlightArea.focus(o.id);
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

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
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/t