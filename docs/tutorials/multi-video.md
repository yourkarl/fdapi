---
title: 多视频同屏渲染
sidebar_label: 多视频
description: "在单个页面中同时渲染多个视频流的实现方式"
---

### 在一个页面中嵌入多个云渲染窗口

要在同一个页面中嵌入多个云渲染视频流窗口，目前有以下两种方式：

#### 第1种方式：使用iframe框架

代码如下：（具体示例请参考：player_2_1.html）

```
<body> <table width="100%" height="600" border="0"> <tr> <td> <iframe id="player1" src="player.html?ms" width="100%" height="100%"></iframe> </td> <td> <iframe id="player2" src="player.html?ms" width="100%" height="100%"></iframe> </td> </tr> </table> </body>
```

这种方式代码简单，适合快速开发展示多个视频流的情况，但是这种方式调用DigitalTwinAPI接口的适合比较繁琐，因为用到了iframe所以设计到了跨域的问题，可以通过postMessage的方式实现，这里不详细讨论， 我们主要介绍第2种方案。

#### 第2种方式：（仅适用于20210315之后的版本）

HTML核心代码如下：

```html
<div id="player1"></div><button onclick="callPlayer1()">调用Player1的接口</button> <div id="player2"></div><button onclick="callPlayer2()">调用Player2的接口</button>
```

JS核心代码如下：

```js
//注意：显卡要支持Cloud启动多个实例 let instanceId1 = '2464721833873';//实例id1 请在cloud实例列表中右键复制实例id let instanceId2 = '2464721833874';//实例id2 请在cloud实例列表中右键复制实例id let host = '127.0.0.1:8080'; let option1 = { //必选参数，网页显示视频流的domId 'domId': 'player1', //实例id 'iid': instanceId1, //必选参数，二次开发时必须指定，否则无法进行二次开发 'apiOptions': { //必选参数，与云渲染主机通信成功后的回调函数 //注意：只有在onReady之后才可以调用DigitalTwinAPI接口 'onReady': _onReady1 } }; let option2 = { //必选参数，网页显示视频流的domId 'domId': 'player2', //实例id 'iid': instanceId2, //必选参数，二次开发时必须指定，否则无法进行二次开发 'apiOptions': { //必选参数，与云渲染主机通信成功后的回调函数 //注意：只有在onReady之后才可以调用DigitalTwinAPI接口 'onReady': _onReady2 } }; //根据不同实例id初始化两个api对象 var __api1 = new DigitalTwinPlayer(host, option1).getAPI(); var __api2 = new DigitalTwinPlayer(host, option2).getAPI(); //例子：隐藏各自的右侧ui function callPlayer1() { __api1.settings.setMainUIVisibility(false); } function callPlayer2() { __api2.settings.setMainUIVisibility(false); }
```

具体示例代码请参考：player_2_2.html

player_2_2

