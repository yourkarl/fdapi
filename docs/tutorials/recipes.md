---
title: 实战配方
sidebar_label: 实战配方
description: "把多个 API 串成真实业务场景的端到端配方：应急指挥大屏、点击拾取与高亮联动、一键汇报巡游，每个配方都是可直接改用的完整代码。"
---

# 实战配方

单个 API 文档讲的是"一个方法怎么用"，本页讲的是"**一个真实场景怎么搭**"——把初始化、图层、标注、相机、事件等串成完整流程。每个配方都是一段可直接复制、改改坐标和路径就能跑的代码。建议先读 [架构概览](/docs/tutorials/architecture) 再看这里。

> 下列代码中的坐标、`id`、资源路径均为占位示例，请替换为你自己工程的真实值；坐标系（投影 / 经纬度）以你的场景为准。

---

## 配方一：应急指挥大屏

**场景**：大屏打开后自动加载场景图层 → 在重点部位打上告警标注 → 相机飞入到总览视角 → 点击告警点时联动定位并弹窗。这是指挥调度、园区监控类大屏最典型的开局。

```js
// 1) 创建播放器与 API 入口，并在 onReady 后再调用接口
const player = new DigitalTwinPlayer('127.0.0.1:8080', {
  domId: 'player',
  apiOptions: {
    onReady: () => initScene(),   // 工程加载完成后才能安全调用 API
    onEvent: onEvent,             // 统一的场景事件回调
  },
});
const fdapi = player.getAPI();

// 2) 场景就绪：加载图层 + 打告警点 + 相机飞入
async function initScene() {
  // 2.1 加载 3DT 场景图层
  fdapi.tileLayer.delete('scene');
  await fdapi.tileLayer.add({
    id: 'scene',
    fileName: HostConfig.Path + '/assets/3dt/terrain.3dt',
    location: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1],
  });

  // 2.2 批量添加告警标注（同一 groupId 便于整体管理）
  const alarms = [
    { id: 'alarm-1', coordinate: [492548.0, 2491828.5, 132.7], text: '管廊温度告警' },
    { id: 'alarm-2', coordinate: [492035.3, 2488806.7, 60.0],  text: '泵站液位告警' },
  ];
  fdapi.marker.clear();
  await fdapi.marker.add(alarms.map((a) => ({
    id: a.id,
    groupId: 'alarms',
    coordinate: a.coordinate,
    coordinateType: 0,                 // 0=投影坐标系，1=经纬度
    imageSize: [40, 40],
    imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
    text: a.text,
    fontSize: 22,
    fontColor: Color.White,
    range: [1, 1000000],
  })));

  // 2.3 相机飞入到总览视角（x, y, z, pitch, yaw, flyTime 秒）
  fdapi.camera.set(492543.9, 2492194.1, 1800, -45, -44, 1.5);
}

// 3) 点击告警点时联动：定位 + 打印（可在此弹出业务面板）
function onEvent(event) {
  if (event.eventtype !== 'LeftMouseButtonClick') return;
  const id = event.Id || event.ID;
  if (typeof id === 'string' && id.startsWith('alarm-')) {
    fdapi.marker.focus(id, 300, 0.5);          // 飞到该告警点
    log('点击告警点：' + id + ' @ ' + event.MouseClickPoint);
    // 这里可调用你自己的前端逻辑，如打开右侧告警详情面板
  }
}
```

**用到的能力**：[DigitalTwinPlayer](/docs/api/quickstart/digital-twin-player) · [DigitalTwinAPI](/docs/api/quickstart/digital-twin-api) · [TileLayer](/docs/api/layer/tile-layer) · [Marker](/docs/api/marker/marker) · [Camera](/docs/api/camera/camera) · [事件系统](/docs/tutorials/event)

---

## 配方二：点击拾取建筑并高亮联动

**场景**：在 BIM / 倾斜摄影场景里，用户点击某个构件 → 高亮该构件（X 光透视）并飞过去，常用于设备查询、构件定位。

```js
fdapi.setEventCallback(async (event) => {
  if (event.eventtype !== 'LeftMouseButtonClick') return;

  const objectId = event.ObjectID;   // 被点击的 Actor / 构件 ID
  if (!objectId) return;

  // 高亮被点击构件（X 光透视 + 颜色），并飞到它
  await fdapi.infoTree.enableXRay([objectId], Color.Orange);
  fdapi.infoTree.focus(objectId);

  log('拾取构件：' + objectId);
});
```

> 提示：若要"先清除上一次高亮再高亮新构件"，可在每次点击时先对上一个 `objectId` 调用对应的关闭/取消高亮接口（见 [InfoTree](/docs/api/layer/info-tree) 的 `disableXRay` 等方法），再高亮新目标。

**用到的能力**：[事件系统](/docs/tutorials/event)（`ObjectID` 拾取）· [InfoTree](/docs/api/layer/info-tree)（`enableXRay` / `focus`）

---

## 配方三：一键汇报巡游

**场景**：汇报演示时一键播放预设的相机导览路线，自动巡游各重点区域，播放结束后回调做收尾（如恢复 UI、提示完成）。

```js
// 监听导览结束事件
fdapi.setEventCallback((event) => {
  if (event.eventtype === 'CameraTourFinished') {
    log('巡游播放结束');
    // 这里可恢复操作按钮、弹出"汇报完成"提示等
  }
});

// 播放 ID 为 '1' 的导览路线
fdapi.cameraTour.play('1');
```

> 导览路线（关键帧）的创建与管理见 [CameraTour](/docs/api/camera/camera-tour) 及 [CameraTourData](/docs/api/camera/camera-tour-data) / [CameraTourKeyFrame](/docs/api/camera/camera-tour-key-frame)。

**用到的能力**：[CameraTour](/docs/api/camera/camera-tour) · [事件系统](/docs/tutorials/event)（`CameraTourFinished`）

---

## 配方四：接入第三方地理编码 / POI 检索与路径规划

**场景**：fdapi 负责三维场景的渲染与交互，但**不提供地址检索、周边设施查询、路径规划**这类地图服务能力——这部分需要接入高德、腾讯地图等第三方开放平台，再把返回的地理坐标喂给 fdapi 渲染。本配方给出标准接入范式：地址/地点检索 → 渲染标注；起终点 → 路径规划 → 绘制路线。

> 安全提醒：第三方地图开放平台的 Key 通常要求签名或限制来源域名，**不建议在浏览器端直接暴露 Key 发起请求**；生产环境应由你的业务后端代理转发地理编码/路径规划请求，前端只拿到坐标结果。下面为了聚焦 fdapi 侧的处理，示例直接在前端发起请求，实际项目请替换为你的后端代理地址。

### 4.1 地址/地点检索 → 渲染为标注

以高德地图 Web 服务 API 的地理编码/POI 搜索为例（腾讯地图等同理，返回字段名不同，具体以对应平台当前文档为准）。**关键点**：`marker.add`/`polyline.add` 等对象的 `coordinateType` 参数本身就支持 `2`（火星坐标系 GCJ02）与 `3`（百度坐标系 BD09），第三方检索结果的坐标可以**直接传入，无需手写纠偏算法**：

```js
// 1) 调用第三方地理编码/POI检索服务（实际项目请替换为你的后端代理地址）
async function searchPOI(keyword, city) {
  const url = `https://your-backend.example.com/api/geo/search?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();
  // 约定后端代理统一返回：[{ name, lng, lat }, ...]（经纬度为高德的 GCJ02 坐标）
  return data.pois || [];
}

// 2) 直接以 coordinateType: 2（GCJ02）渲染，无需预先转换坐标
// marker.add 的 data 参数本身支持传对象数组做一次性批量新增，不需要 updateBegin/updateEnd
// （那两个方法是给"循环调用 setXXX/update 修改属性"场景批量合并用的，不是给 add 用的）
async function renderPOIs(pois) {
  await fdapi.marker.add(pois.map((poi) => ({
    id: 'poi_' + poi.name,
    coordinate: [poi.lng, poi.lat, 0],
    coordinateType: 2,   // 0=投影 1=WGS84 2=GCJ02 3=BD09
    imagePath: '@path:/img/icons/poi.png',
    text: poi.name,
  })));
}

// 3) 串起来：检索 → 渲染 → 飞到第一个结果
const pois = await searchPOI('加油站', '北京市');
await renderPOIs(pois);
if (pois[0]) {
  // camera.lookAt 需要场景坐标（不支持 coordinateType），先用 Coord 转换一次
  const [x, y, z] = await fdapi.coord.gcs2pcs([pois[0].lng, pois[0].lat, 0], 2);
  fdapi.camera.lookAt(x, y, z, 500);
}
```

### 4.2 起终点 → 路径规划 → 绘制路线

```js
// 1) 调用第三方路径规划服务（同样建议走后端代理）
async function planRoute(originLngLat, destLngLat) {
  const url = `https://your-backend.example.com/api/geo/route?origin=${originLngLat.join(',')}&destination=${destLngLat.join(',')}`;
  const res = await fetch(url);
  const data = await res.json();
  // 约定后端代理统一返回：{ path: [[lng,lat], [lng,lat], ...] }（GCJ02，已按路网抽稀采样）
  return data.path || [];
}

// 2) 路径点同样以 coordinateType: 2 直接渲染为箭头样式折线
async function drawRoute(path) {
  await fdapi.polyline.delete(['route_001']);
  fdapi.polyline.add({
    id: 'route_001',
    coordinates: path.map(([lng, lat]) => [lng, lat, 0]),
    coordinateType: 2,          // GCJ02 坐标直接渲染
    color: [0, 1, 1, 1],
    thickness: 15,
    range: [1, 1000000],
    style: 0,                   // PolylineStyle.Arrow，见 /docs/api/types#polylinestyle
  });
}

const path = await planRoute([116.397, 39.908], [116.407, 39.918]);
await drawRoute(path);
```

**性能提示**：路径点、POI 点量大时优先用第三方服务的批量接口一次性拿全量结果，再把整个数组一次性传给 `add()` 提交（如上），避免逐点 `add` + `await` 造成的往返延迟叠加；`updateBegin`/`updateEnd` 是另一套机制，用于包裹**循环调用 `setXXX`/`update` 修改已有对象属性**的场景（见[业务动态数据接入](/docs/tutorials/data-dynamic)的 IoT 状态刷新例子），不用于批量新增。

**用到的能力**：[Marker](/docs/api/marker/marker)（`coordinateType` 直接接受 GCJ02/BD09）· [Polyline](/docs/api/vector/polyline) · [Coord](/docs/api/utils/coord)（`gcs2pcs`，`camera.lookAt` 等不支持 `coordinateType` 的接口需要的场景坐标由此转换）· [Camera](/docs/api/camera/camera)

---

## 通用组合技

- **批量操作要合并**：一次添加/修改大量对象时，用 `add(数组)` 或 `updateBegin()`…`updateEnd()` 合并，避免逐个往返拖慢性能（见 [核心概念](/docs/tutorials/architecture)）。
- **先 onReady 再调用**：所有初始化逻辑都放进 `onReady` 回调，工程未就绪时调 API 有崩溃风险。
- **异步不要混用**：同一函数体内回调 / `.then()` / `async-await` 三选一（见 [异步调用方式](/docs/tutorials/async-call)）。
- **坐标先对齐**：标注、图层、相机的坐标必须与场景坐标系一致（投影 / 经纬度），否则会偏移（见 [坐标系与坐标转换](/docs/tutorials/coordinates)）。
- **想先试跑**：所有片段都可在 [在线调试台](/sandbox) 里连真实场景调试。
