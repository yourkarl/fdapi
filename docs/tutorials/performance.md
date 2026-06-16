---
title: 性能最佳实践
sidebar_label: 性能最佳实践
description: "DTS Cloud 二次开发性能优化指南：批量更新、可视范围裁剪、对象生命周期与资源释放、渲染画质权衡、网络与大数据量场景，附自查清单。"
---

# 性能最佳实践

DTS 是**云渲染**平台：每次 `fdapi` 调用都要把命令经 WebSocket 发到云端、等执行后回传（见 [架构概览](/docs/tutorials/architecture)）。因此性能问题主要来自三处：**命令往返次数过多**、**同屏对象/数据量过大**、**资源只增不减**。下面按优先级给出优化手段。

## 一、批量操作，减少命令往返（最重要）

每次单独调用都是一次网络往返。**一次性提交比逐个提交快一个数量级。**

- **用数组批量 `add`**：一次 `add([...])` 添加上千个对象，而不是循环 `add` 单个。

```js
// ✅ 推荐：一次提交
await fdapi.marker.add(list.map((d) => ({ id: d.id, coordinate: d.xyz, text: d.name })));

// ❌ 避免：上千次往返
for (const d of list) await fdapi.marker.add({ id: d.id, coordinate: d.xyz });
```

- **批量改属性用 `updateBegin()` … `updateEnd()`**：把多次 `setXXX` 合并成一次提交。

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) fdapi.xxx.setColor(i, Color.Yellow);
fdapi.xxx.updateEnd();   // 一次性提交，异步
```

## 二、用可视范围裁剪，控制同屏数量

对象越多，渲染与交互越吃力。对支持的对象设置**可视范围 / 高度范围**，让远处或不相关的对象自动不渲染：

- `range`（可视距离 `[近, 远]`）、`viewHeightRange`（可见高度范围）等属性，可在数据量大时显著降低同屏负载。
- 标注类（Marker 等）还可用 `fixedSize`、文字动画开关（如 `useTextAnimation: false`）减少开销——文字展开动画在海量标注时影响明显。

## 三、对象生命周期与资源释放

云端场景里的对象**只增不减会持续占用资源**。遵循「创建 → 用完即清」：

- 不再需要的对象及时 `delete(ids)`；整批清空用 `clear()`。
- 切换业务场景/页面前，释放整个实例：`fdapi.destroy()`、`fdplayer.destroy()`。
- **及时停止进行中的操作**：相机跟随结束调用 `cancelFollow()`；动画/导览结束调用 `stopAnimation()` / `stop()`，避免后台持续计算与事件回调。

## 四、渲染画质按需权衡

画质越高越耗云端 GPU 与带宽。按设备和网络条件调节：

- `settings.setResolution(w, h)` 控制渲染分辨率；移动端/弱网适当降低。
- `settings.setAntiAliasing(...)`、各类后处理特效按需开启，大屏演示开、低配环境关。

## 五、网络与连接

云渲染体验高度依赖网络带宽与延迟：

- **避免高频小调用**（如每帧调一次 API）；能合并就合并（见第一节）。
- 所有初始化逻辑放进 `onReady` 回调后执行，且尽量批量化（见 [实战配方](/docs/tutorials/recipes)）。
- 异步调用别混用回调 / `.then()` / `await`（见 [异步调用方式](/docs/tutorials/async-call)），错误的串行等待会拖慢整体。

## 六、大数据量与数据准备

- **海量同类对象优先用专用对象**：如城市级交通用 `TrafficSimulation`（支持十万级车辆），不要用上万个独立 Vehicle。
- **模型 / 瓦片 / 3DT 在云端做好优化与 LOD**：数据本身的层级细化（LOD）比前端调参更能决定性能上限；倾斜摄影、BIM 入库时控制面数与纹理。

## 自查清单

- [ ] 批量场景是否用了 `add(数组)` 或 `updateBegin/updateEnd`，而非循环单调？
- [ ] 大量对象是否设置了 `range` / `viewHeightRange` 可视裁剪？
- [ ] 用完的对象是否 `delete` / `clear`？切场景是否 `destroy`？
- [ ] 跟随 / 动画 / 导览结束后是否 `cancelFollow` / `stopAnimation`？
- [ ] 弱网/移动端是否降低了分辨率与特效？
- [ ] 是否避免了每帧级别的高频 API 调用？
- [ ] 海量同类对象是否改用了专用仿真对象？
