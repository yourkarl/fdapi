---
title: Cesium3DTileset
sidebar_label: Cesium3DTileset
description: "加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。"
---

# Cesium3DTileset

加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。

通过 `api.cesium3DTileset` 访问。
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Cesimu3DTileset接口可以用来添加3dtiles服务，3dtiles服务是cesium推出的一个服务标准，同时也已纳入OGC标准规范，跟Arcgis的I3S和超图的S3M类似，是目前主流的三维GIS数据的服务标准。谷歌通过Google Maps Platform 的 Map Tiles API​ 正式提供 Photorealistic 3D Tiles，格式也是OGC 3D Tiles标准。用于加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。
- **别名 / 不同行业叫法**：3DTiles 图层 / Cesium三维网络图层服务 / b3dm 倾斜模型服务 / Cesium 三维服务图层。
- **适用行业**：智慧城市、测绘 GIS、智慧园区、应急管理、智慧交通。
- **使用场景**：
  - 加载大范围城市级倾斜摄影或精模三维瓦片服务，构建城市数字底座。
  - 接入第三方厂商或自建切片服务发布的 3DTiles 数据，实现跨平台三维数据共享。
  - 通过 offset 偏移微调三维瓦片与地形、底图的空间套合。
- **注意事项**：
  - 数据通过网络流式加载，add 方法存在加载耗时，focus/定位等操作建议在加载完成后或延时执行。
  - 海量瓦片对显存与带宽要求较高，注意控制同屏加载的服务数量与可见层级。
  - 需关注服务发布坐标系与工程坐标系是否一致，必要时通过偏移与重投影对齐。
  - 坐标系：3dtiles服务默认是wgs84地理坐标系，如果当前工程也是地理坐标系（wgs84或cgs2000）可以直接加载，如果工程坐标系是PCS投影坐标系，也可以加载，系统会自动完成实时重投影，但是如果工程没有指定坐标系，或者说是Unknown坐标系，则无法加载。
  - 目前支持3dtiles的版本包括6.x和7.x版本

## 构造函数

```js
new Cesium3DTileset()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Cesium3DTileset对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 删除场景中所有的Cesium3DTileset | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Cesium3DTileset对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取Cesium3DTileset的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏Cesium3DTileset | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有Cesium3DTileset | 一键隐藏全部对象 |
| [`setTileURL`](#setTileURL) | 设置URL |  |
| [`show`](#show) | 显示Cesium3DTileset | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有Cesium3DTileset | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个Cesium3DTileset对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Cesium3DTileset对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `tileURL` | `string` | 是 | - | 服务URL地址 |
| `enableLighting` | `boolean` | 否 | true | 可选，服务是否参与光照，默认值：true |
| `offset` | `array` | 否 | [0,0,0] | 可选，基于原始位置的偏移量，默认值：[0,0,0]，单位：米 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
fdapi.cesium3DTileset.clear();
let o = {
    id: 'fd1',
    offset: [0, 0, 0], //偏移
    enableLighting: false, //可选，服务是否参与光照，默认值：true
    tileURL: '' //cesium3DTileset服务地址 请先替换参数
};
//注意：此add方法需要网络加载耗时 
//await fdapi.cesium3DTileset.add(o);
//延时1s执行focus
//window.setTimeout(focus,1000);

function focus() {
    fdapi.cesium3DTileset.focus(o.id);
}
```

---

### `clear(fn)` {#clear}

删除场景中所有的Cesium3DTileset

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.cesium3DTileset.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Cesium3DTileset对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的Cesium3DTileset对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.cesium3DTileset.delete('fd1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Cesium3DTileset对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.cesium3DTileset.focus('fd1');
```

---

### `get(ids, fn)` {#get}

根据ID获取Cesium3DTileset的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的Cesium3DTileset对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
Cesium3DTileset的详细信息
{
        id: 'fd1',
        tileURL: ''
        }
```

> 示例：Get

```js
fdapi.cesium3DTileset.get('fd1');
```

---

### `hide(ids, fn)` {#hide}

隐藏Cesium3DTileset

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Cesium3DTileset对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.cesium3DTileset.hide('fd1');
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有Cesium3DTileset

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.cesium3DTileset.hideAll();
```

---

### `setTileURL(id, newVal, fn)` {#setTileURL}

设置URL

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 字符串类型的ID |
| `newVal` | `string` | 是 | - | 新值 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.cesium3DTileset.setTileURL('对象ID', '示例值');
```

---

### `show(ids, fn)` {#show}

显示Cesium3DTileset

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Cesium3DTileset对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.cesium3DTileset.show('fd1');
```

---

### `showAll(fn)` {#showAll}

显示所有Cesium3DTileset

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.cesium3DTileset.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个Cesium3DTileset对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，请参考add方法 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let o = {
    id: 'fd1',
    tileURL: '' //cesium3DTileset服务地址
}
//await fdapi.cesium3DTileset.update(o);
//fdapi.cesium3DTileset.focus(o.id);
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
await fdapi.cesium3DTileset.updateEnd();
```
