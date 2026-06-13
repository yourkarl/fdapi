---
title: HydrodynamicModel
sidebar_label: HydrodynamicModel
description: "二维水动力模型对象，基于真实数据驱动生成水动力模型 一般通过api.HydrodynamicModel调用其方法"
---

# HydrodynamicModel

二维水动力模型对象，基于真实数据驱动生成水动力模型

一般通过api.HydrodynamicModel调用其方法

:::caution 已废弃

过时接口 请使用Hydrodynamic2D类

:::

通过 `api.HydrodynamicModel` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个HydrodynamicModel二维水动力模型对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 构造二维水动力模型对象HydrodynamicModel的数据对象，可以是Object类型或者Array类型，对于每一个HydrodynamicModel对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HydrodynamicModel对象ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `bbox` | `array` | 可选，流体仿真的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `dataSize` | `array` | 可选，二维水动力模型的数据分辨率，取值示例：[X,Y] |
| `valueRange` | `array` | 可选，二维水动力模型颜色插值对应的数值区间 |
| `updateTime` | `number` | 更新动画的插值时间，注意：参数仅更新方法执行时生效 |
| `waterDepth` | `string` | 必选，二维水动力模型bin数据文件路径（水深bin或tif），取值示例："C:/binFile/xxx1.bin"或"C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `flowField` | `string` | 可选，二维水动力模型bin数据文件路径（流速流向bin或tif），取值示例："C:/binFile/xxx2.bin"或"C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `dem` | `string` | 可选，二维水动力模型bin数据文件路径（河道DEM的bin或tif），取值示例："C:/binFile/xxx3.bin" 或"C:/tifFile/xxx3.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 显示样式，取值范围：[0,1]，0水体样式（默认值），1热力样式 |
| `waterColor` | `Color` | 水体颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) . |
| `waveBrightness` | `number` | 水波纹的显示亮度，取值范围：[0,10000]，值越大亮度越高水波纹越明显 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用系统默认值 |
| `alphaComposite` | `boolean` | 是否使用混合透明度，默认：true |
| `arrowColor` | `Color` | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowTiling` | `number` | 箭头平铺系数 |
| `rippleDensity` | `number` | 辐射强度 |
| `rippleTiling` | `number` | 辐射平铺系数 |
| `speedFactor` | `number` | 速度因子 |
| `colors` | `object` | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | `Color` | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | `Color` | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

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

### `clear(fn)`

删除场景中所有的HydrodynamicModel

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.clear();
```

---

### `delete(ids, fn)`

删除一个或多个HydrodynamicModel对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HydrodynamicModel对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.delete(ids);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydrodynamicModel对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.focus(ids, distance, flyTime, rotation);
```

---

### `get(ids, fn)`

根据ID获取HydrodynamicModel的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HydrodynamicModel对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.get(ids);
```

---

### `hide(ids, fn)`

隐藏HydrodynamicModel

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydrodynamicModel对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.hide(ids);
```

---

### `show(ids, fn)`

显示HydrodynamicModel

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydrodynamicModel对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.show(ids);
```

---

### `update(data, fn)`

修改一个或多个HydrodynamicModel对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 构造二维水动力模型对象HydrodynamicModel的数据对象，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.HydrodynamicModel.update(data);
```
