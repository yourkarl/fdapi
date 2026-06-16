---
title: FiniteElement2
sidebar_label: FiniteElement2
description: "FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。"
---

# FiniteElement2

FiniteElement2有限元仿真对象，实现对有限元仿真对象的操作

通过 `api.finiteElement2` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。
- **别名 / 不同行业叫法**：有限元仿真 / FEM(增强) / 结构动态仿真 / 形变演示 / CAE 仿真可视化。
- **适用行业**：土木工程、水利水电、桥梁隧道、机械与装备、能源电力
- **使用场景**：
  - 复杂结构在时序荷载下的动态仿真演示
  - 大规模有限元结果的云图与形变可视化
  - 多工况对比与安全评估
- **注意事项**：
  - 相比 FiniteElement 数据与计算量更大，更需 LOD 与分级加载
  - 时序结果需统一时间基准
  - 色带/量纲映射与坐标对齐须正确


## 构造函数

```js
new FiniteElement2()
```

---

## 方法（Methods）

### `add(data, fn)`

根据VTK文件添加一个或多个有限元仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象的数据结构，可以是Object类型或者Array类型，对于每一个FiniteElement2对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `filePath` | `string` | 必选，包含有限元仿真对象数据的VTK文件路径，取值示例：D:/xxx.vtk |
| `location` | `array` | 有限元仿真对象位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `rotation` | `array` | 有限元仿真对象旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `collision` | `boolean` | 有限元仿真对象创建后是否开启碰撞，默认：true |
| `showMesh` | `boolean` | 是否显示有限元仿真模型，默认值：true |
| `edge` | `object` | 网格线边框样式对象，包含以下参数： |
| `edge.type` | `number` | 线框样式，取值范围：[0,1,2]，0：隐藏 1：网格线 2：特征线 |
| `edge.featureAngel` | `number` | 特征性二面角 |
| `edge.color` | `string` | 可选，线框颜色，默认值：[0.1, 0,1, 0.1, 1]，[取值示例](/docs/tutorials/color) |
| `pointField` | `object` | 设置有限元仿真对象的点属性字段，包含以下参数： |
| `pointField.field` | `string` | 可选，属性字段名称 |
| `pointField.component` | `string` | 可选，属性字段对应的分量名称 |
| `arrow` | `object` | 设置有限元仿真对象的箭头效果，包含以下参数： |
| `arrow.vectorField` | `string` | 使用此属性字段名称对应的值符号化显示箭头 |
| `arrow.lengthScale` | `number` | 可选，箭头长度缩放值 |
| `arrow.sizeScale` | `number` | 可选，箭头尺寸 |
| `arrow.colorField` | `string` | 颜色属性字段名称 |
| `arrow.colorComponent` | `string` | 颜色属性字段对应的分量名称 |
| `colors` | `object` | 有限元仿真对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

```js
对象结构示例：

let fe2 = {
            "id":"fe_2",
            "filePath":"C:/HHKBZ.vtk",
            "location":[2209.658125,22.4936328125,8.699999389648437],
            "rotation":[0,0,0],
            "collision":true,
            "showMesh": true,
            "edge": {
                "type": 1,
                "featureAngel": 30,
                "color": [0.1, 0,1, 0.1, 1]
            },
            "pointField":{
                "field":"U",
                "component": "XY"
            },
            "arrow":{
                "vectorField":"stress",
                "lengthScale": 1000,
                "sizeScale":   1000,
                "colorComponent": "XY"
            },
            "colors":
            {
                "colorStops":[
                    {
                        "value":0,
                        "color":[0.231373,0.298039,0.752941,1]
                    },
                    {
                        "value":0.5,
                        "color":[0.865,0.865,0.865,1]
                    },
                    {
                        "value":1,
                        "color":[0.705882,0.015686,0.14902,1]
                    }
                ]
            }
        };
```

> 示例：Add(Arrow)

```js
let min = 2.80;
let max = 4.12;
let diff = (max - min) / 10;
let colorStops = [
    {
        "value": min,
        "color": [0, 0, 1, 1]
    },
    {
        "value": min + diff,
        "color": [0, 93 / 255, 1, 1]
    }, {
        "value": min + diff * 2,
        "color": [0, 185 / 255, 1, 1]
    }, {
        "value": min + diff * 3,
        "color": [0, 1, 232 / 255, 1]
    }, {
        "value": min + diff * 4,
        "color": [0, 1, 139 / 255, 1]
    }, {
        "value": min + diff * 5,
        "color": [0, 1, 46 / 255, 1]
    }, {
        "value": min + diff * 6,
        "color": [139 / 255, 1, 0, 1]
    }, {
        "value": min + diff * 7,
        "color": [232 / 255, 1, 0, 1]
    }, {
        "value": min + diff * 8,
        "color": [1, 185 / 255, 0, 1]
    }, {
        "value": min + diff * 9,
        "color": [1, 93 / 255, 0, 1]
    }, {
        "value": min + diff * 10,
        "color": [1, 0, 0, 1]
    }
]

fdapi.finiteElement2.clear();
//有限元分析对象2
let fe2 = {
    "id": "fe_2",
    "filePath": HostConfig.Path + "/assets/vtk/compress.vtu",//vtu文件路径
    "location": [493126.241875, 2492054.3999609374, 3],
    "rotation": [0, 0, 0],
    "collision": true,
    "showMesh": true,
    "edge": {
        "type": 1,
        "featureAngel": 30,
        "color": [0.1, 0.1, 0.1, 0.65]
    },
    "arrow": {
        "vectorField": "nodevelocity",
        "lengthScale": 0.1,
        "sizeScale": 0.1,
        "colorField": "nodevelocity",
        "colorComponent": "Y"
    },
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": colorStops
    },

};
await fdapi.finiteElement2.add(fe2);
fdapi.finiteElement2.focus('fe_2');
```

> 示例：Add(PointField)

```js
let min = -0.133858
let max = 0.00677916
let diff = (max - min) / 10;
let colorStops = [
    {
        "value": min,
        "color": [0, 0, 1, 1]
    },
    {
        "value": min + diff,
        "color": [0, 93 / 255, 1, 1]
    }, {
        "value": min + diff * 2,
        "color": [0, 185 / 255, 1, 1]
    }, {
        "value": min + diff * 3,
        "color": [0, 1, 232 / 255, 1]
    }, {
        "value": min + diff * 4,
        "color": [0, 1, 139 / 255, 1]
    }, {
        "value": min + diff * 5,
        "color": [0, 1, 46 / 255, 1]
    }, {
        "value": min + diff * 6,
        "color": [139 / 255, 1, 0, 1]
    }, {
        "value": min + diff * 7,
        "color": [232 / 255, 1, 0, 1]
    }, {
        "value": min + diff * 8,
        "color": [1, 185 / 255, 0, 1]
    }, {
        "value": min + diff * 9,
        "color": [1, 93 / 255, 0, 1]
    }, {
        "value": min + diff * 10,
        "color": [1, 0, 0, 1]
    }
]

fdapi.finiteElement2.clear();
//有限元分析对象2
let fe2 = {
    "id": "fe_2",
    "filePath": HostConfig.Path + "/assets/vtk/finiteElement2.vtk",//vtk文件路径
    "location": [493071.733125, 2492216.8000000003, 150],
    "rotation": [0, 90, 0],
    "collision": true,
    "showMesh": true,
    "edge": {
        "type": 1,
        "featureAngel": 30,
        "color": [0.1, 0.1, 0.1, 0.65]
    },
    "pointField": {
        "field": "U",
        "component": "D3" //可选
    },
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": colorStops
    },
};
await fdapi.finiteElement2.add(fe2);
//添加耗时 延迟5s定位
setTimeout(function () {
    fdapi.finiteElement2.focus('fe_2');
}, 5000);
```

---

### `applyBoxClipFilter(data, fn)`

盒子过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象盒子过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `clipBBox` | `array` | 剖切盒子的范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `clipRotation` | `array` | 剖切盒子的旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `crinkleClip` | `boolean` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |
| `invertClip` | `boolean` | 是否打开剖切反转，默认值：true |

> 示例：ApplyBoxClipFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//按盒子范围过滤
fdapi.finiteElement2.applyBoxClipFilter({
    "id": "fe_2",
    "filterId": "filter4",
    "clipBBox": [493062.5725, 2492167.255, 117.1850439453125, 493124.398125, 2492192.105, 153.7712841796875],
    "clipRotation": [0, 0, 0],
    "crinkleClip": false,
    "invertClip": true
});
```

---

### `applyContourFilter(data, fn)`

根据等值线对应的数值添加过滤器并展示过滤后的有限元模型分析结果

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `fieldName` | `string` | 有限元模型对象包含等值线值的属性字段名称，支持点属性字段 |
| `contourValues` | `array` | 等值线对应的数值数组，数组元素的取值类型: number，取值示例：[100,200,300,500] |

> 示例：ApplyContourFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//根据等值线/面过滤
fdapi.finiteElement2.applyContourFilter({
    id: "fe_2",
    filterId: "filter2",
    fieldName: "E_Mises",
    contourValues: [0, 0.001, 0.002]
});
```

---

### `applyCylinderClipFilter(data, fn)`

圆柱过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象圆柱过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `clipOrigin` | `array` | 圆柱体的柱心坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `clipRadius` | `array` | 圆柱体的半径，单位：米，取值范围：[0,任意正数] |
| `clipAxis` | `array` | 圆柱体的轴心朝向，即垂直于圆柱底面的法线向量，取值示例：[0,0,1] |
| `crinkleClip` | `boolean` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |
| `invertClip` | `boolean` | 是否打开剖切反转，默认值：true |

> 示例：ApplyCylinderClipFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//按圆柱体过滤
fdapi.finiteElement2.applyCylinderClipFilter({
    "id": "fe_2",
    "filterId": "filter6",
    "clipOrigin": [493110.26125, 2492224.32, 140],
    "clipRadius": 10,
    "clipAxis": [0, 1, 0],
    "crinkleClip": false,
    "invertClip": true
});
```

---

### `applyPlaneClipFilter(data, fn)`

切面过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象切面过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `clipOrigin` | `array` | 切面的原点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `clipNormal` | `array` | 切面的法线向量，取值示例：[1,0,0] |
| `crinkleClip` | `boolean` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |
| `invertClip` | `boolean` | 是否打开剖切反转，默认值：true |

> 示例：ApplyPlaneClipFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//按面过滤
fdapi.finiteElement2.applyPlaneClipFilter({
    "id": "fe_2",
    "filterId": "filter3",
    "clipNormal": [1, 0, 0],
    "clipOrigin": [493104.82, 2492261.7600000002, 143.5202734375],
    "crinkleClip": false,
    "invertClip": true
});
```

---

### `applySphereClipFilter(data, fn)`

球型过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象球型过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `clipOrigin` | `array` | 球的球心坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `clipRadius` | `array` | 球的半径，单位：米，取值范围：[0,任意正数] |
| `crinkleClip` | `boolean` | 是否对切面上的网格体进行剖切并只显示剖切区域的一侧，默认值：false 平滑切面效果，设置为true，则显示褶皱效果 |
| `invertClip` | `boolean` | 是否打开剖切反转，默认值：true |

> 示例：ApplySphereClipFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//按球体过滤
fdapi.finiteElement2.applySphereClipFilter({
    "id": "fe_2",
    "filterId": "filter5",
    "clipOrigin": [493102.69875, 2492223.52, 140],
    "clipRadius": 22,
    "crinkleClip": false,
    "invertClip": true
});
```

---

### `applyThresholdFilter(data, fn)`

根据模型属性字段对应的区间值添加过滤器并展示过滤后的有限元模型分析结果

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterId` | `string` | 过滤器ID |
| `fieldName` | `string` | 有限元模型对象包含的区间类型的属性字段名称，支持cell属性字段和点属性字段 |
| `range` | `array` | 字段属性值的区间范围: [min~max]，区间范围的取值类型: number，取值示例：[10,20] |

> 示例：ApplyThresholdFilter

```js
//清空过滤器
fdapi.finiteElement2.clearFilter("fe_2");
//根据区间字段过滤
fdapi.finiteElement2.applyThresholdFilter({
    id: "fe_2",
    filterId: "filter1",
    fieldName: "E_Mises",
    component: "E_Mises",
    range: [0, 0.003]

});
```

---

### `clear(fn)`

清空场景中所有的有限元仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.finiteElement2.clear();
```

---

### `clearFilter(ids, fn)`

清空指定的有限元模型对象添加的所有过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 有限元仿真对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ClearFilter

```js
fdapi.finiteElement2.clearFilter("fe_2");
```

---

### `delete(ids, fn)`

删除一个或多个有限元仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的有限元仿真对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.finiteElement2.delete(['fe_2']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 有限元仿真对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.finiteElement2.focus('fe_2');
```

---

### `get(ids, fn)`

根据有限元分析ID获取有限元分析的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的有限元仿真对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回FiniteElement的详细信息

{
            "id":"fe_2",
            "filePath":"C:/HHKBZ.vtk",
            "location":[2209.658125,22.4936328125,8.699999389648437],
            "rotation":[0,0,0],
            "collision":true,
            "edgeColor": [0.1, 0.1, 0.1, 1],
            "showMesh":false,
            "edge": {
                "type": 1,
                "featureAngel": 30,
                "color": [0.1, 0,1, 0.1, 1]
            },
            "pointField":{
                "field":"U",
                //"component": "XY" //可选
            },
            "colors":
            {
                "colorStops":[
                    {
                        "value":0,
                        "color":[0.231373,0.298039,0.752941,1]
                    },
                    {
                        "value":0.5,
                        "color":[0.865,0.865,0.865,1]
                    },
                    {
                        "value":1,
                        "color":[0.705882,0.015686,0.14902,1]
                    }
                ]
            }
        };
```

> 示例：Get

```js
fdapi.finiteElement2.get(['fe_2']);
```

---

### `hide(ids, fn)`

隐藏有限元分析

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 有限元仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.finiteElement2.hide(['fe_2']);
```

---

### `removeFilter(data, fn)`

移除指定的有限元模型对象添加的相关过滤器

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象过滤器的数据结构，可以是Object类型或者Array类型 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 有限元仿真对象的唯一标识符ID |
| `filterIds` | `array` | 过滤器ID数组 |

> 示例：RemoveFilter

```js
fdapi.finiteElement2.removeFilter({ id: "fe_2", filterIds: ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6"] });
```

---

### `show(ids, fn)`

显示有限元分析

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 有限元仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.finiteElement2.show(['fe_2']);
```

---

### `update(data, fn)`

修改一个或多个有限元仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 有限元仿真对象或对象数组，参考add方法参数。注意：不支持更新文件路径参数(filePath)，需先删除再添加 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
//有限元分析对象
let fe2 = {
    "id": "fe_2",
    "edge": {
        "type": 2,
        "featureAngel": 30,
        "color": [0.1, 0, 1, 0.1, 1]
    }

};
await fdapi.finiteElement2.update(fe2);
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
await fdapi.finiteElement