// @ts-check
const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DTS Cloud 数字孪生平台',
  tagline: '二次开发 API 文档 · Digital Twin SDK v7.1',
  favicon: 'favicon.ico',
  url: 'https://yourkarl.github.io',
  baseUrl: '/fdapi/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        // 启用中文分词（jieba）：默认仅英文按空格分词，中文会整段不切，导致搜不到
        language: ['en', 'zh'],
        // 跳转目标页高亮命中的关键词
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          editUrl: 'https://github.com/yourkarl/fdapi/edit/master/',
          showLastUpdateTime: true,   // 每页底部显示最近更新时间（取自 git 提交历史）
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      image: 'img/dts-social-card.png',
      navbar: {
        title: 'DTS Cloud SDK',
        logo: {
          alt: 'DTS Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo.svg',
        },
        style: 'dark',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialsSidebar',
            position: 'left',
            label: '开发教程',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'API 文档',
          },
          {
            to: '/spatial-tools',
            label: '空间智能工具',
            position: 'left',
            className: 'navbar-new',
          },
          {
            to: '/sandbox',
            label: '🧪 在线调试',
            position: 'left',
            target: '_blank',
          },
          {
            href: 'https://github.com/yourkarl/fdapi',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '快速上手',
            items: [
              { label: '快速开始 Hello World', to: '/docs/tutorials/hello-world' },
              { label: '核心概念与架构', to: '/docs/tutorials/architecture' },
              { label: '实战配方', to: '/docs/tutorials/recipes' },
              { label: '在线调试台', to: '/sandbox' },
            ],
          },
          {
            title: '核心 API',
            items: [
              { label: 'DigitalTwinAPI · 入口', to: '/docs/api/quickstart/digital-twin-api' },
              { label: 'DigitalTwinPlayer · 播放器', to: '/docs/api/quickstart/digital-twin-player' },
              { label: 'Camera · 相机', to: '/docs/api/camera/camera' },
              { label: 'Settings · 场景设置', to: '/docs/api/settings/settings' },
            ],
          },
          {
            title: '可视化与仿真',
            items: [
              { label: 'Marker · 标注', to: '/docs/api/marker/marker' },
              { label: 'TileLayer · 图层', to: '/docs/api/layer/tile-layer' },
              { label: 'HeatMap · 热力图', to: '/docs/api/overlay/heatmap' },
              { label: '交通仿真', to: '/docs/api/traffic/traffic-simulation' },
            ],
          },
          {
            title: '帮助与工具',
            items: [
              { label: '性能最佳实践', to: '/docs/tutorials/performance' },
              { label: '排错指南', to: '/docs/tutorials/troubleshooting' },
              { label: '高级接口授权', to: '/docs/tutorials/auth' },
              { label: '空间智能工具', to: '/spatial-tools' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DTS Cloud Platform. All rights reserved.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
