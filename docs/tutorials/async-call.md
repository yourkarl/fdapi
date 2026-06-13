---
title: 异步调用方式
sidebar_label: 异步调用
description: "Callback 和 async/await 两种异步调用方式详解"
---

### 二次开发：异步接口调用方式说明文档

​ DigitalTwinAPI的接口大部分都是异步的，所以在调用的时候需要进行特殊处理，否则可能因为调用错误而不能实现预期的效果。目前有三种异步接口的调用方式，DigitalTwinAPI同时支持这3种方式，需要注意的是：在一个函数体内，这3种方式不能混合使用，只能选择其中一种。

#### 方式一：使用callback回调函数进行调用

这是最先支持的一种方式，代码逻辑简单，容易理解，但是当一个函数体内调用的异步接口比较多的时候，代码可读性变差，维护比较麻烦，在下面的例子里可以看到使用了多个嵌套函数，括号太多，比较混乱。

```js
fdapi.tag.delete('tag1', function () { fdapi.camera.get(function (cam) { let o = new TagData('tag1'); o.coordinate = [cam.x, cam.y, 25.4]; o.imagePath = HostConfig.Path + '/samples//img/tutorials/tag.png'; o.imageSize = [28, 28]; o.text = '北京银行'; o.showLine = true; fdapi.tag.add(o, function () { fdapi.tag.focus(o.id, 500, 0.2, function () { log("Test Finished."); }); //focus }); //add }) //get }); //delete
```

#### 方式二：使用then链的方式调用

这种方式通过连续的then调用来解决函数嵌套问题，可读性比回调的方式要好一些。

```js
fdapi.tag.delete('tag1').then(() => fdapi.camera.get()) .then((cam) => { let o = new TagData('tag1'); o.coordinate = [cam.x, cam.y, 25.4]; o.imagePath = HostConfig.Path + '/samples//img/tutorials/tag.png'; o.imageSize = [28, 28]; o.text = '北京银行'; o.showLine = true; fdapi.tag.add(o); }) .then(() => fdapi.tag.focus('tag1', 500, 0.2)) .then(() => { log("Test Finished."); })
```

#### 方式3：使用async/await的异步方式调用

这种方式其实是第2种方式的语法糖，但是可读性大大提高。

```js
await fdapi.tag.delete('tag1') let cam = await fdapi.camera.get(); let o = new TagData('tag1'); o.coordinate = [cam.x, cam.y, 25.4]; o.imagePath = HostConfig.Path + '/samples//img/tutorials/tag.png'; o.imageSize = [28, 28]; o.text = '北京银行'; o.showLine = true; await fdapi.tag.add(o); await fdapi.tag.focus(o.id, 500, 0.2); log("Test Finished.");
```

在int.html运行上面三种方式的代码，可以看到页面的输出都是一样的：

```
Request: CustomTag_Delete（下午1:40:10） {"command":37,"ids":["tag1"],"timestamp":1616132410590,"callbackIndex":35,"__command":"CustomTag_Delete"} Response: CustomTag_Delete（耗时：33ms） 请求时间：下午1:40:10 响应时间：下午1:40:10 { "command": 37, "timestamp": 1616132410590, "callbackIndex": 35, "result": 0, "resultMessage": "OK", "message": { }, "ids": ["tag1"] } Request: Camera_GetCamera（下午1:40:10） {"command":6,"timestamp":1616132410624,"callbackIndex":36,"__command":"Camera_GetCamera"} Response: Camera_GetCamera（耗时：100ms） 请求时间：下午1:40:10 响应时间：下午1:40:10 { "command": 6, "timestamp": 1616132410624, "callbackIndex": 36, "result": 0, "resultMessage": "OK", "x": -57.773582, "y": -3309.501221, "z": 687.396240, "pitch": -44.999958, "yaw": -88.999962, "roll": 0.000002, "camera": [-57.773582, -3309.501221, 687.396240, -44.999958, -88.999962, 0.000002] } Request: Tag_Add（下午1:40:10） {"command":36,"data":[{"id":"tag1","coordinate":[-57.773582,-3309.501221,25.4],"imagePath":"D:\\Pojects\\DigitalTwinCloud\\SDK//img/tutorials/tag.png","imageSize":[28,28],"text":"北京银行","range":[1,100000],"showLine":true,"textColor":[0,0,0,1],"textBackgroundColor":[1,1,1,0.85],"textBorderColor":[0,0,0,0],"textRange":100000,"autoHidePopupWindow":true}],"timestamp":1616132410726,"callbackIndex":37,"__command":"Tag_Add"} Response: Tag_Add（耗时：99ms） 请求时间：下午1:40:10 响应时间：下午1:40:10 { "command": 36, "timestamp": 1616132410726, "callbackIndex": 37, "result": 0, "resultMessage": "OK", "message": { }, "ids": ["tag1"] } Request: CustomTag_Focus（下午1:40:10） {"command":40,"ids":["tag1"],"distance":500,"flyTime":0.2,"timestamp":1616132410828,"callbackIndex":38,"__command":"CustomTag_Focus"} Response: CustomTag_Focus（耗时：97ms） 请求时间：下午1:40:10 响应时间：下午1:40:10 { "command": 40, "timestamp": 1616132410828, "callbackIndex": 38, "result": 0, "resultMessage": "OK" } Test Finished. Response: Event { "eventtype": "CameraChanged", "Pitch": -44.999958038330078, "Yaw": -88.999961853027344, "Position": [ -69.326980590820313, -3971.396484375, 687.396240234375 ] } OnEvent: CameraChanged
```

从上面的输出可以看到异步接口是按顺序执行的，每调用一次接口，都是收到服务器返回数据后才会往下继续执行下一次异步接口。

我们把代码做如下的修改，去掉所有的异步调用方式：

```js
fdapi.tag.delete('tag1') let cam = fdapi.camera.get(); let o = new TagData('tag1'); o.coordinate = [cam.x, cam.y, 25.4]; o.imagePath = HostConfig.Path + '/samples//img/tutorials/tag.png'; o.imageSize = [28, 28]; o.text = '北京银行'; o.showLine = true; fdapi.tag.add(o); fdapi.tag.focus(o.id, 500, 0.2); log("Test Finished.");
```

然后再执行，然后观察页面的输出：

```
Request: CustomTag_Delete（下午1:45:17） {"command":37,"ids":["tag1"],"timestamp":1616132717350,"callbackIndex":39,"__command":"CustomTag_Delete"} Request: Camera_GetCamera（下午1:45:17） {"command":6,"timestamp":1616132717351,"callbackIndex":40,"__command":"Camera_GetCamera"} Request: Tag_Add（下午1:45:17） {"command":36,"data":[{"id":"tag1","coordinate":[null,null,25.4],"imagePath":"D:\\Pojects\\DigitalTwinCloud\\SDK//img/tutorials/tag.png","imageSize":[28,28],"text":"北京银行","range":[1,100000],"showLine":true,"textColor":[0,0,0,1],"textBackgroundColor":[1,1,1,0.85],"textBorderColor":[0,0,0,0],"textRange":100000,"autoHidePopupWindow":true}],"timestamp":1616132717351,"callbackIndex":41,"__command":"Tag_Add"} Request: CustomTag_Focus（下午1:45:17） {"command":40,"ids":["tag1"],"distance":500,"flyTime":0.2,"timestamp":1616132717352,"callbackIndex":42,"__command":"CustomTag_Focus"} Test Finished. Response: Camera_GetCamera（耗时：73ms） 请求时间：下午1:45:17 响应时间：下午1:45:17 { "command": 6, "timestamp": 1616132717351, "callbackIndex": 40, "result": 0, "resultMessage": "OK", "x": -69.326981, "y": -3971.396484, "z": 687.396240, "pitch": -44.999958, "yaw": -88.999962, "roll": 0.000002, "camera": [-69.326981, -3971.396484, 687.396240, -44.999958, -88.999962, 0.000002] } Response: CustomTag_Delete（耗时：175ms） 请求时间：下午1:45:17 响应时间：下午1:45:17 { "command": 37, "timestamp": 1616132717350, "callbackIndex": 39, "result": 0, "resultMessage": "OK", "message": { }, "ids": ["tag1"] } Response: Tag_Add（耗时：275ms） 请求时间：下午1:45:17 响应时间：下午1:45:17 { "command": 36, "timestamp": 1616132717351, "callbackIndex": 41, "result": 0, "resultMessage": "OK", "message": { }, "ids": ["tag1"] } Response: Event { "eventtype": "CameraChanged", "Pitch": -44.999958038330078, "Yaw": -88.999961853027344, "Position": [ -11.553402900695801, -661.8956298828125, 687.396240234375 ] } OnEvent: CameraChanged Response: CustomTag_Focus（耗时：377ms） 请求时间：下午1:45:17 响应时间：下午1:45:17 { "command": 40, "timestamp": 1616132717352, "callbackIndex": 42, "result": 0, "resultMessage": "OK" }
```

从上面的输出可以看到，异步接口的Request、Response不再有序，而是混乱的， 另外从三维场景的变化也可以看到，并没有达到预期的效果。

