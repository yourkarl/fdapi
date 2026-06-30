import React, { useState, useEffect, useRef } from 'react';
import { API_COMPLETIONS } from '../data/api-completions';

// DTS SDK AI 代码助手 —— 支持多 AI 提供商，浏览器直连，Key 存本地

// ── 命名空间中文别名：把用户的中文意图映射到 fdapi 命名空间，
//    用于按需注入「真实方法签名」给模型，避免臆造参数（如 setRainParam 的参数）。──
const NS_ALIASES = {
  camera:        ['相机', '视角', '镜头', '飞行', '环绕', '视点', '机位', '定位', '跟随', '漫游视角'],
  cameraTour:    ['导览', '巡游', '漫游', '路线', '关键帧', '飞行动画'],
  tileLayer:     ['图层', '3dt', '倾斜摄影', 'bim', '模型图层', '单体化', '高亮'],
  cesium3DTileset: ['3dtiles', '3d tiles', 'cesium'],
  marker:        ['标注', '标记', '打点', '点位', '标牌', '图标'],
  marker3d:      ['三维标注', '动态标注', '3d标注'],
  tag:           ['标签'],
  weather:       ['天气', '下雨', '雨', '下雪', '雪', '雾', '云', '昼夜', '光照', '太阳', '月亮', '气象', '阴天'],
  settings:      ['设置', '画质', '后处理', '后期', '特效', '抗锯齿', 'fov', '渲染', '显示', '交互模式'],
  settingsPanel: ['设置面板', '面板'],
  tools:         ['测量', '测距', '测面', '绘制', '分析', '天际线', '通视', '坡度', '剖切', '可视域', '求交'],
  misc:          ['截图', '版本', '杂项', '按钮'],
  coord:         ['坐标', '坐标转换', '经纬度', '投影', '屏幕坐标', '世界坐标'],
  vector:        ['矢量', '折线', '多边形', 'polyline', 'polygon', 'od线', '迁徙', '路径线'],
  overlay:       ['覆盖物', '热力', 'heatmap', '热力图', '贴花', 'decal', '视频投影', '全景', '辐射', '光源', '高亮区域'],
  plot:          ['标绘', '态势', '军标'],
  geoJsonLayer:  ['geojson', '矢量数据'],
  imageryLayer:  ['影像', '影像图层', '地图服务', 'wmts', 'wms', 'tms', 'mvt'],
  drone:         ['无人机'],
  train:         ['火车', '列车', '高铁'],
  vehicle:       ['车辆', '汽车', '载具', '车流'],
  satellite:     ['卫星'],
  floodFill:     ['水淹', '淹没', '洪水'],
  excavationAnalysis: ['开挖', '超挖', '欠挖', '土方'],
};

// 根据用户问题匹配相关命名空间，拼出这些命名空间的真实方法签名（含简要说明）。
// 命中才注入（控制 token）；未命中返回空串，行为与原先一致。
function buildApiRef(text) {
  if (!text || !API_COMPLETIONS || !API_COMPLETIONS.ns) return '';
  const lower = text.toLowerCase();
  const nss = Object.keys(API_COMPLETIONS.ns);
  const matched = nss.filter((ns) =>
    lower.includes(ns.toLowerCase()) ||
    (NS_ALIASES[ns] || []).some((a) => text.includes(a))
  ).slice(0, 5); // 最多 5 个命名空间，避免提示过大
  if (matched.length === 0) return '';
  const lines = [];
  for (const ns of matched) {
    lines.push(`【fdapi.${ns}】`);
    for (const m of API_COMPLETIONS.ns[ns]) {
      const info = (m.info || '').replace(/\s+/g, ' ').slice(0, 50);
      lines.push(`  fdapi.${ns}.${m.label}${m.detail}${info ? ' — ' + info : ''}`);
    }
  }
  return '\n\n以下是与本次问题相关的 API 真实签名，请严格按此参数顺序与类型生成，禁止臆造参数：\n' + lines.join('\n');
}

const PROVIDER_STORAGE = 'DtsAiProvider';
const KEY_PREFIX       = 'DtsAiKey_';
const MODEL_PREFIX     = 'DtsAiModel_';   // value: modelId 或 "__c:自定义文本"
const PRIMARY_IDS      = ['claude', 'openai', 'deepseek', 'qwen'];

// ── fdapi 白名单（模块级缓存，只构建一次）──
// 以 api-completions.js（文档全量 API，权威）为基准，再并入 api_examples.js，
// 这样所有有文档的方法都放行，只拦截 SDK 中不存在的「臆造」API。
let _apiCachePromise = null;

function buildCompletionApis() {
  const s = new Set();
  if (API_COMPLETIONS && API_COMPLETIONS.ns) {
    for (const ns of Object.keys(API_COMPLETIONS.ns)) {
      s.add('fdapi.' + ns);                       // 命名空间本身
      for (const m of API_COMPLETIONS.ns[ns]) s.add('fdapi.' + ns + '.' + m.label);
    }
  }
  if (API_COMPLETIONS && API_COMPLETIONS.root) {
    for (const m of API_COMPLETIONS.root) s.add('fdapi.' + m.label);
  }
  return s;
}

function fetchValidApis() {
  if (!_apiCachePromise) {
    _apiCachePromise = (async () => {
      const set = buildCompletionApis();           // 权威：文档全集
      try {
        const resp = await fetch('/fdapi/api_examples.js');
        if (resp.ok) {
          const text = await resp.text();
          for (const m of (text.match(/fdapi(?:\.\w+)+/g) || [])) set.add(m);
        }
      } catch {
        // 忽略，至少有文档全集兜底
      }
      return set.size ? set : null;
    })();
  }
  return _apiCachePromise;
}

// 返回生成文本中不在白名单内的 fdapi 调用列表
function findInvalidApis(responseText, whitelist) {
  if (!whitelist) return []; // 白名单未加载，放行
  const calls = responseText.match(/fdapi(?:\.\w+)+/g) || [];
  if (calls.length === 0) return []; // 纯文字回答，无需验证
  return [...new Set(calls.filter(c => !whitelist.has(c)))];
}

const PROVIDERS = {
  // ── 主要 Tab ──
  claude: {
    id: 'claude', name: 'Claude', badge: 'Claude',
    keyPlaceholder: 'sk-ant-api03-...',
    defaultModel: 'claude-haiku-4-5-20251001',
    models: [
      { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5 · 快速'  },
      { id: 'claude-sonnet-4-6',         label: 'Claude Sonnet 4.6 · 均衡' },
      { id: 'claude-opus-4-8',           label: 'Claude Opus 4.8 · 强力'   },
    ],
    consoleUrl: 'https://console.anthropic.com/settings/keys',
    consoleName: 'Anthropic Console',
    apiBase: 'https://api.anthropic.com',
    format: 'anthropic',
  },
  openai: {
    id: 'openai', name: 'ChatGPT', badge: 'GPT',
    keyPlaceholder: 'sk-proj-...',
    defaultModel: 'gpt-4o-mini',
    models: [
      { id: 'gpt-4.1-mini',   label: 'GPT-4.1 Mini · 最新快速'  },
      { id: 'gpt-4.1',        label: 'GPT-4.1 · 最新旗舰'        },
      { id: 'gpt-4o-mini',    label: 'GPT-4o Mini · 快速'        },
      { id: 'gpt-4o',         label: 'GPT-4o · 均衡'             },
      { id: 'gpt-4-turbo',    label: 'GPT-4 Turbo'               },
      { id: 'o4-mini',        label: 'o4-mini · 推理'             },
      { id: 'o3-mini',        label: 'o3-mini · 推理'             },
      { id: 'o3',             label: 'o3 · 深度推理'              },
    ],
    consoleUrl: 'https://platform.openai.com/api-keys',
    consoleName: 'OpenAI Platform',
    apiBase: 'https://api.openai.com',
    format: 'openai',
  },
  deepseek: {
    id: 'deepseek', name: 'DeepSeek', badge: 'DeepSeek',
    keyPlaceholder: 'sk-...',
    defaultModel: 'deepseek-v4-flash',
    models: [
      { id: 'deepseek-v4-flash',  label: 'DeepSeek-V4-Flash · 快速' },
      { id: 'deepseek-v4-pro',    label: 'DeepSeek-V4-Pro · 强力'   },
      { id: 'deepseek-chat',      label: 'DeepSeek-Chat · 默认最新'  },
      { id: 'deepseek-reasoner',  label: 'DeepSeek-R1 · 推理'       },
    ],
    consoleUrl: 'https://platform.deepseek.com/api_keys',
    consoleName: 'DeepSeek Platform',
    apiBase: 'https://api.deepseek.com',
    format: 'openai',
  },
  qwen: {
    id: 'qwen', name: '通义千问', badge: '千问',
    keyPlaceholder: 'sk-...',
    defaultModel: 'qwen-plus',
    models: [
      { id: 'qwen-turbo',      label: 'Qwen-Turbo · 快速'       },
      { id: 'qwen-plus',       label: 'Qwen-Plus · 均衡'         },
      { id: 'qwen-max',        label: 'Qwen-Max · 强力'          },
      { id: 'qwen3-235b-a22b', label: 'Qwen3-235B-A22B · 旗舰'  },
      { id: 'qwq-32b',         label: 'QwQ-32B · 推理'           },
      { id: 'qwen-long',       label: 'Qwen-Long · 长文档'       },
    ],
    consoleUrl: 'https://dashscope.console.aliyun.com/apiKey',
    consoleName: '阿里云 DashScope',
    apiBase: 'https://dashscope.aliyuncs.com/compatible-mode',
    format: 'openai',
  },

  // ── 其他：国内 ──
  moonshot: {
    id: 'moonshot', name: 'Moonshot (Kimi)', badge: 'Kimi',
    keyPlaceholder: 'sk-...',
    defaultModel: 'moonshot-v1-32k',
    models: [
      { id: 'moonshot-v1-8k',        label: 'Moonshot-8k · 快速'    },
      { id: 'moonshot-v1-32k',       label: 'Moonshot-32k · 均衡'   },
      { id: 'moonshot-v1-128k',      label: 'Moonshot-128k · 长文'  },
      { id: 'kimi-k2-0711-preview',  label: 'Kimi-K2 · 旗舰 (预览)' },
    ],
    consoleUrl: 'https://platform.moonshot.cn/console/api-keys',
    consoleName: 'Moonshot Platform',
    apiBase: 'https://api.moonshot.cn',
    format: 'openai', group: '国内',
  },
  glm: {
    id: 'glm', name: '智谱 AI (GLM)', badge: 'GLM',
    keyPlaceholder: 'API Key...',
    defaultModel: 'glm-4-flash',
    models: [
      { id: 'glm-4-flash',  label: 'GLM-4-Flash · 极速'  },
      { id: 'glm-4-air',    label: 'GLM-4-Air · 轻量'    },
      { id: 'glm-4',        label: 'GLM-4 · 均衡'         },
      { id: 'glm-4-plus',   label: 'GLM-4-Plus · 强力'   },
      { id: 'glm-z1-flash', label: 'GLM-Z1-Flash · 推理' },
      { id: 'glm-z1',       label: 'GLM-Z1 · 深度推理'   },
    ],
    consoleUrl: 'https://open.bigmodel.cn/usercenter/apikeys',
    consoleName: '智谱 AI 开放平台',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    format: 'openai', group: '国内',
  },
  yi: {
    id: 'yi', name: '零一万物 (Yi)', badge: 'Yi',
    keyPlaceholder: 'API Key...',
    defaultModel: 'yi-large',
    models: [
      { id: 'yi-spark',       label: 'Yi-Spark · 轻量'       },
      { id: 'yi-medium',      label: 'Yi-Medium · 均衡'       },
      { id: 'yi-large',       label: 'Yi-Large · 强力'        },
      { id: 'yi-large-turbo', label: 'Yi-Large-Turbo · 快速' },
    ],
    consoleUrl: 'https://platform.lingyiwanwu.com/apikeys',
    consoleName: '零一万物开放平台',
    apiBase: 'https://api.lingyiwanwu.com',
    format: 'openai', group: '国内',
  },
  baichuan: {
    id: 'baichuan', name: '百川 AI', badge: '百川',
    keyPlaceholder: 'API Key...',
    defaultModel: 'Baichuan4-Air',
    models: [
      { id: 'Baichuan4-Air',        label: 'Baichuan4-Air · 轻量'       },
      { id: 'Baichuan4',            label: 'Baichuan4 · 旗舰'           },
      { id: 'Baichuan4-Turbo',      label: 'Baichuan4-Turbo · 快速'    },
      { id: 'Baichuan3-Turbo',      label: 'Baichuan3-Turbo · 均衡'    },
      { id: 'Baichuan3-Turbo-128k', label: 'Baichuan3-Turbo-128k · 长文' },
    ],
    consoleUrl: 'https://platform.baichuan-ai.com/console/apikey',
    consoleName: '百川 AI 开放平台',
    apiBase: 'https://api.baichuan-ai.com',
    format: 'openai', group: '国内',
  },
  step: {
    id: 'step', name: '阶跃星辰 (Step)', badge: 'Step',
    keyPlaceholder: 'API Key...',
    defaultModel: 'step-2-16k',
    models: [
      { id: 'step-1-flash', label: 'Step-1-Flash · 极速' },
      { id: 'step-1-8k',    label: 'Step-1-8k · 均衡'   },
      { id: 'step-1-32k',   label: 'Step-1-32k · 长文'  },
      { id: 'step-1-256k',  label: 'Step-1-256k · 超长' },
      { id: 'step-2-16k',   label: 'Step-2-16k · 强力'  },
    ],
    consoleUrl: 'https://platform.stepfun.com/account/Ytoken',
    consoleName: '阶跃星辰开放平台',
    apiBase: 'https://api.stepfun.com',
    format: 'openai', group: '国内',
  },

  // ── 其他：国际 ──
  gemini: {
    id: 'gemini', name: 'Google Gemini', badge: 'Gemini',
    keyPlaceholder: 'AIzaSy...',
    defaultModel: 'gemini-2.0-flash',
    models: [
      { id: 'gemini-2.0-flash',         label: 'Gemini 2.0 Flash · 快速' },
      { id: 'gemini-2.5-flash-preview',  label: 'Gemini 2.5 Flash · 均衡' },
      { id: 'gemini-2.5-pro-preview',    label: 'Gemini 2.5 Pro · 强力'  },
      { id: 'gemini-1.5-pro',            label: 'Gemini 1.5 Pro · 长文'  },
    ],
    consoleUrl: 'https://aistudio.google.com/app/apikey',
    consoleName: 'Google AI Studio',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    format: 'openai', group: '国际',
  },
  mistral: {
    id: 'mistral', name: 'Mistral AI', badge: 'Mistral',
    keyPlaceholder: 'API Key...',
    defaultModel: 'mistral-small-latest',
    models: [
      { id: 'mistral-small-latest',    label: 'Mistral Small · 快速'   },
      { id: 'mistral-medium-latest',   label: 'Mistral Medium · 均衡'  },
      { id: 'mistral-large-latest',    label: 'Mistral Large · 强力'   },
      { id: 'codestral-latest',        label: 'Codestral · 代码专精'   },
      { id: 'mistral-saba-latest',     label: 'Mistral Saba · 多语言'  },
    ],
    consoleUrl: 'https://console.mistral.ai/api-keys',
    consoleName: 'Mistral Console',
    apiBase: 'https://api.mistral.ai',
    format: 'openai', group: '国际',
  },
  groq: {
    id: 'groq', name: 'Groq', badge: 'Groq',
    keyPlaceholder: 'gsk_...',
    defaultModel: 'llama-3.3-70b-versatile',
    models: [
      { id: 'llama-3.3-70b-versatile',       label: 'Llama 3.3 70B · 均衡'        },
      { id: 'llama-3.1-8b-instant',          label: 'Llama 3.1 8B · 极速'         },
      { id: 'llama3-70b-8192',               label: 'Llama 3 70B'                  },
      { id: 'gemma2-9b-it',                  label: 'Gemma2 9B'                    },
      { id: 'mixtral-8x7b-32768',            label: 'Mixtral 8x7B'                 },
      { id: 'deepseek-r1-distill-llama-70b', label: 'DeepSeek-R1 Llama · 推理'    },
      { id: 'compound-beta',                 label: 'Compound Beta · 工具调用'     },
    ],
    consoleUrl: 'https://console.groq.com/keys',
    consoleName: 'Groq Console',
    apiBase: 'https://api.groq.com/openai',
    format: 'openai', group: '国际',
  },
};

const SYSTEM_PROMPT = `你是 DTS 数字孪生平台 SDK 的专业代码助手。用户在调试台中工作，根据需求直接输出可运行的 JavaScript 代码。

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
5. 若问题不涉及代码（如询问概念），正常中文回答即可
6. 若下方提供了「相关 API 真实签名」，必须严格按其参数顺序、数量与类型生成，禁止臆造参数；未提供签名的方法，使用上方清单中的名称，不确定的参数用注释标注 TODO，切勿编造`;

// ── 消息气泡内容：识别 ``` 代码块 ──
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
                  background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.4)',
                  borderRadius: '6px', color: '#22d3ee', fontSize: '0.75rem',
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
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

function hasRawCode(content) {
  return !content.includes('```') &&
    (content.includes('fdapi') || content.includes('fdplayer') || content.includes('await '));
}

// ── 主组件 ──
export default function AIChat({ onInsertCode }) {
  const [providerId, setProviderId] = useState('claude');
  const [apiKeys, setApiKeys]       = useState({});
  const [showConfig, setShowConfig] = useState(false);
  const [configTab, setConfigTab]   = useState('claude');
  const [keyDraft, setKeyDraft]     = useState('');
  const [keyError, setKeyError]     = useState('');

  // modelSel[pid] = predefined model ID 或 '__custom__'
  // modelCustom[pid] = 自定义模型名文本
  const [modelSel, setModelSel]       = useState({});
  const [modelCustom, setModelCustom] = useState({});

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '👋 你好！我是 DTS SDK AI 代码助手。\n\n描述你想要的场景效果，我会生成对应的 fdapi 代码。\n\n例如：\n• "飞行到腾讯滨海大厦并俯视"\n• "添加一个蓝色发光标注点"\n• "开启降雨+雾效"\n• "获取所有相机动画列表"',
  }]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [validApis, setValidApis] = useState(null); // fdapi 白名单
  const bottomRef = useRef(null);
  const abortRef  = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // 从 localStorage 恢复所有设置
  useEffect(() => {
    try {
      const savedPid = localStorage.getItem(PROVIDER_STORAGE) || 'claude';
      const keys = {}, sel = {}, custom = {};
      for (const pid of Object.keys(PROVIDERS)) {
        const k = localStorage.getItem(KEY_PREFIX + pid);
        if (k) keys[pid] = k;
        const m = localStorage.getItem(MODEL_PREFIX + pid) || '';
        if (m.startsWith('__c:')) { sel[pid] = '__custom__'; custom[pid] = m.slice(4); }
        else if (m) { sel[pid] = m; }
      }
      setProviderId(savedPid);
      setConfigTab(savedPid);
      setApiKeys(keys);
      setModelSel(sel);
      setModelCustom(custom);
      if (!keys[savedPid]) setShowConfig(true);
    } catch {}
  }, []);

  // 加载 api_examples.js 构建白名单
  useEffect(() => {
    fetchValidApis().then(apis => { if (apis) setValidApis(apis); });
  }, []);

  // 获取指定提供商实际生效的模型名
  const getEffectiveModel = (pid) => {
    if (modelSel[pid] === '__custom__') return modelCustom[pid] || PROVIDERS[pid]?.defaultModel || '';
    return modelSel[pid] || PROVIDERS[pid]?.defaultModel || '';
  };

  const provider     = PROVIDERS[providerId] || PROVIDERS.claude;
  const currentKey   = apiKeys[providerId] || '';
  const currentModel = getEffectiveModel(providerId);

  // ── Key 管理 ──
  const saveKey = () => {
    const k = keyDraft.trim();
    if (!k) { setKeyError('请输入 API Key'); return; }
    try {
      localStorage.setItem(KEY_PREFIX + configTab, k);
      localStorage.setItem(PROVIDER_STORAGE, configTab);
    } catch {}
    setApiKeys(prev => ({ ...prev, [configTab]: k }));
    setProviderId(configTab);
    setKeyDraft('');
    setKeyError('');
    setShowConfig(false);
  };

  const clearKey = (pid) => {
    try { localStorage.removeItem(KEY_PREFIX + pid); } catch {}
    setApiKeys(prev => { const next = { ...prev }; delete next[pid]; return next; });
    if (pid === providerId) setShowConfig(true);
  };

  // ── 模型管理 ──
  const handlePresetModel = (pid, modelId) => {
    setModelSel(prev => ({ ...prev, [pid]: modelId }));
    try { localStorage.setItem(MODEL_PREFIX + pid, modelId); } catch {}
  };

  const handleSwitchCustom = (pid) => {
    setModelSel(prev => ({ ...prev, [pid]: '__custom__' }));
    // localStorage 等用户输入后再写
  };

  const handleCustomModelText = (pid, text) => {
    setModelCustom(prev => ({ ...prev, [pid]: text }));
    try { localStorage.setItem(MODEL_PREFIX + pid, `__c:${text}`); } catch {}
  };

  // ── 配置面板开关 ──
  const openConfig = () => { setConfigTab(providerId); setKeyDraft(''); setKeyError(''); setShowConfig(true); };

  const switchConfigTab = (pid) => { setConfigTab(pid); setKeyDraft(''); setKeyError(''); };

  const firstOtherId = Object.keys(PROVIDERS).find(id => !PRIMARY_IDS.includes(id));

  // ── 发送消息 ──
  const send = async () => {
    if (!input.trim() || loading) return;
    if (!currentKey) { openConfig(); return; }

    const text = input.trim();
    setInput('');
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setLoading(true);

    const apiMessages = nextMessages.slice(-12).map(m => ({ role: m.role, content: m.content }));
    // 按本次问题注入相关 API 的真实签名，显著降低参数臆造
    const sys = SYSTEM_PROMPT + buildApiRef(text);
    let timeoutId;

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      timeoutId = setTimeout(() => ctrl.abort(), 30000);

      let url, headers, bodyObj;
      if (provider.format === 'anthropic') {
        url = provider.endpoint || `${provider.apiBase}/v1/messages`;
        headers = {
          'Content-Type': 'application/json',
          'x-api-key': currentKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        };
        bodyObj = { model: currentModel, max_tokens: 1024, system: sys, messages: apiMessages, stream: true };
      } else {
        url = provider.endpoint || `${provider.apiBase}/v1/chat/completions`;
        headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentKey}` };
        bodyObj = {
          model: currentModel, max_tokens: 1024, stream: true,
          messages: [{ role: 'system', content: sys }, ...apiMessages],
        };
      }

      const resp = await fetch(url, { method: 'POST', signal: ctrl.signal, headers, body: JSON.stringify(bodyObj) });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 401) clearKey(providerId);
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
            const delta = provider.format === 'anthropic'
              ? (JSON.parse(raw).delta?.text || '')
              : (JSON.parse(raw).choices?.[0]?.delta?.content || '');
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
      const invalidApis = findInvalidApis(full, validApis);
      if (invalidApis.length > 0) {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: `⚠️ 生成代码中包含 SDK 文档里不存在的 API：\`${invalidApis.join('`、`')}\`\n\n可能是模型臆造的接口，该响应已被拦截，请换个描述方式重新发送。`,
            error: true,
          };
          return copy;
        });
      } else {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: full, streaming: false };
          return copy;
        });
      }

    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ ${err.message}`, error: true }]);
      } else {
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.streaming) copy[copy.length - 1] = { ...last, streaming: false, content: last.content || '⏱ 请求超时，请重试' };
          return copy;
        });
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  // ── 样式工具 ──
  const bubble = (role) => ({
    maxWidth: '92%', padding: '9px 13px',
    borderRadius: role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
    background: role === 'user' ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
    border: '1px solid ' + (role === 'user' ? 'rgba(34,211,238,0.28)' : 'rgba(255,255,255,0.07)'),
    color: '#cdd6e0', fontSize: '0.81rem', lineHeight: 1.55,
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start', fontFamily: 'inherit',
  });
  const btnStyle = (primary) => ({
    padding: '9px 16px', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600,
    fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap',
    border: primary ? 'none' : '1px solid rgba(34,211,238,0.3)',
    background: primary ? '#22d3ee' : 'transparent',
    color: primary ? '#04222b' : '#22d3ee',
  });
  const tabStyle = (active) => ({
    padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap',
    border: active ? '1px solid rgba(34,211,238,0.5)' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(34,211,238,0.12)' : 'transparent',
    color: active ? '#22d3ee' : '#6b8ca8', transition: 'all 0.15s',
  });
  const selectStyle = {
    width: '100%', background: '#0d1420', border: '1px solid rgba(34,211,238,0.2)',
    borderRadius: '7px', padding: '8px 10px', color: '#d0d8e4',
    fontSize: '0.81rem', outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
  };
  const inputStyle = {
    background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.25)',
    borderRadius: '8px', padding: '10px 14px', color: '#d0d8e4',
    fontSize: '0.83rem', outline: 'none', fontFamily: 'inherit',
  };

  // ── 配置面板 ──
  if (!currentKey || showConfig) {
    const isOtherActive = !PRIMARY_IDS.includes(configTab);
    const hasOtherKey   = Object.values(PROVIDERS).filter(p => !PRIMARY_IDS.includes(p.id)).some(p => apiKeys[p.id]);
    const tabProvider   = PROVIDERS[configTab] || PROVIDERS.claude;

    // 模型选择状态（当前配置 tab 的）
    const tabModelSel    = modelSel[configTab] || '';
    const tabModelCustom = modelCustom[configTab] || '';
    const isCustomModel  = tabModelSel === '__custom__';
    const tabSelectVal   = isCustomModel ? '__custom__' : (tabModelSel || tabProvider.defaultModel);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0e14' }}>

        {/* 顶栏 */}
        <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(34,211,238,0.1)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span>🤖</span>
          <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.84rem' }}>AI 代码助手</span>
          {currentKey && (
            <button onClick={() => setShowConfig(false)} style={{ marginLeft: 'auto', ...btnStyle(false), padding: '3px 10px', fontSize: '0.72rem' }}>取消</button>
          )}
        </div>

        {/* 提供商 Tab */}
        <div style={{ display: 'flex', gap: '5px', padding: '10px 14px 0', flexWrap: 'wrap', flexShrink: 0 }}>
          {PRIMARY_IDS.map(pid => (
            <button key={pid} onClick={() => switchConfigTab(pid)} style={tabStyle(configTab === pid)}>
              {PROVIDERS[pid].name}
              {apiKeys[pid] && <span style={{ marginLeft: '3px', fontSize: '0.62rem', opacity: 0.8 }}>✓</span>}
            </button>
          ))}
          <button onClick={() => { if (!isOtherActive) switchConfigTab(firstOtherId); }} style={tabStyle(isOtherActive)}>
            其他
            {hasOtherKey && <span style={{ marginLeft: '3px', fontSize: '0.62rem', opacity: 0.8 }}>✓</span>}
          </button>
        </div>

        {/* 配置内容 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* 其他：提供商子选择 */}
          {isOtherActive && (
            <div>
              <div style={{ color: '#6b8ca8', fontSize: '0.74rem', marginBottom: '6px' }}>提供商</div>
              <select value={configTab} onChange={e => switchConfigTab(e.target.value)} style={selectStyle}>
                <optgroup label="── 国内 ──">
                  {Object.values(PROVIDERS).filter(p => p.group === '国内').map(p => (
                    <option key={p.id} value={p.id}>{p.name}{apiKeys[p.id] ? ' ✓' : ''}</option>
                  ))}
                </optgroup>
                <optgroup label="── 国际 ──">
                  {Object.values(PROVIDERS).filter(p => p.group === '国际').map(p => (
                    <option key={p.id} value={p.id}>{p.name}{apiKeys[p.id] ? ' ✓' : ''}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          )}

          {/* 说明 + 链接 */}
          <div style={{ color: '#8595a8', fontSize: '0.80rem', lineHeight: 1.65 }}>
            Key 仅存储在本地浏览器，不经过任何中间服务器。<br />
            <a href={tabProvider.consoleUrl} target="_blank" rel="noreferrer" style={{ color: '#22d3ee' }}>
              前往 {tabProvider.consoleName} 获取 →
            </a>
          </div>

          {/* API Key 输入 */}
          <input
            key={configTab} type="password" value={keyDraft}
            onChange={e => { setKeyDraft(e.target.value); setKeyError(''); }}
            onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder={apiKeys[configTab] ? '已保存，输入新 Key 以覆盖…' : tabProvider.keyPlaceholder}
            autoFocus style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
          />
          {keyError && <div style={{ color: '#ff8080', fontSize: '0.76rem', marginTop: '-6px' }}>{keyError}</div>}

          {/* 模型选择 */}
          <div>
            <div style={{ color: '#6b8ca8', fontSize: '0.74rem', marginBottom: '6px' }}>模型</div>
            <select
              value={tabSelectVal}
              onChange={e => {
                if (e.target.value === '__custom__') handleSwitchCustom(configTab);
                else handlePresetModel(configTab, e.target.value);
              }}
              style={selectStyle}
            >
              {tabProvider.models.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
              <option value="__custom__">其他（自定义输入）</option>
            </select>

            {isCustomModel && (
              <>
                <input
                  type="text" value={tabModelCustom}
                  onChange={e => handleCustomModelText(configTab, e.target.value)}
                  placeholder="输入模型 ID，如 gpt-4-vision-preview"
                  autoFocus
                  style={{ ...inputStyle, marginTop: '8px', width: '100%', boxSizing: 'border-box' }}
                />
                <div style={{ color: '#556677', fontSize: '0.71rem', marginTop: '4px' }}>
                  填入提供商平台支持的任意模型 ID
                </div>
              </>
            )}
          </div>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={saveKey} style={btnStyle(true)}>保存并使用</button>
            {apiKeys[configTab] && (
              <button onClick={() => clearKey(configTab)}
                style={{ ...btnStyle(false), color: '#ff8080', borderColor: 'rgba(255,128,128,0.3)' }}>
                清除 Key
              </button>
            )}
          </div>

          {/* 其他已配置的提供商 */}
          {Object.values(PROVIDERS).filter(p => p.id !== configTab && apiKeys[p.id]).length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              {Object.values(PROVIDERS).filter(p => p.id !== configTab && apiKeys[p.id]).map(p => (
                <div key={p.id} style={{ fontSize: '0.73rem', color: '#3a6a4a', marginBottom: '2px' }}>✓ {p.name} 已配置</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── 聊天主界面 ──
  const modelDisplayLabel = (() => {
    if (modelSel[providerId] === '__custom__') return modelCustom[providerId] || currentModel;
    const m = provider.models.find(m => m.id === currentModel);
    return m ? m.label.split(' · ')[0] : currentModel;
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0e14', overflow: 'hidden' }}>
      {/* 顶栏 */}
      <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(34,211,238,0.1)', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, flexWrap: 'wrap' }}>
        <span>🤖</span>
        <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.84rem' }}>AI 代码助手</span>
        <span style={{ fontSize: '0.65rem', color: '#22d3ee', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '999px', padding: '1px 7px' }}>
          {provider.badge}
        </span>
        <span style={{ fontSize: '0.63rem', color: '#6b8ca8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '999px', padding: '1px 7px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          title={currentModel}>
          {modelDisplayLabel}
        </span>
        <button onClick={openConfig}
          style={{ marginLeft: 'auto', padding: '3px 9px', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '6px', background: 'transparent', color: '#6b8ca8', fontSize: '0.7rem', cursor: 'pointer' }}
          title="切换 AI 提供商 / 模型">⚙ 配置</button>
      </div>

      {/* 消息列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={bubble(msg.role)}>
            {msg.role === 'assistant' && !msg.error
              ? (msg.streaming && !msg.content
                  ? <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '2px 0' }}>
                      {[0, 1, 2].map(j => (
                        <span key={j} style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: '#22d3ee', display: 'inline-block',
                          animation: `ai-bounce 1.3s ease-in-out ${j * 0.2}s infinite`,
                        }} />
                      ))}
                    </div>
                  : <MessageContent content={msg.content} onInsert={onInsertCode} />
                )
              : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
            }
            {msg.streaming && msg.content && (
              <span style={{ display: 'inline-block', width: '7px', height: '13px', background: '#22d3ee', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'ai-blink 0.8s step-end infinite' }} />
            )}
            {msg.role === 'assistant' && !msg.streaming && !msg.error && hasRawCode(msg.content) && (
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => onInsertCode(msg.content)} style={{ padding: '5px 14px', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.35)', borderRadius: '6px', color: '#22d3ee', fontSize: '0.74rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ➕ 插入编辑器
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && !messages[messages.length - 1]?.streaming && (
          <div style={{
            alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px 12px 12px 0',
          }}>
            <span style={{ fontSize: '0.75rem', color: '#7a95ad', letterSpacing: '0.03em' }}>推理中</span>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 1, 2].map(j => (
                <span key={j} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#22d3ee', display: 'inline-block',
                  animation: `ai-bounce 1.3s ease-in-out ${j * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 输入区 */}
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
      <style>{`
        @keyframes ai-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ai-bounce { 0%,60%,100%{transform:translateY(0);opacity:0.3} 30%{transform:translateY(-6px);opacity:1} }
      `}</style>
    </div>
  );
}
