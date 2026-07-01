---
title: FiniteElement
sidebar_label: FiniteElement
description: "FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。"
---

# FiniteElement

FiniteElement有限元分析对象，实现对有限元分析对象的操作

![](/img/refdoc/api/finiteElement.gif)

通过 `api.finiteElement` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。
- **别名 / 不同行业叫法**：有限元 / FEM / 结构仿真 / 应力分析 / 形变分析 / CAE 结果可视化。
- **适用行业**：土木工程、桥梁隧道、水利水电（大坝/闸门）、机械装备、能源电力
- **使用场景**：
  - 大坝、桥梁等结构的应力应变云图展示
  - 荷载作用下的结构形变动画
  - 结构安全评估与隐患部位可视化
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 网格与结果数据量大，需分级加载并关注性能
  - 色带与量纲须正确映射
  - 模型坐标需与工程坐标对齐


## 构造函数

```js
new FiniteElement()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个有限元分析对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的有限元分析对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个有限元分析对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据有限元分析ID获取有限元分析的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏有限元分析 | 按业务条件隐藏对象 |
| [`show`](#show) | 显示有限元分析 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个有限元分析对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个有限元分析对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 有限元分析对象的数据结构，可以是Object类型或者Array类型，对于每一个FiniteElement对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 有限元分析的唯一标识符ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `dataPath` | `string` | 是 | - | 必选，包含有限元分析数据的二进制文件路径 |
| `coordinate` | `array` | 是 | - | 有限元分析位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `rotation` | `array` | 否 | [0,0,0] | 有限元分析旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `type` | `number` | 是 | - | 有限元分析类型，共12种，类型：整数，取值范围：[0~11]，以下为类型数值对应关系： |
| `type.0` | `-` | 是 | - | ： u1 沿X轴向空间位移 |
| `type.1` | `-` | 是 | - | ： u2 沿Y轴向空间位移 |
| `type.2` | `-` | 是 | - | ： u3 沿Z轴向空间位移 |
| `type.3` | `-` | 是 | - | ： s11 X轴向的应力，正值为拉应力，负值为压应力 |
| `type.4` | `-` | 是 | - | ： s22 Y轴向的应力，正值为拉应力，负值为压应力 |
| `type.5` | `-` | 是 | - | ： s33 Z轴向的应力，正值为拉应力，负值为压应力 |
| `type.6` | `-` | 是 | - | ： s12 在YZ平面上，沿Y向的剪力 |
| `type.7` | `-` | 是 | - | ： s13 在YZ平面上，沿Z向的剪力 |
| `type.8` | `-` | 是 | - | ： s23 在XZ平面上，沿Z向的剪力 |
| `type.9` | `-` | 是 | - | ： d1 X方向损伤 |
| `type.10` | `-` | 是 | - | ：d2 Y方向损伤 |
| `type.11` | `-` | 是 | - | ：d3 Z方向损伤 |
| `valueRange` | `array` | 是 | - | 有限元分析结果对应值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `characteristicLine` | `object` | 是 | - | 有限元对象的特征线对象，包含以下参数： |
| `characteristicLine.filePath` | `string` | 是 | - | 包含特征线信息的文件路径 |
| `characteristicLine.color` | [`Color`](/docs/api/types#color) | 是 | - | 特征线的颜色 |
| `showLine` | `boolean` | 否 | false | 是否显示等值线，默认值：false |
| `showColorLine` | `boolean` | 否 | false | 是否显示等值线颜色，默认值：false |
| `contourParams` | `array` | 是 | - | 控制有限元分析对象热力效果，从valueRange的min/max分割而来，二维数组，取值示例：[[min,max],[min,max],[min,max]...] |
| `sections` | `array` | 是 | - | 有限元分析对象的各部分设置可见性 |
| `sections.index` | `number` | 是 | - | 待隐藏显示的模型索引 |
| `sections.visible` | `boolean` | 否 | true | 是否可见，默认值：true |
| `colors` | `object` | 是 | - | 有限元分析对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.size` | `number` | 是 | - | 调色板图片尺寸 |
| `colors.gradient` | `boolean` | 是 | - | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 是 | - | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 是 | - | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 是 | - | 值对应的调色板颜色 |
| `colors.value` | `number` | 是 | - | 值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
对象结构示例：

let fe1 = {
        "id": "fe_1",
        "dataPath": "d:/out/",//目录
        "coordinate": [
            12984831,
            4800354.5,
            0
        ],
        "rotation": [
            0,
            0,
            0
        ],
        "type": 0,
        "valueRange": [
            -3,
            3
        ],
        "characteristicLine":{
            "filePath": "d:/aaa.json",
            "color": [1,1,0,1]
        },
        "sections": [
            {
                "index": 1,
                "visible": false
            },
            {
                "index": 2,
                "visible": false
            }
        ],
        "contourParams": [[-3,0],[0,1],[1,3]],//分割valueRange
        "showLine": true,
        "showColorLine": true,
        "colors": {
            "size": 2048,
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.25,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.75,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    };
```

> 示例：Add

```js
fdapi.finiteElement.delete(['fe_1']);
//有限元文件资源目录
let dataPath = HostConfig.Path + "/assets/finiteElement/";
//有限元分析对象
let fe1 = {
    "id": "fe_1",
    "dataPath": dataPath, //有限元文件资源目录
    "coordinate": [
        493155.46875, 2492133.6, 100
    ],
    "rotation": [
        0,
        0,
        0
    ],
    "type": 10,
    "valueRange": [
        -0.348057,
        0.0360363
    ],
    "showLine": true,//显隐等值线
    "showColorLine": false,//是否显示成彩色线
    "contourParams": [
        [0.08333391912850335, 0.006], //等值线的位置，第二个参数是线宽。
        [0.16666783825700687, 0.006],
        [0.2500017573855102, 0.006],
        [0.3333330729799244, 0.006],
        [0.41666699210842784, 0.006],
        [0.5000009112369311, 0.003],
        [0.5833348303654347, 0.003],
        [0.6666669270200756, 0.003],
        [0.7500003254417611, 0.003],
        [0.8333334635100378, 0.003],
        [0.9166668358963824, 0.0007]
    ],
    "sections": [{
        "index": 0,
        "visible": true
    }, {
        "index": 1,
        "visible": true
    }],
    "colors": {
        "file": dataPath + "colorMap.png"
    }
};
await fdapi.finiteElement.add(fe1);
fdapi.finiteElement.focus('fe_1');
```

---

### `clear(fn)` {#clear}

清空场景中所有的有限元分析对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.finiteElement.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个有限元分析对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的有限元分析对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.finiteElement.delete(['fe_1']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 有限元分析对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.finiteElement.focus('fe_1');
```

---

### `get(ids, fn)` {#get}

根据有限元分析ID获取有限元分析的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的有限元分析对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回FiniteElement的详细信息 属性详情参见add方法参数

{
            "id": "h1",
            "dataPath": "C:/Users/Administrator/out",
            "coordinate": [
                12984831,
                4800354.5,
                0
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "type": 0,
            "valueRange": [
                -0.000003,
                0.000003
            ],
            "colors": "base64..."
        }
```

> 示例：Get

```js
fdapi.finiteElement.get(['fe_1']);
```

---

### `hide(ids, fn)` {#hide}

隐藏有限元分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 有限元分析对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.finiteElement.hide(['fe_1']);
```

---

### `show(ids, fn)` {#show}

显示有限元分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 有限元分析对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.finiteElement.show(['fe_1']);
```

---

### `update(data, fn)` {#update}

修改一个或多个有限元分析对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 有限元分析对象或对象数组，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
//有限元文件资源目录
let dataPath = HostConfig.Path + "/assets/finiteElement/";
//有限元分析对象1
let fe1 = {
    "id": "fe_1",
    "type": 8,
    "rotation": [
        0,
        90,
        0
    ],
    "colors": {
        "file": dataPath + "colorMap.png"
    }
};
await fdapi.finiteElement.update(fe1);
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
await fdapi.finiteElement.updateEnd();
```
