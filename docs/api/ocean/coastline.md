---
title: Coastline
sidebar_label: Coastline
description: "用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。"
---

# Coastline

用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。

![](/img/refdoc/api/coastline.gif)

通过 `api.coastline` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。
- **别名 / 不同行业叫法**：海岸线 / 岸线 / 潮间带 / 海陆交界带 / 滩涂带。
- **适用行业**：海洋气象、智慧水利、应急管理、城市治理（沿海城市）、海岸工程。、港口航道
- **使用场景**：
  - 沿海风暴潮、海平面上升情景下的水淹淹没范围动态推演与可视化。
  - 海洋气象数字孪生中海岸带海浪、海风环境效果的实景还原。
  - 滨海城市、港口、滩涂区域的海陆交界景观展示与防灾科普展示。
  - 港口航道 / 海洋：岸线与港区海岸表达，作为港航数字孪生底座。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - `bbox` 决定模拟范围，范围过大会增加渲染与计算开销，应结合实际关注区域设定。
  - 水淹推演由 `enableFloodFill`、`seaLevelTimeInterval`、`seaLevelIncrement`、`seaLevelMaxElevation` 共同控制，参数需与真实潮位/水文数据匹配，避免淹没结果失真。
  - `seaLevelOffset` 基于 bbox 中心 Z 偏移，使用前需确认坐标系与高程基准一致。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Coastline对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的Coastline | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Coastline对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取Coastline的详细信息 | 查询对象信息，用于业务联动 |
| [`update`](#update) | 修改一个或多个Coastline对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Coastline对象

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
| `bbox` | `array` | 是 | - | 海岸线模拟范围边界的包围盒，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `style` | `number` | 否 | 0 | 海岸线的样式，目前只有一个样式，默认值：0 |
| `waveSpeed` | `number` | 否 | 0.5米/秒 | 海浪拍打沙滩的速度，单位：米/秒，默认值：0.5米/秒 |
| `windVelocity` | `array` | 是 | - | 海风风速UV的方向向量，此参数会影响海面效果，取值示例：[U,V] |
| `enableFloodFill` | `boolean` | 否 | false | 是否开启水淹，默认值：false |
| `seaLevelTimeInterval` | `number` | 否 | 0.1s | 海平面水位每次抬升的时间间隔，单位：秒，默认值：0.1s |
| `seaLevelIncrement` | `number` | 否 | 0.1米 | 海平面水位每次抬升的高度，单位：米，默认值：0.1米 |
| `seaLevelOffset` | `number` | 否 | 0米 | 基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米 |
| `seaLevelMaxElevation` | `number` | 否 | 10米 | 海平面水位抬升的最大高度，单位：米，默认值：10米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
fdapi.coastline.clear();
let coastline = {
    id: 'coastline',
    bbox: [
        494274.8971875,
        2487771.141875,
        0,
        495095.20875,
        2491681.8159375,
        10
    ],
    style: 0, //海岸线的样式
    waveSpeed: 0.5, //海浪拍打沙滩的速度，单位：米/秒，默认值：0.5
    windVelocity: [-150, 50], //海风风速的UV向量，此参数会影响海面效果，取值示例：[U,V]
    enableFloodFill: true, //是否开启水淹，默认值：false
    seaLevelTimeInterval: 0.1, //海平面水位每次抬升的时间间隔，单位：秒，默认值：0.1s
    seaLevelIncrement: 0.1,  //海平面水位每次抬升的高度，单位：米，默认值：0.1米
    seaLevelOffset: 0, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米
    seaLevelMaxElevation: 10 //海平面水位抬升的最大高度，单位：米，默认值：10米
}
await fdapi.coastline.add(coastline);
fdapi.coastline.focus("coastline");
```

---

### `clear(fn)` {#clear}

删除场景中所有的Coastline

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.coastline.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Coastline对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的Coastline对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.coastline.delete('fd1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Coastline对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.coastline.focus('coastline');
```

---

### `get(ids, fn)` {#get}

根据ID获取Coastline的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的Coastline对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
Coastline的详细信息
[{
            "id":	"d1",
            "groupId":	"",
            "userData":	"",
        }]
```

> 示例：Get

```js
fdapi.coastline.get('coastline');
```

---

### `update(data, fn)` {#update}

修改一个或多个Coastline对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，请参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let coastline = {
    id: 'coastline',
    enableFloodFill: false, //是否开启水淹，默认值：false
    seaLevelOffset: 2, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米
}
await fdapi.coastline.update(coastline);
fdapi.coastline.focus("coastline");
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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.coastline.updateEnd();
```


## 更多示例

> Show

```js
fdapi.coastline.show('coastline');
```

> Hide

```js
fdapi.coastline.hide('coastline');
```

> HideAll

`