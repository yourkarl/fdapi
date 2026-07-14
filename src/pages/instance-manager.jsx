import React, { useState, useRef, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';

const C = {
  panel: 'var(--dts-surface)', panel2: 'var(--dts-surface-2)', input: 'var(--dts-bg)',
  text: 'var(--dts-text)', head: 'var(--dts-heading)', muted: 'var(--dts-muted)', accent: 'var(--dts-accent)',
  border: 'var(--dts-border)', border2: 'var(--dts-border-strong)',
  ok: '#3fb950', err: '#f85149', warn: '#d29922',
};

// ManageResult —— 与老版 manage_common.js 的枚举一致（注意：manager.html 页面注释里的数值有误，以代码为准）
const RESULT_TEXT = {
  0: 'OK', 1: '没有权限（PermissionDenied）', 2: '没有可用的实例（NoFreeInstance)', 3: '没有找到指定的实例（InstanceNotFound）',
  4: '指定的实例没有在运行（InstanceNotRunning）', 5: '参数无效（InvalidParameters）', 6: '没有找到实例所属的管理工具（ManagerNotFound）',
  7: '没有找到指定的 Player（PlayerNotFound）', 8: '执行失败（Failed）', 9: '实例未授权（InstanceNotAuthorized）',
  10: '资源不存在（ResourceNotExist）', 11: '资源已经存在（ResourceAlreadyExists）',
  100: '用户名或密码不正确（IncorrectUsername）', 101: '用户名或密码不正确（IncorrectPassword）', 102: '验证码不正确（IncorrectCaptcha）',
  800: '可执行文件不存在（StartInstance_ExeNotExist）', 801: '工程文件不存在（StartInstance_ProjectPathNotExist）',
  803: '进程启动失败（StartInstance_ProcessStartFailed）', 804: '无法修改已锁定的实例（StartInstance_Locked）',
  805: '正在启动（StartInstance_StartPendding）', 806: '启动超时（StartInstance_Timeout）',
};
const PERMISSION_DENIED = 1;

// InstanceRunningState —— 与老版 manage_common.js 一致
const INSTANCE_STATE = {
  0: { t: '已停止', c: 'var(--dts-muted)' }, 1: { t: '启动中', c: '#d29922' }, 2: { t: '加载中', c: '#d29922' },
  3: { t: '运行中', c: '#3fb950' }, 4: { t: '阻塞', c: '#f85149' },
};

function resultInfo(o) {
  if (!o || typeof o !== 'object' || typeof o.result === 'undefined') return { ok: true, text: '' };
  return { ok: o.result === 0, text: RESULT_TEXT[o.result] || ('未知错误码 ' + o.result) };
}

// 接口定义：cmd 为 WebSocket 命令号（与 manage_common.js 的 ManageCommand 对齐；无 cmd 表示仅 REST）
const GROUPS = [
  {
    name: '登录鉴权',
    ops: [
      { key: 'login', label: '管理员登录', method: 'POST', uri: '/manage/login', auth: false,
        fields: [
          { n: 'username', l: '用户名', v: 'admin' },
          { n: 'password', l: '密码', t: 'password', v: '' },
          { n: 'captcha', l: '验证码', v: '', ph: '需要时填写', captcha: true },
        ] },
      { key: 'captchaRequired', label: '登录是否需要验证码', cmd: -4, method: 'GET', uri: '/manage/captcha/required', auth: false, fields: [] },
      { key: 'checkLogin', label: '检查登录有效性', cmd: -3, method: 'GET', uri: '/manage/login/check', auth: false, fields: [] },
      { key: 'logout', label: '注销登录', cmd: -3, method: 'POST', uri: '/manage/logout', auth: false, fields: [] },
    ],
  },
  {
    name: '实例',
    ops: [
      { key: 'instList', label: '获取实例列表', cmd: 100, method: 'GET', uri: '/manage/instance', auth: false,
        fields: [
          { n: 'details', l: '含实例信息', t: 'checkbox', v: true },
          { n: 'connections', l: '含连接信息', t: 'checkbox', v: true },
        ] },
      { key: 'instInfo', label: '获取实例详情', cmd: 101, method: 'GET', uri: '/manage/instance/info',
        fields: [{ n: 'id', l: '实例 ID', v: '' }] },
      { key: 'instFree', label: '获取一个空闲实例', cmd: 102, method: 'GET', uri: '/manage/instance/free', auth: false, fields: [] },
      { key: 'instUpdate', label: '设置参数 / 启动实例', cmd: 104, method: 'PUT', uri: '/manage/instance/update',
        fields: [
          { n: 'id', l: '实例 ID', v: '' },
          { n: 'project', l: '工程(acp路径/名/pid)', v: '' },
          { n: 'startup', l: '启动实例', t: 'checkbox', v: true },
          { n: 'restart', l: '重启实例', t: 'checkbox', v: false },
          { n: 'quiet', l: '不显示窗口', t: 'checkbox', v: true },
          { n: 'wait', l: '等待启动结果', t: 'checkbox', v: true },
          { n: 'locked', l: '锁定工程', t: 'checkbox', v: false },
          { n: 'adjustResolution', l: '自适应分辨率', t: 'checkbox', v: false },
          { n: 'limitOneClient', l: '限单客户端', t: 'checkbox', v: false },
          { n: 'pauseWhenIdle', l: '空闲暂停渲染', t: 'checkbox', v: false },
          { n: 'websocketPort', l: 'WebSocket端口(0=不开启)', t: 'number', v: '0' },
        ],
        build: (d) => {
          const si = {
            id: d.id, adjustResolution: d.adjustResolution, limitOneClient: d.limitOneClient,
            locked: d.locked, pauseWhenIdle: d.pauseWhenIdle, websocketPort: d.websocketPort,
          };
          const pid = parseInt(d.project, 10);
          if (d.project) { if (Number.isNaN(pid)) si.project = d.project; else si.projectId = pid; }
          const o = { async: !d.wait, startup: d.startup, restart: d.restart, staticInstance: si };
          if (d.quiet) o.quiet = true; // 与老版一致：未勾选时不携带 quiet 字段
          return o;
        } },
      { key: 'instStop', label: '停止实例', cmd: 105, method: 'PUT', uri: '/manage/instance/stop',
        fields: [{ n: 'id', l: '实例 ID', v: '' }] },
      { key: 'instUnlock', label: '解锁实例', cmd: 106, method: 'PUT', uri: '/manage/instance/unlock',
        fields: [{ n: 'id', l: '实例 ID', v: '' }] },
      { key: 'instStopNode', label: '停止节点全部实例', cmd: 1003, method: 'PUT', uri: '/manage/instance/stop/node',
        fields: [{ n: 'id', l: '节点 ID', v: '' }] },
    ],
  },
  {
    name: '系统',
    ops: [
      { key: 'status', label: '服务器实时运行状态', cmd: 1, method: 'GET', uri: '/manage/status', fields: [] },
      { key: 'port', label: '获取端口信息', cmd: 0, method: 'GET', uri: '/manage/port', auth: false, fields: [] },
      { key: 'kick', label: '踢出用户', cmd: 2, method: 'POST', uri: '/manage/kick',
        fields: [
          { n: 'id', l: '实例 ID', v: '' },
          { n: 'playerId', l: '用户ID(-1=全部)', t: 'number', v: '-1' },
        ],
        build: (d) => { const o = { id: d.id }; if (d.playerId !== '') o.playerId = parseInt(d.playerId, 10); return o; } },
      { key: 'license', label: '获取授权信息', cmd: 3, method: 'GET', uri: '/manage/license', fields: [] },
    ],
  },
  {
    name: '工程',
    ops: [
      { key: 'projList', label: '获取工程列表', cmd: 12, method: 'GET', uri: '/manage/project', auth: false, fields: [] },
      { key: 'projAdd', label: '添加工程', cmd: 10, method: 'POST', uri: '/manage/project/add',
        fields: [{ n: 'path', l: '工程完整路径(服务器上)', v: '' }] },
      { key: 'projDel', label: '删除工程', cmd: 11, method: 'DELETE', uri: '/manage/project/del',
        fields: [{ n: 'idOrName', l: '工程 ID 或名称', v: '' }],
        build: (d) => (/^\d+$/.test(d.idOrName) ? { id: parseInt(d.idOrName, 10) } : { name: d.idOrName }) },
    ],
  },
  {
    name: '用户授权',
    ops: [
      { key: 'uaList', label: '获取用户授权列表', cmd: 222, method: 'GET', uri: '/manage/ua', fields: [] },
      { key: 'uaAdd', label: '添加用户授权', cmd: 220, method: 'POST', uri: '/manage/ua/add',
        fields: [{ n: 'uid', l: '用户唯一标识', v: '' }] },
      { key: 'uaDel', label: '删除用户授权', cmd: 221, method: 'DELETE', uri: '/manage/ua/del',
        fields: [{ n: 'uid', l: '用户唯一标识(---ALL---清空)', v: '' }] },
    ],
  },
  {
    name: '账号',
    ops: [
      { key: 'getAccount', label: '获取管理员设置', cmd: -1, method: 'GET', uri: '/manage/account', fields: [] },
      { key: 'changeAccount', label: '修改账号设置', cmd: -5, method: 'PUT', uri: '/manage/account/change',
        fields: [
          { n: 'username', l: '用户名', v: 'admin' },
          { n: 'password', l: '新密码(留空不改)', t: 'password', v: '' },
          { n: 'password2', l: '确认新密码', t: 'password', v: '' },
          { n: 'period', l: '登录有效期(分钟,≥15)', t: 'number', v: '15' },
          { n: 'captchaRequired', l: '登录需要验证码', t: 'checkbox', v: false },
        ],
        validate: (d) => {
          if (!d.username) return '用户名不能为空！';
          const p = parseInt(d.period, 10);
          if (Number.isNaN(p) || p < 15) return '登录有效期不正确（最小 15 分钟）！';
          if (d.password && d.password !== d.password2) return '两次输入的密码不一致！';
          return null;
        },
        build: (d) => {
          const o = { username: d.username, period: parseInt(d.period, 10) || 15, captchaRequired: d.captchaRequired };
          if (d.password) o.password = d.password;
          return o;
        } },
      { key: 'delUserLogin', label: '删除用户登录信息', cmd: 4, method: 'PUT', uri: '/manage/user/deletelogin',
        fields: [{ n: 'name', l: '用户名', v: '' }] },
    ],
  },
];

const ALL_OPS = GROUPS.flatMap((g) => g.ops);

function lsGet(k, d) { try { return (typeof window !== 'undefined' && localStorage.getItem(k)) || d; } catch (e) { return d; } }

// 从实例对象里尽量宽松地取字段（不同版本服务端字段可能有差异）
function pick(o, keys, d) { for (const k of keys) { if (o && typeof o[k] !== 'undefined' && o[k] !== null) return o[k]; } return d; }

function Console() {
  const [server, setServer] = useState(() => lsGet('im_server', '127.0.0.1:8080'));
  const [https, setHttps] = useState(() => lsGet('im_https', '') === '1');
  const [token, setToken] = useState(() => lsGet('im_token', ''));
  const [vals, setVals] = useState({});
  const [logs, setLogs] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const [needCaptcha, setNeedCaptcha] = useState(false);
  const [captchaSeed, setCaptchaSeed] = useState(0);
  const [instances, setInstances] = useState(null);   // 实例列表可视化数据
  const [watching, setWatching] = useState(false);    // WS 实时状态订阅
  const wsRef = useRef(null);
  const wsCbRef = useRef(new Map());
  const wsQueueRef = useRef([]);
  const watchRef = useRef(false);

  const host = String(server).replace(/\/+$/, '');
  const base = (https ? 'https' : 'http') + '://' + host;
  const wsUrl = (https ? 'wss' : 'ws') + '://' + host + '/manager';

  const getVal = (op, f) => { const k = op.key + '.' + f.n; return k in vals ? vals[k] : f.v; };
  const setVal = (opKey, n, v) => setVals((s) => ({ ...s, [opKey + '.' + n]: v }));
  const pushLog = (e) => setLogs((l) => [{ id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), ...e }, ...l].slice(0, 80));

  function persistServer(v) { setServer(v); try { localStorage.setItem('im_server', v); } catch (e) {} }
  function persistHttps(v) { setHttps(v); try { localStorage.setItem('im_https', v ? '1' : ''); } catch (e) {} }
  function persistToken(v) { setToken(v); try { localStorage.setItem('im_token', v || ''); } catch (e) {} }

  // —— 与老版一致的响应后处理：token 存取 / 权限过期拦截 / 账号回填 / 实例列表可视化 ——
  const afterResponse = useCallback((op, o) => {
    if (!o || typeof o !== 'object') return;
    if (op && op.key === 'login' && o.authorization) persistToken(o.authorization);
    if (op && op.key === 'logout') persistToken('');
    if (o.result === PERMISSION_DENIED) {
      pushLog({ title: '权限校验', tag: '!', meta: '', ok: false, data: '没有权限或登录已过期，请重新在「管理员登录」处登录（老版行为：Permission Denied! Please login again!）' });
    }
    if (op && op.key === 'getAccount' && o.result === 0) { // 老版：获取后回填修改表单
      setVals((s) => ({ ...s, 'changeAccount.username': o.username ?? s['changeAccount.username'],
        'changeAccount.period': String(o.period ?? ''), 'changeAccount.captchaRequired': !!o.captchaRequired }));
    }
    if (op && op.key === 'captchaRequired') setNeedCaptcha(!!(o.required ?? o.captchaRequired ?? o.data));
    const list = pick(o, ['instances', 'instanceList'], null); // 实例列表/状态推送 → 可视化面板
    if (Array.isArray(list)) setInstances({ at: new Date().toLocaleTimeString(), list });
  }, []);

  function validateOp(op, data) {
    if (op.key === 'login') {
      if (!data.username) return '用户名不能为空！';
      if (!data.password) return '密码不能为空！';
      if (needCaptcha && !data.captcha) return '请输入验证码！';
    }
    if (op.validate) return op.validate(data);
    return null;
  }

  function buildData(op, override) {
    let raw = {};
    (op.fields || []).forEach((f) => { raw[f.n] = getVal(op, f); });
    if (override) Object.assign(raw, override);
    const err = validateOp(op, raw);
    if (err) { pushLog({ title: op.label, tag: '!', meta: '参数校验', ok: false, data: err }); return null; }
    let data = raw;
    if (op.build) data = op.build(raw);
    if (op.key === 'login') { data = { username: raw.username, password: raw.password }; if (raw.captcha) data.captcha = raw.captcha; }
    return data;
  }

  // REST：与老版 callRest 一致（authorization 放 header；GET 走 query，其余 JSON body）
  async function restCall(op, override) {
    const built = buildData(op, override); if (built === null) return;
    const data = { ...built, timestamp: Date.now() };
    const headers = {};
    if (token) headers.authorization = token;
    let url = base + op.uri;
    const opt = { method: op.method, headers };
    if (op.method === 'GET') {
      const qs = new URLSearchParams();
      Object.entries(data).forEach(([k, v]) => qs.append(k, typeof v === 'object' ? JSON.stringify(v) : String(v)));
      url += '?' + qs.toString();
    } else {
      headers['Content-Type'] = 'application/json';
      opt.body = JSON.stringify(data);
    }
    try {
      const res = await fetch(url, opt);
      const txt = await res.text();
      let json; try { json = JSON.parse(txt); } catch (e) { json = txt; }
      afterResponse(op, json);
      const ri = resultInfo(json);
      pushLog({ title: op.label, tag: 'REST', meta: op.method + ' ' + op.uri + ' · ' + res.status + (ri.text ? ' · ' + ri.text : ''), ok: res.ok && ri.ok, data: json });
    } catch (err) {
      pushLog({ title: op.label, tag: 'REST', meta: op.method + ' ' + op.uri + ' · 失败', ok: false,
        data: String(err) + '\n（跨域请求需服务端开启 CORS，并正确响应 OPTIONS 预检；或确认服务地址、服务是否运行）' });
    }
  }

  // WebSocket：与老版 callWebSocket 一致（命令号 + authorization 放 body，按 command_timestamp 关联响应）
  function connectWs(onReady) {
    try { if (wsRef.current) wsRef.current.close(); } catch (e) {}
    pushLog({ title: 'WebSocket', tag: 'WS', meta: 'connecting ' + wsUrl, ok: true, data: '' });
    let ws;
    try { ws = new WebSocket(wsUrl); } catch (e) { pushLog({ title: 'WebSocket', tag: 'WS', meta: '创建失败', ok: false, data: String(e) }); return; }
    ws.onopen = () => {
      setWsConnected(true);
      pushLog({ title: 'WebSocket', tag: 'WS', meta: '已连接', ok: true, data: wsUrl });
      const q = wsQueueRef.current.splice(0); q.forEach((fn) => fn());
      if (typeof onReady === 'function') onReady();
    };
    ws.onclose = () => { setWsConnected(false); setWatching(false); watchRef.current = false; pushLog({ title: 'WebSocket', tag: 'WS', meta: '连接已关闭', ok: false, data: '' }); };
    ws.onerror = () => { pushLog({ title: 'WebSocket', tag: 'WS', meta: '连接错误', ok: false, data: '确认服务地址与管理服务是否运行' }); };
    ws.onmessage = (ev) => {
      let o; try { o = JSON.parse(ev.data); } catch (e) { o = ev.data; }
      afterResponse(null, o);
      const key = o && (o.command + '_' + o.timestamp);
      const cb = key && wsCbRef.current.get(key);
      if (cb) { wsCbRef.current.delete(key); cb(o); return; }
      // 老版行为：GetStatus(cmd 1) 的持续推送不刷日志，仅更新可视化面板
      if (o && o.command === 1 && watchRef.current) return;
      pushLog({ title: 'WebSocket 推送', tag: 'WS', meta: '', ok: true, data: o });
    };
    wsRef.current = ws;
  }
  function disconnectWs() { try { if (wsRef.current) wsRef.current.close(); } catch (e) {} setWsConnected(false); }

  function wsSend(op, data) {
    const key = data.command + '_' + data.timestamp;
    wsCbRef.current.set(key, (o) => {
      const ri = resultInfo(o);
      pushLog({ title: op.label, tag: 'WS', meta: 'command ' + op.cmd + (ri.text ? ' · ' + ri.text : ''), ok: ri.ok, data: o });
    });
    try { wsRef.current.send(JSON.stringify(data)); pushLog({ title: op.label, tag: 'WS', meta: '已发送 command ' + op.cmd, ok: true, data }); }
    catch (e) { pushLog({ title: op.label, tag: 'WS', meta: '发送失败', ok: false, data: String(e) }); }
  }

  function wsCall(op) {
    if (op.cmd == null) { pushLog({ title: op.label, tag: 'WS', meta: '该接口仅支持 REST（与老版一致：登录只能 REST）', ok: false, data: '' }); return; }
    const built = buildData(op); if (built === null) return;
    const data = { ...built, timestamp: Date.now(), command: op.cmd };
    if (token) data.authorization = token;
    if (!wsConnected || !wsRef.current || wsRef.current.readyState !== 1) {
      // 自动连接后发送（老版页面加载即连接，这里按需连接）
      wsQueueRef.current.push(() => wsSend(op, data));
      connectWs();
      return;
    }
    wsSend(op, data);
  }

  // 实时状态订阅：WS 方式调用 GetStatus，服务端会持续推送
  function toggleWatch() {
    const op = ALL_OPS.find((x) => x.key === 'status');
    if (watching) { setWatching(false); watchRef.current = false; return; }
    setWatching(true); watchRef.current = true;
    wsCall(op);
  }

  // 页面载入 / 服务地址变更时：静默检查是否需要验证码（老版 initCaptcha 行为）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(base + '/manage/captcha/required?timestamp=' + Date.now());
        const o = await res.json();
        if (!cancelled) setNeedCaptcha(!!(o.required ?? o.captchaRequired ?? o.data));
      } catch (e) { /* 服务不可达时静默 */ }
    })();
    return () => { cancelled = true; };
  }, [base]);

  // 实例行内快捷操作：填充目标表单并调用
  function rowAction(opKey, id) {
    const op = ALL_OPS.find((x) => x.key === opKey);
    setVals((s) => ({ ...s, [opKey + '.id']: id })); // 同步回填表单便于后续手动微调
    restCall(op, { id }); // 本次调用直接用覆盖值，不受表单旧值影响
  }

  const inputStyle = { background: C.input, color: C.head, border: '1px solid ' + C.border2, borderRadius: 6, padding: '6px 9px', fontSize: 13, outline: 'none', width: '100%' };
  const btn = { background: C.accent, color: '#06121b', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 12 };
  const wsBtn = { background: 'rgba(0,212,255,0.12)', color: C.accent, border: '1px solid ' + C.border2, borderRadius: 6, padding: '6px 12px', fontWeight: 500, cursor: 'pointer', fontSize: 12 };
  const ghostBtn = { background: 'rgba(0,212,255,0.12)', color: C.accent, border: '1px solid ' + C.border2, borderRadius: 6, padding: '5px 12px', fontWeight: 500, cursor: 'pointer', fontSize: 12 };
  const miniBtn = { background: 'transparent', color: C.accent, border: '1px solid ' + C.border2, borderRadius: 5, padding: '2px 8px', cursor: 'pointer', fontSize: 11 };

  return (
    <div style={{ background: 'var(--dts-bg)', minHeight: '100vh', padding: '28px 24px 60px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h1 style={{ color: C.head, fontSize: '1.7rem', margin: '0 0 6px' }}>实例管理控制台</h1>
        <p style={{ color: C.muted, margin: '0 0 20px' }}>
          对接 DTS 管理服务，操作实例的启停、解锁、参数、运行状态、工程与用户授权。
          每个接口保留 <span style={{ color: C.accent }}>WebSocket</span> 与 <span style={{ color: C.accent }}>REST</span> 两种调用方式，
          协议与错误码语义与老版 manager 页面（manage_common.js）一致。跨域调用需服务端开启 CORS。
        </p>

        {/* 连接与登录态 */}
        <div style={{ background: C.panel, border: '1px solid ' + C.border, borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <label style={{ color: C.text, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            管理服务地址
            <input style={{ ...inputStyle, width: 200 }} value={server} onChange={(e) => persistServer(e.target.value)} placeholder="host:port" />
          </label>
          <label style={{ color: C.text, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={https} onChange={(e) => persistHttps(e.target.checked)} style={{ accentColor: C.accent }} /> HTTPS
          </label>
          <button style={wsBtn} onClick={wsConnected ? disconnectWs : () => connectWs()}>
            {wsConnected ? '断开 WebSocket' : '连接 WebSocket'}
          </button>
          <span style={{ color: C.muted, fontSize: 12 }}>
            WS：{wsConnected ? <span style={{ color: C.ok }}>已连接</span> : <span style={{ color: C.muted }}>未连接（调用时自动连接）</span>}
          </span>
          <button style={wsBtn} onClick={toggleWatch}>{watching ? '停止实时状态' : '订阅实时状态'}</button>
          <span style={{ color: C.muted, fontSize: 12, marginLeft: 'auto' }}>
            登录态：{token ? <span style={{ color: C.ok }}>已获取 TOKEN</span> : <span style={{ color: C.muted }}>未登录</span>}
            {token && <button style={{ ...miniBtn, marginLeft: 8 }} onClick={() => persistToken('')}>清除</button>}
          </span>
        </div>

        {/* 实例列表可视化面板 */}
        {instances && Array.isArray(instances.list) && (
          <div style={{ background: C.panel, border: '1px solid ' + C.border, borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <h2 style={{ color: C.head, fontSize: '1.05rem', margin: 0 }}>实例总览</h2>
              <span style={{ color: C.muted, fontSize: 12 }}>{instances.list.length} 个 · 更新于 {instances.at}{watching ? ' · 实时推送中' : ''}</span>
              <button style={{ ...miniBtn, marginLeft: 'auto' }} onClick={() => setInstances(null)}>收起</button>
            </div>
            <div style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead>
                  <tr style={{ color: C.muted, textAlign: 'left' }}>
                    {['实例 ID', '工程', '状态', '连接数', '锁定', '操作'].map((h) => (
                      <th key={h} style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border2, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {instances.list.map((it, i) => {
                    const inst = typeof it === 'object' ? it : { id: it };
                    const id = String(pick(inst, ['id', 'iid'], '—'));
                    const st = INSTANCE_STATE[pick(inst, ['state', 'runningState', 'status'], undefined)];
                    const conns = pick(inst, ['connections'], null);
                    const locked = pick(inst, ['locked'], undefined);
                    return (
                      <tr key={id + i} style={{ color: C.text }}>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border, fontFamily: 'monospace' }}>{id}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {String(pick(inst, ['project', 'projectName', 'projectPath'], '—'))}
                        </td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border }}>
                          {st ? <span style={{ color: st.c }}>● {st.t}</span> : <span style={{ color: C.muted }}>—</span>}
                        </td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border }}>{Array.isArray(conns) ? conns.length : (conns ?? '—')}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border }}>{typeof locked === 'boolean' ? (locked ? '🔒' : '—') : '—'}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid ' + C.border, whiteSpace: 'nowrap', display: 'flex', gap: 6 }}>
                          <button style={miniBtn} title="获取详情" onClick={() => rowAction('instInfo', id)}>详情</button>
                          <button style={miniBtn} title="停止实例" onClick={() => rowAction('instStop', id)}>停止</button>
                          <button style={miniBtn} title="解锁实例" onClick={() => rowAction('instUnlock', id)}>解锁</button>
                          <button style={miniBtn} title="踢出全部连接" onClick={() => rowAction('kick', id)}>踢人</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>
              提示：点「获取实例列表」（勾选实例信息+连接信息）或「订阅实时状态」刷新本面板；行内操作走 REST，需要先登录。
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 22, alignItems: 'start' }}>
          <div>
            {GROUPS.map((g) => (
              <div key={g.name} style={{ marginBottom: 26 }}>
                <h2 style={{ color: C.accent, fontSize: '1.05rem', borderLeft: '3px solid ' + C.accent, paddingLeft: 10, margin: '0 0 14px' }}>{g.name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {g.ops.map((op) => (
                    <div key={op.key} style={{ background: C.panel, border: '1px solid ' + C.border, borderRadius: 10, padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: C.head, fontWeight: 600, fontSize: 14 }}>{op.label}</span>
                        {op.auth !== false && <span style={{ color: C.muted, fontSize: 11, border: '1px solid ' + C.border, borderRadius: 4, padding: '1px 5px' }}>需登录</span>}
                      </div>
                      <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>{op.method} {op.uri}{op.cmd != null ? ' · cmd ' + op.cmd : ''}</div>
                      {(op.fields || []).map((f) => {
                        if (f.captcha && !needCaptcha) return null; // 老版行为：不需要验证码时隐藏该行
                        return (
                          <div key={f.n} style={{ marginBottom: 8 }}>
                            {f.t === 'checkbox' ? (
                              <label style={{ color: C.text, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
                                <input type="checkbox" checked={!!getVal(op, f)} onChange={(e) => setVal(op.key, f.n, e.target.checked)} style={{ accentColor: C.accent }} />
                                {f.l}
                              </label>
                            ) : (
                              <label style={{ color: C.muted, fontSize: 12, display: 'block' }}>
                                {f.l}
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                  <input type={f.t === 'password' ? 'password' : f.t === 'number' ? 'number' : 'text'} style={inputStyle}
                                    value={getVal(op, f)} placeholder={f.ph || ''} onChange={(e) => setVal(op.key, f.n, e.target.value)} />
                                  {f.captcha && (
                                    <img src={base + '/manage/captcha?' + captchaSeed} alt="验证码" title="看不清楚？点击换一张"
                                      style={{ height: 30, border: '1px solid ' + C.border, borderRadius: 4, cursor: 'pointer', background: '#fff', flexShrink: 0 }}
                                      onClick={() => setCaptchaSeed(Date.now())}
                                      onError={(ev) => { ev.currentTarget.style.display = 'none'; }} />
                                  )}
                                </div>
                              </label>
                            )}
                          </div>
                        );
                      })}
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        {op.cmd != null && <button style={wsBtn} onClick={() => wsCall(op)}>WebSocket调用</button>}
                        <button style={btn} onClick={() => restCall(op)}>REST调用</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'sticky', top: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h2 style={{ color: C.head, fontSize: '1.05rem', margin: 0 }}>响应日志</h2>
              <button style={ghostBtn} onClick={() => setLogs([])}>清空</button>
            </div>
            <div style={{ background: C.panel2, border: '1px solid ' + C.border, borderRadius: 10, padding: 12, maxHeight: '72vh', overflow: 'auto' }}>
              {logs.length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: '8px 4px' }}>点击「WebSocket调用」或「REST调用」后，请求与响应会显示在这里；错误码会翻译为中文语义。</div>}
              {logs.map((e) => (
                <div key={e.id} style={{ borderBottom: '1px solid ' + C.border, padding: '8px 2px' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: e.ok ? C.ok : C.err, display: 'inline-block' }} />
                    {e.tag && <span style={{ color: C.accent, fontSize: 10, border: '1px solid ' + C.border2, borderRadius: 3, padding: '0 4px' }}>{e.tag}</span>}
                    <span style={{ color: C.head, fontSize: 13, fontWeight: 600 }}>{e.title}</span>
                    <span style={{ color: C.muted, fontSize: 11, marginLeft: 'auto' }}>{e.time}</span>
                  </div>
                  {e.meta && <div style={{ color: C.muted, fontSize: 11, margin: '2px 0 6px 15px' }}>{e.meta}</div>}
                  {(e.data || e.data === '') && String(e.data) !== '' && (
                    <pre style={{ margin: '0 0 0 15px', background: C.input, border: '1px solid ' + C.border, borderRadius: 6, padding: 8, color: C.text, fontSize: 12, maxHeight: 220, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {typeof e.data === 'string' ? e.data : JSON.stringify(e.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstanceManagerPage() {
  return (
    <Layout title="实例管理控制台" description="DTS 实例管理控制台 —— WebSocket / REST 双通道操作实例的启停、解锁、参数、状态、工程与授权，错误码语义与老版 manager 一致">
      <Console />
    </Layout>
  );
}
