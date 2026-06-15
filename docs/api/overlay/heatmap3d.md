---
title: HeatMap3D
sidebar_label: HeatMap3D
description: "HeatMap3D三维热力图相关的操作，三维热力图有以下几种构建方式： 1、根据16张空间图片构建 addByImages() 2、根据空间离散点和对应的热力值构建 addByHeatPoints() 3、根据三维体素的热力值构建 addByVoxels() 4、根据稀疏体素构建 addBySpar"
---

# HeatMap3D

HeatMap3D三维热力图相关的操作，三维热力图有以下几种构建方式：

1、根据16张空间图片构建 addByImages()

2、根据空间离散点和对应的热力值构建 addByHeatPoints()

3、根据三维体素的热力值构建  addByVoxels()

4、根据稀疏体素构建      addBySparseVoxels()

一般通过api.heatmap3d调用其方法。 HeatMap3D效果图如下：



![](/img/refdoc/api/HeatMap3D.gif)

通过 `api.heatmap3d` 访问。

---

## 方法（Methods）

### `addByHeatPoints(data, fn)`

根据空间离散点和对应热力值构建三维热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |
| `displayMode` | `number` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `indices` | `array` | 离散热力点坐标的索引；数组元素类型：(number)；取值示例：[2, 0, 3, 0, 2, 1]，注意：仅在voxelShape=2四面体模式下生效 |
| `voxels` | `array` | 离散热力点的坐标数组，包含热力点坐标、热力值影响半径(或盒子范围)、热力值和不透明度四个属性，结构示例：[&#123;"coordinate": [0,0,0],"radius": 5,"heatValue": 0.5,"alpha": 1&#125;] |
| `voxels.coordinate` | `array` | 离散热力点的坐标位置，示例：[x,y,z] |
| `voxels.heatValue` | `array` | 热力点对应的热力值，用于匹配colors参数的colorStops数组内颜色 |
| `voxels.radius` | `number` | 可选，二选一，热力点的半径，当voxelShape=0球体时生效 |
| `voxels.extent` | `array` | 可选，二选一，热力点的盒子范围，即长方体的长宽高：[xSize,ySize,zSize]，voxelShape=1盒子时生效 |
| `voxels.alpha` | `number` | 热力点不透明度 |
| `voxelAlphaMode` | `number` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |
| `voxelShape` | `number` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |
| `voxelSize` | `number` | 三维体素块尺寸，支持仅传入Voxels和VoxelSize参数，则自动计算Bounds和TextureSize |
| `voxelGridSize` | `array` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |
| `textureSize` | `number` | 纹理尺寸，取值范围：[128~512]，默认：128 |
| `denoise` | `number` | 降噪级别，取值范围：[0,1,2,3,4,5]，默认值：0 不做降噪；1~5 五级，注意：值越大添加越耗时 |
| `bbox` | `array` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `boundsColor` | `array` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |
| `volumeBoxLocation` | `array` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxRotation` | `array` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxSize` | `array` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |
| `heatValueMode` | `number` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |
| `heatValueRange` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `blendMode` | `number` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

> 示例：AddByHeatPoints

```js
let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

let pointsArr = [];
for (let i = 0; i < 1000; i++) {

    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ

    let coordinate = [x, y, z];
    let heatValue = Math.random() * 100;
    let o = {
        "coordinate": coordinate,
        "extent": [1, 1, 1],
        // "radius": Math.random() * 5, //球体时生效
        "heatValue": heatValue
    };
    pointsArr.push(o);
}

let indicesTemp = [];
for (let i = 0; i < 2000; i++) {
    indicesTemp.push(i)
}

//添加前先删除
fdapi.heatmap3d.clear();
let heatmap3d = [{
    "id": "heatmap3d_byHeatPoints",
    "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
    "brightness": 10,
    "volumeBoxLocation": [491353.46875, 2488833, 16],
    "heatValueMode": 0,
    "voxelAlphaMode": 0,
    "voxelShape": 1,
    "heatValueRange": [0, 100],
    "textureSize": 256,
    "denoise": 0,
    "colors": {
        "gradient": false,
        "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明
        "colorStops": [
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
        ]
    },
    "voxels": pointsArr,
    "indices": indicesTemp
}];
await fdapi.heatmap3d.addByHeatPoints(heatmap3d);
fdapi.heatmap3d.focus('heatmap3d_byHeatPoints', 50);
```

---

### `addByImages(data, fn)`

根据16张空间图片构建三维热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |
| `imagesArray` | `array` | 二选一，16张1024*1024的空间热力图图片的路径，空间位置从低到高，参考示例代码，注意：仅空间图片构建时生效 |
| `imageFiles` | `array` | 二选一，构成空间热力图图片对象数组，每一个图片对象包含以下属性： |
| `imageFiles.size` | `array` | 图片尺寸 |
| `imageFiles.images` | `array` | 图片对象数组，每一个对象包含一下属性： |
| `imageFiles.filePath` | `string` | 图片文件路径 |
| `imageFiles.minValue` | `number` | 最小值 |
| `imageFiles.maxValue` | `number` | 最大值 |
| `volumeBoxLocation` | `array` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxRotation` | `array` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `bbox` | `array` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `boundsColor` | `array` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |
| `volumeBoxSize` | `array` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `displayMode` | `number` | 显示模式，取值范围：[0,1,2,3] ，支持四类效果：0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `blendMode` | `number` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

> 示例：AddByImages

```js
//添加前先删除
fdapi.heatmap3d.clear();
//构造16张图片
let imagePathArr = [];
for (let i = 0; i < 16; i++) {
    let imageName = "LAY" + i + ".png";
    let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;
    imagePathArr.push(imagePath);
}
let heatmap3d = {
    id: "heatmap3d_byImages", //对象唯一id
    imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
    volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置
    volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
    volumeBoxSize: [100, 100, 100], //三维热力图盒范围
    boundsColor: [0, 1, 0, 1],//三维热力图盒线框颜色
    brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
    displayMode: 1 //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
};
await fdapi.heatmap3d.addByImages(heatmap3d);
fdapi.heatmap3d.focus('heatmap3d_byImages');
```

---

### `addBySparseVoxels(data, fn)`

根据稀疏体素构建三维热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |
| `sparseVoxels` | `object` | ) 稀疏类型体素构建三维热力对象 |
| `sparseVoxels.voxels` | `array` | 稀疏体素数组 |
| `sparseVoxels.voxel` | `array` | 稀疏体素纹理坐标索引，取值类型：[i,j,k]，i、j、k均需要小于体素尺寸size |
| `sparseVoxels.value` | `number` | 纹理坐标对应的值 |
| `sparseVoxels.data` | `string` | 用户自定义数据 |
| `sparseVoxels.size` | `array` | 稀疏体素的纹理坐标[i,j,k]的最大值，取值示例：[256,256,256]，即i、j、k的最大值为256 |
| `displayMode` | `number` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `bbox` | `array` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `boundsColor` | `array` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |
| `volumeBoxLocation` | `array` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxRotation` | `array` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxSize` | `array` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |
| `voxelAlphaMode` | `number` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |
| `voxelShape` | `number` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |
| `blendMode` | `number` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |
| `heatValueMode` | `number` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |
| `heatValueRange` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值值 |

> 示例：AddBySparseVoxels

```js
fdapi.heatmap3d.clear();

let voxels = [];
for (let i = 0; i < 2000; i++) {
    let heatValue = Math.random() * 100;

    let a = Math.round(Math.random() * 256);
    let b = Math.round(Math.random() * 256);
    let c = Math.round(Math.random() * 256);
    let o = {
        voxel: [a, b, c],
        value: heatValue,
        data: "abc" //用户自定义数据
    }
    voxels.push(o);
}

let heatmap3d = {
    id: "heatmap3dBySparseVoxels", //对象唯一id
    sparseVoxels:
    {
        voxels: voxels,
        size: [256, 256, 256]
    },
    volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
    volumeBoxLocation: [493041.969375, 2492117.6, 2.313291015625],
    volumeBoxSize: [256, 256, 256],
    brightness: 10, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
    displayMode: 1, //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
    voxelAlphaMode: 1,
    heatValueRange: [0, 68],
    colors: {
        gradient: true,
        invalidColor: [1, 0, 0, 1],
        colorStops: [{
            value: 0,
            color: [1, 0, 0, 1]
        }, {
            value: 0.2,
            color: [1, 1, 1, 1]
        }, {
            value: 0.4,
            color: [1, 1, 1, 0.6]
        }, {
            value: 0.6,
            color: [1, 1, 1, 0.6]
        }, {
            value: 0.8,
            color: [0, 1, 1, 1]
        }]
    },
};
await fdapi.heatmap3d.addBySparseVoxels(heatmap3d);
fdapi.heatmap3d.focus('heatmap3dBySparseVoxels', 10);
```

---

### `addByTif(data, fn)`

根据tif文件构建三维热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |
| `tifFiles` | `object` | 生成三维热力图的tif文件对象属性如下： |
| `tifFiles.files` | `array` | 二进制文件路径数组，示例：["D:\\xxx1.tif","D:\\xxx2.tif","D:\\xxx3.tif"...] |
| `tifFiles.size` | `array` | 可选，纹理分辨率，注意：纹理尺寸不能超过2048，最大值示例：[2048,2048] |
| `tifFiles.needProject` | `boolean` | 是否需要重投影 |
| `tifFiles.minHeight` | `number` | 可选，最小高度 |
| `tifFiles.maxHeight` | `number` | 可选，最大高度 |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `displayMode` | `number` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `clipBox` | `array` | 三维热力图盒子剖切的bbox范围，取值格式示例：[minX,minY,minZ,maxX,maxY,maxZ]，元素取值范围：[0~volumeBoxSize] |
| `clipVoxel` | `boolean` | 三维热力图执行盒子剖切时是否裁切体素(displayMode:1)，默认值：true |
| `volumeBoxLocation` | `array` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxRotation` | `array` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxSize` | `array` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |
| `voxelGridSize` | `array` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |
| `voxelAlphaMode` | `number` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |
| `voxelShape` | `number` | 三维体素块形状，取值：[0,1,2]，0 : Sphere球（注意体素设置为球时构建非常耗时） 1 : Box盒子（默认值） 2 : 四面体，注意：仅离散点构建时生效 |
| `boundsColor` | `array` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |
| `heatValueMode` | `number` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |
| `heatValueRange` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `textureSize` | `number` | 纹理尺寸，取值范围：[128~512]，默认：128 |
| `blendMode` | `number` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |
| `opacityMaskClip` | `number` | 三维热力图clipbox剖切支持的透明度阈值，色带colors参数内配置的颜色透明度值如果大于此值则进行剖切 |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |
| `billboards` | `object` | 三维热力图对象始终朝向相机（广告牌效果），仅体素模式下displayMode=1生效，包含参数如下： |
| `billboards.scale` | `number` | 可选，面向屏幕的缩放值 |
| `billboards.size` | `array` | 可选，XYZ方向分层的数量，默认值：[128,128,32] |
| `billboards.crop` | `boolean` | 可选，是否对填充范围进行缩放后的溢出部分进行裁切，默认值：true |

> 示例代码如下：

```js
await fdapi.heatmap3d.addByTif(data);
```

---

### `addByVoxels(data, fn)`

根据纯热力值构建三维热力图

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `updateTime` | `number` | 更新动画的插值时间，单位：秒，注意：参数仅更新方法update()执行时生效 |
| `displayMode` | `number` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `bbox` | `array` | 三维热力图的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `boundsColor` | `array` | 三维热力图的包围盒1px边框的颜色，默认不显示，取值示例如白色线框：[1,1,1,1] |
| `volumeBoxLocation` | `array` | 三维热力图坐标位置：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxRotation` | `array` | 三维热力图坐标旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `volumeBoxSize` | `array` | 三维热力图盒子范围：[长,宽,高]，数组元素类型：[任意浮点数]， 单位：米 |
| `heatValueMode` | `number` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |
| `heatValueRange` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `blendMode` | `number` | 三维热力图颜色混合模式，取值范围：[0,1]，0：X光效果 1：半透明效果 |
| `heatValues` | `object` | 构建三维热力图的热力值对象，注意：此参数需要根据纯热力值构建 |
| `heatValues.size` | `array` | 体素尺寸，取值示例：[x, y, z]，x*y*z就是包含的热力值数量，即values数组的长度等于x*y*z |
| `heatValues.values` | `array` | 体素的热力值，数组长度需要等于x*y*z。注意：如果某个体素的值不在heatValueRange范围内则属于无效体素不做渲染。 |
| `heatValues.alphas` | `array` | 可选参数，透明度数组，不传则默认使用colors的透明度 |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

> 示例：AddByVoxels

```js
//随机生成10*10*10个热力值
let heatValueArr = [];
for (let i = 0; i < 1000; i++) {
    let heatValue = getRandNumBetween(0, 100);
    heatValueArr.push(heatValue);
}
//添加空间体素的热力值构建heatmap3d对象（纯热力值构建）
fdapi.heatmap3d.clear();
let heatmap3d = [{
    "id": "heatmap3d_byHeatValues",
    "displayMode": 1,
    "brightness": 0.5,
    "volumeBoxLocation": [491353.46875, 2488833, 16],
    "volumeBoxSize": [500, 500, 300],
    "heatValueRange": [0, 68],
    "heatValues": {
        "size": [10, 10, 10],//相乘结果就是包含的热力值数量1000
        "values": heatValueArr,
        "alphas": []
    },
    "colors": {
        "gradient": true,
        "invalidColor": [1, 1, 1, 1],
        "colorStops": [
            {
                "value": 0,
                "color": [0, 0, 1, 1]
            }, {
                "value": 10.001801,
                "color": [0, 0, 1, 1]
            },
            {
                "value": 20.003603,
                "color": [0, 0.4, 1, 1]
            },
            {
                "value": 30.005404,
                "color": [0, 0.8, 1, 1]
            },
            {
                "value": 40.007206,
                "color": [0, 1, 0.8, 1]
            },
            {
                "value": 50.009007,
                "color": [0, 1, 0.4, 1]
            },
            {
                "value": 60.01081,
                "color": [0, 1, 0, 1]
            },

            {
                "value": 70.01261,
                "color": [0, 1, 0, 1]
            },
            {
                "value": 80.01441,
                "color": [0.4, 1, 0, 1]
            },
            {
                "value": 90,
                "color": [0.8, 1, 0, 1]
            },

            {
                "value": 93,
                "color": [1, 0, 0, 1]
            },
            {
                "value": 96.01902,
                "color": [1, 0, 0, 1]
            },
            {
                "value": 100.02162,
                "color": [1, 0, 0, 1]
            }
        ]
    }
}];
await fdapi.heatmap3d.addByVoxels(heatmap3d);
fdapi.heatmap3d.focus('heatmap3d_byHeatValues');
```

---

### `addHeatPoints(data, fn)`

动态往HeatMap3D对象内添加离散热力点，注意：仅支持空间离散点构造方法addByHeatPoints()

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | Voxel对象或对象数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `voxels` | `array` | 离散热力点信息坐标数组，包含热力点坐标、热力值影响半径（或盒子范围）、热力值和不透明度等属性，结构示例：[&#123;"coordinate": [0,0,0],"radius": 5,"heatValue": 0.5,"alpha": 1&#125;] |
| `voxels.coordinate` | `array` | 热力点的坐标位置，示例：[x,y,z] |
| `voxels.heatValue` | `array` | 热力点对应的热力值 |
| `voxels.radius` | `number` | 可选，热力点的半径，当voxelShape=0球体时生效 |
| `voxels.extent` | `array` | 可选，热力点的盒子范围，即长方体的长宽高：[xSize,ySize,zSize]，voxelShape=1盒子时生效 |
| `voxels.alpha` | `number` | 热力点不透明度 |

```js
参数结构示例
[
            {
                "id": "heatmap3d_v1",
                "voxels": [
                    {
                        "coordinate": [
                            -1121,
                            89,
                            75
                        ],
                        "radius": 50,
                        //"extent": [2,2,2],
                        "heatValue": 0.0234818,
                        "alpha": 1
                    },
                    {
                        "coordinate": [
                            -1121,
                            89,
                            75
                        ],
                        "radius": 50,
                        //"extent": [2,2,2],
                        "heatValue": 0.0234818,
                        "alpha": 1
                    }
                ]
            },
            {
                "id": "heatmap3d_v2",
                "voxels": [
                    {
                        "coordinate": [
                            -1121,
                            89,
                            75
                        ],
                        "radius": 50,
                        //"extent": [2,2,2],
                        "heatValue": 0.0234818,
                        "alpha": 1
                    },
                    {
                        "coordinate": [
                            -1121,
                            89,
                            75
                        ],
                        "radius": 50,
                        //"extent": [2,2,2],
                        "heatValue": 0.0234818,
                        "alpha": 1
                    }
                ]
            }
        ]
```

---

### `clear(fn)`

清空场景中所有的HeatMap3D

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.heatmap3d.clear();
```

---

### `delete(ids, fn)`

删除一个或多个HeatMap3D对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的HeatMap3D对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.heatmap3d.delete('heatmap3d_byImages');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap3D对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.heatmap3d.focus('heatmap3d_byImages', 100);
```

---

### `get(ids, fn)`

根据ID获取HeatMap3D的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的HeatMap3D对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
HeatMap3D的详细信息
[{
            "id":   "heatmap3d",
            "groupId":  "",
            "userData": "",
            "imagesArray":  [
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY0.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY1.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY2.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY3.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY4.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY5.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY6.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY7.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY8.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY9.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY10.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY11.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY12.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY13.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY14.png", 
                "D:\\Aircity_workspace\\dev\\SDK\\JS/media/heatmap3d/LAY15.png"
            ],
            "volumeBoxLocation":    [1057.934937, 2643.727539, 5.702500],
            "volumeBoxRotation":    [0.000000, 0.000000, 0.000000],
            "volumeBoxSize":    [100.000000, 100.000000, 100.000000],
            "displayMode":  0
        }]
```

> 示例：Get

```js
fdapi.heatmap3d.get('heatmap3d_byImages');
```

---

### `hide(ids, fn)`

隐藏HeatMap3D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.heatmap3d.hide('heatmap3d_byImages');
```

---

### `load(data, fn)`

预加载的三维热力图动画，包含多个Tif文件，加载后可以使用play()方法播放三维热力图动画。

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，对于每个对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `tifAnimation` | `object` | 生成三维热力图的tif文件对象属性如下： |
| `tifAnimation.minHeight` | `number` | 最小高度 |
| `tifAnimation.maxHeight` | `number` | 最大高度 |
| `tifAnimation.totalSeconds` | `number` | 动画播放默认的总时长，单位：秒 |
| `tifAnimation.time` | `number` | 从第几秒开始播放，默认值：0 |
| `tifAnimation.files` | `array` | tif文件路径二维数组，结构示例：[["D:\\Time0_1.tif","D:\\Time0_2.tif"],["D:\\Time1_1.tif","D:\\Time1_2.tif"]...] ，注意：tif文件纹理尺寸不能超过8192，最大值示例：[8192,8192] |
| `brightness` | `number` | 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明 |
| `displayMode` | `number` | 显示模式，取值：[0,1,2,3] ，0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果，注意：0\|1是跟全局剖切方法联动的，只有2不跟全局剖切联动需要自己传参clipBox |
| `heatValueMode` | `number` | 热力值模式，取值：[0,1,2,3,4,5,6] ，0 : Interp插值（默认值） 1 : Nearest最近 2 : Addition叠加 3 : Minimum最小 4 : Maximum最大 5 : Overwrite覆盖 6 : DoOnce独占 |
| `heatValueRange` | `array` | 热力值的范围：[min,max]，数组元素类型：[任意浮点数] |
| `voxelAlphaMode` | `number` | 三维体素块透明模式，取值：[0,1]，0 : 使用色带colors的透明度值（默认值） 1 : 使用点的热力值在heatValueRange范围内按[0~1]线性插值生成alpha，注意：仅离散点构建时生效 |
| `voxelGridSize` | `array` | 三维体素块网格尺寸，默认使用纹理尺寸，取值示例： [1,1,256] |
| `textureSize` | `number` | 纹理尺寸，取值范围：[128~512]，默认：128 |
| `blendMode` | `number` | 各图层之间的混合模式，取值范围：[0,1] |
| `colors` | `object` | 三维热力图对象的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效像素点的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

> 示例：Load

```js
let path = HostConfig.Path + "\\assets\\tif\\time0\\";
fdapi.heatmap3d.clear();
let heatmap3d = {
    "id": "heatmap3d-anima",
    "textureSize": 512,
    "brightness": 1,
    "displayMode": 1,
    "heatValueMode": 0,
    "blendMode": 1,
    "voxelGridSize": [
        1,
        1,
        128
    ],
    "voxelAlphaMode": 0,
    "alphaMode": 0,
    "heatValueRange": [
        268,
        307
    ],
    "colors": {
        "gradient": true,
        "invalidColor": [
            0,
            0,
            0,
            0
        ],
        "colorStops": [
            {
                "value": 268,
                "color": [
                    0.1843137254901961,
                    0.30980392156862746,
                    0.30980392156862746,
                    0.5254901960784314
                ]
            },
            {
                "value": 268.64,
                "color": [
                    0.4117647058823529,
                    0.4117647058823529,
                    0.4117647058823529,
                    1
                ]
            },
            {
                "value": 269.28,
                "color": [
                    0.4666666666666667,
                    0.5333333333333333,
                    0.6,
                    1
                ]
            },
            {
                "value": 269.92,
                "color": [
                    0.9411764705882353,
                    1,
                    0.9411764705882353,
                    1
                ]
            },
            {
                "value": 270.56,
                "color": [
                    0.7568627450980392,
                    0.803921568627451,
                    0.7568627450980392,
                    1
                ]
            },
            {
                "value": 271.2,
                "color": [
                    0.10588235294117647,
                    0.043137254901960784,
                    0.5098039215686274,
                    1
                ]
            },
            {
                "value": 271.84,
                "color": [
                    0.11764705882352941,
                    0.20784313725490197,
                    0.7254901960784313,
                    1
                ]
            },
            {
                "value": 272.48,
                "color": [
                    0.11764705882352941,
                    0.5647058823529412,
                    1,
                    1
                ]
            },
            {
                "value": 273.11,
                "color": [
                    0.09411764705882353,
                    0.4549019607843137,
                    0.803921568627451,
                    1
                ]
            },
            {
                "value": 273.75,
                "color": [
                    0.41568627450980394,
                    0.35294117647058826,
                    0.803921568627451,
                    1
                ]
            },
            {
                "value": 274.39,
                "color": [
                    0.5411764705882353,
                    0.16862745098039217,
                    0.8862745098039215,
                    1
                ]
            },
            {
                "value": 275.03,
                "color": [
                    0.5803921568627451,
                    0,
                    0.8274509803921568,
                    1
                ]
            },
            {
                "value": 275.67,
                "color": [
                    0.6078431372549019,
                    0.18823529411764706,
                    1,
                    1
                ]
            },
            {
                "value": 276.31,
                "color": [
                    0.5686274509803921,
                    0.17254901960784313,
                    0.9333333333333333,
                    1
                ]
            },
            {
                "value": 276.95,
                "color": [
                    0.5176470588235295,
                    0.4392156862745098,
                    1,
                    1
                ]
            },
            {
                "value": 277.59,
                "color": [
                    1,
                    0.8823529411764706,
                    1,
                    1
                ]
            },
            {
                "value": 278.23,
                "color": [
                    0.803921568627451,
                    0.7098039215686275,
                    0.803921568627451,
                    1
                ]
            },
            {
                "value": 278.87,
                "color": [
                    1,
                    0.8549019607843137,
                    0.7254901960784313,
                    1
                ]
            },
            {
                "value": 279.51,
                "color": [
                    1,
                    0.9803921568627451,
                    0.803921568627451,
                    1
                ]
            },
            {
                "value": 280.15,
                "color": [
                    0.803921568627451,
                    0.788235294117647,
                    0.6470588235294118,
                    1
                ]
            },
            {
                "value": 280.79,
                "color": [
                    0.050980392156862744,
                    0.396078431372549,
                    0.611764705882353,
                    1
                ]
            },
            {
                "value": 281.43,
                "color": [
                    0.47843137254901963,
                    0.9254901960784314,
                    0.9254901960784314,
                    1
                ]
            },
            {
                "value": 282.07,
                "color": [
                    0.08235294117647059,
                    0.6470588235294118,
                    0.7568627450980392,
                    1
                ]
            },
            {
                "value": 282.7,
                "color": [
                    0,
                    0.7490196078431373,
                    1,
                    1
                ]
            },
            {
                "value": 283.34,
                "color": [
                    0,
                    0.807843137254902,
                    0.8196078431372549,
                    1
                ]
            },
            {
                "value": 283.98,
                "color": [
                    0.2823529411764706,
                    0.8196078431372549,
                    0.8,
                    1
                ]
            },
            {
                "value": 284.62,
                "color": [
                    0.4980392156862745,
                    1,
                    0.8313725490196079,
                    1
                ]
            },
            {
                "value": 285.26,
                "color": [
                    0,
                    1,
                    0.4980392156862745,
                    1
                ]
            },
            {
                "value": 285.9,
                "color": [
                    0.4,
                    0.803921568627451,
                    0.6666666666666666,
                    1
                ]
            },
            {
                "value": 286.54,
                "color": [
                    0,
                    0.803921568627451,
                    0.4,
                    1
                ]
            },
            {
                "value": 287.18,
                "color": [
                    0.5647058823529412,
                    0.9333333333333333,
                    0.5647058823529412,
                    1
                ]
            },
            {
                "value": 287.82,
                "color": [
                    0.7529411764705882,
                    1,
                    0.24313725490196078,
                    1
                ]
            },
            {
                "value": 288.46,
                "color": [
                    0.6039215686274509,
                    0.803921568627451,
                    0.19607843137254902,
                    1
                ]
            },
            {
                "value": 289.1,
                "color": [
                    0.07450980392156863,
                    0.6588235294117647,
                    0.32941176470588235,
                    1
                ]
            },
            {
                "value": 289.74,
                "color": [
                    0.2235294117647059,
                    0.8431372549019608,
                    0.050980392156862744,
                    1
                ]
            },
            {
                "value": 290.38,
                "color": [
                    0.7607843137254902,
                    0.7019607843137254,
                    0.047058823529411764,
                    1
                ]
            },
            {
                "value": 291.02,
                "color": [
                    1,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 291.66,
                "color": [
                    1,
                    0.8431372549019608,
                    0,
                    1
                ]
            },
            {
                "value": 292.3,
                "color": [
                    0.803921568627451,
                    0.803921568627451,
                    0,
                    1
                ]
            },
            {
                "value": 292.93,
                "color": [
                    1,
                    0.6470588235294118,
                    0.30980392156862746,
                    1
                ]
            },
            {
                "value": 293.57,
                "color": [
                    1,
                    0.4980392156862745,
                    0.1411764705882353,
                    1
                ]
            },
            {
                "value": 294.21,
                "color": [
                    1,
                    0.6470588235294118,
                    0,
                    1
                ]
            },
            {
                "value": 294.85,
                "color": [
                    1,
                    0.4980392156862745,
                    0,
                    1
                ]
            },
            {
                "value": 295.49,
                "color": [
                    0.792156862745098,
                    0.4588235294117647,
                    0.027450980392156862,
                    1
                ]
            },
            {
                "value": 296.13,
                "color": [
                    1,
                    0.4470588235294118,
                    0.33725490196078434,
                    1
                ]
            },
            {
                "value": 296.77,
                "color": [
                    1,
                    0.38823529411764707,
                    0.2784313725490196,
                    1
                ]
            },
            {
                "value": 297.41,
                "color": [
                    1,
                    0.41568627450980394,
                    0.41568627450980394,
                    1
                ]
            },
            {
                "value": 298.05,
                "color": [
                    0.803921568627451,
                    0.3333333333333333,
                    0.3333333333333333,
                    1
                ]
            },
            {
                "value": 298.69,
                "color": [
                    1,
                    0.0784313725490196,
                    0.5764705882352941,
                    1
                ]
            },
            {
                "value": 299.33,
                "color": [
                    1,
                    0,
                    0.592156862745098,
                    1
                ]
            },
            {
                "value": 299.97,
                "color": [
                    1,
                    0.43137254901960786,
                    0.7058823529411765,
                    1
                ]
            },
            {
                "value": 300.61,
                "color": [
                    1,
                    0.2784313725490196,
                    0.4666666666666667,
                    1
                ]
            },
            {
                "value": 301.25,
                "color": [
                    0.8588235294117647,
                    0.35294117647058826,
                    0.4196078431372549,
                    1
                ]
            },
            {
                "value": 301.89,
                "color": [
                    0.788235294117647,
                    0.21568627450980393,
                    0.33725490196078434,
                    1
                ]
            },
            {
                "value": 302.52,
                "color": [
                    0.7843137254901961,
                    0.23529411764705882,
                    0.13725490196078433,
                    1
                ]
            },
            {
                "value": 303.16,
                "color": [
                    0.8745098039215686,
                    0.29411764705882354,
                    0.047058823529411764,
                    1
                ]
            },
            {
                "value": 303.8,
                "color": [
                    0.9333333333333333,
                    0.25098039215686274,
                    0,
                    1
                ]
            },
            {
                "value": 304.44,
                "color": [
                    1,
                    0.27058823529411763,
                    0,
                    1
                ]
            },
            {
                "value": 305.08,
                "color": [
                    0.8784313725490196,
                    0.011764705882352941,
                    0.011764705882352941,
                    1
                ]
            },
            {
                "value": 305.72,
                "color": [
                    0.6352941176470588,
                    0.12549019607843137,
                    0.2549019607843137,
                    1
                ]
            },
            {
                "value": 307,
                "color": [
                    0.9490196078431372,
                    0.047058823529411764,
                    0,
                    1
                ]
            }
        ]
    },
    "tifAnimation": {
        "files": [
            [path + "isobaricInhPa1/p_time0_isobaricInhPa1.tif", path + "isobaricInhPa2/p_time0_isobaricInhPa2.tif", path + "isobaricInhPa3/p_time0_isobaricInhPa3.tif"],
            [path + "isobaricInhPa4/p_time0_isobaricInhPa4.tif", path + "isobaricInhPa5/p_time0_isobaricInhPa5.tif", path + "isobaricInhPa6/p_time0_isobaricInhPa6.tif"],
            [path + "isobaricInhPa7/p_time0_isobaricInhPa7.tif", path + "isobaricInhPa8/p_time0_isobaricInhPa8.tif", path + "isobaricInhPa9/p_time0_isobaricInhPa9.tif"],
            [path + "isobaricInhPa10/p_time0_isobaricInhPa10.tif", path + "isobaricInhPa11/p_time0_isobaricInhPa11.tif", path + "isobaricInhPa12/p_time0_isobaricInhPa12.tif"],
            [path + "isobaricInhPa13/p_time0_isobaricInhPa13.tif", path + "isobaricInhPa14/p_time0_isobaricInhPa14.tif", path + "isobaricInhPa15/p_time0_isobaricInhPa15.tif"],
            [path + "isobaricInhPa16/p_time0_isobaricInhPa16.tif", path + "isobaricInhPa17/p_time0_isobaricInhPa17.tif", path + "isobaricInhPa18/p_time0_isobaricInhPa18.tif"],
            [path + "isobaricInhPa19/p_time0_isobaricInhPa19.tif", path + "isobaricInhPa20/p_time0_isobaricInhPa20.tif", path + "isobaricInhPa21/p_time0_isobaricInhPa21.tif"],
            [path + "isobaricInhPa22/p_time0_isobaricInhPa22.tif", path + "isobaricInhPa23/p_time0_isobaricInhPa23.tif", path + "isobaricInhPa24/p_time0_isobaricInhPa24.tif"],
            [path + "isobaricInhPa25/p_time0_isobaricInhPa25.tif", path + "isobaricInhPa26/p_time0_isobaricInhPa26.tif", path + "isobaricInhPa27/p_time0_isobaricInhPa27.tif"],
            [path + "isobaricInhPa28/p_time0_isobaricInhPa28.tif", path + "isobaricInhPa29/p_time0_isobaricInhPa29.tif", path + "isobaricInhPa30/p_time0_isobaricInhPa30.tif"],
            [path + "isobaricInhPa31/p_time0_isobaricInhPa31.tif", path + "isobaricInhPa32/p_time0_isobaricInhPa32.tif", path + "isobaricInhPa33/p_time0_isobaricInhPa33.tif"],
            [path + "isobaricInhPa34/p_time0_isobaricInhPa34.tif", path + "isobaricInhPa35/p_time0_isobaricInhPa35.tif", path + "isobaricInhPa36/p_time0_isobaricInhPa36.tif"]
        ],
        "minHeight": 0,
        "maxHeight": 1000000,
        "totalSeconds": 10
    }
}
fdapi.heatmap3d.load(heatmap3d);
fdapi.camera.set(8687397.494102, 8426718.222344, 10390890.88, -62.999722, 33.423145, 0);
```

---

### `pause(id, fn)`

暂停播放三维热力图动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap3D对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Pause

```js
fdapi.heatmap3d.pause("heatmap3d-anima");
```

---

### `play(id, fn)`

播放预加载的三维热力图动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap3D对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Play

```js
fdapi.heatmap3d.play("heatmap3d-anima");
```

---

### `queryVoxel(id, coordinate, fn)`

根据ID和坐标位置获取对应HeatMap3D对象包含体素块的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap3D对象ID |
| `coordinate` | `array` | 坐标位置 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：QueryVoxel

```js
//使用稀疏体素的贴画模式构建 再根据点击的坐标查询 
fdapi.heatmap3d.queryVoxel('heatmap3dBySparseVoxels', [493071.401875, 2492076.96, 2.313291015625]);
```

---

### `setDisplayMode(id, displayMode, fn)`

设置三维热力图的显示模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `any` | HeatMap3D的ID |
| `displayMode` | `array` | 显示模式，取值范围：0是VolumeFog,1是InstanceMesh,2是Box |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.heatmap3d.setDisplayMode(id, displayMode);
```

---

### `setTime(id, startTime, fn)`

从第几秒开始播放三维热力图动画

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap3D对象的ID |
| `startTime` | `number` | 可选，从第几秒开始播放，默认值：0秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SetTime

```js
fdapi.heatmap3d.setTime("heatmap3d-anima", 5);
```

---

### `setViewportVisible(id, vp, fn)`

设置HeatMap3D对象在进入多视口状态下视口可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | HeatMap3D对象ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

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
fdapi.heatmap3d.setViewportVisible('heatmap3d_byHeatPoints', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)`

显示HeatMap3D

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | HeatMap3D对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.heatmap3d.show('heatmap3d_byImages');
```

---

### `update(data, fn)`

修改HeatMap3D

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | HeatMap3D对象或数组，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
//构造16张图片
let imagePathArr = [];
for (let i = 0; i < 16; i++) {
    let imageName = "LAY" + i + ".png";
    let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;
    imagePathArr.push(imagePath);
}
let heatmap3d_for_update = {
    id: "heatmap3d_byImages", //对象唯一id
    imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
    volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置
    volumeBoxRotation: [0, 90, 0], //三维热力图坐标旋转
    volumeBoxSize: [100, 100, 150], //三维热力图盒范围
    brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
    displayMode: 1 //显示模式
};
await fdapi.heatmap3d.update(heatmap3d_for_update);
fdapi.heatmap3d.focus('heatmap3d_byImages');
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
await fdapi.heatmap3d.updateEnd();
```


## 更多示例

> AddHeatPointsToBox

```js
//包围盒
let bbox = [491066.28125, 2488747.75, 0, 491207.125, 2488888.5, 500];

//添加前先删除
fdapi.heatmap3d.clear();
//创建空白的盒子范围 往盒子里添加体素块
let heatmap3d = [{
    "id": "heatmap3d_byVolumeBox",
    "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
    "brightness": 10,
    "volumeBoxLocation": [491353.46875, 2488833, 20],
    "volumeBoxSize": [800, 800, 500],
    "heatValueMode": 0,
    "voxelAlphaMode": 0,
    "voxelGridSize": [256, 256, 256],
    "voxelShape": 1, // 0是圆球 1是盒子 
    "heatValueRange": [0, 100],
    "textureSize": 256,
    "denoise": 0,
    "colors": {
        "gradient": true,
        "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明
        "colorStops": [
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
        ]
    }
}];
await fdapi.heatmap3d.add(heatmap3d);
fdapi.heatmap3d.focus('heatmap3d_byVolumeBox', 200);

//往空白盒子添加100个体素块
let voxelsArr = {
    "id": "heatmap3d_byVolumeBox",
    "voxels": []
};
for (let i = 0; i < 10; i++) {

    let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
    let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
    let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ
    let coordinate = [x, y, z];
    let heatValue = Math.random() * 100;
    let voxel = {
        "coordinate": coordinate,
        "extent": [8, 8, 8],
        // "radius": Math.random() * 5, //球体时生效
        "heatValue": heatValue,
        "alpha": 1
    };
    voxelsArr.voxels.push(voxel);
}
//往heatmap3d对象添加三维像素块
await fdapi.heatmap3d.addHeatPoints(voxelsArr);
```

> AddVoxels

```js
let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

let voxelsArr = [{
    "id": "heatmap3d_byVolumePoints",
    "voxels": [
        {
            "coordinate": [
                getRandNumBetween(bbox[0], bbox[3]),
                getRandNumBetween(bbox[1], bbox[4]),
                getRandNumBetween(bbox[2], bbox[5])
            ],
            "radius": 50,
            "heatValue": 80,
            "alpha": 1
        },
        {
            "coordinate": [
                getRandNumBetween(bbox[0], bbox[3]),
                getRandNumBetween(bbox[1], bbox[4]),
                getRandNumBetween(bbox[2], bbox[5])
            ],
            "radius": 50,
            "heatValue": 20,
            "alpha": 1
        }
    ]
}];
//往heatmap3d对象添加三维像素块
await fdapi.heatmap3d.addVoxels(voxelsArr);
```

> ClipTest

```js
//定时器进行动态剖切
let heatmap3d_for_update = {
    id: "heatmap3d_byVolumePoints", //对象唯一id
    clipBox: [0, 0, 1, 500, 500, 100],//剖切盒子范围 注意：仅对displayMode=2盒子模式下生效
};

let index = 0;
let timer = setInterval(async () => {
    index++;
    if (index < 10) {
        let box = [0, 0, 0, 500, 500, 100 - 10 * index];
        heatmap3d_for_update.clipBox = box;
        await fdapi.heatmap3d.update(heatmap3d_for_update);
    } else {
        //清除定时器
        clearInterval(timer);
    }
}, 1000);
```
