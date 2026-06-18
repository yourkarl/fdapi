---
title: DTS 空间智能 Skill 使用说明
slug: /skill-guide
description: "DTS 空间智能技能包（Skill）的安装与使用说明。"
---

# DTS 空间智能 Skill

一个面向 AI 助手的 **飞渡 DTS（Digital Twin System）Cloud** 二次开发知识库 Skill。它把云渲染数字孪生平台的 SDK 文档拆分到「类 / 方法 / 教程 / 类型」级别，让 AI 在你开发时按需查阅、给出准确的 `fdapi` 调用代码。

## 这个 Skill 能做什么

- 给出 DTS 云渲染场景的初始化模板（`DigitalTwinPlayer` + `fdapi`）
- 回答 `fdapi` 各类与方法的用法（相机、标注、矢量、图层、模型、水利/海洋、交通、信号、战场、有限元、天气、分析量算等）
- 提供常用代码模板（相机定位、添加标注、批量更新）
- 解释入门概念（异步调用、事件、坐标系、颜色、权限、TypeScript、框架集成）
- 查询全局枚举与类型（`Color`、`ActionMode`、各类 `Style` / `Mode`）

## 目录结构

```
dts-spatial-skill/
├── SKILL.md            # Skill 主入口：调用约定、初始化模板、查询路由、类/教程索引
├── README.md           # 本文件
├── api/                # API 参考，按业务分类拆分
│   ├── quickstart/     # DigitalTwinPlayer / DigitalTwinAPI 入口
│   ├── camera/         # 相机、相机巡游
│   ├── marker/         # Marker / Marker3D / CustomTag 标注
│   ├── vector/         # Polygon / Polyline / ODLine 等矢量
│   ├── layer/          # 瓦片、影像、GeoJSON、Shapefile 等图层
│   ├── model/          # CustomObject / 高斯泼溅等模型
│   ├── overlay/        # 热力图、高亮、贴花、灯光、视频投影等
│   ├── hydro/          # 水面、河流、洪水、水动力等水利
│   ├── ocean/          # 海岸线、海洋热力图
│   ├── traffic/        # 车辆、列车、无人机、卫星、交通仿真
│   ├── signal/         # 天线、光束、信号波
│   ├── battle/         # 战场仿真、军标标绘
│   ├── fem/            # 有限元分析
│   ├── analysis/       # 开挖分析、查询选项、工具
│   ├── measure/        # 量算标绘、编辑助手
│   ├── settings/       # 全局设置、设置面板
│   ├── weather/        # 天气环境
│   ├── utils/          # 坐标转换、外部交互
│   ├── events/         # onEvent 事件回调说明
│   └── types.md        # 全局枚举与类型
└── tutorials/          # 入门与概念教程（hello-world、event、coordinates、color…）
```

## 使用方式

### 在支持 Skill 的助手中
将本目录作为 Skill 提供给 AI。助手读取 `SKILL.md` 后，会按其中的「查询路由」自动定位到 `api/<分类>/<文件>.md`、`tutorials/<主题>.md` 或 `api/types.md`，再据此回答或生成代码。

典型对话：
- "帮我初始化一个 DTS 场景" → 给出初始化模板
- "Camera 有哪些方法 / 怎么飞入场景" → 读取 `api/camera/camera.md`
- "怎么加一个带弹窗的图标标注" → 读取 `api/marker/marker.md`
- "Color 枚举有哪些值" → 读取 `api/types.md`
- "坐标系怎么换算" → 读取 `tutorials/coordinates.md`

### 调用约定速记
- 入口：`const fdapi = player.getAPI();`，须在 `onReady` 之后调用
- 形式：`fdapi.<类名首字母小写>.<方法>(...)`，如 `fdapi.camera.lookAt(...)`
- 坐标：`coordinateType` → `0=投影 / 1=WGS84 / 2=GCJ02 / 3=BD09`
- 回调：优先箭头函数 `() => {...}`，否则传 `null`
- 批量增改：`updateBegin()` → `update(...)` → `updateEnd(cb)`

详见 `SKILL.md`。

## 维护说明

- 新增/调整 API 文档时，把 `.md` 放到对应 `api/<分类>/` 下，并在 `SKILL.md` 的「类索引」补一行（类名、用途、`fdapi` 访问器、文件路径）。
- 新增教程时，放入 `tutorials/`，并更新 `SKILL.md` 的「教程索引」。
- `SKILL.md` 中所有引用路径均应真实存在；改动后建议核对一遍路径有效性。
