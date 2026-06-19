---
title: Beam
sidebar_label: Beam
description: "Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。"
---

# Beam

Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。



![](/img/refdoc/api/Beam.Add.gif)

通过 `api.beam` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。
- **别名 / 不同行业叫法**：波束 / 信号波束 / 雷达波束 / 探测扇区 / 扫描波束 / 覆盖锥。
- **适用行业**：国防雷达、通信、低空监管、安防、航空管制
- **使用场景**：
  - 雷达探测范围与扫描动态的展示
  - 通信波束指向与覆盖
  - 低空目标探测态势
- **注意事项**：
  - 为范围/示意表达，非精确电磁计算
  - 波束数量多时注意性能
  - 与天线、信号波配合使用



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Beam对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的Beam | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Beam对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取Beam的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏Beam | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有Beam | 一键隐藏全部对象 |
| [`setColor`](#setColor) | 设置Color |  |
| [`setCoordinates`](#setCoordinates) | 设置Coordinates |  |
| [`setDuration`](#setDuration) | 设置Duration |  |
| [`setInterval`](#setInterval) | 设置Interval |  |
| [`setThickness`](#setThickness) | 设置Thickness |  |
| [`setVelocity`](#setVelocity) | 设置Velocity |  |
| [`show`](#show) | 显示Beam | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有Beam | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个Beam对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Beam对象

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
| `duration` | `number` | 光流粒子的生命周期，取值范围：[0.1~3.0]，单位：秒 |
| `thickness` | `number` | 光流线的宽度，取值范围： [0.01~10.0]，单位：因Beam是粒子加上自发光不能精确单位,故目前按比例显示,需要精确单位的推荐使用Polyline |
| `interval` | `number` | 光流粒子发射间隔，取值范围：[1.0~10.0]，单位：秒 |
| `velocity` | `number` | 光流粒子的速度，取值范围：[0.1~5.0] |
| `color` | [`Color`](/docs/api/types#color) | 光流的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `coordinates` | `array` | 光流的polyline的坐标数组 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
fdapi.beam.clear();
let o1 = {
    id: 'beam1',
    coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492621.1875, 2489262.5, 11.311718940734863], [493609.71875, 2489372.25, -0.071562498807907104],],
    duration: 3,        //光流粒子的生命周期
    thickness: 3,     //光流线的宽度比例
    interval: 2,       //光流粒子发射间隔
    velocity: 5,        //光流粒子的速度
    color: [0, 1, 0, 0.8]  //光流的颜色
};

let o2 = {
    id: 'beam2',
    coordinates: [
        [491669.84375, 2488333.75, 9.8704690933227539],
        [492160.0625, 2488250.5, 11.376718521118164],
        [492468.4375, 2487725.75, 4.851874828338623]
    ],
    duration: 3,        //光流粒子的生命周期
    thickness: 3,     //光流线的宽度比例
    interval: 2,       //光流粒子发射间隔
    velocity: 5,        //光流粒子的速度
    color: [0.5, 0.8, 0, 0.8]  //光流的颜色
};
let beamArr = [];
beamArr.push(o1);
beamArr.push(o2);
await fdapi.beam.add(beamArr);

fdapi.beam.focus(o1.id, 600);
```

---

### `clear(fn)` {#clear}

删除场景中所有的Beam

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.beam.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Beam对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Beam对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
let ids = ['beam1', 'beam2'];
fdapi.beam.delete(ids);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Beam对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.beam.focus('beam1', 200);
```

---

### `get(ids, fn)` {#get}

根据ID获取Beam的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Beam对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
Beam的详细信息
{
            "id":	"1",
            "groupId":	"",
            "userData":	"",
            "duration":	3.000000,
            "thickness":	0.800000,
            "interval":	0.500000,
            "velocity":	5.000000,
            "color":	[1.000000, 0.000000, 0.000000],
            "coordinates":	[[491599.500000, 2490045.000000, 11.304688], [492483.500000, 2490050.500000, 8.177969], [492621.187500, 2489262.500000, 11.311719]]
        }
```

> 示例：Get

```js
fdapi.beam.get(['beam1', 'beam2']);
```

---

### `hide(ids, fn)` {#hide}

隐藏Beam

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Beam对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.beam.hide('beam1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有Beam

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.beam.hideAll();
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置Color

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Beam对象的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.setColor(id, newVal);
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置Coordinates

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Beam对象的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.setCoordinates(id, newVal);
```

---

### `setDuration(id, newVal, fn)` {#setDuration}

设置Duration

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | Beam对象的ID |
| `newVal` | `any` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.setDuration(id, newVal);
```

---

### `setInterval(id, newVal, fn)` {#setInterval}

设置Interval

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Beam对象的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.setInterval(id, newVal);
```

---

### `setThickness(id, newVal, fn)` {#setThickness}

设置Thickness

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Beam对象的ID |
| `newVal` | `number` | 新厚度值，取值范围：[0.01-100] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetThickness

```js
fdapi.beam.setThickness('beam1', 15);
```

---

### `setVelocity(id, newVal, fn)` {#setVelocity}

设置Velocity

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Beam对象的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.setVelocity(id, newVal);
```

---

### `show(ids, fn)` {#show}

显示Beam

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Beam对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.beam.show('beam1');
```

---

### `showAll(fn)` {#showAll}

显示所有Beam

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.beam.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个Beam对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let o = {
    id: 'beam1',
    coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492520.28125, 2490873.25, 9.8798437118530273]],
    duration: 5,
    thickness: 3,
    interval: 0.2,
    velocity: 5,
    color: Color.Blue
}
fdapi.beam.update(o);
fdapi.beam.focus(o.id);
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
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.beam.updateEnd();
```
