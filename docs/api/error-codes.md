---
slug: /api/error-codes
title: 错误码与失败语义
sidebar_label: 错误码与失败语义
description: "fdapi 的失败语义契约（何时 resolve 携带错误码、何时 reject、无响应行为）、调用结果码总表与 WebSocket 连接关闭码总表。依据 SDK v7.1 源码整理。"
---

# 错误码与失败语义

> 本页依据 SDK v7.1（`ac.min.js`）源码静态分析整理，是 fdapi 失败行为的权威参考。管理服务（/manage 系列）的错误码体系独立于本页，见[实例管理](/docs/tutorials/instance-management)。

## 失败语义契约

fdapi 的异步调用**不以 Promise reject 表达业务失败**，规则如下：

1. **业务失败也 resolve**。连接正常时，调用总会 resolve，携带响应对象；是否成功看响应中的 `result` 字段（`0` 为成功，非 0 见下方结果码表）。因此 `try/catch` 捕获不到业务失败，必须检查 `result`：

```js
const res = await fdapi.marker.add({ id: 'm1', coordinate: [x, y, z] });
if (res && res.result !== 0) {
  console.warn('调用失败，错误码：', res.result);
}
```

2. **只有三类情况会真正 reject**：未建立连接时发起调用（`Not connected!`）；仅限 Cloud 环境的方法在非 Cloud 环境调用；`tileLayer` 的 DB 属性查询辅助流程中参数非法或 `dbTabId` 获取失败。

3. **服务端无响应时 Promise 永远挂起**——SDK 调用路径没有超时机制（回调只注册 resolve，不设定时器）。实例重启、网络中断瞬间发出的调用既不会 resolve 也不会 reject。对可靠性敏感的业务代码建议自带超时包装：

```js
function withTimeout(promise, ms = 10000) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error('fdapi 调用超时 ' + ms + 'ms')), ms)),
  ]);
}
await withTimeout(fdapi.tileLayer.add({ id: 't1', fileName: '@path:/3dt/demo.3dt' }));
```

4. **连接断开不会通知未完成的调用**。断线经 WebSocket `onclose` 触发（关闭码见下表），此前挂起的 Promise 维持挂起。接入层应监听连接状态并重建场景，参考[业务动态数据接入](/docs/tutorials/data-dynamic)的接入层建议。

## 调用结果码（响应对象 `result` 字段）

| 码 | 名称 | 说明 |
|----|------|------|
| 0 | OK | 成功 |
| 1 | InvalidParameters | 参数无效 |
| 2 | InternalError | 内部错误 |
| 3 | ResourceNotFound | 资源不存在（如 ID 对应对象不存在） |
| 4 | AcpProjWKTNotSet | 工程未设置 WKT 坐标系 |
| 5 | CoordinateConversionFailed | 坐标转换失败 |
| 6 | IDExists | ID 已存在（重复 add） |
| 7 | InvalidRequestType | 请求类型无效 |
| 8 | InvalidRequestString | 请求串无效（JSON 格式问题） |
| 9 | NoCommand | 缺少命令字 |
| 10 | DataTypeNotSupport | 数据类型不支持 |
| 11 | InvalidOperation | 无效操作 |
| 12 | ProjectNotOpened | 工程未打开 |

## WebSocket 连接关闭码

连接被关闭时 `onclose` 事件的 `code`（4000 段为 DTS 自定义）：

| 码 | 名称 | 说明 |
|----|------|------|
| 4004 | connection_error | 连接错误 |
| 4005 | one_client_allowed | 实例限制单客户端，已被占用 |
| 4006 | timeout | 连接超时 |
| 4007 | iid_required | 缺少实例 ID |
| 4008 | locked | 实例已锁定 |
| 4009 | invalid_project | 工程无效 |
| 4010 | no_free_instance | 无空闲实例 |
| 4100 | kicked | 被管理端踢出 |
| 4101 | syncing_data | 数据同步中 |
| 4102 | instance_killed_by_user | 实例被用户终止 |
| 4103 | invalid_password | 实例密码错误 |
| 4105 | nodeservice_stopped | 节点服务已停止 |
| 4107 | instance_is_busy | 实例正忙 |
| 4108 | ip_no_access | IP 无访问权限 |
| 4109 | unknown_client | 未知客户端 |
| 4110 | num_of_instances_exceeded | 实例数超限 |
| 4111 | instance_not_auth | 实例未授权 |
| 4112 | permission_denied | 没有权限 |
| 4113 | instance_was_preempted | 实例被抢占 |
| 4114 | no_username_provided | 未提供用户名 |
| 4115 | user_does_not_exist | 用户不存在 |

## 运行时验证清单

本页结论来自源码静态分析。连接真实实例后，可在[调试台](/sandbox)花十分钟复核以下断言（欢迎把差异反馈给文档维护者）：

```js
// 1) 业务失败 resolve 而非 reject：重复 add 相同 id，预期 resolve 且 result 非 0（IDExists=6）
await fdapi.marker.add({ id: '__dup__', coordinate: [0, 0, 0] });
const r = await fdapi.marker.add({ id: '__dup__', coordinate: [0, 0, 0] });
console.log('重复add =>', r);

// 2) 不存在的 ID：预期 resolve，result=3（ResourceNotFound）或 data 为空（以实测为准）
console.log('查不存在ID =>', await fdapi.marker.get('__no_such_id__'));

// 3) 无超时验证（谨慎）：调用后立即重启实例，观察 Promise 是否永远挂起
```
