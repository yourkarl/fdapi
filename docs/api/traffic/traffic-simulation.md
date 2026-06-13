---
title: TrafficSimulation
sidebar_label: TrafficSimulation
description: "TrafficSimulation类，提供城市级交通仿真对象相关的操作，支持十万级别的城市车辆交通仿真。 一般通过api.trafficSimulation调用其方法"
---

# TrafficSimulation

TrafficSimulation类，提供城市级交通仿真对象相关的操作，支持十万级别的城市车辆交通仿真。

一般通过api.trafficSimulation调用其方法

通过 `api.trafficSimulation` 访问。

---

## 方法（Methods）

### `add(trafficSimulation, fn)`

初始化一个TrafficSimulation对象，支持十万级别的城市交通车辆仿真模拟

展示效果如下动图：

| 参数 | 类型 | 说明 |
|------|------|------|
| `trafficSimulation` | `object` | 交通仿真对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`trafficSimulation` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的ID |
| `groupId` | `string` | 可选，Group分组Id |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `noiseThreshold` | `number` | 车辆摆头的降噪距离，单位：米，默认值：0.05 |
| `timer` | `boolean` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |
| `heatmap` | `object` | 交通仿真热力图模式配置对象，包含结构如下： |
| `heatmap.bbox` | `array` | 热力图覆盖的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `heatmap.visible` | `boolean` | 热力图是否可见，默认值：false |
| `heatmap.blur` | `number` | 热力图模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |
| `heatmap.heatRadiusScale` | `number` | 热力点影像半径，单位：米，取值范围：[任意数值] |
| `heatmap.gradient` | `boolean` | 是否渐变 |
| `heatmap.invalidColor` | `Color` | 无效像素点的默认颜色，默认白色 |
| `heatmap.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `heatmap.color` | `Color` | 值对应的调色板颜色 |
| `heatmap.value` | `number` | 值 |
| `models` | `array` | 交通仿真包含的车辆模型类型数组，注意：只需要在add()方法执行时配置，每一个数组元素对象包含属性如下： |
| `models.type` | `number` | 车辆类型，注意这个数值会写入更新方法使用的.dat文件内。 |
| `models.package` | `string` | 资源库车辆载具路径，取值类似CustomObject对象的assetPath，示例值：'/AirCityPlugin/ArtResources/Traffic/SUVTemplete' |

```js
请求参数示例


            {   
                "id": "traffic",
                "coordinateType": 1,
                "groupId": "groupAll",
                "userData": "交通仿真",
                "noiseThreshold": 0.05,  //车辆降噪距离 
                "timer": false,// 禁用定时器时间间隔，使用dat数据内的time字段            
                "heatmap": {
                    "bbox": [491439.1, 2490518, -5, 494439.1, 2493518.6, 20],
                    "visible": false,
                    "blur": 0.7,
                    "heatRadiusScale": 5,
                    "colors": {
                        "gradient": true,
                        "size": 256,
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
                                "value": 0.25,
                                "color": [
                                    0,
                                    1,
                                    1,
                                    1
                                ]
                            },
                            {
                                "value": 0.5,
                                "color": [
                                    0,
                                    1,
                                    0,
                                    1
                                ]
                            },
                            {
                                "value": 0.75,
                                "color": [
                                    1,
                                    1,
                                    0,
                                    1
                                ]
                            },
                            {
                                "value": 1,
                                "color": [
                                    1,
                                    0,
                                    0,
                                    1
                                ]
                            }
                        ]
                    }
                },
                "models": [
                    {
                        "type": 1,
                        "package": "/AirCityPlugin/ArtResources/Traffic/SUVTemplete"
                    },
                    {
                        "type": 2,
                        "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_04"
                    },
                    {
                        "type": 3,
                        "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/迷你巴士_01"
                    }
                ]
            }
```

> 示例：Add

```js
//设置夜景
fdapi.weather.setDateTime(2025, 9, 9, 22, 22, false);
//设置相机视角
fdapi.camera.set(491858.270625, 2491886.711035, 502.750039, -52.415585, -90.921097, 0);


fdapi.trafficSimulation.delete("traffic");
let trafficSimulation = {
    "id": "traffic",
    "coordinateType": 1,
    "groupId": "",
    "userData": "",
    "noiseThreshold": 0.06,  //车辆降噪距离 
    "timer": false,// 禁用计时器 用dat的time            
    "heatmap": {
        "bbox": [474853.14, 2484137.02, 0, 562179.26, 2528221.135, 383.999922],//交通仿真的范围
        "visible": false,//初始化是否默认显示热力图
        "blur": 0.8,
        "heatRadiusScale": 60,
        "colors": {
            "gradient": true,
            "size": 256,
            "colorStops": [
                {
                    "value": 0,
                    "color": [
                        0,
                        0,
                        1,
                        0
                    ]
                },
                {
                    "value": 0.25,
                    "color": [
                        0,
                        1,
                        1,
                        0
                    ]
                },
                {
                    "value": 0.5,
                    "color": [
                        0,
                        1,
                        0,
                        0.2
                    ]
                },
                {
                    "value": 0.75,
                    "color": [
                        1,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 1,
                    "color": [
                        1,
                        0,
                        0,
                        1
                    ]
                }
            ]
        }
    },
    "models": [
        {
            "type": 1,
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/轿车_02"
        },
        {
            "type": 2,
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_04"
        },
        {
            "type": 3,
            "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/迷你巴士_01"
        }
    ]
};
fdapi.trafficSimulation.add(trafficSimulation);
//开启根据高度自动高亮
fdapi.trafficSimulation.autoHighlight("traffic", 100);

//打开交通热力图
fdapi.trafficSimulation.showHeatMap("traffic");

//按500ms更新dat数据
let index = 0;
timer = setInterval(async function () {
    index++;
    if (index < 25) {
        fdapi.trafficSimulation.update({
            "id": "traffic",
            "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",
        });
    } else {
        clearInterval(timer);
    }
}, 500);
```

---

### `autoHighlight(id, distance, fn)`

根据相机高度自动高亮TrafficSimulation对象包含的所有车辆

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 要高亮TrafficSimulation对象的id |
| `distance` | `number` | 达到此相机高度则车辆自动高亮，默认值：600米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：AutoHighlight

```js
fdapi.trafficSimulation.autoHighlight("traffic", 100);
```

---

### `delete(ids, fn)`

删除一个或多个TrafficSimulation对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的TrafficSimulation对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.trafficSimulation.delete("traffic");
```

---

### `focus(ids, distance, flyTime, rotation, distanceRotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | TrafficSimulation对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `distanceRotation` | `array` | 可选参数，跟车相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.trafficSimulation.focus("traffic", 100);
```

---

### `hide(id, fn)`

隐藏TrafficSimulation对象包含的所有车辆

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string \| array` | TrafficSimulation对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.trafficSimulation.hide("traffic");
```

---

### `hideHeatMap(id, fn)`

隐藏TrafficSimulation对象的热力图效果

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideHeatMap

```js
fdapi.trafficSimulation.hideHeatMap("traffic");
```

---

### `hideTextLabel(id, fn)`

隐藏TrafficSimulation对象包含的所有车辆文字标签

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideTextLabel

```js
fdapi.trafficSimulation.hideTextLabel("traffic");
```

---

### `highlight(id, fn)`

高亮TrafficSimulation对象包含的所有车辆

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 要高亮TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Highlight

```js
fdapi.trafficSimulation.highlight("traffic");
```

---

### `show(id, fn)`

显示TrafficSimulation对象包含的所有车辆

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.trafficSimulation.show("traffic");
```

---

### `showHeatMap(id, fn)`

显示TrafficSimulation对象的热力图效果

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowHeatMap

```js
fdapi.trafficSimulation.showHeatMap("traffic");
```

---

### `showTextLabel(id, fn)`

显示TrafficSimulation对象包含的所有车辆文字标签

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowTextLabel

```js
fdapi.trafficSimulation.showTextLabel("traffic");
```

---

### `unHighlight(id, fn)`

取消高亮TrafficSimulation对象包含的所有车辆

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 要高亮TrafficSimulation对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：UnHighlight

```js
fdapi.trafficSimulation.unHighlight("traffic");
```

---

### `update(trafficSimulation, fn)`

更新一个时刻的TrafficSimulation对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `trafficSimulation` | `object` | 交通仿真对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`trafficSimulation` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | TrafficSimulation对象的ID |
| `groupId` | `string` | 可选，Group分组Id |
| `userData` | `string` | 可选，用户自定义数据 |
| `file` | `string` | 某个时刻的多辆车的轨迹点数据文件路径，包含：车辆id、车辆经度、车辆纬度、车辆类型、时间。二进制文件格式(.dat)，包含内容如下：id(int 4字节),lon(double 8字节),lat(double 8字节),type(int 4字节),time(int 4字节) |
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `noiseThreshold` | `number` | 车辆摆头的降噪距离，单位：米，默认值：0.05 |
| `timer` | `boolean` | 设置为false使用dat数据内的时间字段time，设置为true则使用定时器的时间间隔，默认：false， |
| `heatmap` | `object` | 交通仿真热力图模式配置对象，包含结构如下： |
| `heatmap.bbox` | `array` | 热力图覆盖的范围：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `heatmap.visible` | `boolean` | 热力图是否可见，默认值：false |
| `heatmap.blur` | `number` | 热力图模糊因子，默认值：0.85，注意：模糊系数越高，渐变越平滑，取值范围：[0~1.0] |
| `heatmap.heatRadiusScale` | `number` | 热力点影像半径，单位：米，取值范围：[任意数值] |
| `heatmap.gradient` | `boolean` | 是否渐变 |
| `heatmap.invalidColor` | `Color` | 无效像素点的默认颜色，默认白色 |
| `heatmap.colorStops` | `array` | 调色板对象数组，每一个对象包含热力值和对应颜色值，结构示例：[&#123;"value":0, "color":[0,0,1,1]&#125;]，每一个调色板对象支持以下属性： |
| `heatmap.color` | `Color` | 值对应的调色板颜色 |
| `heatmap.value` | `number` | 值 |

```js
请求参数示例

{
            "id": "traffic",
            "coordinateType": 1,
            "groupId": "",
            "userData": "",
            "file": "F:\\vehicle\\vehicle_" + index + ".dat",
            "heatmap":
            {
                "bbox": [474853.14,2484137.02,0,562179.26,2528221.135,383.999922],
                "visible": true,
                "blur": 0.1,
                "heatRadiusScale": 10,
                "colors":
                {
                    "gradient": true,
                    "size": 256,
                    "colorStops":
                        [
                            {
                                "value": 0,
                                "color": [0, 0, 1, 0]
                            },
                            {
                                "value": 0.25,
                                "color": [0, 1, 1, 0]
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
                }
        }
```

> 示例：Update

```js
clearInterval(timer);

//按1s更新dat数据
let index = 0;
timer = setInterval(async function () {
    index++;
    if (index < 25) {
        fdapi.trafficSimulation.update({
            "id": "traffic",
            "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",
        });
    } else {
        clearInterval(timer);
    }
}, 1000);
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
await fdapi.trafficSimulation.updateEnd();
```
