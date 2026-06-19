// ============================================================
// get* 接口返回结构探测脚本
// 用法：连上视频流、场景就绪(onReady)后，整段粘入调试台「执行JS」运行。
//   - 第一部分自动调用所有「无需额外参数」的 get 方法并打印返回结构；
//   - 第二部分是「需要 id/参数」的 get 方法模板，请填入真实 id 后逐个运行。
// 把日志面板输出整体复制回来即可，我据此补全各方法的返回值结构。
// ============================================================

(async () => {
  const dump = async (name, p) => {
    try { const r = await p; log(name + " => " + JSON.stringify(r)); }
    catch (e) { log(name + " [ERR] " + (e && e.message)); }
  };

  // —— 第一部分：无需额外参数，自动探测（22 个）——
  await dump("getPlayer", fdapi.getPlayer());
  await dump("getProjectInfo", fdapi.getProjectInfo());
  await dump("getVersion", fdapi.getVersion());
  await dump("camera.get", fdapi.camera.get());
  await dump("camera.getAnimationList", fdapi.camera.getAnimationList());
  await dump("infoTree.get", fdapi.infoTree.get());
  await dump("misc.getActiveViewport", fdapi.misc.getActiveViewport());
  await dump("settings.getCharacterAssetPath", fdapi.settings.getCharacterAssetPath());
  await dump("settings.getDroneAssetPath", fdapi.settings.getDroneAssetPath());
  await dump("settings.getInteractiveMode", fdapi.settings.getInteractiveMode());
  await dump("settings.getLabelLayer", fdapi.settings.getLabelLayer());
  await dump("settings.getMapMode", fdapi.settings.getMapMode());
  await dump("settings.getProjectWKT", fdapi.settings.getProjectWKT());
  await dump("settingsPanel.getCameraMode", fdapi.settingsPanel.getCameraMode());
  await dump("settingsPanel.getControlMode", fdapi.settingsPanel.getControlMode());
  await dump("settingsPanel.getMapMode", fdapi.settingsPanel.getMapMode());
  await dump("settingsPanel.getPostProcessMode", fdapi.settingsPanel.getPostProcessMode());
  await dump("settingsPanel.getReportMode", fdapi.settingsPanel.getReportMode());
  await dump("tileLayer.getAllFlattenInfo", fdapi.tileLayer.getAllFlattenInfo());
  await dump("weather.getDateTime", fdapi.weather.getDateTime());
  await dump("weather.getOceanWave", fdapi.weather.getOceanWave());
  await dump("weather.getParams", fdapi.weather.getParams());

  log("==== 自动探测完成，请复制以上输出 ====");
})();

/* —— 第二部分：需填参数的 get 方法（69 个）——
   取消注释并把 /*参数*/ 换成真实值(如对象 id)，逐个运行：

// await fdapi.Drone.get(/*ids*/, (r)=>log("Drone.get => "+JSON.stringify(r)));
// await fdapi.HydrodynamicModel.get(/*ids*/, (r)=>log("HydrodynamicModel.get => "+JSON.stringify(r)));
// await fdapi.HydrodynamicModel2.get(/*ids*/, (r)=>log("HydrodynamicModel2.get => "+JSON.stringify(r)));
// await fdapi.antenna.get(/*ids*/, (r)=>log("antenna.get => "+JSON.stringify(r)));
// await fdapi.beam.get(/*ids*/, (r)=>log("beam.get => "+JSON.stringify(r)));
// await fdapi.boxTrigger.get(/*ids*/, (r)=>log("boxTrigger.get => "+JSON.stringify(r)));
// await fdapi.camera.getAnimationImage(/*name*/, (r)=>log("camera.getAnimationImage => "+JSON.stringify(r)));
// await fdapi.camera.getEulerAngle(/*startPoint*/, /*endPoint*/, (r)=>log("camera.getEulerAngle => "+JSON.stringify(r)));
// await fdapi.cesium3DTileset.get(/*ids*/, (r)=>log("cesium3DTileset.get => "+JSON.stringify(r)));
// await fdapi.coastline.get(/*ids*/, (r)=>log("coastline.get => "+JSON.stringify(r)));
// await fdapi.coastline.getBPFunction(/*ids*/, (r)=>log("coastline.getBPFunction => "+JSON.stringify(r)));
// await fdapi.customMesh.get(/*ids*/, (r)=>log("customMesh.get => "+JSON.stringify(r)));
// await fdapi.customObject.get(/*ids*/, (r)=>log("customObject.get => "+JSON.stringify(r)));
// await fdapi.customObject.getBPFunction(/*ids*/, (r)=>log("customObject.getBPFunction => "+JSON.stringify(r)));
// await fdapi.customTag.get(/*ids*/, (r)=>log("customTag.get => "+JSON.stringify(r)));
// await fdapi.daHuaVideoFusion.get(/*ids*/, (r)=>log("daHuaVideoFusion.get => "+JSON.stringify(r)));
// await fdapi.decal.get(/*ids*/, (r)=>log("decal.get => "+JSON.stringify(r)));
// await fdapi.drone.get(/*ids*/, (r)=>log("drone.get => "+JSON.stringify(r)));
// await fdapi.dynamicWater.get(/*ids*/, (r)=>log("dynamicWater.get => "+JSON.stringify(r)));
// await fdapi.excavationAnalysis.get(/*ids*/, (r)=>log("excavationAnalysis.get => "+JSON.stringify(r)));
// await fdapi.finiteElement.get(/*ids*/, (r)=>log("finiteElement.get => "+JSON.stringify(r)));
// await fdapi.finiteElement2.get(/*ids*/, (r)=>log("finiteElement2.get => "+JSON.stringify(r)));
// await fdapi.floodFill.get(/*ids*/, (r)=>log("floodFill.get => "+JSON.stringify(r)));
// await fdapi.fluid.get(/*ids*/, (r)=>log("fluid.get => "+JSON.stringify(r)));
// await fdapi.gaussianSplatting.get(/*ids*/, (r)=>log("gaussianSplatting.get => "+JSON.stringify(r)));
// await fdapi.guideLine.get(/*ids*/, (r)=>log("guideLine.get => "+JSON.stringify(r)));
// await fdapi.heatmap.get(/*ids*/, (r)=>log("heatmap.get => "+JSON.stringify(r)));
// await fdapi.heatmap3d.get(/*ids*/, (r)=>log("heatmap3d.get => "+JSON.stringify(r)));
// await fdapi.highlightArea.get(/*ids*/, (r)=>log("highlightArea.get => "+JSON.stringify(r)));
// await fdapi.hydrodynamic1d.get(/*ids*/, (r)=>log("hydrodynamic1d.get => "+JSON.stringify(r)));
// await fdapi.hydrodynamic2d.get(/*ids*/, (r)=>log("hydrodynamic2d.get => "+JSON.stringify(r)));
// await fdapi.infoTree.getBPFunction(/*ids*/, (r)=>log("infoTree.getBPFunction => "+JSON.stringify(r)));
// await fdapi.light.get(/*ids*/, (r)=>log("light.get => "+JSON.stringify(r)));
// await fdapi.marker.get(/*ids*/, (r)=>log("marker.get => "+JSON.stringify(r)));
// await fdapi.marker3d.get(/*ids*/, (r)=>log("marker3d.get => "+JSON.stringify(r)));
// await fdapi.marker3d.getBPFunction(/*ids*/, (r)=>log("marker3d.getBPFunction => "+JSON.stringify(r)));
// await fdapi.misc.getBPFunction(/*assetPath*/, (r)=>log("misc.getBPFunction => "+JSON.stringify(r)));
// await fdapi.misc.getConvexPolygon(/*pointArray*/, (r)=>log("misc.getConvexPolygon => "+JSON.stringify(r)));
// await fdapi.misc.getMaterial(/*materialPath*/, (r)=>log("misc.getMaterial => "+JSON.stringify(r)));
// await fdapi.oceanHeatmap.get(/*ids*/, (r)=>log("oceanHeatmap.get => "+JSON.stringify(r)));
// await fdapi.odline.get(/*ids*/, (r)=>log("odline.get => "+JSON.stringify(r)));
// await fdapi.panorama.get(/*ids*/, (r)=>log("panorama.get => "+JSON.stringify(r)));
// await fdapi.plot.get(/*ids*/, (r)=>log("plot.get => "+JSON.stringify(r)));
// await fdapi.plot.getStrokeCoordinates(/*ids*/, (r)=>log("plot.getStrokeCoordinates => "+JSON.stringify(r)));
// await fdapi.polygon.get(/*ids*/, (r)=>log("polygon.get => "+JSON.stringify(r)));
// await fdapi.polygon3d.get(/*ids*/, (r)=>log("polygon3d.get => "+JSON.stringify(r)));
// await fdapi.polyline.get(/*ids*/, (r)=>log("polyline.get => "+JSON.stringify(r)));
// await fdapi.radiationPoint.get(/*ids*/, (r)=>log("radiationPoint.get => "+JSON.stringify(r)));
// await fdapi.river.get(/*ids*/, (r)=>log("river.get => "+JSON.stringify(r)));
// await fdapi.shapeFileLayer.get(/*ids*/, (r)=>log("shapeFileLayer.get => "+JSON.stringify(r)));
// await fdapi.shapeFileLayer.getFeature(/*data*/, (r)=>log("shapeFileLayer.getFeature => "+JSON.stringify(r)));
// await fdapi.signalWave.get(/*ids*/, (r)=>log("signalWave.get => "+JSON.stringify(r)));
// await fdapi.smoothedParticleHydrodynamics.get(/*ids*/, (r)=>log("smoothedParticleHydrodynamics.get => "+JSON.stringify(r)));
// await fdapi.splineMesh.get(/*ids*/, (r)=>log("splineMesh.get => "+JSON.stringify(r)));
// await fdapi.splineMesh.getBPFunction(/*ids*/, (r)=>log("splineMesh.getBPFunction => "+JSON.stringify(r)));
// await fdapi.tag.get(/*ids*/, (r)=>log("tag.get => "+JSON.stringify(r)));
// await fdapi.tileLayer.get(/*ids*/, (r)=>log("tileLayer.get => "+JSON.stringify(r)));
// await fdapi.tileLayer.getActorInfo(/*data*/, (r)=>log("tileLayer.getActorInfo => "+JSON.stringify(r)));
// await fdapi.tileLayer.getActorInfoFromDB(/*data*/, (r)=>log("tileLayer.getActorInfoFromDB => "+JSON.stringify(r)));
// await fdapi.tileLayer.getCollision(/*tileLayerIds*/, (r)=>log("tileLayer.getCollision => "+JSON.stringify(r)));
// await fdapi.tileLayer.getDBTabID(/*data*/, (r)=>log("tileLayer.getDBTabID => "+JSON.stringify(r)));
// await fdapi.tileLayer.getObjectIDs(/*ids*/, (r)=>log("tileLayer.getObjectIDs => "+JSON.stringify(r)));
// await fdapi.tools.getUIPanel(/*type*/, (r)=>log("tools.getUIPanel => "+JSON.stringify(r)));
// await fdapi.topologyLine.get(/*ids*/, (r)=>log("topologyLine.get => "+JSON.stringify(r)));
// await fdapi.train.get(/*ids*/, (r)=>log("train.get => "+JSON.stringify(r)));
// await fdapi.vectorField.get(/*ids*/, (r)=>log("vectorField.get => "+JSON.stringify(r)));
// await fdapi.vehicle2.get(/*ids*/, (r)=>log("vehicle2.get => "+JSON.stringify(r)));
// await fdapi.videoProjection.get(/*ids*/, (r)=>log("videoProjection.get => "+JSON.stringify(r)));
// await fdapi.waterFlowField.get(/*ids*/, (r)=>log("waterFlowField.get => "+JSON.stringify(r)));
*/
