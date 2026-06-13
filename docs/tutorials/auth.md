---
title: 权限认证 SDK
sidebar_label: 权限认证
description: "SDK 权限认证机制与高级付费接口授权说明"
---

### SDK 高级付费接口授权说明

部分高级功能接口需要单独购买授权后才能使用。未授权时调用这些接口，方法会静默失败或返回错误回调。

---

### 需要授权的模块

#### 高级分析模块

| 类 / 接口 | 说明 |
|-----------|------|
| `HeatMap3D` | 三维热力图 |
| `FloodFill` | 水淹分析 |

#### 分析工具模块（`Tools` 对象下以下 9 个方法需授权）

| 方法名 | 描述 |
|--------|------|
| `startContourLineAnalysis(options, fn)` | 开始等高线分析，适用于地形 |
| `startCutFillAnalysis(options, fn)` | 开始填挖方分析，适用于地形 |
| `startFloodFill(options, fn)` | 开始水淹分析 |
| `startSkylineAnalysis(options, fn)` | 开始天际线分析 |
| `exportSkyline(path, size, options, fn)` | 导出天际线图片 |
| `startSunshineAnalysis(options, fn)` | 开始日照分析 |
| `startTerrainSlopeAnalysis(options, fn)` | 开始坡度坡向分析，适用于地形 |
| `startViewDomeAnalysis(options, fn)` | 开始开敞度分析 |
| `startViewshedAnalysis(options, fn)` | 开始视域分析 |
| `startVisiblityAnalysis(options, fn)` | 开始通视分析 |

---

### 授权流程

1. 联系 DTS 商务团队，购买对应模块的授权 License。
2. 将 License 文件放置到服务端指定目录（由实施工程师配置）。
3. 重启 DTS Cloud 服务，授权自动生效。
4. 客户端无需修改任何代码，授权后接口直接可用。

---

### 验证授权状态

```js
new DigitalTwinAPI('127.0.0.1:8080', {
  onReady: () => {
    // 尝试调用付费接口，通过回调判断是否已授权
    fdapi.tools.startViewshedAnalysis(
      { coordinate: [120.15, 30.27, 0], radius: 500 },
      (result) => {
        if (result.error) {
          console.warn('接口未授权或参数错误：', result.error);
        } else {
          console.log('视域分析已启动');
        }
      }
    );
  },
});
```
