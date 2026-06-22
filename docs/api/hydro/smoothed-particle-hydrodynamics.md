---
title: SmoothedParticleHydrodynamics
sidebar_label: SmoothedParticleHydrodynamics
description: "SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。"
---

# SmoothedParticleHydrodynamics

光滑粒子流体动力学仿真对象，实现对光滑粒子流体动力学仿真对象的操作

![](/img/refdoc/api/sph.gif)

通过 `api.smoothedParticleHydrodynamics` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。
- **别名 / 不同行业叫法**：SPH / 光滑粒子流体 / 无网格流体 / 溃坝粒子仿真 / 流体喷溅仿真。
- **适用行业**：智慧水利（溃坝）、应急管理、水电、科研仿真
- **使用场景**：
  - 溃坝/漫坝洪水演进的粒子级模拟
  - 闸门泄流、喷溅过程的可视化
  - 强非线性自由表面流体过程展示
- **注意事项**：
  - 粒子数量直接决定精度与性能，需权衡
  - 计算资源消耗大
  - 适合局部强动态场景，不适合大范围长历时模拟


## 构造函数

```js
new SmoothedParticleHydrodynamics()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addByBin`](#addByBin) | 根据bin时序文件添加一个或多个光滑粒子流体动力学仿真对象 |  |
| [`addByVtk`](#addByVtk) | 根据vtk时序文件添加一个或多个光滑粒子流体动力学仿真对象 |  |
| [`clear`](#clear) | 清空场景中所有的光滑粒子流体动力学仿真对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个光滑粒子流体动力学仿真对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据光滑粒子流体动力学仿真对象ID获取光滑粒子流体动力学仿真对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏光滑粒子流体动力学仿真对象 | 按业务条件隐藏对象 |
| [`show`](#show) | 显示光滑粒子流体动力学仿真对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个光滑粒子流体动力学仿真对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `addByBin(data, fn)` {#addByBin}

根据bin时序文件添加一个或多个光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 光滑粒子流体动力学仿真对象，可以是Object类型或者Array类型，对于每一个SmoothedParticleHydrodynamics对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 光滑粒子流体动力学仿真对象的唯一标识符ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `origin` | `array` | 仿真模型对象的原点，默认值：[0, 0, 0]，如果bin文件内坐标是相对坐标则此参数相当于offset |
| `style` | `number` | 光滑粒子流体动力学仿真对象样式，取值范围：[0,1,2,3,4]，取值描述：0热力样式 1~4四种水材质样式，默认值：0 |
| `duration` | `number` | 仿真的持续时间，单位：秒，默认值：30s |
| `loop` | `boolean` | 是否循环播放，默认值：false |
| `play` | `boolean` | 添加后是否开始播放，默认值：false |
| `files` | `array` | 按时序排列的二进制bin文件路径的二维数组，结构示例：["D:\Time1.bin","D:\Time2.bin"...]，bin文件格式描述：x,y,z,value，四个字段分别对应四个8字节的double字段，按小端字节顺序（ByteOrder.LITTLE_ENDIAN）写入二进制bin文件 |
| `particleNumSides` | `number` | 可选，粒子多边形的边的数量，控制粒子几何形状的复杂度，默认值：2 |
| `particle` | `object` | 光滑粒子样式属性如下： |
| `particle.thickness` | `number` | 每个粒子的基础水深，默认值：0.02米 |
| `particle.radius` | `number` | 每个粒子的默认半径，默认值：15米 |
| `colors` | `object` | 热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
生成bin文件和读取bin文件的Java代码示例：


        public static void writeBinFile(){
            //二进制文件生成路径
            String binPath = "C:\\bin\\";

            //8个坐标点+业务对应value
            double[][] sphParticleData = {

                {
                    6557.337744,
                    5574.320115,
                    3238.832747,
                    48.890203
                },
                {
                    6473.064509,
                    5089.487075,
                    3168.192248,
                    43.51641
                },
                {
                    6707.48572,
                    4800.570737,
                    3048.399799,
                    46.022058
                },
                {
                    6894.066684,
                    4529.364945,
                    3002.244533,
                    38.003331
                },
                {
                    6886.204313,
                    4158.774802,
                    2936.036547,
                    26.771536
                },
                {
                    6890.049974,
                    3893.091258,
                    2888.343784,
                    32.719713
                },
                {
                    6890.719789,
                    3574.600717,
                    2857.614734,
                    32.38045
                },
                {
                    6991.981246,
                    3355.456008,
                    2832.723574,
                    18.700644
                }
            };

            //把数据写入二进制bin文件
            for (int i = 0; i < sphParticleData.length; i++) {
                String path = binPath + "point" + i + ".bin";
                OutputStream fos = new BufferedOutputStream(Files.newOutputStream(Paths.get(path)));
                byte[] bytes = ByteBuffer.allocate(8 + 8 + 8 + 8).order(ByteOrder.LITTLE_ENDIAN).putDouble(sphParticleData[i][0]).putDouble(sphParticleData[i][1]).putDouble(sphParticleData[i][2]).putDouble(sphParticleData[i][3]).array();
                fos.write(bytes);
                fos.close();
            }
        }

        public static void readBinFile(){

            String binFilePath = "F:\\test.bin";

            byte[] bytes = new byte[8 + 8 + 8 + 8];
            FileInputStream fis = new FileInputStream(binFilePath);
            while (fis.read(bytes, 0, bytes.length) != -1) {

                Double x = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 0, 8)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                Double y = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 8, 16)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                Double z = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 16, 24)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                Double value = ByteBuffer.wrap(Arrays.copyOfRange(bytes, 24, 32)).order(ByteOrder.LITTLE_ENDIAN).getDouble();
                //输出字段值
                System.out.println("x y z value : ["+  x + ","+ y + "," + z + "," + value +"]");
            }
        }
```

---

### `addByVtk(data, fn)` {#addByVtk}

根据vtk时序文件添加一个或多个光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 光滑粒子流体动力学仿真对象，可以是Object类型或者Array类型，对于每一个SmoothedParticleHydrodynamics对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 光滑粒子流体动力学仿真对象的唯一标识符ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `origin` | `array` | 仿真模型对象的原点，默认值：[0, 0, 0]，如果bin文件内坐标是相对坐标则此参数相当于offset |
| `style` | `number` | 光滑粒子流体动力学仿真对象样式，取值范围：[0,1,2,3,4]，取值描述：0热力样式 1~4四种水材质样式，默认值：0 |
| `duration` | `number` | 仿真的持续时间，单位：秒，默认值：30s |
| `loop` | `boolean` | 是否循环播放，默认值：false |
| `play` | `boolean` | 添加后是否开始播放，默认值：false |
| `files` | `array` | 按时序排列的vtk文件数组，结构示例：["D:\Time0.vtk","D:\Time1.vtk","D:\Time2.vtk"...] |
| `heatValueFieldName` | `string` | 粒子热力值使用的vtk字段名称 |
| `idFieldName` | `string` | 粒子ID使用的vtk字段名称 |
| `particleNumSides` | `number` | 可选，粒子多边形的边的数量，控制粒子几何形状的复杂度，默认值：2 |
| `particle` | `object` | 光滑粒子样式属性如下： |
| `particle.thickness` | `number` | 每个粒子的基础水深，默认值：0.02米 |
| `particle.radius` | `number` | 每个粒子的默认半径，默认值：15米 |
| `colors` | `object` | 热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.smoothedParticleHydrodynamics.addByVtk(data);
```

---

### `clear(fn)` {#clear}

清空场景中所有的光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.smoothedParticleHydrodynamics.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的光滑粒子流体动力学仿真对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.smoothedParticleHydrodynamics.delete('sph');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.smoothedParticleHydrodynamics.focus('sph');
```

---

### `get(ids, fn)` {#get}

根据光滑粒子流体动力学仿真对象ID获取光滑粒子流体动力学仿真对象的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的光滑粒子流体动力学仿真对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：Get

```js
fdapi.smoothedParticleHydrodynamics.get('sph');
```

---

### `hide(ids, fn)` {#hide}

隐藏光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.smoothedParticleHydrodynamics.hide('sph');
```

---

### `show(ids, fn)` {#show}

显示光滑粒子流体动力学仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 光滑粒子流体动力学仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.smoothedParticleHydrodynamics.show('sph');
```

---

### `update(data, fn)` {#update}

修改一个或多个光滑粒子流体动力学仿真对象，支持更新以下属性：

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `data \| array` | 光滑粒子流体动力学仿真对象或对象数组，支持更新以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据SmoothedParticleHydrodynamics对象ID更新以下属性 |
| `play` | `boolean` | 可选，是否开始播放，默认值：false |
| `particle` | `object` | 可选，光滑粒子样式属性如下： |
| `particle.thickness` | `number` | 每个粒子的基础水深，默认值：0.02米 |
| `particle.radius` | `number` | 每个粒子的默认半径，默认值：15米 |
| `colors` | `object` | 可选，热力样式下的自定义调色板对象，包含颜色渐变控制、无效像素颜色和调色板区间数组 |
| `colors.gradient` | `boolean` | 是否渐变 |
| `colors.invalidColor` | [`Color`](/docs/api/types#color) | 无效值对应的默认颜色，默认白色 |
| `colors.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `colors.color` | [`Color`](/docs/api/types#color) | 热力值对应的调色板颜色 |
| `colors.value` | `number` | 热力值 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let sph = {
    "id": "sph",
    "play": false, //暂停播放
    "particle":
    {
        "thickness": 0.2,
        "radius": 30
    }
}
fdapi.smoothedParticleHydrodynamics.update(sph);
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
await fdapi.smoothedParticleHydrodynamics.updateEnd();
```


## 更多示例

> AddByBin

```js
fdapi.smoothedParticleHydrodynamics.delete('sph');
let sph =
{
    "id": "sph",
    "origin": [
        0,
        0,
        0
    ],
    "style": 0,//0热力 流体1~4
    "duration": 30,
    "play": true, //默认播放
    "loop": true,
    "files": [
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00000000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00010000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00020000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00030000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00040000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00050000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00060000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00070000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00080000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00090000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00110000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00120000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00130000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00140000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00150000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00160000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00170000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00180000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00190000.bin",
        HostConfig.Path + "/assets/bin/sph/" + "SPHGra00200000.bin",
    ],
    //"particleNumSides": 2,
    "particle": {
        "thickness": 0.02,
        "radius": 15
    },
    "colors": {
        "gradient": false,
        "invalidColor": [1, 1, 1, 1],
        "colorStops": [
            {
                "value": 0,
                "color": [
                    0,
                    0,
                    1,
                    1
                ]
            },
            {
                "value": 5,
                "color": [
                    0,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 10,
                "color": [
                    1,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 15,
                "color": [
                    1,
                    0.5,
                    0,
                    1
                ]
            },
            {
                "value": 20,
                "color": [
                    1,
                    0,
                    0,
                    1
                ]
            }
        ]
    }
}
fdapi.smoothedParticleHydrodynamics.addByBin(sph);
fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);
```

> AddByVtk

```js
fdapi.smoothedParticleHydrodynamics.delete('sph');
let sph =
{
    "id": "sph",
    "origin": [
        0,
        0,
        0
    ],
    "style": 0,//0热力 流体1~4
    "duration": 30,
    "play": true, //默认播放
    "loop": true,
    "files": [
        HostConfig.Path + "/assets/bin/sph/" + "1.vtk",
        HostConfig.Path + "/assets/bin/sph/" + "2.vtk",
        HostConfig.Path + "/assets/bin/sph/" + "3.vtk",
        HostConfig.Path + "/assets/bin/sph/" + "4.vtk",
        HostConfig.Path + "/assets/bin/sph/" + "5.vtk",
        HostConfig.Path + "/assets/bin/sph/" + "6.vtk",
    ],
    "heatValueFieldName": "Rhop",
    "idFieldName": "Idp",
    "particleNumSides": 2,
    "particle": {
        "thickness": 0.02,
        "radius": 15
    },
    "colors": {
        "gradient": false,
        "invalidColor": [1, 1, 1, 1],
        "colorStops": [
            {
                "value": 0,
                "color": [
                    0,
                    0,
                    1,
                    1
                ]
            },
            {
                "value": 5,
                "color": [
                    0,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 10,
                "color": [
                    1,
                    1,
                    0,
                    1
                ]
            },
            {
                "value": 15,
                "color": [
                    1,
                    0.5,
                    0,
                    1
                ]
            },
            {
                "value": 20,
                "color": [
                    1,
                    0,
                    0,
                    1
                ]
            }
        ]
    }
}
fdapi.smoothedParticleHydrodynamics.addByVtk(sph);
fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);
```
