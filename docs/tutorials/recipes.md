---
title: 实战配方
sidebar_label: 实战配方
description: "把多个 API 串成真实业务场景的端到端配方：应急指挥大屏、点击拾取与高亮联动、一键汇报巡游，每个配方都是可直接改用的完整代码。"
---

# 实战配方

单个 API 文档讲的是"一个方法怎么用"，本页讲的是"**一个真实场景怎么搭**"——把初始化、图层、标注、相机、事件等串成完整流程。每个配方都是一段可直接复制、改改坐标和路径就能跑的代码。建议先读 [核心概念与架构总览](/docs/tutorials/architecture) 再看这里。

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

## 通用组合技

- **批量操作要合并**：一次添加/修改大量对象时，用 `add(数组)` 或 `updateBegin()`…`updateEnd()` 合并，避免逐个往返拖慢性能（见 [核心概念](/docs/tutorials/architecture)）。
- **先 onReady 再调用**：所有初始化逻辑都放进 `onReady` 回调，工程未就绪时调 API 有崩溃风险。
- **异步不要混用**：同一函数体内回调 / `.then()` / `async-await` 三选一（见 [异步调用方式](/docs/tutorials/async-call)）。
- **坐标先对齐**：标注、图层、相机的坐标必须与场景坐标系一致（投影 / 经纬度），否则会偏移（见 [坐标系与坐标转换](/docs/tutorials/coordinates)）。
- **想先试跑**：所有片段都可在 [在线调试台](/sandbox) 里连真实场景调试。
