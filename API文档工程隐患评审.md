# API 文档工程隐患评审（后端架构师视角）

> 范围：`docs/api/` 全部 83 个类文档 + `docs/api/error-codes.md` + `docs/api/types.md`。所有条目均已用 grep/实读源文件核实，非推测。

## 一、命名混乱

1. **同一"批量调用蓝图函数"概念两套命名**：CustomObject/Marker3D/SplineMesh/Satellite/InfoTree 用 `callBPFunction`，唯独 `Vehicle.callBatchFunction` 单独取名。→ 统一改名为 `callBPFunction`，`callBatchFunction` 保留为废弃别名并在 revision-history 记录。
2. **"资源加载路径"三套命名**：`assetPath`（CustomObject/Vehicle/Satellite/Drone，蓝图 Actor 相对路径）、`pakFilePath`（同一批类，pak 包本身路径）、`fileName`（TileLayer，3dt 文件路径）。三个词指向同一类"我要加载的数据在哪"的概念。→ 至少让 `fileName` 改名对齐为 `filePath`（若不便改字段名，也应在参数说明里显式注明"等同于其他类的 pakFilePath/assetPath 语义"）。
3. **"可见范围"类参数命名不成体系**：`range`/`textRange`/`modelRange`/`viewHeightRange`/`imageVisibleDistance` 并存，名字看不出量纲和作用维度（距离？高度？）。→ 收敛为 `<维度>Range` 统一模式（如 `distanceRange`/`heightRange`），并在 `types.md` 建一个"范围类参数命名与单位对照表"。
4. **布尔开关无统一前缀**：`visible`/`autoHeight`/`enableXRay`/`enableDecal`/`castShadows`/`automate` 混用。→ 新增字段一律用 `enableXxx`，旧字段保留但在 SKILL.md/规范文档里列出"历史字段对照表"防止模型/开发者误猜规律。

## 二、规范不一致（调用约定）

5. **同族方法参数结构不对称**：TileLayer 的 `addModifier(id, tileLayerId, coordinates, ententBufferSize, fn)` 用位置参数，同类的 `addModifiers(data, fn)`/`addModifierByShapeFile(data, fn)` 用对象参数。→ 位置参数版本标注为 legacy，新代码统一引导用对象参数版本。
6. **单个/批量操作拆成两个方法而非一个方法兼容 `string|array`**：TileLayer 的 `hideActor(id)`/`hideActors(ids)` 是全站唯一的"单复数拆成两个方法"模式，其余对象一律 `hide(ids)` 自动兼容单个和数组。→ 要么统一成一个方法，要么在 TileLayer 顶部注明"Actor 级操作是本类唯一的单复数拆分例外"。
7. **`focus()` 参数个数在不同类里膨胀不一致**：Marker 5 个参数，Vehicle 8 个参数（多出 `followEnable`/`distanceRotation`），语义是"渐进增强"但没有用统一的 options 对象承载，导致每个类都要重新记参数顺序。→ 新增字段的类改造为 `focus(ids, options, fn)`。

## 三、坐标系定义模糊 / 空间参数歧义

8. **`coordinateType` 取值范围写法两个版本并存**：Marker/Marker3D/CustomObject 等写全 0~3（Projection/WGS84/GCJ02/BD09），而 Vehicle/Vehicle2/Drone/TrafficSimulation 只写 0~1（仅 Projection/WGS84），且未说明为何这几类少了 2/3 两档。→ 需对照 `ac.min.js` 核实这几类是否真的不支持火星坐标系/百度坐标系；若支持，补全文档；若真不支持，要在参数说明里显式写清"本类暂不支持 GCJ02/BD09"，而不是让人以为是漏写。
9. **`tag.md` 的 `coordinateType` 自相矛盾**：参数表标"必填：是"，说明却写"如果不设置此参数，默认为0"——必填不该有"不设置"的分支；取值范围也只写 0/1，漏了 2/3。→ 改成"必填：否，默认值：0"，并补全取值范围。
10. **距离/范围类参数全站不标单位**：`range`/`viewHeightRange`/`distance` 等参数表里几乎都不写"单位：米"，只有个别类（如 Light 的 `distance`）在说明文字里带出来。→ 在 `types.md` 顶部加一条全局约定"除特别说明外，所有长度/距离类参数单位为米，角度类参数单位为度"，一次性消歧义，不用每个参数表重复写。

## 四、返回结构不统一

11. **同为查询方法，返回结构说明详略不一致**：`Marker.get()`/`CustomObject.get()` 给出完整 JSON 返回示例；`River.get()`/`Satellite.get()` 写"具体数据结构见示例"，但示例代码块里只有调用语句（`fdapi.satellite.get([...])`），没有返回值——属于文档承诺和实际内容不符的"伪示例"。→ 补全这两个（以及同类模式的其他查询方法）的真实返回 JSON。
12. **同一返回对象内部字段大小写不统一**：`CustomObject.get()` 返回的 JSON 里 `coordinatetype`（全小写）与请求参数的 `coordinateType`（驼峰）不一致，同一对象里又混着 `tileLayerId`/`objectId`（驼峰）。→ 若确认是 SDK 真实返回（非文档笔误），应在该方法的返回说明里加一句"注意：返回字段 `coordinatetype` 与请求字段 `coordinateType` 大小写不同，请勿假设一致"，避免使用者按请求字段名去读返回值。

## 五、错误码缺失（文档层面）

13. **`error-codes.md` 与 83 个类文档零链接**（已用 `grep -rl "error-codes" docs/api/` 验证，只匹配到文件自身）。错误码体系本身完整（result 0~12、WS 关闭码 4004~4115），但从未被任何方法级文档引用，等于一座孤岛。→ 至少在每个类文档顶部"方法列表"前加一行固定文案："调用失败语义与错误码见 [错误码与失败语义](/docs/api/error-codes)"。
14. **最高频的两个失败场景完全没有方法级说明**：`add()` 类方法不提 ID 重复时的行为（对应 `IDExists=6`），`get()`/`delete()` 类方法不提 ID 不存在时的行为（对应 `ResourceNotFound=3`）。→ 在方法级参数表下方加一行"常见失败：ID 重复→result=6，ID 不存在→result=3，详见错误码表"，比让用户翻文档全文搜索更直接。

## 六、附带发现（非缺陷，但影响维护成本）

15. `朝向参数rotation对应的是[pitch, yaw, roll]...和场景UI的配置不是对应的` 这句轴映射说明在 49 个类文档里逐字重复。内容本身准确、不是矛盾，但维护成本高（改一次要改 49 处）。→ 收敛为 `architecture.md` 或 `coordinates.md` 里的一条独立说明，各类文档改成一句链接引用。

## 优先级

| 优先级 | 条目 |
|---|---|
| P0 | 8（coordinateType 取值范围核实）、9（tag.md 自相矛盾）、13（错误码零链接） |
| P1 | 1（callBatchFunction 改名）、11（伪示例补全）、12（返回字段大小写说明）、14（高频失败场景补充） |
| P2 | 2/3/4（命名收敛）、5/6/7（调用约定统一）、10（全局单位声明）、15（重复说明收敛） |
