---
title: 事件系统
sidebar_label: 事件系统
description: "三维交互事件系统，包括点击、悬停、相机移动等事件类型"
---

### 一、关于事件交互系统的说明

#### 1.1、内置交互事件名称及监听说明

初始化API时根据回调函数监听

初始化API时监听，示例代码如下：

```js
//场景交互事件回调函数，默认构造参数event即为事件对象 function onEvent(event) { //事件类型 参考交互事件类型枚举对象 var eventType = event.eventtype; //图层类型 var layerType = event.Type; //图层Id var layerId = event.Id || event.ID; //点击ActorId var objectId = event.ObjectID; //当前点击位置 var objectLocation = event.MouseClickPoint; switch (eventType) { //鼠标左键点击时触发此事件 case "LeftMouseButtonClick": log('触发事件类型：鼠标左键单击，eventType：' + eventType); break; //鼠标悬停时触发此事件 //注意需提前开启鼠标拾取：fdapi.settings.setMousePickMask(7); case "MouseHovered": log('触发事件类型：鼠标悬停，eventType：' + eventType); break; //鼠标移动时触发此事件 //注意需提前开启鼠标拾取：fdapi.settings.setMousePickMask(7); case "MouseMoved": log('触发事件类型：鼠标移动，eventType：' + eventType); break; //相机开始移动时触发此监听事件 //注意需先开启事件：fdapi.settings.setEnableCameraMovingEvent(true); case "CameraStartMove": log('触发事件类型：相机开始飞行，eventType：' + eventType); break; //相机正在移动时触发此监听事件 //注意需先开启事件：fdapi.settings.setEnableCameraMovingEvent(true); case "CameraMoving": log('触发事件类型：相机正在飞行，eventType：' + eventType); break; //相机停止移动时触发此监听事件 //注意需先开启事件：fdapi.settings.setEnableCameraMovingEvent(true); case "CameraStopMove": log('触发事件类型：相机停止飞行，eventType：' + eventType); break; //对象执行focus()或相机执行set()/lookAt()/lookAtBBox()方法时触发 case "CameraChanged": log('触发事件类型：相机位置发生变化，eventType：' + eventType); break; //进入面剖切模式，编辑面剖切位置后触发事件并返回剖切结果 case "PlaneClipEdit": log('触发事件类型：编辑面剖切，eventType：' + eventType); break; //进入体剖切模式，编辑体剖切位置后触发事件并返回剖切结果 case "VolumeClipEdit": log('触发事件类型：编辑体剖切，eventType：'+ eventType); break; //进入测量模式后，测量完成时触发此事件并返回测量结果 case "Measurement": log('触发事件类型：测量完成，eventType：' + eventType); break; //播放导览结束触发此事件 //fdapi.camera.playAnimation(id)和导览对象播放导览结束__g.cameraTour.play(id)均触发此事件 case "CameraTourFinished": log('触发事件类型：播放导览结束，eventType：' + eventType); break; default: "" } } //视频流初始化配置 let options = { //必选参数，网页显示视频流的dom节点id 'domId': 'player', //必选参数，二次开发时必须指定，否则无法进行二次开发 'apiOptions': { //事件监听回调函数 'onEvent': onEvent, }, ... }; //构造DigitalTwinAPI对象并初始化 let acapi = new DigitalTwinPlayer('127.0.0.1:8080', options).getAPI();
```

#### 1.2、通过API接口设置监听事件

初始化API完成后，调用API方法进行事件监听设置，代码示例如下：

```js
//通过API接口设置监听事件 注意：使用此方式监听事件会覆盖上一次设置的事件监听代码 fdapi.setEventCallback(function (event) { //事件类型 参考交互事件类型枚举对象 var eventType = event.eventtype; //图层类型 var layerType = event.Type; //图层Id var layerId = event.Id || event.ID; //点击ActorId var objectId = event.ObjectID; //当前点击位置 var objectLocation = event.MouseClickPoint; //TODO... });
```

#### 1.3、自定义监听鼠标、键盘

自定义键盘鼠标交互

自定义键盘鼠标交互，代码示例如下：

DigitalTwinPlayer的初始化参数params增加属性：events#mouseKeyListener，可以用来设置键盘、鼠标交互事件的回调函数，目前支持以下事件的回调：

```js
let mouseKeyListener = { 'onmousedown': e => { log(`[MouseDn] button: ${e.button}, pos: ${e.x}, ${e.y}`) }, 'onmouseup': e => { log(`[MouseUp] button: ${e.button}, pos: ${e.x}, ${e.y}`) }, 'onkeydown': e => { log(`KeyDown: ${e.code}`) } } fdPlayer = new DigitalTwinPlayer("127.0.0.1:8080", { 'events': mouseKeyListener //鼠标、键盘交互事件的回调 //其他属性 //... });
```

运行效果：

```
[MouseDn] button: 2, pos: 892, 625 [MouseUp] button: 2, pos: 892, 625 KeyDown: KeyF KeyDown: KeyA KeyDown: KeyD KeyDown: ControlLeft KeyDown: ShiftLeft
```

