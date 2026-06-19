---
title: SettingsPanel
sidebar_label: SettingsPanel
description: "SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。"
---

# SettingsPanel

SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。

通过 `api.settingsPanel` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。
- **别名 / 不同行业叫法**：设置面板 / 参数面板 / 配置面板（无明显行业别称）。
- **适用行业**：通用（各行业项目的场景设置）
- **使用场景**：
  - 程序化调整画质、特效、显示项
  - 按业务预设切换面板参数
  - 联动业务流程的场景配置
- **注意事项**：
  - 面板项随版本/工程而异
  - 部分设置为全局影响
  - 与 Settings 接口区分（面板 UI vs 参数）



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`getCameraMode`](#getCameraMode) | 获取参数 相机面板 |  |
| [`getControlMode`](#getControlMode) | 获取参数 控制面板 |  |
| [`getMapMode`](#getMapMode) | 获取地图样式 |  |
| [`getPostProcessMode`](#getPostProcessMode) | 获取参数 后期面板 |  |
| [`getReportMode`](#getReportMode) | 获取参数 汇报模式面板 |  |
| [`setCameraMode`](#setCameraMode) | 设置参数 相机面板 |  |
| [`setControlMode`](#setControlMode) | 设置参数 控制面板 |  |
| [`setMapMode`](#setMapMode) | 设置地图样式 |  |
| [`setPakFile`](#setPakFile) | 设置-工程面板自定义资源挂载的pak自定义资源文件 |  |
| [`setPakFolder`](#setPakFolder) | 设置-工程面板下自定义资源加载的pak自定义资源文件目录 |  |
| [`setPostProcessMode`](#setPostProcessMode) | 设置参数，后期面板， |  |
| [`setReportMode`](#setReportMode) | 设置参数 汇报模式面板 |  |

## 方法（Methods）

### `getCameraMode(fn)` {#getCameraMode}

获取参数 相机面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
            "nearClipPlane":	100.000000,//近裁距离
            "fovH":	90.000000,             //水平视角
            "minCamHeight":	-50.000000,     //最低相机高度
            "maxCamHeight": 100000,         //最大相机高度
            "darkCorners": 0.2      //暗角
        }
```

> 示例：设置面板--获取相机参数：GetCameraMode

```js
fdapi.settingsPanel.getCameraMode();
```

---

### `getControlMode(fn)` {#getControlMode}

获取参数 控制面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
            "speed":	0.200000,//第一人称移动速度
            "yawSpeed":	1.000000,//视角左右旋转速度
            "rotateSelf":	1,   //是否开启自由交互右键自传
            "useFemale":	0    //是否使用第三人称使用女性角色
        }
```

> 示例：设置面板--获取控制参数：GetControlMode

```js
fdapi.settingsPanel.getControlMode();
```

---

### `getMapMode(fn)` {#getMapMode}

获取地图样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回地图样式
{
        "mode":	2, // 地图样式，0：指南针；1：小地图；2：大地图，参见MapMode
        "coordType":	0, //坐标系类型，0：经纬度；1：本地（默认值是0）
        "mapPoint":	[0.000000, 0.000000], //同名点，取值范围：[x,y]，（默认值是[0, 0]）
        "longitude":	0.000000,//经度，取值范围：[0~180]（默认值是0.0）
        "latitude":	0.000000,//取值范围：[0~90]（默认值是0.0）
        "cache":	":memory:",//缓存路径，字符串地址，（默认值是 ":memory:"）
        "style":	"http://192.168.1.29:82/B34兴趣点_居名点",//风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
        "serverURL":	[],//WMTS风格路径，二维数组，参考setMapMode参数说明
        "groundHeight":	0.000000,//地面高度，取值范围：[0~任意数值]（默认值是0.0）
        "renderMode":	0, //渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
        "coordOrder":	0, //坐标顺序，0: XY; 1: YX，默认值：0
        "maxLevel": 10 // WMTS服务最大显示层级，取值范围：[0~22]，默认值：10
        }
```

> 示例：设置面板--获取地图模式：GetMapMode

```js
fdapi.settingsPanel.getMapMode();
```

---

### `getPostProcessMode(fn)` {#getPostProcessMode}

获取参数 后期面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
            "contrast":	10, //对比度
            "saturation":	10, //饱和度
            "lensFlareIntensity":	0.000000, //光晕强度
            "ambientIntensity":	60, //环境光遮罩强度
            "bloomIntensity": 0, //泛光
            "lutMode": 0,//LUT调色模式
            "lutIntensity": 0.5,//LUT调色强度
            "screenPercentage":	125, //屏幕百分比
            "terrainGlobalAlpha":	1, //地形不透明度
            "terrainGlobalLitStatus":	1, //地形是否参与光照
            "osgbGlobalLitStatus":	0, //倾斜摄影是否参与光照
            "osgbGlobalAlpha": 1,//倾斜摄影不透明度
            "antiAliasing":	1, //是否开启反走样
            "tonemapper":	1, //是否开启色彩优化
            "postProcessEffects":	0, //滤镜效果
            "dofMode":	1, //景深效果 对焦距离
            "wireThickness":	1, //线框效果 线框大小
            "receiveDecalMode":	1 //对象贴合模式
            ......
        }
```

> 示例：设置面板--获取后期参数：GetPostProcessMode

```js
fdapi.settingsPanel.getPostProcessMode();
```

---

### `getReportMode(fn)` {#getReportMode}

获取参数 汇报模式面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
{
            "alignment":1,      //汇报演示窗口位置
            "playMode":	1,      //汇报演示播放模式
            "moveInOtherView":1 //多视口相机是否联动
        }
```

> 示例：设置面板--获取汇报模式：GetReportMode

```js
fdapi.settingsPanel.getReportMode();
```

---

### `setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight, fn)` {#setCameraMode}

设置参数 相机面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `nearClipPlane` | `number` | 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0 |
| `fovH` | `number` | 水平视角，取值范围：[45~134]，单位：度，默认值：90 |
| `minCameraHeight` | `number` | 最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米 |
| `maxCameraHeight` | `number` | 最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置面板--设置相机参数：SetCameraMode

```js
/**
 * @param {number}  nearClipPlane 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0
 * @param {number}  fovH          水平视角，取值范围：[45~134]，单位：度，默认值：90
 * @param {boolean} minCameraHeight  最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米
 * @param {boolean} maxCameraHeight  最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里
 */
let nearClipPlane = 10;
let fovH = 100;
let minCameraHeight = -5;
let maxCameraHeight = 100000;
fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);
```

---

### `setControlMode(speed, yawSpeed, isRotateSelf, isUseMaleRole, viewType, fn)` {#setControlMode}

设置参数 控制面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `speed` | `number` | 第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2 |
| `yawSpeed` | `number` | 视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0 |
| `isRotateSelf` | `boolean` | 是否开启自由交互右键自传 取值：true开启，false不开启，默认false |
| `isUseMaleRole` | `boolean` | 第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false |
| `viewType` | `number` | 角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置面板--设置控制参数：SetControlMode

```js
/**
 * @param {number}  speed        第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2
 * @param {number}  yawSpeed     视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0
 * @param {boolean} isRotateSelf 是否开启自由交互右键自传 取值：true开启，false不开启，默认false
 * @param {boolean} isUseMaleRole  第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false
 * @param {number}  viewType       角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0
 */
fdapi.settingsPanel.setControlMode(0.5, 0.5, true, true, 1);
```

---

### `setMapMode(mode, options, fn)` {#setMapMode}

设置地图样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `mode` | [`MapMode`](/docs/api/types#mapmode) | 地图样式，0：指南针；1：鹰眼图；2：大地图，参见`MapMode` 注意：设置大地图模式后，不再支持设置vtpk标注，两者互斥 |
| `options` | `object` | 地图模式相关的参数，目前支持的选项有下面这些（如果某个参数没有设置，会使用默认值）： serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox serviceProvider: 服务提供厂商，1：ArcGIS； 2：GeoServer； 3：SuperMap超图； 4：Mapbox；5：tianditu天地图 coordType: 坐标系类型，0：经纬度；1：本地（默认值是0） mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]） longitude: 经度，取值范围：[0~180]（默认值是0.0） latitude: 纬度，取值范围：[0~90]（默认值是0.0） cache: 缓存路径，字符串地址，（默认值是 ":memory:"） style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"） groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0） renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0） decalMode: 大地图贴地模式下的贴合模式，0：都不接受 1：贴合所有 2：仅贴合地形；默认值：1，注意：此参数仅在renderMode设置为3时生效 serverURL : WMTS风格路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['111', 'http://192.168.1.29:81'], ['222', 'http://192.168.1.29:82'], ['333', 'http://192.168.1.29:83']] coordOrder: 坐标顺序，0: XY; 1: YX，默认值：0 maxLevel : WMTS服务最大显示层级，取值范围：[0~22]，默认值：10 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置面板--设置地图模式：SetMapMode

```js
fdapi.settingsPanel.setMapMode(MapMode.BigMap, {
    //地图模式相关的参数，具体请参考API帮助文档
    /**
     *  serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox
     *  coordType: 坐标系类型，0：经纬度；1：本地（默认值是0）
     *  mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]）
     *  longitude: 经度，取值范围：[0~180]（默认值是0.0）
     *  latitude: 纬度，取值范围：[0~90]（默认值是0.0）
     *  cache: 缓存路径，字符串地址，（默认值是 ":memory:"）
     *  style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
     *  groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0）
     *  renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
     *  serverURL: WMTS风格路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['server1', 'http://192.168.1.29:81/xxx'], ['server2', 'http://192.168.1.29:82/xxx'], ['server3', 'http://192.168.1.29:83/xxx']]
     *  coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0）
     *  maxLevel: WMTS服务最大显示层级，取值范围：[0~22]，默认值：10
     */
    'coordType': 0,
    'serviceType': 1,
    'mapPoint': [0, 0],
    'longitude': 0.0,
    'latitude': 0.0,
    'cache': ':memory:',
    'style': 'http://192.168.1.29:82/B34兴趣点_居名点',
    'groundHeight': 10,
    'renderMode': 0,
    'serverURL': [['1', 'http://192.168.1.29:82'], ['2', 'http://192.168.1.29:82'], ['3', 'http://192.168.1.29:82']],
    'coordOrder': 0,
    'maxLevel': 10

}, () => {
    log('设置大地图模式完成');
});
```

---

### `setPakFile(pakfilePathArr, fn)` {#setPakFile}

设置-工程面板自定义资源挂载的pak自定义资源文件

| 参数 | 类型 | 说明 |
|------|------|------|
| `pakfilePathArr` | `string \| array` | 要挂载的自定义资源文件路径或路径数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.settingsPanel.setPakFile(pakfilePathArr);
```

---

### `setPakFolder(dirArr, fn)` {#setPakFolder}

设置-工程面板下自定义资源加载的pak自定义资源文件目录

| 参数 | 类型 | 说明 |
|------|------|------|
| `dirArr` | `string \| array` | 要加载的自定义资源文件目录或目录数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.settingsPanel.setPakFolder(dirArr);
```

---

### `setPostProcessMode(postProcessOptions, fn)` {#setPostProcessMode}

设置参数，后期面板，注意：支持设置单个参数或同时设置多个参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `postProcessOptions` | `object` | 后期面板配置参数对象，支持以下属性 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`postProcessOptions` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `globalIllumination` | `-` | &#123;boolean&#125; 屏幕空间全局光照，默认值：false |
| `tonemapper` | `-` | &#123;boolean&#125; 是否开启色彩优化，默认值：true |
| `contrast` | `-` | &#123;number&#125; 对比度，取值范围：[1~2]，默认值：1 |
| `saturation` | `-` | &#123;number&#125; 饱和度，取值范围：[1~2]，默认值：1 |
| `bloomIntensity` | `-` | &#123;number&#125; 泛光，取值范围：[0~10.0]，默认值：0 |
| `chromaticAberration` | `-` | &#123;number&#125; 透镜色差，取值范围：[0~5]，默认值：0 |
| `ambientIntensity` | `-` | &#123;number&#125; 环境光遮罩强度，取值范围：[0~1]，默认值：0.6 |
| `ambientRadius` | `-` | &#123;number&#125; 环境光遮罩半径，取值范围：[0.1~5]，单位：米，默认值：0.1 |
| `ambientFadeDistance` | `-` | &#123;number&#125; 环境光遮罩淡出距离，取值范围：[0~20000]，单位：米，默认值：12000 |
| `exposureEnabled` | `-` | &#123;boolean&#125; 是否开启自动曝光，默认值：false |
| `exposureCompensation` | `-` | &#123;number&#125; 曝光补偿，取值范围：[0~15]，默认值：0 |
| `lensFlareIntensity` | `-` | &#123;number&#125; 镜头光晕强度 ，取值范围：[0~1.0]，默认值：0 |
| `darkCorner` | `-` | &#123;number&#125; 镜头暗角，取值范围：[0~1]，单位：百分比，默认值：0 |
| `depthFiethSwitch` | `-` | &#123;boolean&#125; 是否开启景深，默认值：false |
| `focalLength` | `-` | &#123;number&#125; 焦距，取值范围：[0~10000]，单位：米，默认值：10000 |
| `aperture` | `-` | &#123;number&#125; 光圈，取值范围：[1~32]，默认值：4 |
| `deepBlur` | `-` | &#123;number&#125; 深度模糊，取值范围：[0~4]，默认值：2 |
| `lutMode` | `-` | &#123;number&#125; LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果 |
| `lutIntensity` | `-` | &#123;number&#125; LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比 |
| `screenPercentage` | `-` | &#123;number&#125; 屏幕百分比，取值范围：[50~200]，默认值：125 |
| `terrainGlobalAlpha` | `-` | &#123;number&#125; 地形不透明度，取值范围：[0~1.0]，默认值：1.0 |
| `terrainGlobalLitStatus` | `-` | &#123;boolean&#125; 地形是否参与光照，默认值：true |
| `osgbGlobalLitStatus` | `-` | &#123;boolean&#125; 倾斜摄影是否参与光照，默认值：false |
| `osgbGlobalAlpha` | `-` | &#123;number&#125; 倾斜摄影不透明度，取值范围：[0~1.0],默认值：1.0 |
| `antiAliasing` | `-` | &#123;boolean&#125; 是否开启反走样，默认值：true |
| `postProcessEffects` | `-` | &#123;number&#125; 特效(滤镜效果)，取值范围：0【默认无效果】 1【景深效果】 2【线框效果】，3【圆珠笔】，4【白框】，5【蓝图】，6【原色黑边】， 默认值：0 |
| `wireThickness` | `-` | &#123;number&#125; 可选参数，仅在线框效果下生效，线框大小，取值范围：[1.0~3.0]，默认值：1.0 |
| `dofMode` | `-` | &#123;number&#125; 可选参数，仅在景深效果下生效，对焦距离，取值：0【近距离0.5km】 1【中远距离2km】 2【中远距离5km】 3【远距离10km】，默认值：0 |
| `receiveDecalMode` | `-` | &#123;number&#125; 对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置面板--设置后期参数：SetPostProcessMode

```js
//后期配置参数
let options1 = {

    globalIllumination: false, //屏幕空间全局光照;	
    chromaticAberration: 0, //透镜色差;
    ambientRadius: 100, //环境光遮罩半径
    ambientFadeDistance: 12000, //环境光遮罩淡出距离
    exposureEnabled: false,//自动曝光
    exposureCompensation: 0, //曝光补偿
    depthFiethSwitch: false,//景深开关
    focalLength: 10000,//   焦距
    aperture: 4,//   光圈
    deepBlur: 2,//   深度模糊

    contrast: 10,//对比度，取值范围：[0~100]，默认值：10
    saturation: 10,//饱和度，取值范围：[0~100]，默认值：10
    lensFlareIntensity: 0.5,//光晕强度 ，取值范围：[0~1.0]，默认值：0
    ambientIntensity: 60,//环境光遮罩强度，取值范围：[0~100]，默认值：60
    bloomIntensity: 0.1,//泛光，取值范围：[0~10.0]，默认值：0
    darkCorner: 0.1,//暗角，取值范围：[0~1]，单位：百分比，默认值：0
    lutMode: 10,   //   LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果
    lutIntensity: 0.5, // LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比
    screenPercentage: 50,//屏幕百分比，取值范围：[50~200]，默认值：125
    terrainGlobalAlpha: 0.5,//地形不透明度，取值范围：[0~1.0]，默认值：1.0
    terrainGlobalLitStatus: false,//地形是否参与光照，默认值：true
    osgbGlobalLitStatus: true,//倾斜摄影是否参与光照，默认值：false
    osgbGlobalAlpha: 0.8,//倾斜摄影不透明度，取值范围：[0~1.0],默认值：1.0
    antiAliasing: false,//是否开启反走样，默认值：true
    tonemapper: false,//是否开启色彩优化，默认值：true  
    postProcessEffects: 1,//滤镜效果，取值范围：0【默认无效果】 1【景深效果】 2【线框效果】，3【圆珠笔】，4【白框】，5【蓝图】，6【原色黑边】， 默认值：0
    dofMode: 1,//可选参数，仅在景深效果下生效，对焦距离，取值：0【近距离0.5km】 1【中远距离2km】 2【中远距离5km】 3【远距离10km】，默认值：0
    receiveDecalMode: 0//对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1
};
//设置多个参数 滤镜线框效果
fdapi.settingsPanel.setPostProcessMode(options1);


//支持只设置单个参数 地形不透明度
fdapi.settingsPanel.setPostProcessMode({ terrainGlobalAlpha: 0.6 });
```

---

### `setReportMode(showAlign, playMode, isLinkage, fn)` {#setReportMode}

设置参数 汇报模式面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `showAlign` | `number` | 汇报演示窗口位置 取值：0【底部】，1【居左】，2【居右】，默认0 |
| `playMode` | `number` | 汇报演示播放模式 取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0 |
| `isLinkage` | `boolean` | 多视口相机是否联动 取值：联动true，不联动false，默认不联动false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：设置面板--设置汇报模式：SetReportMode

```js
/**
 * @param {number}  showAlign 汇报演示窗口位置   取值：0【底部】，1【居左】，2【居右】，默认0
 * @param {number}  playMode  汇报演示播放模式   取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0
 * @param {boolean} isLinkage 多视口相机是否联动 取值：联动true，不联动false，默认不联动false
 */
fdapi.settingsPanel.setReportMode(1, 1, true);
```
