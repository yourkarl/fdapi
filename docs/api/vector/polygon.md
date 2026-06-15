---
title: Polygon
sidebar_label: Polygon
description: "Polygon 相关的操作， 一般通过api.polygon调用其方法 下面Example代码的运行效果图： 1. 最简单的Polygon let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5.7], [624.34, -9209."
---

# Polygon

Polygon 相关的操作， 一般通过api.polygon调用其方法



![](/img/refdoc/api/Polugon.Update.gif)

**下面Example代码的运行效果图：**

1. 最简单的Polygon

```js
let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5.7], [624.34, -9209.29, 6.05], [482.58, -9373.57, 7.38]];
```

![](/img/refdoc/api/Polygon1.png)

2. 带2个洞的Polygon

```js
let coords2 = [
        [[9665.22, -11366.88, 5.7], [9765.4, -4511.22, 5.7], [4155.2, -4036.94, 5.7], [3098, -11010.32, 5.7], [6445.79, -12717.28, 6.78]],
        [[8706.9, -9457.89, 5.7], [8824.84, -8055.4, 6.64], [7619.37, -8859.47, 6.72]],
        [[5744.8, -7795.59, 5.7], [6205.21, -5724.74, 5.7], [4460.01, -5839.38, 6.05], [3966.28, -7712.46, 7.17]]
    ];
```

![](/img/refdoc/api/Polygon2.png)

3. 2个Part的Polygon，每个Polygon有一个或多个洞

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

![](/img/refdoc/api/Polygon3.png)

通过 `api.polygon` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个Polygon对象

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
| `coordinates` | `array` | 多边形坐标数组，[取值示例](/docs/tutorials/coordinates) |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `arcType` | `number` | 球面地形下绘制多边形贴地弧线的类型，0：劣弧 1：优弧，默认值：0 |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `priority` | `number` | 设置Polygon显示的优先级，值越大越靠上，取值范围：[-1000,1000] |
| `frameColor` | [`Color`](/docs/api/types#color) | 边框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `frameThickness` | `number` | 边框厚度，单位：米。（当frameThickness设置为0的时候，不创建轮廓） |
| `depthTest` | `boolean` | 是否做深度检测，默认为true，true会被遮挡，false不会被遮挡 |
| `intensity` | `number` | 亮度，取值范围：[0~1000]，注：目前仅单色模式下生效[style:PolygonStyle.SingleColor] |
| `style` | [`PolygonStyle`](/docs/api/types#polygonstyle) | (`PolygonStyle`) 多边形样式，单色/圆点/体积/渐变/波纹/贴地等，取值范围：[0~10]，详情参考 `PolygonStyle`，注意：如果设置贴地模式，有环的polygon对象内环方向需要与外环方向相反，否则贴地时内环会不显示 |
| `gradualWidth` | `number` | 多边形填充的透明度渐变的间隔宽度，单位：米，默认值：10，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |
| `outerAlpha` | `number` | 多边形填充的透明度渐变的起始值，取值范围：[0~1]，默认值：0.3，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |
| `innerAlpha` | `number` | 多边形填充的透明度渐变的结束值，取值范围：[0~1]，默认值：1，注意：此参数仅当style样式设置为AlphaGradualBorder时生效 |
| `material` | `string` | 可选参数，自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |
| `scalarParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |

> 示例：Add

```js
fdapi.polygon.clear();
//使用PolygonStyle样式的面
let p1 = {
    id: 'polygon1',
    coordinates: [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
    viewHeightRange: [0, 10000], //可见高度范围
    color: [0, 0, 1, 0.8],//多边形的填充颜色
    frameColor: Color.Red,//边框颜色
    frameThickness: 5,//边框厚度
    intensity: 1, //亮度
    style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
    depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
    priority: 1 //叠加显示的优先级 值越大显示越靠上
};


//自定义材质的面
let p2 = {
    id: 'polygon2',
    coordinates: [
        [487716.1875, 2490398.75, -0.14265625178813934],
        [487608.46875, 2490988, -0.65734374523162842],
        [486995.9375, 2490574.5, -1.7621874809265137]
    ],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
    viewHeightRange: [0, 10000], //可见高度范围
    color: [0, 0, 1, 1],//多边形的填充颜色
    frameColor: Color.Red,//边框颜色
    frameThickness: 5,//边框厚度
    intensity: 0.5, //亮度
    style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
    depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
    priority: 2, //叠加显示的优先级 值越大显示越靠上
    material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效
    scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数
    vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数
};

let pArr = [];
pArr.push(p1);
pArr.push(p2);
await fdapi.polygon.add(pArr);
fdapi.polygon.focus('polygon2', 10);
```

---

### `clear(fn)`

删除场景中所有的Polygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.polygon.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Polygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Polygon对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
let ids = ['polygon1', 'polygon2'];
fdapi.polygon.delete(ids);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.polygon.focus('polygon1', 100, 1);
```

---

### `get(ids, fn)`

根据ID获取Polygon的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Polygon对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
Polygon的详细信息
{
            "id":	"polygon1",
            "groupId":	"",
            "userData":	"",
            "depthTest":	0,
            "color":	[0.000000, 0.000000, 1.000000, 1.000000],
            "style":	0,
            "brightness":	1.000000
        }
```

> 示例：Get

```js
fdapi.polygon.get(['polygon1', 'polygon2']);
```

---

### `glow(ids, duration, fn)`

闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon的ID或者ID数组 |
| `duration` | `any` | 闪烁持续时间，取值说明，-1一直闪烁 0永不闪烁 &gt;0按指定时间间隔闪烁，单位秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.glow(ids, duration);
```

---

### `hide(ids, fn)`

隐藏Polygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
let ids = ['polygon1', 'polygon2'];
fdapi.polygon.hide(ids);
```

---

### `highlight(ids, fn)`

高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Highlight

```js
let ids = ['polygon1', 'polygon2'];
fdapi.polygon.highlight(ids);
```

---

### `setColor(id, newVal, fn)`

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon的ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.setColor(id, newVal);
```

---

### `setCoordinates(id, newVal, fn)`

设置坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.setCoordinates(id, newVal);
```

---

### `setDepthTest(id, newVal, fn)`

设置是否做深度检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | Polygon的ID |
| `newVal` | `boolean` | 是否做深度检测 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.setDepthTest(id, newVal);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)`

设置Polygon对象的可视高度范围，注意：当Polygon对象使用贴地模式时，此方法会失效

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewHeightRange

```js
fdapi.polygon.setViewHeightRange('polygon1', 0, 1000);
```

---

### `show(ids, fn)`

显示Polygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
let ids = ['polygon1', 'polygon2'];
fdapi.polygon.show(ids);
```

---

### `unHighlight(ids, fn)`

停止高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.unHighlight(ids);
```

---

### `update(data, fn)`

修改一个或多个Polygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: 'polygon1',
    coordinates: [
        [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],
        [[488248.65625, 2491142.25, 1], [488215.46875, 2491330.25, 1], [488057.71875, 2491184.25, 1]]
    ],
    color: Color.Green,
    intensity: 0.5,
    depthTest: true
};
await fdapi.polygon.update(o);
fdapi.polygon.focus('polygon1', 200, 1);
```

---

### `updateBegin()`

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

### `updateEnd(fn)`

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon.updateEnd();
```


## 更多示例

> UnHighlight

```js
let ids = ['polygon1', 'polygon2'];
fdapi.polygon.unHighlight(ids);
```
