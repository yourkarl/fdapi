---
title: Panorama
sidebar_label: Panorama
description: "Panorama类，提供全景图相关的操作 一般通过api.panorama调用其方法"
---

# Panorama

Panorama类，提供全景图相关的操作

一般通过api.panorama调用其方法



![](/img/refdoc/api/Panorama.Add.gif)

通过 `api.panorama` 访问。

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个Panorama全景图对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 全景图ID，字符串类型 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `imagePath` | `string` | 图片路径，支持本地路径，[资源引入说明](/docs/tutorials/resources) |
| `coordinate` | `array` | 坐标，[取值示例](/docs/tutorials/coordinates) |
| `yaw` | `number` | 方向，取值范围：[-360~360] |
| `onTerrain` | `boolean` | 全景图是否贴地，默认值：true，注意：设置为贴地后offset偏移量的Z轴会失效 |
| `offset` | `array` | 偏移量，[X,Y,Z]，数组取值范围：[任意数值]，单位：米 |

> 示例：Add

```js
fdapi.panorama.clear();
await fdapi.panorama.add({
    id: 'p1',
    imagePath: HostConfig.Path + '/assets/image/panorama1.jpg',
    coordinate: [492706.53125, 2491819.75, 23],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    yaw: 75, //方向
    onTerrain: true, //是否贴地，注意：设置为贴地后offset偏移量的Z轴会失效
    offset: [0, 0, 0] //偏移量
});
fdapi.panorama.focus('p1');
```

---

### `clear(fn)`

清空场景中所有的Panorama

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.panorama.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Panorama对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Panorama对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.panorama.delete('p1');
```

---

### `enter(id, fn)`

进入全景图模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 要进入的全景图id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Enter

```js
fdapi.panorama.enter('p1');
```

---

### `exit(fn)`

退出全景图模式

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Exit

```js
fdapi.panorama.exit();
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Panorama对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.panorama.focus('p1');
```

---

### `get(ids, fn)`

根据ID获取Panorama的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Panorama对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
Panorama的详细信息
[{
            "id":	"p1",
            "groupId":	"",
            "userData":	"",
            "imagePath":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/media/panorama1.jpg",
            "coordinates":	[495302.625000, 2491061.500000, 30.152344],
            "yaw":	75.000000
        }]
```

> 示例：Get

```js
fdapi.panorama.get('p1');
```

---

### `switchMode(fn)`

切换显示模式，即全景图模式和三维场景模式切换

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：SwitchMode

```js
fdapi.panorama.switchMode();
```

---

### `update(data, fn)`

修改一个或多个Panorama对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
await fdapi.panorama.update({
    id: 'p1',
    imagePath: HostConfig.Path + '/assets/image/panorama2.jpg',
    yaw: 75,
    onTerrain: false, //是否贴地
    offset: [0, 0, 0] //偏移量
});
fdapi.panorama.focus('p1');
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
await fdapi.panorama.updateEnd();
```
