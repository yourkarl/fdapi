---
title: 多视频同屏渲染
sidebar_label: 多视频
description: "在单个页面中同时渲染多个视频流的实现方式"
---

### 在一个页面中嵌入多个云渲染窗口

要在同一个页面中嵌入多个云渲染视频流窗口，目前有以下两种方式：

---

#### 第 1 种方式：使用 iframe 框架

代码如下：

```html
<body>
  <table width="100%" height="600" border="0">
    <tr>
      <td>
        <iframe id="player1" src="player.html?ms" width="100%" height="100%"></iframe>
      </td>
      <td>
        <iframe id="player2" src="player.html?ms" width="100%" height="100%"></iframe>
      </td>
    </tr>
  </table>
</body>
```

这种方式代码简单，适合快速开发展示多个视频流的情况。但由于使用了 iframe 存在跨域问题，调用 `DigitalTwinAPI` 接口时需通过 `postMessage` 实现，相对繁琐。推荐使用第 2 种方案。

---

#### 第 2 种方式：多实例 API（推荐，适用于 20210315 之后的版本）

HTML 核心代码：

```html
<div id="player1"></div>
<button onclick="callPlayer1()">调用 Player1 的接口</button>

<div id="player2"></div>
<button onclick="callPlayer2()">调用 Player2 的接口</button>
```

JS 核心代码：

```js
// 注意：显卡需要支持 Cloud 同时启动多个实例

// 在 Cloud 实例列表中右键复制实例 ID
let instanceId1 = '2464721833873';
let instanceId2 = '2464721833874';

let host = '127.0.0.1:8080';

let option1 = {
  domId: 'player1',       // 挂载容器 ID
  iid: instanceId1,       // 实例 ID
  apiOptions: {
    // 只有在 onReady 之后才可以调用 DigitalTwinAPI 接口
    onReady: _onReady1,
  },
};

let option2 = {
  domId: 'player2',
  iid: instanceId2,
  apiOptions: {
    onReady: _onReady2,
  },
};

// 分别初始化两个 API 实例
var __api1 = new DigitalTwinPlayer(host, option1).getAPI();
var __api2 = new DigitalTwinPlayer(host, option2).getAPI();

// 分别操作各自的视频流
function callPlayer1() {
  __api1.settings.setMainUIVisibility(false);
}

function callPlayer2() {
  __api2.settings.setMainUIVisibility(false);
}
```

:::tip
每个 `DigitalTwinPlayer` 实例独立管理自己的 API 对象，互不干扰。`onReady1` / `onReady2` 各自的回调中操作对应的 `__api1` / `__api2`，避免混用。
:::
