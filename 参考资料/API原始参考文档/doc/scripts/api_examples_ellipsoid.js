/**
 * 描述：球面工程坐标系示例代码
 * 版本：v1.0
 * 日期：2025-05-28
 */


//====================== marker ====================

async function test_ellipsoid_marker_add() {

    let markerArr = [];
    fdapi.marker.clear();
    for (let i = 0; i < provinceArr.length; i++) {

        let provinceName = provinceArr[i].name;
        let provinceCoordinate = [Number.parseFloat(provinceArr[i].value[0]), Number.parseFloat(provinceArr[i].value[1]), provinceArr[i].value[2]];

        let marker = {
            id: 'marker_' + i,
            groupId: 'china_province',
            coordinate: provinceCoordinate,
            coordinateType: 1,
            range: [-10000, 1000000000],


            text: provinceName,
            useTextAnimation: false,
            textRange: [-10000, 1000000000],
            textOffset: [0, 0],
            textBackgroundColor: Color.SpringGreen,
            fontSize: 16,
            fontOutlineSize: 1,
            fontColor: Color.White,
            fontOutlineColor: Color.Black,

            anchors: [-16, 32],
            imageSize: [32, 32],
            hoverImageSize: [32, 32],
            imagePath: HostConfig.Path + '/locale/zh/images/cb.png',
            hoverImagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            fixedSize: true,

            popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',
            popupBackgroundColor: [1.0, 1.0, 1.0, 0.5],
            popupSize: [300, 200],
            popupOffset: [0, 0],


            autoHidePopupWindow: true,
            autoHeight: false,
            displayMode: 4,
            clusterByImage: true,
            priority: i,
            occlusionCull: false


        };
        markerArr.push(marker);

    }

    //多个marker请使用批量添加 提供效率 
    await fdapi.marker.add(markerArr);
    //fdapi.marker.focus('marker_1', 1000000, 1);
    fdapi.camera.set(109.625613, 36.550782, 6047568.674596, -89.899124, -108.129234, 0);
}

async function test_ellipsoid_marker_update() {

    let o = {
        id: 'marker_34',
        text: '九朝古都欢迎您',
        fontColor: Color.White,
        textBackgroundColor: Color.Yellow,
        showLine: true
    }
    await fdapi.marker.update(o);

}

function test_ellipsoid_marker_focus() {
    fdapi.marker.focus('marker_1', 1000000, 0.2);
}

function test_ellipsoid_marker_focusAll() {
    fdapi.marker.focusAll(2000000, 0.2);
}

function test_ellipsoid_marker_show() {
    fdapi.marker.show('marker_1');
}

function test_ellipsoid_marker_showAll() {
    fdapi.marker.showAll();
}

function test_ellipsoid_marker_hideAll() {
    fdapi.marker.hideAll();
}

function test_ellipsoid_marker_hide() {
    fdapi.marker.hide(['marker_1']);
}

function test_ellipsoid_marker_clear() {
    fdapi.marker.clear();
}

function test_ellipsoid_marker_delete() {
    fdapi.marker.delete(['marker_1', 'marker_0']);
}

function test_ellipsoid_marker_showPopupWindow() {
    fdapi.marker.showPopupWindow('marker_1');
}

function test_ellipsoid_marker_setAttachCustomObject() {



    fdapi.marker.clear();
    //添加标签
    let marker = {
        id: 'marker1',
        coordinate: [116.3979471, 39.9081726, 100], //坐标位置
        coordinateType: 1, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [-14, 28], //锚点
        range: [-10000, 100000000], //可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/tag.png', //显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/hilightarea.png', // 鼠标悬停时显示的图片路径
        imageSize: [28, 28], //图片的尺寸
        hoverImageSize: [28, 28], //鼠标悬停时显示的图片尺寸
        fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '飞机', //显示的文字
        useTextAnimation: false, //打开文字展开动画效果
        textRange: [-10000, 100000000], //文本可视范围[近裁距离, 远裁距离]
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

    //添加飞机
    let co = {
        id: 'co1', //自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak', //pak文件路径
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/飞机/飞机_1', //资源目录，自定义对象在pak文件资源包里的相对路径
        location: [116.3979471, 39.9081726, 100], //位置坐标
        coordinateType: 1, // 坐标系类型 
        range: [-10000, 1000000],
        rotation: [0, 45, 0], //旋转
        scale: [500, 500, 500], //缩放
        smoothMotion: 1, //1: 平滑插值，0: 跳跃
    };
    fdapi.customObject.add(co);

    //设置贴合，支持数组类型，多个对象贴合
    fdapi.marker.attachObject([{
        markerId: 'marker1', //标注id
        objectId: 'co1', //自定义对象id
        offset: [0, 0, 0] //偏移量
    }]);


    //标签跟随车辆移动
    fdapi.customObject.focus(co.id, -100);
    let pathArr = [
        [116.3979471, 39.9081726, 78],
        [121.4692688, 31.2381763, 75],
        [117.2523808, 39.1038561, 95],
        [114.4897766, 38.0451279, 42],
        [106.548425, 29.5549144, 78]
    ]

    //启动定时器更改车辆位置   
    let index = 0;
    let timerId = setInterval(async () => {
        if (++index > pathArr.length)
            index = 0;
        let pos = pathArr[index];
        fdapi.customObject.setLocation(co.id, pos)
    }, 2000);
    //清除定时器
    window.setTimeout(function () {
        window.clearInterval(timerId)
    }, 11000);
}

function test_ellipsoid_marker_hidePopupWindow() {
    fdapi.marker.hidePopupWindow('marker_1');
}

function test_ellipsoid_marker_showAllPopupWindow() {
    fdapi.marker.showAllPopupWindow();
}

function test_ellipsoid_marker_hideAllPopupWindow() {
    fdapi.marker.hideAllPopupWindow();
}


async function test_ellipsoid_marker_setAnchors() {
    //设置标注整体偏移
    await fdapi.marker.setAnchors('marker_1', [-50, 25]);
    fdapi.marker.focus('marker_1', 10000, 1);
}

async function test_ellipsoid_marker_setCoordinate() {
    await fdapi.marker.setCoordinate('marker_1', [116.3017638, 39.9342403, 100]);
    fdapi.marker.focus('marker_1', 20000, 0.2);
}

function test_ellipsoid_marker_setImagePath() {
    let path = HostConfig.Path + '/locale/zh/images/tag.png';
    fdapi.marker.setImagePath('marker_1', path);
}

function test_ellipsoid_marker_setImageSize() {
    fdapi.marker.setImageSize('marker_1', [64, 64]);
}

function test_ellipsoid_marker_setURL() {
    fdapi.marker.setURL('marker_1', 'http://www.baidu.com');
}

function test_ellipsoid_marker_setText() {
    fdapi.marker.setText('marker_1', '金融中心上海');
}

function test_ellipsoid_marker_setRange() {
    fdapi.marker.setRange('marker_1', [-1000, 800000]);
}

function test_ellipsoid_marker_setFontColor() {
    fdapi.marker.setFontColor('marker_1', Color.Blue);
}

function test_ellipsoid_marker_setTextBackgroundColor() {
    fdapi.marker.setTextBackgroundColor('marker_1', Color.Yellow);
}

function test_ellipsoid_marker_setTextOutlineColor() {
    fdapi.marker.setFontOutlineColor('marker_1', Color.Red);
}

function test_ellipsoid_marker_setShowLine() {
    fdapi.marker.setShowLine('marker_1', false);
}


function test_ellipsoid_marker_setFontOutlineSize() {
    fdapi.marker.setFontOutlineSize('marker_1', 2);
}

function test_ellipsoid_marker_setGroupId() {
    fdapi.marker.setGroupId('marker_1', 'groupMarker2');
}

function test_ellipsoid_marker_setUserData() {
    fdapi.marker.setUserData('marker_1', '{name:\"karl\",sex:\"male\",\"age\":32}');
}

function test_ellipsoid_marker_setHoverImagePath() {
    let hoverImagePath = HostConfig.Path + '/locale/zh/images/viewshed.png';
    fdapi.marker.setHoverImagePath('marker_1', hoverImagePath);
}

function test_ellipsoid_marker_setTextOffset() {
    fdapi.marker.setTextOffset('marker_1', [100, 10]);
}

function test_ellipsoid_marker_setFontSize() {
    fdapi.marker.setFontSize('marker_1', 30);
}

function test_ellipsoid_marker_setTextRange() {
    fdapi.marker.setTextRange('marker_1', [-10000, 100000]);
}

function test_ellipsoid_marker_setAutoHidePopupWindow() {
    fdapi.marker.setAutoHidePopupWindow('marker_1', false);
}

function test_ellipsoid_marker_setPopupSize() {
    fdapi.marker.setPopupSize('marker_1', [400, 600]);
}

function test_ellipsoid_marker_setPopupOffset() {
    fdapi.marker.setPopupOffset('marker_1', [20, 20]);
}

function test_ellipsoid_marker_setLineSize() {
    fdapi.marker.setLineSize('marker_1', [0.5, 50]);
}

function test_ellipsoid_marker_setLineColor() {
    fdapi.marker.setLineColor('marker_1', Color.Red);
}

function test_ellipsoid_marker_setLineOffset() {
    fdapi.marker.setLineOffset('marker_1', [10, 10]);
}

function test_ellipsoid_marker_setPriority() {
    fdapi.marker.setPriority('marker_1', 1);
}

function test_ellipsoid_marker_setOcclusionCull() {
    fdapi.marker.setOcclusionCull('marker_1', true);
}


function test_ellipsoid_marker_setClusterStyle() {

    let style = {
        imagePath: HostConfig.Path + '/locale/zh/images/cluster.png',
        imageSize: [32, 32],
        fontSize: 18,
        fontColor: [1, 1, 1, 1] //可以设置完全透明 隐藏数字
    }
    fdapi.marker.setClusterStyle(style);
}

async function test_ellipsoid_marker_get() {
    let res = await fdapi.marker.get('marker_1');
    let o = res.data[0];
    log(`获取标注：\n id: ${o.id} \n text: ${o.text}`);
}

var __canvas;

function test_ellipsoid_marker_add_canvas() {

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
        ctx.fillText("渤海湾", 60, 50);


        let o = {};
        o.id = 'canvas_marker1';
        o.coordinate = [120.0350317, 38.6163999, 100]
        o.imagePath = __canvas.toDataURL("image/jpg");
        o.imageSize = [165, 63];
        o.popupURL = '';
        o.url = HostConfig.Path + '/locale/zh/popup_simple.html';
        o.range = [-1000, 1000000000];
        o.coordinateType = 1;
        fdapi.marker.delete('canvas_marker1')
            .then(() => fdapi.marker.add(o))
        //.then(() => fdapi.marker.focus('canvas_marker1', 10000, 0.2));
    }
}


function test_ellipsoid_marker_showByGroupId() {
    fdapi.marker.showByGroupId('china_province');
}

function test_ellipsoid_marker_hideByGroupId() {
    fdapi.marker.hideByGroupId('china_province');
}

function test_ellipsoid_marker_deleteByGroupId() {
    fdapi.marker.deleteByGroupId('china_province');
}

function test_ellipsoid_marker_setViewportVisible() {
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

async function test_ellipsoid_marker3d_add() {

    let buildingCoordinates = [

        [116.257938, 39.500525], [116.204049, 39.588806], [115.978445, 39.59569], [115.957547, 39.560919],
        [115.910193, 39.600833], [115.828686, 39.50705], [115.752073, 39.511725], [115.667167, 39.615571],

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
            'pointScale': 1000,//3D标注整体缩放比例
            'coordinate': buildingCoordinates[i], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
            'coordinateType': 0, //坐标系类型 
            'range': [-10000, 1000000], //3D标注的可视距离范围：[min,max]，单位：米
            'viewHeightRange': [-10000, 1000000],//可见高度范围
            'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
            'collision': true //默认开启碰撞
        }
        marker3dArr.push(marker3d);

    }
    await fdapi.marker3d.add(marker3dArr);
    fdapi.marker3d.focus('m1', 20000);
}

async function test_ellipsoid_marker3d_update() {
    let o = {
        'id': 'm1',
        'text': 'Building No.1',
        'pointScale': 2000,//整体缩放
        'textSize': 20,
        'pointName': 'Point_B_5',
        'textColor': [1, 0, 0, 1]
    }
    await fdapi.marker3d.update(o);
    fdapi.marker3d.focus(o.id);
}

function test_ellipsoid_marker3d_focus() {
    fdapi.marker3d.focus('m1', 10000, 0.2);
}

function test_ellipsoid_marker3d_show() {
    fdapi.marker3d.show('m1');
}

function test_ellipsoid_marker3d_showAll() {
    fdapi.marker3d.showAll();
}

function test_ellipsoid_marker3d_hideAll() {
    fdapi.marker3d.hideAll();
}

function test_ellipsoid_marker3d_hide() {
    fdapi.marker3d.hide(['m1']);
}

function test_ellipsoid_marker3d_clear() {
    fdapi.marker3d.clear();
}

function test_ellipsoid_marker3d_delete() {
    fdapi.marker3d.delete(['m1', 'm2']);
}

function test_ellipsoid_marker3d_get() {
    fdapi.marker3d.get('m1');
    fdapi.marker3d.get(['m1', 'm2']);
}

function test_ellipsoid_marker3d_setViewHeightRange() {
    fdapi.marker3d.setViewHeightRange('m1', 0, 1000);
}


function test_ellipsoid_marker3d_setAttachCustomObject() {


    //高空热气球运动路径
    let pathArr = [

        [106.08756, 32.772832, 5000], [106.08441, 32.762903, 5000],
        [106.083222, 32.761646, 5000], [106.082694, 32.760961, 5000],
        [106.080036, 32.759728, 5000], [106.076222, 32.76111, 5000],
        [106.077161, 32.765115, 5000], [106.07764, 32.765462, 5000],
        [106.08071, 32.766317, 5000], [106.082117, 32.767259, 5000],
        [106.086474, 32.771462, 5000], [106.08756, 32.772832, 5000]

    ];

    //添加气球3d标签
    fdapi.marker3d.clear();
    let balloonLabel = {
        'id': 'balloonLabel',
        'groupId': 'balloonLabel',
        'text': '',//3D标注显示文字
        'textSize': 64,//3D标注显示文字大小
        'textColor': '#6BF4F7',//3D标注显示文字颜色
        'textOutlineSize': 1,//3D标注显示文字轮廓大小
        'textOutlineColor': Color.Black,// 3D标注显示文字轮廓颜色
        'textFixed': false,// 3D标注显示文字是否固定文本朝向
        'fixedSize': true,// 默认尺寸 非近大远小
        'textVisible': true,//3D标注显示文字是否显示文本
        'textLocation': [0, 0, 0],// 文字位置
        'textRotation': [0, 0, 0],// 文字旋转
        'textScale': [1, 1, 1],// 文字缩放
        'pointName': 'Point_B_3',//3D标注展示的特效名称
        'pointVisible': true,//3D标注是否显示
        'pointScale': 5,//3D标注整体缩放比例
        'coordinate': pathArr[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
        'coordinateType': 1, //坐标系类型 
        'range': [-1000000, 1000000000], //3D标注的可视距离范围：[min,max]，单位：米
        'autoHeight': false,//自动判断下方是否有物体，设置正确高度，默认值：false
        'collision': true //默认开启碰撞
    }
    fdapi.marker3d.add(balloonLabel);

    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    //添加气球
    let balloon = {
        id: 'balloon', //自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak', //pak文件路径
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/热气球/热气球_1', //资源目录，自定义对象在pak文件资源包里的相对路径
        location: pathArr[0], //位置坐标
        coordinateType: 1, // 坐标系类型 
        rotation: [0, 0, 0], //旋转
        range: [-100000, 1000000000000],//显示范围
        scale: [5000, 5000, 5000], //缩放
        smoothMotion: 1, //1: 平滑插值，0: 跳跃
    };
    fdapi.customObject.add(balloon);

    //设置贴合，支持数组类型，多个对象贴合
    fdapi.marker3d.attachObject([{
        marker3dId: 'balloonLabel', //三维标注id
        objectId: 'balloon', //自定义对象id
        offset: [0, 0, 0] //偏移量
    }]);

    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < pathArr.length; i++) {
        //构造数组元素 每3600秒移动一次
        let elementPoint = { 'time': (i) * 3600, 'coordinate': pathArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    //fdapi.customObject.focus('balloon', -1);
    //设置自定义相机跟随
    //fdapi.customObject.focus('co1', 5, 0, [-30, 4, 0], ActionMode.Follow);
    //气球按轨迹移动
    fdapi.customObject.startMove('balloon', 1, pathPointArr);



}


function test_ellipsoid_marker3d_showByGroupId() {
    fdapi.marker3d.showByGroupId('marker3dTest');
}

function test_ellipsoid_marker3d_hideByGroupId() {
    fdapi.marker3d.hideByGroupId('marker3dTest');
}

function test_ellipsoid_marker3d_deleteByGroupId() {
    fdapi.marker3d.deleteByGroupId('marker3dTest');
}


function test_ellipsoid_marker3d_getBPFunction() {
    fdapi.marker3d.getBPFunction(['m1', 'm2']);
}

async function test_ellipsoid_marker3d_callBatchFunction() {

    //查询蓝图函数包含的参数信息 
    let res = await fdapi.marker3d.getBPFunction(['m1', 'm2']);
    let functionArr = res.data[0].params;

    //1、批量调用多个蓝图函数，函数名称为【颜色】【速率】的蓝图函数
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
        },
        {
            id: 'm8',
            functionName: '文字',
            parameters: [
                { "name": "文字内容", "paramType": 5, "paramValue": "8号楼" },
                { "name": "文字大小", "paramType": 2, "paramValue": 64 },
                { "name": "背景颜色", "paramType": 6, "paramValue": [0, 1, 1, 1] },
                { "name": "背景倒角", "paramType": 3, "paramValue": 1 }]
        },
        {
            id: 'm8',
            functionName: '图标',
            parameters: [
                { "name": "图标样式", "paramType": 16, "paramValue": "城市" },
                { "name": "图标背景", "paramType": 16, "paramValue": "图标背景D" }
            ]
        },
    ]);


}


//====================== camera ======================

function test_ellipsoid_camera_get() {
    fdapi.camera.get(function (res) {
        log('查询相机回调函数的输出信息，可以通过以下代码将相机重置为当前位置：\n');
        let str = `fdapi.camera.set(${res.x}, ${res.y}, ${res.z}, ${res.pitch}, ${res.yaw}, 0);\n`;
        log(str);
    })
}

function test_ellipsoid_camera_set() {
    //参数：x, y, z, pitch, yaw, flyTime
    fdapi.camera.set(105.240147, 39.671968, 10910015.272664, -89.895309, -100.55674, 0);
}

function test_ellipsoid_camera_lockBBox() {
    //限制相机交互范围
    let bbox = [111, 37, 0, 114, 40, 10000]
    fdapi.camera.lockByBBox(bbox);
}



function test_ellipsoid_camera_unLockBBox() {
    fdapi.camera.unlock();
}

function test_ellipsoid_camera_getEulerAngle() {

    let startPoint = [103.632403, 28.259998, 1000];
    let endPoint = [103.452394, 28.123033, 1000]
    fdapi.polyline.clear();
    let o = {
        id: 'p1',//折线唯一标识id
        coordinates: [startPoint, endPoint],//构成折线的坐标点数组
        coordinateType: 1,
        range: [-10000, 10000000000],//可视范围
        color: Color.Red,//折线颜色
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
        thickness: 1000,//折线宽度
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

function test_ellipsoid_camera_set_byArray() {

    let cam = [105.240147, 39.671968, 10910015.272664, -89.895309, -100.55674, 0];
    fdapi.camera.set(cam, 0.8);
}

function test_ellipsoid_camera_set_byObject() {

    let cam = {
        "x": 105.240147,
        "y": 39.671968,
        "z": 10910015.272664,
        "pitch": -89.895309,
        "yaw": -100.55674,
        "roll": 0.0
    };
    fdapi.camera.set(cam, 0.2);
}

function test_ellipsoid_camera_lookAt() {
    let distance = 0;
    distance += 5000000;
    //lookAt参数：x, y, z, distance,  pitch, yaw, flyTime
    fdapi.camera.lookAt(105.240147, 39.671968, distance, -89.895309, -100.55674, 0.2);
}

function test_ellipsoid_camera_flyAround() {

    //环绕参数：location,rotation, distance, time
    fdapi.camera.flyAround([105.240147, 39.671968, 10910015], [-89.895309, -100.55674, 0], 10910015, 5);
}


function test_ellipsoid_camera_lookAtBBox1() {
    //设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
    fdapi.settings.setInteractiveMode(0);
    //[minx,miny,minz,maxx,maxy,maxz]
    let bbox = [111, 37, 0, 114, 40, 10000];
    //lookAtBBox参数：bbox,  pitch, yaw, flyTime
    fdapi.camera.lookAtBBox(bbox, -15.0, -173.0, 0.5);
}

async function test_ellipsoid_camera_lookAtBBox2() {

    //设置交互模式，0：自由交互模式，1：第三人称模式，2：无人机模式，3：中心漫游模式（物体观察模式），4：地图模式
    fdapi.settings.setInteractiveMode(3);
    //[minx,miny,minz,maxx,maxy,maxz]
    let bbox = [111, 37, 0, 114, 40, 10000];
    //lookAtBBox参数：bbox,  pitch, yaw, flyTime
    fdapi.camera.lookAtBBox(bbox, -54.0, -173.0, 0.5);
}

function test_ellipsoid_camera_getAnimationList() {
    fdapi.camera.getAnimationList();
}

function test_ellipsoid_camera_getAnimationImage() {
    //参数：导览名称，可以根据getAnimationList()方法获取
    //注意：因为返回字符串过长，执行此方法前请不要勾选日志的【自动清屏】，具体使用方法请参考api文档
    fdapi.camera.getAnimationImage("导览1");
}

function test_ellipsoid_camera_playAnimation() {
    //参数：录制导览的索引序号，从0开始
    fdapi.camera.playAnimation(0);
}

function test_ellipsoid_camera_pauseAnimation() {
    fdapi.camera.pauseAnimation();
}

function test_ellipsoid_camera_resumeAnimation() {
    fdapi.camera.resumeAnimation();
}

function test_ellipsoid_camera_stopAnimation() {
    fdapi.camera.stopAnimation();
}

function test_ellipsoid_camera_exitWorld() {
    fdapi.camera.exitWorld();
}

function test_ellipsoid_camera_enterWorld() {
    fdapi.camera.enterWorld();

}

function test_ellipsoid_camera_cancelFollow() {
    fdapi.camera.cancelFollow();
}

function test_ellipsoid_camera_moveForward() {
    fdapi.camera.moveForward();
}

function test_ellipsoid_camera_moveBackward() {
    fdapi.camera.moveBackward();
}

function test_ellipsoid_camera_moveLeft() {
    fdapi.camera.moveLeft();
}

function test_ellipsoid_camera_moveRight() {
    fdapi.camera.moveRight();
}

function test_ellipsoid_camera_moveUp() {
    fdapi.camera.moveUp();
}

function test_ellipsoid_camera_moveDown() {
    fdapi.camera.moveDown();
}

function test_ellipsoid_camera_turnLeft() {
    fdapi.camera.turnLeft();
}

function test_ellipsoid_camera_turnRight() {
    fdapi.camera.turnRight();
}

function test_ellipsoid_camera_turnUp() {
    fdapi.camera.turnUp();
}

function test_ellipsoid_camera_turnDown() {
    fdapi.camera.turnDown();
}

function test_ellipsoid_camera_stop() {
    fdapi.camera.stop();
}

function test_ellipsoid_camera_exportOrthoImage() {
    // 导出正交投影图片
    fdapi.camera.exportOrthoImage("F:\\orthoImage" + Math.random() * 1000 + ".png", [1920, 1080], 10910015, [105.240147, 39.671968, 10910015], [-90, -100, 0.000002], [0, 0, 0, 1]);
}



//====================== editHelper ======================

function test_ellipsoid_editHelper_setParam() {
    let lineType = 0;           //0：直线，1：曲线
    let buildType = 1;          //0：画多点线段， 1：画多边形
    let color = Color.Red;      //绘制颜色
    fdapi.editHelper.setParam(lineType, buildType, color);
}

function test_ellipsoid_editHelper_start() {
    fdapi.polyline.clear();
    fdapi.polygon.clear();
    fdapi.editHelper.start();
}

function test_ellipsoid_editHelper_cancel() {
    fdapi.polyline.clear();
    fdapi.polygon.clear();
    fdapi.editHelper.cancel();
}

async function test_ellipsoid_editHelper_finish() {
    fdapi.polyline.clear();
    fdapi.polygon.clear();
    let res = await fdapi.editHelper.finish(true);
    switch (res.buildType) {
        case 0: {
            fdapi.polyline.add({
                id: Math.random(),
                coordinates: res.coordinates,
                coordinateType: 1,
                range: [-10000, 10000000],
                color: Color.Red,
                style: 2,
                thickness: 100,
                intensity: 1,
                flowRate: 0.5,
                depthTest: false
            });
        } break;

        case 1: {
            fdapi.polygon.add({
                id: Math.random(),
                color: Color.Blue,
                style: 10,
                coordinates: res.coordinates,
                coordinateType: 1,
                range: [-10000, 10000000],
                frameColor: Color.Red,
                frameThickness: 1,
                depthTest: false
            });
        } break;
    }
}


//====================== coord ======================

async function test_ellipsoid_coord_screen2World() {
    let res = await fdapi.coord.screen2World(600, 400);
    log('Screen2World Result: ' + res.worldLocation);
}

async function test_ellipsoid_coord_world2Screen() {
    let res = await fdapi.coord.world2Screen(105.240147, 39.671968, 10910015);
    log('World2Screen Result: ' + res.screenPosition);
}

function test_ellipsoid_coord_pcs2gcs() {
    fdapi.coord.pcs2gcs([498326, 3353092]);
}

function test_ellipsoid_coord_gcs2pcs() {
    fdapi.coord.gcs2pcs([113.98259824550810, 30.297492106590411]);
}


//====================== infoTree ======================
function test_ellipsoid_layers_focus() {
    fdapi.infoTree.focus('979A4C034E29728F8A2635AD747B72A3');
}

function test_ellipsoid_layers_show() {
    //支持按图层树上文件夹id显示文件夹内所有模型
    fdapi.infoTree.show('979A4C034E29728F8A2635AD747B72A3');
}

function test_ellipsoid_layers_hide() {
    //支持按图层树上文件夹id隐藏文件夹内所有模型
    fdapi.infoTree.hide(['979A4C034E29728F8A2635AD747B72A3']);
}

function test_ellipsoid_layers_enableXRay() {
    let ids = [1, 2];
    let color = [1, 1, 1, 1];
    fdapi.infoTree.enableXRay(ids, color);
}

function test_ellipsoid_layers_disableXRay() {
    let ids = [1, 2];
    fdapi.infoTree.disableXRay(ids);
}

function getRandCoord() {
    //生成随机坐标值或者坐标值数组 105.240147, 39.671968, 10910015
    let baseX = 105.240147;
    let baseY = 39.671968;
    return [baseX + Math.random() * 0.1, baseY + Math.random() * 0.1, 10000];
}

function getRandCoords(n) {

    var coords = [];
    for (let i = 0; i < n; i++) {
        coords.push(getRandCoord());
    }

    return coords;
}

async function test_ellipsoid_layers_addSomeTags() {

    fdapi.camera.set(105.240147, 39.671968, 10910015.272664, -89.895309, -100.55674, 0);

    let oaTags = new Array();

    for (let i = 0; i < 10; i++) {
        oaTags.push({
            id: i,
            coordinate: getRandCoord(),
            coordinateType: 1,
            range: [-1000, 10000000],
            imagePath: HostConfig.Path + '/locale/zh/images/tag.png',
            imageSize: [28, 28],
            text: 'T' + i.toString(),
            groupId: 'group0'
        });
    }

    let oaRadiation = new Array();
    for (let i = 0; i < 10; i++) {
        oaRadiation.push({
            id: i,
            coordinate: getRandCoord(),
            coordinateType: 1,
            range: [-1000, 10000000],
            radius: 500,
            rippleNumber: 10,
            color: [1, 0, 1, 1],
            intensity: 1.0,
            groupId: 'group0'
        });
    }

    let oaODLines = new Array();
    for (let i = 0; i < 10; i++) {
        oaODLines.push({
            id: i,
            color: [0, 0, 1, 1],
            coordinates: getRandCoords(2),
            coordinateType: 1,
            range: [-1000, 10000000],
            flowRate: 1,
            intensity: 0.8,
            bendDegree: 0.5,
            tiling: 0.5,

            lineThickness: 100,
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
            coordinateType: 1,
            range: [-1000, 10000000],
            duration: 3,                  //光流粒子的生命周期
            thickness: 10,               //光流线的宽度
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
            coordinateType: 1,
            range: [-1000, 10000000],
            color: [0, 0, 1, 1],
            style: 5,
            thickness: 200,
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
            coordinateType: 1,
            range: [-1000, 10000000],
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
    fdapi.polygon.focus("1", 1000);

}

function test_ellipsoid_layers_showByGroupId() {
    fdapi.infoTree.showByGroupId('group0');
}

function test_ellipsoid_layers_hideByGroupId() {
    fdapi.infoTree.hideByGroupId('group0');
}

function test_ellipsoid_layers_highlightByGroupId() {
    fdapi.infoTree.highlightByGroupId('group0');
}

function test_ellipsoid_layers_deleteByGroupId() {
    fdapi.infoTree.deleteByGroupId('group0');
}

async function test_ellipsoid_layers_get() {
    let res = await fdapi.infoTree.get();
    console.log(JSON.stringify(res.infotree));
}


function test_ellipsoid_layers_getBPFunction() {
    fdapi.infoTree.getBPFunction('2BC267114D436EA43BF695AC98DA4E08')
}

function test_ellipsoid_layers_callBPFunction() {
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


//====================== weather ======================
function test_ellipsoid_weather_getParams() {
    fdapi.weather.getParams();
}

function test_ellipsoid_weather_getDateTime() {
    fdapi.weather.getDateTime();
}

function test_ellipsoid_weather_setSunIntensity() {
    fdapi.weather.setSunIntensity(10);
}

function test_ellipsoid_weather_setMoonIntensity() {
    fdapi.weather.setMoonIntensity(0.5);
}

function test_ellipsoid_weather_setSunSize() {
    fdapi.weather.setSunSize(5);
}

function test_ellipsoid_weather_setMoonSize() {
    fdapi.weather.setMoonSize(6);
}

function test_ellipsoid_weather_setAmbientLightIntensity() {
    fdapi.weather.setAmbientLightIntensity(0.3);
}

function test_ellipsoid_weather_setTemperature() {
    fdapi.weather.setTemperature(8500);
}

function test_ellipsoid_weather_setShadowQuality() {
    fdapi.weather.setShadowQuality(2);
}

function test_ellipsoid_weather_setShadowIntensity() {
    fdapi.weather.setShadowIntensity(0.5);
}

function test_ellipsoid_weather_setShadowDistance() {
    fdapi.weather.setShadowDistance(2000);
}

function test_ellipsoid_weather_setDateTime() {
    fdapi.weather.setDateTime(2025, 6, 5, 17, 25, false);
}


function test_ellipsoid_weather_setRainParam() {
    //设置云层厚度
    fdapi.weather.setCloudThickness(2);
    //设置完云层厚度后才能开启雨效
    fdapi.weather.setRainParam(1, 1, 1, [0.5, 0.5, 0.5, 0.1], 0.5, 0.5);
}

function test_ellipsoid_weather_setSnowParam() {
    //设置云层厚度
    fdapi.weather.setCloudThickness(2);
    //设置完云层厚度后才能开启雪效
    fdapi.weather.setSnowParam(1, 1, 1, [1, 1, 1, 1], 0.5, 0.5);
}

function test_ellipsoid_weather_disableRainSnow() {
    fdapi.weather.disableRainSnow();
}

function test_ellipsoid_weather_setFogParam() {
    fdapi.weather.setFogParam(0.1, [1, 1, 1, 1], 0.05, 10, 0.2);
}

function test_ellipsoid_weather_setCloudDensity() {
    fdapi.weather.setCloudDensity(0.8);
}

function test_ellipsoid_weather_setCloudThickness() {
    fdapi.weather.setCloudThickness(2);
}

function test_ellipsoid_weather_setCloudHeight() {
    //云层高度单位：公里
    fdapi.weather.setCloudHeight(2);
}


function test_ellipsoid_weather_setSkyVisibleMaxHeight() {
    fdapi.weather.setSkyVisibleMaxHeight(50000000);
}


function test_ellipsoid_weather_setDarkMode() {
    let isDarkMode = false;
    isDarkMode = !isDarkMode;
    fdapi.weather.setDarkMode(isDarkMode);
}


function test_ellipsoid_weather_simulateTime() {
    //10秒内模拟从9点到15点的时间变化
    fdapi.weather.simulateTime(9, 15, 10);

    //15秒内模拟从9点半到15点45的时间变化
    //fdapi.weather.simulateTime([9, 30], [15, 45], 15);
}


function test_ellipsoid_weather_setCloudParam() {
    fdapi.weather.setCloudParam("#FFFFFF", 2, 0.5);
}

function test_ellipsoid_weather_setLowCloud() {
    fdapi.weather.setLowCloud(0.5, 0.5, 0.25, 50, 180);
}

function test_ellipsoid_weather_setHighCloud() {
    fdapi.weather.setHighCloud(0.5, 50, 180, 0.5, 0.5, 0.5);
}

function test_ellipsoid_weather_setOceanWave() {
    let options = {
        scale: 1, //海浪整体缩放
        length: 6, //波长
        amplitude: 4.2, //振幅
        speed: 9, //运动速率
        formDensity: 0.5 //泡沫强度

    }
    fdapi.weather.setOceanWave(options);
}

function test_ellipsoid_weather_getOceanWave() {
    fdapi.weather.getOceanWave();
}


function test_ellipsoid_weather_setEarthCloudIntensity(){
    fdapi.weather.setEarthCloudIntensity(0.5);
}

function test_ellipsoid_weather_setEarthNightLightIntensity(){
    fdapi.weather.setEarthNightLightIntensity(0.6);
}

function test_ellipsoid_weather_setEarthStarBackgroundIntensity(){
    fdapi.weather.setEarthStarBackgroundIntensity(0.5);
}

//====================== tools ======================

async function test_ellipsoid_tools_startPolygonClip() {

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

function test_ellipsoid_tools_stopPolygonClip() {
    fdapi.tools.stopPolygonClip();
}

async function test_ellipsoid_tools_startPlaneClip() {
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

function test_ellipsoid_tools_stopPlaneClip() {
    fdapi.tools.stopPlaneClip();
}

async function test_ellipsoid_tools_startVolumeClip() {
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

async function test_ellipsoid_tools_updateVolumeClip() {
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

function test_ellipsoid_tools_stopVolumeClip() {
    fdapi.tools.stopVolumeClip();
}

function test_ellipsoid_tools_setMeasurement() {
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
    //测量模式：Coordinate 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积
    fdapi.tools.setMeasurement(MeasurementMode.Coordinate, options);
}

function test_ellipsoid_tools_startMeasurement() {
    //测量模式配置选项参数
    let options = {
        'pointSize': 8.0,
        'textSize': 10.0,
        'textColor': Color.Yellow,
        'pointColor': [0, 0, 1, 0.3],
        'lineColor': Color.Blue,
        'areaColor': [0, 1, 0, 0.3],
        'showCoordinateText': true
    };
    //设置测量模式，详情参考文档内MeasurementMode枚举 支持以下6类： 1坐标测量 2直线测量 3水平测量 4垂直测量 5多边形测量 6地表面积
    fdapi.tools.setMeasurement(5, options);
    //开始测量 注意：5.3支持右键结束交互
    fdapi.tools.startMeasurement();
}

function test_ellipsoid_tools_stopMeasurement() {
    fdapi.tools.stopMeasurement();
}

function test_ellipsoid_tools_lineIntersect() {
    fdapi.tools.lineIntersect(
        [492634.59375, 2491808, 10],
        [492518.03125, 2491819.75, 0],
    );
}

function test_ellipsoid_tools_linesIntersect() {
    //注意：1、求交要在相机视野范围内 2、获取地形高度时从上往下求交，起始点高度Z要大于结束点Z。
    let startEndPointArr = [
        { "start": [492634.59375, 2491808, 10], "end": [492518.03125, 2491819.75, 0] },
        { "start": [492571.9375, 2491902.25, 10], "end": [492537.71875, 2491811, 0] }

    ];
    fdapi.tools.linesIntersect(startEndPointArr, false, true);
}

function test_ellipsoid_tools_startSkylineAnalysis() {
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


function test_ellipsoid_tools_stopSkylineAnalysis() {
    fdapi.tools.stopSkylineAnalysis();
}


function test_ellipsoid_tools_exportSkyline() {
    let options = {
        skylineColor: Color.Green,
        backgroundColor: Color.Gray
    };
    //导出图片到cloud服务器指定磁盘路径
    fdapi.tools.exportSkyline('d:/skyline.png', [400, 200], options);
    //导出base64图片
    fdapi.tools.exportSkyline('base64', [400, 200], options);
}

function test_ellipsoid_tools_startViewshedAnalysis() {
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

function test_ellipsoid_tools_stopViewshedAnalysis() {
    fdapi.tools.stopViewshedAnalysis();
}

function test_ellipsoid_tools_startGeometryEdit() {
    //定位到对象o1
    fdapi.customObject.focus('o1', 10, 1);
    // @param {string} id   对象ID
    // @param {number} type 坐标架类型，共四种类型，取值说明：1.缩放 2.旋转 3.位移 4.混合，默认取值是4
    fdapi.tools.startGeometryEdit('o1', 4);
}

function test_ellipsoid_tools_stopGeometryEdit() {
    fdapi.tools.stopGeometryEdit();
}

function test_ellipsoid_tools_startFloodFill() {
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

function test_ellipsoid_tools_stopFloodFill() {
    fdapi.tools.stopFloodFill();
}

function test_ellipsoid_tools_startVisiblityAnalysis() {
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

function test_ellipsoid_tools_stopVisiblityAnalysis() {
    fdapi.tools.stopVisiblityAnalysis();
}

function test_ellipsoid_tools_startViewDomeAnalysis() {
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

function test_ellipsoid_tools_stopViewDomeAnalysis() {
    fdapi.tools.stopViewDomeAnalysis();
}

function test_ellipsoid_tools_startCutFillAnalysis() {
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

function test_ellipsoid_tools_stopCutFillAnalysis() {
    fdapi.tools.stopCutFillAnalysis();
}

function test_ellipsoid_tools_startSunshineAnalysis() {
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

function test_ellipsoid_tools_stopSunshineAnalysis() {
    fdapi.tools.stopSunshineAnalysis();
}

function test_ellipsoid_tools_startTerrainSlopeAnalysis() {
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

function test_ellipsoid_tools_stopTerrainSlopeAnalysis() {
    fdapi.tools.stopTerrainSlopeAnalysis();
}

function test_ellipsoid_tools_startContourLineAnalysis() {
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

function test_ellipsoid_tools_stopContourLineAnalysis() {
    fdapi.tools.stopContourLineAnalysis();
}


function test_ellipsoid_tools_showUIPanel() {
    //UIPanelType是系统面板的类型枚举
    fdapi.tools.showUIPanel(UIPanelType.Measure, [200, 100]);
}

function test_ellipsoid_tools_hideUIPanel() {
    fdapi.tools.hideUIPanel(UIPanelType.Measure);
}

function test_ellipsoid_tools_getUIPanel() {
    fdapi.tools.getUIPanel(UIPanelType.Measure);
}


function test_ellipsoid_tools_replaceTextureByVideo() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //用视频替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByVideo('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/assets/video/video1.webm');
}

function test_ellipsoid_tools_replaceTextureByImage() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //用图片替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByImage('/Game/Model/Textures/M_玻璃颜色_次深', HostConfig.Path + '/locale/zh/images/radiation.png');
}

function test_ellipsoid_tools_replaceTextureByUrl() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);

    //用url替换显示纹理 注意：纹理路径需要存在
    fdapi.tools.replaceTextureByUrl('/Game/Model/Textures/M_玻璃颜色_次深', 'http://www.baidu.com');
}

function test_ellipsoid_tools_restoreTexture() {
    fdapi.camera.set(492764.9925, 2491969.184375, 50.495825, -22.506271, -47.624001, 0);
    //批量恢复纹理
    let pathArr = ["/Game/Model/Textures/M_玻璃颜色_次深", "/Game/Temp/Textures/Url", "/Game/Temp/Textures/Image"];
    fdapi.tools.restoreTexture(pathArr);
}

//====================== settings ======================

let __uiVisible_ellipsoid = false;
function test_ellipsoid_settings_setMainUIVisibility() {
    __uiVisible_ellipsoid = !__uiVisible_ellipsoid;
    fdapi.settings.setMainUIVisibility(__uiVisible_ellipsoid);
}

let __joystickVisible_ellipsoid = true;
function test_ellipsoid_settings_setJoystickVisible() {
    __joystickVisible_ellipsoid = !__joystickVisible_ellipsoid;
    fdapi.settings.setScreenControlsVisible(__joystickVisible_ellipsoid);
}

let __campassVisible_ellipsoid = true;
function test_ellipsoid_settings_setCampassVisible() {
    __campassVisible_ellipsoid = !__campassVisible_ellipsoid;
    fdapi.settings.setCampassVisible(__campassVisible);
}

function test_ellipsoid_settings_setCampassPosition() {
    fdapi.settings.setCampassPosition(100, 100);
}

let __toolBarVisible_ellipsoid = true;
function test_ellipsoid_settings_setToolbarVisible() {
    __toolBarVisible_ellipsoid = !__toolBarVisible_ellipsoid;
    fdapi.settings.setToolbarVisible(__toolBarVisible_ellipsoid);
}

function test_ellipsoid_settings_setMousePickMask() {
    //此处可以用枚举，也可以直接设置数字，数字含义如下：
    //7: click, move, hover: 全开 
    //0: click, move, hover: 全关 
    let mask = MousePickMask.MouseClick | MousePickMask.MouseMove | MousePickMask.MouseHover;
    fdapi.settings.setMousePickMask(mask);
}

function test_ellipsoid_settings_enableMouseRightClick() {
    //开启鼠标右键点击拾取
    fdapi.settings.enableRightClickMousePick(true);
}

function test_ellipsoid_settings_setMapMode() {

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


function test_ellipsoid_settings_getMapMode() {
    fdapi.settings.getMapMode();
}

function test_ellipsoid_settings_setMapURL() {
    fdapi.settings.setMapURL('mapbox://styles/mapbox/streets-v10');
}

function test_ellipsoid_settings_setHighlightColor() {
    fdapi.settings.highlightColor(Color.Red);
}

function test_ellipsoid_settings_setFovX() {
    fdapi.settings.setFovX(75);
}

function test_ellipsoid_settings_setOceanColor() {
    fdapi.settings.setOceanColor(Color.Blue);
}

var __bEnableInteract = true;
function test_ellipsoid_settings_setEnableInteract() {
    __bEnableInteract = !__bEnableInteract;
    fdapi.settings.setEnableInteract(__bEnableInteract);

}

function test_ellipsoid_settings_setCharacterRotation() {
    fdapi.settings.setCharacterRotation([0, 90, 0]);
}


function test_ellipsoid_settings_setCharacterRoaming() {
    fdapi.settings.setCharacterRoaming([114.27, 24.36, 102.31], [-20, 8, 0], 10);
}


var __interactiveMode = 0;
function test_ellipsoid_settings_setInteractiveMode() {
    //设置交互模式 【0：漫游，1：人物，2：无人机，3：中心漫游（物体观察），4：地图】
    if (++__interactiveMode > 2)
        __interactiveMode = 0;
    fdapi.settings.setInteractiveMode(__interactiveMode);
}

function test_ellipsoid_settings_getInteractiveMode() {
    fdapi.settings.getInteractiveMode();
}


async function test_ellipsoid_settings_setCharacterAssetPath() {
    //设置人物漫游交互模式
    fdapi.settings.setInteractiveMode(1);

    //查询已经挂载的自定义人物角色模型
    let pathArr = await fdapi.settings.getCharacterAssetPath();
    //设置自定义的人物角色
    //fdapi.settings.setCharacterAssetPath('/JC_CustomAssets/PlayerLibrary/Exhibition/工人_2');
    fdapi.settings.setCharacterAssetPath(pathArr.paths[0]);

}

async function test_ellipsoid_settings_setDroneAssetPath() {
    //设置无人机漫游交互模式
    fdapi.settings.setInteractiveMode(2);
    //查询已经挂载的自定义人物角色模型
    let pathArr = await fdapi.settings.getDroneAssetPath();
    //设置自定义的无人机模型
    fdapi.settings.setDroneAssetPath('/JC_CustomAssets/UAVLibrary/Exhibition/Drone_A');
}


function test_ellipsoid_settings_setTerrainAlpha() {
    fdapi.settings.setTerrainAlpha(0.8);
}


var __bEnableCameraMovingEvent = false;
function test_ellipsoid_settings_setEnableCameraMovingEvent() {
    //是否开启相机移动事件监听
    __bEnableCameraMovingEvent = !__bEnableCameraMovingEvent;
    //相机事件触发的间隔帧数，默认间隔：20帧，即每20帧返回一次事件，注意：值越小事件返回的越快，取值范围：[0~100]
    let period = 20;
    fdapi.settings.setEnableCameraMovingEvent(__bEnableCameraMovingEvent, period);
}

function test_ellipsoid_settings_setWMTSLayerVisible() {
    fdapi.settings.setWMTSLayerVisible([["1", false], ["2", true], ["3", false]]);
}

function test_ellipsoid_settings_setWMTSLayerOpacity() {
    fdapi.settings.setWMTSLayerOpacity([["1", 0.5], ["2", 0.8]]);
}

function test_ellipsoid_settings_getVTPK() {
    fdapi.settings.getLabelLayer();
}

async function test_ellipsoid_settings_setVTPK() {
    let resultArr = await fdapi.settings.getLabelLayer();
    fdapi.settings.setLabelLayer(resultArr.vtpks[0]);
}

function test_ellipsoid_settings_removeVTPK() {
    fdapi.settings.removeLabelLayer();
}

function test_ellipsoid_settings_setCursorAutoSync() {
    //开启多客户端访问时鼠标同步
    fdapi.settings.setRenderedCursorVisible(true);
}

function test_ellipsoid_settings_getProjectWKT() {
    fdapi.settings.getProjectWKT();
}

async function test_ellipsoid_settings_setGroundHeight() {
    fdapi.settings.setGroundHeight(10);
}

function test_ellipsoid_settings_setLabelScale() {
    fdapi.settings.setLabelLayerScale(50);
}

function test_ellipsoid_settings_setWMTSLayerEnableDecal() {
    fdapi.settings.setImageryLayerEnableDecal(2);
}

async function test_setings_setMainPanelPos() {
    await fdapi.settings.setMainPanelPos(100, 100);
}


async function test_setings_showPropertiesPanel() {
    await fdapi.settings.showPropertiesPanel("3649A68E40EB53793C35EDA9AF7F007F");
}

async function test_setings_hidePropertiesPanel() {
    await fdapi.settings.hidePropertiesPanel();
}

async function test_setings_setPropertiesPanelPos() {
    await fdapi.settings.setPropertiesPanelPos(500, 280);
}



//====================== SettingsPanel ======================
function test_ellipsoid_settingsPanel_setReportMode() {
    /**
     * @param {number}  showAlign 汇报演示窗口位置   取值：0【底部】，1【居左】，2【居右】，默认0
     * @param {number}  playMode  汇报演示播放模式   取值： 0【单体播放】，1【单体循环】，2【整体循环】，默认0
     * @param {boolean} isLinkage 多视口相机是否联动 取值：联动true，不联动false，默认不联动false
     */
    fdapi.settingsPanel.setReportMode(1, 1, true);
}

function test_ellipsoid_settingsPanel_getReportMode() {
    fdapi.settingsPanel.getReportMode();
}

function test_ellipsoid_settingsPanel_setControlMode() {
    /**
     * @param {number}  speed        第一人称移动速度 取值范围：[0~1.0]，值越大移动速度越快，默认值：0.2
     * @param {number}  yawSpeed     视角左右旋转速度 取值范围：[0~1.0]，值越大旋转速度越快，默认值：1.0
     * @param {boolean} isRotateSelf 是否开启自由交互右键自传 取值：true开启，false不开启，默认false
     * @param {boolean} isUseMaleRole  第三人称交互是否使用男性角色 取值：true使用男性角色，false使用女性角色，默认false
     * @param {number}  viewType       角色漫游使用第三人称或第一人称，取值范围：[0,1]，0角色漫游使用第三人称，1角色漫游使用第一人称，默认值：0
     */
    fdapi.settingsPanel.setControlMode(0.5, 0.5, true, true, 1);
}

function test_ellipsoid_settingsPanel_getControlMode() {
    fdapi.settingsPanel.getControlMode();
}

function test_ellipsoid_settingsPanel_setPostProcessMode() {
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

function test_ellipsoid_settingsPanel_getPostProcessMode() {
    fdapi.settingsPanel.getPostProcessMode();
}

function test_ellipsoid_settingsPanel_setCameraMode() {
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

function test_ellipsoid_settingsPanel_getCameraMode() {
    fdapi.settingsPanel.getCameraMode();
}

function test_ellipsoid_settingsPanel_setMapMode() {
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

function test_ellipsoid_settingsPanel_getMapMode() {
    fdapi.settingsPanel.getMapMode();
}



//====================== misc ======================

function test_ellipsoid_misc_setDateTime() {
    //参数：year, month, day, hour, minute, second, daynightLoop
    fdapi.misc.setDateTime(2019, 1, 1, 10, 0, 0, false);
}

function test_ellipsoid_misc_addImageButton() {
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

function test_ellipsoid_misc_deleteImageButton() {
    fdapi.misc.deleteImageButtons('1');
}


async function test_ellipsoid_misc_getConvexPolygon() {

    let pointArr = china.features[15].geometry.coordinates[0];

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
            range: [0, 1000000],
            fontColor: fontColor,
            coordinate: pointArr[i],
            coordinateType: 1,
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
        range: [1, 1000000],
        color: [0, 0, 1, 0.8],
        frameColor: Color.White,
        frameThickness: 0.5,
        intensity: 1,
        style: PolygonStyle.SingleColor,
        depthTest: false
    };
    fdapi.polygon.add(polygon1);
    fdapi.polygon.focus('polygon1', 1000000);

}

function test_ellipsoid_misc_addAnimatedImageButton() {
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

function test_ellipsoid_misc_playVideo() {
    fdapi.misc.playVideo(1, 20, 20, 400, 300, HostConfig.Path + '/assets/video/video2.mov');
}

function test_ellipsoid_misc_stopPlayVideo() {
    fdapi.misc.stopPlayVideo(1);
}

function test_ellipsoid_misc_playMovie() {
    fdapi.misc.playMovie(HostConfig.Path + '/assets/video/video1.webm', true);
}

function test_ellipsoid_misc_stopMovie() {
    fdapi.misc.stopMovie();
}

var __playVideoAloneId = 0;
async function test_ellipsoid_misc_playVideoAlone() {
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

function test_ellipsoid_misc_stopPlayVideoAlone() {
    fdapi.misc.stopPlayVideoAlone(__playVideoAloneId);
}

function test_ellipsoid_misc_callBPFunction() {
    // 先移动相机镜头到动画场景范围内
    fdapi.camera.set(113.815309, 19.166937, 410772.11397, -49.236946, -83.893799, 0);

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

function test_ellipsoid_misc_setWindowResolution() {
    fdapi.misc.setWindowResolution(800, 600);
}

function test_ellipsoid_misc_enterReportMode() {
    fdapi.misc.enterReportMode();
}

function test_ellipsoid_misc_exitReportMode() {
    fdapi.misc.exitReportMode();
}


function test_ellipsoid_misc_enterMultiViewportMode() {
    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#DEA309";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);
}

function test_ellipsoid_misc_exitMultiViewportMode() {
    //退出多视口
    fdapi.misc.exitMultiViewportMode();
}

function test_ellipsoid_misc_setMultiviewportInteractSync() {
    //多视口模式下设置相机是否同步
    fdapi.misc.setMultiviewportInteractSync(true);
}

function test_ellipsoid_misc_setActiveViewport() {
    //设置激活一个视口
    fdapi.misc.setActiveViewport(1);
}

function test_ellipsoid_misc_getActiveViewport() {
    //获取当前激活的视口
    fdapi.misc.getActiveViewport();
}


async function test_ellipsoid_misc_getMaterial() {

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

async function test_ellipsoid_misc_getBPFunction() {
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

function test_ellipsoid_misc_reloadPak() {
    //从Cloud的文件资源配置中重新挂载新添加的pak文件，从而避免重启服务引起的实例关闭
    fdapi.misc.reloadPak();
}

// function test_ellipsoid_misc_download() {
//     //把文件下载到cloud服务器的指定磁盘路径
//     fdapi.misc.download('https://www.freedoonline.com/public/static/home2022/images/ewm1.png', 'C:/gzh/', 'wx.png');
// }

function test_ellipsoid_misc_projectCountAll() {
    //统计ACP工程包含的全部资产
    fdapi.misc.projectAssetCountAll();
}

function test_ellipsoid_misc_projectCount() {
    //统计3dt信息
    fdapi.misc.projectAssetCount(AssetType.EPT_Scene);
}



function test_ellipsoid_misc_showAllFoliages() {
    //调整相机至植物区域
    fdapi.camera.set(113.815309, 19.166937, 410772.11397, -49.236946, -83.893799, 0);
    //显示Explorer里创建的所有植物
    fdapi.misc.showAllFoliages();
}

function test_ellipsoid_misc_hideAllFoliages() {
    //调整相机至植物区域
    fdapi.camera.set(113.815309, 19.166937, 410772.11397, -49.236946, -83.893799, 0);
    //隐藏Explorer里创建的所有植物
    fdapi.misc.hideAllFoliages();
}


//====================== cameraTour ======================

async function test_ellipsoid_cameraTour_add() {
    await fdapi.cameraTour.delete('2');
    //通过接口添加导览并播放
    let frames = [];
    //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
    frames.push(new CameraTourKeyFrame(0, 1.0, [-96.941718, 37.753168, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(1, 2.0, [-157.352172, 39.100708, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(2, 3.0, [142.844776, 41.228857, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(3, 4.0, [108.048197, 41.097917, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(4, 5.0, [88.734282, 41.338165, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(5, 6.0, [120.895046, 23.092548, 1019482.589934], [-88.463272, -98.301071, 0]));

    let o = new CameraTourData('2', 'cameraTour_ellipsoid', frames);
    await fdapi.cameraTour.add(o);
    fdapi.cameraTour.play('2');
}

async function test_ellipsoid_cameraTour_update() {
    //调整关键帧
    let frames = [];

    //注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
    frames.push(new CameraTourKeyFrame(0, 1.0, [-96.941718, 37.753168, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(1, 2.0, [-157.352172, 39.100708, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(2, 3.0, [108.048197, 41.097917, 14117678.222722], [-89.897194, -83.953804, 0]));
    frames.push(new CameraTourKeyFrame(3, 4.0, [116.533297, 39.608607, 164999.351008], [-80.537132, -100.046936, 0]));

    let o = new CameraTourData('2', 'cameraTour_ellipsoid', frames);
    await fdapi.cameraTour.update(o);
    fdapi.cameraTour.play('2');
}

function test_ellipsoid_cameraTour_play() {
    fdapi.cameraTour.play('2');
}

function test_ellipsoid_cameraTour_setMouseClickToPause() {
    fdapi.cameraTour.setMouseClickToPause('2', false);
}

function test_ellipsoid_cameraTour_setTime() {
    fdapi.cameraTour.setTime('2', 3);
}

function test_ellipsoid_cameraTour_stop() {
    fdapi.cameraTour.stop();
}

function test_ellipsoid_cameraTour_delete() {
    fdapi.cameraTour.delete('2');
}

function test_ellipsoid_cameraTour_pause() {
    fdapi.cameraTour.pause();
}

function test_ellipsoid_cameraTour_resume() {
    fdapi.cameraTour.resume();
}

function test_ellipsoid_cameraTour_exportVideo() {
    fdapi.cameraTour.exportVideo('2', 'F:/cameraTour_ellipsoid.mp4');
}


//====================== light  ======================

async function test_ellipsoid_light_add() {

    //设置系统时间为晚上 灯光才会生效
    fdapi.weather.setDateTime(2022, 10, 16, 22, 11, false);


    //定位到灯光范围
    fdapi.camera.set(120.709205, 23.913107, 44695.475121, -62.94735, -76.56971, 0);


    fdapi.light.clear();

    //点光源
    let o1 = {
        "id": "light_1",// 光源唯一标识
        "type": 1, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[120.9581316, 23.8516062, 500]],//光源坐标位置 平面光位置是二维数组 两个点
        "color": [1, 1, 1, 1], //光源颜色
        "coordinateType": 1,//坐标系类型：0投影 1经纬度
        "intensity": 200,//光源亮度
        "distance": 100000,//光源可视距离
        "attenuationRadius": 100000,//光源衰减半径
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    }
    await fdapi.light.add(o1);


    //聚光灯(射灯)
    let o2 = {
        "id": "light_2",// 光源唯一标识
        "type": 2, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[119.9581316, 22.8516062, 500]],//光源位置坐标
        "color": [1, 1, 1, 1], //光源颜色
        "coordinateType": 1,//坐标系类型：0投影 1经纬度
        "intensity": 200,//光源亮度
        "distance": 1000000,//光源可视距离
        "outerConAngle": 95,//聚光灯投射扇形角度，仅光源类型为聚光灯时此参数生效
        "attenuationRadius": 100,//光源衰减半径
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    };
    await fdapi.light.add(o2);


    //平面光
    let o3 = {
        "id": "light_3",// 光源唯一标识
        "type": 3, //光源类型: 1点光源 2聚光灯 3平面光
        "coordinates": [[120.6589318898351, 24.15396025743768, 405.79987929774245], [120.68278837668915, 24.153170281697516, 435.13407608975047]],//光源坐标位置 平面光位置是二维数组 两个点
        "color": [0, 1, 0, 1], //光源颜色
        "coordinateType": 1,//坐标系类型：0投影 1经纬度
        "intensity": 200,//光源亮度
        "distance": 1000000,//光源可视距离
        "attenuationRadius": 100000,//光源衰减半径
        "thickness": 2,//平面光宽度，仅光源类型为平面光时此参数生效
        "castShadows": false,//是否开启阴影效果，当添加多个光源时非常耗性能 默认关闭
        "automate": true //是否根据系统时间自动开关，默认值：true
    }
    await fdapi.light.add(o3);
}

async function test_ellipsoid_light_update() {
    //不支持修改光源类型
    let o = {
        "id": "light_1", // 光源唯一标识
        "color": [1, 1, 0, 1], //光源颜色
        "intensity": 1000, //光源亮度
        "automate": false //是否根据系统时间自动开关 
    }
    await fdapi.light.update(o);
}

function test_ellipsoid_light_focus() {
    fdapi.light.focus('light_1', 10000, 1);
}

function test_ellipsoid_light_show() {
    fdapi.light.show('light_1');
}

function test_ellipsoid_light_showAll() {
    fdapi.light.showAll();
}

function test_ellipsoid_light_hideAll() {
    fdapi.light.hideAll();
}

function test_ellipsoid_light_hide() {
    fdapi.light.hide(['light_1', 'light_2', 'light_3']);
}

function test_ellipsoid_light_clear() {
    fdapi.light.clear();
}

function test_ellipsoid_light_delete() {
    fdapi.light.delete(['light_1', 'light_2', 'light_3']);
}

function test_ellipsoid_light_get() {
    fdapi.light.get('light_1');
}

//====================== beam ======================

async function test_ellipsoid_beam_add() {
    fdapi.beam.clear();
    let o1 = {
        id: 'beam1',
        coordinates: [
            [113.68148528510139, 32.057997362363494, 17.839086474818448],
            [113.68519479205867, 32.02843010188926, 27.98786926686889],
            [113.69585676552575, 31.985038569184166, 48.20155118148253]
        ],
        coordinateType: 1,
        duration: 2,        //光流粒子的生命周期
        thickness: 10,     //光流线的宽度比例
        interval: 1,       //光流粒子发射间隔
        velocity: 5,        //光流粒子的速度
        color: [0, 1, 0, 0.8]  //光流的颜色
    };

    let o2 = {
        id: 'beam2',
        coordinates: [
            [113.726618, 32.090476], [113.725711, 32.087856], [113.725512, 32.087317], [113.725401, 32.087027], [113.725817, 32.086149], [113.745536, 32.072806], [113.746575, 32.070849], [113.772685, 32.05161], [113.773487, 32.05142]
        ],
        coordinateType: 1,
        duration: 5,        //光流粒子的生命周期
        thickness: 20,     //光流线的宽度比例
        interval: 1,       //光流粒子发射间隔
        velocity: 8,        //光流粒子的速度
        color: [1, 0, 0, 0.8]  //光流的颜色
    };
    let beamArr = [];
    beamArr.push(o1);
    beamArr.push(o2);
    await fdapi.beam.add(beamArr);

    fdapi.beam.focus(o1.id, 600);
}

function test_ellipsoid_beam_update() {
    let o = {
        id: 'beam2',
        coordinates: [
            [113.725817, 32.086149], [113.745536, 32.072806], [113.746575, 32.070849], [113.772685, 32.05161], [113.773487, 32.05142]
        ],
        duration: 5,
        thickness: 10,
        interval: 0.2,
        velocity: 10,
        color: Color.Blue
    }
    fdapi.beam.update(o);
    fdapi.beam.focus(o.id);
}

function test_ellipsoid_beam_delete() {
    let ids = ['beam1', 'beam2'];
    fdapi.beam.delete(ids);
}

function test_ellipsoid_beam_focus() {
    fdapi.beam.focus('beam1', 20000);
}

function test_ellipsoid_beam_clear() {
    fdapi.beam.clear();
}

function test_ellipsoid_beam_get() {
    fdapi.beam.get(['beam1', 'beam2']);
}

function test_ellipsoid_beam_hide() {
    fdapi.beam.hide('beam1');
}

function test_ellipsoid_beam_show() {
    fdapi.beam.show('beam1');
}

function test_ellipsoid_beam_hideAll() {
    fdapi.beam.hideAll();
}

function test_ellipsoid_beam_showAll() {
    fdapi.beam.showAll();
}

function test_ellipsoid_beam_setThickness() {
    fdapi.beam.setThickness('beam1', 150);
}


//====================== radiationPoint ======================

async function test_ellipsoid_radiationPoint_add() {
    fdapi.radiationPoint.clear();
    let rp = {
        id: 'rp',
        coordinate: [116.3979471, 39.9081726, 100],//辐射圈坐标位置
        coordinateType: 1,
        radius: 88888,//辐射半径
        range: [0, 1000000000],//可见距离
        rippleNumber: 18,//波纹数量
        color: [1, 0, 0, 0.8],//颜色
        intensity: 1,//亮度
        autoHeight: false//自动判断下方是否有物体
    }
    await fdapi.radiationPoint.add(rp);
    fdapi.radiationPoint.focus(rp.id, 80000, 1);
}

async function test_ellipsoid_radiationPoint_update() {
    let rp = {
        id: 'rp',
        coordinate: [112.4618402, 34.6382273, 100],
        coordinateType: 1,
        radius: 99999,
        rippleNumber: 8,
        color: [1, 1, 0, 1],
        intensity: 2,
        autoHeight: true
    }
    await fdapi.radiationPoint.update(rp);
    fdapi.radiationPoint.focus(rp.id, 99999, 1);
}

function test_ellipsoid_radiationPoint_delete() {
    fdapi.radiationPoint.delete("rp");
}

function test_ellipsoid_radiationPoint_clear() {
    fdapi.radiationPoint.clear();
}

function test_ellipsoid_radiationPoint_focus() {
    fdapi.radiationPoint.focus('rp', 2000);
}

function test_ellipsoid_radiationPoint_focusAll() {
    fdapi.radiationPoint.focusAll();
}

function test_ellipsoid_radiationPoint_hide() {
    fdapi.radiationPoint.hide('rp');
}

function test_ellipsoid_radiationPoint_show() {
    fdapi.radiationPoint.show('rp');
}

function test_ellipsoid_radiationPoint_hideAll() {
    fdapi.radiationPoint.hideAll();
}

function test_ellipsoid_radiationPoint_showAll() {
    fdapi.radiationPoint.showAll();
}

function test_ellipsoid_radiationPoint_get() {
    fdapi.radiationPoint.get('rp');
}

//====================== polyline ======================

async function test_ellipsoid_polyline_add() {
    await fdapi.polyline.clear();
    //北京区划
    let beijing = china.features[0].geometry.coordinates[0];
    //河南区划
    let henan = china.features[15].geometry.coordinates[0];

    //使用PolylineStyle样式的折线
    let p1 = {
        id: 'p1',//折线唯一标识id
        coordinates: beijing,//构成折线的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [-10000, 10000000000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [-10000, 10000000000], //可见高度范围
        color: [0, 1, 0, 1],//折线颜色
        thickness: 1000,//折线宽度
        intensity: 1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
    };

    let p2 = {
        id: 'p2',//折线唯一标识id
        coordinates: henan,//构成折线的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [-10000, 10000000000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [-10000, 10000000000], //可见高度范围
        color: [0, 1, 0, 1],//折线颜色
        thickness: 2000,//折线宽度
        intensity: 1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
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
        ],
        vectorParameters: [{ "name": "颜色1", "value": [0, 1, 0] }], //材质数组类型参数
    };

    await fdapi.polyline.add([p1, p2]);
    fdapi.polyline.focus("p1", 5000);
}



async function test_ellipsoid_polyline_add_arcType(){

    await fdapi.polyline.clear();
    //北京 拉萨  球面绘制弧形 0：劣弧 1：优弧，
    let p1 = {
        id: 'p1',//折线唯一标识id
        coordinates: [[116.403963, 39.915112,0],
					  [91.131706, 29.654824, 0]],//构成折线的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [-10000, 10000000000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [-10000, 10000000000], //可见高度范围
        color: [0, 1, 0, 1],//折线颜色
        thickness: 100000,//折线宽度
        intensity: 1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: 5,//贴地
	    arcType: 0 //球面地形下绘制贴地弧线的类型，0：劣弧 1：优弧，默认值：0
    };
    let p2 = {
        id: 'p2',//折线唯一标识id
        coordinates: [[116.403963, 39.915112,0],
					  [91.131706, 29.654824, 0]],//构成折线的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        range: [-10000, 10000000000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        viewHeightRange: [-10000, 10000000000], //可见高度范围
        color: [1, 1, 0, 1],//折线颜色
        thickness: 100000,//折线宽度
        intensity: 1,//亮度
        flowRate: 0.5,//流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false,//是否做深度检测 开启后会被地形高度遮挡
        style: 5,//贴地
	    arcType: 1 //球面地形下绘制贴地弧线的类型，0：劣弧 1：优弧，默认值：0
    };
    await fdapi.polyline.add([p1,p2]);
    fdapi.polyline.focus("p1");
}

async function test_ellipsoid_polyline_update() {
    fdapi.polyline.updateBegin();
    fdapi.polyline.setStyle('p1', PolylineStyle.Arrow);//折线样式
    fdapi.polyline.setColor('p1', Color.Yellow);
    fdapi.polyline.setThickness('p1', 5000);
    fdapi.polyline.setBrightness('p1', 1);
    fdapi.polyline.setFlowRate('p1', 1);
    fdapi.polyline.setDepthTest('p1', false);//深度检测 打开会被地面高度遮挡
    fdapi.polyline.updateEnd();
}

function test_ellipsoid_polyline_delete() {
    fdapi.polyline.delete('p1');
}

function test_ellipsoid_polyline_clear() {
    fdapi.polyline.clear();
}

function test_ellipsoid_polyline_focus() {
    fdapi.polyline.focus('p1', 880, 1);
}

function test_ellipsoid_polyline_show() {
    fdapi.polyline.show('p1');
}

function test_ellipsoid_polyline_showAll() {
    fdapi.polyline.showAll();
}

function test_ellipsoid_polyline_hide() {
    fdapi.polyline.hide('p1');
}

function test_ellipsoid_polyline_hideAll() {
    fdapi.polyline.hideAll();
}


function test_ellipsoid_polyline_get() {
    fdapi.polyline.get(['p1', 'p2']);
}

function test_ellipsoid_polyline_setCoordinates() {
    //天津区划
    let tianjin = china.features[1].geometry.coordinates[0][0];
    fdapi.polyline.setCoordinates("p1", tianjin);
}


function test_ellipsoid_polyline_setStyle() {
    //参考折线样式枚举PolylineStyle
    fdapi.polyline.setStyle("p1", PolylineStyle.Arrow);
}


function test_ellipsoid_polyline_setThickness() {
    fdapi.polyline.setThickness("p1", 100);
}


function test_ellipsoid_polyline_setColor() {
    fdapi.polyline.setColor("p1", [1, 1, 0, 0.6]);
}


function test_ellipsoid_polyline_setFlowRate() {
    fdapi.polyline.setFlowRate("p1", 2);
}


function test_ellipsoid_polyline_setBrightness() {
    fdapi.polyline.setBrightness("p1", 2);
}

function test_ellipsoid_polyline_setShape() {
    fdapi.polyline.setShape("p1", 1);
}

function test_ellipsoid_polyline_setDepthTest() {
    //true会被地形遮挡
    fdapi.polyline.setDepthTest("p1", true);
}

function test_ellipsoid_polyline_setViewHeightRange() {
    fdapi.polyline.setViewHeightRange("p1", 0, 5000);
}



//====================== odline ======================

async function test_ellipsoid_odline_add() {


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
    //北京到上海航线
    let od1 = {
        id: 'od1',//ODLine唯一标识
        color: [0, 1, 0, 1],//填充颜色  
        coordinates: [[116.3979471, 39.9081726, 78], [121.4692688, 31.2381763, 75]],//构成ODLine的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        flowRate: 0.5,//流速
        intensity: 100,//亮度
        bendDegree: 0.5,//弯曲度
        tiling: 100000,//材质贴图平铺比例
        lineThickness: 10000,//折线宽度
        flowPointSizeScale: 20000,//运动点的缩放值
        labelSizeScale: 1000,//两端点的缩放值

        lineShape: 1,  //ODLine模型样式 0:平面 1:柱体，默认值1
        lineStyle: 2,  //ODLine材质样式 0:纯色，1:箭头，2:流动点，3：虚线，默认值0（Style为2时建议手动设置Tiling 例如设为1）
        flowShape: 1,  //ODLine发光点样式 0:无 1:球体，默认值0

        startPointShape: 2,//点的样式
        endPointShape: 1,//点的样式
        startLabelShape: 1,//点的样式
        endLabelShape: 1//点的样式
    };

    //四川到河南航线
    let od2 = {
        id: 'od2',//ODLine唯一标识
        color: [1, 1, 0, 1],//填充颜色 
        coordinates: [
            [104.0817566, 30.6610565, 100],
            [113.6500473, 34.7570343, 23]
        ],//构成ODLine的坐标点数组
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        flowRate: 1,//流速
        intensity: 6,//亮度
        bendDegree: 0.5,//弯曲度
        tiling: 10,//材质贴图平铺比例
        lineThickness: 10000,//折线宽度
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

async function test_ellipsoid_odline_update() {
    let o = {
        id: 'od1',
        color: [1, 1, 1, 1],
    };
    await fdapi.odline.update(o);
    fdapi.odline.focus(o.id);
}

function test_ellipsoid_odline_delete() {
    fdapi.odline.delete('od1');
}

function test_ellipsoid_odline_clear() {
    fdapi.odline.clear();
}

function test_ellipsoid_odline_focus() {
    fdapi.odline.focus('od1', 600, 1);
}

function test_ellipsoid_odline_show() {
    fdapi.odline.show('od1');
}

function test_ellipsoid_odline_showAll() {
    fdapi.odline.showAll();
}

function test_ellipsoid_odline_hide() {
    fdapi.odline.hide('od1');
}

function test_ellipsoid_odline_hideAll() {
    fdapi.odline.hideAll();
}

function test_ellipsoid_odline_get() {
    fdapi.odline.get(['od1', 'od2']);
}



//====================== polygon ======================

async function test_ellipsoid_polygon_add() {
    fdapi.polygon.clear();

    let polygonArr = [];
    //中国区划
    for (let i = 0; i < china.features.length; i++) {
        let province = china.features[i].geometry.coordinates;
        //使用PolygonStyle样式的面
        let p1 = {
            id: 'polygon' + i,
            coordinates: province,
            coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
            range: [-10000, 100000000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
            viewHeightRange: [-10000, 100000000], //可见高度范围
            color: [Math.random(), Math.random(), Math.random(), 0.8],//多边形的随机填充颜色
            frameColor: Color.White,//边框颜色
            frameThickness: 1,//边框厚度
            intensity: 1, //亮度
            style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
            depthTest: false, //是否做深度检测 开启后会被地形高度遮挡
            priority: i, //叠加显示的优先级 值越大显示越靠上
            //material: "/JC_CustomAssets/PolygonLibrary/Exhibition/平面_5", //自定义材质路径 设置后style相关参数会失效
            //scalarParameters: [{ "name": "亮度", "value": 0.5 }],  //材质数值类型参数
            //vectorParameters: [{ "name": "颜色", "value": [0, 1, 0] }], //材质数组类型参数
        };
        polygonArr.push(p1);
    }
    await fdapi.polygon.add(polygonArr);
    fdapi.polygon.focus('polygon15', 8000);
}

async function test_ellipsoid_polygon_update() {
    let o = {
        id: 'polygon0',
        color: Color.Yellow,
        intensity: 100,
    };
    await fdapi.polygon.update(o);
    fdapi.polygon.focus('polygon1', 200, 1);
}

function test_ellipsoid_polygon_highlight() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.highlight(ids);
}

function test_ellipsoid_polygon_stophighlight() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.unHighlight(ids);
}

function test_ellipsoid_polygon_delete() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.delete(ids);
}

function test_ellipsoid_polygon_clear() {
    fdapi.polygon.clear();
}

function test_ellipsoid_polygon_focus() {
    fdapi.polygon.focus('polygon1', 8000, 1);
}

function test_ellipsoid_polygon_show() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.show(ids);
}

function test_ellipsoid_polygon_hide() {
    let ids = ['polygon1', 'polygon2'];
    fdapi.polygon.hide(ids);
}

function test_ellipsoid_polygon_get() {
    fdapi.polygon.get(['polygon1', 'polygon2']);
}

function test_ellipsoid_polygon_setViewHeightRange() {
    fdapi.polygon.setViewHeightRange('polygon1', 0, 2000);
}


//====================== polygon3d ======================

async function test_ellipsoid_polygon3d_add() {
    fdapi.polygon3d.clear();

    //河南区划
    let henan = china.features[15].geometry.coordinates[0];
    //山西区划
    let shanxi = china.features[3].geometry.coordinates[0];

    //使用Polygon3DStyle样式的polygon3d
    let o1 = {
        id: 'p3d1',
        coordinates: shanxi,
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [0, 0, 0, 1],        //颜色值
        height: 10000,                //3D多边形的高度
        intensity: 1.0,             //亮度
        viewHeightRange: [-10000, 10000000], //可见高度范围
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
        coordinates: henan,
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [0, 1, 0, 1],        //颜色值
        height: 80000,                //3D多边形的高度
        intensity: 1.0,             //亮度
        viewHeightRange: [-10000, 10000000], //可见高度范围
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

async function test_ellipsoid_polygon3d_update() {
    let o = {
        id: 'p3d1',
        color: '#33561A',    //颜色值
        height: 80000,            //3D多边形的高度
        intensity: 10.0,         //亮度
        style: 1
    };
    await fdapi.polygon3d.update(o);
    fdapi.polygon3d.focus(o.id);
}

function test_ellipsoid_polygon3d_delete() {
    fdapi.polygon3d.delete(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_clear() {
    fdapi.polygon3d.clear();
}

function test_ellipsoid_polygon3d_highlight() {
    //仅部分样式支持高亮闪烁，和材质有关
    fdapi.polygon3d.highlight('p3d1');
}

function test_ellipsoid_polygon3d_stopHighlight() {
    fdapi.polygon3d.unHighlight('p3d1');
}

function test_ellipsoid_polygon3d_glow() {
    fdapi.polygon3d.glow([{
        id: 'p3d1',
        color: [1, 1, 1, 1],
        duration: 5, //持续闪烁5秒
        interval: 1  //每隔1秒闪烁一次
    }]);
}

function test_ellipsoid_polygon3d_stopGlow() {
    fdapi.polygon3d.stopGlow('p3d1');
}


function test_ellipsoid_polygon3d_focus() {
    fdapi.polygon3d.focus('p3d1', 10);
}

function test_ellipsoid_polygon3d_show() {
    fdapi.polygon3d.show(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_hide() {
    fdapi.polygon3d.hide(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_get() {
    fdapi.polygon3d.get(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_hideAll() {
    fdapi.polygon3d.hideAll();
}

function test_ellipsoid_polygon3d_showAll() {
    fdapi.polygon3d.showAll();
}

function test_ellipsoid_polygon3d_enableClip() {
    fdapi.polygon3d.enableClip(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_disableClip() {
    fdapi.polygon3d.disableClip(['p3d1', 'p3d2']);
}

function test_ellipsoid_polygon3d_setViewHeightRange() {
    fdapi.polygon3d.setViewHeightRange('p3d1', 1, 1000);
}



//====================== boxTrigger ======================
async function test_ellipsoid_boxTrigger_add() {

    //gps轨迹
    let positionArr = [[116.72449861638597, 39.90997313824675, 561.1914926457898], [116.72444459469368, 39.90999407918933, 561.349360696554], [116.72438133094131, 39.91002606762611, 561.4767707968978], [116.72431101794984, 39.91006912898188, 561.6911347865858], [116.72424240360513, 39.91016325379877, 561.7394112314994], [116.72421124103994, 39.91030853924401, 562.0381455886591], [116.72419256470367, 39.91056207626482, 562.4823418155005], [116.72419979208004, 39.91104252698827, 562.9955586294799], [116.72404346252542, 39.91130185459239, 563.6134067728719], [116.72385978663766, 39.91115963412055, 563.6935679969664], [116.72389169004906, 39.91064950988221, 562.8815961118645], [116.72392231516781, 39.91040538052158, 562.6384178496259], [116.72395676514259, 39.91024768989526, 562.3094806190936], [116.72400641106644, 39.910106250556375, 561.9712370176809], [116.72405814558306, 39.910014924295744, 561.9247202380113], [116.72411842741052, 39.909941951896045, 561.6981588118476], [116.72418412891388, 39.90989852290287, 561.4787965451535]];

    //包围盒范围
    let boxTrigger1 = {
        id: "boxTrigger1",
        bbox: [
            116.72385978663766,
            39.90989852290287,
            561.1914926457898,
            116.72449861638597,
            39.91130185459239,
            563.6935679969664
        ]
    }
    fdapi.boxTrigger.clear();
    //创建盒子范围热区
    fdapi.boxTrigger.add(boxTrigger1);

    //创建并移动co对象 触发事件
    fdapi.customObject.clear();
    //投影坐标
    let co_location = positionArr[0];
    let o = {
        id: 'o1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: co_location,//位置坐标
        coordinateType: 1,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [-1000, 100000000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        supportAttach: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    await fdapi.customObject.add(o);
    fdapi.customObject.focus(o.id);

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
    //fdapi.customObject.focus('o1', 5000, 0, [-30, 4, 0], ActionMode.Follow);
    //车辆按GPS轨迹移动
    fdapi.customObject.startMove('o1', 0, pathPointArr);

}

async function test_ellipsoid_boxTrigger_delete() {
    fdapi.boxTrigger.delete('boxTrigger1');
}

async function test_ellipsoid_boxTrigger_clear() {
    fdapi.boxTrigger.clear();
}



//====================== Satellite ======================
async function test_ellipsoid_satellite_add() {
    //设置最大相机高度maxCameraHeight
    let nearClipPlane = 10;
    let fovH = 90;
    let minCameraHeight = -5;
    let maxCameraHeight = 200000000;//20万公里
    fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);

    //卫星像素颜色数组：蓝绿黄橙红
    let colorArr = [
        [1, 0, 0, 1],
        [1, 0.5, 0, 1],
        [1, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 0, 1],
    ];

    //生成随机卫星文字名称
    function genRandomText() {
        // 1. 生成随机五位数（范围：10000 ~ 99999）
        const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);

        // 2. 定义可选的版本号列表
        const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];

        // 3. 随机选取一个版本号（通过随机索引获取）
        const randomVersion = versions[Math.floor(Math.random() * versions.length)];

        // 4. 拼接字符串：五位数 + 换行符(\n) + 随机版本号
        const result = `* ${randomFiveNum}\r${randomVersion}`;

        return result;
    }

    fdapi.satellite.clear();
    //模拟1000个卫星
    let count = 1000;

    //注意：各缩略图的分辨率需保证一致
    let path = HostConfig.Path + '/locale/zh/images/';
    let thumbnailPathArr = [path+"acp.png",path+"antennaPattern.png"];

    let satelliteArr = [];
    let coordinatArr = [];
    for (let i = 0; i < count; i++) {
        //随机全球范围 -180~180
        let lon = (Math.random() * 2.0 - 1.0) * 180;
        //南极不出现卫星 -85~85
        let lat = (Math.random() * 2.0 - 1.0) * 85;
        let h = 1000000 + (Math.random() * 1000000);//模拟低轨卫星高度
        let coord = [lon, lat, h];
        coordinatArr.push(coord);
        //随机五种颜色其中的一种
        let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;
        let satellite = {
            "id": "" + i,
            "text": genRandomText(),//卫星显示的文字
            "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_1",//卫星模型资源路径
            "coordinate": coord,
            "pointSize": 16, //卫星圆点像素大小
            "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种
            "imagePath": thumbnailPathArr[(Math.random()>0.5?0:1)],//卫星缩略图文件路径 随机thumbnailPathArr[]数组内的路径
            "imageSize": [48,48],//卫星缩略图尺寸
        };
        satelliteArr.push(satellite);
    }

    
    //参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离
    fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);

    let index = 0;
    let timer = setInterval(function () {
        if (index < 60) {
            for (let i = 0; i < count; i++) {
                coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.8);
                coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.8);
                coordinatArr[i][2] = satelliteArr[i].coordinate[2]
                satelliteArr[i].coordinate = coordinatArr[i];
            }
            fdapi.satellite.update(satelliteArr, 1);
            index++;
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
}


async function test_ellipsoid_satellite_add1() {
    

    //设置最大相机高度maxCameraHeight
    let nearClipPlane = 10;
    let fovH = 90;
    let minCameraHeight = -5;
    let maxCameraHeight = 200000000;//20万公里
    fdapi.settingsPanel.setCameraMode(nearClipPlane, fovH, minCameraHeight, maxCameraHeight);

    //卫星像素颜色数组：蓝绿黄橙红
    let colorArr = [
        [1, 0, 0, 1],
        [1, 0.5, 0, 1],
        [1, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 0, 1],
    ];

    //生成随机卫星文字名称
    function genRandomText() {
        // 1. 生成随机五位数（范围：10000 ~ 99999）
        const randomFiveNum = Math.floor(Math.random() * 90000 + 10000);

        // 2. 定义可选的版本号列表
        const versions = ['v1.5', 'v2', 'v2 mini', 'v1.0'];

        // 3. 随机选取一个版本号（通过随机索引获取）
        const randomVersion = versions[Math.floor(Math.random() * versions.length)];

        // 4. 拼接字符串：五位数 + 换行符(\n) + 随机版本号
        const result = `* ${randomFiveNum}\r${randomVersion}`;

        return result;
    }

    fdapi.satellite.clear();
    //模拟10000个卫星
    let count = 10000;
    //关闭日志自动输出
    document.getElementById("closeLog").checked = false;

    let satelliteArr = [];
    let coordinatArr = [];
    for (let i = 0; i < count; i++) {
        //随机全球范围 -180~180
        let lon = (Math.random() * 2.0 - 1.0) * 180;
        //南极不出现卫星 -85~85
        let lat = (Math.random() * 2.0 - 1.0) * 85;
        let h = 1000000+ Math.random() * 1000000
        let coord = [lon, lat, h];
        coordinatArr.push(coord);
        //随机五种颜色其中的一种
        let colorIndex = Math.floor(Math.random() * 5 + 1) - 1;
        let satellite = {
            "id": i+"",
            "text": genRandomText(),//卫星显示的文字
           "assetPath": "/JC_CustomAssets/ObjectLibrary/Exhibition/卫星/Satellite_2",//卫星模型资源路径
		 //   "assetPath": "/SatelliteSystem/Object",
            "coordinate": coord,
            "pointSize": 12, //卫星圆点像素大小
            "color": colorArr[colorIndex], //卫星圆点像素颜色 随机使用五种颜色其中的一种
		    "modelRotation":[0,coord[0],0]//卫星模型旋转 需要再传，不需要不传，节省性能
        };
        satelliteArr.push(satellite);
    }

    
    //参数说明：卫星对象数组、卫星文字可见范围、卫星模型可见范围、卫星缩略图的最大可见距离
    fdapi.satellite.add(satelliteArr, [0, 500000], [0, 10000], 1000000);

    let index = 0;
    let timer = setInterval(function () {
        if (index < 60) {
            for (let i = 0; i < count; i++) {
                //卫星模型位置
                coordinatArr[i][0] += ((Math.random() * 2.0 - 1.0) * 0.6);
                coordinatArr[i][1] += ((Math.random() * 2.0 - 1.0) * 0.6);
                coordinatArr[i][2] = satelliteArr[i].coordinate[2]
                satelliteArr[i].coordinate = coordinatArr[i];
                //卫星模型旋转
			    satelliteArr[i].modelRotation[0] = Math.random()*50
			    satelliteArr[i].modelRotation[1] = Math.random()*50
            }
            fdapi.satellite.update(satelliteArr, 1);
            index++;
        }
        else {
            clearInterval(timer);
        }
    }, 1000);
    
}


async function test_ellipsoid_satellite_highlight() {

    //高亮100个卫星
    let count = 100;
    let idsArr = [];
    for (let i = 0; i < count; i++) {
        idsArr.push(i + "");
    }
    fdapi.satellite.highlight(idsArr, 2, [0.5, 2], [0.5, 1], [0.5, 3]);
}

async function test_ellipsoid_satellite_unHighlight() {
    //取消高亮88个卫星
    let count = 88;
    let idsArr = [];
    for (let i = 0; i < count; i++) {
        idsArr.push(i + "");
    }
    fdapi.satellite.unHighlight(idsArr);
}

async function test_ellipsoid_satellite_unHighlightAll() {
    //全部取消高亮
    fdapi.satellite.unHighlightAll();
}


async function test_ellipsoid_satellite_addLinkage() {
    fdapi.satellite.clearLinkage();
    let linkArr = []
    for (let i = 0; i < 500; i++) {
        let linkage = {
            "id": "linkage_" + i,
            //"material": "/ScreenSpacePolyline/Material/Track_1",
            //"material": "/JC_CustomAssets/PolylineLibrary/Exhibition/混合线_3",
            "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
            "startId": "" + i,
            "endId": "" + (i + 1),
            "thickness": 16,
            "color": [0, 1, 0, 1]
        }
        linkArr.push(linkage);
    }
    await fdapi.satellite.addLinkage(linkArr,[{
            "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
            "scalarParameters": [
                {"paramName": "RepeatPx","paramValue": 128},
                {"paramName": "Speed","paramValue": 0.5},
                {"paramName": "Brightness","paramValue": 5},
                {"paramName": "PointBrightness","paramValue": 10}
            ],
            "vectorParameters": [
                {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}
            ],
    }]);
}

async function test_ellipsoid_satellite_updateLinkage(){
    let linkArr = []
    for (let i = 0; i < 500; i++) {
        let linkage = {
            "id": "linkage_" + i,
            "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
            "thickness": 20,
            "color": [1, 1, 0, 1]
        }
        linkArr.push(linkage);
    }
    await fdapi.satellite.updateLinkage(linkArr,[{
            "material": "/ScreenSpacePolyline/Satellite/Style0_Inst",
            "scalarParameters": [
                {"paramName": "RepeatPx","paramValue": 128},
                {"paramName": "Speed","paramValue": 0.5},
                {"paramName": "Brightness","paramValue": 5},
                {"paramName": "PointBrightness","paramValue": 10}
            ],
            "vectorParameters": [
                {"paramName": "debug","paramValue": [0.1,0.2,0.3,0.4]}
            ],
    }]);

}

async function test_ellipsoid_satellite_deleteLinkage(){
    fdapi.satellite.deleteLinkage(["linkage_1","linkage_2","linkage_3"]);
}

async function test_ellipsoid_satellite_clearLinkage(){
    fdapi.satellite.clearLinkage();
}

async function test_ellipsoid_satellite_setFollow() {
    //跟随卫星模型 跟随不支持flyTime 
    fdapi.satellite.setFollow(["500"], 20, -29, -30);
}

function test_ellipsoid_satellite_cancelFollow(){
    fdapi.camera.cancelFollow();
}

async function test_ellipsoid_satellite_getBPFunction(){
    fdapi.satellite.getBPFunction(["500","501","502"]);
}

async function test_ellipsoid_satellite_callBPFunction(){
    let bpFunctionArr = [{
            "id": "500",
            "functionName": "Scale",
            "parameters": [{ "paramType": 3, "paramValue": 2 }]
        }];
    //把卫星模型缩放2倍
    fdapi.satellite.callBPFunction(bpFunctionArr);
}

async function test_ellipsoid_satellite_focus() {
    fdapi.satellite.focus(["500"], 20, 0, -29, -30);
}


async function test_ellipsoid_satellite_get() {
    fdapi.satellite.get(["500","501","502"]);
}

async function test_ellipsoid_satellite_hideModel() {
    fdapi.satellite.hideModel(["500","501","502"]);
}

async function test_ellipsoid_satellite_showModel() {
    fdapi.satellite.showModel(["500","501","502"]);
}

async function test_ellipsoid_satellite_showText() {
    fdapi.satellite.showText(["500","501","502"]);
}

async function test_ellipsoid_satellite_hideText() {
    fdapi.satellite.hideText(["500","501","502"]);
}

async function test_ellipsoid_satellite_showSatellite() {
    fdapi.satellite.showSatellite(["500","501","502"]);
}

async function test_ellipsoid_satellite_hideSatellite() {
    fdapi.satellite.hideSatellite(["500","501","502"]);
}

async function test_ellipsoid_satellite_deleteSatellite() {
    fdapi.satellite.deleteSatellite(["500","501","502"]);
}

async function test_ellipsoid_satellite_clear() {
    fdapi.satellite.clear();
}



//=========================CustomObject=========================

async function test_ellipsoid_customObject_add() {

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
    let co_location = [116.724502, 39.905023, 100];
    let o = {
        id: 'o1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: co_location,//位置坐标
        coordinateType: 1,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [-10000, 10000000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        supportAttach: false, //可选，是否支持贴画贴合，默认值：true
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        autoHeight: true, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    await fdapi.customObject.add(o);
    fdapi.customObject.focus(o.id);
}

async function test_ellipsoid_customObject_update() {
    let o = {
        id: 'o1',//自定义对象唯一id
        scale: [10, 10, 10],//模型放大2倍
        rotation: [0, 50, 0],// 世界坐标系旋转
    };
    await fdapi.customObject.update(o);
}

function test_ellipsoid_customObject_delete() {
    fdapi.customObject.delete('o1');
}

function test_ellipsoid_customObject_clear() {
    fdapi.customObject.clear();
}

function test_ellipsoid_customObject_focus() {
    //-1:车辆移动时设置相机自动跟随 
    fdapi.customObject.focus('o1', -1);

    //使用ActionMode枚举设置相机跟随模式

    //后方自定义姿态 距离5米
    //fdapi.customObject.focus('o1', 5 , 0 , [-30, 4 , 0] , ActionMode.Follow);
    //后上方默认枚举 距离5米
    //fdapi.customObject.focus('o1', 5 , 0 , null , ActionMode.FollowBehindAndAbove);

}

function test_ellipsoid_customObject_show() {
    fdapi.customObject.show('o1');
}

function test_ellipsoid_customObject_hide() {
    fdapi.customObject.hide('o1');
}


function test_ellipsoid_customObject_showByGroupId() {
    fdapi.customObject.showByGroupId('coGroup');
}

function test_ellipsoid_customObject_hideByGroupId() {
    fdapi.customObject.hideByGroupId('coGroup');
}

function test_ellipsoid_customObject_highlight() {
    //设置高亮颜色（全局生效）
    fdapi.settings.highlightColor(Color.Red);
    //高亮co
    fdapi.customObject.highlight('o1');
}

function test_ellipsoid_customObject_unhighlight() {
    fdapi.customObject.unHighlight();
}

function test_ellipsoid_customObject_get() {
    fdapi.customObject.get('o1');
}

function test_ellipsoid_customObject_startGlow() {
    fdapi.customObject.glow([{
        id: 'o1',
        color: [1, 0, 0, 1],
        duration: 5, //持续闪烁5秒
        interval: 1  //每隔1秒闪烁一次
    }]);
}

function test_ellipsoid_customObject_stopGlow() {
    fdapi.customObject.stopGlow(['o1']);
}

function test_ellipsoid_customObject_getBPFunction() {
    fdapi.customObject.getBPFunction(['o1']);
}

async function test_ellipsoid_customObject_addByTileLayer() {
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
        location: [98.582646, 38.929833, 300],
        tileLayerId: tileLayerId,
        //注意5.3新增特性：数组参数 也支持复制单个构件
        objectId: objectIds,
        coordinateType: 1,// 坐标系类型 
        rotation: [0, 90, 0],//模型旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 0     //1: 平滑移动，0: 跳跃移动
    });
    fdapi.customObject.focus('mergeActors', 10);
}

function test_ellipsoid_customObject_showGrowth() {

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


function test_ellipsoid_customObject_getBPFunction() {

    //创建工程车_3
    fdapi.customObject.clear();
    let truck = {
        id: 'truck',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/工程车/工程车_3',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [117.201509, 39.085318, 1000],//位置坐标
        coordinateType: 1,// 坐标系类型 
        rotation: [0, 90, 0],// 世界坐标系旋转
        range: [-1000, 1000000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        isEffectRotation: true,//是否开启旋转效果
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        supportAttach: false, //不支持贴画贴合
        visible: true,//模型加载后默认是否显示
        autoHeight: false, //是否开启自动高度 开启后自动贴地不再使用坐标Z
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
    };
    fdapi.customObject.add(truck);
    fdapi.customObject.focus(truck.id);

    //查询自定义对象包含的蓝图函数
    fdapi.customObject.getBPFunction(['truck']);
}


async function test_ellipsoid_customObject_callFunction() {

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


function test_ellipsoid_customObject_setPos() {
    fdapi.customObject.focus('o1', -1);
    fdapi.customObject.updateBegin();
    fdapi.customObject.setSmoothMotion('o1', 1);
    fdapi.customObject.setLocation('o1', [493181.4375, 2492026.5, 2]);
    //设置移动插值时间为5秒
    fdapi.customObject.setSmoothTime('o1', 5);
    fdapi.customObject.updateEnd();
}

function test_ellipsoid_customObject_setSmoothTime() {
    fdapi.customObject.setSmoothTime('o1', 5);
}

async function test_ellipsoid_customObject_setRotation() {
    //设置世界坐标系的旋转
    await fdapi.customObject.setRotation('o1', [0, 90, 0]);
    fdapi.customObject.focus('o1');
}


async function test_ellipsoid_customObject_setLocalRotation() {
    //设置模型本身旋转（针对模型朝向不正确进行调整）
    await fdapi.customObject.setLocalRotation('o1', [0, 90, 0]);
    fdapi.customObject.focus('o1');
}

var __co_scale = [1, 1, 1];
function test_ellipsoid_customObject_setScale() {
    __co_scale[0] += 0.2;
    __co_scale[1] += 0.2;
    __co_scale[2] += 0.2;
    fdapi.customObject.setScale('o1', __co_scale);
}

function test_ellipsoid_customObject_setSmoothMotion() {
    fdapi.customObject.setSmoothMotion("o1", 1);
}

function test_ellipsoid_customObject_setTintColor() {
    fdapi.customObject.setTintColor('o1', [0.5, 0.5, 0.5, 1]);
}

async function test_ellipsoid_customObject_overrideMaterial() {


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

function test_ellipsoid_customObject_restoreMaterial() {
    //恢复自定义对象材质
    fdapi.customObject.restoreMaterial(['o1', 'o2']);
}

function test_ellipsoid_customObject_setViewportVisible() {
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

function test_ellipsoid_customObject_startMove() {
    /**
     * 功能描述：实现车辆按GPS轨迹移动，每隔500毫秒移动一次 
     */

    //gps轨迹
    let positionArr = [[116.72449861638597, 39.90997313824675, 561.1914926457898], [116.72444459469368, 39.90999407918933, 561.349360696554], [116.72438133094131, 39.91002606762611, 561.4767707968978], [116.72431101794984, 39.91006912898188, 561.6911347865858], [116.72424240360513, 39.91016325379877, 561.7394112314994], [116.72421124103994, 39.91030853924401, 562.0381455886591], [116.72419256470367, 39.91056207626482, 562.4823418155005], [116.72419979208004, 39.91104252698827, 562.9955586294799], [116.72404346252542, 39.91130185459239, 563.6134067728719], [116.72385978663766, 39.91115963412055, 563.6935679969664], [116.72389169004906, 39.91064950988221, 562.8815961118645], [116.72392231516781, 39.91040538052158, 562.6384178496259], [116.72395676514259, 39.91024768989526, 562.3094806190936], [116.72400641106644, 39.910106250556375, 561.9712370176809], [116.72405814558306, 39.910014924295744, 561.9247202380113], [116.72411842741052, 39.909941951896045, 561.6981588118476], [116.72418412891388, 39.90989852290287, 561.4787965451535]];

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
    fdapi.customObject.startMove('o1', 1, pathPointArr);
}


function test_ellipsoid_customObject_pause() {
    fdapi.customObject.pause(['o1']);
}

function test_ellipsoid_customObject_resume() {
    fdapi.customObject.resume(['o1']);
}

function test_ellipsoid_customObject_setMoveRate() {
    //设置2倍速移动
    fdapi.customObject.setMoveRate([{ 'id': 'o1', 'rate': 2 }]);
}

function test_ellipsoid_customObject_stop() {
    fdapi.customObject.stop(['o1']);
}


function test_ellipsoid_customObject_MoveTo() {

    //定位co
    fdapi.customObject.focus('o1');
    //模拟实时gps坐标
    let realTimeGPSPoint = [[116.72449861638597, 39.90997313824675, 561.1914926457898], [116.72444459469368, 39.90999407918933, 561.349360696554], [116.72438133094131, 39.91002606762611, 561.4767707968978], [116.72431101794984, 39.91006912898188, 561.6911347865858], [116.72424240360513, 39.91016325379877, 561.7394112314994], [116.72421124103994, 39.91030853924401, 562.0381455886591], [116.72419256470367, 39.91056207626482, 562.4823418155005], [116.72419979208004, 39.91104252698827, 562.9955586294799], [116.72404346252542, 39.91130185459239, 563.6134067728719], [116.72385978663766, 39.91115963412055, 563.6935679969664], [116.72389169004906, 39.91064950988221, 562.8815961118645], [116.72392231516781, 39.91040538052158, 562.6384178496259], [116.72395676514259, 39.91024768989526, 562.3094806190936], [116.72400641106644, 39.910106250556375, 561.9712370176809], [116.72405814558306, 39.910014924295744, 561.9247202380113], [116.72411842741052, 39.909941951896045, 561.6981588118476], [116.72418412891388, 39.90989852290287, 561.4787965451535]]

    //模拟1秒获取一个gps坐标位置 并设置co运动MoveTo方法
    let index = 0;
    let timer = setInterval(function () {
        index++;
        if (index < realTimeGPSPoint.length) {
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

//暂未开放
function test_ellipsoid_customObject_stopMove() {
    //自定义对象停止移动
    fdapi.customObject.stopMove('o1');
}


//=========================TileLayer=========================

async function test_ellipsoid_tileLayer_add() {
    //添加小别墅
    fdapi.tileLayer.delete('villa');
    await fdapi.tileLayer.add({
        id: 'villa',
        viewHeightRange: [-10000, 1000000000],
        fileName: HostConfig.Path + "/assets/3dt/villa.3dt",//3dt文件路径
        rotation: [0, 0, 0],
        wkt: 'EPSG:4547'
    });

    //相机定位
    fdapi.camera.set(109.512455, -0.000955, 56.258852, -37.846542, -59.504467, 0);
}

async function test_ellipsoid_tileLayer_update() {
    await fdapi.tileLayer.update({
        id: 'villa',
        rotation: [0, 90, 0],//旋转角度
        scale: [1, 1, 1]    //缩放大小
    });
}

function test_ellipsoid_tileLayer_delete() {
    fdapi.tileLayer.delete('villa');
}

function test_ellipsoid_tileLayer_focus() {
    fdapi.tileLayer.focus('villa');
}

function test_ellipsoid_tileLayer_clear() {
    fdapi.tileLayer.clear();
}

function test_ellipsoid_tileLayer_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    //进入多视口
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //仅视口1和视口3可见
    fdapi.tileLayer.setViewportVisible(__tileLayerCurSel.id, Viewport.V1 | Viewport.V3);
}

function test_ellipsoid_tileLayer_getObjectIDs() {
    checkTileLayerId() &&
        fdapi.tileLayer.getObjectIDs(__tileLayerCurSel.id);
}

function checkTileLayerId() {
    if (!__tileLayerCurSel || !__tileLayerCurSel.id) {
        logWithColor('red', '请在场景中先点击一个TileLayer图层，再调用此方法')
        return false;
    }
    return true;
}

function test_ellipsoid_tileLayer_getActorInfo() {
    checkTileLayerId() &&
        fdapi.tileLayer.getActorInfo({
            id: __tileLayerCurSel.id,
            objectIds: [__tileLayerCurSel.objectId]
        });
}

function test_ellipsoid_tileLayer_show() {
    checkTileLayerId() &&
        fdapi.tileLayer.show(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_hide() {
    checkTileLayerId() &&
        fdapi.tileLayer.hide(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_setViewHeightRange() {
    checkTileLayerId() &&
        fdapi.tileLayer.setViewHeightRange(__tileLayerCurSel.id, -1000, 1000000);
}

function test_ellipsoid_tileLayer_enableXRay() {
    checkTileLayerId() &&
        fdapi.tileLayer.enableXRay(__tileLayerCurSel.id, [1, 1, 1, 0.0381]);
}

function test_ellipsoid_tileLayer_disableXRay() {
    checkTileLayerId() &&
        fdapi.tileLayer.disableXRay(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_get() {
    fdapi.tileLayer.get('villa');
}

function test_ellipsoid_tileLayer_get_flattenSupported() {
    //查询所有图层是否支持压平
    fdapi.tileLayer.getAllFlattenInfo();
}

function test_ellipsoid_tileLayer_getActorInfoFromDB() {
    //注意：调用前请先保证模型属性信息入库并配置数据库连接信息，目前只支持bim模型属性查询，具体请参考API文档
    fdapi.tileLayer.getActorInfoFromDB([{ "tileLayerId": "villa", "objectIds": ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a", "66314231-2860-4f9f-87a8-f581c5b96b2f-0009e2e4"] }, { "tileLayerId": "test", "objectIds": ["Floor1", "Floor2"] }]);
}


function test_ellipsoid_tileLayer_actor_show() {
    checkTileLayerId() &&
        fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
}

function test_ellipsoid_tileLayer_actor_hide() {
    checkTileLayerId() &&
        fdapi.tileLayer.hideActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
}
function test_ellipsoid_tileLayer_actors_hide() {
    checkTileLayerId() &&
        fdapi.tileLayer.hideActors([{ "id": __tileLayerCurSel.id, "objectIds": [__tileLayerCurSel.objectId] }]);
}

function test_ellipsoid_tileLayer_actors_show() {
    checkTileLayerId() &&
        fdapi.tileLayer.showActors([{ "id": __tileLayerCurSel.id, "objectIds": [__tileLayerCurSel.objectId] }]);
}

function test_ellipsoid_tileLayer_actor_focus() {
    checkTileLayerId() &&
        fdapi.tileLayer.focusActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId, 100, 1, [-45, 45, 0]);
}

function test_ellipsoid_tileLayer_actors_focus() {
    checkTileLayerId() &&
        fdapi.tileLayer.focusActors({ 'id': __tileLayerCurSel.id, 'objectIds': [__tileLayerCurSel.objectId] }, 100, 1, [-45, 45, 0]);
}


function test_ellipsoid_tileLayer_actor_highlight() {
    //设置高亮颜色（全局生效）
    fdapi.settings.highlightColor(Color.Blue);
    let tileLayerId = "villa";
    let actorId = "a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a";
    checkTileLayerId() &&
        fdapi.tileLayer.highlightActor(tileLayerId, actorId);
}

function test_ellipsoid_tileLayer_actor_stopHighlight() {
    checkTileLayerId() &&
        fdapi.tileLayer.unHighlightActor(tileLayerId, actorId);
}

async function test_ellipsoid_tileLayer_actor_highlight_actors() {

    //高亮多个Actor 支持高亮不同图层的actor
    let result = await fdapi.tileLayer.getObjectIDs('villa');
    let objectIds = result.data[0].objectIds;
    fdapi.tileLayer.highlightActors([{ "id": "villa", "objectIds": objectIds }]);
}


async function test_ellipsoid_tileLayer_actor_stopHighlight_actors() {

    //停止高亮多个Actor
    let result = await fdapi.tileLayer.getObjectIDs('villa');
    let objectIds = result.data[0].objectIds;
    fdapi.tileLayer.unHighlightActors([{ "id": "villa", "objectIds": objectIds }]);
}

function test_ellipsoid_tileLayer_actor_stopHighlightAllActors() {
    //停止所有Actor高亮
    fdapi.tileLayer.unHighlightAllActors();
}



function test_ellipsoid_tileLayer_actor_highlight_by_color() {
    fdapi.tileLayer.highlightActorWithColor("villa", "1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce", [0, 1, 0, 0.1], false);
}

async function test_ellipsoid_tileLayer_actor_highlight_actors_by_color() {

    //高亮多个Actor 支持高亮不同图层的actor
    let result = await fdapi.tileLayer.getObjectIDs('villa');
    let objectIds = result.data[0].objectIds;

    fdapi.tileLayer.highlightActorsWithColor([{
        id: "979A4C034E29728F8A2635AD747Bvilla72A3",
        objectIds: ["1551350c-45e5-41b8-bdf1-bcfa6794dc6a-000b0dce"],
        color: [1, 1, 0, 0.1],
        bWireframe: false
    }, {
        id: "villa",
        objectIds: ["98e2f96c-ccbd-4abb-a697-e7e5136106ee-000cf488"],
        color: [1, 0, 0, 0.1],
        bWireframe: true
    }, {
        id: "villa",
        objectIds: ["a6aa132d-ccd7-408f-b2f9-ed67350c8c3a-0003b64a"],
        color: [0, 0, 1, 0.1],
        bWireframe: false
    }]);

}

function test_ellipsoid_tileLayer_actor_showAllActors() {
    checkTileLayerId() &&
        fdapi.tileLayer.showAllActors(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_actor_hideAllActors() {
    checkTileLayerId() &&
        fdapi.tileLayer.hideAllActors(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_enableFluid() {
    //控制图层是否支持水流体效果
    fdapi.tileLayer.enableFluid([
        {
            "tileLayerId": "villa",
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
    fdapi.camera.set(109.512455, -0.000955, 56.258852, -37.846542, -59.504467, 0);

    //隐藏别墅所有构件
    let tileLayerId = 'villa';
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


function test_ellipsoid_tileLayer_actor_enableClip() {
    checkTileLayerId() &&
        fdapi.tileLayer.enableClip(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_actor_disableClip() {
    checkTileLayerId() &&
        fdapi.tileLayer.disableClip(__tileLayerCurSel.id);
}

function test_ellipsoid_tileLayer_actor_setStyle() {
    let style = 1; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    //以下四个属性仅在默认样式0下生效
    let saturation = 1;//饱和度
    let brightness = 1;//亮度
    let contrast = 1;//对比度
    let contrastBase = 0.18;//对比度基准
    checkTileLayerId() &&
        fdapi.tileLayer.setStyle(__tileLayerCurSel.id, style, Color.Red, saturation, brightness, contrast, contrastBase);

}


function test_ellipsoid_tileLayer_actor_setHeatMapStyle() {
    checkTileLayerId() &&
        fdapi.tileLayer.setAltitudeHeatMap(__tileLayerCurSel.id, [
            {
                "value": 0,
                "color": [0, 0, 1, 1]
            }, {
                "value": 1,
                "color": [0, 0, 1, 1]
            },
            {
                "value": 2,
                "color": [0, 0.4, 1, 1]
            },
            {
                "value": 3,
                "color": [0, 0.8, 1, 1]
            },
            {
                "value": 4,
                "color": [0, 1, 0.8, 1]
            },
            {
                "value": 5,
                "color": [0, 1, 0.4, 1]
            },
            {
                "value": 5.5,
                "color": [0, 1, 0, 1]
            },

            {
                "value": 6,
                "color": [0, 1, 0, 1]
            },
            {
                "value": 7,
                "color": [0.4, 1, 0, 1]
            },
            {
                "value": 8,
                "color": [0.8, 1, 0, 1]
            },

            {
                "value": 9,
                "color": [1, 0.8, 0, 1]
            },
            {
                "value": 9.5,
                "color": [1, 0.4, 0, 1]
            },
            {
                "value": 10,
                "color": [1, 0, 0, 1]
            }
        ]);

}

function test_ellipsoid_tileLayer_actor_resetStyle() {
    let style = 0; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    //以下四个属性仅在默认样式0下生效
    let saturation = 1;//饱和度
    let brightness = 1;//亮度
    let contrast = 1;//对比度
    let contrastBase = 0.18;//对比度基准
    checkTileLayerId() &&
        fdapi.tileLayer.setStyle(__tileLayerCurSel.id, style, Color.White, saturation, brightness, contrast, contrastBase);

}


function test_ellipsoid_tileLayer_actor_setCollision() {
    let enabled = true;//是否开启碰撞总开关，如果此参数设置为false，则下面三个参数均会失效
    let mouseInteract = true;//是否开启鼠标交互
    let mouseFunction = true;//是否开启鼠标相关的功能交互，包含鼠标拾取、分析工具、测量工具等
    let characterCollision = true; //是否开启角色碰撞
    checkTileLayerId() &&
        fdapi.tileLayer.setCollision(__tileLayerCurSel.id, enabled, mouseInteract, mouseFunction, characterCollision);
}

function test_ellipsoid_tileLayer_actor_getCollision() {
    checkTileLayerId() &&
        fdapi.tileLayer.getCollision(__tileLayerCurSel.id);
}

async function test_ellipsoid_tileLayer_setPointCloudSize() {
    //添加点云模型
    fdapi.tileLayer.delete('pcs');
    await fdapi.tileLayer.add({
        id: 'pcs',
        fileName: HostConfig.Path + "/assets/3dt/pointcloud.3dt",//3dt文件路径
        location: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        wkt: "EPSG:4547"
    });
    fdapi.tileLayer.focus('pcs', 800);

    fdapi.tileLayer.setPointCloudSize('pcs', 1);
}


function test_ellipsoid_tileLayer_setPointCloudStyle() {
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

function test_ellipsoid_tileLayer_setDecalAttach() {
    fdapi.tileLayer.enableDecal([
        {
            "tileLayerId": "villa",
            "supportAttach": false
        }, {
            "tileLayerId": "villa2",
            "supportAttach": true
        }
    ]);
}


function test_ellipsoid_tileLayer_setAttachWMTSLayer() {
    fdapi.tileLayer.enableImageLayerDecal([
        {
            "tileLayerId": "villa",
            "supportAttach": true
        }, {
            "tileLayerId": "villa2",
            "supportAttach": false
        }
    ]);
}

async function test_ellipsoid_tileLayer_modifier_add() {

    //相机定位压平区域
    fdapi.camera.set(80.739993, 34.662179, 166048.983296, -57.714924, -84.102776, 0);

    //添加前删除 防止id重复
    fdapi.tileLayer.deleteModifier('m1', '3649A68E40EB53793C35EDA9AF7F007F');

    let coordinates = [
        [80.23460181692144, 35.18405780260713, 4942.790334827909],
        [81.31749473210088, 35.06128301639647, 5273.336643487598],
        [81.49289714664646, 36.191879536710026, 4060.021651698226],
        [80.22296982967407, 36.23197614650312, 4333.255844983413]
    ];
    //添加压平 注意：此方法会在图层树上创建压平对象
    fdapi.tileLayer.addModifier('m1', '3649A68E40EB53793C35EDA9AF7F007F', coordinates, 0.5);
}


function test_ellipsoid_tileLayer_modifier_update() {
    let coordinates = [
        [81.31749473210088, 35.06128301639647, 5273.336643487598],
        [81.49289714664646, 36.191879536710026, 4060.021651698226],
        [80.22296982967407, 36.23197614650312, 4333.255844983413]
    ];
    fdapi.tileLayer.updateModifier('m1', '3649A68E40EB53793C35EDA9AF7F007F', coordinates, 0.5);
}


function test_ellipsoid_tileLayer_modifier_delete() {
    fdapi.tileLayer.deleteModifier('m1', '3649A68E40EB53793C35EDA9AF7F007F');
}

function test_ellipsoid_tileLayer_modifier_addModifierByCoordinates() {

    //相机定位压平区域
    fdapi.camera.set(80.739993, 34.662179, 166048.983296, -57.714924, -84.102776, 0);

    let tileLayerId = '3649A68E40EB53793C35EDA9AF7F007F';

    //添加前先删除
    fdapi.tileLayer.deleteModifier('m1', tileLayerId);
    fdapi.tileLayer.deleteModifier('m2', tileLayerId);

    //第一个压平对象
    let id1 = 'm1';

    let coordinates1 = [
        [71.80289866286773, 39.86974925510849, 4156.681441024459],
        [81.47686732540093, 38.70271872575174, 1295.448855603592],
        [78.55395092667575, 33.2457912836609, 5734.234324567863],
        [71.72278568192287, 34.381363771868884, 892.4524648107325]
    ];
    //多个坐标构成内环 没有可以不设置
    let innerRings1 = [


    ];
    //羽化范围
    let ententBufferSize1 = 10;

    //第二个压平对象
    let id2 = 'm2';
    let coordinates2 = [
        [75.04659322608096, 30.149213569632465, 433.7068479172703],
        [79.12274830538442, 32.343897114716654, 35345.50013049257],
        [80.72989547080428, 29.531371757459492, 36134.50239080107],
        [77.529073084531, 27.765779186237058, 308.50419231314334]
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

function test_ellipsoid_tileLayer_modifier_addModifierByShapeFile() {

    //相机定位压平区域
    fdapi.camera.set(112.788673, 22.399606, 435175.208787, -89.899124, -73.617508, 0);

    //压平的地形图层ID
    let tileLayerId = "3649A68E40EB53793C35EDA9AF7F007F";

    //根据shapefile文件压平地形 
    let id = 'm3';
    let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
    let data = { 'id': id, 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
    //注意：示例代码内预先准备了压平范围对应的yaping.shp 请提前准备好对应范围shp文件再执行addModifierByShapeFile
    fdapi.tileLayer.addModifierByShapeFile(data);
}

function test_ellipsoid_tileLayer_modifier_clear() {
    //注意：清除地形的所有压平后 地形高度会遮挡模型 
    let tileLayerId = '3649A68E40EB53793C35EDA9AF7F007F';
    fdapi.tileLayer.clearModifier(tileLayerId);
}


//普通挖洞
function test_ellipsoid_tileLayer_hole_addHoleByCoordinates() {

    //添加前先清空
    let tileLayerId = '3649A68E40EB53793C35EDA9AF7F007F';
    fdapi.tileLayer.clearHole(tileLayerId);


    let id1 = "hole1";
    //多个坐标 二维数组
    let coordinates1 = [
        [109.6875258119348, 22.777670539789607, 83764.7115404735],
        [110.90938126476925, 23.104967295831937, 357.67488402678987],
        [110.06627928582142, 22.25838386464298, -8.015841208431402]
    ];
    //多个坐标构成内环 三维数组
    let innerRings1 = [];


    let id2 = "hole2";
    //多个坐标 二维数组
    let coordinates2 = [
        [111.82466955834578, 23.899925988976445, 82.8337567326244],
        [113.3840341555816, 23.567063193291336, 371.1512878506437],
        [112.87643491964371, 22.592160906814915, -60.233710319353065],
        [111.57803078320175, 22.499996069566205, 61404.036307398135]
    ];
    //多个坐标构成内环 三维数组
    let innerRings2 = [];
    let data = [
        { 'id': id1, 'tileLayerId': tileLayerId, 'coordinates': coordinates1, 'innerRings': innerRings1, 'isReverseCut': false },
        { 'id': id2, 'tileLayerId': tileLayerId, 'coordinates': coordinates2, 'innerRings': innerRings2, 'isReverseCut': false }
    ];
    //批量添加
    fdapi.tileLayer.addHole(data);

    fdapi.infoTree.focus('hole1', 10000);
}


//根据shp挖洞
function test_ellipsoid_tileLayer_hole_addHoleByShapeFile() {

    //相机定位压平区域
    fdapi.camera.set(112.788673, 22.399606, 435175.208787, -89.899124, -73.617508, 0);

    //根据shape文件对地形挖洞 
    //注意：示例代码内预先准备了挖洞范围对应的shapeFile文件 请提前准备好对应范围shp文件再执行addHoleByShapeFile
    let tileLayerId = '3649A68E40EB53793C35EDA9AF7F007F';
    let shapeFilePath = HostConfig.Path + '/assets/shapefile/ypwd.shp';
    let data = { 'tileLayerId': tileLayerId, 'shapeFile': shapeFilePath };
    fdapi.tileLayer.addHoleByShapeFile(data);
}

async function test_ellipsoid_tileLayer_hole_update() {
    let tileLayerId = '3649A68E40EB53793C35EDA9AF7F007F';
    let holeCoordinate = [
        [109.6875258119348, 22.777670539789607, 83764.7115404735],
        [110.90938126476925, 23.104967295831937, 357.67488402678987],
        [110.06627928582142, 23.25838386464298, -8.015841208431402]
    ];
    await fdapi.tileLayer.updateHole("hole1", tileLayerId, holeCoordinate, false);
}

function test_ellipsoid_tileLayer_hole_delete() {
    fdapi.tileLayer.deleteHole("hole1", '3649A68E40EB53793C35EDA9AF7F007F');
}

function test_ellipsoid_tileLayer_hole_clear() {
    //清空
    fdapi.tileLayer.clearHole('3649A68E40EB53793C35EDA9AF7F007F');
}



//====================== markerLayer ====================

async function test_ellipsoid_markerLayer_add() {

    fdapi.markerLayer.clear();
    //标记点数组
    let markerArr = [];
    //中国楼宇建筑分布
    let points = buildingCoordinates.features;
    for (let i = 0; i < points.length; i++) {

        let point = points[i];
        let coordinate = point.geometry.coordinates;
        let text = point.properties.NAME;
        let marker = {
            id: 'marker_' + i,
            coordinate: coordinate,//坐标位置
            text: text, //显示的文字 
            popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
            imagePath: HostConfig.Path + '/locale/zh/images/yuan.png',
            imageSize: [50, 50],
            hoverImagePath: HostConfig.Path + '/locale/zh/images/yuan.png',// 鼠标悬停时显示的图片路径
            hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
        };
        markerArr.push(marker);
    }

    let markerLayer = {
        id: "markerLayer1",
        groupId: 'markerLayer',
        coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [0, 1000, 10000000],
        minPiexl: 0.1,

        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [0, 1000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 16,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色
        
        popupSize: [200,500],

        autoHeight: false,// 自动判断下方是否有物体
        displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0,//避让优先级
        occlusionCull: true,//是否参与遮挡剔除
        markers: markerArr,
    };
    fdapi.markerLayer.add(markerLayer);

}

async function test_ellipsoid_markerLayer_update() {

    //标记点数组
    let markerArr = [];
    //中国楼宇建筑分布
    let points = buildingCoordinates.features;
    for (let i = 0; i < points.length; i++) {

        let point = points[i];
        let coordinate = point.geometry.coordinates;
        let text = point.properties.NAME;
        let marker = {
            id: 'marker_' + i,
            coordinate: coordinate,//坐标位置
            text: text, //显示的文字 
            popupURL: HostConfig.Path + '/locale/zh/popup_interact.html',//弹窗HTML链接
            imagePath: HostConfig.Path + '/locale/zh/images/tilelayer.png',
            imageSize: [50, 50],
            hoverImagePath: HostConfig.Path + '/locale/zh/images/tilelayer.png',// 鼠标悬停时显示的图片路径
            hoverImageSize: [50, 50],//鼠标悬停时显示的图片尺寸
        };
        markerArr.push(marker);
    }

    let markerLayer = {
        id: "markerLayer1",
        groupId: 'markerLayer',
        coordinateType: 1,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [0, 1000, 10000000],
        minPiexl: 0.1,

        useTextAnimation: false,//关闭文字展开动画效果 打开会影响效率
        textRange: [0, 2000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: Color.SpringGreen,//文本背景颜色
        fontSize: 16,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.White,//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        autoHeight: false,// 自动判断下方是否有物体
        displayMode: 2,//智能显示模式  开发过程中请根据业务需求判断使用四种显示模式 
        clusterByImage: true,// 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0,//避让优先级
        occlusionCull: true,//是否参与遮挡剔除
        markers: markerArr,
    };
    fdapi.markerLayer.update(markerLayer);
}

function test_ellipsoid_markerLayer_focus() {
    fdapi.markerLayer.focus('markerLayer1', 1000000, 1);
}

function test_ellipsoid_markerLayer_focus_marker() {
    fdapi.markerLayer.focusByMarkerId('markerLayer1', 'marker_100');
}

function test_ellipsoid_markerLayer_focusAll() {
    fdapi.markerLayer.focusAll(2000, 1);
}

function test_ellipsoid_markerLayer_show() {
    fdapi.markerLayer.show('markerLayer1');
}

function test_ellipsoid_markerLayer_showAll() {
    fdapi.markerLayer.showAll();
}

function test_ellipsoid_markerLayer_hideAll() {
    fdapi.markerLayer.hideAll();
}

function test_ellipsoid_markerLayer_hide() {
    fdapi.markerLayer.hide(['markerLayer1']);
}

function test_ellipsoid_markerLayer_clear() {
    fdapi.markerLayer.clear();
}

function test_ellipsoid_markerLayer_delete() {
    fdapi.markerLayer.delete(['markerLayer1']);
}

function test_ellipsoid_markerLayer_setViewHeightRange() {
    fdapi.markerLayer.setViewHeightRange("markerLayer1", 1000, 10000000000);
}


//=========================GeoJSONLayer=========================

function test_ellipsoid_geoJSONLayer_load_point_json() {

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
        range: [-1000, 1000000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        sourceJson: geojsonObj,
        collision: true, //开启碰撞
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer_json", 8000);
    }, 2000);

}

function test_ellipsoid_geoJSONLayer_load_point() {

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
            color: [0, 1, 0, 1]
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
        range: [-1000, 1000000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/point_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer1", 8000);
    }, 2000);
}

function test_ellipsoid_geoJSONLayer_load_polyline() {

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
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        collision: true, //开启碰撞
        onTerrain: true,//是否贴地
        url: HostConfig.Path + "/assets/geojson/polyline_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer2", 8000);
    }, 2000);
}

function test_ellipsoid_geoJSONLayer_load_polygon() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //简单渲染器
    let simpleRenderer = {

        //渲染器类型
        rendererType: RendererType.SimpleRenderer,
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
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        textMarkerField: "NOWNAME",
        textRange: [0, 280],//文字标注可见范围
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer3", 8000);
    }, 2000);
}

function test_ellipsoid_geoJSONLayer_load_unique() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();
    //唯一值渲染器
    let uniqueValueRenderer = {
        //渲染器类型
        rendererType: RendererType.UniqueValueRenderer,
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
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        textMarkerField: "NOWNAME",
        textRange: [0, 1000],//文字标注可见范围
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: uniqueValueRenderer,
        visibleRenderer: visibleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer4", 8000);
    }, 2000);

}

function test_ellipsoid_geoJSONLayer_update() {


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
        range: [-1000, 10000000],//点的可视范围 注意：此参数仅对point类型的GeoJSON生效
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/point_84.geojson",
        renderer: simpleRenderer
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer1", 8000);
    }, 2000);

}

function test_ellipsoid_geoJSONLayer_focus() {
    fdapi.geoJSONLayer.focus("layer1", 100);
}

function test_ellipsoid_geoJSONLayer_load_class() {



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
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        textMarkerField: "NOWNAME",
        textRange: [0, 1000],//文字标注可见范围
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: classBreaksRenderer,
        visibleRenderer: visibleRenderer,
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer5", 8000);
    }, 2000);

}



function test_ellipsoid_geoJSONLayer_load_visible() {


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
        id: 'layer6',
        visible: true,//加载后是否显示
        rotation: [0, 0, 0],//图层旋转
        offset: [0, 0, 1000],//基于原始位置的偏移量
        needProject: false,//关闭投影转换
        textMarkerField: "NOWNAME",
        textRange: [0, 280],//文字标注可见范围
        onTerrain: false,//是否贴地
        collision: true, //开启碰撞
        url: HostConfig.Path + "/assets/geojson/polygon_84.geojson",
        renderer: classBreaksRenderer,
        visibleRenderer: visibleRenderer,
    });

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer6", 8000);
    }, 2000);

}


function test_ellipsoid_geoJSONLayer_load_materials() {

    //添加前先清除保证id唯一
    fdapi.geoJSONLayer.clear();

    //自定义材质示例
    let layer7 = {
        id: "layer7",
        visible: true,
        rotation: [
            0,
            0,
            0
        ],
        offset: [
            0,
            0,
            1000
        ],
        needProject: true,
        textMarkerField: "NOWNAME",
        textRange: [
            0,
            1000
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
                    scalarParameters: [{ "name": "亮度", "value": 2 }, { "name": "类型", "value": 0 }],
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
    fdapi.geoJSONLayer.add(layer7);

    setTimeout(function () {
        fdapi.geoJSONLayer.focus("layer7", 8000);
    }, 2000);

}


function test_ellipsoid_geoJSONLayer_show() {
    fdapi.geoJSONLayer.show(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6','layer7', 'layer_json']);
}

function test_ellipsoid_geoJSONLayer_hide() {
    fdapi.geoJSONLayer.hide(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6','layer7', 'layer_json']);
}

function test_ellipsoid_geoJSONLayer_delete() {
    fdapi.geoJSONLayer.delete(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6','layer7', 'layer_json']);
}

function test_ellipsoid_geoJSONLayer_clear() {
    fdapi.geoJSONLayer.clear();
}

function test_ellipsoid_geoJSONLayer_setViewHeightRange() {
    fdapi.geoJSONLayer.setViewHeightRange('layer5', 1, 1000);
}


function test_ellipsoid_geoJSONLayer_highlightFeature() {
    //设置高亮颜色
    fdapi.settings.highlightColor(Color.Red);
    //高亮要素块
    fdapi.geoJSONLayer.highlightFeature('layer3', 1);
}

function test_ellipsoid_geoJSONLayer_stopHighlightFeature() {
    fdapi.geoJSONLayer.unHighlightFeature('layer3', 1);
}

function test_ellipsoid_geoJSONLayer_highlightFeatures() {
    //设置高亮颜色
    fdapi.settings.highlightColor(Color.LightSeaGreen);
    fdapi.geoJSONLayer.highlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
}

function test_ellipsoid_geoJSONLayer_stopHighlightFeatures() {
    fdapi.geoJSONLayer.unHighlightFeatures([{ "id": "layer3", "featureIds": [1, 2, 3] }]);
}

function test_ellipsoid_geoJSONLayer_stopAllHighlightFeaturesById() {
    fdapi.geoJSONLayer.unHighlightAllFeaturesById(["layer1", "layer2", "layer3"]);
}

function test_ellipsoid_geoJSONLayer_focusFeature() {
    //相机定位到要素3
    fdapi.geoJSONLayer.focusFeature("layer3", 3, 100, 1);
}

//=========================ImageryLayer2=========================

function test_ellipsoid_imageryLayer2_addByUrl() {

    fdapi.imageryLayer2.delete("wmts1");

    let wmts1 = {
        id: "wmts1",
        xmlPath: "http://t0.tianditu.gov.cn/ter_c/wmts?request=GetCapabilities&service=wmts",
        resourceURL: "http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=4267820f43926eaf808d61dc07269beb",
        alpha: 1.0,
        type: 0
    }
    fdapi.imageryLayer2.addByUrl(wmts1);
}

function test_ellipsoid_imageryLayer2_addBySchemaParams() {
    fdapi.imageryLayer2.delete("wmts2");
    //内部测试服务 广东省
    let wmts2 = {
        id: "wmts2",
        resourceURL: "http://192.168.20.186:8080/geoserver/gwc/service/wmts/rest/wjn10171:4326guangdong/polygon/EPSG%3A4326/EPSG%3A4326%3A{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
        type: 0,
        alpha: 1.0,
        epsg: "4326",
        topLeftCornerX: -180,
        topLeftCornerY: 90,
        tileWidth: 256,
        tileHeight: 256,
        minimumLevel: 0,
        maximumLevel: 21,
        extent: [109.654937, 20.211718, 117.192935, 25.516771],
        scaleDenominator: 279541132.0143589
    }
    fdapi.imageryLayer2.addBySchemaParams(wmts2);
}

function test_ellipsoid_imageryLayer2_setDrawOrder() {
    //遮住广东省
    fdapi.imageryLayer2.setDrawOrder("wmts1", "wmts2");
}

function test_ellipsoid_imageryLayer2_clear() {
    fdapi.imageryLayer2.clear();
}

function test_ellipsoid_imageryLayer2_delete() {
    fdapi.imageryLayer2.delete(["wmts2", "wmts1"]);
}
function test_ellipsoid_imageryLayer2_hide() {
    fdapi.imageryLayer2.hide(["wmts2", "wmts1"]);
}

function test_ellipsoid_imageryLayer2_show() {
    fdapi.imageryLayer2.show(["wmts2", "wmts1"]);
}

function test_ellipsoid_imageryLayer2_hideAll() {
    fdapi.imageryLayer2.hideAll();
}

function test_ellipsoid_imageryLayer2_showAll() {
    fdapi.imageryLayer2.showAll();
}


//====================== globeTerrain ======================

function test_ellipsoid_globeTerrain_init() {

    fdapi.settings.setMainUIVisibility(true);
    //初始化之前先销毁
    fdapi.globeTerrain.destroy();
    //加载地形+影像
    let terrainUrl = "https://terrain.gbim360.com/layer.json";
    let imageryUrl = "http://t0.tianditu.gov.cn/img_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b";
    let imageryResourceUrl = "http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b";
    fdapi.globeTerrain.init(terrainUrl, imageryUrl, imageryResourceUrl,1,true);

}

function test_ellipsoid_globeTerrain_setImageryResourceUrl(){
    let imageryUrl = "http://t0.tianditu.gov.cn/cva_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b";
    let imageryResourceUrl =  "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b";
    fdapi.globeTerrain.setImagery(imageryUrl, imageryResourceUrl);
}


function test_ellipsoid_globeTerrain_setImageryBySchemaParams(){
    //全参数的wmts服务
    fdapi.globeTerrain.setImageryBySchemaParams({
        resourceURL: "http://192.168.20.7:8080/geowebcache/service/wmts?layer=TDT_G51&style=&tilematrixset=EPSG%3A4490_TDT_G51&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A4490_TDT_G51%3A{TileMatrix}&TileCol={TileCol}&TileRow={TileRow}",
        type: 0,
        alpha: 1.0,
        epsg: "4490",
        topLeftCornerX: -180.0,
        topLeftCornerY: 90.0,
        tileWidth: 256,
        tileHeight: 256,
        minimumLevel: 0,
        maximumLevel: 12,
        extent: [119.810, 24.032, 124.42, 28.102],
        scaleDenominator: 279541132.0143589
    });
}

function test_ellipsoid_globeTerrain_addImageryLayerBySchemaParams() {

    fdapi.globeTerrain.deleteImageryLayer(["wmtsBySchemaParams"]);
    //全参数的wmts服务
    fdapi.globeTerrain.addImageryLayerBySchemaParams({
        id: "wmtsBySchemaParams",
        resourceURL: "http://192.168.20.7:8080/geowebcache/service/wmts?layer=TDT_G51&style=&tilematrixset=EPSG%3A4490_TDT_G51&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A4490_TDT_G51%3A{TileMatrix}&TileCol={TileCol}&TileRow={TileRow}",
        type: 0,
        alpha: 1.0,
        epsg: "4490",
        topLeftCornerX: -180.0,
        topLeftCornerY: 90.0,
        tileWidth: 256,
        tileHeight: 256,
        minimumLevel: 0,
        maximumLevel: 12,
        extent: [119.810, 24.032, 124.42, 28.102],
        scaleDenominator: 279541132.0143589
    });
}

function test_ellipsoid_globeTerrain_hide() {
    fdapi.globeTerrain.hide();
}

function test_ellipsoid_globeTerrain_show() {
    fdapi.globeTerrain.show();
}

function test_ellipsoid_globeTerrain_destroy() {
    fdapi.globeTerrain.destroy();
}

function test_ellipsoid_globeTerrain_addImageryLayer() {

    fdapi.globeTerrain.deleteImageryLayer("wmts1");
    //地形注记
    fdapi.globeTerrain.addImageryLayer({
        id: "wmts1",
        type: 0, //0：WMTS 1：WMS 2：MVT 3：TMS
        xmlPath: "http://t0.tianditu.gov.cn/cva_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b",
        resourceURL: "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b",
        alpha: 1,
        bConvertSRGB: true
    });

    fdapi.globeTerrain.deleteImageryLayer("wmts2");
    //地形晕渲
    fdapi.globeTerrain.addImageryLayer({
        id: "wmts2",
        type: 0, //0：WMTS 1：WMS 2：MVT 3：TMS
        xmlPath: "http://t0.tianditu.gov.cn/ter_c/wmts?request=GetCapabilities&service=wmts&tk=5ac8367eada4f94bec03cefffa6ff03b",
        resourceURL: "http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=5ac8367eada4f94bec03cefffa6ff03b",
        alpha: 1,
        bConvertSRGB: true
    });
}

function test_ellipsoid_globeTerrain_setImageryLayerDrawOrder() {
    //调整地形注记显示顺序 显示在地形晕渲上面
    fdapi.globeTerrain.setImageryLayerDrawOrder("wmts1", "wmts2");
}

function test_ellipsoid_globeTerrain_deleteImageryLayer() {
    fdapi.globeTerrain.deleteImageryLayer(["wmts2", "wmts1"]);
}

function test_ellipsoid_globeTerrain_clearImageryLayer() {
    fdapi.globeTerrain.clearImageryLayer();
}


//====================== cesium3DTileset ======================

async function test_ellipsoid_cesium3DTileset_add() {
    fdapi.cesium3DTileset.clear();
    let o = {
        id: 'fd1',
        offset: [0, 0, 0], //偏移
        tileURL: 'http://192.168.20.192:8081/assets/binghai/data/tileset.json' //cesium3DTileset服务地址
    };
    //注意：此add方法需要网络加载耗时 
    await fdapi.cesium3DTileset.add(o);
    //延时1s执行focus
    window.setTimeout(focus, 5000);

    function focus() {
        //fdapi.cesium3DTileset.focus(o.id, 10000);
        fdapi.camera.set(113.936305, 22.524002, 880.501805, -36.505989, -126.40181, 0);
    }

}

async function test_ellipsoid_cesium3DTileset_update() {
    let o = {
        id: 'fd1',
        offset: [0, 0, 100],
    }
    await fdapi.cesium3DTileset.update(o);
    fdapi.cesium3DTileset.focus(o.id);
}

function test_ellipsoid_cesium3DTileset_delete() {
    fdapi.cesium3DTileset.delete('fd1');
}

function test_ellipsoid_cesium3DTileset_clear() {
    fdapi.cesium3DTileset.clear();
}

function test_ellipsoid_cesium3DTileset_focus() {
    fdapi.cesium3DTileset.focus('fd1');
}

function test_ellipsoid_cesium3DTileset_show() {
    fdapi.cesium3DTileset.show('fd1');
}

function test_ellipsoid_cesium3DTileset_showAll() {
    fdapi.cesium3DTileset.showAll();
}

function test_ellipsoid_cesium3DTileset_hide() {
    fdapi.cesium3DTileset.hide('fd1');
}

function test_ellipsoid_cesium3DTileset_hideAll() {
    fdapi.cesium3DTileset.hideAll();
}

function test_ellipsoid_cesium3DTileset_get() {
    fdapi.cesium3DTileset.get('fd1');
}


//=========================Decal=========================

async function test_ellipsoid_decal_add() {
    fdapi.decal.clear();
    await fdapi.decal.add({
        id: 'd1',
        decalBlendMode: 0,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花（剔除png半透明）；默认值：0
        order: 1,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
        texturePath: HostConfig.Path + '/assets/image/decal2.png',//贴图文件路径
        location: [120, 30, 100],
        rotation: [-90, 180, 0],
        scale: [10000, 10000, 10000]
    });
    fdapi.decal.focus('d1', 5000);

    await fdapi.decal.add({
        id: 'd2',
        decalBlendMode: 1,//贴花类型，取值范围：[0,1]；取值说明：0背景混合，1仅贴花；默认值：0
        order: 2,//贴花层级，值越大层级越高，层级最高的显示在最上面一层
        texturePath: HostConfig.Path + '/assets/image/decal1.png',//贴图文件路径
        rotation: [-90, 0, 0],
        bbox: [73, 3, 0, 135, 53, 8000]
    });
}

async function test_ellipsoid_decal_update() {
    await fdapi.decal.update({
        id: 'd1',
        order: 1,
        decalBlendMode: 1,//剔除png半透明
        texturePath: HostConfig.Path + '/assets/image/decal2.png',
        rotation: [-90, 0, 0],
        scale: [20000, 20000, 20000]
    });
    fdapi.decal.focus('d1', 5000);
}

function test_ellipsoid_decal_delete() {
    fdapi.decal.delete('d1');
}

function test_ellipsoid_decal_clear() {
    fdapi.decal.clear();
}

function test_ellipsoid_decal_focus() {
    fdapi.decal.focus('d1', 2000);
}

function test_ellipsoid_decal_focusAll() {
    fdapi.decal.focusAll();
}

function test_ellipsoid_decal_get() {
    fdapi.decal.get('d1');
}

//=========================HeatMap=========================

function getRandNumBetween(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

var __tidUpdateHeatMap = undefined;

async function test_ellipsoid_heatmap_add1() {

    await fdapi.heatmap.clear();

    //经纬度中国范围
    let bbox = [73, 3, 0, 135, 53, 8888];
    let range = [0, 100];
    let data = [];
    for (let i = 0; i < 2000; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 500000,           //热力点影像半径范围
            heatValue: Math.random() * 100        //热力值
        });
    }
    let style = HeatMapStyle.CustomColor;
    let textureSize = 1024;
    let opacityMode = 1;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 1;
    let light = false;
    let viewHeightRange = [-1000, 10000000];

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
    fdapi.heatmap.focus('heatmap1', 5000, 1);
}

async function test_ellipsoid_heatmap_add2() {

    await fdapi.heatmap.clear();

    //经纬度中国范围
    let bbox = [73, 3, 0, 135, 53, 8000];
    let range = [0, 1];
    let data = [];
    for (let i = 0; i < 1000; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 50000,           //热力点影像半径范围
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
    fdapi.heatmap.focus('heatmap2', 5000, 1);
}



async function test_ellipsoid_heatmap_add3() {



    await fdapi.heatmap.clear();

    //经纬度中国范围
    let bbox = [73, 3, 0, 135, 53, 8000];
    let range = [0, 10];
    let data = [];
    for (let i = 0; i < 1000; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        data.push({
            id: i.toString(),
            coordinate: [x, y, 0],                 //热力点的坐标
            radius: Math.random() * 50000,           //热力点影像半径范围
            heatValue: Math.random() * 10    //热力值
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
    fdapi.heatmap.focus('heatmap3', 5000, 1);

}



async function test_ellipsoid_heatmap_add4() {



    await fdapi.heatmap.clear();
    //经纬度中国范围
    let bbox = [73, 3, 0, 135, 53, 8000];

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



async function test_ellipsoid_heatmap_add5() {

    await fdapi.heatmap.clear();
    let heatmap5 = {
        "id": "heatmap5",
        "style": HeatMapStyle.CustomWave, //也支持设置贴地样式 1
        "tifFile": {
            "minHeight": 0,//设置贴地模式时 地形高度要在此范围内
            "maxHeight": 22000,//设置贴地模式时 地形高度要在此范围内
            "file": HostConfig.Path + "/assets/tif/heatmap.tif"
        }
    };
    await fdapi.heatmap.addByTif(heatmap5);
    fdapi.heatmap.focus('heatmap5', 2000000, 1);
}


async function test_ellipsoid_heatmap_add6() {

    await fdapi.heatmap.clear();
    let heatmap6 = {
        "id": "heatmap6",
        "range": [-1, 1],
        "style": HeatMapStyle.CustomColor, //也支持设置贴地样式 1
        "tifFile": {
            "minHeight": -412732,//设置贴地模式时 地形高度要在此范围内
            "maxHeight": 412732,//设置贴地模式时 地形高度要在此范围内
            "file": HostConfig.Path + "/assets/tif/heatmap.tif"
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
    fdapi.heatmap.focus('heatmap6', 500000, 1);
}



async function test_ellipsoid_heatmap_highlightPixels() {

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

async function test_ellipsoid_heatmap_unHighlightAllPixels() {
    //取消高亮
    fdapi.heatmap.unHighlightAllPixels('heatmap6');
}


async function test_ellipsoid_heatmap_update() {

    //经纬度中国范围
    let bbox = [73, 3, 0, 135, 53, 8000];

    //热力值范围
    let range = [0, 100];
    let style = HeatMapStyle.Normal;
    let textureSize = 1024;
    let opacityMode = 1;
    let opacityRange = [0, 1];
    let blur = 0.85;
    let blendMode = 1;
    let light = false;
    let viewHeightRange = [0, 10000];

    __tidUpdateHeatMap = setInterval(() => {

        let data = [];
        for (let i = 0; i < 1000; i++) {
            let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
            let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
            data.push({
                id: i.toString(),
                coordinate: [x, y, 0],                 //热力点的坐标
                radius: Math.random() * 20000,           //热力点影像半径范围
                heatValue: Math.random() * 100        //热力值
            });
        }

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

        fdapi.heatmap.updateByHeatPoints(heatmap1);
    }, 1000);

    //清除定时器
    window.setTimeout(function () {
        window.clearInterval(__tidUpdateHeatMap)
    }, 5000);
}

function test_ellipsoid_heatmap_delete() {
    clearInterval(__tidUpdateHeatMap);
    fdapi.heatmap.delete('heatmap1');
}

function test_ellipsoid_heatmap_clear() {
    clearInterval(__tidUpdateHeatMap);
    fdapi.heatmap.clear();
}

function test_ellipsoid_heatmap_focus() {
    fdapi.heatmap.focus('heatmap1', 100);
}

function test_ellipsoid_heatmap_show() {
    fdapi.heatmap.show('heatmap1');
}

function test_ellipsoid_heatmap_hide() {
    fdapi.heatmap.hide('heatmap1');
}

function test_ellipsoid_heatmap_get() {
    fdapi.heatmap.get('heatmap1');
}



// ==========================HeatMap3D===============================

async function test_ellipsoid_heatmap3d_addByImages() {
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
        volumeBoxLocation: [109.1114177198472, 30.656934228670085, 961.1201775031986], //三维热力图坐标位置
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxSize: [1000, 1000, 1000], //三维热力图盒范围
        clipBox: [20, 20, 20, 80, 80, 80],//剖切盒子范围 注意：仅对displayMode=2盒子模式下生效
        brightness: 10, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1 //显示模式 0是体积雾效果, 1是体素效果 , 2是盒子效果
    };
    await fdapi.heatmap3d.addByImages(heatmap3d);
    fdapi.heatmap3d.focus('heatmap3d_byImages');
}


async function test_ellipsoid_heatmap3d_addByBinaryFiles() {
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
async function test_ellipsoid_heatmap3d_addByVoxels() {

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
        "volumeBoxLocation": [107.25451111509297, 29.99245141331471, 520.9266083094011],
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
async function test_ellipsoid_heatmap3d_addByHeatPoints() {



    let bbox = [107, 29, 0, 114, 35, 1000];

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
        "volumeBoxLocation": [111.27669976775276, 32.47490200608488, 720.9301422652758],
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
    fdapi.heatmap3d.focus('heatmap3d_byHeatPoints', 100);
    //fdapi.camera.set(16.269485, 80.932889, -6356457.579619, 56.539249, -100.705757, 0);

}

//往heatmap3d对象添加离散三维像素块
async function test_ellipsoid_heatmap3d_addHeatPointsToBox() {

    //包围盒
    let bbox = [107, 29, 0, 114, 35, 1000];

    //添加前先删除
    fdapi.heatmap3d.clear();
    //创建空白的盒子范围 往盒子里添加体素块
    let heatmap3d = [{
        "id": "heatmap3d_byVolumeBox",
        "displayMode": 1,// 0是体积雾效果, 1是体素效果 , 2是盒子效果，3是贴花效果
        "brightness": 10,
        "volumeBoxLocation": [111.27669976775276, 32.47490200608488, 720.9301422652758],
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
async function test_ellipsoid_heatmap3d_addBySparseVoxels() {
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
        volumeBoxLocation: [102.64949176791501, 42.540738794753665, 1442.773083397397],
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

function test_ellipsoid_heatmap3d_setViewportVisible() {

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

async function test_ellipsoid_heatmap3d_add_addVoxels() {

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

function test_ellipsoid_heatmap3d_clip() {
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

async function test_ellipsoid_heatmap3d_update() {
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
        volumeBoxLocation: [92.57134571417669, 23.822028864475996, 31.063458180297577], //三维热力图坐标位置
        volumeBoxRotation: [0, 90, 0], //三维热力图坐标旋转
        volumeBoxSize: [100, 100, 150], //三维热力图盒范围
        brightness: 1, // 亮度，取值范围：[0~100] ，值等于0则完全透明，值越大越不透明
        displayMode: 1 //显示模式
    };
    await fdapi.heatmap3d.update(heatmap3d_for_update);
    fdapi.heatmap3d.focus('heatmap3d_byImages');
}

function test_ellipsoid_heatmap3d_delete() {
    fdapi.heatmap3d.delete('heatmap3d_byImages');
}

function test_ellipsoid_heatmap3d_clear() {
    fdapi.heatmap3d.clear();
}

function test_ellipsoid_heatmap3d_focus() {
    fdapi.heatmap3d.focus('heatmap3d_byImages', 1000);
}

function test_ellipsoid_heatmap3d_show() {
    fdapi.heatmap3d.show('heatmap3d_byImages');
}

function test_ellipsoid_heatmap3d_hide() {
    fdapi.heatmap3d.hide('heatmap3d_byImages');
}

function test_ellipsoid_heatmap3d_get() {
    fdapi.heatmap3d.get('heatmap3d_byImages');
}

function test_ellipsoid_heatmap3d_queryVoxel() {
    //使用稀疏体素的贴画模式构建 再根据点击的坐标查询 
    fdapi.heatmap3d.queryVoxel('heatmap3dBySparseVoxels', [102.64949176791501, 42.540738794753665, 1442.773083397397]);
}




//========================OcaenHeatMap=======================

function test_ellipsoid_oceanHeatmap_add_flow() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Flow, //流场
        "valueFile": path + "/assets/tif/oceanheatmap/ellipsoid/valueFile.tif",
        "flowField": path + "/assets/tif/oceanheatmap/ellipsoid/flowField.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);

}

function test_ellipsoid_oceanHeatmap_add_wave() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Wave, //波浪
        "valueFile": path + "/assets/tif/oceanheatmap/ellipsoid/valueFile.tif",
        "flowField": path + "/assets/tif/oceanheatmap/ellipsoid/flowField.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);

}

function test_ellipsoid_oceanHeatmap_add_arrow() {

    fdapi.oceanHeatmap.clear();
    let path = HostConfig.Path;


    let oceanHeatmap1 = {
        "id": "oceanHeatmap_tif",
        "offset": [0, 0, 0],
        "collision": true,
        "displayMode": OceanHeatMapStyle.Arrow, //箭头
        "valueFile": path + "/assets/tif/oceanheatmap/ellipsoid/valueFile.tif",
        "flowField": path + "/assets/tif/oceanheatmap/ellipsoid/flowField.tif",
    }

    fdapi.oceanHeatmap.add(oceanHeatmap1);

}


function test_ellipsoid_oceanHeatmap_update_new() {
    let path = HostConfig.Path;
    let oceanHeatmap_update = {
        "id": "oceanHeatmap_tif",
        "valueFile": "C:/value.tif",
        "flowField": "C:/uvw.tif",
    }
    fdapi.oceanHeatmap.update(oceanHeatmap_update);
}

function test_ellipsoid_oceanHeatmap_hide_new() {
    fdapi.oceanHeatmap.hide('oceanHeatmap_tif');
}

function test_ellipsoid_oceanHeatmap_show_new() {
    fdapi.oceanHeatmap.show('oceanHeatmap_tif');
}

function test_ellipsoid_oceanHeatmap_get_new() {
    fdapi.oceanHeatmap.get('oceanHeatmap_tif');
}

function test_ellipsoid_oceanHeatmap_delete_new() {
    fdapi.oceanHeatmap.delete('oceanHeatmap_tif');
}

function test_ellipsoid_oceanHeatmap_clear_new() {
    fdapi.oceanHeatmap.clear();
}

function test_ellipsoid_oceanHeatmap_focus_new() {
    fdapi.oceanHeatmap.focus('oceanHeatmap_tif', 200000);
}



//====================== highlightArea ======================

async function test_ellipsoid_highlightArea_add() {
    fdapi.highlightArea.clear();
    let ha = {
        id: 'ha',
        coordinates: [
            [81.56253341090697, 37.06165248631043, 352177.2505683305],
            [86.34576737796787, 38.83571231571344, 907.1293332549202],
            [88.06917464481498, 34.966651889223094, 4852.424795852239],
            [82.0890797683313, 33.98972630861241, 5068.667107921724]
        ],
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        color: [0, 1, 0, 0.8],      //多边形高亮颜色
        heightRange: [0, 352177],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
        intensity: 1.0,             //高亮颜色的强度
        depthTest: true             //深度检测
    };
    await fdapi.highlightArea.add(ha);
    fdapi.highlightArea.focus(ha.id, 10000);
}

function test_ellipsoid_highlightArea_delete() {
    fdapi.highlightArea.delete('1');
}

async function test_ellipsoid_highlightArea_update() {
    let ha = {
        id: 'ha',
        coordinates: [
            [81.56253341090697, 37.06165248631043, 352177.2505683305],
            [86.34576737796787, 38.83571231571344, 907.1293332549202],
            [88.06917464481498, 34.966651889223094, 4852.424795852239]
        ],
        color: [1, 1, 0, 1],      //多边形高亮颜色
        heightRange: [0, 352177],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
        intensity: 20              //高亮颜色的强度
    };
    await fdapi.highlightArea.update(ha);
    fdapi.highlightArea.focus(ha.id, 10000);
}

function test_ellipsoid_highlightArea_clear() {
    fdapi.highlightArea.clear();
}

function test_ellipsoid_highlightArea_focus() {
    fdapi.highlightArea.focus('ha', 6000);
}

function test_ellipsoid_highlightArea_show() {
    fdapi.highlightArea.show('ha');
}

function test_ellipsoid_highlightArea_hide() {
    fdapi.highlightArea.hide('ha');
}

function test_ellipsoid_highlightArea_get() {
    fdapi.highlightArea.get('ha');
}

//====================== plot ======================

async function test_ellipsoid_plot_add() {

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
    ];
    //样式对应坐标
    let coordinatesArr = [
        [
            [116.97494411528874, 25.13669360139284, 31433.25373247926],
            [117.5199106981594, 25.37026281959722, 608.5649794288254],
            [117.6789059203866, 24.647156333757614, 33.28192608383705],
            [118.1250485908823, 25.59553559631353, 53675.27241668435],
            [118.07508011923107, 25.458905400654746, 887.212945004387]
        ],

        [
            [116.09916531942027, 24.90498760497259, 246.64403390995602],
            [116.42665217545765, 24.627381270302784, 368.47278622206466]
        ],

        [
            [113.96585092354931, 24.551805643471717, 441.54184466251735],
            [114.96096384824924, 24.598605220357015, 9045.13052513578],
            [114.56030922706563, 23.56372609551027, 65.5691925615096]
        ],

        [
            [113.99187190151501, 24.912932378142525, 496.8302844369244],
            [115.31255202137075, 25.497419566476193, 21933.338851582677]
        ],

        [
            [111.54021335566682, 24.64077159378767, 244.92096891781424],
            [112.1848760226727, 24.864459071554836, 306.22993811484343],
            [112.7302240643907, 24.12590667314251, 261.2338011344566],
            [112.44724790649937, 23.68558524052617, 375.9855341868764],
            [111.8988620304692, 23.69968059161084, 64.25250565397963]
        ],

        [
            [115.43600142840958, 23.678035102227117, 423.8669079191517],
            [115.8510436178317, 23.72410234455437, 598.1970559885464],
            [115.68890895418636, 23.387220258964437, 117.38471576042775]
        ],

        [
            [117.35488880075198, 24.60937076842435, 6229.683010494668],
            [116.86123090639222, 23.906012911553532, 57169.66162392775],
            [116.01559374242527, 24.026341328058287, 30743.651189083677]
        ],

        [
            [117.37560437711666, 24.78505789074754, 52347.27039681183],
            [117.56568393096354, 24.910942444573422, 464.552436004594],
            [117.72946912236509, 24.74595436474645, 32928.31003929401],
            [118.12504915685187, 24.776365382091434, 12003.367268840393]
        ],

        [
            [112.5157320426737, 23.55259867183554, 540.2338147907694],
            [112.88597991845117, 23.468701215880902, 73.39845991725485]
        ],

        [
            [112.6492583334524, 23.82807954108957, 456.6095223050099],
            [113.2031103157735, 23.851328444317097, 18181.427846704195]
        ],

        [
            [112.94890220229627, 23.370518965606184, 23.92014317323811],
            [112.96339394227701, 23.29783142356033, -25.813768952494126],
            [113.1735694111243, 23.338603245755387, 81.43675933108265],
            [113.25615113704801, 23.053100405790172, 145.05386965730833]
        ],

        [
            [113.1226639093303, 23.472985395152513, 213.12677242914145],
            [113.13844221153195, 23.366922683553696, 66.79424411512285],
            [113.42701012022962, 23.429559486284738, 340.2790965693758],
            [113.52561052085834, 23.194685330522137, -53.63290325427156]
        ],

        [
            [114.96587590407829, 26.086974695455872, 123.63002249349705],
            [115.98707809420888, 26.28718178454106, 186.38768305593695],
            [117.1786412305631, 26.80035412485583, 578.590894561346],
            [118.30076828954147, 26.451422139467322, 7365.724329218555]
        ],

        [
            [111.09375680700327, 27.13334551278759, 204553.17510358998],
            [112.03145822993207, 26.71874566976831, 146503.50018797338],
            [112.50005172926885, 25.79739289913394, 121712.88856078898],
            [112.8635876616185, 26.01104930087423, 484509.91718629544]
        ],

        [
            [113.20315607939425, 28.8027899308561, 3926.3342975186706],
            [113.25722156650862, 27.45768041472581, 235.721413226343],
            [115.0269434392216, 27.654691672009896, 141.54000099824057],
            [115.1294288768452, 29.087203490843706, 1060.9324254563685]
        ]

    ];

    let plotArr = [];
    for (let i = 0; i < styleArr.length; i++) {
        let plot = {
            id: "plot_" + i,
            range: [-1000, 100000],
            style: styleArr[i],//样式类型 参考样式枚举：PlotStyle
            onTerrain: true,
            depthTest: true,
            lineColor: [Math.random(), Math.random(), Math.random(), 1],
            fillColor: [Math.random(), Math.random(), Math.random(), 1],
            thickness: Math.random() * 10, //可选 根据样式设置
            coordinateType: 1,
            coordinates: coordinatesArr[i]
        };
        plotArr.push(plot);
    }
    await fdapi.plot.add(plotArr);
    fdapi.plot.focus("plot_8");
}

async function test_ellipsoid_plot_update() {
    let p1 = {
        id: 'plot_1',
        range: [0, 5000],
        fillColor: Color.Red
    };
    await fdapi.plot.update(p1);
}

function test_ellipsoid_plot_delete() {
    fdapi.plot.delete('plot_1');
}

function test_ellipsoid_plot_clear() {
    fdapi.plot.clear();
}

function test_ellipsoid_plot_focus() {
    fdapi.plot.focus('plot_1', 1800, 1);
}

function test_ellipsoid_plot_show() {
    fdapi.plot.show(["plot_1", "plot_2", "plot_6", "plot_8"]);
}

function test_ellipsoid_plot_showAll() {
    fdapi.plot.showAll();
}

function test_ellipsoid_plot_hide() {
    fdapi.plot.hide(["plot_1", "plot_2", "plot_6", "plot_8"]);
}

function test_ellipsoid_plot_hideAll() {
    fdapi.plot.hideAll();
}


function test_ellipsoid_plot_get() {
    fdapi.plot.get(["plot_1", "plot_2", "plot_6", "plot_8"]);
}



//=================================vectorField==========================================

function test_ellipsoid_vectorField_add1() {

    //洋流
    fdapi.vectorField.clear();
    let path = HostConfig.Path;
    let binPath = path + "/assets/bin/vectorField/time0_ocean";
    let vf_ocean = {
        "id": "vf_ocean",
        "coordinate": [
            0,
            0,
            0
        ],
        "repeatCount": 10,
        "displayMode": VectorFieldStyle.Ocean,
        "fieldScale": [
            1,
            1,
            1
        ],
        "bNeedProjection": true,
        "wkt": "ECEF",
        "singleSpriteSize": 13000,
        "singleSpriteSizeOcean": 0,
        "vfIntensAsVelocity": 500000,
        "lifeTime": 5,
        "lifeTimeOcean": 10,
        "lodMin": 0.05,
        "lodMax": 1.5,
        "downsample": 1,
        "nDim": 3,
        "lodMinDistance": 6378137,
        "lodMaxDistance": 12756274,
        "shphereRadius": 6378137,
        "lodSpeedMin": 0.1,
        "backKill": 1,
        "killSpeed": 0,
        "spawnRate": 1000,
        "spawnRateMin": 0.3,
        "spawnRateMax": 5,
        "gradient": true,
        "colorStops": [
            {
                "value": -1.3,
                "color": [
                    0.9686274509803922,
                    0.984313725490196,
                    1,
                    1
                ]
            },
            {
                "value": -1.03,
                "color": [
                    0.8705882352941177,
                    0.9215686274509803,
                    0.9686274509803922,
                    1
                ]
            },
            {
                "value": -0.75,
                "color": [
                    0.7764705882352941,
                    0.8588235294117647,
                    0.9372549019607843,
                    1
                ]
            },
            {
                "value": -0.48,
                "color": [
                    0.6196078431372549,
                    0.792156862745098,
                    0.8823529411764706,
                    1
                ]
            },
            {
                "value": -0.21,
                "color": [
                    0.4196078431372549,
                    0.6823529411764706,
                    0.8392156862745098,
                    1
                ]
            },
            {
                "value": 0.06,
                "color": [
                    0.25882352941176473,
                    0.5725490196078431,
                    0.7764705882352941,
                    1
                ]
            },
            {
                "value": 0.34,
                "color": [
                    0.12941176470588237,
                    0.44313725490196076,
                    0.7098039215686275,
                    1
                ]
            },
            {
                "value": 0.59,
                "color": [
                    0.03137254901960784,
                    0.3176470588235294,
                    0.611764705882353,
                    1
                ]
            },
            {
                "value": 0.8,
                "color": [
                    0.03137254901960784,
                    0.18823529411764706,
                    0.4196078431372549,
                    1
                ]
            }
        ],
        "opacityStops": [
            {
                "value": -1.3,
                "opacity": 0
            },
            {
                "value": 0.36,
                "opacity": 0.08
            },
            {
                "value": 0.47,
                "opacity": 0.12
            },
            {
                "value": 0.58,
                "opacity": 0.15
            },
            {
                "value": 0.69,
                "opacity": 0.26
            },
            {
                "value": 0.8,
                "opacity": 0.57
            }
        ],
        "binFileIndex": 0,
        "depth": 1,
        "vetorFieldFilePath": binPath,
        "width": 720,
        "height": 322,
        "dataBounds": [
            -180,
            -79.919921875,
            0,
            180,
            80.919921875,
            50
        ],
        "renderBounds": [
            -180,
            -79.919921875,
            0,
            180,
            80.919921875,
            50
        ]
    };
    fdapi.vectorField.add(vf_ocean);
}

async function test_ellipsoid_vectorField_add2() {
    // 台风
    let path = HostConfig.Path;
    let binPath = path + "/assets/bin/vectorField/time0_typhoon";
    let colorStops = [];
    let opacityStops = []
    let colorArr = [
        {
            "value": 0,
            "color": [1, 1, 1, 0.11]
        },
        {
            "value": 10,
            "color": [0, 0, 1, 0.11]
        },
        {
            "value": 20,
            "color": [0, 1, 0, 0.21]
        },
        {
            "value": 40,
            "color": [1, 1, 0, 0.61]
        },
        {
            "value": 45,
            "color": [1, 0.5, 0, 0.81]
        },

        {
            "value": 50,
            "color": [1, 0, 0, 1]
        }
    ];

    for (let i = 0; i < colorArr.length; i++) {

        let item = colorArr[i];

        let colorItem = { "value": item.value, "color": item.color }
        let opacityItem = { "value": item.value, "opacity": item.color[3] }
        colorStops.push(colorItem)
        opacityStops.push(opacityItem);
    }
    await __g.vectorField.clear();
    let vf_typhoon = {
        id: "vf_typhoon",
        coordinate: [0, 0, 0],
        repeatCount: 10,
        displayMode: VectorFieldStyle.Typhoon, //支持多种样式： 台风 波浪 洋流等
        width: 720,
        height: 360,
        dataBounds: [-180, -90, 0, 180, 90, 500000],
        renderBounds: [-180, -90, 0, 180, 90, 500000],
        fieldScale: [1, 1, 1],
        bNeedProjection: true,
        wkt: "ECEF", //球面
        lodMin: 0.01,
        spawnRate: 1000,
        lodMax: 2.5,
        offset: [0, 0, 0],
        singleSpriteSize: 9000,
        vfIntensAsVelocity: 13500,
        lifeTime: 6,
        //颜色按速度插值
        //colorStops: colorStops,
        //透明度按速度插值
        //opacityStops: opacityStops,
        fenceThickness: 0,
        shphereRadius: 6378137,
        lodSpeedMin: 0.1,
        backKill: 1,
        killSpeed: 2.7,
        lodMaxDistance: 12756274.0,//2倍地球半径
        lodMinDistance: 6378137.0,//1倍地球半径
        spawnRateMin: 1.0, //远 密度 
        spawnRateMax: 5.0, // 近 密度
        //bin文件路径
        vetorFieldFilePath: binPath,
        binFileIndex: 0,
        depth: 1,
    };
    __g.vectorField.add(vf_typhoon);
}


function test_ellipsoid_vectorField_add3() {


    //波浪
    let path = HostConfig.Path;
    let binPath = path + "/assets/bin/vectorField/time0_waves";
    __g.vectorField.clear();

    let vf_waves = {
        "id": "vf_waves",
        "coordinate": [0, 0, 0],
        "repeatCount": 20,
        "displayMode": VectorFieldStyle.Waves,//支持三种样式： 台风 波浪 洋流 
        "width": 720,
        "height": 341,
        "depth": 1,
        "dataBounds": [-180, -85, 0, 180, 85, 1],
        "renderBounds": [-180, -85, 0, 180, 85, 1],
        "fieldScale": [1, 1, 1],
        "bNeedProjection": true,
        "wkt": "ECEF",
        "offset": [0, 0, 0],
        "binFileIndex": 0,
        "singleSpriteSize": 75000,
        "vfIntensAsVelocity": 100000,
        "spawnRate": 2500,
        "lifeTime": 3,
        "backKill": 1.0,
        "killSpeed": 0.3,
        "lodMin": 0.01,
        "lodMax": 0.9,
        "lodSpeedMin": 0.1,
        "lodMaxDistance": 12756274.0,//2倍地球半径
        "lodMinDistance": 6378137.0,//1倍地球半径
        "spawnRateMin": 1.5, //远 密度 
        "spawnRateMax": 40.0, // 近 密度
        "vetorFieldFilePath": binPath
    }
    __g.vectorField.add(vf_waves);
}

function test_ellipsoid_vectorField_update() {

    //待更新对象
    let vectorField1 = {
        "id": "vf_ocean",
        "dataBounds": [-180, -90, 0, 180, 90, 499500],
        "renderBounds": [-180, -90, 0, 180, 90, 499500],
        "singleSpriteSize": 13000,
        "vfIntensAsVelocity": 50000,
        "lifeTime": 5,
        //颜色按速度插值
        "colorStops": [
            { "value": 50, "color": [1, 0, 0, 1] },
            { "value": 30, "color": [1, 1, 0, 1] },
            { "value": 10, "color": [0, 0, 1, 1] },
            { "value": 0, "color": [0, 1, 0, 1] }
        ],
        //透明度按速度插值
        "opacityStops": [
            { "value": 50, "opacity": 1 },
            { "value": 30, "opacity": 0.75 },
            { "value": 10, "opacity": 0.5 },
            { "value": 0, "opacity": 0 }
        ],
    }
    fdapi.vectorField.update(vectorField1);
}

function test_ellipsoid_vectorField_delete() {
    fdapi.vectorField.delete('vf_ocean');
}

function test_ellipsoid_vectorField_clear() {
    fdapi.vectorField.clear();
}

function test_ellipsoid_vectorField_focus() {
    fdapi.vectorField.focus('vf_ocean', 10000);
}

function test_ellipsoid_vectorField_show() {
    fdapi.vectorField.show('vf_ocean');
}

function test_ellipsoid_vectorField_hide() {
    fdapi.vectorField.hide('vf_ocean');
}

function test_ellipsoid_vectorField_get() {
    fdapi.vectorField.get('vf_ocean');
}


function test_ellipsoid_vectorField_setViewportVisible() {

    //视口布局类型，取值范围：[1~7]
    let viewportMode = 5;
    //可选参数，激活后视口边框线的颜色
    let lineColor = "#FFFFFF";
    //可选参数，激活后视口边框线的宽度，单位：像素px
    let lineSize = 2;
    fdapi.misc.enterMultiViewportMode(viewportMode, lineColor, lineSize);

    //设置1和3视口可见
    fdapi.vectorField.setViewportVisible('vectorField1', Viewport.V1 | Viewport.V3);

}


//==========================vehicle2 载具车辆===============================
async function test_ellipsoid_vehicle2_add() {
    await fdapi.vehicle2.delete('vc2');
    let vc2 = {
        "id": "vc2",
        "coordinateType": 1,
        "coordinate": [116.39406878701756,28.214755821934357,74.29902226547271],//注意 vehicle2的moveTo接口的第一个坐标需要和初始化坐标位置保持一致！
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

async function test_ellipsoid_vehicle2_update() {
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


async function test_ellipsoid_vehicle2_moveTo() {

    //模拟实时gps坐标 //注意：起始坐标要和add初始化的坐标位置 保持一致
    let realTimeGPSPoint = [[116.39406878701756,28.214755821934357,74.29902226547271],[116.40286155458365,28.225090196303217,60.854418518404394],[116.41295054688848,28.239236979180493,52.76648409555949],[116.42298957336854,28.252161193219038,46.54379218199195],[116.43268402688501,28.26527791402856,66.90864759643902],[116.4455008315864,28.281076177136057,37.046721685064355],[116.43735443290629,28.296809626636495,31.804250920087362],[116.44543577564241,28.31328220933014,36.33348135377005],[116.44381506436855,28.341565552450344,39.047018652452714],[116.44808962010097,28.37001902516046,38.99006728224354],[116.43581041788299,28.405216855609606,49.34234927062025],[116.42310643377952,28.47180632089222,36.61738390896621],[116.46487037298182,28.440964922083015,43.61884593464339],[116.49406417649999,28.42161977123213,38.28380560731122],[116.52035112949521,28.391982621780684,35.965100852287605],[116.52547056597551,28.370798242637466,54.17661776484025],[116.52373556926561,28.348576949812273,55.46689482681882],[116.5161571236094,28.3194956955722,43.22773329786093],[116.5129825968559,28.307744045329617,58.156635874015535]]

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

function test_ellipsoid_vehicle2_get() {
    fdapi.vehicle2.get('vc2');
}

function test_ellipsoid_vehicle2_delete() {
    fdapi.vehicle2.delete('vc2');
}

function test_ellipsoid_vehicle2_clear() {
    fdapi.vehicle2.clear();
}

function test_ellipsoid_vehicle2_focus() {
    fdapi.vehicle2.focus('vc2', 10, 2, [-20, 0, 0], [0, 0, 0]);
}

function test_ellipsoid_vehicle2_setFollow() {
    //设置相机跟随
    fdapi.vehicle2.setFollow('vc2', 6, 2, -20, 0, 0.02, false, [0, 0, 0]);
}

function test_ellipsoid_vehicle2_cancelFollow() {
    //取消相机跟随
    fdapi.camera.cancelFollow();
}

function test_ellipsoid_vehicle2_setViewportVisible(){
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

function test_ellipsoid_vehicle2_show() {
    fdapi.vehicle2.show('vc2');
}

function test_ellipsoid_vehicle2_hide() {
    fdapi.vehicle2.hide('vc2');
}

function test_ellipsoid_vehicle2_showTextLabel() {
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


function test_ellipsoid_vehicle2_hideTextLabel() {
    fdapi.vehicle2.hideTextLabel('vc2');
}

//==========================Drone 无人机===============================
async function test_ellipsoid_drone_add() {

    //设置后期 泛光 减少灯光秀光晕
    fdapi.settingsPanel.setPostProcessMode({ bloomIntensity: 0.1 });
    
    //设置夜晚 展示灯光秀
    fdapi.weather.setDateTime(2025, 12, 25, 22, 10, false);

    //添加100架无人机
    await fdapi.drone.clear();
    let basePoint = [114.27120538076468,30.55549939345858,200]
    let d100 = [];
    for (let i = 0; i < 100; i++) {
        let drone = {
            "id": "drone" + i,
            "coordinateType": 0,
            "coordinate": [basePoint[0] + Math.random() * 0.01, basePoint[1] + Math.random() * 0.01, 200],
            "coordinateType": 1, //经纬度
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
            "lightColor": [Math.random(), Math.random(), Math.random(), 1],//灯光秀颜色
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


async function test_ellipsoid_drone_moveTo() {
    let basePoint = [114.27120538076468,30.55549939345858,500]
    let index = 0;
    let currTime = new Date().getTime();
    let timer = setInterval(function () {
        if (index < 100) {
            let time = currTime + 1000 * index;

            let d10 = []
            for (let i = 0; i < 100; i++) {
                d10.push({
                    "id": "drone" + i,
                    "coordinate": [basePoint[0] + Math.random() * 0.01, basePoint[1] + Math.random() * 0.01, 200],
                    "time": time,
                    "rotation": [0,0,0]
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

async function test_ellipsoid_drone_update() {
    let d100 = []
    for (let i = 0; i < 100; i++) {
        d100.push({
            "id": "drone" + i,
            "trailType": 0, //轨迹线样式
            "trailColor": [1, 1 ,0 , 1],//轨迹线颜色
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

async function test_ellipsoid_drone_focus() {
    //设置相机跟随
    fdapi.drone.focus('drone5', false, 8, 2, -45, 10, [0, 0, 0], 0.02);
}

async function test_ellipsoid_drone_show() {
    fdapi.drone.show('drone5');
}

async function test_ellipsoid_drone_hide() {
    fdapi.drone.hide('drone5');
}

async function test_ellipsoid_drone_clear() {
    fdapi.drone.clear();
}

async function test_ellipsoid_drone_delete() {
    fdapi.drone.delete('drone5');
}

async function test_ellipsoid_drone_get() {
    fdapi.drone.get('drone5');
}


//====================== panorama ======================

async function test_ellipsoid_panorama_add() {
    fdapi.panorama.clear();
    await fdapi.panorama.add({
        id: 'p1',
        imagePath: HostConfig.Path + '/assets/image/panorama1.jpg',
        coordinate:  [113.59140645149216,30.957783706050915,100],
        coordinateType: 1,//坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0 
        yaw: 75, //方向
        onTerrain: true, //是否贴地，注意：设置为贴地后offset偏移量的Z轴会失效
        offset: [0, 0, 0] //偏移量
    });
    fdapi.panorama.focus('p1',10);
}

async function test_ellipsoid_panorama_update() {
    await fdapi.panorama.update({
        id: 'p1',
        imagePath: HostConfig.Path + '/assets/image/panorama2.jpg',
        yaw: 75,
        onTerrain: false, //是否贴地
        offset: [0, 0, 0] //偏移量
    });
    fdapi.panorama.focus('p1',10);
}

function test_ellipsoid_panorama_delete() {
    fdapi.panorama.delete('p1');
}

function test_ellipsoid_panorama_clear() {
    fdapi.panorama.clear();
}

function test_ellipsoid_panorama_focus() {
    fdapi.panorama.focus('p1');

}

function test_ellipsoid_panorama_get() {
    fdapi.panorama.get('p1');
}

function test_ellipsoid_panorama_enter() {
    fdapi.panorama.enter('p1');
}

function test_ellipsoid_panorama_switchMode() {
    fdapi.panorama.switchMode();
}

function test_ellipsoid_panorama_exit() {
    fdapi.panorama.exit();
}


//====================== videoProjection ======================

async function test_ellipsoid_vp_add() {
    fdapi.videoProjection.delete('vp1');
    let o = {
        id: "vp1",
        videoURL: HostConfig.Path + "/assets/video/video2.mov",//视频地址
        location: [117.15590572354836,30.495226316045002,60],
        coordinateType: 1, //坐标系类型
        rotation: [-90, 120, 0],
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
        screenDistance: 100 //投影幕布的显示距离，单位：米，默认值：100米
    }
    await fdapi.videoProjection.add(o);
    fdapi.videoProjection.focus(o.id, 50);
}

async function test_ellipsoid_vp_update() {
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

function test_ellipsoid_vp_focus() {
    fdapi.videoProjection.focus('vp1', 100);
}

function test_ellipsoid_vp_show() {
    fdapi.videoProjection.show('vp1');
}

function test_ellipsoid_vp_hide() {
    fdapi.videoProjection.hide('vp1');
}

function test_ellipsoid_vp_get() {
    fdapi.videoProjection.get('vp1');
}

function test_ellipsoid_vp_delete() {
    fdapi.videoProjection.delete('vp1');
}

function test_ellipsoid_vp_clear() {
    fdapi.videoProjection.clear();
}

function test_ellipsoid_vp_setVideoURL() {
    fdapi.videoProjection.setVideoURL('vp1', HostConfig.Path + "/assets/video/video1.webm");
}

function test_ellipsoid_vp_setLocation() {
    fdapi.videoProjection.setLocation('vp1', [118.95177469683289,30.983739331040937,68]);
}

function test_ellipsoid_vp_setRotation() {
    fdapi.videoProjection.setRotation('vp1', [-100, 0, 0]);
}

function test_ellipsoid_vp_setFovy() {
    fdapi.videoProjection.setFovy('vp1', 100);
}

function test_ellipsoid_vp_setAspectRatio() {
    fdapi.videoProjection.setAspectRatio('vp1', 3);
}

function test_ellipsoid_vp_setDistance() {
    fdapi.videoProjection.setDistance('vp1', 200);
}

function test_ellipsoid_vp_setDepthCulling() {
    fdapi.videoProjection.setDepthCulling('vp1', false);
}

function test_ellipsoid_vp_setFrustumColor() {
    fdapi.videoProjection.setFrustumColor('vp1', Color.Red);
}