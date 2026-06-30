---
title: Drone
sidebar_label: Drone
description: "在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。"
---

# Drone

在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。

![](/img/refdoc/api/drone.gif)

通过 `api.drone` 访问。

---
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Drone 用于在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线绘制、自发光灯及标牌等，模拟无人机的飞行与巡检过程。
- **别名 / 不同行业叫法**：无人机 / UAV / 低空飞行器 / 无人飞行器 / 飞行平台 / 巡检无人机。
- **适用行业**：低空经济、应急、智慧城市、能源、国防军事、园区。
- **使用场景**：
  - 低空经济航线与无人机物流配送的可视化飞行模拟与航迹回放。
  - 应急救援、电力/管线/能源设施的无人机巡检路径与状态展示。
  - 城市治理、园区安防的无人机空中巡逻与目标跟踪轨迹呈现。
  - 低空经济无人机全流程航线仿真：沿航道从起点到终点飞行，机头第一视角漫游，仪表盘展示高度 / 对地速度 / 剩余电量 / 航线偏离告警，支持多机同步并行。
- **注意事项**：
  - 通过 `assetPath` 引用资源库无人机模型，`coordinate` 与 `coordinateType`（Projection/WGS84）需匹配；轨迹线 `trailDuration`、`trailType` 等影响渲染开销。
  - `delay` 控制 moveTo 移动延迟，设为 0 立即移动；大量无人机同时驱动时应关注性能与轨迹持续时间设置。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个无人机对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的无人机对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个无人机对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取无人机对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏一个或多个无人机对象 | 按业务条件隐藏对象 |
| [`moveTo`](#moveTo) | 设置无人机对象飞行移动 | 驱动对象移动到目标位置 |
| [`show`](#show) | 显示一个或多个无人机对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个无人机对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个无人机对象

路径参数assetPath获取方法如下动图：



![](/img/refdoc/api/copy_actor_path.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 无人机对象的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `assetPath` | `string` | 是 | - | 资源库无人机的路径，类似CustomObject对象的assetPath，示例值：'/AirCityPlugin/ArtResources/Drone/Drone' |
| `coordinate` | `array` | 是 | - | 无人机初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 否 | 0 | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `delay` | `number` | 否 | 0.5 | 可选，控制无人机moveTo()接口移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |
| `rotation` | `array` | 否 | [0,0,0] | 可选，无人机旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `localOffset` | `array` | 否 | [0,0,0] | 可选，无人机基于原始位置坐标的偏移量，默认值：[0,0,0] |
| `scale` | `array` | 否 | - | 可选，无人机缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `visible` | `boolean` | 否 | - | 可选，设置无人机对象加载后是否显示，默认：true |
| `trailType` | [`DroneTrailStyle`](/docs/api/types#dronetrailstyle) | 否 | 0 | (`DroneTrailStyle`) 可选，轨迹线样式枚举，详情参考 `DroneTrailStyle`，默认值：0 |
| `trailThickness` | `number` | 否 | - | 可选，像素线宽度，注意：仅设置像素线样式枚举时生效 |
| `trailColor` | [`Color`](/docs/api/types#color) | 否 | - | 可选，轨迹线颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `trailDuration` | `number` | 否 | 3秒 | 可选，轨迹持续时间，单位：秒，默认值：3秒 |
| `lightColor` | [`Color`](/docs/api/types#color) | 否 | - | 可选，无人机自发光灯颜色亮度，取值示例：[1, 0, 0, 10]，注意：alpha是无人机亮度，支持四种格式，[取值示例](/docs/tutorials/color) |
| `label` | `object` | 否 | - | 可选，无人机的标牌对象，默认不显示，包含可配置的参数如下： |
| `label.visible` | `boolean` | 否 | false | 无人机标牌是否可见，默认值：false |
| `label.offset` | `array` | 否 | [0, 0, 0] | 无人机标牌偏移，默认值：[0, 0, 0] |
| `label.cullDistance` | `number` | 是 | - | 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米 |
| `label.text` | `string` | 是 | - | 无人机标牌显示的字符串 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
//设置后期 泛光 减少灯光秀光晕 关闭反走样
fdapi.settingsPanel.setPostProcessMode({ bloomIntensity: 0.7, antiAliasing: false });

//设置夜晚 展示灯光秀
fdapi.weather.setDateTime(2025, 12, 25, 22, 10, false);

//添加100架无人机
await fdapi.drone.clear();
let basePoint = [492548, 2491830, 200];
let d100 = [];
for (let i = 0; i < 100; i++) {
    let drone = {
        "id": "drone" + i,
        "coordinateType": 0,
        "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],
        "assetPath": "/JC_CustomAssets/UAVLibrary/Exhibition/UAV_1",
        "rotation": [0, 0, 0],
        "autoHeight": true,
        "delay": 1,
        "localOffset": [0, 0, 0],
        "scale": [3, 3, 3], //模型缩放
        "visible": 1, //加载后可见
        "enableDecal": true,
        "trailType": DroneTrailStyle.Pixel_Line1, //轨迹样式枚举
        "trailThickness": 2, //像素线宽度，注意：仅开启像素线样式枚举时生效
        "trailColor": [Math.random(), Math.random(), Math.random(), 1],//轨迹线颜色
        "trailDuration": 6, //轨迹线持续时长 0表示一直显示
        "lightColor": [Math.random(), Math.random(), Math.random(), 10],//灯光秀颜色、亮度
        "label": {
            "visible": true,//标牌可见性
            "cullDistance": 100, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米
            "offset": [0, 0, 0],//标牌偏移
            "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字
        }
    };
    d100.push(drone);
}
fdapi.drone.add(d100);
fdapi.drone.focus('drone5');
```

---

### `clear(fn)` {#clear}

清空场景中所有的无人机对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.drone.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个无人机对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的无人机对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.drone.delete('drone5');
```

---

### `focus(ids, followEnable, distance, flyTime, viewPitch, viewYaw, sensitivity, offset, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 无人机对象的ID或者ID数组 |
| `followEnable` | `boolean` | 否 | false | 可选参数，是否开启相机自动跟随(开启后相机交互会被自动托管)，默认值：false |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟无人机观察视角 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `viewPitch` | `number` | 否 | - | 可选参数，观察欧拉角的Pitch，取值范围：[-90~90] |
| `viewYaw` | `number` | 否 | - | 可选参数，观察欧拉角的Yaw，取值范围： [-180~180] |
| `sensitivity` | `number` | 否 | - | 可选参数，无人机灵敏度，取值范围： [0~1] |
| `offset` | `array` | 否 | [0,0,0] | 可选参数，无人机视角的偏移量，单位：米，默认值：[0,0,0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
//设置相机跟随
fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);
```

---

### `get(ids, fn)` {#get}

根据ID获取无人机对象的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的无人机对象的无人机对象的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
CustomObject的详细信息
[{
            "id":"vc1",
            "groupId": "car_main_road",
            "userData": "car_info",
            "coordinateType":0,
            "coordinate":[-1499.8984375, -2804.5328125000001,1],
            "assetPath":"/JC_CustomAssets/DroneLibrary/Exhibition/Drone",
            "rotation":[0, -10, 0],
        }]
```

> 示例：Get

```js
fdapi.drone.get('drone5');
```

---

### `hide(ids, fn)` {#hide}

隐藏一个或多个无人机对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 无人机对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.drone.hide('drone5');
```

---

### `moveTo(data, fn)` {#moveTo}

设置无人机对象飞行移动

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 无人机对象的ID |
| `coordinate` | `array` | 是 | - | 无人机对象移动目标点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 否 | [0,0,0] | 可选，无人机的旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `astern` | `boolean` | 否 | false | 可选，是否开启倒档，默认值：false |
| `time` | `number` | 否 | - | 可选，无人机对象移动目标点对应的时间戳 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：MoveTo

```js
let basePoint = [492548, 2491830, 200];
let index = 0;
let currTime = new Date().getTime();
let timer = setInterval(function () {
    if (index < 100) {
        let time = currTime + 1000 * index;

        let d10 = []
        for (let i = 0; i < 100; i++) {
            d10.push({
                "id": "drone" + i,
                "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],
                "time": time,
                "rotation": [0, 0, 0]
            });
        }
        fdapi.drone.moveTo(d10);
        ++index;
    }
    else {
        clearInterval(timer);
        fdapi.camera.cancelFollow();
    }
}, 1000);
//定位
fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);
```

---

### `show(ids, fn)` {#show}

显示一个或多个无人机对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 无人机对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.drone.show('drone5');
```

---

### `update(data, fn)` {#update}

修改一个或多个无人机对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 无人机对象或者数组，以下属性支持更新 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 根据无人机对象的ID更新无人机相关属性 |
| `trailType` | `number` | 否 | 0 | (`DroneTrailStyle`) 可选，轨迹线样式枚举，详情参考 `DroneTrailStyle`，默认值：0 |
| `trailColor` | [`Color`](/docs/api/types#color) | 否 | - | 可选，轨迹线颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `trailDuration` | `number` | 否 | 3 | 可选，轨迹持续时间，单位：秒，默认值：3 |
| `trailThickness` | `number` | 否 | - | 可选，像素线宽度，注意：仅设置像素线样式枚举时生效 |
| `lightColor` | [`Color`](/docs/api/types#color) | 否 | - | 可选，无人机自发光灯颜色亮度，取值示例：[1, 0, 0, 10]，注意：alpha是无人机亮度，支持四种格式，[取值示例](/docs/tutorials/color)，默认：关闭 |
| `label` | `object` | 否 | - | 可选，无人机的标牌对象，默认不显示，包含可配置的参数如下： |
| `label.visible` | `boolean` | 否 | false | 无人机标牌是否可见，默认值：false |
| `label.offset` | `array` | 否 | [0, 0, 0] | 无人机标牌偏移，默认值：[0, 0, 0] |
| `label.cullDistance` | `number` | 是 | - | 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米 |
| `label.text` | `string` | 是 | - | 无人机标牌显示的字符串 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let d100 = []
for (let i = 0; i < 100; i++) {
    d100.push({
        "id": "drone" + i,
        "trailType": 0, //轨迹线样式
        "trailColor": [1, 1, 0, 1],//轨迹线颜色
        "trailDuration": 3, //轨迹线持续时长
        "lightColor": [1, 0, 0, 1],//灯光秀颜色
        "label": {
            "visible": true,//标牌可见性
            "cullDistance": 1000, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米
            "offset": [0, 0, 0],//标牌偏移
            "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字
        }
    });
}
fdapi.drone.update(d100);
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
await fdapi.Drone.updateEnd();
```
