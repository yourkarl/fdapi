---
title: 事件系统
sidebar_label: 事件系统
description: "三维交互事件系统，包括点击、悬停、相机移动等事件类型"
---

### 一、关于事件交互系统的说明

#### 1.1、初始化时传入 onEvent 回调监听

在构造 `DigitalTwinPlayer` 时，通过 `apiOptions.onEvent` 传入回调函数：

```js
// 场景交互事件回调函数
function onEvent(event) {
  var eventType = event.eventtype;  // 事件类型
  var layerType  = event.Type;      // 图层类型
  var layerId    = event.Id || event.ID;   // 图层 ID
  var objectId   = event.ObjectID;         // 点击的 Actor ID
  var clickPos   = event.MouseClickPoint;  // 鼠标点击的世界坐标

  switch (eventType) {
    // 鼠标左键单击
    case 'LeftMouseButtonClick':
      log('触发：鼠标左键单击');
      break;

    // 鼠标悬停（需提前开启：fdapi.settings.setMousePickMask(7)）
    case 'MouseHovered':
      log('触发：鼠标悬停');
      break;

    // 鼠标移动（需提前开启：fdapi.settings.setMousePickMask(7)）
    case 'MouseMoved':
      log('触发：鼠标移动');
      break;

    // 相机开始移动（需提前开启：fdapi.settings.setEnableCameraMovingEvent(true)）
    case 'CameraStartMove':
      log('触发：相机开始飞行');
      break;

    // 相机正在移动
    case 'CameraMoving':
      log('触发：相机正在飞行');
      break;

    // 相机停止移动
    case 'CameraStopMove':
      log('触发：相机停止飞行');
      break;

    // 对象执行 focus() 或相机执行 set()/lookAt()/lookAtBBox() 时触发
    case 'CameraChanged':
      log('触发：相机位置变化');
      break;

    // 进入面剖切模式编辑后触发
    case 'PlaneClipEdit':
      log('触发：编辑面剖切');
      break;

    // 进入体剖切模式编辑后触发
    case 'VolumeClipEdit':
      log('触发：编辑体剖切');
      break;

    // 测量完成触发
    case 'Measurement':
      log('触发：测量完成');
      break;

    // 导览播放结束触发（camera.playAnimation 和 cameraTour.play 均触发）
    case 'CameraTourFinished':
      log('触发：导览播放结束');
      break;

    default:
      break;
  }
}

// 初始化时注入事件回调
const player = new DigitalTwinPlayer('127.0.0.1:8080', {
  domId: 'player',
  apiOptions: {
    onEvent: onEvent,
  },
});
const fdapi = player.getAPI();
```

---

#### 1.2、通过 API 接口动态设置事件监听

初始化完成后，也可以通过 `fdapi.setEventCallback` 动态注入，**注意：此方式会覆盖初始化时设置的 onEvent 回调**：

```js
fdapi.setEventCallback(function (event) {
  var eventType  = event.eventtype;
  var layerType  = event.Type;
  var layerId    = event.Id || event.ID;
  var objectId   = event.ObjectID;
  var clickPos   = event.MouseClickPoint;

  if (eventType === 'LeftMouseButtonClick') {
    console.log('点击了图层：', layerId, '位置：', clickPos);
  }
});
```

---

#### 1.3、自定义监听鼠标和键盘

在 `DigitalTwinPlayer` 的初始化参数 `events` 中传入 `mouseKeyListener`，目前支持 `onmousedown`、`onmouseup`、`onkeydown`：

```js
const mouseKeyListener = {
  onmousedown: (e) => { log(`[MouseDn] button: ${e.button}, pos: ${e.x}, ${e.y}`); },
  onmouseup:   (e) => { log(`[MouseUp] button: ${e.button}, pos: ${e.x}, ${e.y}`); },
  onkeydown:   (e) => { log(`KeyDown: ${e.code}`); },
};

const fdPlayer = new DigitalTwinPlayer('127.0.0.1:8080', {
  events: mouseKeyListener,
  // 其他参数...
});
```

运行效果输出示例：

```
[MouseDn] button: 2, pos: 892, 625
[MouseUp] button: 2, pos: 892, 625
KeyDown: KeyF
KeyDown: KeyA
KeyDown: ControlLeft
```
