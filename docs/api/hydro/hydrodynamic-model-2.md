---
title: HydrodynamicModel2
sidebar_label: HydrodynamicModel2
description: "HydrodynamicModel2 是早期的二维水动力模型对象，基于 JSON 数据文件驱动，按时序播放水深/流速等结果并以调色板着色，用于在三维场景中回放二维水动力计算成果。**该对象已废弃、待移除，新项目请改用 HydroDynamic2D 对象。**"
---

# HydrodynamicModel2

二维水动力模型对象，基于真实数据驱动生成水动力模型（过时版本待移除，推荐使用HydrodynamicModel对象）

:::caution 已废弃

过时版本待移除对象

:::

通过 `api.HydrodynamicModel2` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HydrodynamicModel2 是早期的二维水动力模型对象，基于 JSON 数据文件驱动，按时序播放水深/流速等结果并以调色板着色，用于在三维场景中回放二维水动力计算成果。**该对象已废弃、待移除，新项目请改用 HydroDynamic2D 对象。**
- **别名 / 不同行业叫法**：二维水动力模型（旧版）/ 2D 水动力仿真 / 二维洪水演进模型；本对象为过时版本，等同能力请参考 HydroDynamic2D。
- **适用行业**：智慧水利、应急管理（仅遗留项目维护）。
- **使用场景**：
  - 仅用于维护使用旧版 JSON 数据格式的存量水动力回放工程，不建议新建场景采用。
  - 历史项目中二维水动力计算结果（JSON）的时序播放与着色展示。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 该对象已标记废弃、待移除，请勿在新项目中使用，统一迁移到 HydroDynamic2D（支持 tif 栅格与 shp 矢量数据源）。
  - 依赖外部 JSON 数据文件路径，需保证文件可访问；坐标系类型 coordinateType 须与数据一致。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个HydrodynamicModel2二维水动力模型对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的HydrodynamicModel2对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个HydrodynamicModel2对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取HydrodynamicModel2对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏HydrodynamicModel2对象 | 按业务条件隐藏对象 |
| [`pause`](#pause) | 暂停播放 | 暂停播放 |
| [`resume`](#resume) | 恢复播放 | 恢复播放 |
| [`setTime`](#setTime) | 设置HydrodynamicModel2对象的当前播放时刻 |  |
| [`show`](#show) | 显示HydrodynamicModel2对象 | 按业务条件显示对象 |
| [`startPlay`](#startPlay) | 开始从某时刻播放 |  |
| [`stopPlay`](#stopPlay) | 停止播放 |  |
| [`update`](#update) | 修改一个或多个HydrodynamicModel2对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个HydrodynamicModel2二维水动力模型对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造二维水动力模型对象HydrodynamicModel2的数据对象，可以是Object类型或者Array类型，对于每一个HydrodynamicModel2对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | HydrodynamicModel2对象ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinate` | `array` | 是 | - | 二维水动力模型坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |
| `rotation` | `array` | 是 | - | 二维水动力模型旋转方向：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `jsonFilePath` | `string` | 是 | - | 必选，二维水动力模型Json数据文件路径 |
| `displayMode` | `number` | 是 | - | 二维水动力模型有2种显示模式 |
| `time` | `number` | 是 | - | 二维水动力模型的当前播放时刻 |
| `playTimes` | `number` | 是 | - | 二维水动力模型播放速度（倍率） |
| `valueRange` | `array` | 是 | - | 二维水动力模型颜色插值对应的数值区间 |
| `colors` | `object` | 是 | - | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是 | - | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 是 | - | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 是 | - | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 是 | - | 值对应的调色板颜色 |
| `colors.value` | `number` | 是 | - | 值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求数据结构示例 
        [{
            "id": "h1",
            "jsonFilePath": "F:/UnrealProjects/water/out/writeFile.json",
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
            "displayMode": 0,
            "valueRange": [
                0,
                3
            ],
            "time": 1,
            "playTimes": 1,
            "colors":{
                        "gradient":true,
                        "invalidColor": [0,0,0,1],
                        "colorStops":[
                            {
                                "value":0,
                                "color":[0,0,1,1]
                            },
                            {
                                "value":0.25,
                                "color":[0,1,1,1]
                            },
                            {
                                "value":0.5,
                                "color":[0,1,0,1]
                            },
                            {
                                "value":0.75,
                                "color":[1,1,0,1]
                            },
                            {
                                "value":1,
                                "color":[1,0,0,1]
                            }
                        ]
                    }
        }]
```

---

### `clear(fn)` {#clear}

清空场景中所有的HydrodynamicModel2对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个HydrodynamicModel2对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的HydrodynamicModel2对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.delete(['对象ID']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel2对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.focus(0, '2秒', [0, 0, 0]);
```

---

### `get(ids, fn)` {#get}

根据ID获取HydrodynamicModel2对象的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的HydrodynamicModel2对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
HydrodynamicModel2的详细信息
[{
            "id": "h1",
            "jsonFilePath": "F:/UnrealProjects/water/out/writeFile.json",
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
            "displayMode": 0,
            "valueRange": [
                0,
                3
            ],
            "time": 1,
            "playTimes": 1,
            "colors":{
                        "gradient":true,
                        "invalidColor": [0,0,0,1],
                        "colorStops":[
                            {
                                "value":0,
                                "color":[0,0,1,1]
                            },
                            {
                                "value":0.25,
                                "color":[0,1,1,1]
                            },
                            {
                                "value":0.5,
                                "color":[0,1,0,1]
                            },
                            {
                                "value":0.75,
                                "color":[1,1,0,1]
                            },
                            {
                                "value":1,
                                "color":[1,0,0,1]
                            }
                        ]
                    }
        }]
```

---

### `hide(ids, fn)` {#hide}

隐藏HydrodynamicModel2对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel2对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.hide(['对象ID']);
```

---

### `pause(data, fn)` {#pause}

暂停播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 水动力模型对象ID或ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.pause({ id: '对象ID' });
```

---

### `resume(data, fn)` {#resume}

恢复播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 水动力模型对象ID或ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.resume({ id: '对象ID' });
```

---

### `setTime(data, fn)` {#setTime}

设置HydrodynamicModel2对象的当前播放时刻

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 水动力模型控制对象或数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | HydrodynamicModel2对象的唯一标识符ID |
| `displayMode` | `number` | 是 | - | HydrodynamicModel2对象的显示模式 |
| `time` | `number` | 是 | - | 播放的时刻 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.setTime({
    id: '对象ID',
    displayMode: 0,
    time: 0
});
```

---

### `show(ids, fn)` {#show}

显示HydrodynamicModel2对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel2对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.show(['对象ID']);
```

---

### `startPlay(data, fn)` {#startPlay}

开始从某时刻播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 水动力模型控制对象或数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | HydrodynamicModel2对象的唯一标识符ID |
| `displayMode` | `number` | 是 | - | HydrodynamicModel2对象的显示模式 |
| `time` | `number` | 是 | - | 开始播放的时刻 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.startPlay({
    id: '对象ID',
    displayMode: 0,
    time: 0
});
```

---

### `stopPlay(data, fn)` {#stopPlay}

停止播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 水动力模型对象ID或ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.stopPlay({ id: '对象ID' });
```

---

### `update(data, fn)` {#update}

修改一个或多个HydrodynamicModel2对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造二维水动力模型对象HydrodynamicModel2的数据对象，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel2.update({ id: '对象ID' });
```
