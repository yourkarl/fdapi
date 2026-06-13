---
title: 颜色与 Color 对象
sidebar_label: 颜色系统
description: "DTS SDK 中颜色值的表示方式和使用方法"
---

### 关于颜色参数格式的说明

若需设置透明度时请使用数组类型参数。

目前支持以下四种格式：

```js
// 1. 常量颜色（使用 Color 内置常量）
var constColor = Color.Red;

// 2. RGB 字符串
var rgbColor = 'RGB(255, 255, 255)';

// 3. 十六进制字符串
var hexColor = '#FFFEEE';

// 4. 数组格式（支持透明度，值域 0~1）
// [R, G, B, A]  A=1 不透明，A=0 全透明
var colorArr = [0.5, 0.5, 0.5, 1];
var colorWithAlpha = [1, 0, 0, 0.5]; // 半透明红色
```

:::tip
需要设置透明度时，**必须使用数组格式**，其他格式不支持 Alpha 通道。
:::

#### Color 内置常量示例

```js
Color.Red       // 红
Color.Green     // 绿
Color.Blue      // 蓝
Color.White     // 白
Color.Black     // 黑
Color.Yellow    // 黄
Color.Cyan      // 青
Color.Magenta   // 品红
```

#### 与 API 配合使用

```js
// 设置多边形填充色（半透明蓝色）
fdapi.polygon.add({
  id: 'poly_001',
  coordinate: [...],
  fillColor: [0, 0.5, 1, 0.6],
  outlineColor: '#00AAFF',
});
```
