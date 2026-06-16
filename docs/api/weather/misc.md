---
title: Misc
sidebar_label: Misc
description: "Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。"
---

# Misc

Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。

通过 `api.misc` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。
- **别名 / 不同行业叫法**：杂项 / 辅助接口 / 工具杂项（无明显行业别称）。
- **适用行业**：通用
- **使用场景**：
  - 添加自定义图片按钮/控件
  - 通用提示与辅助交互
  - 零散功能的调用
- **注意事项**：
  - 功能较杂，按需取用
  - UI 类接口注意与页面布局协调
  - 不同版本可能存在差异



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addAnimatedImageButtons`](#addAnimatedImageButtons) | 添加动画按钮 |  |
| [`addImageButtons`](#addImageButtons) | 添加图片按钮 |  |
| [`callBPFunction`](#callBPFunction) | 调用整个渲染场景内指定的蓝图函数 |  |
| [`deleteImageButtons`](#deleteImageButtons) | 删除动画按钮 |  |
| [`enterMultiViewportMode`](#enterMultiViewportMode) | 进入多视口模式 |  |
| [`enterReportMode`](#enterReportMode) | 进入汇报演示模式 |  |
| [`exitMultiViewportMode`](#exitMultiViewportMode) | 退出多视口模式 |  |
| [`exitReportMode`](#exitReportMode) | 退出汇报演示模式 |  |
| [`getActiveViewport`](#getActiveViewport) | 查询当前激活的视口信息 |  |
| [`getBPFunction`](#getBPFunction) | 根据模型Actor路径或者对象id查询模型包含的蓝图函数信息，支持查询单个模型和多个模型… |  |
| [`getConvexPolygon`](#getConvexPolygon) | 从一组离散点中获取凸多边形的顶点索引 |  |
| [`getMaterial`](#getMaterial) | 根据材质路径查询材质包含的图片纹理和材质参数信息，同时支持查询单个材质和多个材质包含的信息 |  |
| [`hideAllFoliages`](#hideAllFoliages) | 隐藏Explorer里创建的植物 |  |
| [`isApiVersionMatched`](#isApiVersionMatched) | 判断JS-API的版本和云渲染服务器的接口版本是否一致 |  |
| [`playMovie`](#playMovie) | 全屏播放影片（播放过程中会暂停三维渲染以提高性能） |  |
| [`playVideo`](#playVideo) | 播放视频（显示播放窗口） |  |
| [`playVideoAlone`](#playVideoAlone) | 在独立的进程播放视频， |  |
| [`projectAssetCount`](#projectAssetCount) | 统计ACP工程包含各类资产信息 |  |
| [`projectAssetCountAll`](#projectAssetCountAll) | 统计ACP工程包含的全部资产信息 |  |
| [`reloadPak`](#reloadPak) | 从Cloud的文件资源配置中重新挂载新添加的pak文件，避免重启服务引起的实例关闭 |  |
| [`setActiveViewport`](#setActiveViewport) | 激活一个或多个视口， |  |
| [`setApiVersionReceived`](#setApiVersionReceived) | 设置服务器返回版本号的回调函数 |  |
| [`setMultiviewportInteractSync`](#setMultiviewportInteractSync) | 多视口模式下设置相机是否同步 |  |
| [`setReportModeAlign`](#setReportModeAlign) | 设置汇报模式下的窗口位置 |  |
| [`setReportModePlayMode`](#setReportModePlayMode) | 设置汇报模式下窗口的播放模式 |  |
| [`setReportModeViewPortLinkage`](#setReportModeViewPortLinkage) | 设置汇报模式下展示多视口时，相机是否联动  取值：联动true，不联动false，默认不… |  |
| [`showAllFoliages`](#showAllFoliages) | 显示Explorer里创建的植物 |  |
| [`stopMovie`](#stopMovie) | 停止全屏播放影片 |  |
| [`stopPlayVideo`](#stopPlayVideo) | 停止播放视频（播放窗口会消失） |  |
| [`stopPlayVideoAlone`](#stopPlayVideoAlone) | 停止在独立的进程播放视频， |  |
| [`switchShortcutKey`](#switchShortcutKey) | 控制Explorer快捷键的开关， |  |

## 方法（Methods）

### `addAnimatedImageButtons(data, fn)` {#addAnimatedImageButtons}

添加动画按钮

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `number` | 按钮的ID |
| `x` | `number` | 图片按钮的位置:x坐标 |
| `y` | `number` | 图片按钮的位置:y坐标 |
| `width` | `number` | 图片按钮的宽度，单位像素 |
| `height` | `number` | 图片按钮的高度，单位像素 |
| `imageSequecePath` | `string` | 序列贴图的路径，[资源引入说明](/docs/tutorials/resources) |
| `imageSequeceLength` | `string` | 序列贴图的图片数量，也就是帧数 |
| `loop` | `boolean` | 是否循环播放序列贴图 |
| `interactable` | `boolean` | 是否可以用鼠标点击操作 |

> 示例代码如下：

```js
await fdapi.misc.addAnimatedImageButtons(data);
```

---

### `addImageButtons(data, fn)` {#addImageButtons}

添加图片按钮

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 按钮的ID |
| `x` | `number` | Button的屏幕坐标X |
| `y` | `number` | Button的屏幕坐标Y |
| `width` | `number` | Button的宽度 |
| `height` | `number` | Button的高度 |
| `normalImage` | `string` | Button正常显示的图片 |
| `hoverImage` | `string` | 鼠标移上去后显示的图片 |
| `tooltip` | `string` | Button的文字提示 |

> 示例代码如下：

```js
await fdapi.misc.addImageButtons(data);
```

---

### `callBPFunction(data, fn)` {#callBPFunction}

调用整个渲染场景内指定的蓝图函数 注意：调用前请先确认被调用的蓝图函数已存在，并和设计蓝图函数的开发人员沟通确认相关参数取值后再调用



![](/img/refdoc/api/Blueprints.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object` | 支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `actorTag` | `string` | 发布蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认 |
| `objectName` | `string` | 模型包含的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取 |
| `functionName` | `string` | 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在 |
| `paramType` | [`BPFuncParamType`](/docs/api/types#bpfuncparamtype) | 传入单个参数，待传入参数类型 参考`BPFuncParamType`，如果需传递对象类型参数可以把Json对象定义为StringArray类型，在蓝图函数内部自己实现反序列化解析。 |
| `paramValue` | `any` | 传入单个参数，根据参数类型设置对应参数值 |
| `parameters` | `array` | 传入多个参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

> 示例：调用蓝图函数：CallBPFunction

```js
// 先移动相机镜头到动画场景范围内
fdapi.camera.set(492411.977813, 2491993.023516, 102.233096, -33.122059, 118.372009, 1);

/**
* 蓝图函数说明：UE4引擎自带的一种图形化程序开发界面，旨在降低开发人员门槛。蓝图的本质类似于宏程序脚本，包含有输入输出参数和自定的参数数据类型。
* 以下示例代码为调用蓝图函数演示模型动画效果
* 注意：调用前请先确认被调用的蓝图函数已存在，并和设计UE蓝图函数的开发人员沟通确认相关参数取值后再调用
*/
fdapi.misc.callBPFunction({
    // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认
    actorTag: 'function',
    // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取
    objectName: 'BP_Explode_function_2',
    // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在
    functionName: 'BPF_Explode_Animation',
    // 传入参数类型  参考BPFuncParamType枚举
    paramType: BPFuncParamType.Vector,
    // 根据传入参数类型设置对应参数值
    paramValue: [1, 0, 0]
});
```

---

### `deleteImageButtons(ids, fn)` {#deleteImageButtons}

删除动画按钮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `array` | 按钮的ID或数组（可以一次删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.misc.deleteImageButtons(ids);
```

---

### `enterMultiViewportMode(viewportMode, lineColor, lineSize, fn)` {#enterMultiViewportMode}

进入多视口模式



![视口布局类型](/img/refdoc/api/viewport_mode.png)

| 参数 | 类型 | 说明 |
|------|------|------|
| `viewportMode` | `number` | 视口布局类型，取值范围：[1~7]，参考上图从上到下从左到右计数，即录制导览动画时的视口布局 |
| `lineColor` | [`Color`](/docs/api/types#color) | 可选参数，激活后视口边框线的颜色，默认值：#DEA309，支持四种格式，[取值示例](/docs/tutorials/color) |
| `lineSize` | `number` | 可选参数，激活后视口边框线的宽度，单位：像素，默认值：2px |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：进入多视口模式：EnterMultiViewportMode

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#DEA309";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
```

---

### `enterReportMode(fn)` {#enterReportMode}

进入汇报演示模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：进入汇报演示模式：EnterReportMode

```js
fdapi.misc.enterReportMode();
```

---

### `exitMultiViewportMode(fn)` {#exitMultiViewportMode}

退出多视口模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：退出多视口模式：ExitMultiViewportMode

```js
//退出多视口
fdapi.misc.exitMultiViewportMode();
```

---

### `exitReportMode(fn)` {#exitReportMode}

退出汇报演示模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：退出汇报演示模式：ExitReportMode

```js
fdapi.misc.exitReportMode();
```

---

### `getActiveViewport(fn)` {#getActiveViewport}

查询当前激活的视口信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：获取当前激活视口：GetActiveViewport

```js
//获取当前激活的视口
fdapi.misc.getActiveViewport();
```

---

### `getBPFunction(assetPath, fn)` {#getBPFunction}

根据模型Actor路径或者对象id查询模型包含的蓝图函数信息，支持查询单个模型和多个模型包含的蓝图函数信息

如何获取assetPath参数见如下动图：



![](/img/refdoc/api/copy_actor_path.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `assetPath` | `string \| array` | 模型Actor的路径或路径数组，可以从资源库的模型列表复制获取 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
[{
            "idOrPath":	"/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3",
            "objectType":	"Actor",
            "params":	[{
                    "functionName":	"特效",
                    "functionParams":	[{
                            "name":	"点特效样式",
                            "type":	16,
                            "defaultValue":	""
                        }, {
                            "name":	"线特效样式",
                            "type":	16,
                            "defaultValue":	""
                        }]
                }, {
                    "functionName":	"图标",
                    "functionParams":	[{
                            "name":	"图标样式",
                            "type":	16,
                            "defaultValue":	""
                        }, {
                            "name":	"图标背景",
                            "type":	16,
                            "defaultValue":	""
                        }]
                }, {
                    "functionName":	"动画",
                    "functionParams":	[{
                            "name":	"启用动画",
                            "type":	0,
                            "defaultValue":	0
                        }, {
                            "name":	"反向动画",
                            "type":	0,
                            "defaultValue":	0
                        }]
                }, {
                    "functionName":	"文字",
                    "functionParams":	[{
                            "name":	"文字内容",
                            "type":	5,
                            "defaultValue":	""
                        }, {
                            "name":	"文字大小",
                            "type":	2,
                            "defaultValue":	0
                        }, {
                            "name":	"背景颜色",
                            "type":	6,
                            "defaultValue":	[1.000000, 1.000000, 1.000000, 1.000000]
                        }, {
                            "name":	"背景倒角",
                            "type":	3,
                            "defaultValue":	0.000000
                        }]
                }]
        }]
```

> 示例：查询蓝图函数信息：GetBPFunction

```js
//查询蓝图函数包含的参数信息
let res = await fdapi.misc.getBPFunction("/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3");

//函数名称
let functionName = res.data[0].params[3].functionName;
//函数参数信息
let functionParams = res.data[0].params[3].functionParams;
log("函数名称：" + functionName);
log("包含参数名称：" + functionParams[0].name);
log("包含参数类型：" + functionParams[0].type);
log("包含参数默认值：" + functionParams[0].defaultValue);
```

---

### `getConvexPolygon(pointArray, fn)` {#getConvexPolygon}

从一组离散点中获取凸多边形的顶点索引

| 参数 | 类型 | 说明 |
|------|------|------|
| `pointArray` | `boolean` | 离散点坐标数组，数组元素格式：[X,Y] 注意：没有高度Z |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：获取凸多边形顶点索引：GetConvexPolygon

```js
let pointArr = [
    [492350.96875, 2492321.5],
    [492387.46875, 2492318.75],
    [492433.09375, 2492304.25],
    [492459.0625, 2492281.75],
    [492507.625, 2492271.5],
    [492485.78125, 2492239],
    [492473.6875, 2492223.75],
    [492446.375, 2492224],
    [492420.15625, 2492228.75],
    [492394.3125, 2492236.25],
    [492365.90625, 2492249.25],
    [492342.71875, 2492274],
    [492339.71875, 2492302.25],
    [492407.21875, 2492287.75],
    [492441.71875, 2492271.5],
    [492447.96875, 2492241.75]
];


let res = await fdapi.misc.getConvexPolygon(pointArr);
let indices = res.data;

//添加marker
fdapi.marker.clear();
let markerArr = [];
for (let i = 0; i < pointArr.length; i++) {
    let fontColor = Color.Red;
    if (indices.includes(i)) {
        fontColor = Color.Blue;
    }
    let markerTemp = {
        id: "m_" + i,
        text: "" + i,
        fontColor: fontColor,
        coordinate: pointArr[i],
        displayMode: 2
    };
    markerArr.push(markerTemp);
}
fdapi.marker.add(markerArr);

let polygon = [];
for (let i = 0; i < indices.length; i++) {
    let point = pointArr[indices[i]];
    polygon.push(point);
}


fdapi.polygon.clear();
let polygon1 = {
    id: 'polygon1',
    coordinates: polygon,
    coordinateType: 0,
    range: [1, 10000],
    color: [0, 0, 1, 0.8],
    frameColor: Color.White,
    frameThickness: 0.5,
    intensity: 1,
    style: PolygonStyle.SingleColor,
    depthTest: false
};
fdapi.polygon.add(polygon1);
fdapi.polygon.focus('polygon1');
```

---

### `getMaterial(materialPath, fn)` {#getMaterial}

根据材质路径查询材质包含的图片纹理和材质参数信息，同时支持查询单个材质和多个材质包含的信息

如何获取materialPath参数见如下动图：



![](/img/refdoc/api/copy_material_path.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `materialPath` | `string \| array` | 单个材质路径或路径数组，可以从资源库的材质列表复制获取 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
[{
            "idOrPath":	"/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_1",
            "objectType":	"Material",
            "params":	[{
                    "name":	"颜色",
                    "type":	6,
                    "defaultValue":	[1.000000, 1.000000, 1.000000, 1.000000]
                }, {
                    "name":	"脏迹颜色",
                    "type":	6,
                    "defaultValue":	[0.400000, 0.400000, 0.400000, 1.000000]
                }, {
                    "name":	"亮度",
                    "type":	3,
                    "defaultValue":	1.300000
                }, {
                    "name":	"金属度",
                    "type":	3,
                    "defaultValue":	0.000000
                }, {
                    "name":	"法线强度",
                    "type":	3,
                    "defaultValue":	1.000000
                }, {
                    "name":	"粗糙度",
                    "type":	3,
                    "defaultValue":	1.616593
                }]
        }]
```

> 示例：查询模型材质信息：GetMaterial

```js
//查询材质包含的参数信息
let res = await fdapi.misc.getMaterial("/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_1");

//颜色参数名称
let colorParamName = res.data[0].params[0].name;
//颜色参数默认值
let colorParamValue = res.data[0].params[0].defaultValue;
log(colorParamName + ":" + colorParamValue);

//亮度参数名称
let opacityParamName = res.data[0].params[2].name;
//亮度默认值
let opacityParamValue = res.data[0].params[2].defaultValue;
log(opacityParamName + ":" + opacityParamValue);
```

---

### `hideAllFoliages(fn)` {#hideAllFoliages}

隐藏Explorer里创建的植物

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：隐藏所有植物：HideAllFoliages

```js
//调整相机至植物区域
fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);
//隐藏Explorer里创建的所有植物
fdapi.misc.hideAllFoliages();
```

---

### `isApiVersionMatched()` {#isApiVersionMatched}

判断JS-API的版本和云渲染服务器的接口版本是否一致

**返回：** 如果一致返回true，否则返回false

> 示例代码如下：

```js
await fdapi.misc.isApiVersionMatched();
```

---

### `playMovie(url, loop, fn)` {#playMovie}

全屏播放影片（播放过程中会暂停三维渲染以提高性能）

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | 影片文件路径，支持本地绝对路径和流媒体网络路径，注意：不支持工程本地的相对路径 |
| `loop` | `boolean` | 是否循环播放（from V2021.03.09） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：全屏播放影片：PlayMovie

```js
fdapi.misc.playMovie(HostConfig.Path + '/assets/video/video1.webm', true);
```

---

### `playVideo(id, x, y, width, height, url, fn)` {#playVideo}

播放视频（显示播放窗口）

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `x` | `number` | 视频窗口的位置X |
| `y` | `number` | 视频窗口的位置Y |
| `width` | `number` | 视频窗口的宽度 |
| `height` | `number` | 视频窗口的高度 |
| `url` | `string` | 视频文件路径，支持本地绝对路径和流媒体网络路径，注意：不支持工程本地的相对路径 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：在窗口指定位置播放视频：PlayVideo

```js
fdapi.misc.playVideo(1, 20, 20, 400, 300, HostConfig.Path + '/assets/video/video2.mov');
```

---

### `playVideoAlone(url, options, fn)` {#playVideoAlone}

在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | 视频地址，支持网络地址或者本地文件。 |
| `options` | `object` | 视频播放窗口配置参数，支持以下参数： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`options` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `mute` | `boolean` | 是否静音。 |
| `x` | `number` | 视频播放窗口左上角距离显示器屏幕左侧的坐标 |
| `y` | `number` | 视频播放窗口左上角距离显示器屏幕顶部的坐标 |
| `cx` | `number` | 视频播放窗口宽度，默认值400 |
| `cy` | `number` | 视频播放窗口高度，默认值300 |
| `title` | `string` | 视频播放窗口标题栏文本，如果不设置，标题栏默认显示视频地址 |
| `opacity` | `number` | 视频播放窗口的透明度，取值范围：(0, 1] |
| `style` | `enum` | 视频播放窗口样式。 取值0：无标题栏，1：有标题栏，2：有标题栏，可拖动边框改变大小。 默认值为2。 |
| `hideBuffering` | `boolean` | 是否隐藏标题栏显示的视频流缓冲进度，默认不隐藏 |
| `maximizeBox` | `boolean` | 是否在标题栏显示最大化按钮，默认不显示 |

> 示例：在独立的进程播放视频：PlayVideoAlone

```js
let result = await fdapi.misc.playVideoAlone('rtsp://192.168.1.4:555/live', {
    x: 100,
    y: 100,
    cx: 400,
    cy: 260,
    opacity: 1,
    style: 2,
    title: '北三环东路5号入口',
    hideBuffering: false,
    maximizeBox: false
});
__playVideoAloneId = result.processId;
```

---

### `projectAssetCount(type, fn)` {#projectAssetCount}

统计ACP工程包含各类资产信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `type` | `number` | ACP工程包含的资产类型，枚举类型详情请参考 `AssetType` |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.misc.projectAssetCount(type);
```

---

### `projectAssetCountAll(fn)` {#projectAssetCountAll}

统计ACP工程包含的全部资产信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.misc.projectAssetCountAll();
```

---

### `reloadPak(fn)` {#reloadPak}

从Cloud的文件资源配置中重新挂载新添加的pak文件，避免重启服务引起的实例关闭

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：重新加载pak文件：ReloadPak

```js
//从Cloud的文件资源配置中重新挂载新添加的pak文件，从而避免重启服务引起的实例关闭
    fdapi.misc.reloadPak();
}

// function test_misc_download() {
//     //把文件下载到cloud服务器的指定磁盘路径
//     fdapi.misc.download('https://www.freedoonline.com/public/static/home2022/images/ewm1.png', 'C:/gzh/', 'wx.png');
//
```

---

### `setActiveViewport(index, fn)` {#setActiveViewport}

激活一个或多个视口，注意：仅在多视口模式下生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | `number \| array` | 被激活视口的索引或索引数组（同时激活多个视口），索引取值范围：[0~3] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置当前激活视口：SetActiveViewport

```js
//设置激活一个视口
fdapi.misc.setActiveViewport(1);
```

---

### `setApiVersionReceived(fnCallback)` {#setApiVersionReceived}

设置服务器返回版本号的回调函数

| 参数 | 类型 | 说明 |
|------|------|------|
| `fnCallback` | `function` | 回调函数，当收到服务器返回的版本信息后调用 |

> 示例代码如下：

```js
await fdapi.misc.setApiVersionReceived(fnCallback);
```

---

### `setMultiviewportInteractSync(isSync, fn)` {#setMultiviewportInteractSync}

多视口模式下设置相机是否同步

| 参数 | 类型 | 说明 |
|------|------|------|
| `isSync` | `boolean` | 相机是否同步，默认不联动：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置多视口同步：SetMultiviewportInteractSync

```js
//多视口模式下设置相机是否同步
fdapi.misc.setMultiviewportInteractSync(true);
```

---

### `setReportModeAlign(align, fn)` {#setReportModeAlign}

设置汇报模式下的窗口位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `align` | `number` | 位置取值：0【底部】，1【居左】，2【居右】，默认0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置汇报模式下的窗口位置：SetReportModeAlign

```js
//位置取值：0【底部】，1【居左】，2【居右】，默认0
fdapi.misc.setReportModeAlign(0);
```

---

### `setReportModePlayMode(playMode, fn)` {#setReportModePlayMode}

设置汇报模式下窗口的播放模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `playMode` | `number` | 播放模式取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置汇报模式下窗口的播放模式：SetReportModePlayMode

```js
//播放模式取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0
fdapi.misc.setReportModePlayMode(0);
```

---

### `setReportModeViewPortLinkage(isLinkage, fn)` {#setReportModeViewPortLinkage}

设置汇报模式下展示多视口时，相机是否联动  取值：联动true，不联动false，默认不联动false

| 参数 | 类型 | 说明 |
|------|------|------|
| `isLinkage` | `boolean` | 相机是否联动 取值：联动true，不联动false，默认不联动false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置汇报模式下展示多视口时相机是否联动：SetReportModeViewPortLinkage

```js
//相机是否联动  取值：联动true，不联动false，默认不联动false 
fdapi.misc.setReportModeViewPortLinkage(false);
```

---

### `showAllFoliages(fn)` {#showAllFoliages}

显示Explorer里创建的植物

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示所有植物：ShowAllFoliages

```js
//调整相机至植物区域
fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);
//显示Explorer里创建的所有植物
fdapi.misc.showAllFoliages();
```

---

### `stopMovie(fn)` {#stopMovie}

停止全屏播放影片

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：停止全屏播放影片：StopMovie

```js
fdapi.misc.stopMovie();
```

---

### `stopPlayVideo(id, fn)` {#stopPlayVideo}

停止播放视频（播放窗口会消失）

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：停止视频播放并隐藏视频窗口：StopPlayVideo

```js
fdapi.misc.stopPlayVideo(1);
```

---

### `stopPlayVideoAlone(id, fn)` {#stopPlayVideoAlone}

停止在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `number` | 成功调用playVideoAlone后返回的processId |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：停止在独立的进程播放视频：StopPlayVideoAlone

```js
fdapi.misc.stopPlayVideoAlone(__playVideoAloneId);
```

---

### `switchShortcutKey(onOff, fn)` {#switchShortcutKey}

控制Explorer快捷键的开关，注意：仅针对explorer下webui开发方式生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `onOff` | `boolean` | 打开关闭快捷键：true打开，false关闭 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.misc.switchShortcutKey(onOff);
```


## 更多示例

> 添加图片按钮：AddImageButton

```js
fdapi.misc.addImageButtons({
    id: '1',
    x: 100,
    y: 100,
    width: 64,
    height: 64,
    normalImage: HostConfig.Path + '/locale/zh/images/custom.png',
    hoverImage: HostConfig.Path + '/locale/zh/images/hilightarea.png',
    tooltip: 'Test'
});
```

> 删除图片按钮：DeleteImageButton

```js
fdapi.misc.deleteImageButtons('1');
```

> 添加动画按钮：AddAnimatedImageButton

```js
let x = 100;//图片按钮的位置:x坐标
let y = 100;//图片按钮的位置:y坐标
let width = 208;//图片按钮的宽度，单位像素
let height = 150;//图片按钮的高度，单位像素
let imageSequecePath = 'D:/tmp3/loopplay2s';//序列贴图的目录
let imageSequeceLength = 2;//序列贴图的图片数量，也就是帧数
let loop = true;//是否循环播放序列贴图
let interactable = true;//是否可以用鼠标点击操作
let o = new AnimatedImageButtonData(1, x, y, width, height, imageSequecePath, imageSequeceLength, loop, interactable);
fdapi.misc.addAnimatedImageButtons(o);
```

> 统计工程包含的全部资产：ProjectCountAll

```js
//统计ACP工程包含的全部资产
fdapi.misc.projectAssetCountAll();
```

> 统计工程包含的各类资产：ProjectCount

```js
//统计3dt信息
fdapi.misc.