---
title: GeoJSONLayer
sidebar_label: GeoJSONLayer
description: "GeoJSONLayer图层类，提供操作GeoJSONLayert图层符号化加载和操作相关的方法 一般通过api.geoJSONLayer调用其方法"
---

# GeoJSONLayer

GeoJSONLayer图层类，提供操作GeoJSONLayert图层符号化加载和操作相关的方法

一般通过api.geoJSONLayer调用其方法

通过 `api.geoJSONLayer` 访问。

## 构造函数

```js
new GeoJSONLayer()
```

---

## 方法（Methods）

### `add(option, fn)`

从GeoJSON文件或者url下载链接加载GeoJSON并进行符号化展示

| 参数 | 类型 | 说明 |
|------|------|------|
| `option` | `object` | 加载GeoJSON的配置项对象，包含以下属性 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，字符串类型唯一id |
| `url` | `string` | 二选一，GeoJSON文件本地磁盘路径或者对应的url地址 |
| `sourceJson` | `Object` | 二选一，GeoJSON标准对象（JsonObject） |
| `visible` | `boolean` | 可选，设置图层加载后是否显示，默认：true |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `offset` | `array` | 可选，基于原始位置的偏移量，默认值：[0,0,0] |
| `range` | `array` | 点的可视范围: [近裁距离, 远裁距离]，默认值: [0, 10000]，注意：此参数仅对point类型的GeoJSON生效 |
| `viewHeightRange` | `array` | 可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `needProject` | `boolean` | 可选，是否进行投影转换，默认：true |
| `textField` | `string` | 可选，使用Geojson的属性字段显示文字标注 |
| `textRange` | `array` | 可选，文字标注的可视范围: [近裁距离, 远裁距离]，单位：米 |
| `textSize` | `number` | 可选，文字标注的字体大小，默认大小：24 |
| `textColor` | `Color` | 可选，文字标注的字体颜色，默认颜色：[1,1,1,1] |
| `onTerrain` | `boolean` | 可选，设置图层加载后是否贴地，默认：false |
| `collision` | `boolean` | 是否开启碰撞，默认值：true |
| `depthTest` | `boolean` | 是否做深度检测，默认开启：true，true会被地形遮挡，false不会被地形遮挡，注意：深度检测参数仅在反走样参数关闭时(enableAntialias=false)生效 |
| `enableAntialias` | `boolean` | 是否开启反走样(仅对polyline类型生效)，默认开启：true |
| `renderer` | `object` | 必选，渲染器配置对象参数如下： **注意：使用此自定义材质需单独按规范打包，具体参考相关教程。** |
| `renderer.rendererType` | `RendererType` | (`RendererType`) 渲染器类型，包含三种：简单渲染器、唯一值渲染器、分类渲染器 |
| `renderer.generateTop` | `boolean` | 可选参数，是否生成顶面，默认：true |
| `renderer.generateBottom` | `boolean` | 可选参数，是否生成底面，默认：true |
| `renderer.style` | `-` | `Polygon3DStyle` 仅对Polygon3D渲染生效，设置Polygon3D的样式 |
| `renderer.type` | `VisualType` | (`VisualType`) 控制显示的可视化类型枚举 |
| `renderer.field` | `string` | GeoJSON文件内的属性字段名称 |
| `renderer.fieldType` | `FieldType` | (`FieldType`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |
| `renderer.gradient` | `boolean` | 颜色是否渐变 |
| `renderer.materials` | `array` | 可选，自定义材质配置列表，每一个材质对象包含的参数如下： |
| `renderer.index` | `number` | 自定义材质索引 |
| `renderer.material` | `string` | 自定义材质路径，即资源库PAK文件里材质文件的路径，设置自定义材质参数后style相关参数会失效 |
| `renderer.scalarParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数值类型参数，包含name/value键值对的数组，其中value为数值，格式示例：[&#123;"name":"不透明度","value":0.5&#125;,&#123;"name":"UV重复","value":1.0&#125;] |
| `renderer.vectorParameters` | `array` | 可选参数，仅在设置自定义材质路径后生效，自定义材质数组类型参数，包含name/value键值对的数组，其中value为数组，格式示例：[&#123;"name":"color1","value":[1,1,1,1]&#125;,&#123;"name":"color2","value":[1,0,0,1]&#125;] |
| `renderer.defaultSymbol` | `object` | 必选，默认符号化配置参数如下： |
| `renderer.symbolType` | `number` | 符号化类型，0 simple-marker圆形点填充 1 simple-line线填充(注意：目前仅支持1px的线宽) 2 simple-fill面填充 3 polygon3d填充 |
| `renderer.size` | `number` | 可选，点的默认尺寸，仅针对simple-marker圆形填充生效； |
| `renderer.height` | `number` | 可选，polygon3d的默认高度，仅针对polygon3d填充生效； |
| `renderer.color` | `array` | 默认填充颜色 |
| `renderer.outline` | `object` | 默认轮廓线，包含线宽和颜色，注意：目前仅支持1px的线宽。对象结构示例：&#123;width: 1,color: [1, 1, 1, 1]&#125; |
| `renderer.uniqueValueInfos` | `array` | 可选，唯一值渲染器配置数组，对象结构如下： |
| `renderer.value` | `any` | field字段对应值 |
| `renderer.symbol` | `object` | 各唯一值对应的符号化配置对象，结构如下： |
| `renderer.color` | `Color` | 可选，三选一，唯一值对应的颜色 |
| `renderer.size` | `number` | 可选，三选一，唯一值对应的尺寸 |
| `renderer.height` | `number` | 可选，三选一，唯一值对应的高度 |
| `renderer.classBreakInfos` | `array` | 可选，分类渲染器配置数组，对象结构如下： |
| `renderer.minValue` | `number` | 区间最小值 |
| `renderer.maxValue` | `number` | 区间最大值 |
| `renderer.symbol` | `object` | 不同分类的符号化配置对象，结构如下： |
| `renderer.color` | `Color` | 可选，二选一，区间值对应的颜色 |
| `renderer.size` | `number` | 可选，二选一，区间值对应的尺寸 |
| `renderer.height` | `number` | 可选，三选一，区间值对应的高度 |
| `renderer.visualVariables` | `array` | 简单渲染器支持根据字段属性控制颜色、尺寸和透明度的显示，参数如下： |
| `visibleRenderer` | `object` | 可选，要素可见性渲染器配置对象，包含的参数结构如下： |
| `visibleRenderer.rendererType` | `RendererType` | (`RendererType`) 渲染器类型：可见性渲染器 |
| `visibleRenderer.field` | `string` | GeoJSON文件内的属性字段名称 |
| `visibleRenderer.fieldType` | `FieldType` | (`FieldType`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |
| `visibleRenderer.defaultVisible` | `boolean` | 全局要素默认是否可见，默认值：true 可见 |
| `visibleRenderer.visibleValueInfos` | `array` | 可选，分类渲染器配置数组，对象结构如下： |
| `visibleRenderer.value` | `any` | 可选，field字段对应类型的值 |
| `visibleRenderer.minValue` | `number` | 可选，区间最小值，注意：数值类型字段可以使用此属性 |
| `visibleRenderer.maxValue` | `number` | 可选，区间最大值，注意：数值类型字段可以使用此属性 |
| `visibleRenderer.visible` | `boolean` | 必选，根据字段值或区间控制要素块是否显隐 |
| `materialRenderer` | `object` | 可选，自定义材质渲染器配置对象，包含的参数结构如下： |
| `materialRenderer.rendererType` | `RendererType` | (`RendererType`) 渲染器类型：自定义材质渲染器 |
| `materialRenderer.field` | `string` | GeoJSON文件内的属性字段名称 |
| `materialRenderer.fieldType` | `FieldType` | (`FieldType`) GeoJSON文件内的属性字段类型，枚举支持数值类型和字符串类型 |
| `materialRenderer.defaultMaterial` | `boolean` | 全局默认使用的自定义材质索引，默认值：0 |
| `materialRenderer.materialValueInfos` | `array` | 可选，自定义材质渲染器配置数组，每一个对象结构如下： |
| `materialRenderer.index` | `number` | 必选，根据字段值或区间控制要素块是否显隐 |
| `materialRenderer.value` | `any` | 可选，field字段对应类型的值 |
| `materialRenderer.minValue` | `number` | 可选，区间最小值，注意：数值类型字段可以使用此属性 |
| `materialRenderer.maxValue` | `number` | 可选，区间最大值，注意：数值类型字段可以使用此属性 |

```js
请求参数示例
  
  //简单渲染器
  let simpleRenderer = {
            //渲染器类型
            rendererType: RendererType.SimpleRenderer,
            //默认符号化配置
            defaultSymbol: {
                //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
                symbolType: 3,
                //默认高度
                height: 10,
                //默认填充颜色
                color: [0, 0, 1, 1],
                //默认轮廓线
                outline: {
                    //线宽
                    width: 1,
                    //颜色
                    color: [1, 1, 1, 1],
                }
            },
            //简单渲染器支持根据字段属性控制颜色、尺寸和透明度的显示
            visualVariables: [{
                //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity
                type: VisualType.Height,
                //属性字段名称
                field: "hight",
                //属性字段类型
                fieldType: FieldType.Number,
            }]
        };

    //唯一值渲染器
    let uniqueValueRenderer = {
        //渲染器类型
        rendererType: RendererType.UniqueValueRenderer,
        //渲染字段名称
        field: "name",
        //属性字段类型
        fieldType: FieldType.String,
        //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity
        type: VisualType.Color,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 2,
            //填充色
            color: [0, 1, 1, 1],
            //轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [1, 1, 1, 1]
            },
        },
        //根据颜色字段的唯一值进行符号化填充
        uniqueValueInfos: [{
            // 深圳湾体育馆填充为蓝色
            value: "深圳湾体育馆",
            symbol: {
                //填充色
                color: [0, 0, 1, 1]
            }
        }, {
            // 北京师大南山附属学校小学部填充为红色
            value: "北京师大南山附属学校小学部",
            symbol: {
                color: [1, 0, 0, 1]
            }
        }, {
            // 腾讯滨海大厦填充为绿色
            value: "腾讯滨海大厦",
            symbol: {
                color: [0, 1, 0, 1]
            }
        }, {
            // 科技第三幼儿园填充为黄色
            value: "科技第三幼儿园",
            symbol: {
                color: [1, 1, 0, 1]
            }
        }]
    };


    //分类渲染对应颜色
    let less25 = {
      color: [0,0,1,1]
    };

    let less50 = {
      color: [0,1,0,1]
    };

    let less75 = {
      color: [1,1,0,1]
    };

    let less100 = {
      color: [1,0,0,1]
    };

    //分类渲染器    
    let classBreaksRenderer = {
        rendererType: RendererType.ClassBreaksRenderer,
        field: "hight",
        //属性字段类型
        fieldType: FieldType.Number,
        //控制可视化显示的类型： 颜色color、尺寸size、高度height和不透明度opacity
        type: VisualType.Color,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 2,
            //填充色
            color: [0, 1, 1, 1],
            //轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [1, 1, 1, 1]
            },
        },
        //根据hight字段的不同区间值使用不同的符号化配置
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 25,
                symbol: less25
            },
            {
                minValue: 25,
                maxValue: 50,
                symbol: less50
            },
            {
                minValue: 50,
                maxValue: 75,
                symbol: less75
            },
            {
                minValue: 75,
                maxValue: 100,
                symbol: less100
            }
        ]
    };
```

---

### `clear(fn)`

清空场景中所有的GeoJSONLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.geoJSONLayer.clear();
```

---

### `delete(ids, fn)`

删除一个或多个GeoJSONLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的GeoJSONLayer对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.geoJSONLayer.delete(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到GeoJSONLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GeoJSONLayer图层对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.geoJSONLayer.focus("layer1", 100);
```

---

### `focusFeature(id, featureId, distance, flyTime, rotation, fn)`

定位到GeoJSONLayer图层的某一块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `featureId` | `number` | 要素区域Feature的ID |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：定位GeoJSONLayer内部某个要素区域：FocusFeature

```js
//相机定位到要素3
fdapi.geoJSONLayer.focusFeature("layer3", 3, 100, 1);
```

---

### `hide(ids, fn)`

隐藏一个或多个GeoJSONLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GeoJSONLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.geoJSONLayer.hide(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
```

---

### `highlightFeature(id, featureId, fn)`

高亮GeoJSONLayer图层对象内部的某一块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `featureId` | `number` | GeoJSONLayer图层对象内部的要素区域ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：高亮GeoJSONLayer内部单个要素区域：HighlightFeature

```js
//设置高亮颜色
fdapi.settings.setHighlightColor(Color.Red);
//高亮要素块
fdapi.geoJSONLayer.highlightFeature('layer3', 1);
```

---

### `highlightFeatureByProperty(object, fn)`

根据要素包含的属性字段名称和对应的值来高亮GeoJSONLayer图层对象内部对应的要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `object` | `object` | 待高亮要素对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`object` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `fieldName` | `string` | GeoJSONLayer图层对象内部的要素包含的属性字段名称 |
| `fieldType` | `number` | GeoJSONLayer图层对象内部的要素包含的属性字段类型 |
| `values` | `array` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |

> 示例：根据字段属性高亮GeoJSONLayer内部要素区域：HighlightFeatureByProperty

```js
//设置高亮颜色
fdapi.settings.setHighlightColor(Color.Yellow);
//高亮属性对应的要素块
fdapi.geoJSONLayer.highlightFeatureByProperty({
    id: 'layer3',
    fieldName: "NOWNAME",
    fieldType: FieldType.String,
    values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]
});
```

---

### `highlightFeatures(data, fn)`

高亮GeoJSONLayer图层对象内部的多块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `featureIds` | `array` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |

> 示例：高亮GeoJSONLayer内部多个要素区域：HighlightFeatures

```js
//设置高亮颜色
fdapi.settings.setHighlightColor(Color.LightSeaGreen);
fdapi.geoJSONLayer.highlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)`

设置GeoJSONLayer对象的可视高度范围，注意：当GeoJSONLayer使用贴地模式时，此方法会失效

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer对象的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetViewHeightRange

```js
fdapi.geoJSONLayer.setViewHeightRange('layer5', 1, 1000);
```

---

### `show(ids, fn)`

显示一个或多个GeoJSONLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GeoJSONLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.geoJSONLayer.show(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
```

---

### `unHighlightAllFeaturesById(ids, fn)`

取消高亮一个或者多个GeoJSONLayer图层的所有高亮要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | GeoJSONLayer图层对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.geoJSONLayer.unHighlightAllFeaturesById(ids);
```

---

### `unHighlightFeature(id, featureId, fn)`

取消高亮GeoJSONLayer图层对象内部的某一块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `featureId` | `number` | GeoJSONLayer图层对象内部的要素区域ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.geoJSONLayer.unHighlightFeature(id, featureId);
```

---

### `unHighlightFeatureByProperty(object, fn)`

根据要素包含的属性字段名称和对应的值来取消高亮GeoJSONLayer图层对象内部对应的要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `object` | `object` | 待高亮要素对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`object` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `fieldName` | `string` | GeoJSONLayer图层对象内部的要素包含的属性字段名称 |
| `fieldType` | `number` | GeoJSONLayer图层对象内部的要素包含的属性字段类型 |
| `values` | `array` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |

> 示例：根据字段属性取消高亮GeoJSONLayer内部要素区域：UnHighlightFeatureByProperty

```js
//取消高亮属性对应的要素块
fdapi.geoJSONLayer.unHighlightFeatureByProperty({
    id: 'layer3',
    fieldName: "NOWNAME",
    fieldType: FieldType.String,
    values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]
});
```

---

### `unHighlightFeatures(data, fn)`

取消高亮GeoJSONLayer图层对象内部的多块要素区域

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | GeoJSONLayer图层对象的ID |
| `featureIds` | `array` | GeoJSONLayer图层对象内部的要素区域ID，数组元素类型为number |

> 示例代码如下：

```js
await fdapi.geoJSONLayer.unHighlightFeatures(data);
```

---

### `update(option, fn)`

更新GeoJSONLayer图层对象的符号化显示效果

| 参数 | 类型 | 说明 |
|------|------|------|
| `option` | `object` | 加载GeoJSON的配置项对象，结构参考add()方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
//简单渲染器
let simpleRenderer = {
    //渲染器类型
    rendererType: RendererType.SimpleRenderer,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 0,
        //点的默认尺寸 针对simple-marker圆形填充
        size: 100,
        //填充颜色更新为黄色 
        color: [1, 1, 0, 1]
    },
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
    visualVariables: [{
        //控制显示的类型：颜色尺寸高度不透明度
        type: VisualType.Size,
        //属性字段名称 用id的值显示尺寸
        field: "id",
        //属性字段类型
        fieldType: FieldType.Number,
    }],

};

//用简单渲染器更新GeoJSONLayer 黄色
fdapi.geoJSONLayer.update({
    id: 'layer1',
    visible: true,//加载后是否显示
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 10],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    collision: true, //开启碰撞

    url: HostConfig.Path + "/assets/geojson/point_84.geojson",
    renderer: simpleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer1", 100);
}, 2000);
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
await fdapi.geoJSONLayer.updateEnd();
```


## 更多示例

> AddJson(simple-point)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//简单渲染器
let simpleRenderer = {
    //渲染器类型
    rendererType: RendererType.SimpleRenderer,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 0,
        //点的默认尺寸 针对simple-marker圆形填充
        size: 100,
        //默认填充颜色
        color: [1, 0, 0, 1]
    },
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
    visualVariables: [{
        //控制显示的类型：颜色尺寸高度不透明度
        type: VisualType.Size,
        //属性字段名称
        field: "value",
        //属性字段类型
        fieldType: FieldType.Number
    }],
};

let geojsonObj = {
    "type": "FeatureCollection",
    "name": "point",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 0, "value": 100 }, "geometry": { "type": "Point", "coordinates": [113.913964837915572, 22.527855618646743] } },
        { "type": "Feature", "properties": { "id": 1, "value": 110 }, "geometry": { "type": "Point", "coordinates": [113.935580614470155, 22.529374559033467] } },
        { "type": "Feature", "properties": { "id": 2, "value": 120 }, "geometry": { "type": "Point", "coordinates": [113.91334163255496, 22.522039210087012] } },
        { "type": "Feature", "properties": { "id": 3, "value": 130 }, "geometry": { "type": "Point", "coordinates": [113.938253660934748, 22.522895425421694] } },
        { "type": "Feature", "properties": { "id": 4, "value": 140 }, "geometry": { "type": "Point", "coordinates": [113.943235589288946, 22.529515368348097] } },
        { "type": "Feature", "properties": { "id": 5, "value": 150 }, "geometry": { "type": "Point", "coordinates": [113.947122954386941, 22.518850089699615] } },
        { "type": "Feature", "properties": { "id": 6, "value": 160 }, "geometry": { "type": "Point", "coordinates": [113.940269986516199, 22.520865455198059] } },
        { "type": "Feature", "properties": { "id": 7, "value": 170 }, "geometry": { "type": "Point", "coordinates": [113.944205038437318, 22.524855691721285] } },
        { "type": "Feature", "properties": { "id": 8, "value": 180 }, "geometry": { "type": "Point", "coordinates": [113.929114005720194, 22.526566527370296] } },
        { "type": "Feature", "properties": { "id": 9, "value": 190 }, "geometry": { "type": "Point", "coordinates": [113.925636733672405, 22.514011157833803] } },
        { "type": "Feature", "properties": { "id": 10, "value": 200 }, "geometry": { "type": "Point", "coordinates": [113.941561038097902, 22.52800839633241] } },
    ]
};

//用简单渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer_json',
    visible: true,//加载后是否显示
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    sourceJson: geojsonObj,
    collision: true, //开启碰撞
    renderer: simpleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer_json", 100);
}, 2000);
```

> AddFile(simple-point)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//简单渲染器
let simpleRenderer = {
    //渲染器类型
    rendererType: RendererType.SimpleRenderer,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 0,
        //点的默认尺寸 针对simple-marker圆形填充
        size: 80,
        //默认填充颜色
        color: [1, 1, 0, 1]
    },
    //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
    visualVariables: [{
        //控制显示的类型：颜色尺寸高度不透明度
        type: VisualType.Size,
        //属性字段名称 用id的值显示尺寸
        field: "id",
        //属性字段类型
        fieldType: FieldType.Number,
    }],

};

//用简单渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer1',
    visible: true,//加载后是否显示
    range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 10],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    collision: true, //开启碰撞
    url: HostConfig.Path + "/assets/geojson/point_84.geojson",
    renderer: simpleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer1", 100);
}, 2000);
```

> AddFile(simple-polyline)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//简单渲染器
let simpleRenderer = {
    //渲染器类型
    rendererType: RendererType.SimpleRenderer,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 1,
        //填充颜色
        color: [1, 1, 0, 1],
        //默认轮廓线
        outline: {
            //线宽
            width: 2
        }
    }
};

//用简单渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer2',
    visible: true,//加载后是否显示
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    collision: true, //开启碰撞
    onTerrain: true,//是否贴地
    enableAntialias: false,//是否开启反走样
    depthTest: false,//是否开启深度检测 注意：深度检测参数仅在反走样参数关闭时(enableAntialias=false)生效
    url: HostConfig.Path + "/assets/geojson/polyline_84.geojson",
    renderer: simpleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer2", 100);
}, 2000);
```

> AddFile(simple-polygon)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//简单渲染器
let simpleRenderer = {

    //渲染器类型
    rendererType: RendererType.SimpleRenderer,
    //是否生成顶面
    generateTop: false,
    //是否生成底面
    generateBottom: false,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 3,
        //默认高度
        height: 10,
        //默认填充颜色
        color: [0, 0, 1, 1],
        //默认轮廓线
        outline: {
            //线宽
            width: 1,
            //颜色
            color: [1, 1, 1, 1],
        }
    },
    //根据字段高度拉高polygon，支持控制颜色、尺寸和透明度的插值显示 
    visualVariables: [{
        //控制显示的类型：颜色尺寸高度不透明度
        type: VisualType.Height,
        //属性字段名称
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
    }]
};

//用简单渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer3',
    visible: true,//加载后是否显示
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    textField: "NOWNAME",//geojson文件内的属性字段名称
    textRange: [0, 280],//文字标注可见范围
    textSize: 22,//文字标注大小
    textColor: [0, 1, 0, 1],//文字标注颜色
    onTerrain: false,//是否贴地
    collision: true, //开启碰撞

    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
    renderer: simpleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer3", 100);
}, 2000);
```

> AddFile(unique)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();
//唯一值渲染器
let uniqueValueRenderer = {
    //渲染器类型
    rendererType: RendererType.UniqueValueRenderer,
    //是否生成顶面
    generateTop: false,
    //是否生成底面
    generateBottom: false,
    //渲染字段名称
    field: "NOWNAME",
    //属性字段类型
    fieldType: FieldType.String,
    //控制可视化显示的类型：颜色
    type: VisualType.Color,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 2,
        //填充色
        color: [0, 1, 1, 1],
        //轮廓线
        outline: {
            //线宽
            width: 1,
            //颜色
            color: [1, 1, 1, 1]
        },
    },
    //根据NOWNAME字段的值进行不同颜色填充
    uniqueValueInfos: [
        {
            value: "滨海之窗1栋住宅",
            symbol: {
                //填充蓝色
                color: [0, 0, 1, 1],
            }
        },
        {
            value: "南山第二外国语学校",
            symbol: {
                //填充绿色
                color: [0, 1, 0, 1],
            }
        },
        {
            value: "保利城文化广场",
            symbol: {
                //填充黄色
                color: [1, 1, 0, 1],
            }
        },
        {
            value: "海岸城东座",
            symbol: {
                //填充红色
                color: [1, 0, 0, 1],
            }
        }
    ]
};


//可见性渲染器
let visibleRenderer = {
    //渲染器类型
    rendererType: RendererType.VisibleRenderer,
    //渲染字段名称
    field: "CQNAME",
    //属性字段类型
    fieldType: FieldType.String,
    //全局要素默认是否可见
    defaultVisible: true,
    //根据CQNAME字段的值进行显隐
    visibleValueInfos: [
        {
            value: "滨海之窗花园4栋",
            visible: false,
        },
        {
            value: "南油生活A区25栋",
            visible: false,
        },
        {
            value: "滨海之窗花园幼儿园",
            visible: false,
        },
        {
            value: "南油单身宿舍B20栋",
            visible: false,
        }
    ]
};

//用唯一值渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer4',
    visible: true,//加载后是否显示
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    textField: "NOWNAME",//geojson文件内的属性字段名称
    textRange: [0, 200],//文字标注可见范围
    textSize: 22,//文字标注大小
    textColor: [0, 1, 0, 1],//文字标注颜色
    onTerrain: true,//是否贴地
    collision: true, //开启碰撞

    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
    renderer: uniqueValueRenderer,
    visibleRenderer: visibleRenderer
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer4", 100);
}, 2000);
```

> AddFile(class)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//分类渲染器 按区间值范围进行分类符号化
const less25 = {
    color: [255 / 255, 0 / 255, 0 / 255, 1],
};

const less50 = {
    color: [193 / 255, 235 / 255, 233 / 255, 1],
};

const less75 = {
    color: [51 / 255, 128 / 255, 174 / 255, 1],
};

const less100 = {
    color: [239 / 255, 237 / 255, 234 / 255, 1],
};

//分类渲染器
let classBreaksRenderer = {
    rendererType: RendererType.ClassBreaksRenderer,
    //是否生成顶面
    generateTop: false,
    //是否生成底面
    generateBottom: false,
    //按属性取值分类着色
    field: "BLDG_HEIGH",
    //属性字段类型
    fieldType: FieldType.Number,
    //控制可视化显示的类型：颜色
    type: VisualType.Color,
    //开启颜色范围插值
    gradient: false,
    //材质样式
    // style: 11,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 2,
        //填充色
        color: [1, 1, 0, 1],
        //轮廓线
        outline: {
            //线宽
            width: 1,
            //颜色
            color: [0.1, 0.1, 0.1, 1]
        },
    },
    //按field高度属性拉高面
    visualVariables: [{
        //控制可视化显示的类型：高度
        type: VisualType.Height,
        //属性字段名称
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
    }],
    //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 25,
            symbol: less25
        },
        {
            minValue: 25,
            maxValue: 50,
            symbol: less50
        },
        {
            minValue: 50,
            maxValue: 75,
            visible: true,
            symbol: less75
        },
        {
            minValue: 75,
            maxValue: 100,
            symbol: less100
        }
    ]
};

//可见性渲染器
let visibleRenderer = {
    //渲染器类型
    rendererType: RendererType.VisibleRenderer,
    //渲染字段名称
    field: "BLDG_HEIGH",
    //属性字段类型
    fieldType: FieldType.Number,
    //全局要素默认是否可见
    defaultVisible: true,
    //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示
    visibleValueInfos: [
        {
            minValue: 0,
            maxValue: 25,
            visible: true,
        },
        {
            minValue: 25,
            maxValue: 50,
            visible: true,
        },
        {
            minValue: 50,
            maxValue: 75,
            visible: true,
        },
        {
            minValue: 75,
            maxValue: 200,
            visible: true,
        }
    ]
};

//用分类渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer5',
    visible: true,//加载后是否显示
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    textField: "NOWNAME",//geojson文件内的属性字段名称
    textRange: [0, 280],//文字标注可见范围
    textSize: 22,//文字标注大小
    textColor: [0, 1, 0, 1],//文字标注颜色
    onTerrain: false,//是否贴地
    collision: true, //开启碰撞

    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
    renderer: classBreaksRenderer,
    visibleRenderer: visibleRenderer,
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer5", 100);
}, 2000);
```

> AddFile(visible)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//分类渲染器 按区间值范围进行分类符号化
const less25 = {
    color: [0, 0, 1, 1],
};

const less50 = {
    color: [0, 1, 0, 1],
};

const less75 = {
    color: [1, 1, 0, 1],
};

const less100 = {
    color: [1, 0, 0, 1],
};

//分类渲染器
let classBreaksRenderer = {
    rendererType: RendererType.ClassBreaksRenderer,
    //按属性取值分类着色
    field: "BLDG_HEIGH",
    //属性字段类型
    fieldType: FieldType.Number,
    //控制可视化显示的类型：颜色
    type: VisualType.Color,
    //开启颜色范围插值
    gradient: true,
    //默认符号化配置
    defaultSymbol: {
        //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
        symbolType: 2,
        //填充色
        color: [1, 1, 0, 1],
        //轮廓线
        outline: {
            //线宽
            width: 1,
            //颜色
            color: [1, 1, 1, 1]
        },
    },
    //按field高度属性拉高面
    visualVariables: [{
        //控制可视化显示的类型：高度
        type: VisualType.Height,
        //属性字段名称
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
    }],
    //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 25,
            symbol: less25
        },
        {
            minValue: 25,
            maxValue: 50,
            symbol: less50
        },
        {
            minValue: 50,
            maxValue: 75,
            visible: true,
            symbol: less75
        },
        {
            minValue: 75,
            maxValue: 100,
            symbol: less100
        }
    ]
};

//可见性渲染器
let visibleRenderer = {
    //渲染器类型
    rendererType: RendererType.VisibleRenderer,
    //渲染字段名称
    field: "BLDG_HEIGH",
    //属性字段类型
    fieldType: FieldType.Number,
    //全局要素默认是否可见
    defaultVisible: true,
    //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示
    visibleValueInfos: [
        {
            minValue: 0,
            maxValue: 25,
            visible: false,
        },
        {
            minValue: 25,
            maxValue: 50,
            visible: false,
        },
        {
            minValue: 50,
            maxValue: 75,
            visible: true,
        },
        {
            minValue: 75,
            maxValue: 100,
            visible: true,
        }
    ]
};

//用分类渲染器和可见性渲染器添加GeoJSONLayer
fdapi.geoJSONLayer.add({
    id: 'layer5',
    visible: true,//加载后是否显示
    rotation: [0, 0, 0],//图层旋转
    offset: [0, 0, 0],//基于原始位置的偏移量
    needProject: true,//开启投影转换
    textField: "NOWNAME",//geojson文件内的属性字段名称
    textRange: [0, 280],//文字标注可见范围
    textSize: 22,//文字标注大小
    textColor: [0, 1, 0, 1],//文字标注颜色
    onTerrain: false,//是否贴地
    collision: true, //开启碰撞

    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
    renderer: classBreaksRenderer,
    visibleRenderer: visibleRenderer,
});

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer5", 100);
}, 2000);
```

> AddFile(materials)

```js
//添加前先清除保证id唯一
fdapi.geoJSONLayer.clear();

//自定义材质示例
let layer6 = {
    id: "layer6",
    visible: true,
    rotation: [
        0,
        0,
        0
    ],
    offset: [
        0,
        0,
        0
    ],
    needProject: true,
    textField: "NOWNAME",//geojson文件内的属性字段名称
    textRange: [
        0,
        280
    ],
    onTerrain: false,
    collision: true,

    url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
    renderer: {
        rendererType: 2,
        materials: [
            {
                index: 0,
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                scalarParameters: [{ "name": "不透明度", "value": 0.2 }, { "name": "类型", "value": 0 }],
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
            },
            {
                index: 1,
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 1 }],
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
            },
            {
                index: 2,
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 2 }],
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
            },
            {
                index: 3,
                material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 3 }],
                vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
            }
        ],
        field: "BLDG_HEIGH",
        fieldType: 1,
        type: 0,
        gradient: true,
        defaultSymbol: {
            symbolType: 2,
            color: [
                1,
                1,
                0,
                1
            ],
            outline: {
                width: 1,
                color: [
                    1,
                    1,
                    1,
                    1
                ]
            }
        },
        visualVariables: [
            {
                type: 1,
                field: "BLDG_HEIGH",
                fieldType: 1
            }
        ],
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 25,
                symbol: {
                    color: [
                        0,
                        0,
                        1,
                        1
                    ]
                }
            },
            {
                minValue: 25,
                maxValue: 50,
                symbol: {
                    color: [
                        0,
                        1,
                        0,
                        1
                    ]
                }
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true,
                symbol: {
                    color: [
                        1,
                        1,
                        0,
                        1
                    ]
                }
            },
            {
                minValue: 75,
                maxValue: 100,
                symbol: {
                    color: [
                        1,
                        0,
                        0,
                        1
                    ]
                }
            }
        ]
    },
    materialRenderer: {
        rendererType: 3,
        field: "BLDG_HEIGH",
        fieldType: 1,
        defaultMaterial: 0,
        materialValueInfos: [
            {
                minValue: 0,
                maxValue: 25,
                index: 0
            },
            {
                minValue: 25,
                maxValue: 50,
                index: 1
            },
            {
                minValue: 50,
                maxValue: 75,
                index: 2
            },
            {
                minValue: 75,
                maxValue: 100,
                index: 3
            }
        ]
    },
    visibleRenderer: {
        rendererType: 1,
        field: "BLDG_HEIGH",
        fieldType: 1,
        defaultVisible: true,
        visibleValueInfos: [
            {
                minValue: 0,
                maxValue: 25,
                visible: true
            },
            {
                minValue: 25,
                maxValue: 50,
                visible: true
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true
            },
            {
                minValue: 75,
                maxValue: 100,
                visible: true
            }
        ]
    }
};
fdapi.geoJSONLayer.add(layer6);

setTimeout(function () {
    fdapi.geoJSONLayer.focus("layer6", 100);
}, 2000);
```

> 取消高亮GeoJSONLayer内部单个要素区域：UnHighlightFeature

```js
fdapi.geoJSONLayer.unHighlightFeature('layer3', 1);
```

> 取消高亮GeoJSONLayer内部多个要素区域：UnHighlightFeatures

```js
fdapi.geoJSONLayer.unHighlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
```

> 取消高亮GeoJSONLayer内部所有要素区域：UnHighlightAllFeaturesById

```js
fdapi.geoJSONLayer.unHighlightAllFeaturesById(["layer1", "layer2", "layer3"]);
```
