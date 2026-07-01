---
title: Light
sidebar_label: Light
description: "Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。"
---

# Light

Light光源对象，实现对光源对象的操作

通过 `api.light` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。
- **别名 / 不同行业叫法**：灯光、照明、光源、点光源、聚光灯、路灯、补光、夜景灯光。
- **适用行业**：智慧城市、园区、交通、能源、智慧水利、国防军事。
- **使用场景**：
  - 智慧城市 / 园区：夜景照明仿真、路灯亮化、楼宇泛光与景观灯光联动展示。
  - 交通行业：隧道照明、道路路灯、机场跑道灯光等照明设施模拟。
  - 能源 / 安防：探照灯、聚光投射、重点区域补光照明的可视化表达。
- **注意事项**：
  - 朝向参数rotation对应的是[pitch, yaw, roll ]，可以理解为rotation取值是： [Y, Z, X]，和场景UI的配置不是对应的；
  - 开启 `castShadows` 阴影及批量添加多个光源时非常耗性能，建议默认关闭阴影并控制光源数量。
  - `automate` 开启后光源随系统时间昼灭夜亮，调试时需先用天气接口设置为夜晚时间才能看到效果。
  - `outerConAngle` 仅聚光源（type=2）生效，`thickness` 仅矩形光源（type=3）生效，不同类型参数不可混用。

## 构造函数

```js
new Light()
```

---


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个光源对象 | 向场景批量添加对象 |
| [`clear`](#clear) | 清空场景中所有的光源对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个光源对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据光源ID获取光源的详细信息 | 查询对象信息，用于业务联动 |
| [`hide`](#hide) | 隐藏光源 | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有光源 | 一键隐藏全部对象 |
| [`show`](#show) | 显示光源 | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有光源 | 一键显示全部对象 |
| [`update`](#update) | 修改一个或多个光源对象，支持更新以下属性： | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个光源对象  注意：当批量添加多个光源时，渲染阴影效果会非常耗性能，建议默认关闭

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 动态标记的数据，可以是Object类型或者Array类型，对于每一个Light对象，支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 光源的唯一标识符ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `type` | `number` | 是 | - | 光源类型: 1点光源 2聚光源 3矩形光源 |
| `coordinateType` | `number` | 否 | 0 | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinates` | `array` | 是 | - | 光源位置坐标，二维数组，光源类型是点光源和聚光源时参数为单个坐标点： [[X,Y,Z]]，光源类型是矩形光源时参数为包含起始点的坐标数组：[[X1,Y1,Z1], [X2,Y2,Z2]]，[取值示例](/docs/tutorials/coordinates) |
| `color` | `array` | 是 | - | 光源颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `rotation` | `array` | 否 | [0,0,0] | 光源旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `intensity` | `number` | 否 | 8 | 光源亮度，单位：烛光，取值范围：[0~任意数值]，默认值：8 |
| `distance` | `number` | 否 | 5000米 | 光源的可视距离，单位：米，取值范围：[1~任意正数]，默认值：5000米 |
| `attenuationRadius` | `number` | 是 | - | 光源衰减半径，单位：米，取值范围：[0~任意数值] |
| `castShadows` | `boolean` | 是 | - | 光源是否开启阴影效果，注意：当添加多个光源时非常耗性能，默认关闭false |
| `outerConAngle` | `number` | 否 | 45度 | 可选参数，聚光源投射的扇形夹角，单位：度，取值范围：[0~180]，默认值：45度，仅光源类型为聚光源时(type=2)生效 |
| `thickness` | `number` | 否 | 3米 | 可选参数，矩形光源的宽度，单位：米，取值范围：[0.1~20000]，默认值：3米，仅光源类型为矩形光源时(type=3)生效 |
| `automate` | `boolean` | 否 | true | 可选参数，是否根据系统时间自动开关，即开启后晚上自动亮白天自动灭，默认值：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
//设置系统时间为晚上 灯光才会生效
fdapi.weather.setDateTime(2022, 10, 16, 22, 11, false);

//设置相机进入灯光范围
fdapi.camera.set(492569.575508, 2492231.830801, 5.683483, -39.005371, -8.399526, 0);

fdapi.light.clear();

//点光源
let light_1 = {
    "id": "light_1",// 光源唯一标识
    "type": 1, //光源类型: 1点光源 2聚光灯 3平面光
    "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点
    "color": [0, 0, 1, 1], //光源颜色
    "coordinateType": 0,//坐标系类型：0投影 1经纬度
    "rotation": [0, 0, 0],//光源角度
    "intensity": 200,//光源亮度
    "distance": 1000,//光源可视距离
    "attenuationRadius": 100000,//光源衰减半径
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
    "automate": true //是否根据系统时间自动开关，默认值：true
}
await fdapi.light.add(light_1);


//聚光灯(射灯)
let light_2 = {
    "id": "light_2",// 光源唯一标识
    "type": 2, //光源类型: 1点光源 2聚光灯 3平面光
    "coordinates": [[492571.875, 2492234.75, 8]],//光源位置坐标
    "color": [1, 0, 0, 1], //光源颜色
    "coordinateType": 0,//坐标系类型：0投影 1经纬度
    "rotation": [0, 0, 0],//光源角度
    "intensity": 200,//光源亮度
    "distance": 1000,//光源可视距离
    "outerConAngle": 95,//聚光灯投射扇形角度，仅光源类型为聚光灯时此参数生效
    "attenuationRadius": 100,//光源衰减半径
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
    "automate": true //是否根据系统时间自动开关，默认值：true
};
await fdapi.light.add(light_2);
fdapi.camera.set(492571.784414, 2492225.354062, 2.769375, 25.300514, -80.777634, 0);

//平面光
let light_3 = {
    "id": "light_3",// 光源唯一标识
    "type": 3, //光源类型: 1点光源 2聚光灯 3平面光
    "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043], [492573.0625, 2492233.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点
    "color": [0, 1, 0, 1], //光源颜色
    "coordinateType": 0,//坐标系类型：0投影 1经纬度
    "rotation": [0, 0, 0],//光源角度
    "intensity": 200,//光源亮度
    "distance": 1000,//光源可视距离
    "attenuationRadius": 100000,//光源衰减半径
    "thickness": 2,//平面光宽度，仅光源类型为平面光时此参数生效
    "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
    "automate": true //是否根据系统时间自动开关，默认值：true
}
await fdapi.light.add(light_3);
```

---

### `clear(fn)` {#clear}

清空场景中所有的光源对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.light.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个光源对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的光源对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.light.delete(['light_1', 'light_2']);
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 光源对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.light.focus('light_1', 100, 1);
```

---

### `get(ids, fn)` {#get}

根据光源ID获取光源的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的光源对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
返回Light的详细信息 属性详情参见add方法参数
{
            "id":	"light_1",
            "groupId":	"",
            "userData":	"",
            "rotation":	[0.000000, 0.000000, 0.000000],
            "type":	1,
            "intensity":	20000.000000,
            "distance": 1000,
            "outerConAngle":	45.000000,
            "attenuationRadius":	100000.000000,
            "castShadows":	0,
            "thickness":	3.000000,
            "color":	[0.000000, 1.000000, 0.000000, 1.000000]
        }
```

> 示例：Get

```js
fdapi.light.get('light_1');
```

---

### `hide(ids, fn)` {#hide}

隐藏光源

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 光源对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.light.hide(['light_1', 'light_2']);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有光源

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.light.hideAll();
```

---

### `show(ids, fn)` {#show}

显示光源

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 光源对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.light.show('light_1');
```

---

### `showAll(fn)` {#showAll}

显示所有光源

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.light.showAll();
```

---

### `update(data, fn)` {#update}

修改一个或多个光源对象，支持更新以下属性：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `data \| array` | 是 | - | 光源对象或对象数组，支持更新以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 根据Light对象ID更新以下属性 |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinates` | `array` | 是 | - | 光源位置坐标，二维数组，光源类型是点光源和聚光源时参数为单个坐标点： [[X,Y,Z]]，光源类型是矩形光源时参数为包含起始点的坐标数组：[[X1,Y1,Z1], [X2,Y2,Z2]]，[取值示例](/docs/tutorials/coordinates) |
| `color` | `array` | 是 | - | 光源颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `rotation` | `array` | 否 | [0,0,0] | 光源旋转角度：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，默认值：[0,0,0] |
| `intensity` | `number` | 否 | 8 | 光源亮度，单位：烛光，取值范围：[0~任意数值]，默认值：8 |
| `distance` | `number` | 否 | 5000米 | 光源的可视距离，单位：米，取值范围：[1~任意正数]，默认值：5000米 |
| `attenuationRadius` | `number` | 是 | - | 光源衰减半径，单位：米，取值范围：[0~任意数值] |
| `castShadows` | `boolean` | 是 | - | 光源是否开启阴影效果，注意：当添加多个光源时非常耗性能，默认关闭false |
| `outerConAngle` | `number` | 否 | 45度 | 可选参数，聚光源投射的扇形夹角，单位：度，取值范围：[0~180]，默认值：45度，仅光源类型为聚光源时(type=2)生效 |
| `thickness` | `number` | 否 | 3米 | 可选参数，矩形光源的宽度，单位：米，取值范围：[0.1~20000]，默认值：3米，仅光源类型为矩形光源时(type=3)生效 |
| `automate` | `boolean` | 否 | true | 可选参数，是否根据系统时间自动开关，即开启后晚上自动亮白天自动灭，默认值：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
//不支持修改光源类型
let o = {
    "id": "light_1", // 光源唯一标识
    "color": [0, 1, 0, 1], //光源颜色
    "intensity": 100, //光源亮度
    "automate": false //是否根据系统时间自动开关 
}
await fdapi.light.update(o);
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
await fdapi.light.updateEnd();
```
