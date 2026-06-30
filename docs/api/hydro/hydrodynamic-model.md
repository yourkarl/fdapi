---
title: HydrodynamicModel
sidebar_label: HydrodynamicModel
description: "早期版本的二维水动力模型对象，基于真实数据（水深、流速流向、河道 DEM）驱动生成，支持水体/热力样式与流向着色；该对象已废弃，新项目请改用 HydroDynamic2D。"
---

# HydrodynamicModel

二维水动力模型对象，基于真实数据驱动生成水动力模型

:::caution 已废弃

过时接口 请使用Hydrodynamic2D类

:::

通过 `api.HydrodynamicModel` 访问。

---
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HydrodynamicModel 是早期版本的二维水动力模型对象，基于真实数据（水深、流速流向、河道 DEM 的 bin/tif 文件）驱动，支持水体样式与热力样式、流向箭头与调色板着色。**该对象已废弃，新项目请改用 HydroDynamic2D 类。**
- **别名 / 不同行业叫法**：二维水动力模型（旧版）/ 2D 水动力仿真 / 二维洪水演进；等同能力的现行对象为 HydroDynamic2D。
- **适用行业**：智慧水利、应急管理（仅遗留项目维护）。
- **使用场景**：
  - 维护采用 bin/tif 三件套（waterDepth、flowField、dem）数据格式的存量二维水动力工程。
  - 历史项目中二维洪水演进、流场结果的时序回放与水深/热力可视化。
- **注意事项**：
  - 该对象已标记废弃，请迁移到 HydroDynamic2D；waterDepth、flowField、dem 三个 tif 文件分辨率必须一致。
  - 开启 collision 碰撞会影响加载效率；displayMode=0 时 waterColor 生效，热力样式下应配置 colors 调色板与 valueRange。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个HydrodynamicModel二维水动力模型对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的HydrodynamicModel | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个HydrodynamicModel对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取HydrodynamicModel的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏HydrodynamicModel | 按业务条件隐藏对象 |
| [`show`](#show) | 显示HydrodynamicModel | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个HydrodynamicModel对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个HydrodynamicModel二维水动力模型对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造二维水动力模型对象HydrodynamicModel的数据对象，可以是Object类型或者Array类型，对于每一个HydrodynamicModel对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | HydrodynamicModel对象ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `bbox` | `array` | 否 | - | 可选，流体仿真的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `dataSize` | `array` | 否 | - | 可选，二维水动力模型的数据分辨率，取值示例：[X,Y] |
| `valueRange` | `array` | 否 | - | 可选，二维水动力模型颜色插值对应的数值区间 |
| `updateTime` | `number` | 是 | - | 更新动画的插值时间，注意：参数仅更新方法执行时生效 |
| `waterDepth` | `string` | 是 | - | 必选，二维水动力模型bin数据文件路径（水深bin或tif），取值示例："C:/binFile/xxx1.bin"或"C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `flowField` | `string` | 否 | - | 可选，二维水动力模型bin数据文件路径（流速流向bin或tif），取值示例："C:/binFile/xxx2.bin"或"C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `dem` | `string` | 否 | - | 可选，二维水动力模型bin数据文件路径（河道DEM的bin或tif），取值示例："C:/binFile/xxx3.bin" 或"C:/tifFile/xxx3.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `collision` | `boolean` | 是 | - | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 是 | - | 显示样式，取值范围：[0,1]，0水体样式（默认值），1热力样式 |
| `waterColor` | [`Color`](/docs/api/types#color) | 是 | - | 水体颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) . |
| `waveBrightness` | `number` | 是 | - | 水波纹的显示亮度，取值范围：[0,10000]，值越大亮度越高水波纹越明显 |
| `alphaMode` | `number` | 是 | - | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用系统默认值 |
| `alphaComposite` | `boolean` | 是 | - | 是否使用混合透明度，默认：true |
| `arrowColor` | [`Color`](/docs/api/types#color) | 是 | - | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowTiling` | `number` | 是 | - | 箭头平铺系数 |
| `rippleDensity` | `number` | 是 | - | 辐射强度 |
| `rippleTiling` | `number` | 是 | - | 辐射平铺系数 |
| `speedFactor` | `number` | 是 | - | 速度因子 |
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
        "id": "hdm",
        "bbox":  [488670.75, 2488165, 0, 491659.59375, 2490987.5, 344.58],
        "valueRange": [0, 3],
        "dataSize": [3854, 3516],
        "waterDepth":"lgq_wDepth_2023-08-07_11-00.bin",
        "flowField":"velocties.bin",
        "dem":"dem.bin",
        "colors": {
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
        }]
```

---

### `clear(fn)` {#clear}

删除场景中所有的HydrodynamicModel

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个HydrodynamicModel对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的HydrodynamicModel对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
fdapi.hydrodynamicModel2.delete('hdm1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.focus(0, '2秒', [0, 0, 0]);
```

---

### `get(ids, fn)` {#get}

根据ID获取HydrodynamicModel的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的HydrodynamicModel对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例代码如下：

```js
fdapi.hydrodynamicModel2.get('hdm1');
```

---

### `hide(ids, fn)` {#hide}

隐藏HydrodynamicModel

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
fdapi.hydrodynamicModel2.hide('hdm1');
```

---

### `show(ids, fn)` {#show}

显示HydrodynamicModel

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | HydrodynamicModel对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
fdapi.hydrodynamicModel2.show('hdm1');
```

---

### `update(data, fn)` {#update}

修改一个或多个HydrodynamicModel对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造二维水动力模型对象HydrodynamicModel的数据对象，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
let hydrodynamicModel2 = {
    "id": "hdm1",
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
    "time": 2,
    "playTimes": 2,
    "colors": {
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
fdapi.hydrodynamicModel2.update(hydrodynamicModel2);
```
