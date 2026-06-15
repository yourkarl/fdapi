---
slug: /api/types
title: 类型与枚举
sidebar_label: 类型与枚举
description: "API 参数中用到的对象类型与枚举常量（Color、各类 Style 样式、Mode 模式等）的取值参考"
---

# 类型与枚举

本页汇总 API 参数中常见的**对象类型**与**枚举常量**取值。参数表中的类型名（如 `Color`、`PolygonStyle`）均链接至此。

> 颜色相关参数（类型 `Color`）的四种取值格式与示例，另见 [颜色系统](/docs/tutorials/color)。

## 索引

[`ActionMode`](#actionmode) · [`AnimationMask`](#animationmask) · [`APIErrorCode`](#apierrorcode) · [`AssetType`](#assettype) · [`BPFuncParamType`](#bpfuncparamtype) · [`CloudStatus`](#cloudstatus) · [`Color`](#color) · [`DroneTrailStyle`](#dronetrailstyle) · [`FieldType`](#fieldtype) · [`ForwardAxis`](#forwardaxis) · [`HeatMapStyle`](#heatmapstyle) · [`HydroDynamic2DStyle`](#hydrodynamic2dstyle) · [`MapMode`](#mapmode) · [`MeasurementMode`](#measurementmode) · [`MousePickMask`](#mousepickmask) · [`OceanHeatMapStyle`](#oceanheatmapstyle) · [`PanelType`](#paneltype) · [`PlotStyle`](#plotstyle) · [`Polygon3DStyle`](#polygon3dstyle) · [`PolygonStyle`](#polygonstyle) · [`PolylineStyle`](#polylinestyle) · [`RendererType`](#renderertype) · [`ResetType`](#resettype) · [`SplineMeshStyle`](#splinemeshstyle) · [`UIPanelType`](#uipaneltype) · [`VectorFieldStyle`](#vectorfieldstyle) · [`VehicleViewMode`](#vehicleviewmode) · [`VERSION`](#version) · [`Viewport`](#viewport) · [`VisualType`](#visualtype) · [`WaterFlowFieldStyle`](#waterflowfieldstyle) · [`WaterMode`](#watermode)

## ActionMode

类型：`number` — 自定义对象视角跟随模式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `None` | 0 | 视角不跟随 |
| `Follow` | 1 | 视角跟随 |
| `FollowBehindAndAbove` | 2 | 后上方跟随 |
| `FollowBehind` | 3 | 后方跟随 |
| `FollowAbove` | 4 | 上方跟随 |
| `FollowBellow` | 5 | 下方跟随 |
| `FollowLeft` | 6 | 左方跟随 |
| `FollowRight` | 7 | 右方跟随 |
| `FollowWorldRotation` | 8 | 跟随世界的绝对朝向 |

## AnimationMask

类型：`number` — 播放导览动画时的配置掩码

| 成员 | 值 | 说明 |
|------|------|------|
| `Camera` | 1 | 相机位置 |
| `Environment` | 2 | 环境天气 |
| `ProjectTree` | 4 | 工程树属性 |
| `Settings` | 8 | 导览设置 |

## APIErrorCode

类型：`number` — WebSocket接口调用的错误代码

| 成员 | 值 | 说明 |
|------|------|------|
| `OK` | 0 | 正常 |
| `InvalidParameters` | 1 | 参数错误 |
| `InternalError` | 2 | 内部错误（环境尚未准备好、空指针等） |
| `ResourceNotFound` | 3 | 数据不存在 |
| `AcpProjWKTNotSet` | 4 | 工程未设置坐标系 |
| `CoordinateConversionFailed` | 5 | 坐标转换失败 |
| `IDExists` | 6 | 指定ID的对象已经存在了 |
| `InvalidRequestType` | 7 | 无效的请求类型 |
| `InvalidRequestString` | 8 | 无效的请求（包含了InvalidRequestType） |
| `NoCommand` | 9 | CommandFactory没有创建对应的Command |
| `DataTypeNotSupport` | 10 | 不支持这种类型的数据（比如压平操作只能是OSGB和Terrain） |
| `InvalidOperation` | 11 | 无效的操作 |
| `ProjectNotOpened` | 12 | 工程尚未打开，此时不能进行API调用！ |
| `CodeMax` | 65535 |  |

## AssetType

类型：`number` — ACP工程包含的资产类型

| 成员 | 值 | 说明 |
|------|------|------|
| `EPT_Scene` | 1 | 场景3DT |
| `EPT_ModelActor` | 2 | 场景模型Actor |
| `EPT_Measurement` | 3 | 测量 |
| `EPT_Cut` | 4 | 剖切体 |
| `EPT_DynamicWater` | 5 | 动态水 |
| `EPT_Vehicle` | 6 | 车辆 |
| `EPT_Tag` | 7 | 标签 |
| `EPT_Light` | 8 | 灯光 |
| `EPT_Decal` | 9 | 贴花 |
| `EPT_LightBeam` | 10 | 光流 |
| `EPT_RadiationPoint` | 11 | 辐射圈 |
| `EPT_Surface` | 12 | 面 |
| `EPT_ShpPoint` | 13 | 点Shape |
| `EPT_ShpPolyline` | 14 | 折线Shape |
| `EPT_ShpPolygon` | 15 | 多边形Shape |
| `EPT_Polyline` | 16 | 折线 |
| `EPT_VideoProjector` | 17 | 视频投影 |
| `EPT_Panoramic` | 18 | 全景图 |
| `EPT_FlattenModifier` | 19 | 压平 |
| `EPT_Cesium` | 20 | Cesium3DTileset |
| `EPT_CutPolygonModifier` | 21 | 挖洞 |
| `EPT_EffectPoint` | 22 | 动态标记 |
| `EPT_S3MLayer` | 23 | S3M Layer |
| `EPT_ParticleActor` | 24 | 粒子 |
| `EPT_RoleActor` | 25 | 角色 |
| `EPT_SoundActor` | 26 | 声音 |
| `EPT_CustomActor` | 27 | 自定义模型：CustomObject |
| `EPT_CameraTour` | 28 | 导览 |
| `EPT_Animation` | 29 | 动画 |

## BPFuncParamType

类型：`number` — 蓝图函数参数类型

| 成员 | 值 | 说明 |
|------|------|------|
| `Bool` | 0 | Bool |
| `UInt8` | 1 | UInt8 |
| `Int32` | 2 | Int32 |
| `Float` | 3 | Float |
| `Double` | 4 | Double |
| `String` | 5 | String |
| `Color` | 6 | Color |
| `Vector2D` | 7 | Vector2D |
| `Vector` | 8 | Vector |
| `Rotator` | 9 | Rotator |
| `IntArray` | 10 | IntArray |
| `StringArray` | 11 | StringArray |
| `VectorArray` | 12 | VectorArray |
| `Coordinate` | 13 | Coordinate 取值示例 |
| `CoordinateArray` | 14 | CoordinateArray 取值示例 |
| `FloatArray` | 15 | FloatArray |
| `DisplayStyle` | 16 | PointStyle IconStyle AnimationStyle |
| `CustomIconPath` | 17 | IconPath filepath |

## CloudStatus

类型：`number` — Cloud的运行状态 可以从视频窗口左上角闪烁的小圆点的颜色判断当前的运行状态

| 成员 | 值 | 说明 |
|------|------|------|
| `WS_Disconnected` | 0 | WebSocket连接断开（ 颜色：红 ） |
| `WS_Connecting` | 1 | WebSocket正在尝试连接（颜色：灰 ） |
| `WS_Connected` | 2 | WebSocket已连接，正在建立WebRTC连接（颜色：黄 ） |
| `RTC_Opened` | 3 | WebRTC通道已打开（颜色：蓝 ） |
| `Video_LoadedMetaData` | 4 | 视频流元数据已加载（内部使用） |
| `OnReady` | 5 | Acp工程已打开（颜色：绿 ） |

## Color

类型：`string` — 预定义的颜色值 接口中颜色参数可以使用这些预定义的颜色值

| 成员 | 值 | 说明 |
|------|------|------|
| `LightPink` | RGB(255,182,193) | 浅粉红 |
| `Pink` | RGB(255,192,203) | 粉红 |
| `Crimson` | RGB(220,20,60) | 猩红 |
| `LavenderBlush` | RGB(255,240,245) | 脸红的淡紫色 |
| `PaleVioletRed` | RGB(219,112,147) | 苍白的紫罗兰红色 |
| `HotPink` | RGB(255,105,180) | 热情的粉红 |
| `DeepPink` | RGB(255,20,147) | 深粉色 |
| `MediumVioletRed` | RGB(199,21,133) | 适中的紫罗兰红色 |
| `Orchid` | RGB(218,112,214) | 兰花的紫色 |
| `Thistle` | RGB(216,191,216) | 蓟 |
| `plum` | RGB(221,160,221) | 李子 |
| `Violet` | RGB(238,130,238) | 紫罗兰 |
| `Magenta` | RGB(255,0,255) | 洋红 |
| `Fuchsia` | RGB(255,0,255) | 灯笼海棠(紫红色) |
| `DarkMagenta` | RGB(139,0,139) | 深洋红色 |
| `Purple` | RGB(128,0,128) | 紫色 |
| `MediumOrchid` | RGB(186,85,211) | 适中的兰花紫 |
| `DarkVoilet` | RGB(148,0,211) | 深紫罗兰色 |
| `DarkOrchid` | RGB(153,50,204) | 深兰花紫 |
| `Indigo` | RGB(75,0,130) | 靛青 |
| `BlueViolet` | RGB(138,43,226) | 深紫罗兰的蓝色 |
| `MediumPurple` | RGB(147,112,219) | 适中的紫色 |
| `MediumSlateBlue` | RGB(123,104,238) | 适中的板岩暗蓝灰色 |
| `SlateBlue` | RGB(106,90,205) | 板岩暗蓝灰色 |
| `DarkSlateBlue` | RGB(72,61,139) | 深岩暗蓝灰色 |
| `Lavender` | RGB(230,230,250) | 熏衣草花的淡紫色 |
| `GhostWhite` | RGB(248,248,255) | 幽灵的白色 |
| `Blue` | RGB(0,0,255) | 纯蓝 |
| `MediumBlue` | RGB(0,0,205) | 适中的蓝色 |
| `MidnightBlue` | RGB(25,25,112) | 午夜的蓝色 |
| `DarkBlue` | RGB(0,0,139) | 深蓝色 |
| `Navy` | RGB(0,0,128) | 海军蓝 |
| `RoyalBlue` | RGB(65,105,225) | 皇家蓝 |
| `CornflowerBlue` | RGB(100,149,237) | 矢车菊的蓝色 |
| `LightSteelBlue` | RGB(176,196,222) | 淡钢蓝 |
| `LightSlateGray` | RGB(119,136,153) | 浅石板灰 |
| `SlateGray` | RGB(112,128,144) | 石板灰 |
| `DoderBlue` | RGB(30,144,255) | 道奇蓝 |
| `AliceBlue` | RGB(240,248,255) | 爱丽丝蓝 |
| `SteelBlue` | RGB(70,130,180) | 钢蓝 |
| `LightSkyBlue` | RGB(135,206,250) | 淡蓝色 |
| `SkyBlue` | RGB(135,206,235) | 天蓝色 |
| `DeepSkyBlue` | RGB(0,191,255) | 深天蓝 |
| `LightBLue` | RGB(173,216,230) | 淡蓝 |
| `PowDerBlue` | RGB(176,224,230) | 火药蓝 |
| `CadetBlue` | RGB(95,158,160) | 军校蓝 |
| `Azure` | RGB(240,255,255) | 蔚蓝色 |
| `LightCyan` | RGB(225,255,255) | 淡青色 |
| `PaleTurquoise` | RGB(175,238,238) | 苍白的绿宝石 |
| `Cyan` | RGB(0,255,255) | 青色 |
| `Aqua` | RGB(212,242,231) | 水绿色 |
| `DarkTurquoise` | RGB(0,206,209) | 深绿宝石 |
| `DarkSlateGray` | RGB(47,79,79) | 深石板灰 |
| `DarkCyan` | RGB(0,139,139) | 深青色 |
| `Teal` | RGB(0,128,128) | 水鸭色 |
| `MediumTurquoise` | RGB(72,209,204) | 适中的绿宝石 |
| `LightSeaGreen` | RGB(32,178,170) | 浅海洋绿 |
| `Turquoise` | RGB(64,224,208) | 绿宝石 |
| `Auqamarin` | RGB(127,255,170) | 绿玉\碧绿色 |
| `MediumAquamarine` | RGB(0,250,154) | 适中的碧绿色 |
| `MediumSpringGreen` | RGB(0,255,127) | 适中的春天的绿色 |
| `MintCream` | RGB(245,255,250) | 薄荷奶油 |
| `SpringGreen` | RGB(60,179,113) | 春天的绿色 |
| `SeaGreen` | RGB(46,139,87) | 海洋绿 |
| `Honeydew` | RGB(240,255,240) | 蜂蜜 |
| `LightGreen` | RGB(144,238,144) | 淡绿色 |
| `PaleGreen` | RGB(152,251,152) | 苍白的绿色 |
| `DarkSeaGreen` | RGB(143,188,143) | 深海洋绿 |
| `LimeGreen` | RGB(50,205,50) | 酸橙绿 |
| `Lime` | RGB(0,255,0) | 酸橙色 |
| `ForestGreen` | RGB(34,139,34) | 森林绿 |
| `Green` | RGB(0,128,0) | 纯绿 |
| `DarkGreen` | RGB(0,100,0) | 深绿色 |
| `Chartreuse` | RGB(127,255,0) | 查特酒绿 |
| `LawnGreen` | RGB(124,252,0) | 草坪绿 |
| `GreenYellow` | RGB(173,255,47) | 绿黄色 |
| `OliveDrab` | RGB(85,107,47) | 橄榄土褐色 |
| `Beige` | RGB(245,245,220) | 米色(浅褐色) |
| `LightGoldenrodYellow` | RGB(250,250,210) | 浅秋麒麟黄 |
| `Ivory` | RGB(255,255,240) | 象牙 |
| `LightYellow` | RGB(255,255,224) | 浅黄色 |
| `Yellow` | RGB(255,255,0) | 纯黄 |
| `Olive` | RGB(128,128,0) | 橄榄 |
| `DarkKhaki` | RGB(189,183,107) | 深卡其布 |
| `LemonChiffon` | RGB(255,250,205) | 柠檬薄纱 |
| `PaleGodenrod` | RGB(238,232,170) | 灰秋麒麟 |
| `Khaki` | RGB(240,230,140) | 卡其布 |
| `Gold` | RGB(255,215,0) | 金 |
| `Cornislk` | RGB(255,248,220) | 玉米色 |
| `GoldEnrod` | RGB(218,165,32) | 秋麒麟 |
| `FloralWhite` | RGB(255,250,240) | 花的白色 |
| `OldLace` | RGB(253,245,230) | 老饰带 |
| `Wheat` | RGB(245,222,179) | 小麦色 |
| `Moccasin` | RGB(255,228,181) | 鹿皮鞋 |
| `Orange` | RGB(255,165,0) | 橙色 |
| `PapayaWhip` | RGB(255,239,213) | 番木瓜 |
| `BlanchedAlmond` | RGB(255,235,205) | 漂白的杏仁 |
| `NavajoWhite` | RGB(255,222,173) | 纳瓦霍白 |
| `AntiqueWhite` | RGB(250,235,215) | 古代的白色 |
| `Tan` | RGB(210,180,140) | 晒黑 |
| `BrulyWood` | RGB(222,184,135) | 结实的树 |
| `Bisque` | RGB(255,228,196) | (浓汤)乳脂,番茄等 |
| `DarkOrange` | RGB(255,140,0) | 深橙色 |
| `Linen` | RGB(250,240,230) | 亚麻布 |
| `Peru` | RGB(205,133,63) | 秘鲁 |
| `PeachPuff` | RGB(255,218,185) | 桃色 |
| `SandyBrown` | RGB(244,164,96) | 沙棕色 |
| `Chocolate` | RGB(210,105,30) | 巧克力 |
| `SaddleBrown` | RGB(139,69,19) | 马鞍棕色 |
| `SeaShell` | RGB(255,245,238) | 海贝壳 |
| `Sienna` | RGB(160,82,45) | 黄土赭色 |
| `LightSalmon` | RGB(255,160,122) | 浅鲜肉(鲑鱼)色 |
| `Coral` | RGB(255,127,80) | 珊瑚 |
| `OrangeRed` | RGB(255,69,0) | 橙红色 |
| `DarkSalmon` | RGB(233,150,122) | 深鲜肉(鲑鱼)色 |
| `Tomato` | RGB(255,99,71) | 番茄 |
| `MistyRose` | RGB(255,228,225) | 薄雾玫瑰 |
| `Salmon` | RGB(250,128,114) | 鲜肉(鲑鱼)色 |
| `Snow` | RGB(255,250,250) | 雪 |
| `LightCoral` | RGB(240,128,128) | 淡珊瑚色 |
| `RosyBrown` | RGB(188,143,143) | 玫瑰棕色 |
| `IndianRed` | RGB(205,92,92) | 印度红 |
| `Red` | RGB(255,0,0) | 纯红 |
| `Brown` | RGB(165,42,42) | 棕色 |
| `FireBrick` | RGB(178,34,34) | 耐火砖 |
| `DarkRed` | RGB(139,0,0) | 深红色 |
| `Maroon` | RGB(128,0,0) | 栗色 |
| `White` | RGB(255,255,255) | 纯白 |
| `WhiteSmoke` | RGB(245,245,245) | 白烟 |
| `Gainsboro` | RGB(220,220,220) | 亮灰色 |
| `LightGrey` | RGB(211,211,211) | 浅灰色 |
| `Silver` | RGB(192,192,192) | 银白色 |
| `DarkGray` | RGB(169,169,169) | 深灰色 |
| `Gray` | RGB(128,128,128) | 灰色 |
| `DimGray` | RGB(105,105,105) | 暗淡的灰色 |
| `Black` | RGB(0,0,0) | 纯黑 |

## DroneTrailStyle

类型：`number` — 无人机轨迹线样式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `None` | 0 | 无轨迹 |
| `Cylinder` | 1 | 圆柱拖尾 |
| `Strip` | 2 | 条带拖尾 |
| `Dot_Dash_Line` | 3 | 圆点虚线 |
| `Square_Dash_Line` | 4 | 方块虚线 |
| `Pixel_Line1` | 5 | 像素线1 |
| `Pixel_Line2` | 6 | 像素线2 |
| `Pixel_Line3` | 7 | 像素线3 |
| `Pixel_Line4` | 8 | 像素线4 |

## FieldType

类型：`number` — GeoJsonLayer属性字段类型

| 成员 | 值 | 说明 |
|------|------|------|
| `String` | 0 | 字符类型 |
| `Number` | 1 | 数值类型 |

## ForwardAxis

类型：`number` — 坐标轴的朝向

| 成员 | 值 | 说明 |
|------|------|------|
| `X` | 0 |  |
| `Y` | 1 |  |
| `Z` | 2 |  |

## HeatMapStyle

类型：`number` — 热力图样式

| 成员 | 值 | 说明 |
|------|------|------|
| `Normal` | -1 | 普通样式 |
| `CustomColor` | 0 | 贴地样式 |
| `CustomWave` | 1 | 波形样式 |

## HydroDynamic2DStyle

类型：`number` — 水动力模型的显示样式

| 成员 | 值 | 说明 |
|------|------|------|
| `TrueWater` | 0 | 真实水样式 |
| `HeatMap` | 1 | 热力图样式 |
| `Flow` | 2 | 流场样式 |

## MapMode

类型：`number` — 地图样式

| 成员 | 值 | 说明 |
|------|------|------|
| `Campass` | 0 | 指南针 |
| `SmallMap` | 1 | 鹰眼图 |
| `BigMap` | 2 | 大地图 |

## MeasurementMode

类型：`number` — 测量模式

| 成员 | 值 | 说明 |
|------|------|------|
| `Coordinate` | 1 | 点测量 |
| `Linear` | 2 | 直线测量 |
| `Horizontal` | 3 | 水平测量 |
| `Vertical` | 4 | 垂直测量 |
| `MultiPoint` | 5 | 多点（首尾连接构成多边形的投影面积） |
| `TerrainArea` | 6 | 地表面积 |
| `Angle` | 7 | 角度测量 |

## MousePickMask

类型：`number` — 鼠标拾取状态码，用于设置鼠标拾取功能

| 成员 | 值 | 说明 |
|------|------|------|
| `MouseClick` | 1 | 鼠标左键点击 |
| `MouseMove` | 2 | 鼠标移动 |
| `MouseHover` | 4 | 鼠标悬停 |

## OceanHeatMapStyle

类型：`number` — 海洋热力图对象样式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `Arrow` | 0 | 箭头 |
| `Flow` | 1 | 流场 |
| `Wave` | 2 | 波浪 |

## PanelType

类型：`number` — 系统自带分析面板的类型

| 成员 | 值 | 说明 |
|------|------|------|
| `ViewshedAnalysis` | 0 | 可视域分析面板 |
| `SkylineAnalysis` | 1 | 天际线分析面板 |
| `ViewDomeAnalysis` | 2 | 开敞度分析面板 |
| `VisiblityAnalysis` | 3 | 通视分析面板 |
| `FloodFillAnalysis` | 4 | 水淹分析面板 |
| `SolarAnalysis` | 5 | 日照分析面板 |
| `CutFillAnalysis` | 6 | 填挖方分析面板 |
| `TerrainSlopeAnalysi` | 7 | 坡度坡向分析面板 |
| `ContourLineAnalysis` | 8 | 等高线分析面板 |

## PlotStyle

类型：`number` — 军事态势标绘类型样式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `Polyline` | 0 | 折线 |
| `Circle` | 1 | 圆形 |
| `Triangle` | 2 | 三角形 |
| `Rectangle` | 3 | 矩形 |
| `Polygon` | 4 | 多边形 |
| `GatheringPlace` | 5 | 聚集地 |
| `BetzCurveArrow` | 6 | 贝兹曲线箭头 |
| `PolylineArrow` | 7 | 折线箭头 |
| `StraightArrow` | 8 | 直箭头 |
| `AssaultDirectionArrow` | 9 | 突击方向箭头 |
| `AttackArrow` | 10 | 进攻方向箭头 |
| `TailedAttackArrow` | 11 | 进攻方向箭头（尾） |
| `SquadCombatArrow` | 12 | 分队战斗行动箭头 |
| `TailedSquadCombatArrow` | 13 | 分队战斗行动箭头（尾） |
| `DoubleArrow` | 14 | 双箭头 |
| `FreehandLineString` | 15 | 自由线绘制：从鼠标左键按下不松开然后光标开始移动进行绘制线段，光标经过的所有坐标位置按顺序连成线，直到松开鼠标左键结束绘制。 |
| `FreehandPolygon` | 16 | 自由面绘制：从鼠标左键按下不松开然后光标开始移动进行绘制平面，光标经过的所有坐标位置首尾闭合绘制成面，直到松开鼠标左键结束绘制 |

## Polygon3DStyle

类型：`number` — 3D Polygon的样式

| 成员 | 值 | 说明 |
|------|------|------|
| `Wave` | 0 | Wave |
| `LoopLine` | 1 | LoopLine |
| `Gradual` | 2 | 渐变 |
| `DynamicGradual` | 3 | 动态渐变 |
| `WaveTransparent` | 4 | 波纹 |
| `WideWave` | 5 | 宽波纹 |
| `RotateArrow` | 6 | 旋转箭头 |
| `RotateLine` | 7 | 旋转线 |
| `RotateGradual` | 8 | 旋转渐变 |
| `SingleColor` | 9 | 单色无光照 |
| `SingleColorWithLight` | 10 | 单色有光照 |
| `OriginColor` | 11 | 原色 |
| `OceanWater` | 12 | 海水（绿） |
| `LakeWater` | 13 | 湖水（蓝） |
| `Opacity` | 14 | 不透明 |
| `Mask` | 15 | 遮罩 |
| `Transparent` | 16 | 透明 |
| `Volume` | 17 | 体积 |
| `Volumn` | 17 |  |

## PolygonStyle

类型：`number` — Polygon的样式

| 成员 | 值 | 说明 |
|------|------|------|
| `SingleColor` | 0 | 单色 |
| `CirclePoint` | 1 | 圆点 |
| `Volume` | 2 | 体积 |
| `Volumn` | 2 |  |
| `Gradual` | 3 | 渐变 |
| `DynamicGradual` | 4 | 动态渐变 |
| `WaveTransparent` | 5 | 波纹 |
| `WideWave` | 6 | 宽波纹 |
| `RotateArrow` | 7 | 旋转箭头 |
| `RotateLine` | 8 | 旋转线 |
| `RotateGradual` | 9 | 旋转渐变 |
| `OnTerrain` | 10 | 贴地模式 使用注意： 1、ACP工程开启贴地：请先在ACP工程打开设置面板-->后期-->对象贴合：勾选贴合所有； 2、如果ACP工程开启大地图模式并设置了WMTS服务，则当前Polygon的坐标范围必须要在WMTS地图范围内才可以看到贴地效果。 |
| `OriginColor` | 11 | 原色 |
| `AlphaGradualBorder` | 12 | 透明渐变边界 |

## PolylineStyle

类型：`number` — Polyline的样式

| 成员 | 值 | 说明 |
|------|------|------|
| `Arrow` | 0 | 箭头样式1 |
| `Arrow1` | 1 | 箭头样式2 |
| `Flow` | 2 | 流动线 |
| `Beam` | 3 | 光流 |
| `Normal` | 4 | 正常的固定线条 |
| `OnTerrain` | 5 | 贴地模式 使用注意： 1、ACP工程开启贴地：请先在ACP工程打开设置面板-->显示-->对象贴合：选中所有对象或仅贴地形； 2、如果ACP工程开启大地图模式并设置了WMTS服务，则当前Polyline的坐标范围必须要在WMTS地图范围内才可以看到贴地效果。 |
| `DottedNormal` | 6 | 普通虚线 |
| `DottedCircle` | 7 | 圆点虚线 |
| `OriginColor` | 8 | 原色 |
| `OnePixelWidth` | 9 | 1像素线 |

## RendererType

类型：`number` — GeoJSONLayer的渲染器类型

| 成员 | 值 | 说明 |
|------|------|------|
| `SimpleRenderer` | 0 | 简单渲染器 |
| `UniqueValueRenderer` | 1 | 唯一值渲染器 |
| `ClassBreaksRenderer` | 2 | 分类渲染器 |
| `VisibleRenderer` | 3 | 要素可见性渲染器 |

## ResetType

类型：`number` — Reset接口的参数，设置重置的类别

| 成员 | 值 | 说明 |
|------|------|------|
| `ClearObjects` | 1 | 清除所有通过接口添加的对象 |
| `ResetSettings` | 2 | 重置用户设置 |
| `ResetCamera` | 4 | 复位相机到初始位置 |

## SplineMeshStyle

类型：`number` — 路径模型样式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `Fence_1` | 0 | 围挡1 |
| `Fence_2` | 1 | 围挡2 |
| `Wall_1` | 2 | 墙体1 |
| `Wall_2` | 3 | 墙体2 |
| `Road_0` | 4 | 道路 |
| `Road_1` | 5 | 天然土路_1 |
| `Road_2` | 6 | 天然土路_2 |
| `Road_3` | 7 | 沥青路_L1 |
| `Road_4` | 8 | 沥青路_L2 |
| `Road_5` | 9 | 沥青路_L4 |
| `Road_6` | 10 | 沥青路_L6 |
| `Road_7` | 11 | 沥青路_L8 |
| `Road_8` | 12 | 混凝土路面_1 |
| `Road_9` | 13 | 碎石路_1 |
| `Fence_Tree` | 14 | 树篱_1 |
| `Pipe` | 15 | 管道_1 |
| `Railway_1` | 16 | 铁路_1 |
| `Railway_2` | 17 | 铁路_2 |
| `Railway_4` | 18 | 铁路_4 |
| `Railway_5` | 19 | 铁路_5 |
| `RectangularPipe` | 20 | 矩形管道 |

## UIPanelType

类型：`number` — 系统UI操作面板的类型

| 成员 | 值 | 说明 |
|------|------|------|
| `MainUI` | 0 | 主页 |
| `NewACP` | 1 | 新建acp |
| `OpenACP` | 2 | 打开acp |
| `MergeACP` | 3 | 合并acp |
| `SaveACP` | 4 | 保存acp |
| `Load3DT` | 5 | 导入3dt |
| `Load3DTService` | 6 | 加载3dt服务 |
| `LoadSHP` | 7 | 导入shp |
| `Load3DTiles` | 8 | 导入3DTiles |
| `Exit` | 9 | 退出 |
| `InfoTreeGet` | 10 | 图层树查询 |
| `ResourceGet` | 11 | 资源库查询 |
| `PreferenceSettings` | 12 | 偏好设置 |
| `Around` | 13 | 交互模式：漫游 |
| `CenterAround` | 14 | 交互模式：中心漫游 |
| `Robomb` | 15 | 交互模式：无人机 |
| `Role` | 16 | 交互模式：人物 |
| `Map` | 17 | 交互模式：地图 |
| `Vehicle` | 18 | 交互模式：汽车驾驶 注意：仅特定版本生效 |
| `Edit` | 19 | 交互模式：编辑 |
| `CameraTour` | 20 | 导览动画 |
| `Report` | 21 | 汇报模式 |
| `Weather` | 22 | 环境 |
| `PostProcess` | 23 | 后期 |
| `Camera` | 24 | 相机 |
| `ShowSettings` | 25 | 显示 |
| `Measure` | 26 | 测量 |
| `Flatten` | 27 | 压平 |
| `Hole` | 28 | 挖洞 |
| `Clip` | 29 | 剖切 |
| `Select` | 30 | 点选 |
| `Screenshot` | 31 | 截屏 |
| `Material` | 32 | 材质 |
| `Vegetation` | 33 | 植被 |
| `Vehicle` | 34 | 交通工具 |
| `DynamicWater` | 35 | 水 |
| `VideoProjection` | 36 | 视频投影 |
| `Panorama` | 37 | 全景图 |
| `Light` | 38 | 灯光 |
| `Marker` | 39 | 标签 |
| `Marker3D` | 40 | 动态标记 |
| `Decal` | 41 | 贴画 |
| `Beam` | 42 | 光流 |
| `RadiationPoint` | 43 | 辐射圈 |
| `Polyline` | 44 | 折线 |
| `Polygon` | 45 | 多边形 |
| `Settings` | 46 | 设置 |
| `Help` | 47 | 帮助 |
| `ViewshedAnalysis` | 48 | 可视域分析 |
| `SkylineAnalysis` | 49 | 天际线分析 |
| `ViewDomeAnalysis` | 50 | 开敞度分析 |
| `VisiblityAnalysis` | 51 | 通视分析 |
| `FloodFillAnalysis` | 52 | 水淹分析 |
| `SolarAnalysis` | 53 | 日照分析 |
| `CutFillAnalysis` | 54 | 填挖方分析 |
| `TerrainSlopeAnalysi` | 55 | 坡度坡向分析 |
| `ContourLineAnalysis` | 56 | 等高线分析 |
| `Plot` | 57 | 态势标绘 |
| `SplineMesh` | 58 | 路径模型 |

## VectorFieldStyle

类型：`String` — 向量场样式

| 成员 | 值 | 说明 |
|------|------|------|
| `Typhoon` | DTS_TPHOON | 台风 |
| `Waves` | DTS_WAVE | 波浪 |
| `Ocean` | DTS_OCEAN | 洋流 |
| `Fluid` | DTS_STYLE_FLUID | 流体 默认 |
| `Fluid_UV` | DTS_FLUID_COUNT_XYZ_UV | 流体 带UV流速流向 |
| `River` | DTS_RIVER | 河流 带UVW流速流向 |
| `Wave` | DTS_WATER_WAVE | 河流 波浪 |
| `Band` | DTS_SURFACE_WIND | 纯色条带 |
| `WindSmog` | DTS_WIND1 | 烟雾 |
| `WindArrow` | DTS_WIND2 | 箭头 |
| `WindPoint` | DTS_WIND_POINT | 风场散点无尾迹 |

## VehicleViewMode

类型：`number` — 载具视角模式枚举

| 成员 | 值 | 说明 |
|------|------|------|
| `FirstPerson` | 0 | 第一人称（驾驶员）视角 |
| `ThirdPerson` | 1 | 第三人称视角 |

## VERSION

类型：`string` — JS-API版本

## Viewport

类型：`number` — 视口掩码

| 成员 | 值 | 说明 |
|------|------|------|
| `V1` | 1 | 视口1 |
| `V2` | 2 | 视口2 |
| `V3` | 4 | 视口3 |
| `V4` | 8 | 视口4 |
| `All` | 255 | 所有视口 |

## VisualType

类型：`number` — GeoJsonLayer符号化类型

| 成员 | 值 | 说明 |
|------|------|------|
| `Color` | 0 | 控制颜色 |
| `Size` | 1 | 控制点尺寸 |
| `Height` | 1 | 控制Polygon3D高度 |
| `Opacity` | 1 | 控制透明度 |

## WaterFlowFieldStyle

类型：`number` — WaterFlowField的样式

| 成员 | 值 | 说明 |
|------|------|------|
| `HeatMap` | 0 | 热力图样式 |
| `Water` | 1 | 水流样式 |
| `Particle` | 2 | 光流粒子样式 |

## WaterMode

类型：`number` — 水动力模型的真实水样式的显示类型

| 成员 | 值 | 说明 |
|------|------|------|
| `Animation` | 0 | 水动画模式 |
| `Simulation` | 1 | 水仿真模式 |
| `Arrow` | 2 | 水流向模式 |

