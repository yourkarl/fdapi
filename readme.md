# DTS SDK API 文档系统

基于 Docusaurus 3 的数字孪生 SDK 二次开发文档站，含 API 文档（103 篇）、教程（17 篇）和在线调试台。

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

| 脚本 | 输入 | 输出 |
|------|------|------|
| `regenerate_docs.py` | 原始 jsdoc HTML（默认 `参考资料/API原始参考文档/doc/doc`，可用 `--doc-dir` 或环境变量 `DTS_DOC_DIR` 指定）+ `api_examples.js` 真实示例；依赖 `pip install beautifulsoup4` | `docs/api/*.md` + `static/img/refdoc/` 图片 |
| `gen_sidebar.py` | `nav_data.json` | `sidebars.js` |
| `gen_real_examples.py` | `参考资料/.../doc/scripts/` 下的 `page_content.js` + `api_examples.js` + `api_examples_ellipsoid.js`（权威示例源） | `src/data/real-examples.js`（调试台示例导航，投影+球面两套） |
| `gen_dts.py` | `docs/api/*.md` | `static/dts-sdk.d.ts`（TS 类型声明）+ `src/data/api-completions.js`（编辑器补全） |

文档内容更新后一键执行：`npm run gen`（等同于依次运行四个脚本）。

## 目录说明

- `docs/api/` 按 19 个分类组织的 API 文档；`docs/tutorials/` 教程
- `src/pages/sandbox.js` 在线调试台；`src/theme/CodeBlock/` 文档代码块「在调试台运行」按钮
- `src/components/AIChat.js` 调试台 AI 助手（当前为关键词模板匹配，非真实 LLM）
- `参考资料/` 旧版原始文档与样例（迁移源，勿删）

## 部署前待办

- [ ] `docusaurus.config.js` 中 `url`（现为 dts.example.com 占位）
- [ ] 导航栏 GitHub 链接（现为 your-org 占位）
- [ ] 将 `ac.min.js` / `ac_conf.js` 放入 `static/`（不入库，部署时拷贝）
