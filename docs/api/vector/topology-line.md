---
title: TopologyLine
sidebar_label: TopologyLine
description: "TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。"
---

# TopologyLine

拓扑线对象，提供绘制连接图层树上模型的拓扑线的相关操作方法

![TopologyLine 示意图](/img/refdoc/api/topologyLine.gif)

通过 `api.topologyLine` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。
- **别名 / 不同行业叫法**：拓扑线 / 连接线 / 关系线 / 管网拓扑 / 连接关系 / 逻辑连线。
- **适用行业**：能源管网、通信网络、智慧园区（设备关系）、工业、智慧水务
- **使用场景**：
  - 设备/节点间连接关系的可视化
  - 管网、线缆拓扑的表达
  - 系统逻辑连接示意
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 依赖图层树上的目标对象存在
  - 连接数量多时注意可读性与性能
  - 目标对象删除/移动时需联动更新



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个TopologyLine对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的TopologyLine | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个TopologyLine对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取TopologyLine的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏TopologyLine对象 | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有TopologyLine对象 | 一键隐藏全部对象 |
| [`show`](#show) | 显示TopologyLine对象 | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有TopologyLine对象 | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个·TopologyLine对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 待添加的拓扑线数据，可以是Object类型或者Array类型，对于每一个TopologyLine对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `objectIds` | `array` | 是 | - | 待连接的拓扑线的模型节点ID，即图层树上模型的ID数组，取值示例：["E78C50304F64ED20151624970CFA4FED","8ECFECA747068210E87C618F8DF0B3E5"...], |
| `range` | `array` | 是 | - | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `thickness` | `number` | 否 | 20 | 线宽，单位：米，默认值20 |
| `intensity` | `number` | 否 | 0.5 | 亮度，取值范围：[0~1000]，默认值：0.5 |
| `flowRate` | `number` | 否 | 0.5 | 流速，取值范围：[0~1.0]，默认值：0.5 |
| `depthTest` | `boolean` | 是 | - | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |
| `shape` | `number` | 是 | - | 样式，0：直线， 1：曲线，注意：设置为曲线坐标点多的时候会非常影响添加添加效率 |
| `style` | [`PolylineStyle`](/docs/api/types#polylinestyle) | 是 | - | (`PolylineStyle`) 折线样式，箭头/光流/贴地/实线/虚线等，取值范围：[0~7]，详情参考 `PolylineStyle` |
| `tiling` | `number` | 否 | - | 可选参数，材质贴图平铺比例，和PolylineStyle取值有关，目前仅部分样式支持此参数，从起始位置开始平铺，超过的部分会按此比例生成新的区域，类似CSS的repeat。如果这个值 &lt;= 0 使用自动计算按Polyline长度比例平铺， &gt;0使用用户输入的值去平铺 |
| `material` | `string` | 否 | - | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |
| `scalarParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
await fdapi.topologyLine.delete(['p1']);
let p1 = {
    id: 'p1',
    objectIds: ["08E0B7A340EEA389C811C19FA0E12B0F", "D5752FAD42C62BD7705E51882CC427A2", "FF1AC0C34935106BB6A464A6431EA0CC"], //待连接的拓扑线的模型节点ID，即图层树上模型的ID数组
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
    color: Color.Red,//折线颜色
    thickness: 0.2,//折线宽度
    intensity: 1,//亮度
    flowRate: 1,//流速
    shape: 0, //折线类型 0：直线， 1：曲线
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
    tiling: 0//材质贴图平铺比例
};
await fdapi.topologyLine.add(p1);
fdapi.topologyLine.focus(p1.id);
```

---

### `clear(fn)` {#clear}

删除场景中所有的TopologyLine

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.topologyLine.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的TopologyLine对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.topologyLine.delete('p1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | TopologyLine对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.topologyLine.focus('p1', 880, 1);
```

---

### `get(ids, fn)` {#get}

根据ID获取TopologyLine的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的TopologyLine对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
TopologyLine的详细信息
[
        {
            "id": "p1",
            "objectIds": [
                "E78C50304F64ED20151624970CFA4FED",
                "8ECFECA747068210E87C618F8DF0B3E5",
                "1F95B7BD4A993AF2D9C4ECA3A214EA77"
            ],
            "range": [
                1,
                10000
            ],
            "color": [
                1,
                0,
                0,
                1
            ],
            "thickness": 100,
            "flowRate": 1.5,
            "shape": 1,
            "depthTest": false,
            "style": 0,
            "tiling": 3,
            "brightness": 0.8
        }
        ]
```

> 示例：Get

```js
fdapi.topologyLine.get('p1');
```

---

### `hide(ids, fn)` {#hide}

隐藏TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | TopologyLine对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.topologyLine.hide('p1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.topologyLine.hideAll();
```

---

### `show(ids, fn)` {#show}

显示TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | TopologyLine对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.topologyLine.show('p1');
```

---

### `showAll(fn)` {#showAll}

显示所有TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.topologyLine.showAll();
```

---

### `update(topologyLine, fn)` {#update}

修改一个或多个·TopologyLine对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `topologyLine` | `object \| array` | 是 | - | 对象数据结构，结构参考add()方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let p1 = {
    id: 'p1',
    shape: 0, //折线类型 0：直线， 1：曲线
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
    style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle
    tiling: 0//材质贴图平铺比例
};
await fdapi.topologyLine.update(p1);
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
await fdapi.topologyLine.updateEnd();
```
