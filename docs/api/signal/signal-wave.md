---
title: SignalWave
sidebar_label: SignalWave
description: "SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。"
---

# SignalWave

SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。

通过 `api.signalWave` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。
- **别名 / 不同行业叫法**：信号波 / 电磁波 / 信号覆盖 / 传播波 / 涟漪波 / 扩散波。
- **适用行业**：通信、国防、物联网、应急通信、广电
- **使用场景**：
  - 信号源覆盖扩散的动态表达
  - 通信/广播传播示意
  - 事件信号传播的可视化
- **注意事项**：
  - 为示意性可视化，非精确传播模型
  - 扩散参数需结合业务设定
  - 与 Antenna、Beam 配合使用


## 方法（Methods）

### `add(data, fn)`

添加一个或多个SignalWave波束对象

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
| `alpha` | `number` | 波束的透明度，取值范围：[0~1] |
| `range` | `array` | 距离波束发射点A的衰减范围，[min,max]，在min和max之间显示透明度渐变，大于max则波束消失。 |
| `valA` | `array` | 构造波束的位置坐标A: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valB` | `array` | 构造波束的位置坐标B: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valC` | `array` | 构造波束的位置坐标C: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valD` | `array` | 构造波束的位置坐标D: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valE` | `array` | 构造波束的位置坐标E: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valF` | `array` | 构造波束的位置坐标F: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |
| `valG` | `array` | 构造波束的位置坐标G: [x, y, z]，[取值示例](/docs/tutorials/coordinates) |

> 示例：Add

```js
fdapi.signalWave.clear();
let signalWave = {
    id: 'signalWave',
    groupId: 'group1',
    userData: '波束',
    alpha: 0.2,//透明度
    range: [20, 100],
    valA: [
        492894.75,
        2492212.5,
        0
    ], valB: [
        492984.56999999995,
        2492121.8,
        0
    ], valC: [
        492994.20999999996,
        2492134.01,
        0
    ], valD: [
        493003.83999999997,
        2492146.22,
        0
    ], valE: [
        492963.9,
        2492157.93,
        0
    ], valF: [
        493066.92000000004,
        2492076.63,
        0
    ], valG: [
        492894.75,
        2492212.5,
        26.93
    ]
}
fdapi.signalWave.add(signalWave);
fdapi.signalWave.focus('signalWave');
```

---

### `clear(fn)`

删除场景中所有的SignalWave

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.signalWave.clear();
```

---

### `delete(ids, fn)`

删除一个或多个SignalWave对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的SignalWave对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.signalWave.delete('signalWave');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | SignalWave对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.signalWave.focus('signalWave');
```

---

### `get(ids, fn)`

根据ID获取SignalWave的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的SignalWave对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
结构示例
[
        {
            "id": "signalWave",
            "groupId": "group1",
            "userData": "波束",
            "valA": [
                -20,
                0,
                0
            ],
            "valB": [
                0,
                -10,
                0
            ],
            "valC": [
                0,
                0,
                0
            ],
            "valD": [
                0,
                10,
                0
            ],
            "valE": [
                -10,
                0,
                0
            ],
            "valF": [
                100,
                0,
                0
            ],
            "valG": [
                -20,
                0,
                30
            ]
        }
    ]
```

> 示例：Get

```js
fdapi.signalWave.get('signalWave');
```

---

### `hide(ids, fn)`

隐藏SignalWave

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | SignalWave对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.signalWave.hide('signalWave');
```

---

### `show(ids, fn)`

显示SignalWave

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | SignalWave对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.signalWave.show('signalWave');
```

---

### `update(data, fn)`

修改一个或多个SignalWave对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let signalWave = {
    id: 'signalWave',
    groupId: 'group1',
    userData: '波束',
    alpha: 0.5,//透明度
    range: [20, 100],
    valA: [-50, 0, 0],
    valB: [0, -20, 0],
    valC: [0, 0, 0],
    valD: [0, 20, 0],
    valE: [-20, 0, 0],
    valF: [300, 0, 0],
    valG: [-20, 0, 30],
}
fdapi.signalWave.update(signalWave);
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
await fdapi.signalWave.updateEnd();
```
