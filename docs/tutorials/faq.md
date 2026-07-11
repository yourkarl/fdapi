---
title: 常见问题 FAQ
sidebar_label: 常见问题
description: "DTS SDK 二次开发中最常见的问题与解决方案"
---
# 常见问题 FAQ


## 初始化 / 连接问题

### Q: `onReady` 回调一直不触发，页面空白

**原因排查：**

1. **IP 或端口填写错误** — 确认 DTS 服务已启动，且 `host` 地址和端口正确。
2. **`domId` 对应的元素不存在** — 检查 HTML 中是否有 `id` 与 `domId` 一致的容器元素，且在 `new DigitalTwinAPI(...)` 执行时 DOM 已渲染完毕。
3. **SDK 文件未加载** — 打开浏览器控制台，确认没有 `DigitalTwinAPI is not defined` 错误。检查 `<script src="...ac.min.js">` 路径是否正确。
4. **跨域被拦截** — 确认 DTS 服务端配置了 CORS 响应头，或页面与服务同域。

```js
// 正确写法：DOM 就绪后再初始化
window.onload = function () {
  new DigitalTwinAPI('127.0.0.1:8080', {
    domId: 'dts-container',  // 必须与 HTML 中的 id 一致
    onReady: () => {
      console.log('连接成功');
    },
    onError: (err) => {
      console.error('连接失败：', err);
    },
  });
};
```

---

### Q: 视频流画面一直显示加载中，没有画面

1. 确认 DTS 渲染实例已在后台正常运行。
2. 检查网络带宽，云渲染视频流需要稳定的 10Mbps 以上连接。
3. 在 Chrome 控制台 Network 面板查看 WebSocket 连接状态，是否有 `101 Switching Protocols`。
4. 部分企业网络会拦截 WebSocket，尝试切换到其他网络环境测试。

---

## API 调用问题

### Q: 调用 API 方法后没有效果，也没有报错

最常见原因：**在 `onReady` 之前调用了 API**。

```js
// ❌ 错误：onReady 之前调用，fdapi 对象还未初始化
new DigitalTwinAPI('127.0.0.1:8080', { domId: 'container', onReady: _onReady });
fdapi.camera.lookAt(120, 30, 0, 500, -45, 0);  // 此时 fdapi 未就绪！

// ✅ 正确：所有业务代码放在 onReady 内
new DigitalTwinAPI('127.0.0.1:8080', {
  domId: 'container',
  onReady: () => {
    fdapi.camera.lookAt(120, 30, 0, 500, -45, 0);
  },
});
```

---

### Q: 异步方法调用后想获取返回结果，怎么做？

有 `fn` 参数的方法支持回调，结果在回调里取：

```js
// ❌ 错误：同步方式取返回值（方法本身返回 undefined）
const result = fdapi.marker.add({ id: 'm1', coordinate: [120, 30, 0] });

// ✅ 正确：通过 fn 回调取结果
fdapi.marker.add({ id: 'm1', coordinate: [120, 30, 0] }, (result) => {
  console.log('Marker 创建结果：', result);
});
```

---

### Q: 添加 Marker / TileLayer 时报 ID 重复错误

SDK 中同一类对象的 `id` 必须全局唯一。如果需要更新已有对象，使用对应的 `update` 方法而非重复 `add`：

```js
// ❌ 错误：重复 add 同一 id
fdapi.marker.add({ id: 'poi_1', coordinate: [120, 30, 0] });
fdapi.marker.add({ id: 'poi_1', coordinate: [121, 31, 0] });  // 报错

// ✅ 正确：先 remove 再 add，或使用 update
fdapi.marker.update({ id: 'poi_1', coordinate: [121, 31, 0] });
```

---

## 坐标系问题

### Q: 传入经纬度坐标后，对象出现在错误位置或消失

当前场景可能使用**投影坐标系（PCS）**，直接传入经纬度会导致坐标错位。需要先转换：

```js
// 查询当前坐标系类型（'0'=投影坐标, '1'=地理坐标）
console.log('坐标系类型：', fdapi.coordType);

// 如果是 PCS，先将经纬度转换为投影坐标
const pcs = fdapi.coord.gcsToPcs([120.15, 30.27, 0]);
fdapi.marker.add({
  id: 'marker_001',
  coordinate: pcs,  // 使用转换后的坐标
});
```

---

### Q: 屏幕坐标和世界坐标如何互转？

```js
// 屏幕坐标 → 世界坐标（点击事件中常用）
fdapi.events.onClick((e) => {
  const worldPos = fdapi.coord.screenToWorld([e.x, e.y]);
  console.log('点击的世界坐标：', worldPos);
});

// 世界坐标 → 屏幕坐标（UI 标签定位常用）
const screenPos = fdapi.coord.worldToScreen([488000, 2890000, 10]);
```

---

## 性能问题

### Q: 添加大量 Marker 后页面卡顿

- **批量创建**：避免在循环中逐个 `add`，尽量一次性传入数组（部分 API 支持批量参数）。
- **及时销毁不用的对象**：调用 `fdapi.marker.remove(id)` 删除不再显示的标注。
- **使用 MarkerLayer 代替单个 Marker**：大量同类标注推荐用 `fdapi.markerLayer` 管理，性能更好。

### Q: 切换场景或页面时内存持续增长

离开页面前需要手动销毁 SDK 实例，否则 WebSocket 连接和渲染资源不会释放：

```js
// 在页面卸载时调用（Vue: beforeUnmount / React: useEffect cleanup）
window.addEventListener('beforeunload', () => {
  if (fdapi) {
    fdapi.destroy?.();
  }
});
```

---

## 其他

### Q: 在 Vue / React 中如何正确使用 SDK？

参见 [框架集成指南](/docs/tutorials/framework-integration)。

### Q: 文档里的示例代码在实际环境中不能直接运行？

示例代码中的坐标（如 `120.15, 30.27`）、IP（如 `127.0.0.1:8080`）、资源路径均为占位值，需替换为你实际项目中的数据。
