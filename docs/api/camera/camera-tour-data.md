---
title: CameraTourData
sidebar_label: CameraTourData
description: "CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。"
---

# CameraTourData

CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：CameraTourData 是相机导览（漫游）的数据描述对象，封装一条飞行路线的 ID、名称与关键帧数组，作为 CameraTour 播放的数据载体。
- **别名 / 不同行业叫法**：漫游数据 / 导览数据 / 巡游路线数据 / 飞行路线配置 / 关键帧动画数据。
- **适用行业**：展厅汇报、智慧城市、智慧园区、智慧交通、能源、应急指挥。
- **使用场景**：
  - 预先编排好一条城市/园区巡游路线并保存复用。
  - 为不同汇报主题维护多条命名漫游路线，按需切换播放。
  - 将外部规划的路径数据组装成关键帧数组生成漫游。
- **注意事项**：
  - ID 需唯一，避免与已有漫游冲突导致覆盖或播放异常。
  - keyFrames 内关键帧的 index 与 time 应递增有序，保证动画连贯。
  - 本对象仅为数据结构，需配合 CameraTour 的 add/play 才能生效。

## 构造函数

```js
new CameraTourData(id, name, keyFrames)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID 