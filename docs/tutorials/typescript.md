---
title: TypeScript 类型支持
sidebar_label: TypeScript 类型支持
description: "在二次开发工程中使用 fdapi 的 TypeScript 类型声明，获得 IDE 智能提示与类型检查"
---

# TypeScript 类型支持

SDK 提供 `fdapi` 全部接口的 TypeScript 类型声明文件，覆盖 70+ 命名空间、1200+ 方法，包含每个方法的中文说明和参数类型。无论你的工程是 TypeScript 还是 JavaScript，引入后都能在 VS Code / WebStorm 中获得智能提示。

[下载 dts-sdk.d.ts](/dts-sdk.d.ts)

## 使用方式

### TypeScript 工程

将 `dts-sdk.d.ts` 放入工程目录（如 `src/types/`），确保它被 `tsconfig.json` 的 `include` 覆盖即可，无需 import：

```json
{
  "include": ["src/**/*"]
}
```

### JavaScript 工程

VS Code 对 JS 工程同样会读取 `.d.ts`。把文件放入工程后，在 `jsconfig.json`（没有就创建一个）中包含它：

```json
{
  "include": ["src/**/*", "types/dts-sdk.d.ts"]
}
```

或者在单个 JS 文件顶部添加引用注释：

```js
/// <reference path="./types/dts-sdk.d.ts" />

fdapi.camera.lookAt(/* 此处会有参数提示 */);
```

## 效果

- 输入 `fdapi.` 提示全部命名空间（camera、marker、weather、infoTree…）
- 输入 `fdapi.camera.` 提示该命名空间下所有方法，悬浮显示中文说明
- 方法参数有类型标注（string / number / array / object / function）

> 所有接口返回 `Promise<any>`，支持 `await` / `.then()` 调用，详见[异步接口调用方式](/docs/tutorials/async-call)。

## 在线调试台

[在线调试台](/sandbox)的代码编辑器已内置同一套补全数据：输入 `fdapi.` 或 `api.` 会自动弹出命名空间与方法提示，无需任何配置。

> 类型声明由文档自动生成（`gen_dts.py`），与文档内容保持同步。如发现类型与实际行为不符，以服务器实际返回为准。
