---
title: VideoProjection
sidebar_label: VideoProjection
description: "VideoProjection类，提供视频投影对象相关的操作 一般通过api.videoProjection调用其方法 VideoProjection的效果图："
---

# VideoProjection

VideoProjection类，提供视频投影对象相关的操作

一般通过api.videoProjection调用其方法 


VideoProjection的效果图：



![](/img/refdoc/api/VideoProjection.jpg)

通过 `api.videoProjection` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个VideoProjection对象

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
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `videoURL` | `string` | 视频地址，支持本地文件和网络文件，同时支持rtsp协议、http协议等实时流媒体地址 |
| `location` | `array` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `fov` | `number` | 垂直夹角，取值范围：[0~160]，单位：度 |
| `aspectRatio` | `number` | 宽高比，常见比例如：16:9或4:3等，取值范围：[0.1~10.0] |
| `exposure` | `number` | 曝光度，取值范围：[0~3]，默认值：0.6 |
| `screen` | `boolean` | 是否显示投影幕布，默认值：false |
| `screenDistance` | `number` | 投影幕布的显示距离，单位：米，默认值：100米 |
| `distance` | `number` | 投影距离，取值范围：[0~1000000.0]，单位：米 |
| `minDistance` | `number` | 近裁距离，取值范围：[0~1000000.0]，单位：米 |
| `depthCulling` | `boolean` | 是否背面剔除，默认值：false |
| `frustumVisible` | `boolean` | 是否显示投影线框，默认值：false |
| `frustumColor` | `Color` | 投影线框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `texturePath` | `string` | 自定义投影蒙版图片路径，可以是本地路径，也支持网络路径，[资源引入说明](/docs/tutorials/resources) |

> 示例：Add

```js
fdapi.videoProjection.delete('vp1');
let o = {
    id: "vp1",
    videoURL: HostConfig.Path + "/assets/video/video2.mov",//视频地址
    location: [492753.3125, 2491942.25, 60],
    rotation: [-10, 10, 0],
    fov: 90,//垂直夹角
    aspectRatio: 1.5,//纵横比
    exposure: 0.6, //曝光度
    distance: 100,//投影距离
    minDistance: 5,//近裁距离
    depthCulling: true,//是否背面剔除 即背面不显示投影
    frustumVisible: true,//是否显示投影线框
    frustumColor: [1, 1, 1, 1], //投影线框颜色
    texturePath: HostConfig.Path + '/assets/image/decal2.png', //自定义投影蒙版图片路径
    screen: true, //是否显示投影幕布，默认值：false
    screenDistance: 120 //投影幕布的显示距离，单位：米，默认值：100米
}
await fdapi.videoProjection.add(o);
fdapi.videoProjection.focus(o.id, 50);
```

---

### `clear(fn)`

删除场景中所有的VideoProjection对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.videoProjection.clear();
```

---

### `delete(ids, fn)`

删除一个或多个VideoProjection对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的VideoProjection对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.videoProjection.delete('vp1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | VideoProjection对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.videoProjection.focus('vp1', 100);
```

---

### `get(ids, fn)`

根据ID获取VideoProjection的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的VideoProjection对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
VideoProjection的详细信息
[{
            "id":	"vp1",
            "groupId":	"",
            "videoURL":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/media/video/video2.mov",
            "mediaType":	153,
            "location":	[495333.593750, 2490901.000000, 20.000000],
            "rotation":	[-49.999992, 0.000000, 0.000000],
            "fov":	90.000000,
            "aspectRatio":	1.770000,
            "distance":	100.000000,
            "depthCulling":	1,
            "frustumColor":	[0.000000, 0.000000, 1.000000, 1.000000]
        }]
```

> 示例：Get

```js
fdapi.videoProjection.get('vp1');
```

---

### `hide(ids, fn)`

隐藏VideoProjection

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | VideoProjection对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.videoProjection.hide('vp1');
```

---

### `setAspectRatio(id, newVal, fn)`

设置纵横比

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `number` | 新纵横比，取值范围：[0.1~10.0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置纵横比：SetAspectRatio

```js
fdapi.videoProjection.setAspectRatio('vp1', 3);
```

---

### `setDepthCulling(id, newVal, fn)`

设置是否背面剔除

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `boolean` | 是否背面剔除，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置是否背面剔除：SetDepthCulling

```js
fdapi.videoProjection.setDepthCulling('vp1', false);
```

---

### `setDistance(id, newVal, fn)`

设置距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `number` | 新距离值，取值范围：[0~1000000.0]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置距离：SetDistance

```js
fdapi.videoProjection.setDistance('vp1', 200);
```

---

### `setFovy(id, newVal, fn)`

设置垂直夹角

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `number` | 新垂直夹角，取值范围：[0~160]，单位：度 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置垂直夹角：SetFovy

```js
fdapi.videoProjection.setFovy('vp1', 100);
```

---

### `setFrustumColor(id, newVal, fn)`

设置投影线框颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `Color` | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置投影线框颜色：SetFrustumColor

```js
fdapi.videoProjection.setFrustumColor('vp1', Color.Red);
```

---

### `setLocation(id, newVal, fn)`

设置位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `array` | 新位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置位置：SetLocation

```js
fdapi.videoProjection.setLocation('vp1', [492728.4375, 2491908, 68]);
```

---

### `setRotation(id, newVal, fn)`

设置旋转值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `array` | 新旋转值：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置旋转值：SetRotation

```js
fdapi.videoProjection.setRotation('vp1', [-100, 0, 0]);
```

---

### `setVideoURL(id, newVal, fn)`

设置视频地址

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | VideoProjection对象的ID |
| `newVal` | `string` | 新视频地址，支持本地文件和网络地址，同时支持rtsp实时视频流协议，注意：mp4文件视频只支持H264/AVC编码格式的 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置视频地址：SetVideoURL

```js
fdapi.videoProjection.setVideoURL('vp1', HostConfig.Path + "/assets/video/video1.webm");
```

---

### `show(ids, fn)`

显示VideoProjection

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | VideoProjection对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.videoProjection.show('vp1');
```

---

### `update(data, fn)`

修改一个或多个VideoProjection对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: "vp1",
    rotation: [-90, 120, 0],
    fov: 90,
    exposure: 1, //曝光度
    aspectRatio: 1,
    distance: 120,
    texturePath: '' //自定义投影蒙版图片路径
}
await fdapi.videoProjection.update(o);
fdapi.videoProjection.focus(o.id, 50);
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
await fdapi.videoProjection.updateEnd();
```
