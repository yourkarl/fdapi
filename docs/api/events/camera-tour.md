---
title: CameraTour
sidebar_label: CameraTour
description: "相机导览动画对象"
---

# CameraTour

相机导览动画对象

通过 `api.cameraTour` 访问。

---

## 方法（Methods）

### `add(data, fn)`

创建一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `CameraTourData \| array` | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Add

```js
await fdapi.cameraTour.delete('1');
//通过接口添加导览并播放
let frames = [];
//注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
frames.push(new CameraTourKeyFrame(0, 1.0, [492501.90625, 2483838.75, 5898.237305], [-55.95829, -89.993935, 0]));
frames.push(new CameraTourKeyFrame(1, 2.0, [493538.75, 2487061.5, 1166.874878], [-36.769756, -91.261223, 0]));
frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487789.25, 504.430054], [-23.049517, -91.261223, 0]));
frames.push(new CameraTourKeyFrame(3, 4.0, [495635.78125, 2491133.75, 183.135956], [-24.96583, -172.325165, 0]));
frames.push(new CameraTourKeyFrame(4, 5.0, [495270, 2491256.75, 67.038582], [-25.314354, 108.269859, 0]));

let o = new CameraTourData('1', 'test', frames);
await fdapi.cameraTour.add(o);
fdapi.cameraTour.play('1');
```

---

### `delete(ids, fn)`

删除一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的CameraTour对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.cameraTour.delete('1');
```

---

### `exportVideo(id, path)`

根据CameraTour的ID导出视频文件，注意：导出的视频文件默认格式为*.mp4，分辨率：1920X1080，帧速率：30

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `path` | `string` | 导出的相机导览视频文件的磁盘保存路径，注意：此路径需要在渲染服务器端存在，因为导出视频文件保存在渲染服务器的磁盘上，取值示例：D:/videos/test.mp4 |

> 示例代码如下：

```js
await fdapi.cameraTour.exportVideo(id, path);
```

---

### `pause()`

暂停播放导览动画

> 示例：Pause

```js
fdapi.cameraTour.pause();
```

---

### `play(id, fn)`

开始播放导览动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Play

```js
fdapi.cameraTour.play('1');
```

---

### `resume()`

恢复播放导览动画

> 示例：Resume

```js
fdapi.cameraTour.resume();
```

---

### `setDuration(id, val, fn)`

设置时间长度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.cameraTour.setDuration(id, val);
```

---

### `setKeyFrames(id, val, fn)`

设置导览动画关键帧

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.cameraTour.setKeyFrames(id, val);
```

---

### `setMouseClickToPause(id, bool, fn)`

设置播放导览时点击鼠标是否暂停

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 相机导览的ID |
| `bool` | `boolean` | 播放导览时点击鼠标是否暂停，默认：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetMouseClickToPause

```js
fdapi.cameraTour.setMouseClickToPause('1', false);
```

---

### `setName(id, val, fn)`

设置名称

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.cameraTour.setName(id, val);
```

---

### `setTime(id, time, fn)`

设置导览从某时刻开始播放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 相机导览的ID |
| `time` | `number` | 导览开始播放的时刻 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetTime

```js
fdapi.cameraTour.setTime('1', 3);
```

---

### `setUserData(id, val, fn)`

设置用户数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.cameraTour.setUserData(id, val);
```

---

### `stop(fn)`

停止播放导览动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Stop

```js
fdapi.cameraTour.stop();
```

---

### `update(data, fn)`

修改一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `CameraTourData \| array` | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
//调整关键帧
let frames = [];
//注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
frames.push(new CameraTourKeyFrame(0, 1.0, [492101.90625, 2483338.75, 5898.237305], [-25.95829, -29.993935, 0]));
frames.push(new CameraTourKeyFrame(1, 2.0, [493238.75, 2487261.5, 1166.874878], [-46.769756, -11.261223, 0]));
frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487489.25, 504.430054], [-23.049517, -21.261223, 0]));

let o = new CameraTourData('1', 'test', frames);
await fdapi.cameraTour.update(o);
fdapi.cameraTour.play('1');
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
await fdapi.cameraTour.updateEnd();
```
