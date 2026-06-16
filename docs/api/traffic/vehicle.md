---
title: Vehicle
sidebar_label: Vehicle
description: "Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。"
---

# Vehicle

Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。

通过 `api.drone` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。
- **别名 / 不同行业叫法**：车辆 / 车流 / 载具 / 交通流 / 机动车。
- **适用行业**：智慧交通、智慧城市、智慧园区、物流、应急
- **使用场景**：
  - 道路车流仿真与可视化
  - 车辆轨迹回放与事件还原
  - 救援/巡逻等事件车辆的运动
- **注意事项**：
  - 大量车辆需用实例化/LOD 控制性能
  - 行驶路径需与路网匹配
  - 坐标系需与地形贴合


## 方法（Methods）

### `add(data, fn)`

添加一个或多个Vehicle对象

路径参数assetPath获取方法如下动图：



![](/img/refdoc/api/copy_actor_path.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle对象的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `assetPath` | `string` | 资源库车辆载具路径，类似CustomObject对象的assetPath，示例值：'/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01' |
| `coordinate` | `array` | 载具初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `autoHeight` | `boolean` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |
| `useInitZ` | `boolean` | 可选，是否使用添加载具初始化坐标的高度Z，默认：false |
| `delay` | `number` | 可选，控制载具moveTo()接口移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |
| `rotation` | `array` | 可选，载具旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `colorType` | `number` | 可选，载具使用内置涂装颜色的类型，取值范围：[0~任意正整数]，默认值：0 随机使用涂装颜色，大于0则使用其他固定的涂装颜色。 |
| `color` | [`Color`](/docs/api/types#color) | 可选，载具自定义涂装颜色，注意：若传入此颜色参数会覆盖掉内置的涂装颜色（colorType），支持四种格式，[取值示例](/docs/tutorials/color) |
| `localOffset` | `array` | 可选，载具基于原始位置坐标的偏移量，默认值：[0,0,0] |
| `enableDecal` | `boolean` | 可选，是否支持贴画贴合，默认值：true |
| `visible` | `boolean` | 可选，设置载具对象加载后是否显示，默认：true |

> 示例：Add

```js
await fdapi.vehicle.delete('vc1');
let vc1 = {
    "id": "vc1",
    "coordinateType": 0,
    "coordinate": [493132.125, 2492028.25, 2.1155664920806885],
    "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",//资源库车辆路径
    "rotation": [0, 0, 0],
    "colorType": 0, //0: 使用随机涂装颜色  大于0的正整数: 使用固定涂装颜色
    "color": [1, 1, 0, 1],// 开启自定义颜色 则会覆盖colorType涂装颜色
    "autoHeight": true,//开启自动高度 贴地移动
    "delay": 1,//控制载具moveTo()接口移动的延迟时间 单位：秒
    "useInitZ": false,//是否使用添加载具初始化坐标的高度Z
    "localOffset": [0, 0, 0],
    "enableDecal": true,
    "visible": true, //默认可见性
};
fdapi.vehicle.add(vc1);
fdapi.vehicle.focus('vc1');

//注意：focus方法同时支持第一人称视角 具体参考API文档
//fdapi.vehicle.focus('vc1',true,0,0,[-16.27,1.969612,0],[0,0,0],[0,-0.3,1.3]);
```

---

### `callBatchFunction(data, fn)`

调用多个Vehicle对象的多个蓝图函数

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle对象的ID |
| `functionName` | `string` | 蓝图函数名 |
| `parameters` | `array` | 蓝图函数包含的多个参数结构，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

> 示例代码如下：

```js
await fdapi.drone.callBatchFunction(data);
```

---

### `clear(fn)`

清空场景中所有的Vehicle对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.vehicle.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Vehicle对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Vehicle对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.vehicle.delete('vc1');
```

---

### `focus(ids, followEnable, distance, flyTime, rotation, distanceRotation, offset, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle对象的ID或者ID数组 |
| `followEnable` | `boolean` | 可选参数，是否开启相机自动跟随(开启后相机交互会被自动托管)，默认值：false |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟驾驶员视角 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `distanceRotation` | `array` | 可选参数，跟车相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `offset` | `array` | 可选参数，定位后载具视角的偏移量，单位：米，默认值：[0,0,0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
//注意：focus方法支持第一人称视角 具体参考API文档
fdapi.vehicle.focus('vc1', true, 6, 2, [2, 6, 0], [5, 0, 0]);
```

---

### `get(ids, fn)`

根据ID获取Vehicle对象的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Vehicle对象的Vehicle对象的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
CustomObject的详细信息
[{
            "id":"vc1",
            "groupId": "car_main_road",
            "userData": "car_info",
            "coordinateType":0,
            "coordinate":[-1499.8984375, -2804.5328125000001,1],
            "assetPath":"/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",
            "rotation":[0, -10, 0],
        }]
```

> 示例：Get

```js
fdapi.vehicle.get('vc1');
```

---

### `hide(ids, fn)`

隐藏一个或多个Vehicle对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.vehicle.hide('vc1');
```

---

### `moveTo(data, fn)`

设置Vehicle对象行驶（根据实时获取的GPS数据运动）

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle对象的ID |
| `coordinate` | `array` | 车辆移动目标点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `gear` | `number` | 车辆档位：0驻车档 1倒挡 2空挡 3前进挡 |
| `heading` | `number` | 车辆转向角度，取值范围：[0,360] |
| `time` | `number` | 车辆移动耗时，单位：秒 |

```js
数据结构示例

[{"id": "vc1","coordinate": [-1498, -2804,0],"gear": 3,"heading":0,"time": 1}]
```

> 示例：MoveTo

```js
//模拟实时gps坐标
let realTimeGPSPoint = [
    [493136.5625, 2492028, 2.1],
    [493141.09375, 2492028, 2.1],
    [493143.71875, 2492027.75, 2.1],
    [493146.46875, 2492027.75, 2.1],
    [493150.1875, 2492027.25, 2.1],
    [493153.625, 2492027, 2.1],
    [493152.84375, 2492023.25, 2.1],
    [493150.59375, 2492019, 2.1],
    [493148.75, 2492015, 2.1],
    [493148.03125, 2492012.25, 1.1],
];
//模拟1秒获取一个坐标位置 并设置载具运动MoveTo方法
let index = 0;
let timer = setInterval(function () {
    index++;
    if (index < 10) {
        let moveToArr = [
            { "id": "vc1", "coordinate": realTimeGPSPoint[index - 1], "gear": 3, "time": 1 },
        ];
        //实时移动
        fdapi.vehicle.moveTo(moveToArr);
    } else {
        //运动结束后清除定时器
        clearInterval(timer);
    }
}, 1000);
```

---

### `pause(ids, fn)`

暂停指定的载具运动

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Pause

```js
fdapi.vehicle.pause('vc1');
```

---

### `resume(id, fn)`

恢复指定的载具运动

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string \| array` | Vehicle对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Resume

```js
fdapi.vehicle.resume('vc1');
```

---

### `setWayPoint(data, fn)`

设置Vehicle对象行驶的路径点（已知路径点 轨迹动画）

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle对象的ID |
| `wayPoints` | `array` | 载具运动的路径点数组，数组每一个元素的对象属性如下： |

```js
数据结构示例
[{
        "id": "vc1",
        "wayPoints": 
            [
                {
                    "timeStamp": 0,
                    "coordinate": [-1498,-2804,0],
                    "gear": 3
                },
                {
                    "timeStamp": 1,
                    "coordinate": [-1469,-2800,0],
                    "gear": 3
                    
                },
                {
                    "timeStamp": 2,
                    "coordinate": [-1465,-2783,0],
                    "gear": 3
                    
                }
            ]
        }]
```

---

### `show(ids, fn)`

显示一个或多个Vehicle对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.vehicle.show('vc1');
```

---

### `start(data, fn)`

启动指定的载具在某个时刻开始运动

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle对象的ID |
| `timeStamp` | `number` | Vehicle对象开始运动的时间 |

```js
请求参数结构示例
以下参数表示三辆载具开始运动，v1第一秒开始运动，v2第五秒开始运动，v3第七秒开始运动
[
{"id":"vc1","timeStamp":1},
{"id":"vc2","timeStamp":5},
{"id":"vc3","timeStamp":7}
]
```

> 示例：Start

```js
fdapi.vehicle.start([{
    id: 'vc1',
    timeStamp: 0,//设置载具v1从wayPoints的第0秒开始运动
}]);
```

---

### `stop(ids, fn)`

停止指定的载具运动

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle对象的ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Stop

```js
fdapi.vehicle.stop('vc1');
```

---

### `update(data, fn)`

修改一个或多个Vehicle对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | Vehicle对象或者数组，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据Vehicle对象的ID更新载具属性 |
| `coordinate` | `array` | 载具初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `autoHeight` | `boolean` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |
| `rotation` | `array` | 可选，载具旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `localOffset` | `array` | 可选，载具基于原始位置坐标的偏移量，默认值：[0,0,0] |

> 示例：Update

```js
//定位到车辆位置
//fdapi.camera.set(493127.98886, 2492019.294375, 7.895526, -22.705507, -63.62706, 1);

let vc1 = {
    "id": "vc1",
    "rotation": [0, 90, 0],
};
fdapi.vehicle.update(vc1);
//注意：focus方法支持第一人称视角 具体参考API文档
fdapi.vehicle.focus('vc1');
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
await fdapi.drone.updateEnd();
```


## 更多示例

> SetWayPoint

```js
let wayPoints = [{
    "id": "vc1",
    "wayPoints":
        [
            { "coordinate": [493136.5625, 2492028, 2.1], "gear": 3, "timeStamp": 0 },
            { "coordinate": [493141.09375, 2492028, 2.1], "gear": 3, "timeStamp": 1 },
            { "coordinate": [493143.71875, 2492027.75, 2.1], "gear": 3, "timeStamp": 2 },
            { "coordinate": [493146.46875, 2492027.75, 2.1], "gear": 3, "timeStamp": 3 },
            { "coordinate": [493150.1875, 2492027.25, 2.1], "gear": 3, "timeStamp": 4 },
            { "coordinate": [493153.625, 2492027, 2.1], "gear": 3, "timeStamp": 5 },
            { "coordinate": [493152.84375, 2492023.25, 2.1], "gear": 3, "timeStamp": 6 },
            { "coordinate": [493150.59375, 2492019, 2.1], "gear": 3, "timeStamp": 7 },
            { "coordinate": [493148.75, 2492015, 2.1], "gear": 3, "timeStamp": 8 },
            { "coordinate": [493148.03125, 2492012.25, 1.1], "gear": 3, "timeStamp": 9 }
        ]
}];
fdapi.vehicle.setWayPoint(wayPoints);
```
