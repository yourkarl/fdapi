---
title: CameraTourKeyFrame
sidebar_label: CameraTourKeyFrame
description: "CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。"
---

# CameraTourKeyFrame

CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CameraTourKeyFrame 是相机导览（漫游）的单个关键帧，描述某一时刻相机的到达时间、位置坐标与可选朝向，是构成飞行路线动画的最小单元。
- **别名 / 不同行业叫法**：关键帧 / 漫游节点 / 路径点 / 飞行节点 / 机位帧。
- **适用行业**：展厅汇报、智慧城市、智慧园区、智慧交通、能源、应急指挥。
- **使用场景**：
  - 逐点设置巡游路线上的停留位置与视角，形成讲解动线。
  - 通过 time 控制各段飞行节奏，实现快进概览或慢速聚焦。
  - 不传朝向时由系统按相邻位置自动计算朝向，快速生成顺滑路径。
- **注意事项**：
  - 位置坐标须与工程坐标系一致，否则飞行轨迹偏移。
  - index 与 time 应在同一路线内有序递增，避免动画跳变。
  - rotation 为可选项；显式指定可获得更精准的视角控制。

## 构造函数

```js
new CameraTourKeyFrame(index, time, location, rotation)
```

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|:----:|--------|------|
| `index` | `number` | 是 | - | 索引 |
| `time` | `number` | 是 | - | 帧播放抵达时间，单位：秒 |
| `location` | `array` | 是 | - | 关键帧位置坐标：[X,Y,Z]，[取值示例](/docs/tutorials/coordinates)，数组元素类型：(float)，取值范围：[任意数值] |
| `rotation` | `array` | 否 | - | 可选参数，关键帧相 |