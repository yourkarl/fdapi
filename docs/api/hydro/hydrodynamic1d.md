---
title: HydroDynamic1D
sidebar_label: HydroDynamic1D
description: "HydroDynamic1D 是一维水动力模型对象，沿河道中心线以采样点（坐标、河道宽度、流速、热力值）描述河道，生成带流向箭头与水面/热力样式的动态河道，可用 shp 文件裁切河道范围，适合表达带状河流的水流与水文属性。"
---

# HydroDynamic1D

HydroDynamic1D类

通过 `api.hydrodynamic1d` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HydroDynamic1D 是一维水动力模型对象，沿河道中心线以采样点（坐标、河道宽度、流速、热力值）描述河道，生成带流向箭头与水面/热力样式的动态河道，可用 shp 文件裁切河道范围，适合表达带状河流的水流与水文属性。
- **别名 / 不同行业叫法**：一维水动力 / 河道仿真 / 河网演进 / 一维河道模型；旧版等价对象为 River 类。
- **适用行业**：智慧水利、应急管理、智慧城市（河道治理）、智慧交通（航道/桥梁河段）、生态环境。
- **使用场景**：
  - 河道、河网的流速流向动态可视化，配合采样点 speed 展示沿程流速变化。
  - 防汛中干支流河道水流演进与流向箭头展示，辅助研判行洪态势。
  - 河道水文属性（热力值）沿程分布的热力样式展示，如流速、水位等指标着色。
- **注意事项**：
  - 通过 points 采样点（coordinate/width/speed）定义河道，需保证采样点顺序沿河道走向、宽度合理，避免河道扭曲。
  - 可用 shpFilePath 对河道采样点做裁切，注意坐标系类型 coordinateType 与数据一致；开启 collision 会影响加载效率。
  - 属于一维带状河道模型，面状大范围淹没/漫滩应使用 HydroDynamic2D；River 为本对象旧版，新项目优先用 HydroDynamic1D。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个HydroDynamic1D对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的HydroDynamic1D | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个HydroDynamic1D对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取HydroDynamic1D的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏HydroDynamic1D | 按业务条件隐藏对象 |
| [`show`](#show) | 显示HydroDynamic1D | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个HydroDynamic1D对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个HydroDynamic1D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HydroDynamic1D数据，可以是Object类型或者Array类型，对于每一个HydroDynamic1D，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 显示模式，取值范围：[0,1]，0水样式（默认值），1热力样式 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用系统默认值 |
| `waterMode` | `number` | 水面显示模式，枚举类型，详情请参考 `WaterMode` |
| `waveBrightness` | `number` | 水波纹的显示亮度，取值范围：[0,10000]，值越大亮度越高水波纹越明显 |
| `waterColor` | [`Color`](/docs/api/types#color) | 水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响） |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 箭头颜色和透明度，仅在arrowDisplayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `arrowColors.value` | `number` | 值 |
| `arrowTiling` | `number` | 箭头平铺方式 |
| `speedFactor` | `number` | 速度因子 |
| `rippleDensity` | `number` | 辐射强度 |
| `rippleTiling` | `number` | 辐射平铺系数 |
| `updateTime` | `number` | 更新动画的插值时间，注意：仅在update()方法执行时生效 |
| `shpFilePath` | `string` | 裁切河道使用的shp文件路径，即使用此shp文件对河道采样点进行裁切，推荐使用@path 文件格式类型路径 |
| `points` | `array` | 河道信息对象数据，包含采样点坐标、河道宽度和采样点位置流速和采样点位置热力值（水文业务属性），数组包含的对象结构如下： |
| `points.coordinate` | `array` | 采样点对应坐标位置，取值：[x, y, z] |
| `points.width` | `number` | 采样点对应的河道宽度 |
| `points.speed` | `number` | 可选，采样点对应的流速，单位：米/秒 |
| `points.heatValue` | `number` | 可选，采样点对应的热力值（即水深、污染浓度、流量、流速等水文属性），用来控制热力样式的颜色，对应colors调色板的value值 |
| `speedRange` | `array` | 河道流速的范围，取值示例：[speedMin, speedMax] |
| `valueRange` | `array` | 河道热力值的范围，取值示例：[heatValueMin, heatValueMax] |
| `colors` | `object` | 河道热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

> 示例：Add

```js
let url = "http://" + HostConfig.Player + '/assets/zuq/times.json';
queryUrl(url).then(res => {
    let promises = []

    var times = res.times;
    for (var i = 0; i < times.length; i++) {
        let qurl = "http://" + HostConfig.Player + '/assets/zuq/' + times[i];
        promises.push(queryUrl(qurl));
    }

    Promise.all(promises).then(res1 => {
        riverPoints = res1;
        fdapi.hydrodynamic1d.delete('hydrodynamic1d');
        let hydrodynamic1d = {
            "id": "hydrodynamic1d",
            "points": riverPoints[0].points,
            "collision": false,
            "displayMode": 0,
            "waterMode": 1,
            "waveBrightness": 10,
            "waterColor": [0.203922, 0.262745, 0.286275, 1],
            "arrowDisplayMode": 1,
            "arrowAlphaMode": 0,
            "speedRange": [0, 1.24],
            "valueRange": [0, 3500],
            "arrowColor": [0, 0, 0, 1],
            "arrowTiling": 1,
            "speedFactor": 1,
            "rippleTiling": 1,
            "rippleDensity": 1,
            "arrowColors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.9,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1.24,
                    "color": [1, 0, 0, 1]
                }
                ]
            },
            "colors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 1000,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 2500,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 3000,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 3500,
                    "color": [1, 0, 0, 1]
                }
                ]
            }

        };
        fdapi.hydrodynamic1d.add(hydrodynamic1d);
        fdapi.hydrodynamic1d.focus('hydrodynamic1d', 10000, 2);
    });
});
```

---

### `clear(fn)` {#clear}

删除场景中所有的HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.hydrodynamic1d.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个HydroDynamic1D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HydroDynamic1D对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.hydrodynamic1d.delete('hydrodynamic1d');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.hydrodynamic1d.focus('hydrodynamic1d', 12000, 2);
```

---

### `get(ids, fn)` {#get}

根据ID获取HydroDynamic1D的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HydroDynamic1D对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Get

```js
fdapi.hydrodynamic1d.get('hydrodynamic1d');
```

---

### `hide(ids, fn)` {#hide}

隐藏HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.hydrodynamic1d.hide('hydrodynamic1d');
```

---

### `show(ids, fn)` {#show}

显示HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.hydrodynamic1d.show('hydrodynamic1d');
```

---

### `update(data, fn)` {#update}

修改一个或多个HydroDynamic1D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HydroDynamic1D数据，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据HydroDynamic1D对象的ID更新以下属性 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，注意：仅在update()方法执行时生效 |
| `points` | `array` | 河道信息对象数据，包含采样点坐标、河道宽度和采样点流速和流向，数组包含的对象结构如下： |
| `points.coordinate` | `array` | 采样点对应坐标位置，取值：[x, y, z] |
| `points.width` | `number` | 采样点对应的河道宽度 |
| `points.speed` | `number` | 可选，采样点对应的流速，单位：米/秒 |
| `points.heatValue` | `number` | 可选，采样点对应的热力值（即水深、污染浓度、流量、流速等水文属性），用来控制热力样式的颜色，对应colors调色板的value值 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 显示模式，取值范围：[0,1]，0水样式（默认值），1热力样式 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用系统默认值 |
| `waterMode` | `number` | 水面显示模式，枚举类型，详情请参考 `WaterMode` |
| `waveBrightness` | `number` | 水波纹的显示亮度，取值范围：[0,10000]，值越大亮度越高水波纹越明显 |
| `waterColor` | [`Color`](/docs/api/types#color) | 水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响） |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 箭头颜色和透明度，仅在arrowDisplayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `arrowColors.value` | `number` | 值 |
| `arrowTiling` | `number` | 箭头平铺方式 |
| `speedFactor` | `number` | 速度因子 |
| `rippleDensity` | `number` | 辐射强度 |
| `rippleTiling` | `number` | 辐射平铺系数 |
| `speedRange` | `array` | 河道流速的范围，取值示例：[speedMin, speedMax] |
| `valueRange` | `array` | 河道热力值的范围，取值示例：[heatValueMin, heatValueMax] |
| `colors` | `object` | 河道热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

> 示例：Update

```js
if (myTimeinterval != null) {
    clearInterval(myTimeinterval);
    myTimeinterval = null;
}

let startIndex = 1;
if (riverPoints) {
    //每5秒更新一次
    myTimeinterval = setInterval(function () {
        startIndex++;

        let hydrodynamic1d = {
            "id": "hydrodynamic1d",
            "points": riverPoints[startIndex].points,
            "collision": false,
            "displayMode": 1,
            "arrowDisplayMode": 1,
            "arrowAlphaMode": 0,
            "speedRange": [0, 1.24],
            "valueRange": [0, 3500],
            "arrowColor": [0, 0, 0, 1],
            "arrowTiling": 1,
            "speedFactor": 1,
            "rippleTiling": 1,
            "rippleDensity": 1,
            "arrowColors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.9,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1.24,
                    "color": [1, 0, 0, 1]
                }
                ]
            },
            "colors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 1000,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 2500,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 3000,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 3500,
                    "color": [1, 0, 0, 1]
                }
                ]
            }

        };
        fdapi.hydrodynamic1d.add(hydrodynamic1d);
        fdapi.hydrodynamic1d.focus('hydrodynamic1d', 10000, 2);
    });
});
```

---

### `clear(fn)`

删除场景中所有的HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.hydrodynamic1d.clear();
```

---

### `delete(ids, fn)`

删除一个或多个HydroDynamic1D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HydroDynamic1D对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.hydrodynamic1d.delete('hydrodynamic1d');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.hydrodynamic1d.focus('hydrodynamic1d', 12000, 2);
```

---

### `get(ids, fn)`

根据ID获取HydroDynamic1D的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HydroDynamic1D对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Get

```js
fdapi.hydrodynamic1d.get('hydrodynamic1d');
```

---

### `hide(ids, fn)`

隐藏HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.hydrodynamic1d.hide('hydrodynamic1d');
```

---

### `show(ids, fn)`

显示HydroDynamic1D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic1D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.hydrodynamic1d.show('hydrodynamic1d');
```

---

### `update(data, fn)`

修改一个或多个HydroDynamic1D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HydroDynamic1D数据，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据HydroDynamic1D对象的ID更新以下属性 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，注意：仅在update()方法执行时生效 |
| `points` | `array` | 河道信息对象数据，包含采样点坐标、河道宽度和采样点流速和流向，数组包含的对象结构如下： |
| `points.coordinate` | `array` | 采样点对应坐标位置，取值：[x, y, z] |
| `points.width` | `number` | 采样点对应的河道宽度 |
| `points.speed` | `number` | 可选，采样点对应的流速，单位：米/秒 |
| `points.heatValue` | `number` | 可选，采样点对应的热力值（即水深、污染浓度、流量、流速等水文属性），用来控制热力样式的颜色，对应colors调色板的value值 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | `number` | 显示模式，取值范围：[0,1]，0水样式（默认值），1热力样式 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用系统默认值 |
| `waterMode` | `number` | 水面显示模式，枚举类型，详情请参考 `WaterMode` |
| `waveBrightness` | `number` | 水波纹的显示亮度，取值范围：[0,10000]，值越大亮度越高水波纹越明显 |
| `waterColor` | `Color` | 水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响） |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度 |
| `arrowColor` | `Color` | 箭头颜色和透明度，仅在arrowDisplayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | `Color` | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | `Color` | 值对应的调色板颜色 |
| `arrowColors.value` | `number` | 值 |
| `arrowTiling` | `number` | 箭头平铺方式 |
| `speedFactor` | `number` | 速度因子 |
| `rippleDensity` | `number` | 辐射强度 |
| `rippleTiling` | `number` | 辐射平铺系数 |
| `speedRange` | `array` | 河道流速的范围，取值示例：[speedMin, speedMax] |
| `valueRange` | `array` | 河道热力值的范围，取值示例：[heatValueMin, heatValueMax] |
| `colors` | `object` | 河道热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | `Color` | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | `Color` | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |

> 示例：Update

```js
if (myTimeinterval != null) {
    clearInterval(myTimeinterval);
    myTimeinterval = null;
}

let startIndex = 1;
if (riverPoints) {
    //每5秒更新一次
    myTimeinterval = setInterval(function () {
        startIndex++;

        let hydrodynamic1d = {
            "id": "hydrodynamic1d",
            "points": riverPoints[startIndex].points,
            "collision": false,
            "displayMode": 1,
            "arrowDisplayMode": 1,
            "arrowAlphaMode": 0,
            "speedRange": [0, 1.24],
            "valueRange": [0, 3500],
            "arrowColor": [0, 0, 0, 1],
            "arrowTiling": 1,
            "speedFactor": 1,
            "rippleTiling": 1,
            "rippleDensity": 1,
            "arrowColors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.9,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1.24,
                    "color": [1, 0, 0, 1]
                }
                ]
            },
            "colors": {
                "gradient": true,
                "invalidColor": [1, 1, 1, 1],
                "colorStops": [{
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 1000,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 2500,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 3000,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 3500,
                    "color": [1, 0, 0, 1]
                }
                ]
            }

        };
        fdapi.hydrodynamic1d.update(hydrodynamic1d);

        //停止定时器
        if (startIndex == riverPoints.length) {
            clearInterval(myTimeinterval);
            myTimeinterval = null;
        }
    }, 2000);
}
```
