import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import CodeBlock from '@theme/CodeBlock';

const features = [
  {
    icon: '🚀',
    title: '核心 SDK',
    desc: 'DigitalTwinAPI & DigitalTwinPlayer — 数字孪生云渲染核心，支持 WebSocket 实时通信、云端视频流渲染。',
    link: '/docs/api/quickstart/digital-twin-api',
  },
  {
    icon: '📷',
    title: '相机操作',
    desc: '30+ 相机方法，支持飞行动画、环绕旋转、视角锁定、导览播放，打造流畅的三维场景漫游体验。',
    link: '/docs/api/camera/camera',
  },
  {
    icon: '📋',
    title: '事件系统',
    desc: '鼠标事件、相机事件、导览回调、绘制事件、测量回调，全面覆盖 SDK 交互事件监听。',
    link: '/docs/api/events/edit-helper',
  },
  {
    icon: '🗺️',
    title: 'OGC 服务加载',
    desc: 'ImageryLayer 加载 WMS / WMTS / MVT / MapBox / 天地图(TianDiTu) 等 OGC 服务；球面地形与影像请用 GlobeTerrain 与 ImageryLayer2。',
    link: '/docs/api/layer/imagery-layer',
  },
  {
    icon: '🏙️',
    title: '图层加载',
    desc: 'TileLayer / ShapeFileLayer / GeoJSONLayer / MarkerLayer / Cesium3DTileset —— 三维瓦片、矢量、标注图层全覆盖。',
    link: '/docs/api/layer/tile-layer',
  },
  {
    icon: '📏',
    title: '绘制助手',
    desc: '距离/面积/高度测量、交互式点线面绘制、态势标绘符号、模型剖切、求交分析。',
    link: '/docs/api/measure/edit-helper',
  },
  {
    icon: '🎯',
    title: '场景标注',
    desc: 'Marker / Tag / Marker3D — 纯文字、图标、弹窗、复合标注、三维 Billboard，覆盖全场景标注需求。',
    link: '/docs/api/marker/marker',
  },
  {
    icon: '📐',
    title: '矢量图形',
    desc: 'Polygon / Polyline / SplineMesh / ODLine / TopologyLine / GuideLine — 二维三维矢量绘制全覆盖。',
    link: '/docs/api/vector/polygon',
  },
  {
    icon: '🌤️',
    title: '环境天气',
    desc: '雨/雪/雾/云/昼夜模拟、太阳/月亮/光照调节 — 打造逼真的三维场景环境氛围。',
    link: '/docs/api/weather/weather',
  },
  {
    icon: '🔬',
    title: '分析工具',
    desc: '天际线 / 坡度 / 可视域分析、开挖模拟、查询筛选 — 一行代码启动专业空间分析。',
    link: '/docs/api/analysis/tools',
  },
  {
    icon: '⚙️',
    title: '场景设置',
    desc: '27+ 后处理效果、相机参数、UI 控制、交互模式、人物漫游、高级渲染配置。',
    link: '/docs/api/settings/settings',
  },
  {
    icon: '🧩',
    title: '覆盖物',
    desc: '贴花、热力图、高亮区域、视频投影、全景图、动态光源、辐射圈 — 丰富的场景覆盖物。',
    link: '/docs/api/overlay/decal',
  },
  {
    icon: '🧊',
    title: '模型操作',
    desc: '自定义几何体、自定义对象、高斯泼溅点云，支持精细的模型操控与状态管理。',
    link: '/docs/api/model/custom-mesh',
  },
  {
    icon: '🛠️',
    title: '辅助工具',
    desc: '坐标系转换 (PCS/GCS)、屏幕↔世界坐标互转、射线求交检测、外部系统接口集成。',
    link: '/docs/api/utils/coord',
  },
  {
    icon: '<svg viewBox="5.15 15.70 37.70 37.70" width="3rem" height="3rem" style="display:block" xmlns="http://www.w3.org/2000/svg"><polygon points="24.00,26.00 26.55,27.43 24.00,28.72 21.45,27.42" fill="#283e97" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,27.42 24.00,28.72 21.45,29.47 18.90,28.76" fill="#27449d" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,27.43 29.10,28.84 26.55,29.78 24.00,28.72" fill="#27429b" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="18.90,28.76 21.45,29.47 18.90,29.61 16.35,29.99" fill="#2554aa" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,28.72 26.55,29.78 24.00,29.08 21.45,29.47" fill="#245aaf" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="29.10,28.84 31.65,30.15 29.10,30.65 26.55,29.78" fill="#2649a1" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="16.35,29.99 18.90,29.61 16.35,30.47 13.80,31.34" fill="#2363b7" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,29.47 24.00,29.08 21.45,26.50 18.90,29.61" fill="#1d91dd" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,29.78 29.10,30.65 26.55,28.70 24.00,29.08" fill="#2079c9" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="31.65,30.15 34.20,31.13 31.65,30.91 29.10,30.65" fill="#245aaf" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="13.80,31.34 16.35,30.47 13.80,32.91 11.25,32.96" fill="#2360b4" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="18.90,29.61 21.45,26.50 18.90,26.15 16.35,30.47" fill="#23b1c6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,29.08 26.55,28.70 24.00,24.02 21.45,26.50" fill="#27c2b6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="29.10,30.65 31.65,30.91 29.10,29.35 26.55,28.70" fill="#1c97e0" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="34.20,31.13 36.75,31.74 34.20,30.32 31.65,30.91" fill="#2079c9" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="11.25,32.96 13.80,32.91 11.25,35.57 8.70,34.60" fill="#254fa6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="16.35,30.47 18.90,26.15 16.35,30.66 13.80,32.91" fill="#21abcd" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,26.50 24.00,24.02 21.45,22.81 18.90,26.15" fill="#accf3e" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,28.70 29.10,29.35 26.55,26.78 24.00,24.02" fill="#54ca84" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="31.65,30.91 34.20,30.32 31.65,29.78 29.10,29.35" fill="#21aacd" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="36.75,31.74 39.30,33.08 36.75,31.63 34.20,30.32" fill="#1d8eda" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="8.70,34.60 11.25,35.57 8.70,37.50 6.15,36.13" fill="#27419a" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="13.80,32.91 16.35,30.66 13.80,35.81 11.25,35.57" fill="#1f7ecd" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="18.90,26.15 21.45,22.81 18.90,29.05 16.35,30.66" fill="#8bd247" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,24.02 26.55,26.78 24.00,26.85 21.45,22.81" fill="#dbca33" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="29.10,29.35 31.65,29.78 29.10,31.57 26.55,26.78" fill="#3ac6a0" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="34.20,30.32 36.75,31.63 34.20,31.85 31.65,29.78" fill="#24b4c4" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="39.30,33.08 41.85,35.38 39.30,35.45 36.75,31.63" fill="#207ac9" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="11.25,35.57 13.80,35.81 11.25,38.76 8.70,37.50" fill="#254fa6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="16.35,30.66 18.90,29.05 16.35,36.27 13.80,35.81" fill="#21abcd" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,22.81 24.00,26.85 21.45,32.29 18.90,29.05" fill="#adcf3e" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,26.78 29.10,31.57 26.55,34.21 24.00,26.85" fill="#5ecc79" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="31.65,29.78 34.20,31.85 31.65,35.41 29.10,31.57" fill="#25b7c1" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="36.75,31.63 39.30,35.45 36.75,36.39 34.20,31.85" fill="#1e9dda" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="13.80,35.81 16.35,36.27 13.80,40.04 11.25,38.76" fill="#2360b4" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="18.90,29.05 21.45,32.29 18.90,38.31 16.35,36.27" fill="#23b1c6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,26.85 26.55,34.21 24.00,37.74 21.45,32.29" fill="#28c4b4" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="29.10,31.57 31.65,35.41 29.10,38.94 26.55,34.21" fill="#1fa1d6" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="34.20,31.85 36.75,36.39 34.20,39.01 31.65,35.41" fill="#1c97e0" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="16.35,36.27 18.90,38.31 16.35,41.59 13.80,40.04" fill="#2364b7" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,32.29 24.00,37.74 21.45,41.07 18.90,38.31" fill="#1d92de" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,34.21 29.10,38.94 26.55,41.33 24.00,37.74" fill="#1f7fce" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="31.65,35.41 34.20,39.01 31.65,41.52 29.10,38.94" fill="#226dbe" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="18.90,38.31 21.45,41.07 18.90,43.26 16.35,41.59" fill="#2554aa" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,37.74 26.55,41.33 24.00,43.22 21.45,41.07" fill="#245aaf" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="29.10,38.94 31.65,41.52 29.10,43.31 26.55,41.33" fill="#264ea5" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="21.45,41.07 24.00,43.22 21.45,44.82 18.90,43.26" fill="#27449d" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="26.55,41.33 29.10,43.31 26.55,44.83 24.00,43.22" fill="#27429b" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/><polygon points="24.00,43.22 26.55,44.83 24.00,46.30 21.45,44.82" fill="#283e97" stroke="#0a0e17" stroke-width="0.35" stroke-linejoin="round"/></svg>',
    title: '仿真类',
    desc: '水文仿真(洪水/水动力/SPH粒子)、交通仿真(车辆/无人机/高铁/卫星)、海洋气象、信号仿真、有限元分析、战场推演。',
    link: '/docs/api/hydro/hydrodynamic1d',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="DTS Cloud 数字孪生平台 API 文档"
      description="DTS Cloud 数字孪生平台 SDK v7.1 二次开发 API 完整参考文档"
    >
      {/* 教学视频源站启用了 Referer 防盗链：跨域请求不携带 Referer 即可放行（站内请求仍正常带上） */}
      <Head>
        <meta name="referrer" content="same-origin" />
      </Head>
      {/* Hero */}
      <div className="hero-banner">
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: '#00d4ff', letterSpacing: '2px', fontWeight: 600, fontSize: '0.85rem', marginBottom: 12, textTransform: 'uppercase' }}>
            Digital Twin SDK v7.1
          </p>
          <h1 className="hero-title">DTS Cloud 数字孪生平台</h1>
          <p className="hero-subtitle">
            二次开发 API 文档 — 全面覆盖云渲染、三维可视化、仿真分析、GIS 图层，
            让开发者快速构建沉浸式数字孪生应用。
          </p>
          <div className="hero-buttons">
            <Link className="hero-btn-primary" to="/docs/tutorials/hello-world">
              快速开始 →
            </Link>
            <Link className="hero-btn-secondary" to="/docs/api/quickstart/digital-twin-api">
              API 文档
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#0d1117', padding: '0 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">76</div>
              <div className="stat-label">API 类</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1600+</div>
              <div className="stat-label">API 方法</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">55</div>
              <div className="stat-label">开发教程</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">v7.1</div>
              <div className="stat-label">SDK 版本</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <main style={{ background: '#0d1117', padding: '20px 24px 60px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            color: '#e6f0ff',
            fontSize: '1.8rem',
            margin: '40px 0 8px',
          }}>
            覆盖数字孪生全场景
          </h2>
          <p style={{ textAlign: 'center', color: '#6b8ca8', marginBottom: 0 }}>
            从云渲染接入到三维标注、仿真分析、GIS 集成，SDK 一站覆盖
          </p>
          <div className="feature-grid">
            {features.map((f, i) => (
              <Link key={i} to={f.link} style={{ textDecoration: 'none' }}>
                <div className="feature-card">
                  <div className="feature-card-icon">
                    {typeof f.icon === 'string' && f.icon.trim().startsWith('<svg')
                      ? <span dangerouslySetInnerHTML={{ __html: f.icon }} />
                      : f.icon}
                  </div>
                  <div className="feature-card-title">{f.title}</div>
                  <div className="feature-card-desc">{f.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Start Code */}
        <div style={{ maxWidth: 1080, margin: '0 auto', marginTop: 32 }}>
          <h2 style={{ color: '#00d4ff', borderLeft: '3px solid #00d4ff', paddingLeft: 12 }}>
            5 分钟接入示例
          </h2>
          {/* 二次开发入门教学视频 */}
          <div style={{
            marginTop: 16,
            marginBottom: 24,
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(0,212,255,0.15)',
            background: '#000',
            lineHeight: 0,
          }}>
            <video
              style={{ width: '100%', display: 'block' }}
              preload="auto"
              controls
              muted
              playsInline
              controlsList="nodownload"
              poster="https://f.cdn-static.cn/43677_16494052861605.jpg"
            >
              <source src="https://dtsdata.g-bim.cn/docs/Teaching%20Video/SDK/%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91%E5%85%A5%E9%97%A8%EF%BC%88new%EF%BC%89.mp4" type="video/mp4" />
              您的浏览器不支持 HTML5 视频播放。
            </video>
          </div>
          <CodeBlock language="html">
{`<!-- 1. 引用 SDK：从云渲染服务直接引用，自动匹配服务端版本 -->
<script src="http://192.168.1.27:8081/libac"></script>

<!-- 2. 视频流容器（必须设置宽高） -->
<div id="player" style="width: 800px; height: 500px;"></div>

<script>
// 事件回调
function _onReady() {
  console.log('onReady：可以调用 API 了');
}
function _onLog(s, nnl) {
  console.log('[SDK Log]', s);
}
function _onEvent(event) {
  if (event.eventtype === 'LeftMouseButtonClick' && event.Type === 'TileLayer') {
    console.log('点击了图层：', event.Id);
  }
}

// 服务器地址和端口（替换为实际地址）
const host = '192.168.1.27:8081';

const options = {
  domId: 'player',        // 与 HTML 中 div 的 id 一致
  apiOptions: {
    onReady:  _onReady,   // 必填：连接就绪回调，此后才可调用 API
    onLog:    _onLog,     // 可选：日志输出回调
    onEvent:  _onEvent,   // 可选：三维场景交互事件回调
  },
  ui: {
    startupInfo: true,    // 是否显示启动加载详情，默认 false
    statusButton: true,   // 是否显示状态按钮，默认 false
  },
  events: {
    onVideoLoaded: () => console.log('视频流加载成功'),
    onConnClose:   () => console.log('连接已断开'),
  },
  keyEventTarget: 'none', // 键盘事件接收者：'video' | 'document' | 'none'
};

// 初始化播放器，获取 API 实例
const player = new DigitalTwinPlayer(host, options);
const fdapi  = player.getAPI();
</script>`}
          </CodeBlock>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link className="hero-btn-primary" to="/docs/tutorials/hello-world">
              查看完整教程
            </Link>
          </div>
        </div>

      </main>
    </Layout>
  );
}