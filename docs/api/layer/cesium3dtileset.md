---
title: Cesium3DTileset
sidebar_label: Cesium3DTileset
description: "Cesium3DTileset 相关的操作 一般通过api.cesium3DTileset调用其方法"
---

# Cesium3DTileset

Cesium3DTileset 相关的操作

一般通过api.cesium3DTileset调用其方法

通过 `api.cesium3DTileset` 访问。

## 构造函数

```js
new Cesium3DTileset()
```

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个Cesium3DTileset对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `tileURL` | `string` | 服务URL地址 |
| `enableLighting` | `boolean` | 可选，服务是否参与光照，默认值：true |
| `offset` | `array` | 可选，基于原始位置的偏移量，默认值：[0,0,0]，单位：米 |

> 示例：Add

```js
fdapi.cesium3DTileset.clear();
let o = {
    id: 'fd1',
    offset: [0, 0, 0], //偏移
    enableLighting: false, //可选，服务是否参与光照，默认值：true
    tileURL: '' //cesium3DTileset服务地址 请先替换参数
};
//注意：此add方法需要网络加载耗时 
//await fdapi.cesium3DTileset.add(o);
//延时1s执行focus
//window.setTimeout(focus,1000);

function focus() {
    fdapi.cesium3DTileset.focus(o.id);
}
```

---

### `clear(fn)`

删除场景中所有的Cesium3DTileset

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.cesium3DTileset.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Cesium3DTileset对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Cesium3DTileset对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.cesium3DTileset.delete('fd1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Cesium3DTileset对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.cesium3DTileset.focus('fd1');
```

---

### `get(ids, fn)`

根据ID获取Cesium3DTileset的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Cesium3DTileset对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
Cesium3DTileset的详细信息
{
        id: 'fd1',
        tileURL: ''
        }
```

> 示例：Get

```js
fdapi.cesium3DTileset.get('fd1');
```

---

### `hide(ids, fn)`

隐藏Cesium3DTileset

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Cesium3DTileset对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.cesium3DTileset.hide('fd1');
```

---

### `hideAll(fn)`

隐藏所有Cesium3DTileset

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.cesium3DTileset.hideAll();
```

---

### `setTileURL(id, newVal, fn)`

设置URL

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `newVal` | `string` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.cesium3DTileset.setTileURL(id, newVal);
```

---

### `show(ids, fn)`

显示Cesium3DTileset

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Cesium3DTileset对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.cesium3DTileset.show('fd1');
```

---

### `showAll(fn)`

显示所有Cesium3DTileset

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.cesium3DTileset.showAll();
```

---

### `update(data, fn)`

修改一个或多个Cesium3DTileset对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: 'fd1',
    tileURL: '' //cesium3DTileset服务地址
}
//await fdapi.cesium3DTileset.update(o);
//fdapi.cesium3DTileset.focus(o.id);
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
await fdapi.cesium3DTileset.updateEnd();
```
