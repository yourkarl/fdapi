---
title: GlobeTerrain
sidebar_label: GlobeTerrain
description: "球面坐标系下管理 Cesium 球面地形与影像服务的对象，可在数字地球上叠加 WMTS、WMS、MVT、TMS 等 OGC 网络图层服务，构建全球/大范围三维球面底图与地形。"
---

# GlobeTerrain

球面坐标系下管理 Cesium 球面地形与影像服务的对象，可在数字地球上叠加 WMTS、WMS、MVT、TMS 等 OGC 网络图层服务，构建全球/大范围三维球面底图与地形。

通过 `api.globeTerrain` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：球面坐标系下管理 Cesium 球面地形与影像服务的对象，可在数字地球上叠加 WMTS、WMS、MVT、TMS 等 OGC 网络图层服务，构建全球/大范围三维球面底图与地形。
- **别名 / 不同行业叫法**：球面地形 / 数字地球地形 / Cesium 地形影像 / 球面底图。
- **适用行业**：海洋气象、国防军事、测绘 GIS、应急管理、智慧水利。
- **使用场景**：
  - 在数字地球球面上叠加天地图等地形注记、晕渲与影像底图，构建全球/全国级三维底图。
  - 海洋气象、流域等大范围场景下加载球面地形与多源 OGC 影像服务。
  - 国防、应急等需全球态势展示的场景中叠加多层球面图层服务。
- **注意事项**：
  - 仅适用于球面坐标系工程；平面投影工程请使用 ImageryLayer 等对象。
  - 依赖标准 OGC 服务的 Capabilities（xmlPath）与瓦片请求模板（resourceURL），需确保服务可访问且模板变量正确。
  - 多层影像叠加时通过 alpha 控制透明度与压盖关系，注意 SRGB 颜色转换（bConvertSRGB）对显示效果的影响。

## 构造函数

```js
new GlobeTerrain()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addImageryLayer`](#addImageryLayer) | 在Cesium球面上添加图层服务，支持的服务类型包含WMTS、WMS、MVT和TMS |  |
| [`addImageryLayerBySchemaParams`](#addImageryLayerBySchemaParams) | 根据自定义参数添加球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务 |  |
| [`clearImageryLayer`](#clearImageryLayer) | 清空Cesium球面上添加的所有图层服务 |  |
| [`deleteImageryLayer`](#deleteImageryLayer) | 删除Cesium球面上指定的图层服务 |  |
| [`destroy`](#destroy) | 销毁Cesium球面的地形和影像 |  |
| [`hide`](#hide) | 隐藏Cesium球面的地形和影像 | 按业务条件隐藏对象 |
| [`init`](#init) | 初始化Cesium球面的地形和影像 |  |
| [`setImagery`](#setImagery) | 设置更新初始化加载的影像服务 |  |
| [`setImageryBySchemaParams`](#setImageryBySchemaParams) | 根据自定义参数的图层服务来更新初始化球面加载的影像服务， |  |
| [`setImageryLayerDrawOrder`](#setImageryLayerDrawOrder) | 设置Cesium球面上添加的图层服务的绘制顺序，即移动当前图层到目标图层的上方位置显示 |  |
| [`show`](#show) | 显示Cesium球面的地形和影像 | 按业务条件显示对象 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `addImageryLayer(option, fn)` {#addImageryLayer}

在Cesium球面上添加图层服务，支持的服务类型包含WMTS、WMS、MVT和TMS

| 参数 | 类型 | 说明 |
|------|------|------|
| `option` | `object` | Overlay对象，包含配置参数 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，图层服务ID |
| `xmlPath` | `string` | 必选，获取球面OGC服务的元数据能力文档（Capabilities XML文档）的URL地址，需包含图层、瓦片规则、请求参数等信息 |
| `resourceURL` | `string` | 可选，申请球面OGC服务资源瓦片的URL地址，例如WMTS GetTile操作的基本URL（用于KVP编码的请求）或tile-URL模板（用于RESTful请求）。 tile-URL模板应包含以下变量:&#123;style&#125;，&#123;TileMatrixSet&#125;，&#123;TileMatrix&#125;，&#123;TileRow&#125;，&#123;TileCol&#125;。如果实际值是硬编码的，或者服务器不需要，则前两个是可选的。 &#123;s&#125;关键字可用于指定子域。 |
| `type` | `number` | 必选，球面网络图层服务类型，0：WMTS 1：WMS 2：MVT 3：TMS |
| `alpha` | `number` | 可选，球面网络图层的透明度，取值范围：[0,1] |
| `bConvertSRGB` | `boolean` | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddImageryLayer

```js
fdapi.globeTerrain.deleteImageryLayer("wmts1");
//地形注记
fdapi.globeTerrain.addImageryLayer({
    id: "wmts1",
    type: 0, //0：WMTS 1：WMS 2：MVT 3：TMS
    xmlPath: "http://t0.tianditu.gov.cn/cva_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b",
    resourceURL: "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b",
    alpha: 1,
    bConvertSRGB: true
});

fdapi.globeTerrain.deleteImageryLayer("wmts2");
//地形晕渲
fdapi.globeTerrain.addImageryLayer({
    id: "wmts2",
    type: 0, //0：WMTS 1：WMS 2：MVT 3：TMS
    xmlPath: "http://t0.tianditu.gov.cn/ter_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b",
    resourceURL: "http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b",
    alpha: 1,
    bConvertSRGB: true
});
```

---

### `addImageryLayerBySchemaParams(obj, fn)` {#addImageryLayerBySchemaParams}

根据自定义参数添加球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务

注意：如果服务类型是0(WMS)或者2(MVT) ,只需传入extent请求范围参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `obj` | `object` | 球面网络图层服务的对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`obj` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，球面网络图层服务字符串类型的ID |
| `type` | `number` | 必选，球面网络图层服务类型，0：WMTS 1：WMS 2：MVT 3：TMS |
| `resourceURL` | `string` | 必选，瓦片资源或者mvt的style文件申请url，如果服务type是MVT类型，resourceURL可以是style文件的内容，此时需要将bResourceURL设置为true |
| `epsg` | `string` | 可选，球面服务的坐标系类型 |
| `alpha` | `number` | 可选，球面网络图层的透明度，取值范围：[0,1] |
| `bResourceURL` | `boolean` | 可选，是否是MVT类型资源url，默认值：false |
| `bConvertSRGB` | `boolean` | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |
| `topLeftCornerX` | `number` | 可选，图片的切片的左上角x坐标 |
| `topLeftCornerY` | `number` | 可选，图片的切片的左上角y坐标 |
| `tileWidth` | `number` | 可选，瓦片的像素宽度，取值示例：256 |
| `tileHeight` | `number` | 可选，瓦片的像素高度，取值示例：256 |
| `extent` | `array` | 可选，图层服务请求的有效范围，取值示例：[xmin, ymin, xmax, ymax]，数组内参数依次最小经度值，左下角的经度；最小纬度值，左下角的纬度；最大经度值，左上角的经度；最大纬度值，左上角的纬度 |
| `minimumLevel` | `number` | 可选，服务的切片的最小层级，默认值：0 |
| `maximumLevel` | `number` | 可选，服务的切片的最大层级， 最大23 |
| `scaleDenominator` | `number` | 可选，第0层图像的scaleDenominator值 |
| `dpi` | `number` | 可选，一个像素代表的实际地面距离，请参考不同GIS平台厂商发布的服务使用的DPI配置值：ArcGIS：90.714 天地图和超图：96 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddImageryLayerBySchemaParams

```js
fdapi.globeTerrain.deleteImageryLayer(["wmtsBySchemaParams"]);
//全参数的wmts服务
fdapi.globeTerrain.addImageryLayerBySchemaParams({
    id: "wmtsBySchemaParams",
    resourceURL: "http://192.168.20.7:8080/geowebcache/service/wmts?layer=TDT_G51&style=&tilematrixset=EPSG%3A4490_TDT_G51&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A4490_TDT_G51%3A{TileMatrix}&TileCol={TileCol}&TileRow={TileRow}",
    type: 0,
    alpha: 1.0,
    epsg: "4490",
    topLeftCornerX: -180.0,
    topLeftCornerY: 90.0,
    tileWidth: 256,
    tileHeight: 256,
    minimumLevel: 0,
    maximumLevel: 12,
    extent: [119.810, 24.032, 124.42, 28.102],
    scaleDenominator: 279541132.0143589
});
```

---

### `clearImageryLayer(fn)` {#clearImageryLayer}

清空Cesium球面上添加的所有图层服务

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ClearImageryLayer

```js
fdapi.globeTerrain.clearImageryLayer();
```

---

### `deleteImageryLayer(ids, fn)` {#deleteImageryLayer}

删除Cesium球面上指定的图层服务

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 待删除的图层服务ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：DeleteImageryLayer

```js
fdapi.globeTerrain.deleteImageryLayer(["wmts2", "wmts1"]);
```

---

### `destroy(fn)` {#destroy}

销毁Cesium球面的地形和影像

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Destroy

```js
fdapi.globeTerrain.destroy();
```

---

### `hide(fn)` {#hide}

隐藏Cesium球面的地形和影像

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.globeTerrain.hide();
```

---

### `init(terrainUrl, imageryUrl, imageryResourceUrl, alpha, bConvertSRGB, fn)` {#init}

初始化Cesium球面的地形和影像

| 参数 | 类型 | 说明 |
|------|------|------|
| `terrainUrl` | `string` | 可选，地形配置文件url地址 |
| `imageryUrl` | `string` | 可选，影像服务配置xml文件的url地址，注意：初始化的影像服务应是全球影像服务地址 |
| `imageryResourceUrl` | `string` | 可选，影像图像文件url模板，若不传后续可以通过setImageryResourceUrl()方法更新 |
| `alpha` | `number` | 可选，球面网络图层的透明度，取值范围：[0,1] |
| `bConvertSRGB` | `boolean` | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Init

```js
fdapi.settings.setMainUIVisibility(true);
//初始化之前先销毁
fdapi.globeTerrain.destroy();
//加载地形+影像
let terrainUrl = "https://terrain.gbim360.com/layer.json";
let imageryUrl = "http://t0.tianditu.gov.cn/img_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b";
let imageryResourceUrl = "http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b";
fdapi.globeTerrain.init(terrainUrl, imageryUrl, imageryResourceUrl,1,true);
```

---

### `setImagery(imageryUrl, imageryResourceUrl, fn)` {#setImagery}

设置更新初始化加载的影像服务

| 参数 | 类型 | 说明 |
|------|------|------|
| `imageryUrl` | `string` | 影像服务配置xml文件的url地址，注意：替换初始化的影像服务应是全球影像服务地址 |
| `imageryResourceUrl` | `string` | 影像图像文件url模板 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.globeTerrain.setImagery(imageryUrl, imageryResourceUrl);
```

---

### `setImageryBySchemaParams(option, fn)` {#setImageryBySchemaParams}

根据自定义参数的图层服务来更新初始化球面加载的影像服务，注意：替换初始化的影像服务应是全球影像服务地址

| 参数 | 类型 | 说明 |
|------|------|------|
| `option` | `object` | 球面网络图层服务的对象的自定义参数配置属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `number` | 必选，球面网络图层服务类型，0：WMTS 1：WMS 2：MVT 3：TMS |
| `resourceURL` | `string` | 必选，申请球面OGC服务资源瓦片的URL地址，如果服务type是MVT类型，resourceURL可以是style文件的内容，此时需要将bResourceURL设置为true |
| `epsg` | `string` | 可选，球面服务的坐标系类型 |
| `alpha` | `number` | 可选，球面网络图层的透明度，取值范围：[0,1] |
| `bResourceURL` | `boolean` | 可选，是否是MVT类型资源url，默认值：false |
| `bConvertSRGB` | `boolean` | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |
| `topLeftCornerX` | `number` | 可选，图片的切片的左上角x坐标 |
| `topLeftCornerY` | `number` | 可选，图片的切片的左上角y坐标 |
| `tileWidth` | `number` | 可选，瓦片的像素宽度，取值示例：256 |
| `tileHeight` | `number` | 可选，瓦片的像素高度，取值示例：256 |
| `extent` | `array` | 可选，图层服务请求的有效范围，取值示例：[xmin, ymin, xmax, ymax]，数组内参数依次最小经度值，左下角的经度；最小纬度值，左下角的纬度；最大经度值，左上角的经度；最大纬度值，左上角的纬度 |
| `minimumLevel` | `number` | 可选，服务的切片的最小层级，默认值：0 |
| `maximumLevel` | `number` | 可选，服务的切片的最大层级， 最大23 |
| `scaleDenominator` | `number` | 可选，第0层图像的scaleDenominator值 |
| `dpi` | `number` | 可选，一个像素代表的实际地面距离，请参考不同GIS平台厂商发布的服务使用的DPI配置值：ArcGIS：90.714 天地图和超图：96 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetImageryBySchemaParams

```js
//全参数的wmts服务
fdapi.globeTerrain.setImageryBySchemaParams({
    resourceURL: "http://192.168.20.7:8080/geowebcache/service/wmts?layer=TDT_G51&style=&tilematrixset=EPSG%3A4490_TDT_G51&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A4490_TDT_G51%3A{TileMatrix}&TileCol={TileCol}&TileRow={TileRow}",
    type: 0,
    alpha: 1.0,
    epsg: "4490",
    topLeftCornerX: -180.0,
    topLeftCornerY: 90.0,
    tileWidth: 256,
    tileHeight: 256,
    minimumLevel: 0,
    maximumLevel: 12,
    extent: [119.810, 24.032, 124.42, 28.102],
    scaleDenominator: 279541132.0143589
});
```

---

### `setImageryLayerDrawOrder(currentLayerId, targetLayerId, fn)` {#setImageryLayerDrawOrder}

设置Cesium球面上添加的图层服务的绘制顺序，即移动当前图层到目标图层的上方位置显示

| 参数 | 类型 | 说明 |
|------|------|------|
| `currentLayerId` | `string` | 当前图层对象的ID，即设置成功后此图层会在目标图层的上方位置显示 |
| `targetLayerId` | `string` | 目标图层对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetImageryLayerDrawOrder

```js
//调整地形注记显示顺序 显示在地形晕渲上面
fdapi.globeTerrain.setImageryLayerDrawOrder("wmts1", "wmts2");
```

---

### `show(fn)` {#show}

显示Cesium球面的地形和影像

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.globeTerrain.show();
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

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.globeTerrain.updateEnd();
```


## 更多示例

> SetImagery

```js
let imageryUrl = "http://t0.tianditu.gov.cn/cva_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b";
let imageryResourceUrl =  "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b";
fdapi.globeTerrain.setImagery(imageryUrl, imageryResourceUrl);
```
