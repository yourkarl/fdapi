---
title: 框架集成指南
sidebar_label: 框架集成
description: "在 Vue 3、React 18 中集成 DTS SDK 的完整示例"
---

DTS SDK 是面向浏览器的 JS 库，可以在任何现代前端框架中使用。核心要点：

- **SDK 需要在 DOM 挂载完毕后初始化**（Vue: `onMounted`，React: `useEffect`）
- **组件卸载时必须销毁实例**，避免内存泄漏和重复连接
- **`fdapi` 全局变量在 `onReady` 后才可用**，不要在组件顶层直接使用

---

## Vue 3（Composition API）

```vue
<template>
  <div class="dts-wrapper">
    <div id="dts-container" style="width: 100%; height: 600px;" />
    <div v-if="status === 'connecting'" class="status-tip">连接中...</div>
    <div v-if="status === 'error'" class="status-tip error">连接失败</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const status = ref('connecting');
let apiInstance = null;

onMounted(() => {
  // SDK 通过 <script> 标签全局引入，window.DigitalTwinAPI 即可用
  apiInstance = new window.DigitalTwinAPI('127.0.0.1:8080', {
    domId: 'dts-container',
    onReady: () => {
      status.value = 'ready';
      initScene();
    },
    onError: (err) => {
      status.value = 'error';
      console.error('[DTS] 连接失败：', err);
    },
  });
});

onBeforeUnmount(() => {
  // 组件卸载时销毁 SDK，释放 WebSocket 和渲染资源
  apiInstance?.destroy?.();
  apiInstance = null;
});

function initScene() {
  // onReady 之后才能调用 fdapi
  fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0, () => {
    console.log('相机就位');
  });

  fdapi.marker.add({
    id: 'marker_vue_001',
    coordinate: [120.15, 30.27, 50],
    text: 'Vue 示例标注',
    imagePath: '@path:/img/icons/poi.svg',
  });
}
</script>
```

### 在 `index.html` 引入 SDK

```html
<!-- public/index.html 或 index.html -->
<head>
  <script src="/sdk/ac.min.js"></script>
</head>
```

### Vite 项目注意事项

Vite 的 TypeScript 类型检查不认识全局 `fdapi`，在 `src/env.d.ts` 中添加声明即可：

```ts
// src/env.d.ts
/// <reference path="../public/sdk/dts-sdk.d.ts" />
```

---

## React 18（Hooks）

```tsx
import { useEffect, useRef, useState } from 'react';

type Status = 'connecting' | 'ready' | 'error';

export default function DTSViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [status, setStatus] = useState<Status>('connecting');

  useEffect(() => {
    // 确保容器 DOM 已挂载
    if (!containerRef.current) return;

    // React 严格模式下 useEffect 会执行两次，用 flag 防止重复初始化
    let destroyed = false;

    apiRef.current = new (window as any).DigitalTwinAPI('127.0.0.1:8080', {
      domId: 'dts-container',
      onReady: () => {
        if (destroyed) return;
        setStatus('ready');
        initScene();
      },
      onError: (err: unknown) => {
        if (destroyed) return;
        setStatus('error');
        console.error('[DTS] 连接失败：', err);
      },
    });

    // 清理函数：组件卸载时销毁
    return () => {
      destroyed = true;
      apiRef.current?.destroy?.();
      apiRef.current = null;
    };
  }, []); // 空依赖：只在挂载时执行一次

  function initScene() {
    const fdapi = (window as any).fdapi;

    fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0);

    fdapi.marker.add({
      id: 'marker_react_001',
      coordinate: [120.15, 30.27, 50],
      text: 'React 示例标注',
      imagePath: '@path:/img/icons/poi.svg',
    });
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 600 }}>
      <div id="dts-container" ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {status === 'connecting' && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          连接中...
        </div>
      )}
      {status === 'error' && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'red', transform: 'translate(-50%,-50%)' }}>
          连接失败，请检查服务地址
        </div>
      )}
    </div>
  );
}
```

### Create React App / Vite + React

在 `public/index.html` 中引入 SDK：

```html
<script src="%PUBLIC_URL%/sdk/ac.min.js"></script>
```

---

## Angular

Angular 中通过 `ngOnInit` / `ngOnDestroy` 管理 SDK 生命周期：

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dts-viewer',
  template: `
    <div id="dts-container" style="width:100%;height:600px"></div>
  `,
})
export class DtsViewerComponent implements OnInit, OnDestroy {
  private api: any;

  ngOnInit(): void {
    this.api = new (window as any).DigitalTwinAPI('127.0.0.1:8080', {
      domId: 'dts-container',
      onReady: () => this.initScene(),
    });
  }

  ngOnDestroy(): void {
    this.api?.destroy?.();
  }

  private initScene(): void {
    const fdapi = (window as any).fdapi;
    fdapi.camera.lookAt(120.15, 30.27, 0, 1000, -45, 0, 2.0);
  }
}
```

在 `angular.json` 的 `scripts` 数组中添加 SDK 路径：

```json
"scripts": [
  "src/assets/sdk/ac.min.js"
]
```

---

## TypeScript 类型支持

三种框架均可使用 SDK 提供的类型声明文件获得 IDE 智能提示，详见 [TypeScript 类型支持](/docs/tutorials/typescript)。
