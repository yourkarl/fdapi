---
title: SplineMesh
sidebar_label: SplineMesh
description: "沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。"
---

# SplineMesh

沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。

通过 `api.splineMesh` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。
- **别名 / 不同行业叫法**：样条管线、管道、管线模型、线缆、管廊、放样模型、路径模型、传送带。
- **适用行业**：能源、智慧水利、智慧城市、园区、交通、国防。、低空经济、轨道交通
- **使用场景**：
  - 给排水、油气、电力、热力等管线的三维实体建模与管径可视化。
  - 综合管廊、地下管网的立体路径展示与漫游巡检。
  - 输送带、缆车索道、轨道等连续线状设施的体量化表达。
  - 平滑三维航线 / 航道带：以样条生成连续光滑的低空飞行航道。
  - 轨道交通线路：以样条生成平滑的轨道 / 线路三维走向。
- **注意事项**：
  - 相比 Polyline 的贴地/空间折线，SplineMesh 是有截面体量的三维实体，渲染开销更高，数量多时需控制。
  - curveType 与 segment 控制曲线插值类型与分段数，分段过密会增加面数、影响性能。
  - style 与 meshPath 二选一，传入 meshPath 自定义样式会自动覆盖内置 style。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个SplineMesh对象，绘制路径模型 | 向场景批量添加对象 |
| [`callBPFunction`](#callBPFunction) | 调用splineMesh对象包含的多个蓝图函数 |  |
| [`clear`](#clear) | 清空场景中所有的SplineMesh对象 | 清空全部对象，重置图层 |
| [`delete`](#delete) | 删除一个或多个SplineMesh对象 | 按 ID 移除指定对象 |
| [`deleteByGroupId`](#deleteByGroupId) | 根据分组ID删除SplineMesh |  |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取SplineMesh对象的详细信息 | 查询对象信息，用于业务联动 |
| [`getBPFunction`](#getBPFunction) | 根据splineMesh对象的id查询其包含的蓝图函数信息 |  |
| [`hide`](#hide) | 隐藏一个或多个SplineMesh对象 | 按业务条件隐藏对象 |
| [`hideAll`](#hideAll) | 隐藏所有SplineMesh对象 | 一键隐藏全部对象 |
| [`hideByGroupId`](#hideByGroupId) | 根据分组ID隐藏SplineMesh |  |
| [`show`](#show) | 显示一个或多个SplineMesh对象 | 按业务条件显示对象 |
| [`showAll`](#showAll) | 显示所有SplineMesh对象 | 一键显示全部对象 |
| [`showByGroupId`](#showByGroupId) | 根据分组ID显示SplineMesh |  |
| [`update`](#update) | 修改一个或多个SplineMesh对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个SplineMesh对象，绘制路径模型

展示效果如下动图：



![](/img/refdoc/api/SplineMesh.gif)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | SplineMesh对象的ID |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinateType` | `number` | 否 | 0 | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `coordinates` | `array` | 是 | - | 必选，路径模型的轨迹坐标数组，取值示例：[取值示例](/docs/tutorials/coordinates) |
| `style` | [`SplineMeshStyle`](/docs/api/types#splinemeshstyle) | 否 | - | (`SplineMeshStyle`) 可选(二选一)，路径模型内置样式枚举，取值详情参考 `SplineMeshStyle` |
| `meshPath` | `string` | 否 | - | 可选(二选一)，路径模型自定义样式的打包路径，注意：若传入此路径会自动覆盖style样式 |
| `range` | `array` | 否 | - | 可选，可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `scale` | `number` | 否 | 1 | 可选，路径模型的整体缩放，默认值：1 |
| `curveType` | `number` | 否 | 0 | 可选，路径模型绘制时曲线的插值类型，取值范围：[0,1]，默认值：0 |
| `segment` | `number` | 否 | 10 | 可选，路径模型的绘制时曲线的插值的分段数量，默认值：10 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
//添加前清空
fdapi.splineMesh.clear();
//执行添加
await fdapi.splineMesh.add([{
    id: 'splineMesh0',
    groupId: "group_sm",
    userData: "路径模型0",
    coordinateType: 0,// 坐标系类型
    coordinates: [
        //围挡样式需要坐标的顺序和闭合关系
        [493323.92, 2491434.1803125, 0],
        [493024.968125, 2491471.44875, 0],
        [492990.035625, 2491309.6234375, 0],
        [493249.5775, 2491251.4575, 0],
        [493323.92, 2491434.1803125, 0],

    ],//路径模型坐标数组
    range: [0, 10000],// 可见范围
    scale: 10, //路径模型的缩放值，默认值：1
    style: SplineMeshStyle.Fence_2 //样式枚举
}, {
    id: 'splineMesh1',
    groupId: "group_sm",
    userData: "路径模型1",
    coordinateType: 0,// 坐标系类型
    coordinates: [
        [492922.25, 2491069.25, 2],
        [493187.5, 2490997.5, 2],
        [493247.875, 2491182, 2],
        [492972.53125, 2491265, 2],
    ],//路径模型坐标数组
    range: [0, 10000],// 可见范围
    scale: 10, //路径模型的缩放值，默认值：1
    style: SplineMeshStyle.Pipe //样式枚举
}, {
    id: 'splineMesh2',
    groupId: "group_sm",
    userData: "路径模型2",
    coordinateType: 0,// 坐标系类型
    coordinates: [[493381.7971875, 2490992.06375, 10],
    [493488.2153125, 2491400.73046875, 20],
    [493602.3565625, 2491485.768984375, 30],
    [493731.93343750003, 2491515.048671875, 50],
    [493789.85281250003, 2491384.991640625, 60],
    [493776.03625, 2491302.76265625, 80],
    [493750.6428125, 2491173.12140625, 99]],//路径模型坐标数组
    range: [0, 10000],// 可见范围
    scale: 10, //路径模型的缩放值，默认值：1
    meshPath: "/JC_CustomAssets/SplineLibrary/Exhibition/其他/矩形管道" //自定义样式的路径 注意：传入后会自动覆盖style参数
}]);
fdapi.splineMesh.focus('splineMesh1', 50);

//批量调用多个蓝图函数，函数名称为【颜色】【透明度】【矩形】的蓝图函数
fdapi.splineMesh.callBPFunction([
    {
        id: 'splineMesh1',
        functionName: '透明度',
        parameters: [
            { "paramType": 3, "paramValue": 5 }
        ]
    },
    {
        id: 'splineMesh1',
        functionName: '颜色',
        parameters: [
            { "paramType": 6, "paramValue": [1, 1, 0, 1] }
        ]
    }, {
        id: 'splineMesh2',
        functionName: "矩形",
        parameters: [{
            name: "矩形颜色",
            paramType: 6,
            paramValue: [0, 1, 0, 1]
        }, {
            name: "矩形亮度",
            paramType: 3,
            paramValue: 10
        }, {
            name: "矩形不透明度",
            paramType: 3,
            paramValue: 1
        }, {
            name: "光流速度",
            paramType: 3,
            paramValue: 0.1
        }, {
            name: "光流密度",
            paramType: 2,
            paramValue: 0
        }]
    }
]);
```

---

### `callBPFunction(data, fn)` {#callBPFunction}

调用splineMesh对象包含的多个蓝图函数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | CustomObject对象的ID |
| `functionName` | `string` | 是 | - | 蓝图函数名 |
| `parameters` | `array` | 否 | - | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：CallBPFunction

```js
//查询蓝图函数包含的参数信息 
let res = await fdapi.splineMesh.getBPFunction(['splineMesh1']);
let functionArr = res.data[0].params;

//批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数
fdapi.splineMesh.callBPFunction([
    {
        id: 'splineMesh1',
        functionName: '透明度',
        parameters: [
            { "paramType": 3, "paramValue": 10 }
        ]
    },
    {
        id: 'splineMesh1',
        functionName: '颜色',
        parameters: [
            { "paramType": 6, "paramValue": [1, 0, 0, 1] }
        ]
    },
    {
        id: 'splineMesh2',
        functionName: '颜色',
        parameters: [
            { "paramType": 6, "paramValue": [1, 1, 0, 1] }
        ]
    },
    {
        id: 'splineMesh2',
        functionName: '透明度',
        parameters: [
            { "paramType": 3, "paramValue": 8 }
        ]
    },
]);
```

---

### `clear(fn)` {#clear}

清空场景中所有的SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.splineMesh.clear();
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的SplineMesh对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.splineMesh.delete(['splineMesh1', 'splineMesh2']);
```

---

### `deleteByGroupId(groupId, fn)` {#deleteByGroupId}

根据分组ID删除SplineMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `groupId` | `string` | 是 | - | 创建SplineMesh对象时指定的分组ID |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：DeleteByGroupId

```js
fdapi.splineMesh.deleteByGroupId('group_sm');
```

---

### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | SplineMesh对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | 2秒 | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
fdapi.splineMesh.focus('splineMesh1', 100);
```

---

### `get(ids, fn)` {#get}

根据ID获取SplineMesh对象的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的SplineMesh对象的SplineMesh对象的ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
splineMesh对象的详细信息
[{
            "id":"vc1",
            "groupId": "car_main_road",
            "userData": "car_info"
        }]
```

> 示例：Get

```js
fdapi.splineMesh.get(['splineMesh1', 'splineMesh2']);
```

---

### `getBPFunction(ids, fn)` {#getBPFunction}

根据splineMesh对象的id查询其包含的蓝图函数信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 3D标注对象ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> 示例：GetBPFunction

```js
fdapi.splineMesh.getBPFunction(['splineMesh1']);
```

---

### `hide(ids, fn)` {#hide}

隐藏一个或多个SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | SplineMesh对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.splineMesh.hide(['splineMesh1', 'splineMesh2']);
```

---

### `hideAll(fn)` {#hideAll}

隐藏所有SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideAll

```js
fdapi.splineMesh.hideAll();
```

---

### `hideByGroupId(groupId, fn)` {#hideByGroupId}

根据分组ID隐藏SplineMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `groupId` | `string` | 是 | - | 创建SplineMesh对象时指定的分组ID |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideByGroupId

```js
fdapi.splineMesh.hideByGroupId('group_sm');
```

---

### `show(ids, fn)` {#show}

显示一个或多个SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | SplineMesh对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.splineMesh.show(['splineMesh1', 'splineMesh2']);
```

---

### `showAll(fn)` {#showAll}

显示所有SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowAll

```js
fdapi.splineMesh.showAll();
```

---

### `showByGroupId(groupId, fn)` {#showByGroupId}

根据分组ID显示SplineMesh

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `groupId` | `string` | 是 | - | 创建SplineMesh对象时指定的分组ID |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowByGroupId

```js
fdapi.splineMesh.showByGroupId('group_sm');
```

---

### `update(data, fn)` {#update}

修改一个或多个SplineMesh对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | SplineMesh对象或者数组，支持更新以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `id` | `string` | 是 | - | 根据SplineMesh对象的ID更新以下属性 |
| `groupId` | `string` | 否 | - | 可选，Group分组 |
| `userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `coordinates` | `array` | 是 | - | 路径模型的轨迹坐标数组，取值示例：[取值示例](/docs/tutorials/coordinates) |
| `range` | `array` | 是 | - | 可视范围: [近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值] |
| `forwardAxis` | `number` | 是 | - | 路径模型的轴朝向，取值范围：[0,1,2] 分别对应X、Y、Z三个轴 |
| `scale` | `number` | 否 | 1 | 路径模型轴朝向的缩放值，默认值：1 |
| `style` | [`SplineMeshStyle`](/docs/api/types#splinemeshstyle) | 是 | - | (`SplineMeshStyle`) 路径模型样式枚举，取值详情参考 `SplineMeshStyle` |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
await fdapi.splineMesh.update({
    id: 'splineMesh1',
    coordinates: [
        [492972.53125, 2491265, 22],
        [493247.875, 2491182, 82],
        [493187.5, 2490997.5, 108],
        [492922.25, 2491069.25, 286],
    ],//路径模型坐标数组
    range: [0, 5000],// 可见范围
    scale: 10,
});
fdapi.splineMesh.focus('splineMesh1', 100);


//批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数
fdapi.splineMesh.callBPFunction([
    {
        id: 'splineMesh1',
        functionName: '透明度',
        parameters: [
            { "paramType": 3, "paramValue": 3 }
        ]
    },
    {
        id: 'splineMesh1',
        functionName: '颜色',
        parameters: [
            { "paramType": 6, "paramValue": [1, 0, 0, 1] }
        ]
    },
    {
        id: 'splineMesh2',
        functionName: '透明度',
        parameters: [
            { "paramType": 3, "paramValue": 3 }
        ]
    },
    {
        id: 'splineMesh2',
        functionName: '颜色',
        parameters: [
            { "paramType": 6, "paramValue": [1, 0, 1, 1] }
        ]
    }
]);
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
await fdapi.splineMesh.updateEnd();
```
