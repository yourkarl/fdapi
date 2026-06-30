import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';

const C = {
  panel: 'var(--dts-surface)', panel2: 'var(--dts-surface-2)', input: 'var(--dts-bg)',
  text: 'var(--dts-text)', head: 'var(--dts-heading)', muted: 'var(--dts-muted)', accent: 'var(--dts-accent)',
  border: 'var(--dts-border)', border2: 'var(--dts-border-strong)',
  ok: '#3fb950', err: '#f85149',
};

// 与原始 manage_common.js 的 ManageCommand 对齐：cmd 为 WebSocket 命令号（无 cmd 表示仅 REST）
const GROUPS = [
  {
    name: '登录鉴权',
    ops: [
      { key: 'login', label: '管理员登录', method: 'POST', uri: '/manage/login', auth: false,
        fields: [
          { n: 'username', l: '用户名', v: 'admin' },
          { n: 'password', l: '密码', t: 'password', v: '' },
          { n: 'captcha', l: '验证码', v: '', ph: '需要时填写' },
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
          { n: 'connections', l: '含连接信息', t: 'checkbox', v: false },
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
          { n: 'websocketPort', l: 'WebSocket端口', t: 'number', v: '0' },
        ],
        build: (d) => {
          const si = {
            id: d.id, adjustResolution: d.adjustResolution, limitOneClient: d.limitOneClient,
            locked: d.locked, pauseWhenIdle: d.pauseWhenIdle, websocketPort: d.websocketPort,
          };
          const pid = parseInt(d.project, 10);
          if (d.project) { if (Number.isNaN(pid)) si.project = d.project; else si.projectId = pid; }
          const o = { async: !d.wait, startup: d.startup, restart: d.restart, staticInstance: si };
          if (d.quiet) o.quiet = true;
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
          { n: 'period', l: '登录有效期(分钟,≥15)', t: 'number', v: '15' },
          { n: 'captchaRequired', l: '登录需要验证码', t: 'checkbox', v: false },
        ],
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

function lsGet(k, d) { try { return (typeof window !== 'undefined' && localStorage.getItem(k)) || d; } catch (e) { return d; } }

function Console() {
  const [server, setServer] = useState(() => lsGet('im_server', '127.0.0.1:8080'));
  const [https, setHttps] = useState(() => lsGet('im_https', '') === '1');
  const [token, setToken] = useState(() => lsGet('im_token', ''));
  const [vals, setVals] = useState({});
  const [logs, setLogs] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef(null);
  const wsCbRef = useRef(new Map());

  const host = String(server).replace(/\/+$/, '');
  const base = (https ? 'https' : 'http') + '://' + host;
  const wsUrl = (https ? 'wss' : 'ws') + '://' + host + '/manager';

  const getVal = (op, f) => { const k = op.key + '.' + f.n; return k in vals ? vals[k] : f.v; };
  const setVal = (opKey, n, v) => setVals((s) => ({ ...s, [opKey + '.' + n]: v }));
  const pushLog = (e) => setLogs((l) => [{ id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), ...e }, ...l].slice(0, 80));

  function persistServer(v) { setServer(v); try { localStorage.setItem('im_server', v); } catch (e) {} }
  function persistHttps(v) { setHttps(v); try { localStorage.setItem('im_https', v ? '1' : ''); } catch (e) {} }
  function persistToken(v) { setToken(v); try { localStorage.setItem('im_token', v || ''); } catch (e) {} }

  function buildData(op) {
    let data = {};
    (op.fields || []).forEach((f) => { data[f.n] = getVal(op, f); });
    if (op.build) data = op.build(data);
    return data;
  }

  // REST：与原始 callRest 一致（authorization 放 header，Content-Type: application/json，GET 走 query，其余 JSON body）
  async function restCall(op) {
    const data = { ...buildData(op), timestamp: Date.now() };
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
      if (op.key === 'login' && json && json.authorization) persistToken(json.authorization);
      if (op.key === 'logout') persistToken('');
      pushLog({ title: op.label, tag: 'REST', meta: op.method + ' ' + op.uri + ' · ' + res.status, ok: res.ok, data: json });
    } catch (err) {
      pushLog({ title: op.label, tag: 'REST', meta: op.method + ' ' + op.uri + ' · 失败', ok: false,
        data: String(err) + '\n（跨域请求需服务端开启 CORS，并正确响应 OPTIONS 预检；或确认服务地址、服务是否运行）' });
    }
  }

  // WebSocket：与原始 callWebSocket 一致（命令号 + authorization 放 body，按 command_timestamp 关联响应）
  function connectWs() {
    try { if (wsRef.current) wsRef.current.close(); } catch (e) {}
    pushLog({ title: 'WebSocket', tag: 'WS', meta: 'connecting ' + wsUrl, ok: true, data: '' });
    let ws;
    try { ws = new WebSocket(wsUrl); } catch (e) { pushLog({ title: 'WebSocket', tag: 'WS', meta: '创建失败', ok: false, data: String(e) }); return; }
    ws.onopen = () => { setWsConnected(true); pushLog({ title: 'WebSocket', tag: 'WS', meta: '已连接', ok: true, data: wsUrl }); };
    ws.onclose = () => { setWsConnected(false); pushLog({ title: 'WebSocket', tag: 'WS', meta: '连接已关闭', ok: false, data: '' }); };
    ws.onerror = () => { pushLog({ title: 'WebSocket', tag: 'WS', meta: '连接错误', ok: false, data: '确认服务地址与管理服务是否运行' }); };
    ws.onmessage = (ev) => {
      let o; try { o = JSON.parse(ev.data); } catch (e) { o = ev.data; }
      const key = o && (o.command + '_' + o.timestamp);
      const cb = key && wsCbRef.current.get(key);
      if (cb) { wsCbRef.current.delete(key); cb(o); }
      else pushLog({ title: 'WebSocket 推送', tag: 'WS', meta: '', ok: true, data: o });
    };
    wsRef.current = ws;
  }
  function disconnectWs() { try { if (wsRef.current) wsRef.current.close(); } catch (e) {} setWsConnected(false); }

  function wsCall(op) {
    if (op.cmd == null) { pushLog({ title: op.label, tag: 'WS', meta: '该接口仅支持 REST', ok: false, data: '' }); return; }
    if (!wsConnected || !wsRef.current) { pushLog({ title: op.label, tag: 'WS', meta: 'WebSocket 未连接', ok: false, data: '请先点上方「连接 WebSocket」' }); return; }
    const data = { ...buildData(op), timestamp: Date.now(), command: op.cmd };
    if (token) data.authorization = token;
    const key = op.cmd + '_' + data.timestamp;
    wsCbRef.current.set(key, (o) => {
      if (op.key === 'login' && o && o.authorization) persistToken(o.authorization);
      if (op.key === 'logout') persistToken('');
      pushLog({ title: op.label, tag: 'WS', meta: 'command ' + op.cmd, ok: o && (o.result === 0 || typeof o.result === 'undefined'), data: o });
    });
    try { wsRef.current.send(JSON.stringify(data)); pushLog({ title: op.label, tag: 'WS', meta: '已发送 command ' + op.cmd, ok: true, data }); }
    catch (e) { pushLog({ title: op.label, tag: 'WS', meta: '发送失败', ok: false, data: String(e) }); }
  }

  const inputStyle = { background: C.input, color: C.head, border: '1px solid ' + C.border2, borderRadius: 6, padding: '6px 9px', fontSize: 13, outline: 'none', width: '100%' };
  const btn = { background: C.accent, color: '#06121b', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 12 };
  const wsBtn = { background: 'rgba(0,212,255,0.12)', color: C.accent, border: '1px solid ' + C.border2, borderRadius: 6, padding: '6px 12px', fontWeight: 500, cursor: 'pointer', fontSize: 12 };
  const ghostBtn = { background: 'rgba(0,212,255,0.12)', color: C.accent, border: '1px solid ' + C.border2, borderRadius: 6, padding: '5px 12px', fontWeight: 500, cursor: 'pointer', fontSize: 12 };

  return (
    <div style={{ background: 'var(--dts-bg)', minHeight: '100vh', padding: '28px 24px 60px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h1 style={{ color: C.head, fontSize: '1.7rem', margin: '0 0 6px' }}>实例管理控制台</h1>
        <p style={{ color: C.muted, margin: '0 0 20px' }}>
          对接 DTS 管理服务，统一操作实例的启停、解锁、参数、运行状态、工程与用户授权。
          每个接口保留 <span style={{ color: C.accent }}>WebSocket</span> 与 <span style={{ color: C.accent }}>REST</span> 两种调用方式，逻辑与原始 manager 页面一致。跨域调用需服务端开启 CORS。
        </p>

        <div style={{ background: C.panel, border: '1px solid ' + C.border, borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <label style={{ color: C.text, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            管理服务地址
            <input style={{ ...inputStyle, width: 200 }} value={server} onChange={(e) => persistServer(e.target.value)} placeholder="host:port" />
          </label>
          <label style={{ color: C.text, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={https} onChange={(e) => persistHttps(e.target.checked)} style={{ accentColor: C.accent }} /> HTTPS
          </label>
          <button style={wsBtn} onClick={wsConnected ? disconnectWs : connectWs}>
            {wsConnected ? '断开 WebSocket' : '连接 WebSocket'}
          </button>
          <span style={{ color: C.muted, fontSize: 12 }}>
            WS：{wsConnected ? <span style={{ color: C.ok }}>已连接</span> : <span style={{ color: C.muted }}>未连接</span>}
          </span>
          <span style={{ color: C.muted, fontSize: 12, marginLeft: 'auto' }}>
            登录态：{token ? <span style={{ color: C.ok }}>已获取 TOKEN</span> : <span style={{ color: C.muted }}>未登录</span>}
          </span>
        </div>

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
                      {(op.fields || []).map((f) => (
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
                                {op.key === 'login' && f.n === 'captcha' && (
                                  <img src={base + '/manage/captcha'} alt="验证码" title="点击换一张"
                                    style={{ height: 30, border: '1px solid ' + C.border, borderRadius: 4, cursor: 'pointer', background: '#fff', flexShrink: 0 }}
                                    onClick={(ev) => { ev.currentTarget.src = base + '/manage/captcha?' + Date.now(); }}
                                    onError={(ev) => { ev.currentTarget.style.display = 'none'; }} />
                                )}
                              </div>
                            </label>
                          )}
                        </div>
                      ))}
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
              {logs.length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: '8px 4px' }}>点击「WebSocket调用」或「REST调用」后，请求与响应会显示在这里。</div>}
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
    <Layout title="实例管理控制台" description="DTS 实例管理控制台 —— WebSocket / REST 双通道操作实例的启停、解锁、参数、状态、工程与授权">
      <Console />
    </Layout>
  );
}
