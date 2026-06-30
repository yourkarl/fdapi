---
name: ddts
display_name: DTS 数字孪生 SDK —— fdapi 二次开发与 API 查询
version: '7.1'
homepage: https://yourkarl.github.io/fdapi/
description: 飞渡 DTS（DigitalTwin）数字孪生 SDK 开发与 API 查询工具。涵盖云渲染初始化、异步调用、事件、坐标/颜色约定，以及 fdapi 全部类与方法（相机、标注、图层、矢量、模型、水利/海洋、交通、信号、战场、有限元、天气、分析量算等）。在用户进行 DTS 二次开发，或查询 fdapi / DigitalTwinAPI / DigitalTwinPlayer / 某个类或方法、需要标注/相机/图层/仿真等示例代码时使用。
---

# DTS 数字孪生 SDK 文档

飞渡 DTS（Digital Twin System）Cloud 是云渲染数字孪生平台。网页通过 `DigitalTwinPlayer` 接收三维视频流，并通过 `fdapi`（即 `DigitalTwinAPI`）调用三维场景能力。本 Skill 提供初始化模板、调用约定，并把文档拆分到类/方法级别供按需查阅。

## 调用约定（务必先读）

- **API 入口**：全局 `fdapi`（等价于文档中的 `api`），由 `player.getAPI()` 获得。
- **调用方式**：`fdapi.<类名首字母小写>.<方法>(...)`，例如 `fdapi.camera.lookAt(...)`、`fdapi.marker.add(...)`、`fdapi.polygon.update(...)`。
- **调用时机**：必须在 `onReady` 回调触发之后才能调用 API。
- **回调函数**：需要回调时优先用箭头函数 `() => {...}`；不需要时传 `null`。
- **坐标系**：`coordinateType: 0=投影(Projection), 1=WGS84, 2=GCJ02, 3=BD09`。坐标与朝向须与工程坐标系一致，否则定位偏移。
- **颜色**：参数类型 `Color` 支持枚举（如 `Color.White`）与 `[r,g,b,a]` 数组等多种写法，详见 `tutorials/color.md` 与 `api/types.md`。
- **批量更新**：大量增改用 `updateBegin()` … `update(...)` … `updateEnd(cb)` 包裹，减少往返。

## 初始化模板

```javascript
// 前置：页面引入云渲染脚本 ac.min.js。推荐直接引用云端（升级后自动最新，免拷贝）：
// <script src="http://<IP:Port>/libac"></script>（或 /ac.min.js）；详见 tutorials/hello-world.md
const host = '127.0.0.1:8080'; // 云渲染服务 IP:Port，端口见 CloudMaster→服务设置→服务地址
const options = {
  domId: 'player',            // 必选：承载视频流的 DOM 元素 id（不设则只调 API、无视频流）
  // iid, pid, reset, customString, ui 等可选项见 api/quickstart/digital-twin-player.md
  apiOptions: {
    onReady: () => console.info('API ready，此时可调用 fdapi'),
    onLog:   (s) => console.info('接口调用日志：', s),
    onEvent: (e) => console.info('交互/业务事件：', e),
  },
};
const player = new DigitalTwinPlayer(host, options); // 通过 fdplayer 访问
const fdapi  = player.getAPI();                       // API 总入口
```

详细构造参数、UI 选项见 `api/quickstart/digital-twin-player.md`；API 总入口见 `api/quickstart/digital-twin-api.md`。

## 查询路由

按用户意图定位文档文件，**只在需要时读取对应文件**：

1. **某个类/方法**（如 "Camera"、"flyAround"、"怎么加标注"）→ 读 `api/<分类>/<文件>.md`（含该类完整方法、参数表与示例），用下方"类索引"找路径。
2. **入门 / 概念**（异步、事件、坐标、颜色、权限、TypeScript、框架集成等）→ 读 `tutorials/<主题>.md`，见下方"教程索引"。
3. **枚举 / 全局类型**（`Color`、`ActionMode`、各类 `Style`、`Mode` 等）→ 读 `api/types.md`。
4. **事件回调**（`onEvent` 收到的事件）→ 读 `api/events/` 下对应文件。
5. **中文功能词** → 用下方"功能→类"与"方法→类"映射先确定类，再按 1 取文件。

## 教程索引（`tutorials/`）

| 主题 | 文件 |
|------|------|
| 快速开始 Hello World | `tutorials/hello-world.md` |
| 基本概念（坐标/名词/几何/SDK 类总览） | `tutorials/introduction.md` |
| 架构概览 | `tutorials/architecture.md` |
| 异步调用方式 | `tutorials/async-call.md` |
| 事件系统 | `tutorials/event.md` |
| 帧同步 / FrameTick | `tutorials/frame-tick.md` |
| 相机控制 | `tutorials/camera.md` |
| 坐标系与坐标转换 | `tutorials/coordinates.md` |
| 颜色与 Color 对象 | `tutorials/color.md` |
| 资源描述与引用 | `tutorials/resources.md` |
| 高级接口授权（付费接口/授权模块清单） | `tutorials/auth.md` |
| 云端部署说明 | `tutorials/cloud-deploy.md` |
| 框架集成指南 | `tutorials/framework-integration.md` |
| TypeScript 类型支持 | `tutorials/typescript.md` |
| 多视频同屏渲染 | `tutorials/multi-video.md` |
| Explorer 浏览器 / 使用指南 | `tutorials/explorer.md` / `tutorials/explorer-guideline.md` |
| 实战配方 | `tutorials/recipes.md` |
| 性能最佳实践（含接口调用注意事项） | `tutorials/performance.md` |
| 排错与常见报错 | `tutorials/troubleshooting.md` |
| 常见问题 FAQ | `tutorials/faq.md` |
| 版本更新记录 | `tutorials/revision-history.md` |

## 类索引（`api/<分类>/<文件>.md`）

> 访问器 = `fdapi.<访问器>`。同名类出现在多个分类时已注明区分。

### 入口 quickstart
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| DigitalTwinPlayer | 云渲染视频流播放器 | `new DigitalTwinPlayer(host,opt)` / `fdplayer` | `api/quickstart/digital-twin-player.md` |
| DigitalTwinAPI | API 总入口 | `player.getAPI()` / `fdapi` | `api/quickstart/digital-twin-api.md` |

### 相机 camera
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Camera | 相机/视角控制、飞入飞出、定位、跟随 | `fdapi.camera` | `api/camera/camera.md` |
| CameraTour | 相机巡游 | `fdapi.cameraTour` | `api/camera/camera-tour.md` |
| CameraTourData | 巡游数据 | — | `api/camera/camera-tour-data.md` |
| CameraTourKeyFrame | 巡游关键帧 | — | `api/camera/camera-tour-key-frame.md` |

### 标注 marker
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Marker | 2D 图标标注（推荐，替代 Tag） | `fdapi.marker` | `api/marker/marker.md` |
| Marker3D | 3D 文字/空间标注 | `fdapi.marker3d` | `api/marker/marker3d.md` |
| CustomTag | 自定义 HTML 标签 | `fdapi.customTag` | `api/marker/custom-tag.md` |

### 矢量 vector
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Polygon | 面绘制 | `fdapi.polygon` | `api/vector/polygon.md` |
| Polygon3D | 立体面 | `fdapi.polygon3d` | `api/vector/polygon3d.md` |
| Polyline | 线绘制 | `fdapi.polyline` | `api/vector/polyline.md` |
| GuideLine | 牵引线 | `fdapi.guideLine` | `api/vector/guide-line.md` |
| ODLine | OD 飞线 | `fdapi.odLine` | `api/vector/odline.md` |
| TopologyLine | 拓扑线 | `fdapi.topologyLine` | `api/vector/topology-line.md` |
| SplineMesh | 样条网格 | `fdapi.splineMesh` | `api/vector/spline-mesh.md` |
| VectorField | 矢量场 | `fdapi.vectorField` | `api/vector/vector-field.md` |
| Tag | 2D 文字标签（已停更，建议用 Marker） | `fdapi.tag` | `api/vector/tag.md` |

### 图层 layer
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| TileLayer | 三维瓦片图层 | `fdapi.tileLayer` | `api/layer/tile-layer.md` |
| Cesium3DTileset | Cesium 3D Tiles | `fdapi.cesium3DTileset` | `api/layer/cesium3dtileset.md` |
| ImageryLayer / ImageryLayer2 | 影像图层 | `fdapi.imageryLayer` | `api/layer/imagery-layer.md` / `api/layer/imagery-layer-2.md` |
| GeoJSONLayer | GeoJSON 图层 | `fdapi.geoJSONLayer` | `api/layer/geo-json-layer.md` |
| ShapeFileLayer | Shapefile 图层 | `fdapi.shapeFileLayer` | `api/layer/shape-file-layer.md` |
| MarkerLayer | 标注图层 | `fdapi.markerLayer` | `api/layer/marker-layer.md` |
| GlobeTerrain | 地球地形 | `fdapi.globeTerrain` | `api/layer/globe-terrain.md` |
| InfoTree | 信息树 | `fdapi.infoTree` | `api/layer/info-tree.md` |
| DaHuaVideoFusion | 大华视频融合 | `fdapi.daHuaVideoFusion` | `api/layer/da-hua-video-fusion.md` |

### 模型 model
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| CustomObject | 加载 3D 模型/自定义对象 | `fdapi.customObject` | `api/model/custom-object.md` |
| CustomMesh | 自定义网格 | `fdapi.customMesh` | `api/model/custom-mesh.md` |
| GaussianSplatting | 高斯泼溅 3DGS | `fdapi.gaussianSplatting` | `api/model/gaussian-splatting.md` |

### 叠加/特效 overlay
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| HeatMap | 热力图 | `fdapi.heatMap` | `api/overlay/heatmap.md` |
| HeatMap3D | 3D 热力图 | `fdapi.heatMap3D` | `api/overlay/heatmap3d.md` |
| HighlightArea | 高亮区域 | `fdapi.highlightArea` | `api/overlay/highlight-area.md` |
| Decal | 贴花 | `fdapi.decal` | `api/overlay/decal.md` |
| Light | 灯光 | `fdapi.light` | `api/overlay/light.md` |
| Panorama | 全景图 | `fdapi.panorama` | `api/overlay/panorama.md` |
| VideoProjection | 视频投影 | `fdapi.videoProjection` | `api/overlay/video-projection.md` |
| RadiationPoint | 辐射点 | `fdapi.radiationPoint` | `api/overlay/radiation-point.md` |

### 水利 hydro
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| WaterMesh | 水面 | `fdapi.waterMesh` | `api/hydro/water-mesh.md` |
| DynamicWater | 动态水面 | `fdapi.dynamicWater` | `api/hydro/dynamic-water.md` |
| River | 河流 | `fdapi.river` | `api/hydro/river.md` |
| FloodFill | 洪水淹没 | `fdapi.floodFill` | `api/hydro/flood-fill.md` |
| Fluid | 流体 | `fdapi.fluid` | `api/hydro/fluid.md` |
| WaterFlowField | 水流场 | `fdapi.waterFlowField` | `api/hydro/water-flow-field.md` |
| HydroDynamic1D | 一维水动力 | `fdapi.hydroDynamic1D` | `api/hydro/hydrodynamic1d.md` |
| HydroDynamic2D | 二维水动力 | `fdapi.hydroDynamic2D` | `api/hydro/hydrodynamic2d.md` |
| HydrodynamicModel / HydrodynamicModel2 | 水动力模型 | `fdapi.hydrodynamicModel` | `api/hydro/hydrodynamic-model.md` / `api/hydro/hydrodynamic-model-2.md` |
| SmoothedParticleHydrodynamics | 光滑粒子流体(SPH) | `fdapi.smoothedParticleHydrodynamics` | `api/hydro/smoothed-particle-hydrodynamics.md` |

### 海洋 ocean
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Coastline | 海岸线 | `fdapi.coastline` | `api/ocean/coastline.md` |
| OceanHeatMap | 海洋热力图 | `fdapi.oceanHeatMap` | `api/ocean/ocean-heatmap.md` |

### 交通 traffic
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Vehicle / Vehicle2 | 车辆 | `fdapi.vehicle` | `api/traffic/vehicle.md` / `api/traffic/vehicle-2.md` |
| Train | 列车 | `fdapi.train` | `api/traffic/train.md` |
| Drone | 无人机 | `fdapi.drone` | `api/traffic/drone.md` |
| Satellite | 卫星 | `fdapi.satellite` | `api/traffic/satellite.md` |
| TrafficSimulation | 交通仿真 | `fdapi.trafficSimulation` | `api/traffic/traffic-simulation.md` |
| BoxTrigger | 盒子触发器 | `fdapi.boxTrigger` | `api/traffic/box-trigger.md` |

### 信号 signal
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Antenna | 天线 | `fdapi.antenna` | `api/signal/antenna.md` |
| Beam | 光束 | `fdapi.beam` | `api/signal/beam.md` |
| SignalWave | 信号波 | `fdapi.signalWave` | `api/signal/signal-wave.md` |

### 战场 battle
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| BattlefieldSimulation | 战场仿真 | `fdapi.battlefieldSimulation` | `api/battle/battlefield-simulation.md` |
| Plot（战场标绘） | 军标标绘 | `fdapi.plot` | `api/battle/plot.md` |

### 有限元 fem
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| FiniteElement / FiniteElement2 | 有限元分析 | `fdapi.finiteElement` | `api/fem/finite-element.md` / `api/fem/finite-element-2.md` |

### 分析量算 analysis / measure
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| ExcavationAnalysis | 开挖分析 | `fdapi.excavationAnalysis` | `api/analysis/excavation-analysis.md` |
| QueryOption | 查询/拾取选项 | — | `api/analysis/query-option.md` |
| Tools（分析工具） | 通用工具/量算 | `fdapi.tools` | `api/analysis/tools.md` |
| Plot（量算标绘） | 测量标绘 | `fdapi.plot` | `api/measure/plot.md` |
| EditHelper（编辑） | 图形编辑助手 | `fdapi.editHelper` | `api/measure/edit-helper.md` |

### 设置 settings
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Settings（全局设置） | 场景/渲染全局设置 | `fdapi.settings` | `api/settings/settings.md` |
| SettingsPanel | 设置面板 | `fdapi.settingsPanel` | `api/settings/settings-panel.md` |

### 天气 weather
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Weather | 天气环境（雨雪雾等） | `fdapi.weather` | `api/weather/weather.md` |
| Settings（天气设置） | 天气相关设置 | — | `api/weather/settings.md` |
| Misc | 杂项 | — | `api/weather/misc.md` |

### 工具/坐标 utils
| 类 | 用途 | 访问器 | 文件 |
|----|------|--------|------|
| Coord | 坐标转换 | `fdapi.coord` | `api/utils/coord.md` |
| FdExternal | 外部/宿主交互 | `fdapi.fdExternal` | `api/utils/fd-external.md` |

### 事件 events（`onEvent` 回调）
| 主题 | 文件 |
|------|------|
| 相机巡游事件 | `api/events/camera-tour.md` |
| 编辑助手事件 | `api/events/edit-helper.md` |
| 工具事件 | `api/events/tools.md` |

## 方法快速定位

### 按功能查找
| 功能 | 常见方法 |
|------|----------|
| 添加对象 | `add`, `addByTif`, `addByShp`, `addByFile` |
| 显示/隐藏 | `show`, `hide`, `showAll`, `hideAll` |
| 删除/清空 | `delete`, `clear` |
| 定位/视角 | `focus`, `lookAt`, `flyAround`, `set`, `enterWorld`, `exitWorld` |
| 跟随 | `follow`, `cancelFollow` |
| 样式 | `setColor`, `setStyle`, `setOpacity` |
| 位置/高度 | `setCoordinate`, `setHeight` |
| 批量更新 | `updateBegin`, `update`, `updateEnd` |

### 方法 → 类 映射（举例）
| 方法 | 所属类 |
|------|--------|
| lookAt / flyAround / set / enterWorld / exitWorld / cancelFollow | Camera |
| setImagePath / setPopupURL / setText | Marker |
| addByTif / addByShp | HydroDynamic2D |
| addByFile | CustomObject |
| setCoordinate | Tag / 多数对象类 |

## 常用代码模板

### 相机定位
```javascript
// (x, y, z, 距离, 俯仰角pitch, 偏航角yaw, 飞行时间s)
fdapi.camera.lookAt(x, y, z, 1000, -45, 0, 2);
// 直接设置相机位姿
fdapi.camera.set(-178.14, -8038.16, 250.47, -50.0, 90.0);
```

### 添加图标标注（Marker，核心参数）
```javascript
fdapi.marker.add({
  id: 'm1',
  groupId: 'markerAdd',
  coordinate: [x, y, z],
  coordinateType: 0,                 // 0 投影 / 1 WGS84
  imageSize: [50, 50],
  imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
  anchors: [-25, 50],                // 锚点：x=-width/2, y=height
  text: '北京银行',
  fontSize: 24,
  fontColor: Color.White,
  showLine: true,                    // 下方牵引线
  displayMode: 4,                    // 智能显示模式
}, () => console.log('完成'));
// 完整参数（弹窗 popupURL、聚合、避让、可视范围等）见 api/marker/marker.md
```

### 批量更新
```javascript
fdapi.polygon.updateBegin();
fdapi.polygon.update({ id: 'p1', color: [1, 0, 0, 0.5] });
fdapi.polygon.update({ id: 'p2', color: [0, 1, 0, 0.5] });
fdapi.polygon.updateEnd(() => console.log('更新完成'));
```

## 最佳实践

1. **先就绪后调用**：所有 API 调用置于 `onReady` 回调之后；工程未就绪即调用有崩溃风险。
2. **批量优先**：大量增改用 `add(数组)` 或 `updateBegin()` … `updateEnd()`，减少命令往返（详见 `tutorials/performance.md`，含「接口调用注意事项」清单）。
3. **资源释放**：对象用完及时 `delete` / `clear`；切换场景或卸载组件调用 `fdapi.destroy()` / `fdplayer.destroy()`；跟随/动画结束调用 `cancelFollow` / `stopAnimation`。
4. **坐标一致**：标注与相机坐标须与场景坐标系（投影 / 球面）一致，否则定位偏移（详见 `tutorials/coordinates.md`、排错见 `tutorials/troubleshooting.md`）。
5. **异步不混用**：同一函数体内回调 / `.then()` / `await` 三选一（`tutorials/async-call.md`）。
6. **版本匹配**：`ac.min.js` 须与云渲染服务端版本一致，推荐云端引用 `http://<IP:Port>/libac` 免拷贝（`tutorials/hello-world.md`）。

## 文件路径速查
| 内容 | 路径 |
|------|------|
| 某类完整方法/参数/示例 | `api/<分类>/<文件>.md`（见上方类索引） |
| 全局枚举与类型 | `api/types.md` |
| 入门与概念教程 | `tutorials/<主题>.md`（见上方教程索引） |
| 事件回调说明 | `api/events/<文件>.md` |

## 使用本 Skill 的规范

1. **校验生成代码**：生成的 `fdapi` 代码必须自检——方法名、参数顺序与类型须与对应类文档（`api/<分类>/<文件>.md` 的「方法列表」与参数表）一致；**禁止臆造不存在的接口或参数**，不确定的参数留 `// TODO` 注释而非编造。
2. **照文档用法**：能在「实战配方」或类文档中找到的用法优先照用，不要自创调用方式。
3. **占位需替换**：示例中的坐标、`id`、资源路径均为占位值，须提示用户替换为真实工程值；坐标系（投影 / 经纬度）以用户场景为准。

## 如何使用

1. 先按用户意图在「查询路由」/「实战配方（`tutorials/recipes.md`）」定位最相近的场景；
2. 阅读该场景涉及的**类文档**（`api/<分类>/<文件>.md`，含方法列表、参数表与示例）；
3. 结合「调用约定」与「初始化模板」完成代码；
4. **完成前再次核对**所用 API 的方法名与参数是否与文档一致（见上方「使用本 Skill 的规范」第 1 条）。

## 与其他 Skill 协作

- 欢迎大家补充各自垂直业务的skill