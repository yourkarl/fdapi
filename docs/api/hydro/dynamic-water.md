---
title: DynamicWater
sidebar_label: DynamicWater
description: "DynamicWater类，提供动态水面相关的操作 一般通过api.dynamicWater调用其方法"
---

# DynamicWater

DynamicWater类，提供动态水面相关的操作

一般通过api.dynamicWater调用其方法

通过 `api.dynamicWater` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个DynamicWater对象

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
| `coordinates` | `array` | 坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `style` | `number` | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |

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

### `clear(fn)`

删除场景中所有的DynamicWater

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.dynamicWater.clear();
```

---

### `delete(ids, fn)`

删除一个或多个DynamicWater对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的DynamicWater对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.dynamicWater.delete('dy1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | DynamicWater对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.dynamicWater.focus('dy1', 100);
```

---

### `focusAll(distance, flyTime, rotation, fn)`

自动定位到能观察所有DynamicWater对象的合适距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：FocusAll

```js
fdapi.dynamicWater.focusAll();
```

---

### `get(ids, fn)`

根据ID获取DynamicWater的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的DynamicWater对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

### `setCoordinates(id, newVal, fn)`

设置DynamicWater的坐标信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | DynamicWater对象ID |
| `newVal` | `array` | 坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.dynamicWater.setCoordinates(id, newVal);
```

---

### `setStyle(id, newVal, fn)`

设置动态水的样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | DynamicWater对象ID |
| `newVal` | `number` | 动态水的样式，取值：0（深蓝）、1（蓝）、2（湖水） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.dynamicWater.setStyle(id, newVal);
```

---

### `update(data, fn)`

修改一个或多个DynamicWater对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
await fdapi.dynamicWater.update({
    id: 'dy1',
    style: 2
});
fdapi.dynamicWater.focus('dy1', 200);
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
await fdapi.dynamicWater.updateEnd();
```
