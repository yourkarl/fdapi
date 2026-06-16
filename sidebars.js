// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialsSidebar: [
    {
      type: 'category',
      label: '入门指南',
      collapsible: false,
      items: [
        'tutorials/architecture',
        'tutorials/introduction',
        'tutorials/hello-world',
        'tutorials/auth',
        'tutorials/async-call',
        'tutorials/recipes',
      ],
    },
    {
      type: 'category',
      label: '核心概念',
      collapsible: false,
      items: [
        'tutorials/event',
        'tutorials/frame-tick',
        'tutorials/coordinates',
        'tutorials/color',
        'tutorials/resources',
        'tutorials/camera',
        'tutorials/typescript',
      ],
    },
    {
      type: 'category',
      label: '进阶与部署',
      collapsible: false,
      items: [
        'tutorials/multi-video',
        'tutorials/framework-integration',
        'tutorials/explorer',
        'tutorials/explorer-guideline',
        'tutorials/cloud-deploy',
        'tutorials/revision-history',
      ],
    },
    {
      type: 'category',
      label: '帮助',
      collapsible: false,
      items: [
        'tutorials/faq',
      ],
    },
  ],
  tutorialSidebar: [
    {
      type: 'category',
      label: '快速上手',
      items: [
        'api/quickstart/digital-twin-api',
        'api/quickstart/digital-twin-player',
      ],
    },
    {
      type: 'category',
      label: '相机操作',
      items: [
        'api/camera/camera',
        'api/camera/camera-tour',
      ],
    },
    {
      type: 'category',
      label: '事件系统',
      items: [
        'api/events/edit-helper',
        'api/events/tools',
        'api/events/camera-tour',
      ],
    },
    {
      type: 'category',
      label: '图层操作',
      items: [
        'api/layer/info-tree',
        'api/layer/tile-layer',
        'api/layer/shape-file-layer',
        'api/layer/geo-json-layer',
        'api/layer/cesium3dtileset',
        'api/layer/imagery-layer',
        'api/layer/marker-layer',
        'api/layer/globe-terrain',
        'api/layer/da-hua-video-fusion',
        'api/layer/imagery-layer-2',
      ],
    },
    {
      type: 'category',
      label: '测量绘制',
      items: [
        'api/measure/plot',
        'api/measure/edit-helper',
      ],
    },
    {
      type: 'category',
      label: '环境天气',
      items: [
        'api/weather/weather',
        'api/weather/settings',
        'api/weather/misc',
      ],
    },
    {
      type: 'category',
      label: '系统设置',
      items: [
        'api/settings/settings',
        'api/settings/settings-panel',
      ],
    },
    {
      type: 'category',
      label: '分析工具',
      items: [
        'api/analysis/tools',
        'api/analysis/excavation-analysis',
        'api/analysis/query-option',
      ],
    },
    {
      type: 'category',
      label: '辅助工具',
      items: [
        'api/utils/coord',
        'api/utils/fd-external',
      ],
    },
    {
      type: 'category',
      label: '模型操作',
      items: [
        'api/model/custom-mesh',
        'api/model/custom-object',
        'api/model/gaussian-splatting',
      ],
    },
    {
      type: 'category',
      label: '场景标记',
      items: [
        'api/marker/marker',
        'api/marker/custom-tag',
        'api/marker/marker3d',
      ],
    },
    {
      type: 'category',
      label: '矢量图形',
      items: [
        'api/vector/polyline',
        'api/vector/odline',
        'api/vector/topology-line',
        'api/vector/polygon',
        'api/vector/polygon3d',
        'api/vector/spline-mesh',
        'api/vector/guide-line',
        'api/vector/vector-field',
        'api/vector/tag',
      ],
    },
    {
      type: 'category',
      label: '覆盖物',
      items: [
        'api/overlay/decal',
        'api/overlay/heatmap',
        'api/overlay/heatmap3d',
        'api/overlay/highlight-area',
        'api/overlay/video-projection',
        'api/overlay/panorama',
        'api/overlay/light',
        'api/overlay/radiation-point',
      ],
    },
    {
      type: 'category',
      label: '海洋气象仿真',
      items: [
        'api/ocean/ocean-heatmap',
        'api/ocean/coastline',
      ],
    },
    {
      type: 'category',
      label: '水文仿真',
      items: [
        'api/hydro/dynamic-water',
        'api/hydro/flood-fill',
        'api/hydro/water-flow-field',
        'api/hydro/water-mesh',
        'api/hydro/hydrodynamic1d',
        'api/hydro/hydrodynamic2d',
        'api/hydro/hydrodynamic-model',
        'api/hydro/hydrodynamic-model-2',
        'api/hydro/smoothed-particle-hydrodynamics',
        'api/hydro/river',
        'api/hydro/fluid',
      ],
    },
    {
      type: 'category',
      label: '信号仿真',
      items: [
        'api/signal/antenna',
        'api/signal/beam',
        'api/signal/signal-wave',
      ],
    },
    {
      type: 'category',
      label: '交通仿真',
      items: [
        'api/traffic/vehicle',
        'api/traffic/vehicle-2',
        'api/traffic/train',
        'api/traffic/drone',
        'api/traffic/traffic-simulation',
        'api/traffic/satellite',
        'api/traffic/box-trigger',
      ],
    },
    {
      type: 'category',
      label: '有限元仿真',
      items: [
        'api/fem/finite-element',
        'api/fem/finite-element-2',
      ],
    },
    {
      type: 'category',
      label: '战场仿真',
      items: [
        'api/battle/plot',
        'api/battle/battlefield-simulation',
      ],
    },
    {
      type: 'category',
      label: '参考',
      items: [
        'api/types',
      ],
    },
  ],
};

module.exports = sidebars;
