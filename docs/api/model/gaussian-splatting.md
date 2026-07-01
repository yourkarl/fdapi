---
title: GaussianSplatting
sidebar_label: GaussianSplatting
description: "GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。"
---

# GaussianSplatting

GaussianSplatting类对象，提供3D高斯泼溅相关操作

![](/img/refdoc/api/gaussianSplatting.gif)

通过 `api.gaussianSplatting` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。
- **别名 / 不同行业叫法**：高斯泼溅 / 3DGS / 高斯溅射 / 实景重建 / 照片级实景 / 辐射场重建。
- **适用行业**：实景三维、文博文旅、智慧城市、应急测绘、工业巡检
- **使用场景**：
  - 文物、设备、事故现场等小场景的高保真实景还原
  - 实景与传统模型混合展示
  - 高真实感的汇报与展示
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 3DGS 数据体量大，对显存敏感
  - 适合局部高保真，不适合大范围铺设
  - 与传统模型混排时注意遮挡与深度关系



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个GaussianSplatting对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的GaussianSplatting | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个GaussianSplatting对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取GaussianSplatting的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏GaussianSplatting对象 | 按业务条件隐藏对象 |
| [`show`](#show) | 显示GaussianSplatting对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个GaussianSplatting对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(gaussianSplatting, fn)` {#add}

添加一个GaussianSplatting对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `gaussianSplatting` | `object` | 是 | - | 对象数据结构，对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`gaussianSplatting` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `filePath` | `string` | 是 | - | ply文件路径，资源文件引入方式：*.ply，[资源引入说明](/docs/tutorials/resources) |
| `origin` | `array` | 是 | - | 倾斜影像数据中心点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |
| `rotation` | `array` | 否 | - | 可选，旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `scale` | `array` | 否 | - | 可选，缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，设置bbox后参数失效 |
| `degree` | `number` | 否 | 0 | 可选，色阶，取值范围 [0~3]，默认值：0 |
| `splatScale` | `number` | 否 | - | 可选，高斯点影响范围，默认：1.0 |
| `spriteSize` | `number` | 否 | 3.0 | 可选，绘制大小，默认值：3.0 |
| `opacityCull` | `number` | 否 | 0.3 | 可选，透明度剔除，取值范围：[0~1]，默认值：0.3 |
| `collision` | `boolean` | 否 | false | 可选，模型加载后是否开启碰撞，默认值：false |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
let path = HostConfig.Path + "/assets/";
await fdapi.gaussianSplatting.delete('gs3d');
let gs3d = {
    id: "gs3d",
    coordinateType: 0,
    filePath: path + "ply/gs3d.ply",
    origin: [0, 0, 0],//可选 数据中心点
    rotation: [0, 0, 0],//可选 对象旋转
    scale: [1, 1, 1],//可选 对象缩放
    degree: 0,//  可选 色阶 0-3
    splatScale: 1.0,//可选 高斯点影响范围 无限制
    spriteSize: 3.0,//可选 绘制大小 无限制
    opacityCull: 0.3,//可选 透明度剔除 0-1
    collision: false //可选 是否开启碰撞 开启后消耗性能
}
fdapi.gaussianSplatting.add(gs3d);
fdapi.gaussianSplatting.focus('gs3d');
```

---

### `clear(fn)` {#clear}

删除场景中所有的GaussianSplatting

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.gaussianSplatting.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个GaussianSplatting对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的GaussianSplatting对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.gaussianSplatting.delete('gs3d');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | GaussianSplatting对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.gaussianSplatting.focus('gs3d');
```

---

### `get(ids, fn)` {#get}

根据ID获取GaussianSplatting的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的GaussianSplatting对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
GaussianSplatting的详细信息
[{
            "id":	"d1",
            "groupId":	"",
            "userData":	"",
            "location":	[494219.312500, 2490657.000000, -0.001055],
            "rotation":	[-90.000000, -0.000005, -179.999969],
            "scale":	[1.000000, 1.000000, 1.000000],
            "texturePath":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/media/image/1.png",
            "order":	1
        }]
```

> 示例：Get

```js
fdapi.gaussianSplatting.get('gs3d');
```

---

### `hide(ids, fn)` {#hide}

隐藏GaussianSplatting对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | GaussianSplatting对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.gaussianSplatting.hide('gs3d');
```

---

### `show(ids, fn)` {#show}

显示GaussianSplatting对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | GaussianSplatting对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.gaussianSplatting.show('gs3d');
```

---

### `update(gaussianSplatting, fn)` {#update}

修改一个GaussianSplatting对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `gaussianSplatting` | `object` | 是 | - | 待更新的高斯泼溅对象，结构参考add()方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let path = HostConfig.Path + "/assets/";
let gs3d_update = {
    id: "gs3d",
    coordinateType: 0,
    filePath: path + "ply/gs3d.ply",
    origin: [0, 0, 0],//可选 数据中心点
    rotation: [90, 0, 0],//可选 对象旋转
    scale: [1, 1, 1],//可选 对象缩放
    degree: 2,//  可选 色阶 0-3
    splatScale: 1.0,//可选 高斯点影响范围 无限制
    spriteSize: 3.0,//可选 绘制大小 无限制
    opacityCull: 0.5,//可选 透明度剔除 0-1
    collision: true //可选 是否开启碰撞 开启后消耗性能
}
fdapi.gaussianSplatting.update(gs3d_update);
fdapi.gaussianSplatting.focus('gs3d');
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
await fdapi.gaussianSplatting.updateEnd();
```
