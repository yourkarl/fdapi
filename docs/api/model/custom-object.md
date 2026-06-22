---
title: CustomObject
sidebar_label: CustomObject
description: "CustomObject 加载用户自定义三维模型并控制其位置、姿态、动画、跟随与交互，是通用的“动态实体”载体。"
---

# CustomObject

CustomObject 加载用户自定义三维模型并控制其位置、姿态、动画、跟随与交互，是通用的“动态实体”载体。




![](/img/refdoc/api/customobject.gif)

通过 `api.customObject` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CustomObject 加载用户自定义三维模型并控制其位置、姿态、动画、跟随与交互，是通用的“动态实体”载体。
- **别名 / 不同行业叫法**：自定义对象 / 动态模型 / 三维实体 / 设备模型 / 可动模型 / Actor。
- **适用行业**：智慧城市、智慧园区、能源电力、智慧交通、国防、工业
- **使用场景**：
  - 设备、车辆、人员等实体模型的上图与驱动
  - 按实时数据更新模型位姿
  - 模型点选联动业务弹窗与详情
- **注意事项**：
  - 模型面数与数量影响性能，大量模型建议使用批量添加
  - 动画与跟随需注意时序
  - 注意资源路径配置，先在cloud里面配置pak模型文件才能添加
  - 模型位置坐标需要和场景的坐标系一致
  - 从图层actor复制为customObject对象时需要注意性能


## 方法列表

| 方法 | 说明 | 适用业务场景 |
|------|------|------------|
| [`add`](#add) | 添加一个或多个CustomObject对象 | 向场景批量添加对象 |
| [`addByTileLayer`](#addByTileLayer) | 把TileLayer图层中包含的一个或多个(Actor)模型复制为一个CustomObj… |  |
| [`callBPFunction`](#callBPFunction) | 批量方法，调用多个CustomObject对象的多个蓝图函数 |  |
| [`clear`](#clear) | 删除场景中所有的CustomObject | 清空全部对象，重置图层 |
| [`cutFloor`](#cutFloor) | 把一个CustomObject类型的楼宇模型按层高拆分为若干个指定的楼层 |  |
| [`delete`](#delete) | 删除一个或多个CustomObject对象 | 按 ID 移除指定对象 |
| [`focus`](#focus) | 自动定位到合适的观察距离 | 相机定位到目标，点击联动跳转 |
| [`get`](#get) | 根据ID获取CustomObject的详细信息 | 查询对象信息，用于业务联动 |
| [`getBPFunction`](#getBPFunction) | 根据自定义模型id查询自定义模型包含的蓝图函数信息 |  |
| [`glow`](#glow) | 闪烁 |  |
| [`hide`](#hide) | 隐藏CustomObject | 按业务条件隐藏对象 |
| [`hideByGroupId`](#hideByGroupId) | 根据分组ID隐藏自定义对象自定义对象 |  |
| [`highlight`](#highlight) | 高亮 |  |
| [`moveTo`](#moveTo) | 设置CustomObject对象运动（根据实时获取的GPS数据运动） | 驱动对象移动到目标位置 |
| [`overrideMaterial`](#overrideMaterial) | 替换CustomObject对象材质 |  |
| [`pause`](#pause) | 暂停指定自定义对象按轨迹点移动 | 暂停播放 |
| [`restoreMaterial`](#restoreMaterial) | 恢复指定自定义对象的材质 |  |
| [`resume`](#resume) | 恢复指定自定义对象按轨迹点移动 | 恢复播放 |
| [`setLocalRotation`](#setLocalRotation) | 设置模型自身的旋转 |  |
| [`setLocation`](#setLocation) | 设置位置 |  |
| [`setMoveRate`](#setMoveRate) | 设置指定自定义对象对应的移动倍速 |  |
| [`setRotation`](#setRotation) | 设置世界坐标系旋转 |  |
| [`setScale`](#setScale) | 设置缩放 |  |
| [`setSmoothMotion`](#setSmoothMotion) | 设置是平滑插值还是跳跃， 0：跳跃， 1：平滑差值 |  |
| [`setSmoothTime`](#setSmoothTime) | 设置平滑移动的插值时间 |  |
| [`setTintColor`](#setTintColor) | 设置模型叠加颜色 |  |
| [`setViewportVisible`](#setViewportVisible) | 多视口状态下，设置CustomObject对象在各视口的可见性 |  |
| [`show`](#show) | 显示CustomObject | 按业务条件显示对象 |
| [`showByGroupId`](#showByGroupId) | 根据分组ID显示自定义对象 |  |
| [`showGrowth`](#showGrowth) | 模拟从3dt中复制的CustomObject对象的生长动画效果 |  |
| [`startMove`](#startMove) | 自定义对象按轨迹点移动 |  |
| [`stop`](#stop) | 结束指定自定义对象按轨迹点移动 | 停止播放 |
| [`stopGlow`](#stopGlow) | 停止闪烁 |  |
| [`unHighlight`](#unHighlight) | 取消高亮 |  |
| [`update`](#update) | 修改一个或多个CustomObject对象 | 运行时动态更新对象属性/状态 |
| [`updateBegin`](#updateBegin) | 用于批量多次修改对象的属性 | 批量修改前调用，合并提交提升性能 |
| [`updateEnd`](#updateEnd) | 用于批量多次修改对象的属性，与updateBegin配套使用 | 批量修改后提交，与 updateBegin 配套 |

## 方法（Methods）

### `add(data, fn)` {#add}

添加一个或多个CustomObject对象

路径参数assetPath获取方法如下动图：



![](/img/refdoc/api/copy_actor_path.gif)

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `pakFilePath` | `string` | pak文件路径，[资源引入说明](/docs/tutorials/resources) |
| `assetPath` | `string` | 蓝图Actor在UE工程的资源引用目录（相对路径），注意：模型必须是蓝图Actor类，即在使用UE打包pak文件时此自定义对象在UE工程内的相对路径 |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，默认值: [0, 10000] |
| `location` | `array` | 模型位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `coordinateType` | `number` | 坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `rotation` | `array` | 世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `localRotation` | `array` | 模型自身旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `isEffectRotation` | `boolean` | 模型是否开启旋转效果，注意：支持startMove()和moveTo()方法调用时生效 |
| `scale` | `array` | 模型缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `smoothMotion` | `number` | 模型移动动画效果，1: 平滑移动，0: 跳跃移动 |
| `enableDecal` | `boolean` | 可选，是否支持贴画贴合，默认值：true |
| `visible` | `boolean` | 可选，设置自定义对象加载后是否显示，默认：true |
| `autoHeight` | `boolean` | 可选，是否开启自动高度，默认值：false，注意：开启后自动贴地不再使用模型坐标Z |
| `collision` | `boolean` | 可选，设置自定义对象加载后是否开启碰撞，默认：true |
| `curveType` | `number` | 可选，路径模型绘制时曲线的插值类型，取值范围：[0,1]，默认值：0 |
| `segment` | `number` | 可选，路径模型的绘制时曲线的插值的分段数量，默认值：10 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Add

```js
/**
 * 注意：pak资源库文件的挂载方式：
 * 1、cloud配置文件资源 推荐@path 方式  支持把pak文件复制到cloud的文件资源路径 调用接口misc.reloadPak()来重新挂载
 * 2、调用settingsPanel.setPakFile()或settingsPanel.setPakFolder()方法实时挂载pak
 * 3、提前在acp工程内配置好自定义资源
 * 
 * 注意：自定义对象添加方式
 * 1、可以从资源库pak添加各种内置模型 add()
 * 2、也可以从按规范从UE打包的自定义模型添加 add()
 * 3、从已经存在的3dt bim模型包含的构件复制 addByTileLayer()
 */

//添加前清空所有customObject 防止id重复
fdapi.customObject.clear();
//投影坐标
let co_location = [493132.125, 2492028.25, 2.1155664920806885];
let o = {
    id: 'o1',//自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
    assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
    location: co_location,//位置坐标
    coordinateType: 0,// 坐标系类型 
    rotation: [0, 0, 0],// 世界坐标系旋转
    range: [0, 1000],//可见范围
    groupId: "coGroup",//分组id
    localRotation: [0, 0, 0],//模型自身旋转
    scale: [1, 1, 1],//模型缩放
    smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
    enableDecal: false, //可选，是否支持贴画贴合，默认值：true
    visible: true,//可选，设置自定义对象加载后是否显示，默认：true
    autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
    collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
};
await fdapi.customObject.add(o);
fdapi.customObject.focus(o.id);
```

---

### `addByTileLayer(data, fn)` {#addByTileLayer}

把TileLayer图层中包含的一个或多个(Actor)模型复制为一个CustomObject对象

**注意：仅支持engine发布的3dt，且仅支持从默认样式的TileLayer图层，如果设置了3dt图层样式，请使用tileLayer.setStyle()接口恢复默认样式再调用复制接口**

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `tileLayerId` | `string` | TileLayer图层的ID |
| `objectId` | `string \| array` | TileLayer图层中包含的待复制的模型(Actor)的ObjectId，同时也支持数组类型参数即把多个actor复制为一个customObject |
| `location` | `array` | 可选，复制模型的位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值]，注意：不传此参数会使用原始Actor的位置坐标值 |
| `coordinateType` | `number` | 可选，坐标系类型，取值：0为Projection类型，1为WGS84类型，默认值：0 |
| `rotation` | `array` | 可选，复制模型的旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值]，注意：不传此参数会使用原始Actor的旋转值 |
| `scale` | `array` | 可选，复制模型的缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数]，注意：不传此参数会使用原始Actor的缩放值 |
| `smoothMotion` | `number` | 可选，运动时是否平滑差值，取值范围：1: 平滑插值，0: 跳跃，默认值：0 |
| `visible` | `boolean` | 可选，复制模型完成后是否显示，默认：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：AddByTileLayer

```js
/**
 * 把多个actor合并为一个customObject对象
 * 
 * 注意5.3版本新增特性：5.2/5.1版本仅支持复制单个actor，5.3版本同时支持数组类型参数即把多个actor复制为一个customObject
 */

//添加前清空所有customObject 防止id重复
await fdapi.customObject.clear();
//小别墅3dt的图层id
let tileLayerId = '979A4C034E29728F8A2635AD747B72A3';
//查询图层内部包含的构件objectIds
let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);
let objectIds = result.data[0].objectIds;
//执行合并复制
await fdapi.customObject.addByTileLayer({
    id: 'mergeActors',
    location: [492498.71875, 2492250.75, 3],
    tileLayerId: tileLayerId,
    //注意5.3新增特性：数组参数 也支持复制单个构件
    objectId: objectIds,//合并复制多个构件
    coordinateType: 0,// 坐标系类型 
    rotation: [0, 90, 0],//模型旋转
    scale: [1, 1, 1],//模型缩放
    visible: true,//模型是否显示
    smoothMotion: 0     //1: 平滑移动，0: 跳跃移动
});
fdapi.customObject.focus('mergeActors', 10);
```

---

### `callBPFunction(data, fn)` {#callBPFunction}

批量方法，调用多个CustomObject对象的多个蓝图函数

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `functionName` | `string` | 蓝图函数名 |
| `parameters` | `array` | 蓝图函数包含的多个参数，可选参数，数组类型，注意：传入多参数的顺序与类型务必与蓝图函数的参数顺序及其参数类型一致以保证执行结果符合预期。多个参数结构示例：[&#123;"paramType":BPFuncParamType.String,"paramValue":"示例值"&#125;,&#123;"paramType":BPFuncParamType.Bool,"paramValue":false&#125;,&#123;"paramType":BPFuncParamType.Float,"paramValue":100.8&#125;] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
蓝图函数调用示例代码 注意：被调用函数传入的参数类型、参数顺序都必须和蓝图函数的参数类型、顺序完全保持一致！
     fdapi.customObject.callBPFunction([
                {
                    id: 'truck',
                    functionName: '状态',
                    parameters: [
                        { "paramType": 0, "paramValue": 1 },
                        { "paramType": 0, "paramValue": 1 }
                    ]
                }
            ]);
```

---

### `clear(fn)` {#clear}

删除场景中所有的CustomObject

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Clear

```js
fdapi.customObject.clear();
```

---

### `cutFloor(obj, fn)` {#cutFloor}

把一个CustomObject类型的楼宇模型按层高拆分为若干个指定的楼层

**注意：仅支持CustomObject类型的楼宇模型**

| 参数 | 类型 | 说明 |
|------|------|------|
| `obj` | `object` | 对象数据结构，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`obj` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `hideOriginal` | `boolean` | 可选，是否隐藏被拆分的原始楼宇模型，默认值：true |
| `floors` | `array` | 楼宇模型按楼层高度进行拆分的配置规则数组，每一个数组对象包含的属性如下： |
| `floors.id` | `string` | 拆分后的楼层CustomObject对象的ID |
| `floors.minHeight` | `number` | 当前拆分楼层的底面高度 |
| `floors.maxHeight` | `number` | 当前拆分楼层的顶面高度 |
| `floorMaterial` | `object` | 楼宇模型拆分后的楼层模型的底面材质配置参数： |
| `floorMaterial.material` | `string` | 可选，替换底面材质的文件路径，材质文件对应资源的相对路径 |
| `floorMaterial.scalarParameters` | `array` | 可选，替换底面材质数值类型参数数组，包含name/value键值对的数组，其中value为数值 |
| `floorMaterial.vectorParameters` | `array` | 可选，替换底面材质矢量类型参数数组，包含name/value键值对的数组，其中value为数组 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
代码结构示例如下：

 {
            id: "building_001",
            hideOriginal: false,
            floors: [
                        { id: "floor1", minHeight: 0, maxHeight: 3 }, 
                        { id: "floor2", minHeight: 3, maxHeight: 6 }, 
                        { id: "floor3", minHeight: 6, maxHeight: 9 }
                    ],
            floorMaterial: {
                material: "/building/Temp/MaterialA",
                scalarParameters: [{ "name": "亮度", "value": 1.0 }, { "name": "不透明度", "value": 1.0 }],
                vectorParameters: [{ "name": "颜色1", "value": [1, 1, 1, 1] }, { "name": "颜色2", "value": [1, 1, 0, 1] }]
            }
        }
```

> 示例：CutFloor

```js
//创建楼宇对象
fdapi.customObject.clear();
let building = {
    id: 'building',//自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
    assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/建筑/商业建筑/商业建筑_4',//资源目录，自定义对象在pak文件资源包里的相对路径
    location: [493076.319375, 2492226.78796875, 2.3],//位置坐标
    coordinateType: 0,// 坐标系类型 
    rotation: [0, 0, 0],// 世界坐标系旋转
    range: [0, 1000],//可见范围
    groupId: "coGroup",//分组id
    localRotation: [0, 0, 0],//模型自身旋转
    scale: [1, 1, 1],//模型缩放
    smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
    enableDecal: false, //可选，是否支持贴画贴合，默认值：true
    visible: true,//可选，设置自定义对象加载后是否显示，默认：true
    autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
    collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
};
await fdapi.customObject.add(building);
fdapi.customObject.focus(building.id);

//按楼层拆分楼宇
fdapi.customObject.cutFloor({
    id: "building",
    hideOriginal: true, // 隐藏原模型
    floors: [
        { id: "floor1", minHeight: 2, maxHeight: 10 },   // 1F
        { id: "floor2", minHeight: 10, maxHeight: 18 },   // 2F
        { id: "floor3", minHeight: 18, maxHeight: 26 }    // 3F
    ],
    floorMaterial: {
        material: "/JC_CustomAssets/MaterialLibrary/Exhibition/水泥/NewMaterialInstanceConstant_13",
        scalarParameters: [{ "name": "亮度", "value": 1.0 }, { "name": "粗糙度", "value": 0.8 }],
        vectorParameters: [{ "name": "颜色", "value": [1, 1, 1, 1] }, { "name": "脏迹颜色", "value": [0.4, 0.4, 0.4, 1] }]
    }
});

//查询已经拆分的楼层模型位置
let res = fdapi.customObject.get(["floor1", "floor2", "floor3"]);
```

---

### `delete(ids, fn)` {#delete}

删除一个或多个CustomObject对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的CustomObject对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Delete

```js
fdapi.customObject.delete('o1');
```

---

### `focus(ids, distance, flyTime, rotation, actionMode, offset, fn)` {#focus}

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离， 该值有以下3种情况： 1. 如果distance小于0，则是相机跟随移动模式 2. 如果distance等于0，则自动计算飞到合适的距离 3. 如果distance大于0，则是飞到指定距离的位置 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `actionMode` | [`ActionMode`](/docs/api/types#actionmode) | 可选参数，相机视角跟随模式枚举，注意：如果指定了rotation参数同时又指定了跟随枚举，则枚举值包含的相机欧拉角会覆盖rotation参数，若使用FollowWorldRotation则不覆盖rotation参数 |
| `offset` | `array` | 可选参数，相机视角的偏移量，取值示例：[X, Y, Z]，分别是三个方向的偏移量，单位：米 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Focus

```js
//跟随距离设置为-1: 车辆移动时则相机自动跟随 
fdapi.customObject.focus('o1', -1);

//使用ActionMode枚举设置相机跟随模式

//平视跟随
//fdapi.customObject.focus('o1', 5 , 0 , [-12, 0 , 0] , ActionMode.FollowWorldRotation, [0,0,0]);
//后方自定义姿态 距离5米
//fdapi.customObject.focus('o1', 5 , 0 , [-30, 4 , 0] , ActionMode.Follow, [0,0,3]);
//后上方默认枚举 距离5米
//fdapi.customObject.focus('o1', 5 , 0 , null , ActionMode.FollowBehindAndAbove, [0,0,3]);
```

---

### `get(ids, fn)` {#get}

根据ID获取CustomObject的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的CustomObject对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
CustomObject的详细信息
[{
            "id":	"o1",
            "groupId":	"",
            "userdata":	"",
            "coordinatetype":	144,
            "tileLayerId":	"C:\\Users\\Administrator\\AppData\\Roaming\\Cloud\\SDK/media/pak/custom.pak",
            "objectId":	"/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe",
            "location":	[495490.906250, 2490908.000000, 0.250098],
            "rotation":	[0.000000, 0.000000, 0.000000],
            "scale":	[1.000000, 1.000000, 1.000000]
        }]
```

> 示例：Get

```js
fdapi.customObject.get('o1');
```

---

### `getBPFunction(ids, fn)` {#getBPFunction}

根据自定义模型id查询自定义模型包含的蓝图函数信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | customObject对象的id或id数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 异步方法，查询结果通过回调函数 `fn` 返回（也可 `await` 获取），具体数据结构见示例。

> **返回数据结构**

```js
[{
            "idOrPath":	"co1",
            "objectType":	"Actor",
            "params":	[{
                    "functionName":	"特效",
                    "functionParams":	[{
                            "name":	"点特效样式",
                            "type":	16,
                            "defaultValue":	""
                        }, {
                            "name":	"线特效样式",
                            "type":	16,
                            "defaultValue":	""
                        }]
                }, {
                    "functionName":	"图标",
                    "functionParams":	[{
                            "name":	"图标样式",
                            "type":	16,
                            "defaultValue":	""
                        }, {
                            "name":	"图标背景",
                            "type":	16,
                            "defaultValue":	""
                        }]
                }, {
                    "functionName":	"动画",
                    "functionParams":	[{
                            "name":	"启用动画",
                            "type":	0,
                            "defaultValue":	0
                        }, {
                            "name":	"反向动画",
                            "type":	0,
                            "defaultValue":	0
                        }]
                }, {
                    "functionName":	"文字",
                    "functionParams":	[{
                            "name":	"文字内容",
                            "type":	5,
                            "defaultValue":	""
                        }, {
                            "name":	"文字大小",
                            "type":	2,
                            "defaultValue":	0
                        }, {
                            "name":	"背景颜色",
                            "type":	6,
                            "defaultValue":	[1.000000, 1.000000, 1.000000, 1.000000]
                        }, {
                            "name":	"背景倒角",
                            "type":	3,
                            "defaultValue":	0.000000
                        }]
                }]
        }]
```

> 示例：GetBPFunction

```js
//创建工程车_3
fdapi.customObject.clear();
let truck = {
    id: 'truck',//自定义对象唯一id
    pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
    assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/工程车/工程车_3',//资源目录，自定义对象在pak文件资源包里的相对路径
    location: [493116.161875, 2492028.96, 2.11556640625],//位置坐标
    coordinateType: 0,// 坐标系类型 
    rotation: [0, 90, 0],// 世界坐标系旋转
    range: [0, 1000],//可见范围
    groupId: "coGroup",//分组id
    localRotation: [0, 0, 0],//模型自身旋转
    scale: [1, 1, 1],//模型缩放
    isEffectRotation: true,//是否开启旋转效果
    smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
    enableDecal: false, //不支持贴画贴合
    visible: true,//模型加载后默认是否显示
    autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
    collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
};
fdapi.customObject.add(truck);
fdapi.customObject.focus(truck.id);

//查询自定义对象包含的蓝图函数
fdapi.customObject.getBPFunction(['truck']);
```

---

### `glow(data, fn)` {#glow}

闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `color` | [`Color`](/docs/api/types#color) | 闪烁的颜色，支持四种格式，[取值示例](/docs/tutorials/color) |
| `duration` | `number` | 闪烁持续时间，单位：秒，取值范围：[0.01~任意正数] |
| `interval` | `number` | 闪烁间隔时间，单位：秒，取值范围：[0.01~任意正数]，注意：间隔时间要小于持续闪烁时间 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.customObject.glow(data);
```

---

### `hide(ids, fn)` {#hide}

隐藏CustomObject

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Hide

```js
fdapi.customObject.hide('o1');
```

---

### `hideByGroupId(groupId, fn)` {#hideByGroupId}

根据分组ID隐藏自定义对象自定义对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 自定义对象创建时指定的分组ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：HideByGroupId

```js
fdapi.customObject.hideByGroupId('coGroup');
```

---

### `highlight(ids, fn)` {#highlight}

高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Highlight

```js
//设置高亮颜色（全局生效）
fdapi.settings.setHighlightColor(Color.Red);
//高亮co
fdapi.customObject.highlight('o1');
```

---

### `moveTo(data, fn)` {#moveTo}

设置CustomObject对象运动（根据实时获取的GPS数据运动）

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `location` | `array` | 位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 模型旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |
| `smoothTime` | `-` | &#123;number&#125; 可选，平滑移动的插值时间，仅在smoothMotion=1即平滑移动下生效，注意：传值若为0则根据调用setLocation()接口的时间自动计算平滑移动的插值时间，默认值：1，单位：秒 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求参数结构示例

[{
     "id":"co1",
     "location":[2768.1734375,-2264.37375,6.5],
     "rotation":[0,90,0],
     "smoothTime":5
}]
```

> 示例：MoveTo

```js
//定位co
fdapi.customObject.focus('o1');
//模拟实时gps坐标
let realTimeGPSPoint = [
    [493136.5625, 2492028, 2.1],
    [493141.09375, 2492028, 2.1],
    [493143.71875, 2492027.75, 2.1],
    [493146.46875, 2492027.75, 2.1],
    [493150.1875, 2492027.25, 2.1],
    [493153.625, 2492027, 2.1],
    [493152.84375, 2492023.25, 2.1],
    [493150.59375, 2492019, 2.1],
    [493148.75, 2492015, 2.1],
    [493148.03125, 2492012.25, 1.1],
];
//模拟1秒获取一个gps坐标位置 并设置co运动MoveTo方法
let index = 0;
let timer = setInterval(function () {
    index++;
    if (index < 10) {
        fdapi.customObject.moveTo([{
            "id": "o1",
            "location": realTimeGPSPoint[index - 1],
            "smoothTime": 0
        }]);
    } else {
        //运动结束后清除定时器
        clearInterval(timer);
    }
}, 1000);
```

---

### `overrideMaterial(data, fn)` {#overrideMaterial}

替换CustomObject对象材质

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 替换CustomObject对象材质的详细信息，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 必选参数，CustomObject对象的ID |
| `material` | `string` | 可选参数，替换材质的文件路径，材质文件对应资源的相对路径 |
| `scalarParameters` | `array` | 可选参数，替换材质数值类型参数数组，包含name/value键值对的数组，其中value为数值 |
| `vectorParameters` | `array` | 可选参数，替换材质矢量类型参数数组，包含name/value键值对的数组，其中value为数组 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求参数调用说明

构造请求参数须知：
1、如果不传入material参数，注意：不传入material参数的前提是已经用对应材质执行过当前overrideMaterial()方法，
   则需要传入材质对应的scalarParameters或vectorParameters参数，才会执行对应的材质参数进行替换；
2、如果只传入material参数，不传入对应的scalarParameters或vectorParameters参数，则会使用替换材质包含的默认材质参数；
3、如果同时传入material、scalarParameters、vectorParameters参数，则使用指定的材质和指定的材质参数进行材质替换

请求参数示例：
[{
     "id":"o1",
     "material":"/Game/Temp/MaterialA",
     "scalarParameters":[{"name":"scalar1","value":1.0},{"name":"scalar2","value":2.0}],
     "vectorParameters":[{"name":"vector1","value":[1,1,1,1]},{"name":"vector2","value":[2,2,2,2]}]
 },
{
     "id":"o2",
     "material":"/Game/Temp/MaterialB",
     "scalarParameters":[{"name":"Param1","value":3.0},{"name":"Param2","value":4.0}],
     "vectorParameters":[{"name":"Param3","value":[3,3,1,3]},{"name":"Param4","value":[4,2,2,2]}]
}]
```

> 示例：OverrideMaterial

```js
//根据材质路径查询材质包含的参数
let res = await fdapi.misc.getMaterial("/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5");

//颜色参数名称
let colorParamName = res.data[0].params[0].name;
//颜色参数默认值
let colorParamValue = res.data[0].params[0].defaultValue;

//不透明度参数名称
let opacityParamName = res.data[0].params[4].name;
//不透明度默认值
let opacityParamValue = res.data[0].params[4].defaultValue;

//使用资源库的玻璃材质替换自定义对象的材质，控制颜色和不透明度
fdapi.customObject.overrideMaterial(
    [
        {
            "id": "o1",
            "material": "/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5",
            "scalarParameters": [{ "name": opacityParamName, "value": opacityParamValue }],//数值类型参数
            "vectorParameters": [{ "name": colorParamName, "value": colorParamValue }]//数组类型参数
        }
    ]
);
```

---

### `pause(ids, fn)` {#pause}

暂停指定自定义对象按轨迹点移动

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 自定义对象ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Pause

```js
fdapi.customObject.pause(['o1']);
```

---

### `restoreMaterial(ids, fn)` {#restoreMaterial}

恢复指定自定义对象的材质

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：RestoreMaterial

```js
//恢复自定义对象材质
fdapi.customObject.restoreMaterial(['o1', 'o2']);
```

---

### `resume(ids, fn)` {#resume}

恢复指定自定义对象按轨迹点移动

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 自定义对象ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Resume

```js
fdapi.customObject.resume(['o1']);
```

---

### `setLocalRotation(id, newVal, fn)` {#setLocalRotation}

设置模型自身的旋转

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetLocalRotation

```js
//设置模型本身旋转（针对模型朝向不正确进行调整）
await fdapi.customObject.setLocalRotation('o1', [0, 90, 0]);
fdapi.customObject.focus('o1');
```

---

### `setLocation(id, newVal, smoothTime, fn)` {#setLocation}

设置位置

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `newVal` | `array` | 新的位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `smoothTime` | `number` | 可选，平滑移动的插值时间，仅在smoothMotion=1即平滑移动下生效，注意：传值若为0则根据调用setLocation()接口的时间自动计算平滑移动的插值时间，默认值：1，单位：秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.customObject.setLocation(id, newVal, smoothTime);
```

---

### `setMoveRate(data, fn)` {#setMoveRate}

设置指定自定义对象对应的移动倍速

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 设置自定义对象对应的移动倍速的对象或数组，每个对象包含以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 自定义对象ID |
| `rate` | `number` | 自定义对象的移动倍速，默认值：1（一倍速按设置时间正常移动），取值范围：[0~任意正数]，2.2即2.2倍速移动，3即3倍速移动，支持小数。 |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetMoveRate

```js
//设置2倍速移动
fdapi.customObject.setMoveRate([{ 'id': 'o1', 'rate': 2 }]);
```

---

### `setRotation(id, newVal, fn)` {#setRotation}

设置世界坐标系旋转

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetRotation

```js
//设置世界坐标系的旋转
await fdapi.customObject.setRotation('o1', [0, 90, 0]);
fdapi.customObject.focus('o1');
```

---

### `setScale(id, newVal, fn)` {#setScale}

设置缩放

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `newVal` | `array` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetScale

```js
__co_scale[0] += 0.2;
__co_scale[1] += 0.2;
__co_scale[2] += 0.2;
fdapi.customObject.setScale('o1', __co_scale);
```

---

### `setSmoothMotion(id, newVal, fn)` {#setSmoothMotion}

设置是平滑插值还是跳跃， 0：跳跃， 1：平滑差值

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `newVal` | `number` | 新值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetSmoothMotion

```js
fdapi.customObject.setSmoothMotion("o1", 1);
```

---

### `setSmoothTime(id, smoothTime, fn)` {#setSmoothTime}

设置平滑移动的插值时间

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `smoothTime` | `number` | 可选，平滑移动的插值时间，仅在smoothMotion=1即平滑移动下生效，注意：传值若为0则根据调用setLocation()接口的时间自动计算平滑移动的插值时间，默认值：1，单位：秒 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetSmoothTime

```js
fdapi.customObject.setSmoothTime('o1', 5);
```

---

### `setTintColor(ids, newColor, fn)` {#setTintColor}

设置模型叠加颜色

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者数组 |
| `newColor` | [`Color`](/docs/api/types#color) | 新颜色值 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetTintColor

```js
fdapi.customObject.setTintColor('o1', [0.5, 0.5, 0.5, 1]);
```

---

### `setViewportVisible(id, vp, fn)` {#setViewportVisible}

多视口状态下，设置CustomObject对象在各视口的可见性

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `vp` | [`Viewport`](/docs/api/types#viewport) | 视口掩码（Viewport位运算） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：SetViewportVisible

```js
//视口布局类型，取值范围：[1~7]
let viewportMode = 5;
//可选参数，激活后视口边框线的颜色
let lineColor = "#FFFFFF";
//可选参数，激活后视口边框线的宽度，单位：像素px
let lineSize = 2;
//进入多视口
fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
//仅视口1和视口3可见
fdapi.customObject.setViewportVisible('o1', Viewport.V1 | Viewport.V3);
```

---

### `show(ids, fn)` {#show}

显示CustomObject

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Show

```js
fdapi.customObject.show('o1');
```

---

### `showByGroupId(groupId, fn)` {#showByGroupId}

根据分组ID显示自定义对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `groupId` | `string` | 自定义对象创建时指定的分组ID |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowByGroupId

```js
fdapi.customObject.showByGroupId('coGroup');
```

---

### `showGrowth(data, fn)` {#showGrowth}

模拟从3dt中复制的CustomObject对象的生长动画效果

**注意：仅支持从engine发布的3dt文件中使用addByTileLayer()接口复制出来的CustomObject**

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | 数据结构，支持对象或数组，对于每一个对象支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `axis` | [`ForwardAxis`](/docs/api/types#forwardaxis) | (`ForwardAxis`) 自定义模型生长动画轴朝向，取值范围：[0,1,2] 分别对应X、Y、Z三个轴，取值枚举详情参考 `ForwardAxis` |
| `ratio` | `number` | 自定义模型的生长因子，取值范围：[0~1] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：ShowGrowth

```js
let data = {
    id: "mergeActors",
    axis: ForwardAxis.Z, //沿Z轴生长
    ratio: 0
};
fdapi.customObject.showGrowth(data);
fdapi.customObject.focus('mergeActors', 10);

//执行生长动画
let timer = setInterval(function () {
    if (data.ratio <= 1) {
        data.ratio = data.ratio + 0.05;
        fdapi.customObject.showGrowth(data);
    } else {
        clearInterval(timer);
    }
}, 200);
```

---

### `startMove(id, coordinateType, pathPointArr, fn)` {#startMove}

自定义对象按轨迹点移动

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | CustomObject对象的ID |
| `coordinateType` | `number` | 移动轨迹点的坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 |
| `pathPointArr` | `array` | 移动轨迹点的坐标数组，其中每个数组元素支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`pathPointArr` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `time` | `number` | 运动到达时间，单位：秒，注意：运动时间起点默认值必须为0 |
| `coordinate` | `array` | 运动轨迹点坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 可选参数，每个时刻模型的运动姿态（欧拉角），不传则系统自动计算。格式：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：[任意数值] |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

```js
请求参数pathDataArr示例说明

其中：time表示到达时间，即从当前轨迹点移动到下一个轨迹点花费时间为（time2-time1）。
[
            {"time":0,"coordinate":[ -15726.0537109375, 7340.0205078125, 0 ],"rotation": [0,90,0]},//注意：时间起点默认值必须为0
            {"time":0.5,"coordinate":[ -15700.7431640625, 7308.4287109375, 0 ],"rotation": [0,90,0]},
            {"time":1,"coordinate":[ -15682.779296875, 7345.14697265625, 0 ],"rotation": [0,90,0]},
            {"time":1.5,"coordinate":[ -15662.0478515625, 7312.79931640625, 0 ],"rotation": [0,90,0]}
        ]
```

> 示例：StartMove

```js
/**
 * 功能描述：实现车辆按GPS轨迹移动，每隔500毫秒移动一次 
 */

//gps轨迹
let positionArr = [
    [493136.5625, 2492028, 2.1155762672424316],
    [493141.09375, 2492028, 2.1155762672424316],
    [493143.71875, 2492027.75, 2.1155762672424316],
    [493146.46875, 2492027.75, 2.1155664920806885],
    [493150.1875, 2492027.25, 2.1155664920806885],
    [493153.625, 2492027, 2.1155664920806885],
    [493157.09375, 2492026.75, 2.1155762672424316],
    [493160.84375, 2492027, 2.1155567169189453],
    [493164.84375, 2492027, 2.1155762672424316],
    [493169, 2492026.5, 2.1155860424041748],
    [493173.84375, 2492026.25, 2.215576171875],
    [493178.125, 2492026.5, 2.1155664920806885],
    [493181.71875, 2492026.25, 2.1155762672424316],
    [493186.03125, 2492026, 2.1155762672424316],
    [493190.09375, 2492026.25, 2.1155664920806885],
    [493193.84375, 2492026, 2.1155567169189453],
    [493197.46875, 2492025.75, 2.1155664920806885],
    [493201.34375, 2492025.75, 2.1155664920806885],
    [493205.40625, 2492025.75, 2.1155664920806885],
    [493208.5, 2492025.75, 2.1155567169189453],
    [493212.09375, 2492025.25, 2.1155762672424316],
    [493214.78125, 2492025.5, 2.1155664920806885],
    [493219.09375, 2492025, 2.1155762672424316],
    [493224.6875, 2492025, 2.1155762672424316],
    [493229.0625, 2492025, 2.1155762672424316],
    [493232.25, 2492025, 2.1155567169189453],
    [493234.4375, 2492024.25, 2.1155664920806885],
    [493233.96875, 2492021.75, 2.313291072845459],
    [493232.96875, 2492019.75, 2.3133106231689453],
    [493232.15625, 2492016.75, 2.2407324314117432],
    [493231.53125, 2492014, 2.1508495807647705],
    [493230.65625, 2492011.75, 2.0715820789337158],
    [493230.15625, 2492009, 1.982724666595459],
    [493229.65625, 2492007, 1.9172167778015137],
    [493228.875, 2492004.25, 1.8264062404632568],
    [493228.21875, 2492001.5, 1.7359277009963989]
];
//构造移动路径点数组
let pathPointArr = [];
for (let i = 0; i < positionArr.length; i++) {
    //构造数组元素 每1秒移动一次
    let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };
    pathPointArr.push(elementPoint);
}
//设置相机自动跟随
//fdapi.customObject.focus('o1', -1);
//平视 相机自动跟随
fdapi.customObject.focus('o1', 5, 0, [-12, 0, 0], ActionMode.FollowWorldRotation, [0, 0, 0]);
//车辆按GPS轨迹移动
fdapi.customObject.startMove('o1', 0, pathPointArr);
```

---

### `stop(ids, fn)` {#stop}

结束指定自定义对象按轨迹点移动

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 自定义对象ID或ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Stop

```js
fdapi.customObject.stop(['o1']);
```

---

### `stopGlow(ids, fn)` {#stopGlow}

停止闪烁

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：StopGlow

```js
fdapi.customObject.stopGlow(['o1']);
```

---

### `unHighlight(ids, fn)` {#unHighlight}

取消高亮

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomObject对象的ID或者数组 该参数是可选的： - 如果没有指定该参数，则会把场景中所有高亮的CustomObject对消高亮显示 - 如果指定了该参数，则只取消高亮指定的CustomObject对象。 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Unhighlight

```js
fdapi.customObject.unHighlight();
```

---

### `update(data, fn)` {#update}

修改一个或多个CustomObject对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | CustomObject对象或者数组，以下属性支持更新 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 根据CustomObject对象的ID更新以下属性 |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `range` | `array` | 可视范围: [近裁距离, 远裁距离]，默认值: [0, 10000] |
| `location` | `array` | 模型位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(number)，取值范围：[任意数值] |
| `rotation` | `array` | 世界坐标系旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `localRotation` | `array` | 模型自身旋转：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `isEffectRotation` | `boolean` | 模型是否开启旋转效果，注意：支持startMove()和moveTo()方法调用时生效 |
| `scale` | `array` | 模型缩放：[X,Y,Z]，数组元素类型：(number)，取值范围：[任意正整数] |
| `smoothMotion` | `number` | 模型移动动画效果，1: 平滑移动，0: 跳跃移动 |
| `autoHeight` | `boolean` | 可选，是否开启自动高度，默认值：false，注意：开启后自动贴地不再使用模型坐标Z |
| `collision` | `boolean` | 可选，设置自定义对象加载后是否开启碰撞，默认：true |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例：Update

```js
let o = {
    id: 'o1',//自定义对象唯一id
    scale: [2, 2, 2],//模型放大2倍
};
await fdapi.customObject.update(o);
```

---

### `updateBegin()` {#updateBegin}

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

**返回：** 无返回值。

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

### `updateEnd(fn)` {#updateEnd}

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

**返回：** 无返回数据；异步方法，可 `await` 等待执行完成，或在回调函数 `fn` 中处理。

> 示例代码如下：

```js
await fdapi.customObject.updateEnd();
```


## 更多示例

> Glow

```js
fdapi.customObject.glow([{
    id: 'o1',
    color: [1, 0, 0, 1],
    duration: 5, //持续闪烁5秒
    interval: 1  //每隔1秒闪烁一次
}]);
```

> CallBPFunction

```js
//调用蓝图函数，函数名称为【状态】
fdapi.customObject.callBPFunction([
    {
        id: 'truck',
        functionName: '状态',
        parameters: [
            { "paramType": 0, "paramValue": 1 },
            { "paramType": 0, "paramValue": 1 }
        ]
    }
]);
```

> SetLocation

```js
fdapi.customObject.focus('o1', -1);
fdapi.customObject.updateBegin();
fdapi.customObject.setSmoothMotion('o1', 1);
fdapi.customObject.setLocation('o1', [493181.4375, 2492026.5, 2]);
//设置移动插值时间为5秒
fdapi.customObject.setSmoothTime('o1', 5);
fdapi.customObject.updateEnd();
```
