---
title: Settings
sidebar_label: Settings
description: "Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。"
---

# Settings

Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。

通过 `api.settings` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。
- **别名 / 不同行业叫法**：全局设置 / 场景设置 / 参数设置（无明显行业别称）。
- **适用行业**：通用（各行业项目的场景设置）
- **使用场景**：
  - 统一设定场景画质与后期效果
  - 按汇报/分析模式切换显示项
  - 批量配置全局参数
- **注意事项**：
  - 多为全局生效，影响整个场景
  - 部分参数性能开销较大
  - 与 SettingsPanel（面板 UI）配合使用



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`enableRightClickMousePick`](#enableRightClickMousePick) | 控制鼠标右键的点击拾取，默认关闭 |  |
| [`getCharacterAssetPath`](#getCharacterAssetPath) | 查询当前工程已经挂载的pak文件包含的自定义的人物角色模型路径 |  |
| [`getDroneAssetPath`](#getDroneAssetPath) | 查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径 |  |
| [`getInteractiveMode`](#getInteractiveMode) | 查询当前交互模式 |  |
| [`getLabelLayer`](#getLabelLayer) | 获取场景内所有的VTPK标注信息 |  |
| [`getMapMode`](#getMapMode) | 获取地图样式 |  |
| [`getProjectWKT`](#getProjectWKT) | 获取ACP工程的坐标系配准(wkt字符串) |  |
| [`hidePropertiesPanel`](#hidePropertiesPanel) | 隐藏图层树上对象的属性面板 |  |
| [`removeLabelLayer`](#removeLabelLayer) | 移除当前显示的VTPK的标注 |  |
| [`setAmbientFadeDistance`](#setAmbientFadeDistance) | 设置环境光遮罩淡出距离 |  |
| [`setAmbientIntensity`](#setAmbientIntensity) | 设置环境光遮罩强度 |  |
| [`setAmbientRadius`](#setAmbientRadius) | 设置环境光遮罩采样半径 |  |
| [`setAntiAliasing`](#setAntiAliasing) | 设置反走样（Anti-Aliasing）开关 |  |
| [`setAperture`](#setAperture) | 设置景深光圈大小 |  |
| [`setBloomIntensity`](#setBloomIntensity) | 设置泛光强度 |  |
| [`setCameraAutoRotateOnRightDoubleClick`](#setCameraAutoRotateOnRightDoubleClick) | 设置双击鼠标右键的默认行为，即双击右键是否自动开始相机旋转 |  |
| [`setCampassPosition`](#setCampassPosition) | 设置指北针位置 |  |
| [`setCampassVisible`](#setCampassVisible) | 设置指北针可见性 |  |
| [`setCharacterAssetPath`](#setCharacterAssetPath) | 人物漫游模式下，设置自定义的人物角色模型 |  |
| [`setCharacterRoaming`](#setCharacterRoaming) | 设置人物交互模式的落脚点、人物朝向和观察距离 |  |
| [`setCharacterRotation`](#setCharacterRotation) | 设置角色旋转朝向 |  |
| [`setChromaticAberration`](#setChromaticAberration) | 设置透镜色差强度 |  |
| [`setContrast`](#setContrast) | 设置画面对比度 |  |
| [`setDarkCorner`](#setDarkCorner) | 设置暗角强度 |  |
| [`setDeepBlur`](#setDeepBlur) | 设置景深深度模糊强度 |  |
| [`setDepthFiethSwitch`](#setDepthFiethSwitch) | 设置景深开关 |  |
| [`setDofMode`](#setDofMode) | 设置景深对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效 |  |
| [`setDroneAssetPath`](#setDroneAssetPath) | 无人机漫游模式下，设置自定义的无人机模型 |  |
| [`setEnableCameraMovingEvent`](#setEnableCameraMovingEvent) | 设置是否触发CameraMoving事件，CameraMoving事件默认是关闭的，如果… |  |
| [`setEnableInteract`](#setEnableInteract) | 设置交互开关，禁用后可以通过API设置交互。 |  |
| [`setExposureCompensation`](#setExposureCompensation) | 设置曝光补偿值 |  |
| [`setExposureEnabled`](#setExposureEnabled) | 设置自动曝光开关 |  |
| [`setFocalLength`](#setFocalLength) | 设置景深焦距 |  |
| [`setFovX`](#setFovX) | 设置水平视场角 |  |
| [`setGroundHeight`](#setGroundHeight) | 设置工程场景的海拔（地面高度） |  |
| [`setHighlightColor`](#setHighlightColor) | 设置高亮颜色 |  |
| [`setImageryLayerEnableDecal`](#setImageryLayerEnableDecal) | 设置网络图层服务(WMTS、WMS、MVT等)是否贴合地形或对象 |  |
| [`setImageryLayerLevelOffset`](#setImageryLayerLevelOffset) | 设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则… |  |
| [`setInteractiveMode`](#setInteractiveMode) | 设置交互模式 |  |
| [`setLabelLayer`](#setLabelLayer) | 设置显示对应VTPK的标注 |  |
| [`setLabelLayerDepthTestHeight`](#setLabelLayerDepthTestHeight) | 设置VTPK标注的深度检测的相机高度阈值 |  |
| [`setLabelLayerLineSpace`](#setLabelLayerLineSpace) | 设置VTPK线性标注的间隔 |  |
| [`setLabelLayerScaleRatio`](#setLabelLayerScaleRatio) | 设置VTPK标注的缩放显示百分比 |  |
| [`setLabelLayerSymbolAvoidance`](#setLabelLayerSymbolAvoidance) | 设置VTPK标注符号避让方式 |  |
| [`setLensFlareIntensity`](#setLensFlareIntensity) | 设置镜头光晕强度 |  |
| [`setLutIntensity`](#setLutIntensity) | 设置 LUT 调色强度 |  |
| [`setLutMode`](#setLutMode) | 设置 LUT 调色模式 |  |
| [`setMainPanelPos`](#setMainPanelPos) | 设置左侧资源面板的位置偏移 |  |
| [`setMainUIVisibility`](#setMainUIVisibility) | 设置主界面UI元素的可见性 |  |
| [`setMapMode`](#setMapMode) | 设置地图样式 |  |
| [`setMaxCameraHeight`](#setMaxCameraHeight) | 设置相机的最大观察高度 |  |
| [`setMinCameraHeight`](#setMinCameraHeight) | 设置相机的最小观察高度 |  |
| [`setMouseHoverTime`](#setMouseHoverTime) | 设置鼠标悬浮事件返回的时间间隔 |  |
| [`setMouseMoveTime`](#setMouseMoveTime) | 设置鼠标移动事件返回的时间间隔 |  |
| [`setMousePickMask`](#setMousePickMask) | 设置鼠标拾取功能，目前有三种拾取状态：鼠标左键点击（MouseClick: 0x1)、鼠… |  |
| [`setMoveSpeed`](#setMoveSpeed) | 设置交互的默认移动速度 |  |
| [`setNearClipPlane`](#setNearClipPlane) | 设置相机的近裁距离（最近可渲染距离），用于控制相机视野 |  |
| [`setOceanColor`](#setOceanColor) | 设置海洋颜色 |  |
| [`setOsgbGlobalAlpha`](#setOsgbGlobalAlpha) | 设置倾斜摄影全局不透明度 |  |
| [`setOsgbGlobalLitStatus`](#setOsgbGlobalLitStatus) | 设置倾斜摄影是否参与光照计算 |  |
| [`setPlayerName`](#setPlayerName) | 联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的文字名称 |  |
| [`setPostProcessEffects`](#setPostProcessEffects) | 设置滤镜后期处理效果 |  |
| [`setPropertiesPanelPos`](#setPropertiesPanelPos) | 设置图层树上对象的属性面板的屏幕位置偏移 |  |
| [`setReceiveDecalMode`](#setReceiveDecalMode) | 设置对象贴合模式 |  |
| [`setRenderedCursorVisible`](#setRenderedCursorVisible) | 设置多客户端访问时渲染鼠标同步显示 |  |
| [`setRoamViewMode`](#setRoamViewMode) | 设置角色漫游使用的默认视角，即第三人称或第一人称 |  |
| [`setRoleGender`](#setRoleGender) | 设置第三人称交互使用人物角色默认使用的性别 |  |
| [`setSaturation`](#setSaturation) | 设置画面饱和度 |  |
| [`setScreenControlsVisible`](#setScreenControlsVisible) | 当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性 |  |
| [`setScreenPercentage`](#setScreenPercentage) | 设置屏幕渲染百分比（分辨率缩放） |  |
| [`setTerrainAlpha`](#setTerrainAlpha) | :::caution 已废弃 |  |
| [`setTerrainGlobalAlpha`](#setTerrainGlobalAlpha) | 设置地形全局不透明度 |  |
| [`setTerrainGlobalLitStatus`](#setTerrainGlobalLitStatus) | 设置地形是否参与光照计算 |  |
| [`setTonemapper`](#setTonemapper) | 设置色彩优化（Tonemapping）开关 |  |
| [`setToolbarVisible`](#setToolbarVisible) | 设置屏幕右侧工具栏的可见性 |  |
| [`setWMTSLayerOpacity`](#setWMTSLayerOpacity) | 设置WMTS图层的透明度 |  |
| [`setWMTSLayerVisible`](#setWMTSLayerVisible) | 设置WMTS图层的可见性 |  |
| [`setYawSpeed`](#setYawSpeed) | 设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度 |  |
| [`showPropertiesPanel`](#showPropertiesPanel) | 显示图层树上对象的属性面板 |  |

## 方法（Methods）

### `enableRightClickMousePick(enable, fn)` {#enableRightClickMousePick}

控制鼠标右键的点击拾取，默认关闭

| 参数 | 类型 | 说明 |
|------|------|------|
| `enable` | `boolean` | 是否开启鼠标右键的点击拾取，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `getCharacterAssetPath(fn)` {#getCharacterAssetPath}

查询当前工程已经挂载的pak文件包含的自定义的人物角色模型路径

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `getDroneAssetPath(fn)` {#getDroneAssetPath}

查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `getInteractiveMode(fn)` {#getInteractiveMode}

查询当前交互模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：获取交互模式：GetInteractiveMode

```js
fdapi.settings.getInteractiveMode();
```

---

### `getLabelLayer(fn, fn)` {#getLabelLayer}

获取场景内所有的VTPK标注信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
        {
            "result":	0,
            "resultMessage":	"OK",
            "vtpks":	["Shenzhen_vtpk_3dt_0802:05C60E664E65269092E5C5AA945EE5E1", "shenzhenbldg:67CD8535419F3F3176B7C49986783B4B"]
        }
```

---

### `getMapMode(fn, fn)` {#getMapMode}

获取地图样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
地图样式
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

> 示例：获取地图模式：GetMapMode

```js
fdapi.settings.getMapMode();
```

---

### `getProjectWKT(fn)` {#getProjectWKT}

获取ACP工程的坐标系配准(wkt字符串)

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：获取ACP工程的坐标系配准：GetProjectWKT

```js
fdapi.settings.getProjectWKT();
```

---

### `hidePropertiesPanel(fn)` {#hidePropertiesPanel}

隐藏图层树上对象的属性面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `removeLabelLayer(fn)` {#removeLabelLayer}

移除当前显示的VTPK的标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setAmbientFadeDistance(ambientFadeDistance, fn)` {#setAmbientFadeDistance}

设置环境光遮罩淡出距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ambientFadeDistance` | `number` | 环境光遮罩的淡出距离（单位：米），默认值：12000 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置环境光遮罩淡出距离：SetAmbientFadeDistance

```js
//环境光遮罩的淡出距离（单位：米），默认值：12000
fdapi.settings.setAmbientFadeDistance(8000);
```

---

### `setAmbientIntensity(ambientIntensity, fn)` {#setAmbientIntensity}

设置环境光遮罩强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `ambientIntensity` | `number` | 环境光遮罩强度，取值范围：[0~100]，默认值：60 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置环境光遮罩强度：SetAmbientIntensity

```js
//环境光遮罩强度，取值范围：[0~100]，默认值：60
fdapi.settings.setAmbientIntensity(80);
```

---

### `setAmbientRadius(ambientRadius, fn)` {#setAmbientRadius}

设置环境光遮罩采样半径

| 参数 | 类型 | 说明 |
|------|------|------|
| `ambientRadius` | `number` | 环境光遮罩采样半径，默认值：100 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置环境光遮罩采样半径：SetAmbientRadius

```js
//环境光遮罩的淡出距离（单位：米），默认值：12000
fdapi.settings.setAmbientFadeDistance(8000);
```

---

### `setAntiAliasing(antiAliasing, fn)` {#setAntiAliasing}

设置反走样（Anti-Aliasing）开关

| 参数 | 类型 | 说明 |
|------|------|------|
| `antiAliasing` | `boolean` | 是否开启反走样，默认值：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置反走样开关：SetAntiAliasing

```js
// 是否开启反走样，默认值：true
fdapi.settings.setAntiAliasing(true);
```

---

### `setAperture(aperture, fn)` {#setAperture}

设置景深光圈大小

| 参数 | 类型 | 说明 |
|------|------|------|
| `aperture` | `number` | 光圈值（f 值），值越小景深越浅，默认值：4 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置景深光圈大小：SetAperture

```js
// 光圈值（f 值），值越小景深越浅，默认值：4
fdapi.settings.setAperture(2.8);
```

---

### `setBloomIntensity(bloomIntensity, fn)` {#setBloomIntensity}

设置泛光强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `bloomIntensity` | `number` | 泛光强度，取值范围：[0~10.0]，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置泛光强度：SetBloomIntensity

```js
// 泛光强度，取值范围：[0~10.0]，默认值：0
fdapi.settings.setBloomIntensity(0.5);
```

---

### `setCameraAutoRotateOnRightDoubleClick(enable, fn)` {#setCameraAutoRotateOnRightDoubleClick}

设置双击鼠标右键的默认行为，即双击右键是否自动开始相机旋转

| 参数 | 类型 | 说明 |
|------|------|------|
| `enable` | `boolean` | 设置双击右键是否开启相机自传，取值：true 启用，false 禁用，默认值：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setCampassPosition(left, top, fn)` {#setCampassPosition}

设置指北针位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `left` | `number` | 指北针距离视频流左侧原点像素距离，类似CSS内绝对定位left，注意：如果设置为负值则恢复到原始位置。 |
| `top` | `number` | 指北针距离视频流上方原点像素距离，类似CSS内绝对定位top，注意：如果设置为负值则恢复到原始位置。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置指北针位置：SetCampassPosition

```js
fdapi.settings.setCampassPosition(100, 100);
```

---

### `setCampassVisible(visible, fn)` {#setCampassVisible}

设置指北针可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `visible` | `boolean` | 指北针是否可见 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示|隐藏指北针：SetCampassVisible

```js
__campassVisible = !__campassVisible;
fdapi.settings.setCampassVisible(__campassVisible);
```

---

### `setCharacterAssetPath(assetPath, fn)` {#setCharacterAssetPath}

人物漫游模式下，设置自定义的人物角色模型

| 参数 | 类型 | 说明 |
|------|------|------|
| `assetPath` | `string` | 自定义打包pak文件内的人物角色模型路径，可以通过getCharacterAssetPath()方法查询获取 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：角色漫游下设置人物模型：SetCharacterAssetPath

```js
//设置人物漫游交互模式
fdapi.settings.setInteractiveMode(1);

//查询已经挂载的自定义人物角色模型
let pathArr = await fdapi.settings.getCharacterAssetPath();
//设置自定义的人物角色
//fdapi.settings.setCharacterAssetPath('/JC_CustomAssets/PlayerLibrary/Exhibition/工人_2');
fdapi.settings.setCharacterAssetPath(pathArr.paths[0]);
```

---

### `setCharacterRoaming(location, rotation, distance, fn)` {#setCharacterRoaming}

设置人物交互模式的落脚点、人物朝向和观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `location` | `array` | 人物落脚点 |
| `rotation` | `array` | 人物朝向 |
| `distance` | `number` | 相机观察人物的距离 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置人物漫游：SetCharacterRoaming

```js
fdapi.settings.setCharacterRoaming([493080.27, 2492091.36, 2.31], [-20, 8, 0], 10);
```

---

### `setCharacterRotation(rotation, fn)` {#setCharacterRotation}

设置角色旋转朝向

| 参数 | 类型 | 说明 |
|------|------|------|
| `rotation` | `array` | 旋转角度 [Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setChromaticAberration(chromaticAberration, fn)` {#setChromaticAberration}

设置透镜色差强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `chromaticAberration` | `number` | 色差强度值，取值范围：[0~5]，默认值：0（关闭） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置透镜色差强度：SetChromaticAberration

```js
//色差强度值，取值范围：[0~5]，默认值：0（关闭）
fdapi.settings.setChromaticAberration(1);
```

---

### `setContrast(contrast, fn)` {#setContrast}

设置画面对比度

| 参数 | 类型 | 说明 |
|------|------|------|
| `contrast` | `number` | 对比度，取值范围：[0~100]，默认值：10 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置画面对比度：SetContrast

```js
// 对比度，取值范围：[0~100]，默认值：10
fdapi.settings.setContrast(20);
```

---

### `setDarkCorner(darkCorner, fn)` {#setDarkCorner}

设置暗角强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `darkCorner` | `number` | 暗角强度（百分比），取值范围：[0~1]，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置暗角强度：SetDarkCorner

```js
// 暗角强度（百分比），取值范围：[0~1]，默认值：0
fdapi.settings.setDarkCorner(0.2);
```

---

### `setDeepBlur(deepBlur, fn)` {#setDeepBlur}

设置景深深度模糊强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `deepBlur` | `number` | 深度模糊强度，默认值：2 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置景深深度模糊强度：SetDeepBlur

```js
//深度模糊强度，默认值：2
fdapi.settings.setDeepBlur(3);
```

---

### `setDepthFiethSwitch(depthFiethSwitch, fn)` {#setDepthFiethSwitch}

设置景深开关

| 参数 | 类型 | 说明 |
|------|------|------|
| `depthFiethSwitch` | `boolean` | 是否启用景深效果，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置景深开关：SetDepthFiethSwitch

```js
//是否启用景深效果，默认值：false
fdapi.settings.setDepthFiethSwitch(true);
```

---

### `setDofMode(dofMode, fn)` {#setDofMode}

设置景深对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `dofMode` | `number` | 对焦距离模式，取值：0【近距离 0.5km】1【中远距离 2km】2【中远距离 5km】3【远距离 10km】，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置景深对焦距离模式：SetDofMode

```js
// {0|1|2|3} mode - 对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效
/*   - `0` 近距离（0.5km）
*   - `1` 中远距离（2km）
*   - `2` 中远距离（5km）
*   - `3` 远距离（10km）
*   默认值：0
*/
fdapi.settings.setDofMode(2);
```

---

### `setDroneAssetPath(assetPath, fn)` {#setDroneAssetPath}

无人机漫游模式下，设置自定义的无人机模型

| 参数 | 类型 | 说明 |
|------|------|------|
| `assetPath` | `string` | 自定义打包pak文件内的无人机模型路径，可以通过getDroneAssetPath()方法查询获取 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：无人机漫游下设置无人机模型：SetDroneAssetPath

```js
//设置无人机漫游交互模式
fdapi.settings.setInteractiveMode(2);
//查询已经挂载的自定义人物角色模型
let pathArr = await fdapi.settings.getDroneAssetPath();
//设置自定义的无人机模型
fdapi.settings.setDroneAssetPath('/JC_CustomAssets/UAVLibrary/Exhibition/Drone_A');
```

---

### `setEnableCameraMovingEvent(bEnable, period, fn)` {#setEnableCameraMovingEvent}

设置是否触发CameraMoving事件，CameraMoving事件默认是关闭的，如果需要接收相机移动消息，可以调用此方法

| 参数 | 类型 | 说明 |
|------|------|------|
| `bEnable` | `boolean` | 是否开启相机移动事件 |
| `period` | `number` | 可选参数，事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：开启相机事件：SetEnableCameraMovingEvent

```js
//是否开启相机移动事件监听
__bEnableCameraMovingEvent = !__bEnableCameraMovingEvent;
//相机事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100]
let period = 20;
fdapi.settings.setEnableCameraMovingEvent(__bEnableCameraMovingEvent, period);
```

---

### `setEnableInteract(bEnable, fn, fn)` {#setEnableInteract}

设置交互开关，禁用后可以通过API设置交互。

- 对于Explorer，目前支持启用和禁用鼠标交互；
- 对于Cloud，支持启用和禁用键盘、鼠标、触摸三种交互

| 参数 | 类型 | 说明 |
|------|------|------|
| `bEnable` | `boolean` | 是否开启鼠标交互 |
| `fn` | `function` | 可选的回调函数。 注意：对于Cloud二次开发，此参数无效。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置交互开关：SetEnableInteract

```js
__bEnableInteract = !__bEnableInteract;
fdapi.settings.setEnableInteract(__bEnableInteract);
```

---

### `setExposureCompensation(exposureCompensation, fn)` {#setExposureCompensation}

设置曝光补偿值

| 参数 | 类型 | 说明 |
|------|------|------|
| `exposureCompensation` | `number` | 曝光补偿量，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置曝光补偿值：SetExposureCompensation

```js
//曝光补偿量，默认值：0
fdapi.settings.setExposureCompensation(1.5);
```

---

### `setExposureEnabled(exposureEnabled, fn)` {#setExposureEnabled}

设置自动曝光开关

| 参数 | 类型 | 说明 |
|------|------|------|
| `exposureEnabled` | `boolean` | 是否启用自动曝光，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置自动曝光开关：SetExposureEnabled

```js
//是否启用自动曝光，默认值：false
fdapi.settings.setExposureEnabled(true);
```

---

### `setFocalLength(focalLength, fn)` {#setFocalLength}

设置景深焦距

| 参数 | 类型 | 说明 |
|------|------|------|
| `focalLength` | `number` | 焦距值（单位：毫米），默认值：10000 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置景深焦距：SetFocalLength

```js
// 焦距值（单位：毫米），默认值：10000
fdapi.settings.setFocalLength(5000);
```

---

### `setFovX(fovX, fn)` {#setFovX}

设置水平视场角

| 参数 | 类型 | 说明 |
|------|------|------|
| `fovX` | `number` | 水平视场角 取值范围：[10~135] 单位：度 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置相机水平视场角：SetFovX

```js
fdapi.settings.setFovX(100);
```

---

### `setGroundHeight(height, fn)` {#setGroundHeight}

设置工程场景的海拔（地面高度）

| 参数 | 类型 | 说明 |
|------|------|------|
| `height` | `number` | 工程场景的海拔（地面高度） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置图层服务的高度：SetGroundHeight

```js
fdapi.settings.setGroundHeight(10);
```

---

### `setHighlightColor(color, fn)` {#setHighlightColor}

设置高亮颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `color` | [`Color`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置全局高亮的颜色：SetHighlightColor

```js
fdapi.settings.setHighlightColor(Color.Red);
```

---

### `setImageryLayerEnableDecal(receiveDecalMode, fn)` {#setImageryLayerEnableDecal}

设置网络图层服务(WMTS、WMS、MVT等)是否贴合地形或对象

**注意：若需要控制单独网络图层的贴合支持，请使用方法： fdapi.tileLayer.enableImageLayerDecal(data);**

| 参数 | 类型 | 说明 |
|------|------|------|
| `receiveDecalMode` | `number` | 对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setImageryLayerLevelOffset(levelOffset, fn)` {#setImageryLayerLevelOffset}

设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则当前图层服务的裂分等级增加1变为7级。

| 参数 | 类型 | 说明 |
|------|------|------|
| `levelOffset` | `number` | 网络图层服务当前某处的裂分等级的偏移量 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置网络图层服务的裂分等级的偏移量：SetImageryLayerLevelOffset

```js
fdapi.settings.setImageryLayerLevelOffset(6);
```

---

### `setInteractiveMode(mode, fn)` {#setInteractiveMode}

设置交互模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `mode` | `number` | 五种交互模式，取值范围：[0,1,2,3,4]，默认值：0；【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置交互模式：SetInteractiveMode

```js
//设置交互模式 【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】
if (++__interactiveMode > 2)
    __interactiveMode = 0;
fdapi.settings.setInteractiveMode(__interactiveMode);
```

---

### `setLabelLayer(name, fn)` {#setLabelLayer}

设置显示对应VTPK的标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | VTPK标注名称，标注名称可以根据getVTPK()查询获取。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setLabelLayerDepthTestHeight(depthTestHeight, fn)` {#setLabelLayerDepthTestHeight}

设置VTPK标注的深度检测的相机高度阈值

| 参数 | 类型 | 说明 |
|------|------|------|
| `depthTestHeight` | `number` | 深度检测的相机高度阈值，高于此值不再进行深度检测，标签将不会被遮挡；低于该高度，绘制标签会做深度检测，会有正确的遮挡关系。默认值：2000米，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置VTPK标注的深度检测的相机高度阈值：SetLabelLayerDepthTestHeight

```js
fdapi.settings.setLabelLayerDepthTestHeight(2000);
```

---

### `setLabelLayerLineSpace(lineSpace, fn)` {#setLabelLayerLineSpace}

设置VTPK线性标注的间隔

| 参数 | 类型 | 说明 |
|------|------|------|
| `lineSpace` | `number` | 线性标注间隔，单位：米，取值范围：[0~1000]，默认值：250 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置VTPK线性标注间隔：SetLabelLayerLineSpace

```js
fdapi.settings.setLabelLayerLineSpace(300);
```

---

### `setLabelLayerScaleRatio(scale, fn)` {#setLabelLayerScaleRatio}

设置VTPK标注的缩放显示百分比

| 参数 | 类型 | 说明 |
|------|------|------|
| `scale` | `number` | VTPK标注的标注缩放显示比例，百分比，取值范围：[0~1000]，默认值：100 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置VTPK标注显示百分比：SetLabelLayerScaleRatio

```js
fdapi.settings.setLabelLayerScaleRatio(200);
```

---

### `setLabelLayerSymbolAvoidance(type, fn)` {#setLabelLayerSymbolAvoidance}

设置VTPK标注符号避让方式

| 参数 | 类型 | 说明 |
|------|------|------|
| `type` | `number` | 符号避让三种方式，取值范围：[0,1,2]，取值说明：0避让 1堆叠 2使用样式文件 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置VTPK标注符号避让方式：SetLabelLayerSymbolAvoidance

```js
fdapi.settings.setLabelLayerSymbolAvoidance(2);
```

---

### `setLensFlareIntensity(lensFlareIntensity, fn)` {#setLensFlareIntensity}

设置镜头光晕强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `lensFlareIntensity` | `number` | 光晕强度，取值范围：[0~1.0]，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置镜头光晕强度：SetLensFlareIntensity

```js
//光晕强度，取值范围：[0~1.0]，默认值：0
fdapi.settings.setLensFlareIntensity(0.3);
```

---

### `setLutIntensity(lutIntensity, fn)` {#setLutIntensity}

设置 LUT 调色强度

| 参数 | 类型 | 说明 |
|------|------|------|
| `lutIntensity` | `number` | LUT 调色强度（百分比小数），取值范围：[0~1.0]，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置LUT调色强度：SetLutIntensity

```js
// LUT 调色强度（百分比小数），取值范围：[0~1.0]，默认值：0
fdapi.settings.setLutIntensity(0.8);
```

---

### `setLutMode(lutMode, fn)` {#setLutMode}

设置 LUT 调色模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `lutMode` | `number` | LUT 调色预设模式，取值范围：[0~30]，0 表示关闭，1~30 对应不同 LUT 调色效果，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置LUT调色模式：SetLutMode

```js
/** 
 * LUT 调色预设模式，取值范围：[0~30]    
 *   - `0` 关闭调色
 *   - `1~30` 对应不同 LUT 调色效果
 *   默认值：0
 */
fdapi.settings.setLutMode(5);
```

---

### `setMainPanelPos(left, top, fn)` {#setMainPanelPos}

设置左侧资源面板的位置偏移

| 参数 | 类型 | 说明 |
|------|------|------|
| `left` | `number` | 左侧资源面板距离视频流左侧屏幕原点像素距离，类似CSS内绝对定位left，注意：如果设置为0则恢复到原始位置。 |
| `top` | `number` | 左侧资源面板距离视频流上方屏幕原点像素距离，类似CSS内绝对定位top，注意：如果设置为0则恢复到原始位置。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setMainUIVisibility(visible, fn)` {#setMainUIVisibility}

设置主界面UI元素的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `visible` | `boolean` | 主界面UI元素是否可见 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示|隐藏主界面UI：SetMainUIVisibility

```js
__uiVisible = !__uiVisible;
fdapi.settings.setMainUIVisibility(__uiVisible);
```

---

### `setMapMode(mode, options, fn)` {#setMapMode}

设置地图样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `mode` | [`MapMode`](/docs/api/types#mapmode) | 地图样式，0：指南针；1：鹰眼图；2：大地图，参见`MapMode` 注意：设置大地图模式后，不再支持设置vtpk标注，两者互斥 |
| `options` | `object` | 地图模式相关的参数，目前支持的选项有下面这些（如果某个参数没有设置，会使用默认值）： serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox serviceProvider: 服务提供厂商，1：ArcGIS； 2：GeoServer； 3：SuperMap超图； 4：Mapbox；5：tianditu天地图 coordType: 坐标系类型，0：经纬度；1：本地（默认值是0） mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]） longitude: 经度，取值范围：[0~180]（默认值是0.0） latitude: 纬度，取值范围：[0~90]（默认值是0.0） cache: 缓存路径，字符串地址，（默认值是 ":memory:"） style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"） groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0） renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0） decalMode: 大地图贴地模式下的贴合模式，0：都不接受 1：贴合所有 2：仅贴合地形；默认值：1，注意：此参数仅在renderMode设置为3时生效 serverURL : WMTS服务路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['111', 'http://192.168.1.29:81'], ['222', 'http://192.168.1.29:82'], ['333', 'http://192.168.1.29:83']] coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0） maxLevel : WMTS服务最大显示层级，取值范围：[0~22]，默认值：10 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置地图模式：SetMapMode

```js
//恢复为指南针模式
//fdapi.settings.setMapMode(MapMode.Campass, {});

//使用mapbox 设置大地图模式
fdapi.settings.setMapMode(MapMode.BigMap, {
    'coordType': 0, //坐标系类型，0：经纬度；1：本地（默认值是0）
    'serviceType': 4,//服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox
    'mapPoint': [492848.00, 2491968.00],//同名点，取值范围：[x,y]，（默认值是[0, 0]）
    'longitude': 113.9354020,//经度，取值范围：[0~180]（默认值是0.0）
    'latitude': 22.5222660,//纬度，取值范围：[0~90]（默认值是0.0）
    'style': 'mapbox://styles/mapbox/streets-v10',//风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
    'coordOrder': 0,//坐标顺序，0: XY; 1: YX（默认值为0）
    'cache': ':memory:',//缓存路径，字符串地址，（默认值是 ":memory:"）
    'renderMode': 0,//渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
    'groundHeight': 1,//地面高度，取值范围：[0~任意数值]（默认值是0.0）
    //'serverURL': []
}, () => {
    log('设置大地图模式完成');
});
```

---

### `setMaxCameraHeight(maxCameraHeight, fn)` {#setMaxCameraHeight}

设置相机的最大观察高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `maxCameraHeight` | `number` | 最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置相机最大高度：SetMaxCameraHeight

```js
fdapi.settings.setMaxCameraHeight(100000);
```

---

### `setMinCameraHeight(minCameraHeight, fn)` {#setMinCameraHeight}

设置相机的最小观察高度

| 参数 | 类型 | 说明 |
|------|------|------|
| `minCameraHeight` | `number` | 最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置相机最小高度：SetMinCameraHeight

```js
fdapi.settings.setMinCameraHeight(-5);
```

---

### `setMouseHoverTime(time, fn)` {#setMouseHoverTime}

设置鼠标悬浮事件返回的时间间隔

| 参数 | 类型 | 说明 |
|------|------|------|
| `time` | `number` | 鼠标悬浮事件返回的时间间隔，单位：秒，默认值：1s |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置鼠标悬浮事件返回的时间间隔：SetMouseHoverTime

```js
//设置鼠标悬浮事件返回的时间间隔为0.1秒
fdapi.settings.setMouseHoverTime(0.1);
```

---

### `setMouseMoveTime(time, fn)` {#setMouseMoveTime}

设置鼠标移动事件返回的时间间隔

| 参数 | 类型 | 说明 |
|------|------|------|
| `time` | `number` | 鼠标移动事件返回的时间间隔，单位：秒，默认值：1s |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置鼠标移动事件返回的时间间隔：SetMouseMoveTime

```js
//设置鼠标移动事件返回的时间间隔为0.1秒
fdapi.settings.setMouseMoveTime(0.1);
```

---

### `setMousePickMask(mask, fn, fn)` {#setMousePickMask}

设置鼠标拾取功能，目前有三种拾取状态：鼠标左键点击（MouseClick: 0x1)、鼠标移动（MouseMove: 0x2）、鼠标停留（MouseHover: 0x4）     *

| 参数 | 类型 | 说明 |
|------|------|------|
| `mask` | `number` | 掩码，请参考`MousePickMask` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
function test_settings_setMousePickMask() {
            //此处可以用枚举，也可以直接设置数字，数字含义如下：
            //7: click, move, hover: 全开
            //0: click, move, hover: 全关
            let mask = MousePickMask.MouseClick | MousePickMask.MouseMove | MousePickMask.MouseHover;
            fdapi.settings.setMousePickMask(mask);
        }
```

> 示例：开启鼠标事件：SetMousePickMask

```js
//此处可以用枚举，也可以直接设置数字，数字含义如下：
//7: click, move, hover: 全开 
//0: click, move, hover: 全关 

//开启鼠标悬浮和移动的监听事件
let mask = MousePickMask.MouseMove | MousePickMask.MouseHover;
fdapi.settings.setMousePickMask(mask);

//设置鼠标悬浮事件返回的时间间隔为0.1秒
fdapi.settings.setMouseHoverTime(0.1);
//设置鼠标移动事件返回的时间间隔为0.1秒
fdapi.settings.setMouseMoveTime(0.1);
```

---

### `setMoveSpeed(speed, fn)` {#setMoveSpeed}

设置交互的默认移动速度

| 参数 | 类型 | 说明 |
|------|------|------|
| `speed` | `number` | 交互移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置交互移动速度：SetMoveSpeed

```js
//设置交互的默认移动速度
fdapi.settings.setMoveSpeed(0.2);
```

---

### `setNearClipPlane(nearClipPlane, fn)` {#setNearClipPlane}

设置相机的近裁距离（最近可渲染距离），用于控制相机视野

| 参数 | 类型 | 说明 |
|------|------|------|
| `nearClipPlane` | `number` | 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置相机近裁距离：SetNearClipPlane

```js
fdapi.settings.setNearClipPlane(10);
```

---

### `setOceanColor(color, fn)` {#setOceanColor}

设置海洋颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `color` | [`Color`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置全局海洋颜色：SetOceanColor

```js
fdapi.settings.setOceanColor(Color.Blue);
```

---

### `setOsgbGlobalAlpha(osgbGlobalAlpha, fn)` {#setOsgbGlobalAlpha}

设置倾斜摄影全局不透明度

| 参数 | 类型 | 说明 |
|------|------|------|
| `osgbGlobalAlpha` | `number` | 倾斜摄影模型不透明度，取值范围：[0~1.0]，默认值：1.0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置倾斜摄影全局不透明度：SetOsgbGlobalAlpha

```js
// 倾斜摄影模型不透明度，取值范围：[0~1.0]，默认值：1.0
fdapi.settings.setOsgbGlobalAlpha(0.5);
```

---

### `setOsgbGlobalLitStatus(osgbGlobalLitStatus, fn)` {#setOsgbGlobalLitStatus}

设置倾斜摄影是否参与光照计算

| 参数 | 类型 | 说明 |
|------|------|------|
| `osgbGlobalLitStatus` | `boolean` | 倾斜摄影模型是否参与全局光照，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置倾斜摄影是否参与光照：SetOsgbGlobalLitStatus

```js
// 倾斜摄影模型是否参与全局光照，默认值：false
fdapi.settings.setOsgbGlobalLitStatus(true);
```

---

### `setPlayerName(name, size, fn)` {#setPlayerName}

联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的文字名称

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 角色或者无人机上方显示的文字名称 |
| `size` | `number` | 角色或者无人机上方显示的文字尺寸 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：无人机漫游/角色漫游时设置模型上方显示的文字名字：SetPlayerName

```js
//联网模式（会议室）下设置角色漫游和无人机漫游时模型上方显示的文字名称
fdapi.settings.setPlayerName("角色名称", 28);
```

---

### `setPostProcessEffects(postProcessEffects, fn)` {#setPostProcessEffects}

设置滤镜后期处理效果

| 参数 | 类型 | 说明 |
|------|------|------|
| `postProcessEffects` | `number` | 滤镜效果类型，取值：0【无效果】1【景深效果】2【线框效果】3【圆珠笔】4【白框】5【蓝图】6【原色黑边】，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置滤镜后期处理效果：SetPostProcessEffects

```js
/**
  *  @param {0|1|2|3|4|5|6} effect - 滤镜效果类型
  *   - `0` 无效果（默认）
  *   - `1` 景深效果
  *   - `2` 线框效果
  *   - `3` 圆珠笔
  *   - `4` 白框
  *   - `5` 蓝图
  *   - `6` 原色黑边
  *   默认值：0
  */
// 线框效果
fdapi.settings.setPostProcessEffects(2);
```

---

### `setPropertiesPanelPos(left, top, fn)` {#setPropertiesPanelPos}

设置图层树上对象的属性面板的屏幕位置偏移

| 参数 | 类型 | 说明 |
|------|------|------|
| `left` | `number` | 属性面板距离视频流左侧屏幕原点像素距离，类似CSS内绝对定位left，注意：如果设置为0则恢复到原始位置。 |
| `top` | `number` | 属性面板距离视频流上方屏幕原点像素距离，类似CSS内绝对定位top，注意：如果设置为0则恢复到原始位置。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setReceiveDecalMode(receiveDecalMode, fn)` {#setReceiveDecalMode}

设置对象贴合模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `receiveDecalMode` | `number` | 对象贴合模式，取值：0【无】1【所有对象】2【仅地形】，默认值：1 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置对象贴合模式：SetReceiveDecalMode

```js
/** 
 * @param {0|1|2} mode - 对象贴合模式
 *   - `0` 无贴合
 *   - `1` 所有对象均参与贴合
 *   - `2` 仅地形参与贴合
 *   默认值：1
 */
fdapi.settings.setReceiveDecalMode(2); // 仅地形
```

---

### `setRenderedCursorVisible(bEnable, fn)` {#setRenderedCursorVisible}

设置多客户端访问时渲染鼠标同步显示

| 参数 | 类型 | 说明 |
|------|------|------|
| `bEnable` | `boolean` | 多客户端访问时鼠标是否渲染同步显示，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setRoamViewMode(viewMode, fn)` {#setRoamViewMode}

设置角色漫游使用的默认视角，即第三人称或第一人称

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewMode` | `number` | 角色漫游采用的视角类型，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置漫游视角：SetRoamViewModeractiveMode

```js
//0角色漫游使用第三人称，1角色漫游使用第一人称
fdapi.settings.setRoamViewMode(1);
```

---

### `setRoleGender(gender, fn)` {#setRoleGender}

设置第三人称交互使用人物角色默认使用的性别

| 参数 | 类型 | 说明 |
|------|------|------|
| `gender` | `number` | 第三人称交互是否使用男性角色，取值范围：[0,1]，0女性角色，1男性角色，默认值：0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置第三人称角色性别：SetRoleGender

```js
//0女性角色，1男性角色
fdapi.settings.setRoleGender(1);
```

---

### `setSaturation(saturation, fn)` {#setSaturation}

设置画面饱和度

| 参数 | 类型 | 说明 |
|------|------|------|
| `saturation` | `number` | 饱和度，取值范围：[0~100]，默认值：10 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置画面饱和度：SetSaturation

```js
// 饱和度，取值范围：[0~100]，默认值：10
fdapi.settings.setSaturation(30);
```

---

### `setScreenControlsVisible(visible, fn)` {#setScreenControlsVisible}

当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `visible` | `boolean` | 操纵杆UI元素是否可见 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setScreenPercentage(screenPercentage, fn)` {#setScreenPercentage}

设置屏幕渲染百分比（分辨率缩放）

| 参数 | 类型 | 说明 |
|------|------|------|
| `screenPercentage` | `number` | 屏幕渲染分辨率百分比，取值范围：[50~200]，默认值：125 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置屏幕渲染百分比：SetScreenPercentage

```js
// 屏幕渲染分辨率百分比，取值范围：[50~200]，默认值：125 值越高画质越好，性能消耗越大
fdapi.settings.setScreenPercentage(100);
```

---

### `setTerrainAlpha(alpha, fn)` {#setTerrainAlpha}

:::caution 已废弃

过时方法，推荐setTerrainGlobalAlpha()

:::

设置地形透明度

| 参数 | 类型 | 说明 |
|------|------|------|
| `alpha` | `number` | 透明度，取值范围：[0,1] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

---

### `setTerrainGlobalAlpha(terrainGlobalAlpha, fn)` {#setTerrainGlobalAlpha}

设置地形全局不透明度

| 参数 | 类型 | 说明 |
|------|------|------|
| `terrainGlobalAlpha` | `number` | 地形不透明度，取值范围：[0~1.0]，默认值：1.0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置地形全局不透明度：SetTerrainGlobalAlpha

```js
// 地形不透明度，取值范围：[0~1.0]，默认值：1.0  `0` 完全透明  `1` 完全不透明
fdapi.settings.setTerrainGlobalAlpha(0.7);
```

---

### `setTerrainGlobalLitStatus(terrainGlobalLitStatus, fn)` {#setTerrainGlobalLitStatus}

设置地形是否参与光照计算

| 参数 | 类型 | 说明 |
|------|------|------|
| `terrainGlobalLitStatus` | `boolean` | 地形是否参与全局光照，默认值：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置地形是否参与光照：SetTerrainGlobalLitStatus

```js
//地形是否参与全局光照，默认值：true
fdapi.settings.setTerrainGlobalLitStatus(false);
```

---

### `setTonemapper(tonemapper, fn)` {#setTonemapper}

设置色彩优化（Tonemapping）开关

| 参数 | 类型 | 说明 |
|------|------|------|
| `tonemapper` | `boolean` | 是否开启色彩优化，默认值：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置色彩优化开关：SetTonemapper

```js
//是否开启色彩优化，默认值：true
fdapi.settings.setTonemapper(false);
```

---

### `setToolbarVisible(visible, fn)` {#setToolbarVisible}

设置屏幕右侧工具栏的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `visible` | `boolean` | 屏幕右侧工具栏是否可见 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示|隐藏右侧工具栏：SetToolbarVisible

```js
__toolBarVisible = !__toolBarVisible;
fdapi.settings.setToolbarVisible(__toolBarVisible);
```

---

### `setWMTSLayerOpacity(data, fn)` {#setWMTSLayerOpacity}

设置WMTS图层的透明度

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `array` | WMTS图层服务透明度设置，参数类型：二维数组对象，数组元素index[0]：WMTS服务id 字符串id ；数组元素index[1]：不透明度 数值[0~1] ，详细描述如下： id &#123;string&#125; 即WMTS图层服务的id，类型为字符串类型ID opacity &#123;number&#125; 图层服务不透明度，取值范围：[0~1] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.settings.setWMTSLayerOpacity([['111', 0.5], ['222', 0.8]]);
```

> 示例：设置WMTS图层的透明度：SetWMTSLayerOpacity

```js
fdapi.settings.setWMTSLayerOpacity([["1", 0.5], ["2", 0.8]]);
```

---

### `setWMTSLayerVisible(data, fn)` {#setWMTSLayerVisible}

设置WMTS图层的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `array` | 控制设置地图模式时添加的WMTS网络图层服务，参数类型：二维数组，数组元素index[0]：WMTS服务id 字符串id ；数组元素index[1]：服务是否可见 boolean ；取值示例：[['111', true], ['222', false]]，打开图层服务[111] 关闭图层服务[222] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.settings.setWMTSLayerVisible([['111', true], ['222', false]]);
```

> 示例：设置WMTS图层的可见性：SetWMTSLayerVisible

```js
fdapi.settings.setWMTSLayerVisible([["1", false], ["2", true], ["3", false]]);
```

---

### `setYawSpeed(yawSpeed, fn)` {#setYawSpeed}

设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度

| 参数 | 类型 | 说明 |
|------|------|------|
| `yawSpeed` | `number` | 水平视角的旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置视角旋转速度：SetYawSpeed

```js
//设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度
fdapi.settings.setYawSpeed(1);
```

---

### `showPropertiesPanel(id, fn)` {#showPropertiesPanel}

显示图层树上对象的属性面板

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 图层树上对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |


## 更多示例

> 显示|隐藏操纵杆UI：SetScreenControlsVisible

```js
__joystickVisible = !__joystickVisible;
fdapi.settings.setScreenControlsVisible(__joystickVisible);
```

> 设置资源面板位置偏移：SetMainPanelPos

```js
await fdapi.settings.setMainPanelPos(100, 100);
```

> 显示图层树上对象的属性面板：ShowPropertiesPanel

```js
await fdapi.settings.showPropertiesPanel("E637D8FE42335EE96C58A1840BCAD0CE");
```

> 隐藏图层树上对象的属性面板：HidePropertiesPanel

```js
await fdapi.settings.hidePropertiesPanel();
```

> 设置图层树上对象属性面板的位置偏移：SetPropertiesPanelPos

```js
await fdapi.settings.setPropertiesPanelPos(500, 280);
```

> 设置渲染端鼠标显示：SetRenderedCursorVisible

```js
//开启多客户端访问时鼠标同步
fdapi.settings.setRenderedCursorVisible(true);
```

> 开启鼠标右键点击拾取：EnableRightClickMousePick

```js
//开启鼠标右键点击拾取
fdapi.settings.enableRightClickMousePick(true);
```

> 设置双击鼠标右键是否控制相机自转：SetCameraAutoRotateOnRightDoubleClick

```js
//禁用双击鼠标右键触发相机旋转的默认行为
fdapi.settings.setCameraAutoRotateOnRightDoubleClick(false);
```

> 获取所有的VTPK标注：GetLabelLayer

```js
fdapi.settings.getLabelLayer();
```

> 设置当前显示的VTPK标注：SetLabelLayer

```js
let resultArr = await fdapi.settings.getLabelLayer();
fdapi.settings.setLabelLayer(resultArr.vtpks[0]);
```

> 移除当前显示的VTPK标注：RemoveLabelLayer

```js
fdapi.settings.removeLabelLayer();
```

> 设置网络图层服务是否贴合地形或对象：SetImageryLayerEnableDecal

```js
fdapi.settings.setImageryLayerEnableDecal(2);
```

> 设置屏幕空间全局光照：SetGlobalIllumination

```js
//是否启用屏幕空间全局光照，默认值：false
fdapi.settings.setGlobalIllumination(true);
```
