---
title: River
sidebar_label: River
description: "River（等价于一维水动力模型 Hydrodynamic1D）模拟河道水位、流量、流速的沿程演进，可视化河道水流过程。"
---

# River

River类 等价于一维水动力模型Hydrodynamic1D类

:::caution 已废弃

过时接口 请使用Hydrodynamic1D类

:::

通过 `api.river` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：River（等价于一维水动力模型 Hydrodynamic1D）模拟河道水位、流量、流速的沿程演进，可视化河道水流过程。
- **别名 / 不同行业叫法**：河道 / 河网 / 河流仿真 / 一维水动力 / 明渠水流 / 河道演进。
- **适用行业**：智慧水利、防洪减灾、应急管理、水电、生态水利
- **使用场景**：
  - 河道洪水演进与水位预报的可视化
  - 闸坝调度对河道水流影响的推演
  - 河网联排联调的过程展示
- **注意事项**：
  - 依赖断面、糙率等水文参数
  - 一维模型不反映横向漫滩，需配合二维/淹没分析
  - 时序数据需与调度方案对齐



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个River对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的River | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个River对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取River的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏River | 按业务条件隐藏对象 |
| [`show`](#show) | 显示River | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个River对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个River对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | River数据，可以是Object类型或者Array类型，对于每一个River，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `collision` | `boolean` | 是 | - | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 是 | - | 显示模式，取值范围：[0,1]，0水样式（默认值），1热力样式 |
| `waterMode` | `number` | 是 | - | 水面显示模式，取值范围：[0,1]，0表示动画水面，1表示仿真水面 |
| `waterColor` | [`Color`](/docs/api/types#color) | 是 | - | 水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowDisplayMode` | `number` | 是 | - | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响） |
| `arrowAlphaMode` | `number` | 是 | - | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 是 | - | 箭头颜色和透明度，仅在arrowDisplayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowColors` | `object` | 是 | - | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是 | - | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 是 | - | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 是 | - | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 是 | - | 值对应的调色板颜色 |
| `arrowColors.value` | `number` | 是 | - | 值 |
| `arrowTiling` | `number` | 是 | - | 箭头平铺方式 |
| `speedFactor` | `number` | 是 | - | 速度因子 |
| `rippleDensity` | `number` | 是 | - | 辐射强度 |
| `rippleTiling` | `number` | 是 | - | 辐射平铺系数 |
| `updateTime` | `number` | 是 | - | 更新动画的插值时间，注意：仅在update()方法执行时生效 |
| `points` | `array` | 是 | - | 河道信息对象数据，包含采样点坐标、河道宽度和采样点流速和流向，数组包含的对象结构如下： |
| `points.coordinate` | `array` | 是 | - | 采样点对应坐标位置，取值：[x, y, z] |
| `points.width` | `number` | 是 | - | 采样点对应的河道宽度 |
| `points.speed` | `number` | 否 | - | 可选，采样点对应的流速，单位：米/秒 |
| `points.heatValue` | `number` | 否 | - | 可选，采样点对应的热力值（即水深、污染浓度、流量、流速等水文属性），用来控制热力样式的颜色，对应colors调色板的value值 |
| `speedRange` | `array` | 是 | - | 河道流速的范围，取值示例：[speedMin, speedMax] |
| `valueRange` | `array` | 是 | - | 河道热力值的范围，取值示例：[heatValueMin, heatValueMax] |
| `colors` | `object` | 是 | - | 河道热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是 | - | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 是 | - | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 是 | - | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 是 | - | 值对应的调色板颜色 |
| `colors.value` | `number` | 是 | - | 值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.add({
    id: '对象ID',
    groupId: '对象ID',
    userData: '示例值',
    coordinateType: 0,
    collision: true,
    displayMode: 0,
    waterMode: 0,
    arrowDisplayMode: 0,
    arrowAlphaMode: 0,
    arrowColors: {},
    arrowColors.gradient: true,
    arrowColors.colorStops: [255, 255, 255],
    arrowColors.value: 0,
    arrowTiling: 0,
    speedFactor: 0,
    rippleDensity: 0,
    rippleTiling: 0,
    updateTime: 0,
    points: [0, 0, 0],
    points.coordinate: [0, 0, 0],
    points.width: 0,
    points.speed: 0,
    points.heatValue: 0,
    speedRange: [],
    valueRange: [],
    colors: {},
    colors.gradient: true,
    colors.colorStops: [255, 255, 255],
    colors.value: 0
});
```

---

### `clear(fn)` {#clear}

删除场景中所有的River

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个River对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的River对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.delete(['对象ID']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | River对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.focus(0, '2秒', [0, 0, 0]);
```

---

### `get(ids, fn)` {#get}

根据ID获取River的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的River对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例代码如下：

```js
await fdapi.river.get(['对象ID']);
```

---

### `hide(ids, fn)` {#hide}

隐藏River

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | River对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.hide(['对象ID']);
```

---

### `show(ids, fn)` {#show}

显示River

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | River对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.river.show(['对象ID']);
```

---

### `update(data, fn)` {#update}

修改一个或多个River对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | River数据，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

`