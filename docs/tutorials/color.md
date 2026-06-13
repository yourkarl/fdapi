---
title: 颜色与 Color 对象
sidebar_label: 颜色系统
description: "DTS SDK 中颜色值的表示方式和使用方法"
---

### 关于颜色参数格式的说明

若需设置透明度时请使用数组类型参数，颜色值转换函数参考： 颜色值转换

#### 目前支持以下四种格式：

```js
//常量颜色 var constColor = Color.Red; //RGB颜色 var rgbColor = 'RGB(255,255,255)'; //16进制颜色 var hexColor = '#FFFEEE'; //数组颜色 支持透明度设置 var colorArr = [0.5,0.5,0.5,1];
```

