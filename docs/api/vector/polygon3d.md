---
title: Polygon3D
sidebar_label: Polygon3D
description: "在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。"
---

# Polygon3D

在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。

![](/img/refdoc/api/3DPolugon.Update.gif)

**下面Example代码的运行效果图：**

1. 最简单的Polygon3D

```js
let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5.7], [624.34, -9209.29, 6.05], [482.58, -9373.57, 7.38]];
```

![](/img/refdoc/api/Polygon3D1.png)

2. 带2个洞的Polygon3D

```js
let coords2 = [
        [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],
        [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],
        [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]
    ];
```

![](/img/refdoc/api/Polygon3D2.png)

3. 2个Part的Polygon3D，每个Polygon3D有一个或多个洞

```js
 let coords3 = [
        //part1
        [
            [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],
            [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],
            [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]
        ],

        //part2
        [
            [[-4477.25, -4353.11, 5.7], [-1803.2, -6744.65, 5.7], [-562.18, -4590.14, 5.7], [-2271.85, -2595.33, 5.7]],
            [[-2867.3, -4342.53, 5.7], [-2381.34, -5043.33, 5.7], [-1723.21, -4566.1, 6.25], [-1938.83, -3757.59, 5.7]]
        ]
    ];
```

![](/img/refdoc/api/Polygon3D3.png)

通过 `api.polygon3d` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。
- **别名 / 不同行业叫法**：三维面、立体面、体块、拉伸多边形、白模、立体区域、淹没体。
- **适用行业**：智慧城市、智慧水利、应急、园区、测绘、国防。
- **使用场景**：
  - 城市规划中的建筑白模、体块快速生成与分区高度可视化。
  - 水利防汛中按水位拉伸的立体淹没水体与蓄滞洪区体量表达。
  - 园区/国防中的围墙、电子围栏、立体警戒区域的体块展示。
- **注意事项**：
  - 相比 Polygon 多了高度/拉伸维度，仅需贴地平面区域时使用 Polygon 更轻量。
  - 坐标按"外环+内环(洞)"及多 Part 的层级数组组织，注意嵌套结构与拉伸高度参数。
  - 大量体块或高顶点数会增加渲染开销，建议控制数量并简化边界。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Polygon3D对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的3DPolygon | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个3DPolygon对象 | 按 ID 移除指定对象 |
| [`disableClip`](#disableClip) | 禁止Polygon3D参与剖切 |  |
| [`enableClip`](#enableClip) | 设置Polygon3D参与剖切 |  |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取3DPolygon的详细信息 | 查询对象信息，用于业务联动 |
| [`glow`](#glow) | 闪烁 |  |
| [`hide`](#hide) | 隐藏3DPolygon | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有3DPolygon | 一键隐藏全部对象 |
| [`highlight`](#highlight) | 高亮，目前仅部分样式支持高亮，和材质有关 |  |
| [`setColor`](#setColor) | 设置颜色 |  |
| [`setCoordinates`](#setCoordinates) | 设置坐标 |  |
| [`setDepthTest`](#setDepthTest) | 设置是否做深度检测 |  |
| [`setHeight`](#setHeight) | 设置高度 |  |
| [`setIntensity`](#setIntensity) | 设置亮度 |  |
| [`setStyle`](#setStyle) | 设置样式 |  |
| [`setTillingX`](#setTillingX) | 设置TillingX |  |
| [`setTillingY`](#setTillingY) | 设置TillingY |  |
| [`setViewHeightRange`](#setViewHeightRange) | 设置Polygon3D对象的可视高度范围 |  |
| [`show`](#show) | 显示3DPolygon | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有3DPolygon | 一键显示全部对象 |
| [`stopGlow`](#stopGlow) | 停止闪烁 |  |
| [`unHighlight`](#unHighlight) | 停止高亮 |  |
| [`update`](#update) | 修改一个或多个3DPolygon对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Polygon3D对象

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
| `coordinates` | `array` | 多边形坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `color` | [`Color`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `height` | `number` | 3D多边形的高度，取值范围：[任意正数] |
| `intensity` | `number` | 亮度，取值范围：[0~1000] |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `style` | `number` | 3DPolygon的样式，参考 `Polygon3DStyle` |
| `tillingX` | `number` | 可选参数，仅当3DPolygon的样式支持贴图显示时，设置贴图横向平铺，取值范围：[任意数值] |
| `tillingY` | `number` | 可选参数，仅当3DPolygon的样式支持贴图显示时，设置贴图纵向平铺，取值范围：[任意数值] |
| `material` | `string` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |
| `scalarParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |
| `generateTop` | `boolean` | 可选参数，是否生成顶面，默认：true |
| `generateSide` | `boolean` | 可选参数，是否生成侧面，默认：true |
| `generateBottom` | `boolean` | 可选参数，是否生成底面，默认：true |
| `bClip` | `boolean` | 可选参数，是否参与剖切，默认：false |
| `depthTest` | `boolean` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡，注意：非半透明材质不支持深度检测 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
polygon3d对象示例

 let polygon3d = {
        id: 'polygon3d',
        coordinates: coordinates,
        coordinateType: 0,
        color: [1, 1, 1, 1],
        height: 50,   
        intensity: 1.0,  
        style: Polygon3DStyle.WaveTransparent, 
        tillingX: 0, 
        tillingY: 0, 
        material: "/JC_CustomAssets/Material/M_material",
        scalarParameters: [{ "name": "U重复", "value":  0.1 }], 
        vectorParameters: [{ "name": "color", "value": [1,0,0] }],
        generateTop: true,
        generateSide: true,
        generateBottom: true,
        bClip: true,
        depthTest: true
    }
```

> 示例：Add

```js
fdapi.polygon3d.clear();
////使用Polygon3DStyle样式的polygon3d
let o1 = {
    id: 'p3d1',
    coordinates: [
        [489152.96875, 2492427, 0],
        [489155.34375, 2492386.75, 0],
        [489119.875, 2492387.75, 0],
        [489115.375, 2492417.25, 0],
    ],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    color: [1, 0, 1, 1],        //颜色值
    height: 10,                //3D多边形的高度
    intensity: 1.0,             //亮度
    viewHeightRange: [0, 1000], //可见高度范围
    style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举
    tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
    tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_16", //自定义材质路径
    scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数
    vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数
    generateTop: true, //是否生成顶面
    generateSide: true,//是否生成侧面
    generateBottom: true,//是否生成底面
    bClip: false, //是否支持剖切
    depthTest: true //深度检测
};

//自定义材质的polygon3d
let o2 = {
    id: 'p3d2',
    coordinates: [
        [489267.53125, 2492406, 0],
        [489264.9375, 2492356.5, 0],
        [489235.84375, 2492355.75, 0],
        [489227.96875, 2492397.75, 0],
    ],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    color: [1, 0, 0, 1],        //颜色值
    height: 20,                //3D多边形的高度
    intensity: 1.0,             //亮度
    viewHeightRange: [0, 1000], //可见高度范围
    style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举
    tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
    tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_8", //自定义材质路径 使用自定义材质后style相关参数会失效
    scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数
    vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数
    generateTop: true, //是否生成顶面
    generateSide: true,//是否生成侧面
    generateBottom: true,//是否生成底面
    bClip: false, //是否支持剖切
    depthTest: true //深度检测
};
let p3dArr = [];
p3dArr.push(o1);
p3dArr.push(o2);
await fdapi.polygon3d.add(p3dArr);
fdapi.polygon3d.focus('p3d1', 50);
```

---

### `clear(fn)` {#clear}

删除场景中所有的3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.polygon3d.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个3DPolygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的3DPolygon对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.polygon3d.delete(['p3d1', 'p3d2']);
```

---

### `disableClip(ids, fn)` {#disableClip}

禁止Polygon3D参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | Polygon3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：DisableClip

```js
fdapi.polygon3d.disableClip(['p3d1', 'p3d2']);
```

---

### `enableClip(ids, fn)` {#enableClip}

设置Polygon3D参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | Polygon3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：EnableClip

```js
fdapi.polygon3d.enableClip(['p3d1', 'p3d2']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.polygon3d.focus('p3d1', 10);
```

---

### `get(ids, fn)` {#get}

根据ID获取3DPolygon的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的3DPolygon对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
3DPolygon的详细信息
{
            "id":	"1",
            "groupId":	"",
            "style":	10,
            "color":	[1.000000, 0.000000, 1.000000, 1.000000],
            "height":	500.000000,
            "intensity":	4.000000
        }
```

> 示例：Get

```js
fdapi.polygon3d.get(['p3d1', 'p3d2']);
```

---

### `glow(data)` {#glow}

闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `color` | [`Color`](/docs/api/types#color) | 闪烁的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `duration` | `number` | 闪烁持续时间，单位：秒，取值范围：[0.01~任意正数] |
| `interval` | `number` | 闪烁间隔时间，单位：秒，取值范围：[0.01~任意正数]，注意：间隔时间要小于持续闪烁时间 |

**返回：** 无返回值。

> 示例：Glow

```js
fdapi.polygon3d.glow([{
    id: 'p3d1',
    color: [1, 1, 1, 1],
    duration: 5, //持续闪烁5秒
    interval: 1  //每隔1秒闪烁一次
}]);
```

---

### `hide(ids, fn)` {#hide}

隐藏3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.polygon3d.hide(['p3d1', 'p3d2']);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.polygon3d.hideAll();
```

---

### `highlight(ids, fn)` {#highlight}

高亮，目前仅部分样式支持高亮，和材质有关

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Highlight

```js
//仅部分样式支持高亮闪烁，和材质有关
fdapi.polygon3d.highlight('p3d1');
```

---

### `setColor(id, newColor, fn)` {#setColor}

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newColor` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setColor(id, newColor);
```

---

### `setCoordinates(id, newVal, fn)` {#setCoordinates}

设置坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `array` | 新坐标值，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setCoordinates(id, newVal);
```

---

### `setDepthTest(id, newVal, fn)` {#setDepthTest}

设置是否做深度检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | Polygon3D的ID |
| `newVal` | `boolean` | 是否做深度检测 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setDepthTest(id, newVal);
```

---

### `setHeight(id, newVal, fn)` {#setHeight}

设置高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setHeight(id, newVal);
```

---

### `setIntensity(id, newVal, fn)` {#setIntensity}

设置亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setIntensity(id, newVal);
```

---

### `setStyle(id, newVal, fn)` {#setStyle}

设置样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新3DPolygon的样式，参考 `Polygon3DStyle` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setStyle(id, newVal);
```

---

### `setTillingX(id, newVal, fn)` {#setTillingX}

设置TillingX

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setTillingX(id, newVal);
```

---

### `setTillingY(id, newVal, fn)` {#setTillingY}

设置TillingY

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.setTillingY(id, newVal);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)` {#setViewHeightRange}

设置Polygon3D对象的可视高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetViewHeightRange

```js
fdapi.polygon3d.setViewHeightRange('p3d1', 1, 1000);
```

---

### `show(ids, fn)` {#show}

显示3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.polygon3d.show(['p3d1', 'p3d2']);
```

---

### `showAll(fn)` {#showAll}

显示所有3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.polygon3d.showAll();
```

---

### `stopGlow(ids, fn)` {#stopGlow}

停止闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：StopGlow

```js
fdapi.polygon3d.stopGlow('p3d1');
```

---

### `unHighlight(ids, fn)` {#unHighlight}

停止高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.polygon3d.unHighlight(ids);
```

---

### `update(data, fn)` {#update}

修改一个或多个3DPolygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let o = {
    id: 'p3d1',
    coordinates: [
        [489152.96875, 2492427, 0],
        [489155.34375, 2492386.75, 0],
        [489119.875, 2492387.75, 0],
        [489113.8125, 2492454, 0],
    ],
    color: '#33561A',    //颜色值
    height: 20,            //3D多边形的高度
    intensity: 10.0,         //亮度
    style: 1
};
await fdapi.polygon3d.update(o);
fdapi.polygon3d.focus(o.id);
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
await fdapi.polygon3d.updateEnd();
```


## 更多示例

> UnHighlight

```js
fdapi.polygon3d.unHighlight('p3d1');
```
