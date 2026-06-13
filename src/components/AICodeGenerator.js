// ---- AI 代码生成器 ----
// 自然语言 -> API 代码转换

const AI_CODE_GENERATOR = {
  patterns: [
    {
      keywords: ['标注', '标记', '点', 'marker', '添加位置'],
      template: `// 添加标注点
api.Marker.add({
  id: 'marker-{id}',
  type: 'icon',
  coordinate: [{lon}, {lat}, 50],
  iconUrl: '/images/marker.png',
  size: [32, 32],
  popup: {
    enabled: true,
    html: '<div style="padding:8px"><b>标注点</b></div>'
  }
});`
    },
    {
      keywords: ['相机', '飞行', 'fly', 'camera', 'lookAt', '定位'],
      template: `// 飞行到目标位置
api.Camera.lookAt({
  coordinate: [{lon}, {lat}, 200],
  height: 200,
  pitch: -30,
  duration: 2.0,
  complete: () => console.log('飞行到达')
});`
    },
    {
      keywords: ['多边形', 'polygon', '区域', '面'],
      template: `// 添加多边形区域
api.Polygon.add({
  id: 'polygon-{id}',
  coordinates: [
    [{lon}, {lat}, 0],
    [{lon + 0.01}, {lat}, 0],
    [{lon + 0.01}, {lat + 0.01}, 0],
    [{lon}, {lat + 0.01}, 0]
  ],
  style: {
    fillColor: '#00d4ff',
    fillOpacity: 0.3,
    strokeColor: '#00d4ff',
    strokeWidth: 2
  }
});`
    },
    {
      keywords: ['线', '折线', 'polyline', '路径'],
      template: `// 添加折线
api.Polyline.add({
  id: 'polyline-{id}',
  coordinates: [
    [{lon}, {lat}, 10],
    [{lon + 0.01}, {lat + 0.005}, 15],
    [{lon + 0.02}, {lat + 0.01}, 20]
  ],
  color: '#00d4ff',
  width: 3
});`
    },
    {
      keywords: ['热力图', 'heatmap', '热图', '密度'],
      template: `// 添加热力图
api.HeatMap.add({
  id: 'heatmap-{id}',
  points: [
    { coordinate: [{lon}, {lat}], intensity: 1 },
    { coordinate: [{lon + 0.01}, {lat + 0.01}], intensity: 0.8 },
    { coordinate: [{lon - 0.01}, {lat + 0.01}], intensity: 0.6 }
  ],
  radius: 30,
  maxIntensity: 1,
  gradient: {
    0: 'blue',
    0.5: 'cyan',
    0.8: 'lime',
    1: 'red'
  }
});`
    },
    {
      keywords: ['雨', 'rain', '降雨'],
      template: `// 开启降雨效果
api.Weather.setRain({
  enabled: true,
  intensity: 0.8,
  speed: 15,
  dropSize: 0.3,
  splash: true,
  direction: 0
});`
    },
    {
      keywords: ['雪', 'snow', '降雪'],
      template: `// 开启降雪效果
api.Weather.setSnow({
  enabled: true,
  intensity: 0.6,
  flakeSize: 0.2,
  fallSpeed: 5,
  wind: { x: 1, y: 0, z: 0 },
  accumulation: true
});`
    },
    {
      keywords: ['雾', 'fog', '雾效'],
      template: `// 开启雾效
api.Weather.setFog({
  enabled: true,
  type: 'exponential',
  density: 0.001,
  color: '#cccccc',
  heightFog: true,
  height: 50
});`
    },
    {
      keywords: ['昼夜', '白天', '黑夜', 'night', 'day', '时间'],
      template: `// 设置时间（白天/夜晚）
api.Weather.setTime({
  hour: 14,
  minute: 30
});
api.Weather.setDayMode(); // 或 setNightMode()`
    },
    {
      keywords: ['测量', '距离', '面积', 'measure'],
      template: `// 测量距离
api.Measure.start({
  type: 'distance',
  unit: 'm',
  onMeasure: (result) => {
    console.log('测量结果:', result);
  }
});`
    },
    {
      keywords: ['剖切', '切割', 'section'],
      template: `// 模型剖切
api.Section.enable({
  direction: 'x',
  position: 0,
  showPlane: true,
  planeStyle: {
    color: 'rgba(0,212,255,0.3)'
  }
});`
    },
    {
      keywords: ['显隐', '显示', '隐藏', 'visibility', 'visible'],
      template: `// 控制对象显隐
api.Object.setVisible('{objectId}', true); // 显示
// api.Object.setVisible('{objectId}', false); // 隐藏`
    },
    {
      keywords: ['漫游', '行走', 'walk', '第一人称'],
      template: `// 启用人物漫游
api.Walk.start({
  position: [{lon}, {lat}, 2],
  speed: 5,
  enableCollision: true,
  eyeHeight: 1.7
});`
    },
  ],

  extractCoordinates(text) {
    const lonMatch = text.match(/经度[：:]?\s*(\d+\.?\d*)|lon[g]?[=]?\s*(\d+\.?\d*)/i);
    const latMatch = text.match(/纬度[：:]?\s*(\d+\.?\d*)|lat[=]?\s*(\d+\.?\d*)/i);

    return {
      lon: lonMatch ? parseFloat(lonMatch[1] || lonMatch[2]) : 113.32 + Math.random() * 0.02,
      lat: latMatch ? parseFloat(latMatch[1] || latMatch[2]) : 23.12 + Math.random() * 0.02,
    };
  },

  generate(text) {
    const lowerText = text.toLowerCase();
    const coords = this.extractCoordinates(text);
    const id = Date.now().toString(36);

    for (const pattern of this.patterns) {
      const matched = pattern.keywords.some(kw => lowerText.includes(kw.toLowerCase()));
      if (matched) {
        let code = pattern.template
          .replace(/{lon}/g, coords.lon.toFixed(4))
          .replace(/{lat}/g, coords.lat.toFixed(4))
          .replace(/{id}/g, id)
          .replace(/{objectId}/g, 'marker-001');
        return { code, matched: pattern.keywords.find(kw => lowerText.includes(kw.toLowerCase())) };
      }
    }

    return {
      code: `// 根据您的描述，生成以下代码：
// ${text}

api.Marker.add({
  id: 'generated-marker-{id}',
  coordinate: [${coords.lon.toFixed(4)}, ${coords.lat.toFixed(4)}, 50],
  text: '新标注',
  fontSize: 14
});`.replace(/{id}/g, id),
      matched: null
    };
  }
};

export default AI_CODE_GENERATOR;
