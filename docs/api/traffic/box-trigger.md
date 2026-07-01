---
title: BoxTrigger
sidebar_label: BoxTrigger
description: "BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。"
---

# BoxTrigger

BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。

通过 `api.boxTrigger` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。
- **别名 / 不同行业叫法**：盒子触发器 / 电子围栏 / 触发区 / 检测框 / 空间感应区 / 越界检测区。
- **适用行业**：智慧交通、智慧城市、应急、国防军事、低空经济、园区。、智慧校园、智慧文旅与景区、港口航道、智慧工地、石油化工。
- **使用场景**：
  - 园区/重点设施周界安防：人员或车辆越界进入禁区时自动告警联动。
  - 智慧交通卡口/隧道/收费站区域检测：车辆进出特定路段或检测断面触发统计与事件上报。
  - 应急与军事禁飞/警戒区：目标进入危险区或警戒空域时触发预警与处置流程。
  - 低空空域智能管控：长方体立体热区做进 / 出检测，飞行器闯入禁飞 / 限飞区自动告警并记录黑飞轨迹与时间。
  - 智慧校园安防：电子围栏区域进出检测告警与人员车辆异常滞留可视化。
  - 智慧文旅 / 景区：重点区域客流预警与电子围栏进出检测。
  - 港口航道 / 海洋：船舶航行电子围栏、碰撞 / 拥堵 / 碍航物进出检测预警。
  - 工地危险区电子围栏、罐区 / 装置警戒区闯入与越界告警联动。
- **注意事项**：
  - 通过 `bbox`（[minX,minY,minZ,maxX,maxY,maxZ]）定义热区，需与 `coordinateType` 坐标系（Projection/WGS84/GCJ02/BD09）一致，避免热区错位。
  - 仅对 CustomObject 与 Camera 进出生效；触发的是离散的进入/退出事件而非连续判定，盒子数量过多会增加检测开销，应合理规划区域粒度。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个BoxTrigger对象，当CustomObject对象或相机Camera… | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的BoxTrigger对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个BoxTrigger对象， | 按 ID 移除指定对象 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个BoxTrigger对象，当CustomObject对象或相机Camera对象进入和退出盒子热区范围触发事件相关的操作

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | BoxTrigger对象的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 可选，坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `bbox` | `array` | 是 | - | 绘制触发热区的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
以下为当CustomObject对象或者Camera相机对象进入或退出创建的盒子热区范围内触发返回的事件对象结构


CustomObject对象进入热区范围触发OnCustomObjectEnterTrigger事件
{
   "triggerId": "TriggerID",  //盒子热区范围对象id
   "eventtype": "OnCustomObjectEnterTrigger", //事件类型
   "objectId": "CustomObjectID" //自定义对象id
}

CustomObject对象退出热区范围触发OnCustomObjectExitTrigger事件
{
   "triggerId": "TriggerID",
   "eventtype": "OnCustomObjectExitTrigger",
   "objectId": "CustomObjectID"
} 


Camera进入热区范围触发OnCameraEnterTrigger事件
{
   "triggerId": "TriggerID",
   "eventtype": "OnCameraEnterTrigger",
}

Camera退出热区范围触发OnCameraExitTrigger事件
{
   "triggerId": "TriggerID",
   "eventtype": "OnCameraExitTrigger",
}
```

> 示例：Add

```js
//十字路口包围盒范围
let boxTrigger1 = {
    id: "boxTrigger1",
    bbox: [
        493136.41250000003,
        2492002.72,
        0,
        493178.11375,
        2492054.72,
        3
    ]
}
fdapi.boxTrigger.clear();
//创建盒子范围热区
fdapi.boxTrigger.add(boxTrigger1);

//创建并移动co对象 触发事件
fdapi.customObject.clear();
//投影坐标
let co_location = [492069.5, 2491585.5, 2.11];
let o = {
    id: 'o1',//自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
    location: co_location,//位置坐标
    coordinateType: 0,// 坐标系类型 
    rotation: [0, 0, 0],// 世界坐标系旋转
    range: [0, 1000],//可见范围
    groupId: "coGroup",//分组id
    localRotation: [0, 0, 0],//模型自身旋转
    scale: [1, 1, 1],//模型缩放
    smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
    enableDecal: false, //可选，是否支持贴画贴合，默认值：true
    visible: true,//可选，设置自定义对象加载后是否显示，默认：true
    autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
    collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
};
await fdapi.customObject.add(o);
fdapi.customObject.focus(o.id);

//gps轨迹
let positionArr = [
    [492069.5, 2491585.5, 2.11],
    [493136.5625, 2492028, 2.1155762672424316],
    [493141.09375, 2492028, 2.1155762672424316],
    [493143.71875, 2492027.75, 2.1155762672424316],
    [493146.46875, 2492027.75, 2.1155664920806885],
    [493150.1875, 2492027.25, 2.1155664920806885],
    [493153.625, 2492027, 2.1155664920806885],
    [493157.09375, 2492026.75, 2.1155762672424316],
    [493160.84375, 2492027, 2.1155567169189453],
    [493164.84375, 2492027, 2.1155762672424316],
    [493169, 2492026.5, 2.1155860424041748],
    [493173.84375, 2492026.25, 2.215576171875],
    [493178.125, 2492026.5, 2.1155664920806885],
    [493181.71875, 2492026.25, 2.1155762672424316],
    [493186.03125, 2492026, 2.1155762672424316],
    [493190.09375, 2492026.25, 2.1155664920806885],
    [493193.84375, 2492026, 2.1155567169189453],
    [493197.46875, 2492025.75, 2.1155664920806885],
    [493201.34375, 2492025.75, 2.1155664920806885],
    [493205.40625, 2492025.75, 2.1155664920806885]
];
//构造移动路径点数组
let pathPointArr = [];
for (let i = 0; i < positionArr.length; i++) {
    //构造数组元素 每1秒移动一次
    let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };
    pathPointArr.push(elementPoint);
}
//设置相机自动跟随
//fdapi.customObject.focus('o1', -1);
//设置自定义相机跟随
fdapi.customObject.focus('o1', 5, 0, [-30, 4, 0], ActionMode.Follow);
//车辆按GPS轨迹移动
fdapi.customObject.startMove('o1', 0, pathPointArr);
```

---

### `clear(fn)` {#clear}

清空场景中所有的BoxTrigger对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.boxTrigger.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个BoxTrigger对象，注意：删除对象后热区和对应触发事件均会删除

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的BoxTrigger对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.boxTrigger.delete('boxTrigger1');
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

`