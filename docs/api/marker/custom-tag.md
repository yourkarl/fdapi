---
title: CustomTag
sidebar_label: CustomTag
description: "用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。"
---

# CustomTag

CustomTag已停止更新，推荐使用功能更丰富的标注对象Marker

:::caution 已废弃

用户自定义标签类 通过api.customTag调用其方法

:::

通过 `api.customTag` 访问。

---

## 业务场景 Skill

> 本节面向 AI 与业务人员，说明本对象在数字孪生业务中的定位与典型用法。

- **功能介绍**：用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。
- **别名 / 不同行业叫法**：自定义标签、HTML标牌、信息牌、网页标签、网页贴牌。
- **适用行业**：智慧城市、智慧园区、文博展陈、应急指挥、交通枢纽。
- **使用场景**：
  - 在建筑、设施上方挂接网页化信息卡，展示名称、地址、简介等内容
  - 点击标签弹出包含详情页、统计图表或监控视频的弹窗窗口
  - 园区/展馆点位的图文导览与交互式信息牌
- **注意事项**：
  - 本对象已废弃且停止更新，新项目应优先选用 Marker；
  - contentURL 的本地路径中不能含有空格，资源引入需遵循资源说明；
  - 网页标签依赖浏览器内核渲染，数量过多会影响性能，建议结合 range 控制显示范围；
  - 坐标需与场景坐标系一致，注意 pivot 中心点与弹窗尺寸的合理设置。

## 方法（Methods）

### `add(data, fn)`

添加一个或多个CustomTag对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | CustomTag类的对象或者数组，对于每一个CustomTag，支持以下属性： |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> **`data` 对象属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 字符串类型的ID |
| `groupId` | `string` | 可选，Group分组 |
| `userData` | `string` | 可选，用户自定义数据 |
| `coordinate` | `array` | 坐标值，[取值示例](/docs/tutorials/coordinates) |
| `contentURL` | `string` | 网页URL（本地地址或者网络地址），注意：本地地址中不能有空格 |
| `contentSize` | `array` | 网页窗口尺寸： [width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |
| `popupURL` | `string` | 弹出窗口的网页地址，[资源引入说明](/docs/tutorials/resources) |
| `popupSize` | `array` | 弹出窗口的尺寸：[width, height]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |
| `pivot` | `array` | 中心点：[0.5,0.5]，数组元素类型：(number)，数组元素取值范围：[0~1] |
| `range` | `array` | 显示范围：[min, max]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |
| `autoHidePopupWindow` | `boolean` | 是否自动关闭弹出窗口，默认会自动关闭：true |
| `popupPos` | `array` | 弹窗位置: [x, y]，数组元素类型：(number)，数组元素取值范围：[任意正整数] |

```js
let o = {
            id: 'ct1',
            coordinate: [495113.71875, 2491218, 0.4],
            contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路',
            contentSize: [220, 52],
            popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',
            popupSize: [600, 480],
            pivot: [0.5, 0.5],
            range: [1, 5000],
            autoHidePopupWindow: true,
            popupPos: [100,200]
        }
        fdapi.customTag.add(o);
```

> 示例：Add

```js
//注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注
await fdapi.customTag.clear();
let o = {
    id: 'ct1',
    coordinate: [492618.0625, 2492039.25, 15],
    coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
    contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=北医三院&address=海淀区花园北路',// 网页URL
    contentSize: [220, 52],//网页窗口宽高 [width, height]
    popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',//弹窗地址url
    popupSize: [600, 480],//弹窗尺寸
    popupPos: [100, 200], //弹窗位置: [x, y]
    pivot: [0.5, 0.5],// 中心点
    range: [1, 5000],//显示范围：[min, max]
    autoHidePopupWindow: true//失去焦点后是否自动关闭弹出窗口
};
await fdapi.customTag.add(o);
fdapi.customTag.focus(o.id, 50, 0.2);
```

---

### `clear(fn)`

删除场景中所有的CustomTag

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Clear

```js
fdapi.customTag.clear();
```

---

### `delete(ids, fn)`

删除一个或多个CustomTag对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要删除的CustomTag对象的ID或者ID数组（可以删除一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Delete

```js
fdapi.customTag.delete('ct1');
```

---

### `focus(ids, distance, flyTime, rotation, fn)`

自动定位到合适的观察距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomTag对象的ID或者ID数组 |
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Focus

```js
fdapi.customTag.focus('ct1', 50, 0.1);
```

---

### `focusAll(distance, flyTime, rotation, fn)`

自动定位到能观察所有CustomTag对象的合适距离

| 参数 | 类型 | 说明 |
|------|------|------|
| `distance` | `number` | 可选参数，观察点距离目标点（被拍摄物体）的距离，取值范围：[0.01~任意正数]，如果设置为0或者不设置，系统自动计算 |
| `flyTime` | `number` | 可选参数，相机飞行的时间，取值范围：[0~任意正数]，单位：秒，默认值2秒 |
| `rotation` | `array` | 可选参数，相机旋转的欧拉角：[Pitch,Yaw,Roll]，数组元素类型：(number)，取值范围：Pitch[-90~90] Yaw[-180~180] Roll[0] |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customTag.focusAll(distance, flyTime, rotation);
```

---

### `get(ids, fn)`

根据ID获取CustomTag的详细信息

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | 要获取的CustomTag对象ID或者ID数组（可以获取一个或者多个） |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

```js
CustomTag的详细信息
{
            "id":	"ct1",
            "groupId":	"",
            "userData":	"",
            "coordinate":	[495113.718750, 2491218.000000, 0.400000],
            "contentURL":	"G:\\TEMP\\Explorer\\SDK\\JS/simple.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路",
            "popupURL":	"G:\\TEMP\\Explorer\\SDK\\JS/simple.html",
            "contentSize":	[220.000000, 52.000000],
            "popupSize":	[600.000000, 480.000000],
            "pivot":	[0.500000, 0.500000],
            "range":	[1.000000, 5000.000000],
            "autoHidePopupWindow":	1
        }
```

> 示例：Get

```js
fdapi.customTag.get('ct1');
```

---

### `hide(ids, fn)`

隐藏CustomTag

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomTag对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Hide

```js
fdapi.customTag.hide('ct1');
```

---

### `hideAll(fn)`

隐藏所有CustomTag

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：HideAll

```js
fdapi.customTag.hideAll();
```

---

### `setAutoHidePopupWindow(id, newVal, fn)`

设置是否自动关闭标签的弹出窗口

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 标签的唯一标识符ID |
| `newVal` | `boolean` | 是否自动关闭标签的弹出窗口 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customTag.setAutoHidePopupWindow(id, newVal);
```

---

### `show(ids, fn)`

显示CustomTag

| 参数 | 类型 | 说明 |
|------|------|------|
| `ids` | `string \| array` | CustomTag对象的ID或者ID数组 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Show

```js
fdapi.customTag.show('ct1');
```

---

### `showAll(fn)`

显示所有CustomTag

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：ShowAll

```js
fdapi.customTag.showAll();
```

---

### `update(data, fn)`

修改一个或多个CustomTag对象

| 参数 | 类型 | 说明 |
|------|------|------|
| `data` | `object \| array` | CustomTag类的对象或者数组，参考add方法 |
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例：Update

```js
let o = {
    id: 'ct1',
    coordinate: [492649.84375, 2492012, 14],
    contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=中关村医院&address=中关村南路12号',
    contentSize: [220, 52],
    popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',
    popupSize: [600, 480],
    pivot: [0.5, 0.5],
    range: [1, 5000]
};
await fdapi.customTag.update(o);
fdapi.customTag.focus(o.id, 50, 0.2);
```

---

### `updateBegin()`

用于批量多次修改对象的属性


在开始修改之前调用updateBegin，然后可以多次调用setXXX方法，最后调用updateEnd提交修改更新数据

注意：

updateBegin不是异步调用，不需要await，也没有回调函数参数

```js
fdapi.xxx.updateBegin();
for (let i = 0; i < 1000; i++) {
     fdapi.xxx.setColor(i, Color.Yellow);
} 
fdapi.xxx.updateEnd(function () {
     log('update finished!');
});
```

---

### `updateEnd(fn)`

用于批量多次修改对象的属性，与updateBegin配套使用

注意：

updateEnd是异步调用，可以用回调函数也可以await

| 参数 | 类型 | 说明 |
|------|------|------|
| `fn` | `function` | 可选的回调函数，请参考[二次开发：异步接口调用方式](/docs/tutorials/async-call) |

> 示例代码如下：

```js
await fdapi.customTag.updateEnd();
```
