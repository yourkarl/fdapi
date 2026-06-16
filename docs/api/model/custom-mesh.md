---
title: CustomMesh
sidebar_label: CustomMesh
description: "CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。"
---

# CustomMesh

CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。

通过 `api.customMesh` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。
- **别名 / 不同行业叫法**：自定义网格 / 几何体 / Mesh / 面片 / 程序化模型。
- **适用行业**：工业仿真、能源、科研可视化、智慧城市、BIM
- **使用场景**：
  - 程序化生成不规则几何（管片、地质体、异形构件）
  - 自定义分析结果面/等值面
  - 特殊形状的标识体或包络体
- **注意事项**：
  - 顶点/索引须正确，法线与缠绕方向影响正反面显隐
  - 大网格注意性能
  - 坐标需与场景一致



## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `add` | 添加一个或多个CustomMesh对象 | 向场景批量添加对象 |
| `clear` | 删除场景中所有的CustomMesh | 清空全部对象，重置图层 |
| `delete` | 删除一个或多个CustomMesh对象 | 按 ID 移除指定对象 |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `get` | 根据ID获取CustomMesh的详细信息 | 查询对象信息，用于业务联动 |
| `hide` | 隐藏CustomMesh | 按业务条件隐藏对象 |
| `setColor` | 设置颜色 |  |
| `setCoordinates` | 设置顶点坐标 |  |
| `setIndices` | 设置顶点索引 |  |
| `show` | 显示CustomMesh | 按业务条件显示对象 |
| `update` | 修改一个或多个CustomMesh对象 | 运行时动态更新对象属性/状态 |

## 方法（Methods）

### `add(data, fn)`

添加一个或多个CustomMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | CustomMesh数据，可以是Object类型或者Array类型，对于每一个CustomMesh，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `coordinates` | `array` | 顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `colors` | `array` | 顶点颜色数组，数组长度要和coordinates一致。支持四种格式，[取值示例](/docs/tutorials/color) |
| `createCollision` | `boolean` | 是否创建碰撞体，默认值：false |
| `indices` | `array` | 顶点坐标的索引，用来绘制三角网格；数组元素类型：(number)；数组元素顺序：顶点索引顺序需构成三角网格且同为顺时针或逆时针方向；数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `color` | [`Color`](/docs/api/types#color) | 颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `material` | `string` | 可选参数，替换材质的文件路径，UE工程里材质文件对应资源的相对路径，用于控制材质的不透明度和颜色等效果 |
| `scalarParameters` | `array` | 可选参数，替换材质包含的数值参数，一般用来控制材质不透明度，包含name/value键值对的数组，其中name是字符串，value为数值 |
| `vectorParameters` | `array` | 可选参数，替换材质包含的数组参数，一般用来控制材质颜色，包含name/value键值对的数组，其中name是字符串，value为数组 |

> 示例：Add

```js
fdapi.customMesh.clear();
await fdapi.customMesh.add({
    id: 'sm1',
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    coordinates: [
        [492610.125, 2491332.75, 12],
        [492866.0625, 2491273.75, 12.23140625655651093],
        [492829.21875, 2491114.5, 12.3060156106948853],
        [492598.9375, 2491150.75, 14.8240623474121094]
    ],//顶点坐标
    colors: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],//顶点颜色
    createCollision: false, //不创建碰撞体
    indices: [2, 0, 3, 0, 2, 1],// 顶点坐标的索引构成的数组
    color: [0.2, 0.5, 0.7, 1], //填充颜色
    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/水/水面1",//资源库自带的透明水材质
    scalarParameters: [{ "name": "不透明度", "value": 0.5 }], //材质不透明度
    vectorParameters: [{ "name": "颜色", "value": [0.2, 0.5, 0.7, 1] }] //材质颜色
});
fdapi.customMesh.focus('sm1', 120);

await fdapi.customMesh.add({
    id: 'sm2',
    coordinateType: 0,
    coordinates: [
        [492573.375, 2491107.5, 14.9681248664855957],
        [492829.84375, 2491038.25, 14.1167187690734863],
        [492822.5, 2490854.75, 13.7651562690734863],
        [492560.9375, 2490875.25, 14.2671875953674316]
    ],
    indices: [2, 0, 3, 0, 2, 1],
    color: [0.2, 0.5, 0.7, 1]
});
fdapi.customMesh.focus('sm2', 100);
```

---

### `clear(fn)`

删除场景中所有的CustomMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.customMesh.clear();
```

---

### `delete(ids, fn)`

删除一个或多个CustomMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的CustomMesh对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.customMesh.delete('sm1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomMesh对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.customMesh.focus('sm1', 0);
```

---

### `get(ids, fn)`

根据ID获取CustomMesh的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的CustomMesh对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
CustomMesh的详细信息
{
            "id":	"sm1",
            "groupId":	"",
            "userData":	""
        }
```

> 示例：Get

```js
fdapi.customMesh.get(['sm1', 'sm2']);
```

---

### `hide(ids, fn)`

隐藏CustomMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomMesh对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.customMesh.hide(['sm1', 'sm2']);
```

---

### `setColor(id, newVal, fn)`

设置颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | [`Color`](/docs/api/types#color) | 新颜色值，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customMesh.setColor(id, newVal);
```

---

### `setCoordinates(id, newVal, fn)`

设置顶点坐标

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | `array` | 新的顶点坐标，[取值示例](/docs/tutorials/coordinates) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customMesh.setCoordinates(id, newVal);
```

---

### `setIndices(id, newVal, fn)`

设置顶点索引

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `newVal` | `array` | 新顶点坐标的索引，数组元素类型：(number)，数组元素取值范围：[0~coordinates.length-1]，取值示例：[2, 0, 3, 0, 2, 1] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customMesh.setIndices(id, newVal);
```

---

### `show(ids, fn)`

显示CustomMesh

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomMesh对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.customMesh.show(['sm1', 'sm2']);
```

---

### `update(data, fn)`

修改一个或多个CustomMesh对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | CustomMesh数据，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
await fdapi.customMesh.update({
    id: 'sm1',
    color: [0.2, 0.5,