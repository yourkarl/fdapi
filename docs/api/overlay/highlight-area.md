---
title: HighlightArea
sidebar_label: HighlightArea
description: "HighlightArea(高亮区域)相关的操作 一般通过api.highlightArea调用其方法"
---

# HighlightArea

HighlightArea(高亮区域)相关的操作

一般通过api.highlightArea调用其方法



![](/img/refdoc/api/HlghlightArea.Update.gif)

通过 `api.highlightArea` 访问。

---

## 方法（Methods）

### `add(data, fn)`

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

### `clear(fn)`

删除场景中所有的HighlightArea

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.highlightArea.clear();
```

---

### `delete(ids, fn)`

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

### `focus(ids, distance, flyTime, rotation, fn)`

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

### `get(ids, fn)`

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

### `hide(ids, fn)`

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

### `setColor(id, newVal, fn)`

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

### `setCoordinates(id, newVal, fn)`

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

### `setDepthTest(id, newVal, fn)`

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

### `setHeightRange(id, newVal, fn)`

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

### `setIntensity(id, newVal, fn)`

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

### `show(ids, fn)`

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

### `update(data, fn)`

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

### `updateBegin()`

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

### `updateEnd(fn)`

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.highlightArea.updateEnd();
```
