import json

nav = json.load(open('nav_data.json', encoding='utf-8'))['CATEGORIES']

CLASS_FILE_MAP = {
    'Camera':'camera','CameraTour':'camera-tour','CameraTourData':'camera-tour-data','CameraTourKeyFrame':'camera-tour-key-frame',
    'DigitalTwinAPI':'digital-twin-api','DigitalTwinPlayer':'digital-twin-player',
    'BaseObject':'base-object','Coord':'coord',
    'TileLayer':'tile-layer','Cesium3DTileset':'cesium3dtileset','GeoJSONLayer':'geo-json-layer',
    'ShapeFileLayer':'shape-file-layer','ImageryLayer':'imagery-layer','ImageryLayer2':'imagery-layer-2',
    'MarkerLayer':'marker-layer','GlobeTerrain':'globe-terrain','DaHuaVideoFusion':'da-hua-video-fusion',
    'InfoTree':'info-tree','Settings':'settings','SettingsPanel':'settings-panel',
    'Weather':'weather','Misc':'misc','GaussianSplatting':'gaussian-splatting',
    'Plot':'plot','FdExternal':'fd-external','ExcavationAnalysis':'excavation-analysis',
    'EditHelper':'edit-helper','QueryOption':'query-option','Tools':'tools',
    'FloodFill':'flood-fill','DynamicWater':'dynamic-water','WaterMesh':'water-mesh',
    'WaterFlowField':'water-flow-field','River':'river','Fluid':'fluid',
    'HydroDynamic1D':'hydrodynamic1d','HydroDynamic2D':'hydrodynamic2d',
    'HydrodynamicModel':'hydrodynamic-model','HydrodynamicModel2':'hydrodynamic-model-2',
    'TrafficSimulation':'traffic-simulation','BattlefieldSimulation':'battlefield-simulation',
    'Vehicle':'vehicle','Vehicle2':'vehicle-2','Drone':'drone','Train':'train',
    'Satellite':'satellite','FiniteElement':'finite-element','FiniteElement2':'finite-element-2',
    'BoxTrigger':'box-trigger','SmoothedParticleHydrodynamics':'smoothed-particle-hydrodynamics',
    'Tag':'tag','CustomTag':'custom-tag','Polygon':'polygon','Polygon3D':'polygon3d',
    'Polyline':'polyline','HeatMap':'heatmap','HeatMap3D':'heatmap3d','ODLine':'odline',
    'HighlightArea':'highlight-area','Decal':'decal','Beam':'beam','SignalWave':'signal-wave',
    'RadiationPoint':'radiation-point','VectorField':'vector-field','TopologyLine':'topology-line',
    'SplineMesh':'spline-mesh','Light':'light','Panorama':'panorama',
    'VideoProjection':'video-projection','CustomMesh':'custom-mesh','CustomObject':'custom-object',
    'OceanHeatMap':'ocean-heatmap','GuideLine':'guide-line','Marker':'marker','Marker3D':'marker3d',
}

lines = [
    '// @ts-check',
    '',
    "/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */",
    'const sidebars = {',
    '  tutorialSidebar: [',
]
seen = set()
for cat in nav:
    lines.append('    {')
    lines.append("      type: 'category',")
    lines.append("      label: '" + cat['label'] + "',")
    items = [i for i in cat['items'] if i.get('html_class') and i['html_class'] not in seen]
    for i in items:
        seen.add(i['html_class'])
    if items:
        lines.append('      items: [')
        for i in items:
            fname = CLASS_FILE_MAP.get(i['html_class'], i['html_class'].lower())
            doc_id = 'api/' + cat['id'] + '/' + fname
            lines.append("        '" + doc_id + "',")
        lines.append('      ],')
    lines.append('    },')
lines.append('  ],')
lines.append('};')
lines.append('')
lines.append('module.exports = sidebars;')

with open('sidebars.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print('sidebars.js regenerated')
