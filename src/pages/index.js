import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

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
    title: 'GIS / 图层操作',
    desc: 'InfoTree / TileLayer / GeoJSON / ShapeFile / Cesium 3D Tileset / Globe Terrain / 影像 / 视频融合。',
    link: '/docs/api/layer/tile-layer',
  },
  {
    icon: '📏',
    title: '测量绘制',
    desc: '距离/面积/高度测量、交互式点线面绘制、态势标绘符号、模型剖切、求交分析。',
    link: '/docs/api/events/tools',
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
    link: '/docs/api/events/tools',
  },
  {
    icon: '⚙️',
    title: '场景设置',
    desc: '27+ 后处理效果、相机参数、UI 控制、交互模式、人物漫游、高级渲染配置。',
    link: '/docs/api/weather/settings',
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
    icon: '🧮',
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
              <div className="stat-label">教程</div>
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
                  <div className="feature-card-icon">{f.icon}</div>
                  <div className="feature-card-title">{f.title}</div>
                  <div className="feature-card-desc">{f.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Start Code */}
        <div style={{ maxWidth: 860, margin: '0 auto', marginTop: 32 }}>
          <h2 style={{ color: '#00d4ff', borderLeft: '3px solid #00d4ff', paddingLeft: 12 }}>
            5 分钟接入示例
          </h2>
          <pre style={{
            background: '#1a1f2e',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: 8,
            padding: 24,
            overflowX: 'auto',
            color: '#c9d1d9',
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}>
{`<!-- 1. 引入 SDK -->
<script src="./sdk/DigitalTwinSDK.js"></script>

<!-- 2. 视频容器 -->
<div id="dts-player" style="width:100%;height:600px"></div>

<script>
// 3. 创建播放器
const player = new DigitalTwinPlayer('192.168.1.1:8080', {
  domId: 'dts-player',
  events: {
    onVideoLoaded: () => console.log('视频流已加载'),
  }
});

// 4. 获取 API 实例
const api = player.getAPI();

// 5. 飞向某坐标
api.camera.lookAt(120.1, 30.2, 0, 500, -45, 0, 2.0, () => {
  console.log('相机就位！');
});

// 6. 添加标注点
api.marker.add([{
  id: 'marker_001',
  coordinate: [120.1, 30.2, 50],
  text: '数字孪生中心',
  imagePath: '/icons/marker.svg',
}]);
</script>`}
          </pre>
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
