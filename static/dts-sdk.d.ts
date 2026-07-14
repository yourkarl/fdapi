// DTS Cloud SDK v7.1 —— fdapi TypeScript 类型声明（自动生成：python3 gen_dts.py）
// 用法：将本文件放入工程并在 tsconfig.json 的 include 中包含，或写 /// <reference path="./dts-sdk.d.ts" />

declare namespace fdapi {
  /** 检查API调用是否就绪 */
  function checkApiReady(): Promise<any>;
  /** 关闭WebSocket连接 */
  function destroy(): Promise<any>;
  /** 在tick页面里执行Javascript代码 */
  function executeJsInTickPage(code?: string, fn?: (...args: any[]) => void): Promise<any>;
  /** 获取DigitalTwinAPI所关联的DigitalTwinPlayer对象，如果只是纯接口调用，则返回null. */
  function getPlayer(): Promise<any>;
  /** 获取工程信息 */
  function getProjectInfo(): Promise<any>;
  /** 获取SDK的完整版本号，例如：5.3.0413 */
  function getVersion(): Promise<any>;
  /** 注册要进行同步的对象 */
  function registerSyncObjects(): Promise<any>;
  /** 注册每帧渲染时要执行的JS脚本 */
  function registerTick(url?: string, options?: boolean, fn?: (...args: any[]) => void): Promise<any>;
  /** 移除每帧渲染时执行的JS脚本 */
  function removeTick(fn?: (...args: any[]) => void): Promise<any>;
  /** 对三维场景执行重置操作 */
  function reset(type?: any, fn?: (...args: any[]) => void): Promise<any>;
  /** 保存场景（只保存场景设置，不保存接口创建的对象） */
  function saveProject(fn?: (...args: any[]) => void): Promise<any>;
  /** 开启接口别名（不建议使用） */
  function setEnableAliases(): Promise<any>;
  /** 设置三维事件（例如相机飞行开始、结束、Actor的点击等）的回调函数 */
  function setEventCallback(fn?: (...args: any[]) => void): Promise<any>;
  /** 设置主机地址 */
  function setHost(ip?: string, port?: number): Promise<any>;
  /** 显示/隐藏tick调试窗口。 该方法既可以在客户端调用，也可以在tick调试窗口调用 */
  function showTickWindow(visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;

  /** Antenna 以方向图形式可视化天线的辐射/增益方向特性。 */
  namespace antenna {
    /** 添加一个或多个天线方向图对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的天线方向图对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个天线方向图对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据天线方向图ID获取天线方向图的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏天线方向图 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示天线方向图 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个天线方向图对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** BattlefieldSimulation 加载并驱动装甲车、坦克、无人机、士兵等作战单元，模拟战场机动、编队与态势演进。 */
  namespace battlefieldSimulation {
    /** 初始化一个BattlefieldSimulation对象 */
    function add(battlefieldSimulation?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个BattlefieldSimulation对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], distanceRotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 更新一个时刻的BattlefieldSimulation对象 */
    function update(battlefieldSimulation?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Beam 可视化雷达/通信波束的指向、形状与扫描，表达探测/覆盖扇区。 */
  namespace beam {
    /** 添加一个或多个Beam对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Beam */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Beam对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Beam的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Beam */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有Beam */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Color */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Coordinates */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Duration */
    function setDuration(id?: any, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Interval */
    function setInterval(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Thickness */
    function setThickness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Velocity */
    function setVelocity(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Beam */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有Beam */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Beam对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** BoxTrigger 用于在三维场景中绘制一个长方体盒子热区，当 CustomObject 自定义对象或 Camera 相机进入/退出该范围时自动触发回调事件，是一种基于空间包围盒的进出检测机制。 */
  namespace boxTrigger {
    /** 添加一个或多个BoxTrigger对象，当CustomObject对象或相机Camera对象进入和退出盒子热区范围触发事件相关的操作 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的BoxTrigger对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个BoxTrigger对象，注意：删除对象后热区和对应触发事件均会删除 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Camera 是三维场景的相机（视角）控制核心，负责观察位置、朝向、飞行进入/退出场景、定位到目标、以及对 CustomObject、Vehicle、Train 等对象的自动跟随。 */
  namespace camera {
    /** 取消相机自动跟随，支持取消CustomObject、Vehicle、Vehicle2、Train等对象的自动跟随 */
    function cancelFollow(fn?: (...args: any[]) => void): Promise<any>;
    /** 进入世界（三维场景），即从地球飞入到三维场景 */
    function enterWorld(fn?: (...args: any[]) => void): Promise<any>;
    /** 退出世界（三维场景），即从三维场景飞入到地球 */
    function exitWorld(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据传入的参数导出相机位置对应的正交投影图片 */
    function exportOrthoImage(path?: string, imageSize?: any[], orthoWidth?: number, location?: any[], rotation?: any[], backGroundColor?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 相机环绕指定位置旋转一周 */
    function flyAround(location?: any[], rotation?: any[], distance?: number, time?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 获取当前的相机位置 */
    function get(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据导览名称获取对应导览缩略图的base64字符串，默认图片格式png，尺寸：128*128 */
    function getAnimationImage(name?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 获取当前acp里所有导览的信息 */
    function getAnimationList(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据空间两点计算欧拉角 */
    function getEulerAngle(startPoint?: any, endPoint?: any): Promise<any>;
    /** 锁定相机的交互范围，仅允许在BBox内交互 */
    function lockByBBox(bbox?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 通过观察点设置相机位置 */
    function lookAt(x?: number, y?: number, z?: number, distance?: number, pitch?: number, yaw?: number, flyTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 通过BBox设置相机 */
    function lookAtBBox(bbox?: any[], pitch?: number, yaw?: number, flyTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 后退 */
    function moveBackward(fn?: (...args: any[]) => void): Promise<any>;
    /** 下降 */
    function moveDown(fn?: (...args: any[]) => void): Promise<any>;
    /** 前进 */
    function moveForward(fn?: (...args: any[]) => void): Promise<any>;
    /** 左移 */
    function moveLeft(fn?: (...args: any[]) => void): Promise<any>;
    /** 右移 */
    function moveRight(fn?: (...args: any[]) => void): Promise<any>;
    /** 上升 */
    function moveUp(fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停播放动画导航 */
    function pauseAnimation(fn?: (...args: any[]) => void): Promise<any>;
    /** 按传入索引序号的顺序播放一个或多个动画导览 */
    function playAnimation(ids?: number | any[], mask?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复播放动画导航 */
    function resumeAnimation(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置相机位置，这是最常见的参数形式，另外两种参数形式，请参考[二次开发：关于设置相机位置的三种形式](/docs/tutorials/camera) */
    function set(x?: number, y?: number, z?: number, pitch?: number, yaw?: number, flyTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 停止 */
    function stop(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止播放动画导航 */
    function stopAnimation(fn?: (...args: any[]) => void): Promise<any>;
    /** 低头 */
    function turnDown(fn?: (...args: any[]) => void): Promise<any>;
    /** 左转 */
    function turnLeft(fn?: (...args: any[]) => void): Promise<any>;
    /** 右转 */
    function turnRight(fn?: (...args: any[]) => void): Promise<any>;
    /** 抬头 */
    function turnUp(fn?: (...args: any[]) => void): Promise<any>;
    /** 解锁相机的交互范围，恢复自由交互 */
    function unlock(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否使用旧版本的数据格式（2021.03.17之前的版本），这是一个全局的设置。 */
    function useOldDataFormat(bUse?: boolean): Promise<any>;
  }

  /** CameraTour 是相机导览（漫游）动画对象，用于按关键帧序列驱动相机沿预设路线自动飞行、播放、暂停与停止，实现自动巡游展示。 */
  namespace cameraTour {
    /** 创建一个或多个CameraTour对象 */
    function add(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个CameraTour对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据CameraTour的ID导出视频文件，注意：导出的视频文件默认格式为*.mp4，分辨率：1920X1080，帧速率：30 */
    function exportVideo(id?: string, path?: string): Promise<any>;
    /** 暂停播放导览动画 */
    function pause(): Promise<any>;
    /** 开始播放导览动画 */
    function play(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复播放导览动画 */
    function resume(): Promise<any>;
    /** 设置时间长度 */
    function setDuration(id?: string, val?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置导览动画关键帧 */
    function setKeyFrames(id?: string, val?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置播放导览时点击鼠标是否暂停 */
    function setMouseClickToPause(id?: string, bool?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置名称 */
    function setName(id?: string, val?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置导览从某时刻开始播放 */
    function setTime(id?: string, time?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置用户数据 */
    function setUserData(id?: string, val?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 停止播放导览动画 */
    function stop(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个CameraTour对象 */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 加载、定位与管理 Cesium 3D Tiles（3DTiles）服务图层，通过服务 URL 流式加载海量三维瓦片数据，支持位置偏移与是否参与光照等控制。 */
  namespace cesium3DTileset {
    /** 添加一个或多个Cesium3DTileset对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Cesium3DTileset */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Cesium3DTileset对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Cesium3DTileset的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Cesium3DTileset */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有Cesium3DTileset */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置URL */
    function setTileURL(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Cesium3DTileset */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有Cesium3DTileset */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Cesium3DTileset对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 用于在指定包围盒范围内模拟与渲染海岸线效果，包含海浪拍打沙滩、海风驱动的海面波动，并支持海平面水位逐级抬升的水淹推演。 */
  namespace coastline {
    /** 添加一个或多个Coastline对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Coastline */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Coastline对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Coastline的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Coastline对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Coord 提供坐标系之间的转换工具（投影、经纬度、场景坐标互转等）。 */
  namespace coord {
    /** 地理坐标转投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction) */
    function gcs2pcs(coordinates?: any[], coordinateType?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 投影坐标转地理坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction) */
    function pcs2gcs(coordinates?: any[], coordinateType?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 屏幕坐标转为投影坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction) */
    function screen2World(x?: number, y?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 投影坐标转为屏幕坐标 请参考[二次开发：四种坐标的区别](/docs/tutorials/introduction) */
    function world2Screen(x?: number, y?: number, z?: number, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** CustomMesh 通过顶点/索引自定义三维网格几何体并着色，构建非标准的面片/体对象。 */
  namespace customMesh {
    /** 添加一个或多个CustomMesh对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的CustomMesh */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个CustomMesh对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取CustomMesh的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏CustomMesh */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置顶点坐标 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置顶点索引 */
    function setIndices(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示CustomMesh */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个CustomMesh对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** CustomObject 加载用户自定义三维模型并控制其位置、姿态、动画、跟随与交互，是通用的“动态实体”载体。 */
  namespace customObject {
    /** 添加一个或多个CustomObject对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 把TileLayer图层中包含的一个或多个(Actor)模型复制为一个CustomObject对象 */
    function addByTileLayer(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 批量方法，调用多个CustomObject对象的多个蓝图函数 */
    function callBPFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的CustomObject */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 把一个CustomObject类型的楼宇模型按层高拆分为若干个指定的楼层 */
    function cutFloor(obj?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个CustomObject对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], actionMode?: any, offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取CustomObject的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据自定义模型id查询自定义模型包含的蓝图函数信息 */
    function getBPFunction(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 闪烁 */
    function glow(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏CustomObject */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID隐藏自定义对象自定义对象 */
    function hideByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮 */
    function highlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置CustomObject对象运动（根据实时获取的GPS数据运动） */
    function moveTo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 替换CustomObject对象材质 */
    function overrideMaterial(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停指定自定义对象按轨迹点移动 */
    function pause(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复指定自定义对象的材质 */
    function restoreMaterial(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复指定自定义对象按轨迹点移动 */
    function resume(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置模型自身的旋转 */
    function setLocalRotation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置位置 */
    function setLocation(id?: string, newVal?: any[], smoothTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置指定自定义对象对应的移动倍速 */
    function setMoveRate(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置世界坐标系旋转 */
    function setRotation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置缩放 */
    function setScale(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是平滑插值还是跳跃， 0：跳跃， 1：平滑差值 */
    function setSmoothMotion(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置平滑移动的插值时间 */
    function setSmoothTime(id?: string, smoothTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置模型叠加颜色 */
    function setTintColor(ids?: string | any[], newColor?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 多视口状态下，设置CustomObject对象在各视口的可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示CustomObject */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID显示自定义对象 */
    function showByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 模拟从3dt中复制的CustomObject对象的生长动画效果 */
    function showGrowth(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自定义对象按轨迹点移动 */
    function startMove(id?: string, coordinateType?: number, pathPointArr?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 结束指定自定义对象按轨迹点移动 */
    function stop(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止闪烁 */
    function stopGlow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮 */
    function unHighlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个CustomObject对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 用于在三维场景中加载基于网页（HTML）的自定义标签，将外部网页内容贴合到指定坐标点，可承载富文本、图表、视频等网页化信息展示。该对象已停止更新，新项目推荐使用功能更丰富的 Marker 对象。 */
  namespace customTag {
    /** 添加一个或多个CustomTag对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的CustomTag */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个CustomTag对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有CustomTag对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取CustomTag的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏CustomTag */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有CustomTag */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否自动关闭标签的弹出窗口 */
    function setAutoHidePopupWindow(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示CustomTag */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有CustomTag */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个CustomTag对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 对接大华 ICC 开放平台的视频融合对象，将实时摄像头视频流投射融合到三维场景中，并提供可点击定位的摄像头标签。 */
  namespace daHuaVideoFusion {
    /** 添加一个或多个大华视频融合对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的大华视频融合对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个大华视频融合对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(data?: Record<string, any>, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据大华视频融合ID获取包含的摄像头列表 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏大华视频融合对象内指定的摄像头列表 */
    function hide(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示大华视频融合对象内指定的摄像头列表 */
    function show(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个大华视频融合对象及包含的摄像头信息 */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Decal 用于将一张贴图沿包围盒投影“喷涂”到三维场景的地表、模型或建筑表面，使图案自然贴合起伏地形与曲面，常用于在实景三维上叠加平面图形信息。 */
  namespace decal {
    /** 添加一个或多个Decal对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Decal */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Decal对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有Decal对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Decal的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Decal对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景中加载与驱动无人机模型，支持坐标定位、姿态旋转、moveTo 移动、轨迹线、自发光灯与标牌，模拟无人机的飞行与巡检过程。 */
  namespace drone {
    /** 添加一个或多个无人机对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的无人机对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个无人机对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], followEnable?: boolean, distance?: number, flyTime?: number, viewPitch?: number, viewYaw?: number, sensitivity?: number, offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取无人机对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个无人机对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置无人机对象飞行移动 */
    function moveTo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个无人机对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个无人机对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** DynamicWater 用于在三维场景中按坐标多边形快速生成带波纹流动效果的动态水面，提供深蓝、蓝、湖水三种预设样式。它是一种轻量的“视觉级”水体表达，不依赖真实水动力计算，主要用于把河湖库等水域“点亮”为动态可视效果。 */
  namespace dynamicWater {
    /** 添加一个或多个DynamicWater对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的DynamicWater */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个DynamicWater对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有DynamicWater对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取DynamicWater的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置DynamicWater的坐标信息 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置动态水的样式 */
    function setStyle(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个DynamicWater对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: any): Promise<any>;
  }

  /** 在三维场景中手动绘制点/线/面/体的交互工具，并返回绘制结果坐标，供后续分析、测量或落库使用。 */
  namespace editHelper {
    /** 取消绘制模式 */
    function cancel(fn?: (...args: any[]) => void): Promise<any>;
    /** 绘制结束。调用此方法会结束当前的绘制，并在回调函数中返回绘制类型和坐标点，然后根据这些坐标点再创建相关的几何图形。 */
    function finish(withOffset?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置绘制参数 */
    function setParam(lineType?: number, buildType?: number, color?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 进入绘制模式 */
    function start(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** ExcavationAnalysis 对比设计面与实际开挖/实测面，计算超挖、欠挖的体积与分布，并以三维云图着色呈现开挖偏差。 */
  namespace excavationAnalysis {
    /** 添加一个ExcavationAnalysis对象 */
    function add(excavationAnalysis?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的ExcavationAnalysis */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个ExcavationAnalysis对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取ExcavationAnalysis的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏ExcavationAnalysis对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示ExcavationAnalysis对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个ExcavationAnalysis对象 */
    function update(excavationAnalysis?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** FiniteElement 加载有限元网格与计算结果（应力/应变/位移/温度等），以云图着色与形变动画三维呈现分析结果。 */
  namespace finiteElement {
    /** 添加一个或多个有限元分析对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的有限元分析对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个有限元分析对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据有限元分析ID获取有限元分析的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏有限元分析 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示有限元分析 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个有限元分析对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** FiniteElement2 是有限元仿真对象（增强版），在结果云图基础上支持更复杂/大规模的有限元仿真过程与动态演示。 */
  namespace finiteElement2 {
    /** 根据VTK文件添加一个或多个有限元仿真对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 盒子过滤器 */
    function applyBoxClipFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据等值线对应的数值添加过滤器并展示过滤后的有限元模型分析结果 */
    function applyContourFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 圆柱过滤器 */
    function applyCylinderClipFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 切面过滤器 */
    function applyPlaneClipFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 球型过滤器 */
    function applySphereClipFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据模型属性字段对应的区间值添加过滤器并展示过滤后的有限元模型分析结果 */
    function applyThresholdFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的有限元仿真对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 清空指定的有限元模型对象添加的所有过滤器 */
    function clearFilter(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个有限元仿真对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据有限元分析ID获取有限元分析的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏有限元分析 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 移除指定的有限元模型对象添加的相关过滤器 */
    function removeFilter(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示有限元分析 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个有限元仿真对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** FloodFill 基于给定出水点（seed）和水位高度（elevation），在指定范围内沿地形进行漫延式的淹没计算与填充，模拟“给定水位下哪些区域会被淹没”，并以指定颜色渲染淹没范围与水面。 */
  namespace floodFill {
    /** 添加一个或多个FloodFill对象， */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的FloodFill */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个FloodFill对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取FloodFill的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏FloodFill */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有FloodFill */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水颜色 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水位高度 */
    function setElevation(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水淹模拟精度 */
    function setPrecision(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水淹分析范围 注意：出水点[x,y]一定要在新设置的水淹分析范围[min~max]内 */
    function setRange(id?: string, minArr?: any[], maxArr?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置出水点 */
    function setSeed(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示FloodFill */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有FloodFill */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个FloodFill对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Fluid 在指定包围盒（bbox）内进行实时流体仿真，通过出水点（sources）的位置、流速流向、形状与持续时间驱动水体流动，内置 28 种水样式，用于表达喷涌、漫流、注水等动态流体效果。 */
  namespace fluid {
    /** 添加一个或多个流体仿真对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 添加一个或多个流体仿真对象的源数据 */
    function addSource(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的流体仿真对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 继续流体仿真 */
    function continue(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 继续仿真 */
    function continueSource(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个流体仿真对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据流体仿真ID获取流体仿真的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏流体仿真 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停流体仿真 */
    function pause(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 移除一个或多个流体仿真对象的源数据 */
    function removeSource(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 重置流体仿真 */
    function reset(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示流体仿真 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止仿真 */
    function stopSource(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个流体仿真对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** GaussianSplatting 加载并渲染 3D 高斯泼溅(3DGS)重建成果，呈现照片级实景三维。 */
  namespace gaussianSplatting {
    /** 添加一个GaussianSplatting对象 */
    function add(gaussianSplatting?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的GaussianSplatting */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个GaussianSplatting对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取GaussianSplatting的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏GaussianSplatting对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示GaussianSplatting对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个GaussianSplatting对象 */
    function update(gaussianSplatting?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 从本地文件或 URL 加载标准 GeoJSON 矢量数据并进行符号化渲染，支持点、线、面（含 Polygon3D 拉伸体块）多种可视化类型与渲染器，可配合文字标注、贴地与可视范围控制。 */
  namespace geoJSONLayer {
    /** 从GeoJSON文件或者url下载链接加载GeoJSON并进行符号化展示 */
    function add(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的GeoJSONLayer图层对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个GeoJSONLayer图层对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到GeoJSONLayer图层对象 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 定位到GeoJSONLayer图层的某一块要素区域 */
    function focusFeature(id?: string, featureId?: number, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个GeoJSONLayer图层对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮GeoJSONLayer图层对象内部的某一块要素区域 */
    function highlightFeature(id?: string, featureId?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据要素包含的属性字段名称和对应的值来高亮GeoJSONLayer图层对象内部对应的要素区域 */
    function highlightFeatureByProperty(object?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮GeoJSONLayer图层对象内部的多块要素区域 */
    function highlightFeatures(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置GeoJSONLayer对象的可视高度范围，注意：当GeoJSONLayer使用贴地模式时，此方法会失效 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个GeoJSONLayer图层对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮一个或者多个GeoJSONLayer图层的所有高亮要素区域 */
    function unHighlightAllFeaturesById(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮GeoJSONLayer图层对象内部的某一块要素区域 */
    function unHighlightFeature(id?: string, featureId?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据要素包含的属性字段名称和对应的值来取消高亮GeoJSONLayer图层对象内部对应的要素区域 */
    function unHighlightFeatureByProperty(object?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮GeoJSONLayer图层对象内部的多块要素区域 */
    function unHighlightFeatures(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 更新GeoJSONLayer图层对象的符号化显示效果 */
    function update(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 球面坐标系下管理 Cesium 球面地形与影像服务的对象，可在数字地球上叠加 WMTS、WMS、MVT、TMS 等 OGC 网络图层服务，构建全球/大范围三维球面底图与地形。 */
  namespace globeTerrain {
    /** 在Cesium球面上添加图层服务，支持的服务类型包含WMTS、WMS、MVT和TMS */
    function addImageryLayer(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据自定义参数添加球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务 */
    function addImageryLayerBySchemaParams(obj?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 清空Cesium球面上添加的所有图层服务 */
    function clearImageryLayer(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除Cesium球面上指定的图层服务 */
    function deleteImageryLayer(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 销毁Cesium球面的地形和影像 */
    function destroy(fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Cesium球面的地形和影像 */
    function hide(fn?: (...args: any[]) => void): Promise<any>;
    /** 初始化Cesium球面的地形和影像 */
    function init(terrainUrl?: string, imageryUrl?: string, imageryResourceUrl?: string, alpha?: number, bConvertSRGB?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置更新初始化加载的影像服务 */
    function setImagery(imageryUrl?: string, imageryResourceUrl?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据自定义参数的图层服务来更新初始化球面加载的影像服务，注意：替换初始化的影像服务应是全球影像服务地址 */
    function setImageryBySchemaParams(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Cesium球面上添加的图层服务的绘制顺序，即移动当前图层到目标图层的上方位置显示 */
    function setImageryLayerDrawOrder(currentLayerId?: string, targetLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Cesium球面的地形和影像 */
    function show(fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景中绘制带流动动画的引导线，用于指示路径、动线与流向，支持直线/曲线样式、宽度与速度，常用于强调移动轨迹与导览路线。 */
  namespace guideLine {
    /** 添加一个或多个GuideLine对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的GuideLine */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个GuideLine对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取GuideLine的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏GuideLine */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标值 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否做深度检测 */
    function setDepthTest(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的引导对象大小 */
    function setGuideSize(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的播放时间间隔 */
    function setInterval(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置GuideLine对象的可视范围 */
    function setRange(id?: string, min?: number, min?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的shape样式 */
    function setShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的速率 */
    function setSpeed(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的宽度 */
    function setWidth(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示GuideLine */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个GuideLine对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HeatMap 根据离散热力点及其热力值，在地表生成二维平面热力图，通过颜色梯度直观表达数据在空间上的密度、强度或聚集分布。 */
  namespace heatmap {
    /** 根据热力点绘制热力图 */
    function addByHeatPoints(heatmap?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据tif文件加载热力图 */
    function addByTif(heatmap?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 为HeatMap添加热力点 */
    function addPoints(id?: string, data?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的HeatMap */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HeatMap对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HeatMap的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HeatMap */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮通过Tif文件加载的热力图中指定的像素点，注意：像素点数组的取值范围必须在Tif文件分辨率内 */
    function highlightPixels(id?: string, pixelCoords?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 预加载的热力图动画，包含多个Tif文件，加载后可以使用play()方法进行播放。 */
    function load(heatmap?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停播放热力图动画 */
    function pause(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 播放预加载的热力图动画 */
    function play(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 为HeatMap移除热力点 */
    function removePoints(id?: string, pointIds?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置BoundingBox 热力点坐标的范围 */
    function setBBox(id?: any, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置热力值的范围 */
    function setRange(id?: any, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 从第几秒开始播放 */
    function setTime(id?: string, startTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HeatMap */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消热力图内所有像素点高亮 */
    function unHighlightAllPixels(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 更新热力图 */
    function updateByHeatPoints(heatmap?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HeatMap3D 在三维空间内构建体热力图，支持空间图片、离散点、体素、稀疏体素等多种构建方式，以体积雾、体素、盒子或贴花等显示模式表达数据在三维空间中的分布与浓度。 */
  namespace heatmap3d {
    /** 根据空间离散点和对应热力值构建三维热力图 */
    function addByHeatPoints(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据16张空间图片构建三维热力图 */
    function addByImages(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据稀疏体素构建三维热力图 */
    function addBySparseVoxels(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据tif文件构建三维热力图 */
    function addByTif(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据纯热力值构建三维热力图 */
    function addByVoxels(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 动态往HeatMap3D对象内添加离散热力点，注意：仅支持空间离散点构造方法addByHeatPoints() */
    function addHeatPoints(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的HeatMap3D */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HeatMap3D对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HeatMap3D的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HeatMap3D */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 预加载的三维热力图动画，包含多个Tif文件，加载后可以使用play()方法播放三维热力图动画。 */
    function load(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停播放三维热力图动画 */
    function pause(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 播放预加载的三维热力图动画 */
    function play(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID和坐标位置获取对应HeatMap3D对象包含体素块的详细信息 */
    function queryVoxel(id?: string, coordinate?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置三维热力图的显示模式 */
    function setDisplayMode(id?: any, displayMode?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 从第几秒开始播放三维热力图动画 */
    function setTime(id?: string, startTime?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置HeatMap3D对象在进入多视口状态下视口可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HeatMap3D */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改HeatMap3D */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HighlightArea 根据多边形坐标在三维场景中对指定区域内的模型进行高亮染色，并可通过高度范围限定染色的 Z 区间，用于突出强调某一空间范围。 */
  namespace highlightArea {
    /** 添加一个或多个HighlightArea对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的HighlightArea */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HighlightArea对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HighlightArea的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HighlightArea */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setColor(id?: any, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标 */
    function setCoordinates(id?: any, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否做深度检测 */
    function setDepthTest(id?: any, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置高度范围 */
    function setHeightRange(id?: any, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置亮度 */
    function setIntensity(id?: any, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HighlightArea */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个HighlightArea对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HydroDynamic1D 是一维水动力模型对象，沿河道中心线以采样点（坐标、河道宽度、流速、热力值）描述河道，生成带流向箭头与水面/热力样式的动态河道，可用 shp 文件裁切河道范围，适合表达带状河流的水流与水文属性。 */
  namespace hydrodynamic1d {
    /** 添加一个或多个HydroDynamic1D对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的HydroDynamic1D */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HydroDynamic1D对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HydroDynamic1D的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HydroDynamic1D */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HydroDynamic1D */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个HydroDynamic1D对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HydroDynamic2D 是现行的二维水动力模型对象，基于真实数据驱动，支持 tif 栅格与 shp 矢量两类数据源，可按时序回放水深、流速流向，提供真实水样式、热力图样式、流场样式及流向箭头，是面状洪水演进与淹没动态展示的核心对象。 */
  namespace hydrodynamic2d {
    /** 添加一个或多个HydroDynamic2D二维水动力模型对象，添加的数据源为(.shp)文件，注意：SHP文件必需是投影坐标系（PCS），同时单位是米。 */
    function addByShp(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 添加一个或多个HydroDynamic2D二维水动力模型对象，数据源为.tif文件。 */
    function addByTif(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的HydroDynamic2D */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HydroDynamic2D对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HydroDynamic2D的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HydroDynamic2D */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HydroDynamic2D */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个HydroDynamic2D对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 早期版本的二维水动力模型对象，基于真实数据（水深、流速流向、河道 DEM）驱动生成，支持水体/热力样式与流向着色；该对象已废弃，新项目请改用 HydroDynamic2D。 */
  namespace hydrodynamicModel {
    /** 添加一个或多个HydrodynamicModel二维水动力模型对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的HydrodynamicModel */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HydrodynamicModel对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HydrodynamicModel的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HydrodynamicModel */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HydrodynamicModel */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个HydrodynamicModel对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** HydrodynamicModel2 是早期的二维水动力模型对象，基于 JSON 数据文件驱动，按时序播放水深/流速等结果并以调色板着色，用于在三维场景中回放二维水动力计算成果。**该对象已废弃、待移除，新项目请改用 HydroDynamic2D 对象。** */
  namespace hydrodynamicModel2 {
    /** 添加一个或多个HydrodynamicModel2二维水动力模型对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的HydrodynamicModel2对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个HydrodynamicModel2对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取HydrodynamicModel2对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏HydrodynamicModel2对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停播放 */
    function pause(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复播放 */
    function resume(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置HydrodynamicModel2对象的当前播放时刻 */
    function setTime(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示HydrodynamicModel2对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 开始从某时刻播放 */
    function startPlay(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止播放 */
    function stopPlay(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个HydrodynamicModel2对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 加载与管理 WMTS、WMS、MapServer 等网络地图服务图层，将卫星影像、电子地图等作为场景底图叠加，可批量添加并支持坐标系、切片方案等参数配置。 */
  namespace imageryLayer {
    /** 添加一个或多个网络地图服务，如WMTS/WMS服务等网络图层服务 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 给图层服务叠加显示对应VTPK标注 */
    function addVTPK(tileLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个ImageryLayer图层对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除叠加的VTPK标注 */
    function deleteVTPK(tileLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个ImageryLayer图层对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 添加图层服务前需要先初始化相关参数 */
    function init(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置ImageryLayer图层置底显示 */
    function setDrawBottom(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置两个ImageryLayer图层的绘制顺序，即移动当前ImageryLayer图层到目标ImageryLayer图层的上方位置显示 */
    function setDrawOrder(currentLayerId?: string, targetLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置ImageryLayer图层置顶显示 */
    function setDrawTop(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置叠加的VTPK标注可见性 */
    function setVTPKVisable(tileLayerId?: string, visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个ImageryLayer图层对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 球面坐标系下通过自定义切片参数加载 WMTS、WMS、MVT、TMS 等网络图层服务，可指定原点、瓦片尺寸、层级范围与 extent 等，适配各厂商服务规则。 */
  namespace imageryLayer2 {
    /** 根据图层服务的自定义参数添加一个或多个球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务 */
    function addBySchemaParams(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据图层服务url包含的切片方案xmlPath添加一个或多个球面网络地图服务，如WMTS/WMS/MVT/TMS服务等网络图层服务 */
    function addByUrl(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清除场景中所有的网络图层对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个ImageryLayer2图层对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个ImageryLayer2图层对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有ImageryLayer2图层对象 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置两个ImageryLayer2图层的绘制顺序，即移动当前ImageryLayer2图层到目标ImageryLayer2图层的上方位置显示 */
    function setDrawOrder(currentLayerId?: string, targetLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个ImageryLayer2图层对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有ImageryLayer2图层对象 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 管理场景图层树（目录树），提供对树上对象的定位、显隐控制、查询及蓝图函数调用，是组织与联动场景内置对象的统一入口。 */
  namespace infoTree {
    /** 调用图层树上对象包含的多个蓝图函数，注意：可以根据图层树上的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id); */
    function callBPFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 通过GroupId删除各类API创建的对象 */
    function deleteByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 禁用X光 */
    function disableXRay(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 启用X光 */
    function enableXRay(ids?: string | any[], color?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 获取图层树信息 */
    function get(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据图层树对象ID查询其包含的蓝图函数信息，注意：支持批量查询 */
    function getBPFunction(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏图层 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 通过GroupId隐藏各类API创建的对象 */
    function hideByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 通过GroupId高亮各类API创建的对象 */
    function highlightByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置图层的可见性 */
    function setVisibility(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示图层 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 通过GroupId显示各类API创建的对象 */
    function showByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Light 用于在三维场景中添加点光源、聚光源、矩形光源等动态光源，可设置颜色、亮度、衰减、阴影并支持按系统时间自动开关，营造真实的照明与夜景氛围。 */
  namespace light {
    /** 添加一个或多个光源对象  注意：当批量添加多个光源时，渲染阴影效果会非常耗性能，建议默认关闭 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的光源对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个光源对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据光源ID获取光源的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏光源 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有光源 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示光源 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有光源 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个光源对象，支持更新以下属性： */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景指定坐标处放置带图标与文字的标注点，是最常用的点位标记对象，支持图标、悬停图片、文字、可视范围、分组及交互事件，用于标识地物、设备、事件等关键点位。 */
  namespace marker {
    /** 添加一个或多个标注点  调用时注意：单次创建的Marker对象数量不要超过5000个，在一个工程内创建的Marker对象总数量不要超过20万个。 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Marker贴合模型对象进行移动，设置贴合后Marker会跟随模型一起平滑运动，支持的对象类型：CustomObject、Vehicle、Vehicle2、Train、Drone */
    function attachObject(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的标注 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个标注对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID删除Marker */
    function deleteByGroupId(groupIds?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有Marker对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取标注的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏标注 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有标注 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有标注的弹出窗口 */
    function hideAllPopupWindow(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID隐藏Marker */
    function hideByGroupId(groupIds?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏指定标注的弹出窗口 */
    function hidePopupWindow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的整体偏移量（修改锚点） */
    function setAnchors(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否自动关闭标注的弹出窗口 */
    function setAutoHidePopupWindow(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置marker聚合样式 */
    function setClusterStyle(style?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的位置 */
    function setCoordinate(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注文本颜色 */
    function setFontColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置字体轮廓线颜色 */
    function setFontOutlineColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置字体轮廓线大小 */
    function setFontOutlineSize(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置字体大小 */
    function setFontSize(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置分组 */
    function setGroupId(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置鼠标悬停时显示的图片路径 */
    function setHoverImagePath(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的图片 */
    function setImagePath(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注图片的大小 */
    function setImageSize(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置LineColor */
    function setLineColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置LineOffset */
    function setLineOffset(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置LineSize */
    function setLineSize(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否参与遮挡剔除 */
    function setOcclusionCull(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置弹窗偏移: [x, y] */
    function setPopupOffset(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置弹窗大小: [width, height] */
    function setPopupSize(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置弹窗HTML链接 */
    function setPopupURL(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置避让优先级 */
    function setPriority(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的可见范围 */
    function setRange(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的文本 */
    function setText(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注文本的背景颜色 */
    function setTextBackgroundColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置文本偏移 */
    function setTextOffset(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置文本可视范围: [近裁距离, 远裁距离] */
    function setTextRange(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注的URL */
    function setURL(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置用户数据 */
    function setUserData(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 多视口状态下，设置Marker对象在各视口的可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示标注 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有标注 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有标注的弹出窗口 */
    function showAllPopupWindow(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID显示Marker */
    function showByGroupId(groupIds?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示指定标注的弹出窗口 */
    function showPopupWindow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个标注对象 */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景中放置带特效的立体标注（动态标记），相较于二维 Marker 具有三维朝向、缩放、旋转与粒子/光效等表现力，并可叠加三维文字，用于强调重点目标或营造动态告警效果。 */
  namespace marker3d {
    /** 添加一个或多个动态标记 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Marke3D贴合模型对象CustomObject对象，设置后Marker3D会跟随模型运动 */
    function attachObject(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 调用Marker3D对象包含的多个蓝图函数，注意：可以根据marker3d的对象id查询包含的所有蓝图函数 fdapi.misc.getBPFunction(id); */
    function callBPFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的3D标注 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个3D标注对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID删除动态标注 */
    function deleteByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取3D标注的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据marker3d对象的id查询其包含的蓝图函数信息 */
    function getBPFunction(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏3D标注 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有3D标注 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID隐藏动态标注 */
    function hideByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Marker3D对象的可视高度范围 */
    function setViewHeightRange(id?: string, minVisibleHeight?: number, maxVisibleHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示3D标注 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有3D标注 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID显示动态标注 */
    function showByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个3D标注对象 */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 标注图层对象，按相机距离分三个层级（圆形标记点、标记图片、Marker 标注）自适应展示点位，支持文字、图标、弹窗、多种坐标系与可视范围控制，用于在三维场景中海量标注业务点位。 */
  namespace markerLayer {
    /** 添加一个或多个标注图层服务对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的标注图层对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个标注图层对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到内部标记点合适的观察距离 */
    function focusByMarkerId(id?: string, markerId?: string, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏标注图层对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有标注图层对象 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标注图层对象的可视高度范围 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示标注图层对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有标注图层对象 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个标注图层对象 */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Misc 提供一些杂项/辅助功能接口（如图片按钮、提示等通用辅助能力，具体以方法为准）。 */
  namespace misc {
    /** 添加动画按钮 */
    function addAnimatedImageButtons(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 添加图片按钮 */
    function addImageButtons(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 调用整个渲染场景内指定的蓝图函数 注意：调用前请先确认被调用的蓝图函数已存在，并和设计蓝图函数的开发人员沟通确认相关参数取值后再调用 */
    function callBPFunction(data?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除动画按钮 */
    function deleteImageButtons(ids?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 进入多视口模式 */
    function enterMultiViewportMode(viewportMode?: number, lineColor?: any, lineSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 进入汇报演示模式 */
    function enterReportMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 退出多视口模式 */
    function exitMultiViewportMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 退出汇报演示模式 */
    function exitReportMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 查询当前激活的视口信息 */
    function getActiveViewport(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据模型Actor路径或者对象id查询模型包含的蓝图函数信息，支持查询单个模型和多个模型包含的蓝图函数信息 */
    function getBPFunction(assetPath?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 从一组离散点中获取凸多边形的顶点索引 */
    function getConvexPolygon(pointArray?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据材质路径查询材质包含的图片纹理和材质参数信息，同时支持查询单个材质和多个材质包含的信息 */
    function getMaterial(materialPath?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Explorer里创建的植物 */
    function hideAllFoliages(fn?: (...args: any[]) => void): Promise<any>;
    /** 判断JS-API的版本和云渲染服务器的接口版本是否一致 */
    function isApiVersionMatched(): Promise<any>;
    /** 全屏播放影片（播放过程中会暂停三维渲染以提高性能） */
    function playMovie(url?: string, loop?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 播放视频（显示播放窗口） */
    function playVideo(id?: string, x?: number, y?: number, width?: number, height?: number, url?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效 */
    function playVideoAlone(url?: string, options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 统计ACP工程包含各类资产信息 */
    function projectAssetCount(type?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 统计ACP工程包含的全部资产信息 */
    function projectAssetCountAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 从Cloud的文件资源配置中重新挂载新添加的pak文件，避免重启服务引起的实例关闭 */
    function reloadPak(fn?: (...args: any[]) => void): Promise<any>;
    /** 激活一个或多个视口，注意：仅在多视口模式下生效 */
    function setActiveViewport(index?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置服务器返回版本号的回调函数 */
    function setApiVersionReceived(fnCallback?: (...args: any[]) => void): Promise<any>;
    /** 多视口模式下设置相机是否同步 */
    function setMultiviewportInteractSync(isSync?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置汇报模式下的窗口位置 */
    function setReportModeAlign(align?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置汇报模式下窗口的播放模式 */
    function setReportModePlayMode(playMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置汇报模式下展示多视口时，相机是否联动  取值：联动true，不联动false，默认不联动false */
    function setReportModeViewPortLinkage(isLinkage?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Explorer里创建的植物 */
    function showAllFoliages(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止全屏播放影片 */
    function stopMovie(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止播放视频（播放窗口会消失） */
    function stopPlayVideo(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 停止在独立的进程播放视频，注意：此接口仅在基于Explorer进行二次开发时生效 */
    function stopPlayVideoAlone(id?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 控制Explorer快捷键的开关，注意：仅针对explorer下webui开发方式生效 */
    function switchShortcutKey(onOff?: boolean, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** OceanHeatMap 基于真实海洋数据(.tif)生成海面要素热力图，呈现海温、叶绿素等场量的空间分布。 */
  namespace oceanHeatmap {
    /** 添加一个或多个OceanHeatMap海洋热力图对象，数据源为.tif文件。 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的OceanHeatMap */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个OceanHeatMap对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取OceanHeatMap的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏OceanHeatMap */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示OceanHeatMap */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个OceanHeatMap对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 以起点(O)到终点(D)的弧线表达两点间的流向与流量关系，支持弯曲度、流速、亮度等参数，常用大量 OD 线表现迁徙、流动与关联强度。 */
  namespace odline {
    /** 添加一个或多个ODLine对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的ODLine */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个ODLine对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取ODLine的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏ODLine */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有ODLine */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的弯曲度 */
    function setBendDegree(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的亮度 */
    function setBrightness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的颜色值 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标值 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置EndLabel样式 */
    function setEndLabelShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置EndPoint样式 */
    function setEndPointShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的流速 */
    function setFlowRate(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置ODLine发光点样式 */
    function setFlowShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置两端点的缩放值 */
    function setLabelSizeScale(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置ODLine模型样式 */
    function setLineShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置ODLine材质样式 */
    function setLineStyle(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置线的厚度 */
    function setLineThickness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置StartLabel样式 */
    function setStartLabelShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置StartPoint样式 */
    function setStartPointShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置材质贴图平铺 */
    function setTiling(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置运动点的缩放 */
    function setflowPointSizeScale(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示ODLine */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有ODLine */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个ODLine对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Panorama 在三维场景的指定坐标处加载并展示 360° 全景照片，使用户可在该点位沉浸式查看真实环境，实现三维模型与实景全景的融合浏览。 */
  namespace panorama {
    /** 添加一个或多个Panorama全景图对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的Panorama */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Panorama对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 进入全景图模式 */
    function enter(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 退出全景图模式 */
    function exit(fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Panorama的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 切换显示模式，即全景图模式和三维场景模式切换 */
    function switchMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Panorama对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Plot 用于绘制点/线/面态势图标与军标，支持态势标绘与编辑，是指挥与态势图层的标号载体。 */
  namespace plot {
    /** 添加一个Plot对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Plot */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Plot对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Plot的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Plot对象的描边坐标集合 */
    function getStrokeCoordinates(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Plot对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有Plot对象 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Plot对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有Plot对象 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 进入标绘对象的手工绘制模式，根据鼠标交互获取到坐标进行创建 */
    function startDraw(plot?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 停止Plot标绘对象的手工绘制模式 */
    function stopDraw(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个Plot对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 绘制贴地的二维多边形面，用于表达区域、地块与范围，支持多边形带洞（孔洞）及多 Part 复合多边形，可填充颜色表达分区属性。 */
  namespace polygon {
    /** 添加一个或多个Polygon对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Polygon */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Polygon对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Polygon的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 闪烁 */
    function glow(ids?: string | any[], duration?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Polygon */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮 */
    function highlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否做深度检测 */
    function setDepthTest(id?: any, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Polygon对象的可视高度范围，注意：当Polygon对象使用贴地模式时，此方法会失效 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Polygon */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止高亮 */
    function unHighlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Polygon对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在二维多边形基础上拉伸出高度，绘制三维体块面，用于表达有体量的区域，如建筑体块、围墙、立体淹没水体等，支持带洞与多 Part 复合多边形。 */
  namespace polygon3d {
    /** 添加一个或多个Polygon3D对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的3DPolygon */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个3DPolygon对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 禁止Polygon3D参与剖切 */
    function disableClip(ids?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Polygon3D参与剖切 */
    function enableClip(ids?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取3DPolygon的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 闪烁 */
    function glow(data?: Record<string, any> | any[]): Promise<any>;
    /** 隐藏3DPolygon */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有3DPolygon */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮，目前仅部分样式支持高亮，和材质有关 */
    function highlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setColor(id?: string, newColor?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否做深度检测 */
    function setDepthTest(id?: any, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置高度 */
    function setHeight(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置亮度 */
    function setIntensity(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置样式 */
    function setStyle(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TillingX */
    function setTillingX(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TillingY */
    function setTillingY(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Polygon3D对象的可视高度范围 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示3DPolygon */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有3DPolygon */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止闪烁 */
    function stopGlow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止高亮 */
    function unHighlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个3DPolygon对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 绘制由多个坐标点连成的折线/路径，支持箭头、光流、贴地、实线/虚线等样式与自定义材质，是表达道路、管线、轨迹、边界等线状要素的基础对象。 */
  namespace polyline {
    /** 添加一个或多个Polyline对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置一个或多个Polyline对象的起点和终点跟随对应的模型移动 */
    function attachObject(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Polyline */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Polyline对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Polyline的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Polyline */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有Polyline */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的亮度 */
    function setBrightness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的颜色值 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标值 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否做深度检测 */
    function setDepthTest(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的流速 */
    function setFlowRate(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置shape新的样式 */
    function setShape(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的样式 */
    function setStyle(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的厚度 */
    function setThickness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Polyline对象的可视高度范围，注意：当Polyline对象使用贴地模式时，此方法会失效 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Polyline */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有Polyline */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Polyline对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** RadiationPoint 以辐射圈/扩散圈形式表达从某点向外扩散、强度逐渐衰减的影响范围。 */
  namespace radiationPoint {
    /** 添加一个或多个RadiationPoint对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的RadiationPoint */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个RadiationPoint对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有RadiationPoint对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取RadiationPoint的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏RadiationPoint */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有RadiationPoint */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置AutoHeight 自动判断下方是否有物体，设置正确高度 */
    function setAutoHeight(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置新的亮度 */
    function setBrightness(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置坐标 */
    function setCoordinate(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置半径 */
    function setRadius(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置波纹数量 */
    function setRippleNumber(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示RadiationPoint */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有RadiationPoint */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个RadiationPoint对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** River（等价于一维水动力模型 Hydrodynamic1D）模拟河道水位、流量、流速的沿程演进，可视化河道水流过程。 */
  namespace river {
    /** 添加一个或多个River对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的River */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个River对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取River的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏River */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示River */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个River对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Satellite 用于球面坐标系场景中加载与表现卫星对象，支持像素点、缩略图与三维模型的多级可视化（按相机距离切换），并可设置标签文字、姿态旋转，用于卫星在轨与星座的可视化仿真。支持卫星按轨道运动，相机跟随运动，实现卫星运动伴随地球自转的晨昏线效果。支持使用卫星模型的蓝图函数实现打开关闭太阳帆，支持高亮闪烁像素点和缩略图。 */
  namespace satellite {
    /** 添加一个或多个Satellite对象 */
    function add(data?: Record<string, any> | any[], textRange?: any[], modelRange?: any[], imageVisibleDistance?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 在两颗卫星之间添加连接线，卫星运动时连接线会跟随同步运动 */
    function addLinkage(data?: Record<string, any> | any[], materials?: any[] | Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 调用卫星模型包含的多个蓝图函数，注意：调用前请使用getBPFunction()函数来查询当前卫星模型包含的蓝图函数参数信息 */
    function callBPFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的Satellite */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的卫星连接线 */
    function clearLinkage(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据卫星连接线的ID删除连接线 */
    function deleteLinkage(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个卫星模型和其对应的文字标签 */
    function deleteSatellite(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, pitch?: number, yaw?: number, sensitivity?: number, offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据卫星模型的ID获取卫星的实时位置信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据卫星模型ID查询其包含的蓝图函数信息，注意：支持批量查询 */
    function getBPFunction(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个卫星模型 */
    function hideModel(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个卫星模型和其对应的文字标签 */
    function hideSatellite(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个卫星的文字标签 */
    function hideText(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 打开指定卫星的缩略图的高亮效果 */
    function highlight(ids?: string | any[], speed?: number, scaleRange?: number, alphaRange?: number, intensityRange?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置卫星运动时自动跟随相机 */
    function setFollow(ids?: string | any[], distance?: number, pitch?: number, yaw?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个卫星模型 */
    function showModel(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个卫星模型和其对应的文字标签 */
    function showSatellite(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个卫星的文字标签 */
    function showText(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消指定卫星缩略图的高亮效果 */
    function unHighlight(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 取消所有卫星缩略图的高亮效果 */
    function unHighlightAll(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Satellite对象 */
    function update(data?: Record<string, any> | any[], duration?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
    /** 更新卫星之间连接线 */
    function updateLinkage(data?: Record<string, any> | any[], materials?: any[] | Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Settings 提供场景全局参数设置接口（画质、后期、显示、特效等）。 */
  namespace settings {
    /** 控制鼠标右键的点击拾取，默认关闭 */
    function enableRightClickMousePick(enable?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 查询当前工程已经挂载的pak文件包含的自定义的人物角色模型路径 */
    function getCharacterAssetPath(fn?: (...args: any[]) => void): Promise<any>;
    /** 查询当前工程已经挂载的pak文件包含的自定义的无人机模型路径 */
    function getDroneAssetPath(fn?: (...args: any[]) => void): Promise<any>;
    /** 查询当前交互模式 */
    function getInteractiveMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取场景内所有的VTPK标注信息 */
    function getLabelLayer(fn?: (...args: any[]) => void, fn?: (...args: any[]) => void): Promise<any>;
    /** 获取地图样式 */
    function getMapMode(fn?: (...args: any[]) => void, fn?: (...args: any[]) => void): Promise<any>;
    /** 获取ACP工程的坐标系配准(wkt字符串) */
    function getProjectWKT(fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏图层树上对象的属性面板 */
    function hidePropertiesPanel(fn?: (...args: any[]) => void): Promise<any>;
    /** 移除当前显示的VTPK的标注 */
    function removeLabelLayer(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置环境光遮罩淡出距离 */
    function setAmbientFadeDistance(ambientFadeDistance?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置环境光遮罩强度 */
    function setAmbientIntensity(ambientIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置环境光遮罩采样半径 */
    function setAmbientRadius(ambientRadius?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置反走样（Anti-Aliasing）开关 */
    function setAntiAliasing(antiAliasing?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置景深光圈大小 */
    function setAperture(aperture?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置泛光强度 */
    function setBloomIntensity(bloomIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置双击鼠标右键的默认行为，即双击右键是否自动开始相机旋转 */
    function setCameraAutoRotateOnRightDoubleClick(enable?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置指北针位置 */
    function setCampassPosition(left?: number, top?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置指北针可见性 */
    function setCampassVisible(visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 人物漫游模式下，设置自定义的人物角色模型 */
    function setCharacterAssetPath(assetPath?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置人物交互模式的落脚点、人物朝向和观察距离 */
    function setCharacterRoaming(location?: any[], rotation?: any[], distance?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置角色旋转朝向 */
    function setCharacterRotation(rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置透镜色差强度 */
    function setChromaticAberration(chromaticAberration?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置画面对比度 */
    function setContrast(contrast?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置暗角强度 */
    function setDarkCorner(darkCorner?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置景深深度模糊强度 */
    function setDeepBlur(deepBlur?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置景深开关 */
    function setDepthFiethSwitch(depthFiethSwitch?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置景深对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效 */
    function setDofMode(dofMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 无人机漫游模式下，设置自定义的无人机模型 */
    function setDroneAssetPath(assetPath?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否触发CameraMoving事件，CameraMoving事件默认是关闭的，如果需要接收相机移动消息，可以调用此方法 */
    function setEnableCameraMovingEvent(bEnable?: boolean, period?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置交互开关，禁用后可以通过API设置交互。 */
    function setEnableInteract(bEnable?: boolean, fn?: (...args: any[]) => void, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置曝光补偿值 */
    function setExposureCompensation(exposureCompensation?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置自动曝光开关 */
    function setExposureEnabled(exposureEnabled?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置景深焦距 */
    function setFocalLength(focalLength?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水平视场角 */
    function setFovX(fovX?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置工程场景的海拔（地面高度） */
    function setGroundHeight(height?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置高亮颜色 */
    function setHighlightColor(color?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置网络图层服务(WMTS、WMS、MVT等)是否贴合地形或对象 */
    function setImageryLayerEnableDecal(receiveDecalMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置网络图层服务的裂分等级的偏移量，如果图层服务当前某处的裂分等级为6级，参数设置为1则当前图层服务的裂分等级增加1变为7级。 */
    function setImageryLayerLevelOffset(levelOffset?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置交互模式 */
    function setInteractiveMode(mode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置显示对应VTPK的标注 */
    function setLabelLayer(name?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置VTPK标注的深度检测的相机高度阈值 */
    function setLabelLayerDepthTestHeight(depthTestHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置VTPK线性标注的间隔 */
    function setLabelLayerLineSpace(lineSpace?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置VTPK标注的缩放显示百分比 */
    function setLabelLayerScaleRatio(scale?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置VTPK标注符号避让方式 */
    function setLabelLayerSymbolAvoidance(type?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置镜头光晕强度 */
    function setLensFlareIntensity(lensFlareIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置 LUT 调色强度 */
    function setLutIntensity(lutIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置 LUT 调色模式 */
    function setLutMode(lutMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置左侧资源面板的位置偏移 */
    function setMainPanelPos(left?: number, top?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置主界面UI元素的可见性 */
    function setMainUIVisibility(visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置地图样式 */
    function setMapMode(mode?: any, options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置相机的最大观察高度 */
    function setMaxCameraHeight(maxCameraHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置相机的最小观察高度 */
    function setMinCameraHeight(minCameraHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置鼠标悬浮事件返回的时间间隔 */
    function setMouseHoverTime(time?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置鼠标移动事件返回的时间间隔 */
    function setMouseMoveTime(time?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置鼠标拾取功能，目前有三种拾取状态：鼠标左键点击（MouseClick: 0x1)、鼠标移动（MouseMove: 0x2）、鼠标停留（MouseHover: 0x4）     * */
    function setMousePickMask(mask?: number, fn?: (...args: any[]) => void, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置交互的默认移动速度 */
    function setMoveSpeed(speed?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置相机的近裁距离（最近可渲染距离），用于控制相机视野 */
    function setNearClipPlane(nearClipPlane?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置海洋颜色 */
    function setOceanColor(color?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置倾斜摄影全局不透明度 */
    function setOsgbGlobalAlpha(osgbGlobalAlpha?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置倾斜摄影是否参与光照计算 */
    function setOsgbGlobalLitStatus(osgbGlobalLitStatus?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 联网模式（会议室）下设置角色漫游和无人机漫游模式时模型上方显示的文字名称 */
    function setPlayerName(name?: string, size?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置滤镜后期处理效果 */
    function setPostProcessEffects(postProcessEffects?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置图层树上对象的属性面板的屏幕位置偏移 */
    function setPropertiesPanelPos(left?: number, top?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置对象贴合模式 */
    function setReceiveDecalMode(receiveDecalMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置多客户端访问时渲染鼠标同步显示 */
    function setRenderedCursorVisible(bEnable?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置角色漫游使用的默认视角，即第三人称或第一人称 */
    function setRoamViewMode(viewMode?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置第三人称交互使用人物角色默认使用的性别 */
    function setRoleGender(gender?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置画面饱和度 */
    function setSaturation(saturation?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 当交互模式为人物或无人机模式时，设置屏幕操纵杆UI的可见性 */
    function setScreenControlsVisible(visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置屏幕渲染百分比（分辨率缩放） */
    function setScreenPercentage(screenPercentage?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** :::caution 已废弃 */
    function setTerrainAlpha(alpha?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置地形全局不透明度 */
    function setTerrainGlobalAlpha(terrainGlobalAlpha?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置地形是否参与光照计算 */
    function setTerrainGlobalLitStatus(terrainGlobalLitStatus?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置色彩优化（Tonemapping）开关 */
    function setTonemapper(tonemapper?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置屏幕右侧工具栏的可见性 */
    function setToolbarVisible(visible?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置WMTS图层的透明度 */
    function setWMTSLayerOpacity(data?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置WMTS图层的可见性 */
    function setWMTSLayerVisible(data?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度 */
    function setYawSpeed(yawSpeed?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示图层树上对象的属性面板 */
    function showPropertiesPanel(id?: string, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** SettingsPanel 提供对内置设置面板里各项参数进行读写操作的接口对象。 */
  namespace settingsPanel {
    /** 获取参数 相机面板 */
    function getCameraMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取参数 控制面板 */
    function getControlMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取地图样式 */
    function getMapMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取参数 后期面板 */
    function getPostProcessMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取参数 汇报模式面板 */
    function getReportMode(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置参数 相机面板 */
    function setCameraMode(nearClipPlane?: number, fovH?: number, minCameraHeight?: number, maxCameraHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置参数 控制面板 */
    function setControlMode(speed?: number, yawSpeed?: number, isRotateSelf?: boolean, isUseMaleRole?: boolean, viewType?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置地图样式 */
    function setMapMode(mode?: any, options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置-工程面板自定义资源挂载的pak自定义资源文件 */
    function setPakFile(pakfilePathArr?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置-工程面板下自定义资源加载的pak自定义资源文件目录 */
    function setPakFolder(dirArr?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置参数，后期面板，注意：支持设置单个参数或同时设置多个参数 */
    function setPostProcessMode(postProcessOptions?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置参数 汇报模式面板 */
    function setReportMode(showAlign?: number, playMode?: number, isLinkage?: boolean, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** ShapeFileLayer 加载并管理 Shapefile 矢量数据（点/线/面），在三维场景中按样式渲染与查询。 */
  namespace shapeFileLayer {
    /** 添加一个或多个ShapeFileLayer对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的ShapeFileLayer */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个ShapeFileLayer对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 定位到ShapeFileLayer的要素区域 */
    function focusFeature(shapeFileLayerId?: string, featureId?: number, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取ShapeFileLayer的详细信息 包含模型属性和值 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 获取ShapeFileLayer内部要素区域的详细信息 */
    function getFeature(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏ShapeFileLayer */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有ShapeFileLayer */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮ShapeFileLayer对象内部的某一块要素区域 */
    function highlightFeature(shapeFileLayerId?: string, featureId?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮ShapeFileLayer对象内部的多块要素区域 */
    function highlightFeatures(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 打开ShapeFileLayer 返回模型包含的所有属性 */
    function open(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示ShapeFileLayer */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有ShapeFileLayer */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮ShapeFileLayer对象内部的某一块要素区域 */
    function unHighlightFeature(shapeFileLayerId?: string, featureId?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮ShapeFileLayer对象内部的多块要素区域 */
    function unHighlightFeatures(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个ShapeFileLayer对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** SignalWave 以波/涟漪扩散形式表达信号或电磁波的传播与覆盖。 */
  namespace signalWave {
    /** 添加一个或多个SignalWave波束对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的SignalWave */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个SignalWave对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取SignalWave的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏SignalWave */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示SignalWave */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个SignalWave对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** SmoothedParticleHydrodynamics（SPH）基于光滑粒子流体动力学模拟自由表面流体（溃坝、喷溅、漫流）的粒子级运动。 */
  namespace smoothedParticleHydrodynamics {
    /** 根据bin时序文件添加一个或多个光滑粒子流体动力学仿真对象 */
    function addByBin(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据vtk时序文件添加一个或多个光滑粒子流体动力学仿真对象 */
    function addByVtk(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的光滑粒子流体动力学仿真对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个光滑粒子流体动力学仿真对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据光滑粒子流体动力学仿真对象ID获取光滑粒子流体动力学仿真对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏光滑粒子流体动力学仿真对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示光滑粒子流体动力学仿真对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个光滑粒子流体动力学仿真对象，支持更新以下属性： */
    function update(data?: any | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 沿坐标轨迹放样生成带截面体量的三维路径模型，将模型沿样条曲线延展，用于表达具有真实粗细的管道、线缆、管廊等线状实体，支持内置样式或自定义模型路径。 */
  namespace splineMesh {
    /** 添加一个或多个SplineMesh对象，绘制路径模型 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 调用splineMesh对象包含的多个蓝图函数 */
    function callBPFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的SplineMesh对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个SplineMesh对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID删除SplineMesh */
    function deleteByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取SplineMesh对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据splineMesh对象的id查询其包含的蓝图函数信息 */
    function getBPFunction(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个SplineMesh对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有SplineMesh对象 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID隐藏SplineMesh */
    function hideByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个SplineMesh对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有SplineMesh对象 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据分组ID显示SplineMesh */
    function showByGroupId(groupId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个SplineMesh对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景指定坐标处放置图文标签，支持图片、文字、牵引线及点击弹出网页/视频窗口，用于对场景要素进行注记与信息标注。（注意：Tag 已停止更新，推荐使用功能更丰富的 Marker。） */
  namespace tag {
    /** 添加一个或多个Tag对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的Tag */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Tag对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到能观察所有Tag对象的合适距离 */
    function focusAll(distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Tag的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Tag */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有Tag */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有标签的弹出窗口 */
    function hideAllPopupWindow(fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏指定标签的弹出窗口 */
    function hidePopupWindow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否自动关闭标签的弹出窗口 */
    function setAutoHidePopupWindow(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签的位置 */
    function setCoordinate(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签的图片 */
    function setImagePath(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签图片的大小 */
    function setImageSize(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签的可见范围 */
    function setRange(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签是否显示垂直牵引线 */
    function setShowLine(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签的文本 */
    function setText(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签文本的背景颜色 */
    function setTextBackgroundColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签文本的边框颜色 */
    function setTextBorderColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签文本颜色 */
    function setTextColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置标签的URL */
    function setURL(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Tag */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有Tag */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有标签的弹出窗口 */
    function showAllPopupWindow(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示指定标签的弹出窗口 */
    function showPopupWindow(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Tag对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** TileLayer 加载3dt图层模型（倾斜摄影、BIM、人工模型），支持增删改查、单体化高亮、样式与剖切等。 */
  namespace tileLayer {
    /** 添加一个或多个TileLayer对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据挖洞多边形的坐标添加一个或多个挖洞操作，注意：同时只能对一个图层id进行挖洞操作 */
    function addHole(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据shapeFile添加一个或多个挖洞操作 */
    function addHoleByShapeFile(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 添加一个压平操作 */
    function addModifier(id?: string, tileLayerId?: string, coordinates?: any[], ententBufferSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据shapeFile添加一个或多个压平操作 */
    function addModifierByShapeFile(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据多边形的坐标添加一个或多个压平操作，注意：同时只能对一个图层id进行压平操作 */
    function addModifiers(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空接口添加的所有图层对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 清空所有挖洞操作 */
    function clearHole(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空所有压平操作 */
    function clearModifier(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 创建数据库查询条件对象 */
    function createQuery(): Promise<any>;
    /** 删除一个或多个TileLayer对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个挖洞操作 */
    function deleteHole(id?: string, tileLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个压平操作 */
    function deleteModifier(id?: string, tileLayerId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 禁止TileLayer图层参与剖切 */
    function disableClip(ids?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 禁用X光 */
    function disableXRay(ids?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TileLayer图层参与剖切 */
    function enableClip(ids?: number | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置贴花类型对象是否支持贴合TileLayer图层，影响的贴花类型对象包含：Decal、HeatMap、Polyline、Polygon、GeoJSONLayer， */
    function enableDecal(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置图层对水流体对象Fluid的支持，注意：设置false不支持时则水流体的物理碰撞会忽略此图层 */
    function enableFluid(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置指定图层是否支持对网络图层服务(WMTS、WMS、MVT等)进行贴合 */
    function enableImageLayerDecal(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 启用X光，效果图如下： */
    function enableXRay(ids?: number | any[], color?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 定位一个Actor */
    function focusActor(id?: string, objectId?: string, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 定位一个或多个Actor */
    function focusActors(data?: Record<string, any>, distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取TileLayer的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 通过OID查询Actor的矩阵和bound等信息 */
    function getActorInfo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 从空间数据库获取TileLayer下指定Actor的详细属性信息 注意:调用前需先配置Explorer里空间库的对应信息，配置示例如下图： */
    function getActorInfoFromDB(data?: any[] | Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 查询所有图层是否支持压平 */
    function getAllFlattenInfo(fn?: (...args: any[]) => void): Promise<any>;
    /** 查询图层包含的碰撞检测信息 */
    function getCollision(tileLayerIds?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置点云盒子的颜色，注意：仅Box渲染模式下生效 */
    function getDBTabID(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 获取指定TileLayer包含的所有Actor对象的ID */
    function getObjectIDs(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏TileLayer图层 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏Actor */
    function hideActor(id?: string, objectId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个Actor */
    function hideActors(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏指定tilelayer的所有Actor */
    function hideAllActors(tileLayerIds?: string | any[]): Promise<any>;
    /** 高亮一个Actor，效果图如下： */
    function highlightActor(id?: string, objectId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 使用颜色去高亮一个Actor，支持设置不同的高亮颜色去高亮不同的Actor */
    function highlightActorWithColor(id?: string, objectId?: string, color?: any, bWireframe?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮多个Actor，同时支持高亮多个图层的Actor */
    function highlightActors(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 使用颜色去高亮多个Actor，支持设置不同的高亮颜色去高亮不同的Actor */
    function highlightActorsWithColor(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据点云的属性字段值高亮点云匹配到点 */
    function highlightPoints(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据TileLayer的ID在PG数据库中查询 */
    function query(queryOption?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据海拔高度设置TileLayer的分层热力样式，注意：如果是球面坐标系工程，则使用Engine发布3dt图层时需要添加 -terUserHotMap 参数才可以支持热力样式 */
    function setAltitudeHeatMap(tileLayerIds?: string | any[], colors?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TileLayer是否参与碰撞检测 */
    function setCollision(tileLayerIds?: string | any[], enabled?: boolean, mouseInteract?: boolean, mouseFunction?: boolean, characterCollision?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 修改TileLayer图层的3dt文件路径 */
    function setFileName(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置平移 */
    function setLocation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置点云盒子的可见性，注意：仅Box渲染模式下生效 */
    function setPointCloudBoxVisible(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TileLayer图层的点云大小，注意：仅对点云数据转换的3dt图层模型生效 */
    function setPointCloudSize(id?: string, pointCloudSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据点云的属性字段来设置点云模型的渲染颜色 */
    function setPointCloudStyle(data?: Record<string, any> | any[]): Promise<any>;
    /** 设置旋转 */
    function setRotation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置缩放 */
    function setScale(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TileLayer的样式 */
    function setStyle(tileLayerIds?: string | any[], style?: number, color?: any, saturation?: number, brightness?: number, contrast?: number, contrastBase?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置TileLayer图层的可视高度范围 */
    function setViewHeightRange(id?: string, minViewHeight?: number, maxViewHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 多视口状态下，设置图层在各视口的可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示TileLayer图层 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示Actor */
    function showActor(id?: string, objectId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个Actor */
    function showActors(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示指定tilelayer的所有Actor */
    function showAllActors(tileLayerIds?: string | any[]): Promise<any>;
    /** 取消高亮一个Actor */
    function unHighlightActor(id?: string, objectId?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 停止高亮多个Actor，同时支持停止高亮多个图层的Actor */
    function unHighlightActors(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止高亮所有Actor */
    function unHighlightAllActors(fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮点云包含所有点的高亮效果 */
    function unHighlightAllPoints(fn?: (...args: any[]) => void): Promise<any>;
    /** 根据点云的属性字段值取消高亮 */
    function unHighlightPoints(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个TileLayer对象，支持更新以下属性： */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个挖洞操作 */
    function updateHole(id?: string, tileLayerId?: string, holeCoordinate?: any[], isReverseCut?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个压平操作 */
    function updateModifier(id?: string, tileLayerId?: string, coordinates?: any[], ententBufferSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 更新TileLayer关联的数据库记录 */
    function updateRecord(id?: string, newValMap?: Record<string, any>, where?: string, fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Tools 提供量算与空间分析等通用工具能力（如测距、测面、天际线、通视、坡度、剖切、河道断面等，具体以方法为准）。 */
  namespace tools {
    /** 导出天际线分析图片，注意：需先执行开始天际线分析并在页面交互出现天际线图片后才可以执行导出方法exportSkyline */
    function exportSkyline(path?: string, size?: any[], options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 查询系统UI功能操作面板的显示状态 */
    function getUIPanel(type?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏系统UI功能操作面板 */
    function hideUIPanel(type?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 单条线段求交，如果线段上有多个对象则返回距离折线起点位置最近的对象信息，如果折线上没有对象则返回ResourceNotFound */
    function lineIntersect(start?: any[], end?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 多条线段批量求交 */
    function linesIntersect(startEndPointArr?: any[], highPrecision?: boolean, returnDetails?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 使用图片替换纹理 */
    function replaceTextureByImage(texturePath?: string, imageUrl?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 使用网页替换纹理 */
    function replaceTextureByUrl(texturePath?: string, url?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 使用视频流替换纹理 */
    function replaceTextureByVideo(texturePath?: string, videoUrl?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复纹理 */
    function restoreTexture(texturePathArr?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据河道的坐标点和tif高程对河道横断面进行分析 */
    function riverCrossSection(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据河道的shp文件和tif高程对河道横断面进行分析 */
    function riverCrossSectionByShp(option?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置测量模式及相关参数 */
    function setMeasurement(type?: any, options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 打开剖切功能操作面板 */
    function showClipPanel(clipType?: number, screenPosition?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 打开测量功能操作面板 */
    function showMeasurePanel(measureType?: number, screenPosition?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示系统UI功能操作面板 */
    function showUIPanel(type?: number, screenPosition?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 开始等高线分析，适用于地形 */
    function startContourLineAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始填挖方分析，适用于地形 */
    function startCutFillAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始水淹分析 */
    function startFloodFill(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始顶点编辑，目前支持watermesh polygon 3dpolygon polyline RadiationPoint customObject */
    function startGeometryEdit(id?: string, type?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始测量，用户可以在三维场景中点击鼠标进行测量 */
    function startMeasurement(fn?: (...args: any[]) => void): Promise<any>;
    /** 开始面剖切 */
    function startPlaneClip(location?: any[], rotation?: any[], isShowPlane?: boolean, isEditable?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** TileLayer多边形剖切， 效果图如下： */
    function startPolygonClip(coordinates?: any[], isReverseCut?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始天际线分析 */
    function startSkylineAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始日照分析 */
    function startSunshineAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始坡度坡向分析，适用于地形3dt数据 */
    function startTerrainSlopeAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始开敞度分析 */
    function startViewDomeAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始可视域分析 */
    function startViewshedAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始通视分析 */
    function startVisiblityAnalysis(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 开始体剖切 */
    function startVolumeClip(bbox?: any[], direction?: number, isShowBBox?: boolean, isEditable?: boolean, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** :::caution 已废弃 */
    function stopClip(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止等高线分析 */
    function stopContourLineAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止填挖方分析 */
    function stopCutFillAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止水淹分析 */
    function stopFloodFill(fn?: (...args: any[]) => void): Promise<any>;
    /** 退出顶点编辑 */
    function stopGeometryEdit(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止测量 */
    function stopMeasurement(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止面剖切 */
    function stopPlaneClip(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止多边形剖切 */
    function stopPolygonClip(fn?: (...args: any[]) => void): Promise<any>;
    /** 结束天际线分析 */
    function stopSkylineAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止日照分析 */
    function stopSunshineAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止坡度坡向分析 */
    function stopTerrainSlopeAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止开敞度分析 */
    function stopViewDomeAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止可视域分析 */
    function stopViewshedAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止通视分析 */
    function stopVisiblityAnalysis(fn?: (...args: any[]) => void): Promise<any>;
    /** 停止体剖切 */
    function stopVolumeClip(fn?: (...args: any[]) => void): Promise<any>;
    /** 更新体剖切 */
    function updateVolumeClip(bbox?: any[], direction?: number, isShowBBox?: boolean, isEditable?: boolean, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** TopologyLine 绘制连接图层树上模型/对象之间的拓扑连接线，表达对象间的关系与连接。 */
  namespace topologyLine {
    /** 添加一个或多个TopologyLine对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的TopologyLine */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个TopologyLine对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取TopologyLine的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏TopologyLine对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有TopologyLine对象 */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 显示TopologyLine对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有TopologyLine对象 */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个·TopologyLine对象 */
    function update(topologyLine?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** TrafficSimulation 提供城市级交通仿真能力，支持十万级别车辆的微观交通仿真，可通过 .dat 数据驱动大批量车辆按时间/定时器移动，并内置交通热力图模式与多车型配置。 */
  namespace trafficSimulation {
    /** 初始化一个TrafficSimulation对象，支持十万级别的城市交通车辆仿真模拟 */
    function add(trafficSimulation?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 根据相机高度自动高亮TrafficSimulation对象包含的所有车辆 */
    function autoHighlight(id?: string, distance?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个TrafficSimulation对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], distanceRotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏TrafficSimulation对象包含的所有车辆 */
    function hide(id?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏TrafficSimulation对象的热力图效果 */
    function hideHeatMap(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏TrafficSimulation对象包含的所有车辆文字标签 */
    function hideTextLabel(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 高亮TrafficSimulation对象包含的所有车辆 */
    function highlight(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示TrafficSimulation对象包含的所有车辆 */
    function show(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示TrafficSimulation对象的热力图效果 */
    function showHeatMap(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示TrafficSimulation对象包含的所有车辆文字标签 */
    function showTextLabel(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 取消高亮TrafficSimulation对象包含的所有车辆 */
    function unHighlight(id?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 更新一个时刻的TrafficSimulation对象 */
    function update(trafficSimulation?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** 在三维场景中加载并沿指定轨迹运行的列车对象，支持车头朝向、双车头、车厢节数与样式、最大速度与加减速度，模拟列车在轨道上的行驶。 */
  namespace train {
    /** 添加一个或多个Train对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的Train对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Train对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Train对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个Train对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 火车按时间和里程移动 */
    function moveTo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据火车ID暂停火车 */
    function pause(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据火车ID恢复火车移动 */
    function resume(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置火车行驶时自动跟随相机 */
    function setFollow(ids?: string | any[], distance?: number, flyTime?: number, pitch?: number, yaw?: number, sensitivity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个Train对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Train对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** VectorField 基于真实数据(tif/bin)对风场、波浪、洋流、河流等场数据进行向量场/箭头/烟雾形态的仿真。 */
  namespace vectorField {
    /** 添加一个或多个VectorField向量场对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的VectorField对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个VectorField对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取VectorField对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏VectorField对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置向量场对象在进入多视口状态下视口可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示VectorField对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个VectorField对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Vehicle 加载车辆模型并沿路径行驶，模拟交通流与车辆运动。 */
  namespace vehicle {
    /** 添加一个或多个Vehicle对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 调用多个Vehicle对象的多个蓝图函数 */
    function callBatchFunction(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的Vehicle对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Vehicle对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], followEnable?: boolean, distance?: number, flyTime?: number, rotation?: any[], distanceRotation?: any[], offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取Vehicle对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个Vehicle对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Vehicle对象行驶（根据实时获取的GPS数据运动） */
    function moveTo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 暂停指定的载具运动 */
    function pause(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 恢复指定的载具运动 */
    function resume(id?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Vehicle对象行驶的路径点（已知路径点 轨迹动画） */
    function setWayPoint(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个Vehicle对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 启动指定的载具在某个时刻开始运动 */
    function start(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 停止指定的载具运动 */
    function stop(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Vehicle对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Vehicle2 是高级载具对象，在 Vehicle 基础上提供更丰富的车辆驱动、外观与行为控制。 */
  namespace vehicle2 {
    /** 添加一个或多个Vehicle2对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的Vehicle2对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个Vehicle2对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位载具到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID查询Vehicle2对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏一个或多个Vehicle2对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置Vehicle2对象行驶到具体位置（根据实时获取的GPS数据运动） */
    function moveTo(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置载具自动跟随相机 */
    function setFollow(ids?: string | any[], distance?: number, flyTime?: number, pitch?: number, yaw?: number, sensitivity?: number, watchControl?: boolean, offset?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 多视口状态下，设置Vehicle2对象在各视口的可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示一个或多个Vehicle2对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个Vehicle2对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** VideoProjection 将视频/实时流以投影方式贴合到三维场景表面，实现视频与三维的融合。 */
  namespace videoProjection {
    /** 添加一个或多个VideoProjection对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的VideoProjection对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个VideoProjection对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取VideoProjection的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏VideoProjection */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置纵横比 */
    function setAspectRatio(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否背面剔除 */
    function setDepthCulling(id?: string, newVal?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置距离 */
    function setDistance(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置垂直夹角 */
    function setFovy(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置投影线框颜色 */
    function setFrustumColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置位置 */
    function setLocation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置旋转值 */
    function setRotation(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置视频地址 */
    function setVideoURL(id?: string, newVal?: string, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示VideoProjection */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个VideoProjection对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 用于批量多次修改对象的属性 */
    function updateBegin(): Promise<any>;
    /** 用于批量多次修改对象的属性，与updateBegin配套使用 */
    function updateEnd(fn?: (...args: any[]) => void): Promise<any>;
  }

  /** WaterFlowField 精确控制水面各网格的流向与流速，构建可控的水流流场效果。 */
  namespace waterFlowField {
    /** 添加一个或多个WaterFlowField对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 清空场景中所有的WaterFlowField对象 */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个WaterFlowField对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取WaterFlowField对象的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏WaterFlowField对象 */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水流场对象在进入多视口状态下视口可见性 */
    function setViewportVisible(id?: string, vp?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示WaterFlowField对象 */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个WaterFlowField对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** WaterMesh 以自定义网格构建水面/水体，控制其形态、材质与水流表现，作为流场与波纹效果的载体。 */
  namespace waterMesh {
    /** 添加一个或多个WaterMesh对象 */
    function add(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 删除场景中所有的WaterMesh */
    function clear(fn?: (...args: any[]) => void): Promise<any>;
    /** 删除一个或多个WaterMesh对象 */
    function delete(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 自动定位到合适的观察距离 */
    function focus(ids?: string | any[], distance?: number, flyTime?: number, rotation?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 根据ID获取WaterMesh的详细信息 */
    function get(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏WaterMesh */
    function hide(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 隐藏所有WaterMesh */
    function hideAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置WaterMesh顶点坐标 */
    function setCoordinates(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置WaterMesh顶点坐标索引 */
    function setIndices(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置WaterMesh法向 */
    function setNormals(id?: string, newVal?: any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 设置颜色 */
    function setWaterColor(id?: string, newVal?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水流方向 */
    function setWaterDirection(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水流速度 */
    function setWaterSpeed(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水流贴图重复间隔距离 */
    function setWaterUVRepeat(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置水波纹大小 */
    function setWaterWaveScale(id?: string, newVal?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 显示WaterMesh */
    function show(ids?: string | any[], fn?: (...args: any[]) => void): Promise<any>;
    /** 显示所有WaterMesh */
    function showAll(fn?: (...args: any[]) => void): Promise<any>;
    /** 修改一个或多个WaterMesh对象 */
    function update(data?: Record<string, any> | any[], fn?: (...args: any[]) => void): Promise<any>;
  }

  /** Weather 设置与获取场景的天气/气象效果（晴雨雪雾、时间、光照等环境特效）。 */
  namespace weather {
    /** 关闭雨雪效果 */
    function disableRainSnow(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取日期时间 */
    function getDateTime(fn?: (...args: any[]) => void): Promise<any>;
    /** 查询海浪效果参数 */
    function getOceanWave(fn?: (...args: any[]) => void): Promise<any>;
    /** 获取天气相关的参数 */
    function getParams(fn?: (...args: any[]) => void): Promise<any>;
    /** 设置环境光强度 */
    function setAmbientLightIntensity(ambientLightIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置云层的密度 */
    function setCloudDensity(cloudDensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置云效参数 */
    function setCloudParam(cloudsColor?: number, cloudsAltitude?: number, cloudShadowStrength?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置云层的厚度 */
    function setCloudThickness(cloudThickness?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置是否进入黑暗模式  效果图： */
    function setDarkMode(bDark?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置日期时间 */
    function setDateTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, daynightLoop?: boolean, fn?: (...args: any[]) => void): Promise<any>;
    /** 球面工程坐标系下，设置地球大气云层的亮度 */
    function setEarthCloudIntensity(earthCloudIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 球面工程坐标系下，设置地球夜晚灯光的亮度 */
    function setEarthNightLightIntensity(earthNightLightIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 球面工程坐标系下，设置星空背景的亮度 */
    function setEarthStarBackgroundIntensity(earthStarBackgroundIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置雾效参数。 效果图： */
    function setFogParam(fogDensity?: number, fogColor?: number, fogHeightFalloff?: number, fogStartDistance?: number, fogOpacity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置高云层效果参数 */
    function setHighCloud(highCloudLayerCoverage?: number, highCloudWindSpeed?: number, highCloudWindDirection?: number, cirrusCloudDensity?: number, cirrostratusCloudDensity?: number, cirrocumulusCloudDensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置低云层效果参数 */
    function setLowCloud(lowCloudCoverage?: number, lowCloudDensity?: number, lowCloudHeight?: number, lowCloudWindSpeed?: number, lowCloudWindDirection?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置月亮光照强度 */
    function setMoonIntensity(moonIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置月亮尺寸 */
    function setMoonSize(moonSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置海浪效果参数 */
    function setOceanWave(options?: Record<string, any>, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置雨效。注意：开启雨效前需先设置云层的厚度和密度，效果图： */
    function setRainParam(strength?: number, speed?: number, raindropSize?: number, rainColor?: any, alignCamera?: number, overcastStrength?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置大气环境的瑞利散射系数 */
    function setRayleighScatter(rayleighScatter?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置阴影可视距离，即相机镜头距离物体阴影的距离 */
    function setShadowDistance(shadowDistance?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置阴影强度，值越大表示阴影越强 */
    function setShadowIntensity(shadowIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置阴影质量，值越大表示阴影越精细，但也越消耗显卡性能 */
    function setShadowQuality(shadowQuality?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置天空球效果的失效高度，默认值：50000米(50公里) */
    function setSkyVisibleMaxHeight(maxHeight?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置雪效。注意：开启雪效前需先设置云层的厚度和密度，效果图： */
    function setSnowParam(strength?: number, speed?: number, snowflakeSize?: number, snowColor?: any, alignCamera?: number, overcastStrength?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置太阳颜色 */
    function setSunColor(sunColor?: any, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置太阳光照射强度 */
    function setSunIntensity(sunIntensity?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置太阳尺寸 */
    function setSunSize(sunSize?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 设置色温值 */
    function setTemperature(temperature?: number, fn?: (...args: any[]) => void): Promise<any>;
    /** 模拟时间播放 */
    function simulateTime(startTime?: any[] | number, endTime?: any[] | number, duration?: number, fn?: (...args: any[]) => void): Promise<any>;
  }
}

/** 在线调试台/二开页面中与 fdapi 等价的全局对象 */
declare const api: typeof fdapi;
declare const fdplayer: any;
declare const HostConfig: { API: string; Player: string; PlayerMapping?: string; Path: string; [k: string]: any };
declare function log(msg: any, noLineBreak?: boolean, color?: string): void;
declare function sleep(ms: number): Promise<void>;
