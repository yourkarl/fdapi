---
title: Vehicle2
sidebar_label: Vehicle2
description: "Vehicle2 是高级载具对象，在 Vehicle 基础上提供更丰富的车辆驱动、外观与行为控制。"
---

# Vehicle2

Vehicle2 是高级载具对象，在 Vehicle 基础上提供更丰富的车辆驱动、外观与行为控制。

通过 `api.vehicle2` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Vehicle2 是高级载具对象，在 Vehicle 基础上提供更丰富的车辆驱动、外观与行为控制。
- **别名 / 不同行业叫法**：高级载具 / 车辆(增强) / 智能车 / 车流 / 载具。
- **适用行业**：智慧交通、自动驾驶仿真、智慧城市、智慧园区、物流
- **使用场景**：
  - 复杂车辆行为与外观的精细仿真
  - 自动驾驶、车路协同的演示
  - 高拟真车流场景
- **注意事项**：
  - 功能更全但开销高于 Vehicle
  - 大规模车流需 LOD 与实例化
  - 路网与轨迹数据须规范



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个Vehicle2对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的Vehicle2对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个Vehicle2对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位载具到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID查询Vehicle2对象的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏一个或多个Vehicle2对象 | 按业务条件隐藏对象 |
| [`moveTo`](#moveTo) | 设置Vehicle2对象行驶到具体位置（根据实时获取的GPS数据运动） | 驱动对象移动到目标位置 |
| [`setFollow`](#setFollow) | 设置载具自动跟随相机 |  |
| [`setViewportVisible`](#setViewportVisible) | 多视口状态下，设置Vehicle2对象在各视口的可见性 |  |
| [`show`](#show) | 显示一个或多个Vehicle2对象 | 按业务条件显示对象 |
| [`update`](#update) | 修改一个或多个Vehicle2对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个Vehicle2对象

路径参数assetPath获取方法如下动图：



![](/img/refdoc/api/copy_actor_path.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle2对象的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `assetPath` | `string` | 资源库车辆载具路径，类似CustomObject对象的assetPath，示例值：'/JC_CustomAssets/Vehicle2Library/Exhibition/SUV_01' |
| `coordinate` | `array` | 载具初始位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `autoHeight` | `boolean` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |
| `delay` | `number` | 可选，控制载具moveTo()接口移动的延迟时间，单位：秒，默认值：0.5，设置0则不延时立刻移动 |
| `rotation` | `array` | 可选，载具旋转，世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `color` | [`Color`](/docs/api/types#color) | 可选，载具自定义涂装颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `localOffset` | `array` | 可选，载具基于原始位置坐标的偏移量，默认值：[0,0,0] |
| `enableDecal` | `boolean` | 可选，是否支持贴画贴合，默认值：true |
| `visible` | `number` | 可选，设置载具对象加载后是否显示，0：隐藏 1：显示 2：移动显示（先隐藏载具移动后显示） 3：调用显示（先隐藏载具调用moveTo后显示） |
| `collision` | `boolean` | 可选，是否开启模型碰撞，默认：false，注意：开启后会影响添加效率 |
| `label` | `object` | 可选，载具的标牌对象，默认不显示，包含可配置的参数如下： |
| `label.visible` | `boolean` | 载具标牌是否可见 |
| `label.offset` | `array` | 载具标牌偏移 |
| `label.text` | `string` | 载具标牌显示的字符串 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
await fdapi.vehicle2.delete('vc2');
let vc2 = {
    "id": "vc2",
    "coordinateType": 0,
    "coordinate": [493122.24593750003, 2492029.0462109377, 2.11556396484375],//注意 vehicle2的moveTo接口的第一个坐标需要和初始化坐标位置保持一致！
    "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",//资源库车辆路径
    "rotation": [0, 0, 0],
    "color": [1, 1, 0, 1], //车辆颜色
    "autoHeight": true,//开启自动高度 贴地移动
    "enableDecal": false, //是否支持贴画
    "delay": 1,//控制载具moveTo()接口移动的延迟时间 单位：秒
    "localOffset": [-2, 0, 0], //载具偏移 坐标数据如果是车头定位时需要设置，若是车身中心点则使用默认值
    "collision": true,//开启碰撞
    "visible": 1, //设置载具对象加载后是否显示，0：隐藏 1：显示 2：移动显示（先隐藏载具移动后显示） 3：调用显示（先隐藏载具调用moveTo后显示）
    "label": {
        "visible": true,//标牌可见性
        "offset": [0, 0, 0],//标牌偏移
        "text": "京A 888888" //标牌显示的文字
    }
};
fdapi.vehicle2.add(vc2);
fdapi.vehicle2.focus('vc2', 5, 2, [-20, 0, 0], [0, 0, 0]);
```

---

### `clear(fn)` {#clear}

清空场景中所有的Vehicle2对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.vehicle2.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个Vehicle2对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Vehicle2对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.vehicle2.delete('vc2');
```

---

### `focus(ids, distance, flyTime, rotation, offset, fn)` {#focus}

自动定位载具到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle2对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟驾驶员视角 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `offset` | `array` | 可选参数，定位后载具视角的偏移量，单位：米，默认值：[0,0,0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.vehicle2.focus('vc2', 10, 2, [-20, 0, 0], [0, 0, 0]);
```

---

### `get(ids, fn)` {#get}

根据ID查询Vehicle2对象的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Vehicle2对象的Vehicle2对象的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：Get

```js
fdapi.vehicle2.get('vc2');
```

---

### `hide(ids, fn)` {#hide}

隐藏一个或多个Vehicle2对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle2对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.vehicle2.hide('vc2');
```

---

### `moveTo(data, fn)` {#moveTo}

设置Vehicle2对象行驶到具体位置（根据实时获取的GPS数据运动）

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle2对象的ID |
| `coordinate` | `array` | 载具2移动目标点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `heading` | `number` | 可选，载具2转向角度，取值范围：[0,360] |
| `astern` | `boolean` | 可选，是否开启倒车档，默认值：false |
| `time` | `number` | 可选，载具2移动目标点对应的时间戳 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
数据结构示例

[{"id": "vc1", "coordinate": [-1498, -2804,0], "heading":0, "time": 1, "astern": false}]
```

> 示例：MoveTo

```js
//模拟实时gps坐标
let realTimeGPSPoint = [
    //注意：起始坐标要和add初始化的坐标位置 保持一致
    [493122.24593750003, 2492029.0462109377, 2.11556396484375], [493125.2659375, 2492028.7942578127, 2.11556396484375], [493128.4396875, 2492028.6100976565, 2.11556396484375], [493131.41531250003, 2492028.6350195315, 2.11556396484375], [493134.6896875, 2492028.259667969, 2.1155615234375], [493137.7, 2492028.0282421876, 2.21556884765625], [493142.5728125, 2492027.9564453126, 2.11556396484375], [493145.7465625, 2492026.2394921877, 2.11556396484375], [493147.190625, 2492023.504746094, 2.11556640625], [493147.719375, 2492020.532832031, 2.1155615234375], [493147.73562500003, 2492018.1220703125, 2.2155908203125], [493147.7096875, 2492015.22953125, 2.215576171875], [493146.7884375, 2492012.7730078124, 2.00822509765625], [493146.06, 2492010.25546875, 1.8686181640625001], [493145.036875, 2492007.0628320314, 1.69008544921875], [493144.0684375, 2492004.0163476565, 1.51984375], [493143.1040625, 2492001.1668945313, 1.35973876953125]
];
//模拟1秒获取一个坐标位置 并设置载具运动MoveTo方法
let index = 0;
//当前时间戳
let currTime = new Date().getTime();
let timer = setInterval(function () {
    index++;
    if (index <= realTimeGPSPoint.length) {
        //时间戳累加
        let time = currTime + 1000 * index;
        let moveToArr = [
            {
                "id": "vc2",
                "coordinate": realTimeGPSPoint[index - 1],
                "time": time, //当前时间戳
                "astern": false
            },
        ];
        //实时移动
        fdapi.vehicle2.moveTo(moveToArr);
    } else {
        //运动结束后清除定时器
        clearInterval(timer);
    }
}, 1000);
```

---

### `setFollow(ids, distance, flyTime, pitch, yaw, sensitivity, watchControl, offset, fn)` {#setFollow}

设置载具自动跟随相机

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle2对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，如果设置为负值则会在模型内部，可以用来模拟驾驶员视角 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `pitch` | `number` | 可选参数，相机旋转的Pitch，取值范围：[-90~90] |
| `yaw` | `number` | 可选参数，相机旋转的Yaw，取值范围： [-180~180] |
| `sensitivity` | `number` | 可选参数，载具灵敏度，取值范围： [0~1] |
| `watchControl` | `boolean` | 可选参数，是否开启驾驶员的左右观察模式，默认：false |
| `offset` | `array` | 可选参数，跟随后载具视角的偏移量，单位：米，默认值：[0,0,0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetFollow

```js
//设置相机跟随
fdapi.vehicle2.setFollow('vc2', 6, 2, -20, 0, 0.02, false, [0, 0, 0]);
```

---

### `setViewportVisible(id, vp, fn)` {#setViewportVisible}

多视口状态下，设置Vehicle2对象在各视口的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | Vehicle2对象的ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
//进入多视口
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
//仅视口1和视口3可见
fdapi.vehicle2.setViewportVisible('vc2', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)` {#show}

显示一个或多个Vehicle2对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Vehicle2对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.vehicle2.show('vc2');
```

---

### `update(data, fn)` {#update}

修改一个或多个Vehicle2对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | Vehicle2对象或者数组，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据Vehicle2对象的ID更新载具属性 |
| `autoHeight` | `boolean` | 可选，是否自动计算载具行驶高度，默认值：true，注意：当设置为false时会使用载具坐标的高度Z |
| `color` | [`Color`](/docs/api/types#color) | 可选，载具自定义涂装颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `label` | `object` | 可选，载具的标牌对象，默认不显示，包含可配置的参数如下： |
| `label.visible` | `boolean` | 载具标牌是否可见 |
| `label.offset` | `array` | 载具标牌偏移 |
| `label.text` | `string` | 载具标牌显示的字符串 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
//定位到车辆位置
//fdapi.camera.set(493127.98886, 2492019.294375, 7.895526, -22.705507, -63.62706, 1);

let vc2 = {
    "id": "vc2",
    "autoHeight": false,
    "color": [1, 0, 0, 1],//车辆颜色
    "label": {
        "visible": true,//标牌可见性
        "offset": [0, 0, 0.2],//标牌偏移
        "text": "京B 666666" //标牌显示的文字
    }
};
fdapi.vehicle2.update(vc2);
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
await fdapi.vehicle2.updateEnd();
```


## 更多示例

> CancelFollow

```js
//取消相机跟随
fdapi.camera.cancelFollow();
```
