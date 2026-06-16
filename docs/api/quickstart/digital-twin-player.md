---
title: DigitalTwinPlayer
sidebar_label: DigitalTwinPlayer
description: "DigitalTwinPlayer 是云渲染视频流对象，在网页上创建并显示三维视频流，并承载键盘、鼠标、触摸等交互。"
---

# DigitalTwinPlayer

DigitalTwinPlayer 是云渲染视频流对象，在网页上创建并显示三维视频流，并承载键盘、鼠标、触摸等交互。

用于在页面上创建和显示三维视频流，并进行键盘、鼠标、触摸屏等交互操作。

通过 `fdplayer` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：DigitalTwinPlayer 是云渲染视频流对象，在网页上创建并显示三维视频流，并承载键盘、鼠标、触摸等交互。
- **别名 / 不同行业叫法**：播放器 / 云渲染 / 视频流 / 像素流 / 串流窗口 / WebRTC 播放器。
- **适用行业**：云渲染交付基础，贯穿所有行业
- **使用场景**：
  - 网页端嵌入三维场景视频流
  - 多窗口/多场景的串流展示
  - 移动端轻量接入三维场景
- **注意事项**：
  - 依赖云渲染服务可达与网络带宽
  - 交互延迟与网络质量相关
  - 多实例时注意资源占用与 fdapi 指向


## 构造函数

```js
new DigitalTwinPlayer(host, option)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `host` | `string` | 服务地址，格式如下 IP:Port，例如： `'192.168.1.29:8082';` 此处的Port对应CloudMaster-&gt;服务设置-&gt;服务地址里的端口号，这里分两种情况，使用独立端口和使用1个端口，见下图所示： ![](/img/refdoc/api/PlayerPort.png) |
| `option` | `object` | 初始化选项，支持以下属性（都是可选） |

> **`option` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `domId` | `string` | HTML元素ID（它将作为要创建的Video标签的父元素），如果未设置此参数，则不传输视频流，只进行API调用 |
| `iid` | `string` | 云渲染实例的ID，该属性有以下两种情况： （1）对于带视频流的连接（指定了domId属性），该属性是可选的，如果没有指定iid，则自动分配空闲的实例 （2）对于不带视频流的API调用，该属性是必需的，必需指定云渲染实例才能进行API调用 |
| `pid` | `number` | 指定实例要加载的工程ID，；注意事项：如果实例设置中锁定了工程文件，此处如果指定的pid是另外的工程，会导致切换工程失败。 |
| `reset` | `boolean` | 指定是否重置实例。如果设置reset为true，每次连接（包括刷新）都会得到一个全新的实例；注意事项：如果设置为true，每次刷新页面也会导致实例重启。 |
| `customString` | `string` | 用来存储用户自定义信息；注意事项： |
| `ui` | `object` | 用于设置界面组件的可见性。 支持以下属性： |
| `ui.startupInfo` | `boolean` | 默认值：true；初始化过程中是否显示详细信息。 ![](/img/refdoc/api/showStartupInfo.png) |
| `ui.statusIndicator` | `boolean` | 默认值：true；左上角闪烁的状态指示灯，可以从不同的颜色看出当前的状态，具体含义请参考 `CloudStatus` |
| `ui.statusButton` | `boolean` | 默认值：false；左下角是否显示信息按钮，点击时，会在小窗口显示当前连接的实时运行状态；鼠标停留时，会显示当前所连接实例的详细信息。 鼠标点击效果： ![](/img/refdoc/api/StatusButtonClick.png) 鼠标悬停效果： ![](/img/refdoc/api/StatusButtonHover.png)；注意事项：可以在视频流窗口上快速双击鼠标中键来显示运行状态窗口 |
| `ui.fullscreenButton` | `boolean` | 默认值：false；是否在左下角显示“全屏”按钮 |
| `ui.homeButton` | `boolean` | 默认值：false；是否在左下角显示“回到初始位置”按钮 |
| `ui.taskListBar` | `number` | 默认值：1；是否在下方显示“任务队列（API调用队列）”信息，取值如下： 0: 永不显示 1: 执行比较耗时的操作时显示 2: 一直显示 ![](/img/refdoc/api/taskListBar.png) |
| `ui.debugEventsPanel` | `boolean` | 默认值false；是否显示触摸事件详细信息（仅用于调试） ![](/img/refdoc/api/debugEventsPanel.png) |
| `ui.mainUI` | `boolean` | 无默认值；是否显示Cloud工具栏。 也可以通过settings.setMainUIVisibility设置；注意事项：如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。 |
| `ui.campass` | `boolean` | 无默认值；是否显示指北针。 也可以可以通过settings.setCampassVisible设置；注意事项：如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。 |
| `apiOptions` | `object` | 用于指定DigitalTwinAPI的初始化选项，具体属性值请参考 [`DigitalTwinAPI`](/docs/api/quickstart/digital-twin-api)；注意事项：初始化DigitalTwinPlayer的时候会自动创建DigitalTwinAPI对象，所以不需要再单独创建，后面可以通过getAPI()获取 |
| `events` | `object` | 用于设置一些事件回调函数，目前可以设置以下属性： -touchListener 参数类型：function，用于接收触摸事件，可以随时通过 [`DigitalTwinPlayer#setActionEventEnabled`](/docs/api/quickstart/digital-twin-player) 进行开关。 -onLoginRequired 参数类型：function，如果开启了用户系统，当需要登录的时候会调用此方法。 |
| `events.onConnClose` | `function` | 服务连接断开的回调函数，函数参数为event（断开事件） |
| `events.onVideoLoaded` | `function` | 当视频流加载成功(loadedmetadata)后触发 |
| `events.onRtcStatsReport` | `function` | 用于接收视频流的状态信息，例如：帧率、码率、QP等。 |
| `events.mouseKeyListener` | `object` | 用于设置键盘、鼠标交互事件，后面可以随时通过 [`DigitalTwinPlayer#setActionEventEnabled`](/docs/api/quickstart/digital-twin-player) 进行开关。 可以设置以下值（类型都是function)： |
| `events.mouseKeyListener.onMouseEnter` | `-` | — |
| `events.mouseKeyListener.onMouseLeave` | `-` | — |
| `events.mouseKeyListener.onMouseMove` | `-` | — |
| `events.mouseKeyListener.onMouseDown` | `-` | — |
| `events.mouseKeyListener.onMouseUp` | `-` | — |
| `events.mouseKeyListener.onKeyDown` | `-` | — |
| `events.mouseKeyListener.onKeyUp` | `-` | — |
| `events.mouseKeyListener.onKeyPress` | `-` | — |
| `keyEventTarget` | `string` | 取值：'document', 'video', 'none'，默认值'video'；该属性用于设置键盘的作用对象：视频标签(video)、网页文档(document)、禁用(none)。 用户可以根据自己的应用场景设置合适的键盘交互对象： 如果网页仅用于全屏三维展示，没有其他页面元素，可以将键盘事件设置给document，这样在任何情况下都可以随时用键盘进行漫游。 如果页面中除了三维视频流，还有其他元素（比如文本输入框），如果这个时候，用document对象接收键盘事件，那么就会出现在文本输入框输入文字的时候，三维依然在交互的问题，这时可以将keyEventReceiver设置为'video'，即可避免这种问题。 如果keyEventReceiver设为'video', 不是任何时候都可以用键盘进行三维交互的，必须视频标签元素处于焦点状态方可（可以用TAB切换焦点 或者鼠标点击设为焦点） 如果不需要用键盘进行三维交互，可以将此属性设为 'none'。 |
| `password` | `string` | 设置实例的访问密码，如果服务设置了密码，那么客户端需要提供正确的密码才能连接实例 |
| `urlExtraInfo` | `object` | 用于给WebSocket连接的URL添加附加信息（例如认证授权信息等） |
| `useBuiltinCursors` | `boolean` | 默认值true；设置是否使用内置光标，如果设置为false, 则不使用内置光标，视频窗口将一直显示箭头样式的光标 |
| `useHttps` | `boolean` | 默认值false；明确指定使用HTTPS进行WebSocket连接。如果使用Nginx通过Https反向代理Cloud的Http服务，为了能够正确的建立连接，需要在初始化DigitalTwinPlayer的时候设置useHttps属性为true。 |
| `registerEvents` | `boolean` | 默认值true；初始化时是否注册交互事件（包括键盘、鼠标、触摸）。 如果在charts设计模式下，需要将此属性设置为false，以防止视频流组件无法拖动。 |
| `receiveRenderEvents` | `boolean` | 默认值true；设置是否接收三维渲染进程的事件。 当在一个页面上初始化多个DigitalTwinPlayer对象，并且访问的是同一个实例时，需要设置此属性为false，否则同一个事件会收到多次。 |
| `enableApiCallLog` | `boolean` | 默认值false；Cloud调用接口时，是否开启客户端日志（客户端日志通过apiOptions.onlog设置）；添加日期：2023.11.17 |
| `enableEventSync` | `boolean` | 默认值false；当在同一个页面上创建多个DigitalTwinPlayer对象时，enableEventSync属性设置为true的player对象将参与到交互同步，也就是，在一个视频流上进行键盘、鼠标、触摸操作时，这些交互事件将同步发送到其他enableEventSync属性设置为true的视频流上， 这样就可以实现多个视频流显示同样的视角，进行方案对比等功能。；注意事项：后面可以通过setEnableEventSync()方法随时开关此功能；添加日期：2024.08.22 |

## 成员（Members）

| 成员 | 类型 | 说明 |
|------|------|------|
| `fullscreen` | — | 设置是否进入全屏状态，如果为true则全屏显示视频流，如果为false则退出全屏 |
| `fullscreen` | — | 获取当前是否处于全屏状态 |

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`destroy`](#destroy) | 销毁 |  |
| [`getAPI`](#getAPI) | 获取DigitalTwinAPI接口 |  |
| [`getHost`](#getHost) | 获取服务器的地址（ip:port） |  |
| [`getInstanceInfo`](#getInstanceInfo) | 获取当前所连接的实例信息 |  |
| [`getVideoElement`](#getVideoElement) | 获取用于播放Cloud视频流的video元素 |  |
| [`getVideoElementSize`](#getVideoElementSize) | 获取Video元素的尺寸 |  |
| [`getVideoSize`](#getVideoSize) | :::caution 已废弃 |  |
| [`getVideoStreamSize`](#getVideoStreamSize) | 获取视频流的尺寸 |  |
| [`resize`](#resize) | 重新调整布局 |  |
| [`screen2World`](#screen2World) | 屏幕坐标转为投影坐标 |  |
| [`setActionEventEnabled`](#setActionEventEnabled) | 设置是否开启键盘、鼠标交互事件的回调功能 |  |
| [`setEnableEventSync`](#setEnableEventSync) | 用于开关交互事件同步功能 |  |
| [`setInstanceOptions`](#setInstanceOptions) | 设置实例选项，调用此接口可以实现在不刷新页面的情况下切换使用的实例或工程文件 |  |
| [`setKeyEventTarget`](#setKeyEventTarget) | 设置键盘交互事件的目标对象 |  |
| [`setResolution`](#setResolution) | 设置视频流的尺寸，如果云渲染后台启用了自适应，那么视频流的分辨率也会自动调整。 如果没有… |  |
| [`world2Screen`](#world2Screen) | 投影坐标转为屏幕坐标 |  |

## 方法（Methods）

### `destroy(reason)` {#destroy}

销毁

| 参数 | 类型 | 说明 |
|------|------|------|
| `reason` | `string` | 可选参数，指定原因，如果初始化DigitalTwinPlayer时指定了显示调试信息，可以在界面上显示销毁的原因。 |

> 示例代码如下：

```js
await fdplayer.destroy(reason);
```

---

### `getAPI()` {#getAPI}

获取DigitalTwinAPI接口

> 示例代码如下：

```js
await fdplayer.getAPI();
```

---

### `getHost()` {#getHost}

获取服务器的地址（ip:port）

> 示例代码如下：

```js
await fdplayer.getHost();
```

---

### `getInstanceInfo()` {#getInstanceInfo}

获取当前所连接的实例信息

> 示例代码如下：

```js
await fdplayer.getInstanceInfo();
```

---

### `getVideoElement()` {#getVideoElement}

获取用于播放Cloud视频流的video元素

**返回：** Video元素

> 示例代码如下：

```js
await fdplayer.getVideoElement();
```

---

### `getVideoElementSize()` {#getVideoElementSize}

获取Video元素的尺寸

**返回：** 包含width,height属性的object对象

> 示例代码如下：

```js
await fdplayer.getVideoElementSize();
```

---

### `getVideoSize()` {#getVideoSize}

:::caution 已废弃

已废弃，请使用getVideoStreamSize代替

:::

> 示例代码如下：

```js
await fdplayer.getVideoSize();
```

---

### `getVideoStreamSize()` {#getVideoStreamSize}

获取视频流的尺寸

**返回：** 包含width,height属性的object对象

> 示例代码如下：

```js
await fdplayer.getVideoStreamSize();
```

---

### `resize()` {#resize}

重新调整布局

> 示例代码如下：

```js
await fdplayer.resize();
```

---

### `screen2World(x, y, fn)` {#screen2World}

屏幕坐标转为投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)。


注意：这里的屏幕坐标是相对Video元素的坐标，坐标原点位于Video元素的左上角。

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 屏幕坐标值x |
| `y` | `number` | 屏幕坐标值y |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdplayer.screen2World(x, y);
```

---

### `setActionEventEnabled(bEnable)` {#setActionEventEnabled}

设置是否开启键盘、鼠标交互事件的回调功能

| 参数 | 类型 | 说明 |
|------|------|------|
| `bEnable` | `boolean` | — |

> 示例代码如下：

```js
await fdplayer.setActionEventEnabled(bEnable);
```

---

### `setEnableEventSync(bEnabled)` {#setEnableEventSync}

用于开关交互事件同步功能

| 参数 | 类型 | 说明 |
|------|------|------|
| `bEnabled` | `boolean` | 是否开启 |

> 示例代码如下：

```js
await fdplayer.setEnableEventSync(bEnabled);
```

---

### `setInstanceOptions(o)` {#setInstanceOptions}

设置实例选项，调用此接口可以实现在不刷新页面的情况下切换使用的实例或工程文件

| 参数 | 类型 | 说明 |
|------|------|------|
| `o` | `object` | 实例选项，支持以下属性： |

**返回：** 如果设置的参数与当前的实例的参数相同，则返回false, 否则返回true

> 示例：设置实例参数：SetInstanceOptions

```js
fdplayer.setInstanceOptions({
    iid: '2478360654074',
    pid: 18
});
```

---

### `setKeyEventTarget(newVal)` {#setKeyEventTarget}

设置键盘交互事件的目标对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `newVal` | `string` | 可选的值：document / video / none，具体含义请参考DigitalTwinPlayer对象的初始化方法 |

> 示例代码如下：

```js
await fdplayer.setKeyEventTarget(newVal);
```

---

### `setResolution(w, h)` {#setResolution}

设置视频流的尺寸，如果云渲染后台启用了自适应，那么视频流的分辨率也会自动调整。 如果没有启用自适应，则调用不起作用。

注意：

- 视频流支持的最大分辨率为4096*4096，如果设置的宽高超过这个大小，将自动按比例缩放到合适的大小
- 因为移动端都是高分屏，通常是CSS分辨率的几倍，所以实际设置的宽高会乘以这个系数（devicePixelRatio）

| 参数 | 类型 | 说明 |
|------|------|------|
| `w` | `number` | 宽度 |
| `h` | `number` | 高度 |

**返回：** 如果云渲染后台没有开启自适应，或者设置的分辨率与当前的分辨率相同，则返回undefined。 否则返回实际设置的分辨率数组，例如： [3846,2160]

> 示例代码如下：

```js
await fdplayer.setResolution(w, h);
```

---

### `world2Screen(x, y, z, fn)` {#world2Screen}

投影坐标转为屏幕坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)

注意：这里的屏幕坐标是相对Video元素的坐标，坐标原点位于Video元素的左上角。

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 世界坐标点x |
| `y` | `number` | 世界坐标点y |
| `z` | `number` | 世界坐标点z |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdplayer.world2Screen(x, y, z);
```


## 更多示例

> 全屏显示：Fullscreen

```js
fdplayer.fullscreen = !fdplayer.fullscre