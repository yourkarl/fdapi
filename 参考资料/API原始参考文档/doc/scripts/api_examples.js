//====================== 异步接口调用方式测试 ======================
function test_calling_with_callback() {
    fdapi.tag.delete('tag1', function () {
        fdapi.camera.get(function (cam) {
            let o = {
                id: 'tag1',
                coordinate: [cam.x, cam.y, 25.4],
                imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
                imageSize: [28, 28],
                text: 'Bank of Beijing',
                showLine: true
            }
            fdapi.tag.add(o, function () {
                fdapi.tag.focus(o.id, 500, 0.2, function () {
                    log("Test Finished.");
                }); //focus
            }); //add
        }) //delete
    }); //get
}

function test_calling_with_then() {
    fdapi.tag.delete('tag1')
        .then(() => fdapi.camera.get())
        .then(cam => {
            return fdapi.tag.add({
                id: 'tag1',
                coordinate: [cam.x, cam.y, 25.4],
                imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
                imageSize: [28, 28],
                text: 'Bank of Beijing',
                showLine: true
            });
        })
        .then(() => fdapi.tag.focus('tag1', 500, 0.2))
        .then(() => {
            log("Test Finished.");
        });
}

async function test_calling_with_await() {

    await fdapi.tag.delete('tag1')
    let cam = await fdapi.camera.get();

    let o = {
        id: 'tag1',
        coordinate: [cam.x, cam.y, 25.4],
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
        imageSize: [28, 28],
        text: 'Bank of Beijing',
        showLine: true,
    }
    await fdapi.tag.add(o);
    await fdapi.tag.focus(o.id, 500, 0.2);
    log("Test Finished.");
}

function test_calling_with_none() {
    fdapi.tag.delete('tag1')
    //异步方法没有立刻返回 会导致cam获取不正确 
    let cam = fdapi.camera.get();

    let o = {
        id: 'tag1',
        coordinate: [cam.x, cam.y, 25.4],
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
        imageSize: [28, 28],
        text: 'Bank of Beijing',
        showLine: true,
    }
    fdapi.tag.add(o);
    fdapi.tag.focus(o.id, 500, 0.2);
    log("Test Finished.");
}


//====================== DigitalTwinAPI ======================
function test_ac_getVersion() {
    log("SDK Version: " + fdapi.getVersion())
}

function test_ac_reset() {
    //三种清除级别
    //清除所有通过接口添加的对象
    fdapi.reset(1);
    //重置用户设置
    fdapi.reset(2);
    //复位相机到初始位置
    fdapi.reset(4);
    //全部清除
    fdapi.reset(1 | 2 | 4);
    fdapi.reset();

}

function test_ac_saveProject() {
    fdapi.saveProject();
}

function test_ac_getProjectInfo() {
    fdapi.getProjectInfo();
}

function test_ac_destroy() {
    fdapi.destroy();
}

function test_ac_registerTick() {
    fdapi.registerTick(HostConfig.Path + "/locale/zh/popup_tick.html", {
        visible: true,  //是否显示调试窗口
        x: 10,          //调试窗口的位置
        y: 150,
        width: 460,     //调试窗口的尺寸
        height: 300
    });
    fdapi.camera.set(492816.259375, 2491967.416875, 78.772134, -32.735394, -86.559074, 0);
}

var __tickWindowVisible = true;
function test_ac_showTickWindow() {
    __tickWindowVisible = !__tickWindowVisible;
    fdapi.showTickWindow(__tickWindowVisible);
}

function test_ac_executeJsInTickPage() {
    let code = "clientCalled('this is a message called from client.')";
    fdapi.executeJsInTickPage(code);
}

function test_ac_removeTick() {
    fdapi.removeTick();
}

function test_simulate_0_30() {
    fdapi.test(0, 30);
}

function test_simulate_100times_0_10() {
    for (let i = 0; i < 100; i++)
        fdapi.test(0, 10, function () {
            log('Finished: ' + i);
        });
}

function test_simulate_crash() {
    fdapi.test(1);
}



//====================== DigitalTwinPlayer ======================
function test_player_setInstanceOptions() {
    fdplayer.setInstanceOptions({
        iid: '2478360654074',
        pid: 18
    });
}

function test_player_fullscreen() {
    fdplayer.fullscreen = !fdplayer.fullscreen;
}



//====================== camera ======================

function test_camera_get() {
    fdapi.camera.get(function (res) {
        log('This is the output information of the callback function of camera.get, which can be reset to the current position by the following code:\n');
        let str = `fdapi.camera.set(${res.x}, ${res.y}, ${res.z}, ${res.pitch}, ${res.yaw}, 0);\n`;
        log(str);
    })
}

function test_camera_set() {
    //参数：x, y, z, pitch, yaw, flyTime
    fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);
}

function test_camera_lockBBox() {
    //限制相机交互范围
    let bbox = [492552.837539, 2492211.111875, 0, 492597.469727, 2492256.456250, 20]
    fdapi.camera.lockByBBox(bbox);
}



function test_camera_unLockBBox() {
    fdapi.camera.unlock();
}

function test_camera_getEulerAngle() {
    let startPoint = [492552.40625, 2492217.25, 0];
    let endPoint = [492547.75, 2492249.5, 0];
    fdapi.polyline.clear();
    let o = {
        id: 'p1',//折线唯一标识id
        coordinates: [startPoint, endPoint],//构成折线的坐标点数组
        range: [1, 10000],//可视范围
        color: Color.Red,//折线颜色
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
        thickness: 1,//折线宽度
        intensity: 0.2,//亮度
        flowRate: 0.5,//流速
        tiling: 0,//材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false//是否做深度检测
    };
    fdapi.polyline.add(o);
    fdapi.polyline.focus(o.id);
    let eulerAngle = fdapi.camera.getEulerAngle(startPoint, endPoint);
    log("根据空间两点计算的欧拉角:" + eulerAngle);
}

function test_camera_set_byArray() {

    //最后一个元素无用，会忽略
    let cam = [492552.395391, 2491465.370000, 840.020625, -54.823574, -64.677055, 0.000003];
    fdapi.camera.set(cam, 0.2);
}

function test_camera_set_byObject() {

    let cam = {
        "x": 492552.395391,
        "y": 2491465.370000,
        "z": 1031.461914,
        "pitch": -54.823574,
        "yaw": -152.668823,
        "roll": 0.0     //该参数无用，会自动忽略
    };
    fdapi.camera.set(cam, 0.2);
}

function test_camera_lookAt() {
    __distance += 200.0;
    //lookAt参数：x, y, z, distance,  pitch, yaw, flyTime
    fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, __distance, -15.0, -173.0, 0.2);
}

function test_camera_flyAround() {

    //环绕参数：location,rotation, distance, time
    fdapi.camera.flyAround([492552, 2491465, 200], [-54, -150, 0], 300, 5);
}


function test_camera_lookAtBBox1() {
    //设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
    fdapi.settings.setInteractiveMode(0);
    //[minx,miny,minz,maxx,maxy,maxz]
    let bbox = [491904.634063, 2491122.173437, -879.369063, 493670.376758, 2492887.915938, 886.373594];
    //lookAtBBox参数：bbox,  pitch, yaw, flyTime
    fdapi.camera.lookAtBBox(bbox, -15.0, -173.0, 0.5);
}

async function test_camera_lookAtBBox2() {

    //设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
    fdapi.settings.setInteractiveMode(3);
    //[minx,miny,minz,maxx,maxy,maxz]
    let bbox = [492552.837539, 2492211.111875, -6.922683, 492597.469727, 2492256.456250, 11.040344];
    //lookAtBBox参数：bbox,  pitch, yaw, flyTime
    fdapi.camera.lookAtBBox(bbox, -54.0, -173.0, 0.5);
}

function test_camera_getAnimationList() {
    fdapi.camera.getAnimationList();
}

function test_camera_getAnimationImage() {
    //参数：导览名称，可以根据getAnimationList()方法获取
    //注意：因为返回字符串过长，执行此方法前请不要勾选日志的【自动清屏】，具体使用方法请参考api文档
    fdapi.camera.getAnimationImage("导览1");
}

function test_camera_playAnimation() {
    //index：录制导览的索引序号，按数组元素传入的顺序依次播放   
    //mask ：播放导览时的配置掩码：相机位置(Camera:0x1) 环境天气(Environment:0x2) 工程树属性(ProjectTree:0x4) 导览设置(Settings:0x8)
    fdapi.camera.playAnimation([1, 0], AnimationMask.Camera | AnimationMask.Environment);
}

function test_camera_pauseAnimation() {
    fdapi.camera.pauseAnimation();
}

function test_camera_resumeAnimation() {
    fdapi.camera.resumeAnimation();
}

function test_camera_stopAnimation() {
    fdapi.camera.stopAnimation();
}

function test_camera_exitWorld() {
    fdapi.camera.exitWorld();
}

function test_camera_enterWorld() {
    fdapi.camera.enterWorld();

    //params：x, y, z, pitch, yaw, flyTime 控制相机set()、lookAt()方法也可以实现进入世界效果，同时可以设置进入的具体位置和视角 
    //fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);
}

function test_camera_cancelFollow() {
    fdapi.camera.cancelFollow();
}

function test_camera_moveForward() {
    fdapi.camera.moveForward();
}

function test_camera_moveBackward() {
    fdapi.camera.moveBackward();
}

function test_camera_moveLeft() {
    fdapi.camera.moveLeft();
}

function test_camera_moveRight() {
    fdapi.camera.moveRight();
}

function test_camera_moveUp() {
    fdapi.camera.moveUp();
}

function test_camera_moveDown() {
    fdapi.camera.moveDown();
}

function test_camera_turnLeft() {
    fdapi.camera.turnLeft();
}

function test_camera_turnRight() {
    fdapi.camera.turnRight();
}

function test_camera_turnUp() {
    fdapi.camera.turnUp();
}

function test_camera_turnDown() {
    fdapi.camera.turnDown();
}

function test_camera_stop() {
    fdapi.camera.stop();
}

function test_camera_exportOrthoImage() {
    // 导出正交投影图片
    fdapi.camera.exportOrthoImage("D:\\orthoImage.png", [1920, 1080], 88, [492513.613438, 2492183.068945, 40.035171], [-29.806171, -40.45295, 0.000002], [0, 0, 0, 1]);
}

//====================== infoTree ======================
function test_layers_focus() {
    fdapi.infoTree.focus('979A4C034E29728F8A2635AD747B72A3');
}

function test_layers_show() {
    //支持按图层树上文件夹id显示文件夹内所有模型
    fdapi.infoTree.show('979A4C034E29728F8A2635AD747B72A3');
}

function test_layers_hide() {
    //支持按图层树上文件夹id隐藏文件夹内所有模型
    fdapi.infoTree.hide(['979A4C034E29728F8A2635AD747B72A3']);
}

function test_layers_enableXRay() {
    let ids = [1, 2];
    let color = [1, 1, 1, 1];
    fdapi.infoTree.enableXRay(ids, color);
}

function test_layers_disableXRay() {
    let ids = [1, 2];
    fdapi.infoTree.disableXRay(ids);
}

function getRandCoord() {
    //生成随机坐标值或者坐标值数组
    let baseX = 487430.87;
    let baseY = 2489692.75;
    return [baseX + Math.random() * 250, baseY + Math.random() * 250, 8];
}

function getRandCoords(n) {

    var coords = [];
    for (let i = 0; i < n; i++) {
        coords.push(getRandCoord());
    }

    return coords;
}

async function test_layers_addSomeTags() {

    fdapi.camera.set(487759.78125, 2489952.5, 264.63446, -43.952045, 159.880676, 0);

    let oaTags = new Array();

    for (let i = 0; i < 10; i++) {
        oaTags.push({
            id: i,
            coordinate: getRandCoord(),
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            imageSize: [28, 28],
            text: 'T' + i.toString(),
            groupId: 'group0'
        });
    }

    let oaRadiation = new Array();
    for (let i = 0; i < 4; i++) {
        oaRadiation.push({
            id: i,
            coordinate: getRandCoord(),
            radius: 50,
            rippleNumber: 2,
            color: [1, 0, 1, 1],
            intensity: 1.0,
            groupId: 'group0'
        });
    }

    let oaODLines = new Array();
    for (let i = 0; i < 4; i++) {
        oaODLines.push({
            id: i,
            color: [0, 0, 1, 1],
            coordinates: getRandCoords(2),
            flowRate: 1,
            intensity: 0.8,
            bendDegree: 0.5,
            tiling: 0.5,

            lineThickness: 2,
            flowPointSizeScale: 5,
            labelSizeScale: 100,

            lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
            lineStyle: 0,  //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
            flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0

            startPointShape: 0,
            endPointShape: 0,
            startLabelShape: 0,
            endLabelShape: 0,

            groupId: 'group0',
        });
    }

    let oaBeams = new Array();
    for (let i = 0; i < 2; i++) {
        oaBeams.push({
            id: i,
            coordinates: getRandCoords(2),//光流的polyline的坐标数组
            duration: 3,                  //光流粒子的生命周期
            thickness: 0.1,               //光流线的宽度
            interval: 0.2,                //光流粒子发射间隔
            velocity: 0.1,                //光流粒子的速度
            color: [1, 0, 0, 1],          //光流的颜色
            groupId: 'group0'
        });
    }

    let oaPolylines = new Array();
    for (let i = 0; i < 2; i++) {
        oaPolylines.push({
            id: i,
            coordinates: getRandCoords(3),   //光流的polyline的坐标数组
            color: [0, 0, 1, 1],
            style: 1,
            thickness: 15,
            intensity: 0.8,
            flowRate: 0.5,
            groupId: 'group0'
        });
    }

    let oaPolygons = new Array();
    for (let i = 0; i < 4; i++) {
        oaPolygons.push({
            id: i,
            coordinates: getRandCoords(3),   //光流的polyline的坐标数组
            color: Color.Green,              //多边形的填充颜色
            frameThickness: 1,
            groupId: 'group0'
        });
    }


    await fdapi.tag.clear();
    await fdapi.polyline.clear();
    await fdapi.odline.clear();
    await fdapi.beam.clear();
    await fdapi.radiationPoint.clear();
    await fdapi.polygon.clear();

    fdapi.tag.add(oaTags);
    fdapi.polyline.add(oaPolylines);
    fdapi.odline.add(oaODLines);
    fdapi.beam.add(oaBeams);
    fdapi.radiationPoint.add(oaRadiation);
    fdapi.polygon.add(oaPolygons);

}

function test_layers_showByGroupId() {
    fdapi.infoTree.showByGroupId('group0');
}

function test_layers_hideByGroupId() {
    fdapi.infoTree.hideByGroupId('group0');
}

function test_layers_highlightByGroupId() {
    fdapi.infoTree.highlightByGroupId('group0');
}

function test_layers_deleteByGroupId() {
    fdapi.infoTree.deleteByGroupId('group0');
}

async function test_layers_get() {
    let res = await fdapi.infoTree.get();
    console.log(JSON.stringify(res.infotree));
}


function test_layers_getBPFunction() {
    fdapi.infoTree.getBPFunction('2BC267114D436EA43BF695AC98DA4E08')
}

function test_layers_callBPFunction() {
    fdapi.infoTree.focus('2BC267114D436EA43BF695AC98DA4E08')
    //批量调用工程车多个蓝图函数，函数名称为【颜色】【状态】的蓝图函数
    fdapi.infoTree.callBPFunction([
        {
            id: '2BC267114D436EA43BF695AC98DA4E08',
            functionName: '颜色',
            parameters: [
                { "paramType": 16, "paramValue": "红色" }
            ]
        },
        {
            id: '2BC267114D436EA43BF695AC98DA4E08',
            functionName: '状态',
            parameters: [
                { "paramType": 5, "paramValue": "载货" }
            ]
        }
    ]);

}
//====================== cameraTour ======================

async function test_cameraTour_add() {
    await fdapi.cameraTour.delete('1');
    //通过接口添加导览并播放
    let frames = [];
    //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
    frames.push(new CameraTourKeyFrame(0, 1.0, [492501.90625, 2483838.75, 5898.237305], [-55.95829, -89.993935, 0]));
    frames.push(new CameraTourKeyFrame(1, 2.0, [493538.75, 2487061.5, 1166.874878], [-36.769756, -91.261223, 0]));
    frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487789.25, 504.430054], [-23.049517, -91.261223, 0]));
    frames.push(new CameraTourKeyFrame(3, 4.0, [495635.78125, 2491133.75, 183.135956], [-24.96583, -172.325165, 0]));
    frames.push(new CameraTourKeyFrame(4, 5.0, [495270, 2491256.75, 67.038582], [-25.314354, 108.269859, 0]));

    let o = new CameraTourData('1', 'test', frames);
    await fdapi.cameraTour.add(o);
    fdapi.cameraTour.play('1');
}

async function test_cameraTour_update() {
    //调整关键帧
    let frames = [];
    //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
    frames.push(new CameraTourKeyFrame(0, 1.0, [492101.90625, 2483338.75, 5898.237305], [-25.95829, -29.993935, 0]));
    frames.push(new CameraTourKeyFrame(1, 2.0, [493238.75, 2487261.5, 1166.874878], [-46.769756, -11.261223, 0]));
    frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487489.25, 504.430054], [-23.049517, -21.261223, 0]));

    let o = new CameraTourData('1', 'test', frames);
    await fdapi.cameraTour.update(o);
    fdapi.cameraTour.play('1');
}

function test_cameraTour_play() {
    fdapi.cameraTour.play('1');
}

function test_cameraTour_setMouseClickToPause() {
    fdapi.cameraTour.setMouseClickToPause('1', false);
}

function test_cameraTour_setTime() {
    fdapi.cameraTour.setTime('1', 3);
}

function test_cameraTour_stop() {
    fdapi.cameraTour.stop();
}

function test_cameraTour_delete() {
    fdapi.cameraTour.delete('1');
}

function test_cameraTour_pause() {
    fdapi.cameraTour.pause();
}

function test_cameraTour_resume() {
    fdapi.cameraTour.resume();
}

function test_cameraTour_exportVideo() {
    fdapi.cameraTour.exportVideo('1', 'c:/test.mp4');
}

//====================== tileLayer ======================


let terrainId = "E637D8FE42335EE96C58A1840BCAD0CE";
let villaId = "979A4C034E29728F8A2635AD747B72A3";

async function test_tileLayer_add() {
    fdapi.tileLayer.delete('1');
    await fdapi.tileLayer.add({
        id: '1',
        fileName: HostConfig.Path + "/assets/3dt/terrain.3dt",//3dt文件路径
        location: [0, 0, 0],//坐标位置
        rotation: [0, 0, 0],//旋转角度
        scale: [1, 1, 1]    //缩放大小
    });
    fdapi.tileLayer.focus('1', 18000);

}

async function test_tileLayer_update() {
    await fdapi.tileLayer.update({
        id: '1',
        rotation: [0, 90, 0],//旋转角度
        scale: [1, 1, 1]    //缩放大小
    });
    fdapi.tileLayer.focus('1', 18000);
}

function test_tileLayer_delete() {
    fdapi.tileLayer.delete('1');
}

function test_tileLayer_focus() {
    fdapi.tileLayer.focus('1');
}

function test_tileLayer_clear() {
    fdapi.tileLayer.clear();
}

function test_tileLayer_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    //进入多视口
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

    //小别墅 仅视口1和视口3可见
    fdapi.tileLayer.setViewportVisible(villaId, Viewport.V1 | Viewport.V3);
}

function test_tileLayer_getObjectIDs() {
    //查询小别墅包含的构件id
    fdapi.tileLayer.getObjectIDs(villaId);
}

function checkTileLayerId() {
    if (!__tileLayerCurSel || !__tileLayerCurSel.id) {
        logWithColor('red', '请在场景中先点击一个TileLayer图层，再调用此方法')
        return false;
    }
    return true;
}

function test_tileLayer_getActorInfo() {
    fdapi.tileLayer.getActorInfo({
        id: villaId,
        objectIds: [
            "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea1b",
            "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea21",
            "ab343b7e-3705-4b87-bacc-33c06a6cee1d-000eea29",
            "2fc77d67-1af0-4a43-aa66-c544d411df04-000690ee",
            "0e567bfb-4f86-412b-af6a-7a1cdb731324-0007692f"
        ]
    });
}

function test_tileLayer_show() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

    fdapi.tileLayer.show(villaId);
}

function test_tileLayer_hide() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

    fdapi.tileLayer.hide(villaId);
}

function test_tileLayer_setViewHeightRange() {
    fdapi.camera.set(492448.667813, 2492094.840469, 143.587646, -37.938152, -39.432201, 0);
    //设置小别墅的可见高度范围
    fdapi.tileLayer.setViewHeightRange(villaId, 1, 100);
}

function test_tileLayer_enableXRay() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.enableXRay(villaId, [1, 1, 1, 0.0381]);
}

function test_tileLayer_disableXRay() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.disableXRay(villaId);
}

function test_tileLayer_get() {
    fdapi.tileLayer.get('1');
}

function test_tileLayer_get_flattenSupported() {
    //查询所有图层是否支持压平
    fdapi.tileLayer.getAllFlattenInfo();
}

function test_tileLayer_getActorInfoFromDB() {
    //注意：调用前请先保证模型属性信息入库并配置数据库连接信息或已生成sdb文件并和模型3dt存放同级目录，目前只支持bim模型属性查询，具体请参考API文档
    fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": villaId, "objectIds": ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce", "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856"] }]);
}

function test_tileLayer_actor_show() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.showActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
}

function test_tileLayer_actor_hide() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.hideActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
}

function test_tileLayer_actors_hide() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.hideActors([{
        "id": villaId,
        "objectIds": [
            "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
            "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
            "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
            "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
        ]
    }]);
}

function test_tileLayer_actors_show() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.showActors([{
        "id": villaId,
        "objectIds": [
            "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
            "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
            "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
            "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
        ]
    }]);
}

function test_tileLayer_actor_focus() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.focusActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", 10, 1, [-45, 45, 0]);
}

function test_tileLayer_actors_focus() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.focusActors({
        'id': villaId, 'objectIds': [
            "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a",
            "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce",
            "0e567bfb-4f86-412b-af6a-7a1cdb731324-00076856",
            "c85e5be0-d8d5-4148-836f-b55e711ef373-00068ac9"
        ]
    }, 20, 1, [-45, 90, 0]);
}


function test_tileLayer_actor_highlight() {

    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);

    //设置高亮颜色（全局生效）
    fdapi.settings.setHighlightColor(Color.Blue);

    //高亮小别墅房顶构件
    fdapi.tileLayer.highlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
}

function test_tileLayer_actor_highlight_by_color() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.highlightActorWithColor(villaId, ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"], [0, 1, 0, 0.1], false);

}

function test_tileLayer_actor_stopHighlight() {
    fdapi.camera.set(492544.504063, 2492199.183398, 27.880498, -33.256496, -39.439247, 0);
    fdapi.tileLayer.unHighlightActor(villaId, "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a");
}

async function test_tileLayer_actor_highlight_actors() {
    //相机移动到对应actors范围内
    fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);

    //高亮多个Actor 支持高亮不同图层的actor
    let result = await fdapi.tileLayer.getObjectIDs(villaId);
    let objectIds = result.data[0].objectIds;
    fdapi.tileLayer.highlightActors([{ "id": villaId, "objectIds": objectIds }]);
}




async function test_tileLayer_actor_highlight_actors_by_color() {
    //相机移动到对应actors范围内
    fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);

    //高亮多个Actor 支持高亮不同图层的actor
    let result = await fdapi.tileLayer.getObjectIDs(villaId);
    let objectIds = result.data[0].objectIds;

    fdapi.tileLayer.highlightActorsWithColor([{
        id: villaId,
        objectIds: ["1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce"],
        color: [1, 1, 0, 0.1],
        bWireframe: false
    }, {
        id: villaId,
        objectIds: ["98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"],
        color: [1, 0, 0, 0.1],
        bWireframe: true
    }, {
        id: villaId,
        objectIds: ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a"],
        color: [0, 0, 1, 0.1],
        bWireframe: false
    }]);

}


async function test_tileLayer_actor_stopHighlight_actors() {
    //相机移动到对应actors范围内
    fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);


    //停止高亮多个Actor
    let result = await fdapi.tileLayer.getObjectIDs('979A4C034E29728F8A2635AD747B72A3');
    let objectIds = result.data[0].objectIds;
    fdapi.tileLayer.unHighlightActors([{ "id": "979A4C034E29728F8A2635AD747B72A3", "objectIds": objectIds }, { "id": "5664455F43C097E98F4FB3AA6B8B1E84", "objectIds": ["Group1608", "SM_LuDeng385", "archexteriors9_01_2531"] }]);
}

function test_tileLayer_actor_stopHighlightAllActors() {
    //停止所有Actor高亮
    fdapi.tileLayer.unHighlightAllActors();
}

function test_tileLayer_actor_showAllActors() {
    //相机移动到对应actors范围内
    fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);
    fdapi.tileLayer.showAllActors(villaId);
}

function test_tileLayer_actor_hideAllActors() {
    //相机移动到对应actors范围内
    fdapi.camera.set(492533.451055, 2492188.38875, 30.26697, -34.987709, -47.59425, 0);
    fdapi.tileLayer.hideAllActors(villaId);
}

function test_tileLayer_enableFluid() {
    //控制图层是否支持水流体效果
    fdapi.tileLayer.enableFluid([
        {
            "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
            "supportFluid": false //关闭图层对水流体效果的支持
        }
    ]);
}

//分割数组 arr:待分割的数组  size分割后几个一组
function sliceArr(arr, size) {
    let newArr = [];
    for (let i = 0; i < arr.length;) {
        newArr.push(arr.slice(i, i += size));
    }
    return newArr;
}


async function testcase_simulate_building_process() {

    //移动到小别墅
    fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0);

    //隐藏别墅所有构件
    let tileLayerId = '979A4C034E29728F8A2635AD747B72A3';
    fdapi.tileLayer.hideAllActors(tileLayerId);

    //查询别墅包含构件objectIds
    let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);
    let objectIds = result.data[0].objectIds;

    //分割数组
    let divisionArr = sliceArr(objectIds, 10);

    //定时器一次显示10个构件 
    let index = 0;
    let timer = setInterval(() => {
        index++;
        fdapi.tileLayer.showActor(tileLayerId, divisionArr[index]);
        if (index > divisionArr.length) {
            clearInterval(timer);
            fdapi.tileLayer.showAllActors(tileLayerId);
        }
    }, 100);
}


function test_tileLayer_actor_enableClip() {
    fdapi.tileLayer.enableClip("E637D8FE42335EE96C58A1840BCAD0CE");
}

function test_tileLayer_actor_disableClip() {
    fdapi.tileLayer.disableClip("E637D8FE42335EE96C58A1840BCAD0CE");
}

function test_tileLayer_actor_setStyle() {

    fdapi.camera.set(492961.030781, 2491283.131953, 511.248242, -38.79187, -92.09137, 0);

    let style = 1; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    //以下四个属性仅在默认样式0下生效
    let saturation = 1;//饱和度
    let brightness = 1;//亮度
    let contrast = 1;//对比度
    let contrastBase = 0.18;//对比度基准
    fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, [1, 1, 1, 0.11], saturation, brightness, contrast, contrastBase);

}


function test_tileLayer_actor_setHeatMapStyle() {

    fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);

    fdapi.tileLayer.setAltitudeHeatMap("4DECD1704AD8119E33CF658A64A70AD2", [
        {
            "value": 0,
            "color": [0, 0, 1, 1]
        }, {
            "value": 10,
            "color": [0, 0, 1, 1]
        },
        {
            "value": 20,
            "color": [0, 0.4, 1, 1]
        },
        {
            "value": 30,
            "color": [0, 0.8, 1, 1]
        },
        {
            "value": 40,
            "color": [0, 1, 0.8, 1]
        },
        {
            "value": 50,
            "color": [0, 1, 0.4, 1]
        },
        {
            "value": 55,
            "color": [0, 1, 0, 1]
        },

        {
            "value": 60,
            "color": [0, 1, 0, 1]
        },
        {
            "value": 70,
            "color": [0.4, 1, 0, 1]
        },
        {
            "value": 80,
            "color": [0.8, 1, 0, 1]
        },

        {
            "value": 90,
            "color": [1, 0.8, 0, 1]
        },
        {
            "value": 95,
            "color": [1, 0.4, 0, 1]
        },
        {
            "value": 100,
            "color": [1, 0, 0, 1]
        }
    ]);

}

function test_tileLayer_actor_resetStyle() {
    fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);
    let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    //以下四个属性仅在默认样式0下生效
    let saturation = 1;//饱和度
    let brightness = 1;//亮度
    let contrast = 1;//对比度
    let contrastBase = 0.18;//对比度基准
    fdapi.tileLayer.setStyle("4DECD1704AD8119E33CF658A64A70AD2", style, Color.White, saturation, brightness, contrast, contrastBase);

}


function test_tileLayer_actor_setCollision() {
    fdapi.camera.set(492981.669583, 2491805.049102, 162.024072, -27.773481, -104.681236, 0);
    let enabled = true;//是否开启碰撞总开关，如果此参数设置为false，则下面三个参数均会失效
    let mouseInteract = true;//是否开启鼠标交互
    let mouseFunction = true;//是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等
    let characterCollision = true; //是否开启角色碰撞
    fdapi.tileLayer.setCollision("4DECD1704AD8119E33CF658A64A70AD2", enabled, mouseInteract, mouseFunction, characterCollision);
}

function test_tileLayer_actor_getCollision() {
    fdapi.tileLayer.getCollision("4DECD1704AD8119E33CF658A64A70AD2");
}

async function test_tileLayer_setPointCloudSize() {
    //添加点云模型
    fdapi.tileLayer.delete('pcs');
    await fdapi.tileLayer.add({
        id: 'pcs',
        fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径
        location: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
    });
    fdapi.tileLayer.focus('pcs', 800);

    fdapi.tileLayer.setPointCloudSize('pcs', 1);
}


function test_tileLayer_setPointCloudStyle() {


    //添加点云模型
    fdapi.tileLayer.delete('pcs');
    fdapi.tileLayer.add({
        id: 'pcs',
        fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径
        location: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
    });
    fdapi.tileLayer.focus('pcs', 2500);


    let size = 128;
    let dataRender = {
        id: "pcs",
        collision: true,
        renderer: {
            wireThickness: 0.6,
            lightFactor: 10,
            boxSize: [size, size, size],
            renderBox: 1,
            renderBoxWireframe: 1,
            wireframeColor: [1, 1, 1, 1],
            intensity: 0.001,
            frequency: 1,
            materialType: 2,
            rendererType: 1,
            field: "test",
            fieldType: 1,
            splitFactor: 0,
            autoScaleDepth: 10000,
            type: 0,
            gradient: true,
            defaultSymbol: {
                symbolType: 3,
                color: [1, 0, 0, 0.1],
            },
            uniqueValueInfos: [
                {
                    value: 20,
                    symbol: {
                        color: [0, 1, 0, 0.51]
                    }
                },
                {
                    value: 30,
                    symbol: {
                        color: [1, 1, 0, 0.51]
                    }
                },

            ]
        }
    };
    //根据点云的test属性设置样式
    fdapi.tileLayer.setPointCloudStyle(dataRender);
}


function test_tileLayer_highlightPoints() {
    fdapi.tileLayer.highlightPoints([{
        id: "pcs",
        name: "oid",
        values: ["1", "3", "6", "9", "5839", "5849", "5859"],
        glow: false,
        bCustomColor: true,
        color: [1, 0, 0, 1]
    }]);
}

function test_tileLayer_unHighlightPoints() {
    fdapi.tileLayer.unHighlightPoints([{
        id: "pcs",
        name: "oid",
        values: ["1", "3", "5839", "5849"],
    }]);
}


function test_tileLayer_unHighlightAllPoints() {
    fdapi.tileLayer.unHighlightAllPoints();
}


function test_tileLayer_setDecalAttach() {
    fdapi.tileLayer.enableDecal([
        {
            "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",
            "enable": false
        }, {
            "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
            "enable": false
        }
    ]);
}


function test_tileLayer_setAttachWMTSLayer() {
    fdapi.tileLayer.enableImageLayerDecal([
        {
            "tileLayerId": "4DECD1704AD8119E33CF658A64A70AD2",
            "enable": true
        }, {
            "tileLayerId": "E637D8FE42335EE96C58A1840BCAD0CE",
            "enable": false
        }
    ]);
}

async function test_tileLayer_modifier_add() {

    //相机定位到压平区域
    fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

    //隐藏遮挡的植物
    fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

    //隐藏遮挡的风车 按文件夹隐藏
    fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

    //添加前删除 防止id重复
    fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');

    let coordinates = [
        [488501.21875, 2488108, 19.438125610351563],
        [489722.4375, 2490857, 4.0191407203674316],
        [491464.96875, 2489233.5, 18.179296493530273],
        [490473.125, 2486914.5, 2.1426563262939453],
    ];
    //添加压平 注意：此方法会在图层树上创建压平对象
    fdapi.tileLayer.addModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);
}


function test_tileLayer_modifier_update() {
    let coordinates = [
        [489199.34375, 2489516.25, 18.1796875],
        [490395.125, 2490211, 22.756874084472656],
        [490688.53125, 2488826, 26.404375076293945],
    ];
    fdapi.tileLayer.updateModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE', coordinates, 0);
}

function test_tileLayer_modifier_delete() {
    fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');
}

function test_tileLayer_modifier_addModifierByCoordinates() {

    //相机定位到压平区域
    fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

    //隐藏遮挡的植物
    fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

    //隐藏遮挡的风车 按文件夹隐藏
    fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

    //添加前先删除
    fdapi.tileLayer.deleteModifier('m1', 'E637D8FE42335EE96C58A1840BCAD0CE');
    fdapi.tileLayer.deleteModifier('m2', 'E637D8FE42335EE96C58A1840BCAD0CE');

    //第一个压平对象
    let id1 = 'm1';
    let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
    let coordinates1 = [
        [489199.34375, 2489516.25, 18.1796875],
        [490395.125, 2490211, 22.756874084472656],
        [490688.53125, 2488826, 26.404375076293945],
    ];
    //多个坐标构成内环 没有可以不设置
    let innerRings1 = [

    ];
    //羽化范围
    let ententBufferSize1 = 10;

    //第二个压平对象
    let id2 = 'm2';
    let coordinates2 = [
        [488527.96875, 2488053, 24.532032012939453],
        [488768.40625, 2488719.75, 12.159375190734863],
        [490239.5, 2488199.75, 46.452499389648438],
        [489931.5, 2487190.5, 39.267032623291016],
    ];
    //多个坐标构成内环 没有可以不设置
    let innerRings2 = [

    ];
    //羽化范围
    let ententBufferSize2 = 10;

    let data = [
        { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'ententBufferSize': ententBufferSize1 },
        { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'ententBufferSize': ententBufferSize2 }

    ];
    fdapi.tileLayer.addModifiers(data);
}

function test_tileLayer_modifier_addModifierByShapeFile() {

    //相机定位到压平区域
    fdapi.camera.lookAt(492035.37, 2488806.75, 402.62, 200, -15.0, -173.0, 2);

    //隐藏遮挡的植物
    fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

    //隐藏遮挡的风车 按文件夹隐藏
    fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

    //压平的地形图层ID
    let tileLayerId = "E637D8FE42335EE96C58A1840BCAD0CE";

    //根据shapefile文件压平地形 
    let id = 'm3';
    let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
    let data = { 'id': id, 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
    //注意：示例代码内预先准备了压平范围对应的yaping.shp 请提前准备好对应范围shp文件再执行addModifierByShapeFile
    fdapi.tileLayer.addModifierByShapeFile(data);

}

function test_tileLayer_modifier_clear() {
    //注意：清除地形的所有压平后 地形高度会遮挡模型 
    fdapi.tileLayer.clearModifier('E637D8FE42335EE96C58A1840BCAD0CE');
}


//普通挖洞
function test_tileLayer_hole_addHoleByCoordinates() {

    //添加前先清空
    let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
    fdapi.tileLayer.clearHole(tileLayerId);


    let id1 = "hole1";
    //多个坐标 二维数组
    let coordinates1 = [
        [491280.3125, 2490323, 5.8794140815734863],
        [491294.375, 2490340.5, 5.577080249786377],
        [491324.9375, 2490327.75, 7.7592482566833496],
        [491319.8125, 2490308.75, 8.2433004379272461],
        [491296.125, 2490307.75, 7.195253849029541],
    ];
    //多个坐标构成内环 三维数组
    let innerRings1 = [];


    let id2 = "hole2";
    //多个坐标 二维数组
    let coordinates2 = [
        [491342.09375, 2490333.25, 8.4353218078613281],
        [491349.34375, 2490346, 8.3129301071166992],
        [491366.15625, 2490332.25, 9.146367073059082],
        [491360.125, 2490321.5, 9.2895412445068359],
    ];
    //多个坐标构成内环 三维数组
    let innerRings2 = [];
    let data = [
        { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'isReverseCut': false },
        { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'isReverseCut': false }
    ];
    //批量添加
    fdapi.tileLayer.addHole(data);

    fdapi.infoTree.focus('hole1');
}


//根据shp挖洞
function test_tileLayer_hole_addHoleByShapeFile() {

    //相机移动到挖洞区域
    fdapi.camera.set(492084.543438, 2488554.227031, 2181.706875, -43.213093, -169.203659, 0);

    //隐藏遮挡的植物
    fdapi.infoTree.hide(['997A203C4DD937CC5D059596B5D54C23']);

    //隐藏遮挡的风车 按文件夹隐藏
    fdapi.infoTree.hide(['F6EE61D047E0C9DC4DBDEE8DC2EC89F2']);

    //根据shape文件对地形挖洞 
    //注意：示例代码内预先准备了挖洞范围对应的shapeFile文件 请提前准备好对应范围shp文件再执行addHoleByShapeFile
    let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
    let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
    let data = { 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
    fdapi.tileLayer.addHoleByShapeFile(data);
}

async function test_tileLayer_hole_update() {
    let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
    let holeCoordinate = [
        [491280.3125, 2490323, 5.8794140815734863],
        [491294.375, 2490340.5, 5.577080249786377],
        [491324.9375, 2490327.75, 7.7592482566833496],
        [491319.8125, 2490308.75, 8.2433004379272461]
    ];
    await fdapi.tileLayer.updateHole("hole1", tileLayerId, holeCoordinate, false);
}

function test_tileLayer_hole_delete() {
    fdapi.tileLayer.deleteHole("hole1", 'E637D8FE42335EE96C58A1840BCAD0CE');
}

function test_tileLayer_hole_clear() {
    //清空
    fdapi.tileLayer.clearHole('E637D8FE42335EE96C58A1840BCAD0CE');
}



//====================== boxTrigger ======================
async function test_boxTrigger_add() {
    //十字路口包围盒范围
    let boxTrigger1 = {
        id: "boxTrigger1",
        bbox: [
            493136.41250000003,
            2492002.72,
            0,
            493178.11375,
            2492054.72,
            3
        ]
    }
    fdapi.boxTrigger.clear();
    //创建盒子范围热区
    fdapi.boxTrigger.add(boxTrigger1);

    //创建并移动co对象 触发事件
    fdapi.customObject.clear();
    //投影坐标
    let co_location = [492069.5, 2491585.5, 2.11];
    let o = {
        id: 'o1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: co_location,//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [0, 1000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        enableDecal: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    await fdapi.customObject.add(o);
    fdapi.customObject.focus(o.id);

    //gps轨迹
    let positionArr = [
        [492069.5, 2491585.5, 2.11],
        [493136.5625, 2492028, 2.1155762672424316],
        [493141.09375, 2492028, 2.1155762672424316],
        [493143.71875, 2492027.75, 2.1155762672424316],
        [493146.46875, 2492027.75, 2.1155664920806885],
        [493150.1875, 2492027.25, 2.1155664920806885],
        [493153.625, 2492027, 2.1155664920806885],
        [493157.09375, 2492026.75, 2.1155762672424316],
        [493160.84375, 2492027, 2.1155567169189453],
        [493164.84375, 2492027, 2.1155762672424316],
        [493169, 2492026.5, 2.1155860424041748],
        [493173.84375, 2492026.25, 2.215576171875],
        [493178.125, 2492026.5, 2.1155664920806885],
        [493181.71875, 2492026.25, 2.1155762672424316],
        [493186.03125, 2492026, 2.1155762672424316],
        [493190.09375, 2492026.25, 2.1155664920806885],
        [493193.84375, 2492026, 2.1155567169189453],
        [493197.46875, 2492025.75, 2.1155664920806885],
        [493201.34375, 2492025.75, 2.1155664920806885],
        [493205.40625, 2492025.75, 2.1155664920806885]
    ];
    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < positionArr.length; i++) {
        //构造数组元素 每1秒移动一次
        let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    //fdapi.customObject.focus('o1', -1);
    //设置自定义相机跟随
    fdapi.customObject.focus('o1', 5, 0, [-30, 4, 0], ActionMode.Follow);
    //车辆按GPS轨迹移动
    fdapi.customObject.startMove('o1', 0, pathPointArr);

}

async function test_boxTrigger_delete() {
    fdapi.boxTrigger.delete('boxTrigger1');
}

async function test_boxTrigger_clear() {
    fdapi.boxTrigger.clear();
}

//====================== beam ======================

async function test_beam_add() {
    fdapi.beam.clear();
    let o1 = {
        id: 'beam1',
        coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492621.1875, 2489262.5, 11.311718940734863], [493609.71875, 2489372.25, -0.071562498807907104],],
        duration: 3,        //光流粒子的生命周期
        thickness: 3,     //光流线的宽度比例
        interval: 2,       //光流粒子发射间隔
        velocity: 5,        //光流粒子的速度
        color: [0, 1, 0, 0.8]  //光流的颜色
    };

    let o2 = {
        id: 'beam2',
        coordinates: [
            [491669.84375, 2488333.75, 9.8704690933227539],
            [492160.0625, 2488250.5, 11.376718521118164],
            [492468.4375, 2487725.75, 4.851874828338623]
        ],
        duration: 3,        //光流粒子的生命周期
        thickness: 3,     //光流线的宽度比例
        interval: 2,       //光流粒子发射间隔
        velocity: 5,        //光流粒子的速度
        color: [0.5, 0.8, 0, 0.8]  //光流的颜色
    };
    let beamArr = [];
    beamArr.push(o1);
    beamArr.push(o2);
    await fdapi.beam.add(beamArr);

    fdapi.beam.focus(o1.id, 600);
}

function test_beam_update() {
    let o = {
        id: 'beam1',
        coordinates: [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492520.28125, 2490873.25, 9.8798437118530273]],
        duration: 5,
        thickness: 3,
        interval: 0.2,
        velocity: 5,
        color: Color.Blue
    }
    fdapi.beam.update(o);
    fdapi.beam.focus(o.id);
}

function test_beam_delete() {
    let ids = ['beam1', 'beam2'];
    fdapi.beam.delete(ids);
}

function test_beam_focus() {
    fdapi.beam.focus('beam1', 200);
}

function test_beam_clear() {
    fdapi.beam.clear();
}

function test_beam_get() {
    fdapi.beam.get(['beam1', 'beam2']);
}

function test_beam_hide() {
    fdapi.beam.hide('beam1');
}

function test_beam_show() {
    fdapi.beam.show('beam1');
}

function test_beam_hideAll() {
    fdapi.beam.hideAll();
}

function test_beam_showAll() {
    fdapi.beam.showAll();
}

function test_beam_setThickness() {
    fdapi.beam.setThickness('beam1', 15);
}


//====================== coord ======================
let __distance = 100.0;

async function test_coord_screen2World() {

    //屏幕坐标转投影 
    let res = await fdapi.coord.screen2World(600, 400);
    log('Screen2World Result: ' + res.worldLocation);
}

async function test_coord_world2Screen() {

    //设置位置
    fdapi.camera.set(492616.92625, 2492173.455781, 69.874717, -54.843128, -90.117546, 0);


    //投影坐标转屏幕坐标
    let res = await fdapi.coord.world2Screen(492577.2846875, 2492224.9596875003, 2.7180029296875);
    log('World2Screen Result: ' + res.screenPosition);
}

function test_coord_pcs2gcs() {
    //投影转WGS84经纬度 注意：工程需要设置对应的坐标系
    fdapi.coord.pcs2gcs([498326, 3353092], 1);
}

function test_coord_gcs2pcs() {
    //WGS84经纬度转工程坐标系对应的投影坐标 注意：工程需要设置对应的坐标系
    fdapi.coord.gcs2pcs([113.98259824550810, 30.297492106590411], 1);
}




//====================== customMesh ======================

async function test_customMesh_add() {
    fdapi.customMesh.clear();
    await fdapi.customMesh.add({
        id: 'sm1',
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        coordinates: [
            [492610.125, 2491332.75, 12],
            [492866.0625, 2491273.75, 12.23140625655651093],
            [492829.21875, 2491114.5, 12.3060156106948853],
            [492598.9375, 2491150.75, 14.8240623474121094]
        ],//顶点坐标
        colors: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],//顶点颜色
        createCollision: false, //不创建碰撞体
        indices: [2, 0, 3, 0, 2, 1],// 顶点坐标的索引构成的数组
        color: [0.2, 0.5, 0.7, 1], //填充颜色
        material: "/JC_CustomAssets/MaterialLibrary/Exhibition/水/水面1",//资源库自带的透明水材质
        scalarParameters: [{ "name": "不透明度", "value": 0.5 }], //材质不透明度
        vectorParameters: [{ "name": "颜色", "value": [0.2, 0.5, 0.7, 1] }] //材质颜色
    });
    fdapi.customMesh.focus('sm1', 120);

    await fdapi.customMesh.add({
        id: 'sm2',
        coordinateType: 0,
        coordinates: [
            [492573.375, 2491107.5, 14.9681248664855957],
            [492829.84375, 2491038.25, 14.1167187690734863],
            [492822.5, 2490854.75, 13.7651562690734863],
            [492560.9375, 2490875.25, 14.2671875953674316]
        ],
        indices: [2, 0, 3, 0, 2, 1],
        color: [0.2, 0.5, 0.7, 1]
    });
    fdapi.customMesh.focus('sm2', 100);
}

async function test_customMesh_update() {
    await fdapi.customMesh.update({
        id: 'sm1',
        color: [0.2, 0.5, 0.7, 1]
    });
    fdapi.customMesh.focus('sm1');
}

function test_customMesh_delete() {
    fdapi.customMesh.delete('sm1');
}

function test_customMesh_clear() {
    fdapi.customMesh.clear();
}

function test_customMesh_focus() {
    fdapi.customMesh.focus('sm1', 0);
}

function test_customMesh_show() {
    fdapi.customMesh.show(['sm1', 'sm2']);
}

function test_customMesh_hide() {
    fdapi.customMesh.hide(['sm1', 'sm2']);
}

function test_customMesh_get() {
    fdapi.customMesh.get(['sm1', 'sm2']);
}


function test_customMesh_setColor() {
    fdapi.customMesh.setColor('sm1', Color.Blue);
}


//====================== 水流网格 waterMesh ======================

async function test_waterMesh_add() {

    //添加前清空水流网格
    fdapi.waterMesh.clear();
    //执行添加
    await fdapi.waterMesh.add({
        id: 'watermesh1',
        coordinateType: 0,// 坐标系类型
        coordinates: [
            [492972.53125, 2491265, 2],
            [493247.875, 2491182, 2],
            [493187.5, 2490997.5, 2],
            [492922.25, 2491069.25, 2],
        ],//顶点坐标
        indices: [2, 0, 3, 0, 2, 1],// 顶点坐标的索引构成的数组
        //normals: [],//法向 不传则使用默认值
        waterUVRepeat: 500,//贴图的重复间隔距离，取值范围：[1，10000]，单位：米
        waterColor: [0.2, 0.5, 0.7, 1], //水流颜色
        waterSpeed: 0.5, //水流速度，取值范围：[0.01~30]，单位：米/秒，默认值：3米/秒
        waterDirection: 0.8,//水流方向，取值范围：[0~1]，单位：度，此值与[0~360]按比例换算，默认值：0度
        waveScale: 0.8 //波纹强度，取值范围：[0.01~1]，单位：米，默认值：0.3米
    });
    fdapi.waterMesh.focus('watermesh1', 100);

}

async function test_waterMesh_update() {
    await fdapi.waterMesh.update({
        id: 'watermesh1',
        waterColor: [0.0, 0.325, 0.223, 1.0],
        waterSpeed: 0.8
    });
    fdapi.waterMesh.focus('watermesh1', 100);
}

function test_waterMesh_delete() {
    fdapi.waterMesh.delete('watermesh1');
}

function test_waterMesh_clear() {
    fdapi.waterMesh.clear();
}

function test_waterMesh_focus() {
    fdapi.waterMesh.focus('watermesh1', 10);
}

function test_waterMesh_show() {
    fdapi.waterMesh.show('watermesh1');
}

function test_waterMesh_hide() {
    fdapi.waterMesh.hide('watermesh1');
}

function test_waterMesh_get() {
    fdapi.waterMesh.get('watermesh1');
}


//====================== 水流网格 waterMesh ======================

async function test_waterflowField_add() {
    //添加前先清空
    fdapi.waterFlowField.clear();
    //流场内的采集点信息
    //位置坐标数组；
    let pointsArr = _waterFlowFieldPointArr;
    //流速流向数据的数组
    let uvsArr = _waterFlowFieldUVSArr;

    //不透明度
    let alphas = [];
    for (let i = 0; i < uvsArr.length; i++) {
        let uv = uvsArr[i];
        //如果uv都等于0 则设置透明度为0.1
        if (uv[0] == 0 && uv[1] == 0) {
            alphas.push(0.1);
        } else {
            alphas.push(1);
        }
    }

    let flowField1 = {
        "id": "flowField1",//对象id
        "groupId": "flowFieldGroup1",//可选 分组id
        "userData": "myFlowFieldData",//可选 用户数据
        "coordinateType": 0,//坐标系类型 0为投影坐标系
        "displayMode": WaterFlowFieldStyle.HeapMap,//材质类型 0为热力值材质，1为水流材质 2为光流粒子效果
        "validUVRange": [0, 3],//用于显示热力颜色的水流速度范围
        "uvRangeMapping": [2, 3],//用于增强渲染效果而映射到的新的水流速度范围
        "particleScale": 0.2,//水流粒子大小
        //"indices": [2, 0, 3, 0, 2, 1],//顶点索引数组 可以为空，若不传则使用系统默认计算的顶点索引
        "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，传入默认值0时则自动计算最大长度
        "points": pointsArr, //坐标数组
        "uvs": uvsArr, // uv流速流向数组
        "alphas": alphas //不透明度
    };
    await fdapi.waterFlowField.add(flowField1);
    fdapi.waterFlowField.focus('flowField1', 1000);
}

async function test_waterflowField_update() {
    let flowFieldNew = {
        "id": "flowField1",//对象id
        "coordinateType": 0,//坐标系类型 0为投影坐标系
        "displayMode": WaterFlowFieldStyle.Particle,//材质类型 0为热力值材质，1为水流材质 2为光流粒子效果
        "waterColor": [0.0, 0.325, 0.223, 1.0],//水流材质的颜色
        "validUVRange": [0, 1],//水流速度叠加后显示的颜色热力值范围
        "particleScale": 1,//水流粒子大小
        "traceFactor": 0 //粒子轨迹保持因子
    };
    await fdapi.waterFlowField.update(flowFieldNew);
    fdapi.waterFlowField.focus('flowField1', 1000);
}

function test_waterflowField_delete() {
    fdapi.waterFlowField.delete('flowField1');
}

function test_waterflowField_clear() {
    fdapi.waterFlowField.clear();
}

function test_waterflowField_focus() {
    fdapi.waterFlowField.focus('flowField1', 1000);
}

function test_waterflowField_show() {
    fdapi.waterFlowField.show('flowField1');
}

function test_waterflowField_hide() {
    fdapi.waterFlowField.hide('flowField1');
}

function test_waterflowField_get() {
    fdapi.waterFlowField.get('flowField1');
}

function test_waterflowField_testTH() {
    th_waterFlowField();
}

function test_waterflowField_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //设置1和3视口可见
    fdapi.waterFlowField.setViewportVisible('flowField1', Viewport.V1 | Viewport.V3);

}





//====================== 路径模型  SplineMesh ======================

async function test_splineMesh_uav() {

    let arr = [
        [
            505978.6601094584,
            2501125.969677946,
            144.12
        ],
        [
            505982.05481084675,
            2501147.7865119996,
            225
        ],
        [
            505834.22706316254,
            2501144.49594911,
            225
        ],
        [
            505691.0222473663,
            2501123.5789404,
            225
        ],
        [
            505663.05050867377,
            2501055.5750690014,
            225
        ],
        [
            505631.05983805604,
            2501011.5557584106,
            225
        ],
        [
            505583.82322478475,
            2500990.1327026454,
            225
        ],
        [
            505576.6244449295,
            2500994.471034505,
            175
        ],
        [
            505516.48877658846,
            2501045.8430550233,
            175
        ],
        [
            505577.08015638223,
            2501183.117748222,
            175
        ],
        [
            505681.83075935696,
            2501178.2660127524,
            175
        ],
        [
            505722.6493895829,
            2501176.3432761906,
            119.1
        ],
        [
            505746.2563298112,
            2501175.259120162,
            119.1
        ],
        [
            505576.6244449295,
            2500994.471034505,
            210
        ],
        [
            505516.48877658846,
            2501045.8430550233,
            210
        ],
        [
            505536.99890993605,
            2500937.038704262,
            210
        ],
        [
            505603.8436217583,
            2500956.829840027,
            210
        ],
        [
            505691.2900540282,
            2500928.4786558095,
            210
        ],
        [
            505672.0240194119,
            2501145.3641495854,
            210
        ],
        [
            506026.1443782767,
            2501168.796508765,
            210
        ],
        [
            506197.69290243206,
            2501143.1879646494,
            210
        ],
        [
            506289.7027202948,
            2501144.0438122987,
            210
        ],
        [
            506318.7622603551,
            2501110.1398468176,
            210
        ],
        [
            506321.94285737234,
            2501076.560777429,
            140.64
        ],
        [
            506293.8858708181,
            2501072.513912995,
            135.64
        ],
        [
            506273.0610845139,
            2501058.195729421,
            135.64
        ],
        [
            506266.6925770236,
            2501043.207973693,
            135.64
        ],
        [
            505762.3326968981,
            2500721.148314576,
            150
        ],
        [
            505719.61444076383,
            2500713.042861147,
            225
        ],
        [
            505516.7951824813,
            2500851.5888466015,
            225
        ],
        [
            505574.508414315,
            2500988.9665562264,
            225
        ],
        [
            505576.6244449295,
            2500994.471034505,
            175
        ],
        [
            505516.48877658846,
            2501045.8430550233,
            175
        ],
        [
            505548.7768325546,
            2501149.521556866,
            175
        ],
        [
            505483.8422200758,
            2501166.992668691,
            175
        ],
        [
            505427.23765878286,
            2501150.2997100977,
            125
        ],
        [
            505413.7016120827,
            2501107.5210249037,
            125
        ],
        [
            505576.6244449295,
            2500994.471034505,
            175
        ],
        [
            505516.48877658846,
            2501045.8430550233,
            175
        ],
        [
            505460.28077936254,
            2500924.9738934813,
            175
        ],
        [
            505508.148112367,
            2500851.7806363013,
            175
        ],
        [
            505693.1835123641,
            2500730.3802173086,
            175
        ],
        [
            505719.6144428301,
            2500713.037324219,
            130
        ],
        [
            505762.3326968981,
            2500721.148314576,
            130
        ],
        [
            505579.6092135773,
            2500986.0338396183,
            210
        ],
        [
            505603.8436217583,
            2500956.829840027,
            210
        ],
        [
            505792.94801674987,
            2500895.3915093825,
            210
        ],
        [
            505968.9847330262,
            2500810.1360845244,
            210
        ],
        [
            505971.658315685,
            2500730.187193618,
            165
        ],
        [
            506067.39974512154,
            2500687.1873563835,
            165
        ],
        [
            506146.98871273483,
            2500721.2446038364,
            165
        ],
        [
            506191.7588595062,
            2500790.7532999204,
            165
        ],
        [
            506210.9793700065,
            2500857.660474619,
            185
        ],
        [
            506213.54065754754,
            2500905.6235071374,
            170.42
        ],
        [
            506210.3395078277,
            2500939.677652298,
            170.42
        ],
        [
            505746.2563298112,
            2501175.259120162,
            225
        ],
        [
            505578.4386265277,
            2501179.544707314,
            225
        ],
        [
            505516.48877658846,
            2501045.8430550233,
            225
        ],
        [
            505583.82322478475,
            2500990.1327026454,
            225
        ]
    ]

    //添加前清空水流网格
    fdapi.splineMesh.clear();
    //执行添加
    await fdapi.splineMesh.add({
        id: 'splineMesh1',
        groupId: "groupAll",
        userData: "路径模型",
        coordinateType: 0,// 坐标系类型
        coordinates: arr,//路径模型坐标数组
        range: [0, 10000],// 可见范围
        scale: 5, //可选  路径模型的缩放值，默认值：1
        style: SplineMeshStyle.Pipe,//参考SplineMeshStyle样式枚举 
        curveType: 1,  //可选  曲线插值类型
        segment: 10  //可选    曲线插值的分段数量

    });


    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    let uav = {
        id: 'uav',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/其他/无人机_1',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: arr[0],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [0, 10000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [3, 3, 3],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        enableDecal: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
        curveType: 1,  //曲线插值
        segment: 10  //分段点数量
    };
    await fdapi.customObject.add(uav);

    /**
     * 功能描述：实现车辆按GPS轨迹移动，每隔1秒移动一次 
     */
    //gps轨迹
    let positionArr = arr
    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < positionArr.length; i++) {
        //构造数组元素 每1秒移动一次
        let elementPoint = { 'time': (i) * 1, 'coordinate': positionArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    fdapi.customObject.focus('uav', -1);
    //设置自定义相机跟随
    // fdapi.customObject.focus('o1', 5, 0, [-30, 4, 0], ActionMode.Follow);
    //按轨迹移动
    fdapi.customObject.startMove('uav', 0, pathPointArr)

}


async function test_splineMesh_add() {

    //添加前清空
    fdapi.splineMesh.clear();
    //执行添加
    await fdapi.splineMesh.add([{
        id: 'splineMesh0',
        groupId: "group_sm",
        userData: "路径模型0",
        coordinateType: 0,// 坐标系类型
        coordinates: [
            //围挡样式需要坐标的顺序和闭合关系
            [493323.92, 2491434.1803125, 0],
            [493024.968125, 2491471.44875, 0],
            [492990.035625, 2491309.6234375, 0],
            [493249.5775, 2491251.4575, 0],
            [493323.92, 2491434.1803125, 0],

        ],//路径模型坐标数组
        range: [0, 10000],// 可见范围
        scale: 10, //路径模型的缩放值，默认值：1
        style: SplineMeshStyle.Fence_2 //样式枚举
    }, {
        id: 'splineMesh1',
        groupId: "group_sm",
        userData: "路径模型1",
        coordinateType: 0,// 坐标系类型
        coordinates: [
            [492922.25, 2491069.25, 2],
            [493187.5, 2490997.5, 2],
            [493247.875, 2491182, 2],
            [492972.53125, 2491265, 2],
        ],//路径模型坐标数组
        range: [0, 10000],// 可见范围
        scale: 10, //路径模型的缩放值，默认值：1
        style: SplineMeshStyle.Pipe //样式枚举
    }, {
        id: 'splineMesh2',
        groupId: "group_sm",
        userData: "路径模型2",
        coordinateType: 0,// 坐标系类型
        coordinates: [[493381.7971875, 2490992.06375, 10],
        [493488.2153125, 2491400.73046875, 20],
        [493602.3565625, 2491485.768984375, 30],
        [493731.93343750003, 2491515.048671875, 50],
        [493789.85281250003, 2491384.991640625, 60],
        [493776.03625, 2491302.76265625, 80],
        [493750.6428125, 2491173.12140625, 99]],//路径模型坐标数组
        range: [0, 10000],// 可见范围
        scale: 10, //路径模型的缩放值，默认值：1
        meshPath: "/JC_CustomAssets/SplineLibrary/Exhibition/其他/矩形管道" //自定义样式的路径 注意：传入后会自动覆盖style参数
    }]);
    fdapi.splineMesh.focus('splineMesh1', 50);

    //批量调用多个蓝图函数，函数名称为【颜色】【透明度】【矩形】的蓝图函数
    fdapi.splineMesh.callBPFunction([
        {
            id: 'splineMesh1',
            functionName: '透明度',
            parameters: [
                { "paramType": 3, "paramValue": 5 }
            ]
        },
        {
            id: 'splineMesh1',
            functionName: '颜色',
            parameters: [
                { "paramType": 6, "paramValue": [1, 1, 0, 1] }
            ]
        }, {
            id: 'splineMesh2',
            functionName: "矩形",
            parameters: [{
                name: "矩形颜色",
                paramType: 6,
                paramValue: [0, 1, 0, 1]
            }, {
                name: "矩形亮度",
                paramType: 3,
                paramValue: 10
            }, {
                name: "矩形不透明度",
                paramType: 3,
                paramValue: 1
            }, {
                name: "光流速度",
                paramType: 3,
                paramValue: 0.1
            }, {
                name: "光流密度",
                paramType: 2,
                paramValue: 0
            }]
        }
    ]);



}

async function test_splineMesh_update() {
    await fdapi.splineMesh.update({
        id: 'splineMesh1',
        coordinates: [
            [492972.53125, 2491265, 22],
            [493247.875, 2491182, 82],
            [493187.5, 2490997.5, 108],
            [492922.25, 2491069.25, 286],
        ],//路径模型坐标数组
        range: [0, 5000],// 可见范围
        scale: 10,
    });
    fdapi.splineMesh.focus('splineMesh1', 100);


    //批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数
    fdapi.splineMesh.callBPFunction([
        {
            id: 'splineMesh1',
            functionName: '透明度',
            parameters: [
                { "paramType": 3, "paramValue": 3 }
            ]
        },
        {
            id: 'splineMesh1',
            functionName: '颜色',
            parameters: [
                { "paramType": 6, "paramValue": [1, 0, 0, 1] }
            ]
        },
        {
            id: 'splineMesh2',
            functionName: '透明度',
            parameters: [
                { "paramType": 3, "paramValue": 3 }
            ]
        },
        {
            id: 'splineMesh2',
            functionName: '颜色',
            parameters: [
                { "paramType": 6, "paramValue": [1, 0, 1, 1] }
            ]
        }
    ]);
}

function test_splineMesh_delete() {
    fdapi.splineMesh.delete(['splineMesh1', 'splineMesh2']);
}

function test_splineMesh_clear() {
    fdapi.splineMesh.clear();
}

function test_splineMesh_focus() {
    fdapi.splineMesh.focus('splineMesh1', 100);
}

function test_splineMesh_show() {
    fdapi.splineMesh.show(['splineMesh1', 'splineMesh2']);
}

function test_splineMesh_hide() {
    fdapi.splineMesh.hide(['splineMesh1', 'splineMesh2']);
}

function test_splineMesh_get() {
    fdapi.splineMesh.get(['splineMesh1', 'splineMesh2']);
}


function test_splineMesh_showAll() {
    fdapi.splineMesh.showAll();
}

function test_splineMesh_hideAll() {
    fdapi.splineMesh.hideAll();
}

function test_splineMesh_showByGroupId() {
    fdapi.splineMesh.showByGroupId('group_sm');
}

function test_splineMesh_hideByGroupId() {
    fdapi.splineMesh.hideByGroupId('group_sm');
}

function test_splineMesh_deleteByGroupId() {
    fdapi.splineMesh.deleteByGroupId('group_sm');
}


function test_splineMesh_getBPFunction() {
    fdapi.splineMesh.getBPFunction(['splineMesh1']);
}

async function test_splineMesh_callBPFunction() {

    //查询蓝图函数包含的参数信息 
    let res = await fdapi.splineMesh.getBPFunction(['splineMesh1']);
    let functionArr = res.data[0].params;

    //批量调用多个蓝图函数，函数名称为【颜色】【透明度】的蓝图函数
    fdapi.splineMesh.callBPFunction([
        {
            id: 'splineMesh1',
            functionName: '透明度',
            parameters: [
                { "paramType": 3, "paramValue": 10 }
            ]
        },
        {
            id: 'splineMesh1',
            functionName: '颜色',
            parameters: [
                { "paramType": 6, "paramValue": [1, 0, 0, 1] }
            ]
        },
        {
            id: 'splineMesh2',
            functionName: '颜色',
            parameters: [
                { "paramType": 6, "paramValue": [1, 1, 0, 1] }
            ]
        },
        {
            id: 'splineMesh2',
            functionName: '透明度',
            parameters: [
                { "paramType": 3, "paramValue": 8 }
            ]
        },
    ]);
}

//=================================vectorField 向量场==========================================

function test_vectorField_add() {
    //添加前先清空
    fdapi.vectorField.clear();
    let tifPath = HostConfig.Path + "/assets/tif/typhoon.tif";
    let typhoon = {
        "id": "typhoon",
        "coordinate": [0, 0, 0],
        "repeatCount": 10,
        "displayMode": VectorFieldStyle.Typhoon,
        "width": 453,
        "height": 565,
        "fieldScale": [1, 1, 1],
        "bNeedProjection": false,
        "wkt": "",
        "offset": [0, 0, 0],
        "singleSpriteSize": 9000,
        "vfIntensAsVelocity": 45000 * 0.3,
        "lifeTime": 3,
        "headBrightness": 1,
        "bDynamicRenderBound": false,
        "vetorFieldFilePath": tifPath
    }
    __g.vectorField.add(typhoon);
    //fdapi.vectorField.focus('typhoon', 1000000);
    fdapi.camera.set(12632340.389977, 2689776.08445, 10794963.2, -85.981941, -91.865036, 0);

}

function test_vectorField_update() {

    let tifPath = HostConfig.Path + "/assets/tif/typhoon.tif";
    //待更新对象
    let typhoon = {
        "id": "typhoon",
        "repeatCount": 20,
        "displayMode": VectorFieldStyle.Typhoon,
        "fieldScale": [1, 1, 1],
        "bNeedProjection": false,
        "wkt": "",
        "offset": [0, 0, 0],
        "singleSpriteSize": 10000,
        "vfIntensAsVelocity": 45000 * 0.8,
        "lifeTime": 5,
        "headBrightness": 2,
        "vetorFieldFilePath": tifPath
    }
    fdapi.vectorField.update(typhoon);
}

function test_vectorField_delete() {
    fdapi.vectorField.delete('typhoon');
}

function test_vectorField_clear() {
    fdapi.vectorField.clear();
}

function test_vectorField_focus() {
    fdapi.vectorField.focus('typhoon', 10000000);
}

function test_vectorField_show() {
    fdapi.vectorField.show('typhoon');
}

function test_vectorField_hide() {
    fdapi.vectorField.hide('typhoon');
}

function test_vectorField_get() {
    fdapi.vectorField.get('typhoon');
}


function test_vectorField_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //设置1和3视口可见
    fdapi.vectorField.setViewportVisible('typhoon', Viewport.V1 | Viewport.V3);

}







//====================== coastline ======================

async function test_coastline_add() {
    fdapi.coastline.clear();
    let coastline = {
        id: 'coastline',
        bbox: [
            494274.8971875,
            2487771.141875,
            0,
            495095.20875,
            2491681.8159375,
            10
        ],
        style: 0, //海岸线的样式
        waveSpeed: 0.5, //海浪拍打沙滩的速度，单位：米/秒，默认值：0.5
        windVelocity: [-150, 50], //海风风速的UV向量，此参数会影响海面效果，取值示例：[U,V]
        enableFloodFill: true, //是否开启水淹，默认值：false
        seaLevelTimeInterval: 0.1, //海平面水位每次抬升的时间间隔，单位：秒，默认值：0.1s
        seaLevelIncrement: 0.1,  //海平面水位每次抬升的高度，单位：米，默认值：0.1米
        seaLevelOffset: 0, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米
        seaLevelMaxElevation: 10 //海平面水位抬升的最大高度，单位：米，默认值：10米
    }
    await fdapi.coastline.add(coastline);
    fdapi.coastline.focus("coastline");
}

async function test_coastline_update() {
    let coastline = {
        id: 'coastline',
        enableFloodFill: false, //是否开启水淹，默认值：false
        seaLevelOffset: 2, //基于bbox的中心位置Z偏移的高度，单位：米，默认值：0米
    }
    await fdapi.coastline.update(coastline);
    fdapi.coastline.focus("coastline");
}

function test_coastline_delete() {
    fdapi.coastline.delete('fd1');
}

function test_coastline_clear() {
    fdapi.coastline.clear();
}

function test_coastline_focus() {
    fdapi.coastline.focus('coastline');
}

function test_coastline_show() {
    fdapi.coastline.show('coastline');
}

function test_coastline_showAll() {
    fdapi.coastline.showAll();
}

function test_coastline_hide() {
    fdapi.coastline.hide('coastline');
}

function test_coastline_hideAll() {
    fdapi.coastline.hideAll();
}

function test_coastline_get() {
    fdapi.coastline.get('coastline');
}


//=================================HydrodynamicModel2 二维水动力模型==========================================

function test_hydrodynamicModel_add() {
    //添加前先清空
    fdapi.hydrodynamicModel2.clear();

    let hydrodynamicModel1 = {
        "id": "hdm1",
        "jsonFilePath": "F:/UnrealProjects/water/out/writeFile.json",
        "coordinate": [
            12984831,
            4800354.5,
            0
        ],
        "rotation": [
            0,
            0,
            0
        ],
        "displayMode": 0,
        "valueRange": [
            0,
            3
        ],
        "time": 1,
        "playTimes": 1,
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.25,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.75,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    };
    fdapi.hydrodynamicModel2.add(hydrodynamicModel1);
    fdapi.hydrodynamicModel2.focus('hdm1', 100);
}

function test_hydrodynamicModel_update() {
    let hydrodynamicModel2 = {
        "id": "hdm1",
        "jsonFilePath": "F:/UnrealProjects/water/out/writeFile.json",
        "coordinate": [
            12984831,
            4800354.5,
            0
        ],
        "rotation": [
            0,
            0,
            0
        ],
        "displayMode": 0,
        "valueRange": [
            0,
            3
        ],
        "time": 2,
        "playTimes": 2,
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 0.25,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 0.5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 0.75,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 1,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    };
    fdapi.hydrodynamicModel2.update(hydrodynamicModel2);
}

function test_hydrodynamicModel_delete() {
    fdapi.hydrodynamicModel2.delete('hdm1');
}

function test_hydrodynamicModel_clear() {
    fdapi.hydrodynamicModel2.clear();
}

function test_hydrodynamicModel_focus() {
    fdapi.hydrodynamicModel2.focus('hdm1', 100);
}

function test_hydrodynamicModel_show() {
    fdapi.hydrodynamicModel2.show('hdm1');
}

function test_hydrodynamicModel_hide() {
    fdapi.hydrodynamicModel2.hide('hdm1');
}

function test_hydrodynamicModel_get() {
    fdapi.hydrodynamicModel2.get('hdm1');
}

function test_hydrodynamicModel_setTime() {
    fdapi.hydrodynamicModel2.setTime({ "id": "hdm1", "displayMode": 1, "time": 10 });
}

function test_hydrodynamicModel_startPlay() {
    fdapi.hydrodynamicModel2.startPlay({ "id": "hdm1", "displayMode": 1, "time": 0 });
}

function test_hydrodynamicModel_pause() {
    fdapi.hydrodynamicModel2.pause(["hdm1"]);
}

function test_hydrodynamicModel_resume() {
    fdapi.hydrodynamicModel2.resume(["hdm1"]);
}

function test_hydrodynamicModel_stopPlay() {
    fdapi.hydrodynamicModel2.stopPlay(["hdm1"]);
}


//==========================HydroDynamic2D 二维水动力模型===============================
function test_hydrodynamic2d_add_new_tif() {
    //添加tif数据源
    fdapi.hydrodynamic2d.clear();
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        "id": "hdm_tif",
        "displayMode": 0,//真实水样式
        "waterMode": 0, //水面材质类型
        "alphaMode": 0,//使用colors色带透明度
        "alphaGradientDepthRange": [0, 2],//羽化范围
        "collision": true,//开启碰撞
        "arrowColor": [1, 1, 1, 0.18],//可选
        "arrowTiling": 2,//可选
        "rippleDensity": 1,//可选
        "rippleTiling": 1,//可选
        "speedFactor": 1,//可选
        "speedRange": [0, 1],//可选
        "alphaComposite": true,
        "waterDepth": path + "/assets/tif/depth.tif",
        "flowField": path + "/assets/tif/uv.tif",
        "dem": path + "/assets/tif/dem.tif",
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": 0, "color": [0, 1, 0, 0] },
                { "value": 0.1, "color": [0.2196, 0.6549, 0, 0] },
                { "value": 0.5, "color": [0.4314, 0.7608, 0.0118, 0.11] },
                { "value": 1, "color": [0.6902, 0.8784, 0.0039, 0] },
                { "value": 1.5, "color": [1, 1, 0, 1] },
                { "value": 2.5, "color": [1, 0.3333, 0, 1] },
                { "value": 3, "color": [1, 0, 0, 1] }
            ]
        }
    };
    fdapi.hydrodynamic2d.addByTif(hydrodynamic2d_add);
    //fdapi.hydrodynamic2d.focus('hdm_tif', 1000);
    fdapi.camera.set(431187.23375, 4415879.210312, 48.861699, -31.722942, 40.740395, 0);

}

function test_hydrodynamic2d_add_new_sdb() {
    //添加sdb数据源
    fdapi.hydrodynamic2d.clear();
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        "id": "hdm_sdb",
        "offset": [0, 0, 0],
        "displayMode": 1,
        "waterMode": 1,
        "collision": true,//开启碰撞
        "waterDepthAttributeName": "depth",
        "uvAttributeName": "velocity",
        "sdbFilePath": path + "/assets/sdb/THC_1.sdb",
        "alphaMode": 0,//使用colors色带透明度
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": 0, "color": [0, 1, 0, 0.01] },
                { "value": 0.1, "color": [0.2196, 0.6549, 0, 0.11] },
                { "value": 0.5, "color": [0.4314, 0.7608, 0.0118, 0.21] },
                { "value": 1, "color": [0.6902, 0.8784, 0.0039, 0.31] },
                { "value": 1.5, "color": [1, 1, 0, 0.41] },
                { "value": 2.5, "color": [1, 0.3333, 0, 0.51] },
                { "value": 3, "color": [1, 0, 0, 0.61] }
            ]
        }
    };
    fdapi.hydrodynamic2d.addBySdb(hydrodynamic2d_add);
    fdapi.hydrodynamic2d.focus('hdm_sdb', 1000);

}


function test_hydrodynamic2d_add_new_shp() {


    //添加shp数据源
    fdapi.hydrodynamic2d.clear();
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        "id": "hdm_shp",
        "offset": [0, 0, 0],
        "displayMode": 1,
        "waterMode": 1,
        "alphaMode": 1,//使用数据水深控制透明度
        "alphaGradientDepthRange": [0, 2],//羽化范围
        "arrowColor": [1, 0, 0, 0],
        "alphaMode": 0,//使用colors色带透明度
        "collision": true,//开启碰撞
        "depthRange": [0, 1],
        "shpFilePath": path + "/assets/h2d/shp/Triangles.shp",
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": 0, "color": [0, 1, 0, 0.01] },
                { "value": 0.2, "color": [0.2196, 0.6549, 0, 0.05] },
                { "value": 0.4, "color": [0.4314, 0.7608, 0.0118, 0.11] },
                { "value": 0.6, "color": [0.6902, 0.8784, 0.0039, 0.21] },
                { "value": 0.8, "color": [1, 1, 0, 0.41] },
                { "value": 0.9, "color": [1, 0.3333, 0, 0.51] },
                { "value": 1, "color": [1, 0, 0, 0.61] }
            ]
        }
    };
    fdapi.hydrodynamic2d.add(hydrodynamic2d_add);
    // fdapi.hydrodynamic2d.focus('hdm_shp',2000);
    fdapi.camera.set(1407.49627, -223.943389, 1562.34375, -85.575516, -59.419064, 0);

    let index = 15;
    let hydrodynamicModel_for_update = {
        "id": "hdm_shp",
        "updateTime": 1,
        "vertexWaterDepth": true,
        "shpDataFilePath": ""
    }

    //使用dat数据填充shp网格
    let updateTimer = setInterval(async () => {
        index = index + 1;
        hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/THC_" + index + ".dat";

        if (index > 25) {
            clearInterval(updateTimer)
        } else {
            await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
        }
    }, 1000);

}


async function test_hydrodynamic2d_add_new_shp_clip_water() {

    fdapi.hydrodynamic2d.clear()
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        id: 'hdm_shp_clip', // HydroDynamic2D对象ID
        displayMode: 0, // 水流场样式： 0水面 1热力 2流场
        collision: true, //开启碰撞
        shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
    }
    await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
    //  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
    fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

    let index = 0;
    let hydrodynamicModel_for_update = {
        "id": "hdm_shp_clip",
        "updateTime": 1,
        "vertexWaterDepth": true,
        "shpDataFilePath": ""
    }

    //使用dat数据填充shp网格
    let updateTimer = setInterval(async () => {
        index = index + 1;
        hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

        if (index > 3) {
            clearInterval(updateTimer)
        } else {
            await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
        }
    }, 3000);
}

async function test_hydrodynamic2d_add_new_shp_clip_heat() {

    fdapi.hydrodynamic2d.clear()
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        id: 'hdm_shp_clip', // HydroDynamic2D对象ID
        displayMode: 1, // 水流场样式： 0水面 1热力 2流场
        collision: true, //开启碰撞
        shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
        arrowVisibleDistance: 5000000, ////动态箭头距离
        dynamicArrow: { //动态箭头配置
            numArrows: 5000,
            speedFactor: 10,
            sizeScale: 0.1
        }
    }
    await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
    //  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
    fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

    let index = 0;
    let hydrodynamicModel_for_update = {
        "id": "hdm_shp_clip",
        "updateTime": 1,
        "vertexWaterDepth": true,
        "shpDataFilePath": ""
    }

    //使用dat数据填充shp网格
    let updateTimer = setInterval(async () => {
        index = index + 1;
        hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

        if (index > 3) {
            clearInterval(updateTimer)
        } else {
            await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
        }
    }, 3000);

}

async function test_hydrodynamic2d_add_new_shp_clip_flow() {

    fdapi.hydrodynamic2d.clear()
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        id: 'hdm_shp_clip', // HydroDynamic2D对象ID
        displayMode: 2, // 水流场样式： 0水面 1热力 2流场
        collision: true, //开启碰撞
        shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
    }
    await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
    //  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
    fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

    let index = 0;
    let hydrodynamicModel_for_update = {
        "id": "hdm_shp_clip",
        "updateTime": 1,
        "vertexWaterDepth": true,
        "shpDataFilePath": ""
    }

    //使用dat数据填充shp网格
    let updateTimer = setInterval(async () => {
        index = index + 1;
        hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

        if (index > 3) {
            clearInterval(updateTimer)
        } else {
            await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
        }
    }, 3000);

}

function test_hydrodynamic2d_add_new_bin() {

    fdapi.hydrodynamic2d.clear();
    let bbox = [421386.75, 4413920, 0, 433046.59375, 4425740.5, 0];
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        "id": "hdm_bin",
        "bbox": bbox,
        "offset": [0, 0, 0],
        "depthRange": [0, 3],
        "dataSize": [583, 591],
        "displayMode": 1,
        "waterMode": 1,
        "collision": true,//开启碰撞
        "waveBrightness": 10,
        "alphaMode": 0,
        "arrowColor": [1, 1, 1, 0.5],
        "arrowTiling": 2,
        "rippleDensity": 1,
        "rippleTiling": 1,
        "speedFactor": 1,
        "alphaComposite": true,
        "waterDepth": path + "/assets/bin/HydrodynamicModel/depth1.bin",
        "flowField": path + "" + "/assets/bin/HydrodynamicModel/uv1.bin",
        "dem": path + "/assets/bin/HydrodynamicModel/dem.bin",
        "alphaMode": 0, //使用colors色带透明度
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": 0, "color": [0, 1, 0, 0] },
                { "value": 0.1, "color": [0.2196, 0.6549, 0, 0] },
                { "value": 0.5, "color": [0.4314, 0.7608, 0.0118, 0] },
                { "value": 1, "color": [0.6902, 0.8784, 0.0039, 0] },
                { "value": 1.5, "color": [1, 1, 0, 1] },
                { "value": 2.5, "color": [1, 0.3333, 0, 1] },
                { "value": 3, "color": [1, 0, 0, 1] }
            ]
        }
    };
    fdapi.hydrodynamic2d.addByBin(hydrodynamic2d_add);
    fdapi.hydrodynamic2d.focus('hdm_bin', 1000);

}

async function test_hydrodynamic2d_update_new() {

    fdapi.hydrodynamic2d.clear()
    let path = HostConfig.Path;
    let hydrodynamic2d_add = {
        id: 'hdm_shp_clip', // HydroDynamic2D对象ID
        displayMode: 1, // 水流场样式： 0水面 1热力 2流场
        collision: true, //开启碰撞
        shpFilePath: path + "/assets/h2d/shp/clip4550.shp",//预加载的水动力模型预演范围shp
        arrowVisibleDistance: 5000000, ////动态箭头距离
        dynamicArrow: { //动态箭头配置
            numArrows: 5000,
            speedFactor: 10,
            sizeScale: 0.1
        }
    }
    await fdapi.hydrodynamic2d.add(hydrodynamic2d_add)
    //  fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
    fdapi.camera.set(420195.720273, 3333829.848594, 13405.67625, -26.96995, 105.585541, 0);

    let index = 0;
    let hydrodynamicModel_for_update = {
        "id": "hdm_shp_clip",
        "updateTime": 1,
        "vertexWaterDepth": true,
        "shpDataFilePath": ""
    }

    //使用dat数据填充shp网格
    let updateTimer = setInterval(async () => {
        index = index + 1;
        hydrodynamicModel_for_update.shpDataFilePath = path + "/assets/h2d/dat/RESULTS00" + index + ".dat";

        if (index > 3) {
            clearInterval(updateTimer)
        } else {
            await __g.hydrodynamic2d.update(hydrodynamicModel_for_update);
        }
    }, 3000);

}



function test_hydrodynamic2d_delete_new() {
    fdapi.hydrodynamic2d.delete('hdm_shp_clip');
}

function test_hydrodynamic2d_clear_new() {
    fdapi.hydrodynamic2d.clear();
}

function test_hydrodynamic2d_focus_new() {
    fdapi.hydrodynamic2d.focus('hdm_shp_clip', 100);
}

function test_hydrodynamic2d_show_new() {
    fdapi.hydrodynamic2d.show('hdm_shp_clip');
}

function test_hydrodynamic2d_hide_new() {
    fdapi.hydrodynamic2d.hide('hdm_shp_clip');
}

function test_hydrodynamic2d_get_new() {
    fdapi.hydrodynamic2d.get('hdm_shp_clip');
}



//==========================TrafficSimulation 交通仿真 start===============================
function test_trafficSimulation_add() {

    //设置夜景
    fdapi.weather.setDateTime(2025, 9, 9, 22, 22, false);
    //设置相机视角
    fdapi.camera.set(491858.270625, 2491886.711035, 502.750039, -52.415585, -90.921097, 0);


    fdapi.trafficSimulation.delete("traffic");
    let trafficSimulation = {
        "id": "traffic",
        "coordinateType": 1,
        "groupId": "",
        "userData": "",
        "noiseThreshold": 0.06,  //车辆降噪距离 
        "timer": false,// 禁用计时器 用dat的time            
        "heatmap": {
            "bbox": [474853.14, 2484137.02, 0, 562179.26, 2528221.135, 383.999922],//交通仿真的范围
            "visible": false,//初始化是否默认显示热力图
            "blur": 0.8,
            "heatRadiusScale": 60,
            "colors": {
                "gradient": true,
                "size": 256,
                "colorStops": [
                    {
                        "value": 0,
                        "color": [
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    {
                        "value": 0.25,
                        "color": [
                            0,
                            1,
                            1,
                            0
                        ]
                    },
                    {
                        "value": 0.5,
                        "color": [
                            0,
                            1,
                            0,
                            0.2
                        ]
                    },
                    {
                        "value": 0.75,
                        "color": [
                            1,
                            1,
                            0,
                            1
                        ]
                    },
                    {
                        "value": 1,
                        "color": [
                            1,
                            0,
                            0,
                            1
                        ]
                    }
                ]
            }
        },
        "models": [
            {
                "type": 1,
                "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/轿车_02"
            },
            {
                "type": 2,
                "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/公交车_04"
            },
            {
                "type": 3,
                "package": "/JC_CustomAssets/VehicleLibrary/Exhibition/迷你巴士_01"
            }
        ]
    };
    fdapi.trafficSimulation.add(trafficSimulation);
    //开启根据高度自动高亮
    fdapi.trafficSimulation.autoHighlight("traffic", 100);

    //打开交通热力图
    fdapi.trafficSimulation.showHeatMap("traffic");

    //按500ms更新dat数据
    let index = 0;
    timer = setInterval(async function () {
        index++;
        if (index < 25) {
            fdapi.trafficSimulation.update({
                "id": "traffic",
                "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",
            });
        } else {
            clearInterval(timer);
        }
    }, 500);

}


async function test_trafficSimulation_update() {

    clearInterval(timer);

    //按1s更新dat数据
    let index = 0;
    timer = setInterval(async function () {
        index++;
        if (index < 25) {
            fdapi.trafficSimulation.update({
                "id": "traffic",
                "file": HostConfig.Path + "/assets/dat/vehicle_" + index + ".dat",
            });
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function test_trafficSimulation_delete() {
    fdapi.trafficSimulation.delete("traffic");
}

function test_trafficSimulation_show() {
    fdapi.trafficSimulation.show("traffic");
}

function test_trafficSimulation_hide() {
    fdapi.trafficSimulation.hide("traffic");
}

function test_trafficSimulation_focus() {
    fdapi.trafficSimulation.focus("traffic", 100);
}

function test_trafficSimulation_highlight() {
    fdapi.trafficSimulation.highlight("traffic");
}

function test_trafficSimulation_unHighlight() {
    fdapi.trafficSimulation.unHighlight("traffic");
}

function test_trafficSimulation_autoHighlight() {
    fdapi.trafficSimulation.autoHighlight("traffic", 100);
}

function test_trafficSimulation_showTextLabel() {
    fdapi.trafficSimulation.showTextLabel("traffic");
}

function test_trafficSimulation_hideTextLabel() {
    fdapi.trafficSimulation.hideTextLabel("traffic");
}

function test_trafficSimulation_showHeatMap() {
    fdapi.trafficSimulation.showHeatMap("traffic");
}

function test_trafficSimulation_hideHeatMap() {
    fdapi.trafficSimulation.hideHeatMap("traffic");
}

//==========================TrafficSimulation 交通仿真 end===============================



//==========================BattlefieldSimulation 战场仿真 start===============================
function test_battlefieldSimulation_add() {


}


async function test_battlefieldSimulation_update() {


}

function test_battlefieldSimulation_delete() {
    fdapi.battlefieldSimulation.delete("battlefield");
}


function test_battlefieldSimulation_focus() {
    fdapi.battlefieldSimulation.focus("battlefield", 100);
}

//==========================BattlefieldSimulation 战场仿真 end===============================



//==========================train  火车  start===============================
function test_train_add() {

    //轨道路径
    let path = [[489851.25, 2491362, -0.191113], [489877.375, 2491410.75, -0.303057], [489892.25, 2491440.75, -1.231094], [489904.8125, 2491471, -1.503857], [489915.25, 2491500.5, -3.051162], [489928.6875, 2491544.5, -3.580459], [489934.59375, 2491577.5, -3.255947], [489941.40625, 2491618.75, -3.294932], [489945.625, 2491656, -1.271807], [489947.1875, 2491715.5, -1.501475], [489945.125, 2491850, -0.366064], [489943.6875, 2491939.75, 0.179922], [489940.0625, 2492108.75, 2.121406], [489940.75, 2492128.25, 2.111719], [489925.96875, 2492950.5, 1.683291], [489924.75, 2493044, 1.173252], [489923.78125, 2493106, 2.162031], [489923, 2493156, 3.181807], [489922.9375, 2493160.5, 3.246543], [489920.625, 2493289.25, 1.970703], [489920.625, 2493289.25, 1.970703], [489919.90625, 2493315, 1.985225], [489919.90625, 2493315, 1.785225], [489918.3125, 2493411.25, 1.431191], [489910.875, 2493850.5, 2.374482], [489905.84375, 2494171.75, 2.407988], [489906.0625, 2494224.75, 2.909326], [489907.625, 2494258.75, 3.092441], [489910.3125, 2494286.5, 3.964658], [489915.15625, 2494320.5, 5.086445], [489919.75, 2494345, 5.446934], [489925.875, 2494368.5, 4.86334], [489935.03125, 2494400, 4.074356], [489945.5625, 2494429.75, 3.463535], [489957.21875, 2494458.5, 2.808174], [489966.46875, 2494477.75, 2.298184], [489978.625, 2494501.25, 1.889853], [489978.625, 2494501.25, 1.889853], [489993.03125, 2494526.75, 1.983848], [489993.03125, 2494526.75, 1.983848], [490009.25, 2494551.25, 2.169316], [490024.3125, 2494572, 2.308086], [490044.4375, 2494597.25, 2.452129], [490065.84375, 2494622.25, 2.869814], [490086.9375, 2494644.25, 3.260742], [490108.84375, 2494664.5, 2.899443], [490135.96875, 2494685.75, 2.357588], [490161.78125, 2494704.75, 1.811768], [490191.59375, 2494724.75, 0.88085], [490220.9375, 2494743, 4.228818], [490408.875, 2494855.25, 4.68209], [490408.875, 2494855.25, 4.68209], [490600.90625, 2494970.75, 5.266504], [490600.90625, 2494970.75, 5.266504], [490625.75, 2494986.25, 5.748027], [490648.6875, 2495002, 6.19916], [490670.65625, 2495020.25, 6.656856], [490694.1875, 2495042.5, 7.172226], [490716.875, 2495068.5, 7.583359], [490740.09375, 2495097, 7.921679], [490803, 2495178, 10.631739], [491174.0625, 2495640.75, 14.771963], [491174.0625, 2495640.75, 14.771963], [491290.875, 2495794.25, 14.68], [491290.875, 2495794.25, 13.513946], [491507.5625, 2496057.25, 18.662148], [491507.5625, 2496057.25, 18.662148], [491531.78125, 2496083, 23.58559], [491584.78125, 2496137.75, 21.996], [491584.78125, 2496137.75, 23.996], [491664.71875, 2496213.5, 23.176968], [491706.59375, 2496250.5, 24.57543], [491706.59375, 2496250.5, 23.17543], [491781.8125, 2496314.75, 24.924355], [491781.8125, 2496314.75, 22.924355], [491991.125, 2496497.5, 24.509882], [492075.5625, 2496558.25, 21.423296], [492146.78125, 2496597.5, 24.555011], [492146.78125, 2496597.5, 21.255011], [492227.5625, 2496632.5, 24.917774], [492294.03125, 2496658.5, 25.191973], [492294.03125, 2496658.5, 25.191973], [492372.15625, 2496680.75, 25.928473], [492420.03125, 2496691.5, 25.490894], [492459.09375, 2496698.25, 24.839941], [492493.5625, 2496703, 25.677641], [492535.28125, 2496707, 22.221445], [492573.96875, 2496708.25, 25.675488], [492944.6875, 2496707.5, 25.876715], [492997.625, 2496709.25, 26.874718], [493109.15625, 2496711.25, 27.813452], [493190.8125, 2496711.5, 26.545835], [493323.375, 2496711.75, 23.332207], [493987.625, 2496710.75, 18.578131], [494044.59375, 2496713.25, 16.12669], [494443.34375, 2496710, 12.245303]];

    //添加轨道前删除 保证唯一
    fdapi.splineMesh.delete('railway');
    //添加火车轨道
    fdapi.splineMesh.add({
        id: 'railway',
        groupId: "railway",
        userData: "平南铁路",
        coordinateType: 0,// 坐标系类型
        coordinates: path,//路径模型坐标数组
        range: [0, 1000],// 可见范围
        scale: 1, //路径模型轴朝向的缩放值，默认值：1
        style: 16,//参考SplineMeshStyle样式枚举 
    });
    //fdapi.splineMesh.focus('railway', 50);
    //相机定位
    //fdapi.camera.set(489892.734375, 2491392.694727, 36.349495, -54.479004, -171.58107, 0);

    //添加火车前删除 保证唯一
    fdapi.train.delete('train');
    let train = {
        "id": "train",
        "coordinates": path,
        "coordinateType": 0,
        "range": [0, 10000],
        "doubleLocomotive": 1,//双向车头
        "direction": 0,
        "maxSpeed": 300,
        "carriageNum": 8,//车厢数量
        "carriageStyle": "复兴号",
        "acceleration": 1000
    };
    fdapi.train.add(train);
    fdapi.train.focus('train', 10);
}


function test_train_moveTo() {
    fdapi.train.moveTo({
        id: 'train',
        distance: 5,//行驶距离 单位：公里
        time: 60,//行驶耗时 单位秒
    });
}

function test_train_pause() {
    fdapi.train.pause('train');
}

function test_train_resume() {
    fdapi.train.resume('train');
}

function test_train_clear() {
    fdapi.train.clear();
}

function test_train_delete() {
    fdapi.train.delete('train');
}

function test_train_focus() {
    fdapi.train.focus('train', 100, 2, [0, 0, 0], [0, 0, 0]);
}


function test_train_setFollow() {
    fdapi.train.setFollow('train', 100, 2, 0, 0, [0, 0, 0]);
}



function test_train_show() {
    fdapi.train.show('train');
}


function test_train_hide() {
    fdapi.train.hide('train');
}

function test_train_get() {
    fdapi.train.get('train');
}

//==========================train  火车  end===============================


//==========================gaussianSplatting  高斯泼溅  start===============================
async function test_gaussianSplatting_add() {

    let path = HostConfig.Path + "/assets/";
    await fdapi.gaussianSplatting.delete('gs3d');
    let gs3d = {
        id: "gs3d",
        coordinateType: 0,
        filePath: path + "ply/gs3d.ply",
        origin: [0, 0, 0],//可选 数据中心点
        rotation: [0, 0, 0],//可选 对象旋转
        scale: [1, 1, 1],//可选 对象缩放
        degree: 0,//  可选 色阶 0-3
        splatScale: 1.0,//可选 高斯点影响范围 无限制
        spriteSize: 3.0,//可选 绘制大小 无限制
        opacityCull: 0.3,//可选 透明度剔除 0-1
        collision: false //可选 是否开启碰撞 开启后消耗性能
    }
    fdapi.gaussianSplatting.add(gs3d);
    fdapi.gaussianSplatting.focus('gs3d');
}

function test_gaussianSplatting_update() {
    let path = HostConfig.Path + "/assets/";
    let gs3d_update = {
        id: "gs3d",
        coordinateType: 0,
        filePath: path + "ply/gs3d.ply",
        origin: [0, 0, 0],//可选 数据中心点
        rotation: [90, 0, 0],//可选 对象旋转
        scale: [1, 1, 1],//可选 对象缩放
        degree: 2,//  可选 色阶 0-3
        splatScale: 1.0,//可选 高斯点影响范围 无限制
        spriteSize: 3.0,//可选 绘制大小 无限制
        opacityCull: 0.5,//可选 透明度剔除 0-1
        collision: true //可选 是否开启碰撞 开启后消耗性能
    }
    fdapi.gaussianSplatting.update(gs3d_update);
    fdapi.gaussianSplatting.focus('gs3d');
}

function test_gaussianSplatting_show() {
    fdapi.gaussianSplatting.show('gs3d');
}

function test_gaussianSplatting_hide() {
    fdapi.gaussianSplatting.hide('gs3d');
}

function test_gaussianSplatting_delete() {
    fdapi.gaussianSplatting.delete('gs3d');
}

function test_gaussianSplatting_focus() {
    fdapi.gaussianSplatting.focus('gs3d');
}

function test_gaussianSplatting_get() {
    fdapi.gaussianSplatting.get('gs3d');
}

function test_gaussianSplatting_clear() {
    fdapi.gaussianSplatting.clear();
}

//==========================gaussianSplatting  高斯泼溅  end===============================



//==========================excavationAnalysis  超欠挖分析start===============================
async function test_excavationAnalysis_add() {

    let path = HostConfig.Path + "/assets/";

    fdapi.tileLayer.delete('1');
    await fdapi.tileLayer.add({
        id: '1',
        fileName: path + "3dt/tunnel.3dt",
        location: [0, 0, 0],//坐标位置
        rotation: [0, 0, 0],//旋转角度
        scale: [1, 1, 1]    //缩放大小
    });
    fdapi.tileLayer.focus('1', 18);
    fdapi.tileLayer.hide('1');

    //添加前清空所有customObject 防止id重复
    await fdapi.customObject.clear();
    //添加的3dt的图层id
    let tileLayerId = '1';
    //查询图层内部包含的构件objectIds
    let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);
    let objectIds = result.data[0].objectIds;
    //执行合并复制
    await fdapi.customObject.addByTileLayer({
        id: "tunnel",
        tileLayerId: tileLayerId,
        objectId: objectIds,
    });

    await fdapi.excavationAnalysis.delete('ea1');
    let ea1 = {
        id: "ea1",
        filePath: path + "ply/tunnel.ply", //参与对比的点云模型
        pointSize: 0.01,//  点云尺寸
        objectId: "tunnel",//参与对比的自定义模型ID
    }
    fdapi.excavationAnalysis.add(ea1);
}

function test_excavationAnalysis_update() {
    let ea1_update = {
        id: "ea1",
        pointSize: 0.03,
    }
    fdapi.excavationAnalysis.update(ea1_update);
}

function test_excavationAnalysis_show() {
    fdapi.excavationAnalysis.show('ea1');
}

function test_excavationAnalysis_hide() {
    fdapi.excavationAnalysis.hide('ea1');
}

function test_excavationAnalysis_delete() {
    fdapi.excavationAnalysis.delete('ea1');
}

function test_excavationAnalysis_focus() {
    fdapi.excavationAnalysis.focus('ea1');
}

function test_excavationAnalysis_get() {
    fdapi.excavationAnalysis.get('ea1');
}

function test_excavationAnalysis_clear() {
    fdapi.excavationAnalysis.clear();
}

//==========================excavationAnalysis  超欠挖分析end===============================


//==========================vehicle 载具车辆===============================
async function test_vehicle_add() {
    await fdapi.vehicle.delete('vc1');
    let vc1 = {
        "id": "vc1",
        "coordinateType": 0,
        "coordinate": [493132.125, 2492028.25, 2.1155664920806885],
        "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",//资源库车辆路径
        "rotation": [0, 0, 0],
        "colorType": 0, //0: 使用随机涂装颜色  大于0的正整数: 使用固定涂装颜色
        "color": [1, 1, 0, 1],// 开启自定义颜色 则会覆盖colorType涂装颜色
        "autoHeight": true,//开启自动高度 贴地移动
        "delay": 1,//控制载具moveTo()接口移动的延迟时间 单位：秒
        "useInitZ": false,//是否使用添加载具初始化坐标的高度Z
        "localOffset": [0, 0, 0],
        "enableDecal": true,
        "visible": true, //默认可见性
    };
    fdapi.vehicle.add(vc1);
    fdapi.vehicle.focus('vc1');

    //注意：focus方法同时支持第一人称视角 具体参考API文档
    //fdapi.vehicle.focus('vc1',true,0,0,[-16.27,1.969612,0],[0,0,0],[0,-0.3,1.3]);
}

async function test_vehicle_update() {
    //定位到车辆位置
    //fdapi.camera.set(493127.98886, 2492019.294375, 7.895526, -22.705507, -63.62706, 1);

    let vc1 = {
        "id": "vc1",
        "rotation": [0, 90, 0],
    };
    fdapi.vehicle.update(vc1);
    //注意：focus方法支持第一人称视角 具体参考API文档
    fdapi.vehicle.focus('vc1');
}

async function test_vehicle_addWayPoint() {
    let wayPoints = [{
        "id": "vc1",
        "wayPoints":
            [
                { "coordinate": [493136.5625, 2492028, 2.1], "gear": 3, "timeStamp": 0 },
                { "coordinate": [493141.09375, 2492028, 2.1], "gear": 3, "timeStamp": 1 },
                { "coordinate": [493143.71875, 2492027.75, 2.1], "gear": 3, "timeStamp": 2 },
                { "coordinate": [493146.46875, 2492027.75, 2.1], "gear": 3, "timeStamp": 3 },
                { "coordinate": [493150.1875, 2492027.25, 2.1], "gear": 3, "timeStamp": 4 },
                { "coordinate": [493153.625, 2492027, 2.1], "gear": 3, "timeStamp": 5 },
                { "coordinate": [493152.84375, 2492023.25, 2.1], "gear": 3, "timeStamp": 6 },
                { "coordinate": [493150.59375, 2492019, 2.1], "gear": 3, "timeStamp": 7 },
                { "coordinate": [493148.75, 2492015, 2.1], "gear": 3, "timeStamp": 8 },
                { "coordinate": [493148.03125, 2492012.25, 1.1], "gear": 3, "timeStamp": 9 }
            ]
    }];
    fdapi.vehicle.setWayPoint(wayPoints);
}

async function test_vehicle_moveTo() {

    //模拟实时gps坐标
    let realTimeGPSPoint = [
        [493136.5625, 2492028, 2.1],
        [493141.09375, 2492028, 2.1],
        [493143.71875, 2492027.75, 2.1],
        [493146.46875, 2492027.75, 2.1],
        [493150.1875, 2492027.25, 2.1],
        [493153.625, 2492027, 2.1],
        [493152.84375, 2492023.25, 2.1],
        [493150.59375, 2492019, 2.1],
        [493148.75, 2492015, 2.1],
        [493148.03125, 2492012.25, 1.1],
    ];
    //模拟1秒获取一个坐标位置 并设置载具运动MoveTo方法
    let index = 0;
    let timer = setInterval(function () {
        index++;
        if (index < 10) {
            let moveToArr = [
                { "id": "vc1", "coordinate": realTimeGPSPoint[index - 1], "gear": 3, "time": 1 },
            ];
            //实时移动
            fdapi.vehicle.moveTo(moveToArr);
        } else {
            //运动结束后清除定时器
            clearInterval(timer);
        }
    }, 1000);

}

async function test_vehicle_start() {
    fdapi.vehicle.start([{
        id: 'vc1',
        timeStamp: 0,//设置载具v1从wayPoints的第0秒开始运动
    }]);
}

async function test_vehicle_pause() {
    fdapi.vehicle.pause('vc1');
}

async function test_vehicle_resume() {
    fdapi.vehicle.resume('vc1');
}

async function test_vehicle_stop() {
    fdapi.vehicle.stop('vc1');
}

function test_vehicle_get() {
    fdapi.vehicle.get('vc1');
}

function test_vehicle_delete() {
    fdapi.vehicle.delete('vc1');
}

function test_vehicle_clear() {
    fdapi.vehicle.clear();
}

function test_vehicle_focus() {
    //注意：focus方法支持第一人称视角 具体参考API文档
    fdapi.vehicle.focus('vc1', true, 6, 2, [2, 6, 0], [5, 0, 0]);

}

function test_vehicle_show() {
    fdapi.vehicle.show('vc1');
}

function test_vehicle_hide() {
    fdapi.vehicle.hide('vc1');
}





//==========================vehicle2 载具车辆===============================
async function test_vehicle2_add() {
    await fdapi.vehicle2.delete('vc2');
    let vc2 = {
        "id": "vc2",
        "coordinateType": 0,
        "coordinate": [493122.24593750003, 2492029.0462109377, 2.11556396484375],//注意 vehicle2的moveTo接口的第一个坐标需要和初始化坐标位置保持一致！
        "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_01",//资源库车辆路径
        "rotation": [0, 0, 0],
        "color": [1, 1, 0, 1], //车辆颜色
        "autoHeight": true,//开启自动高度 贴地移动
        "enableDecal": false, //是否支持贴画
        "delay": 1,//控制载具moveTo()接口移动的延迟时间 单位：秒
        "localOffset": [-2, 0, 0], //载具偏移 坐标数据如果是车头定位时需要设置，若是车身中心点则使用默认值
        "collision": true,//开启碰撞
        "visible": 1, //设置载具对象加载后是否显示，0：隐藏 1：显示 2：移动显示（先隐藏载具移动后显示） 3：调用显示（先隐藏载具调用moveTo后显示）
        "label": {
            "visible": true,//标牌可见性
            "offset": [0, 0, 0],//标牌偏移
            "text": "京A 888888" //标牌显示的文字
        }
    };
    fdapi.vehicle2.add(vc2);
    fdapi.vehicle2.focus('vc2', 5, 2, [-20, 0, 0], [0, 0, 0]);
}

async function test_vehicle2_update() {
    //定位到车辆位置
    //fdapi.camera.set(493127.98886, 2492019.294375, 7.895526, -22.705507, -63.62706, 1);

    let vc2 = {
        "id": "vc2",
        "autoHeight": false,
        "color": [1, 0, 0, 1],//车辆颜色
        "label": {
            "visible": true,//标牌可见性
            "offset": [0, 0, 0.2],//标牌偏移
            "text": "京B 666666" //标牌显示的文字
        }
    };
    fdapi.vehicle2.update(vc2);
}


async function test_vehicle2_moveTo() {

    //模拟实时gps坐标
    let realTimeGPSPoint = [
        //注意：起始坐标要和add初始化的坐标位置 保持一致
        [493122.24593750003, 2492029.0462109377, 2.11556396484375], [493125.2659375, 2492028.7942578127, 2.11556396484375], [493128.4396875, 2492028.6100976565, 2.11556396484375], [493131.41531250003, 2492028.6350195315, 2.11556396484375], [493134.6896875, 2492028.259667969, 2.1155615234375], [493137.7, 2492028.0282421876, 2.21556884765625], [493142.5728125, 2492027.9564453126, 2.11556396484375], [493145.7465625, 2492026.2394921877, 2.11556396484375], [493147.190625, 2492023.504746094, 2.11556640625], [493147.719375, 2492020.532832031, 2.1155615234375], [493147.73562500003, 2492018.1220703125, 2.2155908203125], [493147.7096875, 2492015.22953125, 2.215576171875], [493146.7884375, 2492012.7730078124, 2.00822509765625], [493146.06, 2492010.25546875, 1.8686181640625001], [493145.036875, 2492007.0628320314, 1.69008544921875], [493144.0684375, 2492004.0163476565, 1.51984375], [493143.1040625, 2492001.1668945313, 1.35973876953125]
    ];
    //模拟1秒获取一个坐标位置 并设置载具运动MoveTo方法
    let index = 0;
    //当前时间戳
    let currTime = new Date().getTime();
    let timer = setInterval(function () {
        index++;
        if (index <= realTimeGPSPoint.length) {
            //时间戳累加
            let time = currTime + 1000 * index;
            let moveToArr = [
                {
                    "id": "vc2",
                    "coordinate": realTimeGPSPoint[index - 1],
                    "time": time, //当前时间戳
                    "astern": false
                },
            ];
            //实时移动
            fdapi.vehicle2.moveTo(moveToArr);
        } else {
            //运动结束后清除定时器
            clearInterval(timer);
        }
    }, 1000);

}

function test_vehicle2_get() {
    fdapi.vehicle2.get('vc2');
}

function test_vehicle2_delete() {
    fdapi.vehicle2.delete('vc2');
}

function test_vehicle2_clear() {
    fdapi.vehicle2.clear();
}

function test_vehicle2_focus() {
    fdapi.vehicle2.focus('vc2', 10, 2, [-20, 0, 0], [0, 0, 0]);
}

function test_vehicle2_setFollow() {
    //设置相机跟随
    fdapi.vehicle2.setFollow('vc2', 6, 2, -20, 0, 0.02, false, [0, 0, 0]);
}

function test_vehicle2_cancelFollow() {
    //取消相机跟随
    fdapi.camera.cancelFollow();
}

function test_vehicle2_setViewportVisible() {
    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    //进入多视口
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
    //仅视口1和视口3可见
    fdapi.vehicle2.setViewportVisible('vc2', Viewport.V1 | Viewport.V3);

}

function test_vehicle2_show() {
    fdapi.vehicle2.show('vc2');
}

function test_vehicle2_hide() {
    fdapi.vehicle2.hide('vc2');
}

function test_vehicle2_showTextLabel() {
    let marker = {
        "text": "自定义文本",
        "fontSize": 18,
        "fontOutlineSize": 1,
        "textBackgroundColor": [1, 1, 1, 1],
        "fontColor": [0, 0, 0, 1],
        "fontOutlineColor": [1, 1, 1, 1],
        "lineSize": 2,
        "lineColor": [0, 0, 0, 1],
        "lineOffset": [0, 0]
    }
    fdapi.vehicle2.showTextLabel('vc2', marker);
}


function test_vehicle2_hideTextLabel() {
    fdapi.vehicle2.hideTextLabel('vc2');
}




//==========================Drone 无人机===============================
async function test_drone_add() {

    //设置后期 泛光 减少灯光秀光晕 关闭反走样
    fdapi.settingsPanel.setPostProcessMode({ bloomIntensity: 0.7, antiAliasing: false });

    //设置夜晚 展示灯光秀
    fdapi.weather.setDateTime(2025, 12, 25, 22, 10, false);

    //添加100架无人机
    await fdapi.drone.clear();
    let basePoint = [492548, 2491830, 200];
    let d100 = [];
    for (let i = 0; i < 100; i++) {
        let drone = {
            "id": "drone" + i,
            "coordinateType": 0,
            "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],
            "assetPath": "/JC_CustomAssets/UAVLibrary/Exhibition/UAV_1",
            "rotation": [0, 0, 0],
            "autoHeight": true,
            "delay": 1,
            "localOffset": [0, 0, 0],
            "scale": [3, 3, 3], //模型缩放
            "visible": 1, //加载后可见
            "enableDecal": true,
            "trailType": DroneTrailStyle.Pixel_Line1, //轨迹样式枚举
            "trailThickness": 2, //像素线宽度，注意：仅开启像素线样式枚举时生效
            "trailColor": [Math.random(), Math.random(), Math.random(), 1],//轨迹线颜色
            "trailDuration": 6, //轨迹线持续时长 0表示一直显示
            "lightColor": [Math.random(), Math.random(), Math.random(), 10],//灯光秀颜色、亮度
            "label": {
                "visible": true,//标牌可见性
                "cullDistance": 100, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米
                "offset": [0, 0, 0],//标牌偏移
                "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字
            }
        };
        d100.push(drone);
    }
    fdapi.drone.add(d100);
    fdapi.drone.focus('drone5');
}


async function test_drone_moveTo() {
    let basePoint = [492548, 2491830, 200];
    let index = 0;
    let currTime = new Date().getTime();
    let timer = setInterval(function () {
        if (index < 100) {
            let time = currTime + 1000 * index;

            let d10 = []
            for (let i = 0; i < 100; i++) {
                d10.push({
                    "id": "drone" + i,
                    "coordinate": [basePoint[0] + Math.random() * 500, basePoint[1] + Math.random() * 500, 200],
                    "time": time,
                    "rotation": [0, 0, 0]
                });
            }
            fdapi.drone.moveTo(d10);
            ++index;
        }
        else {
            clearInterval(timer);
            fdapi.camera.cancelFollow();
        }
    }, 1000);
    //定位
    fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);
}

async function test_drone_update() {
    let d100 = []
    for (let i = 0; i < 100; i++) {
        d100.push({
            "id": "drone" + i,
            "trailType": 0, //轨迹线样式
            "trailColor": [1, 1, 0, 1],//轨迹线颜色
            "trailDuration": 3, //轨迹线持续时长
            "lightColor": [1, 0, 0, 1],//灯光秀颜色
            "label": {
                "visible": true,//标牌可见性
                "cullDistance": 1000, // 无人机标牌剔除距离，相机距离无人机的观察距离大于此阈值则屏幕显示剔除。单位：米
                "offset": [0, 0, 0],//标牌偏移
                "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字
            }
        });
    }
    fdapi.drone.update(d100);
}

async function test_drone_focus() {
    //设置相机跟随
    fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);
}

async function test_drone_show() {
    fdapi.drone.show('drone5');
}

async function test_drone_hide() {
    fdapi.drone.hide('drone5');
}

async function test_drone_clear() {
    fdapi.drone.clear();
}

async function test_drone_delete() {
    fdapi.drone.delete('drone5');
}

async function test_drone_get() {
    fdapi.drone.get('drone5');
}


//====================== customObject ======================

let __co_location;
async function test_customObject_add() {

    /**
     * 注意：pak资源库文件的挂载方式：
     * 1、cloud配置文件资源 推荐@path 方式  支持把pak文件复制到cloud的文件资源路径 调用接口misc.reloadPak()来重新挂载
     * 2、调用settingsPanel.setPakFile()或settingsPanel.setPakFolder()方法实时挂载pak
     * 3、提前在acp工程内配置好自定义资源
     * 
     * 注意：自定义对象添加方式
     * 1、可以从资源库pak添加各种内置模型 add()
     * 2、也可以从按规范从UE打包的自定义模型添加 add()
     * 3、从已经存在的3dt bim模型包含的构件复制 addByTileLayer()
     */

    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    //投影坐标
    let co_location = [493132.125, 2492028.25, 2.1155664920806885];
    let o = {
        id: 'o1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: co_location,//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [0, 1000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        enableDecal: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    await fdapi.customObject.add(o);
    fdapi.customObject.focus(o.id);
}

async function test_customObject_update() {
    let o = {
        id: 'o1',//自定义对象唯一id
        scale: [2, 2, 2],//模型放大2倍
    };
    await fdapi.customObject.update(o);
}

function test_customObject_delete() {
    fdapi.customObject.delete('o1');
}

function test_customObject_clear() {
    fdapi.customObject.clear();
}

function test_customObject_focus() {
    //跟随距离设置为-1: 车辆移动时则相机自动跟随 
    fdapi.customObject.focus('o1', -1);

    //使用ActionMode枚举设置相机跟随模式

    //平视跟随
    //fdapi.customObject.focus('o1', 5 , 0 , [-12, 0 , 0] , ActionMode.FollowWorldRotation, [0,0,0]);
    //后方自定义姿态 距离5米
    //fdapi.customObject.focus('o1', 5 , 0 , [-30, 4 , 0] , ActionMode.Follow, [0,0,3]);
    //后上方默认枚举 距离5米
    //fdapi.customObject.focus('o1', 5 , 0 , null , ActionMode.FollowBehindAndAbove, [0,0,3]);

}

function test_customObject_show() {
    fdapi.customObject.show('o1');
}

function test_customObject_hide() {
    fdapi.customObject.hide('o1');
}


function test_customObject_showByGroupId() {
    fdapi.customObject.showByGroupId('coGroup');
}

function test_customObject_hideByGroupId() {
    fdapi.customObject.hideByGroupId('coGroup');
}

function test_customObject_highlight() {
    //设置高亮颜色（全局生效）
    fdapi.settings.setHighlightColor(Color.Red);
    //高亮co
    fdapi.customObject.highlight('o1');
}

function test_customObject_unhighlight() {
    fdapi.customObject.unHighlight();
}

function test_customObject_get() {
    fdapi.customObject.get('o1');
}

function test_customObject_startGlow() {
    fdapi.customObject.glow([{
        id: 'o1',
        color: [1, 0, 0, 1],
        duration: 5, //持续闪烁5秒
        interval: 1  //每隔1秒闪烁一次
    }]);
}

function test_customObject_stopGlow() {
    fdapi.customObject.stopGlow(['o1']);
}

function test_customObject_getBPFunction() {
    fdapi.customObject.getBPFunction(['o1']);
}

async function test_customObject_addByTileLayer() {
    /**
     * 把多个actor合并为一个customObject对象
     * 
     * 注意5.3版本新增特性：5.2/5.1版本仅支持复制单个actor，5.3版本同时支持数组类型参数即把多个actor复制为一个customObject
     */

    //添加前清空所有customObject 防止id重复
    await fdapi.customObject.clear();
    //小别墅3dt的图层id
    let tileLayerId = '979A4C034E29728F8A2635AD747B72A3';
    //查询图层内部包含的构件objectIds
    let result = await fdapi.tileLayer.getObjectIDs(tileLayerId);
    let objectIds = result.data[0].objectIds;
    //执行合并复制
    await fdapi.customObject.addByTileLayer({
        id: 'mergeActors',
        location: [492498.71875, 2492250.75, 3],
        tileLayerId: tileLayerId,
        //注意5.3新增特性：数组参数 也支持复制单个构件
        objectId: objectIds,//合并复制多个构件
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 90, 0],//模型旋转
        scale: [1, 1, 1],//模型缩放
        visible: true,//模型是否显示
        smoothMotion: 0     //1: 平滑移动，0: 跳跃移动
    });
    fdapi.customObject.focus('mergeActors', 10);
}

function test_customObject_showGrowth() {

    let data = {
        id: "mergeActors",
        axis: ForwardAxis.Z, //沿Z轴生长
        ratio: 0
    };
    fdapi.customObject.showGrowth(data);
    fdapi.customObject.focus('mergeActors', 10);

    //执行生长动画
    let timer = setInterval(function () {
        if (data.ratio <= 1) {
            data.ratio = data.ratio + 0.05;
            fdapi.customObject.showGrowth(data);
        } else {
            clearInterval(timer);
        }
    }, 200);

}


function test_customObject_getBPFunction() {

    //创建工程车_3
    fdapi.customObject.clear();
    let truck = {
        id: 'truck',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/工程车/工程车_3',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493116.161875, 2492028.96, 2.11556640625],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 90, 0],// 世界坐标系旋转
        range: [0, 1000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        isEffectRotation: true,//是否开启旋转效果
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        enableDecal: false, //不支持贴画贴合
        visible: true,//模型加载后默认是否显示
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    fdapi.customObject.add(truck);
    fdapi.customObject.focus(truck.id);

    //查询自定义对象包含的蓝图函数
    fdapi.customObject.getBPFunction(['truck']);
}


async function test_customObject_callFunction() {

    //调用蓝图函数，函数名称为【状态】
    fdapi.customObject.callBPFunction([
        {
            id: 'truck',
            functionName: '状态',
            parameters: [
                { "paramType": 0, "paramValue": 1 },
                { "paramType": 0, "paramValue": 1 }
            ]
        }
    ]);

}


function test_customObject_setPos() {
    fdapi.customObject.focus('o1', -1);
    fdapi.customObject.updateBegin();
    fdapi.customObject.setSmoothMotion('o1', 1);
    fdapi.customObject.setLocation('o1', [493181.4375, 2492026.5, 2]);
    //设置移动插值时间为5秒
    fdapi.customObject.setSmoothTime('o1', 5);
    fdapi.customObject.updateEnd();
}

function test_customObject_setSmoothTime() {
    fdapi.customObject.setSmoothTime('o1', 5);
}

async function test_customObject_setRotation() {
    //设置世界坐标系的旋转
    await fdapi.customObject.setRotation('o1', [0, 90, 0]);
    fdapi.customObject.focus('o1');
}


async function test_customObject_setLocalRotation() {
    //设置模型本身旋转（针对模型朝向不正确进行调整）
    await fdapi.customObject.setLocalRotation('o1', [0, 90, 0]);
    fdapi.customObject.focus('o1');
}

var __co_scale = [1, 1, 1];
function test_customObject_setScale() {
    __co_scale[0] += 0.2;
    __co_scale[1] += 0.2;
    __co_scale[2] += 0.2;
    fdapi.customObject.setScale('o1', __co_scale);
}

function test_customObject_setSmoothMotion() {
    fdapi.customObject.setSmoothMotion("o1", 1);
}

function test_customObject_setTintColor() {
    fdapi.customObject.setTintColor('o1', [0.5, 0.5, 0.5, 1]);
}

async function test_customObject_overrideMaterial() {


    //根据材质路径查询材质包含的参数
    let res = await fdapi.misc.getMaterial("/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5");

    //颜色参数名称
    let colorParamName = res.data[0].params[0].name;
    //颜色参数默认值
    let colorParamValue = res.data[0].params[0].defaultValue;

    //不透明度参数名称
    let opacityParamName = res.data[0].params[4].name;
    //不透明度默认值
    let opacityParamValue = res.data[0].params[4].defaultValue;

    //使用资源库的玻璃材质替换自定义对象的材质，控制颜色和不透明度
    fdapi.customObject.overrideMaterial(
        [
            {
                "id": "o1",
                "material": "/JC_CustomAssets/MaterialLibrary/Exhibition/玻璃/玻璃_5",
                "scalarParameters": [{ "name": opacityParamName, "value": opacityParamValue }],//数值类型参数
                "vectorParameters": [{ "name": colorParamName, "value": colorParamValue }]//数组类型参数
            }
        ]
    );

}

function test_customObject_restoreMaterial() {
    //恢复自定义对象材质
    fdapi.customObject.restoreMaterial(['o1', 'o2']);
}

function test_customObject_setViewportVisible() {
    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    //进入多视口
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
    //仅视口1和视口3可见
    fdapi.customObject.setViewportVisible('o1', Viewport.V1 | Viewport.V3);
}

function test_customObject_startMove() {
    /**
     * 功能描述：实现车辆按GPS轨迹移动，每隔500毫秒移动一次 
     */

    //gps轨迹
    let positionArr = [
        [493136.5625, 2492028, 2.1155762672424316],
        [493141.09375, 2492028, 2.1155762672424316],
        [493143.71875, 2492027.75, 2.1155762672424316],
        [493146.46875, 2492027.75, 2.1155664920806885],
        [493150.1875, 2492027.25, 2.1155664920806885],
        [493153.625, 2492027, 2.1155664920806885],
        [493157.09375, 2492026.75, 2.1155762672424316],
        [493160.84375, 2492027, 2.1155567169189453],
        [493164.84375, 2492027, 2.1155762672424316],
        [493169, 2492026.5, 2.1155860424041748],
        [493173.84375, 2492026.25, 2.215576171875],
        [493178.125, 2492026.5, 2.1155664920806885],
        [493181.71875, 2492026.25, 2.1155762672424316],
        [493186.03125, 2492026, 2.1155762672424316],
        [493190.09375, 2492026.25, 2.1155664920806885],
        [493193.84375, 2492026, 2.1155567169189453],
        [493197.46875, 2492025.75, 2.1155664920806885],
        [493201.34375, 2492025.75, 2.1155664920806885],
        [493205.40625, 2492025.75, 2.1155664920806885],
        [493208.5, 2492025.75, 2.1155567169189453],
        [493212.09375, 2492025.25, 2.1155762672424316],
        [493214.78125, 2492025.5, 2.1155664920806885],
        [493219.09375, 2492025, 2.1155762672424316],
        [493224.6875, 2492025, 2.1155762672424316],
        [493229.0625, 2492025, 2.1155762672424316],
        [493232.25, 2492025, 2.1155567169189453],
        [493234.4375, 2492024.25, 2.1155664920806885],
        [493233.96875, 2492021.75, 2.313291072845459],
        [493232.96875, 2492019.75, 2.3133106231689453],
        [493232.15625, 2492016.75, 2.2407324314117432],
        [493231.53125, 2492014, 2.1508495807647705],
        [493230.65625, 2492011.75, 2.0715820789337158],
        [493230.15625, 2492009, 1.982724666595459],
        [493229.65625, 2492007, 1.9172167778015137],
        [493228.875, 2492004.25, 1.8264062404632568],
        [493228.21875, 2492001.5, 1.7359277009963989]
    ];
    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < positionArr.length; i++) {
        //构造数组元素 每1秒移动一次
        let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    //fdapi.customObject.focus('o1', -1);
    //平视 相机自动跟随
    fdapi.customObject.focus('o1', 5, 0, [-12, 0, 0], ActionMode.FollowWorldRotation, [0, 0, 0]);
    //车辆按GPS轨迹移动
    fdapi.customObject.startMove('o1', 0, pathPointArr);
}


function test_customObject_pause() {
    fdapi.customObject.pause(['o1']);
}

function test_customObject_resume() {
    fdapi.customObject.resume(['o1']);
}

function test_customObject_setMoveRate() {
    //设置2倍速移动
    fdapi.customObject.setMoveRate([{ 'id': 'o1', 'rate': 2 }]);
}

function test_customObject_stop() {
    fdapi.customObject.stop(['o1']);
}


function test_customObject_MoveTo() {

    //定位co
    fdapi.customObject.focus('o1');
    //模拟实时gps坐标
    let realTimeGPSPoint = [
        [493136.5625, 2492028, 2.1],
        [493141.09375, 2492028, 2.1],
        [493143.71875, 2492027.75, 2.1],
        [493146.46875, 2492027.75, 2.1],
        [493150.1875, 2492027.25, 2.1],
        [493153.625, 2492027, 2.1],
        [493152.84375, 2492023.25, 2.1],
        [493150.59375, 2492019, 2.1],
        [493148.75, 2492015, 2.1],
        [493148.03125, 2492012.25, 1.1],
    ];
    //模拟1秒获取一个gps坐标位置 并设置co运动MoveTo方法
    let index = 0;
    let timer = setInterval(function () {
        index++;
        if (index < 10) {
            fdapi.customObject.moveTo([{
                "id": "o1",
                "location": realTimeGPSPoint[index - 1],
                "smoothTime": 0
            }]);
        } else {
            //运动结束后清除定时器
            clearInterval(timer);
        }
    }, 1000);

}

async function test_customObject_cutFloor() {

    //创建楼宇对象
    fdapi.customObject.clear();
    let building = {
        id: 'building',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/建筑/商业建筑/商业建筑_4',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493076.319375, 2492226.78796875, 2.3],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [0, 1000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        enableDecal: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    await fdapi.customObject.add(building);
    fdapi.customObject.focus(building.id);

    //按楼层拆分楼宇
    fdapi.customObject.cutFloor({
        id: "building",
        hideOriginal: true, // 隐藏原模型
        floors: [
            { id: "floor1", minHeight: 2, maxHeight: 10 },   // 1F
            { id: "floor2", minHeight: 10, maxHeight: 18 },   // 2F
            { id: "floor3", minHeight: 18, maxHeight: 26 }    // 3F
        ],
        floorMaterial: {
            material: "/JC_CustomAssets/MaterialLibrary/Exhibition/水泥/NewMaterialInstanceConstant_13",
            scalarParameters: [{ "name": "亮度", "value": 1.0 }, { "name": "粗糙度", "value": 0.8 }],
            vectorParameters: [{ "name": "颜色", "value": [1, 1, 1, 1] }, { "name": "脏迹颜色", "value": [0.4, 0.4, 0.4, 1] }]
        }
    });

    //查询已经拆分的楼层模型位置
    let res = fdapi.customObject.get(["floor1", "floor2", "floor3"]);


}

//暂未开放
function test_customObject_stopMove() {
    //自定义对象停止移动
    fdapi.customObject.stopMove('o1');
}


//====================== customTag ======================

async function test_ctag_add() {
    //注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注
    await fdapi.customTag.clear();
    let o = {
        id: 'ct1',
        coordinate: [492618.0625, 2492039.25, 15],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=北医三院&address=海淀区花园北路',// 网页URL
        contentSize: [220, 52],//网页窗口宽高 [width, height]
        popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',//弹窗地址url
        popupSize: [600, 480],//弹窗尺寸
        popupPos: [100, 200], //弹窗位置: [x, y]
        pivot: [0.5, 0.5],// 中心点
        range: [1, 5000],//显示范围：[min, max]
        autoHidePopupWindow: true//失去焦点后是否自动关闭弹出窗口
    };
    await fdapi.customTag.add(o);
    fdapi.customTag.focus(o.id, 50, 0.2);
}

async function test_ctag_update() {
    let o = {
        id: 'ct1',
        coordinate: [492649.84375, 2492012, 14],
        contentURL: HostConfig.Path + '/locale/zh/popup_simple.html?icon=../images/ctag1.png&title=中关村医院&address=中关村南路12号',
        contentSize: [220, 52],
        popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',
        popupSize: [600, 480],
        pivot: [0.5, 0.5],
        range: [1, 5000]
    };
    await fdapi.customTag.update(o);
    fdapi.customTag.focus(o.id, 50, 0.2);
}

function test_ctag_delete() {
    fdapi.customTag.delete('ct1');
}

function test_ctag_clear() {
    fdapi.customTag.clear();
}

function test_ctag_focus() {
    fdapi.customTag.focus('ct1', 50, 0.1);
}

function test_ctag_focusAll() {
    fdapi.customTag.focusAll();
}

function test_ctag_show() {
    fdapi.customTag.show('ct1');
}

function test_ctag_hide() {
    fdapi.customTag.hide('ct1');
}

function test_ctag_showAll() {
    fdapi.customTag.showAll();
}

function test_ctag_hideAll() {
    fdapi.customTag.hideAll();
}

function test_ctag_get() {
    fdapi.customTag.get('ct1');
}


//====================== decal ======================

async function test_decal_add() {
    fdapi.decal.clear();
    await fdapi.decal.add({
        id: 'd1',
        decalBlendMode: 0,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花（剔除png半透明）；默认值：0
        order: 1,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
        texturePath: HostConfig.Path + '/assets/image/decal2.png',//贴图文件路径
        location: [494219.3125, 2490657, -0.001054687425494194],
        rotation: [-90, 180, 0],
        scale: [100, 100, 100]
    });
    fdapi.decal.focus('d1', 50);

    await fdapi.decal.add({
        id: 'd2',
        decalBlendMode: 1,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0
        order: 2,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
        texturePath: HostConfig.Path + '/assets/image/decal1.png',//贴图文件路径
        rotation: [-90, 0, 0],
        bbox: [488670.75, 2488165, 0, 491659.59375, 2490987.5, 800.58]
    });
}

async function test_decal_update() {
    await fdapi.decal.update({
        id: 'd1',
        order: 1,
        decalBlendMode: 1,//剔除png半透明
        texturePath: HostConfig.Path + '/assets/image/decal2.png',
        rotation: [-90, 0, 0],
        scale: [50, 50, 50]
    });
    fdapi.decal.focus('d1', 50);
}

function test_decal_delete() {
    fdapi.decal.delete('d1');
}

function test_decal_clear() {
    fdapi.decal.clear();
}

function test_decal_focus() {
    fdapi.decal.focus('d1', 20);
}

function test_decal_focusAll() {
    fdapi.decal.focusAll();
}

function test_decal_get() {
    fdapi.decal.get('d1');
}


//====================== dynamicWater ======================

async function test_dynamicWater_add() {
    fdapi.dynamicWater.clear();
    await fdapi.dynamicWater.add({
        id: 'dy1',
        coordinates: [
            [494173.90625, 2491307.5, 0.95875000953674316],
            [494080.625, 2491060.75, 1.3939062356948853],
            [493967.5625, 2490980, 1.2018749713897705],
            [493865.09375, 2490651.25, 0.8790624737739563],
            [493701.90625, 2490626.25, 0.48812499642372131],
            [493494.6875, 2490660.75, 0.16062499582767487],
            [493598.75, 2491086.5, 0.25140625238418579],
            [493707.375, 2491471, 0.14765624701976776],
            [494149.3125, 2491321.25, 0.89968752861022949],
        ],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        style: 0 //水的样式：0（深蓝）、1（蓝）、2（湖水）
    });
    fdapi.dynamicWater.focus('dy1', 200);
}

async function test_dynamicWater_update() {
    await fdapi.dynamicWater.update({
        id: 'dy1',
        style: 2
    });
    fdapi.dynamicWater.focus('dy1', 200);
}

function test_dynamicWater_delete() {
    fdapi.dynamicWater.delete('dy1');
}

function test_dynamicWater_clear() {
    fdapi.dynamicWater.clear();
}

function test_dynamicWater_focus() {
    fdapi.dynamicWater.focus('dy1', 100);
}

function test_dynamicWater_focusAll() {
    fdapi.dynamicWater.focusAll();
}

function test_dynamicWater_get() {
    fdapi.dynamicWater.get('dy1');
}


//====================== editHelper ======================

function test_editHelper_setParam() {
    let lineType = 0;           //0：直线，1：曲线
    let buildType = 1;          //0：画多点线段， 1：画多边形
    let color = Color.Red;      //绘制颜色
    fdapi.editHelper.setParam(lineType, buildType, color);
}

function test_editHelper_start() {
    fdapi.editHelper.start();
}

function test_editHelper_cancel() {
    fdapi.editHelper.cancel();
}

async function test_editHelper_finish() {
    let res = await fdapi.editHelper.finish(true);
    switch (res.buildType) {
        case 0: {
            fdapi.polyline.add({
                id: Math.random(),
                coordinates: res.coordinates,
                color: Color.Red,
                style: 2,
                thickness: 10,
                intensity: 1,
                flowRate: 0.5,
                depthTest: false
            });
        } break;

        case 1: {
            fdapi.polygon.add({
                id: Math.random(),
                color: Color.Blue,
                coordinates: res.coordinates,
                frameColor: Color.Red,
                frameThickness: 1,
                depthTest: false
            });
        } break;
    }
}


//====================== heatmap ======================

function getRandNumBetween(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

var __tidUpdateHeatMap = undefined;

async function test_heatmap_add1() {

    await fdapi.heatmap.clear();

    let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
    let range = [0, 100];
    let data = [];
    for (let i = 0; i < 100; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 200,           //热力点影像半径范围
            heatValue: Math.random() * 100        //热力值
        });
    }
    let style = HeatMapStyle.Normal;
    let textureSize = 1024;
    let opacityMode = 1;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 1;
    let light = false;
    let viewHeightRange = [0, 10000];

    let heatmap1 = {
        id: "heatmap1",
        bbox: bbox,
        range: range,
        data: data,
        style: style,
        textureSize: textureSize,
        opacityMode: opacityMode,
        opacityRange: opacityRange,
        blur: blur,
        blendMode: blendMode,
        light: light,
        updateTime: 1,
        viewHeightRange: viewHeightRange
    };
    await fdapi.heatmap.addByHeatPoints(heatmap1);
    fdapi.heatmap.focus('heatmap1', 1500, 1);
}

async function test_heatmap_addPoints() {
    let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
    let newPoints = [];
    for (let i = 0; i < 10; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        newPoints.push({
            id: "new_point_" + i,
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 200,           //热力点影像半径范围
            heatValue: Math.random() * 100        //热力值
        });
    }
    await fdapi.heatmap.addPoints("heatmap1", newPoints);
}

async function test_heatmap_add2() {

    await fdapi.heatmap.clear();
    let bbox = [488670.75, 2488165, 0, 491659.59375, 2490987.5, 344.58];
    let range = [0, 1];
    let data = [];
    for (let i = 0; i < 100; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 200,           //热力点影像半径范围
            heatValue: Math.random()       //热力值
        });
    };

    let style = HeatMapStyle.CustomColor;
    let textureSize = 1024;
    let opacityMode = 1;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 1;
    let light = false;
    let viewHeightRange = [0, 10000];
    let colors = {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            {
                "value": 0,
                "color": [0, 0.968627, 0, 1]
            },
            {
                "value": 0.25,
                "color": [0.709804, 0.968627, 0, 1]
            },
            {
                "value": 0.5,
                "color": [1, 0.709804, 0, 1]
            },
            {
                "value": 0.75,
                "color": [0.868627, 0, 0, 1]
            },
            {
                "value": 1,
                "color": [1, 0, 0, 1]
            }
        ]
    };


    let heatmap2 = {
        id: "heatmap2",
        bbox: bbox,
        range: range,
        data: data,
        style: style,
        textureSize: textureSize,
        opacityMode: opacityMode,
        opacityRange: opacityRange,
        blur: blur,
        colors: colors,
        blendMode: blendMode,
        light: light,
        viewHeightRange: viewHeightRange
    };
    await fdapi.heatmap.addByHeatPoints(heatmap2);
    fdapi.heatmap.focus('heatmap2', 1500, 1);
}



async function test_heatmap_add3() {



    await fdapi.heatmap.clear();
    let bbox = [488670.75, 2488165, -2, 491659.59375, 2490987.5, 600.58];
    let range = [0, 10];
    let data = [];
    for (let i = 0; i < 1800; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 250,           //热力点影像半径范围
            heatValue: Math.random() * 2    //热力值
        });
    };

    let style = HeatMapStyle.CustomWave;
    let textureSize = 1024;
    let opacityMode = 0;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 1;
    let light = false;
    let viewHeightRange = [0, 10000];
    let colors = {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            {
                "value": 0,
                "color": [0, 0.968627, 0, 1]
            },
            {
                "value": 0.25,
                "color": [0.709804, 0.968627, 0, 1]
            },
            {
                "value": 0.5,
                "color": [1, 0.709804, 0, 1]
            },
            {
                "value": 0.75,
                "color": [0.868627, 0, 0, 0.2]
            },
            {
                "value": 1,
                //调整色卡的透明度
                "color": [1, 0, 0, 0.2]
            }
        ]
    };

    let heatmap3 = {
        id: "heatmap2",
        bbox: bbox,
        range: range,
        data: data,
        style: style,
        textureSize: textureSize,
        opacityMode: opacityMode,
        opacityRange: opacityRange,
        blur: blur,
        colors: colors,
        blendMode: blendMode,
        light: light,
        viewHeightRange: viewHeightRange
    };
    await fdapi.heatmap.addByHeatPoints(heatmap3);
    fdapi.heatmap.focus('heatmap3', 300, 1);

}



async function test_heatmap_add4() {



    await fdapi.heatmap.clear();
    let bbox = [499019, 2718, 0, 499186, 2976, 10];

    let style = 1;
    let textureSize = 1024;
    let opacityMode = 1;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 0;
    let light = false;

    let colors = {
        "gradient": true,
        "invalidColor": [0, 0, 0, 1],
        "colorStops": [
            { "value": 0, "color": [0, 0, 0, 0] },
            { "value": 0.2, "color": [0, 0, 0, 0] },
            { "value": 0.2, "color": [0.5, 0.5, 0.5, 1] },
            { "value": 1, "color": [1, 1, 1, 1] }
        ]
    };

    let binaryFile = {
        "size": [1250, 1250],
        "needProject": true,
        "left": 9809325,
        "top": 4865942,
        "right": 15794157,
        "bottom": -1118890,
        "minLongitude": 90,
        "maxLongitude": 140,
        "minLatitude": -10,
        "maxLatitude": 40,
        "file": HostConfig.Path + '/assets/bin/heatmap.bin'
    };
    await fdapi.heatmap.add('heatmap4', bbox, null, null, style, textureSize, opacityMode, opacityRange, blur, colors, blendMode, light, binaryFile);
    fdapi.heatmap.focus('heatmap4', 100, 1);
}



async function test_heatmap_add5() {


    await fdapi.heatmap.clear();
    let heatmap5 = {
        "id": "heatmap5",
        "range": [-1, 1],
        "light": true,
        "style": HeatMapStyle.CustomWave, //也支持设置贴地样式 1
        "opacityMode": 0,
        "blendMode": 1,
        "tifFile": {
            "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]
            "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]
            "file": HostConfig.Path + "/assets/tif/T2.tif"
        },
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": -1, "color": [0, 0, 1, 1] },
                { "value": 0.25, "color": [0, 1, 0, 1] },
                { "value": 0.5, "color": [1, 1, 0, 1] },
                { "value": 1, "color": [1, 0, 0, 1] },
            ]
        }
    };
    await fdapi.heatmap.addByTif(heatmap5);
    fdapi.heatmap.focus('heatmap5', 60, 1);
}


async function test_heatmap_add6() {

    await fdapi.heatmap.clear();
    let heatmap6 = {
        "id": "heatmap6",
        "range": [-1, 1],
        "light": true,
        "style": HeatMapStyle.CustomColor, //设置贴地样式 1
        "opacityMode": 0,
        "blendMode": 1,
        "tifFile": {
            "minHeight": -10,//设置贴地模式时 地形高度要在此范围内 [-10~50]
            "maxHeight": 50,//设置贴地模式时 地形高度要在此范围内 [-10~50]
            "file": HostConfig.Path + "/assets/tif/T2.tif"
        },
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                { "value": -1, "color": [0, 0, 1, 1] },
                { "value": 0.25, "color": [0, 1, 0, 1] },
                { "value": 0.5, "color": [1, 1, 0, 1] },
                { "value": 1, "color": [1, 0, 0, 1] },
            ]
        }
    };
    await fdapi.heatmap.addByTif(heatmap6);
    fdapi.heatmap.focus('heatmap6', 60, 1);
}



async function test_heatmap_highlightPixels() {

    //随机像素位置 需要在tif文件分辨率内
    let pixelCoords = [];
    for (let i = 0; i < 100; i++) {
        let x = Math.round(Math.random() * 70);
        let y = Math.round(Math.random() * 22);
        pixelCoords.push([x, y]);
    }

    //高亮Tif文件内的像素  
    fdapi.heatmap.highlightPixels('heatmap6', pixelCoords);

}

async function test_heatmap_unHighlightAllPixels() {
    //取消高亮
    fdapi.heatmap.unHighlightAllPixels('heatmap6');
}


async function test_heatmap_update() {


    __tidUpdateHeatMap = setInterval(() => {

        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i.toString(),
                heatValue: Math.random() * 100        //热力值
            });
        }

        let heatmap1 = {
            id: "heatmap1",
            data: data,
            updateTime: 1,
        };

        fdapi.heatmap.updateByHeatPoints(heatmap1);
    }, 1000);

    //清除定时器
    window.setTimeout(function () {
        window.clearInterval(__tidUpdateHeatMap)
    }, 5000);
}

function test_heatmap_delete() {
    clearInterval(__tidUpdateHeatMap);
    fdapi.heatmap.delete('heatmap1');
}

function test_heatmap_clear() {
    clearInterval(__tidUpdateHeatMap);
    fdapi.heatmap.clear();
}

function test_heatmap_focus() {
    fdapi.heatmap.focus('heatmap1', 100);
}

function test_heatmap_show() {
    fdapi.heatmap.show('heatmap1');
}

function test_heatmap_hide() {
    fdapi.heatmap.hide('heatmap1');
}

function test_heatmap_get() {
    fdapi.heatmap.get('heatmap1');
}


// ==========================HeatMap3D===============================

async function test_heatmap3d_addByImages() {
    //添加前先删除
    fdapi.heatmap3d.clear();
    //构造16张图片
    let imagePathArr = [];
    for (let i = 0; i < 16; i++) {
        let imageName = "LAY" + i + ".png";
        let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;
        imagePathArr.push(imagePath);
    }
    let heatmap3d = {
        id: "heatmap3d_byImages", //对象唯一id
        imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
        volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxSize: [100, 100, 100], //三维热力图盒范围
        boundsColor: [1, 1, 1, 1],//三维热力图盒线框颜色
        brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1 //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
    };
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byImages');
}

async function test_heatmap3d_addByVolumePoints() {

    let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

    let pointsArr = [];
    for (let i = 0; i < 1000; i++) {

        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ

        let coordinate = [x, y, z];
        let heatValue = Math.random() * 100;
        let o = {
            "coordinate": coordinate,
            "extent": [1, 1, 1],
            // "radius": Math.random() * 5, //球体时生效
            "heatValue": heatValue
        };
        pointsArr.push(o);
    }

    let indicesTemp = [];
    for (let i = 0; i < 2000; i++) {
        indicesTemp.push(i)
    }

    //添加前先删除
    fdapi.heatmap3d.clear();
    let heatmap3d = [{
        "id": "heatmap3d_byVolumePoints",
        "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
        "brightness": 10,
        "volumeBoxLocation": [491353.46875, 2488833, 16],
        "heatValueMode": 0,
        "voxelAlphaMode": 0,
        "voxelShape": 1,
        "heatValueRange": [0, 100],
        "textureSize": 256,
        "denoise": 0,
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 55,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 60,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 70,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 80,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 90,
                    "color": [1, 0.8, 0, 1]
                },
                {
                    "value": 95,
                    "color": [1, 0.4, 0, 1]
                },
                {
                    "value": 100,
                    "color": [1, 0, 0, 1]
                }
            ]
        },
        "voxels": pointsArr,
        "indices": indicesTemp
    }];
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byVolumePoints', 50);

}


async function test_heatmap3d_addByVolumeBox() {
    //查询3dt图层的bbox
    let res = await fdapi.tileLayer.get('4DECD1704AD8119E33CF658A64A70AD2');

    //获取包围盒
    let bbox = res.data[0].bbox;

    //计算包围盒尺寸
    let boxSize = [
        (bbox[3] - bbox[0]) / 2,
        (bbox[4] - bbox[1]) / 2,
        300
    ];

    //添加前先删除
    fdapi.heatmap3d.clear();
    //创建空白的盒子范围 往盒子里添加体素块
    let heatmap3d = [{
        "id": "heatmap3d_byVolumeBox",
        "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
        "brightness": 1,
        "volumeBoxLocation": [492782.063125, 2492131.04, -0.8868603515625],
        "volumeBoxSize": boxSize,
        "heatValueMode": 0,
        "voxelAlphaMode": 0,
        "voxelShape": 1, // 0是圆球 1是盒子 
        "heatValueRange": [0, 100],
        "textureSize": 1024,
        "denoise": 0,
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 0],//无效像素设置为完全透明
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 55,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 60,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 70,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 80,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 90,
                    "color": [1, 0.8, 0, 1]
                },
                {
                    "value": 95,
                    "color": [1, 0.4, 0, 1]
                },
                {
                    "value": 100,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    }];
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byVolumeBox', 200);

    //往空白盒子添加10000个体素块
    let voxelsArr = {
        "id": "heatmap3d_byVolumeBox",
        "voxels": []
    };
    for (let i = 0; i < 10000; i++) {
        let voxel = {
            "coordinate": [
                getRandNumBetween(bbox[0], bbox[3]),
                getRandNumBetween(bbox[1], bbox[4]),
                getRandNumBetween(bbox[2], bbox[5])
            ],
            //"radius": Math.random()* 25, //圆球半径 voxelShape=0
            "extent": [10, 10, 10], //单个体素尺寸 voxelShape=1
            "heatValue": Math.random() * 100,
            "alpha": 1
        }
        voxelsArr.voxels.push(voxel);
    }
    //往heatmap3d对象添加三维像素块
    await fdapi.heatmap3d.addVoxels(voxelsArr);

}

async function test_heatmap3d_addByHeatValues() {

    //随机生成10*10*10个热力值
    let heatValueArr = [];
    for (let i = 0; i < 1000; i++) {
        let heatValue = getRandNumBetween(0, 100);
        heatValueArr.push(heatValue);
    }
    fdapi.heatmap3d.clear();
    let heatmap3d = [{
        "id": "heatmap3d_byHeatValues",
        "displayMode": 1,
        "brightness": 8,
        "volumeBoxLocation": [491353.46875, 2488833, 16],
        "volumeBoxSize": [500, 500, 300],
        "heatValueRange": [0, 100],
        "heatValues": {
            "size": [10, 10, 10],//相乘结果就是包含的热力值数量
            "values": heatValueArr,
            "alphas": []
        },
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10.001801,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20.003603,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30.005404,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40.007206,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50.009007,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 60.01081,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 70.01261,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 80.01441,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 90,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 93,
                    "color": [1, 0, 0, 1]
                },
                {
                    "value": 96.01902,
                    "color": [1, 0, 0, 1]
                },
                {
                    "value": 100.02162,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    }];
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byHeatValues');
}

//稀疏体素类型构建
async function test_heatmap3d_addBySparseVoxels() {
    fdapi.heatmap3d.clear();

    let voxels = [];
    for (let i = 0; i < 50000; i++) {
        let heatValue = Math.random() * 1;

        let a = Math.round(Math.random() * 256);
        let b = Math.round(Math.random() * 256);
        let c = Math.round(Math.random() * 256);
        let o = {
            voxel: [a, b, c],
            value: heatValue,
            data: "abc" //用户自定义数据
        }
        voxels.push(o);
    }

    let heatmap3d = {
        id: "heatmap3dBySparseVoxels", //对象唯一id
        sparseVoxels:
        {
            voxels: voxels,
            size: [256, 256, 256]
        },
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxLocation: [493041.969375, 2492117.6, 2.313291015625],
        volumeBoxSize: [256, 256, 256],
        brightness: 15, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1, //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
        voxelAlphaMode: 1,
        heatValueRange: [0, 1],
        colors: {
            gradient: true,
            invalidColor: [1, 0, 0, 1],
            colorStops: [{
                value: 0,
                color: [1, 0, 0, 1]
            }, {
                value: 0.2,
                color: [1, 1, 1, 1]
            }, {
                value: 0.4,
                color: [1, 1, 1, 0.6]
            }, {
                value: 0.6,
                color: [1, 1, 1, 0.6]
            }, {
                value: 0.8,
                color: [0, 1, 1, 1]
            }]
        },
    };
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3dBySparseVoxels');

}


async function test_heatmap3d_load() {

    let path = HostConfig.Path + "\\assets\\tif\\time0\\";
    fdapi.heatmap3d.clear();
    let heatmap3d = {
        "id": "heatmap3d-anima",
        "textureSize": 512,
        "brightness": 1,
        "displayMode": 1,
        "heatValueMode": 0,
        "blendMode": 1,
        "voxelGridSize": [
            1,
            1,
            128
        ],
        "voxelAlphaMode": 0,
        "alphaMode": 0,
        "heatValueRange": [
            268,
            307
        ],
        "colors": {
            "gradient": true,
            "invalidColor": [
                0,
                0,
                0,
                0
            ],
            "colorStops": [
                {
                    "value": 268,
                    "color": [
                        0.1843137254901961,
                        0.30980392156862746,
                        0.30980392156862746,
                        0.5254901960784314
                    ]
                },
                {
                    "value": 268.64,
                    "color": [
                        0.4117647058823529,
                        0.4117647058823529,
                        0.4117647058823529,
                        1
                    ]
                },
                {
                    "value": 269.28,
                    "color": [
                        0.4666666666666667,
                        0.5333333333333333,
                        0.6,
                        1
                    ]
                },
                {
                    "value": 269.92,
                    "color": [
                        0.9411764705882353,
                        1,
                        0.9411764705882353,
                        1
                    ]
                },
                {
                    "value": 270.56,
                    "color": [
                        0.7568627450980392,
                        0.803921568627451,
                        0.7568627450980392,
                        1
                    ]
                },
                {
                    "value": 271.2,
                    "color": [
                        0.10588235294117647,
                        0.043137254901960784,
                        0.5098039215686274,
                        1
                    ]
                },
                {
                    "value": 271.84,
                    "color": [
                        0.11764705882352941,
                        0.20784313725490197,
                        0.7254901960784313,
                        1
                    ]
                },
                {
                    "value": 272.48,
                    "color": [
                        0.11764705882352941,
                        0.5647058823529412,
                        1,
                        1
                    ]
                },
                {
                    "value": 273.11,
                    "color": [
                        0.09411764705882353,
                        0.4549019607843137,
                        0.803921568627451,
                        1
                    ]
                },
                {
                    "value": 273.75,
                    "color": [
                        0.41568627450980394,
                        0.35294117647058826,
                        0.803921568627451,
                        1
                    ]
                },
                {
                    "value": 274.39,
                    "color": [
                        0.5411764705882353,
                        0.16862745098039217,
                        0.8862745098039215,
                        1
                    ]
                },
                {
                    "value": 275.03,
                    "color": [
                        0.5803921568627451,
                        0,
                        0.8274509803921568,
                        1
                    ]
                },
                {
                    "value": 275.67,
                    "color": [
                        0.6078431372549019,
                        0.18823529411764706,
                        1,
                        1
                    ]
                },
                {
                    "value": 276.31,
                    "color": [
                        0.5686274509803921,
                        0.17254901960784313,
                        0.9333333333333333,
                        1
                    ]
                },
                {
                    "value": 276.95,
                    "color": [
                        0.5176470588235295,
                        0.4392156862745098,
                        1,
                        1
                    ]
                },
                {
                    "value": 277.59,
                    "color": [
                        1,
                        0.8823529411764706,
                        1,
                        1
                    ]
                },
                {
                    "value": 278.23,
                    "color": [
                        0.803921568627451,
                        0.7098039215686275,
                        0.803921568627451,
                        1
                    ]
                },
                {
                    "value": 278.87,
                    "color": [
                        1,
                        0.8549019607843137,
                        0.7254901960784313,
                        1
                    ]
                },
                {
                    "value": 279.51,
                    "color": [
                        1,
                        0.9803921568627451,
                        0.803921568627451,
                        1
                    ]
                },
                {
                    "value": 280.15,
                    "color": [
                        0.803921568627451,
                        0.788235294117647,
                        0.6470588235294118,
                        1
                    ]
                },
                {
                    "value": 280.79,
                    "color": [
                        0.050980392156862744,
                        0.396078431372549,
                        0.611764705882353,
                        1
                    ]
                },
                {
                    "value": 281.43,
                    "color": [
                        0.47843137254901963,
                        0.9254901960784314,
                        0.9254901960784314,
                        1
                    ]
                },
                {
                    "value": 282.07,
                    "color": [
                        0.08235294117647059,
                        0.6470588235294118,
                        0.7568627450980392,
                        1
                    ]
                },
                {
                    "value": 282.7,
                    "color": [
                        0,
                        0.7490196078431373,
                        1,
                        1
                    ]
                },
                {
                    "value": 283.34,
                    "color": [
                        0,
                        0.807843137254902,
                        0.8196078431372549,
                        1
                    ]
                },
                {
                    "value": 283.98,
                    "color": [
                        0.2823529411764706,
                        0.8196078431372549,
                        0.8,
                        1
                    ]
                },
                {
                    "value": 284.62,
                    "color": [
                        0.4980392156862745,
                        1,
                        0.8313725490196079,
                        1
                    ]
                },
                {
                    "value": 285.26,
                    "color": [
                        0,
                        1,
                        0.4980392156862745,
                        1
                    ]
                },
                {
                    "value": 285.9,
                    "color": [
                        0.4,
                        0.803921568627451,
                        0.6666666666666666,
                        1
                    ]
                },
                {
                    "value": 286.54,
                    "color": [
                        0,
                        0.803921568627451,
                        0.4,
                        1
                    ]
                },
                {
                    "value": 287.18,
                    "color": [
                        0.5647058823529412,
                        0.9333333333333333,
                        0.5647058823529412,
                        1
                    ]
                },
                {
                    "value": 287.82,
                    "color": [
                        0.7529411764705882,
                        1,
                        0.24313725490196078,
                        1
                    ]
                },
                {
                    "value": 288.46,
                    "color": [
                        0.6039215686274509,
                        0.803921568627451,
                        0.19607843137254902,
                        1
                    ]
                },
                {
                    "value": 289.1,
                    "color": [
                        0.07450980392156863,
                        0.6588235294117647,
                        0.32941176470588235,
                        1
                    ]
                },
                {
                    "value": 289.74,
                    "color": [
                        0.2235294117647059,
                        0.8431372549019608,
                        0.050980392156862744,
                        1
                    ]
                },
                {
                    "value": 290.38,
                    "color": [
                        0.7607843137254902,
                        0.7019607843137254,
                        0.047058823529411764,
                        1
                    ]
                },
                {
                    "value": 291.02,
                    "color": [
                        1,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 291.66,
                    "color": [
                        1,
                        0.8431372549019608,
                        0,
                        1
                    ]
                },
                {
                    "value": 292.3,
                    "color": [
                        0.803921568627451,
                        0.803921568627451,
                        0,
                        1
                    ]
                },
                {
                    "value": 292.93,
                    "color": [
                        1,
                        0.6470588235294118,
                        0.30980392156862746,
                        1
                    ]
                },
                {
                    "value": 293.57,
                    "color": [
                        1,
                        0.4980392156862745,
                        0.1411764705882353,
                        1
                    ]
                },
                {
                    "value": 294.21,
                    "color": [
                        1,
                        0.6470588235294118,
                        0,
                        1
                    ]
                },
                {
                    "value": 294.85,
                    "color": [
                        1,
                        0.4980392156862745,
                        0,
                        1
                    ]
                },
                {
                    "value": 295.49,
                    "color": [
                        0.792156862745098,
                        0.4588235294117647,
                        0.027450980392156862,
                        1
                    ]
                },
                {
                    "value": 296.13,
                    "color": [
                        1,
                        0.4470588235294118,
                        0.33725490196078434,
                        1
                    ]
                },
                {
                    "value": 296.77,
                    "color": [
                        1,
                        0.38823529411764707,
                        0.2784313725490196,
                        1
                    ]
                },
                {
                    "value": 297.41,
                    "color": [
                        1,
                        0.41568627450980394,
                        0.41568627450980394,
                        1
                    ]
                },
                {
                    "value": 298.05,
                    "color": [
                        0.803921568627451,
                        0.3333333333333333,
                        0.3333333333333333,
                        1
                    ]
                },
                {
                    "value": 298.69,
                    "color": [
                        1,
                        0.0784313725490196,
                        0.5764705882352941,
                        1
                    ]
                },
                {
                    "value": 299.33,
                    "color": [
                        1,
                        0,
                        0.592156862745098,
                        1
                    ]
                },
                {
                    "value": 299.97,
                    "color": [
                        1,
                        0.43137254901960786,
                        0.7058823529411765,
                        1
                    ]
                },
                {
                    "value": 300.61,
                    "color": [
                        1,
                        0.2784313725490196,
                        0.4666666666666667,
                        1
                    ]
                },
                {
                    "value": 301.25,
                    "color": [
                        0.8588235294117647,
                        0.35294117647058826,
                        0.4196078431372549,
                        1
                    ]
                },
                {
                    "value": 301.89,
                    "color": [
                        0.788235294117647,
                        0.21568627450980393,
                        0.33725490196078434,
                        1
                    ]
                },
                {
                    "value": 302.52,
                    "color": [
                        0.7843137254901961,
                        0.23529411764705882,
                        0.13725490196078433,
                        1
                    ]
                },
                {
                    "value": 303.16,
                    "color": [
                        0.8745098039215686,
                        0.29411764705882354,
                        0.047058823529411764,
                        1
                    ]
                },
                {
                    "value": 303.8,
                    "color": [
                        0.9333333333333333,
                        0.25098039215686274,
                        0,
                        1
                    ]
                },
                {
                    "value": 304.44,
                    "color": [
                        1,
                        0.27058823529411763,
                        0,
                        1
                    ]
                },
                {
                    "value": 305.08,
                    "color": [
                        0.8784313725490196,
                        0.011764705882352941,
                        0.011764705882352941,
                        1
                    ]
                },
                {
                    "value": 305.72,
                    "color": [
                        0.6352941176470588,
                        0.12549019607843137,
                        0.2549019607843137,
                        1
                    ]
                },
                {
                    "value": 307,
                    "color": [
                        0.9490196078431372,
                        0.047058823529411764,
                        0,
                        1
                    ]
                }
            ]
        },
        "tifAnimation": {
            "files": [
                [path + "isobaricInhPa1/p_time0_isobaricInhPa1.tif", path + "isobaricInhPa2/p_time0_isobaricInhPa2.tif", path + "isobaricInhPa3/p_time0_isobaricInhPa3.tif"],
                [path + "isobaricInhPa4/p_time0_isobaricInhPa4.tif", path + "isobaricInhPa5/p_time0_isobaricInhPa5.tif", path + "isobaricInhPa6/p_time0_isobaricInhPa6.tif"],
                [path + "isobaricInhPa7/p_time0_isobaricInhPa7.tif", path + "isobaricInhPa8/p_time0_isobaricInhPa8.tif", path + "isobaricInhPa9/p_time0_isobaricInhPa9.tif"],
                [path + "isobaricInhPa10/p_time0_isobaricInhPa10.tif", path + "isobaricInhPa11/p_time0_isobaricInhPa11.tif", path + "isobaricInhPa12/p_time0_isobaricInhPa12.tif"],
                [path + "isobaricInhPa13/p_time0_isobaricInhPa13.tif", path + "isobaricInhPa14/p_time0_isobaricInhPa14.tif", path + "isobaricInhPa15/p_time0_isobaricInhPa15.tif"],
                [path + "isobaricInhPa16/p_time0_isobaricInhPa16.tif", path + "isobaricInhPa17/p_time0_isobaricInhPa17.tif", path + "isobaricInhPa18/p_time0_isobaricInhPa18.tif"],
                [path + "isobaricInhPa19/p_time0_isobaricInhPa19.tif", path + "isobaricInhPa20/p_time0_isobaricInhPa20.tif", path + "isobaricInhPa21/p_time0_isobaricInhPa21.tif"],
                [path + "isobaricInhPa22/p_time0_isobaricInhPa22.tif", path + "isobaricInhPa23/p_time0_isobaricInhPa23.tif", path + "isobaricInhPa24/p_time0_isobaricInhPa24.tif"],
                [path + "isobaricInhPa25/p_time0_isobaricInhPa25.tif", path + "isobaricInhPa26/p_time0_isobaricInhPa26.tif", path + "isobaricInhPa27/p_time0_isobaricInhPa27.tif"],
                [path + "isobaricInhPa28/p_time0_isobaricInhPa28.tif", path + "isobaricInhPa29/p_time0_isobaricInhPa29.tif", path + "isobaricInhPa30/p_time0_isobaricInhPa30.tif"],
                [path + "isobaricInhPa31/p_time0_isobaricInhPa31.tif", path + "isobaricInhPa32/p_time0_isobaricInhPa32.tif", path + "isobaricInhPa33/p_time0_isobaricInhPa33.tif"],
                [path + "isobaricInhPa34/p_time0_isobaricInhPa34.tif", path + "isobaricInhPa35/p_time0_isobaricInhPa35.tif", path + "isobaricInhPa36/p_time0_isobaricInhPa36.tif"]
            ],
            "minHeight": 0,
            "maxHeight": 1000000,
            "totalSeconds": 10
        }
    }
    fdapi.heatmap3d.load(heatmap3d);
    fdapi.camera.set(8687397.494102, 8426718.222344, 10390890.88, -62.999722, 33.423145, 0);
}

async function test_heatmap3d_play() {
    fdapi.heatmap3d.play("heatmap3d-anima");
}

async function test_heatmap3d_pause() {
    fdapi.heatmap3d.pause("heatmap3d-anima");
}

async function test_heatmap3d_setTime() {
    fdapi.heatmap3d.setTime("heatmap3d-anima", 5);
}

function test_heatmap3d_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //设置1和3视口可见
    fdapi.heatmap3d.setViewportVisible('heatmap3d_byVolumePoints', Viewport.V1 | Viewport.V3);

}

async function test_heatmap3d_add_addVoxels() {

    let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

    let voxelsArr = [{
        "id": "heatmap3d_byVolumePoints",
        "voxels": [
            {
                "coordinate": [
                    getRandNumBetween(bbox[0], bbox[3]),
                    getRandNumBetween(bbox[1], bbox[4]),
                    getRandNumBetween(bbox[2], bbox[5])
                ],
                "radius": 50,
                "heatValue": 80,
                "alpha": 1
            },
            {
                "coordinate": [
                    getRandNumBetween(bbox[0], bbox[3]),
                    getRandNumBetween(bbox[1], bbox[4]),
                    getRandNumBetween(bbox[2], bbox[5])
                ],
                "radius": 50,
                "heatValue": 20,
                "alpha": 1
            }
        ]
    }];
    //往heatmap3d对象添加三维像素块
    await fdapi.heatmap3d.addVoxels(voxelsArr);

}


// ==========================HeatMap3D===============================

async function test_heatmap3d_addByImages() {
    //添加前先删除
    fdapi.heatmap3d.clear();
    //构造16张图片
    let imagePathArr = [];
    for (let i = 0; i < 16; i++) {
        let imageName = "LAY" + i + ".png";
        let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;
        imagePathArr.push(imagePath);
    }
    let heatmap3d = {
        id: "heatmap3d_byImages", //对象唯一id
        imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
        volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxSize: [100, 100, 100], //三维热力图盒范围
        boundsColor: [0, 1, 0, 1],//三维热力图盒线框颜色
        brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1 //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
    };
    await fdapi.heatmap3d.addByImages(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byImages');
}


async function test_heatmap3d_addByBinaryFiles() {
    //相机位置
    __g.camera.set(11366962.16, 3291106, 8407946.24, -85.98735, -90, 0);
    __g.heatmap3d.delete('heatmap3d_byBinaryFiles');

    let binPath = HostConfig.Path + "/assets/bin/heatmap3d/";
    let filesArr = [];
    for (let i = 0; i < 17; i++) {
        filesArr.push(binPath + "\\time0_isobaricInhPa" + i + ".bin");
    }

    centerx = (9809325.314045891 + 15794157.568407029) * 0.5;
    width = (15794157.568407029 - 9809325.314045891);
    centery = (4865942.279503176 - 1118889.97485796) * 0.5;
    height = (4865942.279503176 + 1118889.97485796);

    let heatmap3d = {
        id: "heatmap3d_byBinaryFiles", //对象唯一id
        binaryFiles: {
            size: [101, 101],
            files: filesArr,
            needProject: true,
            left: 9809325.314045891,
            top: 4865942.279503176,
            right: 15794157.568407029,
            bottom: -1118889.97485796,
            minLongitude: 90,
            maxLongitude: 140,
            minLatitude: -10,
            maxLatitude: 40,
        },
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxLocation: [centerx, centery, 0],
        volumeBoxSize: [width, height, 1000000],
        voxelGridSize: [1, 1, 256],
        textureSize: 512,
        brightness: 0.08, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1, //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
        heatValueMode: 0,
        voxelAlphaMode: 0,
        heatValueRange: [0, 20],
        colors: {
            "gradient": true,
            "invalidColor": [1, 1, 1, 0],
            //剖切透明度要大于0.33
            "colorStops": [
                {
                    "value": 0,
                    "color": [1, 1, 1, 0.11]
                },
                {
                    "value": 5,
                    "color": [0, 0, 1, 0.22]
                },
                {
                    "value": 10,
                    "color": [0, 1, 0, 0.33]
                },
                {
                    "value": 14,
                    "color": [1, 1, 0, 0.66]
                },
                {
                    "value": 17,
                    "color": [1, 0.5, 0, 0.81]
                },

                {
                    "value": 20,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    };

    await __g.heatmap3d.addByBinaryFiles([heatmap3d]);
}


//纯热力值构建
async function test_heatmap3d_addByVoxels() {

    //随机生成10*10*10个热力值
    let heatValueArr = [];
    for (let i = 0; i < 1000; i++) {
        let heatValue = getRandNumBetween(0, 100);
        heatValueArr.push(heatValue);
    }
    //添加空间体素的热力值构建heatmap3d对象（纯热力值构建）
    fdapi.heatmap3d.clear();
    let heatmap3d = [{
        "id": "heatmap3d_byHeatValues",
        "displayMode": 1,
        "brightness": 0.5,
        "volumeBoxLocation": [491353.46875, 2488833, 16],
        "volumeBoxSize": [500, 500, 300],
        "heatValueRange": [0, 68],
        "heatValues": {
            "size": [10, 10, 10],//相乘结果就是包含的热力值数量1000
            "values": heatValueArr,
            "alphas": []
        },
        "colors": {
            "gradient": true,
            "invalidColor": [1, 1, 1, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10.001801,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20.003603,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30.005404,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40.007206,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50.009007,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 60.01081,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 70.01261,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 80.01441,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 90,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 93,
                    "color": [1, 0, 0, 1]
                },
                {
                    "value": 96.01902,
                    "color": [1, 0, 0, 1]
                },
                {
                    "value": 100.02162,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    }];
    await fdapi.heatmap3d.addByVoxels(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byHeatValues');
}

//根据空间离散热力点对应的热力值构建
async function test_heatmap3d_addByHeatPoints() {

    let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

    let pointsArr = [];
    for (let i = 0; i < 1000; i++) {

        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ

        let coordinate = [x, y, z];
        let heatValue = Math.random() * 100;
        let o = {
            "coordinate": coordinate,
            "extent": [1, 1, 1],
            // "radius": Math.random() * 5, //球体时生效
            "heatValue": heatValue
        };
        pointsArr.push(o);
    }

    let indicesTemp = [];
    for (let i = 0; i < 2000; i++) {
        indicesTemp.push(i)
    }

    //添加前先删除
    fdapi.heatmap3d.clear();
    let heatmap3d = [{
        "id": "heatmap3d_byHeatPoints",
        "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
        "brightness": 10,
        "volumeBoxLocation": [491353.46875, 2488833, 16],
        "heatValueMode": 0,
        "voxelAlphaMode": 0,
        "voxelShape": 1,
        "heatValueRange": [0, 100],
        "textureSize": 256,
        "denoise": 0,
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 55,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 60,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 70,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 80,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 90,
                    "color": [1, 0.8, 0, 1]
                },
                {
                    "value": 95,
                    "color": [1, 0.4, 0, 1]
                },
                {
                    "value": 100,
                    "color": [1, 0, 0, 1]
                }
            ]
        },
        "voxels": pointsArr,
        "indices": indicesTemp
    }];
    await fdapi.heatmap3d.addByHeatPoints(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byHeatPoints', 50);

}

//往heatmap3d对象添加离散三维像素块
async function test_heatmap3d_addHeatPointsToBox() {

    //包围盒
    let bbox = [491066.28125, 2488747.75, 0, 491207.125, 2488888.5, 500];

    //添加前先删除
    fdapi.heatmap3d.clear();
    //创建空白的盒子范围 往盒子里添加体素块
    let heatmap3d = [{
        "id": "heatmap3d_byVolumeBox",
        "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
        "brightness": 10,
        "volumeBoxLocation": [491353.46875, 2488833, 20],
        "volumeBoxSize": [800, 800, 500],
        "heatValueMode": 0,
        "voxelAlphaMode": 0,
        "voxelGridSize": [256, 256, 256],
        "voxelShape": 1, // 0是圆球 1是盒子 
        "heatValueRange": [0, 100],
        "textureSize": 256,
        "denoise": 0,
        "colors": {
            "gradient": true,
            "invalidColor": [1, 1, 1, 1],//无效像素设置为完全透明
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                }, {
                    "value": 10,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 20,
                    "color": [0, 0.4, 1, 1]
                },
                {
                    "value": 30,
                    "color": [0, 0.8, 1, 1]
                },
                {
                    "value": 40,
                    "color": [0, 1, 0.8, 1]
                },
                {
                    "value": 50,
                    "color": [0, 1, 0.4, 1]
                },
                {
                    "value": 55,
                    "color": [0, 1, 0, 1]
                },

                {
                    "value": 60,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 70,
                    "color": [0.4, 1, 0, 1]
                },
                {
                    "value": 80,
                    "color": [0.8, 1, 0, 1]
                },

                {
                    "value": 90,
                    "color": [1, 0.8, 0, 1]
                },
                {
                    "value": 95,
                    "color": [1, 0.4, 0, 1]
                },
                {
                    "value": 100,
                    "color": [1, 0, 0, 1]
                }
            ]
        }
    }];
    await fdapi.heatmap3d.add(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byVolumeBox', 200);

    //往空白盒子添加100个体素块
    let voxelsArr = {
        "id": "heatmap3d_byVolumeBox",
        "voxels": []
    };
    for (let i = 0; i < 10; i++) {

        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = getRandNumBetween(bbox[2], bbox[5]);    //minZ ~ maxZ
        let coordinate = [x, y, z];
        let heatValue = Math.random() * 100;
        let voxel = {
            "coordinate": coordinate,
            "extent": [8, 8, 8],
            // "radius": Math.random() * 5, //球体时生效
            "heatValue": heatValue,
            "alpha": 1
        };
        voxelsArr.voxels.push(voxel);
    }
    //往heatmap3d对象添加三维像素块
    await fdapi.heatmap3d.addHeatPoints(voxelsArr);

}


//稀疏体素类型构建
async function test_heatmap3d_addBySparseVoxels() {
    fdapi.heatmap3d.clear();

    let voxels = [];
    for (let i = 0; i < 2000; i++) {
        let heatValue = Math.random() * 100;

        let a = Math.round(Math.random() * 256);
        let b = Math.round(Math.random() * 256);
        let c = Math.round(Math.random() * 256);
        let o = {
            voxel: [a, b, c],
            value: heatValue,
            data: "abc" //用户自定义数据
        }
        voxels.push(o);
    }

    let heatmap3d = {
        id: "heatmap3dBySparseVoxels", //对象唯一id
        sparseVoxels:
        {
            voxels: voxels,
            size: [256, 256, 256]
        },
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxLocation: [493041.969375, 2492117.6, 2.313291015625],
        volumeBoxSize: [256, 256, 256],
        brightness: 10, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1, //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
        voxelAlphaMode: 1,
        heatValueRange: [0, 68],
        colors: {
            gradient: true,
            invalidColor: [1, 0, 0, 1],
            colorStops: [{
                value: 0,
                color: [1, 0, 0, 1]
            }, {
                value: 0.2,
                color: [1, 1, 1, 1]
            }, {
                value: 0.4,
                color: [1, 1, 1, 0.6]
            }, {
                value: 0.6,
                color: [1, 1, 1, 0.6]
            }, {
                value: 0.8,
                color: [0, 1, 1, 1]
            }]
        },
    };
    await fdapi.heatmap3d.addBySparseVoxels(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3dBySparseVoxels', 10);
}

function test_heatmap3d_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //设置1和3视口可见
    fdapi.heatmap3d.setViewportVisible('heatmap3d_byHeatPoints', Viewport.V1 | Viewport.V3);

}

async function test_heatmap3d_add_addVoxels() {

    let bbox = [491066.28125, 2488747.75, 1, 491207.125, 2488888.5, 100];

    let voxelsArr = [{
        "id": "heatmap3d_byVolumePoints",
        "voxels": [
            {
                "coordinate": [
                    getRandNumBetween(bbox[0], bbox[3]),
                    getRandNumBetween(bbox[1], bbox[4]),
                    getRandNumBetween(bbox[2], bbox[5])
                ],
                "radius": 50,
                "heatValue": 80,
                "alpha": 1
            },
            {
                "coordinate": [
                    getRandNumBetween(bbox[0], bbox[3]),
                    getRandNumBetween(bbox[1], bbox[4]),
                    getRandNumBetween(bbox[2], bbox[5])
                ],
                "radius": 50,
                "heatValue": 20,
                "alpha": 1
            }
        ]
    }];
    //往heatmap3d对象添加三维像素块
    await fdapi.heatmap3d.addVoxels(voxelsArr);

}

function test_heatmap3d_clip() {
    //定时器进行动态剖切
    let heatmap3d_for_update = {
        id: "heatmap3d_byVolumePoints", //对象唯一id
        clipBox: [0, 0, 1, 500, 500, 100],//剖切盒子范围 注意：仅对displayMode=2盒子模式下生效
    };

    let index = 0;
    let timer = setInterval(async () => {
        index++;
        if (index < 10) {
            let box = [0, 0, 0, 500, 500, 100 - 10 * index];
            heatmap3d_for_update.clipBox = box;
            await fdapi.heatmap3d.update(heatmap3d_for_update);
        } else {
            //清除定时器
            clearInterval(timer);
        }
    }, 1000);
}

async function test_heatmap3d_update() {
    //构造16张图片
    let imagePathArr = [];
    for (let i = 0; i < 16; i++) {
        let imageName = "LAY" + i + ".png";
        let imagePath = HostConfig.Path + "/assets/heatmap3d/" + imageName;
        imagePathArr.push(imagePath);
    }
    let heatmap3d_for_update = {
        id: "heatmap3d_byImages", //对象唯一id
        imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
        volumeBoxLocation: [491616.6875, 2488984.75, 14.832968711853027], //三维热力图坐标位置
        volumeBoxRotation: [0, 90, 0], //三维热力图坐标旋转
        volumeBoxSize: [100, 100, 150], //三维热力图盒范围
        brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1 //显示模式
    };
    await fdapi.heatmap3d.update(heatmap3d_for_update);
    fdapi.heatmap3d.focus('heatmap3d_byImages');
}

function test_heatmap3d_delete() {
    fdapi.heatmap3d.delete('heatmap3d_byImages');
}

function test_heatmap3d_clear() {
    fdapi.heatmap3d.clear();
}

function test_heatmap3d_focus() {
    fdapi.heatmap3d.focus('heatmap3d_byImages', 100);
}

function test_heatmap3d_show() {
    fdapi.heatmap3d.show('heatmap3d_byImages');
}

function test_heatmap3d_hide() {
    fdapi.heatmap3d.hide('heatmap3d_byImages');
}

function test_heatmap3d_get() {
    fdapi.heatmap3d.get('heatmap3d_byImages');
}

function test_heatmap3d_queryVoxel() {
    //使用稀疏体素的贴画模式构建 再根据点击的坐标查询 
    fdapi.heatmap3d.queryVoxel('heatmap3dBySparseVoxels', [493071.401875, 2492076.96, 2.313291015625]);
}

//========================OcaenHeatMap=======================

function test_oceanHeatmap_add_flow() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Flow, //流场
        "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
        "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);
    //fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
    fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);

}

function test_oceanHeatmap_add_wave() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Wave, //波浪
        "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
        "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);
    //fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
    fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);

}

function test_oceanHeatmap_add_arrow() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Arrow, //箭头
        "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
        "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);
    //fdapi.oceanHeatmap.focus('oceanHeatmap_tif1', 100000);
    fdapi.camera.set(12935840.961641, 2058623.348789, 443963.48, -72.183235, -176.412643, 0);

}


function test_oceanHeatmap_update_new() {
    let path = HostConfig.Path;
    let oceanHeatmap_update = {
        "id": "oceanHeatmap_tif",
        "valueFile": path + "/assets/tif/oceanheatmap/value.tif",
        "flowField": path + "/assets/tif/oceanheatmap/uv.tif",
    }
    fdapi.oceanHeatmap.update(oceanHeatmap_update);
}

function test_oceanHeatmap_hide_new() {
    fdapi.oceanHeatmap.hide('oceanHeatmap_tif');
}

function test_oceanHeatmap_show_new() {
    fdapi.oceanHeatmap.show('oceanHeatmap_tif');
}

function test_oceanHeatmap_get_new() {
    fdapi.oceanHeatmap.get('oceanHeatmap_tif');
}

function test_oceanHeatmap_delete_new() {
    fdapi.oceanHeatmap.delete('oceanHeatmap_tif');
}

function test_oceanHeatmap_clear_new() {
    fdapi.oceanHeatmap.clear();
}

function test_oceanHeatmap_focus_new() {
    fdapi.oceanHeatmap.focus('oceanHeatmap_tif', 200000);
}




//====================== highlightArea ======================

async function test_highlightArea_add() {
    fdapi.highlightArea.clear();
    let o = {
        id: '1',
        coordinates: [
            [488526.90625, 2488808.5, 2.4699218273162842],
            [489125.78125, 2490378.75, 4.0634374618530273],
            [489808.625, 2490836.5, 4.278437614440918],
            [490844.5, 2490698.75, 8.6131248474121094],
            [491145.71875, 2489830, 20.654062271118164],
            [491075.59375, 2488885.5, 21.038749694824219],
            [490706.875, 2487941.75, 4.1996874809265137],
            [490053.40625, 2486989, 17.100000381469727],
            [489206.875, 2487352.75, 16.781406402587891],
        ],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [0, 1, 0, 0.8],      //多边形高亮颜色
        heightRange: [0.0, 200.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
        intensity: 1.0,             //高亮颜色的强度
        depthTest: true             //深度检测
    };
    await fdapi.highlightArea.add(o);
    fdapi.highlightArea.focus(o.id);
}

function test_highlightArea_delete() {
    fdapi.highlightArea.delete('1');
}

async function test_highlightArea_update() {
    let o = {
        id: '1',
        coordinates: [
            [488526.90625, 2488808.5, 2.4699218273162842],
            [489125.78125, 2490378.75, 4.0634374618530273],
            [489808.625, 2490836.5, 4.278437614440918],
            [490844.5, 2490698.75, 8.6131248474121094],
            [491145.71875, 2489830, 20.654062271118164],
            [491075.59375, 2488885.5, 21.038749694824219]
        ],
        color: [1, 0, 0, 0.5],      //多边形高亮颜色
        heightRange: [0.0, 300.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
        intensity: 2.0              //高亮颜色的强度
    };
    await fdapi.highlightArea.update(o);
    fdapi.highlightArea.focus(o.id);
}

function test_highlightArea_clear() {
    fdapi.highlightArea.clear();
}

function test_highlightArea_focus() {
    fdapi.highlightArea.focus('1', 600);
}

function test_highlightArea_show() {
    fdapi.highlightArea.show('1');
}

function test_highlightArea_hide() {
    fdapi.highlightArea.hide('1');
}

function test_highlightArea_get() {
    fdapi.highlightArea.get('1');
}



//====================== markerLayer ====================

async function test_markerLayer_add() {

    fdapi.markerLayer.clear();
    //标记点数组
    let markerArr = [];
    //深圳一万随机点 
    let points = shenzhen1wPoints.features;
    for (let i = 0; i < 10000; i++) {

        let point = points[i];
        let coordinate = point.geometry.coordinates;
        let marker = {
            id: 'marker_' + i,
            coordinate: coordinate,//坐标位置
            anchors: [-24, 48],//锚点
            text: 'M_' + i,//显示的文字 
            popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
            imagePath: HostConfig.Path + '/locale/zh/images/markerLayer.png',
            imageSize: [40, 40],
            hoverImagePath: HostConfig.Path + '/locale/zh/images/markerLayer.png',// 鼠标悬停时显示的图片路径
            hoverImageSize: [40, 40],//鼠标悬停时显示的图片尺寸
        };
        markerArr.push(marker);
    }

    let markerLayer = {
        id: "markerLayer1",
        groupId: 'markerLayer',
        coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [0, 1000, 10000000],
        minPiexl: 0.1,
        autoHeight: true,

        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [1, 1000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 20,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupBackgroundColor: [1.0, 1.0, 1.0, 0.5],//弹窗背景颜色
        popupSize: [200, 200],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移
        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHeight: true,// 自动判断下方是否有物体
        displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0,//避让优先级
        occlusionCull: true,//是否参与遮挡剔除
        markers: markerArr,
    };
    fdapi.markerLayer.add(markerLayer);
}

async function test_markerLayer_update() {

    //标记点数组
    let markerArr4Update = [];
    //深圳随机点
    let points = shenzhen1wPoints.features;
    for (let i = 0; i < 2000; i++) {

        let point = points[i];
        let coordinate = point.geometry.coordinates;
        let marker = {
            id: 'marker_' + i,
            coordinate: coordinate,//坐标位置
            text: 'T_' + i,//显示的文字 
            popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
            imagePath: HostConfig.Path + '/locale/zh/images/antennaPattern.png',
            imageSize: [40, 40],
            hoverImagePath: HostConfig.Path + '/locale/zh/images/antennaPattern.png',// 鼠标悬停时显示的图片路径
            hoverImageSize: [40, 40],//鼠标悬停时显示的图片尺寸
        };
        markerArr4Update.push(marker);
    }

    let markerLayer = {
        id: "markerLayer1",
        groupId: 'markerLayer',
        coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [0, 500, 4000, 20000],
        autoHeight: true,

        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [1, 1000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 20,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupBackgroundColor: [1.0, 1.0, 1.0, 0.5],//弹窗背景颜色
        popupSize: [200, 200],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移
        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHeight: true,// 自动判断下方是否有物体
        displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0,//避让优先级
        occlusionCull: true,//是否参与遮挡剔除
        markers: markerArr4Update,
    };
    fdapi.markerLayer.update(markerLayer);
}

function test_markerLayer_focus() {
    fdapi.markerLayer.focus('markerLayer1', 200, 0.2);
}

function test_markerLayer_focus_marker() {
    fdapi.markerLayer.focusByMarkerId('markerLayer1', 'marker_100');
}

function test_markerLayer_focusAll() {
    fdapi.markerLayer.focusAll(200, 0.2);
}

function test_markerLayer_show() {
    fdapi.markerLayer.show('markerLayer1');
}

function test_markerLayer_showAll() {
    fdapi.markerLayer.showAll();
}

function test_markerLayer_hideAll() {
    fdapi.markerLayer.hideAll();
}

function test_markerLayer_hide() {
    fdapi.markerLayer.hide(['markerLayer1']);
}

function test_markerLayer_clear() {
    fdapi.markerLayer.clear();
}

function test_markerLayer_delete() {
    fdapi.markerLayer.delete(['markerLayer1']);
}

function test_markerLayer_setViewHeightRange() {
    fdapi.markerLayer.setViewHeightRange("markerLayer1", 100, 1000);
}


//====================== marker ====================

async function test_marker_add() {
    fdapi.marker.clear();
    //支持经纬度坐标和普通投影坐标两种类型
    let o1 = {
        id: 'm1',
        groupId: 'markerAdd',
        coordinate: [492548.01156250003, 2491828.58796875, 132.697470703125],//坐标位置
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
        imageSize: [50, 50],//图片的尺寸
        hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
        range: [1, 1000000],//可视范围
        viewHeightRange: [1, 1000000],// 可见高度范围
        rangeRatio: 0.01,//可见高度范围的调整系数
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '北京银行',//显示的文字 
        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 24,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
        popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色
        popupSize: [300, 300],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移

        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
        lineColor: Color.SpringGreen,//垂直牵引线颜色
        lineOffset: [0, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：false
        autoHeight: false,// 自动判断下方是否有物体  开启后会叠加坐标Z
        displayMode: 4,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 1,//避让优先级 值越大显示越靠上
        occlusionCull: false//是否参与遮挡
    };


    let o2 = {
        id: 'm2',
        groupId: 'markerAdd',
        coordinate: [492705.448125, 2491800.24453125, 0],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
        imageSize: [50, 50],//图片的尺寸
        hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 


        range: [1, 1000000],//可视范围
        viewHeightRange: [1, 1000000],// 可见高度范围
        rangeRatio: 0.01,//可见高度范围的调整系数

        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径

        text: '招商银行',//显示的文字
        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 24,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupURL: HostConfig.Path + '/locale/zh/help.html',//弹窗HTML链接
        popupBackgroundColor: [1.0, 1.0, 1.0, 1],//弹窗背景颜色
        popupSize: [600, 600],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移

        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
        lineColor: Color.SpringGreen,//垂直牵引线颜色
        lineOffset: [0, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true
        autoHeight: true,// 自动判断下方是否有物体 开启后会叠加坐标Z
        displayMode: 4,// 智能显示模式: 根据当前相机高度自动适配以上模式，类似金字塔lod加载效果，内置规则:range范围的1%内取值2，1%至10%取值1，大于10%取值0
        autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2
        autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 2,//避让优先级 值越大显示越靠上
        occlusionCull: false//是否参与遮挡
    };

    let o3 = {
        id: 'm3',
        groupId: 'markerAdd',
        coordinate: [492817.4336328125, 2491807.7020703126, 149.757939453125],//坐标位置 自动高度开启可以不给坐标高度z 标注可以定位到下方物体上
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 50],//锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
        imageSize: [50, 50],//图片的尺寸
        hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 


        range: [1, 1000000],//可视范围
        viewHeightRange: [1, 1000000],// 可见高度范围
        rangeRatio: 0.01,//可见高度范围的调整系数

        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',// 鼠标悬停时显示的图片路径

        text: '中国银行',//显示的文字
        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [1, 1000000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 24,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupURL: HostConfig.Path + 'locale/zh/help.html',//弹窗HTML链接
        popupBackgroundColor: [1, 1, 1, 1],//弹窗背景颜色
        popupSize: [600, 600],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移

        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
        lineColor: Color.SpringGreen,//垂直牵引线颜色
        lineOffset: [0, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHideText: true, //打开弹窗时是否自动隐藏文字，默认值：true
        autoHeight: false,// 自动判断下方是否有物体 开启后会叠加坐标Z
        displayMode: 4,// 智能显示模式
        autoDisplayModeSwitchFirstRatio: 0.01,//智能模式时的显示模式切换时range参数的首段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.01，示例：如果range=[1,1000]，则在[1,10]范围内dislayMode=2
        autoDisplayModeSwitchSecondRatio: 0.1,//智能模式时的显示模式切换时range参数的第二段比例，仅在displayMode=4时生效，取值范围：[0.01~1.0)，默认值0.1，示例：如果range=[1,1000]，则在[10,100]范围内dislayMode=1，大于100则dislayMode=1
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 3,//避让优先级 值越大显示越靠上
        occlusionCull: false//是否参与遮挡
    };
    let markerArr = [];
    markerArr.push(o1);
    markerArr.push(o2);
    markerArr.push(o3);
    //海量poi添加请使用批量添加 提供效率 
    await fdapi.marker.add(markerArr);
    fdapi.marker.focus(o1.id, 100, 0);
}

async function test_marker_update() {

    let o = {
        id: 'm1',
        text: '北京银行欢迎你',
        fontColor: Color.Blue,
        popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],
        textBackgroundColor: Color.Yellow,
        lineSize: [2, 50],
        lineColor: Color.Yellow
    }
    await fdapi.marker.update(o);
    fdapi.marker.focus(o.id, 200, 0);
}

function test_marker_focus() {
    fdapi.marker.focus('m1', 200, 0.2);
}

function test_marker_focusAll() {
    fdapi.marker.focusAll(200, 0.2);
}

function test_marker_show() {
    fdapi.marker.show('m1');
}

function test_marker_showAll() {
    fdapi.marker.showAll();
}

function test_marker_hideAll() {
    fdapi.marker.hideAll();
}

function test_marker_hide() {
    fdapi.marker.hide(['m1']);
}

function test_marker_clear() {
    fdapi.marker.clear();
}

function test_marker_delete() {
    fdapi.marker.delete(['m1', 'm2']);
}

function test_marker_showPopupWindow() {
    fdapi.marker.showPopupWindow('m1');
}

function test_marker_setAttachCustomObject() {
    fdapi.marker.clear();
    //添加标签
    let marker = {
        id: 'marker1',
        coordinate: [493075.96875, 2492030.75, 0], //坐标位置
        coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [-14, 28], //锚点
        range: [0, 10000], //可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png', //显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png', // 鼠标悬停时显示的图片路径
        imageSize: [28, 28], //图片的尺寸
        hoverImageSize: [28, 28], //鼠标悬停时显示的图片尺寸
        fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '标签跟随车辆移动', //显示的文字
        useTextAnimation: false, //打开文字展开动画效果
        textRange: [0, 10000], //文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0], // 文本偏移
        textBackgroundColor: Color.White, //文本背景颜色
        fontSize: 18, //字体大小
        fontOutlineSize: 1, //字体轮廓线大小
        fontColor: Color.Green, //字体颜色
        fontOutlineColor: Color.White, //字体轮廓线颜色

        showLine: true, //标注点下方是否显示垂直牵引线
        lineSize: [2, 80], //垂直牵引线宽度和高度[width, height]
        lineColor: Color.SpringGreen, //垂直牵引线颜色
        lineOffset: [0, 0], //垂直牵引线偏移

        autoHeight: true, // 自动判断下方是否有物体
        displayMode: 2, //显示模式 
        priority: 0, //避让优先级
        occlusionCull: false //是否参与遮挡剔除
    };
    fdapi.marker.add(marker);

    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();

    //添加车辆
    let co = {
        id: 'co1', //自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak', //pak文件路径
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493075.96875, 2492030.75, 2.115567684173584], //位置坐标
        coordinateType: 0, // 坐标系类型 
        rotation: [0, 0, 0], //旋转
        scale: [1, 1, 1], //缩放
        smoothMotion: 1, //1: 平滑插值，0: 跳跃
    };
    fdapi.customObject.add(co);

    //设置贴合，支持数组类型，多个对象贴合
    fdapi.marker.attachObject([{
        markerId: 'marker1', //标注id
        objectId: 'co1', //自定义对象id
        offset: [0, 0.5, 2] //偏移量
    }]);


    //标签跟随车辆移动
    fdapi.customObject.focus(co.id, -1);

    let pathArr = [
        [493075.96875, 2492030.75, 2.115567684173584],
        [493102.46875, 2492033, 2.1155762672424316],
        [493089.78125, 2492033.75, 2.1155567169189453],
        [493074.15625, 2492034.5, 2.1155762672424316],
        [493062.21875, 2492034, 2.1155664920806885],
        [493045.71875, 2492035, 2.1155762672424316],
        [493032.28125, 2492035, 2.1155664920806885],
        [493016.4375, 2492036, 2.1155567169189453],
        [493000.6875, 2492036, 2.1155664920806885],
        [492988.1875, 2492037, 2.1155762672424316],
    ]

    //启动定时器更改车辆位置   
    let index = 0;
    let timerId = setInterval(async () => {
        if (++index > pathArr.length)
            index = 0;
        let pos = pathArr[index];
        fdapi.customObject.setLocation(co.id, pos)
    }, 1000);
    //清除定时器
    window.setTimeout(function () {
        window.clearInterval(timerId)
    }, 10000);
}

function test_marker_hidePopupWindow() {
    fdapi.marker.hidePopupWindow('m1');
}

function test_marker_showAllPopupWindow() {
    fdapi.marker.showAllPopupWindow();
}

function test_marker_hideAllPopupWindow() {
    fdapi.marker.hideAllPopupWindow();
}


async function test_marker_setAnchors() {
    //设置标注整体偏移
    await fdapi.marker.setAnchors('m1', [-50, 25]);
    fdapi.marker.focus('m1', 100, 1);
}

async function test_marker_setCoordinate() {
    await fdapi.marker.setCoordinate('m1', [494474.5625, 2491468.5, -0.67259764671325684]);
    fdapi.marker.focus('m1', 200, 0.2);
}

function test_marker_setImagePath() {
    let path = HostConfig.Path + '/locale/zh/images/ctag.png';
    fdapi.marker.setImagePath('m1', path);
}

function test_marker_setImageSize() {
    fdapi.marker.setImageSize('m1', [64, 64]);
}

function test_marker_setURL() {
    fdapi.marker.setURL('m1', 'http://www.baidu.com');
}

function test_marker_setText() {
    fdapi.marker.setText('m1', '体育馆');
}

function test_marker_setRange() {
    fdapi.marker.setRange('m1', [1, 800]);
}

function test_marker_setFontColor() {
    fdapi.marker.setFontColor('m1', Color.Blue);
}

function test_marker_setTextBackgroundColor() {
    fdapi.marker.setTextBackgroundColor('m1', Color.Yellow);
}

function test_marker_setTextOutlineColor() {
    fdapi.marker.setFontOutlineColor('m1', Color.Red);
}

function test_marker_setShowLine() {
    fdapi.marker.setShowLine('m1', false);
}


function test_marker_setFontOutlineSize() {
    fdapi.marker.setFontOutlineSize('m1', 2);
}

function test_marker_setGroupId() {
    fdapi.marker.setGroupId('m1', 'groupMarker2');
}

function test_marker_setUserData() {
    fdapi.marker.setUserData('m1', '{name:\"karl\",sex:\"male\",\"age\":32}');
}

function test_marker_setHoverImagePath() {
    let hoverImagePath = HostConfig.Path + '/locale/zh/images/viewshed.png';
    fdapi.marker.setHoverImagePath('m1', hoverImagePath);
}

function test_marker_setTextOffset() {
    fdapi.marker.setTextOffset('m1', [10, 10]);
}

function test_marker_setFontSize() {
    fdapi.marker.setFontSize('m1', 30);
}

function test_marker_setTextRange() {
    fdapi.marker.setTextRange('m1', [0, 100]);
}

function test_marker_setAutoHidePopupWindow() {
    fdapi.marker.setAutoHidePopupWindow('m1', false);
}

function test_marker_setPopupSize() {
    fdapi.marker.setPopupSize('m1', [400, 600]);
}

function test_marker_setPopupOffset() {
    fdapi.marker.setPopupOffset('m1', [20, 20]);
}

function test_marker_setLineSize() {
    fdapi.marker.setLineSize('m1', [0.5, 50]);
}

function test_marker_setLineColor() {
    fdapi.marker.setLineColor('m1', Color.Red);
}

function test_marker_setLineOffset() {
    fdapi.marker.setLineOffset('m1', [10, 10]);
}

function test_marker_setPriority() {
    fdapi.marker.setPriority('m1', 1);
}

function test_marker_setOcclusionCull() {
    fdapi.marker.setOcclusionCull('m1', true);
}


function test_marker_setClusterStyle() {

    let style = {
        imagePath: HostConfig.Path + '/locale/zh/images/cluster.png',
        imageSize: [30, 30],
        fontSize: 14,
        fontColor: [1, 1, 1, 1], //可以设置完全透明 隐藏数字
        enableAnimation: false //是否开启marker聚合时的透明渐变动画，默认值：true
    }
    fdapi.marker.setClusterStyle(style);
}

async function test_marker_get() {
    let res = await fdapi.marker.get('m1');
    let o = res.data[0];
    log(`获取标注：\n id: ${o.id} \n text: ${o.text}`);
}

var __canvas;

function test_marker_add_canvas() {

    // 生成图片
    if (!__canvas)
        __canvas = document.createElement("canvas");

    let img = new Image()
    img.src = __base64_tagBg;
    img.onload = () => {

        __canvas.width = img.width;
        __canvas.height = img.height;

        var ctx = __canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#fff";
        ctx.font = "36px Bold Verdana";
        ctx.textBaseline = "middle";
        ctx.fillText("农村商业银行", 60, 50);


        let o = {};
        o.id = 'canvas_marker1';
        o.coordinate = [492705.53125, 2491816.25, 20.719257354736328];
        o.imagePath = __canvas.toDataURL("image/jpg");
        o.imageSize = [165, 63];
        o.popupURL = '';
        o.url = HostConfig.Path + '/locale/zh/popup_simple.html';
        o.range = [1, 8000.0];

        fdapi.marker.delete('canvas_marker1')
            .then(() => fdapi.marker.add(o))
            .then(() => fdapi.marker.focus('canvas_marker1', 10, 0.2));
    }
}


function test_marker_showByGroupId() {
    fdapi.marker.showByGroupId('markerAdd');
}

function test_marker_hideByGroupId() {
    fdapi.marker.hideByGroupId('markerAdd');
}

function test_marker_deleteByGroupId() {
    fdapi.marker.deleteByGroupId('markerAdd');
}

function test_marker_setViewportVisible() {
    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    //进入多视口
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
    //仅视口1和视口3可见
    fdapi.marker.setViewportVisible('m1', Viewport.V1 | Viewport.V3);
}

//====================== marker3d ======================

async function test_marker3d_add() {

    let buildingCoordinates = [
        [493246.03750000003, 2492213.2800000003, 78],
        [493341.226875, 2492221.7600000002, 78],
        [493422.123125, 2492210.4, 86],
        [493419.294375, 2492088.16, 86],
        [493234.26937500003, 2492111.52, 86],
        [493404.545, 2491985.7600000002, 86],
        [493284.0425, 2491995.84, 86]
    ];
    fdapi.marker3d.clear();
    let marker3dArr = [];
    for (let i = 0; i < buildingCoordinates.length; i++) {

        let marker3d = {
            'id': 'm' + (i + 1),
            'groupId': 'marker3dTest',
            'text': 'Building ' + (i + 1),//可选 3D标注显示文字
            'textSize': 32,//3D标注显示文字大小
            'textColor': '#6BF4F7',//3D标注显示文字颜色
            'textOutlineSize': 1,//3D标注显示文字轮廓大小
            'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色
            'textFixed': true,// 3D标注显示文字是否固定文本朝向
            'fixedSize': false,// 3D标注是否使用固定尺寸大小，默认：false 近大远小
            'textVisible': true,//3D标注显示文字是否显示文本
            'textLocation': [0, 0, 0],// 文字位置
            'textRotation': [0, 0, 0],// 文字旋转
            'textScale': [1, 1, 1],// 文字缩放
            'pointName': '3D_UI_C_3',//3D标注展示的特效名称
            'pointVisible': true,//3D标注是否显示
            'pointScale': 2,//3D标注整体缩放比例
            'coordinate': buildingCoordinates[i], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
            'coordinateType': 0, //坐标系类型 
            'range': [1, 1000], //3D标注的可视距离范围：[min,max]，单位：米
            'viewHeightRange': [0, 1000],//可见高度范围
            'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
            'collision': true //默认开启碰撞
        }
        marker3dArr.push(marker3d);

    }
    await fdapi.marker3d.add(marker3dArr);
    fdapi.marker3d.focus('m1');

    //1、批量调用多个蓝图函数，修改文字和背景
    fdapi.marker3d.callBPFunction([
        {
            id: 'm1',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "1号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }
            ]
        },
        {
            id: 'm1',
            functionName: '图标',
            parameters: [
                { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
                { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
            ]
        },
        {
            id: 'm2',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "2号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm3',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "3号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm4',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "4号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm5',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "5号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm6',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "6号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm6',
            functionName: '图标',
            parameters: [
                { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
                { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
            ]
        },
        {
            id: 'm7',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "7号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        }
    ]);
}

async function test_marker3d_update() {
    let o = {
        'id': 'm1',
        'text': 'Building No.1',
        'pointScale': 3,//整体缩放
        'textSize': 20,
        'pointName': 'Point_B_5',
        'textColor': [1, 0, 0, 1]
    }
    await fdapi.marker3d.update(o);
    fdapi.marker3d.focus(o.id);
}

function test_marker3d_focus() {
    fdapi.marker3d.focus('m1', 100, 0.2);
}

function test_marker3d_show() {
    fdapi.marker3d.show('m1');
}

function test_marker3d_showAll() {
    fdapi.marker3d.showAll();
}

function test_marker3d_hideAll() {
    fdapi.marker3d.hideAll();
}

function test_marker3d_hide() {
    fdapi.marker3d.hide(['m1']);
}

function test_marker3d_clear() {
    fdapi.marker3d.clear();
}

function test_marker3d_delete() {
    fdapi.marker3d.delete(['m1', 'm2']);
}

function test_marker3d_get() {
    fdapi.marker3d.get('m1');
    fdapi.marker3d.get(['m1', 'm2']);
}

function test_marker3d_setViewHeightRange() {
    fdapi.marker3d.setViewHeightRange('m1', 1, 1000);
}


function test_marker3d_setAttachCustomObject() {

    let pathArr = [[493136.3984375, 2492031.250371094, 2.11556640625], [493132.4771875, 2492031.4994921875, 2.11556640625], [493128.74062500003, 2492031.5835742187, 2.11556640625], [493124.98, 2492031.840625, 2.1155712890625002], [493120.6296875, 2492032.08796875, 2.1155615234375], [493117.944375, 2492032.153203125, 2.1155615234375], [493114.4884375, 2492032.482265625, 2.1155712890625002], [493110.6075, 2492032.656621094, 2.11556640625], [493107.4746875, 2492032.7945117187, 2.11556640625], [493103.60375, 2492032.8875390626, 2.11556640625], [493099.8784375, 2492033.1425195313, 2.1155712890625002], [493096.0109375, 2492033.379375, 2.11556640625], [493090.8096875, 2492033.5093359374, 2.11556640625], [493086.20875, 2492033.771933594, 2.1155615234375], [493082.2109375, 2492034.0263476563, 2.11556640625], [493078.205625, 2492034.1098046876, 2.11556640625]];
    fdapi.marker3d.clear();
    let o = {
        'id': 'm3d1',
        'groupId': 'marker3dTest',
        'text': '',//3D标注显示文字
        'textSize': 64,//3D标注显示文字大小
        'textColor': '#6BF4F7',//3D标注显示文字颜色
        'textOutlineSize': 1,//3D标注显示文字轮廓大小
        'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色
        'textFixed': false,// 3D标注显示文字是否固定文本朝向
        'fixedSize': true,// 默认尺寸 非近大远小
        'textVisible': true,//3D标注显示文字是否显示文本
        'textLocation': [0, 0, 0],// 文字位置
        'textRotation': [90, 0, 0],// 文字旋转
        'textScale': [1, 1, 1],// 文字缩放
        'pointName': 'Point_B_7',//3D标注展示的特效名称
        'pointVisible': true,//3D标注是否显示
        'pointScale': 2,//3D标注整体缩放比例
        'coordinate': pathArr[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
        'coordinateType': 0, //坐标系类型 
        'range': [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米
        'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
        'collision': true //默认开启碰撞
    }
    fdapi.marker3d.add(o);

    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    //添加车辆
    let co = {
        id: 'co1', //自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak', //pak文件路径
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe', //资源目录，自定义对象在pak文件资源包里的相对路径
        location: pathArr[0], //位置坐标
        coordinateType: 0, // 坐标系类型 
        rotation: [0, 0, 0], //旋转
        scale: [1, 1, 1], //缩放
        smoothMotion: 1, //1: 平滑插值，0: 跳跃
    };
    fdapi.customObject.add(co);

    //设置贴合，支持数组类型，多个对象贴合
    fdapi.marker3d.attachObject([{
        marker3dId: 'm3d1', //三维标注id
        objectId: 'co1', //自定义对象id
        offset: [0, 0, 2.2] //偏移量
    }]);

    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < pathArr.length; i++) {
        //构造数组元素 每1秒移动一次
        let elementPoint = { 'time': (i) * 0.5, 'coordinate': pathArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    fdapi.customObject.focus('co1', -1);
    //设置自定义相机跟随
    //fdapi.customObject.focus('co1', 5, 0, [-30, 4, 0], ActionMode.Follow);
    //车辆按GPS轨迹移动
    fdapi.customObject.startMove('co1', 0, pathPointArr);

}


function test_marker3d_showByGroupId() {
    fdapi.marker3d.showByGroupId('marker3dTest');
}

function test_marker3d_hideByGroupId() {
    fdapi.marker3d.hideByGroupId('marker3dTest');
}

function test_marker3d_deleteByGroupId() {
    fdapi.marker3d.deleteByGroupId('marker3dTest');
}


function test_marker3d_getBPFunction() {
    fdapi.marker3d.getBPFunction(['m1', 'm2']);
}

async function test_marker3d_callBatchFunction() {

    //查询蓝图函数包含的参数信息 
    let res = await fdapi.marker3d.getBPFunction(['m1', 'm2']);
    let functionArr = res.data[0].params;

    fdapi.marker3d.focus('m1', 20);

    //蓝图函数 使用自定义图片修改图标
    fdapi.marker3d.callBPFunction([
        {
            id: 'm1',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "1号楼民居" },
                { "name": "文字大小", "paramType": 2, "paramValue": 100 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [1, 1, 0, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }
            ]
        },
        {
            id: 'm1',
            functionName: 'H_自定义图标',
            parameters: [
                { "name": "图标路径", "paramType": 17, "paramValue": HostConfig.Path + "/locale/zh/images/tag.png" },
            ]
        }
    ]);



}


//====================== tag ======================

async function test_tag_add() {
    //注意：5.1版本之后不再推荐使用tag和customTag对象创建标注（存在性能问题且后续版本不再维护），推荐统一使用marker或者marker3d对象创建标注
    fdapi.tag.clear();
    let o = {
        id: 'p1',//tag唯一标识
        coordinate: [492846.125, 2491822.75, 0],//坐标位置
        coordinateType: 0, //坐标系类型
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',//图片路径
        imageSize: [100, 100],//图片宽高[width,height]
        url: HostConfig.Path + '/locale/zh/popup_simple.html',//鼠标点击标签后弹出的网页的URL
        popupBackgroundColor: [1.0, 1.0, 1.0, 0.1],//弹窗背景色
        range: [1, 8000.0],//标签的可见范围 [Min,Max]
        showLine: true,//标签下方是否显示垂直牵引线
        text: 'Building No.1',//标签显示的文字
        textSize: 10,// 文字大小
        textRange: 3000,//文字的可见范围
        textColor: Color.Black,//文字颜色
        textBorderColor: Color.Red,//文字边框颜色
        textBackgroundColor: Color.White,//文本背景颜色
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png',//鼠标悬停时显示的图片路径
        autoHidePopupWindow: true, //失去焦点后会自动关闭弹出窗口
        autoHeight: true//自动判断下方是否有物体

    };
    await fdapi.tag.add(o);
    fdapi.tag.focus(o.id, 200, 1);

    o.id = 'p2';
    o.text = "Building No.1";
    o.coordinate = [492778.71875, 2491823, 0];
    o.popupPos = [0, 0];
    o.popupSize = [600, 400];
    await fdapi.tag.add(o);
}

async function test_tag_update() {
    await fdapi.tag.update({
        id: 'p1',
        coordinate: [492902.59375, 2491822, 0],
        imagePath: 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QC+RXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAoqgAwAEAAAAAQAAAmWkBgADAAAAAQAAAAAAAAAAAAD/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAQABAAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/fyqer61Bots0kzqqqM81LqN8mnWjyyHaqivkD9ob41+KvjZ8W7T4X/Dc2reJNSja4u7+6VpLHw/ZKQsl7chWVnALBI4FZXnkYIGjjE08LSuTKVjtfj9+3/4Z+ElzbWLXjXGqalMbawsLWN7i81GbBPk28EYaWeUgEiONWY44Brgrf41ftAfEfbdaD8HfFlvptwN9vd6ve2GleYP9q3muBdx/SSBD7V7r+zT+xx4P/Zis5rnS4bjWvFepR+XqvijVik+r6mMg+W0oVRFAGG5beFUhRizKgZmZvwa/wCDrH/gtZ4q8Y/HXWv2Y/htrl5ofgvwrGtr41urKby5PEV7LGGeyLod32WFHCPH8u+Uyq6lY0JfMugcvc+zfiz/AMHAvhP9lzxO2l+NPE3hG6uraUxXaeG/E+n6/wDY2VirrIttMzqysCCgQuMfdr6n/Y0/4K9fDH9r3Q1vPCPizSdchUL5qwTYmtt33RLC4EkRODgSKpNfxm10nwv+K/iT4I+OLHxL4R1vUfD+vabIJLe8spjHInqpxwynoyMCrDIIIJFF11Dl7H94vh/xRa+JbNZbeRWDDIwetaI+Q1+Kn/BA7/gul/w1vp3/AAhfjSS30/4gaLErzpGdsGrQAhftMK/wsCQJI+gLBl+Vtqfs74e1qPXtMjnjYMGAOc9aTVgjLozzj9q34mx/Dj4b315JMluscLMzu21VAGSSfQdc1xX/AATX+EMnhH4Bw+ONYgZfGHxY8vxLqck0e24tLWRN1hYHPzILe2dQ8YJQXMt3IuPNOfP/APgrmjeIPgdqnh9mKxeJFXRXIONou3FtnPt5ufwr7KC4XHbpgU+gR3uOr+JP/gsD4W1Twd/wVZ/aPs9WtZ7W8k+JGvXqrMm1nhuNQmngkA/uyQyRuv8AsuK/tsr8bf8Ag5N/4N5tc/b21+P45fBG1s7j4pWtrHZeI/Dsjx23/CV28ShIbmGZiFF5EgWMrKwWWFIwrI0KpNJR+VP/AAblf8FA/gH/AME9P2n/ABZ4g+O3hhr+HWtEFnoevppg1NtAlDM0yeRgsBcIQnmoCy7AuNkjsPkX9uv4s+B/jt+2L8SvGPw18Lf8IT4D8R6/dX+h6L5aRfYbZ3JUeXGTHDu5fyoyUj37FJVQa4f4ofCrxP8ABPxvf+F/GXh3XPCfiTSmVL3StYsZbG9tCyhlEkUqq65VlYZHIII4Nc7QB2f7P/xt1z9m740eG/HXhyYwax4ZvkvIPmIWYDh4nxzskQsjDursK/sz/wCCbX7SNh+0b+z/AOGfEmmzNLYa9ptvqFsX4fy5Y1kXcOzAMAR2IIr+Js9Gr+oL/g1W8eXXiP8A4J9+C7e4kkkbT3vrPcx6ql7PsH0CFVH+7VdCZbpn19/wVg8Haprv7PniCbRbc3OsWtlLc6fHnG+5jUyQjPb94qcmvqHwF430v4oeBdF8S6HdJfaL4isINT0+5T7txbzRrJG49mRlP41ifHDwLH448G3Vuy7i0ZHSvnv/AIJ4/FhvhRrmofAbxJJ9lvNCafUPBcsp+XUdJZy72anOBJZO5RYwFAtGtdu8xzlDoC0Z9cUUV+SXjH9iv9vS9/4OD9P+Jel+OtWj/Zzj1W3uHb/hJ0XRY9HFsqz6a2keduad8Ook8gr5zpPvVlyslH0P/wAF2/8AgkV4Z/4Kkfsi64ttpNtF8XPCOnzX3g3WI4F+1STRq0n9nSPkFre4OUwxxG7rIASpVv46a/vu8Qa7Z+FdDvtU1K6hsdP02B7q6uZ3CRW8SKWd2Y8BVUEknoBX8FfxA1638U+O9a1Szt/sdnqV/PdQQYA8iN5GZU444BA49KAMWv6sP+DZX4IXnwt/4J9/DuO9h8ufULF9Wbjqt3PJcx59/KljH4V/Or/wTO/YV1n9vv8Aal0TwnaWt0fDtpNHeeIr2MFVtbMNygbtJLjy0AycsWwVRiP7Hf2UfhLb/Cr4c2FjBbxW0cEKokUaBUjUDAVQOAAOAOwquhMtXY9XliWWNlbkN6184/td/shQfFqxh1CxmvNJ1zSbhb/TNTsJPJvNOuUzsnhkwdrjJHIKsrMjqyOyt9IU2WJZk2soZT2NSEo3PkX4Yf8ABQvVvhCY/Dvx10e8sLi1/dReM9H0+S40vUBnCtd28QeWxlxku4V7XCFzLDvECeiah/wU/wD2atM0WTULj9oT4IpYxkhpv+E50woSOwIm5b2HOa9G8bfBXRvGsLLdWsUmfVa+e/i7/wAEi/hX8Zb83PiDwT4T1+boH1PSre7YD0zIjVWga9T8n/8Ag4N/4OcPCXx1+CuvfAr9nPULzVtM8URNp/irxoYZbSCeyYYlsbJHCyOJcmOWZ1VDHvVBIJfMT8zv2HP+CNPxp/bb8RWLWfh2+8JeFpmUy67rFq8KNGcc28J2yXBIJwVxHkYMi1/UH8Lf+CN/wk+EuqR3mg+A/Beh3MZysunaNa2si/Ro41NfQ/gX9n/Q/BMS/Z7SFWXuF5o0DXofJn/BKr/gkz4O/YP+Fdno+g6eVkYie9vbjD3Woz4wZZWwMnsFACqOABzn7qtLRbO3WNOFUYp1vbJaoFjUKvtUlS9QjGx//9k=',
        url: HostConfig.Path + '/locale/zh/popup_simple.html',
        imageSize: [28, 28],
        popupBackgroundColor: [1.0, 1.0, 1.0, 1.0],
        text: 'Building No.3',
        textColor: Color.Blue,
        textBackgroundColor: Color.Yellow,
        range: [1, 8000.0],
        showLine: false
    });
    fdapi.tag.focus('p1', 200, 0);
}

function test_tag_focus() {
    fdapi.tag.focus('p1', 200, 0.2);
}

function test_tag_focusAll() {
    fdapi.tag.focusAll(200, 0.2);
}

function test_tag_show() {
    fdapi.tag.show('p1');
}

function test_tag_showAll() {
    fdapi.tag.showAll();
}

function test_tag_hideAll() {
    fdapi.tag.hideAll();
}

function test_tag_hide() {
    fdapi.tag.hide(['p1']);
}

function test_tag_clear() {
    fdapi.tag.clear();
}

function test_tag_delete() {
    fdapi.tag.delete(['p1', 'p2']);
}

function test_tag_showPopupWindow() {
    fdapi.tag.showPopupWindow('p1');
}

function test_tag_hidePopupWindow() {
    fdapi.tag.hidePopupWindow('p1');
}

function test_tag_showAllPopupWindow() {
    fdapi.tag.showAllPopupWindow();
}

function test_tag_hideAllPopupWindow() {
    fdapi.tag.hideAllPopupWindow();
}

async function test_tag_setCoordinate() {
    await fdapi.tag.setCoordinate('p1', [492477.1875, 2491878.25, 73.581634521484375]);
    fdapi.tag.focus('p1', 200, 0.2);
}

function test_tag_setImagePath() {
    let path = HostConfig.Path + '/locale/zh/images/ctag.png';
    fdapi.tag.setImagePath('p1', path);
}

function test_tag_setImageSize() {
    fdapi.tag.setImageSize('p1', [64, 64]);
}

function test_tag_setURL() {
    fdapi.tag.setURL('p1', 'http://www.163.com');
}

function test_tag_setText() {
    fdapi.tag.setText('p1', 'Welcome!');
}

function test_tag_setRange() {
    fdapi.tag.setRange('p1', [1, 800]);
}

function test_tag_setTextColor() {
    fdapi.tag.setTextColor('p1', Color.Blue);
}

function test_tag_setTextBackgroundColor() {
    fdapi.tag.setTextBackgroundColor('p1', Color.Yellow);
}

function test_tag_setTextBorderColor() {
    fdapi.tag.setTextBorderColor('p1', Color.White);
}

function test_tag_setShowLine() {
    fdapi.tag.setShowLine('p1', false);
}

async function test_tag_get() {
    let res = await fdapi.tag.get('p1');
    let o = res.data[0];
    log(`Get tags: \n id: ${o.id} \n text: ${o.text}`);
}

var __canvas;

function test_tag_add_canvas() {

    // 生成图片
    if (!__canvas)
        __canvas = document.createElement("canvas");

    let img = new Image()
    img.src = __base64_tagBg;
    img.onload = () => {

        __canvas.width = img.width;
        __canvas.height = img.height;

        var ctx = __canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#fff";
        ctx.font = "36px Bold Verdana";
        ctx.textBaseline = "middle";
        ctx.fillText("农村商业银行", 60, 50);


        let o = {
            id: 'canvas_tag1',
            coordinate: [492700.0625, 2491813, 20.719263076782227],
            imagePath: __canvas.toDataURL("image/jpg"),
            imageSize: [165, 63],
            text: '',
            url: HostConfig.Path + '/locale/zh/popup_simple.html',
            range: [1, 8000.0]
        };
        fdapi.tag.delete('canvas_tag1')
            .then(() => fdapi.tag.add(o))
            .then(() => fdapi.tag.focus('canvas_tag1', 200, 0.2));
    }
}


//====================== misc ======================

function test_misc_setDateTime() {
    //参数：year, month, day, hour, minute, second, daynightLoop
    fdapi.misc.setDateTime(2019, 1, 1, 10, 0, 0, false);
}

function test_misc_addImageButton() {
    fdapi.misc.addImageButtons({
        id: '1',
        x: 100,
        y: 100,
        width: 64,
        height: 64,
        normalImage: HostConfig.Path + '/locale/zh/images/custom.png',
        hoverImage: HostConfig.Path + '/locale/zh/images/hilightarea.png',
        tooltip: 'Test'
    });
}

function test_misc_deleteImageButton() {
    fdapi.misc.deleteImageButtons('1');
}


async function test_misc_getConvexPolygon() {
    let pointArr = [
        [492350.96875, 2492321.5],
        [492387.46875, 2492318.75],
        [492433.09375, 2492304.25],
        [492459.0625, 2492281.75],
        [492507.625, 2492271.5],
        [492485.78125, 2492239],
        [492473.6875, 2492223.75],
        [492446.375, 2492224],
        [492420.15625, 2492228.75],
        [492394.3125, 2492236.25],
        [492365.90625, 2492249.25],
        [492342.71875, 2492274],
        [492339.71875, 2492302.25],
        [492407.21875, 2492287.75],
        [492441.71875, 2492271.5],
        [492447.96875, 2492241.75]
    ];


    let res = await fdapi.misc.getConvexPolygon(pointArr);
    let indices = res.data;

    //添加marker
    fdapi.marker.clear();
    let markerArr = [];
    for (let i = 0; i < pointArr.length; i++) {
        let fontColor = Color.Red;
        if (indices.includes(i)) {
            fontColor = Color.Blue;
        }
        let markerTemp = {
            id: "m_" + i,
            text: "" + i,
            fontColor: fontColor,
            coordinate: pointArr[i],
            displayMode: 2
        };
        markerArr.push(markerTemp);
    }
    fdapi.marker.add(markerArr);

    let polygon = [];
    for (let i = 0; i < indices.length; i++) {
        let point = pointArr[indices[i]];
        polygon.push(point);
    }


    fdapi.polygon.clear();
    let polygon1 = {
        id: 'polygon1',
        coordinates: polygon,
        coordinateType: 0,
        range: [1, 10000],
        color: [0, 0, 1, 0.8],
        frameColor: Color.White,
        frameThickness: 0.5,
        intensity: 1,
        style: PolygonStyle.SingleColor,
        depthTest: false
    };
    fdapi.polygon.add(polygon1);
    fdapi.polygon.focus('polygon1');

}

function test_misc_addAnimatedImageButton() {
    let x = 100;//图片按钮的位置:x坐标
    let y = 100;//图片按钮的位置:y坐标
    let width = 208;//图片按钮的宽度，单位像素
    let height = 150;//图片按钮的高度，单位像素
    let imageSequecePath = 'D:/tmp3/loopplay2s';//序列贴图的目录
    let imageSequeceLength = 2;//序列贴图的图片数量，也就是帧数
    let loop = true;//是否循环播放序列贴图
    let interactable = true;//是否可以用鼠标点击操作
    let o = new AnimatedImageButtonData(1, x, y, width, height, imageSequecePath, imageSequeceLength, loop, interactable);
    fdapi.misc.addAnimatedImageButtons(o);
}

function test_misc_playVideo() {
    fdapi.misc.playVideo(1, 20, 20, 400, 300, HostConfig.Path + '/assets/video/video2.mov');
}

function test_misc_stopPlayVideo() {
    fdapi.misc.stopPlayVideo(1);
}

function test_misc_playMovie() {
    fdapi.misc.playMovie(HostConfig.Path + '/assets/video/video1.webm', true);
}

function test_misc_stopMovie() {
    fdapi.misc.stopMovie();
}

var __playVideoAloneId = 0;
async function test_misc_playVideoAlone() {
    let result = await fdapi.misc.playVideoAlone('rtsp://192.168.1.4:555/live', {
        x: 100,
        y: 100,
        cx: 400,
        cy: 260,
        opacity: 1,
        style: 2,
        title: '北三环东路5号入口',
        hideBuffering: false,
        maximizeBox: false
    });
    __playVideoAloneId = result.processId;
}

function test_misc_stopPlayVideoAlone() {
    fdapi.misc.stopPlayVideoAlone(__playVideoAloneId);
}

function test_misc_callBPFunction() {
    // 先移动相机镜头到动画场景范围内
    fdapi.camera.set(492411.977813, 2491993.023516, 102.233096, -33.122059, 118.372009, 1);

    /**
    * 蓝图函数说明：UE4引擎自带的一种图形化程序开发界面，旨在降低开发人员门槛。蓝图的本质类似于宏程序脚本，包含有输入输出参数和自定的参数数据类型。
    * 以下示例代码为调用蓝图函数演示模型动画效果
    * 注意：调用前请先确认被调用的蓝图函数已存在，并和设计UE蓝图函数的开发人员沟通确认相关参数取值后再调用
    */
    fdapi.misc.callBPFunction({
        // 创建蓝图函数时在模型包含的Actor上添加的tag，调用前需和设计蓝图函数的开发人员确认
        actorTag: 'function',
        // 执行动画效果的Actor对象的ID，可以根据__g.tileLayer.getObjectIDs(tileLayerIds)方法获取
        objectName: 'BP_Explode_function_2',
        // 待调用的蓝图函数名称，调用前需和设计蓝图函数的开发人员确认此函数已存在
        functionName: 'BPF_Explode_Animation',
        // 传入参数类型  参考BPFuncParamType枚举
        paramType: BPFuncParamType.Vector,
        // 根据传入参数类型设置对应参数值
        paramValue: [1, 0, 0]
    });
}

function test_misc_setWindowResolution() {
    fdapi.misc.setWindowResolution(800, 600);
}

function test_misc_enterReportMode() {
    fdapi.misc.enterReportMode();
}

function test_misc_exitReportMode() {
    fdapi.misc.exitReportMode();
}

function test_misc_setReportModeAlign() {
    //位置取值：0【底部】，1【居左】，2【居右】，默认0
    fdapi.misc.setReportModeAlign(0);
}

function test_misc_setReportModePlayMode() {
    //播放模式取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0
    fdapi.misc.setReportModePlayMode(0);
}

function test_misc_setReportModeViewPortLinkage() {
    //相机是否联动  取值：联动true，不联动false，默认不联动false 
    fdapi.misc.setReportModeViewPortLinkage(false);
}

function test_misc_enterMultiViewportMode() {
    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#DEA309";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
}

function test_misc_exitMultiViewportMode() {
    //退出多视口
    fdapi.misc.exitMultiViewportMode();
}

function test_misc_setMultiviewportInteractSync() {
    //多视口模式下设置相机是否同步
    fdapi.misc.setMultiviewportInteractSync(true);
}

function test_misc_setActiveViewport() {
    //设置激活一个视口
    fdapi.misc.setActiveViewport(1);
}

function test_misc_getActiveViewport() {
    //获取当前激活的视口
    fdapi.misc.getActiveViewport();
}


async function test_misc_getMaterial() {

    //查询材质包含的参数信息
    let res = await fdapi.misc.getMaterial("/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_1");

    //颜色参数名称
    let colorParamName = res.data[0].params[0].name;
    //颜色参数默认值
    let colorParamValue = res.data[0].params[0].defaultValue;
    log(colorParamName + ":" + colorParamValue);

    //亮度参数名称
    let opacityParamName = res.data[0].params[2].name;
    //亮度默认值
    let opacityParamValue = res.data[0].params[2].defaultValue;
    log(opacityParamName + ":" + opacityParamValue);

}

async function test_misc_getBPFunction() {
    //查询蓝图函数包含的参数信息
    let res = await fdapi.misc.getBPFunction("/JC_CustomAssets/EffectLibrary/Exhibition/3DUI/3D_UI_C_3");

    //函数名称
    let functionName = res.data[0].params[3].functionName;
    //函数参数信息
    let functionParams = res.data[0].params[3].functionParams;
    log("函数名称：" + functionName);
    log("包含参数名称：" + functionParams[0].name);
    log("包含参数类型：" + functionParams[0].type);
    log("包含参数默认值：" + functionParams[0].defaultValue);

}

function test_misc_reloadPak() {
    //从Cloud的文件资源配置中重新挂载新添加的pak文件，从而避免重启服务引起的实例关闭
    fdapi.misc.reloadPak();
}

// function test_misc_download() {
//     //把文件下载到cloud服务器的指定磁盘路径
//     fdapi.misc.download('https://www.freedoonline.com/public/static/home2022/images/ewm1.png', 'C:/gzh/', 'wx.png');
// }

function test_misc_projectCountAll() {
    //统计ACP工程包含的全部资产
    fdapi.misc.projectAssetCountAll();
}

function test_misc_projectCount() {
    //统计3dt信息
    fdapi.misc.projectAssetCount(AssetType.EPT_Scene);
}



function test_misc_showAllFoliages() {
    //调整相机至植物区域
    fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);
    //显示Explorer里创建的所有植物
    fdapi.misc.showAllFoliages();
}

function test_misc_hideAllFoliages() {
    //调整相机至植物区域
    fdapi.camera.set(492533.392539, 2491957.60625, 58.362656, -49.696117, -66.419853, 2);
    //隐藏Explorer里创建的所有植物
    fdapi.misc.hideAllFoliages();
}


//====================== odline ======================

async function test_odline_add() {


    //开启黑暗模式 调整时间
    fdapi.weather.setDarkMode(true);
    fdapi.weather.setDateTime(2025, 5, 13, 7, 18, false);

    //降低场景亮度
    let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    //以下四个属性仅在默认样式0下生效
    let saturation = 0.1;//饱和度
    let brightness = 0.1;//亮度
    let contrast = 1;//对比度
    let contrastBase = 0.18;//对比度基准
    fdapi.tileLayer.setStyle("E637D8FE42335EE96C58A1840BCAD0CE", style, Color.White, saturation, brightness, contrast, contrastBase);

    fdapi.odline.clear();
    let od1 = {
        id: 'od1',//ODLine唯一标识
        color: [0, 1, 0, 1],//填充颜色  
        coordinates: [[492303.65625, 2487534.5, 4.195], [490960.8075, 2490754.4, 5.26578125]],//构成ODLine的坐标点数组
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        flowRate: 0.5,//流速
        intensity: 10,//亮度
        bendDegree: 0.5,//弯曲度
        tiling: 100000,//材质贴图平铺比例
        lineThickness: 60,//折线宽度
        flowPointSizeScale: 80,//运动点的缩放值
        labelSizeScale: 1000,//两端点的缩放值

        lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
        lineStyle: 2,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）
        flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0

        startPointShape: 2,//点的样式
        endPointShape: 1,//点的样式
        startLabelShape: 1,//点的样式
        endLabelShape: 1//点的样式
    };

    let od2 = {
        id: 'od2',//ODLine唯一标识
        color: [1, 1, 0, 1],//填充颜色 
        coordinates: [
            [494192.193125, 2491025.2800000003, 0.304375],
            [491403.55, 2491384.96, 9.85701171875]
        ],//构成ODLine的坐标点数组
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        flowRate: 1,//流速
        intensity: 6,//亮度
        bendDegree: 0.5,//弯曲度
        tiling: 10,//材质贴图平铺比例
        lineThickness: 60,//折线宽度
        flowPointSizeScale: 80,//运动点的缩放值
        labelSizeScale: 1000,//两端点的缩放值

        lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
        lineStyle: 3,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）
        flowShape: 0,  //ODLine发光点样式 0:无 1:球体，默认值0

        startPointShape: 2,//点的样式
        endPointShape: 1,//点的样式
        startLabelShape: 1,//点的样式
        endLabelShape: 1//点的样式
    };
    await fdapi.odline.add([od1, od2]);
    fdapi.odline.focus(od1.id);
}

async function test_odline_update() {
    let o = {
        id: 'od1',
        color: [1, 1, 1, 1],
    };
    await fdapi.odline.update(o);
    fdapi.odline.focus(o.id);
}

function test_odline_delete() {
    fdapi.odline.delete('od1');
}

function test_odline_clear() {
    fdapi.odline.clear();
}

function test_odline_focus() {
    fdapi.odline.focus('od1', 600, 1);
}

function test_odline_show() {
    fdapi.odline.show('od1');
}

function test_odline_showAll() {
    fdapi.odline.showAll();
}

function test_odline_hide() {
    fdapi.odline.hide('od1');
}

function test_odline_hideAll() {
    fdapi.odline.hideAll();
}

function test_odline_get() {
    fdapi.odline.get('od1');
}


//====================== panorama ======================

async function test_panorama_add() {
    fdapi.panorama.clear();
    await fdapi.panorama.add({
        id: 'p1',
        imagePath: HostConfig.Path + '/assets/image/panorama1.jpg',
        coordinate: [492706.53125, 2491819.75, 23],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        yaw: 75, //方向
        onTerrain: true, //是否贴地，注意：设置为贴地后offset偏移量的Z轴会失效
        offset: [0, 0, 0] //偏移量
    });
    fdapi.panorama.focus('p1');
}

async function test_panorama_update() {
    await fdapi.panorama.update({
        id: 'p1',
        imagePath: HostConfig.Path + '/assets/image/panorama2.jpg',
        yaw: 75,
        onTerrain: false, //是否贴地
        offset: [0, 0, 0] //偏移量
    });
    fdapi.panorama.focus('p1');
}

function test_panorama_delete() {
    fdapi.panorama.delete('p1');
}

function test_panorama_clear() {
    fdapi.panorama.clear();
}

function test_panorama_focus() {
    fdapi.panorama.focus('p1');

}

function test_panorama_get() {
    fdapi.panorama.get('p1');
}

function test_panorama_enter() {
    fdapi.panorama.enter('p1');
}

function test_panorama_switchMode() {
    fdapi.panorama.switchMode();
}

function test_panorama_exit() {
    fdapi.panorama.exit();
}


//====================== polygon ======================

async function test_polygon_add() {
    fdapi.polygon.clear();
    //使用PolygonStyle样式的面
    let p1 = {
        id: 'polygon1',
        coordinates: [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [0, 10000], //可见高度范围
        color: [0, 0, 1, 0.8],//多边形的填充颜色
        frameColor: Color.Red,//边框颜色
        frameThickness: 5,//边框厚度
        intensity: 1, //亮度
        style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
        depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
        priority: 1 //叠加显示的优先级 值越大显示越靠上
    };


    //自定义材质的面
    let p2 = {
        id: 'polygon2',
        coordinates: [
            [487716.1875, 2490398.75, -0.14265625178813934],
            [487608.46875, 2490988, -0.65734374523162842],
            [486995.9375, 2490574.5, -1.7621874809265137]
        ],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [0, 10000], //可见高度范围
        color: [0, 0, 1, 1],//多边形的填充颜色
        frameColor: Color.Red,//边框颜色
        frameThickness: 5,//边框厚度
        intensity: 0.5, //亮度
        style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
        depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
        priority: 2, //叠加显示的优先级 值越大显示越靠上
        material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效
        scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数
        vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数
    };

    let pArr = [];
    pArr.push(p1);
    pArr.push(p2);
    await fdapi.polygon.add(pArr);
    fdapi.polygon.focus('polygon2', 10);
}

async function test_polygon_update() {
    let o = {
        id: 'polygon1',
        coordinates: [
            [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],
            [[488248.65625, 2491142.25, 1], [488215.46875, 2491330.25, 1], [488057.71875, 2491184.25, 1]]
        ],
        color: Color.Green,
        intensity: 0.5,
        depthTest: true
    };
    await fdapi.polygon.update(o);
    fdapi.polygon.focus('polygon1', 200, 1);
}

function test_polygon_highlight() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.highlight(ids);
}

function test_polygon_stophighlight() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.unHighlight(ids);
}

function test_polygon_delete() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.delete(ids);
}

function test_polygon_clear() {
    fdapi.polygon.clear();
}

function test_polygon_focus() {
    fdapi.polygon.focus('polygon1', 100, 1);
}

function test_polygon_show() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.show(ids);
}

function test_polygon_hide() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.hide(ids);
}

function test_polygon_get() {
    fdapi.polygon.get(['polygon1', 'polygon2']);
}

function test_polygon_setViewHeightRange() {
    fdapi.polygon.setViewHeightRange('polygon1', 0, 1000);
}
//====================== polygon3d ======================

async function test_polygon3d_add() {
    fdapi.polygon3d.clear();
    ////使用Polygon3DStyle样式的polygon3d
    let o1 = {
        id: 'p3d1',
        coordinates: [
            [489152.96875, 2492427, 0],
            [489155.34375, 2492386.75, 0],
            [489119.875, 2492387.75, 0],
            [489115.375, 2492417.25, 0],
        ],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [1, 0, 1, 1],        //颜色值
        height: 10,                //3D多边形的高度
        intensity: 1.0,             //亮度
        viewHeightRange: [0, 1000], //可见高度范围
        style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
        tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
        material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_16", //自定义材质路径
        scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数
        vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数
        generateTop: true, //是否生成顶面
        generateSide: true,//是否生成侧面
        generateBottom: true,//是否生成底面
        bClip: false, //是否支持剖切
        depthTest: true //深度检测
    };

    //自定义材质的polygon3d
    let o2 = {
        id: 'p3d2',
        coordinates: [
            [489267.53125, 2492406, 0],
            [489264.9375, 2492356.5, 0],
            [489235.84375, 2492355.75, 0],
            [489227.96875, 2492397.75, 0],
        ],
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [1, 0, 0, 1],        //颜色值
        height: 20,                //3D多边形的高度
        intensity: 1.0,             //亮度
        viewHeightRange: [0, 1000], //可见高度范围
        style: Polygon3DStyle.SingleColorWithLight, //3DPolygon的样式 请参照API开发文档选取枚举
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
        tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
        material: "/JC_CustomAssets/MaterialLibrary/Exhibition/地面_自然/地面_自然_8", //自定义材质路径 使用自定义材质后style相关参数会失效
        scalarParameters: [{ "name": "亮度", "value": 1.0 }],  //材质数值类型参数
        vectorParameters: [{ "name": "颜色", "value": [1, 1, 1] }], //材质数组类型参数
        generateTop: true, //是否生成顶面
        generateSide: true,//是否生成侧面
        generateBottom: true,//是否生成底面
        bClip: false, //是否支持剖切
        depthTest: true //深度检测
    };
    let p3dArr = [];
    p3dArr.push(o1);
    p3dArr.push(o2);
    await fdapi.polygon3d.add(p3dArr);
    fdapi.polygon3d.focus('p3d1', 50);
}

async function test_polygon3d_update() {
    let o = {
        id: 'p3d1',
        coordinates: [
            [489152.96875, 2492427, 0],
            [489155.34375, 2492386.75, 0],
            [489119.875, 2492387.75, 0],
            [489113.8125, 2492454, 0],
        ],
        color: '#33561A',    //颜色值
        height: 20,            //3D多边形的高度
        intensity: 10.0,         //亮度
        style: 1
    };
    await fdapi.polygon3d.update(o);
    fdapi.polygon3d.focus(o.id);
}

function test_polygon3d_delete() {
    fdapi.polygon3d.delete(['p3d1', 'p3d2']);
}

function test_polygon3d_clear() {
    fdapi.polygon3d.clear();
}

function test_polygon3d_highlight() {
    //仅部分样式支持高亮闪烁，和材质有关
    fdapi.polygon3d.highlight('p3d1');
}

function test_polygon3d_stopHighlight() {
    fdapi.polygon3d.unHighlight('p3d1');
}

function test_polygon3d_glow() {
    fdapi.polygon3d.glow([{
        id: 'p3d1',
        color: [1, 1, 1, 1],
        duration: 5, //持续闪烁5秒
        interval: 1  //每隔1秒闪烁一次
    }]);
}

function test_polygon3d_stopGlow() {
    fdapi.polygon3d.stopGlow('p3d1');
}


function test_polygon3d_focus() {
    fdapi.polygon3d.focus('p3d1', 10);
}

function test_polygon3d_show() {
    fdapi.polygon3d.show(['p3d1', 'p3d2']);
}

function test_polygon3d_hide() {
    fdapi.polygon3d.hide(['p3d1', 'p3d2']);
}

function test_polygon3d_get() {
    fdapi.polygon3d.get(['p3d1', 'p3d2']);
}

function test_polygon3d_hideAll() {
    fdapi.polygon3d.hideAll();
}

function test_polygon3d_showAll() {
    fdapi.polygon3d.showAll();
}

function test_polygon3d_enableClip() {
    fdapi.polygon3d.enableClip(['p3d1', 'p3d2']);
}

function test_polygon3d_disableClip() {
    fdapi.polygon3d.disableClip(['p3d1', 'p3d2']);
}

function test_polygon3d_setViewHeightRange() {
    fdapi.polygon3d.setViewHeightRange('p3d1', 1, 1000);
}

//====================== ShapeFileTest ======================

async function test_shapeFile_add() {

    fdapi.shapeFileLayer.clear();
    // 支持三种数据类型Polygon、Polyline、Point，当前示例为Point类型
    // 不同数据类型对应对象属性不同，请参考API开发文档
    // shapeFileLayer对象别名支持shapeFile和shp两种写法，向下兼容5.2/5.1版本 ，示例如下：
    // fdapi.shapeFile.clear();
    // fdapi.shp.clear();
    let point = {
        id: "sp1",
        file: HostConfig.Path + '/assets/shapefile/point_marker.shp',
        pointTextContentFieldName: 'name',//点显示内容字段
        pointDisplayMode: 2,
        clusterByImage: true,
        pointImage: HostConfig.Path + '/locale/zh/images/radiation.png',
        pointContentRange: [0, 10000],
        pointRange: [0, 10000],
        pointFontColor: [0, 0, 0, 1],
        pointFontOutlineColor: [1, 1, 1, 1],
        pointBackgroundColor: [1, 1, 1, 1],
        pointShowLine: false,
        pointOcclusionCull: true,
        offset: [0, 0, 0],//坐标位置偏移量
        rotation: [0, 0, 0],//旋转
    };
    await fdapi.shapeFileLayer.add(point);


    //当前示例为Polyline类型
    let polyline = {
        id: "sp2",
        file: HostConfig.Path + '/assets/shapefile/polyline_road.shp', //shp文件路径
        polylineDefaultThickness: 5,//线宽
        defaultColor: [1, 0, 0, 1],
        offset: [0, 0, 0],//坐标位置偏移量
        rotation: [0, 0, 0],//旋转
    };
    await fdapi.shapeFileLayer.add(polyline);


    //当前示例为Polygon类型
    let polygon = {
        id: "sp3",
        file: HostConfig.Path + '/assets/shapefile/polygon_building.shp', //shp文件路径
        polygonColorFieldName: "COLOR",//颜色属性字段
        polygonHeightFieldName: 'B_HEIGHT',//高度属性字段
        polygonStyle: 0,//多边形样式 样式参考API枚举： PolygonStyle
        polygonDefaultHeight: 200.0,//多边形默认高度
        defaultColor: [1, 1, 1, 1],//多边形默认颜色
        offset: [0, 0, 0],//坐标位置偏移量
        rotation: [0, 0, 0],//旋转
    };
    await fdapi.shapeFileLayer.add(polygon);
    fdapi.shapeFileLayer.focus(polygon.id);


}

async function test_shapeFile_update() {
    let obj = {
        "id": "sp1",
        pointFontColor: [1, 0, 0, 1],
        pointFontOutlineColor: [0, 0, 0, 1],
        pointBackgroundColor: [0, 0, 0, 1],
        pointShowLine: false,
    };
    await fdapi.shapeFileLayer.update(obj);
    fdapi.shapeFileLayer.focus(obj.id);
}

function test_shapeFile_delete() {
    fdapi.shapeFileLayer.delete(['sp1', 'sp2', 'sp3']);
}

function test_shapeFile_clear() {
    fdapi.shapeFileLayer.clear();
}

function test_shapeFile_focus() {
    fdapi.shapeFileLayer.focus('sp1');
}

function test_shapeFile_show() {
    fdapi.shapeFileLayer.show(['sp1', 'sp2', 'sp3']);
}

function test_shapeFile_hide() {
    fdapi.shapeFileLayer.hide(['sp1', 'sp2', 'sp3']);
}

function test_shapeFile_showAll() {
    fdapi.shapeFileLayer.showAll();
}

function test_shapeFile_hideAll() {
    fdapi.shapeFileLayer.hideAll();
}

function test_shapeFile_open() {
    let shapeFilePathArr = { 'file': HostConfig.Path + '/assets/shapefile/polygon.shp' };
    fdapi.shapeFileLayer.open(shapeFilePathArr);
}

function test_shapeFile_get() {
    fdapi.shapeFileLayer.get(['sp1', 'sp2', 'sp3']);
}

function test_shapeFile_highlightFeature() {
    fdapi.shapeFileLayer.highlightFeature('sp3', 13);
}

function test_shapeFile_stopHighlightFeature() {
    fdapi.shapeFileLayer.unHighlightFeature('sp3', 13);
}

function test_shapeFile_highlightFeatures() {
    fdapi.shapeFileLayer.highlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);
}

function test_shapeFile_stopHighlightFeatures() {
    fdapi.shapeFileLayer.unHighlightFeatures([{ "shpId": "sp3", "featureIds": [13, 12, 21] }]);
}

function test_shapeFile_focusFeature() {
    //相机定位
    fdapi.shapeFileLayer.focusFeature("sp3", 13, 80, 1);
}

function test_shapeFile_getFeature() {
    //查询单个
    fdapi.shapeFileLayer.getFeature({ "shpId": "sp3", "featureIds": [12] });
    //查询多个
    fdapi.shapeFileLayer.getFeature([{ "shpId": "sp3", "featureIds": [21, 12, 13] }]);
}



//====================== geoJSONLayerTest ======================
function test_geoJSONLayer_load_point_json() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //简单渲染器
    let simpleRenderer = {
        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 0,
            //点的默认尺寸 针对simple-marker圆形填充
            size: 100,
            //默认填充颜色
            color: [1, 0, 0, 1]
        },
        //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
        visualVariables: [{
            //控制显示的类型：颜色尺寸高度不透明度
            type: VisualType.Size,
            //属性字段名称
            field: "value",
            //属性字段类型
            fieldType: FieldType.Number
        }],
    };

    let geojsonObj = {
        "type": "FeatureCollection",
        "name": "point",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
            { "type": "Feature", "properties": { "id": 0, "value": 100 }, "geometry": { "type": "Point", "coordinates": [113.913964837915572, 22.527855618646743] } },
            { "type": "Feature", "properties": { "id": 1, "value": 110 }, "geometry": { "type": "Point", "coordinates": [113.935580614470155, 22.529374559033467] } },
            { "type": "Feature", "properties": { "id": 2, "value": 120 }, "geometry": { "type": "Point", "coordinates": [113.91334163255496, 22.522039210087012] } },
            { "type": "Feature", "properties": { "id": 3, "value": 130 }, "geometry": { "type": "Point", "coordinates": [113.938253660934748, 22.522895425421694] } },
            { "type": "Feature", "properties": { "id": 4, "value": 140 }, "geometry": { "type": "Point", "coordinates": [113.943235589288946, 22.529515368348097] } },
            { "type": "Feature", "properties": { "id": 5, "value": 150 }, "geometry": { "type": "Point", "coordinates": [113.947122954386941, 22.518850089699615] } },
            { "type": "Feature", "properties": { "id": 6, "value": 160 }, "geometry": { "type": "Point", "coordinates": [113.940269986516199, 22.520865455198059] } },
            { "type": "Feature", "properties": { "id": 7, "value": 170 }, "geometry": { "type": "Point", "coordinates": [113.944205038437318, 22.524855691721285] } },
            { "type": "Feature", "properties": { "id": 8, "value": 180 }, "geometry": { "type": "Point", "coordinates": [113.929114005720194, 22.526566527370296] } },
            { "type": "Feature", "properties": { "id": 9, "value": 190 }, "geometry": { "type": "Point", "coordinates": [113.925636733672405, 22.514011157833803] } },
            { "type": "Feature", "properties": { "id": 10, "value": 200 }, "geometry": { "type": "Point", "coordinates": [113.941561038097902, 22.52800839633241] } },
        ]
    };

    //用简单渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer_json',
        visible: true,//加载后是否显示
        range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        sourceJson: geojsonObj,
        collision: true, //开启碰撞
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer_json", 100);
    }, 2000);

}

function test_geoJSONLayer_load_point() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //简单渲染器
    let simpleRenderer = {
        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 0,
            //点的默认尺寸 针对simple-marker圆形填充
            size: 80,
            //默认填充颜色
            color: [1, 1, 0, 1]
        },
        //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
        visualVariables: [{
            //控制显示的类型：颜色尺寸高度不透明度
            type: VisualType.Size,
            //属性字段名称 用id的值显示尺寸
            field: "id",
            //属性字段类型
            fieldType: FieldType.Number,
        }],

    };

    //用简单渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer1',
        visible: true,//加载后是否显示
        range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 10],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/point_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer1", 100);
    }, 2000);
}

function test_geoJSONLayer_load_polyline() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //简单渲染器
    let simpleRenderer = {
        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 1,
            //填充颜色
            color: [1, 1, 0, 1],
            //默认轮廓线
            outline: {
                //线宽
                width: 2
            }
        }
    };

    //用简单渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer2',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        collision: true, //开启碰撞
        onTerrain: true,//是否贴地
        enableAntialias: false,//是否开启反走样
        depthTest: false,//是否开启深度检测 注意：深度检测参数仅在反走样参数关闭时(enableAntialias=false)生效
        url: HostConfig.Path + "/assets/geojson/polyline_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer2", 100);
    }, 2000);
}

function test_geoJSONLayer_load_polygon() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //简单渲染器
    let simpleRenderer = {

        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
        //是否生成顶面
        generateTop: false,
        //是否生成底面
        generateBottom: false,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 3,
            //默认高度
            height: 10,
            //默认填充颜色
            color: [0, 0, 1, 1],
            //默认轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [1, 1, 1, 1],
            }
        },
        //根据字段高度拉高polygon，支持控制颜色、尺寸和透明度的插值显示 
        visualVariables: [{
            //控制显示的类型：颜色尺寸高度不透明度
            type: VisualType.Height,
            //属性字段名称
            field: "BLDG_HEIGH",
            //属性字段类型
            fieldType: FieldType.Number,
        }]
    };

    //用简单渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer3',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        textField: "NOWNAME",//geojson文件内的属性字段名称
        textRange: [0, 280],//文字标注可见范围
        textSize: 22,//文字标注大小
        textColor: [0, 1, 0, 1],//文字标注颜色
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞

        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer3", 100);
    }, 2000);
}

function test_geoJSONLayer_load_unique() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();
    //唯一值渲染器
    let uniqueValueRenderer = {
        //渲染器类型
        rendererType: RendererType.UniqueValueRenderer,
        //是否生成顶面
        generateTop: false,
        //是否生成底面
        generateBottom: false,
        //渲染字段名称
        field: "NOWNAME",
        //属性字段类型
        fieldType: FieldType.String,
        //控制可视化显示的类型：颜色
        type: VisualType.Color,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 2,
            //填充色
            color: [0, 1, 1, 1],
            //轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [1, 1, 1, 1]
            },
        },
        //根据NOWNAME字段的值进行不同颜色填充
        uniqueValueInfos: [
            {
                value: "滨海之窗1栋住宅",
                symbol: {
                    //填充蓝色
                    color: [0, 0, 1, 1],
                }
            },
            {
                value: "南山第二外国语学校",
                symbol: {
                    //填充绿色
                    color: [0, 1, 0, 1],
                }
            },
            {
                value: "保利城文化广场",
                symbol: {
                    //填充黄色
                    color: [1, 1, 0, 1],
                }
            },
            {
                value: "海岸城东座",
                symbol: {
                    //填充红色
                    color: [1, 0, 0, 1],
                }
            }
        ]
    };


    //可见性渲染器
    let visibleRenderer = {
        //渲染器类型
        rendererType: RendererType.VisibleRenderer,
        //渲染字段名称
        field: "CQNAME",
        //属性字段类型
        fieldType: FieldType.String,
        //全局要素默认是否可见
        defaultVisible: true,
        //根据CQNAME字段的值进行显隐
        visibleValueInfos: [
            {
                value: "滨海之窗花园4栋",
                visible: false,
            },
            {
                value: "南油生活A区25栋",
                visible: false,
            },
            {
                value: "滨海之窗花园幼儿园",
                visible: false,
            },
            {
                value: "南油单身宿舍B20栋",
                visible: false,
            }
        ]
    };

    //用唯一值渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer4',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        textField: "NOWNAME",//geojson文件内的属性字段名称
        textRange: [0, 200],//文字标注可见范围
        textSize: 22,//文字标注大小
        textColor: [0, 1, 0, 1],//文字标注颜色
        onTerrain: true,//是否贴地
        collision: true, //开启碰撞

        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: uniqueValueRenderer,
        visibleRenderer: visibleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer4", 100);
    }, 2000);

}

function test_geoJSONLayer_update() {


    //简单渲染器
    let simpleRenderer = {
        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 0,
            //点的默认尺寸 针对simple-marker圆形填充
            size: 100,
            //填充颜色更新为黄色 
            color: [1, 1, 0, 1]
        },
        //根据id字段不同的值展示不同的点尺寸 ，支持控制颜色、尺寸和透明度的插值显示 
        visualVariables: [{
            //控制显示的类型：颜色尺寸高度不透明度
            type: VisualType.Size,
            //属性字段名称 用id的值显示尺寸
            field: "id",
            //属性字段类型
            fieldType: FieldType.Number,
        }],

    };

    //用简单渲染器更新GeoJSONLayer 黄色
    fdapi.geoJSONLayer.update({
        id: 'layer1',
        visible: true,//加载后是否显示
        range: [0, 10000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 10],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        collision: true, //开启碰撞

        url: HostConfig.Path + "/assets/geojson/point_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer1", 100);
    }, 2000);

}

function test_geoJSONLayer_focus() {
    fdapi.geoJSONLayer.focus("layer1", 100);
}

function test_geoJSONLayer_load_class() {



    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //分类渲染器 按区间值范围进行分类符号化
    const less25 = {
        color: [255 / 255, 0 / 255, 0 / 255, 1],
    };

    const less50 = {
        color: [193 / 255, 235 / 255, 233 / 255, 1],
    };

    const less75 = {
        color: [51 / 255, 128 / 255, 174 / 255, 1],
    };

    const less100 = {
        color: [239 / 255, 237 / 255, 234 / 255, 1],
    };

    //分类渲染器
    let classBreaksRenderer = {
        rendererType: RendererType.ClassBreaksRenderer,
        //是否生成顶面
        generateTop: false,
        //是否生成底面
        generateBottom: false,
        //按属性取值分类着色
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
        //控制可视化显示的类型：颜色
        type: VisualType.Color,
        //开启颜色范围插值
        gradient: false,
        //材质样式
        // style: 11,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 2,
            //填充色
            color: [1, 1, 0, 1],
            //轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [0.1, 0.1, 0.1, 1]
            },
        },
        //按field高度属性拉高面
        visualVariables: [{
            //控制可视化显示的类型：高度
            type: VisualType.Height,
            //属性字段名称
            field: "BLDG_HEIGH",
            //属性字段类型
            fieldType: FieldType.Number,
        }],
        //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 25,
                symbol: less25
            },
            {
                minValue: 25,
                maxValue: 50,
                symbol: less50
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true,
                symbol: less75
            },
            {
                minValue: 75,
                maxValue: 100,
                symbol: less100
            }
        ]
    };

    //可见性渲染器
    let visibleRenderer = {
        //渲染器类型
        rendererType: RendererType.VisibleRenderer,
        //渲染字段名称
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
        //全局要素默认是否可见
        defaultVisible: true,
        //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示
        visibleValueInfos: [
            {
                minValue: 0,
                maxValue: 25,
                visible: true,
            },
            {
                minValue: 25,
                maxValue: 50,
                visible: true,
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true,
            },
            {
                minValue: 75,
                maxValue: 200,
                visible: true,
            }
        ]
    };

    //用分类渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer5',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        textField: "NOWNAME",//geojson文件内的属性字段名称
        textRange: [0, 280],//文字标注可见范围
        textSize: 22,//文字标注大小
        textColor: [0, 1, 0, 1],//文字标注颜色
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞

        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: classBreaksRenderer,
        visibleRenderer: visibleRenderer,
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer5", 100);
    }, 2000);

}



function test_geoJSONLayer_load_visible() {


    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //分类渲染器 按区间值范围进行分类符号化
    const less25 = {
        color: [0, 0, 1, 1],
    };

    const less50 = {
        color: [0, 1, 0, 1],
    };

    const less75 = {
        color: [1, 1, 0, 1],
    };

    const less100 = {
        color: [1, 0, 0, 1],
    };

    //分类渲染器
    let classBreaksRenderer = {
        rendererType: RendererType.ClassBreaksRenderer,
        //按属性取值分类着色
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
        //控制可视化显示的类型：颜色
        type: VisualType.Color,
        //开启颜色范围插值
        gradient: true,
        //默认符号化配置
        defaultSymbol: {
            //符号化类型枚举：0 simple-marker圆形点填充  1 simple-line线填充  2 simple-fill面填充 3 polygon3d填充
            symbolType: 2,
            //填充色
            color: [1, 1, 0, 1],
            //轮廓线
            outline: {
                //线宽
                width: 1,
                //颜色
                color: [1, 1, 1, 1]
            },
        },
        //按field高度属性拉高面
        visualVariables: [{
            //控制可视化显示的类型：高度
            type: VisualType.Height,
            //属性字段名称
            field: "BLDG_HEIGH",
            //属性字段类型
            fieldType: FieldType.Number,
        }],
        //根据BLDG_HEIGH字段的不同区间值使用不同的符号化配置颜色
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 25,
                symbol: less25
            },
            {
                minValue: 25,
                maxValue: 50,
                symbol: less50
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true,
                symbol: less75
            },
            {
                minValue: 75,
                maxValue: 100,
                symbol: less100
            }
        ]
    };

    //可见性渲染器
    let visibleRenderer = {
        //渲染器类型
        rendererType: RendererType.VisibleRenderer,
        //渲染字段名称
        field: "BLDG_HEIGH",
        //属性字段类型
        fieldType: FieldType.Number,
        //全局要素默认是否可见
        defaultVisible: true,
        //根据BLDG_HEIGH字段的值的范围进行显隐  大于高度50米则显示
        visibleValueInfos: [
            {
                minValue: 0,
                maxValue: 25,
                visible: false,
            },
            {
                minValue: 25,
                maxValue: 50,
                visible: false,
            },
            {
                minValue: 50,
                maxValue: 75,
                visible: true,
            },
            {
                minValue: 75,
                maxValue: 100,
                visible: true,
            }
        ]
    };

    //用分类渲染器和可见性渲染器添加GeoJSONLayer
    fdapi.geoJSONLayer.add({
        id: 'layer5',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 0],//基于原始位置的偏移量
        needProject: true,//开启投影转换
        textField: "NOWNAME",//geojson文件内的属性字段名称
        textRange: [0, 280],//文字标注可见范围
        textSize: 22,//文字标注大小
        textColor: [0, 1, 0, 1],//文字标注颜色
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞

        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: classBreaksRenderer,
        visibleRenderer: visibleRenderer,
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer5", 100);
    }, 2000);

}


function test_geoJSONLayer_load_materials() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //自定义材质示例
    let layer6 = {
        id: "layer6",
        visible: true,
        rotation: [
            0,
            0,
            0
        ],
        offset: [
            0,
            0,
            0
        ],
        needProject: true,
        textField: "NOWNAME",//geojson文件内的属性字段名称
        textRange: [
            0,
            280
        ],
        onTerrain: false,
        collision: true,

        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: {
            rendererType: 2,
            materials: [
                {
                    index: 0,
                    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                    scalarParameters: [{ "name": "不透明度", "value": 0.2 }, { "name": "类型", "value": 0 }],
                    vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
                },
                {
                    index: 1,
                    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                    scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 1 }],
                    vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
                },
                {
                    index: 2,
                    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                    scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 2 }],
                    vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
                },
                {
                    index: 3,
                    material: "/JC_CustomAssets/MaterialLibrary/Exhibition/其他/Geojson_1",
                    scalarParameters: [{ "name": "亮度", "value": 1 }, { "name": "类型", "value": 3 }],
                    vectorParameters: [{ "name": "Color", "value": [1, 1, 1, 1] }]
                }
            ],
            field: "BLDG_HEIGH",
            fieldType: 1,
            type: 0,
            gradient: true,
            defaultSymbol: {
                symbolType: 2,
                color: [
                    1,
                    1,
                    0,
                    1
                ],
                outline: {
                    width: 1,
                    color: [
                        1,
                        1,
                        1,
                        1
                    ]
                }
            },
            visualVariables: [
                {
                    type: 1,
                    field: "BLDG_HEIGH",
                    fieldType: 1
                }
            ],
            classBreakInfos: [
                {
                    minValue: 0,
                    maxValue: 25,
                    symbol: {
                        color: [
                            0,
                            0,
                            1,
                            1
                        ]
                    }
                },
                {
                    minValue: 25,
                    maxValue: 50,
                    symbol: {
                        color: [
                            0,
                            1,
                            0,
                            1
                        ]
                    }
                },
                {
                    minValue: 50,
                    maxValue: 75,
                    visible: true,
                    symbol: {
                        color: [
                            1,
                            1,
                            0,
                            1
                        ]
                    }
                },
                {
                    minValue: 75,
                    maxValue: 100,
                    symbol: {
                        color: [
                            1,
                            0,
                            0,
                            1
                        ]
                    }
                }
            ]
        },
        materialRenderer: {
            rendererType: 3,
            field: "BLDG_HEIGH",
            fieldType: 1,
            defaultMaterial: 0,
            materialValueInfos: [
                {
                    minValue: 0,
                    maxValue: 25,
                    index: 0
                },
                {
                    minValue: 25,
                    maxValue: 50,
                    index: 1
                },
                {
                    minValue: 50,
                    maxValue: 75,
                    index: 2
                },
                {
                    minValue: 75,
                    maxValue: 100,
                    index: 3
                }
            ]
        },
        visibleRenderer: {
            rendererType: 1,
            field: "BLDG_HEIGH",
            fieldType: 1,
            defaultVisible: true,
            visibleValueInfos: [
                {
                    minValue: 0,
                    maxValue: 25,
                    visible: true
                },
                {
                    minValue: 25,
                    maxValue: 50,
                    visible: true
                },
                {
                    minValue: 50,
                    maxValue: 75,
                    visible: true
                },
                {
                    minValue: 75,
                    maxValue: 100,
                    visible: true
                }
            ]
        }
    };
    fdapi.geoJSONLayer.add(layer6);

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer6", 100);
    }, 2000);

}


function test_geoJSONLayer_show() {
    fdapi.geoJSONLayer.show(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
}

function test_geoJSONLayer_hide() {
    fdapi.geoJSONLayer.hide(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
}

function test_geoJSONLayer_delete() {
    fdapi.geoJSONLayer.delete(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6', 'layer_json']);
}

function test_geoJSONLayer_clear() {
    fdapi.geoJSONLayer.clear();
}

function test_geoJSONLayer_setViewHeightRange() {
    fdapi.geoJSONLayer.setViewHeightRange('layer5', 1, 1000);
}


function test_geoJSONLayer_highlightFeature() {
    //设置高亮颜色
    fdapi.settings.setHighlightColor(Color.Red);
    //高亮要素块
    fdapi.geoJSONLayer.highlightFeature('layer3', 1);
}

function test_geoJSONLayer_stopHighlightFeature() {
    fdapi.geoJSONLayer.unHighlightFeature('layer3', 1);
}


function test_geoJSONLayer_highlightFeatureByProperty() {
    //设置高亮颜色
    fdapi.settings.setHighlightColor(Color.Yellow);
    //高亮属性对应的要素块
    fdapi.geoJSONLayer.highlightFeatureByProperty({
        id: 'layer3',
        fieldName: "NOWNAME",
        fieldType: FieldType.String,
        values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]
    });
}

function test_geoJSONLayer_unHighlightFeatureByProperty() {
    //取消高亮属性对应的要素块
    fdapi.geoJSONLayer.unHighlightFeatureByProperty({
        id: 'layer3',
        fieldName: "NOWNAME",
        fieldType: FieldType.String,
        values: ["天利中央广场", "天利中央广场二期", "海岸城西座", "海岸城广场"]
    });
}

function test_geoJSONLayer_highlightFeatures() {
    //设置高亮颜色
    fdapi.settings.setHighlightColor(Color.LightSeaGreen);
    fdapi.geoJSONLayer.highlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
}

function test_geoJSONLayer_stopHighlightFeatures() {
    fdapi.geoJSONLayer.unHighlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
}

function test_geoJSONLayer_stopAllHighlightFeaturesById() {
    fdapi.geoJSONLayer.unHighlightAllFeaturesById(["layer1", "layer2", "layer3"]);
}

function test_geoJSONLayer_focusFeature() {
    //相机定位到要素3
    fdapi.geoJSONLayer.focusFeature("layer3", 3, 100, 1);
}



//====================== polyline ======================

async function test_polyline_add() {
    await fdapi.polyline.delete(['p1', 'p2']);
    //使用PolylineStyle样式的折线
    let p1 = {
        id: 'p1',//折线唯一标识id
        coordinates: [
            [493711.15625, 2488656.25, 7.0],
            [493698.09375, 2490060.25, 8.4],
            [494434.78125, 2490056, 5.4],
            [494663.90625, 2491221, 3.8]
        ],//构成折线的坐标点数组
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [0, 10000], //可见高度范围
        color: [1, 0, 0, 1],//折线颜色
        thickness: 20,//折线宽度
        intensity: 1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle
        tiling: 0//材质贴图平铺比例
    };

    //自定义材质的折线
    let p2 = {
        id: 'p2',//折线唯一标识id
        coordinates: [
            [493061.53125, 2490053.5, 0.00015624999650754035],
            [492508.28125, 2490032.25, 8.7195310592651367],
            [492532, 2490584.75, 5.5993747711181641],
            [492131.28125, 2490606.25, 9.4026565551757813]

        ],//构成折线的坐标点数组
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [0, 10000], //可见高度范围
        color: [0, 1, 0, 0.5],//折线颜色绿色 半透明
        thickness: 120,//折线宽度
        intensity: 0.1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线  注意：设置为曲线非常影响添加效率
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
        tiling: 0,//材质贴图平铺比例
        material: "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_4", //设置后style相关参数会失效 自定义材质路径 可以查询材质包含的参数 
        scalarParameters: [
            { "name": "亮度1", "value": 0.5 },
            { "name": "亮度2", "value": 0.5 },
            { "name": "v缩放", "value": 100 },
            { "name": "u缩放", "value": 1 },
            { "name": "速度", "value": 0.1 },

        ],  //材质数值类型参数
        vectorParameters: [{ "name": "颜色1", "value": [0, 1, 0] }], //材质数组类型参数
    };

    let pArr = [];
    pArr.push(p1);
    pArr.push(p2);
    await fdapi.polyline.add(pArr);
    fdapi.polyline.focus(p1.id, 50);
}

async function test_polyline_update() {
    fdapi.polyline.updateBegin();
    fdapi.polyline.setStyle('p1', PolylineStyle.Arrow);//折线样式
    fdapi.polyline.setColor('p1', Color.Yellow);
    fdapi.polyline.setThickness('p1', 10);
    fdapi.polyline.setBrightness('p1', 0.5);
    fdapi.polyline.setFlowRate('p1', 0.8);
    fdapi.polyline.setDepthTest('p1', true);//深度检测 会被地面高度遮挡
    fdapi.polyline.updateEnd();
}

function test_polyline_delete() {
    fdapi.polyline.delete('p1');
}

function test_polyline_clear() {
    fdapi.polyline.clear();
}

function test_polyline_focus() {
    fdapi.polyline.focus('p1', 880, 1);
}

function test_polyline_show() {
    fdapi.polyline.show('p1');
}

function test_polyline_showAll() {
    fdapi.polyline.showAll();
}

function test_polyline_hide() {
    fdapi.polyline.hide('p1');
}

function test_polyline_hideAll() {
    fdapi.polyline.hideAll();
}


function test_polyline_get() {
    fdapi.polyline.get('p1');
}



function test_polyline_attachObject() {

    //折线的起点和终点贴合模型移动
    fdapi.polyline.attachObject([
        {
            polylineId: "line1",
            startObjectId: "satellite1",
            endObjectId: "satellite2"
        },
        {
            polylineId: "line2",
            startObjectId: "satellite2",
            endObjectId: "satellite3"
        },
    ]);
}

function test_polyline_setCoordinates() {
    fdapi.polyline.setCoordinates("p1", [
        [493711.15625, 2488656.25, 7.0],
        [493698.09375, 2490060.25, 8.4],
        [494152.4375, 2489572, 6.9823436737060547],
        [494434.78125, 2490056, 5.4],
        [494663.90625, 2491221, 3.8]
    ]);
}


function test_polyline_setStyle() {
    //参考折线样式枚举PolylineStyle
    fdapi.polyline.setStyle("p1", PolylineStyle.Arrow);
}


function test_polyline_setThickness() {
    fdapi.polyline.setThickness("p1", 60);
}


function test_polyline_setColor() {
    fdapi.polyline.setColor("p1", [0, 1, 0, 0.5]);
}


function test_polyline_setFlowRate() {
    fdapi.polyline.setFlowRate("p1", 2);
}


function test_polyline_setBrightness() {
    fdapi.polyline.setBrightness("p1", 2);
}

function test_polyline_setShape() {
    fdapi.polyline.setShape("p1", 1);
}

function test_polyline_setDepthTest() {
    //true会被地形遮挡
    fdapi.polyline.setDepthTest("p1", false);
}

function test_polyline_setViewHeightRange() {
    fdapi.polyline.setViewHeightRange("p1", 0, 1000);
}






//====================== guideline ======================

async function test_guideline_add() {
    fdapi.guideLine.clear();
     let g1 = {
        "id": "g1",
        "coordinates": [
            [493210.2025, 2488496.863125, -0.0026171875], 
            [493173.76, 2488761.5340625, -0.00078125], 
            [493387.823125, 2488773.4715625, -0.0198046875],
            [493347.726875, 2489081.4201562502, -0.0143359375], 
            [493138.6775, 2489075.9435937502, -0.000078125]
        ],
        "depthTest": false,
        "range": [
            0,
            100000
        ],
        "shape": 0,
        "width": 1,
        "guideSize": 1,
        "speed": 60,
        "interval": 1,  // -1不循环 
        //起点、终点和引导线样式
        "style": {
            "startPoint": { "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空", },
            "endPoint": { "material": "/JC_CustomAssets/PolylineLibrary/GuideExhibition/空", },
            "polyline": {
                "material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_9",
                "scalarParameters": [
                    {
                        "name": "不透明度",
                        "value": 0.5
                    },
                    {
                        "name": "亮度1",
                        "value": 10
                    },
                    {
                        "name": "亮度2",
                        "value": 1
                    }
                ],
                "vectorParameters": [
                    {
                        "name": "颜色1",
                        "value": [
                            0, 0.269323, 0.53125, 1
                        ]
                    },
                    {
                        "name": "颜色2",
                        "value": [
                            0, 0.142583, 0.28125, 1
                        ]
                    }
                ]

            }


        }
    } 
    await fdapi.guideLine.add(g1);
    fdapi.guideLine.focus(g1.id, 200);
}

async function test_guideline_update() {
    let g1 = {
        "id": "g1",
        "speed": 10,
        "interval": -1,  // -1不循环 
    }
    await fdapi.guideLine.update(g1);
    fdapi.guideLine.focus(g1.id, 200);
}

function test_guideline_delete() {
    fdapi.guideLine.delete('g1');
}

function test_guideline_clear() {
    fdapi.guideLine.clear();
}

function test_guideline_focus() {
    fdapi.guideLine.focus('g1');
}

function test_guideline_show() {
    fdapi.guideLine.show('g1');
}

function test_guideline_hide() {
    fdapi.guideLine.hide('g1');
}

function test_guideline_get() {
    fdapi.guideLine.get('g1');
}

//====================== topologyLine ======================

async function test_topologyLine_add() {
    await fdapi.topologyLine.delete(['p1']);
    let p1 = {
        id: 'p1',
        objectIds: ["08E0B7A340EEA389C811C19FA0E12B0F", "D5752FAD42C62BD7705E51882CC427A2", "FF1AC0C34935106BB6A464A6431EA0CC"], //待连接的拓扑线的模型节点ID，即图层树上模型的ID数组
        range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: Color.Red,//折线颜色
        thickness: 0.2,//折线宽度
        intensity: 1,//亮度
        flowRate: 1,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
        tiling: 0//材质贴图平铺比例
    };
    await fdapi.topologyLine.add(p1);
    fdapi.topologyLine.focus(p1.id);
}

async function test_topologyLine_update() {
    let p1 = {
        id: 'p1',
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle
        tiling: 0//材质贴图平铺比例
    };
    await fdapi.topologyLine.update(p1);
}

function test_topologyLine_delete() {
    fdapi.topologyLine.delete('p1');
}

function test_topologyLine_clear() {
    fdapi.topologyLine.clear();
}

function test_topologyLine_focus() {
    fdapi.topologyLine.focus('p1', 880, 1);
}

function test_topologyLine_show() {
    fdapi.topologyLine.show('p1');
}

function test_topologyLine_showAll() {
    fdapi.topologyLine.showAll();
}

function test_topologyLine_hide() {
    fdapi.topologyLine.hide('p1');
}

function test_topologyLine_hideAll() {
    fdapi.topologyLine.hideAll();
}


function test_topologyLine_get() {
    fdapi.topologyLine.get('p1');
}



//====================== plot ======================

async function test_plot_add() {


    fdapi.polygon.clear();
    await fdapi.plot.clear();
    //标绘样式
    let styleArr = [
        PlotStyle.Polyline,
        PlotStyle.Circle,
        PlotStyle.Triangle,
        PlotStyle.Rectangle,
        PlotStyle.Polygon,
        PlotStyle.GatheringPlace,
        PlotStyle.BetzCurveArrow,
        PlotStyle.PolylineArrow,
        PlotStyle.StraightArrow,
        PlotStyle.AssaultDirectionArrow,
        PlotStyle.AttackArrow,
        PlotStyle.TailedAttackArrow,
        PlotStyle.SquadCombatArrow,
        PlotStyle.TailedSquadCombatArrow,
        PlotStyle.DoubleArrow,
        PlotStyle.FreehandLineString,
        PlotStyle.FreehandPolygon
    ];
    //样式对应坐标
    let coordinatesArr = [
        [
            [490383.1309375, 2488091.7990625002, 23.763046875],
            [490601.8015625, 2488309.769375, 10.997421875],
            [490780.215, 2488147.1996875, 3.779609375],
            [490894.68828125, 2488456.4518750003, 11.391328125],
            [491321.05984375003, 2488302.113125, 13.13265625]
        ],

        [
            [490917.53046875, 2488906.281875, 18.2078125],
            [491124.2728125, 2488906.4475000002, 22.06140625]
        ],

        [
            [490287.69656250003, 2487582.9121875, 20.310078125],
            [490598.2525, 2487303.635625, 3.9871875],
            [490755.98812500003, 2487764.0059375, 7.311796875]
        ],

        [
            [491613.41140625003, 2489106.7115625, 15.91888671875],
            [491270.24296875, 2488872.1040625, 20.108984375000002]
        ],

        [
            [491421.61812500004, 2488063.158125, 8.554375],
            [491380.64875, 2488421.925625, 18.5028125],
            [491600.04078125, 2488564.4115625, 10.6771875],
            [491887.0128125, 2488546.0665625, 14.16765625],
            [491992.787578125, 2488180.4959375, 16.94609375],
            [491807.689765625, 2487766.0478125, 0.69875]
        ],

        [
            [491323.53140625, 2489661.71, 19.88212890625],
            [491551.427265625, 2489791.4671875, 10.241484375],
            [491330.1284375, 2489987.15375, 11.012265625]
        ],

        [
            [491906.351796875, 2488815.8937500003, 18.9809375],
            [492112.55125, 2489415.2890625, 15.87328125],
            [491720.89140625, 2490114.32828125, 8.88109375]
        ],

        [
            [491615.059140625, 2490068.7821875, 10],
            [491299.2028125, 2490328.0656250003, 7.2365234375],
            [491441.57140625, 2490527.3303125002, 7.28921875],
            [491249.05578125, 2490698.85140625, 4.65390625],
            [491339.16203125, 2490818.6428125002, 4.7596875]
        ],

        [
            [488815.6540625, 2490978.6486718752, 0.000625],
            [489351.43875000003, 2490462.92953125, 10.573828125]
        ],

        [
            [489895.03500000003, 2491951.756054688, 0.33171875],
            [489783.5340625, 2490788.1075, 5.2725]
        ],

        [
            [491324.2446875, 2491572.731953125, 3.7246875],
            [491267.57078125, 2491281.3678125, 5.87125],
            [491061.4315625, 2490587.09625, 7.93375],
            [490233.77875, 2490085.5260937503, 29.1278125]
        ],

        [
            [491021.06, 2492100.6120703127, 2.7325],
            [491138.35250000004, 2492035.1242578127, 2.001640625],
            [490883.091875, 2491610.828203125, 5.7904687500000005],
            [490301.905625, 2491191.17140625, 4.799375]
        ],

        [
            [492349.10085937503, 2491044.38046875, 9.1584375],
            [492469.6450390625, 2490386.82703125, 9.4053125],
            [491807.3009375, 2490555.5690625003, 8.17],
            [490836.5771875, 2489922.9206250003, 29.33875]
        ],

        [
            [491923.2646875, 2493583.49671875, 4.391875],
            [489837.98625, 2493636.513359375, 2.531875],
            [488596.44625000004, 2491770.78953125, -0.109375]
        ],

        [
            [493672.4428125, 2492411.6451953123, 1],
            [492210.99765625, 2492809.017421875, 1.3678125],
            [492072.93203125003, 2491736.320703125, 1.8228125],
            [493044.298828125, 2491541.2478125, -2.165625]
        ],
        [
            [493665.759375, 2489294.788125, -0.08625000000000001],
            [494007.38375000004, 2489065.111875, -0.37125],
            [493907.50375000003, 2488641.3725, -0.3565625],
            [493576.2575, 2488281.495625, -0.12125],
            [493089.6821875, 2488280.43, 0.0003125],
            [492939.155, 2488584.0803125002, 0.0609375]
        ],

        [
            [487678.793125, 2490892.0596875, -0.4090625],
            [488566.34500000003, 2490776.7171875, 0.0009375],
            [488498.255, 2489989.970625, 1.4846875],
            [488060.3425, 2489595.730625, 0.0196875],
            [487449.14125, 2490397.4434375, -0.4428125]
        ]

    ];

    let plotArr = [];
    for (let i = 0; i < styleArr.length; i++) {
        let plot = {
            id: "plot_" + i,
            range: [-100, 100000],
            style: styleArr[i],//样式类型 参考样式枚举：PlotStyle 态势标绘枚举
            onTerrain: true,
            depthTest: true,
            lineColor: [Math.random(), Math.random(), Math.random(), 1],
            fillColor: [Math.random(), Math.random(), Math.random(), 1],
            thickness: 5, //可选  仅部分样式下生效
            coordinateType: 0,
            coordinates: coordinatesArr[i]
        };
        plotArr.push(plot);
    }
    await fdapi.plot.add(plotArr);
    fdapi.plot.focus("plot_16");

}


async function test_plot_stopDraw(){
    await fdapi.plot.stopDraw();
}

async function test_plot_add_polyline() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.Polyline,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_circle() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.Circle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_triangle() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.Triangle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_rectangle() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.Rectangle,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_polygon() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.Polygon,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_gatheringPlace() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.GatheringPlace,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_betzCurveArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.BetzCurveArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}


async function test_plot_add_polylineArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.PolylineArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}


async function test_plot_add_straightArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.StraightArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_assaultDirectionArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.AssaultDirectionArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_attackArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.AttackArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_tailedAttackArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.TailedAttackArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_squadCombatArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.SquadCombatArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_tailedSquadCombatArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.TailedSquadCombatArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_add_doubleArrow() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.DoubleArrow,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}


async function test_plot_add_freehandline() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.FreehandLineString,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 5,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}



async function test_plot_add_freehandpolygon() {
    let plot = {
        id: "plot_" + Math.random(),
        range: [-100, 100000],
        style: PlotStyle.FreehandPolygon,//样式类型 参考样式枚举：PlotStyle 15种态势标绘图形
        onTerrain: true,
        depthTest: true,
        lineColor: [Math.random(), Math.random(), Math.random(), 1],
        fillColor: [Math.random(), Math.random(), Math.random(), 1],
        thickness: 2,
        coordinateType: 0
    };
    await fdapi.plot.startDraw(plot);
}

async function test_plot_update() {
    let p14 = {
        id: 'plot_14',
        range: [0, 1000],
        fillColor: Color.Blue,
        thickness: 2,
    };
    await fdapi.plot.update(p14);
}

function test_plot_delete() {
    fdapi.plot.delete('plot_14');
}

function test_plot_clear() {
    fdapi.plot.clear();
}

function test_plot_focus() {
    fdapi.plot.focus('plot_14', 280, 1);
}

function test_plot_show() {
    fdapi.plot.show('plot_14');
}

function test_plot_showAll() {
    fdapi.plot.showAll();
}

function test_plot_hide() {
    fdapi.plot.hide('plot_14');
}

function test_plot_hideAll() {
    fdapi.plot.hideAll();
}


function test_plot_get() {
    fdapi.plot.get('plot_14');
}

async function test_plot_getStrokeCoordinates() {
    let result = await fdapi.plot.getStrokeCoordinates(['plot_0', 'plot_1', 'plot_2', 'plot_3', 'plot_4', 'plot_5', 'plot_6', 'plot_7', 'plot_8', 'plot_9', 'plot_10', 'plot_11', 'plot_12', 'plot_13', 'plot_14', 'plot_15', 'plot_16']);

    let polygonArr = [];
    for (let i = 0; i < result.data.length; i++) {
        let strokeCoordinates = result.data[i].strokeCoordinates;
        //排除线的类型
        if (i != 0 && i != 6 && i != 7 && i != 15) {
            //自定义材质的面
            let plotPolygon = {
                id: 'plot_by_strokeCoordinates' + i,
                coordinates: strokeCoordinates,
                coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
                range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
                viewHeightRange: [0, 10000], //可见高度范围
                color: [0, 0, 1, 1],//多边形的填充颜色
                frameColor: Color.Red,//边框颜色
                frameThickness: 1,//边框厚度
                intensity: 0.5, //亮度
                style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
                depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
                priority: i, //叠加显示的优先级 值越大显示越靠上
                material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效
                scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数
                vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数
            };
            polygonArr.push(plotPolygon);
        }
    }
    fdapi.plot.clear();
    fdapi.polygon.clear();
    await fdapi.polygon.add(polygonArr);
    fdapi.polygon.focus('plot_by_strokeCoordinates8', 100);


}

//====================== radiationPoint ======================

async function test_radiationPoint_add() {
    fdapi.radiationPoint.clear();
    let o = {
        id: '1',
        coordinate: [494479.71875, 2491462.25, 0],//辐射圈坐标位置
        coordinateType: 0,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        radius: 300,//辐射半径
        rippleNumber: 5,//波纹数量
        color: [1, 0, 0, 0.8],//颜色
        intensity: 0.8,//亮度
        autoHeight: false//自动判断下方是否有物体
    }
    await fdapi.radiationPoint.add(o);
    fdapi.radiationPoint.focus(o.id, 800, 1);
}

async function test_radiationPoint_update() {
    let o = {
        id: '1',
        coordinate: [494479.71875, 2491462.25, 0],
        radius: 100,
        rippleNumber: 2,
        color: [0, 1, 0, 1],
        intensity: 0.5,
        autoHeight: true
    }
    await fdapi.radiationPoint.update(o);
    fdapi.radiationPoint.focus(o.id);
}

function test_radiationPoint_delete() {
    let ids = ['0', '1'];
    fdapi.radiationPoint.delete(ids);
}

function test_radiationPoint_clear() {
    fdapi.radiationPoint.clear();
}

function test_radiationPoint_focus() {
    fdapi.radiationPoint.focus('1', 200);
}

function test_radiationPoint_focusAll() {
    fdapi.radiationPoint.focusAll();
}

function test_radiationPoint_hide() {
    fdapi.radiationPoint.hide('1');
}

function test_radiationPoint_show() {
    fdapi.radiationPoint.show('1');
}

function test_radiationPoint_hideAll() {
    fdapi.radiationPoint.hideAll();
}

function test_radiationPoint_showAll() {
    fdapi.radiationPoint.showAll();
}

function test_radiationPoint_get() {
    fdapi.radiationPoint.get('1');
}



//====================== settings ======================

let __uiVisible = false;
function test_settings_setMainUIVisibility() {
    __uiVisible = !__uiVisible;
    fdapi.settings.setMainUIVisibility(__uiVisible);
}

let __joystickVisible = true;
function test_settings_setJoystickVisible() {
    __joystickVisible = !__joystickVisible;
    fdapi.settings.setScreenControlsVisible(__joystickVisible);
}

let __campassVisible = true;
function test_settings_setCampassVisible() {
    __campassVisible = !__campassVisible;
    fdapi.settings.setCampassVisible(__campassVisible);
}

function test_settings_setCampassPosition() {
    fdapi.settings.setCampassPosition(100, 100);
}

let __toolBarVisible = true;
function test_settings_setToolbarVisible() {
    __toolBarVisible = !__toolBarVisible;
    fdapi.settings.setToolbarVisible(__toolBarVisible);
}

function test_settings_setMousePickMask() {

    //此处可以用枚举，也可以直接设置数字，数字含义如下：
    //7: click, move, hover: 全开 
    //0: click, move, hover: 全关 

    //开启鼠标悬浮和移动的监听事件
    let mask = MousePickMask.MouseMove | MousePickMask.MouseHover;
    fdapi.settings.setMousePickMask(mask);

    //设置鼠标悬浮事件返回的时间间隔为0.1秒
    fdapi.settings.setMouseHoverTime(0.1);
    //设置鼠标移动事件返回的时间间隔为0.1秒
    fdapi.settings.setMouseMoveTime(0.1);
}

function test_settings_setMouseHoverTime() {
    //设置鼠标悬浮事件返回的时间间隔为0.1秒
    fdapi.settings.setMouseHoverTime(0.1);
}

function test_settings_setMouseMoveTime() {
    //设置鼠标移动事件返回的时间间隔为0.1秒
    fdapi.settings.setMouseMoveTime(0.1);
}

function test_settings_enableMouseRightClick() {
    //开启鼠标右键点击拾取
    fdapi.settings.enableRightClickMousePick(true);
}

function test_settings_setMapMode() {

    //恢复为指南针模式
    //fdapi.settings.setMapMode(MapMode.Campass, {});

    //使用mapbox 设置大地图模式
    fdapi.settings.setMapMode(MapMode.BigMap, {
        'coordType': 0, //坐标系类型，0：经纬度；1：本地（默认值是0）
        'serviceType': 4,//服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox
        'mapPoint': [492848.00, 2491968.00],//同名点，取值范围：[x,y]，（默认值是[0, 0]）
        'longitude': 113.9354020,//经度，取值范围：[0~180]（默认值是0.0）
        'latitude': 22.5222660,//纬度，取值范围：[0~90]（默认值是0.0）
        'style': 'mapbox://styles/mapbox/streets-v10',//风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
        'coordOrder': 0,//坐标顺序，0: XY; 1: YX（默认值为0）
        'cache': ':memory:',//缓存路径，字符串地址，（默认值是 ":memory:"）
        'renderMode': 0,//渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
        'groundHeight': 1,//地面高度，取值范围：[0~任意数值]（默认值是0.0）
        //'serverURL': []
    }, () => {
        log('设置大地图模式完成');
    });
}


function test_settings_getMapMode() {
    fdapi.settings.getMapMode();
}

function test_settings_setMapURL() {
    fdapi.settings.setMapURL('mapbox://styles/mapbox/streets-v10');
}

function test_settings_setHighlightColor() {
    fdapi.settings.setHighlightColor(Color.Red);
}

function test_settings_setFovX() {
    fdapi.settings.setFovX(100);
}

function test_settings_setNearClipPlane() {
    fdapi.settings.setNearClipPlane(10);
}

function test_settings_setMinCameraHeight() {
    fdapi.settings.setMinCameraHeight(-5);
}

function test_settings_setMaxCameraHeight() {
    fdapi.settings.setMaxCameraHeight(100000);
}

function test_settings_setOceanColor() {
    fdapi.settings.setOceanColor(Color.Blue);
}

var __bEnableInteract = true;
function test_settings_setEnableInteract() {
    __bEnableInteract = !__bEnableInteract;
    fdapi.settings.setEnableInteract(__bEnableInteract);

}

function test_settings_setCharacterRotation() {
    fdapi.settings.setCharacterRotation([0, 90, 0]);
}


function test_settings_setCharacterRoaming() {
    fdapi.settings.setCharacterRoaming([493080.27, 2492091.36, 2.31], [-20, 8, 0], 10);
}


var __interactiveMode = 0;
function test_settings_setInteractiveMode() {
    //设置交互模式 【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】
    if (++__interactiveMode > 2)
        __interactiveMode = 0;
    fdapi.settings.setInteractiveMode(__interactiveMode);
}

function test_settings_getInteractiveMode() {
    fdapi.settings.getInteractiveMode();
}


function test_settings_setMoveSpeed() {
    //设置交互的默认移动速度
    fdapi.settings.setMoveSpeed(0.2);
}

function test_settings_setYawSpeed() {
    //设置水平视角的默认旋转速度，即按住鼠标右键拖拽水平视角旋转的速度
    fdapi.settings.setYawSpeed(1);
}

function test_settings_setAutoRotateOnRightDoubleClick() {
    //禁用双击鼠标右键触发相机旋转的默认行为
    fdapi.settings.setCameraAutoRotateOnRightDoubleClick(false);
}

function test_settings_setRoleGender() {
    //0女性角色，1男性角色
    fdapi.settings.setRoleGender(1);
}

function test_settings_setRoamViewMode() {
    //0角色漫游使用第三人称，1角色漫游使用第一人称
    fdapi.settings.setRoamViewMode(1);
}

async function test_settings_setCharacterAssetPath() {
    //设置人物漫游交互模式
    fdapi.settings.setInteractiveMode(1);

    //查询已经挂载的自定义人物角色模型
    let pathArr = await fdapi.settings.getCharacterAssetPath();
    //设置自定义的人物角色
    //fdapi.settings.setCharacterAssetPath('/JC_CustomAssets/PlayerLibrary/Exhibition/工人_2');
    fdapi.settings.setCharacterAssetPath(pathArr.paths[0]);

}

async function test_settings_setDroneAssetPath() {
    //设置无人机漫游交互模式
    fdapi.settings.setInteractiveMode(2);
    //查询已经挂载的自定义人物角色模型
    let pathArr = await fdapi.settings.getDroneAssetPath();
    //设置自定义的无人机模型
    fdapi.settings.setDroneAssetPath('/JC_CustomAssets/UAVLibrary/Exhibition/Drone_A');
}

function test_settings_setPlayerName() {
    //联网模式（会议室）下设置角色漫游和无人机漫游时模型上方显示的文字名称
    fdapi.settings.setPlayerName("角色名称", 28);
}


function test_settings_setTerrainAlpha() {
    fdapi.settings.setTerrainAlpha(0.8);
}


var __bEnableCameraMovingEvent = false;
function test_settings_setEnableCameraMovingEvent() {
    //是否开启相机移动事件监听
    __bEnableCameraMovingEvent = !__bEnableCameraMovingEvent;
    //相机事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100]
    let period = 20;
    fdapi.settings.setEnableCameraMovingEvent(__bEnableCameraMovingEvent, period);
}

function test_settings_setWMTSLayerVisible() {
    fdapi.settings.setWMTSLayerVisible([["1", false], ["2", true], ["3", false]]);
}

function test_settings_setWMTSLayerOpacity() {
    fdapi.settings.setWMTSLayerOpacity([["1", 0.5], ["2", 0.8]]);
}

function test_settings_getVTPK() {
    fdapi.settings.getLabelLayer();
}

async function test_settings_setVTPK() {
    let resultArr = await fdapi.settings.getLabelLayer();
    fdapi.settings.setLabelLayer(resultArr.vtpks[0]);
}

function test_settings_removeVTPK() {
    fdapi.settings.removeLabelLayer();
}

function test_settings_setLabelLayerSymbol() {
    fdapi.settings.setLabelLayerSymbol({
        lineSpace: 100,
        scaleRatio: 250,
        type: 2
    });
}

function test_settings_setLabelLayerDepthTestHeight() {
    fdapi.settings.setLabelLayerDepthTestHeight(2000);
}

function test_settings_setLabelLayerScaleRatio() {
    fdapi.settings.setLabelLayerScaleRatio(200);
}

function test_settings_setLabelLayerLineSpace() {
    fdapi.settings.setLabelLayerLineSpace(300);
}

function test_settings_setLabelLayerSymbolAvoidance() {
    fdapi.settings.setLabelLayerSymbolAvoidance(2);
}

function test_settings_setCursorAutoSync() {
    //开启多客户端访问时鼠标同步
    fdapi.settings.setRenderedCursorVisible(true);
}

function test_settings_getProjectWKT() {
    fdapi.settings.getProjectWKT();
}

async function test_settings_setGroundHeight() {
    fdapi.settings.setGroundHeight(10);
}

function test_settings_setLabelScale() {
    fdapi.settings.setLabelLayerScale(50);
}

function test_settings_setWMTSLayerEnableDecal() {
    fdapi.settings.setImageryLayerEnableDecal(2);
}


function test_settings_setImageryLayerLevelOffset() {
    fdapi.settings.setImageryLayerLevelOffset(6);
}

async function test_setings_setMainPanelPos() {
    await fdapi.settings.setMainPanelPos(100, 100);
}


async function test_setings_showPropertiesPanel() {
    await fdapi.settings.showPropertiesPanel("E637D8FE42335EE96C58A1840BCAD0CE");
}

async function test_setings_hidePropertiesPanel() {
    await fdapi.settings.hidePropertiesPanel();
}

async function test_setings_setPropertiesPanelPos() {
    await fdapi.settings.setPropertiesPanelPos(500, 280);
}


function test_settings_setGlobalIllumination() {
    //是否启用屏幕空间全局光照，默认值：false
    fdapi.settings.setGlobalIllumination(true);
}


function test_settings_setChromaticAberration() {
    //色差强度值，取值范围：[0~5]，默认值：0（关闭）
    fdapi.settings.setChromaticAberration(1);
}

function test_settings_setAmbientRadius() {
    //环境光遮罩的淡出距离（单位：米），默认值：12000
    fdapi.settings.setAmbientFadeDistance(8000);
}

function test_settings_setAmbientFadeDistance() {
    //环境光遮罩的淡出距离（单位：米），默认值：12000
    fdapi.settings.setAmbientFadeDistance(8000);
}

function test_settings_setAmbientIntensity() {
    //环境光遮罩强度，取值范围：[0~100]，默认值：60
    fdapi.settings.setAmbientIntensity(80);
}

function test_settings_setExposureEnabled() {
    //是否启用自动曝光，默认值：false
    fdapi.settings.setExposureEnabled(true);
}

function test_settings_setExposureCompensation() {
    //曝光补偿量，默认值：0
    fdapi.settings.setExposureCompensation(1.5);
}

function test_settings_setDepthFiethSwitch() {
    //是否启用景深效果，默认值：false
    fdapi.settings.setDepthFiethSwitch(true);
}

function test_settings_setFocalLength() {
    // 焦距值（单位：毫米），默认值：10000
    fdapi.settings.setFocalLength(5000);

}

function test_settings_setAperture() {
    // 光圈值（f 值），值越小景深越浅，默认值：4
    fdapi.settings.setAperture(2.8);
}

function test_settings_setDeepBlur() {
    //深度模糊强度，默认值：2
    fdapi.settings.setDeepBlur(3);
}

function test_settings_setDofMode() {

    // {0|1|2|3} mode - 对焦距离模式，仅在景深滤镜效果（postProcessEffects=1）下生效
    /*   - `0` 近距离（0.5km）
    *   - `1` 中远距离（2km）
    *   - `2` 中远距离（5km）
    *   - `3` 远距离（10km）
    *   默认值：0
    */
    fdapi.settings.setDofMode(2);
}

function test_settings_setContrast() {
    // 对比度，取值范围：[0~100]，默认值：10
    fdapi.settings.setContrast(20);
}

function test_settings_setSaturation() {
    // 饱和度，取值范围：[0~100]，默认值：10
    fdapi.settings.setSaturation(30);
}

function test_settings_setTonemapper() {
    //是否开启色彩优化，默认值：true
    fdapi.settings.setTonemapper(false);
}

function test_settings_setLutMode() {
    /** 
     * LUT 调色预设模式，取值范围：[0~30]    
     *   - `0` 关闭调色
     *   - `1~30` 对应不同 LUT 调色效果
     *   默认值：0
     */
    fdapi.settings.setLutMode(5);
}

function test_settings_setLutIntensity() {
    // LUT 调色强度（百分比小数），取值范围：[0~1.0]，默认值：0
    fdapi.settings.setLutIntensity(0.8);
}

function test_settings_setLensFlareIntensity() {
    //光晕强度，取值范围：[0~1.0]，默认值：0
    fdapi.settings.setLensFlareIntensity(0.3);
}

function test_settings_setBloomIntensity() {
    // 泛光强度，取值范围：[0~10.0]，默认值：0
    fdapi.settings.setBloomIntensity(0.5);
}

function test_settings_setDarkCorner() {
    // 暗角强度（百分比），取值范围：[0~1]，默认值：0
    fdapi.settings.setDarkCorner(0.2);
}

function test_settings_setPostProcessEffects() {
    /**
      *  @param {0|1|2|3|4|5|6} effect - 滤镜效果类型
      *   - `0` 无效果（默认）
      *   - `1` 景深效果
      *   - `2` 线框效果
      *   - `3` 圆珠笔
      *   - `4` 白框
      *   - `5` 蓝图
      *   - `6` 原色黑边
      *   默认值：0
      */
    // 线框效果
    fdapi.settings.setPostProcessEffects(2);
}

function test_settings_setScreenPercentage() {
    // 屏幕渲染分辨率百分比，取值范围：[50~200]，默认值：125 值越高画质越好，性能消耗越大
    fdapi.settings.setScreenPercentage(100);
}

function test_settings_setAntiAliasing() {
    // 是否开启反走样，默认值：true
    fdapi.settings.setAntiAliasing(true);
}

function test_settings_setTerrainGlobalAlpha() {

    // 地形不透明度，取值范围：[0~1.0]，默认值：1.0  `0` 完全透明  `1` 完全不透明
    fdapi.settings.setTerrainGlobalAlpha(0.7);
}

function test_settings_setTerrainGlobalLitStatus() {
    //地形是否参与全局光照，默认值：true
    fdapi.settings.setTerrainGlobalLitStatus(false);
}

function test_settings_setOsgbGlobalLitStatus() {
    // 倾斜摄影模型是否参与全局光照，默认值：false
    fdapi.settings.setOsgbGlobalLitStatus(true);
}

function test_settings_setOsgbGlobalAlpha() {
    // 倾斜摄影模型不透明度，取值范围：[0~1.0]，默认值：1.0
    fdapi.settings.setOsgbGlobalAlpha(0.5);
}

function test_settings_setReceiveDecalMode() {

    /** 
     * @param {0|1|2} mode - 对象贴合模式
     *   - `0` 无贴合
     *   - `1` 所有对象均参与贴合
     *   - `2` 仅地形参与贴合
     *   默认值：1
     */
    fdapi.settings.setReceiveDecalMode(2); // 仅地形
}


//====================== SettingsPanel设置面板参数控制 ======================
function test_settingsPanel_setReportMode() {
    /**
     * @param {number}  showAlign 汇报演示窗口位置   取值：0【底部】，1【居左】，2【居右】，默认0
     * @param {number}  playMode  汇报演示播放模式   取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0
     * @param {boolean} isLinkage 多视口相机是否联动 取值：联动true，不联动false，默认不联动false
     */
    fdapi.settingsPanel.setReportMode(1, 1, true);
}

function test_settingsPanel_getReportMode() {
    fdapi.settingsPanel.getReportMode();
}

function test_settingsPanel_setControlMode() {
    /**
     * @param {number}  speed        第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2
     * @param {number}  yawSpeed     视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0
     * @param {boolean} isRotateSelf 是否开启自由交互右键自传 取值：true开启，false不开启，默认false
     * @param {boolean} isUseMaleRole  第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false
     * @param {number}  viewType       角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0
     */
    fdapi.settingsPanel.setControlMode(0.5, 0.5, true, true, 1);
}

function test_settingsPanel_getControlMode() {
    fdapi.settingsPanel.getControlMode();
}

function test_settingsPanel_setPostProcessMode() {
    //后期配置参数
    let options1 = {

        globalIllumination: false, //屏幕空间全局光照;	
        chromaticAberration: 0, //透镜色差;
        ambientRadius: 100, //环境光遮罩半径
        ambientFadeDistance: 12000, //环境光遮罩淡出距离
        exposureEnabled: false,//自动曝光
        exposureCompensation: 0, //曝光补偿
        depthFiethSwitch: false,//景深开关
        focalLength: 10000,//   焦距
        aperture: 4,//   光圈
        deepBlur: 2,//   深度模糊

        contrast: 10,//对比度，取值范围：[0~100]，默认值：10
        saturation: 10,//饱和度，取值范围：[0~100]，默认值：10
        lensFlareIntensity: 0.5,//光晕强度 ，取值范围：[0~1.0]，默认值：0
        ambientIntensity: 60,//环境光遮罩强度，取值范围：[0~100]，默认值：60
        bloomIntensity: 0.1,//泛光，取值范围：[0~10.0]，默认值：0
        darkCorner: 0.1,//暗角，取值范围：[0~1]，单位：百分比，默认值：0
        lutMode: 10,   //   LUT调色模式，取值范围：[0~30]，默认值：0（关闭调色模式），1-30对应不同LUT调色效果
        lutIntensity: 0.5, // LUT调色强度，类型为百分比，取值范围：[0~1.0]，默认值：0，即小数对应的百分比
        screenPercentage: 50,//屏幕百分比，取值范围：[50~200]，默认值：125
        terrainGlobalAlpha: 0.5,//地形不透明度，取值范围：[0~1.0]，默认值：1.0
        terrainGlobalLitStatus: false,//地形是否参与光照，默认值：true
        osgbGlobalLitStatus: true,//倾斜摄影是否参与光照，默认值：false
        osgbGlobalAlpha: 0.8,//倾斜摄影不透明度，取值范围：[0~1.0],默认值：1.0
        antiAliasing: false,//是否开启反走样，默认值：true
        tonemapper: false,//是否开启色彩优化，默认值：true  
        postProcessEffects: 1,//滤镜效果，取值范围：0【默认无效果】 1【景深效果】 2【线框效果】，3【圆珠笔】，4【白框】，5【蓝图】，6【原色黑边】， 默认值：0
        dofMode: 1,//可选参数，仅在景深效果下生效，对焦距离，取值：0【近距离0.5km】 1【中远距离2km】 2【中远距离5km】 3【远距离10km】，默认值：0
        receiveDecalMode: 0//对象贴合模式，取值：0【无】 1【所有对象】 2【仅地形】，默认值：1
    };
    //设置多个参数 滤镜线框效果
    fdapi.settingsPanel.setPostProcessMode(options1);


    //支持只设置单个参数 地形不透明度
    fdapi.settingsPanel.setPostProcessMode({ terrainGlobalAlpha: 0.6 });
}

function test_settingsPanel_getPostProcessMode() {
    fdapi.settingsPanel.getPostProcessMode();
}

function test_settingsPanel_setCameraMode() {
    /**
     * @param {number}  nearClipPlane 近裁距离，取值范围：[0.1~100]，单位：米，默认值：1.0
     * @param {number}  fovH          水平视角，取值范围：[45~134]，单位：度，默认值：90
     * @param {boolean} minCameraHeight  最小相机高度，取值范围：[-100~正无穷]，单位：米，默认值：-100米
     * @param {boolean} maxCameraHeight  最大相机高度，取值范围：[100000~正无穷]，单位：米，默认值：100000米，即100公里
     */
    let nearClipPlane = 10;
    let fovH = 100;
    let minCameraHeight = -5;
    let maxCameraHeight = 100000;
    fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);
}

function test_settingsPanel_getCameraMode() {
    fdapi.settingsPanel.getCameraMode();
}

function test_settingsPanel_setMapMode() {
    fdapi.settingsPanel.setMapMode(MapMode.BigMap, {
        //地图模式相关的参数，具体请参考API帮助文档
        /**
         *  serviceType: 服务类型，0：MVT矢量切片（默认值）； 1：WMTS(ArcGIS)； 2：WMS； 3：MapServer(ArcGIS) ； 4：Mapbox
         *  coordType: 坐标系类型，0：经纬度；1：本地（默认值是0）
         *  mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]）
         *  longitude: 经度，取值范围：[0~180]（默认值是0.0）
         *  latitude: 纬度，取值范围：[0~90]（默认值是0.0）
         *  cache: 缓存路径，字符串地址，（默认值是 ":memory:"）
         *  style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
         *  groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0）
         *  renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
         *  serverURL: WMTS风格路径，二维数组，元素说明：index[0]服务id，index[1]服务地址；取值示例：[['server1', 'http://192.168.1.29:81/xxx'], ['server2', 'http://192.168.1.29:82/xxx'], ['server3', 'http://192.168.1.29:83/xxx']]
         *  coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0）
         *  maxLevel: WMTS服务最大显示层级，取值范围：[0~22]，默认值：10
         */
        'coordType': 0,
        'serviceType': 1,
        'mapPoint': [0, 0],
        'longitude': 0.0,
        'latitude': 0.0,
        'cache': ':memory:',
        'style': 'http://192.168.1.29:82/B34兴趣点_居名点',
        'groundHeight': 10,
        'renderMode': 0,
        'serverURL': [['1', 'http://192.168.1.29:82'], ['2', 'http://192.168.1.29:82'], ['3', 'http://192.168.1.29:82']],
        'coordOrder': 0,
        'maxLevel': 10

    }, () => {
        log('设置大地图模式完成');
    });
}

function test_settingsPanel_getMapMode() {
    fdapi.settingsPanel.getMapMode();
}




//====================== tools ======================

async function test_tools_startPolygonClip() {

    fdapi.camera.set(491698.285, 2492832.564375, 2338.217344, -63.619705, 173.917404, 0);
    //开启剖切支持
    await fdapi.tileLayer.enableClip('E637D8FE42335EE96C58A1840BCAD0CE');
    //多边形剖切坐标
    let coords = [
        [489902.15625, 2492054.75, 0.62421876192092896],
        [489864.625, 2493387.25, 0.021406250074505806],
        [490764, 2493095.5, 2.9920313358306885],
        [490709.25, 2492026.5, 0.65687501430511475],
    ]
    //多边形剖切反转
    let isReverseCut = false;
    fdapi.tools.startPolygonClip(coords, isReverseCut);
}

function test_tools_stopPolygonClip() {
    fdapi.tools.stopPolygonClip();
}

async function test_tools_startPlaneClip() {
    /**
     * 面剖切
     * @param {array} location 面剖切生成位置坐标：[X,Y,Z]
     * @param {array} rotation 旋转角度 [Pitch,Yaw,Roll]，数组元素类型：(float)，取值范围：[任意数值]
     * @param {boolean} showPlane  剖切时是否显示辅助面，默认值：false
     * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
     */
    fdapi.camera.set(491722.232187, 2485085.134375, 3304.018125, -41.91861, -110.982338, 0);
    fdapi.tools.startPlaneClip([489399.15625, 2487092.5, 19.214374542236328], [0, 0, 0], true, true);
}

function test_tools_stopPlaneClip() {
    fdapi.tools.stopPlaneClip();
}

async function test_tools_startVolumeClip() {
    //切换相机位置到剖切范围内
    fdapi.camera.set(494188.212969, 2489127.357422, 3717.1875, -50.044331, -177.079071, 0);

    /**
     * 开始体剖切
     * @param {array}   bbox  剖切范围包围盒 
     * @param {number}  value 0：正向剖切，1：反向剖切
     * @param {boolean} isShowBBox 剖切时是否显示剖切范围的包围盒，默认值：false
     * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
     * @param {array}   rotation bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转
     * @param {function} fn 可选的回调函数，请参考[二次开发：异步接口调用方式]{@tutorial API_AsyncCall}
     */
    let bbox = [488670.75, 2488165, -200, 491659.59375, 2490987.5, 800];
    fdapi.tools.startVolumeClip(bbox, 0, true, true, [0, 0, 0]);
}

async function test_tools_updateVolumeClip() {
    //切换相机位置到剖切范围内
    fdapi.camera.set(494188.212969, 2489127.357422, 3717.1875, -50.044331, -177.079071, 0);
    /**
     * 更新体剖切
     * @param {array}   bbox  剖切范围包围盒 
     * @param {number}  value 0：正向剖切，1：反向剖切
     * @param {boolean} isShowBBox 剖切时是否显示剖切范围的包围盒，默认值：false
     * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
     * @param {array}   rotation bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转，注意：只支持更新Yaw
     * @param {function} fn 可选的回调函数，请参考[二次开发：异步接口调用方式]{@tutorial API_AsyncCall}
     */
    let bbox = [488670.75, 2488165, -200, 491659.59375, 2490987.5, 800];
    fdapi.tools.updateVolumeClip(bbox, 0, true, false, [0, 40, 0]);
}

function test_tools_stopVolumeClip() {
    fdapi.tools.stopVolumeClip();
}

function test_tools_setMeasurement() {
    //options的每个属性都是可选的
    /**
     *  <li>pointSize: 默认值 8.0</li>
     *  <li>textSize:  默认值 10.0</li>
     *  <li>textColor: 默认值 Color.Yellow</li>
     *  <li>pointColor:默认值 [0,0,1,0.3]</li>
     *  <li>lineColor: 默认值 Color.Red</li>
     *  <li>areaColor: 默认值 [0,1,0,0.3]</li>
     *  <li>showCoordinateText: 是否显示坐标测量的文本，默认值 false</li>
     */
    let options = {
        'pointSize': 8.0,//点大小
        'textSize': 10.0,//字体大小
        'textColor': Color.Yellow,//字体颜色
        'pointColor': [0, 0, 1, 0.3],//点填充颜色
        'lineColor': Color.Blue,//线填充颜色
        'areaColor': [0, 1, 0, 0.3],//面填充颜色
        'showCoordinateText': true //是否显示坐标信息
    };
    //测量模式：Coordinate 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
    fdapi.tools.setMeasurement(MeasurementMode.Coordinate, options);
}

function test_tools_startMeasurement() {
    //测量模式配置选项参数 不传坐标参数需要交互拾取坐标后再测量结果
    let options = {
        'unitType': 0,//单位 0：米 1：千米 2：英尺，默认值 0
        'pointSize': 8.0,
        'textSize': 10.0,
        'textColor': Color.Yellow,
        'pointColor': [0, 0, 1, 0.3],
        'lineColor': Color.Blue,
        'areaColor': [0, 1, 0, 0.3],
        'showCoordinateText': true
    };
    //设置测量模式，详情参考文档内MeasurementMode枚举 支持以下类型： 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
    fdapi.tools.setMeasurement(MeasurementMode.MultiPoint, options);
    //开始测量 注意：5.3支持右键结束交互
    fdapi.tools.startMeasurement();
}


function test_tools_startMeasurement1() {
    //取消测量
    fdapi.tools.stopMeasurement();
    //测量模式配置选项参数 传坐标参数则直接显示测量结果
    let options = {
        'unitType': 1,//单位 0：米 1：千米 2：英尺，默认值 0
        'coordinates': [[492445.453125, 2491826.701489258, -0.686710205078125], [492462.8325, 2491814.2049731445, -0.686710205078125], [492450.03875, 2491798.5304492186, -0.686708984375], [492439.22750000004, 2491805.41876709, -0.686707763671875], [492439.5309375, 2491820.9455126952, -0.687000732421875]],
        'pointSize': 8.0,
        'textSize': 10.0,
        'textColor': Color.Yellow,
        'pointColor': [0, 0, 1, 0.3],
        'lineColor': Color.Blue,
        'areaColor': [0, 1, 0, 0.3],
        'showCoordinateText': true
    };
    //设置测量模式，详情参考文档内MeasurementMode枚举 支持以下类型： 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积 7角度
    fdapi.tools.setMeasurement(MeasurementMode.MultiPoint, options);
}

function test_tools_stopMeasurement() {
    fdapi.tools.stopMeasurement();
}

function test_tools_lineIntersect() {
    fdapi.tools.lineIntersect(
        [492634.59375, 2491808, 10],
        [492518.03125, 2491819.75, 0],
    );
}

function test_tools_linesIntersect() {
    //注意：1、求交要在相机视野范围内 2、获取地形高度时从上往下求交，起始点高度Z要大于结束点Z。
    let startEndPointArr = [
        { "start": [492634.59375, 2491808, 10], "end": [492518.03125, 2491819.75, 0] },
        { "start": [492571.9375, 2491902.25, 10], "end": [492537.71875, 2491811, 0] }

    ];
    fdapi.tools.linesIntersect(startEndPointArr, false, true);
}

function test_tools_startSkylineAnalysis() {
    let options = {
        startPoint: [492685.4975, 2491384.16, 0.38284179687500003],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        yaw: -82,//朝向
        showOutline: true,
        outlineThickness: 3.0,
        outlineColor: Color.Red,
        useSceneColor: false,
        sceneColor: Color.Black,
        showSkyline: true,
        interactiveLock: true,
        windowSize: [400, 200],
        skylineColor: Color.Green,
        backgroundColor: Color.Gray,
        height: 50.0,
        tileLayers: [
            {
                color: Color.Blue,
                ids: ['B1C4E5BD4888DA841D690AA396B061C3', 'A659DF0E404D806CB3511C9DAC22D160']
            }
        ]
    }
    fdapi.tools.startSkylineAnalysis(options);
}


function test_tools_stopSkylineAnalysis() {
    fdapi.tools.stopSkylineAnalysis();
}


function test_tools_exportSkyline() {
    let options = {
        skylineColor: Color.Green,
        backgroundColor: Color.Gray
    };
    //导出图片到cloud服务器指定磁盘路径
    fdapi.tools.exportSkyline('d:/skyline.png', [400, 200], options);
    //导出base64图片
    fdapi.tools.exportSkyline('base64', [400, 200], options);
}

function test_tools_startViewshedAnalysis() {
    fdapi.camera.set(483394.35125, 2489324.9675, 5003.239688, -41.042278, -4.709811, 0);

    let options = {
        startPoint: [486931.84375, 2490639.75, 6.382500171661377],// 起点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        endPoint: [488387.28125, 2490321.5, 6.0603122711181641],// 终点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        fov_h: 150,//横向视角，取值范围：[1°~150°]，默认值：60
        fov_v: 45,//纵向视角，取值范围：[1°~150°]，默认值：30
        height: 10.0,//视点高度（距离场景交互所拾取点的高度），默认值：0
        visibleColor: Color.Green,//可见区域的颜色，默认值：红色 Color.Red
        invisibleColor: Color.Red,//不可见区域的颜色，默认值：绿色 Color.Green
        interactiveLock: false //是否开启交互锁定
    }
    fdapi.tools.startViewshedAnalysis(options);
}

function test_tools_stopViewshedAnalysis() {
    fdapi.tools.stopViewshedAnalysis();
}

function test_tools_startGeometryEdit() {
    //定位到对象o1
    fdapi.customObject.focus('o1', 10, 1);
    // @param {string} id   对象ID
    // @param {number} type 坐标架类型，共四种类型，取值说明：1.缩放 2.旋转 3.位移 4.混合，默认取值是4
    fdapi.tools.startGeometryEdit('o1', 4);
}

function test_tools_stopGeometryEdit() {
    fdapi.tools.stopGeometryEdit();
}

function test_tools_startFloodFill() {
    // let options = {
    //     min: [-2335.08, 7285.07],
    //     max: [6031.15, 16178.4],
    //     seed: [641.83, 13813.49],
    //     elevation: 35,
    //     color: Color.Blue,
    //     precision: 0.5
    // }
    let options = {
        min: [495119.875, 2491031.25],
        max: [495386.625, 2491245.5],
        seed: [495304.9, 2491041],
        elevation: 3.5,
        color: Color.LightSeaGreen,
        precision: 0.5
    }

    fdapi.camera.set(495215.15625, 2491285.75, 205.424454, -61.042461, 88.891701, 0);
    fdapi.tools.startFloodFill(options);
}

function test_tools_stopFloodFill() {
    fdapi.tools.stopFloodFill();
}

function test_tools_startVisiblityAnalysis() {
    fdapi.camera.set(492376.528496, 2492111.358945, 63.639897, -27.420462, 117.353462, 0);

    let option = {
        startPoint: [492381.63375000004, 2492015.36, -0.8868505859375],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        endPoints: [
            [492314.92625, 2491961.2800000003, -0.886845703125],
            [492294.97250000003, 2492009.7600000002, -0.8868603515625],
            [492267.195, 2491972.8000000003, -0.8868603515625]
        ],//多个目标点坐标数组 可选参数 注意：不传入时可以通过鼠标交互拾取
        height: 1.8,//视点高度（距离场景交互所拾取点的高度）
        visibleColor: [0, 1, 0, 1],//可见区域的颜色，默认值：红色
        invisibleColor: [1, 0, 1, 0]//不可见区域的颜色，默认值：绿色
    };
    fdapi.tools.startVisiblityAnalysis(option);
}

function test_tools_stopVisiblityAnalysis() {
    fdapi.tools.stopVisiblityAnalysis();
}

function test_tools_startViewDomeAnalysis() {
    fdapi.camera.set(492906.810332, 2492317.978672, 210.84125, -27.420456, 117.353394, 0);

    let option = {
        startPoint: [492647.38125000003, 2491946.24, -0.88685546875],//观察点坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        radius: 200,//展示半径，单位：米，取值范围：[0.01~任意正数]，默认值：500
        opacity: 0.5,//透明度，取值范围：[0~1]，默认值：0.5
        visibleColor: [0, 1, 0, 1],//可见区域的颜色，默认值：红色
        invisibleColor: [1, 0, 1, 0]//不可见区域的颜色，默认值：绿色
    };
    fdapi.tools.startViewDomeAnalysis(option);
}

function test_tools_stopViewDomeAnalysis() {
    fdapi.tools.stopViewDomeAnalysis();
}

function test_tools_startCutFillAnalysis() {
    fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

    let option = {
        coordinates: [
            [490969.28750000003, 2489663.2, 36.990625],
            [491104.991875, 2488874.24, 21.89296875],
            [490202.63125000003, 2486733.12, 0.8265625],
            [488741.765, 2488744.16, 10.9128125],
            [489299.37, 2489846.24, 32.093593750000004]
        ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        height: 100,//高度 米
        gridSize: 20,//网格大小
        lineThickness: 1,//宽度
        pointSize: 5,//点的大小
        gridLineThickness: 1,//网格线的宽度
        cutLineColor: Color.Red,//挖方线的颜色
        fillLineColor: Color.Green,//填方线的颜色
        cutPointColor: Color.Black,//挖方点的颜色
        fillPointColor: Color.Blue,//填方点的颜色
        gridColor: Color.Yellow//网格线的颜色
    };
    fdapi.tools.startCutFillAnalysis(option);
}

function test_tools_stopCutFillAnalysis() {
    fdapi.tools.stopCutFillAnalysis();
}

function test_tools_startSunshineAnalysis() {
    fdapi.camera.set(492736.677812, 2492420.577812, 143.058848, -21.954241, 80.143684, 0);

    let options = {
        coordinates: [
            [492888.27187500003, 2492103.36, 2.3133203125],
            [492789.1425, 2492137.2800000003, -0.8868945312500001],
            [492810.323125, 2492218.72, -0.8867578125],
            [492918.444375, 2492185.44, 2.3133203125],
        ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        year: 2022,//年，取值范围：[1970~至今年份]，默认值：当前日期
        month: 1,//月，取值范围：[1~12]，默认值：当前日期
        day: 12,//日，取值范围：[1~31]，默认值：当前日期
        startTime: "08:00",//开始时间，默认值：08:00
        endTime: "16:00",//结束时间，默认值：16:00
        spacing: -1,//间距，取值范围：[任意负数~任意正数]，默认值：-1米
        groundElevation: 0,//底面高度，取值范围：[任意负数~任意正数]，默认值：0米
        height: 100,//高度，取值范围：[0~任意正数]，默认值：5000米
        sphereRadius: 10//日照效果球半径，取值范围：[0~任意正数]
    };
    fdapi.tools.startSunshineAnalysis(options);
}

function test_tools_stopSunshineAnalysis() {
    fdapi.tools.stopSunshineAnalysis();
}

function test_tools_startTerrainSlopeAnalysis() {
    fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

    //开始坡度坡向分析
    let options = {
        coordinates: [
            [488501.21875, 2488108, 19.438125610351563],
            [489722.4375, 2490857, 4.0191407203674316],
            [491464.96875, 2489233.5, 18.179296493530273],
            [490473.125, 2486914.5, 2.1426563262939453],
        ],//可选参数 注意：不传入时可以通过鼠标交互拾取
        showArrow: true,//是否显示箭头，{boolean}，默认值：true
        colorMode: 1,//模式，{number}，取值范围：【1坡度 2坡向】，默认值：1，
        arrowColor: [1, 1, 1, 1]//箭头颜色
    };
    fdapi.tools.startTerrainSlopeAnalysis(options);
}

function test_tools_stopTerrainSlopeAnalysis() {
    fdapi.tools.stopTerrainSlopeAnalysis();
}

function test_tools_startContourLineAnalysis() {
    fdapi.camera.set(488132.202656, 2489988.220312, 1736.441719, -45.996494, 28.811474, 0);

    //开始等高线分析
    let options = {
        coordinates: [
            [491381.30625, 2490408.16, 7.295],
            [490244.730625, 2486890.56, 4.260625],
            [488281.0425, 2488424.96, 14.2728125],
            [489158.365, 2490848.32, 0.563125]
        ],//分析范围坐标 可选参数 注意：不传入时可以通过鼠标交互拾取
        isShowContourPlane: true,     //是否显示等高面，{boolean}，默认值：true
        contourPlaneOpacity: 1,       //等高面颜色不透明度，仅当isShowContourPlane设置为true时生效，{number}，取值范围：[0~1]，默认值：1
        isShowContourLine: true,      //是否显示等高线，{boolean}，默认值：true
        contourLineColor: [1, 1, 1, 1],  //等高线颜色值，仅当isShowContourLine设置为true时生效，{Color}，默认值：[1,1,1,1]
        contourLineSpacing: 20,       //等高线的间距，仅当isShowContourLine设置为true时生效，{number}，单位：米，默认值：20米
        contourLineRangeMax: 1000000, //等高线最高显示高度，{number}，单位：米，默认值：1000000米
        contourLineRangeMin: -1000000,//等高线最低显示高度，{number}，单位：米，默认值：-1000000米
    };
    fdapi.tools.startContourLineAnalysis(options);
}

function test_tools_stopContourLineAnalysis() {
    fdapi.tools.stopContourLineAnalysis();
}

function test_tools_riverCrossSectionByShp() {
    fdapi.tools.riverCrossSectionByShp({
        riverPolygonPath: "E:/rivercross/河道范围.shp", //河道面范围的shp文件路径 三个文件坐标系需一致
        riverCenterLinePath: "E:/rivercross/河道中心线.shp",//河道中心线shp文件路径 三个文件坐标系需一致
        demPath: "E:/rivercross/DEM_Mosaic_V2_Clip.tif",//河道高程文件 三个文件坐标系需一致
        sectionInterval: 500, //可选，沿河道中心线断面的采样间距，默认值：500，单位：米
        sampleInterval: 50, // 可选，河道断面内采样点的间距，默认值：50，单位：米
        tangentWindowRadius: 0, //可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米
        sampleDirection: 0, //可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0
        defaultSectionWidth: 500, //可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，那么就使用这个默认河面宽度采样河道断，默认值：500，单位：米
    });
}

function test_tools_riverCrossSection() {
    fdapi.tools.riverCrossSection({
        riverPolygon: [], //河道面范围包含的坐标数组
        riverCenterLine: [],//河道中心线包含的坐标数组
        demPath: "E:/rivercross/DEM_Mosaic_V2_Clip.tif",//河道高程文件
        sectionInterval: 500, //可选，沿河道中心线断面的采样间距，默认值：500，单位：米
        sampleInterval: 50, // 可选，河道断面内采样点的间距，默认值：50，单位：米
        tangentWindowRadius: 0, //可选，河道断面的切向平滑窗口半径，用来估算河道断面方向，如果设置为0则接口自动计算窗口范围，默认值：0，单位：米
        sampleDirection: 0, //可选，河道断面的采样方向，0：从河道中心线走向的左侧开始采样 1：从河道中心线走向的右侧开始采样，默认值：0
        defaultSectionWidth: 500, //可选，默认断面宽度，注意：如果某些区域河道中心线和河道范围没有交点，那么就使用这个默认河面宽度采样河道断，默认值：500，单位：米
    });
}

function test_tools_showUIPanel() {
    //UIPanelType是系统面板的类型枚举
    fdapi.tools.showUIPanel(UIPanelType.Measure, [200, 100]);
}

function test_tools_showMeasurePanel() {
    //测量是 0~5
    fdapi.tools.showMeasurePanel(3, [200, 100]);
}

function test_tools_showClipPanel() {
    //剖切是 0~2
    fdapi.tools.showClipPanel(2, [200, 100]);
}


function test_tools_hideUIPanel() {
    fdapi.tools.hideUIPanel(UIPanelType.Measure);
}

function test_tools_getUIPanel() {
    fdapi.tools.getUIPanel(UIPanelType.Measure);
}


function test_tools_replaceTextureByVideo() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //用视频替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByVideo('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/assets/video/video1.webm');
}

function test_tools_replaceTextureByImage() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //用图片替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByImage('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/locale/zh/images/radiation.png');
}

function test_tools_replaceTextureByUrl() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);

    //用url替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByUrl('/Game/Model/Textures/M_玻璃颜色_次深', 'http://www.baidu.com');
}

function test_tools_restoreTexture() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //批量恢复纹理
    let pathArr = ["/Game/Model/Textures/M_玻璃颜色_次深", "/Game/Temp/Textures/Url", "/Game/Temp/Textures/Image"];
    fdapi.tools.restoreTexture(pathArr);
}


//====================== videoProjection ======================

async function test_vp_add() {
    fdapi.videoProjection.delete('vp1');
    let o = {
        id: "vp1",
        videoURL: HostConfig.Path + "/assets/video/video2.mov",//视频地址
        location: [492753.3125, 2491942.25, 60],
        rotation: [-10, 10, 0],
        fov: 90,//垂直夹角
        aspectRatio: 1.5,//纵横比
        exposure: 0.6, //曝光度
        distance: 100,//投影距离
        minDistance: 5,//近裁距离
        depthCulling: true,//是否背面剔除 即背面不显示投影
        frustumVisible: true,//是否显示投影线框
        frustumColor: [1, 1, 1, 1], //投影线框颜色
        texturePath: HostConfig.Path + '/assets/image/decal2.png', //自定义投影蒙版图片路径
        screen: true, //是否显示投影幕布，默认值：false
        screenDistance: 120 //投影幕布的显示距离，单位：米，默认值：100米
    }
    await fdapi.videoProjection.add(o);
    fdapi.videoProjection.focus(o.id, 50);
}

async function test_vp_update() {
    let o = {
        id: "vp1",
        rotation: [-90, 120, 0],
        fov: 90,
        exposure: 1, //曝光度
        aspectRatio: 1,
        distance: 120,
        texturePath: '' //自定义投影蒙版图片路径
    }
    await fdapi.videoProjection.update(o);
    fdapi.videoProjection.focus(o.id, 50);
}

function test_vp_focus() {
    fdapi.videoProjection.focus('vp1', 100);
}

function test_vp_show() {
    fdapi.videoProjection.show('vp1');
}

function test_vp_hide() {
    fdapi.videoProjection.hide('vp1');
}

function test_vp_get() {
    fdapi.videoProjection.get('vp1');
}

function test_vp_delete() {
    fdapi.videoProjection.delete('vp1');
}

function test_vp_clear() {
    fdapi.videoProjection.clear();
}

function test_vp_setVideoURL() {
    fdapi.videoProjection.setVideoURL('vp1', HostConfig.Path + "/assets/video/video1.webm");
}

function test_vp_setLocation() {
    fdapi.videoProjection.setLocation('vp1', [492728.4375, 2491908, 68]);
}

function test_vp_setRotation() {
    fdapi.videoProjection.setRotation('vp1', [-100, 0, 0]);
}

function test_vp_setFovy() {
    fdapi.videoProjection.setFovy('vp1', 100);
}

function test_vp_setAspectRatio() {
    fdapi.videoProjection.setAspectRatio('vp1', 3);
}

function test_vp_setDistance() {
    fdapi.videoProjection.setDistance('vp1', 200);
}

function test_vp_setDepthCulling() {
    fdapi.videoProjection.setDepthCulling('vp1', false);
}

function test_vp_setFrustumColor() {
    fdapi.videoProjection.setFrustumColor('vp1', Color.Red);
}



//====================== DaHuaVideoFusion ======================

function test_dahuavf_add() {

    fdapi.daHuaVideoFusion.delete("dh001");
    let dahuavf = {
        "id": "dh001",
        "groupId": "group1",
        "userData": "车道监控",
        "labelVisible": 1,
        "serverIP": "icc-dev.hibetatest.com",
        "serverPort": "4077",
        "accessToken": "======" //鉴权token，根据ICC开放平台接口文档获取
    }
    fdapi.daHuaVideoFusion.add(dahuavf);
}

function test_dahuavf_update() {

    let dahuavf = {
        "id": "dh001",
        "groupId": "group1",
        "userData": "车道监控",
        "labelVisible": 1,
        "triggerType": 3,
        "refreshToken": "======",//刷新token，根据ICC开放平台接口文档获取
        "cameraList": [
            { "cameraId": "c001", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
            { "cameraId": "c002", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
            { "cameraId": "c003", "coordinate": [0, 0, 0], "coordinateType": 0, "projectionDis": 100, "triggerDis": 1000 },
        ]
    }
    fdapi.daHuaVideoFusion.update(dahuavf);
}

function test_dahuavf_delete() {
    fdapi.daHuaVideoFusion.delete("dh001");
}

function test_dahuavf_clear() {
    fdapi.daHuaVideoFusion.clear();
}

function test_dahuavf_focus() {
    fdapi.daHuaVideoFusion.focus({ id: "dh001", "cameraIds": ["c001", "c002", "c003"] }, 10, 1, [0, 45, 0]);
}

function test_dahuavf_show() {
    fdapi.daHuaVideoFusion.show({ id: "dh001", "cameraIds": ["c001", "c002", "c003"] });
}

function test_dahuavf_hide() {
    fdapi.daHuaVideoFusion.hide({ id: "dh001", "cameraIds": ["c001", "c002"] });
}

function test_dahuavf_get() {
    fdapi.daHuaVideoFusion.get("dh001");
}


//====================== weather ======================

function test_weather_getParams() {
    fdapi.weather.getParams();
}

function test_weather_getDateTime() {
    fdapi.weather.getDateTime();
}

function test_weather_setSunIntensity() {
    fdapi.weather.setSunIntensity(10);
}

function test_weather_setMoonIntensity() {
    fdapi.weather.setMoonIntensity(0.5);
}

function test_weather_setSunSize() {
    fdapi.weather.setSunSize(5);
}

function test_weather_setSunColor() {
    fdapi.weather.setSunColor([1, 1, 0, 1]);
}

function test_weather_setMoonSize() {
    fdapi.weather.setMoonSize(6);
}

function test_weather_setAmbientLightIntensity() {
    fdapi.weather.setAmbientLightIntensity(0.3);
}

function test_weather_setTemperature() {
    fdapi.weather.setTemperature(8500);
}

function test_weather_setShadowQuality() {
    fdapi.weather.setShadowQuality(2);
}

function test_weather_setShadowIntensity() {
    fdapi.weather.setShadowIntensity(0.5);
}

function test_weather_setShadowDistance() {
    fdapi.weather.setShadowDistance(2000);
}

function test_weather_setDateTime() {
    fdapi.weather.setDateTime(2020, 9, 9, 16, 8, false);
}


function test_weather_setRainParam() {
    //设置云层厚度
    fdapi.weather.setCloudThickness(2);
    //设置完云层厚度后才能开启雨效
    fdapi.weather.setRainParam(1, 1, 1, [0.5, 0.5, 0.5, 0.1], 0.5, 0.5);
}

function test_weather_setSnowParam() {
    //设置云层厚度
    fdapi.weather.setCloudThickness(2);
    //设置完云层厚度后才能开启雪效
    fdapi.weather.setSnowParam(1, 1, 1, [1, 1, 1, 1], 0.5, 0.5);
}

function test_weather_disableRainSnow() {
    fdapi.weather.disableRainSnow();
}

function test_weather_setFogParam() {
    fdapi.weather.setFogParam(0.1, [1, 1, 1, 1], 0.05, 10, 0.2);
}

function test_weather_setCloudDensity() {
    fdapi.weather.setCloudDensity(0.8);
}

function test_weather_setCloudThickness() {
    fdapi.weather.setCloudThickness(2);
}

function test_weather_setCloudHeight() {
    //云层高度单位：公里
    fdapi.weather.setCloudHeight(2);
}


function test_weather_setSkyVisibleMaxHeight() {
    fdapi.weather.setSkyVisibleMaxHeight(50000);
}

let __isDarkMode = false;
function test_weather_setDarkMode() {
    __isDarkMode = !__isDarkMode;
    fdapi.weather.setDarkMode(__isDarkMode);
}


function test_weather_simulateTime() {
    //10秒内模拟从9点到15点的时间变化
    fdapi.weather.simulateTime(9, 15, 10);

    //15秒内模拟从9点半到15点45的时间变化
    //fdapi.weather.simulateTime([9, 30], [15, 45], 15);
}


function test_weather_setCloudParam() {
    fdapi.weather.setCloudParam("#FFFFFF", 2, 0.5);
}

function test_weather_setLowCloud() {
    fdapi.weather.setLowCloud(0.5, 0.5, 0.25, 50, 180);
}

function test_weather_setHighCloud() {
    fdapi.weather.setHighCloud(0.5, 50, 180, 0.5, 0.5, 0.5);
}

function test_weather_setRayleighScatterCoeff() {
    fdapi.weather.setRayleighScatter(0.5);
}

function test_weather_setOceanWave() {
    let options = {
        scale: 1, //海浪整体缩放
        length: 6, //波长
        amplitude: 4.2, //振幅
        speed: 9, //运动速率
        formDensity: 0.5 //泡沫强度

    }
    fdapi.weather.setOceanWave(options);
}

function test_weather_getOceanWave() {
    fdapi.weather.getOceanWave();
}

//====================== light 光源操作  ======================

async function test_light_add() {

    //设置系统时间为晚上 灯光才会生效
    fdapi.weather.setDateTime(2022, 10, 16, 22, 11, false);

    //设置相机进入灯光范围
    fdapi.camera.set(492569.575508, 2492231.830801, 5.683483, -39.005371, -8.399526, 0);

    fdapi.light.clear();

    //点光源
    let light_1 = {
        "id": "light_1",// 光源唯一标识
        "type": 1, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点
        "color": [0, 0, 1, 1], //光源颜色
        "coordinateType": 0,//坐标系类型：0投影 1经纬度
        "rotation": [0, 0, 0],//光源角度
        "intensity": 200,//光源亮度
        "distance": 1000,//光源可视距离
        "attenuationRadius": 100000,//光源衰减半径
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    }
    await fdapi.light.add(light_1);


    //聚光灯(射灯)
    let light_2 = {
        "id": "light_2",// 光源唯一标识
        "type": 2, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[492571.875, 2492234.75, 8]],//光源位置坐标
        "color": [1, 0, 0, 1], //光源颜色
        "coordinateType": 0,//坐标系类型：0投影 1经纬度
        "rotation": [0, 0, 0],//光源角度
        "intensity": 200,//光源亮度
        "distance": 1000,//光源可视距离
        "outerConAngle": 95,//聚光灯投射扇形角度，仅光源类型为聚光灯时此参数生效
        "attenuationRadius": 100,//光源衰减半径
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    };
    await fdapi.light.add(light_2);
    fdapi.camera.set(492571.784414, 2492225.354062, 2.769375, 25.300514, -80.777634, 0);

    //平面光
    let light_3 = {
        "id": "light_3",// 光源唯一标识
        "type": 3, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[492573.0625, 2492232.5, 4.0301661491394043], [492573.0625, 2492233.5, 4.0301661491394043]],//光源坐标位置 平面光位置是二维数组 两个点
        "color": [0, 1, 0, 1], //光源颜色
        "coordinateType": 0,//坐标系类型：0投影 1经纬度
        "rotation": [0, 0, 0],//光源角度
        "intensity": 200,//光源亮度
        "distance": 1000,//光源可视距离
        "attenuationRadius": 100000,//光源衰减半径
        "thickness": 2,//平面光宽度，仅光源类型为平面光时此参数生效
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    }
    await fdapi.light.add(light_3);

}

async function test_light_update() {
    //不支持修改光源类型
    let o = {
        "id": "light_1", // 光源唯一标识
        "color": [0, 1, 0, 1], //光源颜色
        "intensity": 100, //光源亮度
        "automate": false //是否根据系统时间自动开关 
    }
    await fdapi.light.update(o);
}

function test_light_focus() {
    fdapi.light.focus('light_1', 100, 1);
}

function test_light_show() {
    fdapi.light.show('light_1');
}

function test_light_showAll() {
    fdapi.light.showAll();
}

function test_light_hideAll() {
    fdapi.light.hideAll();
}

function test_light_hide() {
    fdapi.light.hide(['light_1', 'light_2']);
}

function test_light_clear() {
    fdapi.light.clear();
}

function test_light_delete() {
    fdapi.light.delete(['light_1', 'light_2']);
}

function test_light_get() {
    fdapi.light.get('light_1');
}


//有限元分析
async function test_finiteElement_add() {

    fdapi.finiteElement.delete(['fe_1']);
    //有限元文件资源目录
    let dataPath = HostConfig.Path + "/assets/finiteElement/";
    //有限元分析对象
    let fe1 = {
        "id": "fe_1",
        "dataPath": dataPath, //有限元文件资源目录
        "coordinate": [
            493155.46875, 2492133.6, 100
        ],
        "rotation": [
            0,
            0,
            0
        ],
        "type": 10,
        "valueRange": [
            -0.348057,
            0.0360363
        ],
        "showLine": true,//显隐等值线
        "showColorLine": false,//是否显示成彩色线
        "contourParams": [
            [0.08333391912850335, 0.006], //等值线的位置，第二个参数是线宽。
            [0.16666783825700687, 0.006],
            [0.2500017573855102, 0.006],
            [0.3333330729799244, 0.006],
            [0.41666699210842784, 0.006],
            [0.5000009112369311, 0.003],
            [0.5833348303654347, 0.003],
            [0.6666669270200756, 0.003],
            [0.7500003254417611, 0.003],
            [0.8333334635100378, 0.003],
            [0.9166668358963824, 0.0007]
        ],
        "sections": [{
            "index": 0,
            "visible": true
        }, {
            "index": 1,
            "visible": true
        }],
        "colors": {
            "file": dataPath + "colorMap.png"
        }
    };
    await fdapi.finiteElement.add(fe1);
    fdapi.finiteElement.focus('fe_1');
}

async function test_finiteElement_update() {
    //有限元文件资源目录
    let dataPath = HostConfig.Path + "/assets/finiteElement/";
    //有限元分析对象1
    let fe1 = {
        "id": "fe_1",
        "type": 8,
        "rotation": [
            0,
            90,
            0
        ],
        "colors": {
            "file": dataPath + "colorMap.png"
        }
    };
    await fdapi.finiteElement.update(fe1);
}

function test_finiteElement_delete() {
    fdapi.finiteElement.delete(['fe_1']);
}

function test_finiteElement_clear() {
    fdapi.finiteElement.clear();
}

function test_finiteElement_focus() {
    fdapi.finiteElement.focus('fe_1');
}

function test_finiteElement_show() {
    fdapi.finiteElement.show(['fe_1']);
}

function test_finiteElement_hide() {
    fdapi.finiteElement.hide(['fe_1']);
}

function test_finiteElement_get() {
    fdapi.finiteElement.get(['fe_1']);
}


//======================有限元分析2======================


async function test_finiteElement2_add_arrow() {


    let min = 2.80;
    let max = 4.12;
    let diff = (max - min) / 10;
    let colorStops = [
        {
            "value": min,
            "color": [0, 0, 1, 1]
        },
        {
            "value": min + diff,
            "color": [0, 93 / 255, 1, 1]
        }, {
            "value": min + diff * 2,
            "color": [0, 185 / 255, 1, 1]
        }, {
            "value": min + diff * 3,
            "color": [0, 1, 232 / 255, 1]
        }, {
            "value": min + diff * 4,
            "color": [0, 1, 139 / 255, 1]
        }, {
            "value": min + diff * 5,
            "color": [0, 1, 46 / 255, 1]
        }, {
            "value": min + diff * 6,
            "color": [139 / 255, 1, 0, 1]
        }, {
            "value": min + diff * 7,
            "color": [232 / 255, 1, 0, 1]
        }, {
            "value": min + diff * 8,
            "color": [1, 185 / 255, 0, 1]
        }, {
            "value": min + diff * 9,
            "color": [1, 93 / 255, 0, 1]
        }, {
            "value": min + diff * 10,
            "color": [1, 0, 0, 1]
        }
    ]

    fdapi.finiteElement2.clear();
    //有限元分析对象2
    let fe2 = {
        "id": "fe_2",
        "filePath": HostConfig.Path + "/assets/vtk/compress.vtu",//vtu文件路径
        "location": [493126.241875, 2492054.3999609374, 3],
        "rotation": [0, 0, 0],
        "collision": true,
        "showMesh": true,
        "edge": {
            "type": 1,
            "featureAngel": 30,
            "color": [0.1, 0.1, 0.1, 0.65]
        },
        "arrow": {
            "vectorField": "nodevelocity",
            "lengthScale": 0.1,
            "sizeScale": 0.1,
            "colorField": "nodevelocity",
            "colorComponent": "Y"
        },
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": colorStops
        },

    };
    await fdapi.finiteElement2.add(fe2);
    fdapi.finiteElement2.focus('fe_2');

}

async function test_finiteElement2_add() {

    let min = -0.133858
    let max = 0.00677916
    let diff = (max - min) / 10;
    let colorStops = [
        {
            "value": min,
            "color": [0, 0, 1, 1]
        },
        {
            "value": min + diff,
            "color": [0, 93 / 255, 1, 1]
        }, {
            "value": min + diff * 2,
            "color": [0, 185 / 255, 1, 1]
        }, {
            "value": min + diff * 3,
            "color": [0, 1, 232 / 255, 1]
        }, {
            "value": min + diff * 4,
            "color": [0, 1, 139 / 255, 1]
        }, {
            "value": min + diff * 5,
            "color": [0, 1, 46 / 255, 1]
        }, {
            "value": min + diff * 6,
            "color": [139 / 255, 1, 0, 1]
        }, {
            "value": min + diff * 7,
            "color": [232 / 255, 1, 0, 1]
        }, {
            "value": min + diff * 8,
            "color": [1, 185 / 255, 0, 1]
        }, {
            "value": min + diff * 9,
            "color": [1, 93 / 255, 0, 1]
        }, {
            "value": min + diff * 10,
            "color": [1, 0, 0, 1]
        }
    ]

    fdapi.finiteElement2.clear();
    //有限元分析对象2
    let fe2 = {
        "id": "fe_2",
        "filePath": HostConfig.Path + "/assets/vtk/finiteElement2.vtk",//vtk文件路径
        "location": [493071.733125, 2492216.8000000003, 150],
        "rotation": [0, 90, 0],
        "collision": true,
        "showMesh": true,
        "edge": {
            "type": 1,
            "featureAngel": 30,
            "color": [0.1, 0.1, 0.1, 0.65]
        },
        "pointField": {
            "field": "U",
            "component": "D3" //可选
        },
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": colorStops
        },
    };
    await fdapi.finiteElement2.add(fe2);
    //添加耗时 延迟5s定位
    setTimeout(function () {
        fdapi.finiteElement2.focus('fe_2');
    }, 5000);

}

function test_finiteElement2_applyThresholdFilter() {
    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //根据区间字段过滤
    fdapi.finiteElement2.applyThresholdFilter({
        id: "fe_2",
        filterId: "filter1",
        fieldName: "E_Mises",
        component: "E_Mises",
        range: [0, 0.003]

    });
}


function test_finiteElement2_applyContourFilter() {
    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //根据等值线/面过滤
    fdapi.finiteElement2.applyContourFilter({
        id: "fe_2",
        filterId: "filter2",
        fieldName: "E_Mises",
        contourValues: [0, 0.001, 0.002]
    });

}

function test_finiteElement2_applyPlaneClipFilter() {
    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //按面过滤
    fdapi.finiteElement2.applyPlaneClipFilter({
        "id": "fe_2",
        "filterId": "filter3",
        "clipNormal": [1, 0, 0],
        "clipOrigin": [493104.82, 2492261.7600000002, 143.5202734375],
        "crinkleClip": false,
        "invertClip": true
    });
}

function test_finiteElement2_applyBoxClipFilter() {
    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //按盒子范围过滤
    fdapi.finiteElement2.applyBoxClipFilter({
        "id": "fe_2",
        "filterId": "filter4",
        "clipBBox": [493062.5725, 2492167.255, 117.1850439453125, 493124.398125, 2492192.105, 153.7712841796875],
        "clipRotation": [0, 0, 0],
        "crinkleClip": false,
        "invertClip": true
    });

}

function test_finiteElement2_applySphereClipFilter() {
    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //按球体过滤
    fdapi.finiteElement2.applySphereClipFilter({
        "id": "fe_2",
        "filterId": "filter5",
        "clipOrigin": [493102.69875, 2492223.52, 140],
        "clipRadius": 22,
        "crinkleClip": false,
        "invertClip": true
    });
}

function test_finiteElement2_applyCylinderClipFilter() {

    //清空过滤器
    fdapi.finiteElement2.clearFilter("fe_2");
    //按圆柱体过滤
    fdapi.finiteElement2.applyCylinderClipFilter({
        "id": "fe_2",
        "filterId": "filter6",
        "clipOrigin": [493110.26125, 2492224.32, 140],
        "clipRadius": 10,
        "clipAxis": [0, 1, 0],
        "crinkleClip": false,
        "invertClip": true
    });
}

function test_finiteElement2_removeFilter() {
    fdapi.finiteElement2.removeFilter({ id: "fe_2", filterIds: ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6"] });
}

function test_finiteElement2_clearFilter() {
    fdapi.finiteElement2.clearFilter("fe_2");
}

async function test_finiteElement2_update() {
    //有限元分析对象
    let fe2 = {
        "id": "fe_2",
        "edge": {
            "type": 2,
            "featureAngel": 30,
            "color": [0.1, 0, 1, 0.1, 1]
        }

    };
    await fdapi.finiteElement2.update(fe2);
}

function test_finiteElement2_focus() {
    fdapi.finiteElement2.focus(['fe_2']);
}


function test_finiteElement2_delete() {
    fdapi.finiteElement2.delete(['fe_2']);
}

function test_finiteElement2_clear() {
    fdapi.finiteElement2.clear();
}

function test_finiteElement2_focus() {
    fdapi.finiteElement2.focus('fe_2');
}

function test_finiteElement2_show() {
    fdapi.finiteElement2.show(['fe_2']);
}

function test_finiteElement2_hide() {
    fdapi.finiteElement2.hide(['fe_2']);
}

function test_finiteElement2_get() {
    fdapi.finiteElement2.get(['fe_2']);
}

//============================Fluid 流体仿真======================
function test_fluid_add() {

    let bbox = [489521.4, 2490091.04, 5, 490561.35000000003, 2490878.4, 33]
    fdapi.fluid.delete('ff');
    let fluid = {
        "id": "ff",
        "bbox": bbox,
        "style": 8,
        "sources": [
            {
                "id": "ff_1",
                "rotation": [0, 0, 0],
                "bbox": [490211.933125, 2490391.52, 15, 490221.85625, 2490431.04, 33],
                "velocity": [
                    0,
                    0
                ],
                "shape": 0,
                "duration": -1
            }
        ]
    };
    fdapi.fluid.add(fluid);
    fdapi.fluid.focus(fluid.id, 100, 2);

    //开始水体仿真
    let data = [{
        id: "ff",
        "sources": [
            {
                "id": "ff_1",
                "active": true,
            }]
    }];
    fdapi.fluid.continueSource(data);
}
function test_fluid_update() {

    let fluid = {
        "id": "ff",
        "active": false,
        "sources": [
            {
                "id": "ff_1",
                "active": false
            },
            {
                "id": "ff_2",
                "active": false
            }
        ]
    };
    fdapi.fluid.update(fluid);

}
function test_fluid_pause() {
    fdapi.fluid.pause('ff');
}
function test_fluid_continue() {
    fdapi.fluid.continue('ff');
}
function test_fluid_reset() {
    fdapi.fluid.reset('ff');
}
function test_fluid_addSource() {
    let data = [{
        "id": "ff",
        "sources": [
            {
                "id": "ff_2",
                "rotation": [0, 45, 0],
                "bbox": [490180.53125, 2490678.5, 22, 490221.34375, 2490719.25, 34],
                "velocity": [
                    0,
                    0
                ],
                "shape": 1,
                "duration": -1
            }
        ]
    }]
    fdapi.fluid.addSource(data);

    //执行新的出水点
    let sourcePlay = [{
        id: "ff",
        "sources": [
            {
                "id": "ff_1",
                "active": false, //关闭出水点
            }, {
                "id": "ff_2",
                "active": true,
            },]
    }];
    fdapi.fluid.continueSource(sourcePlay);
}
function test_fluid_continueSource() {
    let data = [{
        id: "ff",
        "sources": [
            {
                "id": "ff_1",
                "active": true,
            }, {
                "id": "ff_2",
                "active": true,
            },]
    }];
    fdapi.fluid.continueSource(data);
}
function test_fluid_stopSource() {
    let data = [{
        id: "ff",
        "sources": [
            {
                "id": "ff_1",
                "active": false,
            },
            {
                "id": "ff_2",
                "active": false,
            }]
    }];
    fdapi.fluid.stopSource(data);
}
function test_fluid_removeSource() {
    let data = [{
        id: "ff",
        sourceIds: ["ff_1", "ff_2"]
    }];
    fdapi.fluid.removeSource(data);
}
function test_fluid_delete() {
    fdapi.fluid.delete('ff');
}
function test_fluid_focus() {
    fdapi.fluid.focus('ff');
}
function test_fluid_show() {
    fdapi.fluid.show('ff');
}
function test_fluid_hide() {
    fdapi.fluid.hide('ff');
}
function test_fluid_get() {
    fdapi.fluid.get('ff');
}
function test_fluid_clear() {
    fdapi.fluid.clear();
}

//====================== SmoothedParticleHydrodynamics ======================
function test_smoothedParticleHydrodynamics_add_vtk() {
    fdapi.smoothedParticleHydrodynamics.delete('sph');
    let sph =
    {
        "id": "sph",
        "origin": [
            0,
            0,
            0
        ],
        "style": 0,//0热力 流体1~4
        "duration": 30,
        "play": true, //默认播放
        "loop": true,
        "files": [
            HostConfig.Path + "/assets/bin/sph/" + "1.vtk",
            HostConfig.Path + "/assets/bin/sph/" + "2.vtk",
            HostConfig.Path + "/assets/bin/sph/" + "3.vtk",
            HostConfig.Path + "/assets/bin/sph/" + "4.vtk",
            HostConfig.Path + "/assets/bin/sph/" + "5.vtk",
            HostConfig.Path + "/assets/bin/sph/" + "6.vtk",
        ],
        "heatValueFieldName": "Rhop",
        "idFieldName": "Idp",
        "particleNumSides": 2,
        "particle": {
            "thickness": 0.02,
            "radius": 15
        },
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [
                        0,
                        0,
                        1,
                        1
                    ]
                },
                {
                    "value": 5,
                    "color": [
                        0,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 10,
                    "color": [
                        1,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 15,
                    "color": [
                        1,
                        0.5,
                        0,
                        1
                    ]
                },
                {
                    "value": 20,
                    "color": [
                        1,
                        0,
                        0,
                        1
                    ]
                }
            ]
        }
    }
    fdapi.smoothedParticleHydrodynamics.addByVtk(sph);
    fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);
}
function test_smoothedParticleHydrodynamics_add_bin() {
    fdapi.smoothedParticleHydrodynamics.delete('sph');
    let sph =
    {
        "id": "sph",
        "origin": [
            0,
            0,
            0
        ],
        "style": 0,//0热力 流体1~4
        "duration": 30,
        "play": true, //默认播放
        "loop": true,
        "files": [
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00000000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00010000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00020000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00030000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00040000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00050000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00060000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00070000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00080000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00090000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00110000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00120000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00130000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00140000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00150000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00160000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00170000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00180000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00190000.bin",
            HostConfig.Path + "/assets/bin/sph/" + "SPHGra00200000.bin",
        ],
        //"particleNumSides": 2,
        "particle": {
            "thickness": 0.02,
            "radius": 15
        },
        "colors": {
            "gradient": false,
            "invalidColor": [1, 1, 1, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [
                        0,
                        0,
                        1,
                        1
                    ]
                },
                {
                    "value": 5,
                    "color": [
                        0,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 10,
                    "color": [
                        1,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 15,
                    "color": [
                        1,
                        0.5,
                        0,
                        1
                    ]
                },
                {
                    "value": 20,
                    "color": [
                        1,
                        0,
                        0,
                        1
                    ]
                }
            ]
        }
    }
    fdapi.smoothedParticleHydrodynamics.addByBin(sph);
    fdapi.smoothedParticleHydrodynamics.focus('sph', 1000);
}

function test_smoothedParticleHydrodynamics_update() {
    let sph = {
        "id": "sph",
        "play": false, //暂停播放
        "particle":
        {
            "thickness": 0.2,
            "radius": 30
        }
    }
    fdapi.smoothedParticleHydrodynamics.update(sph);
}


function test_smoothedParticleHydrodynamics_delete() {
    fdapi.smoothedParticleHydrodynamics.delete('sph');
}
function test_smoothedParticleHydrodynamics_focus() {
    fdapi.smoothedParticleHydrodynamics.focus('sph');
}
function test_smoothedParticleHydrodynamics_show() {
    fdapi.smoothedParticleHydrodynamics.show('sph');
}
function test_smoothedParticleHydrodynamics_hide() {
    fdapi.smoothedParticleHydrodynamics.hide('sph');
}
function test_smoothedParticleHydrodynamics_get() {
    fdapi.smoothedParticleHydrodynamics.get('sph');
}
function test_smoothedParticleHydrodynamics_clear() {
    fdapi.smoothedParticleHydrodynamics.clear();
}



//====================== floodFill ======================

async function test_floodFill_add() {
    fdapi.floodFill.clear();
    let o = {
        id: 'fd1',
        min: [494023.875, 2491299.75],//水淹分析范围min
        max: [494564.21875, 2491845.5],//水淹分析范围max
        seed: [494084.9, 2491641],//出水点 注意：出水点一定要在水淹分析范围[min~max]内，否则接口会报错
        elevation: 2.5,//水位高度
        color: Color.LightSeaGreen,//水颜色
        precision: 0.5 //水淹模拟精度
    }
    await fdapi.floodFill.add(o);
    fdapi.floodFill.focus(o.id);
}

async function test_floodFill_update() {
    let o = {
        id: 'fd1',
        min: [495119.875, 2491031.25],
        max: [495386.625, 2491245.5],
        seed: [495304.9, 2491041],
        elevation: 2.5,
        color: Color.DarkSeaGreen,
        precision: 0.25
    }
    await fdapi.floodFill.update(o);
    fdapi.floodFill.focus(o.id);
}

function test_floodFill_delete() {
    fdapi.floodFill.delete('fd1');
}

function test_floodFill_clear() {
    fdapi.floodFill.clear();
}

function test_floodFill_focus() {
    fdapi.floodFill.focus('fd1', 100);
}

function test_floodFill_show() {
    fdapi.floodFill.show('fd1');
}

function test_floodFill_showAll() {
    fdapi.floodFill.showAll();
}

function test_floodFill_hide() {
    fdapi.floodFill.hide('fd1');
}

function test_floodFill_hideAll() {
    fdapi.floodFill.hideAll();
}

function test_floodFill_get() {
    fdapi.floodFill.get('fd1');
}


//====================== cesium3DTileset ======================

async function test_cesium3DTileset_add() {
    fdapi.cesium3DTileset.clear();
    let o = {
        id: 'fd1',
        offset: [0, 0, 0], //偏移
        enableLighting: false, //可选，服务是否参与光照，默认值：true
        tileURL: '' //cesium3DTileset服务地址 请先替换参数
    };
    //注意：此add方法需要网络加载耗时 
    //await fdapi.cesium3DTileset.add(o);
    //延时1s执行focus
    //window.setTimeout(focus,1000);

    function focus() {
        fdapi.cesium3DTileset.focus(o.id);
    }

}

async function test_cesium3DTileset_update() {
    let o = {
        id: 'fd1',
        tileURL: '' //cesium3DTileset服务地址
    }
    //await fdapi.cesium3DTileset.update(o);
    //fdapi.cesium3DTileset.focus(o.id);
}

function test_cesium3DTileset_delete() {
    fdapi.cesium3DTileset.delete('fd1');
}

function test_cesium3DTileset_clear() {
    fdapi.cesium3DTileset.clear();
}

function test_cesium3DTileset_focus() {
    fdapi.cesium3DTileset.focus('fd1');
}

function test_cesium3DTileset_show() {
    fdapi.cesium3DTileset.show('fd1');
}

function test_cesium3DTileset_showAll() {
    fdapi.cesium3DTileset.showAll();
}

function test_cesium3DTileset_hide() {
    fdapi.cesium3DTileset.hide('fd1');
}

function test_cesium3DTileset_hideAll() {
    fdapi.cesium3DTileset.hideAll();
}

function test_cesium3DTileset_get() {
    fdapi.cesium3DTileset.get('fd1');
}


//====================== ImageryLayer ======================

async function test_imageryLayer_init() {
    let option = {
        xmlUrl: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/WMTS/1.0.0/WMTSCapabilities.xml',//必选，xml协议的url路径
        layerName: 'shenzhenmapV10x',//必选，图层名称
        tileMatrixName: 'default028mm',//必选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型
        ogcEPSG: 'EPSG:4547',//必选，坐标系类型
        cachePath: ':memory:',//必选，默认缓存路径
        mapMode: true,//必选，大地图true，小地图false
        renderMode: 0 // 必选，渲染模式，取值范围：0：正常（默认值）；1：透明；2：标注；3：贴地
    };
    //await fdapi.imageryLayer.init(option);
}

async function test_imageryLayer_add() {
    //以下代码为内网示例服务地址 请先修改为自己需调用的真实地址
    let arr = [];
    let wmts1 = {
        id: 'wmts1',
        url: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}'
    }
    arr.push(wmts1);
    let wmts2 = {
        id: 'wmts2',
        url: 'https://192.168.1.19:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}'
    }
    arr.push(wmts2);
    //fdapi.imageryLayer.add(arr);


    //example2 图层支持叠加 无需init直接添加 需指定相关可选参数 
    let wmts3 = {
        id: 'wmts3',
        url: 'https://192.168.1.19:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/tile/{z}/{y}/{x}',
        xmlPath: 'https://192.168.1.18:6443/arcgis/rest/services/shenzhenmapV10x/MapServer/WMTS/1.0.0/WMTSCapabilities.xml',//必选，xml协议的url路径
        layerName: 'shenzhenmapV10x',//必选，图层名称
        tileMatrixName: 'default028mm',//必选，如果服务类型是WMTS：tileMatrixName是切片方案，如果服务类型是WMS：tileMatrixName是坐标类型
        ogcEPSG: 'EPSG:4547',//必选，坐标系类型
    };
    //fdapi.imageryLayer.add(wmts3);
}


async function test_imageryLayer_setDrawOrder() {
    fdapi.imageryLayer.setDrawOrder("wmts3", "wmts1");
}

async function test_imageryLayer_setDrawTop() {
    fdapi.imageryLayer.setDrawTop("wmts2");
}

async function test_imageryLayer_setDrawBottom() {
    fdapi.imageryLayer.setDrawBottom("wmts1");
}

async function test_imageryLayer_show() {
    fdapi.imageryLayer.show(['wmts1', 'wmts2']);
}

async function test_imageryLayer_focus() {
    fdapi.imageryLayer.focus('wmts1');
}

async function test_imageryLayer_hide() {
    fdapi.imageryLayer.hide(['wmts1', 'wmts2']);
}

async function test_imageryLayer_delete() {
    fdapi.imageryLayer.delete(['wmts1', 'wmts2']);
}


async function test_imageryLayer_addVTPK() {
    //图层上上VTPK的ID
    let tileLayerId = "";
    //fdapi.imageryLayer.addVTPK(tileLayerId);
}

async function test_imageryLayer_deleteVTPK() {
    //图层上上VTPK的ID
    let tileLayerId = "";
    //fdapi.imageryLayer.deleteVTPK(tileLayerId);
}

async function test_imageryLayer_setVTPKVisable() {
    //图层上上VTPK的ID
    let tileLayerId = "";
    //fdapi.imageryLayer.setVTPKVisable(tileLayerId,false);
}

//车辆添加压力测试
async function test_stress_add_customObject_3000() {
    //模拟车辆移动 每间隔1秒移动一次
    fdapi.camera.set(492035.37, 2488806.75, 402.62, -15.0, -173.0, 0.2);
    clearScreen();
    fdapi.customObject.clear();
    var __gps_pos2 = [];
    var oa = [];
    var oaIdArr = [];
    for (let i = 0; i < 3000; i++) {
        let x = 484949 + Math.round(Math.random() * 10188);
        let y = 2483100 + Math.round(Math.random() * 10092);
        __gps_pos2 = [x, y, 6.34];
        let o = {
            id: 'co1' + i,
            pakFilePath: '@path:DTS_Library.pak',
            assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',
            location: __gps_pos2,
            rotation: [0, 0, 0],
            scale: [10, 10, 10],
            smoothMotion: 1,    //1: 平滑插值，0: 跳跃
            coordinateType: 0   //设置坐标系：0(Projection), 1(WGS84)

        }
        oaIdArr.push('co1' + i);
        oa.push(o);
    }
    await fdapi.customObject.add(oa);
    //设置相机跟随
    //await fdapi.customObject.focus("co11", -1);

    //更新车辆位置
    setInterval(async () => {
        fdapi.customObject.updateBegin();

        for (let i = 0; i < 3000; i++) {
            let x = 484949 + Math.round(Math.random() * 10188);
            let y = 2483100 + Math.round(Math.random() * 10092);
            let pos2 = [x, y, 6.34];
            fdapi.customObject.setLocation('co1' + i, pos2)
        }

        fdapi.customObject.updateEnd();

    }, 1000);
}


//无人机添加压力测试
async function test_stress_add_drone_3000() {

    //设置后期 泛光 减少灯光秀光晕
    fdapi.settingsPanel.setPostProcessMode({ bloomIntensity: 0.1 });

    //设置夜晚 展示灯光秀 
    fdapi.weather.setDateTime(2025, 12, 25, 22, 0, false);

    //性能测试总无人机数量
    let count = 3000;
    //飞行时间 单位：秒
    let flyTime = 120;

    //添加count架无人机
    await fdapi.drone.clear();
    let basePoint = [492857.634375, 2495481.34859375, 280]
    let droneArr = [];
    let baseArr = [];
    for (let i = 0; i < count; i++) {
        let base = [basePoint[0] + Math.random() * 1000, basePoint[1] + Math.random() * 1000, basePoint[2] + 10 * Math.random()];
        baseArr.push(base);
        let drone = {
            "id": "drone" + i,
            "coordinateType": 0,
            "coordinate": base,
            "assetPath": "/JC_CustomAssets/UAVLibrary/Exhibition/UAV_1",
            "rotation": [0, 0, 0],
            "localOffset": [0, 0, 0],
            "scale": [3, 3, 3], //模型缩放
            "visible": 1,
            "trailType": 3, //0:无轨迹 1：拖尾效果 2：条带效果 3：圆点虚线效果 4：方块虚线效果，默认值：0
            "trailColor": [Math.random(), Math.random(), Math.random(), 1],//轨迹线颜色
            "trailDuration": 3, //轨迹线持续时长
            "lightColor": [Math.random(), Math.random(), Math.random(), 1],//灯光秀颜色
            "label": {
                "visible": true,//标牌可见性
                "offset": [0, 0, 0],//标牌偏移
                "cullDistance": 100, // 剔除距离
                "text": "空A " + Math.round(Math.random() * 1000000) //标牌显示的文字
            }
        };
        droneArr.push(drone);
    }
    fdapi.drone.add(droneArr);
    fdapi.camera.set(493121.119063, 2496063.320313, 244.296328, 0, 0, 0);
    //  fdapi.drone.focus('drone0');
    //设置相机跟随
    //   fdapi.drone.focus('drone'+0, true, 12,2, 20, 10, [0, 0, 0], 0.02);

    let index = 0;
    let currTime = new Date().getTime();
    let timer = setInterval(function () {
        index++;
        let time = currTime + 1000 * index;
        //运动时间
        if (index < flyTime) {
            let moveArr = []
            //无人机初始点
            for (let i = 0; i < baseArr.length; i++) {
                let startPoint = baseArr[i];
                moveArr.push({
                    "id": "drone" + i,
                    "coordinate": [startPoint[0] + Math.random() * 50, startPoint[1] + Math.random() * 50, 280],
                    "time": time,
                    "rotation": [0, 0, 0]
                });
            }
            fdapi.drone.moveTo(moveArr);
        }
        else {
            //清除定时器 
            clearInterval(timer);
            //取消相机跟随
            fdapi.camera.cancelFollow();
        }
    }, 1000);



}


//一次性创建3000个ODLine
async function test_stress_odline_creat() {
    fdapi.camera.set(491433.65625, 2486907.5, 685.200928, -39.472763, -64.888329, 0);
    fdapi.odline.clear();
    let odArr = [];
    for (let i = 0; i < 3000; i++) {
        let od = {
            id: 'od_' + i,//ODLine唯一标识
            color: Color.Green,//填充颜色
            coordinates: [[492303 + Math.random() * 1000, 2487534 + Math.random() * 1000, 4.195], [491391 + Math.random() * 1000, 2487777 + Math.random() * 1000, 4.2]],//构成ODLine的坐标点数组
            flowRate: 1,//流速
            intensity: 1,//亮度
            bendDegree: 0.5,//弯曲度
            tiling: 0.5,//材质贴图平铺比例
            lineThickness: 15,//折线宽度
            flowPointSizeScale: 30,//运动点的缩放值
            labelSizeScale: 1000,//两端点的缩放值

            lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
            lineStyle: 0,  //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
            flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0

            startPointShape: 1,//点的样式
            endPointShape: 1,//点的样式
            startLabelShape: 1,//点的样式
            endLabelShape: 1//点的样式
        };
        odArr.push(od);
    }
    await fdapi.odline.add(odArr);
    fdapi.odline.focus('od_1');
}

//====================== 压力测试 ======================

async function test_stress_add_3000_markers() {
    clearScreen();
    await fdapi.marker.clear();
    await fdapi.camera.set(491757.5625, 2490132.25, 126.055817, -82.87175, 178.001175, 0);

    let baseX = 491615.03;
    let baseY = 2490023.75;
    let oa = new Array();

    for (let i = 0; i < 3000; i++) {

        let x = Math.ceil(baseX + Math.random() * 500)
        let y = Math.ceil(baseY + Math.random() * 500)

        let o = {
            id: i,
            coordinate: [x, y, 15.0],
            range: [1, 10000],
            textRange: [1, 10000],
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            imageSize: [28, 28],
            text: i.toString(),
            lineSize: [2, 50],
            lineColor: Color.White,
            displayMode: 0
        }
        oa.push(o);
    }
    await fdapi.marker.add(oa);
}

async function test_stress_update_3000_markers() {
    fdapi.marker.updateBegin();  //updateBegin不是异步调用，不需要await

    for (let i = 0; i < 3000; i++)
        fdapi.marker.setTextBackgroundColor(i, Color.Yellow);

    await fdapi.marker.updateEnd();
    log('update finished!');
}

async function test_stress_add_1000_tags() {
    clearScreen();
    await fdapi.tag.clear();
    await fdapi.camera.set(491757.5625, 2490132.25, 126.055817, -82.87175, 178.001175, 0);

    let baseX = 491615.03;
    let baseY = 2490023.75;
    let oa = new Array();

    for (let i = 0; i < 1000; i++) {

        let x = Math.ceil(baseX + Math.random() * 200)
        let y = Math.ceil(baseY + Math.random() * 200)

        let o = {
            id: i,
            coordinate: [x, y, 15.0],
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            url: HostConfig.Path + '/locale/zh/popup_simple.html',
            imageSize: [28, 28],
            text: i.toString(),
            textColor: Color.White,
            showLine: false
        }
        oa.push(o);
    }
    await fdapi.tag.add(oa);
}

async function test_stress_update_1000_tags() {

    fdapi.tag.updateBegin();  //updateBegin不是异步调用，不需要await

    for (let i = 0; i < 1000; i++) {
        fdapi.tag.setTextBackgroundColor(i, Color.Yellow);
        fdapi.tag.setTextColor(i, Color.Blue);
        fdapi.tag.setShowLine(i, true);
    }

    await fdapi.tag.updateEnd();
    log('update finished!');
}

async function test_stress_update_tagpos_200() {

    let o = {
        id: 't1',
        coordinate: [491274.65625, 2489124, 21.0],
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
        text: '北京银行',
        range: [1, 10000]
    }
    await fdapi.tag.clear();
    await fdapi.camera.set(492472.750000, 2487660.750000, 1637.308838, -49.619568, -93.635345, 0);
    await fdapi.tag.add(o);

    let i = 0;
    let tid = setInterval(() => {
        if (i++ > 200)
            clearInterval(tid);
        log(`${i} times`);

        o.coordinate[0] += 10;

        fdapi.tag.setCoordinate('t1', o.coordinate);
    }, 50);
}

async function test_stress_add_heatmap_3000() {
    clearInterval(__tidUpdateHeatMap);
    await fdapi.tag.clear();
    await fdapi.heatmap.clear();
    await fdapi.camera.set(490577.4375, 2489508.75, 2100.174561, -76.326889, -160.474792, 0);

    let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
    let range = [0, 100];
    let data = [];
    let pointCount = 2000;  //热力点数量
    for (let i = 0; i < pointCount; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = 0;
        let coord = [x, y, z];                 //热力点的坐标
        let radius = Math.random() * 100;           //热力点影像半径范围
        let heatValue = Math.random() * 100;        //热力值
        let o = new HeatMapPointData(`${i}`, coord, radius, heatValue);
        data.push(o);
    }

    await fdapi.heatmap.add('heatmap1', bbox, range, data);
    __tidUpdateHeatMap = setInterval(() => {
        let data = [];
        for (let i = 0; i < pointCount; i++) {
            let o = {};
            o.id = `${i}`;
            o.heatValue = Math.random() * 100;
            data.push(o);
        }

        //此处的update没有后续依赖所以不需要await
        fdapi.heatmap.update('heatmap1', null, null, data);
    }, 1000);
}

async function test_stress_add_800_polygon() {
    await fdapi.polygon.clear();
    await fdapi.polygon.add({
        id: 'p800',
        coordinates: __coords800,
        color: Color.Yellow,
        frameColor: Color.Blue,
        frameThickness: 500
    });
    fdapi.polygon.focus('p800')
}

async function test_stress_add_800_3dpolygon() {
    let o = {
        id: 'p800',
        coordinates: __coords800,
        color: [1, 0, 1, 1],   //颜色值
        height: 5000,           //3D多边形的高度
        intensity: 4.0,        //亮度
        style: 1                //3DPolygon的样式
    }
    await fdapi.polygon3d.clear();
    await fdapi.polygon3d.add(o);
    fdapi.polygon3d.focus('p800');
}

async function test_stress_add_10000_polygon() {
    await fdapi.polygon.clear();
    await fdapi.polygon.add({
        id: 'p1w',
        coordinates: __coords1w,
        color: Color.Blue,
        frameColor: Color.Red,
        frameThickness: 500
    });
    fdapi.polygon.focus('p1w');
}

async function test_stress_add_10000_3dpolygon() {
    let o = {
        id: 'p1w',
        coordinates: __coords1w,
        color: Color.Blue,     //颜色值
        height: 5000,          //3D多边形的高度
        intensity: 4.0,        //亮度
        style: 1                //3DPolygon的样式
    }
    await fdapi.polygon3d.clear();
    await fdapi.polygon3d.add(o);
    fdapi.polygon3d.focus('p1w');
}

async function test_stress_polygon_from_geojson() {
    await fdapi.polygon.clear();

    let count = zoneBoundary.geometries.length;
    for (let i = 0; i < count; i++) {
        fdapi.polygon.add({
            id: i,
            coordinates: zoneBoundary.geometries[i].coordinates[0],
            color: Color.Yellow,
            frameColor: Color.Red,
            frameThickness: 500
        });

        if (i == 0)
            fdapi.polygon.focus(0);
    }
}

async function test_stress_3dpolygon_from_geojson(fn) {
    await fdapi.polygon3d.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        let o = {
            id: i,
            coordinates: zoneBoundary.geometries[i].coordinates[0],
            color: [Math.random(), Math.random(), Math.random(), 1],     //颜色值
            height: 8000,          //3D多边形的高度
            intensity: 4.0,        //亮度
            style: i % 9           // 3DPolygon的样式
        }
        oa.push(o);
    }
    await fdapi.polygon3d.add(oa);
    await fdapi.polygon3d.focus(0, 0);
    if (fn)
        fn(oa);
}

function test_stress_polyline_show_hide_frequently() {

    fdapi.polyline.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        let o = new PolylineData(i);
        o.coordinates = zoneBoundary.geometries[i].coordinates[0];
        o.color = Color.Red
        o.style = 2;
        o.thickness = 1000;
        o.intensity = 1;
        o.flowRate = 0.5;
        oa.push(o);
    }
    fdapi.polyline.add(oa, function () {
        fdapi.polyline.focus(0, 0, () => {
            alert('Polyline创建完成，点击OK开始显隐测试');
            for (let i = 0; i < 100; i++) {
                for (let o of oa) {
                    if (i % 2 == 0)
                        fdapi.polyline.show(o.id);
                    else
                        fdapi.polyline.hide(o.id);
                }
            }
        });
    });
}

function test_stress_polygon_show_hide_frequently() {
    fdapi.polygon.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        oa.push({
            id: i,
            color: Color.Blue,
            coordinates: zoneBoundary.geometries[i].coordinates[0],
            frameColor: Color.Red,
            frameThickness: 500
        });
    }
    fdapi.polygon.add(oa, function () {
        fdapi.polygon.focus(0, 0, () => {
            alert('Polygon创建完成，点击OK开始显隐测试');
            for (let i = 0; i < 100; i++) {
                for (let o of oa) {
                    if (i % 2 == 0)
                        fdapi.polygon.show(o.id);
                    else
                        fdapi.polygon.hide(o.id);
                }
            }
        });
    });
}

function test_stress_3dpolygon_show_hide_frequently() {
    test_stress_3dpolygon_from_geojson(function (oa) {
        alert('3DPolygon创建完成，点击OK开始显隐测试');
        for (let i = 0; i < 100; i++) {
            for (let o of oa) {
                if (i % 2 == 0)
                    fdapi.polygon3d.show(o.id);
                else
                    fdapi.polygon3d.hide(o.id);
            }
        }
    });
}

function test_stress_3dpolygon_show_hide_frequently2() {
    let i = 0;
    test_polygon3d_add(function () {
        test_polygon3d_focus();
        setInterval(() => {
            if (++i % 2)
                test_polygon3d_hide();
            else
                test_polygon3d_show();
        }, 500);
    });
}

async function test_stress_callback_frequently() {

    for (let i = 0; i < 10; i++) {
        let res = await fdapi.camera.get();
        let str = `get camera callback, callbackIndex: ${res.callbackIndex}`;
        log(str);
    }
}

function test_stress_playVideo_frequently() {
    let isfirst = true;

    setInterval(function () {

        for (let i = 0; i < 3; i++) {
            if (!isfirst)
                fdapi.misc.stopPlayVideo('test' + i);

            fdapi.misc.playVideo('test' + i, 400 * i, 0, 400, 300, 'rtsp://192.168.1.4:555/live');
            isfirst = false;
        }
    }, 3000);
}

function test_stress_add_update_delete_3dpolygon() {
    //频繁添加修改删除3DPolygon
    fdapi.camera.set(488673.28125, 2494341.75, 1381.636353, -36.11198, 78.878166, 0);
    setInterval(function () {
        fdapi.polygon3d.clear(() => {
            test_polygon3d_add(test_polygon3d_update)
        })
    }, 100);
}

function test_stress_cameratour_1000_keyframes() {
    //CameraTour添加1000个关键帧
    let frames = [];

    let x = 0;
    let y = 0;
    for (let i = 0; i < 1000; i++) {
        frames.push(new CameraTourKeyFrame(i, i, [x + 10, y + 10, 5.5], [-55, -60, 0]));
    }
    let o = new CameraTourData('cameraTour1', 'test', frames);
    fdapi.cameraTour.add(o);
}

async function test_stress_disable_callback() {
    log('100次API调用开始...');
    let t1 = new Date().getTime();
    for (let i = 0; i < 100; i++) {
        fdapi.settings.setMainUIVisibility(false, null);
        //下面是启用回调的代码，可以对比一下
        //await fdapi.settings.setMainUIVisibility(false);
    }
    let t2 = new Date().getTime();
    log('100次API调用开始! 总共耗时：' + (t2 - t1));
}

async function test_stress_api_queue() {

    await fdapi.marker.clear();
    await fdapi.camera.set(491757.5625, 2490132.25, 126.055817, -82.87175, 178.001175, 0);

    let baseX = 491615.03;
    let baseY = 2490023.75;

    for (let i = 0; i < 2000; i++) {
        let x = Math.ceil(baseX + Math.random() * 200)
        let y = Math.ceil(baseY + Math.random() * 200)
        let o = {
            id: i,
            coordinate: [x, y, 15.0],
            range: [1, 8000.0],
            textRange: 3000,
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            imageSize: [28, 28],
            popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',
            text: i.toString(),
            lineSize: [2, 50],
            lineColor: Color.Gray,
            displayMode: 0
        }
        fdapi.marker.add(o);
    }
}

function test_stress_rtc_performence() {
    fdapi.getPlayer().perfTest(10);
}


//==========================Antenna 天线方向图操作方法==========================
async function test_Antenna_add() {
    fdapi.antenna.delete('ap_1');
    let ap1 = {
        "id": "ap_1",
        "coordinate": [
            493050.98875, 2492086.08, 6
        ],
        "rotation": [
            0,
            0,
            0
        ],
        "radius": 5,
        "radiationRange": [
            -72,
            25
        ],
        "radiationOffset": [
            -5,
            5
        ],
        "grid": {
            "gridSize": [360, 181],
            "values": gain
        },
        "colors": {
            "gradient": true,
            "invalidColor": [
                0,
                0,
                0,
                1
            ],
            "colorStops": [
                {
                    "value": 0,
                    "color": [
                        0,
                        0,
                        1,
                        1
                    ]
                },
                {
                    "value": 0.25,
                    "color": [
                        0,
                        1,
                        1,
                        1
                    ]
                },
                {
                    "value": 0.5,
                    "color": [
                        0,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 0.75,
                    "color": [
                        1,
                        1,
                        0,
                        1
                    ]
                },
                {
                    "value": 1,
                    "color": [
                        1,
                        0,
                        0,
                        1
                    ]
                }
            ]
        }
    };
    await fdapi.antenna.add(ap1);
    fdapi.antenna.focus('ap_1', 100, 1);
}

async function test_Antenna_update() {

    let ap = {
        "id": "ap_1",
        "coordinate": [
            492689.085, 2492085.44, 32
        ],
    }
    await fdapi.antenna.update(ap);
    fdapi.antenna.focus('ap_1', 100, 1);
}

function test_Antenna_focus() {
    fdapi.antenna.focus('ap_1', 100, 1);
}

function test_Antenna_show() {
    fdapi.antenna.show('ap_1');
}

function test_Antenna_hide() {
    fdapi.antenna.hide('ap_1');
}

function test_Antenna_clear() {
    fdapi.antenna.clear();
}

function test_Antenna_delete() {
    fdapi.antenna.delete('ap_1');
}

function test_Antenna_get() {
    fdapi.antenna.get('ap_1');
}


//******************信号波束***********************/

function test_signalWave_add() {

    fdapi.signalWave.clear();
    let signalWave = {
        id: 'signalWave',
        groupId: 'group1',
        userData: '波束',
        alpha: 0.2,//透明度
        range: [20, 100],
        valA: [
            492894.75,
            2492212.5,
            0
        ], valB: [
            492984.56999999995,
            2492121.8,
            0
        ], valC: [
            492994.20999999996,
            2492134.01,
            0
        ], valD: [
            493003.83999999997,
            2492146.22,
            0
        ], valE: [
            492963.9,
            2492157.93,
            0
        ], valF: [
            493066.92000000004,
            2492076.63,
            0
        ], valG: [
            492894.75,
            2492212.5,
            26.93
        ]
    }
    fdapi.signalWave.add(signalWave);
    fdapi.signalWave.focus('signalWave');
}


function test_signalWave_update() {
    let signalWave = {
        id: 'signalWave',
        groupId: 'group1',
        userData: '波束',
        alpha: 0.5,//透明度
        range: [20, 100],
        valA: [-50, 0, 0],
        valB: [0, -20, 0],
        valC: [0, 0, 0],
        valD: [0, 20, 0],
        valE: [-20, 0, 0],
        valF: [300, 0, 0],
        valG: [-20, 0, 30],
    }
    fdapi.signalWave.update(signalWave);
}


function test_signalWave_delete() {
    fdapi.signalWave.delete('signalWave');
}


function test_signalWave_clear() {
    fdapi.signalWave.clear();
}

function test_signalWave_focus() {
    fdapi.signalWave.focus('signalWave');
}


function test_signalWave_show() {
    fdapi.signalWave.show('signalWave');
}


function test_signalWave_hide() {
    fdapi.signalWave.hide('signalWave');
}


function test_signalWave_get() {
    fdapi.signalWave.get('signalWave');
}

//Ajax查询 GET
function queryUrl(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject();
                }
            }
        };
        xhr.send();
    });
}

//******************一维水动力模型***********************/
let riverPoints = null;
async function test_hydrodynamic1d_add() {


    let url = "http://" + HostConfig.Player + '/assets/zuq/times.json';
    queryUrl(url).then(res => {
        let promises = []

        var times = res.times;
        for (var i = 0; i < times.length; i++) {
            let qurl = "http://" + HostConfig.Player + '/assets/zuq/' + times[i];
            promises.push(queryUrl(qurl));
        }

        Promise.all(promises).then(res1 => {
            riverPoints = res1;
            fdapi.hydrodynamic1d.delete('hydrodynamic1d');
            let hydrodynamic1d = {
                "id": "hydrodynamic1d",
                "points": riverPoints[0].points,
                "collision": false,
                "displayMode": 0,
                "waterMode": 1,
                "waveBrightness": 10,
                "waterColor": [0.203922, 0.262745, 0.286275, 1],
                "arrowDisplayMode": 1,
                "arrowAlphaMode": 0,
                "speedRange": [0, 1.24],
                "valueRange": [0, 3500],
                "arrowColor": [0, 0, 0, 1],
                "arrowTiling": 1,
                "speedFactor": 1,
                "rippleTiling": 1,
                "rippleDensity": 1,
                "arrowColors": {
                    "gradient": true,
                    "invalidColor": [1, 1, 1, 1],
                    "colorStops": [{
                        "value": 0,
                        "color": [0, 0, 1, 1]
                    },
                    {
                        "value": 0.5,
                        "color": [0, 1, 0, 1]
                    },
                    {
                        "value": 0.9,
                        "color": [1, 1, 0, 1]
                    },
                    {
                        "value": 1.24,
                        "color": [1, 0, 0, 1]
                    }
                    ]
                },
                "colors": {
                    "gradient": true,
                    "invalidColor": [1, 1, 1, 1],
                    "colorStops": [{
                        "value": 0,
                        "color": [0, 0, 1, 1]
                    },
                    {
                        "value": 1000,
                        "color": [0, 1, 1, 1]
                    },
                    {
                        "value": 2500,
                        "color": [0, 1, 0, 1]
                    },
                    {
                        "value": 3000,
                        "color": [1, 1, 0, 1]
                    },
                    {
                        "value": 3500,
                        "color": [1, 0, 0, 1]
                    }
                    ]
                }

            };
            fdapi.hydrodynamic1d.add(hydrodynamic1d);
            fdapi.hydrodynamic1d.focus('hydrodynamic1d', 10000, 2);
        });
    });

}


let myTimeinterval = null;
async function test_hydrodynamic1d_update() {
    if (myTimeinterval != null) {
        clearInterval(myTimeinterval);
        myTimeinterval = null;
    }

    let startIndex = 1;
    if (riverPoints) {
        //每5秒更新一次
        myTimeinterval = setInterval(function () {
            startIndex++;

            let hydrodynamic1d = {
                "id": "hydrodynamic1d",
                "points": riverPoints[startIndex].points,
                "collision": false,
                "displayMode": 1,
                "arrowDisplayMode": 1,
                "arrowAlphaMode": 0,
                "speedRange": [0, 1.24],
                "valueRange": [0, 3500],
                "arrowColor": [0, 0, 0, 1],
                "arrowTiling": 1,
                "speedFactor": 1,
                "rippleTiling": 1,
                "rippleDensity": 1,
                "arrowColors": {
                    "gradient": true,
                    "invalidColor": [1, 1, 1, 1],
                    "colorStops": [{
                        "value": 0,
                        "color": [0, 0, 1, 1]
                    },
                    {
                        "value": 0.5,
                        "color": [0, 1, 0, 1]
                    },
                    {
                        "value": 0.9,
                        "color": [1, 1, 0, 1]
                    },
                    {
                        "value": 1.24,
                        "color": [1, 0, 0, 1]
                    }
                    ]
                },
                "colors": {
                    "gradient": true,
                    "invalidColor": [1, 1, 1, 1],
                    "colorStops": [{
                        "value": 0,
                        "color": [0, 0, 1, 1]
                    },
                    {
                        "value": 1000,
                        "color": [0, 1, 1, 1]
                    },
                    {
                        "value": 2500,
                        "color": [0, 1, 0, 1]
                    },
                    {
                        "value": 3000,
                        "color": [1, 1, 0, 1]
                    },
                    {
                        "value": 3500,
                        "color": [1, 0, 0, 1]
                    }
                    ]
                }

            };
            fdapi.hydrodynamic1d.update(hydrodynamic1d);

            //停止定时器
            if (startIndex == riverPoints.length) {
                clearInterval(myTimeinterval);
                myTimeinterval = null;
            }
        }, 2000);
    }
}

async function test_hydrodynamic1d_add_random() {
    await fdapi.hydrodynamic1d.delete('hydrodynamic1d');

    //riverArr数据在data1.js
    let pointArr = [];
    for (let i = 0; i < riverArr.length; i++) {
        let coordinate = [riverArr[i].x, riverArr[i].y, riverArr[i].z];
        let width = riverArr[i].line_width;
        let point = { "coordinate": coordinate, "width": width, "speed": Math.random() * 10, "heatValue": Math.random() * 10 };
        pointArr.push(point);
    }

    let hydrodynamic1d = {
        "id": "hydrodynamic1d",
        "points": pointArr,
        "displayMode": 0,
        "waterMode": 1,
        "waveBrightness": 10,
        "waterColor": [0.203922, 0.262745, 0.286275, 1],
        "collision": false,//关闭碰撞
        "arrowDisplayMode": 1,
        "arrowAlphaMode": 0,
        "arrowColor": [1, 1, 0, 1],
        "arrowTiling": 0.6,
        "speedFactor": 1,
        "rippleTiling": 0.2,
        "rippleDensity": 0.2,
        "speedRange": [0, 10],
        "valueRange": [0, 10],
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 2.5,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 7.5,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 10,
                    "color": [1, 0, 0, 1]
                }
            ]
        },
        "arrowColors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 2.5,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 7.5,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 10,
                    "color": [1, 0, 0, 1]
                }
            ]
        }

    };
    fdapi.hydrodynamic1d.add(hydrodynamic1d);
    fdapi.hydrodynamic1d.focus('hydrodynamic1d', 2000, 2);
}

async function test_hydrodynamic1d_update_random() {

    //riverArr数据在data2.js
    let pointArr = [];
    for (let i = 0; i < riverArr.length; i++) {
        let coordinate = [riverArr[i].x, riverArr[i].y, riverArr[i].z];
        let width = riverArr[i].line_width;
        let point = { "coordinate": coordinate, "width": width, "speed": Math.random() * 10, "heatValue": Math.random() * 10 };
        pointArr.push(point);
    }

    let hydrodynamic1d = {
        "id": "hydrodynamic1d",
        "points": pointArr,
        "displayMode": 1,
        "waveBrightness": 20,
        "arrowDisplayMode": 0,
        "arrowAlphaMode": 0,
        "arrowColor": [1, 1, 1, 1],
        "arrowTiling": 0.6,
        "speedFactor": 1,
        "rippleTiling": 0.2,
        "rippleDensity": 0.2,
        "speedRange": [0, 10],
        "valueRange": [0, 10],
        "colors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 2.5,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 7.5,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 10,
                    "color": [1, 0, 0, 1]
                }
            ]
        },
        "arrowColors": {
            "gradient": true,
            "invalidColor": [0, 0, 0, 1],
            "colorStops": [
                {
                    "value": 0,
                    "color": [0, 0, 1, 1]
                },
                {
                    "value": 2.5,
                    "color": [0, 1, 1, 1]
                },
                {
                    "value": 5,
                    "color": [0, 1, 0, 1]
                },
                {
                    "value": 7.5,
                    "color": [1, 1, 0, 1]
                },
                {
                    "value": 10,
                    "color": [1, 0, 0, 1]
                }
            ]
        }

    };
    fdapi.hydrodynamic1d.update(hydrodynamic1d);
    fdapi.hydrodynamic1d.focus('hydrodynamic1d', 10000, 2);
}

function test_hydrodynamic1d_clear() {
    fdapi.hydrodynamic1d.clear();
}


function test_hydrodynamic1d_delete() {
    fdapi.hydrodynamic1d.delete('hydrodynamic1d');
}

function test_hydrodynamic1d_focus() {
    fdapi.hydrodynamic1d.focus('hydrodynamic1d', 12000, 2);
}


function test_hydrodynamic1d_show() {
    fdapi.hydrodynamic1d.show('hydrodynamic1d');
}


function test_hydrodynamic1d_hide() {
    fdapi.hydrodynamic1d.hide('hydrodynamic1d');
}


function test_hydrodynamic1d_get() {
    fdapi.hydrodynamic1d.get('hydrodynamic1d');
}