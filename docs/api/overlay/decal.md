---
title: Decal
sidebar_label: Decal
description: "Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。"
---

# Decal

Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。



![](/img/refdoc/api/Decal.Add.gif)

通过 `api.decal` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Decal 用于将一张贴图沿包围盒投影"喷涂"到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。
- **别名 / 不同行业叫法**：贴花、喷涂、路面标线、污染落区、漫延范围、地面投影、贴地图案、印花。
- **适用行业**：智慧城市、智慧水利、应急管理、交通、园区、国防军事。
- **使用场景**：
  - 应急行业：在三维地形上喷涂危化品泄漏、油污扩散、火场过火范围等污染落区，直观表达影响范围。
  - 交通行业：在路面投影车道线、导向箭头、停车位、施工警示标线等路面标记。
  - 智慧城市 / 园区：将平面规划图、用地红线、地块色块贴合到真实地表，叠加管理网格或区域标识。
- **注意事项**：
  - 设置 `bbox` 包围盒后 `location` 与 `scale` 参数失效，二者按需二选一使用。
  - `order` 层级决定多张贴花叠加时的覆盖关系，值越大越靠上；`decalBlendMode` 控制是否剔除 PNG 半透明背景。
  - 贴图沿包围盒方向投影，地形起伏过大或贴图分辨率过低时可能出现拉伸或锯齿，应合理选取分辨率与投影范围。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `add` | 添加一个或多个Decal对象 | 向场景批量添加对象 |
| `clear` | 删除场景中所有的Decal | 清空全部对象，重置图层 |
| `delete` | 删除一个或多个Decal对象 | 按 ID 移除指定对象 |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `focusAll` | 自动定位到能观察所有Decal对象的合适距离 | 相机定位到全部对象的合适视角 |
| `get` | 根据ID获取Decal的详细信息 | 查询对象信息，用于业务联动 |
| `update` | 修改一个或多个Decal对象 | 运行时动态更新对象属性/状态 |
| `updateBegin` | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| `updateEnd` | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)`

添加一个或多个Decal对象

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
| `decalBlendMode` | `number` | 贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0 |
| `order` | `number` | 层级 ：高层级会覆盖掉低层级，即值越大显示越靠上，取值范围：[任意正整数] |
| `texturePath` | `string` | 贴图路径，[资源引入说明](/docs/tutorials/resources) |
| `location` | `array` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，设置bbox后参数失效 |
| `rotation` | `array` | 旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `scale` | `array` | 缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，设置bbox后参数失效 |
| `bbox` | `array` | 可选，贴花覆盖的包围盒范围，数组格式：[minX,minY,minZ,maxX,maxY,maxZ]，数组元素：[任意浮点数]，注意：设置bbox参数后location、scale参数会失效， |

> 示例：Add

```js
fdapi.decal.clear();
await fdapi.decal.add({
    id: 'd1',
    decalBlendMode: 0,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花（剔除png半透明）；默认值：0
    order: 1,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
    texturePath: HostConfig.Path + '/assets/image/decal2.png',//贴图文件路径
    location: [494219.3125, 2490657, -0.001054687425494194],
    rotation: [-90, 180, 0],
    scale: [100, 100, 100]
});
fdapi.decal.focus('d1', 50);

await fdapi.decal.add({
    id: 'd2',
    decalBlendMode: 1,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0
    order: 2,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
    texturePath: HostConfig.Path + '/assets/image/decal1.png',//贴图文件路径
    rotation: [-90, 0, 0],
    bbox: [488670.75, 2488165, 0, 491659.59375, 2490987.5, 800.58]
});
```

---

### `clear(fn)`

删除场景中所有的Decal

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.decal.clear();
```

---

### `delete(ids, fn)`

删除一个或多个Decal对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的Decal对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.decal.delete('d1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | Decal对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.decal.focus('d1', 20);
```

---

### `focusAll(distance, flyTime, rotation, fn)`

自动定位到能观察所有Decal对象的合适距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：FocusAll

```js
fdapi.decal.focusAll();
```

---

### `get(ids, fn)`

根据ID获取Decal的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的Decal对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
Decal的详细信息
[{
            "id":	"d1",
            "groupId":	"",
            "userData":	"",
            "location":	[494219.312500, 2490657.000000, -0.001055],
            "rotation":	[-90.000000, -0.000005, -179.999969],
            "scale":	[1.000000, 1.000000, 1.000000],
            "texturePath":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/media/image/decal1.png",
            "order":	1
        }]
```

> 示例：Get

```js
fdapi.decal.get('d1');
```

---

### `update(data, fn)`

修改一个或多个Decal对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，请参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
await fdapi.decal.update({
    id: 'd1',
    order: 1,
    decalBlendMode: 1,//剔除png半透明
    texturePath: HostConfig.Path + '/assets/image/decal2.png',
    rotation: [-90, 0, 0],
    scale: [50, 50, 50]
});
fdapi.decal.focus('d1', 50);
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
| `fn` | `function` | 可选的回调函数，请参考[二次开发