---
title: HeatMap
sidebar_label: HeatMap
description: "HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。"
---

# HeatMap

HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。

HeatMap 效果图如下：



![](/img/refdoc/api/HeatMap.png)

通过 `api.heatmap` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。
- **别名 / 不同行业叫法**：热力图、人流热区、OD 热力、密度图、分布图、强度图、色斑图。
- **适用行业**：智慧城市、安防、交通、园区、应急管理、海洋。
- **使用场景**：
  - 智慧城市 / 安防：展示人流密度、客流热区、POI 聚集度，辅助安保布防与公共空间管理。
  - 交通行业：OD 出行热力、路网拥堵强度、站点客流分布可视化。
  - 园区 / 环境监测：温度、噪声、空气质量等监测值的空间插值分布展示。
- **注意事项**：
  - 热力点 `heatValue` 须落在 `range` 设定范围内，超出范围的点将按无效处理。
  - `textureSize` 越大热力图越清晰但生成越耗时，海量热力点时应权衡纹理尺寸与性能。
  - 本对象为二维平面热力图，若需表达空间体积内的三维分布请使用 HeatMap3D。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addByHeatPoints`](#addByHeatPoints) | 根据热力点绘制热力图 |  |
| [`addByTif`](#addByTif) | 根据tif文件加载热力图 |  |
| [`addPoints`](#addPoints) | 为HeatMap添加热力点 |  |
| [`clear`](#clear) | 删除场景中所有的HeatMap | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个HeatMap对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取HeatMap的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏HeatMap | 按业务条件隐藏对象 |
| [`highlightPixels`](#highlightPixels) | 高亮通过Tif文件加载的热力图中指定的像素点， |  |
| [`load`](#load) | 预加载的热力图动画，包含多个Tif文件，加载后可以使用play()方法进行播放。 |  |
| [`pause`](#pause) | 暂停播放热力图动画 | 暂停播放 |
| [`play`](#play) | 播放预加载的热力图动画 | 播放动画/导览 |
| [`removePoints`](#removePoints) | 为HeatMap移除热力点 |  |
| [`setBBox`](#setBBox) | 设置BoundingBox 热力点坐标的范围 |  |
| [`setRange`](#setRange) | 设置热力值的范围 |  |
| [`setTime`](#setTime) | 从第几秒开始播放 |  |
| [`show`](#show) | 显示HeatMap | 按业务条件显示对象 |
| [`unHighlightAllPixels`](#unHighlightAllPixels) | 取消热力图内所有像素点高亮 |  |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateByHeatPoints`](#updateByHeatPoints) | 更新热力图 |  |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `addByHeatPoints(heatmap, fn)` {#addByHeatPoints}

根据热力点绘制热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `heatmap` | `object` | HeatMap对象属性如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`heatmap` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `bbox` | `array` | 热力点坐标的范围 |
| `range` | `array` | 可选，热力值的范围 |
| `data` | `array` | 可选，热力图包含的热力点数据，（注意：点的heatValue取值要在range所设定的范围内） |
| `data.id` | `string` | 字符串类型的ID |
| `data.coordinate` | `array` | 热力点坐标，[取值示例](/docs/tutorials/coordinates) |
| `data.radius` | `number` | 热力点影像半径范围，取值范围：[任意数值] |
| `data.heatValue` | `number` | 热力值，取值范围：[range参数设定范围内的任意数值] |
| `style` | `array` | 可选参数，热力图样式枚举，详情参考 `HeatMapStyle` |
| `textureSize` | `number` | style=0或1时参数生效，纹理大小，默认值：1024，取值范围：[128~4096]，注意：值越大纹理越清晰但创建越耗时 |
| `opacityMode` | `number` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |
| `opacityRange` | `array` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |
| `blur` | `number` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |
| `colors` | `object` | 可选，默认使用标准热力配色，当style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |
| `blendMode` | `number` | 混合模式，取值范围：[0,1] |
| `light` | `boolean` | 是否参与光照，布尔类型，默认值：false |
| `updateTime` | `number` | 更新动画的插值时间，注意：参数仅更新方法执行时生效，离散点构造热力图还支持差值动画 |
| `viewHeightRange` | `array` | 可选，可见高度范围：[最小可见高度, 远最大可见高度]，默认值: [-1000000000, 1000000000] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.addByHeatPoints(heatmap);
```

---

### `addByTif(heatmap, fn)` {#addByTif}

根据tif文件加载热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `heatmap` | `object` | HeatMap对象属性如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`heatmap` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `style` | `array` | 可选，热力图样式枚举，详情参考 `HeatMapStyle` |
| `range` | `array` | 可选，热力值的范围，数据结构参考add方法，如果不想设置range，可将此参数设置为null |
| `opacityMode` | `number` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |
| `opacityRange` | `array` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |
| `blur` | `number` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |
| `colors` | `object` | style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |
| `blendMode` | `number` | 混合模式，取值范围：[0,1] |
| `light` | `boolean` | 是否参与光照，布尔类型，默认值：false |
| `updateTime` | `number` | 更新动画的插值时间，注意：参数仅更新方法执行时生效 |
| `tifFile` | `object` | tif文件属性对象，包含属性如下： |
| `tifFile.minHeight` | `number` | 最小高度，默认值：-1000米，注意：设置贴地模式时 地形高度要在此范围内 |
| `tifFile.maxHeight` | `number` | 最大高度，默认值：10000米，注意：设置贴地模式时 地形高度要在此范围内 |
| `tifFile.file` | `string` | tif文件路径，路径示例："D:\\test.tif" |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.addByTif(heatmap);
```

---

### `addPoints(id, data, fn)` {#addPoints}

为HeatMap添加热力点

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap的ID |
| `data` | `array` | 热力点(可以是单个或数组,数据结构请参考add方法) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddPoints

```js
let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
let newPoints = [];
for (let i = 0; i < 10; i++) {
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    newPoints.push({
        id: "new_point_" + i,
        coordinate: [x, y, 0],                 //热力点的坐标
        radius: Math.random() * 200,           //热力点影像半径范围
        heatValue: Math.random() * 100        //热力值
    });
}
await fdapi.heatmap.addPoints("heatmap1", newPoints);
```

---

### `clear(fn)` {#clear}

删除场景中所有的HeatMap

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
clearInterval(__tidUpdateHeatMap);
fdapi.heatmap.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个HeatMap对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HeatMap对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
clearInterval(__tidUpdateHeatMap);
fdapi.heatmap.delete('heatmap1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.heatmap.focus('heatmap1', 100);
```

---

### `get(ids, fn)` {#get}

根据ID获取HeatMap的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HeatMap对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
HeatMap的详细信息
{
            "id":   "heatmap1",
            "groupId":  "",
            "userData": "",
            "bbox": [488670.750000, -2488165.000000, 5.700000, 488670.750000, -2488165.000000, 5.700000],
            "range":    [0.000000, 100.000000],
            "data": []
        }
```

> 示例：Get

```js
fdapi.heatmap.get('heatmap1');
```

---

### `hide(ids, fn)` {#hide}

隐藏HeatMap

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.heatmap.hide('heatmap1');
```

---

### `highlightPixels(id, pixelCoords, fn)` {#highlightPixels}

高亮通过Tif文件加载的热力图中指定的像素点，注意：像素点数组的取值范围必须在Tif文件分辨率内

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap的ID |
| `pixelCoords` | `array` | Tif文件像素点的坐标数组（取值范围在文件分辨率内），取值示例：[[pixel1_x,pixel1_y],[pixel2_x,pixel2_y]...] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HighlightPixels

```js
//随机像素位置 需要在tif文件分辨率内
let pixelCoords = [];
for (let i = 0; i < 100; i++) {
    let x = Math.round(Math.random() * 70);
    let y = Math.round(Math.random() * 22);
    pixelCoords.push([x, y]);
}

//高亮Tif文件内的像素  
fdapi.heatmap.highlightPixels('heatmap6', pixelCoords);
```

---

### `load(heatmap, fn)` {#load}

预加载的热力图动画，包含多个Tif文件，加载后可以使用play()方法进行播放。

| 参数 | 类型 | 说明 |
|------|------|------|
| `heatmap` | `object` | HeatMap对象属性如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`heatmap` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `range` | `array` | 可选，热力值的范围，数据结构参考add方法，如果不想设置range，可将此参数设置为null |
| `data` | `array` | 可选，热力图包含的热力点 |
| `style` | `array` | 可选参数，热力图样式枚举，详情参考 `HeatMapStyle` |
| `opacityMode` | `number` | style=0或1时参数生效，不透明度模式，默认值：1，取值范围：0：使用自定义色卡颜色的不透明度 1：使用热力点的不透明度 |
| `opacityRange` | `array` | style=0或1时参数生效，不透明度范围，默认值：[0~1.0]，注意：仅opacityMode为1时有效 |
| `blur` | `number` | style=0或1时参数生效，热力点模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |
| `colors` | `object` | style=0或1时参数生效，自定义颜色卡区间数组，包含渐变控制参数、无效点颜色和颜色数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 值对应的调色板颜色 |
| `colors.value` | `number` | 值 |
| `blendMode` | `number` | 混合模式，取值范围：[0,1] |
| `light` | `boolean` | 是否参与光照，布尔类型，默认值：false |
| `shadow` | `number` | 阴影强度，取值范围：[0,任意正数] |
| `tifAnimation` | `object` | 预加载的tif文件列表对象，包含属性如下： |
| `tifAnimation.minHeight` | `number` | 最小高度 |
| `tifAnimation.maxHeight` | `number` | 最大高度 |
| `tifAnimation.totalSeconds` | `number` | 动画播放默认的总时长，单位：秒 |
| `tifAnimation.time` | `number` | 从第几秒开始播放，默认值：0 |
| `tifAnimation.files` | `array` | tif文件路径数组，结构示例：["D:\\0.tif","D:\\1.tif",...] ，注意：tif文件纹理尺寸不能超过8192，最大值示例：[8192,8192] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.load(heatmap);
```

---

### `pause(id, fn)` {#pause}

暂停播放热力图动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.pause(id);
```

---

### `play(id, fn)` {#play}

播放预加载的热力图动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.play(id);
```

---

### `removePoints(id, pointIds, fn)` {#removePoints}

为HeatMap移除热力点

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap的ID |
| `pointIds` | `array` | 热力点ID（单个或数组） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.removePoints(id, pointIds);
```

---

### `setBBox(id, newVal, fn)` {#setBBox}

设置BoundingBox 热力点坐标的范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HeatMap的ID |
| `newVal` | `array` | 热力点坐标的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.setBBox(id, newVal);
```

---

### `setRange(id, newVal, fn)` {#setRange}

设置热力值的范围

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HeatMap的ID |
| `newVal` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.setRange(id, newVal);
```

---

### `setTime(id, startTime, fn)` {#setTime}

从第几秒开始播放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap对象的ID |
| `startTime` | `number` | 可选，从第几秒开始播放，默认值：0秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.setTime(id, startTime);
```

---

### `show(ids, fn)` {#show}

显示HeatMap

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.heatmap.show('heatmap1');
```

---

### `unHighlightAllPixels(id, fn)` {#unHighlightAllPixels}

取消热力图内所有像素点高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：UnHighlightAllPixels

```js
//取消高亮
fdapi.heatmap.unHighlightAllPixels('heatmap6');
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

### `updateByHeatPoints(heatmap, fn)` {#updateByHeatPoints}

更新热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `heatmap` | `object` | 对象请参考add方法结构 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.heatmap.updateByHeatPoints(heatmap);
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
await fdapi.heatmap.updateEnd();
```


## 更多示例

> AddByHeatPoints

```js
await fdapi.heatmap.clear();

let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
let range = [0, 100];
let data = [];
for (let i = 0; i < 100; i++) {
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    data.push({
        id: i.toString(),
        coordinate: [x, y, 0],                 //热力点的坐标
        radius: Math.random() * 200,           //热力点影像半径范围
        heatValue: Math.random() * 100        //热力值
    });
}
let style = HeatMapStyle.Normal;
let textureSize = 1024;
let opacityMode = 1;
let opacityRange = [0, 1];
let blur = 0.85;
let blendMode = 1;
let light = false;
let viewHeightRange = [0, 10000];

let heatmap1 = {
    id: "heatmap1",
    bbox: bbox,
    range: range,
    data: data,
    style: style,
    textureSize: textureSize,
    opacityMode: opacityMode,
    opacityRange: opacityRange,
    blur: blur,
    blendMode: blendMode,
    light: light,
    updateTime: 1,
    viewHeightRange: viewHeightRange
};
await fdapi.heatmap.addByHeatPoints(heatmap1);
fdapi.heatmap.focus('heatmap1', 1500, 1);
```

> UpdateByPoints

```js
__tidUpdateHeatMap = setInterval(() => {

    let data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: i.toString(),
            heatValue: Math.random() * 100        //热力值
        });
    }

    let heatmap1 = {
        id: "heatmap1",
        data: data,
        updateTime: 1,
    };

    fdapi.heatmap.updateByHeatPoints(heatmap1);
}, 1000);

//清除定时器
window.setTimeout(function () {
    window.clearInterval(__tidUpdateHeatMap)
}, 5000);
```

> AddByHeatPoints(CustomColor)

```js
await fdapi.heatmap.clear();
let bbox = [488670.75, 2488165, 0, 491659.59375, 2490987.5, 344.58];
let range = [0, 1];
let data = [];
for (let i = 0; i < 100; i++) {
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    data.push({
        id: i.toString(),
        coordinate: [x, y, 0],                 //热力点的坐标
        radius: Math.random() * 200,           //热力点影像半径范围
        heatValue: Math.random()       //热力值
    });
};

let style = HeatMapStyle.CustomColor;
let textureSize = 1024;
let opacityMode = 1;
let opacityRange = [0, 1];
let blur = 0.85;
let blendMode = 1;
let light = false;
let viewHeightRange = [0, 10000];
let colors = {
    "gradient": true,
    "invalidColor": [0, 0, 0, 1],
    "colorStops": [
        {
            "value": 0,
            "color": [0, 0.968627, 0, 1]
        },
        {
            "value": 0.25,
            "color": [0.709804, 0.968627, 0, 1]
        },
        {
            "value": 0.5,
            "color": [1, 0.709804, 0, 1]
        },
        {
            "value": 0.75,
            "color": [0.868627, 0, 0, 1]
        },
        {
            "value": 1,
            "color": [1, 0, 0, 1]
        }
    ]
};


let heatmap2 = {
    id: "heatmap2",
    bbox: bbox,
    range: range,
    data: data,
    style: style,
    textureSize: textureSize,
    opacityMode: opacityMode,
    opacityRange: opacityRange,
    blur: blur,
    colors: colors,
    blendMode: blendMode,
    light: light,
    viewHeightRange: viewHeightRange
};
await fdapi.heatmap.addByHeatPoints(heatmap2);
fdapi.heatmap.focus('heatmap2', 1500, 1);
```

> AddByHeatPoints(CustomStyle)

```js
await fdapi.heatmap.clear();
let bbox = [488670.75, 2488165, -2, 491659.59375, 2490987.5, 600.58];
let range = [0, 10];
let data = [];
for (let i = 0; i < 1800; i++) {
    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    data.push({
        id: i.toString(),
        coordinate: [x, y, 0],                 //热力点的坐标
        radius: Math.random() * 250,           //热力点影像半径范围
        heatValue: Math.random() * 2    //热力值
    });
};

let style = HeatMapStyle.CustomWave;
let textureSize = 1024;
let opacityMode = 0;
let opacityRange = [0, 1];
let blur = 0.85;
let blendMode = 1;
let light = false;
let viewHeightRange = [0, 10000];
let colors = {
    "gradient": true,
    "invalidColor": [0, 0, 0, 1],
    "colorStops": [
        {
            "value": 0,
            "color": [0, 0.968627, 0, 1]
        },
        {
            "value": 0.25,
            "color": [0.709804, 0.968627, 0, 1]
        },
        {
            "value": 0.5,
            "color": [1, 0.709804, 0, 1]
        },
        {
            "value": 0.75,
            "color": [0.868627, 0, 0, 0.2]
        },
        {
            "value": 1,
            //调整色卡的透明度
            "color": [1, 0, 0, 0.2]
        }
    ]
};

let heatmap3 = {
    id: "heatmap2",
    bbox: bbox,
    range: range,
    data: data,
    style: style,
    textureSize: textureSize,
    opacityMode: opacityMode,
    opacityRange: opacityRange,
    blur: blur,
    colors: colors,
    blendMode: blendMode,
    light: light,
    viewHeightRange: viewHeightRange
};
await fdapi.heatmap.addByHeatPoints(heatmap3);
fdapi.heatmap.focus('heatmap3', 300, 1);
```

> AddByBin(云图)

```js
await fdapi.heatmap.clear();
let bbox = [499019, 2718, 0, 499186, 2976, 10];

let style = 1;
let textureSize = 1024;
let opacityMode = 1;
let opacityRange = [0, 1];
let blur = 0.85;
let blendMode = 0;
let light = false;

let colors = {
    "gradient": true,
    "invalidColor": [0, 0, 0, 1],
    "colorStops": [
        { "value": 0, "color": [0, 0, 0, 0] },
        { "value": 0.2, "color": [0, 0, 0, 0] },
        { "value": 0.2, "color": [0.5, 0.5, 0.5, 1] },
        { "value": 1, "color": [1, 1, 1, 1] }
    ]
};

let binaryFile = {
    "size": [1250, 1250],
    "needProject": true,
    "left": 9809325,
    "top": 4865942,
    "right": 15794157,
    "bottom": -1118890,
    "minLongitude": 90,
    "maxLongitude": 140,
    "minLatitude": -10,
    "maxLatitude": 40,
    "file": HostConfig.Path + '/assets/bin/heatmap.bin'
};
await fdapi.heatmap.add('heatmap4', bbox, null, null, style, textureSize, opacityMode, opacityRange, blur, colors, blendMode, light, binaryFile);
fdapi.heatmap.focus('heatmap4', 100, 1);
```

> AddByTif(tifFile)

```js
await fdapi.heatmap.clear();
let heatmap5 = {
    "id": "heatmap5",
    "range": [-1, 1],
    "light": true,
    "style": HeatMapStyle.CustomWave, //也支持设置贴地样式 1
    "opacityMode": 0,
    "blendMode": 1,
    "tifFile": {
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "file": HostConfig.Path + "/assets/tif/T2.tif"
    },
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            { "value": -1, "color": [0, 0, 1, 1] },
            { "value": 0.25, "color": [0, 1, 0, 1] },
            { "value": 0.5, "color": [1, 1, 0, 1] },
            { "value": 1, "color": [1, 0, 0, 1] },
        ]
    }
};
await fdapi.heatmap.addByTif(heatmap5);
fdapi.heatmap.focus('heatmap5', 60, 1);
```

> AddByTif(tifFile-onTerrain)

```js
await fdapi.heatmap.clear();
let heatmap6 = {
    "id": "heatmap6",
    "range": [-1, 1],
    "light": true,
    "style": HeatMapStyle.CustomColor, //设置贴地样式 1
    "opacityMode": 0,
    "blendMode": 1,
    "tifFile": {
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "file": HostConfig.Path + "/assets/tif/T2.tif"
    },
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            { "value": -1, "color": [0, 0, 1, 1] },
            { "value": 0.25, "color": [0, 1, 0, 1] },
            { "value": 0.5, "color": [1, 1, 0, 1] },
            { "value": 1, "color": [1, 0, 0, 1] },
        ]
    }
};
await fdapi.heatmap.addByTif(heatmap5);
fdapi.heatmap.focus('heatmap5', 60, 1);
```

> AddByTif(tifFile-onTerrain)

```js
await fdapi.heatmap.clear();
let heatmap6 = {
    "id": "heatmap6",
    "range": [-1, 1],
    "light": true,
    "style": HeatMapStyle.CustomColor, //设置贴地样式 1
    "opacityMode": 0,
    "blendMode": 1,
    "tifFile": {
        "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]
        "file": HostConfig.Path + "/assets/tif/T2.tif"
    },
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            { "value": -1, "color": [0, 0, 1, 1] },
            { "value": 0.25, "color": [0, 1, 0, 1] },
            { "value": 0.5, "color": [1, 1, 0, 1] },
            { "value": 1, "color": [1, 0, 0, 1] },
        ]
    }
};
await fdapi.heatmap.addByTif(heatmap6);
fdapi.heatmap.focus('heatmap6', 60, 1);
```
