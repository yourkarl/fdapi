---
title: VectorField
sidebar_label: VectorField
description: "VectorField 基于真实数据(tif/bin)对风场、波浪、洋流、河流等场数据进行向量场/箭头/烟雾形态的仿真。"
---

# VectorField

向量场类对象，基于真实数据对风场、波浪、洋流、河流、箭头、烟雾的场数据形态进行仿真，支持tif和bin格式

数据格式参考以下说明：

- 流场数据最终提供给程序使用是以三维纹理的方式用于渲染，所以要求在三个维度上采样均匀，也就是采样点间隔均匀，否则会变形甚至错误。
- 鉴于大部分气象海洋数据的坐标系都是wgs84坐标系，所以支持内部进行坐标重投影。 场如果是投影后的，可以变量控制加以区分。
- 场数据一个bin文件是一层数据，bin文件中不再保存采样点坐标，只有三维向量(U,V,W)。采样点存储需要行优先，横向从左到右存储，纵向从上向下顺序存储。 注意：向量的方向要在一个文件里，不能分别存储。
- 场数据导出时，每一层的数据文件必须以 （当前层索引).bin 为后缀存储。 比如 time0_isobaricInhPa2.bin， 因为配置给程序时只给一个参数，路径+time0_isobaricInhPa，后面的索引和后缀根据配置的层数自动添加循环加载数据。
- 如果是二维向量场，第三个分量W也必须给值，可以设置为0，不能只写两个变量，程序只识别三维向量。

bin文件结构描述：

bin文件类似于dem文件结构的一个二维数组，数组元素可以是一个浮点数（标量）或者3个浮点数（向量），按行顺序排列。

例如有321*701的bin文件，即一个321x701的行列矩阵，前701个浮点是第0行，再701个浮点是第1行，直至第320行。bin文件渲染后在空间上会对应渲染范围参数。

tif文件结构描述：

所有tif文件的坐标系须和acp工程坐标系保持一致

每一个tif文件包含uvw三波段

每层是一个tif文件

所有tif文件的分辨率须保持一致

![VectorField 示意图 1](/img/refdoc/api/vectorfield-wind.gif)

![VectorField 示意图 2](/img/refdoc/api/vectorfield-ocean.gif)

通过 `api.vectorField` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：VectorField 基于真实数据(tif/bin)对风场、波浪、洋流、河流等场数据进行向量场/箭头/烟雾形态的仿真。
- **别名 / 不同行业叫法**：向量场 / 矢量场 / 流场 / 风场 / 洋流 / 波浪场 / 箭头场。
- **适用行业**：海洋气象、智慧水利、生态环保、能源（风电）、航空航海、港口航道
- **使用场景**：
  - 风场、洋流、河流流向流速的动态可视化
  - 气象与海洋要素场的展示
  - 扩散与输运过程的表达
  - 港口航道 / 海洋：洋流 / 风场仿真，辅助航行与海洋环境分析。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 要求三维均匀采样，否则会形变（见文档数据说明）
  - 数据体量大，注意性能
  - 坐标与时序需统一



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个VectorField向量场对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的VectorField对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个VectorField对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取VectorField对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏VectorField对象 | 按业务条件隐藏对象 |
| [`setViewportVisible`](#setViewportVisible) | 设置向量场对象在进入多视口状态下视口可见性 |  |
| [`show`](#show) | 显示VectorField对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个VectorField对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个VectorField向量场对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造向量场对象VectorField的数据对象，可以是Object类型或者Array类型，对于每一个VectorField对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | VectorField对象ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinate` | `array` | 是 | - | 向量场对象的坐标位置 |
| `spawnRate` | `number` | 是 | - | 粒子每秒生成的速率，影响粒子数量 |
| `spawnRateMin` | `number` | 是 | - | 近距离粒子的生成速度，影响粒子数量 |
| `spawnRateMax` | `number` | 是 | - | 远距离粒子的生成速度，影响粒子数量 |
| `spawnRatePower` | `number` | 是 | - | 按距离插值时使用指数函数，设置指数函数的N次方，影响粒子数量 |
| `spawnLineRate` | `number` | 是 | - | 每个线条上每秒生成的粒子数量 |
| `spawnLineCap` | `number` | 是 | - | 每个线条上粒子的最大数量 |
| `repeatCount` | `number` | 是 | - | 向量场重复次数，即粒子发射器的数量，影响粒子数量 |
| `killSpeed` | `number` | 是 | - | 粒子显示的最小速度，影响粒子数量 |
| `backKill` | `boolean` | 是 | - | 是否背面剔除，影响粒子数量 |
| `vfIntensAsVelocity` | `number` | 是 | - | 场的强度到速度的缩放比例，影响粒子长度 |
| `lifeTime` | `number` | 是 | - | 粒子的生命周期，即粒子存活时间，单位：秒，影响粒子长度 |
| `lifeTimeOcean` | `number` | 是 | - | 洋流模式下粒子存活时间，仅displayMode为洋流模式生效，单位：秒，影响粒子长度 |
| `singleSpriteSize` | `number` | 是 | - | 单个粒子大小，单位米，影响粒子大小 |
| `singleSpriteSizeOcean` | `number` | 是 | - | 洋流模式下单个粒子大小，仅displayMode为洋流模式生效，单位米，影响粒子大小 |
| `lodMin` | `number` | 否 | 0.6 | 粒子大小最小缩放比例，默认值：0.6，影响粒子大小 |
| `lodMax` | `number` | 否 | 2 | 粒子大小最大缩放比例，默认值：2，影响粒子大小 |
| `lodMaxDistance` | `number` | 是 | - | 粒子大小的最大缩放距离，即从[0~lodMaxDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：若超过此值则使用lodMax进行缩放，影响粒子大小 |
| `lodMinDistance` | `number` | 是 | - | 粒子大小的最小缩放距离，即从[0~lodMinDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：若小于此值则使用lodMin进行缩放，影响粒子大小 |
| `headBrightness` | `number` | 否 | 0.3 | 粒子发射器头部粒子的亮度缩放值，默认值：0.3，值越大发射器头部的粒子越亮 |
| `vectorFieldArray` | `array` | 是 | - | 向量场点位数据数组，注意：和vectorFieldFilePath参数二选一即可 |
| `vetorFieldFilePath` | `string` | 是 | - | 包含向量场点位数据的文件路径，支持通配符（xxx&#123;z&#125;.tif），&#123;z&#125;即文件名称最后的数字序号，注意：和vectorFieldArray参数二选一即可 |
| `binFileIndex` | `number` | 是 | - | 数据文件名称开始索引，(xxx_0.tif,xxx_1.bin,xxx_2.bin...)，即从第几个bin/tif文件开始加载，默认从bin/tif文件名称数字后缀索引为0的开始加载，比如设置为0 则从xxx0.bin/xxx0.tif开始加载 |
| `depth` | `number` | 是 | - | 向量场数据加载bin/tif的层数，范围：[0~文件最大索引值] |
| `fileOrder` | `number` | 是 | - | 向量场数据加载bin/tif文件的堆叠顺序，0：正向堆叠（0~z层） 1：反向堆叠（z~0层） |
| `reset` | `boolean` | 是 | - | 向量场更新时是否对原场数据进行重置（动画拖影效果），默认：false，注意：仅对update()函数生效 |
| `displayMode` | `string` | 是 | - | 向量场的显示形态类型枚举【风场、波浪、洋流、河流、箭头、烟雾等类型】 ，参考 `VectorFieldStyle` |
| `width` | `number` | 是 | - | 向量场分层数据宽的分辨率 |
| `height` | `number` | 是 | - | 向量场分层数据高的分辨率 |
| `dataBounds` | `array` | 是 | - | 向量场数据包含的bbox范围和高度范围 |
| `renderBounds` | `array` | 是 | - | 待绘制的bbox范围，可以与向量场数据范围不一致，渲染裁切的部分区域 |
| `bDynamicRenderBound` | `boolean` | 是 | - | 是否动态计算渲染范围，默认：false。注意：仅球面上生效 |
| `fieldScale` | `array` | 是 | - | 向量场缩放大小 |
| `bNeedProjection` | `boolean` | 否 | false | 是否需要重投影，经纬度坐标需要设置为true，默认值：false |
| `wkt` | `string` | 是 | - | 重投影时的wkt字符串，为空时，默认投影到web墨卡托 |
| `offset` | `array` | 是 | - | 向量场数据的整体偏移，默认不需要偏移 |
| `posFile` | `string` | 是 | - | 位置坐标文件路径，txt文件格式类型 |
| `vFFile` | `string` | 是 | - | UV流速流向的文件路径，txt文件格式类型 |
| `nDim` | `number` | 是 | - | 流速流向数据纬度，即二维UV或者三维UVW |
| `speedRange` | `array` | 是 | - | 流速流向的取值范围，示例：[min,max] |
| `vecScale` | `array` | 否 | [1,1,1] | 向量缩放，默认值：[1,1,1]，仅支持txt文件格式类型 |
| `downsample` | `number` | 是 | - | 分辨率按此参数进行缩放的比例，一般取2的n次幂，如：2，4，6，8，16... |
| `particleMaxNumber` | `number` | 是 | - | 粒子最大数量限制 |
| `speedPower` | `number` | 否 | 1 | 粒子速度的幂次方，小于1则粒子速度变小，大于1则粒子速度变大。默认值：1，注意：场内粒子的速度差距比较大时才需要设置此参数 |
| `colorStops` | `array` | 是 | - | 颜色插值对象数组，支持按速度显示对应颜色，每一个对象都有以下属性： |
| `colorStops.color` | [`Color`](/docs/api/types#color) | 是 | - | 速度值对应的图例颜色 |
| `colorStops.value` | `number` | 是 | - | 速度值 |
| `opacityStops` | `array` | 是 | - | 不透明度插值对象数组，支持按速度显示对应的不透明度，每一个对象都有以下属性： |
| `opacityStops.opacity` | `number` | 是 | - | 速度值对应的不透明度，取值范围：[0~1] |
| `opacityStops.value` | `number` | 是 | - | 速度值 |
| `subFields` | `array` | 是 | - | 向量场支持的子场渲染范围会根据相机距离自动计算，定义一个或多个区域的子场来实现远近景切换Lod的效果，子场范围是依次包含的关系，第一个是从整体中指定一部分，第二个应该比第一个更小，依次类推，形成多级lod效果，每一个子场对象包含的参数如下： |
| `subFields.renderSphereOutRadius` | `number` | 是 | - | 子场动态渲染的球的内径 |
| `subFields.renderSphereInnerRadius` | `number` | 是 | - | 子场动态渲染的球的外径 |
| `subFields.startIndex` | `number` | 是 | - | 父场repeatcount参数中该子场区域使用的粒子发射器数量的起始索引，剩下的粒子发射器影响父场 |
| `subFields.endIndex` | `number` | 是 | - | 父场repeatcount参数中该子场区域使用的粒子发射器数量的结束索引，剩下的粒子发射器影响父场 |
| `subFields.singleSpriteSize` | `number` | 是 | - | 子场的单个粒子大小，单位米，影响粒子大小 |
| `subFields.lodMin` | `number` | 否 | 0.6 | 子场包含粒子大小的最小缩放比例，默认值：0.6，影响粒子大小 |
| `subFields.lodMax` | `number` | 否 | 2.0 | 子场包含粒子大小的最大缩放比例，默认值：2.0，影响粒子大小 |
| `subFields.spawnRate` | `number` | 是 | - | 子场粒子每秒生成的速率，影响粒子数量 |
| `subFields.spawnLineRate` | `number` | 是 | - | 每个线条上每秒生成的粒子数量 |
| `subFields.spawnLineCap` | `number` | 是 | - | 每个线条上粒子的最大数量 |
| `subFields.spawnRateMin` | `number` | 是 | - | 子场近距离粒子的生成速度，影响粒子数量 |
| `subFields.spawnRateMax` | `number` | 是 | - | 子场远距离粒子的生成速度，影响粒子数量 |
| `subFields.spawnRatePower` | `number` | 是 | - | 子场粒子的密度变化曲线，即按距离插值时使用指数函数，设置指数函数的N次方，影响粒子数量 |
| `subFields.lodMaxDistance` | `number` | 是 | - | 子场粒子大小的最大缩放距离，即从[0~lodMaxDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：举例若超过此值则使用lodMax进行缩放，影响粒子大小 |
| `subFields.lodMinDistance` | `number` | 是 | - | 子场粒子大小的最小缩放距离，即从[0~lodMinDistance]映射到[lodMin~lodMax]对粒子大小进行缩放，注意：若小于此值则使用lodMin进行缩放，影响粒子大小 |
| `subFields.lifeTime` | `number` | 是 | - | 子场粒子的生命周期，即粒子存活时间，单位：秒，影响粒子长度 |
| `subFields.lifeTimeMinScale` | `number` | 是 | - | 子场粒子生命周期的缩放因子范围的最小值 |
| `subFields.lifeTimeMaxScale` | `number` | 是 | - | 子场粒子生命周期的缩放因子范围的最大值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求数据结构示例 
        [{
            "id":"vectorField",
            "coordinate":[0,0,0],
            "repeatCount":10,
            "displayMode":0,
            "width": 720,
            "height": 360,
            "binFileIndex": 0,
            "depth": 2,
            "vetorFieldFilePath": "D:\\tif\\vf_{z}.tif", //通配符{z}表示从0开始加载：vf_0.tif,vf_1.tif 两层tif
            "dataBounds":[-20037508,-20037508,0,20037508,20037508,1000],
            "renderBounds": [-20037508,-20037508,0,20037508,20037508,1000],
            "fieldScale":[1,1,1],
            "bNeedProjection": false,
            "wkt": "",
            "offeset": [0,0,0],
            "singleSpriteSize": 100,
            "vfIntensAsVelocity": 2,
            "spawnRate": 200,
            "lifeTime": 3,
            "colorStops":  [
                {"value": 100, "color": [1,0,0,1]},
                {"value": 50,  "color": [1,1,0,1]},
                {"value": 25,  "color": [0,0,1,1]},
                {"value": 0,   "color": [0,1,0,1]}
            ],
            "opacityStops":  [
                {"value": 100, "opacity": 1},
                {"value": 50,  "opacity": 0.75},
                {"value": 25,  "opacity": 0.5},
                {"value": 0,   "opacity": 0}
            ],
            "subFields": [
                {
                    "renderBoundRatio":[0.2,0.2,1],
                    "startIndex": 0,
                    "endIndex": 2,
                    "singleSpriteSize": 50,
                    "lodMin": 1,
                    "lodMax": 1,
                    "spawnRate": 200,
                    "spawnRateMin": 100,
                    "spawnRateMax": 500,
                    "spawnRatePower": 1,
                    "lodMinDistance": 500,
                    "lodMaxDistance": 1000,
                    "lifeTime": 3,
                    "lifeTimeMinScale": 1,
                    "lifeTimeMaxScale": 2,
                },
            
            ]
        }]
```

> 示例：Add

```js
//添加前先清空
fdapi.vectorField.clear();
let tifPath = HostConfig.Path + "/assets/tif/typhoon.tif";
let typhoon = {
    "id": "typhoon",
    "coordinate": [0, 0, 0],
    "repeatCount": 10,
    "displayMode": VectorFieldStyle.Typhoon,
    "width": 453,
    "height": 565,
    "fieldScale": [1, 1, 1],
    "bNeedProjection": false,
    "wkt": "",
    "offset": [0, 0, 0],
    "singleSpriteSize": 9000,
    "vfIntensAsVelocity": 45000 * 0.3,
    "lifeTime": 3,
    "headBrightness": 1,
    "bDynamicRenderBound": false,
    "vetorFieldFilePath": tifPath
}
__g.vectorField.add(typhoon);
//fdapi.vectorField.focus('typhoon', 1000000);
fdapi.camera.set(12632340.389977, 2689776.08445, 10794963.2, -85.981941, -91.865036, 0);
```

---

### `clear(fn)` {#clear}

清空场景中所有的VectorField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.vectorField.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个VectorField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的VectorField对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.vectorField.delete('typhoon');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | VectorField对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.vectorField.focus('typhoon', 10000000);
```

---

### `get(ids, fn)` {#get}

根据ID获取VectorField对象的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的VectorField对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
VectorField的详细信息
[{
            "id":	"flowField1",
            "groupId":	"flowFieldGroup1",
            "userData":	"myFlowFieldData",
            "coordinateType":	0,
            ...
            
        }]
```

> 示例：Get

```js
fdapi.vectorField.get('typhoon');
```

---

### `hide(ids, fn)` {#hide}

隐藏VectorField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | VectorField对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.vectorField.hide('typhoon');
```

---

### `setViewportVisible(id, vp, fn)` {#setViewportVisible}

设置向量场对象在进入多视口状态下视口可见性

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | VectorField对象ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 是 | - | 视口掩码（Viewport位运算） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

//设置1和3视口可见
fdapi.vectorField.setViewportVisible('typhoon', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)` {#show}

显示VectorField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | VectorField对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.vectorField.show('typhoon');
```

---

### `update(data, fn)` {#update}

修改一个或多个VectorField对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 构造向量场对象VectorField的数据对象，可以是Object类型或者Array类型，对于每一个VectorField对象，目前只支持更新以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | VectorField对象ID |
| `dataBounds` | `array` | 是 | - | 向量场数据经纬度范围和高度范围 |
| `renderBounds` | `array` | 是 | - | 待绘制的数据范围，可以与向量场数据不一致 |
| `singleSpriteSize` | `number` | 是 | - | 单个粒子大小，单位米 |
| `singleSpriteSizeOcean` | `number` | 是 | - | 洋流模式下单个粒子大小，仅displayMode为洋流模式生效，单位米 |
| `vfIntensAsVelocity` | `number` | 是 | - | 场到强度到速度的缩放比例 |
| `lifeTime` | `number` | 是 | - | 粒子的生命周期，即粒子存活时间，单位：秒，影响粒子长度 |
| `lifeTimeOcean` | `number` | 是 | - | 洋流模式下粒子存活时间，仅displayMode为洋流模式生效，单位：秒 |
| `colorStops` | `array` | 是 | - | 颜色插值对象数组，支持按速度显示对应颜色，每一个对象都有以下属性： |
| `colorStops.color` | `array` | 是 | - | 速度值对应的图例颜色 |
| `colorStops.value` | `number` | 是 | - | 速度值 |
| `opacityStops` | `array` | 是 | - | 不透明度插值对象数组，支持按速度显示对应的不透明度，每一个对象都有以下属性： |
| `opacityStops.opacity` | `number` | 是 | - | 速度值对应的不透明度，取值范围：[0~1] |
| `opacityStops.value` | `number` | 是 | - | 速度值 |
| `fenceThickness` | `number` | 否 | 1 | 向量场栅栏宽度，默认值：1 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let tifPath = HostConfig.Path + "/assets/tif/typhoon.tif";
//待更新对象
let typhoon = {
    "id": "typhoon",
    "repeatCount": 20,
    "displayMode": VectorFieldStyle.Typhoon,
    "fieldScale": [1, 1, 1],
    "bNeedProjection": false,
    "wkt": "",
    "offset": [0, 0, 0],
    "singleSpriteSize": 10000,
    "vfIntensAsVelocity": 45000 * 0.8,
    "lifeTime": 5,
    "headBrightness": 2,
    "vetorFieldFilePath": tifPath
}
fdapi.vectorField.update(typhoon);
```
