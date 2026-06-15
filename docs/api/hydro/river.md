---
title: River
sidebar_label: River
description: "River类 等价于一维水动力模型Hydrodynamic1D类 一般通过api.river调用其方法"
---

# River

River类 等价于一维水动力模型Hydrodynamic1D类

一般通过api.river调用其方法

:::caution 已废弃

过时接口 请使用Hydrodynamic1D类

:::

通过 `api.river` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个River对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | River数据，可以是Object类型或者Array类型，对于每一个River，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 显示模式，取值范围：[0,1]，0水样式（默认值），1热力样式 |
| `waterMode` | `number` | 水面显示模式，取值范围：[0,1]，0表示动画水面，1表示仿真水面 |
| `waterColor` | [`Color`](/docs/api/types#color) | 水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响） |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 箭头颜色和透明度，仅在arrowDisplayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `arrowColors.value` | `number` | 值 |
| `arrowTiling` | `number` | 箭头平铺方式 |
| `speedFactor` | `number` | 速度因子 |
| `rippleDensity` | `number` | 辐射强度 |
| `rippleTiling` | `number` | 辐射平铺系数 |
| `updateTime` | `number` | 更新动画的插值时间，注意：仅在update()方法执行时生效 |
| `points` | `array` | 河道信息对象数据，包含采样点坐标、河道宽度和采样点流速和流向，数组包含的对象结构如下： |
| `points.coordinate` | `array` | 采样点对应坐标位置，取值：[x, y, z] |
| `points.width` | `number` | 采样点对应的河道宽度 |
| `points.speed` | `number` | 可选，采样点对应的流速，单位：米/秒 |
| `points.heatValue` | `number` | 可选，采样点对应的热力值（即水深、污染浓度、流量、流速等水文属性），用来控制热力样式的颜色，对应colors调色板的value值 |
| `speedRange` | `array` | 河道流速的范围，取值示例：[speedMin, speedMax] |
| `valueRange` | `array` | 河道热力值的范围，取值示例：[heatValueMin, heatValueMax] |
| `colors` | `object` | 河道热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

> 示例代码如下：

```js
await fdapi.river.add(data);
```

---

### `clear(fn)`

删除场景中所有的River

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.clear();
```

---

### `delete(ids, fn)`

删除一个或多个River对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的River对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.delete(ids);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | River对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.focus(ids, distance, flyTime, rotation);
```

---

### `get(ids, fn)`

根据ID获取River的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的River对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.get(ids);
```

---

### `hide(ids, fn)`

隐藏River

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | River对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.hide(ids);
```

---

### `show(ids, fn)`

显示River

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | River对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.show(ids);
```

---

### `update(data, fn)`

修改一个或多个River对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | River数据，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.river.update(data);
```
