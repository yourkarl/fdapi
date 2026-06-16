---
title: InfoTree
sidebar_label: InfoTree
description: "管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。"
---

# InfoTree

管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。

通过 `api.infoTree` 访问。

---
## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：管理场景中的图层树（目录树）结构，提供对树上对象的定位（focus）、显隐控制、查询及调用对象所挂蓝图函数（callBPFunction）等操作，是组织和联动场景内置对象的统一入口。
- **别名 / 不同行业叫法**：图层树 / 目录树 / 场景树 / 图层目录 / Layers 树。
- **适用行业**：智慧城市、智慧园区、智慧水利、应急管理、智慧交通、能源电力。
- **使用场景**：
  - 通过图层树对场景中预置的模型/图层进行分组管理与一键显隐控制。
  - 根据树节点 id 定位（focus）到指定工程车、设备、楼栋等对象。
  - 调用树上对象绑定的蓝图函数批量驱动其颜色、状态等动态效果。
- **注意事项**：
  - callBPFunction 传入的参数类型与顺序必须与目标蓝图函数完全一致，否则执行结果异常；可先用 fdapi.misc.getBPFunction(id) 查询对象的蓝图函数。
  - 操作依赖图层树上对象的真实 id，需先确保对象已在工程中预置并具有正确节点结构。
  - 主要面向工程内置场景对象，与运行时通过各图层对象动态添加的数据需区分管理。


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| `callBPFunction` | 调用图层树上对象包含的多个蓝图函数， |  |
| `deleteByGroupId` | 通过GroupId删除各类API创建的对象 |  |
| `disableXRay` | 禁用X光 |  |
| `enableXRay` | 启用X光 |  |
| `focus` | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| `get` | 获取图层树信息 | 查询对象信息，用于业务联动 |
| `getBPFunction` | 根据图层树对象ID查询其包含的蓝图函数信息， |  |
| `hide` | 隐藏图层 | 按业务条件隐藏对象 |
| `hideByGroupId` | 通过GroupId隐藏各类API创建的对象 |  |
| `highlightByGroupId` | 通过GroupId高亮各类API创建的对象 |  |
| `setVisibility` | 设置图层的可见性 | 控制对象显隐 |
| `show` | 显示图层 | 按业务条件显示对象 |
| `showByGroupId` | 通过GroupId显示各类API创建的对象 |  |

## 方法（Methods）

### `callBPFunction(data, fn)`

调用图层树上对象包含的多个蓝图函数，注意：可以根据图层树上的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id);

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 图层树上对象的ID |
| `functionName` | `string` | 蓝图函数名 |
| `parameters` | `array` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

```js
蓝图函数调用示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！
     fdapi.infoTree.callBPFunction([
            {
                id: '2BC267114D436EA43BF695AC98DA4E08',
                functionName: '颜色',
                parameters: [
                    { "paramType": 16, "paramValue": "红色" }
                ]
            },
            {
                id: '2BC267114D436EA43BF695AC98DA4E08',
                functionName: '状态',
                parameters: [
                    { "paramType": 5, "paramValue": "载货" }
                ]
            }
        ]);
```

> 示例：调用图层树上对象的蓝图函数：CallBPFunction

```js
fdapi.infoTree.focus('2BC267114D436EA43BF695AC98DA4E08')
//批量调用工程车多个蓝图函数，函数名称为【颜色】【状态】的蓝图函数
fdapi.infoTree.callBPFunction([
    {
        id: '2BC267114D436EA43BF695AC98DA4E08',
        functionName: '颜色',
        parameters: [
            { "paramType": 16, "paramValue": "红色" }
        ]
    },
    {
        id: '2BC267114D436EA43BF695AC98DA4E08',
        functionName: '状态',
        parameters: [
            { "paramType": 5, "paramValue": "载货" }
        ]
    }
]);
```

---

### `deleteByGroupId(groupId, fn)`

通过GroupId删除各类API创建的对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 创建对象时指定的groupId |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.deleteByGroupId(groupId);
```

---

### `disableXRay(ids, fn)`

禁用X光

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 待禁用X光的图层ID（支持单个ID或ID数组） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.disableXRay(ids);
```

---

### `enableXRay(ids, color, fn)`

启用X光

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 待启用X光的图层ID（支持单个ID或ID数组） |
| `color` | [`Color`](/docs/api/types#color) | 颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.enableXRay(ids, color);
```

---

### `focus(ids, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 图层树对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：定位图层：Focus

```js
fdapi.infoTree.focus('979A4C034E29728F8A2635AD747B72A3');
```

---

### `get(fn)`

获取图层树信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
[{
		"iD":	"ProjectTree_Root",
		"index":	0,
		"parentIndex":	-1,
		"name":	"世界",
		"visiblity":	true,
		"type":	"EPT_Folder"
}]

图层返回type字段说明：

  文件夹：EPT_Folder
  场景：EPT_Scene
  场景模型：EPT_ModelActor
  测量：EPT_Measurement
  剖切体：EPT_Cut
  动态水：EPT_DynamicWater
  车辆：EPT_Vehicle
  标签：EPT_Tag
  灯光：EPT_Light
  贴花：EPT_Decal
  光流：EPT_LightBeam
  辐射圈：EPT_RadiationPoint
  面：EPT_Surface
  点Shape：EPT_ShpPoint
  折线Shape：EPT_ShpPolyline
  多边形Shape：EPT_ShpPolygon
  折线：EPT_Polyline
  视频投影：EPT_VideoProjector
  全景图：EPT_Panoramic
  压平：EPT_FlattenModifier
  Cesium3DTileset：EPT_Cesium
  挖洞：EPT_CutPolygonModifier
  动态标记：EPT_EffectPoint
  S3M Layer：EPT_S3MLayer
  粒子：EPT_ParticleActor
  角色：EPT_RoleActor
```

> 示例：获取图层树信息：Get

```js
let res = await fdapi.infoTree.get();
console.log(JSON.stringify(res.infotree));
```

---

### `getBPFunction(ids, fn)`

根据图层树对象ID查询其包含的蓝图函数信息，注意：支持批量查询

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 图层树上对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：查询图层树上对象的蓝图函数：GetBPFunction

```js
fdapi.infoTree.getBPFunction('2BC267114D436EA43BF695AC98DA4E08')
```

---

### `hide(ids, fn)`

隐藏图层

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要隐藏的图层ID（支持单个ID或ID数组） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.infoTree.hide(['6C0888EC46B4C3D68635BF9E98628819', 'B0D8D4AF42F9EFB9BA4B258F3A9BC410']);
```

> 示例：隐藏图层：Hide

```js
//支持按图层树上文件夹id隐藏文件夹内所有模型
fdapi.infoTree.hide(['979A4C034E29728F8A2635AD747B72A3']);
```

---

### `hideByGroupId(groupId, fn)`

通过GroupId隐藏各类API创建的对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 创建对象时指定的groupId |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.hideByGroupId(groupId);
```

---

### `highlightByGroupId(groupId, fn)`

通过GroupId高亮各类API创建的对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 创建对象时指定的groupId |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.highlightByGroupId(groupId);
```

---

### `setVisibility(data, fn)`

设置图层的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 图层可见性对象或数组，每个对象有以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 图层id |
| `visible` | `boolean` | 可见性 |

> 示例代码如下：

```js
await fdapi.infoTree.setVisibility(data);
```

---

### `show(ids, fn)`

显示图层

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要显示的图层ID（支持单个ID或ID数组） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
fdapi.infoTree.show(['6C0888EC46B4C3D68635BF9E98628819', 'B0D8D4AF42F9EFB9BA4B258F3A9BC410']);
```

> 示例：显示图层：Show

```js
//支持按图层树上文件夹id显示文件夹内所有模型
fdapi.infoTree.show('979A4C034E29728F8A2635AD747B72A3');
```

---

### `showByGroupId(groupId, fn)`

通过GroupId显示各类API创建的对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 创建对象时指定的groupId |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.infoTree.showByGroupId(groupId);
```
