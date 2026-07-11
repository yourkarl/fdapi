---
title: 实例管理接口
sidebar_label: 实例管理接口
description: "DTS 管理服务（Cloud 管理服务）二次开发接口参考：登录鉴权、实例启停/解锁/参数、运行状态、端口/许可、工程与用户授权，支持 WebSocket 与 REST，附真实响应示例。"
---
# 实例管理接口


### Cloud 管理服务接口（实例管理）

Cloud 管理服务用于对云渲染服务端的**实例（Instance）进行二次开发管理**。两种调用方式：**WebSocket** 与 **REST**，收发数据均为 JSON。

> 配套交互式控制台见首页「实例管理」入口（`/instance-manager`），可直接填参数、用 WebSocket / REST 两种方式调用并查看响应。

---

### 调用约定

- 登录有效期内多次调用无需重复登录；过期需重新登录。**登录接口只能用 REST**。
- WebSocket 需先建立连接（`ws(s)://<服务地址>/manager`）再调用；通过 REST 获取运行状态只能取当前快照。
- REST 用 `GET` / `POST` / `PUT` / `DELETE`；`POST` / `PUT` 的 `Content-Type` 为 `application/json`，JSON 字符串放 Body。
- 鉴权信息 `authorization`：WebSocket 放在发送的 JSON 对象里；REST `GET` 放在请求头；REST `POST` / `PUT` 放请求头或 JSON 对象皆可。登录成功后服务器返回 `authorization`（会话令牌），后续调用需带上，默认有效期可在账号设置中调整。
- 返回对象普遍含 `result` 状态码（`0` = 成功，即 `ManageResult.OK`）与 `timestamp`。

> 下文响应示例取自真实服务（v7.1.0622），其中会话令牌、许可序列号、主机名已做脱敏。标注「写操作」的接口为避免影响运行中的实例**未在线执行**，其响应遵循统一的 `result` 状态码格式。

---

### 接口总览

| 模块 | 功能 | WebSocket 命令 | REST | 需登录 |
|------|------|----------------|------|:------:|
| 管理员 | [管理员登录](#login) | （仅 REST） | `POST /manage/login` | |
| 管理员 | [登录是否需要验证码](#captcha-required) | `-4` | `GET /manage/captcha/required` | |
| 管理员 | [检查登录有效性](#login-check) | `-3` | `GET /manage/login/check` | |
| 管理员 | [注销登录](#logout) | `-3` | `POST /manage/logout` | |
| 管理员 | [获取管理员设置](#account) | `-1` | `GET /manage/account` | √ |
| 管理员 | [修改账号设置](#account-change) | `-5` | `PUT /manage/account/change` | √ |
| 系统 | [获取端口信息](#port) | `0` | `GET /manage/port` | |
| 系统 | [获取当前运行状态](#status) | `1` | `GET /manage/status` | √ |
| 系统 | [踢出用户](#kick) | `2` | `POST /manage/kick` | √ |
| 系统 | [获取授权信息](#license) | `3` | `GET /manage/license` | √ |
| 系统 | [删除用户登录信息](#user-deletelogin) | `4` | `PUT /manage/user/deletelogin` | √ |
| 工程 | [添加工程](#project-add) | `10` | `POST /manage/project/add` | √ |
| 工程 | [删除工程](#project-del) | `11` | `DELETE /manage/project/del` | √ |
| 工程 | [获取工程列表](#project) | `12` | `GET /manage/project` | |
| 实例 | [获取实例列表](#instance) | `100` | `GET /manage/instance` | |
| 实例 | [获取实例详情](#instance-info) | `101` | `GET /manage/instance/info` | √ |
| 实例 | [获取一个空闲实例](#instance-free) | `102` | `GET /manage/instance/free` | |
| 实例 | [设置参数 / 启动实例](#instance-update) | `104` | `PUT /manage/instance/update` | √ |
| 实例 | [停止实例](#instance-stop) | `105` | `PUT /manage/instance/stop` | √ |
| 实例 | [解锁实例](#instance-unlock) | `106` | `PUT /manage/instance/unlock` | √ |
| 实例 | [停止节点全部实例](#instance-stop-node) | `1003` | `PUT /manage/instance/stop/node` | √ |
| 授权 | [添加用户授权](#ua-add) | `220` | `POST /manage/ua/add` | √ |
| 授权 | [删除用户授权](#ua-del) | `221` | `DELETE /manage/ua/del` | √ |
| 授权 | [获取用户授权列表](#ua) | `222` | `GET /manage/ua` | √ |

---

## 管理员

### 管理员登录 {#login}

```
POST /manage/login
```

| 参数 | 说明 |
|------|------|
| `username` | 用户名 |
| `password` | 密码 |
| `captcha` | 验证码（`captchaRequired` 为 `true` 时必填） |

**响应示例：**

```json
{
  "timestamp": 1782281798573,
  "result": 0,
  "authorization": "0a1b2c3d…（128 位十六进制会话令牌，后续调用需携带）"
}
```

### 登录是否需要验证码 {#captcha-required}

```
GET /manage/captcha/required
```

**响应示例：**

```json
{ "timestamp": "1782281798568", "result": 0, "loginRequired": true, "captchaRequired": false }
```

### 检查登录有效性 {#login-check}

```
GET /manage/login/check
```

**响应示例：** `checkResult` 为当前会话剩余有效期（分钟）。

```json
{ "timestamp": "1782281798586", "result": 0, "checkResult": "599.99" }
```

### 注销登录 {#logout}

```
POST /manage/logout
```

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 获取管理员设置 {#account}

```
GET /manage/account
```

**响应示例：** `period` 为登录有效期（分钟）。

```json
{ "timestamp": "1782281798619", "result": 0, "username": "admin", "period": 600, "captchaRequired": false }
```

### 修改账号设置 {#account-change}

```
PUT /manage/account/change
```

| 参数 | 说明 |
|------|------|
| `username` | 用户名 |
| `password` | 新密码（不改密码时不传） |
| `period` | 登录有效期（分钟，≥15） |
| `captchaRequired` | 登录是否需要验证码 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

---

## 系统

### 获取端口信息 {#port}

```
GET /manage/port
```

> 此接口不需要用户权限。

**响应示例：**

```json
{ "port": 8080, "requestIP": "127.0.0.1", "version": "7.1.0622.22291", "result": 0 }
```

### 获取当前运行状态 {#status}

```
GET /manage/status
```

**响应示例：** 含实例数量统计、实例数组 `instances` 与节点数组 `nodes`（已截取关键字段）。

```json
{
  "command": 1,
  "time": "2026-6-24 14:16:38",
  "version": 6,
  "count_instances": 1,
  "count_freeInstances": 1,
  "count_nodes": 1,
  "instances": [
    {
      "id": "1783787703294",
      "state": 3,
      "busyDuration": 0,
      "locked": true,
      "graphicsAdapter": -1,
      "nodeId": "N1783787703119",
      "nodeIP": "127.0.0.1",
      "platform": "windows",
      "gpu": "nv",
      "project": "…/SDK/assets/project/demo.acp",
      "resX": 1920, "resY": 1080,
      "adjustResolution": true,
      "currentResolution": "1920x1080",
      "limitOneClient": false,
      "websocketPort": 0,
      "videoMode": 3,
      "encodeMinQP": 18, "encodeMaxQP": 35,
      "maxBitrate": 100000000,
      "encodeRateControl": "CBR",
      "keyframeInterval": 300,
      "fps": 25,
      "startTime": 1782281721056,
      "connections": []
    }
  ],
  "nodes": [
    {
      "id": "N1783787703119",
      "ip": "127.0.0.1",
      "hostName": "render-node",
      "maxInstanceCount": 1,
      "server_address": "127.0.0.1",
      "server_port": 8080,
      "adapterList": [
        { "index": 1, "description": "NVIDIA GeForce RTX 3060 Laptop GPU", "supportInstanceCount": 1, "dedicatedVideoMemory": 6285164544, "outputs": [], "instanceList": [] }
      ],
      "projects": ["demo", "4549", "4326"],
      "runningInstances": ["1783787703294"],
      "isLocalNode": true,
      "logLevel": "debug",
      "instanceCountSet": 1,
      "instanceIds": ["1783787703294"]
    }
  ]
}
```

### 踢出用户 {#kick}

```
POST /manage/kick
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |
| `playerId` | 用户 ID；`-1` 或不传则踢出该实例所有客户端连接 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 获取授权信息 {#license}

```
GET /manage/license
```

**响应示例：** Windows / Linux 授权机制不同，字段会有差异。

```json
{
  "timestamp": "1782281798599",
  "result": 0,
  "license": {
    "OEM": true,
    "SupportMultiLanguage": true,
    "Type": 1,
    "FeatureCode": 63801,
    "Nodes": 2,
    "ExpirationDate": "2026-09-06 14:24:07",
    "Authorization": "UnKnown",
    "SerialNumber": "1XX-XXXXXXXXXX",
    "LeftDays": 74,
    "LicenseServer": "localhost",
    "SupportSpaceGroup": true
  }
}
```

### 删除用户登录信息 {#user-deletelogin}

```
PUT /manage/user/deletelogin
```

| 参数 | 说明 |
|------|------|
| `name` | 用户名 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

---

## 工程

### 添加工程 {#project-add}

```
POST /manage/project/add
```

| 参数 | 说明 |
|------|------|
| `path` | 工程完整路径（服务器上的路径） |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 删除工程 {#project-del}

```
DELETE /manage/project/del
```

| 参数 | 说明 |
|------|------|
| `id` / `name` | 数字按工程 ID 处理，否则按工程名称 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 获取工程列表 {#project}

```
GET /manage/project
```

**响应示例：**

```json
{
  "timestamp": "1782281798607",
  "projects": [
    { "id": 1, "name": "demo", "path": "…/SDK/assets/project/demo.acp" },
    { "id": 2, "name": "4549", "path": "D:/4549影像/4549.acp" },
    { "id": 3, "name": "4326", "path": "D:/acp/4326.acp" }
  ]
}
```

---

## 实例

### 获取实例列表 {#instance}

```
GET /manage/instance
```

| 参数 | 说明 |
|------|------|
| `details` | `true` 返回实例完整信息（含工程导览 `tours`），否则仅返回实例 ID |
| `connections` | `true` 返回连接信息（需同时 `details: true`） |

**响应示例：** `instances` 元素结构同 [获取实例详情](#instance-info) 的 `instance` 对象。

```json
{
  "timestamp": "1782281798611",
  "instances": [
    { "id": "1783787703294", "state": 3, "locked": true, "nodeId": "N1783787703119", "platform": "windows", "project": "…/demo.acp", "currentResolution": "1920x1080", "fps": 25, "connections": [] }
  ]
}
```

### 获取实例详情 {#instance-info}

```
GET /manage/instance/info
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID；为空返回 `InvalidParameters`，不存在返回 `InstanceNotFound` |

**响应示例：**

```json
{
  "timestamp": "1782281842638",
  "instance": {
    "id": "1783787703294",
    "state": 3,
    "busyDuration": 0,
    "locked": true,
    "graphicsAdapter": -1,
    "nodeId": "N1783787703119",
    "nodeIP": "127.0.0.1",
    "platform": "windows",
    "gpu": "nv",
    "project": "…/SDK/assets/project/demo.acp",
    "resX": 1920, "resY": 1080,
    "adjustResolution": true,
    "limitMaxResolution": false,
    "currentResolution": "1920x1080",
    "limitOneClient": false,
    "websocketPort": 0,
    "videoMode": 3,
    "encodeMinQP": 18, "encodeMaxQP": 35,
    "maxBitrate": 100000000,
    "encodeRateControl": "CBR",
    "multipass": "Disabled",
    "keyframeInterval": 300,
    "fps": 25,
    "videoPlayer": 0,
    "enableFillerData": false,
    "timesOfConnected": 0,
    "startTime": 1782281721056,
    "connections": []
  }
}
```

### 获取一个空闲实例 {#instance-free}

```
GET /manage/instance/free
```

**响应示例：** 返回空闲实例 ID；无空闲时 `result` 为 `NoFreeInstance`。

```json
{ "timestamp": "1782281798625", "id": "1783787703294", "result": 0 }
```

### 设置参数 / 启动实例 {#instance-update}

```
PUT /manage/instance/update
```

请求体（节选）：

```json
{
  "quiet": true,
  "async": false,
  "startup": true,
  "staticInstance": {
    "id": "1783787703294",
    "adjustResolution": true,
    "limitOneClient": true,
    "locked": true,
    "pauseWhenIdle": false,
    "websocketPort": 4321
  }
}
```

| 参数 | 说明 |
|------|------|
| `startup` / `restart` | 启动 / 重启实例 |
| `quiet` | 不显示实例窗口 |
| `async` | `true` 立即返回，否则等待启动结果 |
| `staticInstance.locked` | 锁定工程（锁定后只能用指定工程，且会自动启动） |
| `staticInstance.project` / `projectId` | acp 全路径/工程名，或工程 ID |
| `staticInstance.websocketPort` | WebSocket 端口，0 表示不开启 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 停止实例 {#instance-stop}

```
PUT /manage/instance/stop
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 解锁实例 {#instance-unlock}

```
PUT /manage/instance/unlock
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 停止节点全部实例 {#instance-stop-node}

```
PUT /manage/instance/stop/node
```

| 参数 | 说明 |
|------|------|
| `id` | 节点 ID |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

---

## 用户授权

### 添加用户授权 {#ua-add}

```
POST /manage/ua/add
```

| 参数 | 说明 |
|------|------|
| `uid` | 用户唯一标识 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 删除用户授权 {#ua-del}

```
DELETE /manage/ua/del
```

| 参数 | 说明 |
|------|------|
| `uid` | 用户唯一标识；`---ALL---` 清空所有授权 |

**响应示例：**（写操作，未在线执行）

```json
{ "timestamp": "…", "result": 0 }
```

### 获取用户授权列表 {#ua}

```
GET /manage/ua
```

**响应示例：**

```json
{ "timestamp": "1782281798614", "result": 0, "list": [] }
```
