---
title: EditHelper
sidebar_label: EditHelper
description: "在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。"
---

# EditHelper

在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。



![](/img/refdoc/api/EditHelper.Start.gif)

通过 `api.editHelper` 访问。

---
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：EditHelper 提供在三维场景中手动绘制点/线/面/体的交互能力，并返回绘制结果坐标，供后续分析或落库使用。
- **别名 / 不同行业叫法**：绘制助手 / 手绘工具 / 交互绘制 / 标绘助手 / 采集工具。
- **适用行业**：智慧城市、应急管理、智慧水利、规划设计、测绘
- **使用场景**：
  - 手动框选区域生成分析范围（如淹没、开挖范围）
  - 现场标绘事件点、警戒线与责任区
  - 交互采集坐标用于建模或入库
- **注意事项**：
  - 绘制结果的坐标系需明确
  - 触屏/移动端与桌面端交互体验存在差异
  - 常与 Plot、Polygon 等对象配合完成标绘闭环


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`cancel`](#cancel) | 取消绘制模式 |  |
| [`finish`](#finish) | 绘制结束。调用此方法会结束当前的绘制，并在回调函数中返回绘制类型和坐标点，然后根据这些坐… |  |
| [`setParam`](#setParam) | 设置绘制参数 |  |
| [`start`](#start) | 进入绘制模式 | 启动该功能/交互 |

## 方法（Methods）

### `cancel(fn)` {#cancel}

取消绘制模式

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Cancel

```js
fdapi.editHelper.cancel();
```

---

### `finish(withOffset, fn)` {#finish}

绘制结束。调用此方法会结束当前的绘制，并在回调函数中返回绘制类型和坐标点，然后根据这些坐标点再创建相关的几何图形。

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `withOffset` | `boolean` | 否 | true | 是否计算工程中心偏移，默认值是true |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
let res = await fdapi.editHelper.finish(true);
            switch (res.buildType) {
                case 0: {
                    fdapi.polyline.add({
                        id: Math.random(),
                        coordinates: res.coordinates,
                        color: Color.Red,
                        style: 2,
                        thickness: 10,
                        intensity: 1,
                        flowRate: 0.5,
                    });
                } break;
                case 1: {
                    fdapi.polygon.add({
                        id: Math.random(),
                        color: Color.Blue,
                        coordinates: res.coordinates,
                        frameColor: Color.Red,
                        frameThickness: 1
                    });
                } break;
            }
```

> 示例：Finish

```js
let res = await fdapi.editHelper.finish(true);
switch (res.buildType) {
    case 0: {
        fdapi.polyline.add({
            id: Math.random(),
            coordinates: res.coordinates,
            color: Color.Red,
            style: 2,
            thickness: 10,
            intensity: 1,
            flowRate: 0.5,
            depthTest: false
        });
    } break;

    case 1: {
        fdapi.polygon.add({
            id: Math.random(),
            color: Color.Blue,
            coordinates: res.coordinates,
            frameColor: Color.Red,
            frameThickness: 1,
            depthTest: false
        });
    } break;
}
```

---

### `setParam(lineType, buildType, color, fn)` {#setParam}

设置绘制参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `lineType` | `number` | 否 | 0 | 线类型，0：直线，1：曲线，默认值是0 |
| `buildType` | `number` | 否 | 0 | 绘制类型，0：画多点线段， 1：画多边形， 默认值是0 |
| `color` | [`Color`](/docs/api/types#color) | 是 | - | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetParam

```js
let lineType = 0;           //0：直线，1：曲线
let buildType = 1;          //0：画多点线段， 1：画多边形
let color = Color.Red;      //绘制颜色
fdapi.editHelper.setParam(lineType, buildType, color);
```

---

### `start(fn)` {#start}

进入绘制模式

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Start

```js
fdapi.editHelper.start();
```
