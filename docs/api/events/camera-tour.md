---
title: CameraTour
sidebar_label: CameraTour
description: "CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。"
---

# CameraTour

CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。

![](/img/refdoc/api/cameratour.gif)

通过 `api.cameraTour` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CameraTour 定义并播放相机沿关键帧的导览/漫游动画，实现自动巡游、镜头切换与定点轮巡。
- **别名 / 不同行业叫法**：导览 / 漫游 / 巡游 / 飞行路线 / 镜头动画 / 自动巡检视角。
- **适用行业**：智慧城市、展厅汇报、文旅、智慧园区、能源巡检
- **使用场景**：
  - 领导汇报时的自动巡游与镜头脚本
  - 项目沿预设路线的全景展示
  - 重点部位定点轮巡视角切换
- **注意事项**：
  - 关键帧之间需平滑过渡，避免镜头跳变与眩晕
  - 与业务事件联动时注意时序
  - 路线过长时提供可暂停/跳转的控制



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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `CameraTourData \| array` | 是 | - | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的CameraTour对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.cameraTour.delete('1');
```

---

### `exportVideo(id, path)` {#exportVideo}

根据CameraTour的ID导出视频文件，注意：导出的视频文件默认格式为*.mp4，分辨率：1920X1080，帧速率：30

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `path` | `string` | 是 | - | 导出的相机导览视频文件的磁盘保存路径，注意：此路径需要在渲染服务器端存在，因为导出视频文件保存在渲染服务器的磁盘上，取值示例：D:/videos/test.mp4 |

**返回：** 返回查询结果。

> 示例代码如下：

```js
fdapi.cameraTour.exportVideo('1', 'c:/test.mp4');
```

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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `val` | `number` | 是 | - | 新值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cameraTour.setDuration('对象ID', 0);
```

---

### `setKeyFrames(id, val, fn)` {#setKeyFrames}

设置导览动画关键帧

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `val` | `array` | 是 | - | 新值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cameraTour.setKeyFrames('对象ID', []);
```

---

### `setMouseClickToPause(id, bool, fn)` {#setMouseClickToPause}

设置播放导览时点击鼠标是否暂停

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 相机导览的ID |
| `bool` | `boolean` | 是 | - | 播放导览时点击鼠标是否暂停，默认：true |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetMouseClickToPause

```js
fdapi.cameraTour.setMouseClickToPause('1', false);
```

---

### `setName(id, val, fn)` {#setName}

设置名称

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `val` | `string` | 是 | - | 新值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cameraTour.setName('对象ID', '示例值');
```

---

### `setTime(id, time, fn)` {#setTime}

设置导览从某时刻开始播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 相机导览的ID |
| `time` | `number` | 是 | - | 导览开始播放的时刻 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetTime

```js
fdapi.cameraTour.setTime('1', 3);
```

---

### `setUserData(id, val, fn)` {#setUserData}

设置用户数据

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CameraTour的ID |
| `val` | `string` | 是 | - | 新值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cameraTour.setUserData('对象ID', '示例值');
```

---

### `stop(fn)` {#stop}

停止播放导览动画

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Stop

```js
fdapi.cameraTour.stop();
```

---

### `update(data, fn)` {#update}

修改一个或多个CameraTour对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `CameraTourData \| array` | 是 | - | [`CameraTourData`](/docs/api/camera/camera-tour-data)类的对象或者数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cameraTour.updateEnd();
```
