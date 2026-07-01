---
title: Antenna
sidebar_label: Antenna
description: "Antenna 以方向图形式可视化天线的辐射/增益方向特性。"
---

# Antenna

天线方向图对象，提供Antenna对象的操作方法

通过api.antenna调用

通过 `api.antenna` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Antenna 以方向图形式可视化天线的辐射/增益方向特性。
- **别名 / 不同行业叫法**：天线 / 天线方向图 / 方向图 / 波瓣图 / 基站天线 / 雷达天线。
- **适用行业**：通信(5G/基站)、国防雷达、广电、物联网、低空通信、低空经济与通信
- **使用场景**：
  - 基站、雷达天线方向图的三维展示
  - 覆盖与指向的规划评估
  - 电磁态势中的天线要素
  - 低空通信与雷达可视化：三维天线方向图渲染，结合波束与信号覆盖辅助通信基站选址分析。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 方向图数据需规范
  - 通常与 Beam、SignalWave 配合表达完整信号链
  - 尺度需与场景匹配


## 构造函数

```js
new Antenna()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个天线方向图对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的天线方向图对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个天线方向图对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据天线方向图ID获取天线方向图的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏天线方向图 | 按业务条件隐藏对象 |
| [`show`](#show) | 显示天线方向图 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个天线方向图对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个天线方向图对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 天线方向图包含的数据对象，可以是Object类型或者Array类型，对于每一个Antenna对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 天线方向图的唯一标识符ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinate` | `array` | 是 | - | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 是 | - | 坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `radius` | `number` | 是 | - | 天线方向图半径 |
| `radiationRange` | `array` | 否 | - | 可选，辐射取值范围 |
| `radiationOffset` | `array` | 是 | - | 溢出位置偏移，[X,Y] |
| `grid` | `object` | 是 | - | 网格对象，包含以下属性 |
| `grid.values` | `array` | 是 | - | 网格热力值数组，二维数组，注意两个数组元素的长度相乘应该等于信号增益（gain）的长度，取值示例：[[val1,val2],[val3,val4,val5]] 即gain.length = 2*3 |
| `colors` | `object` | 是 | - | 配色卡信息，包含以下属性 |
| `colors.gradient` | `boolean` | 是 | - | 颜色是否渐变 |
| `colors.invalidColor` | `array` | 是 | - | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 是 | - | 色卡数组，包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
{
            "id": "radiationPattern",
            "coordinate": [
                494479.71875,
                2491462.25,
                2.11
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "radius": 5,
            "radiationRange": [
                0,
                100
            ],
            "radiationOffset": [
                -5,
                5
            ],
            "grid": {
                "values": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ]
            },
            "colors": {
                "gradient": true,
                "invalidColor": [
                    0,
                    0,
                    0,
                    1
                ],
                "colorStops": [
                    {
                        "value": 0,
                        "color": [
                            0,
                            0,
                            1,
                            1
                        ]
                    },
                    {
                        "value": 0.25,
                        "color": [
                            0,
                            1,
                            1,
                            1
                        ]
                    },
                    {
                        "value": 0.5,
                        "color": [
                            0,
                            1,
                            0,
                            1
                        ]
                    },
                    {
                        "value": 0.75,
                        "color": [
                            1,
                            1,
                            0,
                            1
                        ]
                    },
                    {
                        "value": 1,
                        "color": [
                            1,
                            0,
                            0,
                            1
                        ]
                    }
                ]
            }
        }
```

> 示例：Add

```js
fdapi.antenna.delete('ap_1');
let ap1 = {
    "id": "ap_1",
    "coordinate": [
        493050.98875, 2492086.08, 6
    ],
    "rotation": [
        0,
        0,
        0
    ],
    "radius": 5,
    "radiationRange": [
        -72,
        25
    ],
    "radiationOffset": [
        -5,
        5
    ],
    "grid": {
        "gridSize": [360, 181],
        "values": gain
    },
    "colors": {
        "gradient": true,
        "invalidColor": [
            0,
            0,
            0,
            1
        ],
        "colorStops": [
            {
                "value": 0,
                "color": [
                    0,
                    0,
                    1,
                    1
                ]
            },
            {
                "value": 0.25,
                "color": [
                    0,
                    1,
                    1,
                    1
                ]
            },
            {
                "value": 0.5,
                "color": [
                    0,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 0.75,
                "color": [
                    1,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 1,
                "color": [
                    1,
                    0,
                    0,
                    1
                ]
            }
        ]
    }
};
await fdapi.antenna.add(ap1);
fdapi.antenna.focus('ap_1', 100, 1);
```

---

### `clear(fn)` {#clear}

清空场景中所有的天线方向图对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.antenna.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个天线方向图对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的天线方向图对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.antenna.delete('ap_1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 天线方向图对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.antenna.focus('ap_1', 100, 1);
```

---

### `get(ids, fn)` {#get}

根据天线方向图ID获取天线方向图的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的天线方向图对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回天线方向图的详细信息 属性详情参见add方法参数
{
            "id":	"Antenna_1",
            "groupId":	"",
            "userData":	"",
            "coordinateType": 0,
            "coordinate":	[1000,1000,1000],
            "radius": 100,
            "radiationRange": [1, 300],
            "radiationOffset": [-5,5]
            ...
        }
```

> 示例：Get

```js
fdapi.antenna.get('ap_1');
```

---

### `hide(ids, fn)` {#hide}

隐藏天线方向图

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 天线方向图对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.antenna.hide('ap_1');
```

---

### `show(ids, fn)` {#show}

显示天线方向图

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 天线方向图对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.antenna.show('ap_1');
```

---

### `update(data, fn)` {#update}

修改一个或多个天线方向图对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 天线方向图对象或对象数组，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let ap = {
    "id": "ap_1",
    "coordinate": [
        492689.085, 2492085.44, 32
    ],
}
await fdapi.antenna.update(ap);
fdapi.antenna.focus('ap_1', 100, 1);
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
await fdapi.antenna.updateEnd();
```
