import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

// 包装默认 CodeBlock：JS 代码块右上角增加「在调试台运行」按钮，
// 点击后代码经 localStorage 带入 /sandbox 在线调试台。
const RUNNABLE_LANGS = ['js', 'javascript', 'jsx', 'ts', 'typescript'];

export default function CodeBlock(props) {
  const sandboxUrl = useBaseUrl('/sandbox');
  const lang = (props.className || '').replace(/.*language-([\w-]+).*/, '$1') || props.language || '';
  const code = typeof props.children === 'string' ? props.children : '';
  const runnable = RUNNABLE_LANGS.includes(lang) && code.trim().length > 0;

  if (!runnable) return <OriginalCodeBlock {...props} />;

  const runInSandbox = () => {
    try { window.localStorage.setItem('SbPendingCode', code.trim()); } catch (e) { /* ignore */ }
    // 新标签打开调试台（同源，localStorage 共享，新页可读取带入的代码并自动执行）
    window.open(sandboxUrl, '_blank', 'noopener');
  };

  return (
    <div style={{ position: 'relative' }} className="runnable-codeblock">
      <OriginalCodeBlock {...props} />
      <button
        type="button"
        onClick={runInSandbox}
        title="把这段代码带入在线调试台运行"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '12px',
          padding: '2px 10px',
          fontSize: '0.72rem',
          borderRadius: '6px',
          border: '1px solid rgba(34,211,238,0.45)',
          background: 'rgba(34,211,238,0.12)',
          color: '#22d3ee',
          cursor: 'pointer',
          lineHeight: 1.6,
          zIndex: 2,
        }}
      >
        ▶ 亲自试一试
      </button>
    </div>
  );
}
