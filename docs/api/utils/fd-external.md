---
title: FdExternal
sidebar_label: FdExternal
description: "FdExternal 封装进程内 JS 与底层 C++ 的互操作，用于 Explorer WebUI、Marker 弹窗、JSTick 调试窗等 CEF 页面里直接调用底层能力。"
---

# FdExternal

FdExternal类封装了进程内JS与C++的互操作功能，用于以下几种场景：

- Explorer的WebUI页面里
- Marker的弹出窗口页面
- JSTick调试窗口页面 以上几种场景的共同点是都使用了cef显示html页面，在这些html页面里， 可以通过使用FdExternal类，直接调用底层C++功能，从而实现高性能、更直接的接口调用方式。

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：FdExternal 封装进程内 JS 与底层 C++ 的互操作，用于 Explorer WebUI、Marker 弹窗、JSTick 调试窗等 CEF 页面里直接调用底层能力。
- **别名 / 不同行业叫法**：内外互操作 / JS-C++ 桥接 / 外部接口 / 宿主交互（无明显行业别称）。
- **适用行业**：通用（二次开发的底层能力）
- **使用场景**：
  - 弹窗/嵌入页面回调底层接口
  - Explorer WebUI 与三维场景联动
  - JSTick 调试页与客户端通信
- **注意事项**：
  - 仅在 CEF 承载的特定页面语境下可用
  - 调用底层需注意时序与上下文
  - 属高级/底层用法，普通页面不可用


## 构造函数

```js
new FdExternal()
```

---

## 方法（Methods）

### `.close()`

用于关闭当前的窗口

运行环境：1、Marker弹出窗口页面；2、JSTick调试窗口页面

**返回：** 无返回值。

---

### `.execute(json)`

用于通过JSON的方式调用JS接口

运行环境：1、Explorer的WebUI页面里；2、Marker弹出窗口页面；3、JSTick调试窗口页面

注意事项：

此方法一般不需要用户直接调用，当在上面3种场景下初始化DigitalTwinAPI类时，不传host参数，

调用接口时，内部会自动以FdExternal.execute的方式进行高性能高效率的调用。

| 参数 | 类型 | 说明 |
|------|------|------|
| `json` | `string` | 要执行的JSON字符串 |

**返回：** 无返回值。

---

### `.getData(key)`

用于实现类似localStorage的功能

运行环境：Explorer的WebUI页面

注意：此方法是异步方法，返回值为promise，需要使用async/await同步

| 参数 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 键 |

**返回：** 返回指定键对应的值

---

### `.getViewportSize()`

之所以增加此功能是因为 当WebUI 在某种情况下已加在页面但是内部的WebWidget组件尚未显示（被隐藏）的情况下，

通过JS获取网页宽高会返回失败（window.screen.width, window.innerWidth等），为了解决这个问题，可调用此方法实现。

运行环境：Explorer的WebUI页面

注意：此方法是异步方法，返回值为promise，需要使用async/await同步

**返回：** 调用后会返回包含当前三维窗口宽高的数组。

---

### `.postEvent(msg)`

用于向主页面发送事件通知

运行环境：1、Marker弹出窗口页面；2、JSTick调试窗口页面

| 参数 | 类型 | 说明 |
|------|------|------|
| `msg` | `string` | 要发送的字符串 |

**返回：** 无返回值。

---

### `.setData(key, value)`

用于实现类似localStorage的功能

运行环境：Explorer的WebUI页面

| 参数 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 键 |
| `value` | `string` | 值 |

**返回：** 无返回值。

---

### `.valid()`

检查是否在指定的环境里调用，FdExternal可以在以下环境调用：

- Explorer的WebUI页面里
- Marker弹出窗口页面
- JSTick调试窗口页面

**返回：** 如果有效返回true，否则返回false
