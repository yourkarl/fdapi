---
title: 基本概念
sidebar_label: 基本概念
description: "DTS Cloud SDK 的架构说明、接入方式、云渲染原理介绍"
---

### 二次开发中的基础概念介绍

#### 一、常见坐标解释

目前云渲染支持四类坐标系，这几种坐标系可以调用相关函数进行转换。

屏幕坐标：

以显示器屏幕显现的位置信息构成屏幕坐标系，通常以像素为单位 。

屏幕坐标系为三维坐标系，但显示屏是二维平面的，（x,y）表示位置信息，屏幕左上角为（0,0）点【原点】，X值从屏幕左侧往右侧递增，Y值从上往下递增。以1920*1080的屏幕分辨率为例，右下角为（1920,1080）.X、Y的可视值域取决于你当前显示设备的分辨率,超出视野之外依然有数值，只是不显示在场景窗口中。z值表示深度。

![屏幕坐标系示意](/img/refdoc/api/screencoord.png)

模型的屏幕坐标：（x，y）用分辨率宽高表示。

UI元素的屏幕坐标：同上。

输入的鼠标位置和触摸位置，其屏幕坐标为横纵由分辨率表示，Z值默认为0.

场景坐标：

以X、Y、Z值表示的空间直角坐标系。用来表示三维场景中的模型UI元素的物理位置。

即东西方向为X轴，正东方向为X轴正值；南北方向为Y轴，正北方向为Y轴正值；上下方向为Z轴，上方向为Z轴正值。 如下图：

![场景坐标系（右手系）](/img/refdoc/api/righthand-1.png)
![场景坐标系坐标轴](/img/refdoc/api/righthand-2.png)

注意：如果我们把一个相机坐标放在我们认为场景坐标系的原点上，这时候相机坐标就等于场景坐标。场景坐标也可以称作为世界坐标。

地理坐标：

地理坐标系 (GCS) 使用三维球面来定义地球上的位置。以经度、维度、海拔高度表示的地理空间坐标系，例如WGS84、CGCS2000。

投影坐标：

投影坐标系在二维平面中进行定义。与地理坐标系不同，在二维空间范围内，投影坐标系的长度、角度和面积恒定。投影坐标系始终基于地理坐标系，而后者则是基于球体或旋转椭球体的。

在投影坐标系中，通过格网上的 x,y 坐标来标识位置，其原点位于格网中心。每个位置均具有两个值，这两个值是相对于该中心位置的坐标。一个指定其水平位置，另一个指定其垂直位置。这两个值称为 x 坐标和 y 坐标。采用此标记法，原点坐标是 x = 0 和 y = 0。

在等间隔水平线和垂直线的格网化网络中，中央水平线称为 x 轴，而中央垂直线称为 y 轴。在 x 和 y 的整个范围内，单位保持不变且间隔相等。原点上方的水平线和原点右侧的垂直线具有正值；下方或左侧的线具有负值。四个象限分别表示正负 X 坐标和 Y 坐标的四种可能组合。

投影坐标系通常也称为本地坐标系。







#### 二、常见名词解释

在二次开发的过程中你可能会遇到地理信息相关的一些专业名词，请在开发前仔细阅读以下名词解释：

BBox：即3D Bounding Box，3D物体的包围盒，用于表示三维物体坐标的取值边界，取值方法如下： 在已经渲染成功的视频流场景中坐标至少选择两个点， 例如： [ 488654.71875, 2890294.5, 5.0999999046325684 ],[ 494277.71875, 2789172, -0.0010937500046566129 ]，分别取各坐标点最小和最大的X、Y、Z值，分别再组成两个点： "BoundsMin": [ 488654.71875, 2789172, -0.0010937500046566129 ] "BoundsMax": [ 494277.71875, 2890294.5, 5.0999999046325684 ] 其中由坐标值较小的那个点即BoundsMin[minX,minY,minZ]，沿对应X、Y、Z坐标轴延伸至maxX、maxY、maxZ对应的值，延伸后的三条线组成的空间盒子就是BBox，如下图：

![BBox 包围盒示意](/img/refdoc/api/bbox.png)

相机：即Camera，就像大家拍照使用的相机，用来确定观察三维场景的视角。 在计算机图形学中常用来定义用户和场景的相对位置和朝向，和我们真实世界人的眼睛一样。 相机包含两个重要的位置参数：观察点（镜头位置 position）；目标点（被拍摄物体位置 target），如下图：

![相机观察点与目标点](/img/refdoc/api/camera-1.png)
![相机视角示意](/img/refdoc/api/camera-2.png)

观察点：摄像机镜头位置的初始坐标[X,Y,Z]（眼睛位置）

目标点：摄像机镜头对准的被观察物体的坐标位置[X,Y,Z]

观察点和目标点距离：摄像机镜头位置距离被观察物体的距离，单位是米

视口：即Viewport可视窗口，浏览器某块矩形绘图区域，用来展示视频流；可以对一个窗口进行切分，在同一个窗口显示分割屏幕的效果，以便显示多个可视窗口。

投影：即Projection，生活中的物体都是三维的，但是人的眼睛只能看到正面，不能看到被遮挡的背面，三维几何体在人的眼睛中的效果就像相机拍摄的一张二维照片，你看到的是一个2D的投影图。我们在计算机中看到的3D画面其实就是计算机把三维空间中的物体从世界坐标系 通过各种复杂计算投影到屏幕坐标系并显示在视口中。投影其实就是空间几何体转化为一个二维图的过程，不同的投影方式对应不同的投影算法。 常见投影方式分正射投影和透视投影，在机械设计、工业设计领域常用正射投影（平行投影），游戏场景（AirCloud云渲染场景）常用透视投影（中心投影）。 透视投影：又叫中心投影，距离镜头近的物体大，距离镜头远的物体小。类似人类眼睛观察真实世界。 正射投影：又叫平行投影，无论距离相机镜头多远，投影后的物体大小尺寸不变。投影尺寸取决于观察角度。

![正射投影与透视投影](/img/refdoc/api/projection.png)

欧拉角：即Euler angles，由瑞士数学家欧拉提出，指物体绕坐标系三个坐标轴（X、Y、Z）的旋转角度， 用来表示三维物体的基本旋转，旋转分以下两种情况： 静态旋转：即绕世界坐标系的三个轴旋转，三维物体在旋转过程中坐标轴保持静止；ACP渲染的场景中的物体旋转默认为静态旋转。 动态旋转：即绕物体坐标系的三个轴旋转，三维物体在旋转过程中坐标轴随着物体一起做相同旋转，即场景视角也旋转。 想象一下飞机，Yaw指水平方向的机头航向，绕Y轴旋转；Pitch指与水平方向的夹角，绕X轴旋转；Roll指飞机的翻滚，绕Z轴旋转。如下图：

![欧拉角 Pitch/Yaw/Roll 示意](/img/refdoc/api/eulerangles.png)

俯仰-Pitch：上下旋转角度，欧拉角向量的X轴，取值范围：[-90~+90]

航向-Yaw：左右旋转角度，欧拉角向量的Y轴，取值范围：[-180~+180]

翻滚-Roll：翻滚角度，欧拉角向量的Z轴











```
<br>
```

WMTS服务：全称OpenGIS Web Map Tile Service，即Web地图切片服务，由国际组织开放地理空间联盟(OCG)提出的一种缓存技术标准。 提供了一种采用预定义图块方法发布数字地图服务的标准化解决方案，可以通过RESTful方式访问，是WMS服务的改进版，服务端可缓存且访问性能更优。

MVT服务：Mapbox vector tile，即Mapbox 矢量瓦片服务，是Mapbox（地图盒子）提供的一种矢量瓦片数据编码服务。

#### 三、常用几何对象

以下是API中常用的几何对象，包含点、线、面、三维形状和一些标注等。

Polyline：折线/多段线，用来创建仅包含一段或多段直线的形状。创建后的Polyline可以设置多种显示效果，以及多种应用。

ODline：OD线，即Origin-Destination Line，用来描述起点和终点的连线，通常表示两点之间的关系，如航班线路、人口迁徙、交通流量、经济往来等。

Polygon：多边形，用来创建包含不少于三个边的多边形。

3DPolygon：三维多边形，三维空间的多面体。

TileLayer：三维图层对象，即3DT文件。

Cesium3DTileset： 3D Tiles是由Cesium创立的用于流式传输大规模异构3D地理空间数据集的开放规范。在DTS平台中泛指为符合这种规范的数据及服务。

HeatMap：热力图，如建筑物受力分析区域等。

HighlightArea：高亮区域，如高亮显示建筑物某一区域等。

RadiationPoint：辐射圈，模拟显示辐射效果，如展示一个区域的污染源影响范围等。

CustomMesh：自定义三角网格，模拟流体等。

CustomObject：自定义对象，可以操作TileLayer中的Actor对象，对其进行平移缩放着色等。

Beam：光流粒子/光束，可以在场景中模拟显示车流方向等。

Tag：标签，可以在场景中添加一个包含图像和文字的标签。（停止维护，建议使用Marker）

Marker：标注，更加强大的标签对象，支持更多的属性设置。

Marker3D：三维动态标注，可以在场景中添加动态标注。

CustomTag：自定义标签，支持对Tag进行更多的样式设置。

#### 四、常用文件格式

ShapeFile：后缀为.shp，美国环境系统研究所公司（ESRI）开发的一种空间数据文件格式，是地理信息软件界的一个开放标准，也是一种重要的数据交换格式。 可以描述几何对象，点、折线和多边形，也可以存储建筑、河流、湖泊等空间对象的属性、几何形状与位置信息。

3DT：后缀为.3dt，飞渡科技DTS高渲染平台针对数字孪生体场景的特点和需求，独创了专属的标准数字孪生数据库——3D Twins Scenes Database（简称为3DT）。 3DT可以实现数据的优化和加速，增强用户在DTS高渲染平台中的操作体验。

#### 五、SDK 类一览

按 [API 文档](/docs/api/quickstart/digital-twin-api)的分类组织，列出 SDK 全部类对象及一句话说明，点击类名查看完整接口与方法列表。

##### 核心对象

| 类 / 对象 | 说明 |
|-----------|------|
| [DigitalTwinAPI](/docs/api/quickstart/digital-twin-api) | DigitalTwinAPI 是 JS SDK 的总类与 API 总入口，new 之后通过全局变量 fdapi 调用所有接口，是连接与调用的核心对象。 |
| [DigitalTwinPlayer](/docs/api/quickstart/digital-twin-player) | DigitalTwinPlayer 是云渲染视频流对象，在网页上创建并显示三维视频流，并承载键盘、鼠标、触摸等交互。 |

##### 相机操作

| 类 / 对象 | 说明 |
|-----------|------|
| [Camera](/docs/api/camera/camera) | Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。 |
| [CameraTour](/docs/api/camera/camera-tour) | CameraTour 是相机导览（漫游）动画对象，用于按关键帧序列驱动相机沿预设路线自动飞行、播放、暂停与停止，实现自动巡游展示。 |

##### 图层操作

| 类 / 对象 | 说明 |
|-----------|------|
| [InfoTree](/docs/api/layer/info-tree) | 管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。 |
| [TileLayer](/docs/api/layer/tile-layer) | TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。 |
| [ShapeFileLayer](/docs/api/layer/shape-file-layer) | ShapeFileLayer 加载并管理 Shapefile 矢量数据（点/线/面），在三维场景中按样式渲染与查询。 |
| [GeoJSONLayer](/docs/api/layer/geo-json-layer) | 从本地文件或 URL 加载标准 GeoJSON 矢量数据并进行符号化渲染，支持点、线、面（含 Polygon3D 拉伸体块）多种可视化类型与渲染器，可配合文字标注、贴地与可视范围控制。 |
| [Cesium3DTileset](/docs/api/layer/cesium3dtileset) | 加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。 |
| [ImageryLayer](/docs/api/layer/imagery-layer) | 加载与管理 WMTS、WMS、MapServer 等网络地图服务图层，将卫星影像、电子地图等作为场景底图叠加，可批量添加并支持坐标系、切片方案等参数配置。 |
| [MarkerLayer](/docs/api/layer/marker-layer) | 标注图层对象，按相机距离分三个层级（圆形标记点、标记图片、Marker 标注）自适应展示点位，支持文字、图标、弹窗、多种坐标系与可视范围控制，用于在三维场景中海量标注业务点位。 |
| [GlobeTerrain](/docs/api/layer/globe-terrain) | 球面坐标系下管理 Cesium 球面地形与影像服务的对象，可在数字地球上叠加 WMTS、WMS、MVT、TMS 等 OGC 网络图层服务，构建全球/大范围三维球面底图与地形。 |
| [DaHuaVideoFusion](/docs/api/layer/da-hua-video-fusion) | 对接大华 ICC 开放平台的视频融合对象，将实时摄像头视频流投射融合到三维场景中，并提供可点击定位的摄像头标签。 |
| [ImageryLayer2](/docs/api/layer/imagery-layer-2) | 球面坐标系下通过自定义切片参数加载 WMTS、WMS、MVT、TMS 等网络图层服务，可指定原点、瓦片尺寸、层级范围与 extent 等，适配各厂商服务规则。 |

##### 绘制助手

| 类 / 对象 | 说明 |
|-----------|------|
| [Plot](/docs/api/measure/plot) | Plot 用于绘制点/线/面态势图标与军标，支持态势标绘与编辑，是指挥与态势图层的标号载体。 |
| [EditHelper](/docs/api/measure/edit-helper) | 在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。 |

##### 测量分析

| 类 / 对象 | 说明 |
|-----------|------|
| [Tools](/docs/api/analysis/tools) | Tools 提供量算与空间分析等通用工具能力（如测距、测面、天际线、通视、坡度、剖切、河道断面等，具体以方法为准）。 |
| [ExcavationAnalysis](/docs/api/analysis/excavation-analysis) | ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。 |

##### 环境天气

| 类 / 对象 | 说明 |
|-----------|------|
| [Weather](/docs/api/weather/weather) | Weather 设置与获取场景的天气/气象效果（晴雨雪雾、时间、光照等环境特效）。 |

##### 系统设置

| 类 / 对象 | 说明 |
|-----------|------|
| [Settings](/docs/api/settings/settings) | Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。 |
| [SettingsPanel](/docs/api/settings/settings-panel) | SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。 |

##### 辅助工具

| 类 / 对象 | 说明 |
|-----------|------|
| [Coord](/docs/api/utils/coord) | Coord 提供坐标系之间的转换工具（投影、经纬度、场景坐标互转等）。 |
| [FdExternal](/docs/api/utils/fd-external) | FdExternal 封装进程内 JS 与底层 C++ 的互操作，用于 Explorer WebUI、Marker 弹窗、JSTick 调试窗等 CEF 页面里直接调用底层能力。 |
| [QueryOption](/docs/api/analysis/query-option) | 数据库/属性查询的选项配置对象，用于设置查询字段、过滤条件与范围，作为查询接口的参数。 |
| [Misc](/docs/api/weather/misc) | Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。 |

##### 模型操作

| 类 / 对象 | 说明 |
|-----------|------|
| [CustomMesh](/docs/api/model/custom-mesh) | CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。 |
| [CustomObject](/docs/api/model/custom-object) | CustomObject 加载用户自定义三维模型并控制其位置、姿态、动画、跟随与交互，是通用的“动态实体”载体。 |
| [GaussianSplatting](/docs/api/model/gaussian-splatting) | GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。 |
| [SplineMesh](/docs/api/vector/spline-mesh) | 沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。 |

##### 场景标记

| 类 / 对象 | 说明 |
|-----------|------|
| [Marker](/docs/api/marker/marker) | 在三维场景指定坐标处放置带图标与文字的标注点，是最常用的点位标记对象，支持图标、悬停图片、文字、可视范围、分组及交互事件，用于标识地物、设备、事件等关键点位。 |
| [CustomTag](/docs/api/marker/custom-tag) | 用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。 |
| [Marker3D](/docs/api/marker/marker3d) | 在三维场景中放置带特效的立体标注（动态标记），相较于二维 Marker 具有三维朝向、缩放、旋转与粒子/光效等表现力，并可叠加三维文字，用于强调重点目标或营造动态告警效果。 |
| [Tag](/docs/api/vector/tag) | 在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。） |

##### 矢量图形

| 类 / 对象 | 说明 |
|-----------|------|
| [Polyline](/docs/api/vector/polyline) | 绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。 |
| [ODLine](/docs/api/vector/odline) | 以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。 |
| [TopologyLine](/docs/api/vector/topology-line) | TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。 |
| [Polygon](/docs/api/vector/polygon) | 绘制贴地的二维多边形面，用于表达区域、地块与范围，支持多边形带洞（孔洞）及多 Part 复合多边形，可填充颜色表达分区属性。 |
| [Polygon3D](/docs/api/vector/polygon3d) | 在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。 |
| [GuideLine](/docs/api/vector/guide-line) | 在三维场景中绘制带流动动画的引导线，用于指示路径、动线与流向，支持直线/曲线样式、宽度与速度，常用于强调移动轨迹与导览路线。 |
| [Beam](/docs/api/signal/beam) | Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。 |

##### 覆盖物

| 类 / 对象 | 说明 |
|-----------|------|
| [Decal](/docs/api/overlay/decal) | Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。 |
| [HeatMap](/docs/api/overlay/heatmap) | HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。 |
| [HeatMap3D](/docs/api/overlay/heatmap3d) | HeatMap3D 在三维空间内构建体热力图，支持空间图片、离散点、体素、稀疏体素等多种构建方式，以体积雾、体素、盒子或贴花等显示模式表达数据在三维空间中的分布与浓度。 |
| [HighlightArea](/docs/api/overlay/highlight-area) | HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。 |
| [VideoProjection](/docs/api/overlay/video-projection) | VideoProjection 将视频/实时流以投影方式贴合到三维场景表面，实现视频与三维的融合。 |
| [Panorama](/docs/api/overlay/panorama) | Panorama 在三维场景的指定坐标处加载并展示 360° 全景照片，使用户可在该点位沉浸式查看真实环境，实现三维模型与实景全景的融合浏览。 |
| [Light](/docs/api/overlay/light) | Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。 |
| [RadiationPoint](/docs/api/overlay/radiation-point) | RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。 |

##### 海洋仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [OceanHeatMap](/docs/api/ocean/ocean-heatmap) | OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。 |
| [Coastline](/docs/api/ocean/coastline) | 用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。 |
| [VectorField](/docs/api/vector/vector-field) | VectorField 基于真实数据(tif/bin)对风场、波浪、洋流、河流等场数据进行向量场/箭头/烟雾形态的仿真。 |

##### 水文仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [DynamicWater](/docs/api/hydro/dynamic-water) | DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。 |
| [FloodFill](/docs/api/hydro/flood-fill) | FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。 |
| [WaterFlowField](/docs/api/hydro/water-flow-field) | WaterFlowField 精确控制水面各网格的流向与流速，构建可控的水流流场效果。 |
| [WaterMesh](/docs/api/hydro/water-mesh) | WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。 |
| [HydroDynamic1D](/docs/api/hydro/hydrodynamic1d) | HydroDynamic1D 是一维水动力模型对象，沿河道中心线以采样点（坐标、河道宽度、流速、热力值）描述河道，生成带流向箭头与水面/热力样式的动态河道，可用 shp 文件裁切河道范围，适合表达带状河流的水流与水文属性。 |
| [HydroDynamic2D](/docs/api/hydro/hydrodynamic2d) | HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。 |
| [HydrodynamicModel](/docs/api/hydro/hydrodynamic-model) | 早期版本的二维水动力模型对象，基于真实数据（水深、流速流向、河道 DEM）驱动生成，支持水体/热力样式与流向着色；该对象已废弃，新项目请改用 HydroDynamic2D。 |
| [HydrodynamicModel2](/docs/api/hydro/hydrodynamic-model-2) | HydrodynamicModel2 是早期的二维水动力模型对象，基于 JSON 数据文件驱动，按时序播放水深/流速等结果并以调色板着色，用于在三维场景中回放二维水动力计算成果。**该对象已废弃、待移除，新项目请改用 HydroDynamic2D 对象。** |
| [SmoothedParticleHydrodynamics](/docs/api/hydro/smoothed-particle-hydrodynamics) | SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。 |
| [River](/docs/api/hydro/river) | River（等价于一维水动力模型 Hydrodynamic1D）模拟河道水位、流量、流速的沿程演进，可视化河道水流过程。 |
| [Fluid](/docs/api/hydro/fluid) | Fluid 在指定包围盒（bbox）内进行实时流体仿真，通过出水点（sources）的位置、流速流向、形状与持续时间驱动水体流动，内置 28 种水样式，用于表达喷涌、漫流、注水等动态流体效果。 |

##### 信号仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [Antenna](/docs/api/signal/antenna) | Antenna 以方向图形式可视化天线的辐射/增益方向特性。 |
| [SignalWave](/docs/api/signal/signal-wave) | SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。 |

##### 交通仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [Vehicle](/docs/api/traffic/vehicle) | Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。 |
| [Vehicle2](/docs/api/traffic/vehicle-2) | Vehicle2 是高级载具对象，在 Vehicle 基础上提供更丰富的车辆驱动、外观与行为控制。 |
| [Train](/docs/api/traffic/train) | 在三维场景中加载并沿指定轨迹运行的列车对象，支持车头朝向、双车头、车厢节数与样式、最大速度与加减速度，模拟列车在轨道上的行驶。 |
| [Drone](/docs/api/traffic/drone) | 在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。 |
| [TrafficSimulation](/docs/api/traffic/traffic-simulation) | TrafficSimulation 提供城市级交通仿真能力，支持十万级别车辆的微观交通仿真，可通过 .dat 数据驱动大批量车辆按时间/定时器移动，并内置交通热力图模式与多车型配置。 |
| [BoxTrigger](/docs/api/traffic/box-trigger) | BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。 |

##### 卫星仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [Satellite](/docs/api/traffic/satellite) | Satellite 用于球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。 |

##### 有限元仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [FiniteElement](/docs/api/fem/finite-element) | FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。 |
| [FiniteElement2](/docs/api/fem/finite-element-2) | FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。 |

##### 战场仿真

| 类 / 对象 | 说明 |
|-----------|------|
| [Plot](/docs/api/battle/plot) | Plot 用于绘制点/线/面态势图标与军标，支持态势标绘与编辑，是指挥与态势图层的标号载体。 |
| [BattlefieldSimulation](/docs/api/battle/battlefield-simulation) | BattlefieldSimulation 加载并驱动装甲车、坦克、无人机、士兵等作战单元，模拟战场机动、编队与态势演进。 |

