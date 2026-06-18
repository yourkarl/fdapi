---
title: ExcavationAnalysis
sidebar_label: ExcavationAnalysis
description: "ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。"
---

# ExcavationAnalysis

超欠挖分析类对象，提供超挖欠挖分析相关操作

通过 `api.excavationAnalysis` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。
- **别名 / 不同行业叫法**：超欠挖分析 / 开挖分析 / 土方分析 / 基坑分析；隧道领域称“掌子面超欠挖”，矿山称“采剥超挖控制”。
- **适用行业**：隧道与地下工程、矿山、土木基建、智慧水利（渠道/基坑）、市政工程
- **使用场景**：
  - 隧道掘进中掌子面的超挖/欠挖检测与进尺质量评估
  - 基坑、边坡开挖的土方量核算与偏差着色
  - 矿山采剥进度与超挖控制可视化
- **注意事项**：
  - 依赖高精度设计面与实测面（点云/DEM）且需配准对齐
  - 设计面与实测面坐标系、高程基准须一致
  - 大范围高精度计算开销较大，注意范围与精度的平衡



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个ExcavationAnalysis对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的ExcavationAnalysis | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个ExcavationAnalysis对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取ExcavationAnalysis的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏ExcavationAnalysis对象 | 按业务条件隐藏对象 |
| [`show`](#show) | 显示ExcavationAnalysis对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个ExcavationAnalysis对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(excavationAnalysis, fn)` {#add}

添加一个ExcavationAnalysis对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `excavationAnalysis` | `object` | 对象数据结构，对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`excavationAnalysis` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `filePath` | `string` | ply文件路径，资源文件引入方式：*.ply，[资源引入说明](/docs/tutorials/resources) |
| `objectId` | `string` | 自定义对象模型的Id |
| `pointSize` | `number` | 点云尺寸，单位：米，默认值：0.01 |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

> 示例：Add

```js
let path = HostConfig.Path + "/assets/";

fdapi.tileLayer.delete('1');
await fdapi.tileLayer.add({
    id: '1',
    fileName: path + "3dt/tunnel.3dt",
    location: [0, 0, 0],//坐标位置
    rotation: [0, 0, 0],//旋转角度
    scale: [1, 1, 1]    //缩放大小
});
fdapi.tileLayer.focus('1', 18);
fdapi.tileLayer.hide('1');

//添加前清空所有customObject 防止id重复
await fdapi.customObject.clear();
//添加的3dt的图层id
let tileLayerId = '1';
//查询图层内部包含的构件objectIds
let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);
let objectIds = result.data[0].objectIds;
//执行合并复制
await fdapi.customObject.addByTileLayer({
    id: "tunnel",
    tileLayerId: tileLayerId,
    objectId: objectIds,
});

await fdapi.excavationAnalysis.delete('ea1');
let ea1 = {
    id: "ea1",
    filePath: path + "ply/tunnel.ply", //参与对比的点云模型
    pointSize: 0.01,//  点云尺寸
    objectId: "tunnel",//参与对比的自定义模型ID
}
fdapi.excavationAnalysis.add(ea1);
```

---

### `clear(fn)` {#clear}

删除场景中所有的ExcavationAnalysis

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.excavationAnalysis.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个ExcavationAnalysis对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的ExcavationAnalysis对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.excavationAnalysis.delete('ea1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ExcavationAnalysis对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.excavationAnalysis.focus('ea1');
```

---

### `get(ids, fn)` {#get}

根据ID获取ExcavationAnalysis的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的ExcavationAnalysis对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
ExcavationAnalysis的详细信息
[{
            "id":	"ea1",
            "groupId":	"",
            "userData":	"",
            "filePath":	"D:\\test.ply",
            "customObjectId":	"test1,
            "pointSize":	0.01
        }]
```

> 示例：Get

```js
fdapi.excavationAnalysis.get('ea1');
```

---

### `hide(ids, fn)` {#hide}

隐藏ExcavationAnalysis对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ExcavationAnalysis对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.excavationAnalysis.hide('ea1');
```

---

### `show(ids, fn)` {#show}

显示ExcavationAnalysis对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ExcavationAnalysis对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.excavationAnalysis.show('ea1');
```

---

### `update(excavationAnalysis, fn)` {#update}

修改一个ExcavationAnalysis对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `excavationAnalysis` | `object \| array` | 对象数据结构，结构参考add()方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let ea1_update = {
    id: "ea1",
    pointSize: 0.03,
}
fdapi.excavationAnalysis.update(ea1_update);
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

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
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.excavationAnalysis.updateEnd();
```
