---
title: Fluid
sidebar_label: Fluid
description: "Fluid流体仿真对象，实现对流体仿真对象的操作 一般通过api.fluid调用其方法"
---

# Fluid

Fluid流体仿真对象，实现对流体仿真对象的操作

一般通过api.fluid调用其方法

![](/img/refdoc/api/fluid.png)

通过 `api.fluid` 访问。

## 构造函数

```js
new Fluid()
```

---

## 方法（Methods）

### `add(data, fn)`

添加一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 流体仿真对象的数据结构，可以是Object类型或者Array类型，对于每一个Fluid对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `groupId` | `string` | 可选，Group分组id |
| `userData` | `string` | 可选，用户自定义数据 |
| `bbox` | `bbox` | 流体仿真的包围盒范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素类型：[任意浮点数] |
| `style` | `number` | 流体样式，共28种水样式，取值范围：[0~27]，样式参考流体的样式预览图 |
| `color` | `Color` | 可选，流体颜色，默认使用style样式自带颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `sources` | `array` | 出水点信息 |
| `sources.id` | `string` | 出水点ID |
| `sources.rotation` | `array` | 出水点旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `sources.bbox` | `array` | 出水点范围，格式：[minX,minY,minZ,maxX,maxY,maxZ]，注意：此出水点bbox范围要在流体仿真的bbox范围内，同时高度位置不要被模型遮挡，一般用射线求交接口拿到地形高度再加上1米即可。 |
| `sources.velocity` | `array` | 出水点uv向量（流速、流向），格式：[x,y]，取值范围：[-2,2] |
| `sources.shape` | `number` | 出水点形状，取值范围：[0,1]，0矩形出水点，1圆形出水点 |
| `sources.duration` | `number` | 出水点仿真执行时间，单位：秒，默认值：-1，即一直执行，大于0则按时间执行 |

```js
示例数据结构：

[{
            "id": "ff",
            "bbox": [
                -100,
                -100,
                -1,
                100,
                100,
                2.5
            ],
            "style": 1,
            "sources": [
                {
                    "id": "ff_1",
                    "rotation": [0,0,0],
                    "bbox": [
                        -10,
                        -10,
                        -1,
                        10,
                        10,
                        2.5
                    ],
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：Add

```js
let bbox = [489521.4, 2490091.04, 5, 490561.35000000003, 2490878.4, 33]
fdapi.fluid.delete('ff');
let fluid = {
    "id": "ff",
    "bbox": bbox,
    "style": 8,
    "sources": [
        {
            "id": "ff_1",
            "rotation": [0, 0, 0],
            "bbox": [490211.933125, 2490391.52, 15, 490221.85625, 2490431.04, 33],
            "velocity": [
                0,
                0
            ],
            "shape": 0,
            "duration": -1
        }
    ]
};
fdapi.fluid.add(fluid);
fdapi.fluid.focus(fluid.id, 100, 2);

//开始水体仿真
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": true,
        }]
}];
fdapi.fluid.continueSource(data);
```

---

### `addSource(data, fn)`

添加一个或多个流体仿真对象的源数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的数据结构，可以是Object类型或者Array类型，对于每一个源数据对象，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 源数据对象的唯一标识符ID |
| `sources` | `array` | 源数据对象源数据 |
| `sources.id` | `string` | id |
| `sources.bbox` | `array` | X、Y方向的包围盒范围，格式：[minX,minY,maxX,maxY]，注意：参数范围不包含高度Z |
| `sources.height` | `number` | 高度 |
| `sources.velocity` | `array` | 速率，格式：[x,y] |
| `sources.shape` | `number` | 形状 |
| `sources.duration` | `number` | 周期 |

```js
示例数据结构：

[{
            "id": "ff",
            "sources": [
                {
                    "id": "f1",
                    "bbox": [
                        -10, 
                        -10,
                        10,
                        10
                    ],
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：AddSource

```js
let data = [{
    "id": "ff",
    "sources": [
        {
            "id": "ff_2",
            "rotation": [0, 45, 0],
            "bbox": [490180.53125, 2490678.5, 22, 490221.34375, 2490719.25, 34],
            "velocity": [
                0,
                0
            ],
            "shape": 1,
            "duration": -1
        }
    ]
}]
fdapi.fluid.addSource(data);

//执行新的出水点
let sourcePlay = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": false, //关闭出水点
        }, {
            "id": "ff_2",
            "active": true,
        },]
}];
fdapi.fluid.continueSource(sourcePlay);
```

---

### `clear(fn)`

清空场景中所有的流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.fluid.clear();
```

---

### `continue(ids, fn)`

继续流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Continue

```js
fdapi.fluid.continue('ff');
```

---

### `continueSource(data, fn)`

继续仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |

> 示例：ContinueSource

```js
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": true,
        }, {
            "id": "ff_2",
            "active": true,
        },]
}];
fdapi.fluid.continueSource(data);
```

---

### `delete(ids, fn)`

删除一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的流体仿真对象ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.fluid.delete('ff');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.fluid.focus('ff');
```

---

### `get(ids, fn)`

根据流体仿真ID获取流体仿真的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的流体仿真对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
返回Fluid的详细信息 属性详情参见add方法参数

[{
            "id": "ff",
            "bbox": [
                -100,
                -100,
                -100,
                100,
                100,
                100
            ],
            "style": 0,
            "sources": [
                {
                    "id": "f1",
                    "bbox": [
                        -10,
                        -10,
                        10,
                        10
                    ],
                    "height": 2,
                    "velocity": [
                        1,
                        1
                    ],
                    "shape": 0,
                    "duration": -1
                }
            ]
        }]
```

> 示例：Get

```js
fdapi.fluid.get('ff');
```

---

### `hide(ids, fn)`

隐藏流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.fluid.hide('ff');
```

---

### `pause(ids, fn)`

暂停流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Pause

```js
fdapi.fluid.pause('ff');
```

---

### `removeSource(data, fn)`

移除一个或多个流体仿真对象的源数据

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 待移除的源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sourceIds` | `array` | 源数据对象id数组 |

```js
示例数据：
[{
     id: "ff",
     sourceIds: ["f1","f2","f3"]
}]
```

> 示例：RemoveSource

```js
let data = [{
    id: "ff",
    sourceIds: ["ff_1", "ff_2"]
}];
fdapi.fluid.removeSource(data);
```

---

### `reset(ids, fn)`

重置流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 一个或多个流体仿真对象的id |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Reset

```js
fdapi.fluid.reset('ff');
```

---

### `show(ids, fn)`

显示流体仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 流体仿真对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.fluid.show('ff');
```

---

### `stopSource(data, fn)`

停止仿真

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 源数据的id信息，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |

> 示例：StopSource

```js
let data = [{
    id: "ff",
    "sources": [
        {
            "id": "ff_1",
            "active": false,
        },
        {
            "id": "ff_2",
            "active": false,
        }]
}];
fdapi.fluid.stopSource(data);
```

---

### `update(data, fn)`

修改一个或多个流体仿真对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 流体仿真对象或对象数组，结构如下： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 流体仿真对象的唯一标识符ID |
| `active` | `boolean` | 是否激活仿真 |
| `sources` | `array` | 流体仿真对象源数据 |
| `sources.id` | `string` | id |
| `sources.active` | `boolean` | 是否激活 |

> 示例：Update

```js
let fluid = {
    "id": "ff",
    "active": false,
    "sources": [
        {
            "id": "ff_1",
            "active": false
        },
        {
            "id": "ff_2",
            "active": false
        }
    ]
};
fdapi.fluid.update(fluid);
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
await fdapi.fluid.updateEnd();
```


## 更多示例

> EnableFluid

```js
//控制图层是否支持水流体效果
fdapi.tileLayer.enableFluid([
    {
        "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
        "supportFluid": false //关闭图层对水流体效果的支持
    }
]);
```
