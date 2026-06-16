import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

// 空间智能工具下载页 —— 提供 Skill 与 MCP Server 的下载与说明
const TOOLS = [
  {
    icon: '🧠',
    badge: 'SKILL',
    title: 'DTS 空间智能 Skill',
    desc: '面向 AI 助手的 DTS SDK 技能包。导入后，AI 即可理解 fdapi 全部接口、参数与最佳实践，按自然语言直接生成可运行的二次开发代码。',
    points: [
      '内置 1600+ 接口的真实签名与示例',
      '理解投影 / 球面双坐标体系与对象生命周期',
      '适配 Claude、Cowork 等支持 Skill 的助手',
    ],
    file: '/downloads/dts-spatial-skill.zip',
    fileLabel: '下载 Skill 包 (.zip)',
    doc: '/docs/skill-guide',
  },
  {
    icon: '🔌',
    badge: 'MCP',
    title: 'DTS MCP Server',
    desc: '基于 Model Context Protocol 的 DTS 服务端，把数字孪生场景能力以标准工具形式暴露给大模型，实现"对话即操作场景"。',
    points: [
      '标准 MCP 协议，主流 AI 客户端即插即用',
      '将相机、标注、图层、仿真封装为可调用工具',
      '本地部署，数据不出内网',
    ],
    file: '/downloads/dts-mcp-server.zip',
    fileLabel: '下载 MCP Server (.zip)',
    doc: '/docs/mcp-guide',
  },
];

function ToolCard({ tool }) {
  const fileUrl = useBaseUrl(tool.file);
  return (
    <div className="spatial-card">
      <div className="spatial-card-head">
        <span className="spatial-card-icon">{tool.icon}</span>
        <span className="spatial-card-badge">{tool.badge}</span>
        <span className="navbar-new spatial-card-new" />
      </div>
      <h3 className="spatial-card-title">{tool.title}</h3>
      <p className="spatial-card-desc">{tool.desc}</p>
      <ul className="spatial-card-points">
        {tool.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <div className="spatial-card-actions">
        <a className="spatial-btn-primary" href={fileUrl} download>
          ↓ {tool.fileLabel}
        </a>
        <Link className="spatial-btn-secondary" to={tool.doc}>
          使用说明
        </Link>
      </div>
    </div>
  );
}

export default function SpatialTools() {
  return (
    <Layout
      title="空间智能工具"
      description="下载 DTS 空间智能 Skill 与 MCP Server，让 AI 直接理解并操作数字孪生场景。"
    >
      <Head>
        <meta name="referrer" content="same-origin" />
      </Head>

      {/* Hero */}
      <div className="hero-banner">
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: '#00d4ff', letterSpacing: '2px', fontWeight: 600, fontSize: '0.85rem', marginBottom: 12, textTransform: 'uppercase' }}>
            Spatial Intelligence Toolkit
          </p>
          <h1 className="hero-title">空间智能工具</h1>
          <p className="hero-subtitle">
            把数字孪生场景接入大模型 —— 下载 Skill 与 MCP Server，
            让 AI 理解 DTS SDK 并用自然语言直接驱动三维场景。
          </p>
        </div>
      </div>

      {/* 下载卡片 */}
      <main style={{ background: '#0d1117', padding: '8px 24px 64px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="spatial-grid">
            {TOOLS.map((t, i) => (
              <ToolCard key={i} tool={t} />
            ))}
          </div>

          {/* 接入三步 */}
          <h2 style={{ textAlign: 'center', color: '#e6f0ff', fontSize: '1.6rem', margin: '56px 0 28px' }}>
            三步接入
          </h2>
          <div className="spatial-steps">
            <div className="spatial-step">
              <div className="spatial-step-no">1</div>
              <div className="spatial-step-title">下载并导入</div>
              <div className="spatial-step-desc">下载上方的 Skill 包或 MCP Server，按说明导入到你的 AI 助手或客户端。</div>
            </div>
            <div className="spatial-step">
              <div className="spatial-step-no">2</div>
              <div className="spatial-step-title">连接场景</div>
              <div className="spatial-step-desc">填入云渲染服务地址（IP:Port）与工程，建立与数字孪生场景的连接。</div>
            </div>
            <div className="spatial-step">
              <div className="spatial-step-no">3</div>
              <div className="spatial-step-title">对话即操作</div>
              <div className="spatial-step-desc">用自然语言描述需求，AI 直接生成并执行 fdapi 代码，驱动三维场景。</div>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#6b8ca8', marginTop: 40, fontSize: '0.9rem' }}>
            需要先部署 DTS 云渲染服务并准备好工程。更多接入细节见{' '}
            <Link to="/docs/tutorials/architecture">架构概览</Link>。
          </p>
        </div>
      </main>
    </Layout>
  );
}
