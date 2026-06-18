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
            title: '核心 API',
            items: [
              { label: 'DigitalTwinAPI', to: '/docs/api/quickstart/digital-twin-api' },
              { label: 'Camera', to: '/docs/api/camera/camera' },
              { label: 'Settings', to: '/docs/api/weather/settings' },
              { label: '播放器', to: '/docs/api/quickstart/digital-twin-player' },
            ],
          },
          {
            title: '可视化 API',
            items: [
              { label: 'Marker', to: '/docs/api/marker/marker' },
              { label: 'Polygon', to: '/docs/api/vector/polygon' },
              { label: 'HeatMap', to: '/docs/api/overlay/heatmap' },
              { label: 'Decal', to: '/docs/api/overlay/decal' },
            ],
          },
          {
            title: '教程',
            items: [
              { label: '快速开始', to: '/docs/tutorials/hello-world' },
              { label: '异步调用', to: '/docs/tutorials/async-call' },
              { label: '相机控制', to: '/docs/tutorials/camera' },
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
