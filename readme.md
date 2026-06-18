# DTS SDK API 文档系统

基于 Docusaurus 3 的数字孪生 SDK 二次开发文档站，含 API 文档（100 篇）、教程（18 篇）和在线调试台。

## 快速开始

```bash
npm install        # 安装依赖
npm run start      # 本地开发（热更新）
npm run build      # 生产构建 → build/
npm run serve      # 预览构建产物
```

## 在线调试台（/sandbox）

真实连接云渲染服务调试 fdapi。**使用前需将 SDK 安装目录
（如 `%AppData%/DTS Cloud/7.1/SDK/`）下的 `ac.min.js` 与 `ac_conf.js`
复制到本工程 `static/` 目录**，缺失时页面会给出红色提示。

功能：真实示例导航（投影 1014 个 + 球面 638 个）、执行JS/执行JSON日志回放、fdapi 智能补全、
代码自动保存与分享链接、日志面板（折叠/自动清屏）、视频流画面。
支持 URL 参数：`iid`、`pid`、`password`、`reset`、`apilog` 等（同旧版 main.html）。

## 内容生成管线

文档与调试台数据由脚本生成。所有生成脚本均采用**原子写入**（临时文件 + rename，见
`gen_utils.py` / `gen_utils.js`），任何时刻文件要么是旧的完整内容、要么是新的完整内容，
不会因写入中断产生「写了一半」的损坏文件。管线分两层：

### `npm run gen` —— 日常增量（安全，不改动文档正文）

从现有文档重新生成派生产物，末尾自动执行完整性检查：

| 脚本 | 输入 | 输出 |
|------|------|------|
| `gen_dts.py` | `docs/api/*.md` | `static/dts-sdk.d.ts`（TS 类型声明）+ `src/data/api-completions.js`（编辑器补全） |
| `gen_param_meta.py` | `docs/api/*.md` 参数表 | `src/data/param-meta.js`（调试台参数面板；`gen_param_meta.js` 为无 Python 环境时的等价 Node 版） |
| `gen_real_examples.py` | `参考资料/.../doc/scripts/` 的 `page_content.js` + `api_examples(.ellipsoid).js`（权威示例源） | `src/data/real-examples.js`（投影 + 球面两套示例导航） |
| `check_docs_integrity.py` | `docs/**/*.md` 及上述生成物 | 校验 UTF-8 / 无 NUL 空字节 / front matter YAML，失败则非零退出 |

> 单独跑检查：`npm run check`（等同 `python3 check_docs_integrity.py`）。
>
> **`sidebars.js` 为手工维护**，不再由脚本生成：它含两个侧边栏（`tutorialsSidebar` 开发教程 + `tutorialSidebar` API 文档）、若干跨分类重复挂载的条目及类型参考页 `api/types`，这些是 `nav_data.json` 无法表达的人工编排。新增/调整文档时直接编辑 `sidebars.js`。（旧脚本 `gen_sidebar.py` 仅生成 API 侧边栏且会丢失上述编排，已从管线移除。）

### `docs/api/` 为手工维护源（重要）

`docs/api/*.md` **不再由脚本生成，是手工维护的源文件**。除从原始 jsdoc HTML 抽取的基础内容外，它们还累积了大量人工 / 一次性脚本增强，且这些增强**无法由现有脚本完整复现**：

- 「业务场景 Skill」段落、参数表「类型列」的类型页链接
- 「方法列表」表格与方法锚点（`### 方法() {#id}`）
- `description`、正文开场白的优化与内部腔清理

> ⚠️ **请勿运行 `regenerate_docs.py`（及 `gen_types.js` / `insert_skills.js` / `linkify_types.js`）。** 它们会覆盖 `docs/api/*.md`、抹掉上述全部增强且无法自动还原。这套"从原始 HTML 全量重建"的脚本已**封存**——不再挂在任何 npm 命令中，仅当确需从零重建、且明确接受会丢失人工增强时，由维护者手动谨慎执行。

新增 / 修改 API 文档时，**直接编辑 `docs/api/` 下的 markdown**；改完按需运行 `npm run gen` 刷新派生数据（TS 类型声明 / 编辑器补全 / 调试台示例库）。

> CI（`.github/workflows/build.yml`）在构建前会运行 `check_docs_integrity.py`，
> 拦截「写了一半」的损坏文件（历史上曾出现尾部空字节、汉字被截断、front matter 引号未转义）。

## 目录说明

- `docs/api/` 按 19 个分类组织的 API 文档；`docs/tutorials/` 教程
- `src/pages/sandbox.js` 在线调试台；`src/theme/CodeBlock/` 文档代码块「在调试台运行」按钮
- `src/components/AIChat.js` 调试台 AI 助手（多 AI 提供商：Claude / ChatGPT / DeepSeek / 通义千问，浏览器直连，API Key 存浏览器本地）
- `参考资料/` 旧版原始文档与样例（迁移源，勿删）

## 部署前待办

- [x] `docusaurus.config.js` 中 `url` / `baseUrl` / GitHub 链接（已配置为 `yourkarl.github.io` + `/fdapi/`）
- [ ] 将 `ac.min.js` / `ac_conf.js` 放入 `static/`（不入库，部署时拷贝）
