---
title: Rockburst
sidebar_label: Rockburst
description: "Rockburst 岩爆对象，基于 STL/PAK 岩体模型与破碎层级参数，在指定位置触发岩爆——岩体按层级碎裂并被抛掷，用于矿山、隧道、地下工程与军事毁伤仿真。"
---

# Rockburst

Rockburst相关的操作

通过 `api.rockburst` 访问。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：Rockburst 面向岩石动力灾害与毁伤过程仿真：先用 `addByStl` 或 `addByPak` 把岩体模型（`.stl` / `.pak`）放到场景中并设定样式与颜色，再调用 `burst` 在指定震源位置触发爆裂，岩体按 `fractureLevels` 定义的多级破碎层级逐级碎裂，碎片受冲击抛掷并按 `pieceSize` 阈值剔除过小碎片、按 `cellAnisotropy` 控制碎块形态。破碎计算由 `serviceUrl` 指定的后台服务完成，需要服务端开启物理仿真能力。
- **别名 / 不同行业叫法**：岩爆仿真 / 岩石破碎仿真 / 岩体爆裂；矿山行业也称"冲击地压仿真""顶板崩落"，军事领域对应"岩体毁伤效果"。
- **适用行业**：智慧矿山（冲击地压、顶板管理）、隧道与地下工程（岩爆灾害推演）、地质安全应急演练、军事与毁伤评估。
- **使用场景**：
  - 矿山岩爆灾害演示：按真实地质模型触发岩爆，观察碎裂范围与岩块抛掷方向。
  - 隧道施工安全推演：对比不同破碎层级参数下的岩爆破坏程度，辅助支护方案论证。
  - 应急预案演练：把岩爆过程与人员定位、告警标注联动，形成处置流程演示。
  - 毁伤效果评估：对掩体、洞库等目标做岩体破碎与抛掷的定量可视化。
- **注意事项**：
  - **必须先开启物理仿真**：云渲染服务需配置命令行参数 `-FDEnablePhysSimulation`，否则对象创建失败。
  - `addByStl` 需要配合 `serviceUrl`（岩体破碎后台服务）使用；`addByPak` 使用前者生成的 `.pak` 结果文件，可直接回放、无需再算。
  - `fractureLevels` 支持多级破碎（如 `[60, 10, 4]`），层级越多、碎片量越大，注意控制 `pieceSize` 避免碎片爆炸式增长导致卡顿。
  - `burst` 只作用于**已创建**的岩爆对象，需先 `addByStl` / `addByPak` 并等待完成。
  - 岩体模型文件支持网络磁盘、本地磁盘与 URL 路径，路径需与云渲染服务所在机器的可访问范围一致。
  - `data.style` 取值见 [`RockStyle`](/docs/api/types#rockstyle) 枚举。

继承自 [`BaseObject`](/docs/api/utils/base-object)，具备 `updateBegin` / `updateEnd` 批量更新能力。

**相关对象**：[`BattlefieldSimulation`](/docs/api/battle/battlefield-simulation)（战场仿真，岩爆常与之联动做毁伤推演） · [`ExcavationAnalysis`](/docs/api/analysis/excavation-analysis)（开挖分析，用于开挖体量对比） · [`Decal`](/docs/api/overlay/decal)（贴花，可叠加破碎痕迹）。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`addByPak`](#addByPak) | 添加一个或多个Rockburst对象 | 回放已算好的破碎结果 |
| [`addByStl`](#addByStl) | 添加一个或多个Rockburst对象 | 导入 STL 岩体模型 |
| [`burst`](#burst) | 触发岩爆效果，在指定位置产生爆裂 / 岩块抛掷。作用于已创建的岩爆对象。 | 触发岩爆毁伤演示 |
| [`clear`](#clear) | 清除场景中所有的Rockburst对象 | 清空全部对象 |
| [`delete`](#delete) | 删除一个或多个Rockburst对象 | 按 ID 移除对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标 |
| [`get`](#get) | 根据ID获取Rockburst的详细信息 | 查询对象信息 |
| [`hide`](#hide) | 隐藏指定的一组Rockburst对象 | 按条件隐藏 |
| [`show`](#show) | 显示指定的一组Rockburst对象 | 按条件显示 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据 | 大批量改属性前开启事务 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 提交批量修改 |

## 方法（Methods）

### `addByPak(data, fn)` {#addByPak}

添加一个或多个Rockburst对象 注意：创建此对象需要在cloud配置命令行参数：-FDEnablePhysSimulation

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data.id` | `string` | 是 | - | 岩爆对象唯一字符串ID |
| `data.groupId` | `string` | 否 | - | 可选，Group分组d |
| `data.userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `data.coordinateType` | `number` | 否 | 0 | 可选，坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `data.coordinate` | `array` | 是 | - | 岩暴对象放置的坐标位置 `[x,y,z]`，坐标系由 `coordinateType` 决定 |
| `data.rotation` | `array` | 是 | - | 欧拉角旋转朝向：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `data.scale` | `array` | 是 | - | 模型缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `data.filePath` | `string` | 是 | - | 根据addByStl方法生成的岩体模型文件路径：.pak格式文件，支持网络磁盘路径、本地磁盘路径和url路径 |
| `data.style` | `RockStyle` | 是 | Rock_1 | 岩体使用的材质样式枚举，详情参考 `RockStyle`，默认值：Rock_1 |
| `data.color` | `Color` | 是 | [1, 1, 1, 1] | 岩体使用的材质颜色，支持四种格式，取值示例，默认值：[1, 1, 1, 1] |


### `addByStl(data, fn)` {#addByStl}

添加一个或多个Rockburst对象 注意：创建此对象需要在cloud配置命令行参数：-FDEnablePhysSimulation

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data.id` | `string` | 是 | - | 岩爆对象唯一字符串ID |
| `data.groupId` | `string` | 否 | - | 可选，Group分组d |
| `data.userData` | `string` | 否 | - | 可选，用户自定义数据 |
| `data.coordinateType` | `number` | 否 | 0 | 可选，坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `data.coordinate` | `array` | 是 | - | 岩暴对象放置的坐标位置 `[x,y,z]`，坐标系由 `coordinateType` 决定 |
| `data.rotation` | `array` | 是 | - | 欧拉角旋转朝向：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `data.scale` | `array` | 是 | - | 模型缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `data.filePath` | `string` | 是 | - | 岩体模型资源路径：.stl格式文件 |
| `data.style` | `RockStyle` | 是 | Rock_1 | 岩体使用的材质样式枚举，详情参考 `RockStyle`，默认值：Rock_1 |
| `data.color` | `Color` | 是 | [1, 1, 1, 1] | 岩体使用的材质颜色，支持四种格式，取值示例，默认值：[1, 1, 1, 1] |
| `data.serviceUrl` | `string` | 是 | - | 岩体破碎计算后台服务的URL地址，破碎运算在这个服务执行 |
| `data.fractureLevels` | `array` | 是 | - | 破碎层级参数，支持多级破碎，如：[60, 10, 4]，含义是主模型一级破碎60大块，大块受冲击再碎为10块，碎片继续碎裂为4块更小的碎块。 |
| `data.pieceSize` | `number` | 是 | - | 岩体碎片最小尺寸的阈值，单位：米，小于这个值的碎片会被丢弃，避免碎片数量过多 |
| `data.cellAnisotropy` | `array` | 是 | [1.0, 1.0, 1.0] | 岩体碎片的各向异性，即在X/Y/Z三个方向上的拉伸压缩比例，默认值：[1.0, 1.0, 1.0]，取值释义：某轴等于1则默认各方向同性，碎块趋向等轴、接近多面体，长短轴差别不大，碎块的形态均匀、饱满；某轴大于1则碎片沿轴拉长，生成长条状、片状碎片；某轴小于1则沿轴压扁，生成薄片、板状碎块。 |
| `data.booleanOperations` | `object` | 是 | - | 布尔运算参数配置对象，包含以下参数： |
| `data.booleanOperations.type` | `` | 是 | - | 布尔运算类型 |
| `data.booleanOperations.path` | `` | 是 | - | 参与布尔运算的模型文件的路径，文件格式：.off/.stl |


### `burst(data, fn)` {#burst}

触发岩爆效果，在指定位置产生爆裂 / 岩块抛掷。作用于已创建的岩爆对象。

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data` | `object \| array` | 是 | - | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |

> **`data` 对象属性：**

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `data.coordinate` | `array` | 是 | - | 必选，岩爆中心（震源）坐标 `[x,y,z]` |
| `data.direction` | `array` | 否 | - | 可选，岩爆朝向向量（震源）朝向 `[vx,vy,vz]` |
| `data.damageRadius` | `number` | 是 | 3米 | 必选，破坏半径，此半径内岩体发生破裂，单位：米，默认值：3米 |
| `data.impulseStrength` | `number` | 是 | 1000 | 必选，冲击强度（冲量），值越大岩块抛掷越剧烈，默认值：1000 |
| `data.ellipsoid` | `object` | 否 | - | 可选，岩暴点朝向的可视化椭球配置 |


### `clear(fn)` {#clear}

清除场景中所有的Rockburst对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `delete(ids, fn)` {#delete}

删除一个或多个Rockburst对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要删除的Rockburst对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `focus(ids, distance, flyTime, rotation, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Rockburst对象的ID或者ID数组 |
| `distance` | `number` | 否 | - | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 否 | - | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 否 | - | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `get(ids, fn)` {#get}

根据ID获取Rockburst的详细信息

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | 要获取的Rockburst对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `hide(ids, fn)` {#hide}

隐藏指定的一组Rockburst对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Rockburst对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `show(ids, fn)` {#show}

显示指定的一组Rockburst对象

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `ids` | `string \| array` | 是 | - | Rockburst对象的ID或者ID数组 |
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性 在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据 注意： updateBegin不是异步调用，不需要await，也没有回调函数参数

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) {
     fdapi.xxx.setColor(i, Color.Yellow);
} 
fdapi.xxx.updateEnd(function () {
     log('update finished!');
});
```


### `updateEnd(fn)` {#updateEnd}

用于批量多次修改对象的属性，与updateBegin配套使用 注意： updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `fn` | `function` | 否 | - | 可选的回调函数，请参考二次开发：异步接口调用方式 |


