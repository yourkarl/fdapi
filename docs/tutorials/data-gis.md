---
title: GIS 矢量与影像服务接入
sidebar_label: GIS 矢量与影像
description: "GeoJSON、Shapefile 矢量数据与 WMTS/WMS/TMS/MVT 影像地形服务的接入方法，投影与球面场景的图层 API 选型。"
---

# GIS 矢量与影像服务接入

规划红线、行政区划、地块、路网等 GIS 数据，以及卫星影像、电子地图底图服务，是数字孪生一张图的标配图层。接入前先明确场景类型——**投影与球面场景可用的图层 API 不同**，这是本类数据最常见的踩坑点。

## 矢量文件：GeoJSON 与 Shapefile

**GeoJSON** 走 [`geoJSONLayer`](/docs/api/layer/geo-json-layer)，支持本地文件或 URL，点/线/面符号化渲染，面要素可用 Polygon3D 渲染器拉伸为体块（如地块控高展示）：

```js
fdapi.geoJSONLayer.add({
  id: 'landuse',
  url: '@path:/geojson/landuse.json',
  // 渲染器与样式配置见 API 文档
});
```

**Shapefile** 走 [`shapeFileLayer`](/docs/api/layer/shape-file-layer)，注意 `.shp` 需连同 `.dbf`、`.shx`、`.prj` 等同名附属文件一起上传到同一目录：

```js
fdapi.shapeFileLayer.add({
  id: 'boundary',
  url: '@path:/shapefile/district.shp',
});
```

两者选型：数据量小、Web 生态交换 → GeoJSON；国土/测绘部门交付、带投影定义 → Shapefile 直接挂。属性过多的原始数据建议预处理裁剪字段，降低加载与查询开销。

**轻量注记类**（少量区域/路径高亮）不必动用图层：直接用 [`polygon`](/docs/api/vector/polygon) / [`polyline`](/docs/api/vector/polyline) / [`polygon3d`](/docs/api/vector/polygon3d) 以坐标数组绘制，更可控。

## 影像与底图服务：按场景类型选 API

| 场景 | API | 支持服务 | 说明 |
|------|-----|---------|------|
| 投影（PCS） | [`imageryLayer`](/docs/api/layer/imagery-layer) | WMTS / WMS / MapServer | 标准切片方案，支持坐标系与切片参数配置 |
| 球面（GCS） | [`globeTerrain`](/docs/api/layer/globe-terrain) | 地形 + WMTS / WMS / MVT / TMS | 数字地球的地形与影像统一入口 |
| 球面（非标切片） | [`imageryLayer2`](/docs/api/layer/imagery-layer-2) | WMTS / WMS / MVT / TMS | 可自定义原点、瓦片尺寸、层级与 extent，适配各厂商私有切片规则 |

```js
// 投影场景叠加 WMTS 影像
fdapi.imageryLayer.add({
  id: 'satellite',
  url: 'https://<map-host>/wmts',
  // 切片方案/坐标系参数见 API 文档
});
```

## 服务接入检查单

- [ ] 服务 URL 在**用户浏览器侧**可达（云渲染出图，但部分服务由前端拉取——内网服务地址切勿写死公网文档示例）
- [ ] 服务端已配置 CORS 允许文档站/业务系统域名
- [ ] 切片方案（原点、分辨率级别、坐标系）与场景匹配；各厂商非标服务优先用 `imageryLayer2` 的自定义切片参数适配
- [ ] 互联网底图（GCJ-02 偏移）与测绘数据叠加时已做纠偏，见[坐标系与数据配准](/docs/tutorials/data-georeference)
- [ ] 多底图切换用图层显隐实现，避免反复 add/delete
