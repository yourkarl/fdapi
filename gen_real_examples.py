# -*- coding: utf-8 -*-
"""生成 src/data/real-examples.js —— 在线调试台示例库
导航结构：按 参考资料/API样例导航结构设计.md 的功能分类组织
示例来源（权威源）：
  参考资料/API原始参考文档/doc/scripts/page_content.js          类/方法中文标签与tip
  参考资料/API原始参考文档/doc/scripts/api_examples.js           投影坐标系示例
  参考资料/API原始参考文档/doc/scripts/api_examples_ellipsoid.js 球面坐标系示例
用法：python3 gen_real_examples.py
"""
import re, json, os, textwrap
from gen_utils import atomic_write

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = os.path.join(HERE, '参考资料', 'API原始参考文档', 'doc', 'scripts')

# ---------- 1. 示例函数体 ----------
FUNC_LINE = re.compile(r'^(async\s+)?function\s+([\w$]+)\s*\(', re.M)

def parse_functions(path):
    s = open(path, encoding='utf-8').read()
    out = {}
    ms = list(FUNC_LINE.finditer(s))
    for i, m in enumerate(ms):
        block = s[m.start(): ms[i+1].start() if i+1 < len(ms) else len(s)]
        n1, n2 = block.find('{'), block.rfind('}')
        if n1 == -1 or n2 <= n1:
            continue
        body = textwrap.dedent(block[n1+1:n2].strip('\n')).strip()
        if body:
            out[m.group(2)] = body
    return out

funcs = parse_functions(os.path.join(SCRIPTS, 'api_examples.js'))
funcs.update(parse_functions(os.path.join(SCRIPTS, 'api_examples_ellipsoid.js')))

# ---------- 2. page_content：fname → (中文标签, tip)；class → [fname] ----------
pc = open(os.path.join(SCRIPTS, 'page_content.js'), encoding='utf-8').read()
i_pcs, i_gcs = pc.index('<div id="pcs">'), pc.index('<div id="gcs">')
SECTIONS = {'pcs': pc[i_pcs:i_gcs], 'gcs': pc[i_gcs:]}

CLASS_RE = re.compile(r'<div id="((?:ellipsoid_)?a_([^"]+))"')
LINK_RE = re.compile(r'<a\s+id="(test_[\w$]+)"[^>]*>(.*?)</a>', re.S)
TIP_RE = re.compile(r'data-tip="([^"]*)"')
TAG_RE = re.compile(r'<[^>]+>')

def clean_text(t):
    t = TAG_RE.sub('', t)
    for a, b in (('&nbsp;', ' '), ('&emsp;', ' '), ('&amp;', '&'), ('&lt;', '<'), ('&gt;', '>')):
        t = t.replace(a, b)
    return re.sub(r'\s+', ' ', t).strip()

def parse_section(html):
    labels = {}      # fname -> (label, tip)
    classfns = {}    # className -> [fname...]
    ms = list(CLASS_RE.finditer(html))
    for i, m in enumerate(ms):
        cls = m.group(2)
        seg = html[m.start(): ms[i+1].start() if i+1 < len(ms) else len(html)]
        fns = []
        for lm in LINK_RE.finditer(seg):
            fname, inner = lm.group(1), lm.group(2)
            a_tag = seg[lm.start():seg.index('>', lm.start())+1]
            tipm = TIP_RE.search(a_tag)
            labels[fname] = (clean_text(inner) or fname, tipm.group(1) if tipm else '')
            fns.append(fname)
        classfns.setdefault(cls, []).extend(fns)
    return labels, classfns

INFO = {k: parse_section(v) for k, v in SECTIONS.items()}

# ---------- 3. 导航设计（来自 API样例导航结构设计.md） ----------
# 选择器：'Class:*' 取该类全部示例；'suffix' 精确函数名(去 test_/test_ellipsoid_ 前缀)；'prefix*' 前缀匹配
NAV = [
('快速上手', '🚀', [
  ('产品概览', ['ac_getVersion', 'ac_getProjectInfo', 'ac_reset', 'ac_saveProject', 'ac_destroy']),
  ('安装引用', ['DigitalTwinPlayer:*']),
  ('事件监听（Tick/JS注入）', ['ac_registerTick', 'ac_removeTick', 'ac_showTickWindow', 'ac_executeJsInTickPage']),
]),
('相机操作', '📷', [
  ('查询相机', ['camera_get', 'camera_getEulerAngle']),
  ('设置相机', ['camera_set', 'camera_set_byArray', 'camera_set_byObject', 'camera_lookAt', 'camera_lookAtBBox1', 'camera_lookAtBBox2',
              'camera_move*', 'camera_turn*', 'camera_stop', 'camera_cancelFollow', 'camera_enterWorld', 'camera_exitWorld', 'camera_exportOrthoImage']),
  ('锁定交互范围', ['camera_lockBBox', 'camera_unLockBBox']),
  ('相机环绕', ['camera_flyAround']),
  ('相机动画与导览', ['camera_getAnimationList', 'camera_getAnimationImage', 'camera_playAnimation', 'camera_pauseAnimation',
                  'camera_resumeAnimation', 'camera_stopAnimation', 'CameraTour:*']),
  ('多视口', ['misc_enterMultiViewportMode', 'misc_setMultiviewportInteractSync', 'misc_setActiveViewport',
            'misc_getActiveViewport', 'misc_exitMultiViewportMode']),
]),
('事件系统', '⚡', [
  ('绘制事件（EditHelper）', ['EditHelper:*']),
]),
('测量绘制', '📏', [
  ('测量工具', ['tools_startMeasurement', 'tools_startMeasurement1', 'tools_stopMeasurement', 'tools_showMeasurePanel']),
  ('绘制助手', ['tools_startGeometryEdit', 'tools_stopGeometryEdit']),
  ('态势标绘', ['Plot:*']),
  ('剖切', ['tools_startPolygonClip', 'tools_stopPolygonClip', 'tools_startPlaneClip', 'tools_stopPlaneClip',
          'tools_startVolumeClip', 'tools_updateVolumeClip', 'tools_stopVolumeClip', 'tools_showClipPanel']),
  ('求交', ['tools_lineIntersect', 'tools_linesIntersect']),
]),
('环境天气', '🌤️', [
  ('昼夜模拟', ['weather_setDateTime', 'weather_getDateTime', 'weather_simulateTime']),
  ('黑暗模式', ['weather_setDarkMode']),
  ('大气', ['weather_setRayleighScatterCoeff', 'weather_setSkyVisibleMaxHeight', 'weather_setEarth*']),
  ('云效', ['weather_setCloudDensity', 'weather_setCloudThickness', 'weather_setCloudParam', 'weather_setLowCloud', 'weather_setHighCloud']),
  ('雨效', ['weather_setRainParam', 'weather_disableRainSnow']),
  ('雪效', ['weather_setSnowParam']),
  ('雾效', ['weather_setFogParam']),
  ('环境光', ['weather_setAmbientLightIntensity', 'weather_setTemperature', 'weather_getParams']),
  ('阴影', ['weather_setShadow*']),
  ('太阳', ['weather_setSun*']),
  ('月亮', ['weather_setMoon*']),
]),
('系统设置', '⚙️', [
  ('相机设置', ['settings_setFovX', 'settings_setNearClipPlane', 'settings_setMinCameraHeight', 'settings_setMaxCameraHeight',
             'settings_setEnableCameraMovingEvent']),
  ('系统UI设置', ['settings_setMainUIVisibility', 'settings_setJoystickVisible', 'settings_setToolbarVisible',
              'setings_setMainPanelPos', 'setings_showPropertiesPanel', 'setings_hidePropertiesPanel',
              'setings_setPropertiesPanelPos', 'settings_setCampassVisible', 'settings_setCampassPosition',
              'tools_showUIPanel', 'tools_hideUIPanel', 'tools_getUIPanel']),
  ('鼠标设置', ['settings_setMousePickMask', 'settings_setMouseHoverTime', 'settings_setMouseMoveTime',
             'settings_setCursorAutoSync', 'settings_enableMouseRightClick', 'settings_setAutoRotateOnRightDoubleClick']),
  ('交互设置', ['settings_setEnableInteract', 'settings_setInteractiveMode', 'settings_getInteractiveMode',
             'settings_setMapMode', 'settings_getMapMode']),
  ('图层服务设置', ['settings_getVTPK', 'settings_setVTPK', 'settings_removeVTPK', 'settings_setLabelLayer*',
               'settings_setWMTSLayer*', 'settings_setGroundHeight', 'settings_setImageryLayerLevelOffset',
               'settings_getProjectWKT', 'settings_setLabelScale']),
  ('人物漫游', ['settings_setCharacterRoaming', 'settings_setRoleGender', 'settings_setRoamViewMode', 'settings_setMoveSpeed',
             'settings_setYawSpeed', 'settings_setCharacterAssetPath', 'settings_setDroneAssetPath', 'settings_setPlayerName']),
  ('渲染与后处理', ['settings_setHighlightColor', 'settings_setOceanColor', 'settings_setGlobalIllumination',
               'settings_setChromaticAberration', 'settings_setAmbient*', 'settings_setExposure*', 'settings_setDepthFiethSwitch',
               'settings_setFocalLength', 'settings_setAperture', 'settings_setDeepBlur', 'settings_setDofMode',
               'settings_setContrast', 'settings_setSaturation', 'settings_setTonemapper', 'settings_setLut*',
               'settings_setLensFlareIntensity', 'settings_setBloomIntensity', 'settings_setDarkCorner',
               'settings_setPostProcessEffects', 'settings_setScreenPercentage', 'settings_setAntiAliasing', 'settings_setTerrainAlpha',
               'settings_setTerrainGlobal*', 'settings_setOsgbGlobal*', 'settings_setReceiveDecalMode']),
  ('功能面板', ['SettingsPanel:*']),
]),
('分析工具', '🔍', [
  ('天际线分析', ['tools_startSkylineAnalysis', 'tools_stopSkylineAnalysis', 'tools_exportSkyline']),
  ('坡度坡向分析', ['tools_startTerrainSlopeAnalysis', 'tools_stopTerrainSlopeAnalysis',
               'tools_startContourLineAnalysis', 'tools_stopContourLineAnalysis']),
  ('可视域分析', ['tools_startViewshedAnalysis', 'tools_stopViewshedAnalysis', 'tools_startVisiblityAnalysis',
             'tools_stopVisiblityAnalysis', 'tools_startViewDomeAnalysis', 'tools_stopViewDomeAnalysis']),
  ('日照分析', ['tools_startSunshineAnalysis', 'tools_stopSunshineAnalysis']),
  ('填挖方分析', ['tools_startCutFillAnalysis', 'tools_stopCutFillAnalysis']),
  ('河道断面', ['tools_riverCrossSectionByShp', 'tools_riverCrossSection']),
]),
('辅助工具', '🧰', [
  ('坐标转换', ['Coord:*']),
  ('射线求交', ['tools_lineIntersect', 'tools_linesIntersect']),
  ('图片按钮', ['misc_addImageButton', 'misc_deleteImageButton', 'misc_addAnimatedImageButton']),
  ('汇报模式', ['misc_enterReportMode', 'misc_setReportModeAlign', 'misc_setReportModePlayMode',
            'misc_setReportModeViewPortLinkage', 'misc_exitReportMode']),
  ('其他工具', ['misc_getConvexPolygon', 'misc_getMaterial', 'misc_hideAllFoliages', 'misc_showAllFoliages',
            'misc_projectCount', 'misc_projectCountAll', 'misc_reloadPak']),
]),
('图层操作', '🗂️', [
  ('显隐对象', ['tileLayer_actor_hide', 'tileLayer_actor_show', 'tileLayer_actors_hide', 'tileLayer_actors_show',
            'tileLayer_actor_hideAllActors', 'tileLayer_actor_showAllActors', 'tileLayer_hide', 'tileLayer_show']),
  ('显隐文件夹', ['layers_show', 'layers_hide']),
  ('定位对象', ['layers_focus', 'tileLayer_focus', 'tileLayer_actor_focus', 'tileLayer_actors_focus']),
  ('查询图层树', ['layers_get']),
  ('查询蓝图函数', ['layers_getBPFunction', 'misc_getBPFunction']),
  ('调用蓝图函数', ['layers_callBPFunction', 'misc_callBPFunction']),
  ('三维图层（TileLayer）', ['TileLayer:*']),
  ('压平挖洞', ['tileLayer_modifier_*', 'tileLayer_hole_*']),
  ('矢量SHP图层', ['ShapeFileLayer:*']),
  ('GeoJSON图层', ['GeoJSONLayer:*']),
  ('Cesium图层', ['Cesium3DTileset:*']),
  ('OGC栅格图层', ['ImageryLayer:*', 'ImageryLayer2:*']),
  ('地球地形（GlobeTerrain）', ['GlobeTerrain:*']),
  ('标注图层', ['MarkerLayer:*']),
]),
('模型操作', '🧊', [
  ('自定义模型', ['CustomObject:*']),
  ('高斯泼溅模型', ['GaussianSplatting:*']),
  ('超欠挖分析模型', ['ExcavationAnalysis:*']),
]),
('场景标记', '📍', [
  ('文字标签（Tag）', ['Tag:*']),
  ('图文标注（Marker）', ['Marker:*']),
  ('自定义弹窗', ['CustomTag:*']),
  ('视频弹窗', ['misc_playVideo', 'misc_stopPlayVideo', 'misc_playMovie', 'misc_stopMovie',
            'misc_playVideoAlone', 'misc_stopPlayVideoAlone']),
  ('三维标注', ['Marker3D:*']),
  ('图片(网页)纹理替换', ['tools_replaceTextureByVideo', 'tools_replaceTextureByImage', 'tools_replaceTextureByUrl', 'tools_restoreTexture']),
]),
('矢量图形', '📐', [
  ('折线', ['Polyline:*']),
  ('引导线', ['GuideLine:*']),
  ('迁徙线（ODLine）', ['ODLine:*']),
  ('拓扑线', ['TopologyLine:*']),
  ('多边形', ['Polygon:*']),
  ('三维多边形', ['Polygon3D:*']),
  ('自定义网格', ['CustomMesh:*']),
  ('路径模型（样条网格线）', ['SplineMesh:*']),
]),
('覆盖物', '🎨', [
  ('贴花', ['Decal:*']),
  ('热力图', ['HeatMap:*']),
  ('三维热力图', ['HeatMap3D:*']),
  ('高亮区域', ['HighlightArea:*']),
  ('视频投影', ['VideoProjection:*']),
  ('大华视频融合', ['DaHuaVideoFusion:*']),
  ('全景图', ['Panorama:*']),
  ('光源', ['Light:*']),
  ('辐射圈', ['RadiationPoint:*']),
]),
('海洋气象仿真', '🌊', [
  ('波浪', ['oceanHeatmap_add_wave', 'weather_setOceanWave', 'weather_getOceanWave']),
  ('洋流', ['oceanHeatmap_add_flow']),
  ('城市/箭头风场', ['oceanHeatmap_add_arrow']),
  ('向量场（风场/洋流/海浪）', ['VectorField:*']),
  ('烟雾场（流体）', ['Fluid:*']),
  ('海洋热力图', ['oceanHeatmap_update_new', 'oceanHeatmap_delete_new', 'oceanHeatmap_clear_new', 'oceanHeatmap_focus_new',
             'oceanHeatmap_show_new', 'oceanHeatmap_hide_new', 'oceanHeatmap_get_new']),
  ('海岸线', ['Coastline:*']),
]),
('水文仿真', '💧', [
  ('动态水', ['DynamicWater:*']),
  ('水淹分析', ['FloodFill:*', 'tools_startFloodFill', 'tools_stopFloodFill']),
  ('水流场', ['WaterFlowField:*']),
  ('三维水体', ['WaterMesh:*']),
  ('一维水动力模型', ['HydroDynamic1D:*']),
  ('二维水动力模型', ['HydroDynamic2D:*']),
  ('光滑粒子流体动力学仿真', ['SmoothedParticleHydrodynamics:*']),
]),
('信号仿真', '📡', [
  ('天线方向图', ['Antenna:*']),
  ('信号波束', ['Beam:*']),
  ('信号波', ['SignalWave:*']),
]),
('交通仿真', '🚦', [
  ('微观-载具', ['Vehicle:*']),
  ('微观-高级载具', ['Vehicle2:*']),
  ('微观-高铁', ['Train:*']),
  ('微观-无人机', ['Drone:*']),
  ('宏观-城市交通', ['TrafficSimulation:*']),
  ('卫星（Satellite）', ['Satellite:*']),
  ('触发器（BoxTrigger）', ['BoxTrigger:*']),
]),
('有限元仿真', '🧮', [
  ('有限元仿真', ['FiniteElement:*']),
  ('增强型有限元仿真', ['FiniteElement2:*']),
]),
('战场仿真', '🎯', [
  ('态势标绘', ['Plot:*']),
  ('战场仿真', ['BattlefieldSimulation:*']),
]),
('压力测试', '⚡', [
  ('压力测试', ['压力测试:*']),
]),
]

# ---------- 4. 组装两套树 ----------
def build(prefix):
    labels, classfns = INFO[prefix]
    pre = 'test_' if prefix == 'pcs' else 'test_ellipsoid_'

    def resolve(sel):
        if sel.endswith(':*'):
            cls = sel[:-2]
            return classfns.get(cls, [])
        if sel.endswith('*'):
            p = pre + sel[:-1]
            return [f for f in labels if f.startswith(p)]
        f = pre + sel
        return [f] if f in labels else []

    cats = []
    for ci, (clabel, icon, items) in enumerate(NAV):
        cat = {'id': '%s-%d' % (prefix, ci), 'label': clabel, 'icon': icon, 'items': []}
        for ii, (ilabel, sels) in enumerate(items):
            seen, methods = set(), []
            for sel in sels:
                for f in resolve(sel):
                    if f in seen or f not in funcs:
                        continue
                    seen.add(f)
                    lb, tip = labels.get(f, (f, ''))
                    methods.append({'name': lb, 'tip': tip, 'code': funcs[f]})
            if methods:
                cat['items'].append({'id': '%s-%d-%d' % (prefix, ci, ii), 'name': ilabel,
                                     'desc': '', 'className': '', 'methods': methods})
        if cat['items']:
            cats.append(cat)
    return cats

pcs, gcs = build('pcs'), build('gcs')

out = ('// 自动生成：导航按 API样例导航结构设计.md 组织，示例来自 api_examples(.ellipsoid).js\n'
       '// 重新生成：python3 gen_real_examples.py\n'
       '/* eslint-disable */\n'
       'export const SANDBOX_CATEGORIES = ' + json.dumps(pcs, ensure_ascii=False) + ';\n'
       'export const SANDBOX_CATEGORIES_GCS = ' + json.dumps(gcs, ensure_ascii=False) + ';\n')
atomic_write(os.path.join(HERE, 'src', 'data', 'real-examples.js'), out)

def stat(cats):
    return (len(cats), sum(len(c['items']) for c in cats),
            sum(len(i['methods']) for c in cats for i in c['items']))
print('投影: 分类=%d 项=%d 示例=%d' % stat(pcs))
print('球面: 分类=%d 项=%d 示例=%d' % stat(gcs))

# 覆盖率：源里有但未挂到导航的函数
used = {None}
for t in (pcs, gcs):
    for c in t:
        for i in c['items']:
            used.update(None for _ in ())  # noop
all_used = set()
for t in (pcs, gcs):
    for c in t:
        for i in c['items']:
            for m in i['methods']:
                pass
# 简化：按 labels 全集对比
for prefix in ('pcs', 'gcs'):
    labels, _ = INFO[prefix]
    tree = pcs if prefix == 'pcs' else gcs
    used_names = set()
    for c in tree:
        for i in c['items']:
            for m in i['methods']:
                used_names.add(m['name'])
    total = [f for f in labels if f in funcs]
    used_cnt = sum(1 for f in total if labels[f][0] in used_names)
    print('%s 覆盖: %d/%d' % (prefix, used_cnt, len(total)))
