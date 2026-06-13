---
title: Plot
sidebar_label: Plot
description: "军事态势标绘对象，提供绘制作战态势图标的相关操作 一般通过api.plot调用其方法"
---

# Plot

军事态势标绘对象，提供绘制作战态势图标的相关操作

一般通过api.plot调用其方法

通过 `api.plot` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | Plot对象或对象数组，对于每一个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Plot对象唯一标识符ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `style` | `PlotStyle` | (`PlotStyle`) 态势标绘的图形类型，取值范围：[0~16]，详情参考 `PlotStyle` |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `coordinates` | `array` | 标绘区域包含锚点对应的坐标点数组，[取值示例](/docs/tutorials/coordinates) |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `lineColor` | `Color` | 边框线的颜色，默认值：白色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fillColor` | `Color` | 填充区域颜色，默认值：红色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `thickness` | `number` | 线宽，默认值：3px，单位：像素，注意：仅部分样式下生效 |
| `onTerrain` | `boolean` | 可选，绘制后是否贴地，默认值：true |
| `depthTest` | `boolean` | 可选，是否做深度检测，默认值：true，true会被遮挡，false不会被遮挡 |

> 示例：Add

```js
fdapi.polygon.clear();
await fdapi.plot.clear();
//标绘样式
let styleArr = [
    PlotStyle.Polyline,
    PlotStyle.Circle,
    PlotStyle.Triangle,
    PlotStyle.Rectangle,
    PlotStyle.Polygon,
    PlotStyle.GatheringPlace,
    PlotStyle.BetzCurveArrow,
    PlotStyle.PolylineArrow,
    PlotStyle.StraightArrow,
    PlotStyle.AssaultDirectionArrow,
    PlotStyle.AttackArrow,
    PlotStyle.TailedAttackArrow,
    PlotStyle.SquadCombatArrow,
    PlotStyle.TailedSquadCombatArrow,
    PlotStyle.DoubleArrow,
    PlotStyle.FreehandLineString,
    PlotStyle.FreehandPolygon
];
//样式对应坐标
let coordinatesArr = [
    [
        [490383.1309375, 2488091.7990625002, 23.763046875],
        [490601.8015625, 2488309.769375, 10.997421875],
        [490780.215, 2488147.1996875, 3.779609375],
        [490894.68828125, 2488456.4518750003, 11.391328125],
        [491321.05984375003, 2488302.113125, 13.13265625]
    ],

    [
        [490917.53046875, 2488906.281875, 18.2078125],
        [491124.2728125, 2488906.4475000002, 22.06140625]
    ],

    [
        [490287.69656250003, 2487582.9121875, 20.310078125],
        [490598.2525, 2487303.635625, 3.9871875],
        [490755.98812500003, 2487764.0059375, 7.311796875]
    ],

    [
        [491613.41140625003, 2489106.7115625, 15.91888671875],
        [491270.24296875, 2488872.1040625, 20.108984375000002]
    ],

    [
        [491421.61812500004, 2488063.158125, 8.554375],
        [491380.64875, 2488421.925625, 18.5028125],
        [491600.04078125, 2488564.4115625, 10.6771875],
        [491887.0128125, 2488546.0665625, 14.16765625],
        [491992.787578125, 2488180.4959375, 16.94609375],
        [491807.689765625, 2487766.0478125, 0.69875]
    ],

    [
        [491323.53140625, 2489661.71, 19.88212890625],
        [491551.427265625, 2489791.4671875, 10.241484375],
        [491330.1284375, 2489987.15375, 11.012265625]
    ],

    [
        [491906.351796875, 2488815.8937500003, 18.9809375],
        [492112.55125, 2489415.2890625, 15.87328125],
        [491720.89140625, 2490114.32828125, 8.88109375]
    ],

    [
        [491615.059140625, 2490068.7821875, 10],
        [491299.2028125, 2490328.0656250003, 7.2365234375],
        [491441.57140625, 2490527.3303125002, 7.28921875],
        [491249.05578125, 2490698.85140625, 4.65390625],
        [491339.16203125, 2490818.6428125002, 4.7596875]
    ],

    [
        [488815.6540625, 2490978.6486718752, 0.000625],
        [489351.43875000003, 2490462.92953125, 10.573828125]
    ],

    [
        [489895.03500000003, 2491951.756054688, 0.33171875],
        [489783.5340625, 2490788.1075, 5.2725]
    ],

    [
        [491324.2446875, 2491572.731953125, 3.7246875],
        [491267.57078125, 2491281.3678125, 5.87125],
        [491061.4315625, 2490587.09625, 7.93375],
        [490233.77875, 2490085.5260937503, 29.1278125]
    ],

    [
        [491021.06, 2492100.6120703127, 2.7325],
        [491138.35250000004, 2492035.1242578127, 2.001640625],
        [490883.091875, 2491610.828203125, 5.7904687500000005],
        [490301.905625, 2491191.17140625, 4.799375]
    ],

    [
        [492349.10085937503, 2491044.38046875, 9.1584375],
        [492469.6450390625, 2490386.82703125, 9.4053125],
        [491807.3009375, 2490555.5690625003, 8.17],
        [490836.5771875, 2489922.9206250003, 29.33875]
    ],

    [
        [491923.2646875, 2493583.49671875, 4.391875],
        [489837.98625, 2493636.513359375, 2.531875],
        [488596.44625000004, 2491770.78953125, -0.109375]
    ],

    [
        [493672.4428125, 2492411.6451953123, 1],
        [492210.99765625, 2492809.017421875, 1.3678125],
        [492072.93203125003, 2491736.320703125, 1.8228125],
        [493044.298828125, 2491541.2478125, -2.165625]
    ],
    [
        [493665.759375, 2489294.788125, -0.08625000000000001],
        [494007.38375000004, 2489065.111875, -0.37125],
        [493907.50375000003, 2488641.3725, -0.3565625],
        [493576.2575, 2488281.495625, -0.12125],
        [493089.6821875, 2488280.43, 0.0003125],
        [492939.155, 2488584.0803125002, 0.0609375]
    ],

    [
        [487678.793125, 2490892.0596875, -0.4090625],
        [488566.34500000003, 2490776.7171875, 0.0009375],
        [488498.255, 2489989.970625, 1.4846875],
        [488060.3425, 2489595.730625, 0.0196875],
        [487449.14125, 2490397.4434375, -0.4428125]
    ]

];

let plotArr = [];
for (let i = 0; i < styleArr.length; i++) {
    let plot = {
        id: "plot_" + i,
        range: [-100, 100000],
        style: styleArr[i],//样式类型 参考样式枚举：PlotStyle 态势标绘枚举
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5, //可选  仅部分样式下生效
        coordinateType: 0,
        coordinates: coordinatesArr[i]
    };
    plotArr.push(plot);
}
await fdapi.plot.add(plotArr);
fdapi.plot.focus("plot_16");
```

> 示例：绘制折线：StartDraw(Polyline)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.Polyline,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制圆形：StartDraw(Circle)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.Circle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制三角形：StartDraw(Triangle)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.Triangle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制矩形：StartDraw(Rectangle)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.Rectangle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制多边形：StartDraw(Polygon)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.Polygon,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制聚集地：StartDraw(GatheringPlace)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.GatheringPlace,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制贝兹曲线箭头：StartDraw(BetzCurveArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.BetzCurveArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制折线箭头：StartDraw(PolylineArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.PolylineArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制直箭头：StartDraw(StraightArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.StraightArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制突击方向箭头：StartDraw(AssaultDirectionArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.AssaultDirectionArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制进攻方向箭头：StartDraw(AttackArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.AttackArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制进攻方向箭头（尾）：StartDraw(TailedAttackArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.TailedAttackArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制分队战斗行动箭头：StartDraw(SquadCombatArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.SquadCombatArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制分队战斗行动箭头（尾）：StartDraw(TailedSquadCombatArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.TailedSquadCombatArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制双箭头：StartDraw(DoubleArrow)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.DoubleArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制自由线：StartDraw(FreehandLineString)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.FreehandLineString,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 5,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

> 示例：绘制自由面：StartDraw(FreehandPolygon)

```js
let plot = {
    id: "plot_" + Math.random(),
    range: [-100, 100000],
    style: PlotStyle.FreehandPolygon,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
    onTerrain: true,
    depthTest: true,
    lineColor: [Math.random(), Math.random(), Math.random(), 1],
    fillColor: [Math.random(), Math.random(), Math.random(), 1],
    thickness: 2,
    coordinateType: 0
};
await fdapi.plot.startDraw(plot);
```

---

### `clear(fn)`

删除场景中所有的Plot

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.plot.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Plot对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.plot.delete('plot_14');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Plot对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.plot.focus('plot_14', 280, 1);
```

---

### `get(ids, fn)`

根据ID获取Plot的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Plot对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
Plot的详细信息
[{
            "id":	"ea1",
            "groupId":	"",
            "userData":	"",
            ...
        }]
```

> 示例：Get

```js
fdapi.plot.get('plot_14');
```

---

### `getStrokeCoordinates(ids, fn)`

根据ID获取Plot对象的描边坐标集合

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Plot对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：GetStrokeCoordinates

```js
let result = await fdapi.plot.getStrokeCoordinates(['plot_0', 'plot_1', 'plot_2', 'plot_3', 'plot_4', 'plot_5', 'plot_6', 'plot_7', 'plot_8', 'plot_9', 'plot_10', 'plot_11', 'plot_12', 'plot_13', 'plot_14', 'plot_15', 'plot_16']);

let polygonArr = [];
for (let i = 0; i < result.data.length; i++) {
    let strokeCoordinates = result.data[i].strokeCoordinates;
    //排除线的类型
    if (i != 0 && i != 6 && i != 7 && i != 15) {
        //自定义材质的面
        let plotPolygon = {
            id: 'plot_by_strokeCoordinates' + i,
            coordinates: strokeCoordinates,
            coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
            range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
            viewHeightRange: [0, 10000], //可见高度范围
            color: [0, 0, 1, 1],//多边形的填充颜色
            frameColor: Color.Red,//边框颜色
            frameThickness: 1,//边框厚度
            intensity: 0.5, //亮度
            style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
            depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
            priority: i, //叠加显示的优先级 值越大显示越靠上
            material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效
            scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数
            vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数
        };
        polygonArr.push(plotPolygon);
    }
}
fdapi.plot.clear();
fdapi.polygon.clear();
await fdapi.polygon.add(polygonArr);
fdapi.polygon.focus('plot_by_strokeCoordinates8', 100);
```

---

### `hide(ids, fn)`

隐藏Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Plot对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.plot.hide('plot_14');
```

---

### `hideAll(fn)`

隐藏所有Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.plot.hideAll();
```

---

### `show(ids, fn)`

显示Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Plot对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.plot.show('plot_14');
```

---

### `showAll(fn)`

显示所有Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.plot.showAll();
```

---

### `startDraw(plot, fn)`

进入标绘对象的手工绘制模式，根据鼠标交互获取到坐标进行创建

| 参数 | 类型 | 说明 |
|------|------|------|
| `plot` | `object` | 待绘制的Plot对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`plot` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Plot对象唯一标识符ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `style` | `PlotStyle` | (`PlotStyle`) 态势标绘的图形类型，取值范围：[0~16]，详情参考 `PlotStyle` |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `lineColor` | `Color` | 边框线的颜色，默认值：白色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fillColor` | `Color` | 填充区域颜色，默认值：红色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `thickness` | `number` | 线宽，默认值：3px，单位：像素，注意：仅部分样式下生效 |
| `onTerrain` | `boolean` | 可选，绘制后是否贴地，默认值：true |
| `depthTest` | `boolean` | 可选，是否做深度检测，默认值：true，true会被遮挡，false不会被遮挡 |

```js
绘制结束事件event结构：

{
            "eventtype": "PlotDrawFinished",
            "id": "plot_001",
            "state": 1, // 0失败 1成功
            "style": 4, //Plot样式类型
            "coordinates": [[69.9251953125,-543.034453125,6.5000390625],[110.147578125,-544.45546875,6.4999609375],[166.19751953125,-515.4252734375,6.4999609375]]
        }
```

---

### `stopDraw(fn)`

停止Plot标绘对象的手工绘制模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：停止绘制：StopDraw

```js
await fdapi.plot.stopDraw();
```

---

### `update(data, fn)`

修改一个Plot对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象数据结构，结构参考add()方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let p14 = {
    id: 'plot_14',
    range: [0, 1000],
    fillColor: Color.Blue,
    thickness: 2,
};
await fdapi.plot.update(p14);
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
