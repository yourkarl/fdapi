---
title: 异步调用方式
sidebar_label: 异步调用
description: "Callback、Promise.then、async/await 三种异步调用方式详解"
---
# 异步调用方式


DigitalTwinAPI 的大部分接口是异步的，调用后需要等待服务端响应才能拿到结果。SDK 同时支持以下三种方式，**在同一个函数体内只能选择其中一种，不能混用**。

---

## 方式一：Callback 回调函数

最基础的方式，逻辑简单易理解。当链式调用较多时，嵌套层级增加，可读性下降。

```js
fdapi.tag.delete('tag1', function () {
  fdapi.camera.get(function (cam) {
    let o = new TagData('tag1');
    o.coordinate = [cam.x, cam.y, 25.4];
    o.imagePath = '@path:/img/tutorials/tag.png';
    o.imageSize = [28, 28];
    o.text = '北京银行';
    o.showLine = true;
    fdapi.tag.add(o, function () {
      fdapi.tag.focus(o.id, 500, 0.2, function () {
        log('Test Finished.');
      }); // focus
    }); // add
  }); // get
}); // delete
```

---

## 方式二：Promise then 链

通过 `.then()` 解决回调嵌套，可读性优于回调方式。

```js
fdapi.tag.delete('tag1')
  .then(() => fdapi.camera.get())
  .then((cam) => {
    let o = new TagData('tag1');
    o.coordinate = [cam.x, cam.y, 25.4];
    o.imagePath = '@path:/img/tutorials/tag.png';
    o.imageSize = [28, 28];
    o.text = '北京银行';
    o.showLine = true;
    return fdapi.tag.add(o);
  })
  .then(() => fdapi.tag.focus('tag1', 500, 0.2))
  .then(() => {
    log('Test Finished.');
  });
```

---

## 方式三：async/await（推荐）

`async/await` 是 then 链的语法糖，可读性最高，推荐在新代码中使用。

```js
async function example() {
  await fdapi.tag.delete('tag1');

  const cam = await fdapi.camera.get();

  let o = new TagData('tag1');
  o.coordinate = [cam.x, cam.y, 25.4];
  o.imagePath = '@path:/img/tutorials/tag.png';
  o.imageSize = [28, 28];
  o.text = '北京银行';
  o.showLine = true;

  await fdapi.tag.add(o);
  await fdapi.tag.focus(o.id, 500, 0.2);

  log('Test Finished.');
}
```

---

## 不使用异步的后果

去掉异步等待后，多个请求会**并发发出**，服务端响应顺序不保证，后续操作可能拿到 `undefined`：

```js
// ❌ 错误示例：cam 是 Promise 对象，不是相机数据
fdapi.tag.delete('tag1');
const cam = fdapi.camera.get();  // 返回 Promise，不是结果
const o = new TagData('tag1');
o.coordinate = [cam.x, cam.y, 25.4];  // cam.x === undefined！
```

:::warning
异步接口的返回值是 `Promise`，不是直接结果。不加 `await` 或回调就取值，会得到 `undefined`。
:::

---

### 错误处理与失败语义

fdapi 的异步调用**业务失败时同样 resolve**，需检查响应对象的 `result` 字段（`0` 为成功）；只有未连接、非 Cloud 环境调用受限方法等少数情况会真正 reject；服务端无响应时 Promise 会永远挂起（SDK 无内建超时）。完整契约、调用结果码表、连接关闭码表与自带超时的包装写法，见[错误码与失败语义](/docs/api/error-codes)。
