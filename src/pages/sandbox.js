import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeMirror from '@uiw/react-codemirror';
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
// real-examples (~700KB) 懒加载，不阻塞首屏
import { API_COMPLETIONS } from '../data/api-completions';
import AIChat from '../components/AIChat';
import ParamPanel from '../components/ParamPanel';

// ============================================================
// 在线调试台 —— 迁移自旧版 main.html / int_test.js 全部功能：
//   连接栏(IP/Port/版本校验) · 执行JS · 执行JSON(日志回放) ·
//   点击不执行 · 自动清屏/日志开关/清屏 · 编辑器高度调节 ·
//   API导航跳转 · 实时视频流(player) + 日志面板(infoPanel)
// 真实连接：需将 SDK 的 ac.min.js / ac_conf.js 放入 static/ 目录
// ============================================================

const DEFAULT_CODE = [
  '// 使用说明：',
  '//  (1) 左侧选择 API 示例：默认「点击即执行」，勾选"点击不执行"则只填入代码',
  '//  (2) 此处可直接编辑 JS 代码，按 Ctrl+Enter 或点击「执行JS」运行',
  '//  (3) 「执行JSON」可回放 __command 日志或执行原始 JSON 命令',
  '//  (4) 全局可用：fdapi / fdplayer / HostConfig / log() / sleep()',
  '',
].join('\n');

const MIN_EDITOR_H = 128;
const MAX_EDITOR_H = 628;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('加载失败: ' + src));
    document.head.appendChild(s);
  });
}

// 匹配日志中的 json-command 命令（旧版 testCmdLogReg）
const matchCmdLog = (text) => text.match(new RegExp('{"__command.*?__playerId":.*?}', 'g'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// SDK onLog 回调内容转义（防止场景名等用户数据触发 XSS）
const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 相邻时间戳差值（旧版 calcTimeDiffs）
const calcTimeDiffs = (arr) => arr.map((cur, i, a) => (i === 0 ? 0 : cur - a[i - 1]));

// ---------- fdapi / api 智能补全（数据来自 gen_dts.py 生成的 api-completions.js） ----------
function fdapiCompletions(context) {
  // fdapi.camera.loo → 方法补全
  let m = context.matchBefore(/(?:fdapi|api)\.([\w$]+)\.([\w$]*)$/);
  if (m) {
    const ns = m.text.replace(/^(?:fdapi|api)\./, '').split('.')[0];
    const list = API_COMPLETIONS.ns[ns];
    if (!list) return null;
    return {
      from: m.from + m.text.lastIndexOf('.') + 1,
      options: list.map((o) => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined })),
      validFor: /^[\w$]*$/,
    };
  }
  // fdapi.cam → 命名空间 + 根方法补全
  m = context.matchBefore(/(?:fdapi|api)\.([\w$]*)$/);
  if (m) {
    const nsOptions = Object.keys(API_COMPLETIONS.ns).map((k) => ({ label: k, type: 'namespace' }));
    const rootOptions = API_COMPLETIONS.root.map((o) => ({ label: o.label, type: 'method', detail: o.detail, info: o.info || undefined }));
    return {
      from: m.from + m.text.lastIndexOf('.') + 1,
      options: nsOptions.concat(rootOptions),
      validFor: /^[\w$]*$/,
    };
  }
  return null;
}
const fdapiCompletionExt = javascriptLanguage.data.of({ autocomplete: fdapiCompletions });

export default function Sandbox() {
  // 站点 baseUrl（如 /fdapi/）：静态资源、SDK 脚本、文档链接都需带此前缀，否则部署在子路径下会 404
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  // —— 连接状态 ——
  const [status, setStatus] = useState('loading'); // loading|no-sdk|connecting|ready|error
  const [versionHtml, setVersionHtml] = useState('');
  const [isCloud, setIsCloud] = useState(true);     // true=云渲染视频流 false=WebSocket API
  const [ip, setIp] = useState('127.0.0.1');
  const [port, setPort] = useState('4321');
  const [coordType, setCoordType] = useState('');   // '0'投影 '1'球面（服务器返回）
  const [coordSel, setCoordSel] = useState('0');    // 示例导航当前坐标系（可手动切换）
  const [fps, setFps] = useState(0);
  const [examplesData, setExamplesData] = useState({ pcs: [], gcs: [] });  // 懒加载

  // —— 编辑器 / 日志 ——
  const [code, setCode] = useState(DEFAULT_CODE);
  const [editorHeight, setEditorHeight] = useState(320);
  const [notExecute, setNotExecute] = useState(false);
  const [autoClear, setAutoClear] = useState(true);
  const [logEnabled, setLogEnabled] = useState(true);
  const [consoleCollapsed, setConsoleCollapsed] = useState(false);
  const [serverVersion, setServerVersion] = useState('');

  // —— 导航 / 布局 ——
  const [searchQuery, setSearchQuery] = useState('');
  const [openCats, setOpenCats] = useState({ 'pcs-0': true, 'gcs-0': true });
  const [openItems, setOpenItems] = useState({});
  const [activeMethod, setActiveMethod] = useState('');
  const [rightTab, setRightTab] = useState('player');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // —— 面板宽度（可拖拽调整，刷新记忆；初始值固定避免 SSR hydration 不一致）——
  const [playerRatio, setPlayerRatio] = useState(0.55);
  const [isDragging, setIsDragging] = useState(false);

  const infoPanelRef = useRef(null);
  const navRef = useRef(null);
  const logTimesRef = useRef(0);
  const codeRef = useRef(code);
  codeRef.current = code;
  // 文档「亲自试一试」带入代码后，待连接就绪自动执行（立即执行开启时）
  const pendingAutoRunRef = useRef(false);
  const flagsRef = useRef({});
  flagsRef.current = { autoClear, logEnabled, notExecute };
  const playerPanelRef = useRef(null);
  const codePanelRef = useRef(null);
  const dragRef = useRef(null);

  // ---------- 日志（旧版 onLog：HTML、自动清屏、日志开关） ----------
  const writeLog = useCallback((msg, noLineBreak, color) => {
    const el = infoPanelRef.current;
    if (!el || !flagsRef.current.logEnabled) return;
    if (flagsRef.current.autoClear && ++logTimesRef.current > 100) {
      logTimesRef.current = 0;
      el.innerHTML = '';
    }
    const html = color ? '<font color="' + color + '">' + msg + '</font>' : String(msg);
    el.insertAdjacentHTML('beforeend', html + (noLineBreak ? '' : '\n'));
    el.scrollTop = el.scrollHeight + 100;
  }, []);

  const clearScreen = useCallback(() => {
    if (infoPanelRef.current) infoPanelRef.current.innerHTML = '';
    logTimesRef.current = 0;
  }, []);

  // ---------- 示例库懒加载（real-examples.js ~700KB，首屏不阻塞） ----------
  useEffect(() => {
    import('../data/real-examples').then((mod) => {
      setExamplesData({ pcs: mod.SANDBOX_CATEGORIES || [], gcs: mod.SANDBOX_CATEGORIES_GCS || [] });
    }).catch(() => {});
  }, []);

  // ---------- 面板拖拽调整宽度 ----------
  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    const playerW = playerPanelRef.current?.getBoundingClientRect().width ?? 0;
    const codeW = codePanelRef.current?.getBoundingClientRect().width ?? 0;
    const total = playerW + codeW;
    if (total <= 0) return;
    dragRef.current = { startX: e.clientX, startPlayerW: playerW, total };
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const { startX, startPlayerW, total } = dragRef.current;
      let ratio = (startPlayerW + (e.clientX - startX)) / total;
      ratio = Math.max(0.2, Math.min(0.8, ratio));
      setPlayerRatio(ratio);
      try { localStorage.setItem('sb-player-ratio', String(ratio)); } catch {}
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // ---------- SDK 加载 + 连接初始化 ----------
  useEffect(() => {
    let disposed = false;

    const apiOptions = {
      onReady: (coordSystemType) => {
        if (disposed) return;
        setStatus('ready');
        setCoordType(String(coordSystemType ?? '0'));
        setCoordSel(String(coordSystemType ?? '0'));
        writeLog('✅ 工程已就绪，可以调用 API（坐标系类型：' + (String(coordSystemType) === '1' ? '球面' : '投影') + '）', false, 'green');
        if (pendingAutoRunRef.current && !flagsRef.current.notExecute) {
          pendingAutoRunRef.current = false;
          setTimeout(() => {
            try {
              window.eval('(async ()=>{' + codeRef.current + '})()');
              writeLog('▶ 已自动执行文档示例代码', false, 'green');
            } catch (err) {
              writeLog(err.message, false, 'red');
            }
          }, 300);
        }
      },
      onApiVersion: () => {
        const fdapi = window.fdapi;
        if (!fdapi || !fdapi.misc) return;
        // 底部 Version 显示：以服务器版本 fdapi.misc.apiVersionServer 为准
        setServerVersion(fdapi.misc.apiVersionServer || fdapi.getVersion() || '');
        if (fdapi.misc.isApiVersionMatched()) {
          setVersionHtml('<font color="#00ffa0">' + fdapi.getVersion() + '</font>');
        } else {
          setVersionHtml('s:<font color="#ff8080">' + fdapi.misc.apiVersionServer + '</font>-c:' + fdapi.getVersion());
          writeLog('<b>ac.min.js 版本和云渲染服务器的文件版本不一致，可能造成接口调用错误，请确保本地工程的 ac.min.js 版本和 CloudMaster 最新安装版本一致!</b>', false, 'red');
        }
      },
      onEvent: (e) => writeLog('OnEvent: ' + escapeHtml(e.eventtype)),
      // escapeHtml：SDK 传入的 msg 可能包含用户场景数据，转义后再写入 DOM
      onLog: (msg, noLineBreak, color) => writeLog(escapeHtml(msg), noLineBreak, color),
    };

    const destroy = () => {
      try { window.fdplayer && window.fdplayer.destroy && window.fdplayer.destroy(); } catch (e) { /* ignore */ }
      try { window.fdapi && window.fdapi.destroy && window.fdapi.destroy(); } catch (e) { /* ignore */ }
      window.fdplayer = undefined;
      window.fdapi = undefined;
      const p = document.getElementById('player');
      if (p) p.innerHTML = '';
    };

    const initConnection = () => {
      const HostConfig = window.HostConfig;
      const urlParams = new URLSearchParams(window.location.search);
      setStatus('connecting');

      if (isCloud && typeof window.DigitalTwinPlayer === 'function') {
        // —— Cloud：DigitalTwinPlayer + 视频流（旧版 initPlayer） ——
        const options = {
          domId: 'player',
          iid: urlParams.get('iid'),
          pid: urlParams.get('pid'),
          reset: urlParams.get('reset'),
          apiOptions,
          keyEventTarget: 'video',
          useBuiltinCursors: true,
          password: urlParams.get('password'),
          enableApiCallLog: urlParams.get('apilog'),
          ui: {
            startupInfo: true,
            statusIndicator: true,
            statusButton: true,
            fullscreenButton: true,
            homeButton: true,
            taskListBar: 1,
            debugEventsPanel: urlParams.get('debugEventsPanel'),
          },
          events: {
            onVideoLoaded: () => writeLog('🎞️ 视频流已加载', false, 'green'),
            onConnClose: (e) => { writeLog('connection closed: ' + e.code, false, 'red'); setStatus('error'); },
            onRtcStatsReport: (stats) => setFps(stats.framesPerSecond || 0),
          },
        };

        // 旧版端口映射逻辑：内网/外网地址选择
        let playerHost = HostConfig.Player;
        if (window.location.protocol !== 'file:') {
          if (HostConfig.Player.indexOf(window.location.hostname) === -1 && HostConfig.PlayerMapping)
            playerHost = HostConfig.PlayerMapping;
        }

        try {
          window.fdplayer = new window.DigitalTwinPlayer(playerHost, options);
          window.fdapi = window.fdplayer.getAPI();
          const host = window.fdplayer.getHost ? window.fdplayer.getHost() : playerHost;
          setIp(host.split(':')[0] || '');
          setPort(host.split(':')[1] || '');
        } catch (e) {
          setStatus('error');
          writeLog('DigitalTwinPlayer 初始化失败: ' + e.message, false, 'red');
          return;
        }
      } else if (typeof window.DigitalTwinAPI === 'function') {
        // —— Explorer / WebSocket：仅 API（旧版 initAPI） ——
        const hostApi = HostConfig.API || '127.0.0.1:4321';
        setIp(hostApi.split(':')[0]);
        setPort(hostApi.split(':')[1] || '4321');
        try {
          window.fdapi = new window.DigitalTwinAPI(hostApi, apiOptions);
        } catch (e) {
          setStatus('error');
          writeLog('DigitalTwinAPI 初始化失败: ' + e.message, false, 'red');
          return;
        }
      } else {
        setStatus('no-sdk');
        return;
      }

      if (window.acapi && window.acapi.VERSION) {
        setVersionHtml((v) => v || String(window.acapi.VERSION));
        setServerVersion((v) => v || String(window.acapi.VERSION));
      }
      writeLog('🔌 正在连接 ' + (isCloud ? '云渲染服务（视频流）' : 'WebSocket API 服务') + ' ...');
    };

    (async () => {
      // 全局工具（旧版示例代码依赖）
      window.log = (msg, noLineBreak, color) => writeLog(msg, noLineBreak, color);
      window.logWithColor = (color, text, noLineBreak) => writeLog(text, noLineBreak, color);
      window.clearScreen = clearScreen;
      window.sleep = sleep;
      window.exeFunction = (fn, ms) => setTimeout(fn, ms);

      if (!window.__dtsSdkLoaded) {
        try { await loadScript(baseUrl + 'ac_conf.js'); } catch (e) { /* ac_conf.js 可选 */ }
        if (!window.HostConfig) {
          window.HostConfig = { API: '127.0.0.1:4321', Player: '127.0.0.1:8889', Path: '' };
          writeLog('⚠️ 未找到 ac_conf.js，使用默认 HostConfig: ' + JSON.stringify(window.HostConfig), false, 'orange');
        }
        try {
          await loadScript(baseUrl + 'ac.min.js');
          window.__dtsSdkLoaded = true;
        } catch (e) {
          if (!disposed) {
            setStatus('no-sdk');
            writeLog('<b>❌ 未找到 ac.min.js！</b>', false, 'red');
            writeLog('请将 DTS SDK 安装目录（如 %AppData%/DTS Cloud/7.1/SDK/）下的 <b>ac.min.js</b> 与 <b>ac_conf.js</b> 复制到本工程 <b>static/</b> 目录，重新构建后刷新本页。', false, 'red');
          }
          return;
        }
      }
      if (!disposed) initConnection();
    })();

    return () => { disposed = true; destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCloud]);

  // ---------- 恢复编辑器高度（旧版 CodeMirrorHeight）+ 日志区折叠状态 ----------
  useEffect(() => {
    try {
      const h = parseInt(window.localStorage.getItem('CodeMirrorHeight'), 10);
      if (h >= MIN_EDITOR_H && h <= MAX_EDITOR_H) setEditorHeight(h);
      if (window.localStorage.getItem('SbConsoleCollapsed') === '1') setConsoleCollapsed(true);
      // 恢复面板宽度比例（在 useEffect 中读取，避免 SSR hydration 不一致）
      const r = parseFloat(window.localStorage.getItem('sb-player-ratio'));
      if (!isNaN(r) && r > 0.1 && r < 0.9) setPlayerRatio(r);
    } catch (e) { /* ignore */ }
  }, []);

  // ---------- 代码恢复：分享链接(#code=) > 文档带入(SbPendingCode) > 上次保存(SbSavedCode) ----------
  useEffect(() => {
    try {
      const h = window.location.hash;
      if (h.startsWith('#code=')) {
        const b64 = h.slice(6).replace(/-/g, '+').replace(/_/g, '/');
        // TextDecoder 方案：正确处理中文/emoji，替代废弃的 atob+escape 组合
        const raw = atob(b64);
        const decoded = new TextDecoder().decode(
          Uint8Array.from(raw, (c) => c.charCodeAt(0))
        );
        setCode(decoded);
        writeLog('🔗 已载入分享链接中的代码', false, 'green');
        return;
      }
      const pending = window.localStorage.getItem('SbPendingCode');
      if (pending) {
        window.localStorage.removeItem('SbPendingCode');
        setCode(pending);
        if (!flagsRef.current.notExecute) {
          pendingAutoRunRef.current = true;
          if (window.fdapi) {
            pendingAutoRunRef.current = false;
            setTimeout(() => doExecCode(), 200);
            writeLog('📄 已载入文档示例代码，正在自动执行…', false, 'green');
          } else {
            writeLog('📄 已载入文档示例代码，连接就绪后将自动执行', false, 'green');
          }
        } else {
          writeLog('📄 已载入文档示例代码，点击「执行JS」运行', false, 'green');
        }
        return;
      }
      const saved = window.localStorage.getItem('SbSavedCode');
      if (saved) setCode(saved);
    } catch (e) { /* ignore */ }
  }, [writeLog]);

  // ---------- 代码自动保存（防抖 500ms，刷新不丢） ----------
  useEffect(() => {
    const t = setTimeout(() => {
      try { window.localStorage.setItem('SbSavedCode', code); } catch (e) { /* ignore */ }
    }, 500);
    return () => clearTimeout(t);
  }, [code]);

  // ---------- 分享链接：代码编码进 URL 并复制 ----------
  const shareCode = useCallback(() => {
    try {
      // TextEncoder 方案：正确处理中文/emoji，替代废弃的 btoa+unescape 组合
      const bytes = new TextEncoder().encode(codeRef.current);
      const b64 = btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-').replace(/\//g, '_');
      const url = window.location.origin + window.location.pathname + '#code=' + b64;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          () => writeLog('🔗 分享链接已复制到剪贴板（' + url.length + ' 字符）', false, 'green'),
          () => writeLog('复制失败，链接：' + url, false, 'orange'),
        );
      } else {
        window.prompt('复制分享链接：', url);
      }
    } catch (e) {
      writeLog('生成分享链接失败: ' + e.message, false, 'red');
    }
  }, [writeLog]);

  // ---------- 折叠/展开日志区（状态持久化，刷新后保持） ----------
  const toggleConsole = () => {
    setConsoleCollapsed((c) => {
      const next = !c;
      try { window.localStorage.setItem('SbConsoleCollapsed', next ? '1' : '0'); } catch (e) { /* ignore */ }
      return next;
    });
  };

  // ---------- 旧版：禁止 Ctrl+滚轮 / Ctrl+± 缩放页面 ----------
  useEffect(() => {
    const onWheel = (e) => { if (e.ctrlKey) e.preventDefault(); };
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && [61, 107, 173, 109, 187, 189].indexOf(e.keyCode) !== -1) e.preventDefault();
    };
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // ---------- 执行 JS（旧版 doExecCode） ----------
  const doExecCode = useCallback(() => {
    if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪，请先连接服务', false, 'red'); return; }
    try {
      window.eval('(async ()=>{' + codeRef.current + '})()');
    } catch (e) {
      writeLog(e.message, false, 'red');
      writeLog(e.stack, false, 'red');
    }
  }, [writeLog]);

  // ---------- 参数面板调节：写回代码 +（立即执行时）防抖重跑 ----------
  const tweakTimerRef = useRef(null);
  const onPanelTweak = useCallback((newCode) => {
    setCode(newCode);
    if (flagsRef.current.notExecute) return;      // 「立即执行」关闭：仅写回编辑器，不运行
    if (!window.fdapi) return;
    clearTimeout(tweakTimerRef.current);
    tweakTimerRef.current = setTimeout(() => {
      try {
        window.eval('(async ()=>{' + newCode + '})()');
      } catch (e) {
        writeLog(e.message, false, 'red');
      }
    }, 250);
  }, [writeLog]);

  // ---------- 执行 JSON / 日志回放（旧版 doSendJson + execJson） ----------
  const execJson = useCallback((jsonText) => {
    try {
      const o = JSON.parse(jsonText);
      if (!o) { writeLog('JSON解析错误', false, 'red'); return; }
      window.fdapi.call(o);
    } catch (e) {
      writeLog(e.message, false, 'red');
      writeLog(e.stack, false, 'red');
    }
  }, [writeLog]);

  const doSendJson = useCallback(() => {
    if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪，请先连接服务', false, 'red'); return; }
    const text = codeRef.current;
    const cmdArr = matchCmdLog(text);
    if (cmdArr && cmdArr.length > 0) {
      // 按各命令时间戳的间隔回放
      const timestamps = [];
      for (const cmd of cmdArr) {
        try { timestamps.push(JSON.parse(cmd).timestamp); } catch (e) { timestamps.push(0); }
      }
      const diffs = calcTimeDiffs(timestamps);
      writeLog('▶ 日志回放：共 ' + cmdArr.length + ' 条命令', false, 'green');
      (async () => {
        for (let i = 0; i < cmdArr.length; i++) {
          try {
            window.fdapi.call(JSON.parse(cmdArr[i]));
          } catch (e) {
            writeLog(e.message, false, 'red');
            writeLog(e.stack, false, 'red');
          }
          await sleep(diffs[i]);
        }
      })();
    } else {
      execJson(text);
    }
  }, [writeLog, execJson]);

  // ---------- Ctrl+Enter 执行 ----------
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doExecCode(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [doExecCode]);

  // ---------- 连接服务器（旧版 connectServer / onServerChanged） ----------
  const IP_RE = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  const connectServer = () => {
    const valid = IP_RE.test(ip) && /^\+?[1-9][0-9]*$/.test(port);
    if (!valid) { writeLog('IP或端口格式不正确！', false, 'red'); return; }
    if (!window.fdapi) { writeLog('⚠️ SDK 未加载', false, 'red'); return; }
    try {
      window.fdapi.destroy();
      window.fdapi.setHost(ip, port);
      window.fdapi.connectWebSocket();
      setStatus('connecting');
      writeLog('🔌 重新连接 ' + ip + ':' + port + ' ...');
    } catch (e) {
      writeLog(e.message, false, 'red');
    }
  };

  // ---------- 选择示例（旧版 call(fn)：填入编辑器 +（可选）执行） ----------
  const loadMethod = (item, m, key) => {
    setActiveMethod(key);
    setCode(m.code);
    if (!flagsRef.current.notExecute) {
      if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪，代码已填入编辑器但未执行', false, 'orange'); return; }
      try {
        window.eval('(async ()=>{' + m.code + '})()');
      } catch (e) {
        writeLog(e.message, false, 'red');
      }
    }
  };

  // ---------- 导航过滤（按当前坐标系选择示例树） ----------
  const navTree = coordSel === '1' ? examplesData.gcs : examplesData.pcs;
  const q = searchQuery.trim().toLowerCase();
  const filteredCategories = navTree.map((cat) => ({
    ...cat,
    items: cat.items
      .map((it) => {
        if (!q) return it;
        const hitItem =
          it.name.toLowerCase().includes(q) ||
          it.className.toLowerCase().includes(q) ||
          (it.desc || '').toLowerCase().includes(q);
        const methods = hitItem ? it.methods : it.methods.filter(
          (m) => m.name.toLowerCase().includes(q) || (m.tip || '').toLowerCase().includes(q));
        return { ...it, methods };
      })
      .filter((it) => it.methods.length > 0),
  })).filter((cat) => cat.items.length > 0);

  const statusMeta = {
    loading: { color: '#8b9cad', text: '加载SDK...' },
    'no-sdk': { color: '#ff5f57', text: '未找到SDK' },
    connecting: { color: '#febc2e', text: '连接中' },
    ready: { color: '#28c840', text: '已就绪' },
    error: { color: '#ff5f57', text: '连接异常' },
  }[status];

  return (
    <Layout noFooter title="在线调试" description="DTS Cloud SDK 在线调试台 — 真实连接云渲染服务">
      <style>{`
        /* ============ 在线调试台 · 简约暗色 ============ */
        .sb-wrap {
          --bg:#0a0d13; --panel:#11151d; --panel2:#0c0f16; --line:rgba(148,163,184,0.10);
          --txt:#d7dee8; --muted:#8595a8; --faint:#5c6b7e; --accent:#22d3ee;
          background:var(--bg); height:100vh; color:var(--txt);
          font-family:-apple-system,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif;
          display:flex; flex-direction:column; gap:10px; padding:10px 12px; box-sizing:border-box; overflow:hidden;
        }
        .sb-wrap ::-webkit-scrollbar { width:6px; height:6px; }
        .sb-wrap ::-webkit-scrollbar-track { background:transparent; }
        .sb-wrap ::-webkit-scrollbar-thumb { background:rgba(148,163,184,0.18); border-radius:3px; }
        .sb-wrap ::-webkit-scrollbar-thumb:hover { background:rgba(148,163,184,0.32); }

        /* 隐藏站点顶部导航栏（仅本页生效） */
        nav.navbar { display:none !important; }

        /* ===== 顶部连接栏 ===== */
        .sb-connbar { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:8px 14px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; flex-shrink:0; }
        .sb-logo-text { font-weight:600; font-size:0.9rem; letter-spacing:0.02em; white-space:nowrap; }
        .sb-status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .sb-status-text { font-size:0.72rem; color:var(--muted); white-space:nowrap; }
        .sb-conn-group { display:flex; align-items:center; gap:6px; font-size:0.74rem; color:var(--muted); }
        .sb-input, .sb-select { background:var(--panel2); border:1px solid var(--line); border-radius:6px; color:var(--txt); font-family:inherit; font-size:0.74rem; padding:4px 8px; outline:none; transition:border-color .15s; }
        .sb-input:focus, .sb-select:focus { border-color:var(--accent); }
        .sb-input:disabled { opacity:0.4; }
        .sb-input-ip { width:104px; } .sb-input-port { width:52px; }
        .sb-ver { font-size:0.72rem; color:var(--muted); }
        .sb-chip { color:var(--accent); font-size:0.68rem; padding:2px 10px; border-radius:999px; border:1px solid rgba(34,211,238,0.35); white-space:nowrap; }
        .sb-links { margin-left:auto; display:flex; align-items:center; gap:14px; }
        .sb-link { color:var(--muted); font-size:0.76rem; text-decoration:none; transition:color .15s; }
        .sb-link:hover { color:var(--accent); text-decoration:none; }
        .sb-divider { width:1px; height:16px; background:var(--line); }

        /* ===== 按钮 / 开关 ===== */
        .sb-btn { padding:4px 14px; border-radius:6px; cursor:pointer; font-size:0.76rem; font-family:inherit; transition:all .15s; white-space:nowrap; }
        .sb-btn-run { background:var(--accent); color:#04222b; border:none; font-weight:600; }
        .sb-btn-run:hover { filter:brightness(1.12); }
        .sb-btn-ghost { background:transparent; color:var(--muted); border:1px solid var(--line); }
        .sb-btn-ghost:hover { border-color:var(--accent); color:var(--accent); }
        .sb-btn-sm { padding:3px 10px; font-size:0.72rem; }
        .sb-check { display:flex; align-items:center; gap:5px; font-size:0.73rem; color:var(--muted); cursor:pointer; user-select:none; white-space:nowrap; }
        .sb-check input { accent-color:var(--accent); cursor:pointer; }
        .sb-switch { display:flex; align-items:center; gap:6px; cursor:pointer; user-select:none; }
        .sb-switch input { display:none; }
        .sb-switch-track { width:30px; height:16px; border-radius:8px; background:rgba(148,163,184,0.25); position:relative; transition:background .2s; flex-shrink:0; }
        .sb-switch input:checked + .sb-switch-track { background:var(--accent); }
        .sb-switch-thumb { position:absolute; top:2px; left:2px; width:12px; height:12px; border-radius:50%; background:#fff; transition:left .2s; }
        .sb-switch input:checked + .sb-switch-track .sb-switch-thumb { left:16px; }
        .sb-switch-label { font-size:0.73rem; color:var(--muted); }
        .sb-switch input:checked ~ .sb-switch-label { color:var(--accent); }

        /* ===== 主区域：三列卡片 ===== */
        .sb-main { flex:1; display:flex; gap:10px; overflow:hidden; min-height:0; }

        /* 左列 · API 示例导航 */
        .sb-sidebar { width:264px; flex-shrink:0; background:var(--panel); border:1px solid var(--line); border-radius:10px; display:flex; flex-direction:column; overflow:hidden; transition:width .25s, opacity .25s, border .25s; }
        .sb-sidebar.collapsed { width:0; opacity:0; border:none; }
        .sb-search { padding:10px; border-bottom:1px solid var(--line); display:flex; flex-direction:column; gap:8px; }
        .sb-seg { display:flex; background:var(--panel2); border:1px solid var(--line); border-radius:6px; overflow:hidden; }
        .sb-seg-btn { flex:1; padding:5px 0; background:transparent; border:none; color:var(--muted); font-size:0.73rem; font-family:inherit; cursor:pointer; transition:all .15s; }
        .sb-seg-btn.active { background:rgba(34,211,238,0.14); color:var(--accent); font-weight:500; }
        .sb-search-input { width:100%; background:var(--panel2); border:1px solid var(--line); border-radius:6px; padding:7px 10px; color:var(--txt); font-size:0.76rem; font-family:inherit; outline:none; box-sizing:border-box; transition:border-color .15s; }
        .sb-search-input:focus { border-color:var(--accent); }
        .sb-search-input::placeholder { color:var(--faint); }
        .sb-nav { flex:1; overflow-y:auto; padding:6px; }
        .sb-cat-hdr { display:flex; align-items:center; gap:8px; padding:7px 8px; cursor:pointer; user-select:none; line-height:1.2; border-radius:6px; }
        .sb-cat-hdr:hover { background:rgba(148,163,184,0.06); }
        .sb-cat-icon { width:20px; flex-shrink:0; text-align:center; font-size:0.9rem; line-height:1; }
        .sb-cat-label { flex:1; font-size:0.79rem; color:var(--txt); font-weight:500; }
        .sb-cat-count { font-size:0.64rem; color:var(--faint); }
        .sb-cat-arrow { font-size:0.58rem; color:var(--faint); transition:transform .2s; }
        .sb-cat-arrow.open { transform:rotate(90deg); }
        .sb-class { padding:5px 8px 5px 28px; cursor:pointer; user-select:none; border-left:2px solid transparent; border-radius:0 6px 6px 0; }
        .sb-class:hover { background:rgba(148,163,184,0.05); }
        .sb-class.open { border-left-color:var(--accent); }
        .sb-class-name { font-size:0.75rem; color:var(--muted); font-weight:500; }
        .sb-class.open .sb-class-name { color:var(--accent); }
        .sb-class-desc { font-size:0.64rem; color:var(--faint); margin-top:1px; }
        .sb-method { padding:3px 8px 3px 44px; cursor:pointer; font-size:0.72rem; color:var(--muted); border-left:2px solid transparent; border-radius:0 6px 6px 0; }
        .sb-method:hover { color:var(--accent); }
        .sb-method.active { color:var(--accent); border-left-color:var(--accent); background:rgba(34,211,238,0.06); }
        .sb-footer { border-top:1px solid var(--line); padding:6px 14px; font-size:0.7rem; color:var(--faint); flex-shrink:0; white-space:nowrap; overflow:hidden; }
        .sb-footer strong { color:var(--muted); font-weight:500; }

        /* 中列（视频）/ 右列（编辑器）—— 宽度由 inline style flexGrow 控制，支持拖拽 */
        .sb-center { display:flex; flex-direction:column; gap:10px; overflow:hidden; min-width:0; }
        .sb-editor-pane { display:flex; flex-direction:column; overflow:hidden; background:var(--panel); border:1px solid var(--line); border-radius:10px; }
        .sb-editor-bar { padding:6px 12px; border-bottom:1px solid var(--line); display:flex; align-items:center; gap:8px; flex-shrink:0; }
        .sb-editor-actions { margin-left:auto; display:flex; align-items:center; gap:6px; }
        .sb-sdk-tag { margin-left:4px; color:var(--faint); font-size:0.66rem; }
        .sb-editor-wrap { flex:1; overflow:hidden; }
        .sb-cm-editor { height:100% !important; }
        .sb-cm-editor .cm-editor { background:transparent; }
        .sb-cm-editor .cm-gutters { background:transparent; border-right:1px solid var(--line); }
        .sb-cm-editor .cm-scroller { font-family:'JetBrains Mono','Fira Code',Consolas,monospace !important; font-size:13px; }

        /* 输出日志 */
        .sb-console { flex:0 1 200px; min-height:0; display:flex; flex-direction:column; background:var(--panel); border:1px solid var(--line); border-radius:10px; overflow:hidden; }
        .sb-console:not(.collapsed) { min-height:120px; }
        .sb-console.collapsed { flex:0 0 auto; }
        .sb-console-hdr { padding:5px 12px; display:flex; align-items:center; gap:12px; flex-shrink:0; }
        .sb-console:not(.collapsed) .sb-console-hdr { border-bottom:1px solid var(--line); }
        .sb-console-toggle { display:flex; align-items:center; gap:6px; cursor:pointer; user-select:none; }
        .sb-console-arrow { font-size:0.58rem; color:var(--faint); transition:transform .2s; }
        .sb-console-arrow.open { transform:rotate(90deg); }
        .sb-console-label { color:var(--txt); font-size:0.76rem; font-weight:500; }
        .sb-console-clr { margin-left:auto; background:none; border:1px solid var(--line); border-radius:6px; color:var(--muted); cursor:pointer; font-size:0.7rem; font-family:inherit; padding:2px 10px; transition:all .15s; }
        .sb-console-clr:hover { color:var(--accent); border-color:var(--accent); }
        .sb-infopanel { flex:1; overflow:auto; margin:0; padding:8px 12px; font-size:12px; line-height:1.6; color:var(--muted); background:transparent; white-space:pre-wrap; word-wrap:break-word; font-family:'JetBrains Mono',Consolas,monospace; }
        .sb-infopanel a { color:var(--accent); }

        /* 中列 · 实时画面 / AI 助手 */
        .sb-right { background:var(--panel); border:1px solid var(--line); border-radius:10px; display:flex; flex-direction:column; overflow:hidden; min-width:0; }
        .sb-right-tabs { display:flex; border-bottom:1px solid var(--line); flex-shrink:0; }
        .sb-right-tab { flex:1; padding:8px; text-align:center; cursor:pointer; font-size:0.76rem; color:var(--muted); border-bottom:2px solid transparent; transition:all .2s; user-select:none; }
        .sb-right-tab:hover { color:var(--txt); }
        .sb-right-tab.active { color:var(--accent); border-bottom-color:var(--accent); }
        .sb-right-content { flex:1; min-height:0; position:relative; }
        .sb-pane { position:absolute; inset:0; display:flex; flex-direction:column; }
        .sb-player-hdr { padding:5px 12px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--line); flex-shrink:0; }
        .sb-player-label { color:var(--txt); font-size:0.76rem; font-weight:500; }
        .sb-hud-chip { font-size:0.66rem; padding:1px 8px; border-radius:999px; border:1px solid var(--line); color:var(--muted); }
        .sb-player-box { flex:1; position:relative; background:#000; min-height:0; }
        #player { position:absolute; inset:0; }
        .sb-player-empty { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--faint); font-size:0.78rem; text-align:center; padding:0 24px; pointer-events:none; }

        /* 面板拖拽分隔条 */
        .sb-panel-divider { width:6px; flex-shrink:0; cursor:col-resize; background:transparent; border-radius:3px; transition:background .15s; position:relative; }
        .sb-panel-divider:hover, .sb-panel-divider.active { background:rgba(34,211,238,0.22); }
        .sb-panel-divider::after { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:2px; height:48px; border-radius:1px; background:rgba(148,163,184,0.18); transition:background .15s; }
        .sb-panel-divider:hover::after, .sb-panel-divider.active::after { background:rgba(34,211,238,0.55); }
      `}</style>

      <div className="sb-wrap">
        {/* ===== 连接栏（旧版 spanServer / spanVer） ===== */}
        <div className="sb-connbar">
          <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={() => setSidebarOpen(!sidebarOpen)} title="切换API导航面板">
            {sidebarOpen ? '◀' : '▶'} 导航
          </button>
          <span className="sb-logo-text">DTS · 在线调试</span>
          <span className="sb-status-dot" style={{ background: statusMeta.color, color: statusMeta.color }} />
          <span className="sb-status-text">{statusMeta.text}</span>

          <span className="sb-divider" />

          <span className="sb-conn-group">
            模式
            <select className="sb-select" value={isCloud ? 'cloud' : 'api'} onChange={(e) => setIsCloud(e.target.value === 'cloud')}>
              <option value="cloud">云渲染（视频流）</option>
              <option value="api">WebSocket（仅API）</option>
            </select>
          </span>

          <span className="sb-conn-group">
            IP <input className="sb-input sb-input-ip" value={ip} disabled={isCloud} onChange={(e) => setIp(e.target.value)} />
            Port <input className="sb-input sb-input-port" value={port} disabled={isCloud} onChange={(e) => setPort(e.target.value)} />
            {!isCloud && <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={connectServer}>连接</button>}
          </span>

          <span className="sb-ver">
            Version: <span dangerouslySetInnerHTML={{ __html: versionHtml || '—' }} />
          </span>

          {coordType !== '' && <span className="sb-chip">{coordType === '1' ? '球面坐标系' : '投影坐标系'}</span>}

          <span className="sb-links">
            <a className="sb-link" href={baseUrl + 'dts-sdk.d.ts'} download title="下载 fdapi 的 TypeScript 类型声明，放入工程获得 IDE 智能提示">TS 类型声明 ⬇</a>
            <a className="sb-link" href={baseUrl + 'docs/api/quickstart/digital-twin-api'}>API 文档 ↗</a>
          </span>
        </div>

        {/* ===== 主工作区 ===== */}
        <div className="sb-main">
          {/* 左：API 示例导航 */}
          <aside className={'sb-sidebar' + (sidebarOpen ? '' : ' collapsed')}>
            <div className="sb-search">
              <div className="sb-seg">
                <button
                  className={'sb-seg-btn' + (coordSel === '0' ? ' active' : '')}
                  onClick={() => setCoordSel('0')}
                  title="投影坐标系工程的示例"
                >投影坐标系</button>
                <button
                  className={'sb-seg-btn' + (coordSel === '1' ? ' active' : '')}
                  onClick={() => setCoordSel('1')}
                  title="球面坐标系工程的示例"
                >球面坐标系</button>
              </div>
              <input
                type="text"
                className="sb-search-input"
                placeholder="搜索 类 / 方法..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="sb-nav" ref={navRef}>
              {filteredCategories.map((cat) => {
                const catOpen = q ? true : !!openCats[cat.id];
                return (
                  <div key={cat.id}>
                    <div className="sb-cat-hdr" onClick={() => setOpenCats((s) => ({ ...s, [cat.id]: !catOpen }))}>
                      <span className="sb-cat-icon">{cat.icon}</span>
                      <span className="sb-cat-label">{cat.label}</span>
                      <span className="sb-cat-count">{cat.items.length}</span>
                      <span className={'sb-cat-arrow' + (catOpen ? ' open' : '')}>▶</span>
                    </div>
                    {catOpen && cat.items.map((it) => {
                      const itemOpen = q ? true : !!openItems[it.id];
                      return (
                        <div key={it.id} id={'nav-item-' + it.id}>
                          <div className={'sb-class' + (itemOpen ? ' open' : '')} onClick={() => setOpenItems((s) => ({ ...s, [it.id]: !itemOpen }))}>
                            <div className="sb-class-name">{it.className} <span style={{ opacity: 0.6 }}>· {it.name}</span></div>
                            {it.desc ? <div className="sb-class-desc">{it.desc}</div> : null}
                          </div>
                          {itemOpen && it.methods.map((m, mi) => {
                            const key = it.id + '::' + mi;
                            return (
                              <div
                                key={key}
                                className={'sb-method' + (activeMethod === key ? ' active' : '')}
                                onClick={() => loadMethod(it, m, key)}
                                title={m.tip || (flagsRef.current.notExecute ? '填入编辑器（不执行）' : '填入编辑器并执行')}
                              >
                                {m.name}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </nav>
            {/* 左列底部：服务器版本号（fdapi.misc.apiVersionServer） */}
            <div className="sb-footer">
              <span>Version: <strong>{serverVersion || '—'}</strong></span>
            </div>
          </aside>

          {/* 中：实时画面（player）/ AI 助手 —— player 常驻不卸载 */}
          <aside className="sb-right" ref={playerPanelRef} style={{ flexGrow: playerRatio, flexShrink: 1, flexBasis: 0 }}>
            <div className="sb-right-tabs">
              <div className={'sb-right-tab' + (rightTab === 'player' ? ' active' : '')} onClick={() => setRightTab('player')}>
                实时画面
              </div>
              <div className={'sb-right-tab' + (rightTab === 'ai' ? ' active' : '')} onClick={() => setRightTab('ai')}>
                AI 助手
              </div>
            </div>
            <div className="sb-right-content">
              <div className="sb-pane" style={{ display: rightTab === 'player' ? 'flex' : 'none' }}>
                <div className="sb-player-hdr">
                  <span className="sb-player-label">实时画面</span>
                  <span className="sb-hud-chip">{isCloud ? '云渲染视频流' : '仅 API 模式'}</span>
                  {isCloud && fps > 0 && <span className="sb-hud-chip">FPS {fps}</span>}
                </div>
                {/* player 容器必须保持无 React 子节点：SDK 会向其中注入 video 元素 */}
                <div className="sb-player-box">
                  <div id="player" />
                  {/* lil-gui 参数面板：解析当前示例代码参数，浮于视频流右上角 */}
                  <ParamPanel code={code} onTweak={onPanelTweak} />
                  {(status === 'no-sdk' || !isCloud) && (
                    <div className="sb-player-empty">
                      {status === 'no-sdk' ? (
                        <>
                          <span style={{ fontSize: '2rem' }}>📦</span>
                          <span>未找到 ac.min.js / ac_conf.js</span>
                          <span>请从 DTS SDK 安装目录复制到本工程 static/ 目录后刷新</span>
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: '2rem' }}>🔌</span>
                          <span>WebSocket（仅API）模式不传输视频流</span>
                          <span>画面请在 DTS Explorer / Cloud 客户端中查看</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* AI助手面板 */}
              <div className="sb-pane" style={{ display: rightTab === 'ai' ? 'flex' : 'none' }}>
                <AIChat onInsertCode={(code) => { setCode(code); setRightTab('player'); }} />
              </div>
            </div>
          </aside>

          {/* 拖拽分隔条 */}
          <div
            className={'sb-panel-divider' + (isDragging ? ' active' : '')}
            onMouseDown={onDividerMouseDown}
            title="拖拽调整面板宽度"
          />

          {/* 右：编辑器 + 输出日志 */}
          <div className="sb-center" ref={codePanelRef} style={{ flexGrow: 1 - playerRatio, flexShrink: 1, flexBasis: 0 }}>
            <div
              className="sb-editor-pane"
              style={consoleCollapsed
                ? { flex: '1 1 0%', minHeight: 0, height: 'auto' }
                : { flex: '1 1 auto', height: editorHeight + 'px', minHeight: '120px' }}
            >
              <div className="sb-editor-bar">
                {/* 立即执行开关：开3d点击左侧示例立即执行；关3d只填入编辑器（旧版"点击不执行"反义） */}
                <label className="sb-switch" title="开启后，点击左侧示例立即执行；关闭则只填入编辑器，需手动点击「执行JS」">
                  <input type="checkbox" checked={!notExecute} onChange={(e) => setNotExecute(!e.target.checked)} />
                  <span className="sb-switch-track"><span className="sb-switch-thumb" /></span>
                  <span className="sb-switch-label">立即执行</span>
                </label>
                <span className="sb-editor-actions">
                  <button className="sb-btn sb-btn-run sb-btn-sm" onClick={doExecCode} title="执行编辑器中的JS代码（Ctrl+Enter）">▶ 执行JS</button>
                  <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={doSendJson} title="日志回放：回放 __command 命令日志，或执行原始JSON命令">⧉ 执行JSON</button>
                  <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={() => setCode('')} title="清除代码编辑器">清空代码</button>
                  <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={shareCode} title="将当前代码生成分享链接并复制，发给同事打开即可复现">分享</button>
                </span>
              </div>
              <div className="sb-editor-wrap">
                <CodeMirror
                  value={code}
                  height="100%"
                  theme={oneDark}
                  extensions={[javascript(), fdapiCompletionExt]}
                  onChange={(val) => setCode(val)}
                  className="sb-cm-editor"
                />
              </div>
            </div>

            {/* 输出日志（旧版 infoPanel：HTML日志 / 自动清屏 / 日志开关 / 清屏） */}
            <div className={'sb-console' + (consoleCollapsed ? ' collapsed' : '')}>
              <div className="sb-console-hdr">
                <span className="sb-console-toggle" onClick={toggleConsole} title={consoleCollapsed ? '展开日志区' : '折叠日志区'}>
                  <span className={'sb-console-arrow' + (consoleCollapsed ? '' : ' open')}>▶</span>
                  <span className="sb-console-label">输出日志</span>
                </span>
                {!consoleCollapsed && (
                  <>
                    <label className="sb-check" title="日志积累到一定量后自动清除，避免影响性能">
                      <input type="checkbox" checked={autoClear} onChange={(e) => setAutoClear(e.target.checked)} />
                      自动清屏
                    </label>
                    <label className="sb-check" title="关闭后可以避免日志输出太多，影响页面渲染性能">
                      <input type="checkbox" checked={logEnabled} onChange={(e) => setLogEnabled(e.target.checked)} />
                      开启日志
                    </label>
                    <button className="sb-console-clr" onClick={clearScreen}>清除日志</button>
                  </>
                )}
              </div>
              {/* 折叠时仅隐藏不卸载：日志继续累积，展开后可见 */}
              <pre className="sb-infopanel" ref={infoPanelRef} style={{ display: consoleCollapsed ? 'none' : 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
