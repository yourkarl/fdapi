---
title: 权限认证 SDK
sidebar_label: 权限认证
description: "SDK 权限认证机制与 Access Token 使用方式"
---

### SDK高级付费接口授权说明

需要单独授权的对象和所属授权模块如下表：

| HeatMap3D | 三维热力图 | 高级分析模块 |
|---|---|---|
| FloodFill | 水淹分析 | 高级分析模块 |
| Tools | 涉及分析工具对象下九个分析接口： 方法名称 | 方法描述 |
| startContourLineAnalysis(options, fn) | 开始等高线分析，适用于地形 |
| startCutFillAnalysis(options, fn) | 开始填挖方分析，适用于地形 |
| startFloodFill(options, fn) | 开始水淹分析 |
| startSkylineAnalysis(options, fn) exportSkyline(path, size, options, fn) | 开始天际线分析 导出天际线图片 |
| startSunshineAnalysis(options, fn) | 开始日照分析 |
| startTerrainSlopeAnalysis(options, fn) | 开始坡度坡向分析，适用于地形 |
| startViewDomeAnalysis(options, fn) | 开始开敞度分析 |
| startViewshedAnalysis(options, fn) | 开始视域分析 |
| startVisiblityAnalysis(options, fn) | 开始通视分析 |

