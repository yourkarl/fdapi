---
title: MarkerLayer
sidebar_label: MarkerLayer
description: "标注图层对象，按相机距离分三个层级（圆形标记点、标记图片、Marker 标注）自适应展示点位，支持文字、图标、弹窗、多种坐标系与可视范围控制，用于在三维场景中海量标注业务点位。"
---

# MarkerLayer

标注图层对象：一共分三个层级，第三层级为圆形标记点，第二层级为标记图片，第一层级为标注Marker

MarkerLayer标注点的效果图：

通过 `api.markerLayer` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：标注图层对象，按相机距离分三个层级（圆形标记点、标记图片、Marker 标注）自适应展示点位，支持文字、图标、弹窗、多种坐标系与可视范围控制，用于在三维场景中海量标注业务点位。
- **别名 / 不同行业叫法**：标注图层 / 标记点 / 点位标注 / POI 图层 / 撒点 / 气泡标注。
- **适用行业**：智慧城市、智慧水利、应急管理、智慧交通、能源电力、智慧园区。
- **使用场景**：
  - 在三维场景中批量标注监测站、摄像头、设备、事件点等业务点位并随视距分级显示。
  - 点击标注弹出业务弹窗，展示设备详情、实时数据或处置信息。
  - 按经纬度（WGS84/GCJ02/BD09）或投影坐标加载第三方业务系统的点位数据上图。
- **注意事项**：
  - 通过 coordinateType 区分投影/WGS84/火星/百度坐标系，需与数据来源一致，否则点位偏移。
  - range 与 viewHeightRange 等控制分级显隐，海量标注时应合理设置可视范围与像素阈值以保证性能。
  - autoHeight 可自动贴附下方物体高度，弹窗大小/偏移与文字动画等按业务需要配置。

## 构造函数

```js
new MarkerLayer()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个标注图层服务对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的标注图层对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个标注图层对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`focusByMarkerId`](#focusByMarkerId) | 自动定位到内部标记点合适的观察距离 |  |
| [`hide`](#hide) | 隐藏标注图层对象 | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有标注图层对象 | 一键隐藏全部对象 |
| [`setViewHeightRange`](#setViewHeightRange) | 设置标注图层对象的可视高度范围 |  |
| [`show`](#show) | 显示标注图层对象 | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有标注图层对象 | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个标注图层对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个标注图层服务对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 标注图层对象包含的数据结构，可以是Object类型或者Array类型，对于每一个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注图层对象的唯一标识符 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `range` | `array` | 标注图层对象三段可视范围，共分2段： [minDis,lodDis,maxDis]，第一段近距离（标记点Marker）：[minDis,lodDis]，第二段距离（标记图片）：[lodDis,maxDis] |
| `minPixel` | `number` | 相机观察距离达到最远距离(maxDis)时显示的像素大小，单位：像素 |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `autoHeight` | `boolean` | 自动判断下方是否有物体，设置正确高度，默认值：false |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `textRange` | `array` | 文本可视范围: [近裁距离, 远裁距离]，默认值: [100, 6000] |
| `useTextAnimation` | `boolean` | 是否打开文字展开动画效果，默认值：true |
| `textOffset` | `array` | 文本偏移: [x, y]，默认值：[0,0] |
| `fontSize` | `number` | 字体大小，默认值：12 |
| `fontOutlineSize` | `number` | 字体轮廓线大小，默认值：1 |
| `textBackgroundColor` | [`Color`](/docs/api/types#color) | (`Color`) 文本背景颜色，默认值白色[1, 1, 1, 0.85]，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fontColor` | [`Color`](/docs/api/types#color) | (`Color`) 字体颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fontOutlineColor` | [`Color`](/docs/api/types#color) | (`Color`) 字体轮廓线颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |
| `popupBackgroundColor` | [`Color`](/docs/api/types#color) | (`Color`) 弹窗背景颜色， [1.0,1.0,1.0,0.1] ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `popupSize` | `array` | 弹窗大小: [width, height]，默认值：[600,400] |
| `popupOffset` | `array` | 弹窗偏移: [x, y]，默认值：[0,0] |
| `autoHidePopupWindow` | `boolean` | 是否自动关闭弹出窗口，默认值：true |
| `displayMode` | `number` | 显示模式，默认值：4，取值说明如下： |
| `clusterByImage` | `boolean` | 聚合时是否根据图片路径(imagePath)分类聚合显示，即当多个markerLayer的imagePath路径参数相同时按路径对markerLayer分类聚合 |
| `priority` | `number` | 避让优先级，默认值：0 |
| `occlusionCull` | `boolean` | 是否参与遮挡剔除 |
| `markers` | `array` | 标注图层对象包含的标记点对象或数组，可以是Object类型或者Array类型，对于每一个对象，支持以下属性： |
| `markers.id` | `string` | 必选，标记点的ID |
| `markers.coordinate` | `array` | 标注点的位置坐标: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `markers.anchors` | `array` | 锚点: [x, y]，设置Marker的聚焦图片位置的偏移，默认值：[0,0]，取值规则如下图：![](/img/refdoc/api/anchors.png) |
| `markers.text` | `string` | 显示的文字 |
| `markers.popupURL` | `string` | 弹窗HTML链接或者视频文件路径，也支持实时流媒体视频地址，[资源引入说明](/docs/tutorials/resources) |
| `markers.imagePath` | `string` | 图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |
| `markers.imageSize` | `array` | 图片的尺寸: [width, height]， 默认值[32,32] |
| `markers.hoverImagePath` | `string` | 鼠标悬停时显示的图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |
| `markers.hoverImageSize` | `array` | 鼠标悬停时显示的图片尺寸: [width, height]， 默认值：[0,0] 使用图片自身的尺寸，注意：如果设置的值比imageSize尺寸小，则默认使用imageSize的尺寸。 |

> 示例：Add

```js
fdapi.markerLayer.clear();
//标记点数组
let markerArr = [];
//深圳一万随机点 
let points = shenzhen1wPoints.features;
for (let i = 0; i < 10000; i++) {

    let point = points[i];
    let coordinate = point.geometry.coordinates;
    let marker = {
        id: 'marker_' + i,
        coordinate: coordinate,//坐标位置
        anchors: [-24, 48],//锚点
        text: 'M_' + i,//显示的文字 
        popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
        imagePath: HostConfig.Path + '/locale/zh/images/markerLayer.png',
        imageSize: [40, 40],
        hoverImagePath: HostConfig.Path + '/locale/zh/images/markerLayer.png',// 鼠标悬停时显示的图片路径
        hoverImageSize: [40, 40],//鼠标悬停时显示的图片尺寸
    };
    markerArr.push(marker);
}

let markerLayer = {
    id: "markerLayer1",
    groupId: 'markerLayer',
    coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    range: [0, 1000, 10000000],
    minPiexl: 0.1,
    autoHeight: true,

    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000],//文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0],// 文本偏移
    textBackgroundColor: Color.SpringGreen,//文本背景颜色
    fontSize: 20,//字体大小
    fontOutlineSize: 1,//字体轮廓线大小
    fontColor: Color.White,//字体颜色
    fontOutlineColor: Color.Black,//字体轮廓线颜色

    popupBackgroundColor: [1.0, 1.0, 1.0, 0.5],//弹窗背景颜色
    popupSize: [200, 200],//弹窗大小
    popupOffset: [0, 0],//弹窗偏移
    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
    autoHeight: true,// 自动判断下方是否有物体
    displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 0,//避让优先级
    occlusionCull: true,//是否参与遮挡剔除
    markers: markerArr,
};
fdapi.markerLayer.add(markerLayer);
```

---

### `clear(fn)` {#clear}

删除场景中所有的标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.markerLayer.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的标注图层对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.markerLayer.delete(['markerLayer1']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注图层对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.markerLayer.focus('markerLayer1', 200, 0.2);
```

> 示例：FocusByMarkerId

```js
fdapi.markerLayer.focusByMarkerId('markerLayer1', 'marker_100');
```

---

### `focusByMarkerId(id, markerId, distance, flyTime, rotation, fn)` {#focusByMarkerId}

自动定位到内部标记点合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 定位到的标注图层对象的ID |
| `markerId` | `string` | 定位到的标注图层对象内部标记点marker的Id |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.markerLayer.focusByMarkerId(id, markerId, distance, flyTime, rotation);
```

---

### `hide(ids, fn)` {#hide}

隐藏标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注图层对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.markerLayer.hide(['markerLayer1']);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.markerLayer.hideAll();
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)` {#setViewHeightRange}

设置标注图层对象的可视高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注图层对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewHeightRange

```js
fdapi.markerLayer.setViewHeightRange("markerLayer1", 100, 1000);
```

---

### `show(ids, fn)` {#show}

显示标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注图层对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.markerLayer.show('markerLayer1');
```

---

### `showAll(fn)` {#showAll}

显示所有标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.markerLayer.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个标注图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `data \| array` | 标注图层对象包含的数据结构，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
//标记点数组
let markerArr4Update = [];
//深圳随机点
let points = shenzhen1wPoints.features;
for (let i = 0; i < 2000; i++) {

    let point = points[i];
    let coordinate = point.geometry.coordinates;
    let marker = {
        id: 'marker_' + i,
        coordinate: coordinate,//坐标位置
        text: 'T_' + i,//显示的文字 
        popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
        imagePath: HostConfig.Path + '/locale/zh/images/antennaPattern.png',
        imageSize: [40, 40],
        hoverImagePath: HostConfig.Path + '/locale/zh/images/antennaPattern.png',// 鼠标悬停时显示的图片路径
        hoverImageSize: [40, 40],//鼠标悬停时显示的图片尺寸
    };
    markerArr4Update.push(marker);
}

let markerLayer = {
    id: "markerLayer1",
    groupId: 'markerLayer',
    coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    range: [0, 500, 4000, 20000],
    autoHeight: true,

    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000],//文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0],// 文本偏移
    textBackgroundColor: Color.SpringGreen,//文本背景颜色
    fontSize: 20,//字体大小
    fontOutlineSize: 1,//字体轮廓线大小
    fontColor: Color.White,//字体颜色
    fontOutlineColor: Color.Black,//字体轮廓线颜色

    popupBackgroundColor: [1.0, 1.0, 1.0, 0.5],//弹窗背景颜色
    popupSize: [200, 200],//弹窗大小
    popupOffset: [0, 0],//弹窗偏移
    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
    autoHeight: true,// 自动判断下方是否有物体
    displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 0,//避让优先级
    occlusionCull: true,//是否参与遮挡剔除
    markers: markerArr4Update,
};
fdapi.markerLayer.update(markerLayer);
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

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

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.markerLayer.updateEnd();
```
