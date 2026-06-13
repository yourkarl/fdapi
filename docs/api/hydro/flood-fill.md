---
title: FloodFill
sidebar_label: FloodFill
description: "FloodFill 水淹分析相关的操作 一般通过api.floodFill调用其方法"
---

# FloodFill

FloodFill 水淹分析相关的操作

一般通过api.floodFill调用其方法

通过 `api.floodFill` 访问。

## 构造函数

```js
new FloodFill()
```

---

## 方法（Methods）

### `add(data, fn)`

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
| `color` | `Color` | 水颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `precision` | `number` | 水淹模拟精度，取值范围：[0~1] 精度越高效率会降低 |

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

### `clear(fn)`

删除场景中所有的FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.floodFill.clear();
```

---

### `delete(ids, fn)`

删除一个或多个FloodFill对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的FloodFill对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.floodFill.delete('fd1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.floodFill.focus('fd1', 100);
```

---

### `get(ids, fn)`

根据ID获取FloodFill的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的FloodFill对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

### `hide(ids, fn)`

隐藏FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.floodFill.hide('fd1');
```

---

### `hideAll(fn)`

隐藏所有FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.floodFill.hideAll();
```

---

### `setColor(id, newVal, fn)`

设置水颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `Color` | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.floodFill.setColor(id, newVal);
```

---

### `setElevation(id, newVal, fn)`

设置水位高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.floodFill.setElevation(id, newVal);
```

---

### `setPrecision(id, newVal, fn)`

设置水淹模拟精度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.floodFill.setPrecision(id, newVal);
```

---

### `setRange(id, minArr, maxArr, fn)`

设置水淹分析范围 注意：出水点[x,y]一定要在新设置的水淹分析范围[min~max]内

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 水淹分析范围唯一标识，字符串类型的ID |
| `minArr` | `array` | 水淹分析范围Min：[x,y]，数组元素取值：[任意数值] |
| `maxArr` | `array` | 水淹分析范围Max：[x,y]，数组元素取值：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.floodFill.setRange(id, minArr, maxArr);
```

---

### `setSeed(id, newVal, fn)`

设置出水点

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.floodFill.setSeed(id, newVal);
```

---

### `show(ids, fn)`

显示FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | FloodFill对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.floodFill.show('fd1');
```

---

### `showAll(fn)`

显示所有FloodFill

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.floodFill.showAll();
```

---

### `update(data, fn)`

修改一个或多个FloodFill对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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
await fdapi.floodFill.updateEnd();
```
