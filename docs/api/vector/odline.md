---
title: ODLine
sidebar_label: ODLine
description: "以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。"
---

# ODLine

以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。



![](/img/refdoc/api/odline.gif)



迁徙线样式参数示例



![](/img/refdoc/api/ODLine.png)

通过 `api.odline` 访问。
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：以起点(O)到终点(D)的弧线表达两点之间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。
- **别名 / 不同行业叫法**：OD线、迁徙线、流向线、流量线、起讫线、关系线。
- **适用行业**：智慧城市、交通、应急、园区、能源、海洋。
- **使用场景**：
  - 人口迁徙、客流/车流的起讫分析与城市间迁徙可视化。
  - 物流、资金、能源调度等起点到终点的流量与流向展示。
  - 通信/网络访问关系、设备间数据流向的关联表达。
- **注意事项**：
  - 每条 ODLine 的 coordinates 仅含起点与终点 2 个坐标，多段路径请用 Polyline。
  - 大批量 OD 线（如全国迁徙）数据量大，建议按权重过滤或聚合后绘制以保证性能。
  - 通过 bendDegree 弯曲度区分往返方向，避免双向线重叠混淆。

## 构造函数

```js
new ODLine()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个ODLine对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的ODLine | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个ODLine对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取ODLine的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏ODLine | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有ODLine | 一键隐藏全部对象 |
| [`setBendDegree`](#setBendDegree) | 设置新的弯曲度 |  |
| [`setBrightness`](#setBrightness) | 设置新的亮度 |  |
| [`setColor`](#setColor) | 设置新的颜色值 |  |
| [`setCoordinates`](#setCoordinates) | 设置坐标值 |  |
| [`setEndLabelShape`](#setEndLabelShape) | 设置EndLabel样式 |  |
| [`setEndPointShape`](#setEndPointShape) | 设置EndPoint样式 |  |
| [`setflowPointSizeScale`](#setflowPointSizeScale) | 设置运动点的缩放 |  |
| [`setFlowRate`](#setFlowRate) | 设置新的流速 |  |
| [`setFlowShape`](#setFlowShape) | 设置ODLine发光点样式 |  |
| [`setLabelSizeScale`](#setLabelSizeScale) | 设置两端点的缩放值 |  |
| [`setLineShape`](#setLineShape) | 设置ODLine模型样式 |  |
| [`setLineStyle`](#setLineStyle) | 设置ODLine材质样式 |  |
| [`setLineThickness`](#setLineThickness) | 设置线的厚度 |  |
| [`setStartLabelShape`](#setStartLabelShape) | 设置StartLabel样式 |  |
| [`setStartPointShape`](#setStartPointShape) | 设置StartPoint样式 |  |
| [`setTiling`](#setTiling) | 设置材质贴图平铺 |  |
| [`show`](#show) | 显示ODLine | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有ODLine | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个ODLine对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个ODLine对象

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
| `coordinates` | `array` | 坐标点数组，只有2个元素，第1个元素是起点坐标，第2个元素是终点坐标 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `flowRate` | `number` | 流速，取值范围：[0~1.0]，默认值：0.5 |
| `intensity` | `number` | 亮度，取值范围：[0.1~1000]，默认值：0.5 |
| `bendDegree` | `number` | 弯曲度，取值范围：[0~1.0]，默认值：0.5 |
| `tiling` | `number` | 材质贴图平铺比例，从起始位置开始平铺，超过的部分会按此比例生成新的区域，类似CSS的repeat。如果这个值 &lt;= 0 使用自动计算按Polyline长度比例平铺， &gt;0使用用户输入的值去平铺 |
| `lineThickness` | `number` | 线宽，单位：米，默认值20 |
| `flowPointSizeScale` | `number` | 运动点的缩放值，默认值20， 单位米 |
| `labelSizeScale` | `number` | 两端点的缩放值，默认值100， 单位米 |
| `lineShape` | `number` | ODLine模型样式 0:平面 1:柱体，默认值1 |
| `lineStyle` | `number` | ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1） |
| `flowShape` | `number` | ODLine发光点样式 0:无 1:球体，默认值0（Shape为0即删除/隐藏，当Shape为0时设置Style无效） |
| `startPointShape` | `number` | StartPoint样式， default 0 ( 0 : None 1 : Sphere ) |
| `endPointShape` | `number` | EndPoint样式， default 0 ( 0 : None 1 : Sphere ) |
| `startLabelShape` | `number` | StartLabel样式， default 0 ( 0 : None 1 : Circle ) |
| `endLabelShape` | `number` | EndLabel样式， default 0 ( 0 : None 1 : Circle ) |

> 示例：Add

```js
//开启黑暗模式 调整时间
fdapi.weather.setDarkMode(true);
fdapi.weather.setDateTime(2025, 5, 13, 7, 18, false);

//降低场景亮度
let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体
//以下四个属性仅在默认样式0下生效
let saturation = 0.1;//饱和度
let brightness = 0.1;//亮度
let contrast = 1;//对比度
let contrastBase = 0.18;//对比度基准
fdapi.tileLayer.setStyle("E637D8FE42335EE96C58A1840BCAD0CE", style, Color.White, saturation, brightness, contrast, contrastBase);

fdapi.odline.clear();
let od1 = {
    id: 'od1',//ODLine唯一标识
    color: [0, 1, 0, 1],//填充颜色  
    coordinates: [[492303.65625, 2487534.5, 4.195], [490960.8075, 2490754.4, 5.26578125]],//构成ODLine的坐标点数组
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    flowRate: 0.5,//流速
    intensity: 10,//亮度
    bendDegree: 0.5,//弯曲度
    tiling: 100000,//材质贴图平铺比例
    lineThickness: 60,//折线宽度
    flowPointSizeScale: 80,//运动点的缩放值
    labelSizeScale: 1000,//两端点的缩放值

    lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
    lineStyle: 2,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）
    flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0

    startPointShape: 2,//点的样式
    endPointShape: 1,//点的样式
    startLabelShape: 1,//点的样式
    endLabelShape: 1//点的样式
};

let od2 = {
    id: 'od2',//ODLine唯一标识
    color: [1, 1, 0, 1],//填充颜色 
    coordinates: [
        [494192.193125, 2491025.2800000003, 0.304375],
        [491403.55, 2491384.96, 9.85701171875]
    ],//构成ODLine的坐标点数组
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    flowRate: 1,//流速
    intensity: 6,//亮度
    bendDegree: 0.5,//弯曲度
    tiling: 10,//材质贴图平铺比例
    lineThickness: 60,//折线宽度
    flowPointSizeScale: 80,//运动点的缩放值
    labelSizeScale: 1000,//两端点的缩放值

    lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
    lineStyle: 3,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）
    flowShape: 0,  //ODLine发光点样式 0:无 1:球体，默认值0

    startPointShape: 2,//点的样式
    endPointShape: 1,//点的样式
    startLabelShape: 1,//点的样式
    endLabelShape: 1//点的样式
};
await fdapi.odline.add([od1, od2]);
fdapi.odline.focus(od1.id);
```

---

### `clear(fn)` {#clear}

删除场景中所有的ODLine

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.odline.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个ODLine对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的ODLine对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.odline.delete('od1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ODLine对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.odline.focus('od1', 600, 1);
```

---

### `get(ids, fn)` {#get}

根据ID获取ODLine的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的ODLine对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
ODLine的详细信息
{
            "id":	"od1",
            "groupId":	"",
            "userData":	"",
            "coordinates":	[[492303.656250, 2487534.500000, 4.195000], [491391.562500, 2487777.500000, 4.200000]],
            "color":	[0.000000, 0.500000, 0.000000, 1.000000],
            "flowRate":	1.000000,
            "Brightness":	1.000000,
            "bendDegree":	0.500000,
            "tiling":	0.500000,
            "lineThickness":	15.000000,
            "flowSizeScale":	30.000000,
            "labelSizeScale":	1000.000000,
            "lineShape":	1,
            "lineStyle":	0,
            "flowShape":	1,
            "flowStyle":	0,
            "startPointShape":	1,
            "startPointStyle":	0,
            "endPointShape":	1,
            "endPointStyle":	0,
            "startLabelShape":	1,
            "startLabelStyle":	0,
            "endLabelShape":	1,
            "endLabelStyle":	0
        }
```

> 示例：Get

```js
fdapi.odline.get('od1');
```

---

### `hide(ids, fn)` {#hide}

隐藏ODLine

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ODLine对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.odline.hide('od1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有ODLine

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.odline.hideAll();
```

---

### `setBendDegree(id, newVal, fn)` {#setBendDegree}

设置新的弯曲度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setBendDegree(id, newVal);
```

---

### `setBrightness(id, newVal, fn)` {#setBrightness}

设置新的亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setBrightness(id, newVal);
```

---

### `setColor(id, newVal, fn)` {#setColor}

设置新的颜色值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setColor(id, newVal);
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置坐标值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setCoordinates(id, newVal);
```

---

### `setEndLabelShape(id, newVal, fn)` {#setEndLabelShape}

设置EndLabel样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setEndLabelShape(id, newVal);
```

---

### `setEndPointShape(id, newVal, fn)` {#setEndPointShape}

设置EndPoint样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setEndPointShape(id, newVal);
```

---

### `setflowPointSizeScale(id, newVal, fn)` {#setflowPointSizeScale}

设置运动点的缩放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setflowPointSizeScale(id, newVal);
```

---

### `setFlowRate(id, newVal, fn)` {#setFlowRate}

设置新的流速

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setFlowRate(id, newVal);
```

---

### `setFlowShape(id, newVal, fn)` {#setFlowShape}

设置ODLine发光点样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setFlowShape(id, newVal);
```

---

### `setLabelSizeScale(id, newVal, fn)` {#setLabelSizeScale}

设置两端点的缩放值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setLabelSizeScale(id, newVal);
```

---

### `setLineShape(id, newVal, fn)` {#setLineShape}

设置ODLine模型样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setLineShape(id, newVal);
```

---

### `setLineStyle(id, newVal, fn)` {#setLineStyle}

设置ODLine材质样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setLineStyle(id, newVal);
```

---

### `setLineThickness(id, newVal, fn)` {#setLineThickness}

设置线的厚度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setLineThickness(id, newVal);
```

---

### `setStartLabelShape(id, newVal, fn)` {#setStartLabelShape}

设置StartLabel样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setStartLabelShape(id, newVal);
```

---

### `setStartPointShape(id, newVal, fn)` {#setStartPointShape}

设置StartPoint样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setStartPointShape(id, newVal);
```

---

### `setTiling(id, newVal, fn)` {#setTiling}

设置材质贴图平铺

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.odline.setTiling(id, newVal);
```

---

### `show(ids, fn)` {#show}

显示ODLine

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ODLine对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.odline.show('od1');
```

---

### `showAll(fn)` {#showAll}

显示所有ODLine

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.odline.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个ODLine对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: 'od1',
    color: [1, 1, 1, 1],
};
await fdapi.odline.update(o);
fdapi.odline.focus(o.id);
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
await fdapi.odline.updateEnd();
```
