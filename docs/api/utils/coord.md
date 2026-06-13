---
title: Coord
sidebar_label: Coord
description: "Coord, 坐标转换相关的操作 一般通过api.coord调用其方法"
---

# Coord

Coord, 坐标转换相关的操作

一般通过api.coord调用其方法

通过 `api.coord` 访问。

---

## 方法（Methods）

### `gcs2pcs(coordinates, coordinateType, fn)`

地理坐标转投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)

注意：在调用接口之前，需要设置工程的坐标系，否则转换失败，错误代码-4

| 参数 | 类型 | 说明 |
|------|------|------|
| `coordinates` | `array` | 坐标值，支持以下几种格式： [0,0] [0,0,0] [[0,0], [0,0], [0,0] ...] [[0,0,0], [0,0,0], [0,0,0] ...] |
| `coordinateType` | `number` | 地理坐标的坐标系类型，取值范围：1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：1 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：地理坐标转为投影坐标：GCS2PCS

```js
//WGS84经纬度转工程坐标系对应的投影坐标 注意：工程需要设置对应的坐标系
fdapi.coord.gcs2pcs([113.98259824550810, 30.297492106590411], 1);
```

---

### `pcs2gcs(coordinates, coordinateType, fn)`

投影坐标转地理坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)

| 参数 | 类型 | 说明 |
|------|------|------|
| `coordinates` | `array` | 坐标值，支持以下几种格式： [0,0] [0,0,0] [[0,0], [0,0], [0,0] ...] [[0,0,0], [0,0,0], [0,0,0] ...] |
| `coordinateType` | `number` | 地理坐标的坐标系类型，取值范围：1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：1 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：投影坐标转为地理坐标：PCS2GCS

```js
//投影转WGS84经纬度 注意：工程需要设置对应的坐标系
fdapi.coord.pcs2gcs([498326, 3353092], 1);
```

---

### `screen2World(x, y, fn)`

屏幕坐标转为投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)

注意：这里的屏幕坐标是相对渲染窗口的坐标，坐标原点位于渲染窗口的左上角。

对于Explorer来说，屏幕坐标就是Explorer窗口坐标；

对于Cloud来说，屏幕坐标是相对视频流画面的坐标而不是Video元素的坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 屏幕坐标值x |
| `y` | `number` | 屏幕坐标值y |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.coord.screen2World(643.466, 392.872);
```

> 示例：屏幕坐标转为世界坐标：Screen2World

```js
//屏幕坐标转投影 
let res = await fdapi.coord.screen2World(600, 400);
log('Screen2World Result: ' + res.worldLocation);
```

---

### `world2Screen(x, y, z, fn)`

投影坐标转为屏幕坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction)

注意：这里的屏幕坐标是相对渲染窗口的坐标，坐标原点位于渲染窗口的左上角。

对于Explorer来说，屏幕坐标就是Explorer窗口坐标；

对于Cloud来说，屏幕坐标是相对视频流画面的坐标而不是Video元素的坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | 世界坐标点x |
| `y` | `number` | 世界坐标点y |
| `z` | `number` | 世界坐标点z |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.coord.world2Screen(-27.39, -9020.16, 82.69);
```

> 示例：世界坐标转为屏幕坐标：World2Screen

```js
//设置位置
fdapi.camera.set(492616.92625, 2492173.455781, 69.874717, -54.843128, -90.117546, 0);


//投影坐标转屏幕坐标
let res = await fdapi.coord.world2Screen(492577.2846875, 2492224.9596875003, 2.7180029296875);
log('World2Screen Result: ' + res.screenPosition);
```
