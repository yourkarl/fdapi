---
title: Tag
sidebar_label: Tag
description: "在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。）"
---

# Tag

Tag已停止更新，推荐使用功能更丰富的标注对象Marker

:::caution 已废弃

标签类，实现标签对象的CURD（添加、修改、查询、删除） 通过api.tag调用其方法

:::

通过 `api.tag` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。）
- **别名 / 不同行业叫法**：标签、注记、标注、标牌、信息点、POI 点。
- **适用行业**：智慧城市、智慧园区、智慧水利、应急、交通、能源、文旅。
- **使用场景**：
  - 对建筑、设备、监测点等要素挂接名称与说明文字注记。
  - 点击标签弹出监控视频、详情网页等关联信息窗口。
  - 重点部位、POI 兴趣点的图文标识与可视范围控制显示。
- **注意事项**：
  - 该对象已废弃停止更新，新项目应优先使用 Marker，本对象仅用于存量兼容。
  - 通过 range/textRange 控制标签与文字的可见距离，避免远距离海量标签同时显示导致性能下降与画面拥挤。
  - 注意 coordinateType 与场景坐标系一致，autoHeight 可自动贴合下方物体高度。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Tag对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的Tag | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Tag对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`focusAll`](#focusAll) | 自动定位到能观察所有Tag对象的合适距离 | 相机定位到全部对象的合适视角 |
| [`get`](#get) | 根据ID获取Tag的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏Tag | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有Tag | 一键隐藏全部对象 |
| [`hideAllPopupWindow`](#hideAllPopupWindow) | 隐藏所有标签的弹出窗口 |  |
| [`hidePopupWindow`](#hidePopupWindow) | 隐藏指定标签的弹出窗口 |  |
| [`setAutoHidePopupWindow`](#setAutoHidePopupWindow) | 设置是否自动关闭标签的弹出窗口 |  |
| [`setCoordinate`](#setCoordinate) | 设置标签的位置 |  |
| [`setImagePath`](#setImagePath) | 设置标签的图片 |  |
| [`setImageSize`](#setImageSize) | 设置标签图片的大小 |  |
| [`setRange`](#setRange) | 设置标签的可见范围 |  |
| [`setShowLine`](#setShowLine) | 设置标签是否显示垂直牵引线 |  |
| [`setText`](#setText) | 设置标签的文本 |  |
| [`setTextBackgroundColor`](#setTextBackgroundColor) | 设置标签文本的背景颜色 |  |
| [`setTextBorderColor`](#setTextBorderColor) | 设置标签文本的边框颜色 |  |
| [`setTextColor`](#setTextColor) | 设置标签文本颜色 |  |
| [`setURL`](#setURL) | 设置标签的URL |  |
| [`show`](#show) | 显示Tag | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有Tag | 一键显示全部对象 |
| [`showAllPopupWindow`](#showAllPopupWindow) | 显示所有标签的弹出窗口 |  |
| [`showPopupWindow`](#showPopupWindow) | 显示指定标签的弹出窗口 |  |
| [`update`](#update) | 修改一个或多个Tag对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Tag对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 标签数据，可以是Object类型或者Array类型，对于每一个标签，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinate` | `array` | 是 | - | 坐标值：标签添加的位置坐标，[取值示例](/docs/tutorials/coordinates) |
| `imagePath` | `string` | 是 | - | 图片路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |
| `imageSize` | `array` | 是 | - | 图片尺寸[width,height]，取值范围：[0~任意正数] |
| `url` | `string` | 是 | - | 鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口，[资源引入说明](/docs/tutorials/resources) |
| `popupBackgroundColor` | [`Color`](/docs/api/types#color) | 是 | - | 弹窗背景色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `popupPos` | `array` | 是 | - | 弹窗位置: [x, y]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |
| `popupSize` | `array` | 是 | - | 弹窗尺寸：[width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |
| `range` | `array` | 是 | - | 标签的可见范围 [Min,Max]，Min和Max指摄像机相对于标签的最小和最大距离，在此范围内标签才可见，类型均为浮点数，元素取值范围：[1.0~100000.0]，单位：米 |
| `text` | `string` | 是 | - | 标签显示的文字 |
| `textRange` | `number` | 是 | - | 文字的可见范围，取值范围：[1.0~100000.0]，单位：米 |
| `textSize` | `number` | 是 | - | 文字大小，取值范围：[0~任意正整数] |
| `textColor` | [`Color`](/docs/api/types#color) | 是 | - | 文字颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `textBorderColor` | [`Color`](/docs/api/types#color) | 是 | - | 文字边框颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `textBackgroundColor` | [`Color`](/docs/api/types#color) | 是 | - | 文本背景颜色，默认值白色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `showLine` | `boolean` | 否 | true | 标签下方是否显示垂直牵引线，默认值：true |
| `hoverImagePath` | `string` | 是 | - | 鼠标悬停时显示的图片路径，[资源引入说明](/docs/tutorials/resources) |
| `autoHidePopupWindow` | `boolean` | 否 | true | 是否自动关闭弹出窗口，默认值：true，失去焦点后会自动关闭 |
| `autoHeight` | `boolean` | 否 | false | 自动判断下方是否有物体，设置正确高度，默认值：false |
| `coordinateType` | `number` | 是 | - | 坐标系类型，取值范围：0(Projection), 1(WGS84)，如果不设置此参数，默认为0。 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
let o = {
            id: 'p1',//tag唯一标识
            coordinate: [495269.37, 2491073.25, 25.4],//坐标位置
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//图片路径
            imageSize: [100,100],//图片宽高[width,height]
            url: HostConfig.Path + '/locale/zh/popup_simple.html',//鼠标点击标签后弹出的网页的URL
            popupBackgroundColor: [1.0, 1.0, 1.0, 0.1],//弹窗背景色
            range: [1, 8000.0],//标签的可见范围 [Min,Max]
            showLine: true,//标签下方是否显示垂直牵引线
            text: '北京银行',//标签显示的文字
            textSize: 10,// 文字大小
            textRange: 3000,//文字的可见范围
            textColor: Color.Black,//文字颜色
            textBackgroundColor: Color.White,//文本背景颜色
            hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',//鼠标悬停时显示的图片路径
            autoHidePopupWindow: true, //失去焦点后会自动关闭弹出窗口
            autoHeight: true//自动判断下方是否有物体
        };
        fdapi.tag.add(o);
```

> 示例：Add

```js
//注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注
fdapi.tag.clear();
let o = {
    id: 'p1',//tag唯一标识
    coordinate: [492846.125, 2491822.75, 0],//坐标位置
    coordinateType: 0, //坐标系类型
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//图片路径
    imageSize: [100, 100],//图片宽高[width,height]
    url: HostConfig.Path + '/locale/zh/popup_simple.html',//鼠标点击标签后弹出的网页的URL
    popupBackgroundColor: [1.0, 1.0, 1.0, 0.1],//弹窗背景色
    range: [1, 8000.0],//标签的可见范围 [Min,Max]
    showLine: true,//标签下方是否显示垂直牵引线
    text: 'Building No.1',//标签显示的文字
    textSize: 10,// 文字大小
    textRange: 3000,//文字的可见范围
    textColor: Color.Black,//文字颜色
    textBorderColor: Color.Red,//文字边框颜色
    textBackgroundColor: Color.White,//文本背景颜色
    hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',//鼠标悬停时显示的图片路径
    autoHidePopupWindow: true, //失去焦点后会自动关闭弹出窗口
    autoHeight: true//自动判断下方是否有物体

};
await fdapi.tag.add(o);
fdapi.tag.focus(o.id, 200, 1);

o.id = 'p2';
o.text = "Building No.1";
o.coordinate = [492778.71875, 2491823, 0];
o.popupPos = [0, 0];
o.popupSize = [600, 400];
await fdapi.tag.add(o);
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


    let o = {
        id: 'canvas_tag1',
        coordinate: [492700.0625, 2491813, 20.719263076782227],
        imagePath: __canvas.toDataURL("image/jpg"),
        imageSize: [165, 63],
        text: '',
        url: HostConfig.Path + '/locale/zh/popup_simple.html',
        range: [1, 8000.0]
    };
    fdapi.tag.delete('canvas_tag1')
        .then(() => fdapi.tag.add(o))
        .then(() => fdapi.tag.focus('canvas_tag1', 200, 0.2));
}
```

---

### `clear(fn)` {#clear}

删除场景中所有的Tag

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.tag.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Tag对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的Tag对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.tag.delete(['p1', 'p2']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Tag对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.tag.focus('p1', 200, 0.2);
```

---

### `focusAll(distance, flyTime, rotation, fn)` {#focusAll}

自动定位到能观察所有Tag对象的合适距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：FocusAll

```js
fdapi.tag.focusAll(200, 0.2);
```

---

### `get(ids, fn)` {#get}

根据ID获取Tag的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的Tag对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回Tag的详细信息
{
            "id":	"p1",
            "groupId":	"",
            "userData":	"",
            "coordinate":	[495269.375000, 2491073.250000, 25.400000],
            "imageSize":	[28.000000, 28.000000],
            "url":	"G:\\TEMP\\Explorer\\SDK\\JS/simple.html",
            "imagePath":	"G:\\TEMP\\Explorer\\SDK\\JS/images/tag.png",
            "hoverImagePath":	"G:\\TEMP\\Explorer\\SDK\\JS/images/hilightarea.png",
            "popupPos":	[0.000000, 0.000000],
            "popupSize":	[0.000000, 0.000000],
            "text":	"北京银行",
            "textColor":	[0.000000, 0.000000, 0.000000, 1.000000],
            "textBackgroundColor":	[1.000000, 1.000000, 1.000000, 1.000000],
            "popupBackgroundColor":	[1.000000, 1.000000, 1.000000, 0.100000],
            "textBorderColor":	[0.000000, 0.000000, 0.000000, 0.000000],
            "range":	[1.000000, 8000.000000],
            "textRange":	3000.000000,
            "showLine":	1,
            "autoHidePopupWindow":	1,
            "textSize":	"10"
        }
```

> 示例：Get

```js
let res = await fdapi.tag.get('p1');
let o = res.data[0];
log(`Get tags: \n id: ${o.id} \n text: ${o.text}`);
```

---

### `hide(ids, fn)` {#hide}

隐藏Tag

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Tag对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.tag.hide(['p1']);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有Tag

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.tag.hideAll();
```

---

### `hideAllPopupWindow(fn)` {#hideAllPopupWindow}

隐藏所有标签的弹出窗口

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：隐藏所有弹出窗口：HideAllPopupWindow

```js
fdapi.tag.hideAllPopupWindow();
```

---

### `hidePopupWindow(ids, fn)` {#hidePopupWindow}

隐藏指定标签的弹出窗口

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 标签的ID或者数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：隐藏标签的弹出窗口：HidePopupWindow

```js
fdapi.tag.hidePopupWindow('p1');
```

---

### `setAutoHidePopupWindow(id, newVal, fn)` {#setAutoHidePopupWindow}

设置是否自动关闭标签的弹出窗口

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `boolean` | 是 | - | 是否自动关闭标签的弹出窗口 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.tag.setAutoHidePopupWindow('对象ID', true);
```

---

### `setCoordinate(id, newVal, fn)` {#setCoordinate}

设置标签的位置

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `array` | 是 | - | 新的位置坐标，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Coordinate

```js
await fdapi.tag.setCoordinate('p1', [492477.1875, 2491878.25, 73.581634521484375]);
fdapi.tag.focus('p1', 200, 0.2);
```

---

### `setImagePath(id, newVal, fn)` {#setImagePath}

设置标签的图片

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `string` | 是 | - | 新的图片路径，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ImagePath

```js
let path = HostConfig.Path + '/locale/zh/images/ctag.png';
fdapi.tag.setImagePath('p1', path);
```

---

### `setImageSize(id, newVal, fn)` {#setImageSize}

设置标签图片的大小

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `array` | 是 | - | 新的图片尺寸[width,height]，取值范围：[0~任意正数] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ImageSize

```js
fdapi.tag.setImageSize('p1', [64, 64]);
```

---

### `setRange(id, newVal, fn)` {#setRange}

设置标签的可见范围

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `array` | 是 | - | 新的可见范围 [Min,Max]，Min和Max指摄像机相对于标签的最小和最大距离，在此范围内标签才可见，类型均为浮点数，元素取值范围：[1.0~100000.0]，单位：米 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Range

```js
fdapi.tag.setRange('p1', [1, 800]);
```

---

### `setShowLine(id, newVal, fn)` {#setShowLine}

设置标签是否显示垂直牵引线

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `boolean` | 是 | - | 是否显示垂直牵引线 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowLine

```js
fdapi.tag.setShowLine('p1', false);
```

---

### `setText(id, newVal, fn)` {#setText}

设置标签的文本

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | `string` | 是 | - | 新的文本值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Text

```js
fdapi.tag.setText('p1', 'Welcome!');
```

---

### `setTextBackgroundColor(id, newVal, fn)` {#setTextBackgroundColor}

设置标签文本的背景颜色

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 是 | - | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：TextBackgroundColor

```js
fdapi.tag.setTextBackgroundColor('p1', Color.Yellow);
```

---

### `setTextBorderColor(id, newVal, fn)` {#setTextBorderColor}

设置标签文本的边框颜色

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 是 | - | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：TextBorderColor

```js
fdapi.tag.setTextBorderColor('p1', Color.White);
```

---

### `setTextColor(id, newVal, fn)` {#setTextColor}

设置标签文本颜色

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标签的唯一标识符ID |
| `newVal` | [`Color`](/docs/api/types#color) | 是 | - | 新的颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：TextColor

```js
fdapi.tag.setTextColor('p1', Color.Blue);
```

---

### `setURL(id, newVal, fn)` {#setURL}

设置标签的URL

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 标注的唯一标识符ID |
| `newVal` | `string` | 是 | - | 新值，[资源引入说明](/docs/tutorials/resources) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：URL

```js
fdapi.tag.setURL('p1', 'http://www.163.com');
```

---

### `show(ids, fn)` {#show}

显示Tag

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Tag对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.tag.show('p1');
```

---

### `showAll(fn)` {#showAll}

显示所有Tag

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.tag.showAll();
```

---

### `showAllPopupWindow(fn)` {#showAllPopupWindow}

显示所有标签的弹出窗口

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：显示所有弹出窗口：ShowAllPopupWindow

```js
fdapi.tag.showAllPopupWindow();
```

---

### `showPopupWindow(ids, fn)` {#showPopupWindow}

显示指定标签的弹出窗口

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 标签的ID或者数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：显示标签的弹出窗口：ShowPopupWindow

```js
fdapi.tag.showPopupWindow('p1');
```

---

### `update(data, fn)` {#update}

修改一个或多个Tag对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 标签数据，参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
await fdapi.tag.update({
    id: 'p1',
    coordinate: [492902.59375, 2491822, 0],
    imagePath: 'data:image/png;base64,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',
    url: HostConfig.Path + '/locale/zh/popup_simple.html',
    imageSize: [28, 28],
    popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],
    text: 'Building No.3',
    textColor: Color.Blue,
    textBackgroundColor: Color.Yellow,
    range: [1, 8000.0],
    showLine: false
});
fdapi.tag.focus('p1', 200, 0);
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
await fdapi.tag.updateEnd();
```
