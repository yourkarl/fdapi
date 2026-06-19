---
title: CameraTour
sidebar_label: CameraTour
description: "CameraTour 是相机导览（漫游）动画对象，用于按关键帧序列驱动相机沿预设路线自动飞行、播放、暂停与停止，实现自动巡游展示。"
---

# CameraTour

CameraTour 是相机导览（漫游）动画对象，用于按关键帧序列驱动相机沿预设路线自动飞行、播放、暂停与停止，实现自动巡游展示。

通过 `api.cameraTour` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CameraTour 是相机导览（漫游）动画对象，用于按关键帧序列驱动相机沿预设路线自动飞行、播放、暂停与停止，实现自动巡游展示。
- **别名 / 不同行业叫法**：漫游 / 导览 / 巡游 / 飞行路线 / 关键帧动画 / 自动巡航；汇报中也称“一键漫游”“自动飞行”。
- **适用行业**：展厅汇报、智慧城市、智慧园区、智慧交通、能源、应急指挥。
- **使用场景**：
  - 展厅或领导汇报中自动巡游城市/园区，串联多个重点区域形成讲解动线。
  - 项目开场或大屏轮播时循环播放预设飞行路线，无人值守自动展示。
  - 应急复盘按时间轴沿事件发生路径漫游回放现场态势。
- **注意事项**：
  - 路线由 CameraTourData 与 CameraTourKeyFrame 组成，需先 add 再 play。
  - 关键帧坐标系须与工程一致；关键帧不宜过密以保证飞行平滑。
  - 播放期间应避免与手动相机操作或跟随同时进行，防止视角抖动。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 创建一个或多个CameraTour对象 | 向场景批量添加对象 |
| [`delete`](#delete) | 删除一个或多个CameraTour对象 | 按 ID 移除指定对象 |
| [`exportVideo`](#exportVideo) | 根据CameraTour的ID导出视频文件， |  |
| [`pause`](#pause) | 暂停播放导览动画 | 暂停播放 |
| [`play`](#play) | 开始播放导览动画 | 播放动画/导览 |
| [`resume`](#resume) | 恢复播放导览动画 | 恢复播放 |
| [`setDuration`](#setDuration) | 设置时间长度 |  |
| [`setKeyFrames`](#setKeyFrames) | 设置导览动画关键帧 |  |
| [`setMouseClickToPause`](#setMouseClickToPause) | 设置播放导览时点击鼠标是否暂停 |  |
| [`setName`](#setName) | 设置名称 |  |
| [`setTime`](#setTime) | 设置导览从某时刻开始播放 |  |
| [`setUserData`](#setUserData) | 设置用户数据 |  |
| [`stop`](#stop) | 停止播放导览动画 | 停止播放 |
| [`update`](#update) | 修改一个或多个CameraTour对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

创建一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `CameraTourData \| array` | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

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

### `delete(ids, fn)` {#delete}

删除一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的CameraTour对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.cameraTour.delete('1');
```

---

### `exportVideo(id, path)` {#exportVideo}

根据CameraTour的ID导出视频文件，注意：导出的视频文件默认格式为*.mp4，分辨率：1920X1080，帧速率：30

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `path` | `string` | 导出的相机导览视频文件的磁盘保存路径，注意：此路径需要在渲染服务器端存在，因为导出视频文件保存在渲染服务器的磁盘上，取值示例：D:/videos/test.mp4 |

**返回：** 返回查询结果。

---

### `pause()` {#pause}

暂停播放导览动画

**返回：** 无返回值。

> 示例：Pause

```js
fdapi.cameraTour.pause();
```

---

### `play(id, fn)` {#play}

开始播放导览动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Play

```js
fdapi.cameraTour.play('1');
```

---

### `resume()` {#resume}

恢复播放导览动画

**返回：** 无返回值。

> 示例：Resume

```js
fdapi.cameraTour.resume();
```

---

### `setDuration(id, val, fn)` {#setDuration}

设置时间长度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

---

### `setKeyFrames(id, val, fn)` {#setKeyFrames}

设置导览动画关键帧

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

---

### `setMouseClickToPause(id, bool, fn)` {#setMouseClickToPause}

设置播放导览时点击鼠标是否暂停

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 相机导览的ID |
| `bool` | `boolean` | 播放导览时点击鼠标是否暂停，默认：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetMouseClickToPause

```js
fdapi.cameraTour.setMouseClickToPause('1', false);
```

---

### `setName(id, val, fn)` {#setName}

设置名称

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

---

### `setTime(id, time, fn)` {#setTime}

设置导览从某时刻开始播放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 相机导览的ID |
| `time` | `number` | 导览开始播放的时刻 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetTime

```js
fdapi.cameraTour.setTime('1', 3);
```

---

### `setUserData(id, val, fn)` {#setUserData}

设置用户数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CameraTour的ID |
| `val` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

---

### `stop(fn)` {#stop}

停止播放导览动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Stop

```js
fdapi.cameraTour.stop();
```

---

### `update(data, fn)` {#update}

修改一个或多个CameraTour对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `CameraTourData \| array` | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

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

| 参数 | 类型 | 说明 |
|

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。
