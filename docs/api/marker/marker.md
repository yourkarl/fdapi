---
slug: /api/marker/marker
title: Marker
sidebar_label: Marker
description: "标注点，实现对标注对象的操作 一般通过api.marker调用其方法 Marker标注点的效果图："
---

# Marker

标注点，实现对标注对象的操作

一般通过api.marker调用其方法

Marker标注点的效果图：



![](/img/refdoc/api/show_marker.gif)

通过 `api.marker` 访问。

## 构造函数

```js
new Marker()
```

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个标注点  调用时注意：单次创建的Marker对象数量不要超过5000个，在一个工程内创建的Marker对象总数量不要超过20万个。

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 标注点的数据，可以是Object类型或者Array类型，对于每一个标注点，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注点的唯一标识符 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinate` | `array` | 标注点的位置坐标: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `anchors` | `array` | 锚点: [x, y]，设置Marker的聚焦图片位置的偏移，默认值：[0,0]，取值规则如下图： ![](/img/refdoc/api/anchors.png) |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，默认值: [10, 10000] |
| `textRange` | `array` | 文本可视范围: [近裁距离, 远裁距离]，默认值: [100, 6000] |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `rangeRatio` | `number` | 可视范围的衰减因子，取值范围：[0~1]，仅在设置了viewHeightRange后才生效，会根据相机高度对可见距离进行衰减，相机高度=maxViewHeight时，marker的可见范围是range，相机高度下降到minViewHeight时marker的可见范围会线性衰减到rangeRatio*range |
| `imageSize` | `array` | 图片的尺寸: [width, height]， 默认值[32,32] |
| `fixedSize` | `boolean` | 图片是否固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false |
| `imagePath` | `string` | 图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |
| `hoverImagePath` | `string` | 鼠标悬停时显示的图片路径，支持gif动图，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |
| `hoverImageSize` | `array` | 鼠标悬停时显示的图片尺寸: [width, height]， 默认值：[0,0] 使用图片自身的尺寸，注意：如果设置的值比imageSize尺寸小，则默认使用imageSize的尺寸。 |
| `text` | `string` | 显示的文字 |
| `useTextAnimation` | `boolean` | 是否打开文字展开动画效果，默认值：true |
| `textOffset` | `array` | 文本偏移: [x, y]，默认值：[0,0] |
| `fontSize` | `number` | 字体大小，默认值：12 |
| `fontOutlineSize` | `number` | 字体轮廓线大小，默认值：1 |
| `textBackgroundColor` | [`Color`](/docs/api/types#color) | 文本背景颜色，默认值白色[1, 1, 1, 0.85]，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fontColor` | [`Color`](/docs/api/types#color) | 字体颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fontOutlineColor` | [`Color`](/docs/api/types#color) | 字体轮廓线颜色，默认值：黑色Color.Black，支持四种格式，[取值示例](/docs/tutorials/color) |
| `popupBackgroundColor` | [`Color`](/docs/api/types#color) | 弹窗背景颜色， [1.0,1.0,1.0,0.1] ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `popupURL` | `string` | 弹窗HTML链接或者视频文件路径，也支持实时流媒体视频地址，[资源引入说明](/docs/tutorials/resources) |
| `popupSize` | `array` | 弹窗大小: [width, height]，默认值：[600,400] |
| `popupOffset` | `array` | 弹窗偏移: [x, y]，默认值：[0,0] |
| `showLine` | `boolean` | 标注点下方是否显示垂直牵引线，默认不显示：false |
| `lineSize` | `array` | 牵引线粗细[width, height]，默认值：[0,0]，如果要显示牵引线，需要将该属性设置成非0值 |
| `lineColor` | [`Color`](/docs/api/types#color) | 牵引线颜色，默认值：白色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `lineOffset` | `array` | 牵引线偏移: [x, y]，默认值：[0,0] |
| `autoHidePopupWindow` | `boolean` | 是否自动关闭弹出窗口，默认值：true |
| `autoHideText` | `boolean` | 打开弹窗时是否自动隐藏文字，默认值：true |
| `autoHeight` | `boolean` | 自动判断下方是否有物体，设置正确高度，默认值：false。注意：如果Marker坐标的z值是0或者不设置，则自动判断位置下方是否有物体并进行贴合，如果z有值则相当于z方向的offset偏移 |
| `displayMode` | `number` | 显示模式，默认值：4，取值说明如下： |
| `autoDisplayModeSwitchFirstRatio` | `number` | 智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2 |
| `autoDisplayModeSwitchSecondRatio` | `number` | 智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=0 |
| `clusterByImage` | `boolean` | 聚合时是否根据图片路径(imagePath)分类聚合显示，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合 |
| `priority` | `number` | 避让优先级，默认值：0，注意：值越大显示越靠上 |
| `occlusionCull` | `boolean` | 是否参与遮挡剔除，注意：仅displayMode设置为0或1时，遮挡剔除才会生效 |

> 示例：Add

```js
fdapi.marker.clear();
//支持经纬度坐标和普通投影坐标两种类型
let o1 = {
    id: 'm1',
    groupId: 'markerAdd',
    coordinate: [492548.01156250003, 2491828.58796875, 132.697470703125],//坐标位置
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [50, 50],//图片的尺寸
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
    range: [1, 1000000],//可视范围
    viewHeightRange: [1, 1000000],// 可见高度范围
    rangeRatio: 0.01,//可见高度范围的调整系数
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

    text: '北京银行',//显示的文字 
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0],// 文本偏移
    textBackgroundColor: Color.SpringGreen,//文本背景颜色
    fontSize: 24,//字体大小
    fontOutlineSize: 1,//字体轮廓线大小
    fontColor: Color.White,//字体颜色
    fontOutlineColor: Color.Black,//字体轮廓线颜色

    popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色
    popupSize: [300, 300],//弹窗大小
    popupOffset: [0, 0],//弹窗偏移

    showLine: true,//标注点下方是否显示垂直牵引线
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
    lineColor: Color.SpringGreen,//垂直牵引线颜色
    lineOffset: [0, 0],//垂直牵引线偏移

    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：false
    autoHeight: false,// 自动判断下方是否有物体  开启后会叠加坐标Z
    displayMode: 4,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 1,//避让优先级 值越大显示越靠上
    occlusionCull: false//是否参与遮挡
};


let o2 = {
    id: 'm2',
    groupId: 'markerAdd',
    coordinate: [492705.448125, 2491800.24453125, 0],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [50, 50],//图片的尺寸
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 


    range: [1, 1000000],//可视范围
    viewHeightRange: [1, 1000000],// 可见高度范围
    rangeRatio: 0.01,//可见高度范围的调整系数

    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径

    text: '招商银行',//显示的文字
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0],// 文本偏移
    textBackgroundColor: Color.SpringGreen,//文本背景颜色
    fontSize: 24,//字体大小
    fontOutlineSize: 1,//字体轮廓线大小
    fontColor: Color.White,//字体颜色
    fontOutlineColor: Color.Black,//字体轮廓线颜色

    popupURL: HostConfig.Path + '/locale/zh/help.html',//弹窗HTML链接
    popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色
    popupSize: [600, 600],//弹窗大小
    popupOffset: [0, 0],//弹窗偏移

    showLine: true,//标注点下方是否显示垂直牵引线
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
    lineColor: Color.SpringGreen,//垂直牵引线颜色
    lineOffset: [0, 0],//垂直牵引线偏移

    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true
    autoHeight: true,// 自动判断下方是否有物体 开启后会叠加坐标Z
    displayMode: 4,// 智能显示模式: 根据当前相机高度自动适配以上模式，类似金字塔lod加载效果，内置规则:range范围的1%内取值2，1%至10%取值1，大于10%取值0
    autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2
    autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 2,//避让优先级 值越大显示越靠上
    occlusionCull: false//是否参与遮挡
};

let o3 = {
    id: 'm3',
    groupId: 'markerAdd',
    coordinate: [492817.4336328125, 2491807.7020703126, 149.757939453125],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上
    coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
    imageSize: [50, 50],//图片的尺寸
    hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
    fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 


    range: [1, 1000000],//可视范围
    viewHeightRange: [1, 1000000],// 可见高度范围
    rangeRatio: 0.01,//可见高度范围的调整系数

    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径

    text: '中国银行',//显示的文字
    useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
    textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0],// 文本偏移
    textBackgroundColor: Color.SpringGreen,//文本背景颜色
    fontSize: 24,//字体大小
    fontOutlineSize: 1,//字体轮廓线大小
    fontColor: Color.White,//字体颜色
    fontOutlineColor: Color.Black,//字体轮廓线颜色

    popupURL: HostConfig.Path + 'locale/zh/help.html',//弹窗HTML链接
    popupBackgroundColor: [1, 1, 1, 1],//弹窗背景颜色
    popupSize: [600, 600],//弹窗大小
    popupOffset: [0, 0],//弹窗偏移

    showLine: true,//标注点下方是否显示垂直牵引线
    lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
    lineColor: Color.SpringGreen,//垂直牵引线颜色
    lineOffset: [0, 0],//垂直牵引线偏移

    autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
    autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true
    autoHeight: false,// 自动判断下方是否有物体 开启后会叠加坐标Z
    displayMode: 4,// 智能显示模式
    autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2
    autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1
    clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
    priority: 3,//避让优先级 值越大显示越靠上
    occlusionCull: false//是否参与遮挡
};
let markerArr = [];
markerArr.push(o1);
markerArr.push(o2);
markerArr.push(o3);
//海量poi添加请使用批量添加 提供效率 
await fdapi.marker.add(markerArr);
fdapi.marker.focus(o1.id, 100, 0);
```

> 示例：用canvas绘制标签的imagePath属性：Add

```js
// 生成图片
if (!__canvas)
    __canvas = document.createElement("canvas");

let img = new Image()
img.src = __base64_tagBg;
img.onload = () => {

    __canvas.width = img.width;
    __canvas.height = img.height;

    var ctx = __canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "#fff";
    ctx.font = "36px Bold Verdana";
    ctx.textBaseline = "middle";
    ctx.fillText("农村商业银行", 60, 50);


    let o = {};
    o.id = 'canvas_marker1';
    o.coordinate = [492705.53125, 2491816.25, 20.719257354736328];
    o.imagePath = __canvas.toDataURL("image/jpg");
    o.imageSize = [165, 63];
    o.popupURL = '';
    o.url = HostConfig.Path + '/locale/zh/popup_simple.html';
    o.range = [1, 8000.0];

    fdapi.marker.delete('canvas_marker1')
        .then(() => fdapi.marker.add(o))
        .then(() => fdapi.marker.focus('canvas_marker1', 10, 0.2));
}
```

---

### `attachObject(data, fn)`

设置Marker贴合模型对象进行移动，设置贴合后Marker会跟随模型一起平滑运动，支持的对象类型：CustomObject、Vehicle、Vehicle2、Train、Drone

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 模型对象id和MarkerId的数据映射对象数组，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `markerId` | `string` | 标注Marker对象id |
| `objectId` | `string` | 被贴合的对象id，支持的对象类型：CustomObject、Vehicle、Vehicle2、Train、Drone |
| `offset` | `array` | 贴合的偏移量，[X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |

> 示例代码如下：

```js
await fdapi.marker.attachObject(data);
```

---

### `clear(fn)`

删除场景中所有的标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.marker.clear();
```

---

### `delete(ids, fn)`

删除一个或多个标注对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的标注对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.marker.delete(['m1', 'm2']);
```

---

### `deleteByGroupId(groupIds, fn)`

根据分组ID删除Marker

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupIds` | `string \| array` | Marker创建时指定的分组ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：DeleteByGroupId

```js
fdapi.marker.deleteByGroupId('markerAdd');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.marker.focus('m1', 200, 0.2);
```

---

### `focusAll(distance, flyTime, rotation, fn)`

自动定位到能观察所有Marker对象的合适距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：FocusAll

```js
fdapi.marker.focusAll(200, 0.2);
```

---

### `get(ids, fn)`

根据ID获取标注的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的标注对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回Marker的详细信息
{
            "id":	"m1",
            "groupId":	"",
            "userData":	"",
            "coordinateType":	0,
            "coordinate":	[495269.375000, 2491073.250000, 25.400000],
            "anchors":	[-16.000000, 32.000000],
            "range":	[10.000000, 10000.000000],
            "textRange":	[100.000000, 6000.000000],
            "imageSize":	[28.000000, 28.000000],
            "imagePath":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/images/tag.png",
            "hoverImagePath":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/images/hilightarea.png",
            "hoverImageSize": [28.000000, 28.000000],
            "text":	"北京银行",
            "textOffset":	[0.000000, 0.000000],
            "fontSize":	12,
            "fontOutlineSize":	1,
            "textBackgroundColor":	[1.000000, 1.000000, 1.000000, 1.000000],
            "fontColor":	[1.000000, 0.000000, 0.000000, 1.000000],
            "fontOutlineColor":	[1.000000, 0.000000, 0.000000, 1.000000],
            "popupUrl":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/simple.html",
            "popupSize":	[600.000000, 400.000000],
            "popupOffset":	[0.000000, 0.000000],
            "popupBackgroundColor":	[1.000000, 1.000000, 1.000000, 0.100000],
            "lineSize":	[2.000000, 100.000000],
            "lineColor":	[0.200000, 0.700000, 0.400000, 1.000000],
            "lineOffset":	[0.000000, 0.000000],
            "autoHidePopupWindow":	1,
            "autoHeight":	0,
            "displayMode":	0,
            "priority":	0,
            "occlusioncull":	0
        }
```

> 示例：Get

```js
let res = await fdapi.marker.get('m1');
let o = res.data[0];
log(`获取标注：\n id: ${o.id} \n text: ${o.text}`);
```

---

### `hide(ids, fn)`

隐藏标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.marker.hide(['m1']);
```

---

### `hideAll(fn)`

隐藏所有标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.marker.hideAll();
```

---

### `hideAllPopupWindow(fn)`

隐藏所有标注的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：隐藏所有弹出窗口：HideAllPopupWindow

```js
fdapi.marker.hideAllPopupWindow();
```

---

### `hideByGroupId(groupIds, fn)`

根据分组ID隐藏Marker

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupIds` | `string \| array` | Marker创建时指定的分组ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideByGroupId

```js
fdapi.marker.hideByGroupId('markerAdd');
```

---

### `hidePopupWindow(ids, fn)`

隐藏指定标注的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：隐藏标注的弹出窗口：HidePopupWindow

```js
fdapi.marker.hidePopupWindow('m1');
```

---

### `setAnchors(id, newVal, fn)`

设置标注的整体偏移量（修改锚点）

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 锚点新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Anchors

```js
//设置标注整体偏移
await fdapi.marker.setAnchors('m1', [-50, 25]);
fdapi.marker.focus('m1', 100, 1);
```

---

### `setAutoHidePopupWindow(id, newVal, fn)`

设置是否自动关闭标注的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `boolean` | 是否显示垂直牵引线 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetAutoHidePopupWindow

```js
fdapi.marker.setAutoHidePopupWindow('m1', false);
```

---

### `setClusterStyle(style, fn)`

设置marker聚合样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `style` | `object` | marker的聚合样式对象，包含以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`style` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `imagePath` | `string` | 聚合后显示的图片磁盘路径或图片URL |
| `imageSize` | `array` | 聚合后显示的图片尺寸宽高，示例：[20,20] |
| `fontSize` | `string` | 聚合后显示的聚合数字的字体大小 |
| `fontColor` | [`Color`](/docs/api/types#color) | 聚合后显示的聚合数字的字体颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `enableAnimation` | `boolean` | 是否开启marker聚合时的透明渐变动画，默认值：true |

> 示例：SetClusterStyle

```js
let style = {
    imagePath: HostConfig.Path + '/locale/zh/images/cluster.png',
    imageSize: [30, 30],
    fontSize: 14,
    fontColor: [1, 1, 1, 1], //可以设置完全透明 隐藏数字
    enableAnimation: false //是否开启marker聚合时的透明渐变动画，默认值：true
}
fdapi.marker.setClusterStyle(style);
```

---

### `setCoordinate(id, newVal, fn)`

设置标注的位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Coordinate

```js
await fdapi.marker.setCoordinate('m1', [494474.5625, 2491468.5, -0.67259764671325684]);
fdapi.marker.focus('m1', 200, 0.2);
```

---

### `setFontColor(id, newVal, fn)`

设置标注文本颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：FontColor

```js
fdapi.marker.setFontColor('m1', Color.Blue);
```

---

### `setFontOutlineColor(id, newVal, fn)`

设置字体轮廓线颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.marker.setFontOutlineColor(id, newVal);
```

---

### `setFontOutlineSize(id, newVal, fn)`

设置字体轮廓线大小

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetFontOutlineSize

```js
fdapi.marker.setFontOutlineSize('m1', 2);
```

---

### `setFontSize(id, newVal, fn)`

设置字体大小

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetFontSize

```js
fdapi.marker.setFontSize('m1', 30);
```

---

### `setGroupId(id, newVal, fn)`

设置分组

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetGroupId

```js
fdapi.marker.setGroupId('m1', 'groupMarker2');
```

---

### `setHoverImagePath(id, newVal, fn)`

设置鼠标悬停时显示的图片路径

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetHoverImagePath

```js
let hoverImagePath = HostConfig.Path + '/locale/zh/images/viewshed.png';
fdapi.marker.setHoverImagePath('m1', hoverImagePath);
```

---

### `setImagePath(id, newVal, fn)`

设置标注的图片

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ImagePath

```js
let path = HostConfig.Path + '/locale/zh/images/ctag.png';
fdapi.marker.setImagePath('m1', path);
```

---

### `setImageSize(id, newVal, fn)`

设置标注图片的大小

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新的尺寸 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ImageSize

```js
fdapi.marker.setImageSize('m1', [64, 64]);
```

---

### `setLineColor(id, newVal, fn)`

设置LineColor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetLineColor

```js
fdapi.marker.setLineColor('m1', Color.Red);
```

---

### `setLineOffset(id, newVal, fn)`

设置LineOffset

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetLineOffset

```js
fdapi.marker.setLineOffset('m1', [10, 10]);
```

---

### `setLineSize(id, newVal, fn)`

设置LineSize

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetLineSize

```js
fdapi.marker.setLineSize('m1', [0.5, 50]);
```

---

### `setOcclusionCull(id, newVal, fn)`

设置是否参与遮挡剔除

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `boolean` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetOcclusionCull

```js
fdapi.marker.setOcclusionCull('m1', true);
```

---

### `setPopupOffset(id, newVal, fn)`

设置弹窗偏移: [x, y]

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetPopupOffset

```js
fdapi.marker.setPopupOffset('m1', [20, 20]);
```

---

### `setPopupSize(id, newVal, fn)`

设置弹窗大小: [width, height]

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetPopupSize

```js
fdapi.marker.setPopupSize('m1', [400, 600]);
```

---

### `setPopupURL(id, newVal, fn)`

设置弹窗HTML链接

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.marker.setPopupURL(id, newVal);
```

---

### `setPriority(id, newVal, fn)`

设置避让优先级

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetPriority

```js
fdapi.marker.setPriority('m1', 1);
```

---

### `setRange(id, newVal, fn)`

设置标注的可见范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新的可见范围值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Range

```js
fdapi.marker.setRange('m1', [1, 800]);
```

---

### `setText(id, newVal, fn)`

设置标注的文本

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Text

```js
fdapi.marker.setText('m1', '体育馆');
```

---

### `setTextBackgroundColor(id, newVal, fn)`

设置标注文本的背景颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：TextBackgroundColor

```js
fdapi.marker.setTextBackgroundColor('m1', Color.Yellow);
```

---

### `setTextOffset(id, newVal, fn)`

设置文本偏移

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetTextOffset

```js
fdapi.marker.setTextOffset('m1', [10, 10]);
```

---

### `setTextRange(id, newVal, fn)`

设置文本可视范围: [近裁距离, 远裁距离]

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetTextRange

```js
fdapi.marker.setTextRange('m1', [0, 100]);
```

---

### `setURL(id, newVal, fn)`

设置标注的URL

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：URL

```js
fdapi.marker.setURL('m1', 'http://www.baidu.com');
```

---

### `setUserData(id, newVal, fn)`

设置用户数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标注的唯一标识符ID |
| `newVal` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetUserData

```js
fdapi.marker.setUserData('m1', '{name:\"karl\",sex:\"male\",\"age\":32}');
```

---

### `setViewportVisible(id, vp, fn)`

多视口状态下，设置Marker对象在各视口的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Marker对象的ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
//进入多视口
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
//仅视口1和视口3可见
fdapi.marker.setViewportVisible('m1', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)`

显示标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.marker.show('m1');
```

---

### `showAll(fn)`

显示所有标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.marker.showAll();
```

---

### `showAllPopupWindow(fn)`

显示所有标注的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示所有弹出窗口：ShowAllPopupWindow

```js
fdapi.marker.showAllPopupWindow();
```

---

### `showByGroupId(groupIds, fn)`

根据分组ID显示Marker

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupIds` | `string \| array` | Marker创建时指定的分组ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowByGroupId

```js
fdapi.marker.showByGroupId('markerAdd');
```

---

### `showPopupWindow(ids, fn)`

显示指定标注的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示标注的弹出窗口：ShowPopupWindow

```js
fdapi.marker.showPopupWindow('m1');
```

---

### `update(data, fn)`

修改一个或多个标注对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `data \| array` | 标注点的数据，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: 'm1',
    text: '北京银行欢迎你',
    fontColor: Color.Blue,
    popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],
    textBackgroundColor: Color.Yellow,
    lineSize: [2, 50],
    lineColor: Color.Yellow
}
await fdapi.marker.update(o);
fdapi.marker.focus(o.id, 200, 0);
```

---

### `updateBegin()`

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

### `updateEnd(fn)`

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.marker.updateEnd();
```


## 更多示例

> 标注贴合对象：AttachObject

```js
fdapi.marker.clear();
//添加标签
let marker = {
    id: 'marker1',
    coordinate: [493075.96875, 2492030.75, 0], //坐标位置
    coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
    anchors: [-14, 28], //锚点
    range: [0, 10000], //可视范围
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png', //显示图片路径
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png', // 鼠标悬停时显示的图片路径
    imageSize: [28, 28], //图片的尺寸
    hoverImageSize: [28, 28], //鼠标悬停时显示的图片尺寸
    fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

    text: '标签跟随车辆移动', //显示的文字
    useTextAnimation: false, //打开文字展开动画效果
    textRange: [0, 10000], //文本可视范围[近裁距离, 远裁距离]
    textOffset: [0, 0], // 文本偏移
    textBackgroundColor: Color.White, //文本背景颜色
    fontSize: 18, //字体大小
    fontOutlineSize: 1, //字体轮廓线大小
    fontColor: Color.Green, //字体颜色
    fontOutlineColor: Color.White, //字体轮廓线颜色

    showLine: true, //标注点下方是否显示垂直牵引线
    lineSize: [2, 80], //垂直牵引线宽度和高度[width, height]
    lineColor: Color.SpringGreen, //垂直牵引线颜色
    lineOffset: [0, 0], //垂直牵引线偏移

    autoHeight: true, // 自动判断下方是否有物体
    displayMode: 2, //显示模式 
    priority: 0, //避让优先级
    occlusionCull: false //是否参与遮挡剔除
};
fdapi.marker.add(marker);

//添加前清空所有customObject 防止id重复
fdapi.customObject.clear();

//添加车辆
let co = {
    id: 'co1', //自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak', //pak文件路径
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径
    location: [493075.96875, 2492030.75, 2.115567684173584], //位置坐标
    coordinateType: 0, // 坐标系类型 
    rotation: [0, 0, 0], //旋转
    scale: [1, 1, 1], //缩放
    smoothMotion: 1, //1: 平滑插值，0: 跳跃
};
fdapi.customObject.add(co);

//设置贴合，支持数组类型，多个对象贴合
fdapi.marker.attachObject([{
    markerId: 'marker1', //标注id
    objectId: 'co1', //自定义对象id
    offset: [0, 0.5, 2] //偏移量
}]);


//标签跟随车辆移动
fdapi.customObject.focus(co.id, -1);

let pathArr = [
    [493075.96875, 2492030.75, 2.115567684173584],
    [493102.46875, 2492033, 2.1155762672424316],
    [493089.78125, 2492033.75, 2.1155567169189453],
    [493074.15625, 2492034.5, 2.1155762672424316],
    [493062.21875, 2492034, 2.1155664920806885],
    [493045.71875, 2492035, 2.1155762672424316],
    [493032.28125, 2492035, 2.1155664920806885],
    [493016.4375, 2492036, 2.1155567169189453],
    [493000.6875, 2492036, 2.1155664920806885],
    [492988.1875, 2492037, 2.1155762672424316],
]

//启动定时器更改车辆位置   
let index = 0;
let timerId = setInterval(async () => {
    if (++index > pathArr.length)
        index = 0;
    let pos = pathArr[index];
    fdapi.customObject.setLocation(co.id, pos)
}, 1000);
//清除定时器
window.setTimeout(function () {
    window.clearInterval(timerId)
}, 10000);
```

> SetFontOutlineColor

```js
fdapi.marker.setFontOutlineColor('m1', Color.Red);
```
