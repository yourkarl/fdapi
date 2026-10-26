# API 方法/参数设计审查报告（逐类）

> 范围：`docs/api/` 下 75 个类文档（排除纯枚举/纯数据结构文件）。审查角度不与此前的 [API文档工程隐患评审.md](./API文档工程隐患评审.md)（命名混乱/坐标系/错误码/返回结构等跨站问题）重复，聚焦**每个类内部**的方法与参数设计。
>
> 标注说明：**[已核实]** 条目均已用 grep/Read 直接核对源文件（部分核对了 `ac.min.js`）；其余条目来自分批审查、未逐条复核，标 **[待核实]**，建议动手前先确认。

## 一、已核实的高置信度问题

1. **GuideLine.setRange()** —— `docs/api/vector/guide-line.md` {#setRange}：方法签名写的是 `setRange(id, min, min, fn)`，参数表里也确实是两行都叫 `min`（一个描述"最小值"、一个描述"最大值"）。第二个 `min` 应改名为 `max`，签名同步改为 `setRange(id, min, max, fn)`。**严重度：高**（这不是措辞问题，是签名本身写错了参数名）。

2. **VectorField 的资源路径参数已过时** —— `docs/api/vector/vector-field.md`：文档只讲 `vetorFieldFilePath`（注意拼写少一个 c）和 `vectorFieldArray` 二选一。查 `ac.min.js` 发现真实情况是：SDK 现在推荐用 `binFilePath`，`add()` 内部逻辑是 `a.binFilePath && (a.vectorFieldFilePath = a.binFilePath, a.vetorFieldFilePath = a.binFilePath)`——也就是说 `binFilePath` 才是当前规范字段名，`vetorFieldFilePath`/`vectorFieldFilePath` 是仅为兼容保留的旧字段名，文档完全没提过 `binFilePath`。**严重度：高**（不是拼写问题，是文档漏掉了当前推荐用法，还在教旧写法）。

3. **MarkerLayer.add() 的 minPixel/minPiexl 不一致** —— `docs/api/layer/marker-layer.md`：参数表写 `minPixel`（第83行），示例代码却写成 `minPiexl`（第147行，缺一致性）。`ac.min.js` 里两种拼法都搜不到（`add()` 走的是通用透传，不代表字段不存在），但文档内部这两处必须统一，建议以参数表 `minPixel` 为准改掉示例。**严重度：中**。

4. **Marker3D.add() 的 `fixedSize` 必填/默认值自相矛盾** —— `docs/api/marker/marker3d.md` {#add}：参数表标"必填：是"，说明文字却写"默认：false 近大远小"——必填参数不该有默认值语义。**严重度：中**（与已修复的 tag.md coordinateType 是同一类问题，这里遗漏了）。

5. **Weather.setCloudThickness() 取值范围与自己的示例矛盾** —— `docs/api/weather/weather.md` {#setCloudThickness}：参数表写"取值范围：[0~0.5]"，但方法自己的示例、以及全文其余两处调用全部是 `setCloudThickness(2)`——2 明显超出 [0, 0.5]。同时 `getParams()` 返回示例里 `cloudThickness: 2.0` 并注释"取值范围：[0~20.0]"。三处证据（getParams 注释 + 3 个示例调用）一致指向真实范围应为 [0~20]，参数表的 [0~0.5] 是错的。**严重度：高**（范围写错，直接误导调用取值）。

6. **Weather.setMoonIntensity() 取值范围与 getParams() 不一致** —— 同文件 {#setMoonIntensity}：`setMoonIntensity()` 自己写"[0~1]"且示例 `setMoonIntensity(0.5)` 自洽，但 `getParams()` 返回示例注释成"moonIntensity: 30，取值范围:[0~100]"。这次是 `getParams()` 的注释像是错的（月光强度用 0~1 更符合 setter 的实际示例）。**严重度：中**（两处二选一必有一处错，需要连线确认后修正）。

7. **Polygon3D.disableClip()/enableClip() 的 `ids` 类型标注错误** —— `docs/api/vector/polygon3d.md` {#disableClip} {#enableClip}：类型写的是 `number | array`，但示例调用是 `disableClip(['p3d1', 'p3d2'])`（字符串 ID），且全站其余所有 `ids` 参数都是 `string | array`。**严重度：中**（类型标注明显抄错）。

## 二、分批审查发现（未逐条复核，按批次列出，标 [待核实]）

### hydro / analysis / battle / camera / fem（19 类）
- 多个水动力类（Fluid/HydrodynamicModel/HydrodynamicModel2/Hydrodynamic1D/SmoothedParticleHydrodynamics/WaterMesh）反复出现"必填：是 + 默认值：- + 说明里却写着默认值"的矛盾，集中在 `collision`、`updateTime`、`particle`、`normals`、`waterUVRepeat` 等参数上——建议按 tag.md 的修法逐个核实并改成"必填：否 + 补默认值"。
- `smoothed-particle-hydrodynamics.md` 的 `files` 参数说明写"二维数组"，示例代码是一维字符串数组，类型描述与示例不符。
- `hydrodynamic-model.md` 与 `hydrodynamic1d.md` 的同名参数 `collision` 必填规则互相矛盾（一个必填一个可选+默认false）。

### layer / marker / measure / model（19 类）
- `imagery-layer-2.md` 的 `alpha`、`imagery-layer.md` 的 `url`、`geo-json-layer.md` 的 `rotation`、`shape-file-layer.md` 的 4 个 `xxxHeightFieldName` 参数：均出现"必填：是"与说明"可选"直接矛盾。
- `da-hua-video-fusion.md` 的 `triggerType` 说明"四类触发类型"但只列了 3 种取值。
- `marker.md` 的 `showLine`/`clusterByImage`/`occlusionCull` 等参数也存在必填标注与示例值/说明矛盾（同 marker3d.md 的 fixedSize 是同一类问题，这两个标注类很可能是互相复制的模板）。
- `custom-tag.md` 的 `autoHidePopupWindow`/`popupPos` 同类矛盾。
- `marker.md` 的 `setAutoHidePopupWindow()` 参数说明疑似复制粘贴自 `showLine`（写成"是否显示垂直牵引线"）。

### ocean / overlay / quickstart / settings / signal（19 类）
- `heatmap3d.md` 的 `textureSize` 必填但说明含默认值 128。
- `settings-panel.md` 的 `setPostProcessMode()`：`contrast`/`saturation` 参数表范围写 [1~2]，示例代码却传 [0~100]，两处数值范围矛盾，需要确认哪个对。
- `antenna.md` 的 `grid.values` 说明里用示例代码的局部变量名"gain"来描述长度约束（"gain.length = 2\*3"），但参数表里根本没有名为 `gain` 的字段——不是编造字段，是说明文字引用了示例变量名，读者脱离示例看不懂，建议改成直接描述 `grid.values` 自身的长度约束。
- `digital-twin-api.md` 构造函数的 `options` 某个子属性标"必填：是"，但整体说明说"以下属性都是可选"——两处矛盾，建议确认后统一。

### traffic / utils / vector / weather（18 类）
- `odline.md` 的 `lineStyle` 参数说明文本中间夹了一个 `|` 竖线，疑似两段说明拼接时截断错位。
- `train.md` 的 `setFollow()` 参数 `sensitivity` 类型标 `number`，示例却传 `[0,0,0]`（数组），类型与示例不符。
- `spline-mesh.md` 的 `get()` 参数说明"SplineMesh对象的SplineMesh对象的ID"，文字重复（与 vehicle.md 那处是同一类复制粘贴痕迹，这是另一处）。

## 三、优先级建议

| 优先级 | 条目 |
|---|---|
| 立即修（签名错误/范围误导） | 1（GuideLine.setRange 参数名重复）、5（Weather.setCloudThickness 范围错误） |
| 高（文档漏教新写法） | 2（VectorField 缺 binFilePath 说明） |
| 中（内部矛盾，需核实后二选一改） | 3、4、6、7 及"二、"中列出的必填/默认值矛盾类问题 |
| 低（措辞/说明清晰度） | antenna.md 的 gain 措辞、odline.md 的竖线错位 |

第一部分（已核实 7 条）建议直接处理；第二部分建议按类逐个核实（其中"必填但说明有默认值"这个模式在水动力类和标注类里高频出现，很可能是同一批次批量撰写时的系统性遗留，值得一次性过一遍所有 `collision`/`fixedSize` 类布尔参数）。
