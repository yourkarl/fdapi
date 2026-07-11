---
title: 开放三维格式接入（3D Tiles / 3DGS）
sidebar_label: 开放三维格式
description: "接入 Cesium 3D Tiles 瓦片服务与 3D 高斯泼溅（.ply）实景重建成果，以及与 3dt 底座的选型对照。"
---

# 开放三维格式接入（3D Tiles / 3DGS）

除自研 3dt 外，DTS 支持两类开放格式的三维成果直接接入：OGC 社区标准 **Cesium 3D Tiles** 与实景重建的 **3D 高斯泼溅（3DGS）**。已有 Cesium 技术栈资产或第三方瓦片服务的团队无需转换即可复用。

## Cesium 3D Tiles 服务

通过 [`cesium3DTileset`](/docs/api/layer/cesium3dtileset) 以服务 URL 流式加载：

```js
fdapi.cesium3DTileset.add({
  id: 'city_3dtiles',
  url: 'https://<tiles-host>/city/tileset.json',
  offset: [0, 0, 0],      // 位置偏移调校，见坐标配准指南
});
```

要点：服务需保证前端可达并配置 CORS；大范围数据的位置偏差用 `offset` 调校（方法论见[坐标系与数据配准](/docs/tutorials/data-georeference)）；是否参与场景光照可按数据类型控制——倾斜摄影类纹理已烘焙光照，通常关闭以免二次打光发灰。

## 3D 高斯泼溅（3DGS）

无人机/手机环拍经 3DGS 重建的照片级实景，以 `.ply` 文件接入 [`gaussianSplatting`](/docs/api/model/gaussian-splatting)：

```js
fdapi.gaussianSplatting.add({
  id: 'plant_gs',
  filePath: '@path:/ply/plant.ply',
  splatScale: 1.0,          // 高斯点影响范围
});
```

3DGS 适合"局部高保真"：单体厂房、站房、文物建筑等重点对象用 3DGS 呈现照片级细节，大范围底座仍用 3dt/3D Tiles 承载。

## 三种三维底座的选型对照

| 维度 | 3dt（tileLayer） | Cesium 3D Tiles | 3DGS（.ply） |
|------|-----------------|-----------------|--------------|
| 数据来源 | DTS 工具链生产 | 任意 3D Tiles 生产工具/现有服务 | 3DGS 重建工具 |
| 承载方式 | 文件（@path 上传） | URL 服务流式 | 文件（@path 上传） |
| 构件单体化/属性查询 | ✔ 完整（getActorInfoFromDB） | 取决于数据本身 | ✗ 纯视觉 |
| 剖切 / X 光 | ✔ | ✗ | ✗ |
| 适用定位 | 主底座，BIM/倾斜摄影深度交互 | 复用既有开放格式资产 | 重点对象照片级呈现 |

**决策建议**：需要构件级交互（点选、属性、剖切）→ 3dt；已有 3D Tiles 服务或需与 Cesium 生态互通 → cesium3DTileset；追求单点照片级实景 → 3DGS。三者可在同一场景混合使用，注意统一配准。
