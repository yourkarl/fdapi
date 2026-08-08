# API 契约核实与臆造修复报告

> 2026-07-14 · 按评审意见「契约先行，反转生成方向」执行的全局核查：不再以 `static/dts-sdk.d.ts`（文档反推产物）为基准，而是直接解析 `static/ac.min.js`（SDK 源码本体）建立真实契约，再用契约反查全部文档。

## 第三轮：同步用户更新的原始参考文档（2026-07-16）

用户更新了 `参考资料/API原始参考文档/` 下 118 个原始 jsdoc HTML 页面。用同样的方法（提取每个类页面的 `<h4 class="name" id="方法名">`）对比新旧两版，定位出真实的 SDK 增量：

- **新增方法（13 个，跨 5 个类）**：`TileLayer`（addSymbols/clearSymbols/getStyle/getSymbols/removeSymbols）、`Settings`（getMainUISize/setMainUISize/hideMainUI/showMainUI）、`Weather`（getSunDirection/setAmbientLightColor）、`GeoJSONLayer`/`Polyline`（各 1 个 setViewportVisible）。
- **参数级新增（6 处）**：`VideoProjection.add` 的 `order`、`Weather.setOceanWave` 的 `directionNorm`、`FiniteElement2.add` 的 `blendMode`、`Marker3D.add` 的 `depthTest`、`Tools.startContourLineAnalysis` 的 5 个高度标注/调色板参数。
- **新增枚举**：`UISizeMode`（4 个成员）、`UIPanelType` 追加 3 个成员（RolesFlow/TopologyLine/Fluid）。
- **签名变更（1 处，破坏性）**：`Satellite.add(data, textRange, modelRange, imageVisibleDistance, fn)` 简化为 `add(data, fn)`，三个位置参数改为 `data` 对象内的可选属性——同步修正了文档内两处仍用旧调用方式的示例代码。
- **排除的假阳性**：`TileLayer` 的 `updateHole`/`updateModifier`/`updateRecord` 三个方法在新版 jsdoc 中消失，但官方 changelog（`tutorial-API_Revision.html`）完全没提及移除，且仍存在于本地 `ac.min.js`——判定为文档生成工具的遗漏而非真实移除，未做任何改动。

`docs/tutorials/revision-history.md` 补齐了 2026.05.28–07.17 期间的全部条目（此前最新记录停留在 05.27）。

**过程中的意外发现**：处理这批改动时，`settings/settings.md`、`weather/settings.md`、`weather.md`、`marker3d.md`、`video-projection.md`、`satellite.md`、`analysis/tools.md`、`revision-history.md` 等大文件（多在 45KB~75KB）先后触发同一类沙盒同步问题——Linux 侧挂载在连续多次编辑后会卡在某个旧字节偏移，之后的编辑均不生效且不报错。定位方式：`stat` 显示 mtime 停留在很久以前、`python3 -c "open(...).read()"` 在同一字节位置报 UTF-8 解码错误。修复方法固定为：`git show HEAD:<path>` 取得未受影响的提交版本，用 Python 对该版本重新应用等价的字符串替换，再整体覆盖写回，而非依赖增量 Edit 调用。`static/ac.min.js` 仍是 2026-05-28 的旧编译产物，本轮新增的方法均无法在其中验证存在性（预期之内，因为文档已更新到更新的 SDK 版本）——如果后续拿到对应新版 `ac.min.js`，建议重新跑一遍第一/二轮的契约核对脚本做交叉确认。

## 第四轮：新版 ac.min.js 到位后的交叉确认（2026-07-16）

用户提供了新版 `static/ac.min.js`。重新执行契约提取脚本时发现**新版编译产物把 CRUD 公共基类从 `E` 改名为 `F`**（`class XX extends F{constructor(a){super(a,"Name"...)}`），此前写死 `extends E` 的正则因此完全失配（一度提取出 0 个类）；工具单例类（camera/coord/tools/editHelper/infoTree/settings/settingsPanel/misc/weather）的压缩变量名恰好未变（`$a`/`ab`/`gb`/`bb`/`cb`/`eb`/`fb`/`db`/`hb`），无需调整。改用不写死基类字母、动态探测的正则后，重新提取出同样的 **70 个命名空间**，方法数普遍比旧版略多（如 `settings` 92 个 vs 旧版 88 个、`weather` 35 个 vs 33 个），增量与上一轮同步的新方法数量吻合。

**三项交叉确认结果**：

1. **13 个新方法 + 1 处签名简化**：`Satellite.add` 在新源码里确认为 `add(a,b){...}`（仅两个参数），与文档记录的 `add(data, fn)` 一致；其余 12 个新方法（TileLayer 5 个、Settings 4 个、Weather 2 个、GeoJSONLayer/Polyline 各 1 个）全部在新契约里找到。
2. **`updateHole`/`updateModifier`/`updateRecord` 悬案了结**：三者在新版 `ac.min.js` 里依然存在，与此前"文档生成工具遗漏而非真实移除"的判断一致，确认无需从文档中删除。
3. **6 处参数级新增的验证方法论说明**：`order`/`blendMode`/`depthTest` 在新源码中能找到但不在目标方法体的局部窗口内（分布在别处的颜色/格式转换辅助函数附近）；`Tools.startContourLineAnalysis` 新增的 5 个高度标注参数（isShowHeightLabel 等）在整个文件里都搜不到字面量。逐一检查该方法的实现后发现原因：`startContourLineAnalysis(a,b){a.contourLineColor=y(a.contourLineColor);return this.int.call(a,b)}`——**这类"参数包"方法只对个别需要格式转换的字段（如颜色）做处理，其余属性原样透传给底层引擎**，JS 层因此不会出现这些字段名的字面量，属于架构上的正常现象，不构成"查无实据"。这类参数应以 jsdoc（工程侧手写文档）为准，而非要求在压缩 JS 里能搜到字面量。

**全站两套扫描（方法定义扫描 + 调用点扫描）在新契约下重新跑了一遍，均为 0 处问题**，确认此前基于旧版 SDK 做的全部修复在新版 SDK 上依然成立，未引入新的不一致。

## 方法论

`dts-sdk.d.ts` 由 `gen_dts.py` 从 `docs/api/*.md` 逆向生成，本质是"文档的影子"——文档若有臆造 API，d.ts 会原样继承，用它做核实基准等于自证清白，查不出真问题。此前 hydro 命名事故、faq.md 的坐标 API 事故都验证了这一点。

本轮改为解析 `ac.min.js` 本身：

1. **提取真实命名空间与方法**：全部 61 个继承公共基类 `E` 的对象类（通过 `class XX extends E{constructor(a){super(a,"Name"...)}` 定位类边界，做括号平衡解析取出方法体），加 9 个不继承 `E` 的单例工具类（camera/coord/tools/editHelper/infoTree/settings/settingsPanel/misc/weather，逐个定位 `class 变量名{...}` 解析），合计 **70 个命名空间、契约方法总数与文档一致**。
2. **提取真实别名**：源码里 `this.简写=this.全名` 形式的别名赋值，得到 29 个真实别名（如 `hdm→hydrodynamicModel`、`shp/shapeFile→shapeFileLayer`），排除了一个 SDK 自身死代码（`this.h1d=this.HydroDynamic1D`，右值从未被赋值，运行时恒为 `undefined`，不构成可用别名）。
3. **提取根级方法**：`DigitalTwinAPI` 类体量过大且解析脚本在其内部遇到字符串/正则边界解析失败（已知局限，见下），改用更保守的"定义模式存在性"逐一验证 15 个候选根方法，全部在源码中找到真实定义。
4. **交叉核对枚举**：顺带在源码尾部发现完整的全局导出映射表（`v.PolylineStyle={...}` 等 22 个枚举 + `v.DigitalTwinAPI=da` 等数据类导出），抽查 `PolylineStyle` 枚举值与 `types.md` 完全一致，佐证枚举类文档可信度高。

## 核查范围与结果

对 140 篇文档做了两套独立扫描，互相印证：

- **调用扫描**：逐行提取 `fdapi.NS.method(` / `api.NS.method(` 及根级 `fdapi.method(`，解别名后比对契约。
- **方法定义扫描**：对 70 篇 API 参考页提取全部 `### \`method(...)\`` 标题，比对页面自身"通过 `api.NS` 访问"声明的命名空间。

**方法定义扫描结果：0 处问题**——所有正式的方法参考章节（含参数表、返回值说明）与源码完全一致，核心 API 参考的可信度得到独立确认。

**调用扫描结果：5 处真实臆造/错用**，全部位于示例代码或补充说明区，而非正式方法定义区：

| 文件 | 问题 | 根因 |
|------|------|------|
| `docs/api/hydro/water-mesh.md` | 10 处 `fdapi.boxTrigger.xxx()` | 应为 `fdapi.waterMesh.xxx()`——此前只修了页首"访问"声明，正文 10 个方法示例代码块沿用了错误命名空间 |
| `docs/api/ocean/coastline.md` | `show`/`hide` 方法调用 | Coastline 真实只有 add/clear/delete/focus/get/update，无 show/hide；该"更多示例"整段系从别的类模板复制且写到一半截断（结尾缺右括号的代码块） |
| `docs/api/traffic/vehicle.md` | `fdapi.drone.callBatchFunction()`、`fdapi.drone.updateEnd()` | 应为 `fdapi.vehicle.xxx()`——vehicle.md 里两处示例误写成 drone |
| `docs/api/weather/misc.md` | 注释中的 `fdapi.misc.download(...)` | 真实方法名为 `downloadPakFiles`；该段是失效的注释掉的测试代码残留，且带一个悬空的孤立 `}` |
| `docs/tutorials/data-model.md` | `fdapi.camera.setFollow(...)` | Camera 真实只有 `cancelFollow`（取消跟随）；开始跟随是通过 `customObject.focus(id, -1)` 或指定 `ActionMode` 实现的，跟随发起权在对象侧不在相机侧——这是我自己在早前会话中写入的错误，本轮一并核实修正 |

## 意外发现：两起独立的"半截写入"损坏

修复 `coastline.md` 与 `misc.md` 时，Edit 工具的改动在同步到 Linux 侧后各自出现了尾部 NUL 字节填充（`misc.md` 首个 NUL 位于偏移 39174，`coastline.md` 位于 10867），触发了 `check_docs_integrity.py` 的检测。经与 Windows 侧真实内容比对确认：**内容本身无损失，纯粹是同步层的填充伪影**，直接按 NUL 边界截断重写后两文件均恢复正常（分别为 39174 字节 / 10865 字节，围栏配对、无 NUL）。`vehicle.md` 则是真实存在的历史遗留截断（文件结尾缺最后一个反引号，与项目 README 描述的"尾部空字节/字符截断"历史损坏模式一致），已补全。

## 已知局限

`ac.min.js` 中最大的两个类（`DigitalTwinAPI` 本体、公共基类 `E`）体量过大，脚本的引号/模板字面量跳过逻辑在解析到其内部某处（推测是包含转义字符的正则字面量）时失去同步，导致括号计数无法收敛。对此采用了保守替代方案（逐个候选名做"定义模式存在性"验证，而非整体解析方法列表），已验证的 15 个根方法和 `updateBegin`/`updateEnd`（确认继承自基类 `E`，已为全部 61 个 CRUD 派生命名空间补齐）结果可信，但基类 `E` 和 `DigitalTwinAPI` 若还有其他未被文档引用、因而未被本轮核查触达的方法，本报告不做覆盖性保证。

## 验证

`npm run gen` 全量跑通：70 命名空间 / 1242 方法、134 篇文档收录进 llms.txt、投影 1014/1014、球面 638/642 示例覆盖、完整性检查通过（140 文件，UTF-8/无NUL/前言/代码块/链接均完整）、全站断链 0。

## 第二独立源复核（2026-07-15）：原始 jsdoc HTML 文档

上一轮以 `ac.min.js`（编译产物）为契约来源；本轮换一个完全独立的真值源交叉验证——`参考资料/API原始参考文档/doc/doc/` 下 118 个原始 jsdoc HTML 页面（`Camera.html`、`Marker.html` 等，每类一页，是 `docs/api/*.md` 最初迁移的源头，结构规整：`<h4 class="name" id="方法名">`），解析出 75 个类共计的真实方法集合，与 `ac.min.js` 来源的契约互为印证。

**方法定义结构比对**：80 篇 API 文档按 `title` 精确匹配上对应的原始 HTML 页（另 3 篇——`QueryOption.md` 纯数据类、`error-codes.md`/`types.md` 为本工程新增的汇总页——不对应单一原始类页，正常不参与比对），逐一核对每篇文档的 `### 方法(...)` 标题集合，**0 处不符**——正式方法定义与迁移源完全一致。

**调用点交叉扫描**：另对全站 `fdapi.对象.方法(` 调用点做了一轮独立扫描，初筛出 11 处"原始文档里找不到"的调用（`hydrodynamic2d.add`、`heatmap.add`、`heatmap3d.add`/`addVoxels`、`settings.setGlobalIllumination`、`tileLayer.stopHighlightActor`/`stopHighlightActors`）。逐一回到 `ac.min.js` 精确核实（此前一轮的类体定位逻辑修正后重新验证），**全部 11 处均在当前 SDK 源码里真实存在**——原始 jsdoc 快照是旧版本 SDK 的文档，这些方法是后续版本新增的能力，`docs/api/*.md` 记录的是新增之后的现状，并非臆造；`revision-history.md` 里 `tileLayer.stopHighlightActor` 那条改动记录本身就在描述这次新增，两处互相印证。抽样核对方法总数量级也与预期一致（如 `Settings` 原始文档 79 个方法，当前 SDK 88 个，差值即新增部分）。

**结论**：两个完全独立的真值源（原始 jsdoc 文档 + 当前编译源码）交叉验证，均未发现新的臆造方法；此前已修复的 5 处问题（water-mesh/coastline/vehicle/misc/data-model）保持修复状态，之后新增或调整的内容（数据接入系列文档、SKILL.md 两条全局规则）也未引入新的臆造 API。
