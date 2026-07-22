# API 契约核实与臆造修复报告

> 2026-07-14 · 按评审意见「契约先行，反转生成方向」执行的全局核查：不再以 `static/dts-sdk.d.ts`（文档反推产物）为基准，而是直接解析 `static/ac.min.js`（SDK 源码本体）建立真实契约，再用契约反查全部文档。

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
