---
title: RadiationPoint
sidebar_label: RadiationPoint
description: "RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。"
---

# RadiationPoint

RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。



![](/img/refdoc/api/RediationPoint.Update.gif)

通过 `api.radiationPoint` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。
- **别名 / 不同行业叫法**：辐射点 / 辐射圈 / 扩散圈 / 影响范围 / 污染扩散 / 信号覆盖圈 / 预警圈。
- **适用行业**：应急（污染/危化扩散）、环保、安防、通信、城市治理
- **使用场景**：
  - 污染源、危化品泄漏的扩散范围示意
  - 事件影响半径与预警圈表达
  - 信号/服务覆盖范围的示意
- **注意事项**：
  - 为示意性表达，非精确扩散模型
  - 半径与衰减参数需结合业务设定
  - 常与告警点、标注配合使用



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个RadiationPoint对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的RadiationPoint | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个RadiationPoint对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`focusAll`](#focusAll) | 自动定位到能观察所有RadiationPoint对象的合适距离 | 相机定位到全部对象的合适视角 |
| [`get`](#get) | 根据ID获取RadiationPoint的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏RadiationPoint | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有RadiationPoint | 一键隐藏全部对象 |
| [`setAutoHeight`](#setAutoHeight) | 设置AutoHeight 自动判断下方是否有物体，设置正确高度 |  |
| [`setBrightness`](#setBrightness) | 设置新的亮度 |  |
| [`setColor`](#setColor) | 设置颜色 |  |
| [`setCoordinate`](#setCoordinate) | 设置坐标 |  |
| [`setRadius`](#setRadius) | 设置半径 |  |
| [`setRippleNumber`](#setRippleNumber) | 设置波纹数量 |  |
| [`show`](#show) | 显示RadiationPoint | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有RadiationPoint | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个RadiationPoint对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个RadiationPoint对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组id |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinate` | `array` | 坐标点，[取值示例](/docs/tutorials/coordinates) |
| `radius` | `number` | 辐射圈的半径，取值范围：[0~500000]，单位：米 |
| `rippleNumber` | `number` | 波纹数量，取值范围：[0~5]，单位：个 |
| `color` | [`Color`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `intensity` | `number` | 亮度，取值范围：[0~1.0] |
| `autoHeight` | `boolean` | 自动判断下方是否有物体，设置正确高度，默认值：false |

> 示例：Add

```js
fdapi.radiationPoint.clear();
let o = {
    id: '1',
    coordinate: [494479.71875, 2491462.25, 0],//辐射圈坐标位置
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    radius: 300,//辐射半径
    rippleNumber: 5,//波纹数量
    color: [1, 0, 0, 0.8],//颜色
    intensity: 0.8,//亮度
    autoHeight: false//自动判断下方是否有物体
}
await fdapi.radiationPoint.add(o);
fdapi.radiationPoint.focus(o.id, 800, 1);
```

---

### `clear(fn)` {#clear}

删除场景中所有的RadiationPoint

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.radiationPoint.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个RadiationPoint对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的RadiationPoint对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
let ids = ['0', '1'];
fdapi.radiationPoint.delete(ids);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | RadiationPoint对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.radiationPoint.focus('1', 200);
```

---

### `focusAll(distance, flyTime, rotation, fn)` {#focusAll}

自动定位到能观察所有RadiationPoint对象的合适距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：FocusAll

```js
fdapi.radiationPoint.focusAll();
```

---

### `get(ids, fn)` {#get}

根据ID获取RadiationPoint的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的RadiationPoint对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
RadiationPoint的详细信息
{
            "id":	"1",
            "groupId":	"",
            "userData":	"",
            "coordinate":	[62.838749, 0.080000, 0.400000],
            "rippleNumber":	5.000000,
            "radius":	300.000000,
            "color":	[1.000000, 0.000000, 1.000000],
            "brightness":	0.800000,
            "autoHeight":	0
        }
```

> 示例：Get

```js
fdapi.radiationPoint.get('1');
```

---

### `hide(ids, fn)` {#hide}

隐藏RadiationPoint

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | RadiationPoint对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.radiationPoint.hide('1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有RadiationPoint

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.radiationPoint.hideAll();
```

---

### `setAutoHeight(id, newVal, fn)` {#setAutoHeight}

设置AutoHeight 自动判断下方是否有物体，设置正确高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | `boolean` | 自动判断下方是否有物体，设置正确高度 true/false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setAutoHeight(id, newVal);
```

---

### `setBrightness(id, newVal, fn)` {#setBrightness}

设置新的亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | `number` | 新亮度值，取值范围：[0~1] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setBrightness(id, newVal);
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setColor(id, newVal);
```

---

### `setCoordinate(id, newVal, fn)` {#setCoordinate}

设置坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | `array` | 新的坐标值，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setCoordinate(id, newVal);
```

---

### `setRadius(id, newVal, fn)` {#setRadius}

设置半径

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | `number` | 辐射圈新的半径，取值范围：[0~500000]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setRadius(id, newVal);
```

---

### `setRippleNumber(id, newVal, fn)` {#setRippleNumber}

设置波纹数量

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | RadiationPoint对象的ID |
| `newVal` | `number` | 新波纹数量，取值范围：[0~5]，单位：个 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.setRippleNumber(id, newVal);
```

---

### `show(ids, fn)` {#show}

显示RadiationPoint

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | RadiationPoint对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.radiationPoint.show('1');
```

---

### `showAll(fn)` {#showAll}

显示所有RadiationPoint

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.radiationPoint.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个RadiationPoint对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: '1',
    coordinate: [494479.71875, 2491462.25, 0],
    radius: 100,
    rippleNumber: 2,
    color: [0, 1, 0, 1],
    intensity: 0.5,
    autoHeight: true
}
await fdapi.radiationPoint.update(o);
fdapi.radiationPoint.focus(o.id);
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
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.radiationPoint.updateEnd();
```
