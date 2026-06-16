---
title: WaterMesh
sidebar_label: WaterMesh
description: "WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。"
---

# WaterMesh

WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。

通过 `api.boxTrigger` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。
- **别名 / 不同行业叫法**：水面网格 / 水体网格 / 自定义水面 / 水面 Mesh。
- **适用行业**：智慧水利、景观水系、海洋、城市内河、水电
- **使用场景**：
  - 不规则水域（河段/湖库/景观水系）的水面构建
  - 承载流场、波纹效果的水体载体
  - 动态水位下的水面表现
- **注意事项**：
  - 网格精度与范围影响性能
  - 需与 WaterFlowField、DynamicWater 等配合
  - 水面需与地形贴合、坐标一致



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `add` | 添加一个或多个WaterMesh对象 | 向场景批量添加对象 |
| `clear` | 删除场景中所有的WaterMesh | 清空全部对象，重置图层 |
| `delete` | 删除一个或多个WaterMesh对象 | 按 ID 移除指定对象 |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `get` | 根据ID获取WaterMesh的详细信息 | 查询对象信息，用于业务联动 |
| `hide` | 隐藏WaterMesh | 按业务条件隐藏对象 |
| `hideAll` | 隐藏所有WaterMesh | 一键隐藏全部对象 |
| `setCoordinates` | 设置WaterMesh顶点坐标 |  |
| `setIndices` | 设置WaterMesh顶点坐标索引 |  |
| `setNormals` | 设置WaterMesh法向 |  |
| `setWaterColor` | 设置颜色 |  |
| `setWaterDirection` | 设置水流方向 |  |
| `setWaterSpeed` | 设置水流速度 |  |
| `setWaterUVRepeat` | 设置水流贴图重复间隔距离 |  |
| `setWaterWaveScale` | 设置水波纹大小 |  |
| `show` | 显示WaterMesh | 按业务条件显示对象 |
| `showAll` | 显示所有WaterMesh | 一键显示全部对象 |
| `update` | 修改一个或多个WaterMesh对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)`

添加一个或多个WaterMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | WaterMesh数据，可以是Object类型或者Array类型，对于每一个WaterMesh，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinates` | `array` | 顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `indices` | `array` | 顶点坐标的索引，用来绘制三角网格；数组元素类型：(number)；数组元素顺序：顶点索引顺序需构成三角网格且同为顺时针或逆时针方向；数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `normals` | `array` | 顶点法向，[X,Y,Z]，不传则使用默认值 |
| `waterUVRepeat` | `number` | 水流贴图的重复间隔距离，取值范围：[1，10000]，单位：米 |
| `waterColor` | [`Color`](/docs/api/types#color) | 水流颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `waterSpeed` | `number` | 水流速度，取值范围：[0.01~30]，单位：米/秒，默认值：3米/秒 |
| `waterDirection` | `number` | 水流方向，取值范围：[0~1]，单位：度，此值与[0~360]按比例换算，默认值：0度 |
| `waveScale` | `number` | 波纹强度，取值范围：[0.01~1]，单位：米，默认值：0.3米 |

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

### `clear(fn)`

删除场景中所有的WaterMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.waterMesh.clear();
```

---

### `delete(ids, fn)`

删除一个或多个WaterMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的WaterMesh对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.waterMesh.delete('watermesh1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | WaterMesh对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.waterMesh.focus('watermesh1', 10);
```

---

### `get(ids, fn)`

根据ID获取WaterMesh的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的WaterMesh对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

### `hide(ids, fn)`

隐藏WaterMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | WaterMesh对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.waterMesh.hide('watermesh1');
```

---

### `hideAll(fn)`

隐藏所有WaterMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.hideAll();
```

---

### `setCoordinates(id, newVal, fn)`

设置WaterMesh顶点坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | `array` | 新的顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setCoordinates(id, newVal);
```

---

### `setIndices(id, newVal, fn)`

设置WaterMesh顶点坐标索引

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | `array` | 新顶点坐标的索引，数组元素类型：(number)，数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setIndices(id, newVal);
```

---

### `setNormals(id, newVal, fn)`

设置WaterMesh法向

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | `array` | 新法向 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setNormals(id, newVal);
```

---

### `setWaterColor(id, newVal, fn)`

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | WaterMesh唯一标识符 |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setWaterColor(id, newVal);
```

---

### `setWaterDirection(id, newVal, fn)`

设置水流方向

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | WaterMesh唯一标识符 |
| `newVal` | `number` | 新的水流方向 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setWaterDirection(id, newVal);
```

---

### `setWaterSpeed(id, newVal, fn)`

设置水流速度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | WaterMesh唯一标识符 |
| `newVal` | `number` | 新的水流速度 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setWaterSpeed(id, newVal);
```

---

### `setWaterUVRepeat(id, newVal, fn)`

设置水流贴图重复间隔距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | WaterMesh唯一标识符 |
| `newVal` | `number` | 新的水流贴图重复间隔距离 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setWaterUVRepeat(id, newVal);
```

---

### `setWaterWaveScale(id, newVal, fn)`

设置水波纹大小

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | WaterMesh唯一标识符 |
| `newVal` | `number` | 新的水波纹大小 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.setWaterWaveScale(id, newVal);
```

---

### `show(ids, fn)`

显示WaterMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | WaterMesh对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.waterMesh.show('watermesh1');
```

---

### `showAll(fn)`

显示所有WaterMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.boxTrigger.showAll();
```

---

### `update(data, fn)`

修改一个或多个WaterMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | WaterMesh数据，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
await fdapi.waterMesh.update({
    id: 'watermesh1',
    waterColor: [0.0, 0.325, 0.223, 1.0]