---
slug: /api/weather/weather
title: Weather
sidebar_label: Weather
description: "Weather 设置与获取场景的天气/气象效果（晴雨雪雾、时间、光照等环境特效）。"
---

# Weather

Weather 设置与获取场景的天气/气象效果（晴雨雪雾、时间、光照等环境特效）。

通过 `api.weather` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Weather 设置与获取场景的天气/气象效果（晴雨雪雾、时间、光照等环境特效）。
- **别名 / 不同行业叫法**：天气 / 气象 / 环境特效 / 天气系统 / 晴雨雪雾。
- **适用行业**：智慧城市、应急（恶劣天气演练）、智慧交通、文旅、智慧水利、低空经济
- **使用场景**：
  - 场景昼夜与天气切换以增强真实感
  - 暴雨、大雾等恶劣天气下的业务演练
  - 时间与光照联动的场景氛围
  - 对接航空气象实时数据的同步仿真（晴 / 多云 / 雨 / 雪 / 雾 / 雷电 6 类），配合 setDateTime / simulateTime 做 24 小时昼夜时光与时段推演。
- **注意事项**：
  - 雨雪雾等特效有性能开销
  - 与后期、光照设置相互影响
  - 过强特效会影响业务要素的辨识



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`disableRainSnow`](#disableRainSnow) | 关闭雨雪效果 |  |
| [`getDateTime`](#getDateTime) | 获取日期时间 |  |
| [`getOceanWave`](#getOceanWave) | 查询海浪效果参数 |  |
| [`getParams`](#getParams) | 获取天气相关的参数 |  |
| [`setAmbientLightIntensity`](#setAmbientLightIntensity) | 设置环境光强度 |  |
| [`setCloudDensity`](#setCloudDensity) | 设置云层的密度 |  |
| [`setCloudParam`](#setCloudParam) | 设置云效参数 |  |
| [`setCloudThickness`](#setCloudThickness) | 设置云层的厚度 |  |
| [`setDarkMode`](#setDarkMode) | 设置是否进入黑暗模式 |  |
| [`setDateTime`](#setDateTime) | 设置日期时间 |  |
| [`setEarthCloudIntensity`](#setEarthCloudIntensity) | 球面工程坐标系下，设置地球大气云层的亮度 |  |
| [`setEarthNightLightIntensity`](#setEarthNightLightIntensity) | 球面工程坐标系下，设置地球夜晚灯光的亮度 |  |
| [`setEarthStarBackgroundIntensity`](#setEarthStarBackgroundIntensity) | 球面工程坐标系下，设置星空背景的亮度 |  |
| [`setFogParam`](#setFogParam) | 设置雾效参数。 |  |
| [`setHighCloud`](#setHighCloud) | 设置高云层效果参数 |  |
| [`setLowCloud`](#setLowCloud) | 设置低云层效果参数 |  |
| [`setMoonIntensity`](#setMoonIntensity) | 设置月亮光照强度 |  |
| [`setMoonSize`](#setMoonSize) | 设置月亮尺寸 |  |
| [`setOceanWave`](#setOceanWave) | 设置海浪效果参数 |  |
| [`setRainParam`](#setRainParam) | 设置雨效。 |  |
| [`setRayleighScatter`](#setRayleighScatter) | 设置大气环境的瑞利散射系数 |  |
| [`setShadowDistance`](#setShadowDistance) | 设置阴影可视距离，即相机镜头距离物体阴影的距离 |  |
| [`setShadowIntensity`](#setShadowIntensity) | 设置阴影强度，值越大表示阴影越强 |  |
| [`setShadowQuality`](#setShadowQuality) | 设置阴影质量，值越大表示阴影越精细，但也越消耗显卡性能 |  |
| [`setSkyVisibleMaxHeight`](#setSkyVisibleMaxHeight) | 设置天空球效果的失效高度，默认值：50000米(50公里) |  |
| [`setSnowParam`](#setSnowParam) | 设置雪效。 |  |
| [`setSunColor`](#setSunColor) | 设置太阳颜色 |  |
| [`setSunIntensity`](#setSunIntensity) | 设置太阳光照射强度 |  |
| [`setSunSize`](#setSunSize) | 设置太阳尺寸 |  |
| [`setTemperature`](#setTemperature) | 设置色温值 |  |
| [`simulateTime`](#simulateTime) | 模拟时间播放 |  |

## 方法（Methods）

### `disableRainSnow(fn)` {#disableRainSnow}

关闭雨雪效果

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：禁用雨雪效果：DisableRainSnow

```js
fdapi.weather.disableRainSnow();
```

---

### `getDateTime(fn)` {#getDateTime}

获取日期时间

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
获取的日期时间
{
            "hour":	9, // 时
            "minute":	0, // 分
            "year":	2021, // 年
            "month":	10, // 月
            "day":	28, // 日
            "latitude":	20.000000, // 经度
            "longitude":	116.000000, // 维度
            "timeZone":	8.000000, // 时区
            "daynightLoop":	0, // 是否日夜循环，0关闭 1开启
            "dayLength":	3.000000 //模拟时长，即几分钟模拟循环一天，仅在开启日夜循环后生效
        }
```

> 示例：获取日期时间：GetDateTime

```js
fdapi.weather.getDateTime();
```

---

### `getOceanWave(fn)` {#getOceanWave}

查询海浪效果参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：查询海浪参数：GetOceanWave

```js
fdapi.weather.getOceanWave();
```

---

### `getParams(fn)` {#getParams}

获取天气相关的参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
获取的天气参数
{
        "darkMode":	0, //是否黑暗模式，0关闭 1打开
        "cloudDensity":	0.500000, //云层密度，取值范围：[0~1.0]
        "cloudThickness": 2.00000, //云层厚度，取值范围：[0~20.0]
        "fogDensity":	0.100000, //整体雾浓度，取值范围:[0~1.0]
        "fogGroundDensity":	0.000000, //地面雾浓度，取值范围:[0~1.0]
        "fogGroundHeight":	0.000000, //地面雾高度，取值范围:[0~10]（单位KM）
        "rainsnow":	0, //是否雨雪效果，0关闭 1打开
        "rainsnowStrength":	0.000000, //雨雪强度（必须大于0，才会有下雨效果），取值范围:[0~1.0]
        "rainsnowSpeed":	0.300000, //雨雪速度，取值范围:[0~10]
        "raindropSize":	0.200000, //雨滴大小，取值范围:[0~5]
        "snowflakeSize":	0.800000, //雪花大小，取值范围:[0~25]
        "sunSize": 25, //太阳尺寸，取值范围:[0~100]
        "sunColor": [1,1,1,1], //太阳尺寸，取值范围:[0~100]
        "moonSize": 30,//月亮尺寸，取值范围:[0~100]
        "sunIntensity": 0.7,//太阳光照射强度，取值范围:[0~10]
        "moonIntensity": 30,//月亮光照射强度，取值范围:[0~100]
        "ambientLightIntensity": 0.3,//环境光强度，取值范围:[0~10]
        "temperature": 8500,//色温值，取值范围:[1700~12000]
        "shadowQuality": 2,//阴影质量，取值范围：[1~5]
        "shadowDistance": 2000,//阴影可视距离，取值范围:[0~任意正数]，单位：米
        }
```

> 示例：获取天气参数：GetParams

```js
fdapi.weather.getParams();
```

---

### `setAmbientLightIntensity(ambientLightIntensity, fn)` {#setAmbientLightIntensity}

设置环境光强度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ambientLightIntensity` | `number` | 是 | - | 环境光强度，取值范围:[0~5] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置环境光强度：SetAmbientLightIntensity

```js
fdapi.weather.setAmbientLightIntensity(0.3);
```

---

### `setCloudDensity(cloudDensity, fn)` {#setCloudDensity}

设置云层的密度



![Weather · setCloudDensity(cloudDensity, fn) 示意](/img/refdoc/api/Weather.SetCloudDensity.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `cloudDensity` | `number` | 是 | - | 云层密度，取值范围：[0~1.0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置云层密度：SetCloudDensity

```js
fdapi.weather.setCloudDensity(0.8);
```

---

### `setCloudParam(cloudsColor, cloudsAltitude, cloudShadowStrength, fn)` {#setCloudParam}

设置云效参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `cloudsColor` | `number` | 是 | - | 云层颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `cloudsAltitude` | `number` | 是 | - | 云层海拔高度，单位：千米/km，取值范围：[0~8km] |
| `cloudShadowStrength` | `number` | 是 | - | 云层阴影，取值范围:[0~1] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置云效参数：SetCloudParam

```js
fdapi.weather.setCloudParam("#FFFFFF", 2, 0.5);
```

---

### `setCloudThickness(cloudThickness, fn)` {#setCloudThickness}

设置云层的厚度



![Weather · setCloudThickness(cloudThickness, fn) 示意](/img/refdoc/api/Weather.SetCloudDensity.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `cloudThickness` | `number` | 是 | - | 云层厚度，取值范围：[0~0.5] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置云层厚度：SetCloudThickness

```js
fdapi.weather.setCloudThickness(2);
```

---

### `setDarkMode(bDark, fn)` {#setDarkMode}

设置是否进入黑暗模式  效果图：



![Weather · setDarkMode(bDark, fn) 示意](/img/refdoc/api/Weather.SetDarkMode.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bDark` | `boolean` | 是 | - | 布尔值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置黑暗模式：SetDarkMode

```js
__isDarkMode = !__isDarkMode;
fdapi.weather.setDarkMode(__isDarkMode);
```

---

### `setDateTime(year, month, day, hour, minute, daynightLoop, fn)` {#setDateTime}

设置日期时间



![Weather · setDateTime(year, month, day, hour, minute, daynightLoop, fn) 示意](/img/refdoc/api/Settings.SetDateTime.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `year` | `number` | 是 | - | 年 |
| `month` | `number` | 是 | - | 月 |
| `day` | `number` | 是 | - | 日 |
| `hour` | `number` | 是 | - | 时 |
| `minute` | `number` | 是 | - | 分 |
| `daynightLoop` | `boolean` | 是 | - | 是否日夜循环 如果为true 则三分钟模拟循环一天 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置日期时间：SetDateTime

```js
fdapi.weather.setDateTime(2020, 9, 9, 16, 8, false);
```

---

### `setEarthCloudIntensity(earthCloudIntensity, fn)` {#setEarthCloudIntensity}

球面工程坐标系下，设置地球大气云层的亮度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `earthCloudIntensity` | `number` | 否 | 0 | 地球大气云层的亮度，默认值：0，取值范围：[0~1]，设置0则隐藏云层 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.weather.setEarthCloudIntensity(0);
```

---

### `setEarthNightLightIntensity(earthNightLightIntensity, fn)` {#setEarthNightLightIntensity}

球面工程坐标系下，设置地球夜晚灯光的亮度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `earthNightLightIntensity` | `number` | 否 | 0 | 地球夜晚灯光的亮度，默认值：0，取值范围：[0~1]，设置0则关闭灯光 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.weather.setEarthNightLightIntensity(0);
```

---

### `setEarthStarBackgroundIntensity(earthStarBackgroundIntensity, fn)` {#setEarthStarBackgroundIntensity}

球面工程坐标系下，设置星空背景的亮度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `earthStarBackgroundIntensity` | `number` | 否 | 0 | 星空背景的亮度，默认值：0，取值范围：[0~1]，设置0则关闭星空背景亮度 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.weather.setEarthStarBackgroundIntensity(0);
```

---

### `setFogParam(fogDensity, fogColor, fogHeightFalloff, fogStartDistance, fogOpacity, fn)` {#setFogParam}

设置雾效参数。 效果图：



![Weather · setFogParam(fogDensity, fogColor, fogHeightFalloff, fogStartDistance, fogOpacity, fn) 示意](/img/refdoc/api/Weather.SetFogParam.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fogDensity` | `number` | 是 | - | 雾的浓度，取值范围:[0~2.0] |
| `fogColor` | `number` | 是 | - | 雾的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fogHeightFalloff` | `number` | 是 | - | 高度衰减，取值范围:[0~2] |
| `fogStartDistance` | `number` | 是 | - | 起雾距离，取值范围:[0~10000] |
| `fogOpacity` | `number` | 是 | - | 透明度，取值范围:[0.00~1.00] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置雾效：SetFogParam

```js
fdapi.weather.setFogParam(0.1, [1, 1, 1, 1], 0.05, 10, 0.2);
```

---

### `setHighCloud(highCloudLayerCoverage, highCloudWindSpeed, highCloudWindDirection, cirrusCloudDensity, cirrostratusCloudDensity, cirrocumulusCloudDensity, fn)` {#setHighCloud}

设置高云层效果参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `highCloudLayerCoverage` | `number` | 是 | - | 密度，取值范围：[0~1] |
| `highCloudWindSpeed` | `number` | 是 | - | 风速，取值范围：[0~100] |
| `highCloudWindDirection` | `number` | 是 | - | 风向，取值范围：[0~360] |
| `cirrusCloudDensity` | `number` | 是 | - | 卷云密度，取值范围：[0~1] |
| `cirrostratusCloudDensity` | `number` | 是 | - | 卷层云密度，取值范围：[0~1] |
| `cirrocumulusCloudDensity` | `number` | 是 | - | 卷积云密度，取值范围：[0~1] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置高云层参数：SetHighCloud

```js
fdapi.weather.setHighCloud(0.5, 50, 180, 0.5, 0.5, 0.5);
```

---

### `setLowCloud(lowCloudCoverage, lowCloudDensity, lowCloudHeight, lowCloudWindSpeed, lowCloudWindDirection, fn)` {#setLowCloud}

设置低云层效果参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `lowCloudCoverage` | `number` | 是 | - | 覆盖率，取值范围：[0~1] |
| `lowCloudDensity` | `number` | 是 | - | 密度，取值范围：[0~1] |
| `lowCloudHeight` | `number` | 是 | - | 厚度，取值范围：[0~0.5] |
| `lowCloudWindSpeed` | `number` | 是 | - | 风速，取值范围：[0~100] |
| `lowCloudWindDirection` | `number` | 是 | - | 风向，取值范围：[0~360] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置低云层参数：SetLowCloud

```js
fdapi.weather.setLowCloud(0.5, 0.5, 0.25, 50, 180);
```

---

### `setMoonIntensity(moonIntensity, fn)` {#setMoonIntensity}

设置月亮光照强度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `moonIntensity` | `number` | 是 | - | 月亮光照强度，取值范围:[0~1] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置月亮光照强度：SetMoonIntensity

```js
fdapi.weather.setMoonIntensity(0.5);
```

---

### `setMoonSize(moonSize, fn)` {#setMoonSize}

设置月亮尺寸

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `moonSize` | `number` | 是 | - | 月亮尺寸，取值范围:[0~10] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置月亮尺寸：SetMoonSize

```js
fdapi.weather.setMoonSize(6);
```

---

### `setOceanWave(options, fn)` {#setOceanWave}

设置海浪效果参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 海浪效果的相关参数如下： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `scale` | `number` | 否 | 1 | 海浪起伏整体的缩放倍率（包括以下波长、振幅和速度参数），默认值：1 |
| `length` | `number` | 否 | 6米 | 海浪的波长，值越大海面越平静，默认值：6米 |
| `amplitude` | `number` | 否 | 4.2米 | 海浪的振幅，值越大上下起伏越大，默认值：4.2米 |
| `speed` | `number` | 否 | 9 | 海浪的运动速度倍率，值越大海浪运动越快，默认值：9 |
| `formDensity` | `number` | 否 | 0.2 | 海浪泡沫的强度，默认值：0.2，取值范围：[0,1] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置海浪参数：SetOceanWave

```js
let options = {
    scale: 1, //海浪整体缩放
    length: 6, //波长
    amplitude: 4.2, //振幅
    speed: 9, //运动速率
    formDensity: 0.5 //泡沫强度

}
fdapi.weather.setOceanWave(options);
```

---

### `setRainParam(strength, speed, raindropSize, rainColor, alignCamera, overcastStrength, fn)` {#setRainParam}

设置雨效。注意：开启雨效前需先设置云层的厚度和密度，效果图：



![Weather · setRainParam(strength, speed, raindropSize, rainColor, alignCamera, overcastStrength, fn) 示意](/img/refdoc/api/Weather.SetRainParam.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `strength` | `number` | 是 | - | 雨效强度（必须大于0，才会有下雨效果），取值范围:[0~1.0] |
| `speed` | `number` | 是 | - | 雨效速度，取值范围:[0~1.0] |
| `raindropSize` | `number` | 是 | - | 雨滴大小，取值范围:[0~1.0] |
| `rainColor` | [`Color`](/docs/api/types#color) | 是 | - | 雨滴颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `alignCamera` | `number` | 是 | - | 相机移动对齐，取值范围:[0~1.0] |
| `overcastStrength` | `number` | 是 | - | 阴天程度，取值范围:[0~1.0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置下雨效果：SetRainParam

```js
//设置云层厚度
fdapi.weather.setCloudThickness(2);
//设置完云层厚度后才能开启雨效
fdapi.weather.setRainParam(1, 1, 1, [0.5, 0.5, 0.5, 0.1], 0.5, 0.5);
```

---

### `setRayleighScatter(rayleighScatter, fn)` {#setRayleighScatter}

设置大气环境的瑞利散射系数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `rayleighScatter` | `number` | 否 | 0.04 | 大气的瑞利散射系数，取值范围：[0~2]，默认值：0.04 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.weather.setRayleighScatter(0.04);
```

---

### `setShadowDistance(shadowDistance, fn)` {#setShadowDistance}

设置阴影可视距离，即相机镜头距离物体阴影的距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `shadowDistance` | `number` | 是 | - | 阴影可视距离，取值范围:[10~30000]，单位：米 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置阴影可视距离：SetShadowDistance

```js
fdapi.weather.setShadowDistance(2000);
```

---

### `setShadowIntensity(shadowIntensity, fn)` {#setShadowIntensity}

设置阴影强度，值越大表示阴影越强

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `shadowIntensity` | `number` | 是 | - | 阴影强度，取值范围：[0.00~1.00] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置阴影强度：SetShadowIntensity

```js
fdapi.weather.setShadowIntensity(0.5);
```

---

### `setShadowQuality(shadowQuality, fn)` {#setShadowQuality}

设置阴影质量，值越大表示阴影越精细，但也越消耗显卡性能

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `shadowQuality` | `number` | 是 | - | 阴影质量，取值范围：[1~5] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置阴影质量：SetShadowQuality

```js
fdapi.weather.setShadowQuality(2);
```

---

### `setSkyVisibleMaxHeight(maxHeight, fn)` {#setSkyVisibleMaxHeight}

设置天空球效果的失效高度，默认值：50000米(50公里)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `maxHeight` | `number` | 是 | - | 控制天空显示的最大相机高度，相机位置的Z值超过此高度则进入黑暗模式 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置天空球效果的失效高度：SetSkyVisibleMaxHeight

```js
fdapi.weather.setSkyVisibleMaxHeight(50000);
```

---

### `setSnowParam(strength, speed, snowflakeSize, snowColor, alignCamera, overcastStrength, fn)` {#setSnowParam}

设置雪效。注意：开启雪效前需先设置云层的厚度和密度，效果图：



![Weather · setSnowParam(strength, speed, snowflakeSize, snowColor, alignCamera, overcastStrength, fn) 示意](/img/refdoc/api/Weather.SetSnowParam.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `strength` | `number` | 是 | - | 雪效强度（必须大于0，才会有下雪效果），取值范围:[0~1.0] |
| `speed` | `number` | 是 | - | 雪效速度，取值范围:[0~1.0] |
| `snowflakeSize` | `number` | 是 | - | 雪花大小，取值范围:[0~1.0] |
| `snowColor` | [`Color`](/docs/api/types#color) | 是 | - | 雪花颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `alignCamera` | `number` | 是 | - | 相机移动对齐，取值范围:[0~1.0] |
| `overcastStrength` | `number` | 是 | - | 阴天程度，取值范围:[0~1.0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置下雪效果：SetSnowParam

```js
//设置云层厚度
fdapi.weather.setCloudThickness(2);
//设置完云层厚度后才能开启雪效
fdapi.weather.setSnowParam(1, 1, 1, [1, 1, 1, 1], 0.5, 0.5);
```

---

### `setSunColor(sunColor, fn)` {#setSunColor}

设置太阳颜色

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `sunColor` | [`Color`](/docs/api/types#color) | 是 | - | 太阳颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置太阳颜色：SetSunColor

```js
fdapi.weather.setSunColor([1, 1, 0, 1]);
```

---

### `setSunIntensity(sunIntensity, fn)` {#setSunIntensity}

设置太阳光照射强度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `sunIntensity` | `number` | 是 | - | 太阳光照射强度，取值范围:[0~40] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置太阳光照强度：SetSunIntensity

```js
fdapi.weather.setSunIntensity(10);
```

---

### `setSunSize(sunSize, fn)` {#setSunSize}

设置太阳尺寸

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `sunSize` | `number` | 是 | - | 太阳尺寸，取值范围:[0~10] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置太阳尺寸：SetSunSize

```js
fdapi.weather.setSunSize(5);
```

---

### `setTemperature(temperature, fn)` {#setTemperature}

设置色温值

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `temperature` | `number` | 是 | - | 色温值，单位：开尔文，简称K，取值范围:[1700~12000] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置色温值：SetTemperature

```js
fdapi.weather.setTemperature(8500);
```

---

### `simulateTime(startTime, endTime, duration, fn)` {#simulateTime}

模拟时间播放

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startTime` | `array \| number` | 是 | - | 开始时间，类型可以是数组或数字。 如果是数组，则设置时、分：[hour, minute]；如果是数字，则设置整点：hour。 |
| `endTime` | `array \| number` | 是 | - | 结束时间，类型可以是数组或数字。 如果是数组，则设置时、分：[hour, minute]；如果是数字，则设置整点：hour。 |
| `duration` | `number` | 是 | - | 模拟的时长，单位：秒 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：模拟时间播放：SimulateTime

```js
//10秒内模拟从9点到15点的时间变化
fdapi.weather.simulateTime(9, 15, 10);

//15秒内模拟从9点半到15点45的时间变化
//fdapi.weather.simulateTime([9, 30], [15, 45], 15);
```


## 更多示例

> 设置大气环境的瑞利散射系数：SetRayleighScatter

```js
fdapi.weather.setRayleighScatter(0.5);
```
