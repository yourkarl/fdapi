import React, { useState, useEffect, useRef } from 'react';

// ---- DTS SDK AI 代码助手 —— 调用 Anthropic claude-haiku，浏览器直连 ----
// API Key 存入 localStorage，不经过任何中间服务器

const API_KEY_STORAGE = 'DtsAiApiKey';

const SYSTEM_PROMPT = `你是 DTS Cloud 数字孪生平台 SDK 的专业代码助手。用户在调试台中工作，根据需求直接输出可运行的 JavaScript 代码。

全局可用对象（已由 SDK 注入）：
- fdapi：DigitalTwinAPI 主入口
  - fdapi.camera       相机（set/get/lookAt/flyAround/playAnimation/getAnimationList…）
  - fdapi.tileLayer    三维图层（show/hide/highlight/getActorInfo…）
  - fdapi.marker       标注点（add/remove/update/showAll/hideAll…）
  - fdapi.weather      环境天气（setRainParam/setSnowParam/setFogParam/setDateTime…）
  - fdapi.settings     系统设置（setFovX/setHighlightColor/setAntiAliasing…）
  - fdapi.settingsPanel 功能面板（getCameraMode/getControlMode…）
  - fdapi.tools        测量/绘制/分析（startMeasurement/startGeometryEdit/startSkylineAnalysis…）
  - fdapi.misc         杂项（apiVersionServer/getVersion/screenshot…）
  - fdapi.coord        坐标转换（pcs2gcs/gcs2pcs/screen2World…）
  - fdapi.vector       矢量图形（addPolyline/addPolygon/addOdLine…）
  - fdapi.overlay      覆盖物（addHeatmap/addDecal/addVideoProjection…）
  - fdapi.plot         态势标绘（add/remove/update…）
  - fdapi.cameraTour   相机导览（play/pause/stop/setDuration…）
  - fdapi.geoJsonLayer GeoJSON图层（add/remove/update…）
- fdplayer：DigitalTwinPlayer 实例（视频流/连接管理）
- log(msg)：输出到调试日志面板
- sleep(ms)：异步等待，如 await sleep(1000)

输出规范：
1. 直接输出代码，不加 markdown 代码块包裹
2. 使用 await 处理所有异步调用，顶层 await 可直接用
3. 参数填有意义的示例值，若需要替换的 ID 用注释标注
4. 关键步骤加中文注释，代码简洁（5-20 行为宜）
5. 若问题不涉及代码（如询问概念），正常中文回答即可`;

// ---- 消息气泡内容：自动识别 \`\`\` 代码块 ----
function MessageContent({ content, onInsert }) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const code = part.replace(/^```(?:javascript|js)?\n?/, '').replace(/\n?```$/, '');
          return (
            <div key={i} style={{ margin: '8px 0' }}>
              <pre style={{
                background: '#0d1520', padding: '10px 12px', borderRadius: '6px',
                border: '1px solid rgba(34,211,238,0.2)',
                fontFamily: "'JetBrains Mono','Fira Code',monospace",
                fontSize: '0.75rem', color: '#9cdcfe', overflow: 'auto',
                margin: 0, whiteSpace: 'pre-wrap',
              }}>{code}</pre>
              {onInsert && (
                <button onClick={() => onInsert(code)} style={{
                  marginTop: '6px', padding: '5px 14px',
                  background: 'rgba(34,211,238,0.12)',
                  border: '1px solid rgba(34,211,238,0.4)',
                  borderRadius: '6px', color: '#22d3ee',
                  fontSize: '0.75rem', cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600,
                }}>➕ 插入编辑器</button>
              )}
            </div>
          );
        }
        return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
      })}
    </div>
  );
}

// 无围栏时判断是否含可执行代码
function hasRawCode(content) {
  return !content.includes('```') &&
    (content.includes('fdapi') || content.includes('fdplayer') || content.includes('await '));
}

// ---- 主组件 ----
export default function AIChat({ onInsertCode }) {
  // SSR 兼容：初始值固定为空，hydration 后再从 localStorage 读取
  const [apiKey, setApiKey] = useState('');
  const [keyDraft, setKeyDraft] = useState('');
  const [keyError, setKeyError] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '👋 你好！我是基于 Claude 的 DTS SDK 代码助手。\n\n描述你想要的场景效果，我会生成对应的 fdapi 代码。\n\n例如：\n• "飞行到广州塔并俯视"\n• "添加一个蓝色发光标注点"\n• "开启降雨+雾效"\n• "获取所有相机动画列表"',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // hydration 后从 localStorage 恢复 API Key
  useEffect(() => {
    try {
      const stored = localStorage.getItem(API_KEY_STORAGE);
      if (stored) setApiKey(stored);
    } catch {}
  }, []);

  // ---- API Key 管理 ----
  const saveKey = () => {
    const k = keyDraft.trim();
    if (!k) { setKeyError('请输入 API Key'); return; }
    if (!k.startsWith('sk-ant-')) { setKeyError('格式错误，应以 sk-ant- 开头'); return; }
    try { localStorage.setItem(API_KEY_STORAGE, k); } catch {}
    setApiKey(k);
    setKeyDraft('');
    setKeyError('');
    setShowConfig(false);
  };

  const clearKey = () => {
    try { localStorage.removeItem(API_KEY_STORAGE); } catch {}
    setApiKey('');
    setShowConfig(true);
  };

  // ---- 发送消息 ----
  const send = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) { setShowConfig(true); return; }

    const text = input.trim();
    setInput('');
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setLoading(true);

    const apiMessages = nextMessages.slice(-12).map(m => ({ role: m.role, content: m.content }));

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      // 30s 超时保护：防止网络卡顿时 loading 状态永久卡死
      const timeoutId = setTimeout(() => ctrl.abort(), 30000);

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: ctrl.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
          stream: true,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 401) clearKey();
        throw new Error(err.error?.message || `HTTP ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      let full = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value, { stream: true }).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break outer;
          try {
            const delta = JSON.parse(raw).delta?.text || '';
            if (delta) {
              full += delta;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: full, streaming: true };
                return copy;
              });
            }
          } catch {}
        }
      }

      clearTimeout(timeoutId);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: full, streaming: false };
        return copy;
      });

    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ ${err.message}`, error: true }]);
      } else {
        // 用户手动停止 或 30s 超时
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.streaming) {
            copy[copy.length - 1] = { ...last, streaming: false,
              content: last.content || '⏱ 请求超时，请重试' };
          }
          return copy;
        });
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  const bubble = (role) => ({
    maxWidth: '92%', padding: '9px 13px',
    borderRadius: role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
    background: role === 'user' ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
    border: '1px solid ' + (role === 'user' ? 'rgba(34,211,238,0.28)' : 'rgba(255,255,255,0.07)'),
    color: '#cdd6e0', fontSize: '0.81rem', lineHeight: 1.55,
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
    fontFamily: 'inherit',
  });
  const btnStyle = (primary) => ({
    padding: '9px 16px', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600,
    fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap',
    border: primary ? 'none' : '1px solid rgba(34,211,238,0.3)',
    background: primary ? '#22d3ee' : 'transparent',
    color: primary ? '#04222b' : '#22d3ee',
  });

  if (!apiKey || showConfig) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0e14' }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(34,211,238,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🤖</span>
          <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.84rem' }}>AI 代码助手</span>
          {apiKey && (
            <button onClick={() => setShowConfig(false)} style={{ marginLeft: 'auto', ...btnStyle(false), padding: '3px 10px', fontSize: '0.72rem' }}>取消</button>
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px', gap: '14px' }}>
          <div style={{ color: '#8595a8', fontSize: '0.81rem', lineHeight: 1.65 }}>
            AI 助手由 Anthropic Claude 驱动，需要你的 API Key。<br />
            Key 仅存储在本地浏览器，不经过任何中间服务器。<br />
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" style={{ color: '#22d3ee' }}>前往 Anthropic Console 获取 →</a>
          </div>
          <input type="password" value={keyDraft}
            onChange={e => { setKeyDraft(e.target.value); setKeyError(''); }}
            onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder="sk-ant-api03-..." autoFocus
            style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '8px', padding: '10px 14px', color: '#d0d8e4', fontSize: '0.83rem', outline: 'none', fontFamily: 'inherit' }}
          />
          {keyError && <div style={{ color: '#ff8080', fontSize: '0.76rem' }}>{keyError}</div>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={saveKey} style={btnStyle(true)}>保存并使用</button>
            {apiKey && <button onClick={clearKey} style={{ ...btnStyle(false), color: '#ff8080', borderColor: 'rgba(255,128,128,0.3)' }}>清除 Key</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0e14', overflow: 'hidden' }}>
      <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(34,211,238,0.1)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span>🤖</span>
        <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.84rem' }}>AI 代码助手</span>
        <span style={{ fontSize: '0.65rem', color: '#22d3ee', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '999px', padding: '1px 7px' }}>Claude</span>
        <button onClick={() => setShowConfig(true)}
          style={{ marginLeft: 'auto', padding: '3px 9px', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', background: 'transparent', color: '#6b8ca8', fontSize: '0.7rem', cursor: 'pointer' }}
          title="配置 API Key">⚙ Key</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={bubble(msg.role)}>
            {msg.role === 'assistant' && !msg.error
              ? <MessageContent content={msg.content} onInsert={onInsertCode} />
              : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
            }
            {msg.streaming && (
              <span style={{ display: 'inline-block', width: '7px', height: '13px', background: '#22d3ee', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'ai-blink 0.8s step-end infinite' }} />
            )}
            {msg.role === 'assistant' && !msg.streaming && !msg.error && hasRawCode(msg.content) && (
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => onInsertCode(msg.content)} style={{ padding: '5px 14px', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.35)', borderRadius: '6px', color: '#22d3ee', fontSize: '0.74rem', cursor: 'pointer', fontFamily: 'inherit' }}>➕ 插入编辑器</button>
              </div>
            )}
          </div>
        ))}
        {loading && !messages[messages.length - 1]?.streaming && (
          <div style={{ color: '#6b8ca8', fontSize: '0.78rem' }}>思考中…</div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(34,211,238,0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="描述你想要的效果… (Enter 发送，Shift+Enter 换行)"
            rows={2}
            style={{ flex: 1, background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '8px', padding: '9px 12px', color: '#d0d8e4', fontSize: '0.81rem', outline: 'none', fontFamily: 'inherit', resize: 'none' }}
          />
          {loading
            ? <button onClick={stop} style={{ ...btnStyle(false), color: '#ff8080', borderColor: 'rgba(255,128,128,0.35)' }}>■ 停止</button>
            : <button onClick={send} disabled={!input.trim()} style={btnStyle(true)}>发送</button>
          }
        </div>
      </div>
      <style>{'@keyframes ai-blink { 0%,100%{opacity:1} 50%{opacity:0} }'}</style>
    </div>
  );
}
