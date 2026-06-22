---
slug: /api/camera/camera
title: Camera
sidebar_label: Camera
description: "Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。"
---

# Camera

Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。

![](/img/refdoc/api/camera.gif)

![](/img/refdoc/api/camera-1.gif)

通过 `api.camera` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。
- **别名 / 不同行业叫法**：相机 / 视角 / 视点 / 镜头 / 摄像机；汇报演示中也常称“看点”“机位”。
- **适用行业**：智慧城市、应急指挥、智慧交通、能源（电力/油气）、智慧园区、展厅汇报。
- **使用场景**：
  - 大屏汇报时一键飞入场景并定位到重点区域、楼宇或设备。
  - 应急/交通调度中相机跟随移动目标（车辆、列车、无人机）实时观察。
  - 联动业务事件，自动切换到告警点或热点位置形成视角聚焦。
- **注意事项**：
  - 坐标与朝向需与工程坐标系（Projection/WGS84 等）保持一致，否则定位偏移。
  - 设置飞行时间（flyTime）可获得平滑过渡，避免视角生硬跳变影响演示连贯性。
  - 跟随结束后需调用 cancelFollow 取消，避免与后续手动操作或漫游冲突。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`cancelFollow`](#cancelFollow) | 取消相机自动跟随，支持取消CustomObject、Vehicle、Vehicle2、T… |  |
| [`enterWorld`](#enterWorld) | 进入世界（三维场景），即从地球飞入到三维场景 |  |
| [`exitWorld`](#exitWorld) | 退出世界（三维场景），即从三维场景飞入到地球 |  |
| [`exportOrthoImage`](#exportOrthoImage) | 根据传入的参数导出相机位置对应的正交投影图片 |  |
| [`flyAround`](#flyAround) | 相机环绕指定位置旋转一周 |  |
| [`get`](#get) | 获取当前的相机位置 | 查询对象信息，用于业务联动 |
| [`getAnimationImage`](#getAnimationImage) | 根据导览名称获取对应导览缩略图的base64字符串，默认图片格式png，尺寸：128*128 |  |
| [`getAnimationList`](#getAnimationList) | 获取当前acp里所有导览的信息 |  |
| [`getEulerAngle`](#getEulerAngle) | 根据空间两点计算欧拉角 |  |
| [`lockByBBox`](#lockByBBox) | 锁定相机的交互范围，仅允许在BBox内交互 |  |
| [`lookAt`](#lookAt) | 通过观察点设置相机位置 |  |
| [`lookAtBBox`](#lookAtBBox) | 通过BBox设置相机 |  |
| [`moveBackward`](#moveBackward) | 后退 |  |
| [`moveDown`](#moveDown) | 下降 |  |
| [`moveForward`](#moveForward) | 前进 |  |
| [`moveLeft`](#moveLeft) | 左移 |  |
| [`moveRight`](#moveRight) | 右移 |  |
| [`moveUp`](#moveUp) | 上升 |  |
| [`pauseAnimation`](#pauseAnimation) | 暂停播放动画导航 |  |
| [`playAnimation`](#playAnimation) | 按传入索引序号的顺序播放一个或多个动画导览 |  |
| [`resumeAnimation`](#resumeAnimation) | 恢复播放动画导航 |  |
| [`set`](#set) | 设置相机位置，这是最常见的参数形式，另外两种参数形式， |  |
| [`stop`](#stop) | 停止 | 停止播放 |
| [`stopAnimation`](#stopAnimation) | 停止播放动画导航 |  |
| [`turnDown`](#turnDown) | 低头 |  |
| [`turnLeft`](#turnLeft) | 左转 |  |
| [`turnRight`](#turnRight) | 右转 |  |
| [`turnUp`](#turnUp) | 抬头 |  |
| [`unlock`](#unlock) | 解锁相机的交互范围，恢复自由交互 |  |
| [`useOldDataFormat`](#useOldDataFormat) | 设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。 |  |

## 方法（Methods）

### `cancelFollow(fn)` {#cancelFollow}

取消相机自动跟随，支持取消CustomObject、Vehicle、Vehicle2、Train等对象的自动跟随

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：取消相机跟随：CancelFollow

```js
fdapi.camera.cancelFollow();
```

---

### `enterWorld(fn)` {#enterWorld}

进入世界（三维场景），即从地球飞入到三维场景

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：进入世界：EnterWorld

```js
fdapi.camera.enterWorld();

//params：x, y, z, pitch, yaw, flyTime 控制相机set()、lookAt()方法也可以实现进入世界效果，同时可以设置进入的具体位置和视角 
//fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);
```

---

### `exitWorld(fn)` {#exitWorld}

退出世界（三维场景），即从三维场景飞入到地球

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：退出世界：ExitWorld

```js
fdapi.camera.exitWorld();
```

---

### `exportOrthoImage(path, imageSize, orthoWidth, location, rotation, backGroundColor, fn)` {#exportOrthoImage}

根据传入的参数导出相机位置对应的正交投影图片

| 参数 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | 导出正交投影图片的磁盘保存路径，注意：目前出图支持png和jpg格式，此路径需要在渲染服务器端存在，因为导出图片文件保存在渲染服务器的磁盘上 |
| `imageSize` | `array` | 导出正交投影图片的宽高分辨率：[width,height]，取值示例：[1920,1080] |
| `orthoWidth` | `number` | 导出正交投影图片的景深长度，单位：米 |
| `location` | `array` | 相机位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 相机朝向欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0]，默认值：[0,90,0] |
| `backGroundColor` | [`Color`](/docs/api/types#color) | 导出正交投影图片的背景颜色，默认值：黑色[0, 0, 0, 1]，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：导出正交投影图片：ExportOrthoImage

```js
// 导出正交投影图片
fdapi.camera.exportOrthoImage("D:\\orthoImage.png", [1920, 1080], 88, [492513.613438, 2492183.068945, 40.035171], [-29.806171, -40.45295, 0.000002], [0, 0, 0, 1]);
```

---

### `flyAround(location, rotation, distance, time, fn)` {#flyAround}

相机环绕指定位置旋转一周

| 参数 | 类型 | 说明 |
|------|------|------|
| `location` | `array` | 必选，相机环绕位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 可选，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0]，默认值：[0,90,0] |
| `distance` | `number` | 可选，相机观察距离，单位：米，默认值：[1000] |
| `time` | `number` | 可选，相机环绕一周的时间，取值范围：[0~任意正数]，单位：秒，默认值10秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置相机环绕：FlyAround

```js
//环绕参数：location,rotation, distance, time
fdapi.camera.flyAround([492552, 2491465, 200], [-54, -150, 0], 300, 5);
```

---

### `get(fn)` {#get}

获取当前的相机位置

回调返回的数据格式如下：

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
            "x":	491433.656250,
            "y":	2486907.500000,
            "z":	685.200928,
            "pitch":	-38.999985,
            "yaw":	-64.000023,
            "roll":	0.000000,
            "camera":	[491433.656250, 2486907.500000, 685.200928, -38.999985, -64.000023, 0.000000]
        }
```

camera属性值有6个元素，依次为 `[X, Y, Z, Pitch, Yaw, Roll]`

x, y, z, pitch, yaw, roll几个值即可以在camera数组里取，也可以直接获取。

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.camera.get( (r) => {
     var str = `Camera: ${r.x}, ${r.y}, ${r.z}, ${r.pitch}, ${r.yaw}`;
     //或者这样调用
     var str = `Camera: ${r.camera.join(',')}`;
     log(str);
})
```

> 示例：获取相机位置：Get

```js
fdapi.camera.get(function (res) {
    log('This is the output information of the callback function of camera.get, which can be reset to the current position by the following code:\n');
    let str = `fdapi.camera.set(${res.x}, ${res.y}, ${res.z}, ${res.pitch}, ${res.yaw}, 0);\n`;
    log(str);
})
```

---

### `getAnimationImage(name, fn)` {#getAnimationImage}

根据导览名称获取对应导览缩略图的base64字符串，默认图片格式png，尺寸：128*128

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 导览名称，可以根据getAnimationList()方法获取 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
  "image":	"base64示例内容太长......" //image是导览缩略图的base64字符串 默认图片格式png，尺寸：128*128
}

base64类型图片使用说明：
//js可以直接把base64字符串设置为img标签的src属性值，代码示例如下：
fdapi.camera.getAnimationImage("animationName1").then(result=>{
   //设置base64类型图片
   document.getElementById("img1").setAttribute("src","data:image/png;base64,"+result.image);
});
```

> 示例：获取导览缩略图：GetAnimationImage

```js
//参数：导览名称，可以根据getAnimationList()方法获取
//注意：因为返回字符串过长，执行此方法前请不要勾选日志的【自动清屏】，具体使用方法请参考api文档
fdapi.camera.getAnimationImage("导览1");
```

---

### `getAnimationList(fn)` {#getAnimationList}

获取当前acp里所有导览的信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
获取当前场景所有导览的列表
[{
            "id":	0, 
            "name":	"导览1",
            "type": 0, //0导览 1动画
            "uuid": "E858A16A4E1940E76C916C80869B373F", //唯一id
            "filename": "AnimRecorder0.sav", //导览文件名称
            "foldername": "导览目录" //所在文件夹名称 acp工程内全局唯一  
        },
        {
            "id":	1,
            "name":	"导览2",
            "type": 0, //0导览 1动画
            "uuid": "5403B9254286B7EFE9A28DB6A7BC7A08", //唯一id
            "filename": "AnimRecorder1.sav", //导览文件名称
            "foldername": "导览目录" //所在文件夹名称 acp工程内全局唯一  
        }]
```

> 示例：获取导览列表：GetAnimationList

```js
fdapi.camera.getAnimationList();
```

---

### `getEulerAngle(startPoint, endPoint)` {#getEulerAngle}

根据空间两点计算欧拉角

| 参数 | 类型 | 说明 |
|------|------|------|
| `startPoint` | `` | 起始点坐标位置，[取值示例](/docs/tutorials/coordinates) |
| `endPoint` | `` | 结束点坐标位置，[取值示例](/docs/tutorials/coordinates) |

**返回：** 返回查询结果。

```js
返回欧拉角数组： [Pitch,Yaw,Roll] 

俯仰-Pitch：上下旋转角度，欧拉角向量的X轴，取值范围：[-90~+90]
航向-Yaw：左右旋转角度，欧拉角向量的Y轴，取值范围：[-180~+180]
翻滚-Roll：翻滚角度，欧拉角向量的Z轴
```

> 示例：获取两点的欧拉角：GetEulerAngle

```js
let startPoint = [492552.40625, 2492217.25, 0];
let endPoint = [492547.75, 2492249.5, 0];
fdapi.polyline.clear();
let o = {
    id: 'p1',//折线唯一标识id
    coordinates: [startPoint, endPoint],//构成折线的坐标点数组
    range: [1, 10000],//可视范围
    color: Color.Red,//折线颜色
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
    thickness: 1,//折线宽度
    intensity: 0.2,//亮度
    flowRate: 0.5,//流速
    tiling: 0,//材质贴图平铺比例
    shape: 0, //折线类型 0：直线， 1：曲线
    depthTest: false//是否做深度检测
};
fdapi.polyline.add(o);
fdapi.polyline.focus(o.id);
let eulerAngle = fdapi.camera.getEulerAngle(startPoint, endPoint);
log("根据空间两点计算的欧拉角:" + eulerAngle);
```

---

### `lockByBBox(bbox, fn)` {#lockByBBox}

锁定相机的交互范围，仅允许在BBox内交互

| 参数 | 类型 | 说明 |
|------|------|------|
| `bbox` | `` | 即3D Bounding Box，3D物体的包围盒，用于表示三维物体坐标的取值边界，格式示例：[minX,minY,minZ,maxX,maxY,maxZ] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.camera.lockByBBox(bbox);
```

---

### `lookAt(x, y, z, distance, pitch, yaw, flyTime, fn)` {#lookAt}

通过观察点设置相机位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 观察点坐标X |
| `y` | `number` | 观察点坐标Y |
| `z` | `number` | 观察点坐标Z |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `pitch` | `number` | 上下旋转角度（俯仰），单位是度。可选参数，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `yaw` | `number` | 左右旋转角度（航向），单位是度。可选参数，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
fdapi.camera.lookAt(-913.18, -10852.01, 82.49, 200.0, 90.0, -50.0);
```

> 示例：通过观察点设置相机位置：LookAt

```js
__distance += 200.0;
//lookAt参数：x, y, z, distance,  pitch, yaw, flyTime
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, __distance, -15.0, -173.0, 0.2);
```

---

### `lookAtBBox(bbox, pitch, yaw, flyTime, fn)` {#lookAtBBox}

通过BBox设置相机

| 参数 | 类型 | 说明 |
|------|------|------|
| `bbox` | `array` | bounding box |
| `pitch` | `number` | 上下旋转角度（俯仰），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `yaw` | `number` | 左右旋转角度（航向），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
let bbox = [1083.27, -12907.29, 81.79, 1308.18, -12759.77, 201.51];
let yaw = 90.0;
let pitch = -50.0;
fdapi.camera.lookAtBBox(bbox, yaw, pitch);
```

> 示例：进入物体观察模式：LookAtBBox

```js
//设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
fdapi.settings.setInteractiveMode(3);
//[minx,miny,minz,maxx,maxy,maxz]
let bbox = [492552.837539, 2492211.111875, -6.922683, 492597.469727, 2492256.456250, 11.040344];
//lookAtBBox参数：bbox,  pitch, yaw, flyTime
fdapi.camera.lookAtBBox(bbox, -54.0, -173.0, 0.5);
```

> 示例：进入自由交互模式：LookAtBBox

```js
//设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
fdapi.settings.setInteractiveMode(0);
//[minx,miny,minz,maxx,maxy,maxz]
let bbox = [491904.634063, 2491122.173437, -879.369063, 493670.376758, 2492887.915938, 886.373594];
//lookAtBBox参数：bbox,  pitch, yaw, flyTime
fdapi.camera.lookAtBBox(bbox, -15.0, -173.0, 0.5);
```

---

### `moveBackward(fn)` {#moveBackward}

后退

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-后退：MoveBackward

```js
fdapi.camera.moveBackward();
```

---

### `moveDown(fn)` {#moveDown}

下降

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-下降：MoveDown

```js
fdapi.camera.moveDown();
```

---

### `moveForward(fn)` {#moveForward}

前进

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-前进：MoveForward

```js
fdapi.camera.moveForward();
```

---

### `moveLeft(fn)` {#moveLeft}

左移

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-左移：MoveLeft

```js
fdapi.camera.moveLeft();
```

---

### `moveRight(fn)` {#moveRight}

右移

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-右移：MoveRight

```js
fdapi.camera.moveRight();
```

---

### `moveUp(fn)` {#moveUp}

上升

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-上升：MoveUp

```js
fdapi.camera.moveUp();
```

---

### `pauseAnimation(fn)` {#pauseAnimation}

暂停播放动画导航

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：暂停播放动画导航：PauseAnimation

```js
fdapi.camera.pauseAnimation();
```

---

### `playAnimation(ids, mask, fn)` {#playAnimation}

按传入索引序号的顺序播放一个或多个动画导览



![](/img/refdoc/api/PlayAnimation.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | 待播放的动画导览的索引编号或索引编号数组 |
| `mask` | `number` | 可选，播放导览时传入对应掩码则使用录制导览时的工程对应设置，包含四类掩码：相机位置(Camera:0x1) 环境天气(Environment:0x2) 工程树属性(ProjectTree:0x4) 导览设置(Settings:0x8)，请参考 `AnimationMask` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始播放动画导航：PlayAnimation

```js
//index：录制导览的索引序号，按数组元素传入的顺序依次播放   
//mask ：播放导览时的配置掩码：相机位置(Camera:0x1) 环境天气(Environment:0x2) 工程树属性(ProjectTree:0x4) 导览设置(Settings:0x8)
fdapi.camera.playAnimation([1, 0], AnimationMask.Camera | AnimationMask.Environment);
```

---

### `resumeAnimation(fn)` {#resumeAnimation}

恢复播放动画导航

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：恢复播放动画导航：ResumeAnimation

```js
fdapi.camera.resumeAnimation();
```

---

### `set(x, y, z, pitch, yaw, flyTime, fn)` {#set}

设置相机位置，这是最常见的参数形式，另外两种参数形式，请参考[二次开发：关于设置相机位置的三种形式](/docs/tutorials/camera)

![](/img/refdoc/api/Camera.Set.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 坐标X |
| `y` | `number` | 坐标Y |
| `z` | `number` | 坐标Z |
| `pitch` | `number` | 上下旋转角度（俯仰），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `yaw` | `number` | 左右旋转角度（航向），单位是度。 此参数可选，如果没有设置或者设置为0，系统会自动设置默认值。 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
fdapi.camera.set(-178.14, -8038.16, 250.47, -50.0, 90.0);
```

> 示例：设置相机位置：Set

```js
//参数：x, y, z, pitch, yaw, flyTime
fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);
```

> 示例：设置相机位置（通过数组参数）：Set

```js
//最后一个元素无用，会忽略
let cam = [492552.395391, 2491465.370000, 840.020625, -54.823574, -64.677055, 0.000003];
fdapi.camera.set(cam, 0.2);
```

> 示例：设置相机位置（通过对象参数）：Set

```js
let cam = {
    "x": 492552.395391,
    "y": 2491465.370000,
    "z": 1031.461914,
    "pitch": -54.823574,
    "yaw": -152.668823,
    "roll": 0.0     //该参数无用，会自动忽略
};
fdapi.camera.set(cam, 0.2);
```

---

### `stop(fn)` {#stop}

停止

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-停止：Stop

```js
fdapi.camera.stop();
```

---

### `stopAnimation(fn)` {#stopAnimation}

停止播放动画导航

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止播放动画导航：StopAnimation

```js
fdapi.camera.stopAnimation();
```

---

### `turnDown(fn)` {#turnDown}

低头

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-低头：TurnDown

```js
fdapi.camera.turnDown();
```

---

### `turnLeft(fn)` {#turnLeft}

左转

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-左转：TurnLeft

```js
fdapi.camera.turnLeft();
```

---

### `turnRight(fn)` {#turnRight}

右转

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-右转：TurnRight

```js
fdapi.camera.turnRight();
```

---

### `turnUp(fn)` {#turnUp}

抬头

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：相机控制-抬头：TurnUp

```js
fdapi.camera.turnUp();
```

---

### `unlock(fn)` {#unlock}

解锁相机的交互范围，恢复自由交互

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.camera.unlock();
```

---

### `useOldDataFormat(bUse)` {#useOldDataFormat}

设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。

受影响的方法有：camera对象的set、lookAt、lookAtBBox，以camera.set举例：

之前版本的方法定义如下：`(x, y, z, heading, tilt, flyTime, fn)`

现在的定义如下：`set(x, y, z, pitch, yaw, flyTime, fn)`

两个的区别就是heading(yaw), tilt(pitch)的顺序互换了一下

如果调用了useOldDataFormat()，可以让用户代码保持兼容（不用修改就可以在新版本上运行）

| 参数 | 类型 | 说明 |
|------|------|------|
| `bUse` | `boolean` | 可选参数，默认为true。 |

**返回：** 无返回值。

> 示例代码如下：

```js
await fdapi.camera.useOldDataFormat(bUse);
```


## 更多示例

> 锁定相机交互范围：LockByBBox

```js
//限制相机交互范围
let bbox = [492552.837539, 2492211.111875, 0, 492597.469727, 2492256.456250, 20]
fdapi.camera.lockByBBox(bbox);
```

> 解锁相机交互范围：UnLock

```js
fdapi.camera.unlock();
```
