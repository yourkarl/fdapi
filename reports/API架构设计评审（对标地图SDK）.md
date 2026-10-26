# API 架构设计评审——对标 Cesium / Mapbox / ArcGIS 等地图 SDK

> 视角说明：前两份报告（[工程隐患评审](./API文档工程隐患评审.md)、[方法参数设计审查](./API方法参数设计审查报告.md)）分别处理了协议层问题（坐标系/错误码/返回结构）和逐方法的具体 bug（拼写、必填矛盾、类型错误）。这份报告换一个更高的视角：**作为熟悉 Cesium/Mapbox GL/ArcGIS JS API 的架构师，这套 SDK 的类体系和方法设计跟主流地图/数字孪生 SDK 的成熟范式相比，哪些地方是有意为之的合理取舍，哪些地方是真正的设计债务**。每条结论都先核实了原始文档再下判断，不是空对空的理论比较。

## 一、缺一层统一的"对象基类"文档，是当前最大的架构文档债务

75 个类文档里，几乎每一个都重复罗列 `add`/`update`/`delete`/`get`/`focus`/`show`/`hide`/`clear`/`updateBegin`/`updateEnd` 这套几乎逐字相同的方法签名和说明——查证 `architecture.md` 第93行确实提到"绝大多数可视化对象（继承自 `BaseObject`）遵循统一的生命周期"，但**全站没有一个独立页面文档化 `BaseObject` 这个共享契约**，`types.md` 里也搜不到。

这不是 Cesium/Mapbox 的做法：Cesium 有清晰的 `Entity`/`DataSource`/`PrimitiveCollection` 继承体系，公共方法只在基类文档里出现一次，子类文档只讲**自己独有**的部分。这套 SDK 现在的写法等于把同一份基础契约手动复制粘贴了 75 次——这正是本轮和上两轮审查里反复出现"某个类的 CRUD 方法参数和其他类不对称"（TileLayer 的 addModifier/hideActor 例外、GuideLine.setRange 参数名写错）的**根本原因**：没有唯一的基类文档做单一事实来源，每个类各自维护一份，出错概率随文档数量线性增长。

**建议**：新增 `docs/api/base-object.md`，把 add/update/delete/get/focus/show/hide/clear/updateBegin/updateEnd 的通用契约、参数命名规范（ids 用 string|array、fn 永远最后一位）写一次，各类文档改成"继承自 BaseObject，见 xxx；本类新增/覆盖以下方法"的精简写法。

## 二、"V2 类"现象：三分之二是合理的技术分野，但文档从不说明选型依据

调研了 4 组"看起来重复"的类，结论并不一致，不能一刀切：

- **Vehicle vs Vehicle2**：真有功能差异（Vehicle2 独有 `setFollow` 第一人称跟车、`setViewportVisible` 多视口），但 Vehicle 也有 Vehicle2 没有的 `pause`/`resume`/`setWayPoint`/`start`/`stop`（已知路径点轨迹动画）——**两个类互相缺对方的能力，不是简单的"升级版"关系**，文档目前只说 Vehicle2"提供更丰富的车辆驱动、外观与行为控制"这种空话，没有给出"我该选哪个"的决策依据。
- **ImageryLayer vs ImageryLayer2**：合理——一个用于投影坐标系工程，一个专门服务球面坐标系，技术原因扎实。
- **FiniteElement vs FiniteElement2**：合理的能力升级——2 版本新增了 5 类空间裁剪滤镜（box/plane/sphere/cylinder/threshold），是真实的功能超集关系。
- **HydrodynamicModel vs HydrodynamicModel2**：**两个类都标注"已废弃"，都建议改用 `HydroDynamic2D`**——即"旧版"和"旧版2"同时被废弃、替换成第三个完全不同命名的类。这是版本治理最混乱的一组，命名完全没有传达真实的新旧关系，容易让开发者误以为 HydrodynamicModel2 是当前推荐版本。

**建议**：每一组"重名类"的两个文档顶部都应该加一句"如何选择"的对比说明（哪怕就是"支持 XX 就用这个，否则用那个"），而不是让开发者自己去逐条比对方法列表。HydrodynamicModel2 应该像 HydrodynamicModel 一样明确标注废弃徽标并指向 HydroDynamic2D（目前只有前者有 `:::caution 已废弃` 提示）。

## 三、几何、样式、行为参数从不分层，是历史选型限制，短期改不动，但要在文档里显式承认

Cesium 的 `Entity` 把位置(`position`)和样式(`polyline.material`/`polyline.width`)分成两层，"只想换个颜色不想动位置"是一等公民场景。这套 SDK 的绝大多数类把坐标、样式、行为参数全部拍平在同一个 `data` 对象里（如 `Marker.add()` 的 `text`/`imagePath`/`coordinate`/`range` 全部同级），这意味着：

- 想批量换肤（只改颜色不改位置）必须走 `update()` 传入完整对象或至少显式传坐标字段，没有"只更新样式子树"的语义。
- 材质自定义参数（`scalarParameters`/`vectorParameters`）虽然存在，但只是作为 `data` 里的又一个平级字段，没有形成"样式对象"的统一抽象，各个类字段名和层级还不统一（GeoJSONLayer 用 `renderer.*`，GuideLine 用 `style.*`，多数类直接顶层）。

这是历史遗留的技术选型，牵一发动全身，不建议现在重构 API 本身。**但文档层面应该显式承认这一点**：在 `architecture.md` 或新的概念页里说明"本 SDK 的 update() 是整对象替换语义还是差量合并语义"——这一点目前完全没有讲清楚，是比"分层"本身更紧迫的问题（开发者不知道 `update({id, color:[1,0,0,1]})` 会不会把没传的字段清空）。

## 四、坐标表达用"裸数组 + coordinateType 枚举"而非强类型坐标对象，是易错点但难改

Cesium 用 `Cartesian3`/`Cartographic` 强类型对象，坐标系语义在类型系统里就能防错；这套 SDK 用 `number[]` + 独立的 `coordinateType` 参数隐式表达，两者是分离的、没有编译期约束的两个东西——本轮和此前审查已经发现多处 `coordinateType` 取值范围文档不全、必填/可选标注矛盾的 bug，根源正是这种表达方式**天然容易在文档撰写和实际调用时"漏配对"**（坐标传了，忘了配 coordinateType，或反过来）。这属于 SDK 早期技术选型的历史包袱，改动成本极高（牵涉所有 75 个类的协议），不建议现在改，但建议在 `types.md` 的坐标系说明里加一句显式警告："`coordinate` 和 `coordinateType` 是两个独立参数，必须成对检查，本 SDK 不做运行时校验"。

## 五、批量操作没有逐项失败反馈，与"错误码孤岛"问题相互放大

几乎所有类的 `add(data)`/`update(data)` 都支持 `data` 传数组做批量操作，但**返回值统一是"无返回数据"**——如果批量 10000 条里有 3 条因为 ID 冲突失败（对照上一轮报告已确认的 `IDExists=6`），开发者拿到的响应体里看不出是哪 3 条。Mapbox GL 的 `GeoJSONSource.setData` 和 Cesium 的批量操作虽然也不总是逐项反馈，但至少在文档里会明确"部分失败如何表现"；这套 SDK 现在是文档完全没提，属于本轮新发现、且和"错误码孤岛"问题同源——建议至少在 `error-codes.md` 里补一句"批量操作里单条失败时，整体调用的 result 语义是什么（是整体失败还是忽略失败项）"，这个信息目前完全缺失，需要连线实测才能补上。

## 六、Settings 类是典型的"上帝对象"，但拆分边界本身是合理的，只是没写清楚

Settings 类有 83 个方法，粗看像是反模式，但调研后发现 Settings（全局渲染/画质/交互状态）和 SettingsPanel（UI 面板读写）的职责边界是清楚且合理的——**问题不是该不该拆，是拆完之后没有文档说明这条边界规则**，导致新增方法时容易放错类（这也是为什么上一轮发现 `settings.md` 和 `weather/settings.md` 两份几乎重复的文件同步困难——本质上"哪些设置该进 Settings"这件事本身缺乏文档化的判断标准）。

**建议**：在 `settings.md` 顶部加一句一句话原则，例如"影响云端渲染状态、跨会话生效的配置进 Settings；只影响本地 UI 面板展示、不下发到渲染端的配置进 SettingsPanel"。

## 七、缺乏空间/属性条件查询，是数字孪生场景下的真实短板

对比 ArcGIS JS API 的 `queryFeatures`（支持空间范围、属性表达式过滤）：这套 SDK 的查询类方法一律是 `get(ids)`——只能按已知 ID 查，没有看到"按 groupId 批量查""按空间范围查""按可见性查"这类条件查询接口。对于卫星（万级）、车辆（万级）等海量对象场景，如果业务侧需要"查询当前视野范围内的所有车辆"，现在只能全量 `get()` 再客户端过滤，量大时是真实的性能隐患。`InfoTree` 的 `xxxByGroupId` 系列方法是这个方向上唯一的雏形（按 groupId 批量操作），但没有推广成通用查询能力。**这不是文档问题，是能力缺口**，记录下来供后续版本规划参考，不是本轮文档修复能解决的。

## 优先级建议

| 优先级 | 条目 | 类型 |
|---|---|---|
| 高 | 一（补 BaseObject 基类文档，消除 75 处重复） | 文档架构 |
| 高 | 二（HydrodynamicModel2 补废弃标注 + 每组"重名类"加选型说明） | 文档补充 |
| 中 | 三（明确 update() 是整体替换还是差量合并语义） | 文档补充 |
| 中 | 五（批量操作部分失败语义说明） | 文档补充，需连线实测 |
| 低（记录，不建议改） | 四（坐标表达方式） | 历史技术选型 |
| 低（记录，不建议改） | 六（Settings/SettingsPanel 边界写清楚即可，不用重构） | 文档补充 |
| 规划参考，非文档问题 | 七（缺空间/属性查询能力） | 能力缺口 |
