---
title: Tools
sidebar_label: Tools
description: "Tools 提供量算与空间分析等通用工具能力（如测距、测面、天际线、通视、坡度、剖切、河道断面等，具体以方法为准）。"
---

# Tools

Tools 提供量算与空间分析等通用工具能力（如测距、测面、天际线、通视、坡度、剖切、河道断面等，具体以方法为准）。

![Tools 示意图 1](/img/refdoc/api/tools-m.gif)

![Tools 示意图 2](/img/refdoc/api/tools-m1.gif)

![Tools 示意图 3](/img/refdoc/api/tools-clip.gif)

通过 `api.tools` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Tools 提供量算与空间分析等通用工具能力（如测距、测面、天际线、通视、坡度、剖切、河道断面等，具体以方法为准）。
- **别名 / 不同行业叫法**：分析工具 / 量算工具 / 测量工具 / 空间分析工具箱。
- **适用行业**：智慧城市与规划、应急管理、智慧水利、测绘、国防军事、智慧交通与公路、CIM 基础平台。
- **使用场景**：
  - 规划评审中的天际线、通视域分析
  - 地形坡度、剖切断面与可视域分析
  - 距离/面积量算与河道断面提取
  - 公路数字化监管工具集：坐标 / 距离 / 高度 / 投影面积量测，可视域、天际线、开敞度通视、淹没、日照、填挖方、坡度坡向、等高线分析，每种自动生成专题图层与统计图表。
- **注意事项**：
  - CIM 基础平台的日照、天际线、视域、通视、开敞度、填挖方等模拟分析，辅助规划审批与方案比选。
  - 朝向参数 `rotation` 是 `[Pitch, Yaw, Roll]`，与 UE 引擎内部轴的映射关系见[架构概览](/docs/tutorials/architecture)；
  - 分析结果依赖地形与模型精度
  - 部分分析（通视/可视域）计算量大，需控制范围
  - 量算结果受坐标系与高程基准影响



> 调用失败语义与错误码：所有方法失败均通过 `resolve` 携带的响应对象体现（而非 reject），详见[错误码与失败语义](/docs/api/error-codes)。

## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`bboxContainsBBox`](#bboxContainsBBox) | 判断 inner 包围盒是否被完全包含在 outer 内 | 判断包含关系 |
| [`bboxIntersect`](#bboxIntersect) | 判断两个AABB包围盒是否相交 | 判断包围盒相交 |
| [`calcAdjacentPointDistances`](#calcAdjacentPointDistances) | 相邻点分段距离数组 | 计算相邻点距 |
| [`calcPolylineTotalLength`](#calcPolylineTotalLength) | 折线总长度 | 计算线长 |
| [`expandBBox`](#expandBBox) | 包围盒膨胀/收缩，各个方向向外增加buffer距离 | 外扩包围盒 |
| [`exportSkyline`](#exportSkyline) | 导出天际线分析图片， |  |
| [`getBBox`](#getBBox) | 根据点集计算AABB包围盒 | 计算点集包围盒 |
| [`getBBoxCenter`](#getBBoxCenter) | 获取包围盒中心点 | 取包围盒中心点 |
| [`getBBoxCorners`](#getBBoxCorners) | 包围盒 8 个角点 | 取包围盒 8 个角点 |
| [`getBBoxSize`](#getBBoxSize) | 包围盒尺寸 [sx, sy, sz] | 取包围盒尺寸 |
| [`getBBoxVolume`](#getBBoxVolume) | 包围盒体积（min>max 时为负数，可先用 validateBBox 检查） | 取包围盒体积 |
| [`getMidddlePoint`](#getMidddlePoint) | 获取两点的中间点 | 取中点 |
| [`getPointAtDistance`](#getPointAtDistance) | 沿折线按弧长取点：从起点出发走 dist 距离所在的位置 | 沿折线取点（沿线动画） |
| [`getPointDistance`](#getPointDistance) | 两点三维欧氏距离 | 两点距离 |
| [`getPointDistanceSq`](#getPointDistanceSq) | 两点距离平方（不开根号，用于对比，计算性能更高） | 两点距离平方（比较用） |
| [`getPolylineInfo`](#getPolylineInfo) | 获取折线完整信息：分段距离 + 总长 | 折线统计信息 |
| [`getUIPanel`](#getUIPanel) | 查询系统UI功能操作面板的显示状态 |  |
| [`hideUIPanel`](#hideUIPanel) | 隐藏系统UI功能操作面板 |  |
| [`lerpPoint`](#lerpPoint) | 两点线性插值 t=0 返回 p1，t=1 返回 p2；t 超出 [0,1] 为外插 | 两点线性插值 |
| [`lineIntersect`](#lineIntersect) | 单条线段求交，如果线段上有多个对象则返回距离折线起点位置最近的对象信息，如果折线上没有对… |  |
| [`linesIntersect`](#linesIntersect) | 多条线段批量求交 |  |
| [`mergeBBox`](#mergeBBox) | 合并两个包围盒（取并集） | 合并多个包围盒 |
| [`offsetPolyline`](#offsetPolyline) | 折线沿给定法线方向横向偏移，生成平行折线 | 折线偏移（缓冲区） |
| [`pointInBBox`](#pointInBBox) | 判断点是否在AABB包围盒内部（包含边界） | 点是否在盒内 |
| [`pointInPolygon2D`](#pointInPolygon2D) | 判断点是否在 XY 平面多边形内部（射线法，z 被忽略） | 点是否在多边形内 |
| [`pointToPlaneDistance`](#pointToPlaneDistance) | 点到平面的有符号距离（正 = 位于法线一侧，负 = 反侧） | 点到平面距离 |
| [`pointToPolyline`](#pointToPolyline) | 点到折线的最近点 | 点到折线最近距离 |
| [`polygonArea2D`](#polygonArea2D) | XY 平面多边形面积（鞋带公式，顶点顺序任意，自动取绝对值） | 计算平面面积 |
| [`polygonCentroid2D`](#polygonCentroid2D) | XY 平面多边形质心（面积加权；退化三角形近似共线时退化为顶点平均） | 计算形心 |
| [`projectPointToSegment`](#projectPointToSegment) | 点投影到线段 p0-p1，返回投影点，以及是否在线段内部 | 点到线段投影 |
| [`removeNearbyPoints`](#removeNearbyPoints) | 清理折线，删除相邻距离小于 tolerance 的点 | 去除过密点 |
| [`replaceTextureByImage`](#replaceTextureByImage) | 使用图片替换纹理 |  |
| [`replaceTextureByUrl`](#replaceTextureByUrl) | 使用网页替换纹理 |  |
| [`replaceTextureByVideo`](#replaceTextureByVideo) | 使用视频流替换纹理 |  |
| [`replaceTextures`](#replaceTextures) | 批量替换纹理路径 | 批量替换贴图 |
| [`restoreTexture`](#restoreTexture) | 恢复纹理 |  |
| [`riverCrossSection`](#riverCrossSection) | 根据河道的坐标点和tif高程对河道横断面进行分析 |  |
| [`riverCrossSectionByShp`](#riverCrossSectionByShp) | 根据河道的shp文件和tif高程对河道横断面进行分析 |  |
| [`samplePolylineByCount`](#samplePolylineByCount) | 折线均分采样，输出固定count个点 | 折线等分采样 |
| [`samplePolylineByStep`](#samplePolylineByStep) | 折线按固定步长采样 | 折线按步长采样 |
| [`segmentIntersect3D`](#segmentIntersect3D) | 三维空间两线段求最近点与距离 | 空间线段求交 |
| [`setMeasurement`](#setMeasurement) | 设置测量模式及相关参数 |  |
| [`showClipPanel`](#showClipPanel) | 打开剖切功能操作面板 |  |
| [`showMeasurePanel`](#showMeasurePanel) | 打开测量功能操作面板 |  |
| [`showUIPanel`](#showUIPanel) | 显示系统UI功能操作面板 |  |
| [`simplifyPolyline`](#simplifyPolyline) | Douglas-Peucker 折线抽稀（支持三维），保留首尾点 | 折线抽稀 |
| [`smoothPolyline`](#smoothPolyline) | Chaikin 折线平滑（切角算法，保持首尾点不动） | 折线平滑 |
| [`startContourLineAnalysis`](#startContourLineAnalysis) | 开始等高线分析，适用于地形 |  |
| [`startCutFillAnalysis`](#startCutFillAnalysis) | 开始填挖方分析，适用于地形 |  |
| [`startFloodFill`](#startFloodFill) | 开始水淹分析 |  |
| [`startGeometryEdit`](#startGeometryEdit) | 开始顶点编辑，目前支持watermesh polygon 3dpolygon polyl… |  |
| [`startMeasurement`](#startMeasurement) | 开始测量，用户可以在三维场景中点击鼠标进行测量 |  |
| [`startPlaneClip`](#startPlaneClip) | 开始面剖切 |  |
| [`startPolygonClip`](#startPolygonClip) | TileLayer多边形剖切， |  |
| [`startSkylineAnalysis`](#startSkylineAnalysis) | 开始天际线分析 |  |
| [`startSunshineAnalysis`](#startSunshineAnalysis) | 开始日照分析 |  |
| [`startTerrainSlopeAnalysis`](#startTerrainSlopeAnalysis) | 开始坡度坡向分析，适用于地形3dt数据 |  |
| [`startViewDomeAnalysis`](#startViewDomeAnalysis) | 开始开敞度分析 |  |
| [`startViewshedAnalysis`](#startViewshedAnalysis) | 开始可视域分析 |  |
| [`startVisiblityAnalysis`](#startVisiblityAnalysis) | 开始通视分析 |  |
| [`startVolumeClip`](#startVolumeClip) | 开始体剖切 |  |
| [`stopClip`](#stopClip) | ⚠️ 已废弃 |  |
| [`stopContourLineAnalysis`](#stopContourLineAnalysis) | 停止等高线分析 |  |
| [`stopCutFillAnalysis`](#stopCutFillAnalysis) | 停止填挖方分析 |  |
| [`stopFloodFill`](#stopFloodFill) | 停止水淹分析 |  |
| [`stopGeometryEdit`](#stopGeometryEdit) | 退出顶点编辑 |  |
| [`stopMeasurement`](#stopMeasurement) | 停止测量 |  |
| [`stopPlaneClip`](#stopPlaneClip) | 停止面剖切 |  |
| [`stopPolygonClip`](#stopPolygonClip) | 停止多边形剖切 |  |
| [`stopSkylineAnalysis`](#stopSkylineAnalysis) | 结束天际线分析 |  |
| [`stopSunshineAnalysis`](#stopSunshineAnalysis) | 停止日照分析 |  |
| [`stopTerrainSlopeAnalysis`](#stopTerrainSlopeAnalysis) | 停止坡度坡向分析 |  |
| [`stopViewDomeAnalysis`](#stopViewDomeAnalysis) | 停止开敞度分析 |  |
| [`stopViewshedAnalysis`](#stopViewshedAnalysis) | 停止可视域分析 |  |
| [`stopVisiblityAnalysis`](#stopVisiblityAnalysis) | 停止通视分析 |  |
| [`stopVolumeClip`](#stopVolumeClip) | 停止体剖切 |  |
| [`triangleArea`](#triangleArea) | 三维三角形面积 | 三角形面积 |
| [`updateVolumeClip`](#updateVolumeClip) | 更新体剖切 |  |
| [`validateBBox`](#validateBBox) | 校验包围盒数组 [minX,minY,minZ,maxX,maxY,maxZ] | 参数校验 |
| [`validateBBoxSize`](#validateBBoxSize) | - | 参数校验 |
| [`validateNumber`](#validateNumber) | 校验数值 | 参数校验 |
| [`validatePoint`](#validatePoint) | 校验单个三维点 [x,y,z] | 参数校验 |
| [`validatePointArray`](#validatePointArray) | 校验点数组 [[x,y,z],...] | 参数校验 |
| [`vecAdd`](#vecAdd) | 向量加法 a + b | 向量运算 |
| [`vecAngle`](#vecAngle) | 两向量夹角（弧度，范围 [0, π]），任一向量为零向量报错 | 向量运算 |
| [`vecCross`](#vecCross) | 向量叉积 a × b（结果同时垂直于 a、b，方向遵循右手定则） | 向量运算 |
| [`vecDot`](#vecDot) | 向量点积 | 向量运算 |
| [`vecLength`](#vecLength) | 向量长度 | 向量运算 |
| [`vecNormalize`](#vecNormalize) | 向量归一化（零向量报错） | 向量运算 |
| [`vecScale`](#vecScale) | 向量数乘 v * k | 向量运算 |
| [`vecSub`](#vecSub) | 向量减法 a - b | 向量运算 |

## 方法（Methods）

### `exportSkyline(path, size, options, fn)` {#exportSkyline}

导出天际线分析图片，注意：需先执行开始天际线分析并在页面交互出现天际线图片后才可以执行导出方法exportSkyline

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `path` | `string` | 是 | - | 导出图片的保存路径，或base64字符串，示例参数一："D:\skyline.png"，输出文件至对应路径；示例参数二："base64",接口返回图片对应的base64字符串 |
| `size` | `array` | 是 | - | 导出图片的尺寸，格式如下：[width, height]，取值范围：[0~任意正数] |
| `options` | `object` | 是 | - | 参数信息，支持以下属性（如果未设置某个属性，则使用默认值）： `{ "color": Color.Red, //颜色值 "ids": ["TileLayerId1", "TileLayerId2"] //TileLayer的ID数组 }` |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `skylineColor` | `-` | 否 | 绿色 | 天际线的颜色，默认值：绿色 Color.Green |
| `backgroundColor` | `-` | 否 | [0, 0, 0, 0.75] | 图片背景颜色，默认值：[0, 0, 0, 0.75] |
| `tileLayers` | `-` | 是 | - | 数组类型，若此数组为空默认绘制所有物体形成的天际线;不为空则多个TileLayer形成的一条天际线，多条天际线绘制到该图上； 数组元素定义如下： |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取）。官方文档未给出该接口的返回结构定义，可参考下方示例的调用方式，实际结构以运行结果为准。

```js
示例代码如下：

let options = {
     skylineColor: Color.Green,
     backgroundColor: Color.Gray
};
//示例一：导出图片至cloud服务器上对应路径
fdapi.tools.exportSkyline("d:\\skyline.png", [400, 200], options);

//示例二：返回base64字符串
fdapi.tools.exportSkyline("base64", [400, 200], options).then(result=>{
      //设置base64类型图片
      document.getElementById("img1").setAttribute("src",result.image);
});


<br>
```

> 示例：导出天际线：ExportSkyline

```js
let options = {
    skylineColor: Color.Green,
    backgroundColor: Color.Gray
};
//导出图片到cloud服务器指定磁盘路径
fdapi.tools.exportSkyline('d:/skyline.png', [400, 200], options);
//导出base64图片
fdapi.tools.exportSkyline('base64', [400, 200], options);
```

---

### `getUIPanel(type, fn)` {#getUIPanel}

查询系统UI功能操作面板的显示状态

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `type` | `number` | 是 | - | 操作面板对应枚举，取值范围：[0~正整数]，详情参考 `UIPanelType` |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取）。官方文档未给出该接口的返回结构定义，可参考下方示例的调用方式，实际结构以运行结果为准。

> 示例：查询操作面板状态：GetUIPanel

```js
fdapi.tools.getUIPanel(UIPanelType.Measure);
```

---

### `hideUIPanel(type, fn)` {#hideUIPanel}

隐藏系统UI功能操作面板

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `type` | `number` | 是 | - | 操作面板对应枚举，取值范围：[0~正整数]，详情参考 `UIPanelType` |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：隐藏操作面板状态：HideUIPanel

```js
fdapi.tools.hideUIPanel(UIPanelType.Measure);
```

---

### `lineIntersect(start, end, fn)` {#lineIntersect}

单条线段求交，如果线段上有多个对象则返回距离折线起点位置最近的对象信息，如果折线上没有对象则返回ResourceNotFound

**注意：1、求交要在相机视野范围内 2、获取地形高度时从上往下求交，起始点高度Z要大于结束点Z。**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `start` | `array` | 是 | - | 线段起点坐标，[取值示例](/docs/tutorials/coordinates) |
| `end` | `array` | 是 | - | 线段终点坐标，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
返回距离折线起点位置最近的对象信息
{
        "Id":	"8198F86D439A3782739C1EBD9440AFC7", // 图层树上对象唯一标识id
        "ObjectID":	"Shape027",  // Actor对象ID
        "Type":	"TileLayer", // 对象类型
        "PropertyName":	"L3", //图层树上对象名称
        "BoundsMin":	[491962.093750, 2490959.000000, -2.963361], //3dt文件特有属性,包围盒bbox-BoundsMin
        "BoundsMax":	[493933.843750, 2493104.750000, 0.376975], // 3dt文件特有属性,包围盒bbox-BoundsMax
        "LineIntersectPoint":	[492751.687500, 2491406.000000, -2.780900] //从线段起点开始延伸至对象的第一个交点
        }
```

> 示例：单条线段求交：LineIntersect

```js
fdapi.tools.lineIntersect(
    [492634.59375, 2491808, 10],
    [492518.03125, 2491819.75, 0],
);
```

---

### `linesIntersect(startEndPointArr, highPrecision, returnDetails, fn)` {#linesIntersect}

多条线段批量求交

**注意：1、求交要在相机视野范围内 2、获取地形高度时从上往下求交，起始点高度Z要大于结束点Z。**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startEndPointArr` | `array` | 是 | - | 线段起止点坐标数组，数组元素对象支持以下属性：数组格式示例：[&#123;"start":[1500,86600,100],"end":[1512.514892578125,86679.796875,-10]&#125;,&#123;"start":[1200,82600,100],"end":[1512.514892578125,86679.796875,-10]&#125;] |
| `highPrecision` | `boolean` | 否 | false | 是否高精度，默认值：false |
| `returnDetails` | `boolean` | 否 | true | 是否返回求交数据的详情，默认值：true，注意：设置为false后只返回交点信息LineIntersectPoint，且当数据量大时设置为false可以提升效率 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`startEndPointArr` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `start` | `-` | 是 | - | 线段起点坐标，[取值示例](/docs/tutorials/coordinates) |
| `end` | `-` | 是 | - | 线段终点坐标，[取值示例](/docs/tutorials/coordinates) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
返回距离折线起点位置最近的对象信息数组


返回数据格式示例：
[{
        "Id":	"8198F86D439A3782739C1EBD9440AFC7", // 图层树上对象唯一标识id
        "Type":	"TileLayer", // 对象类型
        "ObjectID":	"Shape027",  // Actor对象ID
        "PropertyName":	"L3", //图层树上对象名称
        "BoundsMin":	[491962.093750, 2490959.000000, -2.963361], //3dt文件特有属性,包围盒bbox-BoundsMin
        "BoundsMax":	[493933.843750, 2493104.750000, 0.376975], // 3dt文件特有属性,包围盒bbox-BoundsMax
        "LineIntersectPoint":	[492751.687500, 2491406.000000, -2.780900] //从线段起点开始延伸至对象的第一个交点
        },
        {
        "Id":	"8198F86D439A3782739C1EBD94ADC543",
        "Type":	"TileLayer",
        "ObjectID":	"SM_outdoor_wall_01_2",
        "PropertyName":	"L2",
        "BoundsMin":	[883.421265, -602.091553, 3.599805],
        "BoundsMax":	[916.103149, -595.874084, 23.368118],
        "LineIntersectPoint":	[893.660950, -601.525940, 22.460133],
      }]
```

> 示例：多条线段求交：LinesIntersect

```js
//注意：1、求交要在相机视野范围内 2、获取地形高度时从上往下求交，起始点高度Z要大于结束点Z。
let startEndPointArr = [
    { "start": [492634.59375, 2491808, 10], "end": [492518.03125, 2491819.75, 0] },
    { "start": [492571.9375, 2491902.25, 10], "end": [492537.71875, 2491811, 0] }

];
fdapi.tools.linesIntersect(startEndPointArr, false, true);
```

---

### `replaceTextureByImage(texturePath, imageUrl, fn)` {#replaceTextureByImage}

使用图片替换纹理

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `texturePath` | `string` | 是 | - | UE资源包里的纹理路径 |
| `imageUrl` | `string` | 是 | - | 图片路径 可以是本地路径，也支持网络路径，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：使用图片替换纹理：ReplaceTextureByImage

```js
fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
//用图片替换显示纹理 注意：纹理路径需要存在
fdapi.tools.replaceTextureByImage('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/locale/zh/images/radiation.png');
```

---

### `replaceTextureByUrl(texturePath, url, fn)` {#replaceTextureByUrl}

使用网页替换纹理

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `texturePath` | `string` | 是 | - | UE资源包里的纹理路径 |
| `url` | `string` | 是 | - | 包含纹理效果的url路径 可以是本地路径，也支持网络路径，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：使用网页替换纹理：ReplaceTextureByUrl

```js
fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);

//用url替换显示纹理 注意：纹理路径需要存在
fdapi.tools.replaceTextureByUrl('/Game/Model/Textures/M_玻璃颜色_次深', 'http://www.baidu.com');
```

---

### `replaceTextureByVideo(texturePath, videoUrl, fn)` {#replaceTextureByVideo}

使用视频流替换纹理

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `texturePath` | `string` | 是 | - | UE资源包里的纹理路径 |
| `videoUrl` | `string` | 是 | - | 视频地址，支持本地文件和网络文件，同时支持rtsp实时视频流协议，[资源引入说明](/docs/tutorials/resources)，注意：mp4文件视频只支持H264/AVC编码格式的 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：使用视频流替换纹理：ReplaceTextureByVideo

```js
fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
//用视频替换显示纹理 注意：纹理路径需要存在
fdapi.tools.replaceTextureByVideo('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/assets/video/video1.webm');
```

---

### `restoreTexture(texturePathArr, fn)` {#restoreTexture}

恢复纹理

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `texturePathArr` | `string \| array` | 是 | - | UE资源包里的纹理路径，（支持单个路径或路径数组） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：恢复纹理：RestoreTexture

```js
fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
//批量恢复纹理
let pathArr = ["/Game/Model/Textures/M_玻璃颜色_次深", "/Game/Temp/Textures/Url", "/Game/Temp/Textures/Image"];
fdapi.tools.restoreTexture(pathArr);
```

---

### `riverCrossSection(option, fn)` {#riverCrossSection}

根据河道的坐标点和tif高程对河道横断面进行分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `option` | `object` | 是 | - | 计算河道断面的参数配置对象，包含的属性如下： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `riverPolygon` | `array` | 是 | - | 必选，河道面范围包含的坐标数组，取值示例：[[x,y,z],[x1,y1,z1]...] |
| `riverCenterLine` | `array` | 是 | - | 必选，河道中心线包含的坐标数组，取值示例：[[x,y,z],[x1,y1,z1]...] |
| `demPath` | `string` | 是 | - | 必选，河道DEM高程栅格文件路径，格式为.tif |
| `sectionInterval` | `number` | 否 | 500 | 可选，沿河道中心线断面的采样间距，默认值：500，单位：米 |
| `sampleInterval` | `number` | 否 | 50 | 可选，河道断面内采样点的间距，默认值：50，单位：米 |
| `tangentWindowRadius` | `number` | 否 | 0 | 可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米 |
| `sampleDirection` | `number` | 否 | 0 | 可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0 |
| `defaultSectionWidth` | `number` | 否 | 500 | 可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，就会使用这个默认的断面宽度，默认值：500，单位：米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：根据河道点计算河道横断面：RiverCrossSection

```js
fdapi.tools.riverCrossSection({
    riverPolygon: [], //河道面范围包含的坐标数组
    riverCenterLine: [],//河道中心线包含的坐标数组
    demPath: "E:/rivercross/DEM_Mosaic_V2_Clip.tif",//河道高程文件
    sectionInterval: 500, //可选，沿河道中心线断面的采样间距，默认值：500，单位：米
    sampleInterval: 50, // 可选，河道断面内采样点的间距，默认值：50，单位：米
    tangentWindowRadius: 0, //可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米
    sampleDirection: 0, //可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0
    defaultSectionWidth: 500, //可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，那么就使用这个默认河面宽度采样河道断，默认值：500，单位：米
});
```

---

### `riverCrossSectionByShp(option, fn)` {#riverCrossSectionByShp}

根据河道的shp文件和tif高程对河道横断面进行分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `option` | `object` | 是 | - | 计算河道断面的参数配置对象，包含的属性如下： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `riverPolygonPath` | `string` | 是 | - | 必选，河道面范围的shp文件路径，格式为.shp，三个文件包含的坐标系需保证一致 |
| `riverCenterLinePath` | `string` | 是 | - | 必选，河道中心线shp文件路径，格式为.shp，三个文件包含的坐标系需保证一致 |
| `demPath` | `string` | 是 | - | 必选，河道DEM高程栅格文件路径，格式为.tif，三个文件包含的坐标系需保证一致 |
| `sectionInterval` | `number` | 否 | 500 | 可选，沿河道中心线断面的采样间距，默认值：500，单位：米 |
| `sampleInterval` | `number` | 否 | 50 | 可选，河道断面内采样点的间距，默认值：50，单位：米 |
| `tangentWindowRadius` | `number` | 否 | 0 | 可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米 |
| `sampleDirection` | `number` | 否 | 0 | 可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0 |
| `defaultSectionWidth` | `number` | 否 | 500 | 可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，那么就使用这个默认河面宽度采样河道断，默认值：500，单位：米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：根据shp计算河道横断面：RiverCrossSectionByShp

```js
fdapi.tools.riverCrossSectionByShp({
    riverPolygonPath: "E:/rivercross/河道范围.shp", //河道面范围的shp文件路径 三个文件坐标系需一致
    riverCenterLinePath: "E:/rivercross/河道中心线.shp",//河道中心线shp文件路径 三个文件坐标系需一致
    demPath: "E:/rivercross/DEM_Mosaic_V2_Clip.tif",//河道高程文件 三个文件坐标系需一致
    sectionInterval: 500, //可选，沿河道中心线断面的采样间距，默认值：500，单位：米
    sampleInterval: 50, // 可选，河道断面内采样点的间距，默认值：50，单位：米
    tangentWindowRadius: 0, //可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米
    sampleDirection: 0, //可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0
    defaultSectionWidth: 500, //可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，那么就使用这个默认河面宽度采样河道断，默认值：500，单位：米
});
```

---

### `setMeasurement(type, options, fn)` {#setMeasurement}

设置测量模式及相关参数



![Tools · setMeasurement(type, options, fn) 示意](/img/refdoc/api/Tools.enterMeasurementmianji.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `type` | [`MeasurementMode`](/docs/api/types#measurementmode) | 是 | - | 测量模式，参见`MeasurementMode`，目前支持：坐标测量、直线测量、水平测量、垂直测量、多边形测量、地表面积测量、角度测量 |
| `options` | `object` | 否 | 0 | 测量选项，目前支持的选项有： unitType: 可选，测量单位，0：米 1：千米 2：英尺，默认值 0 coordinates: 可选，待测量坐标数组，不传则根据交互拾取的坐标进行测量 pointSize: 可选，测量点的像素尺寸，默认值 8.0 textSize: 可选，文字大小，默认值 10.0 textColor: 可选，文字颜色，默认值 Color.Yellow pointColor: 可选，点的颜色，默认值 [0,0,1,0.3] lineColor: 可选，线的颜色，默认值 Color.Red areaColor: 可选，测量区域的颜色，默认值 [0,1,0,0.3] showCoordinateText: 可选，是否显示坐标测量的文本，默认值 false |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
//options的每个属性都是可选的
/**
 *  <li>pointSize: 默认值 8.0</li>
 *  <li>textSize:  默认值 10.0</li>
 *  <li>textColor: 默认值 Color.Yellow</li>
 *  <li>pointColor:默认值 [0,0,1,0.3]</li>
 *  <li>lineColor: 默认值 Color.Red</li>
 *  <li>areaColor: 默认值 [0,1,0,0.3]</li>
 *  <li>showCoordinateText: 是否显示坐标测量的文本，默认值 false</li>
 */
let options = {
    'pointSize': 8.0,//点大小
    'textSize': 10.0,//字体大小
    'textColor': Color.Yellow,//字体颜色
    'pointColor': [0, 0, 1, 0.3],//点填充颜色
    'lineColor': Color.Blue,//线填充颜色
    'areaColor': [0, 1, 0, 0.3],//面填充颜色
    'showCoordinateText': true //是否显示坐标信息
};
//测量模式：Coordinate 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
fdapi.tools.setMeasurement(MeasurementMode.Coordinate, options);
```

---

### `showClipPanel(clipType, screenPosition, fn)` {#showClipPanel}

打开剖切功能操作面板

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `clipType` | `number` | 是 | - | 剖切面板对应的3种剖切功能，取值范围：[0,1,2]，详情参考 `UIPanelType` |
| `screenPosition` | `array` | 是 | - | 剖切面板显示的屏幕位置，数组类型：[left, top]，取值单位：像素 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：显示剖切面板：ShowClipPanel

```js
//剖切是 0~2
fdapi.tools.showClipPanel(2, [200, 100]);
```

---

### `showMeasurePanel(measureType, screenPosition, fn)` {#showMeasurePanel}

打开测量功能操作面板

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `measureType` | `number` | 是 | - | 测量面板对应的6种测量功能，取值范围：[0,1,2,3,4,5]，详情参考 `UIPanelType` |
| `screenPosition` | `array` | 是 | - | 测量面板显示的屏幕位置，数组类型：[left, top]，取值单位：像素 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：显示测量面板：ShowMeasurePanel

```js
//测量是 0~5
fdapi.tools.showMeasurePanel(3, [200, 100]);
```

---

### `showUIPanel(type, screenPosition, fn)` {#showUIPanel}

显示系统UI功能操作面板

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `type` | `number` | 是 | - | 操作面板对应枚举，取值范围：[0~正整数]，详情参考 `UIPanelType` |
| `screenPosition` | `array` | 是 | - | 操作面板显示的屏幕位置，数组类型：[left, top]，取值单位：像素 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：显示操作面板：ShowUIPanel

```js
//UIPanelType是系统面板的类型枚举
fdapi.tools.showUIPanel(UIPanelType.Measure, [200, 100]);
```

---

### `startContourLineAnalysis(options, fn)` {#startContourLineAnalysis}

开始等高线分析，适用于地形

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数对象信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `coordinates` | `-` | 否 | - | 等高线分析的点位数组，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `isShowContourPlane` | `-` | 否 | true | 是否显示等高面，&#123;boolean&#125;，默认值：true |
| `contourPlaneOpacity` | `-` | 否 | 1 | 等高面颜色不透明度，仅当isShowContourPlane设置为true时生效，&#123;number&#125;，取值范围：[0~1]，默认值：1 |
| `isShowContourLine` | `-` | 否 | true | 是否显示等高线，&#123;boolean&#125;，默认值：true |
| `contourLineColor` | `-` | 否 | [1,1,1,1] | 等高线颜色值，仅当isShowContourLine设置为true时生效，&#123;Color&#125;，默认值：[1,1,1,1] |
| `contourLineSpacing` | `-` | 否 | 20米 | 等高线的间距，仅当isShowContourLine设置为true时生效，&#123;number&#125;，单位：米，默认值：20米 |
| `contourLineRangeMax` | `-` | 否 | 1000000米 | 等高线最高显示高度，&#123;number&#125;，单位：米，默认值：1000000米 |
| `contourLineRangeMin` | `-` | 否 | -1000000米 | 等高线最低显示高度，&#123;number&#125;，单位：米，默认值：-1000000米 |
| `isShowHeightLabel` | `boolean` | 否 | false | 是否显示高度标注文字，默认值：false（2026.07.08 新增） |
| `heightLabelSpacing` | `number` | 否 | 10 | 相邻高度标注的高程间隔，默认值：10（2026.07.08 新增） |
| `heightLabelColor` | [`Color`](/docs/api/types#color) | 否 | [1,1,1,1] | 文字标注的颜色，默认值：[1,1,1,1]（2026.07.08 新增） |
| `heightLabelSize` | `number` | 否 | 20 | 文字标注的大小，默认值：20（2026.07.08 新增） |
| `colors` | `object` | 否 | - | 等高面的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组（2026.07.08 新增） |
| `colors.gradient` | `boolean` | 否 | - | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 否 | 白色 | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 否 | - | 调色板对象数组，每一个对象包含高程值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持 `color`（[`Color`](/docs/api/types#color)，高程值对应的调色板颜色）与 `value`（`number`，高程值） |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始等高线分析：StartContourLineAnalysis

```js
fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

//开始等高线分析
let options = {
    coordinates: [
        [491381.30625, 2490408.16, 7.295],
        [490244.730625, 2486890.56, 4.260625],
        [488281.0425, 2488424.96, 14.2728125],
        [489158.365, 2490848.32, 0.563125]
    ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    isShowContourPlane: true,     //是否显示等高面，{boolean}，默认值：true
    contourPlaneOpacity: 1,       //等高面颜色不透明度，仅当isShowContourPlane设置为true时生效，{number}，取值范围：[0~1]，默认值：1
    isShowContourLine: true,      //是否显示等高线，{boolean}，默认值：true
    contourLineColor: [1, 1, 1, 1],  //等高线颜色值，仅当isShowContourLine设置为true时生效，{Color}，默认值：[1,1,1,1]
    contourLineSpacing: 20,       //等高线的间距，仅当isShowContourLine设置为true时生效，{number}，单位：米，默认值：20米
    contourLineRangeMax: 1000000, //等高线最高显示高度，{number}，单位：米，默认值：1000000米
    contourLineRangeMin: -1000000,//等高线最低显示高度，{number}，单位：米，默认值：-1000000米
    isShowHeightLabel: true,      //是否显示高度标注文字，{boolean}，默认值：false
    heightLabelSpacing: 50,       //相邻高度标注的高程间隔，{number}，默认值：10
    heightLabelColor: [1, 1, 0, 1], //文字标注的颜色，{Color}，默认值：[1,1,1,1]
    heightLabelSize: 24,          //文字标注的大小，{number}，默认值：20
};
fdapi.tools.startContourLineAnalysis(options);
```

---

### `startCutFillAnalysis(options, fn)` {#startCutFillAnalysis}

开始填挖方分析，适用于地形

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数对象信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `coordinates` | `-` | 否 | - | 填挖方分析范围的点位数组，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `height` | `-` | 否 | 0 | 高度，单位：米，取值范围：[任意负数~任意正数]，默认值：0 |
| `gridSize` | `-` | 否 | 5 | 网格的大小，取值范围：[0~100]，默认值：5 |
| `lineThickness` | `-` | 否 | 2 | 线段的宽度，单位：米，取值范围：[0~100]，默认值：2 |
| `pointSize` | `-` | 否 | 5 | 点的大小，取值范围：[0~100]，默认值：5 |
| `gridLineThickness` | `-` | 否 | 5 | 网格线的宽度，单位：米，取值范围：[0~100]，默认值：5 |
| `cutLineColor` | `-` | 否 | 红色 | 挖方线的颜色，默认值：红色 Color.Red |
| `fillLineColor` | `-` | 否 | 绿色 | 填方线的颜色，默认值：绿色 Color.Green |
| `cutPointColor` | `-` | 否 | 蓝色 | 挖方点的颜色，默认值：蓝色 Color.Blue |
| `fillPointColor` | `-` | 否 | 蓝色 | 填方点的颜色，默认值：蓝色 Color.Blue |
| `gridColor` | `-` | 否 | 黄色 | 网格线的颜色，默认值：黄色 Color.Yellow |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始填挖方分析：StartCutFillAnalysis

```js
fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

let option = {
    coordinates: [
        [490969.28750000003, 2489663.2, 36.990625],
        [491104.991875, 2488874.24, 21.89296875],
        [490202.63125000003, 2486733.12, 0.8265625],
        [488741.765, 2488744.16, 10.9128125],
        [489299.37, 2489846.24, 32.093593750000004]
    ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    height: 100,//高度 米
    gridSize: 20,//网格大小
    lineThickness: 1,//宽度
    pointSize: 5,//点的大小
    gridLineThickness: 1,//网格线的宽度
    cutLineColor: Color.Red,//挖方线的颜色
    fillLineColor: Color.Green,//填方线的颜色
    cutPointColor: Color.Black,//挖方点的颜色
    fillPointColor: Color.Blue,//填方点的颜色
    gridColor: Color.Yellow//网格线的颜色
};
fdapi.tools.startCutFillAnalysis(option);
```

---

### `startFloodFill(options, fn)` {#startFloodFill}

开始水淹分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数信息，支持以下属性 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `min` | `array` | 是 | - | 水淹分析坐标范围: [minX, minY]，最小X/Y坐标值 |
| `max` | `array` | 是 | - | 水淹分析坐标范围: [maxX, maxY]，最大X/Y坐标值 |
| `seed` | `array` | 是 | - | 出水点: [X, Y]，X/Y取值需在对应的min和max范围内，注意：出水点必须在水淹分析范围内，且不能被物体遮挡，否则会无效 |
| `elevation` | `number` | 是 | - | 水位高度，单位：米 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 水颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `precision` | `number` | 否 | 0.5 | 水淹模拟精度 (取值范围：[0~1] 精度越高效率会降低)，默认值：0.5 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始水淹分析：StartFloodFill

```js
// let options = {
//     min: [-2335.08, 7285.07],
//     max: [6031.15, 16178.4],
//     seed: [641.83, 13813.49],
//     elevation: 35,
//     color: Color.Blue,
//     precision: 0.5
// }
let options = {
    min: [495119.875, 2491031.25],
    max: [495386.625, 2491245.5],
    seed: [495304.9, 2491041],
    elevation: 3.5,
    color: Color.LightSeaGreen,
    precision: 0.5
}

fdapi.camera.set(495215.15625, 2491285.75, 205.424454, -61.042461, 88.891701, 0);
fdapi.tools.startFloodFill(options);
```

---

### `startGeometryEdit(id, type, fn)` {#startGeometryEdit}

开始顶点编辑，目前支持watermesh polygon 3dpolygon polyline RadiationPoint customObject

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 对象ID |
| `type` | `number` | 是 | - | 坐标架类型，共四种类型，取值说明：1.缩放 2.旋转 3.位移 4.混合，默认取值是4 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：顶点编辑：StartGeometryEdit

```js
//定位到对象o1
fdapi.customObject.focus('o1', 10, 1);
// @param {string} id   对象ID
// @param {number} type 坐标架类型，共四种类型，取值说明：1.缩放 2.旋转 3.位移 4.混合，默认取值是4
fdapi.tools.startGeometryEdit('o1', 4);
```

---

### `startMeasurement(fn)` {#startMeasurement}

开始测量，用户可以在三维场景中点击鼠标进行测量

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：进入测量模式并开始测量：StartMeasurement

```js
//测量模式配置选项参数 不传坐标参数需要交互拾取坐标后再测量结果
let options = {
    'unitType': 0,//单位 0：米 1：千米 2：英尺，默认值 0
    'pointSize': 8.0,
    'textSize': 10.0,
    'textColor': Color.Yellow,
    'pointColor': [0, 0, 1, 0.3],
    'lineColor': Color.Blue,
    'areaColor': [0, 1, 0, 0.3],
    'showCoordinateText': true
};
//设置测量模式，详情参考文档内MeasurementMode枚举 支持以下类型： 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
fdapi.tools.setMeasurement(MeasurementMode.MultiPoint, options);
//开始测量 注意：5.3支持右键结束交互
fdapi.tools.startMeasurement();
```

> 示例：根据坐标值直接测量结果：StartMeasurement

```js
//取消测量
fdapi.tools.stopMeasurement();
//测量模式配置选项参数 传坐标参数则直接显示测量结果
let options = {
    'unitType': 1,//单位 0：米 1：千米 2：英尺，默认值 0
    'coordinates': [[492445.453125, 2491826.701489258, -0.686710205078125], [492462.8325, 2491814.2049731445, -0.686710205078125], [492450.03875, 2491798.5304492186, -0.686708984375], [492439.22750000004, 2491805.41876709, -0.686707763671875], [492439.5309375, 2491820.9455126952, -0.687000732421875]],
    'pointSize': 8.0,
    'textSize': 10.0,
    'textColor': Color.Yellow,
    'pointColor': [0, 0, 1, 0.3],
    'lineColor': Color.Blue,
    'areaColor': [0, 1, 0, 0.3],
    'showCoordinateText': true
};
//设置测量模式，详情参考文档内MeasurementMode枚举 支持以下类型： 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
fdapi.tools.setMeasurement(MeasurementMode.MultiPoint, options);
```

---

### `startPlaneClip(location, rotation, isShowPlane, isEditable, fn)` {#startPlaneClip}

开始面剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `location` | `array` | 是 | - | 生成位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 是 | - | 旋转角度 [Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `isShowPlane` | `boolean` | 否 | false | 剖切时是否显示辅助面，默认值：false |
| `isEditable` | `boolean` | 否 | false | 剖切时是否可交互编辑，默认值：false |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始面剖切：StartPlaneClip

```js
/**
 * 面剖切
 * @param {array} location 面剖切生成位置坐标：[X,Y,Z]
 * @param {array} rotation 旋转角度 [Pitch,Yaw,Roll]，数组元素类型：(float)，取值范围：[任意数值]
 * @param {boolean} showPlane  剖切时是否显示辅助面，默认值：false
 * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
 */
fdapi.camera.set(491722.232187, 2485085.134375, 3304.018125, -41.91861, -110.982338, 0);
fdapi.tools.startPlaneClip([489399.15625, 2487092.5, 19.214374542236328], [0, 0, 0], true, true);
```

---

### `startPolygonClip(coordinates, isReverseCut, fn)` {#startPolygonClip}

TileLayer多边形剖切， 效果图如下：



![Tools · startPolygonClip(coordinates, isReverseCut, fn) 示意](/img/refdoc/api/Tools.StartPolygonClip.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `coordinates` | `array` | 是 | - | 多边形坐标数组（数组的格式与Polygon、Polygon3D、HighlightArea一样），[取值示例](/docs/tutorials/coordinates) |
| `isReverseCut` | `boolean` | 否 | false | 多边形剖切是否反转，默认值：false |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：多边形剖切：StartPolygonClip

```js
fdapi.camera.set(491698.285, 2492832.564375, 2338.217344, -63.619705, 173.917404, 0);
//开启剖切支持
await fdapi.tileLayer.enableClip('E637D8FE42335EE96C58A1840BCAD0CE');
//多边形剖切坐标
let coords = [
    [489902.15625, 2492054.75, 0.62421876192092896],
    [489864.625, 2493387.25, 0.021406250074505806],
    [490764, 2493095.5, 2.9920313358306885],
    [490709.25, 2492026.5, 0.65687501430511475],
]
//多边形剖切反转
let isReverseCut = false;
fdapi.tools.startPolygonClip(coords, isReverseCut);
```

---

### `startSkylineAnalysis(options, fn)` {#startSkylineAnalysis}

开始天际线分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数信息，支持以下属性（如果未设置某个属性，则使用默认值）： `{ "color": Color.Red, //颜色值 "ids": ["TileLayerId1", "TileLayerId2"] //TileLayer的ID数组 }` |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startPoint` | `-` | 否 | - | 可选参数，天际线分析起点坐标位置，若不传入则从鼠标点击拾取获取 |
| `yaw` | `-` | 否 | - | 可选参数，天际线分析的朝向（当前相机朝向的Yaw），若不传入则从鼠标交互获取 |
| `showOutline` | `-` | 否 | true | 是否显示场景轮廓线，默认值：true |
| `outlineThickness` | `-` | 否 | 1 | 场景轮廓线像素宽度 (仅显示场景轮廓线有效)，默认值：1 |
| `outlineColor` | `-` | 否 | 绿色 | 场景轮廓线颜色 (仅显示场景轮廓线有效)，默认值：绿色 Color.Green |
| `useSceneColor` | `-` | 否 | false | 是否使用自定义场景颜色，默认值：false |
| `sceneColor` | `-` | 否 | 黑色 | 设置场景颜色 (仅使用自定义场景颜色有效)，默认值：黑色 Color.Black |
| `showSkyline` | `-` | 否 | true | 是否显示天际线窗口，默认值：true |
| `interactiveLock` | `-` | 否 | true | 是否开启交互锁定，默认值：true |
| `windowSize` | `-` | 是 | - | 天际线窗口大小 0:X 1:Y |
| `skylineColor` | `-` | 否 | 绿色 | 天际线颜色(仅显示天际线窗口有效)，默认值：绿色 Color.Green |
| `backgroundColor` | `-` | 否 | [0,0,0,0.75] | 天际线窗口背景颜色：默认值：[0,0,0,0.75] |
| `height` | `-` | 否 | 0 | 视点高度（距离场景交互所拾取点的高度），默认值：0 |
| `tileLayers` | `-` | 是 | - | 数组类型，若此数组为空默认绘制所有物体形成的天际线;不为空则多个TileLayer形成的一条天际线，多条天际线绘制到该图上；数组示例如下： |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始天际线分析：StartSkylineAnalysis

```js
let options = {
    startPoint: [492685.4975, 2491384.16, 0.38284179687500003],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    yaw: -82,//朝向
    showOutline: true,
    outlineThickness: 3.0,
    outlineColor: Color.Red,
    useSceneColor: false,
    sceneColor: Color.Black,
    showSkyline: true,
    interactiveLock: true,
    windowSize: [400, 200],
    skylineColor: Color.Green,
    backgroundColor: Color.Gray,
    height: 50.0,
    tileLayers: [
        {
            color: Color.Blue,
            ids: ['B1C4E5BD4888DA841D690AA396B061C3', 'A659DF0E404D806CB3511C9DAC22D160']
        }
    ]
}
fdapi.tools.startSkylineAnalysis(options);
```

---

### `startSunshineAnalysis(options, fn)` {#startSunshineAnalysis}

开始日照分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数对象信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `coordinates` | `-` | 否 | - | 日照分析的点位数组，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `year` | `-` | 否 | 当前日期 | 年，取值范围：[1970~至今年份]，默认值：当前日期 |
| `month` | `-` | 否 | 当前日期 | 月，取值范围：[1~12]，默认值：当前日期 |
| `day` | `-` | 否 | 当前日期 | 日，取值范围：[1~31]，默认值：当前日期 |
| `startTime` | `-` | 否 | 08:00 | 开始时间，取值类型：时间字符串，默认值：08:00 |
| `endTime` | `-` | 否 | 16:00 | 结束时间，取值类型：时间字符串，默认值：16:00 |
| `spacing` | `-` | 否 | -1米 | 间距，取值范围：[任意负数~任意正数]，默认值：-1米 |
| `groundElevation` | `-` | 否 | 0米 | 底面高度，取值范围：[任意负数~任意正数]，默认值：0米 |
| `height` | `-` | 否 | 5000米 | 高度，取值范围：[0~任意正数]，默认值：5000米 |
| `sphereRadius` | `-` | 否 | 1米 | 日照效果球半径，取值范围：[0~任意正数]，默认值：1米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始日照分析：StartSunshineAnalysis

```js
fdapi.camera.set(492736.677812, 2492420.577812, 143.058848, -21.954241, 80.143684, 0);

let options = {
    coordinates: [
        [492888.27187500003, 2492103.36, 2.3133203125],
        [492789.1425, 2492137.2800000003, -0.8868945312500001],
        [492810.323125, 2492218.72, -0.8867578125],
        [492918.444375, 2492185.44, 2.3133203125],
    ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    year: 2022,//年，取值范围：[1970~至今年份]，默认值：当前日期
    month: 1,//月，取值范围：[1~12]，默认值：当前日期
    day: 12,//日，取值范围：[1~31]，默认值：当前日期
    startTime: "08:00",//开始时间，默认值：08:00
    endTime: "16:00",//结束时间，默认值：16:00
    spacing: -1,//间距，取值范围：[任意负数~任意正数]，默认值：-1米
    groundElevation: 0,//底面高度，取值范围：[任意负数~任意正数]，默认值：0米
    height: 100,//高度，取值范围：[0~任意正数]，默认值：5000米
    sphereRadius: 10//日照效果球半径，取值范围：[0~任意正数]
};
fdapi.tools.startSunshineAnalysis(options);
```

---

### `startTerrainSlopeAnalysis(options, fn)` {#startTerrainSlopeAnalysis}

开始坡度坡向分析，适用于地形3dt数据

以下为分析结果颜色卡取值：



![Tools · startTerrainSlopeAnalysis(options, fn) 示意](/img/refdoc/api/terrainSlopeAnalysis.png)

分析结果取值范围： [0~7],   对应颜色值： [0,0.968627,0,1]

分析结果取值范围： [7~15],  对应颜色值： [0.352941,0.968627,0,1]

分析结果取值范围： [15~23], 对应颜色值： [0.549020,0.968627,0,1]

分析结果取值范围： [23~31], 对应颜色值： [0.709804,0.968627,0,1]

分析结果取值范围： [31~39], 对应颜色值： [0.870588,0.968627,0,1]

分析结果取值范围： [39~47], 对应颜色值： [0.968627,0.870588,0,1]

分析结果取值范围： [47~55], 对应颜色值： [1,0.709804,0,1]

分析结果取值范围： [55~63], 对应颜色值： [1,0.517647,0,1]

分析结果取值范围： [63~70], 对应颜色值： [1,0.290196,0,1]

分析结果取值范围： [70~90], 对应颜色值： [0.968627,0,0,1]

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数对象信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `coordinates` | `-` | 否 | - | 坡度坡向分析的点位数组，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `showArrow` | `-` | 否 | true | 是否显示箭头，&#123;boolean&#125;，默认值：true |
| `colorMode` | `-` | 否 | 1 | 模式，&#123;number&#125;，取值范围：【1坡度 2坡向】，默认值：1 |
| `arrowColor` | `-` | 否 | 白色 | 箭头颜色，默认值：白色 [1,1,1,1] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始坡度坡向分析：StartTerrainSlopeAnalysis

```js
fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

//开始坡度坡向分析
let options = {
    coordinates: [
        [488501.21875, 2488108, 19.438125610351563],
        [489722.4375, 2490857, 4.0191407203674316],
        [491464.96875, 2489233.5, 18.179296493530273],
        [490473.125, 2486914.5, 2.1426563262939453],
    ],//可选参数 注意：不传入时可以通过鼠标交互拾取
    showArrow: true,//是否显示箭头，{boolean}，默认值：true
    colorMode: 1,//模式，{number}，取值范围：【1坡度 2坡向】，默认值：1，
    arrowColor: [1, 1, 1, 1]//箭头颜色
};
fdapi.tools.startTerrainSlopeAnalysis(options);
```

---

### `startViewDomeAnalysis(options, fn)` {#startViewDomeAnalysis}

开始开敞度分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startPoint` | `-` | 否 | - | 观察点位置坐标，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `radius` | `-` | 否 | 500 | 展示半径，单位：米，取值范围：[0.01~任意正数]，默认值：500 |
| `opacity` | `-` | 否 | 0.5 | 透明度，取值范围：[0~1]，默认值：0.5 |
| `visibleColor` | `-` | 否 | 红色 | 可见区域的颜色，默认值：红色 Color.Red |
| `invisibleColor` | `-` | 否 | 绿色 | 不可见区域的颜色，默认值：绿色 Color.Green |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始开敞度分析：StartViewDomeAnalysis

```js
fdapi.camera.set(492906.810332, 2492317.978672, 210.84125, -27.420456, 117.353394, 0);

let option = {
    startPoint: [492647.38125000003, 2491946.24, -0.88685546875],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    radius: 200,//展示半径，单位：米，取值范围：[0.01~任意正数]，默认值：500
    opacity: 0.5,//透明度，取值范围：[0~1]，默认值：0.5
    visibleColor: [0, 1, 0, 1],//可见区域的颜色，默认值：红色
    invisibleColor: [1, 0, 1, 0]//不可见区域的颜色，默认值：绿色
};
fdapi.tools.startViewDomeAnalysis(option);
```

---

### `startViewshedAnalysis(options, fn)` {#startViewshedAnalysis}

开始可视域分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数信息，支持以下属性（如果未设置某个属性，则使用默认值）： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startPoint` | `-` | 否 | - | 可选，视域分析起点坐标位置，若不传入则从鼠标点击拾取获取，[取值示例](/docs/tutorials/coordinates) |
| `endPoint` | `-` | 否 | - | 可选，视域分析终点坐标位置，若不传入则从鼠标点击拾取获取，[取值示例](/docs/tutorials/coordinates) |
| `yaw` | `-` | 否 | 0 | 可选，水平角，取值范围：[-180°~180°]，默认值：0，注意：只有在鼠标点击拾取起始点目标点坐标时才生效 |
| `pitch` | `-` | 否 | 0 | 可选，俯仰角，取值范围：[-90°~90°]，默认值：0，注意：只有在鼠标点击拾取起始点目标点坐标时才生效 |
| `fov_h` | `-` | 否 | 60 | 横向视角，取值范围：[1°~150°]，默认值：60 |
| `fov_v` | `-` | 否 | 30 | 纵向视角，取值范围：[1°~150°]，默认值：30 |
| `height` | `-` | 否 | 0 | 视点高度（距离场景交互所拾取点的高度），默认值：0 |
| `visibleColor` | `-` | 否 | 绿色 | 可见区域的颜色，默认值：绿色 Color.Green |
| `invisibleColor` | `-` | 否 | 红色 | 不可见区域的颜色，默认值：红色 Color.Red |
| `interactiveLock` | `-` | 否 | false | 是否开启交互锁定，默认值：false |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始视域分析：StartViewshedAnalysis

```js
fdapi.camera.set(483394.35125, 2489324.9675, 5003.239688, -41.042278, -4.709811, 0);

let options = {
    startPoint: [486931.84375, 2490639.75, 6.382500171661377],// 起点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    endPoint: [488387.28125, 2490321.5, 6.0603122711181641],// 终点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    fov_h: 150,//横向视角，取值范围：[1°~150°]，默认值：60
    fov_v: 45,//纵向视角，取值范围：[1°~150°]，默认值：30
    height: 10.0,//视点高度（距离场景交互所拾取点的高度），默认值：0
    visibleColor: Color.Green,//可见区域的颜色，默认值：红色 Color.Red
    invisibleColor: Color.Red,//不可见区域的颜色，默认值：绿色 Color.Green
    interactiveLock: false //是否开启交互锁定
}
fdapi.tools.startViewshedAnalysis(options);
```

---

### `startVisiblityAnalysis(options, fn)` {#startVisiblityAnalysis}

开始通视分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `options` | `object` | 是 | - | 参数信息，支持以下属性（如果未设置某个属性，则使用默认值） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `startPoint` | `-` | 否 | - | 观察点位置坐标，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `endPoints` | `-` | 否 | - | 目标点位置集合数组，可选参数，当不传入此参数时需通过鼠标交互拾取目标点 |
| `height` | `-` | 否 | 0 | 视点高度（距离场景交互所拾取点的高度），取值范围：[任意负数~任意正数]，默认值：0 |
| `visibleColor` | `-` | 否 | 红色 | 可见区域的颜色，默认值：红色 Color.Red |
| `invisibleColor` | `-` | 否 | 绿色 | 不可见区域的颜色，默认值：绿色 Color.Green |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始通视分析：StartVisiblityAnalysis

```js
fdapi.camera.set(492376.528496, 2492111.358945, 63.639897, -27.420462, 117.353462, 0);

let option = {
    startPoint: [492381.63375000004, 2492015.36, -0.8868505859375],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
    endPoints: [
        [492314.92625, 2491961.2800000003, -0.886845703125],
        [492294.97250000003, 2492009.7600000002, -0.8868603515625],
        [492267.195, 2491972.8000000003, -0.8868603515625]
    ],//多个目标点坐标数组 可选参数 注意：不传入时可以通过鼠标交互拾取
    height: 1.8,//视点高度（距离场景交互所拾取点的高度）
    visibleColor: [0, 1, 0, 1],//可见区域的颜色，默认值：红色
    invisibleColor: [1, 0, 1, 0]//不可见区域的颜色，默认值：绿色
};
fdapi.tools.startVisiblityAnalysis(option);
```

---

### `startVolumeClip(bbox, direction, isShowBBox, isEditable, rotation, fn)` {#startVolumeClip}

开始体剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `array` | 是 | - | 剖切的包围盒，即bounding box，[取值示例](/docs/tutorials/coordinates) |
| `direction` | `number` | 是 | - | 0：正向剖切，1：反向剖切 |
| `isShowBBox` | `boolean` | 否 | false | 剖切时是否显示剖切范围的包围盒，默认值：false |
| `isEditable` | `boolean` | 否 | false | 剖切时是否可交互编辑，默认值：false |
| `rotation` | `array` | 是 | - | bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：开始体剖切：StartVolumeClip

```js
//切换相机位置到剖切范围内
fdapi.camera.set(494188.212969, 2489127.357422, 3717.1875, -50.044331, -177.079071, 0);

/**
 * 开始体剖切
 * @param {array}   bbox  剖切范围包围盒 
 * @param {number}  value 0：正向剖切，1：反向剖切
 * @param {boolean} isShowBBox 剖切时是否显示剖切范围的包围盒，默认值：false
 * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
 * @param {array}   rotation bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转
 * @param {function} fn 可选的回调函数，请参考[二次开发：异步接口调用方式]{@tutorial API_AsyncCall}
 */
let bbox = [488670.75, 2488165, -200, 491659.59375, 2490987.5, 800];
fdapi.tools.startVolumeClip(bbox, 0, true, true, [0, 0, 0]);
```

---

### `stopClip(fn)` {#stopClip}

> ⚠️ **已废弃**：接口已在新版 SDK 中标记废弃，新项目请勿使用，存量调用建议迁移到对应替代接口。

:::caution 已废弃

2021.03.23之后的版本已弃用，请用stopPolygonClip代替

:::

停止多边形剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.tools.stopClip();
```

---

### `stopContourLineAnalysis(fn)` {#stopContourLineAnalysis}

停止等高线分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止等高线分析：StopContourLineAnalysis

```js
fdapi.tools.stopContourLineAnalysis();
```

---

### `stopCutFillAnalysis(fn)` {#stopCutFillAnalysis}

停止填挖方分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止填挖方分析：StopCutFillAnalysis

```js
fdapi.tools.stopCutFillAnalysis();
```

---

### `stopFloodFill(fn)` {#stopFloodFill}

停止水淹分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止水淹分析：StopFloodFill

```js
fdapi.tools.stopFloodFill();
```

---

### `stopGeometryEdit(fn)` {#stopGeometryEdit}

退出顶点编辑

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：退出顶点编辑：StopGeometryEdit

```js
fdapi.tools.stopGeometryEdit();
```

---

### `stopMeasurement(fn)` {#stopMeasurement}

停止测量

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止测量：StopMeasurement

```js
fdapi.tools.stopMeasurement();
```

---

### `stopPlaneClip(fn)` {#stopPlaneClip}

停止面剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止面剖切：StopPlaneClip

```js
fdapi.tools.stopPlaneClip();
```

---

### `stopPolygonClip(fn)` {#stopPolygonClip}

停止多边形剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止多边形剖切：StopPolygonClip

```js
fdapi.tools.stopPolygonClip();
```

---

### `stopSkylineAnalysis(fn)` {#stopSkylineAnalysis}

结束天际线分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止天际线分析：StopSkylineAnalysis

```js
fdapi.tools.stopSkylineAnalysis();
```

---

### `stopSunshineAnalysis(fn)` {#stopSunshineAnalysis}

停止日照分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止日照分析：StopSunshineAnalysis

```js
fdapi.tools.stopSunshineAnalysis();
```

---

### `stopTerrainSlopeAnalysis(fn)` {#stopTerrainSlopeAnalysis}

停止坡度坡向分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止坡度坡向分析：StopTerrainSlopeAnalysis

```js
fdapi.tools.stopTerrainSlopeAnalysis();
```

---

### `stopViewDomeAnalysis(fn)` {#stopViewDomeAnalysis}

停止开敞度分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止开敞度分析：StopViewDomeAnalysis

```js
fdapi.tools.stopViewDomeAnalysis();
```

---

### `stopViewshedAnalysis(fn)` {#stopViewshedAnalysis}

停止可视域分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止视域分析：StopViewshedAnalysis

```js
fdapi.tools.stopViewshedAnalysis();
```

---

### `stopVisiblityAnalysis(fn)` {#stopVisiblityAnalysis}

停止通视分析

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止通视分析：StopVisiblityAnalysis

```js
fdapi.tools.stopVisiblityAnalysis();
```

---

### `stopVolumeClip(fn)` {#stopVolumeClip}

停止体剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：停止体剖切：StopVolumeClip

```js
fdapi.tools.stopVolumeClip();
```

---

### `updateVolumeClip(bbox, direction, isShowBBox, isEditable, rotation, fn)` {#updateVolumeClip}

更新体剖切

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `array` | 是 | - | 剖切的包围盒，即bounding box，[取值示例](/docs/tutorials/coordinates) |
| `direction` | `number` | 是 | - | 0：正向剖切，1：反向剖切 |
| `isShowBBox` | `boolean` | 否 | false | 剖切时是否显示剖切范围的包围盒，默认值：false |
| `isEditable` | `boolean` | 否 | false | 剖切时是否可交互编辑，默认值：false |
| `rotation` | `array` | 是 | - | bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转，注意：只支持更新Yaw |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：更新体剖切：UpdateVolumeClip

```js
//切换相机位置到剖切范围内
fdapi.camera.set(494188.212969, 2489127.357422, 3717.1875, -50.044331, -177.079071, 0);
/**
 * 更新体剖切
 * @param {array}   bbox  剖切范围包围盒 
 * @param {number}  value 0：正向剖切，1：反向剖切
 * @param {boolean} isShowBBox 剖切时是否显示剖切范围的包围盒，默认值：false
 * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
 * @param {array}   rotation bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转，注意：只支持更新Yaw
 * @param {function} fn 可选的回调函数，请参考[二次开发：异步接口调用方式]{@tutorial API_AsyncCall}
 */
let bbox = [488670.75, 2488165, -200, 491659.59375, 2490987.5, 800];
fdapi.tools.updateVolumeClip(bbox, 0, true, false, [0, 40, 0]);
```

### `bboxContainsBBox(outer, inner)` {#bboxContainsBBox}

判断 inner 包围盒是否被完全包含在 outer 内

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `outer` | `Array.&lt;number&gt;` | 是 | - | 外包围盒 |
| `inner` | `Array.&lt;number&gt;` | 是 | - | 内包围盒 |

**返回：** Type boolean


### `bboxIntersect(b1, b2)` {#bboxIntersect}

判断两个AABB包围盒是否相交

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `b1` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |
| `b2` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** true相交


### `calcAdjacentPointDistances(points)` {#calcAdjacentPointDistances}

相邻点分段距离数组

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 点数组 |

**返回：** Type Array.&lt;number&gt;


### `calcPolylineTotalLength(points)` {#calcPolylineTotalLength}

折线总长度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 点数组 |

**返回：** Type number


### `expandBBox(bbox, buffer)` {#expandBBox}

包围盒膨胀/收缩，各个方向向外增加buffer距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |
| `buffer` | `number` | 是 | - | 膨胀距离，正数向外扩大；负数向内收缩 |

**返回：** 新包围盒


### `getBBox(points)` {#getBBox}

根据点集计算AABB包围盒

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 三维点数组 |

**返回：** [minX, minY, minZ, maxX, maxY, maxZ]


### `getBBoxCenter(bbox)` {#getBBoxCenter}

获取包围盒中心点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** [cx, cy, cz]


### `getBBoxCorners(bbox)` {#getBBoxCorners}

包围盒 8 个角点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** 8 个 [x,y,z]


### `getBBoxSize(bbox)` {#getBBoxSize}

包围盒尺寸 [sx, sy, sz]

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** Type Array.&lt;number&gt;


### `getBBoxVolume(bbox)` {#getBBoxVolume}

包围盒体积（min>max 时为负数，可先用 validateBBox 检查）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** Type number


### `getMidddlePoint(p1, p2)` {#getMidddlePoint}

获取两点的中间点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p1` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `p2` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** 中间点


### `getPointAtDistance(points, dist)` {#getPointAtDistance}

沿折线按弧长取点：从起点出发走 dist 距离所在的位置

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 折线顶点 |
| `dist` | `number` | 是 | - | 弧长距离（m），超出总长时返回终点 |

**返回：** point: 目标点; segmentIndex: 所在线段索引（起点段为0）; t: 段内参数 [0,1]


### `getPointDistance(p1, p2)` {#getPointDistance}

两点三维欧氏距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p1` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `p2` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** 两点距离


### `getPointDistanceSq(p1, p2)` {#getPointDistanceSq}

两点距离平方（不开根号，用于对比，计算性能更高）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p1` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `p2` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** 两点距离的平方


### `getPolylineInfo(points)` {#getPolylineInfo}

获取折线完整信息：分段距离 + 总长

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | - |

**返回：** Type Object


### `lerpPoint(p1, p2, t)` {#lerpPoint}

两点线性插值 t=0 返回 p1，t=1 返回 p2；t 超出 [0,1] 为外插

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p1` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `p2` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `t` | `number` | 是 | - | 插值系数 |

**返回：** Type Array.&lt;number&gt;


### `mergeBBox(b1, b2)` {#mergeBBox}

合并两个包围盒（取并集）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `b1` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |
| `b2` | `Array.&lt;number&gt;` | 是 | - | 同上 |

**返回：** 合并后包围盒


### `offsetPolyline(points, normal, offset)` {#offsetPolyline}

折线沿给定法线方向横向偏移，生成平行折线 注意：适合平面折线，法线是平面法向量；非平面空间曲线偏移会失真

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 原始折线 |
| `normal` | `Array.&lt;number&gt;` | 是 | - | 平面单位法线 [nx,ny,nz] |
| `offset` | `number` | 是 | - | 偏移距离（正负控制方向） |

**返回：** 偏移后折线


### `pointInBBox(point, bbox)` {#pointInBBox}

判断点是否在AABB包围盒内部（包含边界）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `point` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `bbox` | `Array.&lt;number&gt;` | 是 | - | [minX,minY,minZ,maxX,maxY,maxZ] |

**返回：** Type boolean


### `pointInPolygon2D(pt, polygon)` {#pointInPolygon2D}

判断点是否在 XY 平面多边形内部（射线法，z 被忽略） 注意：点恰好在边界上时结果不稳定，边界场景请用专门逻辑处理

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `pt` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `polygon` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 顶点数组，至少3个 |

**返回：** true 在内部


### `pointToPlaneDistance(pt, planePoint, planeNormal)` {#pointToPlaneDistance}

点到平面的有符号距离（正 = 位于法线一侧，负 = 反侧）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `pt` | `Array.&lt;number&gt;` | 是 | - | 待求点 [x,y,z] |
| `planePoint` | `Array.&lt;number&gt;` | 是 | - | 平面上一点 [x,y,z] |
| `planeNormal` | `Array.&lt;number&gt;` | 是 | - | 平面法线（无需单位化，但不能为零向量） |

**返回：** 有符号距离


### `pointToPolyline(pt, points)` {#pointToPolyline}

点到折线的最近点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `pt` | `Array.&lt;number&gt;` | 是 | - | 待求点 [x,y,z] |
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 折线顶点 |

**返回：** point: 最近点; dist: 最近距离; segmentIndex: 所在线段索引; t: 段内参数 [0,1]


### `polygonArea2D(points)` {#polygonArea2D}

XY 平面多边形面积（鞋带公式，顶点顺序任意，自动取绝对值）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 顶点数组 [[x,y,z],...]，至少3个，z 被忽略 |

**返回：** 面积


### `polygonCentroid2D(points)` {#polygonCentroid2D}

XY 平面多边形质心（面积加权；退化三角形近似共线时退化为顶点平均）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 顶点数组，至少3个，z 被忽略 |

**返回：** [cx, cy, 平均z]


### `projectPointToSegment(pt, p0, p1)` {#projectPointToSegment}

点投影到线段 p0-p1，返回投影点，以及是否在线段内部

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `pt` | `Array.&lt;number&gt;` | 是 | - | 待投影点 |
| `p0` | `Array.&lt;number&gt;` | 是 | - | 线段起点 |
| `p1` | `Array.&lt;number&gt;` | 是 | - | 线段终点 |


### `removeNearbyPoints(points, tolerance)` {#removeNearbyPoints}

清理折线，删除相邻距离小于 tolerance 的点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | - |
| `tolerance` | `number` | 是 | - | 距离阈值m，推荐1e-6 |

**返回：** Type Array.&lt;Array.&lt;number&gt;&gt;


### `replaceTextures(data, fn)` {#replaceTextures}

批量替换纹理路径

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data.sourceTexturePath` | `string` | 是 | - | 被替换的材质纹理路径 |
| `data.targetTexturePath` | `string` | 是 | - | 待替换的新材质纹理路径 |
| `data.type` | `number` | 是 | - | 新材质纹理的类型：1视频 2图片 3网页 |


### `samplePolylineByCount(points, count)` {#samplePolylineByCount}

折线均分采样，输出固定count个点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 点数组 |
| `count` | `number` | 是 | - | 总点数>=2 |

**返回：** Type Array.&lt;Array.&lt;number&gt;&gt;


### `samplePolylineByStep(points, step)` {#samplePolylineByStep}

折线按固定步长采样

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | - |
| `step` | `number` | 是 | - | 步长m |

**返回：** Type Array.&lt;Array.&lt;number&gt;&gt;


### `segmentIntersect3D(s0, s1, t0, t1)` {#segmentIntersect3D}

三维空间两线段求最近点与距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `s0` | `Array.&lt;number&gt;` | 是 | - | 线段1起点 [x,y,z] |
| `s1` | `Array.&lt;number&gt;` | 是 | - | 线段1终点 [x,y,z] |
| `t0` | `Array.&lt;number&gt;` | 是 | - | 线段2起点 [x,y,z] |
| `t1` | `Array.&lt;number&gt;` | 是 | - | 线段2终点 [x,y,z] |


### `simplifyPolyline(points, tolerance)` {#simplifyPolyline}

Douglas-Peucker 折线抽稀（支持三维），保留首尾点

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 折线顶点 |
| `tolerance` | `number` | 是 | - | 垂距阈值（m），越大抽稀越狠，推荐 0.1~1 |

**返回：** 抽稀后顶点


### `smoothPolyline(points, iterations)` {#smoothPolyline}

Chaikin 折线平滑（切角算法，保持首尾点不动）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 折线顶点 |
| `iterations` | `number` | 是 | - | 平滑次数，1 次点数约翻倍，推荐 2~3 |

**返回：** 平滑后顶点


### `triangleArea(p1, p2, p3)` {#triangleArea}

三维三角形面积

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p1` | `Array.&lt;number&gt;` | 是 | - | 顶点1 [x,y,z] |
| `p2` | `Array.&lt;number&gt;` | 是 | - | 顶点2 |
| `p3` | `Array.&lt;number&gt;` | 是 | - | 顶点3 |

**返回：** 面积


### `validateBBox(bbox)` {#validateBBox}

校验包围盒数组 [minX,minY,minZ,maxX,maxY,maxZ]

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | 待验证的包围盒 |


### `validateBBoxSize(bbox, minLimit, maxLimit)` {#validateBBoxSize}

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `bbox` | `Array.&lt;number&gt;` | 是 | - | 待验证的包围盒 |
| `minLimit` | `number` | 是 | - | 长宽高允许的最小尺寸 |
| `maxLimit` | `number` | 是 | - | 长宽高允许的最大尺寸 |


### `validateNumber(v, name)` {#validateNumber}

校验数值

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `v` | `number` | 是 | - | 数值 |
| `name` | `string` | 是 | - | 数值对应的字段名称 |


### `validatePoint(p, idx)` {#validatePoint}

校验单个三维点 [x,y,z]

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `p` | `Array.&lt;number&gt;` | 是 | - | 三维点 |
| `idx` | `number` | 是 | - | 点索引，报错提示使用 |


### `validatePointArray(points)` {#validatePointArray}

校验点数组 [[x,y,z],...]

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `points` | `Array.&lt;Array.&lt;number&gt;&gt;` | 是 | - | 三维点数组 |


### `vecAdd(a, b)` {#vecAdd}

向量加法 a + b

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `a` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `b` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** Type Array.&lt;number&gt;


### `vecAngle(a, b)` {#vecAngle}

两向量夹角（弧度，范围 [0, π]），任一向量为零向量报错

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `a` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `b` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** 弧度


### `vecCross(a, b)` {#vecCross}

向量叉积 a × b（结果同时垂直于 a、b，方向遵循右手定则）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `a` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `b` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** Type Array.&lt;number&gt;


### `vecDot(a, b)` {#vecDot}

向量点积

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `a` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `b` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** Type number


### `vecLength(v)` {#vecLength}

向量长度

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `v` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** Type number


### `vecNormalize(v)` {#vecNormalize}

向量归一化（零向量报错）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `v` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** 单位向量


### `vecScale(v, k)` {#vecScale}

向量数乘 v * k

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `v` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `k` | `number` | 是 | - | 缩放系数 |

**返回：** Type Array.&lt;number&gt;


### `vecSub(a, b)` {#vecSub}

向量减法 a - b

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `a` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |
| `b` | `Array.&lt;number&gt;` | 是 | - | [x,y,z] |

**返回：** Type Array.&lt;number&gt;
