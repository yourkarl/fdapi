---
title: Polygon3D
sidebar_label: Polygon3D
description: "Polygon3D类， 提供三维多边形相关的操作， 一般通过api.polygon3d调用其方法，效果图： 下面Example代码的运行效果图： 1. 最简单的Polygon3D let coords1 = [[872.16, -9485.86, 5.8], [864.77, -9196.58, 5"
---

# Polygon3D

Polygon3D类， 提供三维多边形相关的操作， 一般通过api.polygon3d调用其方法，效果图：

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

## 方法（Methods）

### `add(data, fn)`

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
| `color` | `Color` | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
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

### `clear(fn)`

删除场景中所有的3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.polygon3d.clear();
```

---

### `delete(ids, fn)`

删除一个或多个3DPolygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的3DPolygon对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.polygon3d.delete(['p3d1', 'p3d2']);
```

---

### `disableClip(ids, fn)`

禁止Polygon3D参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | Polygon3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：DisableClip

```js
fdapi.polygon3d.disableClip(['p3d1', 'p3d2']);
```

---

### `enableClip(ids, fn)`

设置Polygon3D参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | Polygon3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：EnableClip

```js
fdapi.polygon3d.enableClip(['p3d1', 'p3d2']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.polygon3d.focus('p3d1', 10);
```

---

### `get(ids, fn)`

根据ID获取3DPolygon的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的3DPolygon对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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

### `glow(data)`

闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `color` | `Color` | 闪烁的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `duration` | `number` | 闪烁持续时间，单位：秒，取值范围：[0.01~任意正数] |
| `interval` | `number` | 闪烁间隔时间，单位：秒，取值范围：[0.01~任意正数]，注意：间隔时间要小于持续闪烁时间 |

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

### `hide(ids, fn)`

隐藏3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.polygon3d.hide(['p3d1', 'p3d2']);
```

---

### `hideAll(fn)`

隐藏所有3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.polygon3d.hideAll();
```

---

### `highlight(ids, fn)`

高亮，目前仅部分样式支持高亮，和材质有关

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Highlight

```js
//仅部分样式支持高亮闪烁，和材质有关
fdapi.polygon3d.highlight('p3d1');
```

---

### `setColor(id, newColor, fn)`

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newColor` | `Color` | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setColor(id, newColor);
```

---

### `setCoordinates(id, newVal, fn)`

设置坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `array` | 新坐标值，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setCoordinates(id, newVal);
```

---

### `setDepthTest(id, newVal, fn)`

设置是否做深度检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | Polygon3D的ID |
| `newVal` | `boolean` | 是否做深度检测 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setDepthTest(id, newVal);
```

---

### `setHeight(id, newVal, fn)`

设置高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setHeight(id, newVal);
```

---

### `setIntensity(id, newVal, fn)`

设置亮度

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setIntensity(id, newVal);
```

---

### `setStyle(id, newVal, fn)`

设置样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新3DPolygon的样式，参考 `Polygon3DStyle` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setStyle(id, newVal);
```

---

### `setTillingX(id, newVal, fn)`

设置TillingX

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setTillingX(id, newVal);
```

---

### `setTillingY(id, newVal, fn)`

设置TillingY

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.setTillingY(id, newVal);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)`

设置Polygon3D对象的可视高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Polygon3D对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewHeightRange

```js
fdapi.polygon3d.setViewHeightRange('p3d1', 1, 1000);
```

---

### `show(ids, fn)`

显示3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3DPolygon对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.polygon3d.show(['p3d1', 'p3d2']);
```

---

### `showAll(fn)`

显示所有3DPolygon

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.polygon3d.showAll();
```

---

### `stopGlow(ids, fn)`

停止闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：StopGlow

```js
fdapi.polygon3d.stopGlow('p3d1');
```

---

### `unHighlight(ids, fn)`

停止高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Polygon3D的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.polygon3d.unHighlight(ids);
```

---

### `update(data, fn)`

修改一个或多个3DPolygon对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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
await fdapi.polygon3d.updateEnd();
```


## 更多示例

> UnHighlight

```js
fdapi.polygon3d.unHighlight('p3d1');
```
