---
title: 资源描述与引用
sidebar_label: 资源管理
description: "场景资源路径、素材引用规则与最佳实践"
---
# 资源描述与引用


### 关于引入外部资源文件的说明

API 接口调用过程中需要引入外部资源，如弹窗 URL、图片、视频、三维模型等。

---

### 外部资源分两类

#### 1. 场景内置资源（`@path:` 协议）

`@path:` 相当于 CloudMaster 里文件资源的根目录。使用该协议可以引用已上传到 DTS 服务端的资源文件：

```
@path:/img/tutorials/demo1.png     → 图片
@path:/movies/demo.mov             → 视频
@path:/3dt/demo.3dt                → 3DT 场景数据
@path:/shapefile/demo.shp          → ShapeFile 文件
```

示例：

```js
// 添加一个使用服务端图片的标注
fdapi.marker.add({
  id: 'marker_001',
  coordinate: [120.15, 30.27, 0],
  imagePath: '@path:/img/icons/poi.png',
  text: '标注点',
});
```

#### 2. 外部网络资源（完整 URL）

直接使用 `http://` 或 `https://` 开头的完整 URL。适用于自行托管的静态资源：

```js
// 使用外部 CDN 图片
fdapi.marker.add({
  id: 'marker_002',
  coordinate: [120.16, 30.28, 0],
  imagePath: 'https://your-cdn.com/icons/building.svg',
  text: '外部资源',
});

// 弹窗使用外部 URL
fdapi.marker.add({
  id: 'marker_003',
  coordinate: [120.17, 30.29, 0],
  popupUrl: 'https://your-app.com/popup/detail?id=123',
});
```

---

### 注意事项

- `@path:` 资源需要先在 CloudMaster 的文件管理中上传。
- 外部 URL 资源须确保服务端已设置正确的 **CORS 跨域头**，否则浏览器会拦截请求。
- 三维模型（`.3dt`、`.glb`）文件较大，建议提前上传至服务端使用 `@path:` 引用，避免加载超时。
