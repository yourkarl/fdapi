---
title: ImageryLayer
sidebar_label: ImageryLayer
description: "加载与管理 WMTS、WMS、MapServer 等网络地图服务图层，将卫星影像、电子地图等作为场景底图叠加，可批量添加并支持坐标系、切片方案等参数配置。"
---

# ImageryLayer

ImageryLayer 网络图层相关的操作方法，包含WMS、WMTS、MapServer等服务类型

通过 `api.imageryLayer` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：加载与管理 WMTS、WMS、MapServer 等网络地图服务图层，将卫星影像、电子地图等作为场景底图叠加，可批量添加并支持坐标系、切片方案等参数配置。
- **别名 / 不同行业叫法**：影像图层 / 底图 / 卫星影像 / 电子地图底图 / OGC 网络图层 / 瓦片地图服务。
- **适用行业**：智慧城市、测绘 GIS、智慧交通、应急管理、智慧水利。
- **使用场景**：
  - 加载 ArcGIS MapServer、天地图等服务作为城市三维场景的二维影像/电子地图底图。
  - 同时叠加多个影像与注记服务，构建影像+矢量注记的复合底图。
  - 为业务专题图层提供地理参考背景底图。
- **注意事项**：
  - 适用于平面投影坐标系工程；球面坐标系下应使用 ImageryLayer2 / GlobeTerrain。
  - url 模板需正确包含 \{TileMatrix\}\{TileRow\}\{TileCol\} 等变量，xmlPath、layerName、坐标系等不传时会尝试从 init() 自动获取。
  - 需确保服务坐标系（ogcEPSG）与工程坐标系一致，避免底图错位。

## 构造函数

```js
new ImageryLayer()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `add` | 添加一个或多个网络地图服务，如WMTS/WMS服务等网络图层服务 | 向场景批量添加对象 |
| `addVTPK` | 给图层服务叠加显示对应VTPK标注 |  |
| `delete` | 删除一个或多个ImageryLayer图层对象 | 按 ID 移除指定对象 |
| `deleteVTPK` | 删除叠加的VTPK标注 |  |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `hide` | 隐藏一个或多个ImageryLayer图层对象 | 按业务条件隐藏对象 |
| `init` | 添加图层服务前需要先初始化相关参数 |  |
| `setDrawBottom` | 设置ImageryLayer图层置底显示 |  |
| `setDrawOrder` | 设置两个ImageryLayer图层的绘制顺序，即移动当前ImageryLayer图层到… |  |
| `setDrawTop` | 设置ImageryLayer图层置顶显示 |  |
| `setVTPKVisable` | 设置叠加的VTPK标注可见性 |  |
| `show` | 显示一个或多个ImageryLayer图层对象 | 按业务条件显示对象 |
| `updateBegin` | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| `updateEnd` | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)`

添加一个或多个网络地图服务，如WMTS/WMS服务等网络图层服务

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 图层服务的对象，可以是Object类型或Array类型，对于每一个图层服务对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选，图层服务字符串类型的ID |
| `url` | `string` | 必选，WMTS/WMS服务的URL地址，例如WMTS GetTile操作的基本URL（用于KVP编码的请求）或tile-URL模板（用于RESTful请求）。 tile-URL模板应包含以下变量:&#123;style&#125;，&#123;TileMatrixSet&#125;，&#123;TileMatrix&#125;，&#123;TileRow&#125;，&#123;TileCol&#125;。如果实际值是硬编码的，或者服务器不需要，则前两个是可选的。 &#123;s&#125;关键字可用于指定子域。 |
| `xmlPath` | `string` | 可选，获取OGC标准服务的元数据能力文档（Capabilities XML文档）的URL地址，需包含图层、瓦片规则、请求参数等信息，不传则默认从init()方法获取 |
| `layerName` | `string` | 可选，图层名称，不传则默认从init()方法获取 |
| `tileMatrixName` | `string` | 可选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型，不传则默认从init()方法获取 |
| `ogcEPSG` | `string` | 可选，坐标系类型，不传则默认从init()方法获取 |

> 示例：Add

```js
//以下代码为内网示例服务地址 请先修改为自己需调用的真实地址
let arr = [];
let wmts1 = {
    id: 'wmts1',
    url: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}'
}
arr.push(wmts1);
let wmts2 = {
    id: 'wmts2',
    url: 'https://192.168.1.19:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}'
}
arr.push(wmts2);
//fdapi.imageryLayer.add(arr);


//example2 图层支持叠加 无需init直接添加 需指定相关可选参数 
let wmts3 = {
    id: 'wmts3',
    url: 'https://192.168.1.19:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}',
    xmlPath: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/WMTS/1.0.0/WMTSCapabilities.xml',//必选，xml协议的url路径
    layerName: 'shenzhenmapV10x',//必选，图层名称
    tileMatrixName: 'default028mm',//必选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型
    ogcEPSG: 'EPSG:4547',//必选，坐标系类型
};
//fdapi.imageryLayer.add(wmts3);
```

---

### `addVTPK(tileLayerId, fn)`

给图层服务叠加显示对应VTPK标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | VTPK服务对应图层树上的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：AddVTPK

```js
//图层上上VTPK的ID
let tileLayerId = "";
//fdapi.imageryLayer.addVTPK(tileLayerId);
```

---

### `delete(ids, fn)`

删除一个或多个ImageryLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的ImageryLayer对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.imageryLayer.delete(['wmts1', 'wmts2']);
```

---

### `deleteVTPK(tileLayerId, fn)`

删除叠加的VTPK标注

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | VTPK服务对应图层树上的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：DeleteVTPK

```js
//图层上上VTPK的ID
let tileLayerId = "";
//fdapi.imageryLayer.deleteVTPK(tileLayerId);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ImageryLayer图层对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.imageryLayer.focus('wmts1');
```

---

### `hide(ids, fn)`

隐藏一个或多个ImageryLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ImageryLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.imageryLayer.hide(['wmts1', 'wmts2']);
```

---

### `init(option, fn)`

添加图层服务前需要先初始化相关参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `option` | `object` | 初始化对象，包含图层初始化环境配置和图层范围信息 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`option` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `xmlUrl` | `string` | 必选，获取OGC标准服务的元数据能力文档（Capabilities XML文档）的URL地址，需包含图层、瓦片规则、请求参数等信息 |
| `layerName` | `string` | 必选，图层名称 |
| `tileMatrixName` | `string` | 必选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型 |
| `ogcEPSG` | `string` | 必选，坐标系类型 |
| `cachePath` | `string` | 必选，缓存路径 |
| `mapMode` | `boolean` | 必选，大地图true，小地图false，默认：小地图false |
| `renderMode` | `number` | 必选，渲染模式，取值范围：0：正常（默认值）；1：透明；2：标注；3：贴地 |

> 示例：Init

```js
let option = {
    xmlUrl: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/WMTS/1.0.0/WMTSCapabilities.xml',//必选，xml协议的url路径
    layerName: 'shenzhenmapV10x',//必选，图层名称
    tileMatrixName: 'default028mm',//必选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型
    ogcEPSG: 'EPSG:4547',//必选，坐标系类型
    cachePath: ':memory:',//必选，默认缓存路径
    mapMode: true,//必选，大地图true，小地图false
    renderMode: 0 // 必选，渲染模式，取值范围：0：正常（默认值）；1：透明；2：标注；3：贴地
};
//await fdapi.imageryLayer.init(option);
```

---

### `setDrawBottom(id, fn)`

设置ImageryLayer图层置底显示

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 置于底部显示的ImageryLayer图层对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetDrawBottom

```js
fdapi.imageryLayer.setDrawBottom("wmts1");
```

---

### `setDrawOrder(currentLayerId, targetLayerId, fn)`

设置两个ImageryLayer图层的绘制顺序，即移动当前ImageryLayer图层到目标ImageryLayer图层的上方位置显示

| 参数 | 类型 | 说明 |
|------|------|------|
| `currentLayerId` | `string` | 当前ImageryLayer图层对象的ID，即设置成功后此图层会在目标图层的上方位置显示 |
| `targetLayerId` | `string` | 目标ImageryLayer图层对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetDrawOrder

```js
fdapi.imageryLayer.setDrawOrder("wmts3", "wmts1");
```

---

### `setDrawTop(id, fn)`

设置ImageryLayer图层置顶显示

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 置于顶部显示的ImageryLayer图层对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetDrawTop

```js
fdapi.imageryLayer.setDrawTop("wmts2");
```

---

### `setVTPKVisable(tileLayerId, visible, fn)`

设置叠加的VTPK标注可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | VTPK服务对应图层树上的ID |
| `visible` | `boolean` | 服务可见性，布尔类型 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetVTPKVisable

```js
//图层上上VTPK的ID
let tileLayerId = "";
//fdapi.imageryLayer.setVTPKVisable(tileLayerId,false);
```

---

### `show(ids, fn)`

显示一个或多个ImageryLayer图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | ImageryLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.imageryLayer.show(['wmts1', 'wmts2']);
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

> 示例代码如下