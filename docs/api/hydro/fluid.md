---
title: Fluid
sidebar_label: Fluid
description: "Fluid 在指定包围盒（bbox）内进行实时流体仿真，通过出水点（sources）的位置、流速流向、形状与持续时间驱动水体流动，内置 28 种水样式，用于表达喷涌、漫流、注水等动态流体效果。"
---

# Fluid

Fluid流体仿真对象，实现对流体仿真对象的操作

![](/img/refdoc/api/fluid.png)

通过 `api.fluid` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Fluid 在指定包围盒（bbox）内进行实时流体仿真，三维水流体模拟以非线性浅水方程（Shallow Water Equations, SWE）为核心物理底层，结合真实地形高程数据，打造高真实度、高适配性的实时流体模拟方案。该方案主要针对地表水运动特征研发，适配湖面积水、河道水流、洪涝漫溢、城市雨水径流、自然水域波浪演化等多种液态水环境场景，能够精准复刻水流受地形约束、障碍物阻隔产生的流动、堆积、漫流、回流等物理行为，有效解决传统流体模拟贴合度低、物理失真、地形适配性差等行业痛点。通过出水点（sources）的位置、流速流向、形状与持续时间驱动水体流动，内置 28 种水样式，支持扩展水样式，用于表达喷涌、漫流、注水等动态流体效果。
- **别名 / 不同行业叫法**：流体仿真 / 实时水仿真 / 流体效果；按场景也称“喷水/涌水仿真”“漏水仿真”“注水演示”。
- **适用行业**：智慧水利、应急管理、智慧园区、能源电力（管网/泵站）、智慧城市（管廊给排水）。

- **使用场景**：
  - 管道破裂、阀门涌水、泵站出水等局部喷涌/漏水的实时动态演示。
  - 园区景观喷泉、跌水、注水过程等小范围动态水体展示。
  - 应急演练中模拟某点位持续出水、漫流扩散的视觉过程，配合 duration 控制时长。
  - 城市规划领域：城市内涝风险推演、雨水管网效能验证、低洼区域积水预警分析，辅助优化城市排水系统布局；
  - 景观文旅领域：人工河道、景观湖面、跌水瀑布、音乐喷泉等水景的可视化仿真，预判水景水流状态，优化景观设计方案；
  - 防灾水利领域：河道汛期洪水演进模拟、山洪漫溢范围预测、水库泄洪影响区域推演，为防洪减灾决策提供数据支撑；
  - 三维可视化领域：数字孪生场景中自然水域、动态积水、河道水流的实时渲染，提升数字孪生沙盘、仿真系统的画面真实度。

- **注意事项**：
  - 出水点 sources.bbox 必须落在整体 bbox 范围内，且出水高度不要被模型遮挡（常用射线求交取地形高度再抬高约 1 米）。
  - 出水点 velocity（流速流向）取值范围 [-2,2]，属于效果型模拟而非严格数值水动力；需要真实水深/流场数据驱动时应使用 HydroDynamic2D 等对象。
  - 仿真包围盒过大或出水点过多会增加计算与渲染开销，建议按实际涌水区域控制 bbox 尺度。

## 构造函数

```js
new Fluid()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个流体仿真对象 | 向场景批量添加对象 |
| [`addSource`](#addSource) | 添加一个或多个流体仿真对象的源数据 |  |
| [`clear`](#clear) | 清空场景中所有的流体仿真对象 | 清空全部对象，重置图层 |
| [`continue`](#continue) | 继续流体仿真 |  |
| [`continueSource`](#continueSource) | 继续仿真 |  |
| [`delete`](#delete) | 删除一个或多个流体仿真对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据流体仿真ID获取流体仿真的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏流体仿真 | 按业务条件隐藏对象 |
| [`pause`](#pause) | 暂停流体仿真 | 暂停播放 |
| [`removeSource`](#removeSource) | 移除一个或多个流体仿真对象的源数据 |  |
| [`reset`](#reset) | 重置流体仿真 |  |
| [`show`](#show) | 显示流体仿真 | 按业务条件显示对象 |
| [`stopSource`](#stopSource) | 停止仿真 |  |
| [`update`](#update) | 修改一个或多个流体仿真对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 流体仿真对象的数据结构，可以是Object类型或者Array类型，对于每一个Fluid对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `groupId` | `string` | 可选，Group分组id |
| `userData` | `string` | 可选，用户自定义数据 |
| `bbox` | `bbox` | 流体仿真的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `style` | `number` | 流体样式，共28种水样式，取值范围：[0~27]，样式参考流体的样式预览图 |
| `color` | [`Color`](/docs/api/types#color) | 可选，流体颜色，默认使用style样式自带颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `sources` | `array` | 出水点信息 |
| `sources.id` | `string` | 出水点ID |
| `sources.rotation` | `array` | 出水点旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `sources.bbox` | `array` | 出水点范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，注意：此出水点bbox范围要在流体仿真的bbox范围内，同时高度位置不要被模型遮挡，一般用射线求交接口拿到地形高度再加上1米即可。 |
| `sources.velocity` | `array` | 出水点uv向量（流速、流向），格式：[x,y]，取值范围：[-2,2] |
| `sources.shape` | `number` | 出水点形状，取值范围：[0,1]，0矩形出水点，1圆形出水点 |
| `sources.duration` | `number` | 出水点仿真执行时间，单位：秒，默认值：-1，即一直执行，大于0则按时间执行 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
示例数据结构：

[{
            "id": "ff",
            "bbox": [
                -100,
                -100,
                -1,
                100,
                100,
                2.5
            ],
            "style": 1,
            "sources": [
                {
                    "id": "ff_1",
                    "rotation": [0,0,0],
                    "bbox": [
                        -10,
                        -10,
                        -1,
                        10,
                        10,
                        2.5
                    ],
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：Add

```js
let bbox = [489521.4, 2490091.04, 5, 490561.35000000003, 2490878.4, 33]
fdapi.fluid.delete('ff');
let fluid = {
    "id": "ff",
    "bbox": bbox,
    "style": 8,
    "sources": [
        {
            "id": "ff_1",
            "rotation": [0, 0, 0],
            "bbox": [490211.933125, 2490391.52, 15, 490221.85625, 2490431.04, 33],
            "velocity": [
                0,
                0
            ],
            "shape": 0,
            "duration": -1
        }
    ]
};
fdapi.fluid.add(fluid);
fdapi.fluid.focus(fluid.id, 100, 2);

//开始水体仿真
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": true,
        }]
}];
fdapi.fluid.continueSource(data);
```

---

### `addSource(data, fn)` {#addSource}

添加一个或多个流体仿真对象的源数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的数据结构，可以是Object类型或者Array类型，对于每一个源数据对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 源数据对象的唯一标识符ID |
| `sources` | `array` | 源数据对象源数据 |
| `sources.id` | `string` | id |
| `sources.bbox` | `array` | X、Y方向的包围盒范围，格式：[minX,minY,maxX,maxY]，注意：参数范围不包含高度Z |
| `sources.height` | `number` | 高度 |
| `sources.velocity` | `array` | 速率，格式：[x,y] |
| `sources.shape` | `number` | 形状 |
| `sources.duration` | `number` | 周期 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
示例数据结构：

[{
            "id": "ff",
            "sources": [
                {
                    "id": "f1",
                    "bbox": [
                        -10, 
                        -10,
                        10,
                        10
                    ],
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：AddSource

```js
let data = [{
    "id": "ff",
    "sources": [
        {
            "id": "ff_2",
            "rotation": [0, 45, 0],
            "bbox": [490180.53125, 2490678.5, 22, 490221.34375, 2490719.25, 34],
            "velocity": [
                0,
                0
            ],
            "shape": 1,
            "duration": -1
        }
    ]
}]
fdapi.fluid.addSource(data);

//执行新的出水点
let sourcePlay = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": false, //关闭出水点
        }, {
            "id": "ff_2",
            "active": true,
        },]
}];
fdapi.fluid.continueSource(sourcePlay);
```

---

### `clear(fn)` {#clear}

清空场景中所有的流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.fluid.clear();
```

---

### `continue(ids, fn)` {#continue}

继续流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Continue

```js
fdapi.fluid.continue('ff');
```

---

### `continueSource(data, fn)` {#continueSource}

继续仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ContinueSource

```js
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": true,
        }, {
            "id": "ff_2",
            "active": true,
        },]
}];
fdapi.fluid.continueSource(data);
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的流体仿真对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.fluid.delete('ff');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.fluid.focus('ff');
```

---

### `get(ids, fn)` {#get}

根据流体仿真ID获取流体仿真的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的流体仿真对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回Fluid的详细信息 属性详情参见add方法参数

[{
            "id": "ff",
            "bbox": [
                -100,
                -100,
                -100,
                100,
                100,
                100
            ],
            "style": 0,
            "sources": [
                {
                    "id": "f1",
                    "bbox": [
                        -10,
                        -10,
                        10,
                        10
                    ],
                    "height": 2,
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：Get

```js
fdapi.fluid.get('ff');
```

---

### `hide(ids, fn)` {#hide}

隐藏流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.fluid.hide('ff');
```

---

### `pause(ids, fn)` {#pause}

暂停流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Pause

```js
fdapi.fluid.pause('ff');
```

---

### `removeSource(data, fn)` {#removeSource}

移除一个或多个流体仿真对象的源数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 待移除的源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sourceIds` | `array` | 源数据对象id数组 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
示例数据：
[{
     id: "ff",
     sourceIds: ["f1","f2","f3"]
}]
```

> 示例：RemoveSource

```js
let data = [{
    id: "ff",
    sourceIds: ["ff_1", "ff_2"]
}];
fdapi.fluid.removeSource(data);
```

---

### `reset(ids, fn)` {#reset}

重置流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Reset

```js
fdapi.fluid.reset('ff');
```

---

### `show(ids, fn)` {#show}

显示流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.fluid.show('ff');
```

---

### `stopSource(data, fn)` {#stopSource}

停止仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：StopSource

```js
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": false,
        },
        {
            "id": "ff_2",
            "active": false,
        }]
}];
fdapi.fluid.stopSource(data);
```

---

### `update(data, fn)` {#update}

修改一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 流体仿真对象或对象数组，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `active` | `boolean` | 是否激活仿真 |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |
| `sources.active` | `boolean` | 是否激活 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

`