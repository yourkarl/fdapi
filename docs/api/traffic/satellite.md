---
title: Satellite
sidebar_label: Satellite
description: "Satellite 用于球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。"
---

# Satellite

Satellite 用于在球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。

![](/img/refdoc/api/satellite.gif)

通过 `api.satellite` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Satellite 用于在大尺度空间场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。
- **别名 / 不同行业叫法**：卫星 / 在轨卫星 / 星座 / 遥感卫星 / 空间目标 / 在轨目标。
- **适用行业**：国防军事、智慧城市（空天信息）、应急、低空经济、能源。
- **使用场景**：
  - 卫星星座组网与在轨运行态势的全球尺度可视化展示。
  - 遥感/导航卫星过境、覆盖范围与对地观测任务的态势推演。
  - 空间目标监视、空天一体作战与应急通信保障的态势呈现。
- **注意事项**：
  - 卫星位于超大尺度空间，需配合相机模式（如 `setCameraMode` 设置 maxCameraHeight 至数十万公里）才能正常观察；`textRange`/`modelRange`/`imageVisibleDistance` 控制不同表现形式的可视距离。
  - 缩略图 `imagePath` 各分辨率需保持一致；`coordinate` 为大数值坐标，注意与坐标系及单位匹配，避免位置异常。

## 构造函数

```js
new Satellite()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Satellite对象 | 向场景批量添加对象 |
| [`addLinkage`](#addLinkage) | 在两颗卫星之间添加连接线，卫星运动时连接线会跟随同步运动 |  |
| [`callBPFunction`](#callBPFunction) | 调用卫星模型包含的多个蓝图函数， |  |
| [`clear`](#clear) | 清空场景中所有的Satellite | 清空全部对象，重置图层 |
| [`clearLinkage`](#clearLinkage) | 清空场景中所有的卫星连接线 |  |
| [`deleteLinkage`](#deleteLinkage) | 根据卫星连接线的ID删除连接线 |  |
| [`deleteSatellite`](#deleteSatellite) | 删除一个或多个卫星模型和其对应的文字标签 |  |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据卫星模型的ID获取卫星的实时位置信息 | 查询对象信息，用于业务联动 |
| [`getBPFunction`](#getBPFunction) | 根据卫星模型ID查询其包含的蓝图函数信息， |  |
| [`hideModel`](#hideModel) | 隐藏一个或多个卫星模型 |  |
| [`hideSatellite`](#hideSatellite) | 隐藏一个或多个卫星模型和其对应的文字标签 |  |
| [`hideText`](#hideText) | 隐藏一个或多个卫星的文字标签 |  |
| [`highlight`](#highlight) | 打开指定卫星的缩略图的高亮效果 |  |
| [`setFollow`](#setFollow) | 设置卫星运动时自动跟随相机 |  |
| [`showModel`](#showModel) | 显示一个或多个卫星模型 |  |
| [`showSatellite`](#showSatellite) | 显示一个或多个卫星模型和其对应的文字标签 |  |
| [`showText`](#showText) | 显示一个或多个卫星的文字标签 |  |
| [`unHighlight`](#unHighlight) | 取消指定卫星缩略图的高亮效果 |  |
| [`unHighlightAll`](#unHighlightAll) | 取消所有卫星缩略图的高亮效果 |  |
| [`update`](#update) | 修改一个或多个Satellite对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |
| [`updateLinkage`](#updateLinkage) | 更新卫星之间连接线 |  |

## 方法（Methods）

### `add(data, textRange, modelRange, imageVisibleDistance, fn)` {#add}

添加一个或多个Satellite对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `textRange` | `array` | 是 | - | 卫星文字的可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `modelRange` | `array` | 是 | - | 卫星模型的可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `imageVisibleDistance` | `number` | 是 | - | 卫星缩略图的可见距离，取值范围: [0~200000000] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 卫星字符串类型的ID |
| `text` | `string` | 是 | - | 卫星标签显示的文字内容 |
| `assetPath` | `string` | 是 | - | 蓝图Actor在UE工程的资源引用目录（相对路径），注意：模型必须是蓝图Actor类，即在使用UE打包pak文件时此自定义对象在UE工程内的相对路径 |
| `coordinate` | `array` | 是 | - | 卫星的坐标位置 |
| `pointSize` | `number` | 是 | - | 卫星像素点的像素尺寸，单位：像素 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 卫星像素点的显示颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `imagePath` | `number` | 否 | - | 可选，卫星缩略图的文件路径，注意：参数配置的各缩略图的分辨率大小必须相同，[资源引入说明](/docs/tutorials/resources) |
| `imageSize` | `array` | 否 | - | 可选，卫星的缩略图尺寸，宽高取值：[width, height]，默认使用图片尺寸 |
| `modelRotation` | `array` | 否 | [0,0,0] | 可选，卫星的旋转姿态，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add(像素点)

```js
//设置最大相机高度maxCameraHeight
    let nearClipPlane = 10;
    let fovH = 90;
    let minCameraHeight = -5;
    let maxCameraHeight = 200000000;//20万公里
    fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);

    //卫星像素颜色数组：蓝绿黄橙红
    let colorArr = [
        [1, 0, 0, 1],
        [1, 0.5, 0, 1],
        [1, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 0, 1],
    ];

    //生成随机卫星文字名称
    function genRandomText() {
        // 1. 生成随机五位数（范围：10000 ~ 99999）
        const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);

        // 2. 定义可选的版本号列表
        const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];

        // 3. 随机选取一个版本号（通过随机索引获取）
        const randomVersion = versions[Math.floor(Math.random() * versions.length)];

        // 4. 拼接字符串：五位数 + 换行符(\n) + 随机版本号
        const result = `* ${randomFiveNum}\r${randomVersion}`;

        return result;
    }

    fdapi.satellite.clear();
    //模拟10000个卫星
    let count = 10000;
    //关闭日志自动输出
    document.getElementById("closeLog").checked = false;

    let satelliteArr = [];
    let coordinatArr = [];
    for (let i = 0; i < count; i++) {
        //随机全球范围 -180~180
        let lon = (Math.random() * 2.0 - 1.0) * 180;
        //南极不出现卫星 -85~85
        let lat = (Math.random() * 2.0 - 1.0) * 85;
        let h = 1000000+ Math.random() * 1000000
        let coord = [lon, lat, h];
        coordinatArr.push(coord);
        //随机五种颜色其中的一种
        let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;
        let satellite = {
            "id": i+"",
            "text": genRandomText(),//卫星显示的文字
           "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_2",//卫星模型资源路径
		 //   "assetPath": "/SatelliteSystem/Object",
            "coordinate": coord,
            "pointSize": 12, //卫星圆点像素大小
            "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种
		    "modelRotation":[0,coord[0],0]//卫星模型旋转 需要再传，不需要不传，节省性能
        };
        satelliteArr.push(satellite);
    }


    //参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离
    fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);

    let index = 0;
    let timer = setInterval(function () {
        if (index < 60) {
            for (let i = 0; i < count; i++) {
                //卫星模型位置
                coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.6);
                coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.6);
                coordinatArr[i][2] = satelliteArr[i].coordinate[2]
                satelliteArr[i].coordinate = coordinatArr[i];
                //卫星模型旋转
			    satelliteArr[i].modelRotation[0] = Math.random()*50
			    satelliteArr[i].modelRotation[1] = Math.random()*50
            }
            fdapi.satellite.update(satelliteArr, 1);
            index++;
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
```

> 示例：Add(缩略图)

```js
//设置最大相机高度maxCameraHeight
let nearClipPlane = 10;
let fovH = 90;
let minCameraHeight = -5;
let maxCameraHeight = 200000000;//20万公里
fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);

//卫星像素颜色数组：蓝绿黄橙红
let colorArr = [
    [1, 0, 0, 1],
    [1, 0.5, 0, 1],
    [1, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 0, 1],
];

//生成随机卫星文字名称
function genRandomText() {
    // 1. 生成随机五位数（范围：10000 ~ 99999）
    const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);

    // 2. 定义可选的版本号列表
    const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];

    // 3. 随机选取一个版本号（通过随机索引获取）
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];

    // 4. 拼接字符串：五位数 + 换行符(\n) + 随机版本号
    const result = `* ${randomFiveNum}\r${randomVersion}`;

    return result;
}

fdapi.satellite.clear();
//模拟1000个卫星
let count = 1000;

//注意：各缩略图的分辨率需保证一致
let path = HostConfig.Path + '/locale/zh/images/';
let thumbnailPathArr = [path+"acp.png",path+"antennaPattern.png"];

let satelliteArr = [];
let coordinatArr = [];
for (let i = 0; i < count; i++) {
    //随机全球范围 -180~180
    let lon = (Math.random() * 2.0 - 1.0) * 180;
    //南极不出现卫星 -85~85
    let lat = (Math.random() * 2.0 - 1.0) * 85;
    let h = 1000000 + (Math.random() * 1000000);//模拟低轨卫星高度
    let coord = [lon, lat, h];
    coordinatArr.push(coord);
    //随机五种颜色其中的一种
    let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;
    let satellite = {
        "id": "" + i,
        "text": genRandomText(),//卫星显示的文字
        "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_1",//卫星模型资源路径
        "coordinate": coord,
        "pointSize": 16, //卫星圆点像素大小
        "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种
        "imagePath": thumbnailPathArr[(Math.random()>0.5?0:1)],//卫星缩略图文件路径 随机thumbnailPathArr[]数组内的路径
        "imageSize": [48,48],//卫星缩略图尺寸
    };
    satelliteArr.push(satellite);
}


//参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离
fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);

let index = 0;
let timer = setInterval(function () {
    if (index < 60) {
        for (let i = 0; i < count; i++) {
            coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.8);
            coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.8);
            coordinatArr[i][2] = satelliteArr[i].coordinate[2]
            satelliteArr[i].coordinate = coordinatArr[i];
        }
        fdapi.satellite.update(satelliteArr, 1);
        index++;
    }
    else {
        clearInterval(timer);
    }
}, 1000);
```

---

### `addLinkage(data, materials, fn)` {#addLinkage}

在两颗卫星之间添加连接线，卫星运动时连接线会跟随同步运动

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 卫星连接线的关系配置对象或数组，支持批量添加连接线，每个对象包含以下属性： |
| `materials` | `array \| object` | 是 | - | 卫星连接线使用的所有材质信息数组，每个材质对象包含以下参数： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 卫星连接线的字符串类型的ID |
| `material` | `string` | 是 | - | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |
| `startId` | `string` | 是 | - | 卫星连接线起始点绑定的卫星ID |
| `endId` | `string` | 是 | - | 卫星连接线结束点绑定的卫星ID |
| `thickness` | `number` | 否 | 5 | 卫星连接线的线宽，单位：米，默认值：5 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 卫星连接线的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |

> **`materials` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `material` | `string` | 是 | - | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |
| `scalarParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddLinkage(连接线)

```js
fdapi.satellite.clearLinkage();
let linkArr = []
for (let i = 0; i < 500; i++) {
    let linkage = {
        "id": "linkage_" + i,
        //"material": "/ScreenSpacePolyline/Material/Track_1",
        //"material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_3",
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
        "startId": "" + i,
        "endId": "" + (i + 1),
        "thickness": 16,
        "color": [0, 1, 0, 1]
    }
    linkArr.push(linkage);
}
await fdapi.satellite.addLinkage(linkArr,[{
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
        "scalarParameters": [
            {"paramName": "RepeatPx","paramValue": 128},
            {"paramName": "Speed","paramValue": 0.5},
            {"paramName": "Brightness","paramValue": 5},
            {"paramName": "PointBrightness","paramValue": 10}
        ],
        "vectorParameters": [
            {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}
        ],
}]);
```

---

### `callBPFunction(data, fn)` {#callBPFunction}

调用卫星模型包含的多个蓝图函数，注意：调用前请使用getBPFunction()函数来查询当前卫星模型包含的蓝图函数参数信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 卫星对象的ID |
| `functionName` | `string` | 是 | - | 蓝图函数名 |
| `parameters` | `array` | 否 | - | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
蓝图函数调用示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！
     fdapi.satellite.callBPFunction([
            {
                id: 'satellite_1',
                functionName: '打开太阳能电池板',
                parameters: [
                    { "paramType": 0, "paramValue": 1 }
                ]
            },
            {
                id: 'satellite_2',
                functionName: '关闭太阳能电池板',
                parameters: [
                    { "paramType": 0, "paramValue": 0 }
                ]
            }
        ]);
```

> 示例：CallBPFunction

```js
let bpFunctionArr = [{
        "id": "500",
        "functionName": "Scale",
        "parameters": [{ "paramType": 3, "paramValue": 2 }]
    }];
//把卫星模型缩放2倍
fdapi.satellite.callBPFunction(bpFunctionArr);
```

---

### `clear(fn)` {#clear}

清空场景中所有的Satellite

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.satellite.clear();
```

---

### `clearLinkage(fn)` {#clearLinkage}

清空场景中所有的卫星连接线

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ClearLinkage(连接线)

```js
fdapi.satellite.clearLinkage();
```

---

### `deleteLinkage(ids, fn)` {#deleteLinkage}

根据卫星连接线的ID删除连接线

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的卫星的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：DeleteLinkage(连接线)

```js
fdapi.satellite.deleteLinkage(["linkage_1","linkage_2","linkage_3"]);
```

---

### `deleteSatellite(ids, fn)` {#deleteSatellite}

删除一个或多个卫星模型和其对应的文字标签

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：DeleteSatellite

```js
fdapi.satellite.deleteSatellite(["500","501","502"]);
```

---

### `focus(ids, distance, flyTime, pitch, yaw, sensitivity, offset, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 卫星对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟内部观察视角 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `pitch` | `number` | 否 | - | 可选参数，相机旋转的Pitch，取值范围：[-90~90] |
| `yaw` | `number` | 否 | - | 可选参数，相机旋转的Yaw，取值范围： [-180~180] |
| `sensitivity` | `number` | 否 | - | 可选参数，卫星灵敏度，取值范围： [0~1] |
| `offset` | `array` | 否 | [0,0,0] | 可选参数，跟随后卫星观察视角的偏移量，单位：米，默认值：[0,0,0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.satellite.focus(["500"], 20, 0, -29, -30);
```

---

### `get(ids, fn)` {#get}

根据卫星模型的ID获取卫星的实时位置信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的卫星的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：Get

```js
fdapi.satellite.get(["500","501","502"]);
```

---

### `getBPFunction(ids, fn)` {#getBPFunction}

根据卫星模型ID查询其包含的蓝图函数信息，注意：支持批量查询

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 卫星对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：GetBPFunction

```js
fdapi.satellite.getBPFunction(["500","501","502"]);
```

---

### `hideModel(ids, fn)` {#hideModel}

隐藏一个或多个卫星模型

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideModel

```js
fdapi.satellite.hideModel(["500","501","502"]);
```

---

### `hideSatellite(ids, fn)` {#hideSatellite}

隐藏一个或多个卫星模型和其对应的文字标签

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideSatellite

```js
fdapi.satellite.hideSatellite(["500","501","502"]);
```

---

### `hideText(ids, fn)` {#hideText}

隐藏一个或多个卫星的文字标签

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideText

```js
fdapi.satellite.hideText(["500","501","502"]);
```

---

### `highlight(ids, speed, scaleRange, alphaRange, intensityRange, fn)` {#highlight}

打开指定卫星的缩略图的高亮效果

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 必选，卫星ID或ID数组 |
| `speed` | `number` | 否 | - | 可选，卫星缩略图高亮动画的频率 |
| `scaleRange` | `number` | 否 | - | 可选，卫星缩略图大小渐变的区间范围，取值示例：[minScale, maxScale] |
| `alphaRange` | `number` | 否 | - | 可选，卫星缩略图透明渐变的区间范围，取值示例：[minAlpha, maxAlpah] |
| `intensityRange` | `number` | 否 | - | 可选，卫星缩略图亮度渐变的区间范围，取值示例：[minIntensity, maxIntensity] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Highlight(缩略图)

```js
//高亮100个卫星
let count = 100;
let idsArr = [];
for (let i = 0; i < count; i++) {
    idsArr.push(i + "");
}
fdapi.satellite.highlight(idsArr, 2, [0.5, 2], [0.5, 1], [0.5, 3]);
```

---

### `setFollow(ids, distance, pitch, yaw, fn)` {#setFollow}

设置卫星运动时自动跟随相机

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 卫星对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以模拟卫星观察视角 |
| `pitch` | `number` | 否 | - | 可选参数，相机旋转的Pitch，取值范围：[-90~90] |
| `yaw` | `number` | 否 | - | 可选参数，相机旋转的Yaw，取值范围： [-180~180] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetFollow

```js
//跟随卫星模型 跟随不支持flyTime 
fdapi.satellite.setFollow(["500"], 20, -29, -30);
```

---

### `showModel(ids, fn)` {#showModel}

显示一个或多个卫星模型

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowModel

```js
fdapi.satellite.showModel(["500","501","502"]);
```

---

### `showSatellite(ids, fn)` {#showSatellite}

显示一个或多个卫星模型和其对应的文字标签

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowSatellite

```js
fdapi.satellite.showSatellite(["500","501","502"]);
```

---

### `showText(ids, fn)` {#showText}

显示一个或多个卫星的文字标签

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Satellite对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowText

```js
fdapi.satellite.showText(["500","501","502"]);
```

---

### `unHighlight(ids, fn)` {#unHighlight}

取消指定卫星缩略图的高亮效果

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 卫星ID或ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：UnHighlight(缩略图)

```js
//取消高亮88个卫星
let count = 88;
let idsArr = [];
for (let i = 0; i < count; i++) {
    idsArr.push(i + "");
}
fdapi.satellite.unHighlight(idsArr);
```

---

### `unHighlightAll(ids, fn)` {#unHighlightAll}

取消所有卫星缩略图的高亮效果

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 卫星ID或ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：UnHighlightAll(缩略图)

```js
//全部取消高亮
fdapi.satellite.unHighlightAll();
```

---

### `update(data, duration, fn)` {#update}

修改一个或多个Satellite对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，请参考add方法 |
| `duration` | `number` | 是 | - | 更新持续时间 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
let coastline = {
    id: 'coastline',
    enableFloodFill: false, //是否开启水淹，默认值：false
    seaLevelOffset: 2, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米
}
await fdapi.coastline.update(coastline);
fdapi.coastline.focus("coastline");
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

**返回：** 无返回值。

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) {
     fdapi.xxx.setColor(i, Color.Yellow);
} 
fdapi.xxx.updateEnd(function () {
     log('update finished!');
});
```

---

### `updateEnd(fn)` {#updateEnd}

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.coastline.updateEnd();
```

---

### `updateLinkage(data, materials, fn)` {#updateLinkage}

更新卫星之间连接线

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 卫星连接线的关系配置对象或数组，支持批量添加连接线，每个对象包含以下属性： |
| `materials` | `array \| object` | 是 | - | 卫星连接线使用的所有材质信息数组，每个材质对象包含以下参数： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 卫星连接线的字符串类型的ID |
| `material` | `string` | 是 | - | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |
| `startId` | `string` | 是 | - | 卫星连接线起始点绑定的卫星ID |
| `endId` | `string` | 是 | - | 卫星连接线结束点绑定的卫星ID |
| `thickness` | `number` | 否 | 5 | 卫星连接线的线宽，单位：米，默认值：5 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 卫星连接线的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |

> **`materials` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `material` | `string` | 是 | - | 卫星连接线样式使用的材质路径，注意：材质路径需要在materials数组内存在 |
| `scalarParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `vectorParameters` | `array` | 否 | - | 可选参数，仅在设置自定义材质路径后生效，自定义材质矢量类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：UpdateLinkage(连接线)

```js
let linkArr = []
for (let i = 0; i < 500; i++) {
    let linkage = {
        "id": "linkage_" + i,
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
        "thickness": 20,
        "color": [1, 1, 0, 1]
    }
    linkArr.push(linkage);
}
await fdapi.satellite.updateLinkage(linkArr,[{
        "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
        "scalarParameters": [
            {"paramName": "RepeatPx","paramValue": 128},
            {"paramName": "Speed","paramValue": 0.5},
            {"paramName": "Brightness","paramValue": 5},
            {"paramName": "PointBrightness","paramValue": 10}
        ],
        "vectorParameters": [
            {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}
        ],
}]);
```


## 更多示例

> CancelFollow

```js
fdapi.camera.cancelFollow();
```
