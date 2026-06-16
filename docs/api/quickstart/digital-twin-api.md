---
title: DigitalTwinAPI
sidebar_label: DigitalTwinAPI
description: "DigitalTwinAPI 是 JS SDK 的总类与 API 总入口，new 之后通过全局变量 fdapi 调用所有接口，是连接与调用的核心对象。"
---

# DigitalTwinAPI

DigitalTwinAPI 是 JS SDK 的总类与 API 总入口，new 之后通过全局变量 fdapi 调用所有接口，是连接与调用的核心对象。


通过全局变量 fdapi 来调用其接口。

注意事项：

- 只有new DigitalTwinAPI以后，全局变量 **fdapi** 才是有效的。
- 如果在一个页面上创建了多个视频流窗口，那么 fdapi 始终指向最后一次创建的DigitalTwinAPI对象，对于这种情况的解决方案，请参考SDK文件夹的player_2_2.html

通过 `fdapi` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：DigitalTwinAPI 是 JS SDK 的总类与 API 总入口，new 之后通过全局变量 fdapi 调用所有接口，是连接与调用的核心对象。
- **别名 / 不同行业叫法**：API 入口 / SDK 总类 / fdapi / 接口入口（无明显行业别称）。
- **适用行业**：基础设施类，贯穿所有行业（无特定行业）
- **使用场景**：
  - 初始化与服务连接
  - 统一调用各功能模块接口
  - 多窗口场景下的实例管理
- **注意事项**：
  - 必须 new DigitalTwinAPI 后全局 fdapi 才有效
  - 多视频流窗口时 fdapi 指向最后创建的实例，需注意实例引用
  - 接口调用需在场景就绪后进行


## 构造函数

```js
new DigitalTwinAPI(host, options)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `host` | `string` | 服务器地址，格式如下 IP:Port（此处的Port是实例的WebSocket服务端口号） |
| `options` | `object` | 初始化选项，支持以下属性（都是可选） |

> **`options` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `onReady` | `function` | 工程加载成功后的回调函数，只有从这个时候开始，才能调用API， 如果工程尚未打开就调用API，会有崩溃或者错误的风险。 |
| `onLog` | `function` | 用于给DigitalTwinAPI指定输出日志的方法 |
| `onEvent` | `function` | 用于设置事件处理的回调函数，也可以通过setEventCallback方法来设置 |
| `onApiVersion` | `function` | 用于接收云渲染服务器的版本信息的回调方法 |
| `onBeforeRequest` | `function` | 在发送会导致场景修改的接口命令之前执行的回调函数。 在此回调函数可获取到原始的JSON命令字符串。 在此回调函数里，可实现自定义的接口同步操作 |

## 成员（Members）

| 成员 | 类型 | 说明 |
|------|------|------|
| `api.antenna` | `Antenna` | 天线方向图对象，提供Antenna对象的操作方法 |
| `api.battlefieldSimulation` | [`BattlefieldSimulation`](/docs/api/battle/battlefield-simulation) | BattlefieldSimulation类的对象，提供军事领域战场仿真对象相关的操作，包含装甲车、坦克、无人机、士兵等作战单元 |
| `api.beam` | [`Beam`](/docs/api/signal/beam) | Beam类的对象，提供光流相关的操作 |
| `api.boxTrigger` | [`WaterMesh`](/docs/api/hydro/water-mesh) | BoxTrigger类的对象，提供当CustomObject对象或相机Camera对象进入和退出盒子热区范围触发事件相关的操作 |
| `api.camera` | [`Camera`](/docs/api/camera/camera) | Camera类的对象，提供相机相关的操作 |
| `api.cameraTour` | — | CameraTour相机导览动画类，提供相机导览动画操作方法 |
| `api.cesium3DTileset` | [`Cesium3DTileset`](/docs/api/layer/cesium3dtileset) | Cesium3DTileset类的对象，提供Cesium3DTileset的相关操作 |
| `api.coastline` | [`Satellite`](/docs/api/traffic/satellite) | Coastline类的对象，提供海岸线相关的操作 |
| `api.coord` | [`Coord`](/docs/api/utils/coord) | Coord类的对象，提供坐标转换相关的操作 |
| `api.customMesh` | [`CustomMesh`](/docs/api/model/custom-mesh) | CustomMesh类的对象，提供自定义网格相关的操作 |
| `api.customObject` | [`CustomObject`](/docs/api/model/custom-object) | CustomObject类的对象，提供用户自定义对象相关的操作 |
| `api.customTag` | [`CustomTag`](/docs/api/marker/custom-tag) | CustomTag，提供对用户自定义标签相关的操作 |
| `api.daHuaVideoFusion` | [`DaHuaVideoFusion`](/docs/api/layer/da-hua-video-fusion) | DaHuaVideoFusion类的对象，提供大华视频融合相关的操作 |
| `api.decal` | [`Decal`](/docs/api/overlay/decal) | Decal类的对象，提供贴花相关的操作 |
| `api.drone` | [`Vehicle`](/docs/api/traffic/vehicle) | Drone类的对象，提供无人机对象相关的操作 |
| `api.dynamicWater` | [`DynamicWater`](/docs/api/hydro/dynamic-water) | DynamicWater类的对象，提供动态水的相关操作 |
| `api.editHelper` | [`EditHelper`](/docs/api/measure/edit-helper) | EditHelper类的对象，提供编辑助手相关操作 |
| `api.excavationAnalysis` | — | 超欠挖分析类对象，提供超挖欠挖分析相关操作 |
| `api.finiteElement` | — | FiniteElement类的对象，提供有限元分析对象相关的操作 |
| `api.finiteElement2` | — | FiniteElement2类的对象，提供有限元仿真对象相关的操作，支持从VTK文件创建 |
| `api.floodFill` | [`FloodFill`](/docs/api/hydro/flood-fill) | FloodFill类的对象，提供水淹分析的相关操作 |
| `api.fluid` | — | Fluid类的对象，提供流体仿真对象相关的操作 |
| `api.gaussianSplatting` | — | GaussianSplatting类对象，提供3D高斯泼溅相关操作 |
| `api.geoJSONLayer` | [`GeoJSONLayer`](/docs/api/layer/geo-json-layer) | GeoJSONLayer类的对象，提供GeoJSON类型图层符号化加载及相关操作 |
| `api.globeTerrain` | [`Cesium3DTileset`](/docs/api/layer/cesium3dtileset) | GlobeTerrain类的对象，提供对Cesium球面地形影像的相关操作 |
| `api.guideLine` | [`Satellite`](/docs/api/traffic/satellite) | GuideLine类的对象，提供引导线相关的操作 |
| `api.heatmap` | [`HeatMap`](/docs/api/overlay/heatmap) | HeatMap类的对象，提供热力图相关的操作 |
| `api.heatmap3d` | [`HeatMap3D`](/docs/api/overlay/heatmap3d) | HeatMap3D类的对象，提供三维热力图相关的操作 |
| `api.highlightArea` | [`HighlightArea`](/docs/api/overlay/highlight-area) | HighlightArea类的对象，提供高亮区域相关的操作 |
| `api.hydrodynamic1d` | [`HydroDynamic1D`](/docs/api/hydro/hydrodynamic1d) | HydroDynamic1D类的对象，实现对一维水动力模型对象的操作接口 |
| `api.hydrodynamic2d` | [`HydroDynamic2D`](/docs/api/hydro/hydrodynamic2d) | HydroDynamic2D类的对象，实现对二维水动力模型对象的操作接口 |
| `api.hydrodynamicModel` | — | HydrodynamicModel类的对象，提供二维水动力模型相关的操作 |
| `api.hydrodynamicModel2` | — | HydrodynamicModel2类的对象，提供二维水动力模型相关的操作（过时版本待移除） |
| `api.imageryLayer` | [`ImageryLayer`](/docs/api/layer/imagery-layer) | ImageryLayer类的对象，提供网络类型图层的相关操作 |
| `api.imageryLayer2` | [`ImageryLayer2`](/docs/api/layer/imagery-layer-2) | ImageryLayer2类的对象，提供球面坐标系下网络图层服务的相关操作 |
| `api.infoTree` | [`InfoTree`](/docs/api/layer/info-tree) | InfoTree类的对象，提供图层相关的操作 |
| `api.light` | [`Light`](/docs/api/overlay/light) | Light类的对象，实现对光源的操作接口 |
| `api.marker` | [`Marker`](/docs/api/marker/marker) | Marker类的对象，实现对标注的操作方法 |
| `api.marker3d` | [`Marker3D`](/docs/api/marker/marker3d) | Marker3D类的对象，实现对三维标注的操作方法 |
| `api.markerLayer` | [`MarkerLayer`](/docs/api/layer/marker-layer) | MarkerLayer类的对象，提供MarkerLayer标记图层相关操作 |
| `api.misc` | [`Misc`](/docs/api/weather/misc) | Misc类的对象，提供一些杂项功能 |
| `api.oceanHeatmap` | [`OceanHeatMap`](/docs/api/ocean/ocean-heatmap) | OceanHeatMap类的对象，提供海洋热力图相关的操作 |
| `api.odline` | [`ODLine`](/docs/api/vector/odline) | ODLine类的对象，提供迁徙线相关的操作 |
| `api.panorama` | [`Panorama`](/docs/api/overlay/panorama) | Panorama类的对象，提供全景图相关的操作 |
| `api.plot` | — | 军事态势标绘对象，提供绘制作战态势图标的相关操作 |
| `api.polygon` | [`Polygon`](/docs/api/vector/polygon) | Polygon类的对象，提供多边形相关的操作 |
| `api.polygon3d` | [`Polygon3D`](/docs/api/vector/polygon3d) | Polygon3D类的对象，提供三维多边形相关的操作 |
| `api.polyline` | [`Polyline`](/docs/api/vector/polyline) | Polyline类的对象，提供线段相关的操作 |
| `api.radiationPoint` | [`RadiationPoint`](/docs/api/overlay/radiation-point) | RadiationPoint类的对象，提供辐射圈相关的操作 |
| `api.river` | [`River`](/docs/api/hydro/river) | River类的对象，实现对河道对象的操作接口 |
| `api.satellite` | [`Satellite`](/docs/api/traffic/satellite) | Satellite类的对象，提供卫星仿真相关的操作 |
| `api.settings` | [`Settings`](/docs/api/settings/settings) | Settings类的对象，提供三维参数设置相关的接口 |
| `api.settingsPanel` | [`SettingsPanel`](/docs/api/settings/settings-panel) | 设置面板对象，提供对设置面板里的参数进行操作的接口 |
| `api.shapeFileLayer` | [`ShapeFileLayer`](/docs/api/layer/shape-file-layer) | ShapeFileLayer类的对象，提供ShapeFileLayer对象的相关操作 |
| `api.signalWave` | [`SignalWave`](/docs/api/signal/signal-wave) | SignalWave类的对象，实现对信号波束的操作接口 |
| `api.smoothedParticleHydrodynamics` | [`SmoothedParticleHydrodynamics`](/docs/api/hydro/smoothed-particle-hydrodynamics) | SmoothedParticleHydrodynamics类的对象，实现对光滑粒子流体动力学对象的操作接口 |
| `api.splineMesh` | — | SplineMesh类的对象，提供绘制路径模型相关操作 |
| `api.tag` | [`Tag`](/docs/api/vector/tag) | Tag类的对象，实现标签对象的增、删、改、查相关的功能 |
| `api.tileLayer` | [`TileLayer`](/docs/api/layer/tile-layer) | TileLayer类的对象，提供TileLayer增、删、改、查相关的功能 |
| `api.tools` | [`Tools`](/docs/api/analysis/tools) | Tools类的对象，提供一些工具类的接口 |
| `api.topologyLine` | — | 拓扑线对象，提供绘制连接图层树上模型的拓扑线的相关操作 |
| `api.trafficSimulation` | [`TrafficSimulation`](/docs/api/traffic/traffic-simulation) | TrafficSimulation类的对象，提供城市级交通仿真对象相关操作，支持十万级的城市车辆交通仿真。 |
| `api.train` | [`Train`](/docs/api/traffic/train) | 火车对象，模拟火车移动 |
| `api.vectorField` | [`VectorField`](/docs/api/vector/vector-field) | VectorField类的对象，提供向量场相关的操作 |
| `api.vehicle` | [`Vehicle`](/docs/api/traffic/vehicle) | Vehicle类的对象，提供车辆载具对象相关的操作 |
| `api.vehicle2` | [`Vehicle2`](/docs/api/traffic/vehicle-2) | Vehicle2类的对象，提供车辆载具对象相关的操作 优化版本 |
| `api.videoProjection` | [`VideoProjection`](/docs/api/overlay/video-projection) | VideoProjection类的对象，提供视频投影相关的操作 |
| `api.waterFlowField` | [`WaterFlowField`](/docs/api/hydro/water-flow-field) | WaterFlowField类的对象，提供流场相关的操作 |
| `api.waterMesh` | [`WaterMesh`](/docs/api/hydro/water-mesh) | WaterMesh类的对象，提供水体网格相关的操作 |
| `api.weather` | [`Weather`](/docs/api/weather/weather) | Weather类的对象，提供天气相关的操作接口 |

---

## 方法（Methods）

### `checkApiReady()`

检查API调用是否就绪

> 示例代码如下：

```js
await fdapi.checkApiReady();
```

---

### `destroy()`

关闭WebSocket连接

> 示例：Destroy

```js
fdapi.destroy();
```

---

### `executeJsInTickPage(code, fn)`

在tick页面里执行Javascript代码

| 参数 | 类型 | 说明 |
|------|------|------|
| `code` | `string` | JS代码 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ExecuteJsInTickPage

```js
let code = "clientCalled('this is a message called from client.')";
fdapi.executeJsInTickPage(code);
```

---

### `getPlayer()`

获取DigitalTwinAPI所关联的DigitalTwinPlayer对象，如果只是纯接口调用，则返回null.

**返回：** DigitalTwinPlayer对象

> 示例代码如下：

```js
await fdapi.getPlayer();
```

---

### `getProjectInfo()`

获取工程信息

> 示例：GetProjectInfo

```js
fdapi.getProjectInfo();
```

---

### `getVersion()`

获取SDK的完整版本号，例如：5.3.0413

注：通过AcApiVersion或者acapi.VERSION获取到的是SDK的大版本号，例如：5.3，而通过此方法获取到的是完整版本号

> 示例：GetVersion

```js
log("SDK Version: " + fdapi.getVersion())
```

---

### `registerSyncObjects()`

注册要进行同步的对象

> 示例代码如下：

```js
await fdapi.registerSyncObjects();
```

---

### `registerTick(url, options, fn)`

注册每帧渲染时要执行的JS脚本

注意：ontick方法里禁止调用耗时接口 否则会导致视频流卡顿影响交互

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | 在渲染程序里运行的HTML页面 |
| `options` | `boolean` | 用于调试的选项。 可设置调试窗口的位置、大小和可见性。 属性如下：x, y, width, height, visible |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：RegisterTick

```js
fdapi.registerTick(HostConfig.Path + "/locale/zh/popup_tick.html", {
    visible: true,  //是否显示调试窗口
    x: 10,          //调试窗口的位置
    y: 150,
    width: 460,     //调试窗口的尺寸
    height: 300
});
fdapi.camera.set(492816.259375, 2491967.416875, 78.772134, -32.735394, -86.559074, 0);
```

---

### `removeTick(fn)`

移除每帧渲染时执行的JS脚本

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：RemoveTick

```js
fdapi.removeTick();
```

---

### `reset(type, fn)`

对三维场景执行重置操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `type` | [`ResetType`](/docs/api/types#resettype) | 设置重置的类别，请参考 `ResetType`，如果不传此参数，默认行为是清除添加的所有对象 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Reset

```js
//三种清除级别
//清除所有通过接口添加的对象
fdapi.reset(1);
//重置用户设置
fdapi.reset(2);
//复位相机到初始位置
fdapi.reset(4);
//全部清除
fdapi.reset(1 | 2 | 4);
fdapi.reset();
```

---

### `saveProject(fn)`

保存场景（只保存场景设置，不保存接口创建的对象）

注意：此接口有并发问题，请务必保证各客户端的调用顺序是同步的。

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SaveProject

```js
fdapi.saveProject();
```

---

### `setEnableAliases()`

开启接口别名（不建议使用）

> 示例代码如下：

```js
await fdapi.setEnableAliases();
```

---

### `setEventCallback(fn)`

设置三维事件（例如相机飞行开始、结束、Actor的点击等）的回调函数

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 事件回调函数 |

> 示例代码如下：

```js
await fdapi.setEventCallback();
```

---

### `setHost(ip, port)`

设置主机地址

| 参数 | 类型 | 说明 |
|------|------|------|
| `ip` | `string` | IP地址或者主机名 |
| `port` | `number` | WebSocket服务的端口号 |

> 示例代码如下：

```js
await fdapi.setHost(ip, port);
```

---

### `showTickWindow(visible, fn)`

显示/隐藏tick调试窗口。 该方法既可以在客户端调用，也可以在tick调试窗口调用

| 参数 | 类型 | 说明 |
|------|------|------|
| `visible` | `boolean` | 是否可见 |
| `fn` | `function` | 可选的回调函数，仅在客户端调用时有效。 |

> 示例：ShowTickWindow

```js
__tickWindowVisible = !__tickWindowVisible;
fdapi.showTickWindow(__tickWindowVisible);
```
