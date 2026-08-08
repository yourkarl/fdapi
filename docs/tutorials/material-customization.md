---
title: 材质自定义参数
sidebar_label: 材质自定义参数
description: "查询 UE 材质实例参数(getMaterial)、覆盖 scalarParameters/vectorParameters 的完整工作流与常见坑"
---

# 材质自定义参数

CustomObject、CustomMesh、Polyline、Polygon、Polygon3D、TopologyLine、GuideLine、Satellite 等对象都支持替换默认材质，并覆盖材质里的数值/颜色参数。这些参数不是前端定义的，而是 UE 材质实例（Material Instance）里已经声明好的 Scalar Parameter / Vector Parameter，随 pak 打包一并暴露给前端查询——所以第一步永远是"查询这个材质有哪些参数"，而不是猜参数名。

## 1. 查询：这个材质有哪些可调参数

```js
// 根据材质路径查询材质包含的参数信息，可从资源库材质列表复制路径
let res = await fdapi.misc.getMaterial('/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5');

let colorParamName = res.data[0].params[0].name;       // 参数名，如"颜色"
let colorParamValue = res.data[0].params[0].defaultValue;  // 参数默认值
```

返回结构里每个参数包含 `name`、`type`、`defaultValue`。`type` 字段与[蓝图函数集成](/docs/tutorials/blueprint-integration)里 `getBPFunction` 返回的 `type` 是同一套编码（对应 [`BPFuncParamType`](/docs/api/types#bpfuncparamtype)：`3`=Float、`6`=Color 等）——材质参数和蓝图函数参数在 DTS 里共享同一套类型体系。数值型参数（亮度、粗糙度、金属度等）`type` 通常是 `3`（Float），颜色/矢量型参数（颜色、脏迹颜色等）`type` 通常是 `6`（Color/Vector）。

## 2. 覆盖参数：三种传参组合

各对象的材质覆盖方法（`overrideMaterial`、`add()`/`update()` 里的 `material`/`renderer`/`style` 字段等，具体字段名以各自 API 文档为准）都遵循同一条规则：

| 传参组合 | 效果 |
|------|------|
| 只传 `scalarParameters`/`vectorParameters`，不传 `material` | 覆盖对象**当前材质**的参数值（前提：当前材质本身已经是通过材质替换设置的） |
| 只传 `material`，不传 `scalarParameters`/`vectorParameters` | 替换为指定材质，使用该材质的**默认参数** |
| 同时传 `material` + `scalarParameters`/`vectorParameters` | 替换为指定材质，并覆盖为指定的参数值 |

```js
// 完整流程：查询材质参数 → 用查到的参数名覆盖
let res = await fdapi.misc.getMaterial('/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5');
let colorParamName = res.data[0].params[0].name;
let colorParamValue = res.data[0].params[0].defaultValue;
let opacityParamName = res.data[0].params[4].name;
let opacityParamValue = res.data[0].params[4].defaultValue;

fdapi.customObject.overrideMaterial([
    {
        id: 'o1',
        material: '/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5',
        scalarParameters: [{ name: opacityParamName, value: opacityParamValue }],
        vectorParameters: [{ name: colorParamName, value: colorParamValue }],
    },
]);
```

`scalarParameters`/`vectorParameters` 都是 `{ name, value }` 键值对数组：`scalarParameters` 的 `value` 是单个数值（对应 Float 类参数，如亮度、粗糙度、不透明度），`vectorParameters` 的 `value` 是数组（对应 Color/Vector 类参数，如 `[r, g, b, a]` 颜色）。

## 常见坑

- **`name` 必须和 UE 材质实例里的参数名逐字一致**（包括中文参数名、大小写），拼错不会报错，只会静默不生效——这也是为什么第 1 步查询比直接照抄示例代码更可靠。
- **部分对象仅在设置了自定义材质路径后才接受参数覆盖**：Polyline/Polygon/Polygon3D/TopologyLine/GuideLine/Satellite 等文档标注"仅在设置自定义材质路径后生效"，即必须先指定 `material`（或对应的材质路径字段），单独传 `scalarParameters`/`vectorParameters` 而不带材质路径可能不生效；CustomObject/CustomMesh 的 `scalarParameters`/`vectorParameters` 则可以覆盖对象当前材质（不强制同时传 `material`）。以具体对象的 API 文档参数表为准。
- **字段名可能带前缀**：不同对象把这两个参数挂在不同层级——CustomObject/CustomMesh 是顶层字段，GeoJsonLayer 是 `renderer.scalarParameters`/`renderer.vectorParameters`，GuideLine 是 `style.scalarParameters`/`style.vectorParameters`。调用前看清对应对象的参数表。

## 参见

- [`Misc.getMaterial`](/docs/api/weather/misc#getMaterial) —— 查询接口的完整参数与返回结构
- [`CustomObject.overrideMaterial`](/docs/api/model/custom-object#overrideMaterial) —— 三种传参组合的完整示例
- 各对象材质参数字段：[CustomMesh](/docs/api/model/custom-mesh)、[Polyline](/docs/api/vector/polyline)、[Polygon](/docs/api/vector/polygon)、[Polygon3D](/docs/api/vector/polygon3d)、[TopologyLine](/docs/api/vector/topology-line)、[GuideLine](/docs/api/vector/guide-line)、[Satellite](/docs/api/traffic/satellite)
- [蓝图函数集成](/docs/tutorials/blueprint-integration) —— 同样基于 `getBPFunction`/参数类型编码的另一条 UE 桥接机制
