---
title: DaHuaVideoFusion
sidebar_label: DaHuaVideoFusion
description: "大华视频融合对象，提供DaHuaVideoFusion对象的操作方法 一般通过api.daHuaVideoFusion调用"
---

# DaHuaVideoFusion

大华视频融合对象，提供DaHuaVideoFusion对象的操作方法

一般通过api.daHuaVideoFusion调用

通过 `api.daHuaVideoFusion` 访问。

## 构造函数

```js
new DaHuaVideoFusion()
```

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个大华视频融合对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 大华视频融合服务认证相关参数，可以是Object类型或者Array类型，对于每一个DaHuaVideoFusion对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 大华视频融合对象ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `serverIP` | `string` | 大华视频服务器IP |
| `serverPort` | `string` | 大华视频服务器端口 |
| `accessToken` | `string` | 鉴权token，根据ICC开放平台接口文档获取 |
| `labelVisible` | `number` | 默认是否显示摄像头的标签，点击标签可以定位到摄像头位置，取值范围：[0,1]，默认值：0 |

> 示例：Add

```js
fdapi.daHuaVideoFusion.delete("dh001");
let dahuavf = {
    "id": "dh001",
    "groupId": "group1",
    "userData": "车道监控",
    "labelVisible": 1,
    "serverIP": "icc-dev.hibetatest.com",
    "serverPort": "4077",
    "accessToken": "======" //鉴权token，根据ICC开放平台接口文档获取
}
fdapi.daHuaVideoFusion.add(dahuavf);
```

---

### `clear(fn)`

清空场景中所有的大华视频融合对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.daHuaVideoFusion.clear();
```

---

### `delete(ids, fn)`

删除一个或多个大华视频融合对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的大华视频融合对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.daHuaVideoFusion.delete("dh001");
```

---

### `focus(data, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object` | 数据对象，对象支持以下属性： |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，大华视频融合对象的ID |
| `cameraIds` | `array` | 必选，待定位的大华视频融合对象包含的摄像头ID数组 |

> 示例：Focus

```js
fdapi.daHuaVideoFusion.focus({ id: "dh001", "cameraIds": ["c001", "c002", "c003"] }, 10, 1, [0, 45, 0]);
```

---

### `get(ids, fn)`

根据大华视频融合ID获取包含的摄像头列表

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的大华视频融合对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回大华视频融合的详细信息 属性详情参见add方法参数

[{
            "id":	"DaHuaVideoFusion_1",
            ...
        }]
```

> 示例：Get

```js
fdapi.daHuaVideoFusion.get("dh001");
```

---

### `hide(data, fn)`

隐藏大华视频融合对象内指定的摄像头列表

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，大华视频融合对象的ID |
| `cameraIds` | `array` | 必选，待隐藏的大华视频融合对象包含的摄像头ID数组 |

> 示例：Hide

```js
fdapi.daHuaVideoFusion.hide({ id: "dh001", "cameraIds": ["c001", "c002"] });
```

---

### `show(data, fn)`

显示大华视频融合对象内指定的摄像头列表

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，大华视频融合对象的ID |
| `cameraIds` | `array` | 必选，待显示的大华视频融合对象包含的摄像头ID数组 |

> 示例：Show

```js
fdapi.daHuaVideoFusion.show({ id: "dh001", "cameraIds": ["c001", "c002", "c003"] });
```

---

### `update(data, fn)`

修改一个或多个大华视频融合对象及包含的摄像头信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `data \| array` | 大华视频融合对象或对象数组，支持更新参数如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 大华视频融合对象ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `labelVisible` | `number` | 默认是否显示摄像头的标签，点击标签可以定位到摄像头位置，取值范围：[0,1]，默认值：0 |
| `refreshToken` | `string` | 刷新token，根据ICC开放平台接口文档获取 |
| `triggerType` | `number` | 摄像头的四类触发类型： 0空 1角色距离 2碰撞判定 3相机距离判定 默认值 3 |
| `cameraList` | `array` | 待更新大华视频融合对象包含的摄像头列表信息： |
| `cameraList.cameraId` | `string` | 摄像头ID |
| `cameraList.coordinate` | `array` | 摄像头所在的坐标位置，[取值示例](/docs/tutorials/coordinates) |
| `cameraList.projectionDis` | `number` | 投影距离，单位米，默认值：100 |
| `cameraList.triggerDis` | `array` | (number) 触发距离，单位米，默认值：1000 |

> 示例：Update

```js
let dahuavf = {
    "id": "dh001",
    "groupId": "group1",
    "userData": "车道监控",
    "labelVisible": 1,
    "triggerType": 3,
    "refreshToken": "======",//刷新token，根据ICC开放平台接口文档获取
    "cameraList": [
        { "cameraId": "c001", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
        { "cameraId": "c002", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
        { "cameraId": "c003", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
    ]
}
fdapi.daHuaVideoFusion.update(dahuavf);
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
await fdapi.daHuaVideoFusion.updateEnd();
```
