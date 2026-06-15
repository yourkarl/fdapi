---
title: Marker3D
sidebar_label: Marker3D
description: "动态标记，实现对3D标注对象的操作 一般通过api.marker3d调用其方法"
---

# Marker3D

动态标记，实现对3D标注对象的操作

一般通过api.marker3d调用其方法



![](/img/refdoc/api/marker3d_style.gif)

通过 `api.marker3d` 访问。

## 构造函数

```js
new Marker3D()
```

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个动态标记

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 动态标记的数据，可以是Object类型或者Array类型，对于每一个3D标注点，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 3D标注的唯一标识符 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `text` | `string` | 3D标注显示文字，字符长度范围[0~100] |
| `textSize` | `number` | 3D标注显示文字字体大小，默认值：70 |
| `textColor` | [`Color`](/docs/api/types#color) | 3D标注显示文字颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `textOutlineSize` | `number` | 3D标注显示文字轮廓大小 |
| `textOutlineColor` | [`Color`](/docs/api/types#color) | 3D标注显示文字轮廓颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `textFixed` | `boolean` | 3D标注显示文字是否固定文本朝向，默认值：true |
| `fixedSize` | `boolean` | 3D标注是否使用固定尺寸，默认：false 近大远小 |
| `textVisible` | `boolean` | 3D标注显示文字是否显示文本，默认值：true |
| `textLocation` | `array` | 文字位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `textRotation` | `array` | 文字旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `textScale` | `array` | 文字缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `pointName` | `string` | 3D标注展示的特效名称，取值详见Explorer资源面板-&gt;动态标记下的显示名称，取值示例：Point_B_特效编号 |
| `pointVisible` | `boolean` | 3D标注是否显示，默认值：true |
| `pointScale` | `number` | 3D标注整体缩放比例，取值范围：[0.01,任意正数] |
| `coordinate` | `array` | 3D标注的位置坐标: [X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |
| `coordinateType` | `number` | 3D标注的坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `range` | `array` | 3D标注的可视距离范围：[min,max]，单位：米 |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `autoHeight` | `boolean` | 自动判断下方是否有物体，设置正确高度，默认值：false |
| `collision` | `boolean` | 可选，设置Marker3D对象加载后是否开启碰撞，默认：true |

> 示例：Add

```js
let buildingCoordinates = [
    [493246.03750000003, 2492213.2800000003, 78],
    [493341.226875, 2492221.7600000002, 78],
    [493422.123125, 2492210.4, 86],
    [493419.294375, 2492088.16, 86],
    [493234.26937500003, 2492111.52, 86],
    [493404.545, 2491985.7600000002, 86],
    [493284.0425, 2491995.84, 86]
];
fdapi.marker3d.clear();
let marker3dArr = [];
for (let i = 0; i < buildingCoordinates.length; i++) {

    let marker3d = {
        'id': 'm' + (i + 1),
        'groupId': 'marker3dTest',
        'text': 'Building ' + (i + 1),//可选 3D标注显示文字
        'textSize': 32,//3D标注显示文字大小
        'textColor': '#6BF4F7',//3D标注显示文字颜色
        'textOutlineSize': 1,//3D标注显示文字轮廓大小
        'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色
        'textFixed': true,// 3D标注显示文字是否固定文本朝向
        'fixedSize': false,// 3D标注是否使用固定尺寸大小，默认：false 近大远小
        'textVisible': true,//3D标注显示文字是否显示文本
        'textLocation': [0, 0, 0],// 文字位置
        'textRotation': [0, 0, 0],// 文字旋转
        'textScale': [1, 1, 1],// 文字缩放
        'pointName': '3D_UI_C_3',//3D标注展示的特效名称
        'pointVisible': true,//3D标注是否显示
        'pointScale': 2,//3D标注整体缩放比例
        'coordinate': buildingCoordinates[i], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
        'coordinateType': 0, //坐标系类型 
        'range': [1, 1000], //3D标注的可视距离范围：[min,max]，单位：米
        'viewHeightRange': [0, 1000],//可见高度范围
        'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
        'collision': true //默认开启碰撞
    }
    marker3dArr.push(marker3d);

}
await fdapi.marker3d.add(marker3dArr);
fdapi.marker3d.focus('m1');

//1、批量调用多个蓝图函数，修改文字和背景
fdapi.marker3d.callBPFunction([
    {
        id: 'm1',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "1号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }
        ]
    },
    {
        id: 'm1',
        functionName: '图标',
        parameters: [
            { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
            { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
        ]
    },
    {
        id: 'm2',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "2号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    },
    {
        id: 'm3',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "3号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    },
    {
        id: 'm4',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "4号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    },
    {
        id: 'm5',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "5号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    },
    {
        id: 'm6',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "6号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    },
    {
        id: 'm6',
        functionName: '图标',
        parameters: [
            { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
            { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
        ]
    },
    {
        id: 'm7',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "7号楼" },
            { "name": "文字大小", "paramType": 2, "paramValue": 64 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
    }
]);
```

---

### `attachObject(data, fn)`

设置Marke3D贴合模型对象CustomObject对象，设置后Marker3D会跟随模型运动

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 自定义对象和三维标注映射绑定的数据结构，可以是Object类型或者Array类型，对于每一个映射对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `marker3dId` | `string` | 三维标注Marker3D对象id |
| `objectId` | `string` | 贴合的CustomObject自定义对象 |
| `offset` | `array` | 坐标偏移量，[X,Y,Z]，[取值示例](/docs/tutorials/coordinates) |

> 示例代码如下：

```js
await fdapi.marker3d.attachObject(data);
```

---

### `callBPFunction(data, fn)`

调用Marker3D对象包含的多个蓝图函数，注意：可以根据marker3d的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id);

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `functionName` | `string` | 蓝图函数名 |
| `parameters` | `array` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

```js
蓝图函数调用的示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！
 fdapi.marker3d.callBPFunction([
            {
                id: 'm1',
                functionName: '文字',
                parameters: [
                    { "name": "文字内容", "paramType": 5, "paramValue": "1号楼" },
                    { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                    { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                    { "name": "背景倒角", "paramType": 3, "paramValue": 1 }
                ]
            },
            {
                id: 'm2',
                functionName: '图标',
                parameters: [
                    { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
                    { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
                ]
            }
        ]);
```

---

### `clear(fn)`

清空场景中所有的3D标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.marker3d.clear();
```

---

### `delete(ids, fn)`

删除一个或多个3D标注对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的3D标注对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.marker3d.delete(['m1', 'm2']);
```

---

### `deleteByGroupId(groupId, fn)`

根据分组ID删除动态标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 动态标注创建时指定的分组ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：DeleteByGroupId

```js
fdapi.marker3d.deleteByGroupId('marker3dTest');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3D标注对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.marker3d.focus('m1', 100, 0.2);
```

---

### `get(ids, fn)`

根据ID获取3D标注的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的3D标注对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回3DMarker的详细信息
{
        "id": "m1",
        "text": "3DMarker-Add",//3D标注显示文字
        "textSize" : 18,//3D标注显示文字大小
        "textColor ": Color.Blue,//3D标注显示文字颜色
        "textOutlineSize": 1,//3D标注显示文字轮廓大小
        "textOutlineColor" : Color.Black,// 3D标注显示文字轮廓颜色
        "textFixed": true,// 3D标注显示文字是否固定文本朝向
        "textVisible": true,//3D标注显示文字是否显示文本
        "textLocation": [0,0,0],// 文字位置
        "textRotation": [0,0,0],// 文字旋转
        "textScale": [1,1,1],// 文字缩放
        "pointName": "Point_B_1",//3D标注展示的特效名称
        "pointVisible": true,//3D标注是否显示
        "pointScale": 5,//3D标注整体缩放比例
        "coordinate": [0, 0, 10]//3D标注的位置坐标
    }
```

> 示例：Get

```js
fdapi.marker3d.get('m1');
fdapi.marker3d.get(['m1', 'm2']);
```

---

### `getBPFunction(ids, fn)`

根据marker3d对象的id查询其包含的蓝图函数信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3D标注对象ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：GetBPFunction

```js
fdapi.marker3d.getBPFunction(['m1', 'm2']);
```

---

### `hide(ids, fn)`

隐藏3D标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3D标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.marker3d.hide(['m1']);
```

---

### `hideAll(fn)`

隐藏所有3D标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.marker3d.hideAll();
```

---

### `hideByGroupId(groupId, fn)`

根据分组ID隐藏动态标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 动态标注创建时指定的分组ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideByGroupId

```js
fdapi.marker3d.hideByGroupId('marker3dTest');
```

---

### `setViewHeightRange(id, minVisibleHeight, maxVisibleHeight, fn)`

设置Marker3D对象的可视高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Marker3D对象的ID |
| `minVisibleHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxVisibleHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewHeightRange

```js
fdapi.marker3d.setViewHeightRange('m1', 1, 1000);
```

---

### `show(ids, fn)`

显示3D标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 3D标注对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.marker3d.show('m1');
```

---

### `showAll(fn)`

显示所有3D标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.marker3d.showAll();
```

---

### `showByGroupId(groupId, fn)`

根据分组ID显示动态标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 动态标注创建时指定的分组ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowByGroupId

```js
fdapi.marker3d.showByGroupId('marker3dTest');
```

---

### `update(data, fn)`

修改一个或多个3D标注对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `data \| array` | 3D标注点的数据，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    'id': 'm1',
    'text': 'Building No.1',
    'pointScale': 3,//整体缩放
    'textSize': 20,
    'pointName': 'Point_B_5',
    'textColor': [1, 0, 0, 1]
}
await fdapi.marker3d.update(o);
fdapi.marker3d.focus(o.id);
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
await fdapi.marker3d.updateEnd();
```


## 更多示例

> AttachObject

```js
let pathArr = [[493136.3984375, 2492031.250371094, 2.11556640625], [493132.4771875, 2492031.4994921875, 2.11556640625], [493128.74062500003, 2492031.5835742187, 2.11556640625], [493124.98, 2492031.840625, 2.1155712890625002], [493120.6296875, 2492032.08796875, 2.1155615234375], [493117.944375, 2492032.153203125, 2.1155615234375], [493114.4884375, 2492032.482265625, 2.1155712890625002], [493110.6075, 2492032.656621094, 2.11556640625], [493107.4746875, 2492032.7945117187, 2.11556640625], [493103.60375, 2492032.8875390626, 2.11556640625], [493099.8784375, 2492033.1425195313, 2.1155712890625002], [493096.0109375, 2492033.379375, 2.11556640625], [493090.8096875, 2492033.5093359374, 2.11556640625], [493086.20875, 2492033.771933594, 2.1155615234375], [493082.2109375, 2492034.0263476563, 2.11556640625], [493078.205625, 2492034.1098046876, 2.11556640625]];
fdapi.marker3d.clear();
let o = {
    'id': 'm3d1',
    'groupId': 'marker3dTest',
    'text': '',//3D标注显示文字
    'textSize': 64,//3D标注显示文字大小
    'textColor': '#6BF4F7',//3D标注显示文字颜色
    'textOutlineSize': 1,//3D标注显示文字轮廓大小
    'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色
    'textFixed': false,// 3D标注显示文字是否固定文本朝向
    'fixedSize': true,// 默认尺寸 非近大远小
    'textVisible': true,//3D标注显示文字是否显示文本
    'textLocation': [0, 0, 0],// 文字位置
    'textRotation': [90, 0, 0],// 文字旋转
    'textScale': [1, 1, 1],// 文字缩放
    'pointName': 'Point_B_7',//3D标注展示的特效名称
    'pointVisible': true,//3D标注是否显示
    'pointScale': 2,//3D标注整体缩放比例
    'coordinate': pathArr[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
    'coordinateType': 0, //坐标系类型 
    'range': [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米
    'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
    'collision': true //默认开启碰撞
}
fdapi.marker3d.add(o);

//添加前清空所有customObject 防止id重复
fdapi.customObject.clear();
//添加车辆
let co = {
    id: 'co1', //自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak', //pak文件路径
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径
    location: pathArr[0], //位置坐标
    coordinateType: 0, // 坐标系类型 
    rotation: [0, 0, 0], //旋转
    scale: [1, 1, 1], //缩放
    smoothMotion: 1, //1: 平滑插值，0: 跳跃
};
fdapi.customObject.add(co);

//设置贴合，支持数组类型，多个对象贴合
fdapi.marker3d.attachObject([{
    marker3dId: 'm3d1', //三维标注id
    objectId: 'co1', //自定义对象id
    offset: [0, 0, 2.2] //偏移量
}]);

//构造移动路径点数组
let pathPointArr = [];
for (let i = 0; i < pathArr.length; i++) {
    //构造数组元素 每1秒移动一次
    let elementPoint = { 'time': (i) * 0.5, 'coordinate': pathArr[i] };
    pathPointArr.push(elementPoint);
}
//设置相机自动跟随
fdapi.customObject.focus('co1', -1);
//设置自定义相机跟随
//fdapi.customObject.focus('co1', 5, 0, [-30, 4, 0], ActionMode.Follow);
//车辆按GPS轨迹移动
fdapi.customObject.startMove('co1', 0, pathPointArr);
```

> CallBPFunction

```js
//查询蓝图函数包含的参数信息 
let res = await fdapi.marker3d.getBPFunction(['m1', 'm2']);
let functionArr = res.data[0].params;

fdapi.marker3d.focus('m1', 20);

//蓝图函数 使用自定义图片修改图标
fdapi.marker3d.callBPFunction([
    {
        id: 'm1',
        functionName: '文字',
        parameters: [
            { "name": "文字内容", "paramType": 5, "paramValue": "1号楼民居" },
            { "name": "文字大小", "paramType": 2, "paramValue": 100 },
            { "name": "背景颜色", "paramType": 6, "paramValue": [1, 1, 0, 1] },
            { "name": "背景倒角", "paramType": 3, "paramValue": 1 }
        ]
    },
    {
        id: 'm1',
        functionName: 'H_自定义图标',
        parameters: [
            { "name": "图标路径", "paramType": 17, "paramValue": HostConfig.Path + "/locale/zh/images/tag.png" },
        ]
    }
]);
```
