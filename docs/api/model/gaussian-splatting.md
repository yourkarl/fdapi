---
title: GaussianSplatting
sidebar_label: GaussianSplatting
description: "GaussianSplatting类对象，提供3D高斯泼溅相关操作 一般通过api.gaussianSplatting调用其方法"
---

# GaussianSplatting

GaussianSplatting类对象，提供3D高斯泼溅相关操作

一般通过api.gaussianSplatting调用其方法

通过 `api.gaussianSplatting` 访问。

---

## 方法（Methods）

### `add(gaussianSplatting, fn)`

添加一个GaussianSplatting对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `gaussianSplatting` | `object` | 对象数据结构，对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`gaussianSplatting` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `filePath` | `string` | ply文件路径，资源文件引入方式：*.ply，[资源引入说明](/docs/tutorials/resources) |
| `origin` | `array` | 倾斜影像数据中心点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |
| `rotation` | `array` | 可选，旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `scale` | `array` | 可选，缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，设置bbox后参数失效 |
| `degree` | `number` | 可选，色阶，取值范围 [0~3]，默认值：0 |
| `splatScale` | `number` | 可选，高斯点影响范围，默认：1.0 |
| `spriteSize` | `number` | 可选，绘制大小，默认值：3.0 |
| `opacityCull` | `number` | 可选，透明度剔除，取值范围：[0~1]，默认值：0.3 |
| `collision` | `boolean` | 可选，模型加载后是否开启碰撞，默认值：false |

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

### `clear(fn)`

删除场景中所有的GaussianSplatting

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.gaussianSplatting.clear();
```

---

### `delete(ids, fn)`

删除一个或多个GaussianSplatting对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的GaussianSplatting对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.gaussianSplatting.delete('gs3d');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GaussianSplatting对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.gaussianSplatting.focus('gs3d');
```

---

### `get(ids, fn)`

根据ID获取GaussianSplatting的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的GaussianSplatting对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

### `hide(ids, fn)`

隐藏GaussianSplatting对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GaussianSplatting对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.gaussianSplatting.hide('gs3d');
```

---

### `show(ids, fn)`

显示GaussianSplatting对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GaussianSplatting对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.gaussianSplatting.show('gs3d');
```

---

### `update(gaussianSplatting, fn)`

修改一个GaussianSplatting对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `gaussianSplatting` | `object` | 待更新的高斯泼溅对象，结构参考add()方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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
await fdapi.gaussianSplatting.updateEnd();
```
