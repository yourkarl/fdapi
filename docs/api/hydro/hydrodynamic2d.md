---
title: HydroDynamic2D
sidebar_label: HydroDynamic2D
description: "HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。"
---

# HydroDynamic2D

二维水动力模型对象，基于真实数据驱动生成水动力模型，支持2种格式数据源：.tif文件（栅格） | .shp文件（矢量）

通过 `api.hydrodynamic2d` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。
- **别名 / 不同行业叫法**：二维水动力 / 2D 水动力仿真 / 二维洪水演进模型 / 漫滩淹没仿真；本对象为 HydrodynamicModel/HydrodynamicModel2 的现行替代。
- **适用行业**：智慧水利、应急管理、智慧城市（防洪排涝）、能源电力（库区/电站）、海洋气象（风暴潮/漫滩）。
- **使用场景**：
  - 流域、城区面状洪水演进的时序回放，动态展示水深扩散与流速流向变化。
  - 溃坝、超标洪水的淹没过程仿真与受淹范围演示，支撑应急研判与撤离决策。
  - 河道行洪、漫滩淹没的流场样式/热力图样式展示，配合调色板表达水深或流速分布。
- **注意事项**：
  - shp 方式要求投影坐标系（PCS）且单位为米；update() 更新用 .dat 文件，且只含有水网格面以减小文件、提升更新效率。
  - 真实水样式（displayMode=0）下 waterColor 生效，热力/流场样式需配置 depthRange/speedRange 与调色板；开启 collision 会影响加载效率。
  - 数据量大时注意分辨率与时序文件规模对加载与播放性能的影响；新项目请优先用本对象而非已废弃的 HydrodynamicModel 系列。

## 方法（Methods）

### `addByShp(data, fn)`

添加一个或多个HydroDynamic2D二维水动力模型对象，添加的数据源为(.shp)文件，注意：SHP文件必需是投影坐标系（PCS），同时单位是米。

**注意：使用shp方式来添加二维水动力模型对象，执行update()更新方法时需使用.dat类型文件，同时dat文件只需要包含有水的网格面，确保dat文件尽量小，从而提高更新效率。详情参考shpDataFilePath字段描述**

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 构造二维水动力模型对象HydroDynamic2D的数据对象，可以是Object类型或者Array类型，对于每一个HydroDynamic2D对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HydroDynamic2D对象ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `offset` | `array` | 可选，二维水动力模型的整体偏移，默认值：[0, 0, 0] |
| `collision` | `boolean` | 是否开启模型碰撞，默认值：false，注意：开启后会影响加载效率 |
| `displayMode` | [`HydroDynamic2DStyle`](/docs/api/types#hydrodynamic2dstyle) | (`HydroDynamic2DStyle`) 二维水动力模型的显示样式，取值范围：[0,1,2]，0真实水样式（默认值），1热力图样式,2流场样式 |
| `waterMode` | [`WaterMode`](/docs/api/types#watermode) | (`WaterMode`) 真实水样式的水面材质类型，取值范围：[0,1,2]，默认值：0，注意：水面材质支持和热力图样式叠加 |
| `waterColor` | [`Color`](/docs/api/types#color) | 可选，水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) ，注意：此参数仅在displayMode设置为真实水样式时生效，如果不传则使用waterMode自带水材质颜色 |
| `waveBrightness` | `number` | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |
| `depthRange` | `array` | 可选，二维水动力模型水深对应的数值区间，如果不传则系统会自动计算并使用dat数据的水深范围 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用dat数据包含的水深字段自动控制不透明度，默认值：1 |
| `alphaGradientDepthRange` | `array` | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowTiling` | `number` | 箭头平铺系数 |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 流速UV值对应的调色板颜色，注意arrowDisplayMode=1时，此颜色值的透明度生效 |
| `arrowColors.value` | `number` | 流速UV值 |
| `alphaComposite` | `boolean` | 是否使用混合透明度，默认：true |
| `rippleDensity` | `number` | 可选，水波纹辐射强度，默认值：1 |
| `rippleTiling` | `number` | 可选，水波纹辐射平铺系数，默认值：1 |
| `speedRange` | `array` | 可选，流速范围，默认值：[0.1,3] |
| `speedFactor` | `number` | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |
| `flowThreshold` | `array` | 可选，水浪效果漫延的深度区间范围，区间外不生成浪头效果，默认值：[0.1,0.4] |
| `crestWaterSpeedRange` | `array` | 可选，水浪效果漫延的流速区间范围，默认值：[0,1]，注意：和深度区间表现为叠加的效果，区间内的水流速度值越大浪头越来越明显 |
| `shpFilePath` | `string` | 添加二维水动力模型整体范围的shp文件路径，取值示例："C:/shpFile/xxx.shp"。注意：此shp文件包含水动力模型所有网格的范围，类型为Polygon，坐标系必须是PCS类型，单位是米，同时shp文件属性表字段必须包含ID和Elev两个字段：ID是网格ID，int类型；Elev是网格的高程值，double类型，单位是米 |
| `shpDataFilePath` | `string` | 可选参数，仅在update()方法执行生效。更新二维水动力模型时包含水面网格的dat类型文件路径，取值示例："C:/datFile/xxx.dat"。注意：dat文件是一种二进制文件，它提取了某一时刻包含的所有水面网格的信息，并把这些信息依次写入了二进制文件dat，一个水面网格信息包含如下一组四个值：id,h,u,v。id对应shp属性表ID字段（int类型），h是网格对应的水深（double类型，单位是米），uv是流速和流向（double类型，单位米/秒，u朝东，v朝北）。 |
| `updateTime` | `number` | 可选参数，更新动画的插值时间，注意：仅update()更新方法执行时生效，默认值：1s |
| `arrowVisibleDistance` | `number` | 可选参数，动态箭头显示的最大距离，单位：米 |
| `dynamicArrow` | `object` | 可选参数，动态箭头的配置参数对象 |
| `dynamicArrow.numArrows` | `number` | 箭头数量 |
| `dynamicArrow.speedFactor` | `number` | 速度因子 |
| `dynamicArrow.sizeScale` | `number` | 尺寸缩放因子 |
| `colors` | `object` | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 水深值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |
| `colors.value` | `number` | 水深值 |

> 示例代码如下：

```js
await fdapi.hydrodynamic2d.addByShp(data);
```

---

### `addByTif(data, fn)`

添加一个或多个HydroDynamic2D二维水动力模型对象，数据源为.tif文件。

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 构造二维水动力模型对象HydroDynamic2D的数据对象，可以是Object类型或者Array类型，对于每一个HydroDynamic2D对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HydroDynamic2D对象ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `bbox` | `array` | 可选，二维水动力模型的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `offset` | `array` | 可选，二维水动力模型的整体偏移，默认值：[0, 0, 0] |
| `dataSize` | `array` | 可选，二维水动力模型的数据分辨率，取值示例：[X,Y] |
| `updateTime` | `number` | 更新动画的插值时间，注意：参数仅update()更新方法执行时生效 |
| `waterDepth` | `string` | 必选，二维水动力模型tif数据文件路径（水深文件tif），取值示例："C:/tifFile/xxx1.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `flowField` | `string` | 可选，二维水动力模型tif数据文件路径（流速流向文件tif），取值示例："C:/tifFile/xxx2.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `dem` | `string` | 可选，二维水动力模型tif数据文件路径（河道DEM文件tif），取值示例："C:/tifFile/xxx3.tif"，注意：waterDepth、flowField和dem的三个tif文件分辨率必须保持一致 |
| `collision` | `boolean` | 是否开启模型碰撞，默认：false，注意：开启后会影响加载效率 |
| `displayMode` | [`HydroDynamic2DStyle`](/docs/api/types#hydrodynamic2dstyle) | (`HydroDynamic2DStyle`) 二维水动力模型的显示样式，取值范围：[0,1,2]，0真实水样式（默认值），1热力图样式，2流场样式 |
| `waterMode` | [`WaterMode`](/docs/api/types#watermode) | (`WaterMode`) 真实水样式的水面材质类型，取值范围：[0,1,2]，默认值：0，注意：水面材质支持和热力图样式叠加 |
| `waterColor` | [`Color`](/docs/api/types#color) | 可选，水面颜色和透明度，注意：仅在displayMode=0时生效，支持四种格式，[取值示例](/docs/tutorials/color) ，注意：此参数仅在displayMode设置为真实水样式时生效，如果不传则使用waterMode自带水材质颜色 |
| `waveBrightness` | `number` | 可选，水波纹的显示亮度，取值范围：[0~1000]，值越大亮度越高水波纹越明显，默认值：1 |
| `depthRange` | `array` | 可选，二维水动力模型水深对应的数值区间，如果不传则系统会自动计算并使用tif数据的水深范围 |
| `alphaGradientDepthRange` | `array` | 边缘羽化的水深范围，默认值：[0,2]，单位：米，对应的alpha区间为[0,1]，注意：仅在alphaMode=1时生效 |
| `alphaMode` | `number` | 透明模式，取值：[0,1]，0 : 使用colors调色板的不透明度值 1 : 使用tif数据包含的水深字段自动控制不透明度，默认值：1 |
| `arrowColor` | [`Color`](/docs/api/types#color) | 箭头颜色和透明度，支持四种格式，[取值示例](/docs/tutorials/color) |
| `arrowTiling` | `number` | 箭头平铺系数 |
| `arrowDisplayMode` | `number` | 箭头显示模式，取值范围：[0,1]，0默认样式（受arrowColor参数影响），1热力样式（受arrowColors调色板参数影响），默认值：0 |
| `arrowAlphaMode` | `number` | 箭头透明度模式，仅在arrowDisplayMode=0时生效，取值：[0,1]，0使用arrowColor的透明度，1使用调色板的透明度，默认值：0 |
| `arrowColors` | `object` | 箭头颜色调色板，仅在arrowDisplayMode=1时生效，河道箭头热力样式下的调色板配色对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `arrowColors.gradient` | `boolean` | 是否渐变 |
| `arrowColors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `arrowColors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `arrowColors.color` | [`Color`](/docs/api/types#color) | 流速UV值对应的调色板颜色，注意arrowDisplayMode=1时，此颜色值的透明度生效 |
| `arrowColors.value` | `number` | 流速UV值 |
| `rippleDensity` | `number` | 可选，水波纹辐射强度，默认值：1 |
| `rippleTiling` | `number` | 可选，水波纹辐射平铺系数，默认值：1 |
| `speedRange` | `array` | 可选，流速范围，默认值：[0.1,3] |
| `speedFactor` | `number` | 可选，速度因子，控制水波纹或者粒子的速度，默认值：1 |
| `flowThreshold` | `array` | 可选，水浪漫延效果产生的深度区间，区间外不生成水浪效果，默认值：[0.1,0.4] |
| `crestWaterSpeedRange` | `array` | 可选，水浪漫延效果产生的流速区间，默认值：[0.2, 0.6]，注意：和深度区间表现为叠加的效果，区间内的水流速度值越大浪头越来越明显，如果流速大于区间最大值则和最大值的浪头效果一致。 |
| `colors` | `object` | 二维水动力模型自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 水深值对应的调色板颜色，注意alphaMode=0时，此颜色值的透明度生效 |
| `colors.value` | `number` | 水深值 |

```js
请求数据结构示例 
        [{
        "id": "hdm",
        "displayMode": 0,
        "waterMode": 0,
        "alphaMode": 1,
        "depthRange": [0, 3],
        "waterDepth":"d:\\waterDepth.tif",
        "flowField":"d:\\flowField.tif",
        "dem":"d:\\dem.tif",
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.25,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.75,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1,
                    "color": [1, 0, 0, 1]
                }
            ]
        }]
```

---

### `clear(fn)`

删除场景中所有的HydroDynamic2D

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.hydrodynamic2d.clear();
```

---

### `delete(ids, fn)`

删除一个或多个HydroDynamic2D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HydroDynamic2D对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.hydrodynamic2d.delete('hdm_shp_clip');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic2D对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
```

---

### `get(ids, fn)`

根据ID获取HydroDynamic2D的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HydroDynamic2D对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Get

```js
fdapi.hydrodynamic2d.get('hdm_shp_clip');
```

---

### `hide(ids, fn)`

隐藏HydroDynamic2D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic2D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.hydrodynamic2d.hide('hdm_shp_clip');
```

---

### `show(ids, fn)`

显示HydroDynamic2D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HydroDynamic2D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.hydrodynamic2d.show('hdm_shp_clip');
```

---

### `update(data, fn)`

修改一个或多个HydroDynamic2D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HydroDynamic2D对象或者数组，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据HydroDynamic2D对象的ID更新以下属性 |
| `vertexWaterDepth` | `boolean` | 是否根据顶点水深插值，默认值：true，设置为false使用网格面插值 |
| `updateTime` | `number` | 更新动画的插值时间，注意：仅update()更新方法执行时生效，默认值：1s |
| `shpDataFilePath` | `string` | 更新二维水动力模型时包含水面网格的dat类型文件路径，取值示例："C:/datFile/xxx.dat"。注意：dat文件是一种二进制文件，它提取了某一时刻包含的所有水面网格的信息，并把这些信息依次写入了二进制文件dat，一个水面网格信息包含如下一组四个值：id,h,u,v。id对应shp属性表ID字段（int类型），h是网格对应的水深（double类型，单位是米），uv是流速和流向（double类型，单位米/秒，u朝东，v朝北）。id h u v四个字段分别对应4+8+8+8字节数据，id是int类型，其他double，按小端字节顺序（ByteOrder.LITTLE_ENDIAN）写入二进制dat文件 |

```js
读取和写入dat文件的Java示例代码如下：


//读取dat
       public void readDat(){

            String datFilePath = "C:\\dat\\test01.dat";
            byte[] bytes = new byte[4 + 8 + 8 + 8];
            FileInputStream fis = new FileInputStream(new File(datFilePath));
            while (fis.read(bytes, 0, bytes.length) != -1) {

                int id = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 0, 4)).order(ByteOrder.LITTLE_ENDIAN).getInt();
                Double h = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 4, 12)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                Double u = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 12, 20)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                Double v = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 20, 28)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                //输出网格的id 对应的水深h 流速流向u v
                System.out.println("id:"+ id);
                System.out.println("h:"+ h);
                System.out.println("u:"+ u);
                System.out.println("v:"+ v);
            }
        }
    
        //写入dat
        public void writeDat(){
            String datFilePath = "D:\\dat\\test01.dat";
            OutputStream fos = new BufferedOutputStream(Files.newOutputStream(Paths.get(datFilePath)));

            //网格的id
            int id = 0;
            //写入100个网格数据
            for(int i=0;i<100;i++){
                id = i;
                //网格对应的水深
                double h = Math.random();
                //uv 流速
                double u = Math.random();
                double v = Math.random();
                byte[] bytes = ByteBuffer.allocate(4 + 8 + 8 + 8).order(ByteOrder.LITTLE_ENDIAN).putInt(id).putDouble(h).putDouble(u).putDouble(v).array();
                fos.write(bytes);
            }
            fos.close();
        }
```

> 示例：Update

```js
fdapi.hydrodynamic2d.clear()
let path = HostConfig.Path;
let hydrodynamic2d_add = {
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID
    displayMode: 1, // 水流场样式： 0水面 1热力 2流场
    collision: true, //开启碰撞
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
    arrowVisibleDistance: 5000000, ////动态箭头距离
    dynamicArrow: { //动态箭头配置
        numArrows: 5000,
        speedFactor: 10,
        sizeScale: 0.1
    }
}
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

let index = 0;
let hydrodynamicModel_for_update = {
    "id": "hdm_shp_clip",
    "updateTime": 1,
    "vertexWaterDepth": true,
    "shpDataFilePath": ""
}

//使用dat数据填充shp网格
let updateTimer = setInterval(async () => {
    index = index + 1;
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

    if (index > 3) {
        clearInterval(updateTimer)
    } else {
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
    }
}, 3000);
```


## 更多示例

> AddByShp(水面)

```js
fdapi.hydrodynamic2d.clear()
let path = HostConfig.Path;
let hydrodynamic2d_add = {
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID
    displayMode: 0, // 水流场样式： 0水面 1热力 2流场
    collision: true, //开启碰撞
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
}
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

let index = 0;
let hydrodynamicModel_for_update = {
    "id": "hdm_shp_clip",
    "updateTime": 1,
    "vertexWaterDepth": true,
    "shpDataFilePath": ""
}

//使用dat数据填充shp网格
let updateTimer = setInterval(async () => {
    index = index + 1;
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

    if (index > 3) {
        clearInterval(updateTimer)
    } else {
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
    }
}, 3000);
```

> AddByShp(热力)

```js
fdapi.hydrodynamic2d.clear()
let path = HostConfig.Path;
let hydrodynamic2d_add = {
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID
    displayMode: 1, // 水流场样式： 0水面 1热力 2流场
    collision: true, //开启碰撞
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
    arrowVisibleDistance: 5000000, ////动态箭头距离
    dynamicArrow: { //动态箭头配置
        numArrows: 5000,
        speedFactor: 10,
        sizeScale: 0.1
    }
}
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

let index = 0;
let hydrodynamicModel_for_update = {
    "id": "hdm_shp_clip",
    "updateTime": 1,
    "vertexWaterDepth": true,
    "shpDataFilePath": ""
}

//使用dat数据填充shp网格
let updateTimer = setInterval(async () => {
    index = index + 1;
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

    if (index > 3) {
        clearInterval(updateTimer)
    } else {
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
    }
}, 3000);
```

> AddByShp(流场)

```js
fdapi.hydrodynamic2d.clear()
let path = HostConfig.Path;
let hydrodynamic2d_add = {
    id: 'hdm_shp_clip', // HydroDynamic2D对象ID
    displayMode: 2, // 水流场样式： 0水面 1热力 2流场
    collision: true, //开启碰撞
    shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
}
await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
//  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

let index = 0;
let hydrodynamicModel_for_update = {
    "id": "hdm_shp_clip",
    "updateTime": 1,
    "vertexWaterDepth": true,
    "shpDataFilePath": ""
}

//使用dat数据填充shp网格
let updateTimer = setInterval(async () => {
    index = index + 1;
    hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

    if (index > 3) {
        clearInterval(updateTimer)
    } else {
        await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
    }
}, 3000);
```

> AddByTif(水面)

```js
//添加tif数据源
fdapi.hydrodynamic2d.clear();
let path = HostConfig.Path;
let hydrodynamic2d_add = {
    "id": "hdm_tif",
    "displayMode": 0,//真实水样式
    "waterMode": 0, //水面材质类型
    "alphaMode": 0,//使用colors色带透明度
    "alphaGradientDepthRange": [0, 2],//羽化范围
    "collision": true,//开启碰撞
    "arrowColor": [1, 1, 1, 0.18],//可选
    "arrowTiling": 2,//可选
    "rippleDensity": 1,//可选
    "rippleTiling": 1,//可选
    "speedFactor": 1,//可选
    "speedRange": [0, 1],//可选
    "alphaComposite": true,
    "waterDepth": path + "/assets/tif/depth.tif",
    "flowField": path + "/assets/tif/uv.tif",
    "dem": path + "/assets/tif/dem.tif",
    "colors": {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            { "value": 0, "color": [0, 1, 0, 0] },
            { "value": 0.1, "color": [0.2196, 0.6549, 0, 0] },
            { "value": 0.5, "color": [0.4314, 0.7608, 0.0118, 0.11] },
            { "value": 1, "color": [0.6902, 0.8784, 0.0039, 0] },
            { "value": 1.5, "color": [1, 1, 0, 1] },
            { "value": 2.5, "color": [1, 0.3333, 0, 1] },
            { "value": 3, "color": [1, 0, 0, 1] }
        ]
    }
};
fdapi.hydrodynamic2d.addByTif(hydrodynamic2d_add);
//fdapi.hydrodynamic2d.focus('hdm_