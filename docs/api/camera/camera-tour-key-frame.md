---
title: CameraTourKeyFrame
sidebar_label: CameraTourKeyFrame
description: "相机导览关键帧"
---

# CameraTourKeyFrame

相机导览关键帧

## 构造函数

```js
new CameraTourKeyFrame(index, time, location, rotation)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | `number` | 索引 |
| `time` | `number` | 帧播放抵达时间，单位：秒 |
| `location` | `array` | 关键帧位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(float)，取值范围：[任意数值] |
| `rotation` | `array` | 可选参数，关键帧相机朝向坐标：[Pitch,Yaw,Roll]，数组元素类型：(float)，取值范围：[任意数值]，注意：不传入此参数则根据相机位置自动计算 |
