---
title: WaterFlowField
sidebar_label: WaterFlowField
description: "WaterFlowField 精确控制水面各网格的流向与流速，构建可控的水流流场效果。"
---

# WaterFlowField

WaterFlowField流场类对象，用于精确控制水流单个网格的方向速度等

![](/img/refdoc/api/waterFlowField.gif)

通过 `api.waterFlowField` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：WaterFlowField 精确控制水面各网格的流向与流速，构建可控的水流流场效果。
- **别名 / 不同行业叫法**：流场 / 水流场 / 流速场 / 水动力流场。
- **适用行业**：智慧水利、海洋、生态环境、水电、景观水系
- **使用场景**：
  - 河道、湖库表面水流流向流速的可视化
  - 潮流、环流方向的动态展示
  - 景观水系的动态流动效果
- **注意事项**：
  - 网格分辨率影响细腻度与性能
  - 流场数据需规范采样
  - 通常与 WaterMesh、动态水面配合使用



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个WaterFlowField对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的WaterFlowField对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个WaterFlowField对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取WaterFlowField对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏WaterFlowField对象 | 按业务条件隐藏对象 |
| [`setViewportVisible`](#setViewportVisible) | 设置水流场对象在进入多视口状态下视口可见性 |  |
| [`show`](#show) | 显示WaterFlowField对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个WaterFlowField对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | WaterMesh数据，可以是Object类型或者Array类型，对于每一个WaterFlowField对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterFlowField对象ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `indices` | `array` | 否 | - | 可选，顶点坐标的索引，用来绘制流场内的三角网格，可以为空，若不传则使用系统默认计算的顶点索引；数组元素类型：(number)；数组元素顺序：顶点索引顺序需构成三角网格且同为顺时针或逆时针方向；数组元素取值范围：[0~points.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `maxEdgeLength` | `number` | 否 | 0 | 三角网格边的最大长度，用于控制流场内各三角形边的最大长度，取值范围：[0~任意正数]，单位：米，默认值：0，自动计算最大长度 |
| `points` | `array` | 是 | - | 流场内运动的采样点位置坐标数组，二维数组，数组元素：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |
| `uvs` | `array` | 是 | - | 流场内运动的采样点流速流向数组，二维数组，数组元素：[U,V]，单位：米/秒，其中uvs数组必须和points保持对应关系且长度一致 |
| `alphas` | `array` | 是 | - | 流场内运动的采样点渲染区域不透明度数组，一维数组，数组元素：数值，范围：[0~1]，其中alphas数组必须和points和uvs保持对应关系且长度一致 |
| `validUVRange` | `array` | 否 | [0,max] | 流速有效范围，流速小于min的区域会显示蓝色，min到max之间的区域会从蓝色过渡到红色显示热力图的颜色变化效果，流速大于max的显示红色，[min,max]，数组元素min/max的取值范围：[0~任意正数]，默认值：[0,max]，数组元素单位：米/秒 |
| `uvRangeMapping` | `array` | 是 | - | 流速重映射范围，为了突出流动效果，可以对流速有效范围进行一个映射，把ValidUVRange的min和max映射到一个新的min和max，方便看出流向，[mapMin,mapMax]，即validUVRange范围的对应数值映射的新范围，用来增加流速从而调整渲染效果。 |
| `displayMode` | [`WaterFlowFieldStyle`](/docs/api/types#waterflowfieldstyle) | 是 | - | 流场的材质样式，参考 `WaterFlowFieldStyle`，0为热力值材质，1为水流材质，2为光流粒子材质，默认取值：0 |
| `heatValues` | `array` | 否 | - | 可选，热值数组，一维数组，数组元素为数值，仅displayMode参数为0时生效，heatValues数组长度必须和points/uvs保持对应关系且长度一致 |
| `colorLookUpArray` | `array` | 否 | - | 可选，热值显示对应的颜色数组，二维数组，数组元素为[r,g,b,a]颜色数组，rgba取值范围：[0~1]，即各颜色值除于255，仅displayMode参数为0时生效，数组长度大于2 |
| `heatValueRange` | `array` | 否 | [0,1] | 可选，热值取值范围数组，仅displayMode参数为0时生效，取值示例：[min,max]，数组元素min/max的取值范围：[0~1000]，默认值：[0,1] |
| `waterColor` | [`Color`](/docs/api/types#color) | 否 | [0.0, 0.325, 0.223, 1.00] | 水流材质的颜色，仅displayMode=1时生效，默认值：[0.0, 0.325, 0.223, 1.00]，支持四种格式，[取值示例](/docs/tutorials/color) |
| `particleScale` | `number` | 否 | 1 | 水流粒子缩放大小，取值范围：[1~30]，默认值：1 |
| `traceFactor` | `number` | 是 | - | 光流轨迹保持因子，仅在displayMode=2生效，取值范围：[0~100] 值越大粒子轨迹越长，注意：水流场的采样点越稀疏，因子值就要设置越大 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求数据结构示例 
        [{
            "id":"waterFlowField1",           //WaterFlowField对象ID
            "groupId": "waterFlowFieldGroup1", //可选，Group分组
            "userData": "myWaterFlowFieldData",//可选，用户自定义数据
            "coordinateType": 0,          //坐标系类型 0为投影坐标系
            "displayMode": WaterFlowFieldStyle.HeapMap,  //0为热力值材质，1为水流材质
            "waterColor": [0.0, 0.325, 0.223, 1.00],//水流材质的颜色，仅displayMode=1时生效
            "validUVRange": [2,3.2],   //水流速度叠加后显示的颜色热力值范围
            "particleScale": 2,        //水流粒子大小
            //"indices":[2, 0, 3, 0, 2, 1],//采样点顶点坐标的索引，允许为空，当此参数为空时系统自动计算三角面的顶点索引
            "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，传入默认值0时则自动计算最大长度
            "points":  [[1000, 1000, 100], [1000, -1000, 100], [-1000, -1000, 100], [-1000, 1000, 100]],//采样点位置坐标数组
            "uvs": [[2.85,-0.17],[5,9],[10,20],[20,10]]//流速流向数组
            "alphas": [1,1,1,1]
        }]
```

> 示例：Add

```js
//添加前先清空
fdapi.waterFlowField.clear();
//流场内的采集点信息
//位置坐标数组；
let pointsArr = _waterFlowFieldPointArr;
//流速流向数据的数组
let uvsArr = _waterFlowFieldUVSArr;

//不透明度
let alphas = [];
for (let i = 0; i < uvsArr.length; i++) {
    let uv = uvsArr[i];
    //如果uv都等于0 则设置透明度为0.1
    if (uv[0] == 0 && uv[1] == 0) {
        alphas.push(0.1);
    } else {
        alphas.push(1);
    }
}

let flowField1 = {
    "id": "flowField1",//对象id
    "groupId": "flowFieldGroup1",//可选 分组id
    "userData": "myFlowFieldData",//可选 用户数据
    "coordinateType": 0,//坐标系类型 0为投影坐标系
    "displayMode": WaterFlowFieldStyle.HeapMap,//材质类型 0为热力值材质，1为水流材质 2为光流粒子效果
    "validUVRange": [0, 3],//用于显示热力颜色的水流速度范围
    "uvRangeMapping": [2, 3],//用于增强渲染效果而映射到的新的水流速度范围
    "particleScale": 0.2,//水流粒子大小
    //"indices": [2, 0, 3, 0, 2, 1],//顶点索引数组 可以为空，若不传则使用系统默认计算的顶点索引
    "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，传入默认值0时则自动计算最大长度
    "points": pointsArr, //坐标数组
    "uvs": uvsArr, // uv流速流向数组
    "alphas": alphas //不透明度
};
await fdapi.waterFlowField.add(flowField1);
fdapi.waterFlowField.focus('flowField1', 1000);
```

---

### `clear(fn)` {#clear}

清空场景中所有的WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.waterFlowField.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的WaterFlowField对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.waterFlowField.delete('flowField1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterFlowField对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.waterFlowField.focus('flowField1', 1000);
```

---

### `get(ids, fn)` {#get}

根据ID获取WaterFlowField对象的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的WaterFlowField对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
WaterFlowField的详细信息
[{
            "id":	"flowField1",
            "groupId":	"flowFieldGroup1",
            "userData":	"myFlowFieldData",
            "coordinateType":	0,
            "maxEdgeLength": 0,
            "displayMode":	0,
            "waterColor": [0.0, 0.325, 0.223, 1.00],
            "validUVRange":	[2.000000, 3.200000],
            "particleScale":	2.000000
            
        }]
```

> 示例：Get

```js
fdapi.waterFlowField.get('flowField1');
```

---

### `hide(ids, fn)` {#hide}

隐藏WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterFlowField对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.waterFlowField.hide('flowField1');
```

---

### `setViewportVisible(id, vp, fn)` {#setViewportVisible}

设置水流场对象在进入多视口状态下视口可见性

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | WaterFlowField对象ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 是 | - | 视口掩码（Viewport位运算） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

//设置1和3视口可见
fdapi.waterFlowField.setViewportVisible('flowField1', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)` {#show}

显示WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | WaterFlowField对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.waterFlowField.show('flowField1');
```

---

### `update(data, fn)` {#update}

修改一个或多个WaterFlowField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | WaterFlowField数据，支持单个对象和对象数组，结构参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let flowFieldNew = {
    "id": "flowField1",//对象id
    "coordinateType": 0,//坐标系类型 0为投影坐标系
    "displayMode": WaterFlowFieldStyle.Particle,//材质类型 0为热力值材质，1为水流材质 2为光流粒子效果
    "waterColor": [0.0, 0.325, 0.223, 1.0],//水流材质的颜色
    "validUVRange": [0, 1],//水流速度叠加后显示的颜色热力值范围
    "particleScale": 1,//水流粒子大小
    "traceFactor": 0 //粒子轨迹保持因子
};
await fdapi.waterFlowField.update(flowFieldNew);
fdapi.waterFlowField.focus('flowField1', 1000);
```
