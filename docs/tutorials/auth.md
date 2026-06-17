---
title: 高级接口授权
sidebar_label: 高级接口授权
description: "DTS Cloud SDK 高级付费接口授权说明：需单独授权的对象与模块清单、授权流程与授权状态验证。"
---

### SDK 高级付费接口授权说明

部分高级功能接口需要**单独购买授权**后才能使用。未授权时调用这些接口，方法会静默失败或返回错误回调。

---

### 需要授权的对象与模块

下表列出需单独授权的对象及其所属授权模块：

| 对象 / 类 | 说明 | 授权模块 |
|-----------|------|---------|
| `HeatMap3D` | 三维热力图 | 高级分析模块 |
| `FloodFill` | 水淹分析 | 高级分析模块 |
| `Tools` | 分析工具（下列 9 个分析接口，详见下表） | 高级分析模块 |
| `Antenna` | 天线方向图 | 高级分析模块 |
| `SignalWave` | 信号波束 | 高级分析模块 |
| `FiniteElement2` | 有限元仿真 2 | 高级分析模块 |
| `WaterFlowField` | 水流场 | 水仿真模块 |
| `Fluid` | 三维水体仿真 | 水仿真模块 |
| `HydroDynamic1D` | 一维水动力模型 | 水仿真模块 |
| `HydroDynamic2D` | 二维水动力模型 | 水仿真模块 |
| `VectorField` | 向量场 | 海洋气象模块 |
| `Vehicle2` | 高级载具 | 交通仿真模块 |
| `Train` | 火车 | 交通仿真模块 |
| `TrafficSimulation` | 城市交通仿真 | 交通仿真模块 |
| `Drone` | 低空无人机 | 交通仿真模块 |
| `BattlefieldSimulation` | 战场仿真 | 军事仿真模块 |
| `Plot` | 态势标绘 | 军事仿真模块 |

#### `Tools` 对象下需授权的分析方法

| 方法名 | 说明 |
|--------|------|
| `startContourLineAnalysis(options, fn)` | 等高线分析（适用于地形） |
| `startCutFillAnalysis(options, fn)` | 填挖方分析（适用于地形） |
| `startFloodFill(options, fn)` | 水淹分析 |
| `startSkylineAnalysis(options, fn)` | 天际线分析 |
| `exportSkyline(path, size, options, fn)` | 导出天际线图片 |
| `startSunshineAnalysis(options, fn)` | 日照分析 |
| `startTerrainSlopeAnalysis(options, fn)` | 坡度坡向分析（适用于地形） |
| `startViewDomeAnalysis(options, fn)` | 开敞度分析 |
| `startViewshedAnalysis(options, fn)` | 视域分析 |
| `startVisiblityAnalysis(options, fn)` | 通视分析 |

---

### 授权流程

1. 联系 DTS 商务团队，购买对应模块的授权 License。
2. 将 License 文件放置到服务端指定目录（由实施工程师配置）。
3. 重启 DTS Cloud 服务，授权自动生效。
4. 客户端无需修改任何代码，授权后接口直接可用。

---

### 验证授权状态

未授权的接口通常会静默失败或在回调中返回错误，可借此判断授权状态：

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
