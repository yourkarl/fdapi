---
title: ImageryLayer2
sidebar_label: ImageryLayer2
description: "球面坐标系下通过自定义切片参数加载 WMTS、WMS、MVT、TMS 等网络图层服务，可指定原点、瓦片尺寸、层级范围与 extent 等，适配各厂商服务规则。"
---

# ImageryLayer2

ImageryLayer2 球面坐标系下加载网络图层服务 目前支持WMTS、WMS、MVT和TMS

通过 `api.imageryLayer2` 访问。
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：球面坐标系下通过自定义切片参数加载 WMTS、WMS、MVT、TMS 等网络图层服务，可精细指定切片起始原点、瓦片尺寸、层级范围、范围 extent、scaleDenominator 与 DPI 等参数，适配各厂商发布的服务规则。
- **别名 / 不同行业叫法**：影像图层（球面/参数化）/ 底图服务 / 卫星影像图层 / OGC 网络图层 / 自定义切片图层。
- **适用行业**：测绘 GIS、智慧城市、海洋气象、应急管理、智慧水利。、智慧交通与公路
- **使用场景**：
  - 当标准能力文档无法自动解析时，按厂商发布的切片方案手动配置参数加载球面影像/电子地图。
  - 加载 ArcGIS、天地图、超图等不同 DPI 与切片规则的 OGC 服务作为球面底图。
  - 叠加 MVT 矢量瓦片并通过 style 文件实现球面矢量底图渲染。
  - 一张图球面影像底图：卫星影像与第三方地图服务配准叠加，支撑大范围交通产业一张图。
- **注意事项**：
  - 仅适用于球面坐标系；参数化加载要求准确知道服务的切片原点、瓦片尺寸与 scaleDenominator/DPI，配置错误会导致瓦片错位或不显示。
  - WMS(type=1) 或 MVT(type=2) 等类型按说明仅需传 extent 等必要参数；MVT 用 style 内容时需将 bResourceURL 设为 true。
  - 需确认服务坐标系 epsg 与工程一致，注意 SRGB 颜色转换对底图色彩的影响。

## 构造函数

```js
new ImageryLayer2()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addBySchemaParams`](#addBySchemaParams) | 根据图层服务的自定义参数添加一个或多个球面网络地图服务，如WMTS/WMS/MVT/TM… |  |
| [`addByUrl`](#addByUrl) | 根据图层服务url包含的切片方案xmlPath添加一个或多个球面网络地图服务，如WMTS… |  |
| [`clear`](#clear) | 清除场景中所有的网络图层对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个ImageryLayer2图层对象 | 按 ID 移除指定对象 |
| [`hide`](#hide) | 隐藏一个或多个ImageryLayer2图层对象 | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有ImageryLayer2图层对象 | 一键隐藏全部对象 |
| [`setDrawOrder`](#setDrawOrder) | 设置两个ImageryLayer2图层的绘制顺序，即移动当前ImageryLayer2图… |  |
| [`show`](#show) | 显示一个或多个ImageryLayer2图层对象 | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有ImageryLayer2图层对象 | 一键显示全部对象 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `addBySchemaParams(data, fn)` {#addBySchemaParams}

根据图层服务的自定义参数添加一个或多个球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务

注意：如果服务类型是0(WMS)或者2(MVT) ,只需传入extent请求范围参数。

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 球面网络图层服务的对象，可以是Object类型或Array类型，对于每一个图层服务对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 必选，球面网络图层服务字符串类型的ID |
| `type` | `number` | 是 | - | 必选，球面网络图层服务类型，0：WMTS 1：WMS 2：MVT 3：TMS |
| `resourceURL` | `string` | 是 | - | 必选，申请球面OGC服务资源瓦片或者mvt的style文件的URL地址，如果服务type是MVT类型，resourceURL可以是style文件的内容，此时需要将bResourceURL设置为true |
| `epsg` | `string` | 否 | - | 可选，球面服务的坐标系类型 |
| `alpha` | `number` | 否 | - | 可选，球面网络图层的透明度，取值范围：[0,1] |
| `bResourceURL` | `boolean` | 否 | false | 可选，是否是MVT类型资源url，默认值：false |
| `bConvertSRGB` | `boolean` | 否 | true | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |
| `topLeftCornerX` | `number` | 否 | - | 可选，图片的切片的左上角x坐标 |
| `topLeftCornerY` | `number` | 否 | - | 可选，图片的切片的左上角y坐标 |
| `tileWidth` | `number` | 否 | - | 可选，瓦片的像素宽度，取值示例：256 |
| `tileHeight` | `number` | 否 | - | 可选，瓦片的像素高度，取值示例：256 |
| `extent` | `array` | 否 | - | 可选，图层服务请求的有效范围，取值示例：[xmin, ymin, xmax, ymax]，数组内参数依次最小经度值，左下角的经度；最小纬度值，左下角的纬度；最大经度值，左上角的经度；最大纬度值，左上角的纬度 |
| `minimumLevel` | `number` | 否 | 0 | 可选，服务的切片的最小层级，默认值：0 |
| `maximumLevel` | `number` | 否 | - | 可选，服务的切片的最大层级， 最大23 |
| `scaleDenominator` | `number` | 否 | - | 可选，第0层图像的scaleDenominator值 |
| `dpi` | `number` | 否 | - | 可选，一个像素代表的实际地面距离，请参考不同GIS平台厂商发布的服务使用的DPI配置值：ArcGIS：90.714 天地图和超图：96 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddBySchemaParams

```js
fdapi.imageryLayer2.delete("wmts2");
//内部测试服务 广东省
let wmts2 = {
    id: "wmts2",
    resourceURL: "http://192.168.20.186:8080/geoserver/gwc/service/wmts/rest/wjn10171:4326guangdong/polygon/EPSG%3A4326/EPSG%3A4326%3A{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
    type: 0,
    alpha: 1.0,
    epsg: "4326",
    topLeftCornerX: -180,
    topLeftCornerY: 90,
    tileWidth: 256,
    tileHeight: 256,
    minimumLevel: 0,
    maximumLevel: 21,
    extent: [109.654937, 20.211718, 117.192935, 25.516771],
    scaleDenominator: 279541132.0143589
}
fdapi.imageryLayer2.addBySchemaParams(wmts2);
```

---

### `addByUrl(data, fn)` {#addByUrl}

根据图层服务url包含的切片方案xmlPath添加一个或多个球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 球面网络图层服务的对象，可以是Object类型或Array类型，对于每一个图层服务对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 必选，球面网络图层服务字符串类型的ID |
| `xmlPath` | `string` | 是 | - | 必选，获取球面OGC服务的元数据能力文档（Capabilities XML文档）的URL地址，需包含图层、瓦片规则、请求参数等信息 |
| `resourceURL` | `string` | 否 | - | 可选，申请球面OGC服务资源瓦片的URL地址，例如WMTS GetTile操作的基本URL（用于KVP编码的请求）或tile-URL模板（用于RESTful请求）。 tile-URL模板应包含以下变量:&#123;style&#125;，&#123;TileMatrixSet&#125;，&#123;TileMatrix&#125;，&#123;TileRow&#125;，&#123;TileCol&#125;。如果实际值是硬编码的，或者服务器不需要，则前两个是可选的。 &#123;s&#125;关键字可用于指定子域。 |
| `type` | `number` | 是 | - | 必选，球面网络图层服务类型，0：WMTS 1：WMS 2：MVT 3：TMS |
| `alpha` | `number` | 是 | - | 必选，球面网络图层的透明度，取值范围：[0,1] |
| `bConvertSRGB` | `boolean` | 否 | true | 可选，球面网络图层服务加载时颜色效果是否开启RGB模式转换为SRGB，默认值：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddByUrl

```js
fdapi.imageryLayer2.delete("wmts1");

let wmts1 = {
    id: "wmts1",
    xmlPath: "http://t0.tianditu.gov.cn/ter_c/wmts?request=GetCapabilities&service=wmts",
    resourceURL: "http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=4267820f43926eaf808d61dc07269beb",
    alpha: 1.0,
    type: 0
}
fdapi.imageryLayer2.addByUrl(wmts1);
```

---

### `clear(fn)` {#clear}

清除场景中所有的网络图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.imageryLayer2.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个ImageryLayer2图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的ImageryLayer2对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.imageryLayer2.delete(["wmts2", "wmts1"]);
```

---

### `hide(ids, fn)` {#hide}

隐藏一个或多个ImageryLayer2图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | ImageryLayer2对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.imageryLayer2.hide(["wmts2", "wmts1"]);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有ImageryLayer2图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.imageryLayer2.hideAll();
```

---

### `setDrawOrder(currentLayerId, targetLayerId, fn)` {#setDrawOrder}

设置两个ImageryLayer2图层的绘制顺序，即移动当前ImageryLayer2图层到目标ImageryLayer2图层的上方位置显示

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `currentLayerId` | `string` | 是 | - | 当前ImageryLayer2图层对象的ID，即设置成功后此图层会在目标图层的上方位置显示 |
| `targetLayerId` | `string` | 是 | - | 目标ImageryLayer2图层对象的ID |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetDrawOrder

```js
//遮住广东省
fdapi.imageryLayer2.setDrawOrder("wmts1", "wmts2");
```

---

### `show(ids, fn)` {#show}

显示一个或多个ImageryLayer2图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | ImageryLayer2对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.imageryLayer2.show(["wmts2", "wmts1"]);
```

---

### `showAll(fn)` {#showAll}

显示所有ImageryLayer2图层对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.imageryLayer2.showAll();
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
await fdapi.imageryLayer2.updateEnd();
```
