---
title: OceanHeatMap
sidebar_label: OceanHeatMap
description: "OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。"
---

# OceanHeatMap

海洋热力图对象，基于真实海洋数据驱动生成热力图，数据源格式：.tif文件

通过 `api.oceanHeatmap` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。
- **别名 / 不同行业叫法**：海洋热力 / 海温场 / 叶绿素分布 / 海面要素场 / 海洋专题热力。
- **适用行业**：海洋气象、海洋环境、渔业、生态环保、海洋科研
- **使用场景**：
  - 海表温度、盐度、叶绿素分布的专题展示
  - 赤潮、水质监测与预警
  - 海洋环境要素的时序动态
- **注意事项**：
  - 依赖规范的 .tif 栅格数据与色带映射
  - 大范围高分辨率注意性能
  - 时序数据需统一基准与单位



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个OceanHeatMap海洋热力图对象，数据源为.tif文件。 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的OceanHeatMap | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个OceanHeatMap对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取OceanHeatMap的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏OceanHeatMap | 按业务条件隐藏对象 |
| [`show`](#show) | 显示OceanHeatMap | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个OceanHeatMap对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个OceanHeatMap海洋热力图对象，数据源为.tif文件。

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造海洋热力图对象OceanHeatMap的数据对象，可以是Object类型或者Array类型，对于每一个OceanHeatMap对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | OceanHeatMap对象ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `offset` | `array` | 否 | [0, 0, 0] | 可选，海洋热力图的整体偏移，默认值：[0, 0, 0] |
| `collision` | `boolean` | 是 | - | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | [`OceanHeatMapStyle`](/docs/api/types#oceanheatmapstyle) | 是 | - | (`OceanHeatMapStyle`) 海洋热力图的显示样式枚举，支持箭头、流场和海浪三种显示样式，取值详情参考 `OceanHeatMapStyle` |
| `alphaMode` | `number` | 否 | 1 | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用tif数据包含的水深字段自动控制不透明度，默认值：1 |
| `valueFile` | `string` | 是 | - | 必选，海洋热力图tif数据文件路径（水深文件tif），取值示例："C:/tifFile/value.tif"，注意：水深和流速这2个tif文件分辨率必须保持一致 |
| `flowField` | `string` | 是 | - | 必选，海洋热力图tif数据文件路径（流速流向uv文件tif），取值示例："C:/tifFile/uv.tif"，注意：水深和流速这2个tif文件分辨率必须保持一致 |
| `valueRange` | `array` | 否 | - | 可选，水深对应的数值区间，如果不传则系统会自动计算并使用valueFile数据的水深范围 |
| `speedRange` | `array` | 否 | - | 可选，流速范围，如果不传则系统会自动计算并使用flowField数据的速度范围 |
| `alphaGradientValueRange` | `array` | 否 | [0,2] | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |
| `rippleDensity` | `number` | 否 | 1 | 可选，水波纹辐射强度，默认值：1 |
| `rippleTiling` | `number` | 否 | 1 | 可选，水波纹辐射平铺系数，默认值：1 |
| `speedFactor` | `number` | 否 | 1 | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |
| `foamIntensity` | `number` | 否 | 1 | 可选，水泡沫的强度，默认值：1 |
| `waveBrightness` | `number` | 否 | 1 | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |
| `shadowDensity` | `number` | 否 | 1 | 可选，水波纹阴影强度，默认值：1 |
| `arrowColor` | `array` | 是 | - | 箭头的颜色和透明度，示例值：[1,1,1,0.5] |
| `arrowDisplayMode` | `number` | 否 | 0 | 箭头的显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |
| `arrowAlphaMode` | `number` | 否 | 0 | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |
| `particles` | `object` | 否 | - | 可选参数，粒子动态效果对应参数的配置对象 |
| `particles.displayMode` | `number` | 否 | 0 | 可选，粒子的的显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |
| `particles.alphaMode` | `number` | 否 | 0 | 可选，粒子的透明度模式，仅在displayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |
| `particles.color` | `array` | 否 | - | 可选，粒子的颜色和透明度，示例值：[1,1,1,0.5] |
| `particles.num` | `number` | 否 | - | 可选，箭头数量 |
| `particles.speedFactor` | `number` | 否 | - | 可选，速度因子 |
| `particles.sizeScale` | `number` | 否 | - | 可选，尺寸缩放因子 |
| `particles.fadeOpacity` | `number` | 否 | - | 可选，不透明度渐隐系数 |
| `particles.baseRespawnRate` | `number` | 否 | - | 可选，重新生成箭头的基础因子 |
| `particles.respawnSpeedFactor` | `number` | 否 | - | 可选，重新生成箭头的速度因子 |
| `flowVisualization` | `object` | 否 | - | 可选参数，流场可视化效果配置参数对象 |
| `flowVisualization.brightness` | `number` | 否 | - | 可选，亮度 |
| `flowVisualization.noisePuls` | `number` | 否 | - | 可选，脉冲噪声 |
| `flowVisualization.timeSpeed` | `number` | 否 | - | 可选，时间加速因子 |
| `flowVisualization.tilling` | `number` | 否 | - | 可选，平铺因子 |
| `flowVisualization.blendFactor` | `number` | 否 | - | 可选，混合因子 |
| `flowVisualization.renderSpeedRange` | `array` | 否 | - | 可选，流速渲染范围 |
| `lods` | `array` | 否 | - | 可选参数，流场样式下，流场、远景水波纹、近景水波纹、水面浪花的四个显示距离： ![](/img/refdoc/api/OceanHeatMapLods.png) |
| `lods.level` | `number` | 是 | - | 四种显示类型 |
| `lods.distance` | `number` | 是 | - | 透明度开始衰变的相机距离 |
| `colors` | `object` | 是 | - | 海洋热力图自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是 | - | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 是 | - | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 是 | - | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 是 | - | 值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |
| `colors.value` | `number` | 是 | - | 值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求数据结构示例 
        {
            "id": "oceanHeatmap1",
            "offset": [0, 0, 0],
            "collision": true,

            "alphaMode": 1,
            "displayMode": 1,

            "valueRange":[0,0.3],
            "speedRange":[0,0.3],
            "alphaGradientValueRange": [0, 0.3],

            "speedFactor": 500,
            "rippleDensity": 1,
            "rippleTiling": 1,

            "foamIntensity": 3,
            "waveBrightness": 10,
            "shadowIntensity": 1,

            "particles": {
                "alphaMode": 0,
                "color": [0, 0, 0, 1],
                "displayMode": 0,
                "num": 10000,
                "speedFactor": 5000,
                "sizeScale": 0.01,
                "fadeOpacity": 0.95,
                "baseRespawnRate": 0.03,
                "respawnSpeedFactor": 0.02
            },
            "lods": [
                {
                    "level": 1,
                    "distance": 50000,
                },
                {
                    "level": 2,
                    "distance": 100000,
                },
                {
                    "level": 3,
                    "distance": 500000,
                }
                ],
            "flowVisualization": {
                "brightness": 1.0,
                "noisePuls": 0.5,
                "timeSpeed": 0.75,
                "tilling": 0.5,
                "blendFactor": 0.5,
                "renderSpeedRange": [0, 0]
            },

            "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
            "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
            "colors": {
                "gradient": true,
                "invalidColor": [0, 0, 0, 1],
                "colorStops": [{
                        "value": 0,
                        "color": [0.2, 0.4, 0.92, 0]
                },
                    {
                        "value": 0.2,
                        "color": [0.1, 0.85, 0.85, 1]
                },
                    {
                        "value": 0.3,
                        "color": [0.05, 0.9, 0.05, 1]
                },
                    {
                        "value": 0.5,
                        "color": [0.8, 0.8, 0.01, 1]
                },
                    {
                        "value": 1,
                        "color": [1, 0.15, 0.15, 1]
                }]
            }
        }
```

> 示例：Add(流场)

```js
fdapi.oceanHeatmap.clear();
let path = HostConfig.Path;


let oceanHeatmap1 = {
    "id": "oceanHeatmap_tif",
    "offset": [0, 0, 0],
    "collision": true,
    "displayMode": OceanHeatMapStyle.Flow, //流场
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
}

fdapi.oceanHeatmap.add(oceanHeatmap1);
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);
```

> 示例：Add(箭头)

```js
fdapi.oceanHeatmap.clear();
let path = HostConfig.Path;


let oceanHeatmap1 = {
    "id": "oceanHeatmap_tif",
    "offset": [0, 0, 0],
    "collision": true,
    "displayMode": OceanHeatMapStyle.Arrow, //箭头
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
}

fdapi.oceanHeatmap.add(oceanHeatmap1);
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);
```

> 示例：Add(波浪)

```js
fdapi.oceanHeatmap.clear();
let path = HostConfig.Path;


let oceanHeatmap1 = {
    "id": "oceanHeatmap_tif",
    "offset": [0, 0, 0],
    "collision": true,
    "displayMode": OceanHeatMapStyle.Wave, //波浪
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
}

fdapi.oceanHeatmap.add(oceanHeatmap1);
//fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);
```

---

### `clear(fn)` {#clear}

删除场景中所有的OceanHeatMap

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.oceanHeatmap.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个OceanHeatMap对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的OceanHeatMap对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.oceanHeatmap.delete('oceanHeatmap_tif');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | OceanHeatMap对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.oceanHeatmap.focus('oceanHeatmap_tif', 200000);
```

---

### `get(ids, fn)` {#get}

根据ID获取OceanHeatMap的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的OceanHeatMap对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：Get

```js
fdapi.oceanHeatmap.get('oceanHeatmap_tif');
```

---

### `hide(ids, fn)` {#hide}

隐藏OceanHeatMap

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | OceanHeatMap对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.oceanHeatmap.hide('oceanHeatmap_tif');
```

---

### `show(ids, fn)` {#show}

显示OceanHeatMap

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | OceanHeatMap对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.oceanHeatmap.show('oceanHeatmap_tif');
```

---

### `update(data, fn)` {#update}

修改一个或多个OceanHeatMap对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | OceanHeatMap对象或者数组，以下属性支持更新 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 根据OceanHeatMap对象的ID更新以下属性 |
| `valueFile` | `string` | 是 | - | 必选，海洋热力图tif数据文件路径（水深文件tif），取值示例："C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `flowField` | `string` | 是 | - | 必选，海洋热力图tif数据文件路径（流速流向文件tif），取值示例："C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let path = HostConfig.Path;
let oceanHeatmap_update = {
    "id": "oceanHeatmap_tif",
    "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
    "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
}
fdapi.oceanHeatmap.update(oceanHeatmap_update);
```
