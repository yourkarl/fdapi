---
title: 快速开始 (Hello World)
sidebar_label: 快速开始
description: "5分钟完成 DTS Cloud SDK 接入，创建第一个数字孪生页面"
---

### 一、获取 SDK 文件

打开 DTS Cloud 软件，点击右上角 **【SDK】** 链接，默认安装目录下的 `SDK` 文件夹中获取 `ac.min.js` 文件。

---

### 二、引用 SDK

#### 推荐：HTML `<script>` 标签引入

```html
<script src="./lib/ac.min.js"></script>
```

---

### 三、Hello World 示例

#### 3.1 添加视频流容器

在 `<body>` 中添加一个 `<div>` 作为视频流渲染区域，**必须设置宽高**：

```html
<div id="player" style="width: 800px; height: 500px;"></div>
```

#### 3.2 初始化 SDK

```js
// 事件回调
function _onReady() {
  console.log('onReady：可以调用 API 了');
}

function _onLog(s, nnl) {
  console.log('[SDK Log]', s);
}

function _onEvent(event) {
  if (event.eventtype === 'LeftMouseButtonClick' && event.Type === 'TileLayer') {
    console.log('点击了图层：', event.Id);
  }
}

// 服务器地址和端口（替换为实际地址）
const host = '192.168.1.27:8081';

const options = {
  domId: 'player',        // 与 HTML 中 div 的 id 一致
  apiOptions: {
    onReady:  _onReady,   // 必填：连接就绪回调，此后才可调用 API
    onLog:    _onLog,     // 可选：日志输出回调
    onEvent:  _onEvent,   // 可选：三维场景交互事件回调
  },
  ui: {
    startupInfo: true,    // 是否显示启动加载详情，默认 false
    statusButton: true,   // 是否显示状态按钮，默认 false
  },
  events: {
    onVideoLoaded: () => console.log('视频流加载成功'),
    onConnClose:   () => console.log('连接已断开'),
  },
  keyEventTarget: 'none', // 键盘事件接收者：'video' | 'document' | 'none'
};

// 初始化播放器，获取 API 实例
const player = new DigitalTwinPlayer(host, options);
const fdapi  = player.getAPI();
// 也可通过全局变量 window.fdapi 访问同一实例
```

:::tip
只有在 `onReady` 回调触发之后，才能安全调用 `fdapi` 的各类方法。详见 [FAQ](/docs/tutorials/faq)。
:::

---

### 四、在 Vue / React / Angular 中使用

在现代前端框架中集成 SDK，需要注意生命周期管理（组件卸载时销毁实例）和 SSR 兼容性。

👉 查看完整示例：[框架集成指南](/docs/tutorials/framework-integration)
