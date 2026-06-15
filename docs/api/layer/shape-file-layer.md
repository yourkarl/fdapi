---
title: ShapeFileLayer
sidebar_label: ShapeFileLayer
description: "ShapeFileLayer矢量图层对象相关的操作"
---

# ShapeFileLayer

ShapeFileLayer矢量图层对象相关的操作

通过 `api.shapeFileLayer` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个ShapeFileLayer对象

数据类型分三种：Polygon、Polyline、Point,对应不同对象属性

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `file` | `String` | ShapeFileLayer的文件路径，支持本地路径和网络路径 |
| `offset` | `array` | 偏移量：[X,Y,Z]，数组元素类型：(number)，默认值[0.000000, 0.000000, 0.000000] |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值[0.000000, 0.000000, 0.000000] |
| `defaultColor` | [`Color`](/docs/api/types#color) | 支持四种格式，[取值示例](/docs/tutorials/color) 默认颜色：[0.000000, 0.000000, 1.000000, 1.000000] RGBA |
| `polygonColorFieldName` | `String` | 当type==Polygon时此属性可选，多边形颜色字段 |
| `polygonHeightFieldName` | `String` | 当type==Polygon时此属性可选，多边形高度字段 |
| `polygonGroundHeightFieldName` | `String` | 当type==Polygon时此属性可选，底面高度字段 |
| `polygonTopHeightFieldName` | `String` | 当type==Polygon时此属性可选，顶面高度字段 |
| `polygonStyle` | `number` | 当type==Polygon时此属性可选，多边形样式，共6种，取值范围：[0~5]，分别为 0：体块（半透明） 1：圆点 2：单色 3：体块（纯色）4：纯色（半透明） 5：X光 |
| `polygonDefaultHeight` | `number` | 当type==Polygon时此属性可选，多边形高度，单位米 |
| `cacheAllField` | `boolean` | 当type==Polygon时此属性可选，Polygon支持缓存所有字段，以便于高效动态更新Polygon不同字段的效果，默认值：false，注意：仅在只更新Polygon字段时生效 |
| `polylineDefaultThickness` | `number` | 当type==Polyline时此属性可选，折线宽度，单位米 |
| `pointTextContentFieldName` | `String` | 当type==Point时此属性可选，文本内容（点字段） |
| `pointDisplayMode` | `number` | 当type==Point时此属性可选，显示模式，取值说明如下： |
| `clusterByImage` | `boolean` | 当type==Point时此属性可选，是否按相同图片路径(pointImage)聚合显示 |
| `pointImage` | `String` | 当type==Point时此属性可选，图片路径 |
| `pointContentRange` | `number` | 当type==Point时此属性可选，文本可见距离，单位米 |
| `pointRange` | `array` | 当type==Point时此属性可选，可见距离（米）点坐标：[X,Y] |
| `pointFontColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointFontOutlineColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体轮廓颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointBackgroundColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体背景颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointShowLine` | `boolean` | 当type==Point时此属性可选，是否显示线 默认false |
| `pointOcclusionCull` | `boolean` | 当type==Point时此属性可选，是否参与遮挡 默认true |

> 示例：Add

```js
fdapi.shapeFileLayer.clear();
// 支持三种数据类型Polygon、Polyline、Point，当前示例为Point类型
// 不同数据类型对应对象属性不同，请参考API开发文档
// shapeFileLayer对象别名支持shapeFile和shp两种写法，向下兼容5.2/5.1版本 ，示例如下：
// fdapi.shapeFile.clear();
// fdapi.shp.clear();
let point = {
    id: "sp1",
    file: HostConfig.Path + '/assets/shapefile/point_marker.shp',
    pointTextContentFieldName: 'name',//点显示内容字段
    pointDisplayMode: 2,
    clusterByImage: true,
    pointImage: HostConfig.Path + '/locale/zh/images/radiation.png',
    pointContentRange: [0, 10000],
    pointRange: [0, 10000],
    pointFontColor: [0, 0, 0, 1],
    pointFontOutlineColor: [1, 1, 1, 1],
    pointBackgroundColor: [1, 1, 1, 1],
    pointShowLine: false,
    pointOcclusionCull: true,
    offset: [0, 0, 0],//坐标位置偏移量
    rotation: [0, 0, 0],//旋转
};
await fdapi.shapeFileLayer.add(point);


//当前示例为Polyline类型
let polyline = {
    id: "sp2",
    file: HostConfig.Path + '/assets/shapefile/polyline_road.shp', //shp文件路径
    polylineDefaultThickness: 5,//线宽
    defaultColor: [1, 0, 0, 1],
    offset: [0, 0, 0],//坐标位置偏移量
    rotation: [0, 0, 0],//旋转
};
await fdapi.shapeFileLayer.add(polyline);


//当前示例为Polygon类型
let polygon = {
    id: "sp3",
    file: HostConfig.Path + '/assets/shapefile/polygon_building.shp', //shp文件路径
    polygonColorFieldName: "COLOR",//颜色属性字段
    polygonHeightFieldName: 'B_HEIGHT',//高度属性字段
    polygonStyle: 0,//多边形样式 样式参考API枚举： PolygonStyle
    polygonDefaultHeight: 200.0,//多边形默认高度
    defaultColor: [1, 1, 1, 1],//多边形默认颜色
    offset: [0, 0, 0],//坐标位置偏移量
    rotation: [0, 0, 0],//旋转
};
await fdapi.shapeFileLayer.add(polygon);
fdapi.shapeFileLayer.focus(polygon.id);
```

---

### `clear(fn)`

删除场景中所有的ShapeFileLayer

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.shapeFileLayer.clear();
```

---

### `delete(ids, fn)`

删除一个或多个ShapeFileLayer对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的ShapeFileLayer对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.shapeFileLayer.delete(['sp1', 'sp2', 'sp3']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ShapeFileLayer对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.shapeFileLayer.focus('sp1');
```

---

### `focusFeature(shapeFileLayerId, featureId, distance, flyTime, rotation, fn)`

定位到ShapeFileLayer的要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `shapeFileLayerId` | `string` | ShapeFileLayer对象的ID |
| `featureId` | `number` | 要素区域Feature的ID |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：定位ShapeFileLayer内部某个要素区域：FocusFeature

```js
//相机定位
fdapi.shapeFileLayer.focusFeature("sp3", 13, 80, 1);
```

---

### `get(ids, fn)`

根据ID获取ShapeFileLayer的详细信息 包含模型属性和值

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的ShapeFileLayer对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回ShapeFileLayer的详细信息
{
            "id":	"sp1",
            "groupId":	"",
            "userData":	"",
            "type":	"Polygon",
            "file":	"G:\\TEMP\\Explorer\\SDK\\JS/media/ShapeFileLayer/polygonColor.shp",
            "polygonColorFieldName":	"RGB",
            "polygonHeightFieldName":	"",
            "polygonGroundHeightFieldName":	"",
            "polygonTopHeightFieldName":	"",
            "polygonStyle":	0,
            "polygonDefaultHeight":	200.000000,
            "defaultColor":	[0.000000, 0.000000, 1.000000, 1.000000],
            "offset":	[0.000000, 0.000000, 0.000000],
            "rotation":	[0.000000, 0.000000, 0.000000],
            "scale":	[1.000000, 1.000000, 1.000000]
        }
```

> 示例：Get

```js
fdapi.shapeFileLayer.get(['sp1', 'sp2', 'sp3']);
```

---

### `getFeature(data, fn)`

获取ShapeFileLayer内部要素区域的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `shpId` | `string` | ShapeFileLayer对象的ID |
| `featureIds` | `array` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |

```js
ShapeFileLayer内部要素区域的详细信息
	{
        "sp1":	{
            "29":	{
                "Type":	"shapefilelayer",
                "Id":	"sp1",
                "featureId":	"29",
                "height":	200.000000,
                "groundHeight":	0.000000,
                "Fields":	[{
                        "CMColor":	"4294901760"
                    }, {
                        "SLColor":	"255"
                    }, {
                        "RGB":	"255,0,0"
                    }]
            },
            "30":	{
                "Type":	"shapefilelayer",
                "Id":	"sp1",
                "featureId":	"30",
                "height":	200.000000,
                "groundHeight":	0.000000,
                "Fields":	[{
                        "CMColor":	"4294901760"
                    }, {
                        "SLColor":	"255"
                    }, {
                        "RGB":	"255,0,0"
                    }]
            },
            "32":	{
                "Type":	"shapefilelayer",
                "Id":	"sp1",
                "featureId":	"32",
                "height":	200.000000,
                "groundHeight":	0.000000,
                "Fields":	[{
                        "CMColor":	"4294901760"
                    }, {
                        "SLColor":	"255"
                    }, {
                        "RGB":	"255,0,0"
                    }]
            }
        }
    }
```

> 示例：查询ShapeFileLayer内部多个要素区域：GetFeature

```js
//查询单个
fdapi.shapeFileLayer.getFeature({ "shpId": "sp3", "featureIds": [12] });
//查询多个
fdapi.shapeFileLayer.getFeature([{ "shpId": "sp3", "featureIds": [21, 12, 13] }]);
```

---

### `hide(ids, fn)`

隐藏ShapeFileLayer

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ShapeFileLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.shapeFileLayer.hide(['sp1', 'sp2', 'sp3']);
```

---

### `hideAll(fn)`

隐藏所有ShapeFileLayer

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.shapeFileLayer.hideAll();
```

---

### `highlightFeature(shapeFileLayerId, featureId, fn)`

高亮ShapeFileLayer对象内部的某一块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `shapeFileLayerId` | `string` | ShapeFileLayer对象的ID |
| `featureId` | `number` | ShapeFileLayer对象内部的要素区域ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：高亮ShapeFileLayer内部单个要素区域：HighlightFeature

```js
fdapi.shapeFileLayer.highlightFeature('sp3', 13);
```

---

### `highlightFeatures(data, fn)`

高亮ShapeFileLayer对象内部的多块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `shapeFileLayerId` | `string` | ShapeFileLayer对象的ID |
| `featureIds` | `array` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |

> 示例：高亮ShapeFileLayer内部多个要素区域：HighlightFeatures

```js
fdapi.shapeFileLayer.highlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);
```

---

### `open(data, fn)`

打开ShapeFileLayer 返回模型包含的所有属性

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `file` | `string` | ShapeFileLayer文件的路径 |

```js
返回模型包含的所有属性
{ "fieldName":	["CMColor", "SLColor", "RGB"]	}
```

> 示例：Open

```js
let shapeFilePathArr = { 'file': HostConfig.Path + '/assets/shapefile/polygon.shp' };
fdapi.shapeFileLayer.open(shapeFilePathArr);
```

---

### `show(ids, fn)`

显示ShapeFileLayer

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ShapeFileLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.shapeFileLayer.show(['sp1', 'sp2', 'sp3']);
```

---

### `showAll(fn)`

显示所有ShapeFileLayer

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.shapeFileLayer.showAll();
```

---

### `unHighlightFeature(shapeFileLayerId, featureId, fn)`

取消高亮ShapeFileLayer对象内部的某一块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `shapeFileLayerId` | `string` | ShapeFileLayer对象的ID |
| `featureId` | `number` | ShapeFileLayer对象内部的要素区域ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.shapeFileLayer.unHighlightFeature(shapeFileLayerId, featureId);
```

---

### `unHighlightFeatures(data, fn)`

取消高亮ShapeFileLayer对象内部的多块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `shapeFileLayerId` | `string` | ShapeFileLayer对象的ID |
| `featureIds` | `array` | ShapeFileLayer对象内部的要素区域ID，数组元素类型为number |

> 示例代码如下：

```js
await fdapi.shapeFileLayer.unHighlightFeatures(data);
```

---

### `update(data, fn)`

修改一个或多个ShapeFileLayer对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持更新以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据ShapeFileLayer对象的ID更新以下属性 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `offset` | `array` | 偏移量：[X,Y,Z]，数组元素类型：(number)，默认值[0.000000, 0.000000, 0.000000] |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值[0.000000, 0.000000, 0.000000] |
| `defaultColor` | [`Color`](/docs/api/types#color) | 支持四种格式，[取值示例](/docs/tutorials/color) 默认颜色：[0.000000, 0.000000, 1.000000, 1.000000] RGBA |
| `polygonColorFieldName` | `String` | 当type==Polygon时此属性可选，多边形颜色字段 |
| `polygonHeightFieldName` | `String` | 当type==Polygon时此属性可选，多边形高度字段 |
| `polygonGroundHeightFieldName` | `String` | 当type==Polygon时此属性可选，底面高度字段 |
| `polygonTopHeightFieldName` | `String` | 当type==Polygon时此属性可选，顶面高度字段 |
| `polygonStyle` | `number` | 当type==Polygon时此属性可选，多边形样式，共6种，取值范围：[0~5]，分别为 0：体块（半透明） 1：圆点 2：单色 3：体块（纯色）4：纯色（半透明） 5：X光 |
| `polygonDefaultHeight` | `number` | 当type==Polygon时此属性可选，多边形高度，单位米 |
| `cacheAllField` | `boolean` | 当type==Polygon时此属性可选，Polygon支持缓存所有字段，以便于高效动态更新Polygon不同字段的效果，默认值：false，注意：仅在只更新Polygon字段时生效 |
| `polylineDefaultThickness` | `number` | 当type==Polyline时此属性可选，折线宽度，单位米 |
| `pointTextContentFieldName` | `String` | 当type==Point时此属性可选，文本内容（点字段） |
| `pointDisplayMode` | `number` | 当type==Point时此属性可选，显示模式，取值说明如下： |
| `pointImage` | `String` | 当type==Point时此属性可选，图片路径 |
| `pointContentRange` | `number` | 当type==Point时此属性可选，文本可见距离，单位米 |
| `pointRange` | `array` | 当type==Point时此属性可选，可见距离（米）点坐标：[X,Y] |
| `pointFontColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointFontOutlineColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体轮廓颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointBackgroundColor` | [`Color`](/docs/api/types#color) | 当type==Point时此属性可选，字体背景颜色 ，支持四种格式，[取值示例](/docs/tutorials/color) |
| `pointShowLine` | `boolean` | 当type==Point时此属性可选，是否显示线 默认false |
| `pointOcclusionCull` | `boolean` | 当type==Point时此属性可选，是否参与遮挡 默认true |

> 示例：Update

```js
let obj = {
    "id": "sp1",
    pointFontColor: [1, 0, 0, 1],
    pointFontOutlineColor: [0, 0, 0, 1],
    pointBackgroundColor: [0, 0, 0, 1],
    pointShowLine: false,
};
await fdapi.shapeFileLayer.update(obj);
fdapi.shapeFileLayer.focus(obj.id);
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
await fdapi.shapeFileLayer.updateEnd();
```


## 更多示例

> 取消高亮ShapeFileLayer内部单个要素区域：UnHighlightFeature

```js
fdapi.shapeFileLayer.unHighlightFeature('sp3', 13);
```

> 取消高亮ShapeFileLayer内部多个要素区域：UnHighlightFeatures

```js
fdapi.shapeFileLayer.unHighlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);
```
