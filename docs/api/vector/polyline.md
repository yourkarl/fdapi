---
title: Polyline
sidebar_label: Polyline
description: "绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。"
---

# Polyline

绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。



![](/img/refdoc/api/Polyline.Update.gif)

通过 `api.polyline` 访问。
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等多种样式与自定义材质，是表达线状要素（道路、管线、轨迹、边界）的基础对象。
- **别名 / 不同行业叫法**：折线、路径、线、管线、道路中心线、轨迹线、河道中心线、巡逻路线、边界线。
- **适用行业**：智慧城市、交通、智慧水利、能源、应急、园区、测绘、国防、海洋。
- **使用场景**：
  - 道路/轨道/河道等线状基础设施的路网与中心线展示。
  - 给排水、燃气、电力、热力等市政管线的走向与流向（光流样式）表达。
  - 车辆/船舶/人员的历史与实时运动轨迹绘制。
- **注意事项**：
  - 为贴地/空间折线，若需带粗细体量的三维管道/线缆模型应使用 SplineMesh；若按图层树模型 ID 自动连线表达拓扑请用 TopologyLine。
  - 注意 coordinateType 与场景坐标系一致，贴地球面弧线可通过 arcType 控制劣弧/优弧。
  - 海量点位或大量折线会影响性能，建议抽稀坐标点并合理设置可视范围 range。

## 构造函数

```js
new Polyline()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Polyline对象 | 向场景批量添加对象 |
| [`attachObject`](#attachObject) | 设置一个或多个Polyline对象的起点和终点跟随对应的模型移动 |  |
| [`clear`](#clear) | 删除场景中所有的Polyline | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Polyline对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取Polyline的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏Polyline | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有Polyline | 一键隐藏全部对象 |
| [`setBrightness`](#setBrightness) | 设置新的亮度 |  |
| [`setColor`](#setColor) | 设置新的颜色值 |  |
| [`setCoordinates`](#setCoordinates) | 设置坐标值 |  |
| [`setDepthTest`](#setDepthTest) | 设置是否做深度检测 |  |
| [`setFlowRate`](#setFlowRate) | 设置新的流速 |  |
| [`setShape`](#setShape) | 设置shape新的样式 |  |
| [`setStyle`](#setStyle) | 设置新的样式 |  |
| [`setThickness`](#setThickness) | 设置新的厚度 |  |
| [`setViewHeightRange`](#setViewHeightRange) | 设置Polyline对象的可视高度范围， |  |
| [`show`](#show) | 显示Polyline | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有Polyline | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个Polyline对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Polyline对象

如何获取自定义材质路径(material)见如下动图：



![](/img/refdoc/api/copy_material_path.gif)

如何获取自定义材质包含的参数请调用如下方法：

let res = await fdapi.misc.getMaterial(material);

let params = res.data[0].params;

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `color` | [`Color`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `coordinates` | `array` | 坐标点数组，[取值示例](/docs/tutorials/coordinates) |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `arcType` | `number` | 球面地形下绘制贴地弧线的类型，0：劣弧 1：优弧，默认值：0 |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `thickness` | `number` | 线宽，单位：米，默认值20 |
| `intensity` | `number` | 亮度，取值范围：[0~1000]，默认值：0.5 |
| `flowRate` | `number` | 流速，取值范围：[0~1.0]，默认值：0.5 |
| `depthTest` | `boolean` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |
| `shape` | `number` | 样式，0：直线， 1：曲线，注意：设置为曲线坐标点多的时候会影响添加添加效率 |
| `style` | [`PolylineStyle`](/docs/api/types#polylinestyle) | (`PolylineStyle`) 折线样式，箭头/光流/贴地/实线/虚线等，取值范围：[0~7]，详情参考 `PolylineStyle` |
| `tiling` | `number` | 可选参数，材质贴图平铺比例，和PolylineStyle取值有关，目前仅部分样式支持此参数，从起始位置开始平铺，超过的部分会按此比例生成新的区域，类似CSS的repeat。如果这个值 &lt;= 0 使用自动计算按Polyline长度比例平铺， &gt;0使用用户输入的值去平铺 |
| `material` | `string` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |
| `scalarParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
await fdapi.polyline.delete(['p1', 'p2']);
//使用PolylineStyle样式的折线
let p1 = {
    id: 'p1',//折线唯一标识id
    coordinates: [
        [493711.15625, 2488656.25, 7.0],
        [493698.09375, 2490060.25, 8.4],
        [494434.78125, 2490056, 5.4],
        [494663.90625, 2491221, 3.8]
    ],//构成折线的坐标点数组
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
    viewHeightRange: [0, 10000], //可见高度范围
    color: [1, 0, 0, 1],//折线颜色
    thickness: 20,//折线宽度
    intensity: 1,//亮度
    flowRate: 0.5,//流速
    shape: 0, //折线类型 0：直线， 1：曲线
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
    style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle
    tiling: 0//材质贴图平铺比例
};

//自定义材质的折线
let p2 = {
    id: 'p2',//折线唯一标识id
    coordinates: [
        [493061.53125, 2490053.5, 0.00015624999650754035],
        [492508.28125, 2490032.25, 8.7195310592651367],
        [492532, 2490584.75, 5.5993747711181641],
        [492131.28125, 2490606.25, 9.4026565551757813]

    ],//构成折线的坐标点数组
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
    viewHeightRange: [0, 10000], //可见高度范围
    color: [0, 1, 0, 0.5],//折线颜色绿色 半透明
    thickness: 120,//折线宽度
    intensity: 0.1,//亮度
    flowRate: 0.5,//流速
    shape: 0, //折线类型 0：直线， 1：曲线  注意：设置为曲线非常影响添加效率
    depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
    style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
    tiling: 0,//材质贴图平铺比例
    material: "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_4", //设置后style相关参数会失效 自定义材质路径 可以查询材质包含的参数 
    scalarParameters: [
        { "name": "亮度1", "value": 0.5 },
        { "name": "亮度2", "value": 0.5 },
        { "name": "v缩放", "value": 100 },
        { "name": "u缩放", "value": 1 },
        { "name": "速度", "value": 0.1 },

    ],  //材质数值类型参数
    vectorParameters: [{ "name": "颜色1", "value": [0, 1, 0] }], //材质数组类型参数
};

let pArr = [];
pArr.push(p1);
pArr.push(p2);
await fdapi.polyline.add(pArr);
fdapi.polyline.focus(p1.id, 50);
```

---

### `attachObject(data, fn)` {#attachObject}

设置一个或多个Polyline对象的起点和终点跟随对应的模型移动

注意：设置贴合后只有Polyline的起点和终点会跟随相应的模型一起平滑移动，支持的对象类型：Satellite

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | Polyline对象id和模型对象Id的数据映射对象数组，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `polylineId` | `string` | Polyline对象ID |
| `startObjectId` | `string` | Polyline起点跟随移动对应的模型ID |
| `endObjectId` | `string` | Polyline终点跟随移动对应的模型ID |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
示例代码：

fdapi.polyline.attachObject([
            {
                polylineId: "line1",
                startObjectId: "satellite1",
                endObjectId: "satellite2"
            },
            {
                polylineId: "line2",
                startObjectId: "satellite2",
                endObjectId: "satellite3"
            },
      ]);
```

> 示例：AttachObject

```js
//折线的起点和终点贴合模型移动
fdapi.polyline.attachObject([
    {
        polylineId: "line1",
        startObjectId: "satellite1",
        endObjectId: "satellite2"
    },
    {
        polylineId: "line2",
        startObjectId: "satellite2",
        endObjectId: "satellite3"
    },
]);
```

---

### `clear(fn)` {#clear}

删除场景中所有的Polyline

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.polyline.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Polyline对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Polyline对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.polyline.delete('p1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polyline对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.polyline.focus('p1', 880, 1);
```

---

### `get(ids, fn)` {#get}

根据ID获取Polyline的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Polyline对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
Polyline的详细信息
{
            "id":	"p1",
            "groupId":	"",
            "userData":	"",
            "coordinates":	[[493711.156250, 2488656.250000, 7.000000], [493698.093750, 2490060.250000, 8.400000], [494434.781250, 2490056.000000, 5.400000], [494663.906250, 2491221.000000, 3.800000]],
            "shape":	0,
            "style":	0,
            "thickness":	150.000000,
            "color":	[1.000000, 0.000000, 0.000000, 1.000000],
            "flowRate":	0.500000,
            "brightness":	0.800000,
            "tiling":	0.000000,
            "depthTest":	0
        }
```

> 示例：Get

```js
fdapi.polyline.get('p1');
```

---

### `hide(ids, fn)` {#hide}

隐藏Polyline

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polyline对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.polyline.hide('p1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有Polyline

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.polyline.hideAll();
```

---

### `setBrightness(id, newVal, fn)` {#setBrightness}

设置新的亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的亮度：SetBrightness

```js
fdapi.polyline.setBrightness("p1", 2);
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置新的颜色值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的颜色值：SetColor

```js
fdapi.polyline.setColor("p1", [0, 1, 0, 0.5]);
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置坐标值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `array` | 新坐标值，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置坐标值：SetCoordinates

```js
fdapi.polyline.setCoordinates("p1", [
    [493711.15625, 2488656.25, 7.0],
    [493698.09375, 2490060.25, 8.4],
    [494152.4375, 2489572, 6.9823436737060547],
    [494434.78125, 2490056, 5.4],
    [494663.90625, 2491221, 3.8]
]);
```

---

### `setDepthTest(id, newVal, fn)` {#setDepthTest}

设置是否做深度检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `boolean` | 是否做深度检测 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置是否做深度检测：SetDepthTest

```js
//true会被地形遮挡
fdapi.polyline.setDepthTest("p1", false);
```

---

### `setFlowRate(id, newVal, fn)` {#setFlowRate}

设置新的流速

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的流速：SetFlowRate

```js
fdapi.polyline.setFlowRate("p1", 2);
```

---

### `setShape(id, newVal, fn)` {#setShape}

设置shape新的样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值， 0： 直线， 1： 曲线 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的形状：SetShape

```js
fdapi.polyline.setShape("p1", 1);
```

---

### `setStyle(id, newVal, fn)` {#setStyle}

设置新的样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | PolylineStyle新样式，取值范围：[0~5]，参考 `PolylineStyle` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的样式：SetStyle

```js
//参考折线样式枚举PolylineStyle
fdapi.polyline.setStyle("p1", PolylineStyle.Arrow);
```

---

### `setThickness(id, newVal, fn)` {#setThickness}

设置新的厚度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置新的厚度：SetThickness

```js
fdapi.polyline.setThickness("p1", 60);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)` {#setViewHeightRange}

设置Polyline对象的可视高度范围，注意：当Polyline对象使用贴地模式时，此方法会失效

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polyline对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置可视高度范围：SetViewHeightRange

```js
fdapi.polyline.setViewHeightRange("p1", 0, 1000);
```

---

### `show(ids, fn)` {#show}

显示Polyline

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polyline对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.polyline.show('p1');
```

---

### `showAll(fn)` {#showAll}

显示所有Polyline

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.polyline.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个Polyline对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
fdapi.polyline.updateBegin();
fdapi.polyline.setStyle('p1', PolylineStyle.Arrow);//折线样式
fdapi.polyline.setColor('p1', Color.Yellow);
fdapi.polyline.setThickness('p1', 10);
fdapi.polyline.setBrightness('p1', 0.5);
fdapi.polyline.setFlowRate('p1', 0.8);
fdapi.polyline.setDepthTest('p1', true);//深度检测 会被地面高度遮挡
fdapi.polyline.updateEnd();
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

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polyline.updateEnd();
```
