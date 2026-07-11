---
title: 3dt 三维底座接入
sidebar_label: 3dt 底座接入
description: "以 3dt 格式接入倾斜摄影、BIM 与人工模型底座：资源上传、tileLayer 加载、构件单体化与属性查询、剖切与 X 光。"
---

# 3dt 三维底座接入

`.3dt` 是 DTS 的三维瓦片格式，倾斜摄影、BIM 与人工建模成果经平台工具链处理后以 3dt 交付，是投影场景最主要的底座载体。前端通过 [`tileLayer`](/docs/api/layer/tile-layer) 完成加载与全生命周期管理。

## 资产准备与上传

3dt 文件应上传至 CloudMaster 文件资源目录，用 `@path:` 协议引用（避免走外网 URL 加载超时）：

```
@path:/3dt/factory_main.3dt
```

私有数据可在生产时加密，加载时通过 `password` 参数解密。

## 加载与管理

```js
// 添加 3dt 图层
fdapi.tileLayer.add({
  id: 'factory',
  fileName: '@path:/3dt/factory_main.3dt',
  // password: '******',        // 加密 3dt 需提供
}, () => console.log('图层加载完成'));

// 切换同一图层的数据版本（如竣工模型替换施工模型）
fdapi.tileLayer.setFileName({ id: 'factory', fileName: '@path:/3dt/factory_asbuilt.3dt' });
```

图层的显隐、定位、删除等通用操作与其他对象一致（`show` / `hide` / `focus` / `delete`），完整方法见 [TileLayer API](/docs/api/layer/tile-layer)。场景内置图层（随工程发布的底座）则通过[图层树 infoTree](/docs/api/layer/info-tree) 统一管理。

## 单体化：从"一坨模型"到"可点击的构件"

3dt 支持构件级单体化，这是 BIM 类应用的核心能力：

- **拾取与高亮**：配合[事件系统](/docs/tutorials/event)获取点击构件，`highlightActor` 系列方法高亮；
- **属性查询**：`getActorInfoFromDB` 按构件 ID 查询几何与业务属性（如构件材质、专业、编码），是"点击构件弹出台账"类需求的标准路径；
- **业务联动**：以构件 ID 为主键，与业务系统的设备/资产编码建立映射表——建议在数据生产阶段就约定编码规范，避免前端做字符串猜测匹配。

## 剖切与透视

查看建筑内部结构、预埋管线时使用剖切与 X 光：

```js
// 体剖切：只显示剖切盒内的部分
fdapi.tileLayer.enableClip(...);

// X 光透视：外壳半透明，透出内部指定构件
fdapi.tileLayer.enableXRay(ids, color, fn);
```

参数细节见 [TileLayer API](/docs/api/layer/tile-layer) 对应方法。

## 实践要点

一，**分层切分**：将倾斜摄影、建筑 BIM、市政管线切分为多个 3dt 图层分别加载，按业务场景组合显隐，比单个巨型 3dt 灵活且省内存。二，**命名规范**：图层 `id` 建议带业务语义前缀（`bim_`、`tilt_`、`pipe_`），后续联动与排错都受益。三，**更新策略**：数据更新走 `setFileName` 切换而非删除重建，可保留图层上的业务状态。四，**性能预算**：单场景同时加载的 3dt 图层数量与总面数需实测评估，见[数据性能与体检清单](/docs/tutorials/data-checklist)。
