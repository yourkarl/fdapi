---
title: WaterMesh
sidebar_label: WaterMesh
description: "WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。"
---

# WaterMesh

WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。

通过 `api.waterMesh` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。
- **别名 / 不同行业叫法**：水面网格 / 水体网格 / 自定义水面 / 水面 Mesh。
- **适用行业**：智慧水利、景观水系、海洋、城市内河、水电、港口航道
- **使用场景**：
  - 不规则水域（河段/湖库/景观水系）的水面构建
  - 承载流场、波纹效果的水体载体
  - 动态水位下的水面表现
  - 港口航道 / 海洋：海面与动态海水、波浪表达。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 网格精度与范围影响性能
  - 需与 WaterFlowField、DynamicWater 等配合
  - 水面需与地形贴合、坐标一致



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个WaterMesh对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的WaterMesh | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个WaterMesh对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取WaterMesh的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏WaterMesh | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有WaterMesh | 一键隐藏全部对象 |
| [`setCoordinates`](#setCoordinates) | 设置WaterMesh顶点坐标 |  |
| [`setIndices`](#setIndices) | 设置WaterMesh顶点坐标索引 |  |
| [`setNormals`](#setNormals) | 设置WaterMesh法向 |  |
| [`setWaterColor`](#setWaterColor) | 设置颜色 |  |
| [`setWaterDirection`](#setWaterDirection) | 设置水流方向 |  |
| [`setWaterSpeed`](#setWaterSpeed) | 设置水流速度 |  |
| [`setWaterUVRepeat`](#setWaterUVRepeat) | 设置水流贴图重复间隔距离 |  |
| [`setWaterWaveScale`](#setWaterWaveScale) | 设置水波纹大小 |  |
| [`show`](#show) | 显示WaterMesh | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有WaterMesh | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个WaterMesh对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个WaterMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | WaterMesh数据，可以是Object类型或者Array类型，对于每一个WaterMesh，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinates` | `array` | 是 | - | 顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `indices` | `array` | 是 | - | 顶点坐标的索引，用来绘制三角网格；数组元素类型：(number)；数组元素顺序：顶点索引顺序需构成三角网格且同为顺时针或逆时针方向；数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `normals` | `array` | 是 | - | 顶点法向，[X,Y,Z]，不传则使用默认值 |
| `waterUVRepeat` | `number` | 是 | - | 水流贴图的重复间隔距离，取值范围：[1，10000]，单位：米 |
| `waterColor` | [`Color`](/docs/api/types#color) | 是 | - | 水流颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `waterSpeed` | `number` | 否 | 3米/秒 | 水流速度，取值范围：[0.01~30]，单位：米/秒，默认值：3米/秒 |
| `waterDirection` | `number` | 否 | 0度 | 水流方向，取值范围：[0~1]，单位：度，此值与[0~360]按比例换算，默认值：0度 |
| `waveScale` | `number` | 否 | 0.3米 | 波纹强度，取值范围：[0.01~1]，单位：米，默认值：0.3米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
//添加前清空水流网格
fdapi.waterMesh.clear();
//执行添加
await fdapi.waterMesh.add({
    id: 'watermesh1',
    coordinateType: 0,// 坐标系类型
    coordinates: [
        [492972.53125, 2491265, 2],
        [493247.875, 2491182, 2],
        [493187.5, 2490997.5, 2],
        [492922.25, 2491069.25, 2],
    ],//顶点坐标
    indices: [2, 0, 3, 0, 2, 1],// 顶点坐标的索引构成的数组
    //normals: [],//法向 不传则使用默认值
    waterUVRepeat: 500,//贴图的重复间隔距离，取值范围：[1，10000]，单位：米
    waterColor: [0.2, 0.5, 0.7, 1], //水流颜色
    waterSpeed: 0.5, //水流速度，取值范围：[0.01~30]，单位：米/秒，默认值：3米/秒
    waterDirection: 0.8,//水流方向，取值范围：[0~1]，单位：度，此值与[0~360]按比例换算，默认值：0度
    waveScale: 0.8 //波纹强度，取值范围：[0.01~1]，单位：米，默认值：0.3米
});
fdapi.waterMesh.focus('watermesh1', 100);
```

---

### `clear(fn)` {#clear}

删除场景中所有的WaterMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.waterMesh.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个WaterMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的WaterMesh对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.waterMesh.delete('watermesh1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterMesh对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.waterMesh.focus('watermesh1', 10);
```

---

### `get(ids, fn)` {#get}

根据ID获取WaterMesh的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的WaterMesh对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
WaterMesh的详细信息
{
            "id":	"",
            "groupId":	"",
            "userData":	"",
            "waterColor":	[0.000000, 0.000000, 1.000000, 1.000000],
            "waterUVRepeat":	1000.000000,
            "waterSpeed":	5.000000,
            "waterDirection":	0.250000,
            "waterWave":	0.500000
        }
```

> 示例：Get

```js
fdapi.waterMesh.get('watermesh1');
```

---

### `hide(ids, fn)` {#hide}

隐藏WaterMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterMesh对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.waterMesh.hide('watermesh1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有WaterMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.hideAll();
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置WaterMesh顶点坐标

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 唯一标识符 |
| `newVal` | `array` | 是 | - | 新的顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setCoordinates('对象ID', []);
```

---

### `setIndices(id, newVal, fn)` {#setIndices}

设置WaterMesh顶点坐标索引

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 唯一标识符 |
| `newVal` | `array` | 是 | - | 新顶点坐标的索引，数组元素类型：(number)，数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setIndices('对象ID', []);
```

---

### `setNormals(id, newVal, fn)` {#setNormals}

设置WaterMesh法向

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 唯一标识符 |
| `newVal` | `array` | 是 | - | 新法向 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setNormals('对象ID', []);
```

---

### `setWaterColor(id, newVal, fn)` {#setWaterColor}

设置颜色

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterMesh唯一标识符 |
| `newVal` | [`Color`](/docs/api/types#color) | 是 | - | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setWaterColor('对象ID', '示例值');
```

---

### `setWaterDirection(id, newVal, fn)` {#setWaterDirection}

设置水流方向

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterMesh唯一标识符 |
| `newVal` | `number` | 是 | - | 新的水流方向 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setWaterDirection('对象ID', 0);
```

---

### `setWaterSpeed(id, newVal, fn)` {#setWaterSpeed}

设置水流速度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterMesh唯一标识符 |
| `newVal` | `number` | 是 | - | 新的水流速度 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setWaterSpeed('对象ID', 0);
```

---

### `setWaterUVRepeat(id, newVal, fn)` {#setWaterUVRepeat}

设置水流贴图重复间隔距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterMesh唯一标识符 |
| `newVal` | `number` | 是 | - | 新的水流贴图重复间隔距离 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setWaterUVRepeat('对象ID', 0);
```

---

### `setWaterWaveScale(id, newVal, fn)` {#setWaterWaveScale}

设置水波纹大小

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterMesh唯一标识符 |
| `newVal` | `number` | 是 | - | 新的水波纹大小 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.setWaterWaveScale('对象ID', 0);
```

---

### `show(ids, fn)` {#show}

显示WaterMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterMesh对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.waterMesh.show('watermesh1');
```

---

### `showAll(fn)` {#showAll}

显示所有WaterMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.waterMesh.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个WaterMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | WaterMesh数据，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
await fdapi.waterMesh.update({
    id: 'watermesh1',
    waterColor: [0.0, 0.325, 0.223, 1.0],
    waterSpeed: 0.8
});
fdapi.waterMesh.focus('watermesh1', 100);
```
