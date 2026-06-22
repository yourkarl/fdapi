---
title: 实例管理
sidebar_label: 实例管理
description: "DTS Cloud 管理服务（Cloud 管理服务接口）二次开发说明：管理员登录、实例的启停/解锁/参数设置、端口与运行状态、工程与用户授权等接口，支持 WebSocket 与 REST 两种调用方式。"
---

### Cloud 管理服务接口（实例管理）

Cloud 管理服务用于对云渲染服务端的**实例（Instance）进行二次开发管理**——查询运行状态、动态启停实例、设置实例运行参数、管理工程与用户授权等。

管理服务有两种调用方式：**WebSocket** 与 **REST**，两种方式收发的数据格式都是 JSON。

---

### 调用约定

- 在登录有效期内，多次调用接口**无需重复登录**；超过有效期需要重新登录。
- **登录接口只能通过 REST 调用**，不能通过 WebSocket 调用。
- WebSocket 方式需要**先建立连接**，然后才能调用。
- 通过 REST 获取实时运行状态的接口，只能返回**当前**状态，无法像 WebSocket 那样持续推送。
- REST 使用 HTTP `GET` / `POST` / `PUT` / `DELETE`。`POST` / `PUT` 时 `Content-Type` 须设置为 `application/json`，要发送的 JSON 字符串放在 Body 里。

#### 验证信息（authorization）的放置

若设置了实例管理密码，需要随请求携带验证信息 `authorization`：

| 调用方式 | 验证信息放置位置 |
|----------|------------------|
| WebSocket | 直接放在要发送的 JSON 对象里 |
| REST `GET` | 放在 Request 的 headers 里 |
| REST `POST` / `PUT` | 放在 Request 的 headers 里，或放在要发送的 JSON 对象里皆可 |

> 📌 每个接口下方的 **🔧 在线测试** 链接会打开内置的接口测试台(基于原 `manager.html`),可直接填参数、发送请求并查看响应。测试台从云渲染服务读取配置,**需服务端开启跨域(CORS)或与服务同源访问**。

> 登录成功后服务器会返回 **TOKEN**，之后每次调用都需带上该 TOKEN。TOKEN 默认有效期 **24 小时**，过期后需重新登录获取新的 TOKEN。

---

### 接口总览

下表中「是否需要登录」一列标记 √ 的接口，在开启了实例管理密码时必须先登录。

| 模块 | 功能 | WebSocket 命令 | REST | 需登录 |
|------|------|----------------|------|:------:|
| 管理员 | 获取验证码图片 | （仅 REST） | `GET /manage/captcha` | |
| 管理员 | [管理员登录](#login) | （仅 REST） | `POST /manage/login` | |
| 管理员 | [登录是否需要验证码](#captcha-required) | `GetCaptchaRequired: -4` | `GET /manage/captcha/required` | |
| 管理员 | [检查登录有效性](#login-check) | `CheckLogin: -3` | `GET /manage/login/check` | |
| 管理员 | [管理员注销登录](#logout) | `Logout: -2` | `GET /manage/logout` | |
| 管理员 | [获取管理员设置](#account) | `GetAccount: -1` | `GET /manage/account` | √ |
| 管理员 | [修改账号设置](#account-change) | `ChangeAccount: -5` | `PUT /manage/account/change` | √ |
| 系统 | [获取端口号](#port) | `GetPorts: 0` | `GET /manage/port` | |
| 系统 | [获取当前运行状态](#status) | `GetStatus: 1` | `GET /manage/status` | √ |
| 系统 | [踢出用户](#kick) | `KickPlayer: 2` | `POST /manage/kick` | √ |
| 系统 | [获取授权信息](#license) | `GetLicenseInfo: 3` | `GET /manage/license` | √ |
| 系统 | [删除用户登录信息](#user-deletelogin) | `DeleteUserLogin: 4` | `PUT /manage/user/deletelogin` | √ |
| 工程 | [添加工程](#project-add) | `AddProject: 10` | `POST /manage/project/add` | √ |
| 工程 | [删除工程](#project-del) | `DeleteProject: 11` | `DELETE /manage/project/del` | √ |
| 工程 | [获取工程列表](#project) | `GetProjectList: 12` | `GET /manage/project` | |
| 实例 | [获取实例列表](#instance) | `GetInstanceList: 100` | `GET /manage/instance` | |
| 实例 | [获取实例详细信息](#instance-info) | `GetInstanceInformation: 101` | `GET /manage/instance/info` | √ |
| 实例 | [获取一个空闲的实例](#instance-free) | `GetOneFreeInstance: 102` | `GET /manage/instance/free` | |
| 实例 | [设置实例运行参数](#instance-update) | `SetInstanceParams: 104` | `PUT /manage/instance/update` | √ |
| 实例 | [停止实例](#instance-stop) | `StopInstance: 105` | `PUT /manage/instance/stop` | √ |
| 实例 | [解锁实例](#instance-unlock) | `UnlockInstance: 106` | `PUT /manage/instance/unlock` | √ |
| 实例 | [停止指定节点的所有实例](#instance-stop-node) | `StopAllInstance: 1003` | `PUT /manage/instance/stop/node` | √ |
| 授权 | [添加用户授权](#ua-add) | `AddUserAuth: 220` | `POST /manage/ua/add` | √ |
| 授权 | [删除用户授权](#ua-del) | `DeleteUserAuth: 221` | `DELETE /manage/ua/del` | √ |
| 授权 | [获取用户授权列表](#ua) | `GetUserAuthList: 222` | `GET /manage/ua` | √ |

---

## 管理员

### 管理员登录 {#login}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_login)

登录成功后服务器返回 TOKEN，之后每次调用接口都需带上该 TOKEN；TOKEN 有效期 24 小时，过期后需重新登录。**登录只能通过 REST 调用。**

```
POST /manage/login
```

| 参数 | 说明 |
|------|------|
| `username` | 用户名 |
| `password` | 密码 |
| `captcha` | 验证码（当「登录是否需要验证码」返回需要时必填） |

### 登录是否需要验证码 {#captcha-required}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_captcha_required)

用于检查管理员登录是否需要验证码。

```
GET /manage/captcha/required
```

### 检查登录有效性 {#login-check}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_login_check)

用于检查管理员是否已经登录。

```
GET /manage/login/check
```

### 管理员注销登录 {#logout}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_logout)

```
GET /manage/logout
```

### 获取管理员设置 {#account}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_account)

```
GET /manage/account
```

### 修改账号设置 {#account-change}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_change_account)

```
PUT /manage/account/change
```

| 参数 | 说明 |
|------|------|
| `username` | 用户名 |
| `password` | 密码（勾选「修改密码」时填写，并需确认密码一致） |
| 登录有效期 | 单位：分钟 |
| 验证码 | 是否「登录需要验证码」 |

---

## 系统

### 获取端口信息 {#port}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_port)

获取端口、版本信息、端口映射等。

```
GET /manage/port
```

> 此接口**不需要用户权限**。

### 获取当前运行状态 {#status}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_status)

获取服务器的实时运行状态。

```
GET /manage/status
```

### 踢出用户 {#kick}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_kick)

断开用户的连接。`playerId` 有两种获取方式：

1. 从实例接口的实时运行状态里获取，路径：`instances` → `connections` → `id`；
2. 从 `DigitalTwinPlayer` 类的属性 `playerId` 获得。

```
POST /manage/kick
```

```json
{ "id": "2491836508538", "playerId": -1 }
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |
| `playerId` | 用户 ID；设置为 `-1`（或不设置）则踢出该实例的**所有**客户端连接 |

### 获取授权信息 {#license}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_license)

获取服务器的授权信息。Windows 平台与 Linux 平台授权机制不同，返回的信息也不同。

```
GET /manage/license
```

### 删除用户登录信息 {#user-deletelogin}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_deleteuserlogin)

当修改用户名、密码或删除用户时，让用户登录失效（用户刷新页面将跳转到登录界面）。

```
PUT /manage/user/deletelogin
```

| 参数 | 说明 |
|------|------|
| `username` | 用户名 |

---

## 工程

### 添加工程 {#project-add}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_project_add)

在服务器工程列表里添加一项。

```
POST /manage/project/add
```

| 参数 | 说明 |
|------|------|
| 工程文件完整路径 | 注意：此路径是**服务器上**的路径 |

### 删除工程 {#project-del}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_project_del)

在服务器工程列表里删除指定项。

```
DELETE /manage/project/del
```

| 参数 | 说明 |
|------|------|
| 工程 ID 或名称 | 输入数字则按工程 ID 处理，否则按工程名称处理 |

### 获取工程列表 {#project}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_project_list)

获取服务器上已配置的工程列表。

```
GET /manage/project
```

---

## 实例

### 获取实例列表 {#instance}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_list)

获取服务器上当前配置的所有实例列表。

```
GET /manage/instance
```

```json
{ "details": true, "connections": true }
```

| 参数 | 说明 |
|------|------|
| `details` | 为 `true` 返回实例完整信息（包括所关联工程的导览列表 `tours` 字段），否则只返回实例 ID |
| `connections` | 为 `true` 返回此刻实例的连接信息；返回连接信息必须同时设置 `details: true` |

### 获取指定实例的详细信息 {#instance-info}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_info)

根据实例 ID 返回指定实例的详细信息。实例 ID 可在 CloudMaster 软件的实例管理页右键「复制实例 ID」获取。

```
GET /manage/instance/info
```

```json
{ "id": "2491836508538" }
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID；为空返回错误码 `4: InvalidParameters`，不存在返回错误码 `2: InstanceNotFound` |

> 若实例关联的工程是用 5.3.0908 之后的 Explorer 保存且包含导览，将一并返回导览列表（`tours` 字段）。

### 获取一个空闲的实例 {#instance-free}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_free)

获取一个正在运行或者尚未启动的空闲实例。

```
GET /manage/instance/free
```

返回值：当前没有空闲实例则返回错误码 `1: NoFreeInstance`；有则返回空闲实例的 ID。服务器查找优先级：

1. 已启动、没有连接、非正忙的实例；
2. 未启动的实例；
3. 正在启动的实例；
4. 不限制连接数的实例。

### 设置实例运行参数 {#instance-update}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_update)

给指定实例设置参数（详细错误代码参考 `ManageResult`）。

```
PUT /manage/instance/update
```

```json
{
  "quiet": true,
  "async": false,
  "startup": true,
  "staticInstance": {
    "id": "2491836508538",
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
| `id` | 实例 ID |
| 工程 | 工程在 CloudMaster 列表里时可输入 acp 全路径或工程名；不在列表里时必须为全路径；也可输入工程 ID（pid），此时实际设置实例的 `projectId` 属性 |
| `quiet` | 不显示实例窗口；不勾选则不设置该属性，前台/后台运行由 NodeService 决定 |
| `async` | 可选；`true` 立即返回，`false` 或不传则等待实例启动结果再返回 |
| `startup` | 是否启动实例；勾选锁定工程时可不设此项（锁定工程会自动启动） |
| `restart` | 设置后：实例未运行则等同 `startup` 启动；正在运行则重启实例 |
| `locked` | 锁定工程文件后该实例只能使用指定工程，客户端不能再通过 pid 动态切换 |
| `adjustResolution` | 自适应客户端分辨率 |
| `limitOneClient` | 限制一个实例只能有一个客户端连接 |
| `pauseWhenIdle` | 没有用户连接时暂停渲染 |
| `websocketPort` | WebSocket 端口；设置为 0 则不开启 WebSocket 调用方式 |

### 停止实例 {#instance-stop}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_stop)

根据实例 ID 停止指定实例的运行。

```
PUT /manage/instance/stop
```

```json
{ "id": "2491836508538" }
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |

### 解锁实例 {#instance-unlock}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_unlock)

根据实例 ID 解除锁定。

```
PUT /manage/instance/unlock
```

```json
{ "id": "2491836508538" }
```

| 参数 | 说明 |
|------|------|
| `id` | 实例 ID |

### 停止指定节点上运行的所有实例 {#instance-stop-node}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_inst_stop_node)

根据节点 ID 停止该节点上运行的所有实例。

```
PUT /manage/instance/stop/node
```

```json
{ "id": "N2491316493574" }
```

| 参数 | 说明 |
|------|------|
| `id` | 节点 ID |

---

## 授权

### 添加用户授权 {#ua-add}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_ua_add)

用户后台向服务器添加用户授权。

```
POST /manage/ua/add
```

| 参数 | 说明 |
|------|------|
| 用户唯一标识符 | 待授权用户的唯一标识 |

### 删除用户授权 {#ua-del}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_ua_del)

删除用户授权。

```
DELETE /manage/ua/del
```

| 参数 | 说明 |
|------|------|
| 用户唯一标识符 | 设置为 `---ALL---` 则清空所有用户授权 |

### 获取用户授权列表 {#ua}

> 🔧 [在线测试 →](pathname:///manage-test/doc/manager.html#d_ua_list)

获取用户授权列表。

```
GET /manage/ua
```
