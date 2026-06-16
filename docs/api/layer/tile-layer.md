---
title: TileLayer
sidebar_label: TileLayer
description: "TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。"
---

# TileLayer

TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。

通过 `api.tileLayer` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。
- **别名 / 不同行业叫法**：3DTiles / 倾斜摄影模型 / 实景三维 / 白模 / BIM 图层 / 瓦片模型。
- **适用行业**：智慧城市与实景三维、智慧园区、规划设计、智慧水利、能源
- **使用场景**：
  - 城市级实景三维底座的加载与浏览
  - 建筑/部件单体化与点选高亮
  - 专题样式着色与剖切分析
- **注意事项**：
  - 海量瓦片依赖 LOD 与缓存，注意带宽与显存
  - 坐标与高程基准需对齐
  - 单体化能力取决于数据是否已切分



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `add` | 添加一个或多个TileLayer对象 | 向场景批量添加对象 |
| `addHole` | 根据挖洞多边形的坐标添加一个或多个挖洞操作， |  |
| `addHoleByShapeFile` | 根据shapeFile添加一个或多个挖洞操作 |  |
| `addModifier` | 添加一个压平操作 |  |
| `addModifierByShapeFile` | 根据shapeFile添加一个或多个压平操作 |  |
| `addModifiers` | 根据多边形的坐标添加一个或多个压平操作， |  |
| `clear` | 清空接口添加的所有图层对象 | 清空全部对象，重置图层 |
| `clearHole` | 清空所有挖洞操作 |  |
| `clearModifier` | 清空所有压平操作 |  |
| `createQuery` | 创建数据库查询条件对象 |  |
| `delete` | 删除一个或多个TileLayer对象 | 按 ID 移除指定对象 |
| `deleteHole` | 删除一个挖洞操作 |  |
| `deleteModifier` | 删除一个压平操作 |  |
| `disableClip` | 禁止TileLayer图层参与剖切 |  |
| `disableXRay` | 禁用X光 |  |
| `enableClip` | 设置TileLayer图层参与剖切 |  |
| `enableDecal` | 设置贴花类型对象是否支持贴合TileLayer图层，影响的贴花类型对象包含：Decal、… |  |
| `enableFluid` | 设置图层对水流体对象Fluid的支持， |  |
| `enableImageLayerDecal` | 设置指定图层是否支持对网络图层服务(WMTS、WMS、MVT等)进行贴合 |  |
| `enableXRay` | 启用X光， |  |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `focusActor` | 定位一个Actor |  |
| `focusActors` | 定位一个或多个Actor |  |
| `get` | 根据ID获取TileLayer的详细信息 | 查询对象信息，用于业务联动 |
| `getActorInfo` | 通过OID查询Actor的矩阵和bound等信息 |  |
| `getActorInfoFromDB` | 从空间数据库获取TileLayer下指定Actor的详细属性信息 |  |
| `getAllFlattenInfo` | 查询所有图层是否支持压平 |  |
| `getCollision` | 查询图层包含的碰撞检测信息 |  |
| `getDBTabID` | 设置点云盒子的颜色， |  |
| `getObjectIDs` | 获取指定TileLayer包含的所有Actor对象的ID |  |
| `hide` | 隐藏TileLayer图层 | 按业务条件隐藏对象 |
| `hideActor` | 隐藏Actor |  |
| `hideActors` | 隐藏一个或多个Actor |  |
| `hideAllActors` | 隐藏指定tilelayer的所有Actor |  |
| `highlightActor` | 高亮一个Actor， |  |
| `highlightActors` | 高亮多个Actor，同时支持高亮多个图层的Actor |  |
| `highlightActorsWithColor` | 使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor |  |
| `highlightActorWithColor` | 使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor |  |
| `highlightPoints` | 根据点云的属性字段值高亮点云匹配到点 |  |
| `query` | 根据TileLayer的ID在PG数据库中查询 |  |
| `setAltitudeHeatMap` | 根据海拔高度设置TileLayer的分层热力样式， |  |
| `setCollision` | 设置TileLayer是否参与碰撞检测 |  |
| `setFileName` | 修改TileLayer图层的3dt文件路径 |  |
| `setLocation` | 设置平移 |  |
| `setPointCloudBoxVisible` | 设置点云盒子的可见性， |  |
| `setPointCloudSize` | 设置TileLayer图层的点云大小， |  |
| `setPointCloudStyle` | 根据点云的属性字段来设置点云模型的渲染颜色 |  |
| `setRotation` | 设置旋转 |  |
| `setScale` | 设置缩放 |  |
| `setStyle` | 设置TileLayer的样式 |  |
| `setViewHeightRange` | 设置TileLayer图层的可视高度范围 |  |
| `setViewportVisible` | 多视口状态下，设置图层在各视口的可见性 |  |
| `show` | 显示TileLayer图层 | 按业务条件显示对象 |
| `showActor` | 显示Actor |  |
| `showActors` | 显示一个或多个Actor |  |
| `showAllActors` | 显示指定tilelayer的所有Actor |  |
| `unHighlightActor` | 取消高亮一个Actor |  |
| `unHighlightActors` | 停止高亮多个Actor，同时支持停止高亮多个图层的Actor |  |
| `unHighlightAllActors` | 停止高亮所有Actor |  |
| `unHighlightAllPoints` | 取消高亮点云包含所有点的高亮效果 |  |
| `unHighlightPoints` | 根据点云的属性字段值取消高亮 |  |
| `update` | 修改一个或多个TileLayer对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |
| `updateBegin` | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| `updateEnd` | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |
| `updateHole` | 修改一个挖洞操作 |  |
| `updateModifier` | 修改一个压平操作 |  |
| `updateRecord` | 更新TileLayer关联的数据库记录 |  |

## 方法（Methods）

### `add(data, fn)`

添加一个或多个TileLayer对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `fileName` | `string` | 3dt文件路径，推荐使用@path 方式管理添加3dt图层资源 |
| `password` | `string` | 可选，3dt文件路径的私有秘钥 |
| `wkt` | `string` | 可选，球面坐标系下支持对倾斜摄影类型的3dt进行重投影，格式支持EPSG编码如："EPSG:4547"或常规的wkt字符串 |
| `visible` | `boolean` | 可选，添加后是否可见，默认值：true 可见 |
| `viewHeightRange` | `array` | 可选，可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |
| `releaseWhenHidden` | `boolean` | 可选，隐藏图层时是否释放资源，默认值：false 不释放 |
| `location` | `array` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，注意：如果工程是球面坐标系则此参数相当于offset，仅表示图层位置的偏移量，非坐标值，单位：米 |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `scale` | `array` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |

> 示例：从文件添加TileLayer图层：Add

```js
fdapi.tileLayer.delete('1');
await fdapi.tileLayer.add({
    id: '1',
    fileName: HostConfig.Path + "/assets/3dt/terrain.3dt",//3dt文件路径
    location: [0, 0, 0],//坐标位置
    rotation: [0, 0, 0],//旋转角度
    scale: [1, 1, 1]    //缩放大小
});
fdapi.tileLayer.focus('1', 18000);
```

---

### `addHole(data, fn)`

根据挖洞多边形的坐标添加一个或多个挖洞操作，注意：同时只能对一个图层id进行挖洞操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 挖洞操作唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `coordinates` | `array` | 挖洞多边形的坐标数组，二维数组，数组元素类型：挖洞多边形的坐标，[取值示例](/docs/tutorials/coordinates) |
| `innerRings` | `array` | 挖洞多边形的内环，三维数组，数组元素类型：挖洞多边形的坐标数组 |
| `isReverseCut` | `boolean` | 挖洞多边形是否反转，默认值：false |

> 示例代码如下：

```js
await fdapi.tileLayer.addHole(data);
```

---

### `addHoleByShapeFile(data, fn)`

根据shapeFile添加一个或多个挖洞操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | TileLayer对象的ID |
| `shapeFilePath` | `string` | shapeFilePath文件路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |

> 示例代码如下：

```js
await fdapi.tileLayer.addHoleByShapeFile(data);
```

---

### `addModifier(id, tileLayerId, coordinates, ententBufferSize, fn)`

添加一个压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `coordinates` | `array` | 压平多边形的坐标，[取值示例](/docs/tutorials/coordinates) |
| `ententBufferSize` | `number` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.addModifier(id, tileLayerId, coordinates, ententBufferSize);
```

---

### `addModifierByShapeFile(data, fn)`

根据shapeFile添加一个或多个压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 压平操作唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `shapeFilePath` | `string` | shapeFilePath文件路径，支持本地路径和网络路径，[资源引入说明](/docs/tutorials/resources) |

> 示例代码如下：

```js
await fdapi.tileLayer.addModifierByShapeFile(data);
```

---

### `addModifiers(data, fn)`

根据多边形的坐标添加一个或多个压平操作，注意：同时只能对一个图层id进行压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 压平操作唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `coordinates` | `array` | 压平多边形的坐标数组，二维数组，数组元素类型：压平多边形的坐标，[取值示例](/docs/tutorials/coordinates) |
| `innerRings` | `array` | 压平多边形的内环，三维数组，数组元素类型：压平多边形的坐标数组 |
| `ententBufferSize` | `number` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |

> 示例代码如下：

```js
await fdapi.tileLayer.addModifiers(data);
```

---

### `clear(fn)`

清空接口添加的所有图层对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：清空TileLayer：Clear

```js
fdapi.tileLayer.clear();
```

---

### `clearHole(ids, fn)`

清空所有挖洞操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer对象的ID或数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.clearHole(ids);
```

---

### `clearModifier(ids, fn)`

清空所有压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer对象的ID或数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.clearModifier(ids);
```

---

### `createQuery()`

创建数据库查询条件对象

**返回：** QueryOption类的对象

> 示例代码如下：

```js
await fdapi.tileLayer.createQuery();
```

---

### `delete(ids, fn)`

删除一个或多个TileLayer对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的TileLayer对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：删除TileLayer图层：Delete

```js
fdapi.tileLayer.delete('1');
```

---

### `deleteHole(id, tileLayerId, fn)`

删除一个挖洞操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.deleteHole(id, tileLayerId);
```

---

### `deleteModifier(id, tileLayerId, fn)`

删除一个压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.deleteModifier(id, tileLayerId);
```

---

### `disableClip(ids, fn)`

禁止TileLayer图层参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | TileLayer的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.disableClip(ids);
```

---

### `disableXRay(ids, fn)`

禁用X光

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | TileLayer的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：停用X光效果：DisableXRay

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.disableXRay(villaId);
```

---

### `enableClip(ids, fn)`

设置TileLayer图层参与剖切

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | TileLayer的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.enableClip(ids);
```

---

### `enableDecal(data, fn)`

设置贴花类型对象是否支持贴合TileLayer图层，影响的贴花类型对象包含：Decal、HeatMap、Polyline、Polygon、GeoJSONLayer，

**注意：若需要设置ImageryLayer网络图层的贴合支持，请使用fdapi.tileLayer.enableImageLayerDecal(data)方法**

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | 图层Id |
| `enable` | `boolean` | 图层是否支持对贴花类型对象的贴合 |

> 示例代码如下：

```js
await fdapi.tileLayer.enableDecal(data);
```

---

### `enableFluid(data, fn)`

设置图层对水流体对象Fluid的支持，注意：设置false不支持时则水流体的物理碰撞会忽略此图层

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | 图层Id |
| `supportFluid` | `boolean` | 图层是否支持水流体对象Fluid，默认值：true |

> 示例：打开支持流体仿真功能：EnableFluid

```js
//控制图层是否支持水流体效果
fdapi.tileLayer.enableFluid([
    {
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
        "supportFluid": false //关闭图层对水流体效果的支持
    }
]);
```

---

### `enableImageLayerDecal(data, fn)`

设置指定图层是否支持对网络图层服务(WMTS、WMS、MVT等)进行贴合

**注意：若需要设置所有对象和地形的贴合控制，请使用设置方法： fdapi.settings.setImageryLayerEnableDecal(1);**

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | 图层ID |
| `enable` | `boolean` | 网络图层服务是否贴合该3dt图层 |

> 示例代码如下：

```js
await fdapi.tileLayer.enableImageLayerDecal(data);
```

---

### `enableXRay(ids, color, fn)`

启用X光，效果图如下：



![](/img/refdoc/api/TileLayer.EnableXRay.png)

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `number \| array` | TileLayer的ID或者ID数组 |
| `color` | [`Color`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：启用X光效果：EnableXRay

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.enableXRay(villaId, [1, 1, 1, 0.0381]);
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：定位TileLayer：Focus

```js
fdapi.tileLayer.focus('1');
```

---

### `focusActor(id, objectId, distance, flyTime, rotation, fn)`

定位一个Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.focusActor(id, objectId, distance, flyTime, rotation);
```

---

### `focusActors(data, distance, flyTime, rotation, fn)`

定位一个或多个Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object` | 数据对象，对象支持以下属性： |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |

> 示例代码如下：

```js
await fdapi.tileLayer.focusActors(data, distance, flyTime, rotation);
```

---

### `get(ids, fn)`

根据ID获取TileLayer的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的TileLayer对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回TileLayer的详细信息
{
            "id":	"1",
            "groupId":	"",
            "userData":	"",
            "dbTabId": "", //存储在空间数据库的tileLayer对应的数据库表id
            "fileName":	"G:\\TEMP\\Explorer\\SDK\\JS\\media\\project\\demo_files\\SDKDemo.3dt",
            "location":	[174.309998, -589.890015, 0.000000],
            "rotation":	[0.000000, 0.000000, 0.000000],
            "scale":	[1.000000, 1.000000, 1.000000],
            "minVisibleHeight": 1, //最小可见高度
            "maxVisibleHeight": 100000,//最大可见高度
            "bFlattenSupported": 0 //图层是否支持压平
            "bbox":	[-501384.875000, -1520.400024, -1499.900024, -498384.875000, 1479.599976, 1500.099976] //三维图层包围盒
        }
```

> 示例：获取TileLayer图层信息：Get

```js
fdapi.tileLayer.get('1');
```

> 示例：查询所有图层是否支持压平：GetAllFlattenInfo

```js
//查询所有图层是否支持压平
fdapi.tileLayer.getAllFlattenInfo();
```

---

### `getActorInfo(data, fn)`

通过OID查询Actor的矩阵和bound等信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 对象或数组类型，如果是数组类型，对于每个数组元素，有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer对象的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID字符串（单个或者数组） |

```js
fdapi.tileLayer.getActorInfo({
            id: 1,
            objectIds: ["SM_outdoor_wall_01_2"]
        });
```

> 示例：查询Actor的矩阵和bound信息：GetActorInfo

```js
fdapi.tileLayer.getActorInfo({
    id: villaId,
    objectIds: [
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea1b",
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea21",
        "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea29",
        "2fc77d67-1af0-4a43-aa66-c544d411df04-000690ee",
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-0007692f"
    ]
});
```

---

### `getActorInfoFromDB(data, fn)`

从空间数据库获取TileLayer下指定Actor的详细属性信息 注意:调用前需先配置Explorer里空间库的对应信息，配置示例如下图：



![](/img/refdoc/api/TileLayer.getInformation.png)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `array \| object` | 对象或数组类型，如果是数组类型，每个元素有以下属性：tileLayerId, objectIds |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `tileLayerId` | `string` | TileLayer对象的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID字符串（单个或者数组） |

```js
    //getActorInfoFromDB方法的参数可以是object或者array
			fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": "91B748AB429AF0823D12EEBFA6334EBF", "objectIds":["SM1","SM2","SM3"] },{ "tileLayerId": "6388C5CC461B85523F69C2B04144BF2E", "objectIds":["Floor1","Floor2"] }]);
```

> 示例：查询空间库的Actor信息：GetActorInfoFromDB

```js
//注意：调用前请先保证模型属性信息入库并配置数据库连接信息或已生成sdb文件并和模型3dt存放同级目录，目前只支持bim模型属性查询，具体请参考API文档
fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": villaId, "objectIds": ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce", "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856"] }]);
```

---

### `getAllFlattenInfo(fn)`

查询所有图层是否支持压平

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回所有TileLayer是否支持压平
[{
            "id":	"0",
            "bFlattenSupported":	0 //不支持压平
        },{
            "id":	"1",
            "bFlattenSupported":	1 //支持压平
        },{
            "id":	"1",
            "bFlattenSupported":	1 //支持压平
        }]
```

---

### `getCollision(tileLayerIds, fn)`

查询图层包含的碰撞检测信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
[{
            "id":	"E637D8FE42335EE96C58A1840BCAD0CE",
            "enabled":	1,
            "mouseInteract":	1,
            "mouseFunction":	1,
            "characterCollision":	1
        }]
```

---

### `getDBTabID(data, fn)`

设置点云盒子的颜色，注意：仅Box渲染模式下生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) `setPointCloudBoxColor(data, fn){ data = ac_utils.makeArray(data); if(data instanceof Array){ for(let i=0;i<data.length;i++){ data[i].bCustomColor = true; data[i].customColor = data[i].color; } } return this.int.call({ 'command': CommandType.TileLayer_PointCloud_Highlight, 'data': data }, fn); }` |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 点云图层的Id |
| `name` | `string` | 点云图层包含的字段名称 |
| `values` | `array` | 点云图层包含的字段名称对应的取值数组，支持多个匹配到的值 |
| `color` | `number` | 匹配到的box盒子待设置的颜色 |

> 示例代码如下：

```js
await fdapi.tileLayer.getDBTabID(data);
```

---

### `getObjectIDs(ids, fn)`

获取指定TileLayer包含的所有Actor对象的ID

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回TileLayer的所有ObjectID信息结构示例
[{
            "id":	"1",
            "objectIds":	["WorldSettings", "Brush_0", "SM_colum_02_2", "SM_colum_3", "SM_floor_130", "SM_floor_195", "SM_floor_313", "SM_floor_352", "SM_colum_24", "SM_colum_25", "SM_floor_399", "SM_Road_04_5", "SM_Road_05_8", "SM_Road_5", "SM_Road_6", "SM_floor_400", "SM_floor_401", "SM_floor_402", "SM_floor_403", "SM_entrance_roof_01_11", "P_raunfall2", "P_raunfall4", "SM_pot_4", "SM_pot_9", "PointLight13", "PointLight14", "SM_wall_30", "SM_main_door_02_2", "SM_main_door_3", "SM_wall_51", "SM_outdoor_wall_01_2", "SM_column_04_2", "SM_column_24", "SM_column_29", "SM_column_35", "SM_ATM_4", "SM_wall_140", "SM_wall_141", "SM_wall_142", "SM_floor_01_28", "SM_floor_2", "SM_floor_3", "SM_floor_4", "SM_floor_5", "SM_floor_6", "SM_floor_7", "SM_floor_8", "SM_floor_9", "SM_floor_10", "SM_floor_11", "SM_floor_12", "SM_floor_03_414", "SM_floor_05_15", "SM_floor_06_57", "SM_sofa_3", "SM_sofa_4", "Palm_01_30", "Palm_02_33", "Palm_04_36", "Palm_03_39", "SM_pot_5", "SM_pot_6", "SM_pot_7", "SM_pot_8", "SM_reception_01_2", "PointLight22", "PointLight23", "PointLight24", "PointLight27", "SM_column_03_17", "SM_column_4", "SM_column_5", "SM_wall_55", "SM_wall_56", "SM_wall_57", "PointLight38", "PointLight69", "SM_elevator_glass_fence_31", "SM_colum_13", "SM_colum_20", "SM_glass_window_01_4", "SM_glass_window_2", "SM_glass_window_3", "SM_glass_window_4", "SM_glass_window_5", "SM_elevator_wall_03_15", "SM_table_3", "SM_table_4", "SM_bed_6", "SM_bed_7", "SM_ATM_01_2", "DecalActor75_2", "DecalActor77", "SM_wall_352", "SM_ATM_6", "EmergencyRoom_C_3"]
        }]
```

> 示例：获取指定TileLayer包含的所有Actor对象的ID：GetObjectIDs

```js
//查询小别墅包含的构件id
fdapi.tileLayer.getObjectIDs(villaId);
```

---

### `hide(ids, fn)`

隐藏TileLayer图层

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：隐藏TileLayer图层：Hide

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

fdapi.tileLayer.hide(villaId);
```

---

### `hideActor(id, objectId, fn)`

隐藏Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.hideActor(id, objectId);
```

---

### `hideActors(data, fn)`

隐藏一个或多个Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |

> 示例代码如下：

```js
await fdapi.tileLayer.hideActors(data);
```

---

### `hideAllActors(tileLayerIds)`

隐藏指定tilelayer的所有Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer的ID或ID数组 |

> 示例代码如下：

```js
await fdapi.tileLayer.hideAllActors(tileLayerIds);
```

---

### `highlightActor(id, objectId, fn)`

高亮一个Actor，效果图如下：



![](/img/refdoc/api/tilelayer.HighlightActor.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.highlightActor(id, objectId);
```

---

### `highlightActors(data, fn)`

高亮多个Actor，同时支持高亮多个图层的Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |

> 示例代码如下：

```js
await fdapi.tileLayer.highlightActors(data);
```

---

### `highlightActorsWithColor(data, fn)`

使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |
| `color` | [`Color`](/docs/api/types#color) | Actor的高亮颜色，默认值:Color.Blue，支持四种格式，[取值示例](/docs/tutorials/color) |
| `bWireframe` | `boolean` | 高亮时是否使用线框模式，默认值：true，设置为false则是填充模式 |

> 示例代码如下：

```js
await fdapi.tileLayer.highlightActorsWithColor(data);
```

---

### `highlightActorWithColor(id, objectId, color, bWireframe, fn)`

使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `color` | [`Color`](/docs/api/types#color) | Actor的高亮颜色，默认值:Color.Blue，支持四种格式，[取值示例](/docs/tutorials/color) |
| `bWireframe` | `boolean` | 高亮时是否使用线框模式，默认值：true，设置为false则是填充模式 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.highlightActorWithColor(id, objectId, color, bWireframe);
```

---

### `highlightPoints(data, fn)`

根据点云的属性字段值高亮点云匹配到点

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 点云图层的Id |
| `name` | `string` | 点云图层包含的字段名称 |
| `values` | `array` | 点云图层包含的字段名称对应的取值数组，支持高亮多个匹配到的值 |
| `glow` | `boolean` | 高亮时是否闪烁，默认值：true |
| `bCustomColor` | `boolean` | 是否开启自定义颜色，默认值：false |
| `color` | [`Color`](/docs/api/types#color) | 自定义颜色值，仅当bCustomColor开启后自定义颜色生效，默认值:Color.White，支持四种格式，[取值示例](/docs/tutorials/color) |

> 示例：高亮点云对应的特征值点(仅对点云模型生效)：HighlightPoints

```js
fdapi.tileLayer.highlightPoints([{
    id: "pcs",
    name: "oid",
    values: ["1", "3", "6", "9", "5839", "5849", "5859"],
    glow: false,
    bCustomColor: true,
    color: [1, 0, 0, 1]
}]);
```

---

### `query(queryOption, fn)`

根据TileLayer的ID在PG数据库中查询

| 参数 | 类型 | 说明 |
|------|------|------|
| `queryOption` | `QueryOption` | 查询条件对象 请参考： [`QueryOption`](/docs/api/analysis/query-option) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.query(queryOption);
```

---

### `setAltitudeHeatMap(tileLayerIds, colors, fn)`

根据海拔高度设置TileLayer的分层热力样式，注意：如果是球面坐标系工程，则使用Engine发布3dt图层时需要添加 -terUserHotMap 参数才可以支持热力样式

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer的ID或ID数组 |
| `colors` | `array` | 颜色分层调色板数组，数组包含的每一个对象包含高度属性和对应颜色值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`colors` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `value` | `number` | 3dt图层的高度 |
| `color` | `array` | 高度对应的颜色值，示例：[1,0,0,1] |

> 示例代码如下：

```js
await fdapi.tileLayer.setAltitudeHeatMap(tileLayerIds, colors);
```

---

### `setCollision(tileLayerIds, enabled, mouseInteract, mouseFunction, characterCollision, fn)`

设置TileLayer是否参与碰撞检测

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer对象的ID或ID数组 |
| `enabled` | `boolean` | 是否开启碰撞检测的总开关，如果此参数设置为false，则下面三个参数均会失效 |
| `mouseInteract` | `boolean` | 是否开启鼠标交互，默认值：true 开启 |
| `mouseFunction` | `boolean` | 是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等，默认值：true 开启 |
| `characterCollision` | `boolean` | 是否开启角色碰撞，默认值：true 开启角色碰撞 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setCollision(tileLayerIds, enabled, mouseInteract, mouseFunction, characterCollision);
```

---

### `setFileName(id, newVal, fn)`

修改TileLayer图层的3dt文件路径

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `newVal` | `string` | 3dt文件路径 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setFileName(id, newVal);
```

---

### `setLocation(id, newVal, fn)`

设置平移

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `newVal` | `array` | 新的位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setLocation(id, newVal);
```

---

### `setPointCloudBoxVisible(data, fn)`

设置点云盒子的可见性，注意：仅Box渲染模式下生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 点云图层的Id |
| `name` | `string` | 点云图层包含的字段名称 |
| `values` | `array` | 点云图层包含的字段名称对应的取值数组，支持多个匹配到的值 |
| `visible` | `number` | 点云字段匹配到的值的box的可见性，0不可见 1可见 |

> 示例代码如下：

```js
await fdapi.tileLayer.setPointCloudBoxVisible(data);
```

---

### `setPointCloudSize(id, pointCloudSize, fn)`

设置TileLayer图层的点云大小，注意：仅对点云数据转换的3dt图层模型生效

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `pointCloudSize` | `number` | 点云缩放的倍数，取值范围：[0.01~4] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置点云尺寸(仅对点云模型生效)：SetPointCloudSize

```js
//添加点云模型
fdapi.tileLayer.delete('pcs');
await fdapi.tileLayer.add({
    id: 'pcs',
    fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径
    location: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
});
fdapi.tileLayer.focus('pcs', 800);

fdapi.tileLayer.setPointCloudSize('pcs', 1);
```

---

### `setPointCloudStyle(data)`

根据点云的属性字段来设置点云模型的渲染颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 点云图层的Id |
| `collision` | `boolean` | 是否开启碰撞 |
| `renderer` | `object` | 必选，渲染器配置对象参数如下： |
| `renderer.rendererType` | [`RendererType`](/docs/api/types#renderertype) | (`RendererType`) 渲染器类型，包含三种：简单渲染器、唯一值渲染器、分类渲染器 |
| `renderer.materialType` | `number` | 渲染材质类型，取值：[0,1,2]，分别对应三种：X光、Mask不透明、半透明 |
| `renderer.type` | [`VisualType`](/docs/api/types#visualtype) | (`VisualType`) 控制显示的可视化类型枚举 |
| `renderer.renderBox` | `number` | 是否开启盒子模式渲染，取值：[0,1]，默认值：0 |
| `renderer.boxSize` | `array` | 盒子模式下体块的尺寸，即长宽高[X,Y,Z]，单位：米 |
| `renderer.renderBoxWireframe` | `number` | 盒子模式下是否显示线框，取值：[0,1,2]，0不显示 1显示 2仅显示线框（隐藏面） |
| `renderer.wireframeColor` | `color` | 盒子模式下线框的颜色 |
| `renderer.wireThickness` | `number` | 盒子模式下线框的尺寸 |
| `renderer.lightFactor` | `number` | 亮度因子 |
| `renderer.intensity` | `number` | 亮度值 |
| `renderer.frequency` | `number` | 频次 |
| `renderer.splitFactor` | `number` | 点云裂分因子，值越大绘制精度越低，值越小绘制精度则越高（会更消耗显卡资源），取值范围：[0,任意正数] |
| `renderer.autoScaleDepth` | `number` | 盒子模式下，盒子尺寸自动缩放的相机临界深度，取值范围：[0,任意正数] |
| `renderer.field` | `string` | 点云图层包含的属性字段名称 |
| `renderer.fieldType` | [`FieldType`](/docs/api/types#fieldtype) | (`FieldType`) 点云图层包含的属性字段类型，枚举支持数值类型和字符串类型 |
| `renderer.gradient` | `boolean` | 颜色是否差值渐变 |
| `renderer.defaultSymbol` | `object` | 必选，默认符号化配置参数如下： |
| `renderer.symbolType` | `number` | 符号化类型，0 simple-marker圆形点填充 1 simple-line线填充(注意：目前仅支持1px的线宽) 2 simple-fill面填充 3 polygon3d填充 |
| `renderer.size` | `number` | 可选，点的默认尺寸，仅针对simple-marker圆形填充生效； |
| `renderer.height` | `number` | 可选，polygon3d的默认高度，仅针对polygon3d填充生效； |
| `renderer.color` | `array` | 默认填充颜色 |
| `renderer.outline` | `-` | — |
| `renderer.uniqueValueInfos` | `array` | 可选，唯一值渲染器配置数组，对象结构如下： |
| `renderer.value` | `any` | field字段对应值 |
| `renderer.symbol` | `object` | 各唯一值对应的符号化配置对象，结构如下： |
| `renderer.color` | [`Color`](/docs/api/types#color) | 可选，三选一，唯一值对应的颜色 |
| `renderer.size` | `number` | 可选，三选一，唯一值对应的尺寸 |
| `renderer.height` | `number` | 可选，三选一，唯一值对应的高度 |

> 示例：设置点云样式(仅对点云模型生效)：SetPointCloudStyle

```js
//添加点云模型
fdapi.tileLayer.delete('pcs');
fdapi.tileLayer.add({
    id: 'pcs',
    fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径
    location: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
});
fdapi.tileLayer.focus('pcs', 2500);


let size = 128;
let dataRender = {
    id: "pcs",
    collision: true,
    renderer: {
        wireThickness: 0.6,
        lightFactor: 10,
        boxSize: [size, size, size],
        renderBox: 1,
        renderBoxWireframe: 1,
        wireframeColor: [1, 1, 1, 1],
        intensity: 0.001,
        frequency: 1,
        materialType: 2,
        rendererType: 1,
        field: "test",
        fieldType: 1,
        splitFactor: 0,
        autoScaleDepth: 10000,
        type: 0,
        gradient: true,
        defaultSymbol: {
            symbolType: 3,
            color: [1, 0, 0, 0.1],
        },
        uniqueValueInfos: [
            {
                value: 20,
                symbol: {
                    color: [0, 1, 0, 0.51]
                }
            },
            {
                value: 30,
                symbol: {
                    color: [1, 1, 0, 0.51]
                }
            },

        ]
    }
};
//根据点云的test属性设置样式
fdapi.tileLayer.setPointCloudStyle(dataRender);
```

---

### `setRotation(id, newVal, fn)`

设置旋转

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `newVal` | `array` | 新的旋转坐标：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setRotation(id, newVal);
```

---

### `setScale(id, newVal, fn)`

设置缩放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `newVal` | `any` | 新的缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setScale(id, newVal);
```

---

### `setStyle(tileLayerIds, style, color, saturation, brightness, contrast, contrastBase, fn)`

设置TileLayer的样式



![](/img/refdoc/api/TileLayer.SetStyle.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer的ID或ID数组 |
| `style` | `number` | 样式， 0：默认；1：X光；2：纯色；3：水晶体；4：暗黑；5：科幻；6：扩散 |
| `color` | [`Color`](/docs/api/types#color) | 颜色，默认值:Color.White，支持四种格式，[取值示例](/docs/tutorials/color) |
| `saturation` | `number` | 饱和度，仅在默认样式0下生效，取值范围：[0~2]，默认值：1.0 |
| `brightness` | `number` | 亮度 ，仅在默认样式0下生效，取值范围：[0.1~10]，默认值：1.0 |
| `contrast` | `number` | 对比度，仅在默认样式0下生效，取值范围：[0.2~5]，默认值：1.0 |
| `contrastBase` | `number` | 对比度基准，仅在默认样式0下生效，取值范围：[0.036~0.9]，默认值：0.18 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.setStyle(tileLayerIds, style, color, saturation, brightness, contrast, contrastBase);
```

---

### `setViewHeightRange(id, minViewHeight, maxViewHeight, fn)`

设置TileLayer图层的可视高度范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `minViewHeight` | `number` | 可视高度范围最小值，取值范围：[任意负数~任意正数]，单位：米 |
| `maxViewHeight` | `number` | 可视高度范围最大值，取值范围：[任意负数~任意正数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置TileLayer可视高度范围：SetViewHeightRange

```js
fdapi.camera.set(492448.667813, 2492094.840469, 143.587646, -37.938152, -39.432201, 0);
//设置小别墅的可见高度范围
fdapi.tileLayer.setViewHeightRange(villaId, 1, 100);
```

---

### `setViewportVisible(id, vp, fn)`

多视口状态下，设置图层在各视口的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer唯一标识符 |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：设置图层在多视口下可见性：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
//进入多视口
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

//小别墅 仅视口1和视口3可见
fdapi.tileLayer.setViewportVisible(villaId, Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)`

显示TileLayer图层

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TileLayer对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：显示TileLayer图层：Show

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

fdapi.tileLayer.show(villaId);
```

---

### `showActor(id, objectId, fn)`

显示Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.showActor(id, objectId);
```

---

### `showActors(data, fn)`

显示一个或多个Actor



![](/img/refdoc/api/tilelayer.HideActor.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |

> 示例代码如下：

```js
await fdapi.tileLayer.showActors(data);
```

---

### `showAllActors(tileLayerIds)`

显示指定tilelayer的所有Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `tileLayerIds` | `string \| array` | TileLayer的ID或ID数组 |

> 示例代码如下：

```js
await fdapi.tileLayer.showAllActors(tileLayerIds);
```

---

### `unHighlightActor(id, objectId, fn)`

取消高亮一个Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectId` | `string` | Actor的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.unHighlightActor(id, objectId);
```

---

### `unHighlightActors(data, fn)`

停止高亮多个Actor，同时支持停止高亮多个图层的Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TileLayer的ID |
| `objectIds` | `array` | TileLayer里的Actor的ObjectID（单个或者数组） |

> 示例代码如下：

```js
await fdapi.tileLayer.unHighlightActors(data);
```

---

### `unHighlightAllActors(fn)`

停止高亮所有Actor

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.unHighlightAllActors();
```

---

### `unHighlightAllPoints(fn)`

取消高亮点云包含所有点的高亮效果

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：取消点云所有点高亮(仅对点云模型生效)：UnHighlightAllPoints

```js
fdapi.tileLayer.unHighlightAllPoints();
```

---

### `unHighlightPoints(data, fn)`

根据点云的属性字段值取消高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 点云图层的Id |
| `name` | `string` | 点云图层包含的字段名称 |
| `values` | `array` | 点云图层包含的字段名称对应的取值数组，支持取消高亮多个匹配到的值 |

> 示例：取消高亮点云对应的特征值点(仅对点云模型生效)：UnHighlightPoints

```js
fdapi.tileLayer.unHighlightPoints([{
    id: "pcs",
    name: "oid",
    values: ["1", "3", "5839", "5849"],
}]);
```

---

### `update(data, fn)`

修改一个或多个TileLayer对象，支持更新以下属性：

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持更新以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据TileLayer对象的ID更新以下属性 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `fileName` | `string` | 3dt文件路径，推荐使用@path 方式管理添加3dt图层资源 |
| `location` | `array` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `scale` | `array` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |

> 示例：修改TileLayer图层：Update

```js
await fdapi.tileLayer.update({
    id: '1',
    rotation: [0, 90, 0],//旋转角度
    scale: [1, 1, 1]    //缩放大小
});
fdapi.tileLayer.focus('1', 18000);
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
await fdapi.tileLayer.updateEnd();
```

---

### `updateHole(id, tileLayerId, holeCoordinate, isReverseCut, fn)`

修改一个挖洞操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `holeCoordinate` | `array` | 待修改挖洞的坐标，[取值示例](/docs/tutorials/coordinates) |
| `isReverseCut` | `boolean` | 挖洞多边形是否反转，默认值：false |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.updateHole(id, tileLayerId, holeCoordinate, isReverseCut);
```

---

### `updateModifier(id, tileLayerId, coordinates, ententBufferSize, fn)`

修改一个压平操作

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `tileLayerId` | `string` | TileLayer对象的ID |
| `coordinates` | `array` | 压平多边形的坐标 |
| `ententBufferSize` | `number` | 羽化范围，取值范围：[任意正浮点数]，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.updateModifier(id, tileLayerId, coordinates, ententBufferSize);
```

---

### `updateRecord(id, newValMap, where, fn)`

更新TileLayer关联的数据库记录

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | tileLayer的ID |
| `newValMap` | `object` | 要设置的新值格式：&#123;Key:Value&#125; |
| `where` | `string` | 查询条件 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.tileLayer.updateRecord(id, newValMap, where);
```


## 更多示例

> 隐藏Actor：HideActor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.hideActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
```

> 显示Actor：ShowActor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.showActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
```

> 隐藏图层中指定的多个Actor：HideActors

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.hideActors([{
    "id": villaId,
    "objectIds": [
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
    ]
}]);
```

> 显示图层中指定的多个Actor：ShowActors

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.showActors([{
    "id": villaId,
    "objectIds": [
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
    ]
}]);
```

> 隐藏图层的所有Actor：HideAllActors

```js
//相机移动到对应actors范围内
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);
fdapi.tileLayer.hideAllActors(villaId);
```

> 显示图层的所有Actor：ShowAllActors

```js
//相机移动到对应actors范围内
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);
fdapi.tileLayer.showAllActors(villaId);
```

> 定位当前选中的Actor：FocusActor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.focusActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", 10, 1, [-45, 45, 0]);
```

> 定位多个Actors：FocusActors

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.focusActors({
    'id': villaId, 'objectIds': [
        "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
        "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
        "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
        "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
    ]
}, 20, 1, [-45, 90, 0]);
```

> 高亮Actor：HighlightActor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

//设置高亮颜色（全局生效）
fdapi.settings.setHighlightColor(Color.Blue);

//高亮小别墅房顶构件
fdapi.tileLayer.highlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
```

> 自定义颜色高亮Actor：HighlightActorWithColor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.highlightActorWithColor(villaId, ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"], [0, 1, 0, 0.1], false);
```

> 停止高亮Actor：UnHighlightActor

```js
fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
fdapi.tileLayer.unHighlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
```

> 高亮多个Actors：HighlightActors

```js
//相机移动到对应actors范围内
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);

//高亮多个Actor 支持高亮不同图层的actor
let result = await fdapi.tileLayer.getObjectIDs(villaId);
let objectIds = result.data[0].objectIds;
fdapi.tileLayer.highlightActors([{ "id": villaId, "objectIds": objectIds }]);
```

> 高亮多个Actors：HighlightActorsWithColor

```js
//相机移动到对应actors范围内
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);

//高亮多个Actor 支持高亮不同图层的actor
let result = await fdapi.tileLayer.getObjectIDs(villaId);
let objectIds = result.data[0].objectIds;

fdapi.tileLayer.highlightActorsWithColor([{
    id: villaId,
    objectIds: ["1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce"],
    color: [1, 1, 0, 0.1],
    bWireframe: false
}, {
    id: villaId,
    objectIds: ["98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"],
    color: [1, 0, 0, 0.1],
    bWireframe: true
}, {
    id: villaId,
    objectIds: ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a"],
    color: [0, 0, 1, 0.1],
    bWireframe: false
}]);
```

> 停止高亮多个Actors：UnHighlightActors

```js
//相机移动到对应actors范围内
fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);


//停止高亮多个Actor
let result = await fdapi.tileLayer.getObjectIDs('979A4C034E29728F8A2635AD747B72A3');
let objectIds = result.data[0].objectIds;
fdapi.tileLayer.unHighlightActors([{ "id": "979A4C034E29728F8A2635AD747B72A3", "objectIds": objectIds }, { "id": "5664455F43C097E98F4FB3AA6B8B1E84", "objectIds": ["Group1608", "SM_LuDeng385", "archexteriors9_01_2531"] }]);
```

> 停止高亮所有Actors：UnHighlightAllActors

```js
//停止所有Actor高亮
fdapi.tileLayer.unHighlightAllActors();
```

> 设置图层对贴花类型对象的贴合支持：EnableDecal

```js
fdapi.tileLayer.enableDecal([
    {
        "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",
        "enable": false
    }, {
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
        "enable": false
    }
]);
```

> 开启图层剖切：EnableClip

```js
fdapi.tileLayer.enableClip("E637D8FE42335EE96C58A1840BCAD0CE");
```

> 关闭图层剖切：DisableClip

```js
fdapi.tileLayer.disableClip("E637D8FE42335EE96C58A1840BCAD0CE");
```

> 设置图层样式：SetStyle

```js
fdapi.camera.set(492961.030781, 2491283.131953, 511.248242, -38.79187, -92.09137, 0);

let style = 1; //样式， 0：默认；1：X光；2：纯色；3：水晶体
//以下四个属性仅在默认样式0下生效
let saturation = 1;//饱和度
let brightness = 1;//亮度
let contrast = 1;//对比度
let contrastBase = 0.18;//对比度基准
fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, [1, 1, 1, 0.11], saturation, brightness, contrast, contrastBase);
```

> 设置图层海拔热力样式：SetAltitudeHeatMap

```js
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);

fdapi.tileLayer.setAltitudeHeatMap("4DECD1704AD8119E33CF658A64A70AD2", [
    {
        "value": 0,
        "color": [0, 0, 1, 1]
    }, {
        "value": 10,
        "color": [0, 0, 1, 1]
    },
    {
        "value": 20,
        "color": [0, 0.4, 1, 1]
    },
    {
        "value": 30,
        "color": [0, 0.8, 1, 1]
    },
    {
        "value": 40,
        "color": [0, 1, 0.8, 1]
    },
    {
        "value": 50,
        "color": [0, 1, 0.4, 1]
    },
    {
        "value": 55,
        "color": [0, 1, 0, 1]
    },

    {
        "value": 60,
        "color": [0, 1, 0, 1]
    },
    {
        "value": 70,
        "color": [0.4, 1, 0, 1]
    },
    {
        "value": 80,
        "color": [0.8, 1, 0, 1]
    },

    {
        "value": 90,
        "color": [1, 0.8, 0, 1]
    },
    {
        "value": 95,
        "color": [1, 0.4, 0, 1]
    },
    {
        "value": 100,
        "color": [1, 0, 0, 1]
    }
]);
```

> 为TileLayer图层恢复样式：ResetStyle

```js
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);
let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体
//以下四个属性仅在默认样式0下生效
let saturation = 1;//饱和度
let brightness = 1;//亮度
let contrast = 1;//对比度
let contrastBase = 0.18;//对比度基准
fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, Color.White, saturation, brightness, contrast, contrastBase);
```

> 设置TileLayer图层碰撞信息：SetCollision

```js
fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);
let enabled = true;//是否开启碰撞总开关，如果此参数设置为false，则下面三个参数均会失效
let mouseInteract = true;//是否开启鼠标交互
let mouseFunction = true;//是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等
let characterCollision = true; //是否开启角色碰撞
fdapi.tileLayer.setCollision("4DECD1704AD8119E33CF658A64A70AD2", enabled, mouseInteract, mouseFunction, characterCollision);
```

> 获取TileLayer图层碰撞信息：GetCollision

```js
fdapi.tileLayer.getCollision("4DECD1704AD8119E33CF658A64A70AD2");
```

> 设置TileLayer是否支持对网络图层服务进行贴合：EnableImageLayerDecal

```js
fdapi.tileLayer.enableImageLayerDecal([
    {
        "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",
        "enable": true
    }, {
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
        "enable": false
    }
]);
```

> 添加单个压平：AddModifier

```js
//相机定位到压平区域
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

//隐藏遮挡的植物
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

//隐藏遮挡的风车 按文件夹隐藏
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

//添加前删除 防止id重复
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');

let coordinates = [
    [488501.21875, 2488108, 19.438125610351563],
    [489722.4375, 2490857, 4.0191407203674316],
    [491464.96875, 2489233.5, 18.179296493530273],
    [490473.125, 2486914.5, 2.1426563262939453],
];
//添加压平 注意：此方法会在图层树上创建压平对象
fdapi.tileLayer.addModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);
```

> 修改压平操作：UpdateModifier

```js
let coordinates = [
    [489199.34375, 2489516.25, 18.1796875],
    [490395.125, 2490211, 22.756874084472656],
    [490688.53125, 2488826, 26.404375076293945],
];
fdapi.tileLayer.updateModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);
```

> 删除压平操作：DeleteModifier

```js
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');
```

> 添加多个压平：AddModifiers

```js
//相机定位到压平区域
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

//隐藏遮挡的植物
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

//隐藏遮挡的风车 按文件夹隐藏
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

//添加前先删除
fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');
fdapi.tileLayer.deleteModifier('m2', 'E637D8FE42335EE96C58A1840BCAD0CE');

//第一个压平对象
let id1 = 'm1';
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
let coordinates1 = [
    [489199.34375, 2489516.25, 18.1796875],
    [490395.125, 2490211, 22.756874084472656],
    [490688.53125, 2488826, 26.404375076293945],
];
//多个坐标构成内环 没有可以不设置
let innerRings1 = [

];
//羽化范围
let ententBufferSize1 = 10;

//第二个压平对象
let id2 = 'm2';
let coordinates2 = [
    [488527.96875, 2488053, 24.532032012939453],
    [488768.40625, 2488719.75, 12.159375190734863],
    [490239.5, 2488199.75, 46.452499389648438],
    [489931.5, 2487190.5, 39.267032623291016],
];
//多个坐标构成内环 没有可以不设置
let innerRings2 = [

];
//羽化范围
let ententBufferSize2 = 10;

let data = [
    { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'ententBufferSize': ententBufferSize1 },
    { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'ententBufferSize': ententBufferSize2 }

];
fdapi.tileLayer.addModifiers(data);
```

> 添加ShapeFile压平：AddModifierByShapeFile

```js
//相机定位到压平区域
fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

//隐藏遮挡的植物
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

//隐藏遮挡的风车 按文件夹隐藏
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

//压平的地形图层ID
let tileLayerId = "E637D8FE42335EE96C58A1840BCAD0CE";

//根据shapefile文件压平地形 
let id = 'm3';
let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
let data = { 'id': id, 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
//注意：示例代码内预先准备了压平范围对应的yaping.shp 请提前准备好对应范围shp文件再执行addModifierByShapeFile
fdapi.tileLayer.addModifierByShapeFile(data);
```

> 清空压平操作：ClearModifier

```js
//注意：清除地形的所有压平后 地形高度会遮挡模型 
fdapi.tileLayer.clearModifier('E637D8FE42335EE96C58A1840BCAD0CE');
```

> 添加ShapeFile挖洞：AddHoleByShapeFile

```js
//相机移动到挖洞区域
fdapi.camera.set(492084.543438, 2488554.227031, 2181.706875, -43.213093, -169.203659, 0);

//隐藏遮挡的植物
fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

//隐藏遮挡的风车 按文件夹隐藏
fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

//根据shape文件对地形挖洞 
//注意：示例代码内预先准备了挖洞范围对应的shapeFile文件 请提前准备好对应范围shp文件再执行addHoleByShapeFile
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
let data = { 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
fdapi.tileLayer.addHoleByShapeFile(data);
```

> 添加挖洞：AddHole

```js
//添加前先清空
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
fdapi.tileLayer.clearHole(tileLayerId);


let id1 = "hole1";
//多个坐标 二维数组
let coordinates1 = [
    [491280.3125, 2490323, 5.8794140815734863],
    [491294.375, 2490340.5, 5.577080249786377],
    [491324.9375, 2490327.75, 7.7592482566833496],
    [491319.8125, 2490308.75, 8.2433004379272461],
    [491296.125, 2490307.75, 7.195253849029541],
];
//多个坐标构成内环 三维数组
let innerRings1 = [];


let id2 = "hole2";
//多个坐标 二维数组
let coordinates2 = [
    [491342.09375, 2490333.25, 8.4353218078613281],
    [491349.34375, 2490346, 8.3129301071166992],
    [491366.15625, 2490332.25, 9.146367073059082],
    [491360.125, 2490321.5, 9.2895412445068359],
];
//多个坐标构成内环 三维数组
let innerRings2 = [];
let data = [
    { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'isReverseCut': false },
    { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'isReverseCut': false }
];
//批量添加
fdapi.tileLayer.addHole(data);

fdapi.infoTree.focus('hole1');
```

> 修改挖洞操作：UpdateHole

```js
let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
let holeCoordinate = [
    [491280.3125, 2490323, 5.8794140815734863],
    [491294.375, 2490340.5, 5.577080249786377],
    [491324.9375, 2490327.75, 7.7592482566833496],
    [491319.8125, 2490308.75, 8.2433004379272461]
];
await fdapi.tileLayer.updateHole("hole1", tileLayerId, holeCoordinate, false);
```

> 删除挖洞操作：DeleteHole

```js
fdapi.tileLayer.deleteHole("hole1", 'E637D8FE42335EE96C58A1840BCAD0CE');
```

> 清空挖洞操作：ClearHole

```js
//清空
fdapi.tileLayer.clearHole('E637D8FE42335E