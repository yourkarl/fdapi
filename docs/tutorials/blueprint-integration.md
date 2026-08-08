---
title: 蓝图函数集成
sidebar_label: 蓝图函数集成
description: "UE 蓝图函数从查询、参数映射到调用的完整流程，以及 misc 全局调用与各对象批量调用的选择"
---

# 蓝图函数集成

DTS 的动态实体（CustomObject、Marker3D、SplineMesh、Satellite 等）底层都是 UE 蓝图 Actor。美术/UE 开发者可以在这些 Actor 上发布"蓝图函数"——一段可以被外部触发的行为（播放动画、切换贴图、开合部件等），JS 侧通过 `callBPFunction` 远程调用它。这是一条**跨团队协作链路**：蓝图函数由 UE 侧开发者设计和发布，前端负责查询、拼参数、调用，双方需要对齐函数名与参数含义。

## 两种调用方式

| 方式 | 定位对象 | 适用场景 |
|------|------|------|
| [`fdapi.misc.callBPFunction(data)`](/docs/api/weather/misc#callBPFunction) | 按 `actorTag` + `objectName` 定位场景内任意 Actor | 目标不在 CustomObject/Marker3D/SplineMesh/Satellite/InfoTree 管理范围内的场景对象 |
| `fdapi.<对象>.callBPFunction(data)`（[CustomObject](/docs/api/model/custom-object#callBPFunction)、[Marker3D](/docs/api/marker/marker3d#callBPFunction)、[SplineMesh](/docs/api/vector/spline-mesh#callBPFunction)、[Satellite](/docs/api/traffic/satellite#callBPFunction)、[InfoTree](/docs/api/layer/info-tree#callBPFunction)） | 按对象 `id` 批量定位 | 已经用这些 API 添加/管理的对象——优先用这种方式，可一次批量调用多个对象的多个函数 |
| [`fdapi.vehicle.callBatchFunction(data)`](/docs/api/traffic/vehicle#callBatchFunction) | 按对象 `id` 批量定位 | 功能和参数结构与上面的 `callBPFunction` 完全一致，**但 Vehicle 类的方法名是 `callBatchFunction`**——这是 SDK 本身的命名差异，不是文档笔误，别按其他类的命名习惯去猜 |

两者本质是同一套蓝图调用机制，只是定位对象的方式不同。**只要对象已经在某个 CRUD 类里管理，就优先用该类自己的批量调用方法**（多数类叫 `callBPFunction`，仅 Vehicle 叫 `callBatchFunction`），无需退回 `misc` 版本。

## 标准流程

### 1. 查询：这个对象有哪些蓝图函数

调用前先用 `getBPFunction` 查出目标对象上发布了哪些函数、每个函数需要什么参数——不要凭猜测直接调用。

```js
// 按对象 id 查询（以 CustomObject 为例，其余 CRUD 类同理）
let res = await fdapi.customObject.getBPFunction(['truck']);
let functions = res.data[0].params;   // 该对象包含的蓝图函数列表

// 或按模型 Actor 路径 / 场景任意 Actor 查询
let res2 = await fdapi.misc.getBPFunction('/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3');
```

返回结构里每个函数包含 `functionName` 和 `functionParams`（数组），每个参数有 `name`、`type`、`defaultValue`。**`type` 字段就是下面的 `BPFuncParamType` 枚举值**——`getBPFunction` 和 [`getMaterial`](/docs/api/weather/misc#getMaterial)（详见[材质自定义参数](/docs/tutorials/material-customization)）返回的参数类型共享同一套编码。

### 2. 参数映射：BPFuncParamType 怎么对应 JS 取值

调用时每个参数要写成 `{ paramType, paramValue }`（或再加 `name`，视调用方式而定）。`paramType` 取值参考 [`BPFuncParamType`](/docs/api/types#bpfuncparamtype) 枚举，各类型对应的 `paramValue` 写法：

| 类型 | JS 取值格式 | 示例 |
|------|------|------|
| `Bool` (0) | `boolean` | `true` |
| `UInt8`/`Int32` (1/2) | `number`（整数） | `1` |
| `Float`/`Double` (3/4) | `number` | `100.8` |
| `String` (5) | `string` | `"1号楼"` |
| `Color` (6) | `array` `[r,g,b,a]`，取值范围 [0~1] | `[0, 1, 1, 1]` |
| `Vector2D`/`Vector` (7/8) | `array`，2 或 3 个 `number` | `[1, 0, 0]` |
| `Rotator` (9) | `array` `[Pitch, Yaw, Roll]` | `[0, 90, 0]` |
| `IntArray`/`FloatArray`/`StringArray`/`VectorArray` (10/15/11/12) | 对应基础类型的数组 | `["a", "b"]` |
| `DisplayStyle` (16) | `string`，取值为蓝图函数约定的样式名（如图标/点位/动画样式名称） | `"城市"` |
| `CustomIconPath` (17) | `string`，图标文件路径 | `'@path:/img/icon.png'` |

不确定某个参数该传什么类型时，直接看第 1 步 `getBPFunction` 返回的 `functionParams[].type` 与 `defaultValue`，照着写即可，不要猜。

**对象类型参数**：如果某个蓝图函数需要接收一整个 JSON 对象，没有对应的 `BPFuncParamType`，约定做法是把对象 `JSON.stringify` 后以 `StringArray`/`String` 类型传入，由蓝图函数内部自行反序列化——这需要和设计蓝图函数的 UE 开发者提前约定好序列化格式。

### 3. 调用

```js
// 按对象 id 批量调用（CustomObject/Marker3D/SplineMesh/Satellite/InfoTree 通用模式）
fdapi.customObject.callBPFunction([
    {
        id: 'truck',
        functionName: '状态',
        parameters: [
            { paramType: BPFuncParamType.Int32, paramValue: 1 },
        ],
    },
]);

// 按 actorTag + objectName 调用场景任意 Actor（misc 全局方式）
fdapi.misc.callBPFunction({
    actorTag: 'function',
    objectName: 'BP_Explode_function_2',
    functionName: 'BPF_Explode_Animation',
    paramType: BPFuncParamType.Vector,
    paramValue: [1, 0, 0],
});
```

## 常见坑

- **参数顺序敏感**：`parameters` 数组的顺序和类型必须与蓝图函数定义时的参数顺序、类型逐一对应。顺序错位不会抛异常，只会导致执行结果不符合预期（比如颜色传给了本该是文字的参数）——这是排查蓝图调用问题时第一个要检查的点。
- **调用前必须先确认函数存在**：`callBPFunction` 对不存在的 `functionName` 同样不会显式报错；用 `getBPFunction` 核对函数名拼写和参数类型是最可靠的排查手段。
- **两种调用方式不要混用猜测**：对象已经在 CustomObject/Marker3D/SplineMesh/Satellite/InfoTree 里管理时，用该对象自己的批量 `callBPFunction`（按 `id`）；只有当目标是这些 API 管理范围之外的场景 Actor 时才需要 `misc.callBPFunction`（按 `actorTag` + `objectName`）。

## 参见

- 各对象的 `callBPFunction`/`getBPFunction` 参数细节：[Misc](/docs/api/weather/misc#callBPFunction)、[CustomObject](/docs/api/model/custom-object#callBPFunction)、[Marker3D](/docs/api/marker/marker3d#callBPFunction)、[SplineMesh](/docs/api/vector/spline-mesh#callBPFunction)、[Satellite](/docs/api/traffic/satellite#callBPFunction)、[InfoTree](/docs/api/layer/info-tree#callBPFunction)
- [`BPFuncParamType`](/docs/api/types#bpfuncparamtype) 完整枚举
- [材质自定义参数](/docs/tutorials/material-customization) —— 同样基于 `getMaterial`/参数类型编码的另一条 UE 桥接机制
- [模型资产与 pak 管线](/docs/tutorials/data-model) —— 蓝图 Actor 本身是如何随 pak 加载进场景的
