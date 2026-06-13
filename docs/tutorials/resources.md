---
title: 资源描述与引用
sidebar_label: 资源管理
description: "场景资源路径、素材引用规则与最佳实践"
---

### 关于引入外部资源文件的说明

API接口调用过程中需要引入外部资源，如弹窗url地址、图片、视频、三维模型等。

#### 外部资源分两类，如下：

```
@path://img/tutorials/demo1.png @path:/movies/demo.mov @path:/3dt/demo.3dt @path:/shapefile/demo.shp 注:@path:相当于CloudMaster里文件资源的根目录
```

