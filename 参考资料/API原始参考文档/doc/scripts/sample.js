var progressTimeVisible = false;


function onLoadInit() {
    //初始化samples导航栏
    initNavBar();

    //自动调整页面宽高
    onResize();

    //初始化云渲染视频流
    init(true, 'samples');

    //编辑器内容初始化
    window.codeEditor.setValue('Samples示例使用说明：\n\n'
        + '    （1）此处为示例代码展示区域，可在此处查看JS示例代码\n'
        + '             请点击右侧导航栏下面的各个动图，来切换对应示例效果\n\n'
        + '    （2）示例代码依赖的资源和图层文件详见以下目录：\n'
        + '             Cloud安装目录下的"\\SDK\\media"目录下\n\n'
        + '    （3）示例代码都可以在"\\SDK\\samples\\scripts\\sample.js"中找到。\n');
    //编辑器样式初始化
    window.codeEditor.setSize('100%', "400");//宽高
    window.codeEditor.setOption("readOnly", true);//只读
    window.codeEditor.setOption("lineNumbers", true);//行号

    //判断当前渲染的工程实例是否为demo
    setTimeout(checkDemoProject, 2000);
}

function initNavBar() {
    var oTTSlider = document.getElementById('TTSlider');
    var oTTSliderTitle = getByClass('TTSliderTitle', oTTSlider, 'div')[0];
    var aSubNav = oTTSliderTitle.getElementsByTagName('li');
    var oTTSliderPrevBtn = document.getElementById('TTSliderPrevBtn');
    var oTTSliderNextBtn = document.getElementById('TTSliderNextBtn');
    var oTTSliderPicList = getByClass('TTSliderPicList', oTTSlider, 'div')[0];
    var aItem = oTTSliderPicList.getElementsByTagName('ul');
    var len = aItem.length;

    var showIndex = aItemImgWidth = iNow = 0;
    var aEle = [];
    for (var i = 0; i < len; i++) {
        var aItemImgs = aItem[i].getElementsByTagName('li');
        if (!aItemImgWidth) {
            aItemImgWidth = aItemImgs[0].offsetWidth;
        }
        aEle.push(aItemImgs);	//存入数组,考虑到有多个轮播,且每个轮播里面的图片个数可能一致.
        aSubNav[i].index = i;
        aSubNav[i].onmouseover = function ()//切换
        {
            var index = showIndex = this.index;
            for (var j = 0; j < len; j++) {
                if (j != index) {
                    aItem[j].className = '';
                    aSubNav[j].className = '';
                }
            }
            aSubNav[index - 1] && (aSubNav[index - 1].className = 'noneBorRight');
            if (index > 0) {
                (aSubNav[0].getElementsByTagName('div')[0].style.borderLeft = '1px solid #C3C5C7');
            }
            else {
                aSubNav[0].getElementsByTagName('div')[0].style.borderLeft = '1px solid #C3C5C7';
            }

            aSubNav[index].className = 'cur';
            aItem[index].className = 'show';
        }
    }


    for (var i = 0; i < len; i++) {
        var num = aEle[i].length;
        if (aItem[i].className == 'show') {
            showIndex = i;
        }
        aItem[i].style.width = num * (aItemImgWidth) + 'px'
    }

    oTTSliderNextBtn.onclick = function () {
        doMove(aItem[showIndex], -(aItemImgWidth), function () {
            aItem[showIndex].style.left = 0;
            aItem[showIndex].appendChild(aEle[showIndex][0])
        });
    }

    oTTSliderPrevBtn.onclick = function () {
        var maxNum = aEle[showIndex].length - 1;
        aItem[showIndex].insertBefore(aEle[showIndex][maxNum], aEle[showIndex][0]);
        aItem[showIndex].style.left = -aItemImgWidth + 'px';
        doMove(aItem[showIndex], 0);
    }

    function doMove(o, t, fn) {
        clearInterval(o.timer);
        o.timer = setInterval(function () {
            var is = (t - getStyle(o, 'left')) / 8;
            is = is > 0 ? Math.ceil(is) : Math.floor(is);
            if (t == o.offsetLeft) {
                clearInterval(o.timer);
                (typeof fn === 'function') && fn();
            }
            else {
                o.style.left = o.offsetLeft + is + 'px';
            }

        }, 30)
    }
    function getStyle(o, a) {
        return o.currentStyle ? parseFloat(o.currentStyle[a]) : parseFloat(getComputedStyle(o, false)[a]);
    }
    function getByClass(s, p, e) {
        var reg = new RegExp('(\\b)' + s + '(\\b)');
        var aElement = (p || document).getElementsByTagName(e || '*');
        var aResult = [];
        for (var i = 0; i < aElement.length; i++) {
            reg.test(aElement[i].className) && aResult.push(aElement[i]);
        }
        return aResult;
    }
}

function onResize() {
    let mainTable = document.getElementById('mainTable');
    let leftPanel = document.getElementById('leftPanel');
    let infoPanel = document.getElementById('infoPanel');
    let codeEditor = document.getElementById('codeEditor');
    let player = document.getElementById('player');
    let TTSlider = document.getElementById('TTSlider');
    let progressTime = document.getElementById('progressTime');

    mainTable.style.height = window.innerHeight + 'px';
    codeEditor.style.height = `400px`;

    infoPanel.style.overflow = 'auto';
    infoPanel.style.height = (window.innerHeight - codeEditor.clientHeight - 80) + 'px';

    player.style.width = `${window.innerWidth - leftPanel.clientWidth - 10}px`;
    TTSlider.style.width = player.style.width;

    if (progressTimeVisible)
        player.style.height = `${window.innerHeight - progressTime.clientHeight - TTSlider.clientHeight - 10}px`;
    else
        player.style.height = `${window.innerHeight - TTSlider.clientHeight - 8}px`;
}

//切换显示隐藏时间轴
function showTimeline(flag) {
    progressTimeVisible = flag;
    if (flag) {
        $('#progressTime').show();
    } else {
        $('#progressTime').hide();
    }
    onResize();
}


function checkDemoProject() {
    //判断当前渲染的工程实例是否为demo
    let currentProjectName = fdplayer?.getInstanceInfo()?.project;
    if ('demo' != currentProjectName) {
        alert('本示例页面基于demo工程进行渲染，非demo工程会引起部分示例失效，请切换为demo工程并重启Cloud进行渲染！');
    }
}


$(function () {
    var hourTimestamp = 3600 * 1000;
    var dayTimestamp = hourTimestamp * 24;

    $("#progressTime").ProgressTime({
        container: "progressTime",
        startTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 2), "YYYY/MM/DD 00:00:00")),
        endTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")),
        currentTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 2), "YYYY/MM/DD 00:00:00")),
        interval: 500,
        delay: 1000,
        isNow: true,
        hoursInterval: 1,
        callback: function (config) {
            //console.log(config);
        },
        animateCallback: function (config) {
            // 假如动画完成之后请求数据需要两秒
            var timer = setTimeout(function () {
                progressTime.options.toPlay = true; // 两秒之后再继续走播放条
                clearTimeout(timer);
            }, 0);
        }
    });

    //默认隐藏时间轴
    $('#progressTime').hide();

    onLoadInit();

    window.addEventListener('resize', onResize, true);
})


/**
* 楼宇拆解类
*
* 实现原理：
* 1、将acp场景中包含的建筑物楼层Actor复制为CustomObject对象
* 2、使用CustomObject对象的setLocation()方法修改楼层位置
* 3、启用定时器来不断动态修改CustomObject的位置，从而形成拆解楼宇的动画效果
*
* 使用准备：
* 1、需准备建筑物各个楼层的3dt文件并导入acp工程
* 2、建筑物各楼层导入acp的初始场景坐标为[0,0,0]，如初始坐标非[0,0,0]请设置defaultLocation参数
* 3、楼宇拆解对象(DismantleBuilding)的封装详情见\SDK\JS\samples\scripts\sample.js
*
* 方法调用：
* 1、升起楼层：dismantleBuildingObj.moveUp()
* 2、下降楼层：dismantleBuildingObj.moveDown()
* 3、抽出楼层：dismantleBuildingObj.levelShift({ val: 1, status: true })
* 4、推入楼层：dismantleBuildingObj.levelShift({ val: 1, status: false})
*
**/
class DismantleBuilding {
    //构造器参数的默认值
    constructor({
        //必选 楼宇拆解对象实例id
        id = "dismantleBuildingInstance_",
        //必选 待拆解的楼层模型信息数组
        floorInfoArr,
        //可选 楼层每层的高度            单位：米
        defaultFloorHeight = 3,
        //可选 建筑物位置坐标            单位：[X,Y,Z] 注意坐标系
        defaultLocation = [0, 0, 0],

        //可选 建筑物整体离地高度        单位：米
        heightFromGround = 4,
        //可选 单个楼层垂直移动总距离    单位：米
        verticalMoveDistance = 10,
        //可选 单个楼层每次垂直移动耗时  单位：毫秒 
        verticalMoveOnceCostTime = 30,
        //可选 单个楼层每次垂直移动距离  单位：米 
        verticalMoveOnceDistance = 0.3,
        //可选 单个楼层水平移动总距离    单位：米
        levelMoveDistance = 40,
        //可选 单个楼层每次水平移动耗时  单位：毫秒
        levelMoveOnceCostTime = 20,
        //可选 单个楼层每次水平移动距离  单位：米 
        levelMoveOnceDistance = 0.5,
        //TODO 暂不开放 可选 单个楼层水平移动方向      取值：1东 2西 3南 4北  
        levelMoveDirection = 4,
    }) {
        // 楼宇拆解对象实例id
        this.id = id;
        // 待拆解的楼层模型信息数组：包含图层id和模型id
        this.floorInfoArr = floorInfoArr;
        // 楼层每层的高度  单位：米
        this.defaultFloorHeight = defaultFloorHeight;
        // 建筑物位置坐标  注意坐标系类型
        this.defaultLocation = defaultLocation;
        // 建筑物整体离地高度  单位：米
        this.heightFromGround = heightFromGround;
        // 单个楼层垂直移动总距离    单位：米
        this.verticalMoveDistance = verticalMoveDistance;
        // 单个楼层每次垂直移动耗时  单位：毫秒 
        this.verticalMoveOnceCostTime = verticalMoveOnceCostTime;
        // 单个楼层每次垂直移动距离  单位：米 
        this.verticalMoveOnceDistance = verticalMoveOnceDistance;
        // 单个楼层水平移动总距离    单位：米
        this.levelMoveDistance = levelMoveDistance;
        // 单个楼层每次水平移动耗时  单位：毫秒
        this.levelMoveOnceCostTime = levelMoveOnceCostTime;
        // 单个楼层每次水平移动距离  单位：米 
        this.levelMoveOnceDistance = levelMoveOnceDistance;
        // 单个楼层水平移动方向：1东2西3南4北
        this.levelMoveDirection = levelMoveDirection;

        // 记录打开后状态的自定义对象数据
        this.cObjectDatas = null;
        // 记录关闭状态的自定义对象数据
        this.customObjectIds = null;
        // 需要抽出的楼层层数
        this.isClickVal = null;
        // 保存抽出的楼层数据以便来进行切换
        this.isClickData = null;
        // 是否添加自定义对象并获取坐标完毕
        this.IsOnReady = false;
        // 是否处于关闭状态
        this.isClose = true;
        // 是否处于不在运动状态
        this.isStopRun = true;
        // 当前楼层是否已关闭
        this.isClickLayerClose = false;
    }


    // 添加自定义对象
    async addCustomObjects() {
        // 图层id数组
        let treeid = [];
        // 自定义对象id数组
        let customObjectIds = [];
        // 自定义对象数据数组
        let customObjectDatas = [];
        // 模型ActorId
        let actorIds = [];
        // 添加自定义对象
        this.floorInfoArr.forEach((item, index) => {
            treeid.push(item.Id);
            actorIds.push(item.ObjectID);
            customObjectIds.push(this.id + index);
            let o = {
                id: this.id + index,
                tileLayerId: item.Id,
                objectId: item.ObjectID,
                smoothMotion: 0, //1: 平滑插值，0: 跳跃
                location: [this.defaultLocation[0], this.defaultLocation[1], this.defaultLocation[2] + index * this.defaultFloorHeight],
                rotation: [0, 0, 0],
                scale: [1, 1, 1]
            };
            customObjectDatas.push(o);
        });
        await window.fdapi.customObject.addByTileLayer(customObjectDatas);
        this.customObjectIds = customObjectIds;
        //隐藏图层树上的各个楼层
        //window.fdapi.infoTree.hide(treeid);

        //隐藏添加的三维图层包含的所有楼层
        for (let i = 0; i < actorIds.length; i++) {
            //await window.fdapi.tileLayer.hideActor('4DECD1704AD8119E33CF658A64A70AD2', actorIds[i]);
        }
        await window.fdapi.tileLayer.hideActors([{ 'id': '4DECD1704AD8119E33CF658A64A70AD2', 'objectIds': actorIds }]);

        // 获取添加的自定义对象的信息
        let customObjectData = await window.fdapi.customObject.get(customObjectIds);
        //console.log(customObjectData)
        this.cObjectDatas = customObjectData.data;
        console.log("%c 楼层数据初始化成功!", "color:green");
        logWithColor('green', '楼层数据初始化成功!');
        this.IsOnReady = true;
        return customObjectData.data;
    }

    // 楼层升起
    async moveUp() {
        if (this.IsOnReady) {
            if (this.isStopRun) {
                if (this.isClose) {
                    // 打开位移状态
                    this.isStopRun = false;
                    let index = 0;
                    this.timer = setInterval(async () => {
                        let i = index * this.verticalMoveOnceDistance;
                        if (i >= this.verticalMoveDistance) {
                            i = this.verticalMoveDistance;
                        }

                        window.fdapi.customObject.updateBegin();
                        const setLocation = (j, length) => {
                            window.fdapi.customObject.setLocation(this.cObjectDatas[j].id, [
                                this.defaultLocation[0],
                                this.defaultLocation[1],
                                this.defaultLocation[2] + this.heightFromGround + (i + this.defaultFloorHeight) * j
                            ]);
                            if (++j < length) {
                                setLocation(j, length);
                            }
                        };
                        //设置楼层位移动画效果
                        if (this.cObjectDatas instanceof Array) {
                            setLocation(0, this.cObjectDatas.length);
                        } else {
                            console.log("%c 数据未初始化成功", "color:red");
                            logWithColor("red", "数据未初始化成功");
                            $.toast({ content: '数据未初始化成功！', time: 1500 });
                        }
                        window.fdapi.customObject.updateEnd();
                        index++;
                        if (i >= this.verticalMoveDistance) {
                            this.isClose = false;
                            // 关闭位移状态
                            this.isStopRun = true;
                            clearInterval(this.timer);
                            return;
                        }
                    }, this.verticalMoveOnceCostTime);
                } else {
                    console.log("%c 已经是开启状态", "color:red");
                    logWithColor("red", "已经是开启状态");
                    $.toast({ content: '已经是开启状态！', time: 1500 });
                }
            } else {
                console.log("%c 正处于位移状态，请稍后", "color:red");
                logWithColor("red", "正处于位移状态，请稍后");
                $.toast({ content: '正处于位移状态，请稍后！', time: 1500 });
            }
        } else {
            console.log("%c 尚未获取到模型信息，请稍后", "color:red");
            logWithColor("red", "尚未获取到模型信息，请稍后");
            $.toast({ content: '尚未获取到模型信息，请稍后！', time: 1500 });
        }
    }

    // 楼层下降
    async moveDown() {
        if (this.IsOnReady) {
            if (this.isStopRun) {
                if (!this.isClose) {
                    // 打开位移状态
                    this.isStopRun = false;
                    let index = 0;
                    this.timer1 = setInterval(async () => {
                        let i = this.verticalMoveDistance - index * this.verticalMoveOnceDistance;
                        if (i <= 0) {
                            i = 0;
                        }
                        window.fdapi.customObject.updateBegin();
                        const setLocation = (j, length) => {
                            window.fdapi.customObject.setLocation(this.cObjectDatas[j].id, [
                                this.defaultLocation[0],
                                this.defaultLocation[1],
                                this.defaultLocation[2] +
                                (i + this.defaultFloorHeight) * j
                            ]);
                            if (++j < length) {
                                setLocation(j, length);
                            }
                        };
                        if (this.cObjectDatas instanceof Array) {
                            setLocation(0, this.cObjectDatas.length);
                        } else {
                            console.log("%c 数据未初始化成功", "color:red");
                            logWithColor("red", "数据未初始化成功");
                            $.toast({ content: '数据未初始化成功！', time: 1500 });
                        }
                        window.fdapi.customObject.updateEnd();
                        index++;
                        if (i <= 0) {
                            // 情况楼层抽出的数据
                            this.isClickVal = null;
                            this.isClose = true;
                            // 关闭位移状态
                            this.isStopRun = true;
                            clearInterval(this.timer1);
                            return;
                        }
                    }, this.verticalMoveOnceCostTime);
                } else {
                    console.log("%c 已经是关闭状态", "color:red");
                    logWithColor("red", "已经是关闭状态！");
                    $.toast({ content: '已经是关闭状态！', time: 1500 });
                }
            } else {
                console.log("%c 正处于位移状态，请稍后", "color:red");
                logWithColor("red", "正处于位移状态，请稍后！");
                $.toast({ content: '正处于位移状态，请稍后！', time: 1500 });
            }
        } else {
            console.log("%c 尚未获取到模型信息，请稍后", "color:red");
            logWithColor("red", "尚未获取到模型信息，请稍后！");
            $.toast({ content: '尚未获取到模型信息，请稍后！', time: 1500 });
        }
    }

    // 水平拉出楼层或水平推入楼层
    async levelShift({ val, status }) {
        console.log('levelShift', val, status, this.IsOnReady, this.isStopRun, this.isClose);
        if (this.IsOnReady) {
            if (this.isStopRun) {
                if (!this.isClose) {

                    let oldClickData = this.isClickData;
                    let oldClickVal = this.isClickVal;
                    this.isClickVal = val;
                    this.isClickData = this.cObjectDatas[val];

                    // 顶层不启动位移
                    if (val !== 0) {
                        if (status && oldClickVal !== val) {
                            window.fdapi.customObject.focus(this.cObjectDatas[val].id, 120, 2);
                            // 打开位移状态
                            this.isStopRun = false;

                            // 抽出楼层
                            console.info('抽出楼层');
                            let i = this.levelMoveOnceDistance;
                            this.timer2 = setInterval(async () => {
                                if (i > this.levelMoveDistance) {
                                    i = this.levelMoveDistance;
                                }
                                let location = [
                                    this.defaultLocation[0],
                                    this.isClickData.location[1] - i,
                                    this.defaultLocation[2] + this.heightFromGround + val * (this.verticalMoveDistance + this.defaultFloorHeight)
                                ];
                                // console.log('setLocation', this.isClickData.id, location);
                                window.fdapi.customObject.setLocation(this.isClickData.id, location);

                                if (i >= this.levelMoveDistance) {
                                    // 关闭位移状态
                                    this.isStopRun = true;
                                    this.isClickLayerClose = false;

                                    clearInterval(this.timer2);
                                    return;
                                }
                                i += this.levelMoveOnceDistance;
                            }, this.levelMoveOnceCostTime);
                            // 抽出楼层时关闭其他楼层
                            if (
                                !this.isClickLayerClose &&
                                (oldClickVal || this.isClickVal === 0)
                            ) {
                                console.log(oldClickVal, "抽出楼层时关闭其他楼层");
                                let ii = this.levelMoveDistance;
                                this.timer3 = setInterval(async () => {
                                    if (ii <= 0) {
                                        ii = 0;
                                    }

                                    window.fdapi.customObject.setLocation(oldClickData.id, [
                                        this.defaultLocation[0],
                                        oldClickData.location[1] - ii,
                                        this.defaultLocation[2] + this.heightFromGround + oldClickVal * (this.verticalMoveDistance + this.defaultFloorHeight)
                                    ]);

                                    if (ii <= 0) {
                                        // 关闭位移状态
                                        this.isStopRun = true;
                                        clearInterval(this.timer3);
                                        return;
                                    }
                                    ii -= this.levelMoveOnceDistance;
                                }, this.levelMoveOnceCostTime);
                            }
                        } else if (oldClickVal === val) {
                            let ii = this.levelMoveDistance;
                            this.isStopRun = false;
                            if (ii <= 0) {
                                ii = 0;
                            }

                            this.timer4 = setInterval(async () => {
                                window.fdapi.customObject.setLocation(this.isClickData.id, [
                                    this.defaultLocation[0],
                                    this.isClickData.location[1] - ii,
                                    this.isClickData.location[2] + this.heightFromGround + val * this.verticalMoveDistance
                                ]);
                                if (ii <= 0) {
                                    // 关闭位移状态
                                    this.isStopRun = true;
                                    this.isClickLayerClose = true;
                                    this.isClickVal = null;
                                    clearInterval(this.timer4);
                                    return;
                                }
                                ii -= this.levelMoveOnceDistance;
                            }, this.levelMoveOnceCostTime);
                        }
                    } else {
                        console.log("%c 顶层不开启抽拉！", "color:red");
                        logWithColor("red", "顶层不开启抽拉！");
                        $.toast({ content: '顶层不开启抽拉！', time: 1500 });
                    }
                } else {
                    console.log("%c 请先升起楼层！", "color:red");
                    logWithColor("red", "请先升起楼层！");
                    $.toast({ content: '请先升起楼层！', time: 1500 });
                }
            } else {
                console.log("%c 正处于位移状态，请稍后！", "color:red");
                logWithColor("red", "正处于位移状态，请稍后！");
                $.toast({ content: '正处于位移状态，请稍后！', time: 1500 });
            }
        } else {
            console.log("%c 尚未获取到模型信息，请稍后！", "color:red");
            logWithColor("red", "尚未获取到模型信息，请稍后！");
            $.toast({ content: '尚未获取到模型信息，请稍后！', time: 1500 });
        }
    }
}


/**
* HashMap对象
*/
function HashMap() {
    /** Map 大小 **/
    var size = 0;
    /** 对象 **/
    var entry = new Object();

    /** 存 **/
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }

    /** 取 **/
    this.get = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    /** 删除 **/
    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }

    /** 是否包含 Key **/
    this.containsKey = function (key) {
        return (key in entry);
    }

    /** 是否包含 Value **/
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }

    /** 所有 Value **/
    this.values = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }

    /** 所有 Key **/
    this.keys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }

    /** Map Size **/
    this.size = function () {
        return size;
    }

    /* 清空 */
    this.clear = function () {
        size = 0;
        entry = new Object();
    }
    /** 根据 Value 获取key**/
    this.getKeyByValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return prop;
            }
        }
        return null;
    }
}


/** 
 * Samples示例代码
 * 
 * 1、入门示例
 * 
 * 2、摄像机
 * 
 * 3、场景标注
 * 
 * 4、空间分析
 * 
 * 5、图层操作
 * 
 * 6、模型操作
 * 
 * 7、楼宇拆解
 * 
 * 8、运动物体
 * 
 * 9、水流仿真
 * 
 * 
 */

//全局错误消息
var errorMsg_1 = "请在场景中先点击一个TileLayer图层，再执行此操作！";
var errorMsg_2 = "请先执行初始化！";

//清除前置操作
function samples_reset() {

    //清空对象
    fdapi.camera.stop();
    fdapi.marker.clear();
    fdapi.polyline.clear();
    fdapi.tileLayer.stopHighlightActor();

}

//场景初始化
function samples_initScene() {
    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
      * 注意：以下示例代码仅供示例，开发实际工程时请使用推荐的高级初始化方式
      * 
      * 初始化场景步骤：
      * 1、HTML页面引入：<script src='本地工程目录/lib/ac.min.js'></script>
      * 2、添加标签：<div id="player" style="width:800px;height:500px;"></div>
      * 3、请使用以下示例代码初始化你的第一个场景
      */

    //初始化场景前先销毁已存在的渲染场景
    fdapi?.destroy();

    //云渲染主机地址和端口
    var ip = document.getElementById("txtIP").value;
    var port = document.getElementById("txtPort").value;
    var host = ip + ':' + port;

    //必选回调函数，视频流加载完成回调函数 
    //请在此处开始调用DigitalTwinAPI进行二次开发
    var _onReady = () => {
        //开始执行你的业务代码
        console.info("'三维场景渲染成功，请开始在_onReady回调函数内进行二次开发。");
        //设置相机位置
        fdapi.camera.set(492035.37, 2488806.75, 402.62, -15.0, -173.0, 0.2);
        //显示右侧导航栏
        fdapi.settings.setMainUIVisibility(false);
    };

    //可选回调函数，视频流事件交互回调函数
    var _onEvent = (event) => {
        //图层id
        var layerId = event.Id || event.ID;
        //模型ActorId
        var objectId = event.ObjectID;
        //模型位置
        var objectLocation = event.MouseClickPoint;
        if (event.eventtype == 'LeftMouseButtonClick' && event.Type == 'TileLayer') {
            //构造当前选中区域
            __tileLayerCurSel = {
                'id': layerId,
                'objectId': objectId,
                'location': objectLocation
            };
        }

        //监听marker点击事件
        if (event.eventtype == 'LeftMouseButtonClick') {
            $("#popDiv").hide();
            if (event.Id == 'div_marker' && event.Type == 'marker') {
                //把投影坐标转换为屏幕坐标并设置弹层div的相对定位
                fdapi.coord.world2Screen(492576.125, 2492218.75, 6.2899975776672363).then(result => {
                    var screenPosition = result.screenPosition;
                    $("#popDiv").css("position", "relative");
                    $("#popDiv").css("left", screenPosition[0] + 100);
                    $("#popDiv").css("top", screenPosition[1] + 1000);
                    $("#popDiv").show();
                });
            }
        }
    };

    //开发前请参考API开发手册里DigitalTwinPlayer对象的构造参数
    //视频流初始化配置
    var options = {
        //必选参数，网页显示视频流的dom节点id
        'domId': 'player',
        //必选参数，二次开发时必须指定，否则无法进行二次开发
        'apiOptions': {
            //必选回调函数，视频流加载完成回调函数
            'onReady': _onReady,

            //可选回调函数，视频流事件交互回调函数
            'onEvent': _onEvent,

            //可选回调函数，日志回调，清空页面的日志控制台，二次开发时候可以不需要
            'onLog': (function (s, nnl) {
                document.getElementById('infoPanel').innerHTML = '';
                document.getElementById('infoPanel').className = '';
                logWithColor("green", "三维场景渲染成功!");
            }),
        }
    };
    //一行代码创建和显示三维视频流
    fdapi = new DigitalTwinPlayer(host, options).getAPI();
}

//记录所有切换状态
var flagMap = new HashMap();

function samples_eventListener2() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
    * 以下为动态设置事件监听代码示例：
    * 设置交互事件：点击模型时切换高亮显示
    * 
    * 
    * 事件监听类型描述：
    * 
    * 1.左键单击：LeftMouseButtonClick
    * 
    * 注意：移动和悬停需要开启设置鼠标拾取后才生效
    * 开启鼠标拾取：fdapi.settings.setMousePickMask(7);
    * 2.鼠标移动：MouseMoved    
    * 3.鼠标悬停：MouseHovered
    * 
    * 
    * 注意：需要开启相机移动监听事件  
    * 开启相机移动事件监听：fdapi.settings.setEnableCameraMovingEvent(true);
    * 4.相机飞行：CameraMoving
    * 
    * 相机执行set/lookAt/lookAtBBox方法时触发
    * 5.相机位置变化：CameraChanged
    * 
    * 注意：进入测量模式后，开始测量时触发
    * 6.开始测量：Measurement
    * 
    * 注意：相机播放导览结束__g.camera.playAnimation(id)和导览对象播放导览结束__g.cameraTour.play(id)均触发此事件
    * 7.播放导览结束：CameraTourFinished
    * 
    */

    //移动相机镜头至
    fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 1);


    //设置场景左键点击监听事件
    fdapi.setEventCallback(function (event) {
        //图层id
        var layerId = event.Id || event.ID;
        //点击ActorId
        var objectId = event.ObjectID;
        //点击位置
        var objectLocation = event.MouseClickPoint;


        //监听marker点击事件
        if (event.eventtype == 'LeftMouseButtonClick') {
            $("#popDiv").hide();
            if (event.Id == 'div_marker' && event.Type == 'marker') {
                //把投影坐标转换为屏幕坐标并设置弹层div的相对定位
                fdapi.coord.world2Screen(492576.125, 2492218.75, 6.2899975776672363).then(result => {
                    var screenPosition = result.screenPosition;
                    $("#popDiv").css("position", "relative");
                    $("#popDiv").css("left", screenPosition[0] + 100);
                    $("#popDiv").css("top", screenPosition[1] + 1000);
                    $("#popDiv").show();
                });
            }
        }

        if (event.eventtype == 'LeftMouseButtonClick' && event.Type == 'TileLayer') {
            log('======动态设置监听事件开始======');
            log('图层ID: ' + layerId);
            log('图层内物体ID: ' + objectId);
            log('图层内物体位置: [' + objectLocation + ']');
            log('======动态设置监听事件结束======');

            //构造当前选中区域
            __tileLayerCurSel = {
                'id': layerId,
                'objectId': objectId,
                'location': objectLocation
            };

            //点击切换物体高亮
            if (flagMap.get(layerId + "_" + objectId)) {
                flagMap.put(layerId + "_" + objectId, false);
                fdapi.tileLayer.stopHighlightActor(layerId, objectId);
            } else {
                flagMap.put(layerId + "_" + objectId, true);
                fdapi.tileLayer.highlightActor(layerId, objectId);
            }

        }
    });

    logWithColor("green", "左键点击事件监听设置成功，请开始点击图层对象。");
}


//高级初始化 推荐方式
function samples_eventListener1() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();


    /**
     * 推荐的初始化开始方式，包含更多初始化参数选项
     * 
     * 初始化场景步骤：
     * 1、HTML页面引入：<script src='本地工程目录/lib/ac.min.js'></script>
     * 2、添加标签：<div id="player" style="width:800px;height:500px;"></div>
     * 3、请使用以下代码场景初始化
    */

    //初始化场景前先销毁已存在的渲染场景
    fdapi?.destroy();

    //云渲染主机地址和端口
    var ip = document.getElementById("txtIP").value;
    var port = document.getElementById("txtPort").value;
    var host = ip + ':' + port;

    //注意：可以把此变量声明为全局变量，在点击事件的回调函数内部赋值当前选中区域
    //var currentTileLayerSelection;

    //onEvent场景交互事件回调函数
    let _onEvent = (event) => {
        //事件类型 参考交互事件类型枚举对象
        var eventType = event.eventtype;
        //图层类型
        var layerType = event.Type;
        //图层id
        var layerId = event.Id || event.ID;
        //点击ActorId
        var objectId = event.ObjectID;
        //点击位置
        var objectLocation = event.MouseClickPoint;

        //监听marker点击事件
        if (event.eventtype == 'LeftMouseButtonClick') {
            $("#popDiv").hide();
            if (event.Id == 'div_marker' && event.Type == 'marker') {
                //把投影坐标转换为屏幕坐标并设置弹层div的相对定位
                fdapi.coord.world2Screen(492576.125, 2492218.75, 6.2899975776672363).then(result => {
                    var screenPosition = result.screenPosition;
                    $("#popDiv").css("position", "relative");
                    $("#popDiv").css("left", screenPosition[0] + 100);
                    $("#popDiv").css("top", screenPosition[1] + 1000);
                    $("#popDiv").show();
                });
            }
        }

        /**
         * 
         * 事件监听类型描述：
         * 
         * 1.左键单击：LeftMouseButtonClick
         *
         * 注意：移动和悬停需要开启设置鼠标拾取后才生效
         * 开启鼠标拾取：fdapi.settings.setMousePickMask(7);
         * 2.鼠标移动：MouseMoved    
         * 3.鼠标悬停：MouseHovered
         *
         *
         * 注意：需要开启相机移动监听事件  
         * 开启相机移动事件监听：fdapi.settings.setEnableCameraMovingEvent(true);
         * 
         * 4.相机开始飞行：CameraStartMove
         * 5.相机正在飞行：CameraMoving
         * 6.相机停止飞行：CameraStopMove
         * 
         *
         * 相机执行set/lookAt/lookAtBBox方法时触发
         * 7.相机位置变化：CameraChanged
         *
         * 注意：进入测量模式后，开始测量时触发
         * 8.开始测量：Measurement
         * 
         * 注意：相机播放导览结束__g.camera.playAnimation(id)和导览对象播放导览结束__g.cameraTour.play(id)均触发此事件
         * 9.播放导览结束：CameraTourFinished
         * 
         **/
        switch (eventType) {
            case "LeftMouseButtonClick":
                log('触发事件类型：鼠标左键单击，eventType：' + eventType);
                //如果是三维图层 则输出点击区域信息
                if (layerType == "TileLayer") {
                    log('======点击事件开始======');
                    log('图层ID: ' + layerId);
                    log('图层类型: ' + layerType);
                    log('图层内物体ID: ' + objectId);
                    log('图层内物体位置: [' + objectLocation + ']');
                    log('======点击事件结束======');
                    //构造当前选中区域
                    __tileLayerCurSel = {
                        'id': layerId,
                        'objectId': objectId,
                        'location': objectLocation
                    };
                }
                break;

            case "MouseHovered":
                log('触发事件类型：鼠标悬停，eventType：' + eventType);
                break;

            case "MouseMoved":
                log('触发事件类型：鼠标移动，eventType：' + eventType);
                break;

            case "CameraStartMove":
                log('触发事件类型：相机开始飞行，eventType：' + eventType);
                break;

            case "CameraMoving":
                log('触发事件类型：相机正在飞行，eventType：' + eventType);
                break;

            case "CameraStopMove":
                log('触发事件类型：相机停止飞行，eventType：' + eventType);
                break;

            case "CameraChanged":
                log('触发事件类型：相机位置发生变化，eventType：' + eventType);
                break;

            case "Measurement":
                log('触发事件类型：开始测量，eventType：' + eventType);
                break;

            default: ""
        }
    };

    //onReady回调函数 二次开发时必选
    let _onReady = () => {
        //开始调用DigitalTwinAPI接口进行二次开发
        logWithColor("green", "初始化成功，请开始使用DigitalTwinAPI接口进行二次开发。");
        //设置相机位置
        fdapi.camera.set(492115.37, 2488916.75, 402.62, -15.0, -173.0, 0.2);
        //隐藏右侧导航栏
        fdapi.settings.setMainUIVisibility(false);

        //开启事件监听
        fdapi.settings.setEnableCameraMovingEvent(true);
        fdapi.settings.setMousePickMask(7);
    };

    //onLog回调函数 二次开发时可选
    let _onLog = (msg, noLineBreak) => {
        if (msg.indexOf('Reconnecting...') != -1) {
            clearScreen();
            msg += (++iReconnect);
        }
        if (msg.indexOf('Connected!') != -1) {
            iReconnect = 0;
        }
        var e = document.getElementById('infoPanel');
        e.insertAdjacentHTML('beforeend', msg + (noLineBreak ? '' : '\n'));
        e.scrollTop = e.scrollHeight + 100;
    };

    //onloaded回调函数 二次开发时可选
    let _onLoaded = (event) => {
        console.log('视频流加载成功!');
    };

    //onClose回调函数 二次开发时可选
    let _onClose = (event) => {
        console.log('视频流已断开!')
    };

    //开发前请参考API开发手册里DigitalTwinPlayer对象的构造参数
    //视频流初始化配置
    let options = {
        //必选参数，网页显示视频流的dom节点id
        'domId': 'player',

        //必选参数，二次开发时必须指定，否则无法进行二次开发
        'apiOptions': {
            //必选参数，与云渲染主机通信成功后的回调函数
            //注意：只有在onReady之后才可以调用DigitalTwinAPI接口
            'onReady': _onReady,

            //可选参数，日志输出回调函数
            'onLog': _onLog,
            //可选参数，三维场景交互事件回调函数
            'onEvent': _onEvent
        },

        //可选参数，是否显示页面按钮【+显示信息】，默认false
        'showStatus': true,
        //可选参数，是否显示页面加载详细信息，默认值为true
        'showStartupInfo': true,
        //可选参数，视频流加载成功回调函数
        'onloaded': _onLoaded,
        //可选参数，连接断开回调函数
        'onclose': _onClose,
        //可选参数，设置三维交互的键盘事件接收者
        //注意：接收类型有视频标签(video)，网页文档(document)，空(none)
        'keyEventTarget': 'none',
    };
    //构造DigitalTwinPlayer对象
    let demoPlayer = new DigitalTwinPlayer(host, options);
    //构造DigitalTwinAPI对象并初始化
    fdapi = demoPlayer.getAPI();
}

//摄像机：设置镜头位置
function samples_cameraSet() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();


    /**
     * 设置相机镜头位置有以下三种方式
     * 
     * 1、通过观察点设置相机位置
     * 2、通过BBox设置相机位置
     * 3、普通方式设置相机位置
     * 
    */

    //1、通过观察点设置相机位置 参数详情请参考API开发文档
    //fdapi.camera.lookAt(lookAt(x, y, z, distance, pitch, yaw, flyTime, fn))

    //2、通过BBox设置相机位置 参数详情请参考API开发文档
    //fdapi.camera.lookAtBBox(bbox, pitch, yaw, flyTime, fn);


    //3、普通方式设置相机位置 有两种传参类型
    let cameraPositon = {
        "x": 492543,
        "y": 2492194,
        "z": 25,
        "pitch": -28, //俯仰角
        "yaw": -44 //航向
    }
    //参数：相机位置对象，飞行时间/秒
    fdapi.camera.set(cameraPositon, 1);
    //参数：x, y, z, pitch, yaw, flyTime ：坐标位置xyz，俯仰角，航向，飞行时间
    //fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 1);
}

//摄像机：获取视角
function samples_cameraGet() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    //获取镜头位置
    fdapi.camera.get().then(result => {
        logWithColor("green", '相机位置信息：[' + result.camera + ']');
        $.toast({ content: "日志控制台已输出!", time: 2000 });
    });
}

//摄像机：旋转飞行
function samples_cameraStartFly() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
    * 以下为控制相机移动代码示例：
    * 
    **/

    //后退
    fdapi.camera.moveBackward();
    //前进
    //fdapi.camera.moveForward();
    //上升
    //fdapi.camera.moveUp();
    //下降
    //fdapi.camera.moveDown();
    //左移
    //fdapi.camera.moveLeft();
    //右移
    //fdapi.camera.moveRight();
    //左转
    //fdapi.camera.turnLeft();
    //右转
    //fdapi.camera.turnRight();
    //低头
    //fdapi.camera.turnDown();
    //抬头
    //fdapi.camera.turnUp();
}

//摄像机：停止飞行
function samples_cameraStopFly() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();


    //停止飞行
    fdapi.camera.stop();
}

//设置场景时间
function setDateTime() {
    //设置时间
    let dateNow = new Date();
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    fdapi.weather.setDateTime(year, month, day, 12, 00, false);
}

//图层操作：创建三维图层(.3dt)
var isRoad3DTCreate = false;
async function samples_addTileLayer() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    //设置场景时间
    setDateTime();

    /**
     * 以下为创建三维图层代码示例：
     * 
     **/

    //创建前先删除保证id唯一
    await fdapi.tileLayer.delete('1');
    await fdapi.tileLayer.delete('dixing');
    //创建三维图层(.3dt)
    fdapi.tileLayer.add({
        id: '1',
        fileName: HostConfig.Path + "\\media\\3dt\\地形.3dt",//3dt文件路径
        location: [0, 0, 0],//位置坐标
        rotation: [0, 50, 0],//旋转
        scale: [1, 1, 1]//缩放
    });
    //相机定位
    fdapi.tileLayer.focus('1', 3000);
    isRoad3DTCreate = true;
}

//图层操作 



//仅创建图层
async function create3dt() {
    //创建前先删除保证id唯一
    await fdapi.tileLayer.delete('1');
    await fdapi.tileLayer.delete('dixing');
    //创建三维图层(.3dt)
    fdapi.tileLayer.add({
        id: '1',
        fileName: HostConfig.Path + "\\media\\3dt\\地形.3dt",//3dt文件路径
        location: [0, 0, 0],//位置坐标
        rotation: [0, 0, 0],//旋转
        scale: [1, 1, 1]//缩放
    });
    isRoad3DTCreate = true;
    //设置场景时间
    setDateTime();
}

//初始化模型
function samples_initModel() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
     * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     * 
     **/
    //初始化
    isRoad3DTCreate = true;
    //定位视角
    fdapi.camera.set(492543.975, 2492194.178125, 19.509531, -27.995653, -44.265804, 0.2);
}


//图层操作：创建矢量图层(.shp)
function samples_addShapeFileTileLayer() {

    /**
     * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     * 
     **/

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
     * 以下为创建矢量图层代码示例：
     * 
     **/

    //创建前先删除保证id唯一
    fdapi.shapeFile.delete("sp1");
    //支持三种数据类型Polygon、Polyline、Point，当前示例为Polygon类型
    //不同数据类型对应对象属性不同，请参考API开发文档
    let shp = {
        "id": "sp1",
        "file": HostConfig.Path + '\\media\\shapefile\\polygonColor.shp', //shp文件路径
        "polygonColorFieldName": "RGB",//多边形颜色
        "polygonStyle": 0,//多边形样式 样式参考API枚举： PolygonStyle
        "polygonDefaultHeight": 200.0,//多边形高度
        "defaultColor": [0, 0, 1, 1],//多边形颜色
        "offset": [0, 0, 0],//偏移量
        "rotation": [0, 0, 0],//旋转
        "scale": [1, 1, 1]// 缩放
    };
    //创建矢量图层(.shp)
    fdapi.shapeFile.add(shp);
    //相机聚焦定位
    fdapi.shapeFile.focus(shp.id);
}

//图层操作：创建3DTiles图层(Cesium3DTileset)
function samples_add3DTilesLayer() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();


    /**
     * 以下为创建3DTiles图层代码示例：
     * 注意：仅代码示例不执行创建 ，目前3DTiles图层创建需依赖网络服务
     * 
     **/

    //创建前先删除保证id唯一
    fdapi.cesium3DTileset.delete("3DTiles");
    let o = {
        id: '3DTiles',//网络图层id
        tileURL: 'http://data.marsgis.cn/3dtiles/qx-changfang/tileset.json' //3DTiles图层对应的网络地址
    }
    //创建3DTiles图层(Cesium3DTileset)
    fdapi.cesium3DTileset.add(o);
    //相机聚焦定位
    fdapi.cesium3DTileset.focus(o.id);
}



//调用挖洞 地形基坑效果
async function samples_addHole() {


    /**
    * 实现原理及步骤：
    * 一、挂载土壤材质pak，添加地形模型，并对地形执行挖洞操作
    * 二、绘制Polygon3D对象填充挖洞区域，用自定义土壤材质填充Polygon3D对象，隐藏顶面/底面，显示侧面
    * 三、绘制Polygon3D对象填充挖洞底部区域，用自定义土壤材质填充Polygon3D对象，替换显示底面
    */

    //挂载土壤材质pak
    //添加前删除customObject 防止id重复
    fdapi.customObject.delete('soil');
    let soil = {
        id: 'soilo1',//自定义对象唯一id
        pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//pak文件路径
        assetPath: '/JC_CustomAssets/M_侧_1',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [495490, 2490108, 10],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],//旋转
        scale: [1, 1, 1],//缩放
        smoothMotion: 1,   //1: 平滑插值，0: 跳跃
    };
    await fdapi.customObject.add(soil);

    //对demo地形挖洞
    let tileLayerId = 'E637D8FE42335EE96C58A1840BCAD0CE';
    //针对地形挖洞
    let coordinatesBase = [[488471.3140625, 2490334.32359375, 2.685634765625], [488461.54031250003, 2490346.208125, 2.38373046875], [488449.61875, 2490358.8385937503, 1.9458789062500002], [488439.0934375, 2490370.86234375, 1.4875390625], [488428.185, 2490382.371875, 1.02033203125], [488418.24625, 2490392.11953125, 0.6609375000000001], [488414.375625, 2490395.8821875, 0.5487890625], [488405.52718750003, 2490384.79390625, 0.5013671875], [488391.290625, 2490370.95671875, 0.360068359375], [488377.763125, 2490359.09953125, 0.230400390625], [488360.08625, 2490345.7390625, 0.0881640625], [488337.4834375, 2490326.880625, 0], [488332.971875, 2490313.78296875, 0.00001953125], [488345.991875, 2490300.52734375, 0.025087890625], [488362.676875, 2490282.7459375, 0.10369140625], [488377.8075, 2490267.40046875, 0.19816406250000002], [488391.2946875, 2490256.54390625, 0.262060546875], [488403.285625, 2490266.48296875, 0.421025390625], [488422.3275, 2490286.1281250003, 0.761962890625], [488439.7715625, 2490304.90515625, 1.157841796875], [488455.52, 2490318.2159375, 1.691806640625]];

    //构造射线求交数据
    var startEndPointArr = [];
    for (var i = 0; i < coordinatesBase.length; i++) {
        var pointBase = coordinatesBase[i];
        var startPoint = [coordinatesBase[i][0], coordinatesBase[i][1], 1000];
        var endPoint = [coordinatesBase[i][0], coordinatesBase[i][1], -1000];
        var obj = { "start": startPoint, "end": endPoint };
        startEndPointArr.push(obj);
    }


    //利用射线求交求采集点高度
    var result = await fdapi.tools.linesIntersect(startEndPointArr, true, false);

    var coordinates = [];
    var pointArr = result.intersects;
    for (var i = 0; i < pointArr.length; i++) {
        var pointZ = pointArr[i].LineIntersectPoint;
        coordinates.push(pointZ);
    }


    for (var i = 0; i < coordinates.length; i++) {
        coordinates[i][2] = -100 + coordinates[i][2];
    }

    let holeId = "hole1";
    await fdapi.tileLayer.deleteHole(holeId, tileLayerId);
    //多个坐标构成内环 三维数组
    let data = [{ 'id': holeId, 'tileLayerId': tileLayerId, 'coordinates': coordinates, 'isReverseCut': false }];
    await fdapi.tileLayer.addHole(data);


    //添加自定义材质的polygon3d
    await fdapi.polygon3d.clear();
    let side = {
        id: 'polygon3d_side',
        coordinates: coordinates,
        color: [1, 1, 1, 1],        //颜色值
        height: 100,                //3D多边形的高度
        intensity: 1.0,             //亮度
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
        tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
        material: "/JC_CustomAssets/M_侧_1",
        scalarParameters: [{ "name": "U缩放", "value": 9 }],
        //vectorParameters: [{ "name": "color", "value": [1, 0, 0] }],
        generateTop: false,
        generateSide: true,
        generateBottom: false
    }
    await fdapi.polygon3d.add(side);

    let bottom = {
        id: 'polygon3d_bottom',
        coordinates: coordinates,
        color: [1, 1, 1, 1],        //颜色值
        height: 1,                //3D多边形的高度
        intensity: 1.0,             //亮度
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺  
        tillingY: 0,  //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
        material: "/JC_CustomAssets/M_底",
        //material: "/JC_CustomAssets/MaterialLibrary/Exhibition/建筑场地/建筑场地_11",
        scalarParameters: [{ "name": "UV", "value": 2 }],
        vectorParameters: [{ "name": "color", "value": [1, 0, 0] }],
        generateTop: true,
        generateSide: true,
        generateBottom: true
    }
    await fdapi.polygon3d.add(bottom);
    fdapi.polygon3d.focus('polygon3d_bottom', 300, 1);

}


//初始化3dt模型
function samples_init3dt() {
    //先添加包含模型的图层
    samples_addTileLayer();
    //切换相机位置
    fdapi.camera.set(202.178436, -184.742035, 11.653723, -13.025559, -150.914993, 0);
}


//模型操作：显示隐藏模型
//模型显示隐藏状态
var showActorflag = false;
function samples_showHideActor() {

    /**
     * 以下为显示隐藏模型代码示例：
     *  
     * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     **/


    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {

        //添加前清空所有customObject 防止id重复
        fdapi.customObject.clear();

        //注意：请先在场景中先点击一个TileLayer图层，再调用显示隐藏模型
        if (showActorflag) {
            showActorflag = false;
            showActor();
        } else {
            showActorflag = true;
            hideActor();
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }

}

function hideActor() {
    //判断是否选中模型
    if (checkTileLayerId()) {
        //显示模型
        fdapi.tileLayer.hideActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
    } else {
        $.toast({ content: errorMsg_1, time: 1500 });
    }
}
function showActor() {
    //判断是否选中模型
    if (checkTileLayerId()) {
        //显示模型
        fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
    } else {
        $.toast({ content: errorMsg_1, time: 1500 });
    }
}


//模型操作：高亮模型
var highLightflag = false;
function samples_highlightActor() {

    /**
     * 以下示例代码为选中模型后点击导航操作可以切换高亮效果
     * 
     * * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     **/

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //判断是否选中模型
        if (checkTileLayerId()) {
            //相机定位
            //fdapi.camera.set(202.178436, -184.742035, 11.653723, -13.025559, -150.914993, 0);

            //点击切换物体高亮
            if (highLightflag) {
                highLightflag = false;
                fdapi.tileLayer.stopHighlightActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
            } else {
                highLightflag = true;
                fdapi.tileLayer.highlightActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId)
            }
        } else {
            $.toast({ content: errorMsg_1, time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }


}


//记录替换状态
var replaceState = false;
//模型操作：替换模型
function samples_replaceActor() {

    /**
     * 以下示例代码为把当前点选的模型替换为新模型
     * 
     * * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     * 
     **/

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //判断是否选中模型
        if (checkTileLayerId()) {
            if (replaceState) {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();
                //还原显示当前选中模型
                fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                replaceState = false;
            } else {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();
                //选中模型的位置信息
                var base_location = __tileLayerCurSel.location;
                //隐藏原始模型
                fdapi.tileLayer.hideActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                //构造待替换的新模型
                let newCustomObj = {
                    id: "customObj_replace_id",
                    tileLayerId: __tileLayerCurSel.id,
                    objectId: 'Rectangle61', //可以是场景内任意图层包含模型的id  此处示例用的广告牌
                    location: base_location,
                    scale: [2, 2, 2],//放大一倍
                    rotation: [0, 90, 0],//旋转
                    smoothMotion: 0 //1: 平滑插值，0: 跳跃
                };
                //添加替换的新模型
                fdapi.customObject.addByTileLayer(newCustomObj);
                fdapi.customObject.focus("customObj_replace_id", 10);
                replaceState = true;
            }
        } else {
            $.toast({ content: errorMsg_1, time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }

}

//模型操作：移动/旋转/还原模型位置
//记录移动旋转状态
var moveState = false;
function samples_moveActor() {

    /**
     * 以下示例代码为移动/还原模型位置
     * 
     * * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     **/

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //判断是否选中模型
        if (checkTileLayerId()) {

            if (moveState) {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();
                //还原显示当前选中模型
                fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                //聚焦到当前选中模型Actor
                fdapi.tileLayer.focusActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                moveState = false;
            } else {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();

                //当前单击图层和模型id
                var layerId = __tileLayerCurSel.id || __tileLayerCurSel.ID;
                var objId = __tileLayerCurSel.ObjectID || __tileLayerCurSel.objectId;

                //获取当前点击的Actor信息
                fdapi.tileLayer.getActorInfo({
                    id: layerId,
                    objectIds: [objId]
                }).then(result => {
                    //获取点击选中的Actor的位置坐标
                    var actorLocation = result.data[0].location;
                    //获取点击选中的Actor的缩放大小
                    var actorScale = result.data[0].scale;
                    //构造新customObject对象id
                    var newActorId = objId + '_copy_' + new Date().getTime();
                    //沿着X轴方向平移100米
                    var newActorLocation = [actorLocation[0] + 100, actorLocation[1], actorLocation[2]];

                    //复制一份 实现平移旋转缩放
                    var copyActor = {
                        id: newActorId,
                        tileLayerId: layerId,
                        objectId: objId,
                        location: newActorLocation,
                        scale: actorScale,//模型缩放倍数
                        rotation: [0, 90, 0],// 沿Y轴旋转90度
                        smoothMotion: 1 //1: 平滑插值，0: 跳跃
                    };
                    //添加需要旋转平移的Actor为自定义对象
                    fdapi.customObject.addByTileLayer(copyActor);
                    //隐藏选中的Actor
                    fdapi.tileLayer.hideActor(layerId, objId);
                    //聚焦定位到新的CustomObject
                    fdapi.customObject.focus(newActorId, 30);
                });
                moveState = true;
            }
        } else {
            $.toast({ content: errorMsg_1, time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}


//模型操作：缩放/还原模型位置
//记录缩放状态
var scaleState = false;
function samples_scaleActor() {

    /**
     * 以下示例代码为缩放/还原模型位置
     * 
     * * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     **/
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //判断是否选中模型
        if (checkTileLayerId()) {

            if (scaleState) {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();
                //还原显示当前选中模型
                fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                scaleState = false;
            } else {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();

                //当前单击图层和模型id
                var layerId = __tileLayerCurSel.id || __tileLayerCurSel.ID;
                var objId = __tileLayerCurSel.ObjectID || __tileLayerCurSel.objectId;

                //获取当前点击的Actor信息
                fdapi.tileLayer.getActorInfo({
                    id: layerId,
                    objectIds: [objId]
                }).then(result => {
                    //获取点击选中的Actor的位置坐标
                    var actorLocation = result.data[0].location;
                    //获取点击选中的Actor的缩放大小
                    var actorScale = result.data[0].scale;
                    //构造新customObject对象id
                    var newActorId = objId + '_copy_' + new Date().getTime();

                    //复制一份 实现平移旋转缩放
                    var copyActor = {
                        id: newActorId,
                        tileLayerId: layerId,
                        objectId: objId,
                        location: actorLocation,
                        scale: [actorScale[0] * 5, actorScale[1] * 5, actorScale[2] * 5],//物体放大5倍
                        rotation: [0, 0, 0],// 旋转角度
                        smoothMotion: 1 //1: 平滑插值，0: 跳跃
                    };
                    //添加放大5倍的对象
                    fdapi.customObject.addByTileLayer(copyActor);
                    //隐藏选中的Actor
                    fdapi.tileLayer.hideActor(layerId, objId);
                    //聚焦定位到新的Actor
                    fdapi.customObject.focus(newActorId, 300);
                });
                scaleState = true;
            }
        } else {
            $.toast({ content: errorMsg_1, time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }

}


//模型操作：设置模型颜色
//记录模型颜色状态
var actorColorState = false;
function samples_setColorActor() {

    /**
     * 以下示例代码为设置模型颜色
     * 
     * * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     **/

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //判断是否选中模型
        if (checkTileLayerId()) {

            if (actorColorState) {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();
                //还原显示当前选中模型
                fdapi.tileLayer.showActor(__tileLayerCurSel.id, __tileLayerCurSel.objectId);
                actorColorState = false;
            } else {
                //添加前清空所有customObject 防止id重复
                fdapi.customObject.clear();

                //当前单击图层和模型id
                var layerId = __tileLayerCurSel.id || __tileLayerCurSel.ID;
                var objId = __tileLayerCurSel.ObjectID || __tileLayerCurSel.objectId;

                //获取当前点击的Actor信息
                fdapi.tileLayer.getActorInfo({
                    id: layerId,
                    objectIds: [objId]
                }).then(result => {
                    //获取点击选中的Actor的位置坐标
                    var actorLocation = result.data[0].location;
                    //获取点击选中的Actor的缩放大小
                    var actorScale = result.data[0].scale;
                    //构造新customObject对象id
                    var newActorId = objId + '_copy_' + new Date().getTime();

                    //复制一份 实现平移旋转缩放
                    var copyActor = {
                        id: newActorId,
                        tileLayerId: layerId,
                        objectId: objId,
                        location: actorLocation,
                        scale: actorScale,//物体缩放尺寸
                        rotation: [0, 0, 0],// 旋转角度
                        smoothMotion: 1 //1: 平滑插值，0: 跳跃
                    };
                    //添加复制的自定义对象
                    fdapi.customObject.addByTileLayer(copyActor);
                    //设置Actor颜色
                    fdapi.customObject.setTintColor(newActorId, Color.Red);
                    //隐藏选中的Actor
                    fdapi.tileLayer.hideActor(layerId, objId);
                    //聚焦定位到新的Actor
                    fdapi.customObject.focus(newActorId, 30);
                });
                actorColorState = true;
            }

        } else {
            $.toast({ content: errorMsg_1, time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }

}



//模型操作：复制多个路灯
async function samples_copyActors() {

    /**
     * 以下示例代码为复制10个路灯，每个之间间隔距离5米
     * 注意：执行复制前需先创建包含路灯的图层3dt
     **/

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //添加前清空所有customObject 防止id重复
        await fdapi.customObject.clear();
        //构造待复制的路灯对象

        //坐标[X,Y]各间隔5米 添加十个路灯
        let lightArr = [];
        for (let i = 0; i < 10; i++) {
            let step = (i + 1) * 5;
            let copyActor = {
                id: 'copy_' + Math.random() * 1000,
                tileLayerId: "4DECD1704AD8119E33CF658A64A70AD2",
                objectId: "SM_LuDeng385",
                location: [492544 - step, 2492227 - step, -0.6867101788520813],
                scale: [42, 42, 42], //缩放倍数
                smoothMotion: 1 //1: 平滑插值，0: 跳跃
            };
            lightArr.push(copyActor);
        }
        fdapi.customObject.addByTileLayer(lightArr);
        //相机定位到复制的路灯
        fdapi.camera.set(492541.679147, 2492182.185239, 26.61509, -38.80225, -121.769531, 1);
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }


}


//初始化人物车辆
async function samples_initWalkManAndCar() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
     * 使用注意：
     * 1、操作前请先在场景中选中模型
     * 2、注意操作提示语和左下角的日志控制台信息
     * 
     **/

    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    //投影坐标
    let co_location = [493132.125, 2492028.25, 2.1155664920806885];
    let o = {
        id: 'o1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//pak文件路径,推荐使用cloud内置的文件资源管理器并使用@path方式传入参数
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: co_location,//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],//模型旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1,   //1: 平滑插值，0: 跳跃
    };
    await fdapi.customObject.add(o);
    fdapi.customObject.focus(o.id);

    isRoad3DTCreate = true;
}


//物体运动：模型人物步行
function samples_walkman() {
    /**
    * 以下示例代码为模拟人物跑步
    * 
    * 实现原理：
    * 1、人物pak模型内置静止和步行两种类型，先添加静止人物并设置一秒后开始按路径移动
    * 2、开始移动前更换为步行人物模型
    * 3、运动结束后更换为静止人物模型
    * 
    **/
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //静止人物模型材质路径 UE工程内Actor文件路径
        var static_man_file_path = "/JC_CustomAssets/角色测试_3";

        //添加前清空所有customObject 防止id重复
        fdapi.customObject.clear();
        //投影坐标
        var man_location = [493136.5625, 2492028, 2.1155762672424316];
        let walkmanCustomObj = {
            id: 'walkman',//自定义对象唯一id
            pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//pak文件路径
            assetPath: static_man_file_path,//静止人物模型路径
            location: man_location,//位置坐标
            coordinateType: 0,// 坐标系类型 
            rotation: [0, 0, 0],//旋转
            scale: [1, 1, 1],//缩放
            smoothMotion: 1,   //1: 平滑插值，0: 跳跃
        };
        fdapi.customObject.add(walkmanCustomObj);

        //移动相机至人物运动视角
        fdapi.camera.set(493125.730078, 2492022.228105, 10.757251, -40.802235, -47.491543, 0);

        //人物一秒后开始移动
        window.setTimeout("start_walkman_walk()", 1000);
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}


//控制人物运动
function start_walkman_walk() {

    //运动人物模型 人物移动速度范围 : [0~5]   3以下步行  大于3开始跑步
    fdapi.customObject.callFunction('walkman', 'setSpeed', BPFuncParamType.Float, 2);

    //人物运动路径
    var walk_man_path_arr = [
        [493136.5625, 2492028, 2.1155762672424316],
        [493135.25, 2492028, 2.1155669689178467],
        [493133.65625, 2492026.75, 2.1155657768249512],
        [493131.71875, 2492027, 2.115565299987793],
        [493131.71875, 2492026.5, 2.115567684173584],
        [493131.65625, 2492026, 2.115565299987793],
        [493131.5, 2492025.5, 2.3132898807525635],
        [493131.53125, 2492025, 2.3132922649383545],
        [493131.53125, 2492024.5, 2.313291072845459],
        [493132.125, 2492024.5, 2.3132898807525635],
        [493132.78125, 2492024.5, 2.3132898807525635],
        [493133.40625, 2492024.5, 2.313291072845459],
        [493134.03125, 2492024.5, 2.3132898807525635],
        [493134.8125, 2492024.25, 2.313291072845459],
        [493135.53125, 2492024.25, 2.313291072845459],
        [493136.25, 2492024.25, 2.313291072845459],
        [493137.0625, 2492024, 2.3132946491241455],
        [493138.09375, 2492023.5, 2.3132922649383545],
        [493139.25, 2492023, 2.3132898807525635],
    ];

    //控制人物移动
    let walkManPointArr = [];
    let walkTime = 0;
    for (let i = 0; i < walk_man_path_arr.length; i++) {
        //构造路径参数数组 每1000毫秒移动一次
        walkTime = walkTime + 1;
        let elementPoint = { 'time': (i) * 1, 'coordinate': walk_man_path_arr[i] };
        walkManPointArr.push(elementPoint);
    }

    //设置视角跟随相机
    //fdapi.customObject.focus('walkman_walk', -1);
    //人物按轨迹移动
    fdapi.customObject.startMove('walkman', 0, walkManPointArr);
    //设置跟随相机
    //fdapi.customObject.focus('walkman',-1);

    //运动结束后切换为静止人物
    let timeOut = walkTime * 1000 + 500;
    window.setTimeout("switchStaticMan()", timeOut);
}

//当人物跑到终点时切换为静止人物
function switchStaticMan(mode) {
    //人物移动速度范围 : [0~5]  0静止 3以下步行  大于3开始跑步
    fdapi.customObject.callFunction('walkman', 'setSpeed', BPFuncParamType.Float, 0);
}



//物体运动：模型人物跑步
function samples_runman() {

    /**
    * 以下示例代码为模拟人物跑步
    * 
    * 实现原理：
    * 1、人物pak模型内置静止和跑步两种类型，先添加静止人物并设置一秒后开始按路径移动
    * 2、开始移动前更换为跑步人物模型
    * 3、运动结束后更换为静止人物模型
    * 
    **/
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //静止人物模型材质路径 UE工程内Actor文件路径
        var static_man_file_path = "/JC_CustomAssets/角色测试_3";

        //添加前清空所有customObject 防止id重复
        fdapi.customObject.clear();
        //投影坐标
        var man_location = [-451.82766723632813, -5.8147082328796387, -2.7868237495422363];
        let walkmanCustomObj = {
            id: 'walkman',//自定义对象唯一id
            pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//pak文件路径
            assetPath: static_man_file_path,//静止人物模型路径
            location: man_location,//位置坐标
            coordinateType: 0,// 坐标系类型 
            rotation: [0, 0, 0],//旋转
            scale: [1, 1, 1],//缩放
            smoothMotion: 1,   //1: 平滑插值，0: 跳跃
        };
        fdapi.customObject.add(walkmanCustomObj);

        //移动相机至人物运动视角
        fdapi.camera.set(493125.730078, 2492022.228105, 10.757251, -40.802235, -47.491543, 0);
        //人物一秒后开始移动
        window.setTimeout("start_walkman_run()", 1000);
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}

//控制人物运动
function start_walkman_run() {

    //运动人物模型 人物移动速度范围 : [0~5]   3以下步行  大于3开始跑步
    fdapi.customObject.callFunction('walkman', 'setSpeed', BPFuncParamType.Float, 4);

    //人物运动路径
    var run_man_path_arr = [
        [493136.5625, 2492028, 2.1155762672424316],
        [493138.125, 2492028.25, 2.2155671119689941],
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

    //控制人物移动
    let walkManPointArr = [];
    let walkTime = 0;
    for (let i = 0; i < run_man_path_arr.length; i++) {
        //构造路径参数数组 每500毫秒(0.5s)移动一次
        walkTime = walkTime + 0.5;
        let elementPoint = { 'time': (i) * 0.5, 'coordinate': run_man_path_arr[i] };
        walkManPointArr.push(elementPoint);
    }

    //设置视角跟随相机
    fdapi.customObject.focus('walkman', -1);
    //人物按轨迹移动
    fdapi.customObject.startMove('walkman', 0, walkManPointArr);


    //运动结束后切换为静止人物
    let timeOut = walkTime * 1000 + 500;
    window.setTimeout("switchStaticMan()", timeOut);
}


//物体运动：模拟多台车辆行驶

async function test_vehicle_sample_init() {
    //添加前先清空
    await fdapi.vehicle.clear();
    await fdapi.polyline.clear();
    await fdapi.customObject.clear();
    //添加6台车辆的初始位置和方向数组
    let vehicleArr = [
        {
            coordinate: [493132.125, 2492028.25, 2.1155664920806885],
            rotation: [0, 0, 0]
        },
        {
            coordinate: [493161.03125, 2492049.5, 2.115570068359375],
            rotation: [0, 110, 0]
        },
        {
            coordinate: [493156.5625, 2492050, 2.1155712604522705],
            rotation: [0, 110, 0]
        },
        {
            coordinate: [493151.78125, 2492002, 1.5341382026672363],
            rotation: [0, -80, 0]
        },
        {
            coordinate: [493155.1875, 2492000.25, 1.4978821277618408],
            rotation: [0, -80, 0]
        },
        {
            coordinate: [493181.25, 2492030.5, 2.1155664920806885],
            rotation: [0, 180, 0]
        }
    ];

    let vcArr = [];
    for (let i = 0; i < 6; i++) {
        //console.info(vehicleArr[i].coordinate)
        let vc = {
            "id": "vc" + (i + 1),
            "coordinateType": 0,
            "coordinate": vehicleArr[i].coordinate,
            "assetPath": "/JC_CustomAssets/VehicleLibrary/Exhibition/SUV_0" + (i + 1),//资源库车辆路径
            "rotation": vehicleArr[i].rotation,
            "autoHeight": true
        };
        vcArr.push(vc);
    }
    await fdapi.vehicle.add(vcArr);

}

//启动多台车辆
async function samples_vehicleStart() {

    //相机切换到查看6台车的视角
    //fdapi.camera.set(493139.312005, 2491985.927031, 45.899272, -50.367725, -62.943176, 0);

    //相机切换到查看观察视角
    fdapi.camera.set(493128.3875, 2492043.684229, 17.704812, -28.628811, 40.74757, 0);

    //初始化6台车辆
    await test_vehicle_sample_init();

    //添加6台车辆运动的轨迹线
    await test_vehicle_sample_add_path_line();

    //切换到第一人称视角
    //fdapi.vehicle.focus('vc2',true,6,1,[2,6,0],[5,0,0]);

    //启动6台车辆运动 从第0秒开始
    await fdapi.vehicle.start([
        {
            id: 'vc1',
            timeStamp: 0,//设置载具v1从wayPoints的第0秒开始运动
        }, {
            id: 'vc2',
            timeStamp: 0,//设置载具v2从wayPoints的第0秒开始运动
        }, {
            id: 'vc3',
            timeStamp: 0,//设置载具v3从wayPoints的第0秒开始运动
        }, {
            id: 'vc4',
            timeStamp: 0,//设置载具v4从wayPoints的第0秒开始运动
        }, {
            id: 'vc5',
            timeStamp: 0,//设置载具v5从wayPoints的第0秒开始运动
        }, {
            id: 'vc6',
            timeStamp: 0,//设置载具v6从wayPoints的第0秒开始运动
        }]);

    //先清空自行车和行人
    fdapi.customObject.clear();
    //添加行人 延迟1s
    setTimeout(test_vehicle_sample_add_walkmans, 1000);
    //添加自行车  延迟1s
    setTimeout(test_vehicle_sample_add_bicycles, 1000);
}


//绘制车辆运动路线  构造运动的轨迹点
async function test_vehicle_sample_add_path_line() {

    let vc1PathArr = [
        [493152.90625, 2492006.75, 2.2945458889007568],
        [493154.6875, 2492011.5, 2.25610408782959],
        [493156.25, 2492016.5, 2.2555663967132568],
        [493157.59375, 2492021.25, 2.255664920806885],
        [493159.0625, 2492026.25, 2.255664920806885],
        [493160.5, 2492031.25, 2.225614852905273],
        [493161.96875, 2492036.25, 2.225567169189453],
        // [493163.65625, 2492041.25, 2.235616283416748],
        // [493165.03125, 2492046.25, 2.235614852905273],
        // [493166.5, 2492051.25, 2.235567169189453],
        // [493167.78125, 2492056, 2.235664920806885],
        // [493169.34375, 2492061.5, 2.235614852905273]
    ];

    let vc2PathArr = [
        [493156.03125, 2492004.75, 1.7361377477645874],
        [493157.375, 2492009.75, 2.2218505954742432],
        [493159.1875, 2492014.5, 2.2255687808990479],
        [493161, 2492019.5, 2.2255638694763184],
        [493164.15625, 2492023.5, 2.2155688762664795],
        [493168.625, 2492025.25, 2.21555638694763184],
        [493173.71875, 2492026, 2.2255663967132568],
        [493178.9375, 2492027, 2.2255664920806885],
        [493184.15625, 2492026.25, 2.2255664920806885],
        [493189.3125, 2492026.25, 2.2255664920806885]
    ];

    let vc3PathArr = [
        [493135.46875, 2492028.5, 2.2255664920806885],
        [493140.625, 2492028.5, 2.2255663967132568],
        [493145.59375, 2492027.5, 2.2255664920806885],
        [493148.53125, 2492023.25, 2.2255664920806885],
        [493147.5, 2492018, 2.2255663967132568],
        [493146.25, 2492012.75, 2.2248460960388184],
        [493144.84375, 2492008, 1.810546636581421],
        [493143.46875, 2492003, 1.5841064500808716],
        [493142.03125, 2491998, 1.31779614686965942],
        [493140.46875, 2491993, 1.111023706316947937],
        [493138.96875, 2491988, 1.012185060977935791]
    ];

    let vc4PathArr = [
        [493155.59375, 2492046.75, 2.3355616283416748],
        [493154.90625, 2492041.75, 2.3355614852905273],
        [493153.625, 2492036.75, 2.3355614852905273],
        [493152.40625, 2492031.75, 2.2255762672424316],
        [493151.40625, 2492026.5, 2.2255567169189453],
        [493150.40625, 2492021.5, 2.2255712604522705],
        [493148.96875, 2492016.25, 2.225580940246582],
        [493147.09375, 2492011, 2.2222265481948853],
        [493145.40625, 2492006, 2.2225879001617432],
        [493143.8125, 2492001, 1.3633886575698853]
    ];

    let vc5PathArr = [
        [493160.5, 2492047, 2.1155688762664795],
        [493158.9375, 2492042.25, 2.2255687808990479],
        [493157.375, 2492037.5, 2.2255664920806885],
        [493155.84375, 2492032.5, 2.2255664920806885],
        [493154.375, 2492027.75, 2.2155664920806885],
        [493153.15625, 2492022.75, 2.2155688762664795],
        [493151.65625, 2492018, 2.2155663967132568],
        [493150.28125, 2492013, 2.2240795135498047],
        [493148.8125, 2492008.25, 1.8052587509155273],
        [493147.375, 2492003.25, 1.7305029153823853],
        [493145.78125, 2491998.5, 1.5591869831085205],
        [493144.21875, 2491993.5, 1.0000005960464478],
        [493142.28125, 2491987, 0.82343752384185791]
    ];

    let vc6PathArr = [
        [493178.90625, 2492030.25, 2.255664920806885],
        [493173.90625, 2492030.5, 2.2255687808990479],
        [493168.78125, 2492030.75, 2.2255688762664795],
        [493163.625, 2492031, 2.2255688762664795],
        [493158.5, 2492031, 2.2255664920806885],
        [493153.34375, 2492031.25, 2.2255664920806885],
        [493148.15625, 2492031.5, 2.2255664920806885],
        [493142.96875, 2492031.75, 2.2255664920806885],
        [493137.75, 2492031.75, 2.2255640125274658],
        [493132.46875, 2492032, 2.2255591011047363],
        [493127.15625, 2492032, 2.2255688762664795]
    ];

    let pathArr = [];
    pathArr.push(vc1PathArr);
    pathArr.push(vc2PathArr);
    pathArr.push(vc3PathArr);
    pathArr.push(vc4PathArr);
    pathArr.push(vc5PathArr);
    pathArr.push(vc6PathArr);

    await fdapi.polyline.clear();
    //绘制载具运动的轨迹线
    let polylineArr = [];
    for (let i = 0; i < pathArr.length; i++) {
        let polyline = {
            id: 'polyline_' + i,//折线唯一标识id
            coordinates: pathArr[i],//构成折线的坐标点数组
            coordinateType: 0,// 坐标系类型 0投影 1经纬度
            range: [1, 10000],//可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
            color: Color.Green,//折线颜色
            thickness: 1,
            intensity: 0.3,//亮度
            flowRate: 0.5,//流速
            shape: 1,//类型 0：直线， 1：曲线
            depthTest: true,//是否做深度检测 开启后会被地形高度遮挡
            style: PolylineStyle.Arrow,//折线样式 参考样式枚举：PolylineStyle
            tiling: 20 //材质贴图平铺比例
        };
        polylineArr.push(polyline);

        //构造运动的轨迹点
        let wayPoints = [];
        let vid = "";
        for (let j = 0; j < pathArr[i].length; j++) {
            vid = "vc" + (i + 1);
            let element = { "coordinate": pathArr[i][j], "gear": 3, "timeStamp": j };
            wayPoints.push(element);
        }
        let data = {
            "id": vid,
            "wayPoints": wayPoints
        }
        fdapi.vehicle.setWayPoint(data);
    }
    await fdapi.polyline.add(polylineArr);
}

//添加行人
async function test_vehicle_sample_add_walkmans() {

    //行人1起始坐标
    let walkman_1_path = [
        [493140.75, 2492034.25, 2.2155666351318359],
        [493140.59375, 2492022.25, 2.3132905960083008],
    ];
    //行人2起始坐标
    let walkman_2_path = [
        [493137.6875, 2492034.25, 2.2155661582946777],
        [493137.3125, 2492023.75, 2.3132915496826172],
    ];

    let walkman_1 = {
        id: 'walkman_1',//自定义对象唯一id
        pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/角色测试_1',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493140.75, 2492034.25, 2.2155666351318359],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 90, 0],// 世界坐标系旋转
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1   //1: 平滑移动，0: 跳跃移动
    };
    let walkman_2 = {
        id: 'walkman_2',//自定义对象唯一id
        pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/角色测试_3',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493137.6875, 2492034.25, 2.2155661582946777],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 90, 0],// 世界坐标系旋转
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1   //1: 平滑移动，0: 跳跃移动
    };
    await fdapi.customObject.add([walkman_1, walkman_2]);

    //行人路径
    var walkman_1_path_arr = getPoints(walkman_1_path[0], walkman_1_path[1], 10);
    var walkman_2_path_arr = getPoints(walkman_2_path[0], walkman_2_path[1], 10);

    //控制行人移动
    let walkman1PointArr = [];
    for (let i = 0; i < walkman_1_path_arr.length; i++) {
        //构造路径参数数组 每1s移动一次
        let elementPoint = { 'time': (i) * 1, 'coordinate': walkman_1_path_arr[i] };
        walkman1PointArr.push(elementPoint);
    }
    //人物按轨迹移动
    fdapi.customObject.startMove('walkman_1', 0, walkman1PointArr);

    let walkman2PointArr = [];
    for (let i = 0; i < walkman_2_path_arr.length; i++) {
        //构造路径参数数组 每1s移动一次
        let elementPoint = { 'time': (i) * 1, 'coordinate': walkman_2_path_arr[i] };
        walkman2PointArr.push(elementPoint);
    }
    //人物按轨迹移动
    fdapi.customObject.startMove('walkman_2', 0, walkman2PointArr);

    //人物移动速度范围 : [0~5]   3以下步行  大于3开始跑步
    fdapi.customObject.callFunction('walkman_1', 'setSpeed', BPFuncParamType.Float, 2);
    fdapi.customObject.callFunction('walkman_2', 'setSpeed', BPFuncParamType.Float, 2);

    //停止人物动画
    setTimeout(stopMove, 10000);

}

//添加自行车
async function test_vehicle_sample_add_bicycles() {

    //自行车1起始坐标
    let bicycle_1_path = [
        [493155.0625, 2492047.25, 2.2155663967132568],
        [493173.3125, 2492041.5, 2.3132905960083008],
    ];
    //自行车2起始坐标
    let bicycle_2_path = [
        [493154.09375, 2492044.25, 2.2155663967132568],
        [493174, 2492037.5, 2.3132903575897217],
    ];

    let bicycle_1 = {
        id: 'bicycle_1',//自定义对象唯一id
        pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/自行车_1',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493155.0625, 2492047.25, 2.2155663967132568],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1   //1: 平滑移动，0: 跳跃移动
    };
    let bicycle_2 = {
        id: 'bicycle_2',//自定义对象唯一id
        pakFilePath: HostConfig.Path + '/media/pak/dts.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/自行车_2',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: [493154.09375, 2492044.25, 2.2155675888061523],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [1, 1, 1],//模型缩放
        smoothMotion: 1   //1: 平滑移动，0: 跳跃移动
    };
    await fdapi.customObject.add([bicycle_1, bicycle_2]);

    //自行车运动路径
    var bicycle_1_path_arr = getPoints(bicycle_1_path[0], bicycle_1_path[1], 10);
    var bicycle_2_path_arr = getPoints(bicycle_2_path[0], bicycle_2_path[1], 10);

    //控制自行车移动
    let bicycle1PointArr = [];
    for (let i = 0; i < bicycle_1_path_arr.length; i++) {
        //构造路径参数数组 每1s移动一次
        let elementPoint = { 'time': (i) * 1, 'coordinate': bicycle_1_path_arr[i] };
        bicycle1PointArr.push(elementPoint);
    }
    //按轨迹移动
    fdapi.customObject.startMove('bicycle_1', 0, bicycle1PointArr);

    let bicycle2PointArr = [];
    for (let i = 0; i < bicycle_2_path_arr.length; i++) {
        //构造路径参数数组 每1s移动一次
        let elementPoint = { 'time': (i) * 1, 'coordinate': bicycle_2_path_arr[i] };
        bicycle2PointArr.push(elementPoint);
    }
    //按轨迹移动
    fdapi.customObject.startMove('bicycle_2', 0, bicycle2PointArr);

    //自行车移动速度范围 : [0~10] 
    fdapi.customObject.callFunction('bicycle_1', 'setSpeed', BPFuncParamType.Float, 10);
    fdapi.customObject.callFunction('bicycle_2', 'setSpeed', BPFuncParamType.Float, 10);


    //停止自行车骑行动画
    setTimeout(stopMove, 10000);
}

//自行车停止移动
function stopMove() {
    fdapi.customObject.callFunction('bicycle_1', 'setSpeed', BPFuncParamType.Float, 0);
    fdapi.customObject.callFunction('bicycle_2', 'setSpeed', BPFuncParamType.Float, 0);
    fdapi.customObject.callFunction('walkman_1', 'setSpeed', BPFuncParamType.Float, 0);
    fdapi.customObject.callFunction('walkman_2', 'setSpeed', BPFuncParamType.Float, 0);
}

//两点之间间隔取size个点
function getPoints(p1, p2, size) {
    let p3 = p1;
    p2[0] = p2[0] - p1[0];
    p2[1] = p2[1] - p1[1];
    p1 = [0, 0, 0]
    let coors = [];
    for (let i = 0; i < size; i++) {
        coors.push([
            p1[0] + (p2[0] - p1[0]) * i / size,
            p1[1] + (p2[1] - p1[1]) * i / size,
            2.2155687808990479
        ])
    }
    for (let i = 0; i < coors.length; i++) {
        coors[i][0] += p3[0];
        coors[i][1] += p3[1];
    }
    return coors;
}


//物体运动：模拟车辆行驶
function samples_vehicleDriving() {

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
    //设置跟随相机
    fdapi.customObject.focus('o1', -1);
    //车辆按GPS轨迹移动
    fdapi.customObject.startMove('o1', 0, pathPointArr);


}

//空间分析：视线通视分析 
async function samples_visibilityAnalysisLine() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
     * 以下示例代码为视线通视分析 
     * 视线通视分析：判断任意两点之间是否可以互相可见
     * 
     * 使用注意：
     * 1、射线检测到的物体必须开启碰撞 
     * 2、被分析的物体需要在相机视野内 
     * 
     * 分析结果：
     * 1、两点没有遮挡则线段显示为绿色
     * 2、两点之间有遮挡则线段显示为红色
     * 
     **/

    //清除指示线
    fdapi.polyline.clear();
    //建筑物前的起始点
    var startPoint = [492516.65625, 2491817.5, 3];

    //建筑物后的目标点
    var endPoint = [492570.25, 2492002.25, 10];
    //建筑物前的目标点 
    //var endPoint =  [ 492469.03125, 2491826.25, -0.68669921159744263 ];

    //指示线： 变红则说明有物体遮挡 变绿色则说明无物体遮挡
    let o = {
        id: 'p1',//折线唯一标识id
        coordinates: [startPoint, endPoint],//构成折线的坐标点数组
        color: Color.Red,//折线颜色
        style: PolylineStyle.Normal,//折线样式 参考样式枚举：PolylineStyle
        thickness: 1,//折线宽度
        intensity: 0.5,//亮度
        flowRate: 0.5,//流速
        tiling: 0,//材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false//是否做深度检测
    };

    //线段求交 如果线段上有多个对象则返回距离折线起点位置最近的对象信息，如果折线上没有对象则返回ResourceNotFound
    fdapi.tools.lineIntersect(startPoint, endPoint).then(async result => {
        let resultMessage = result.resultMessage;
        if ('OK' === resultMessage) {
            logWithColor('red', '两点之间有建筑物遮挡！');
            $.toast({ content: '两点之间有建筑物遮挡！', time: 1500 });
            o.color = Color.Red;
        } else {
            logWithColor('green', '两点之间无建筑物遮挡！');
            $.toast({ content: '两点之间无建筑物遮挡！', time: 1500 });
            o.color = Color.Green;
        }
        //添加连接指示线
        fdapi.polyline.add(o);
        //设置相机位置
        await fdapi.camera.set(492626.247188, 2491810.845312, 301.908633, -79.916138, -162.971527, 1);
    });

}


//空间计算：计算模型中心点
function samples_calcActorPivot() {

    //清除前置操作 仅Sample演示所需 复制代码时可以忽略此行
    samples_reset();

    /**
     * 以下示例代码为计算选中模型的中心点（Pivot）：
     * 
     * 操作步骤：
     * 1、先在场景中点击选中一个模型
     * 2、点击导航【模型中心点计算】，会从模型中心位置弹出一个Marker标签
     * 3、点击标签文字打开弹窗显示模型的详细信息
     * 
     **/

    //判断是否选中模型
    if (checkTileLayerId()) {

        //添加Marker前先清空
        fdapi.marker.clear();

        //获取当前点击的Actor信息
        fdapi.tileLayer.getActorInfo({
            id: __tileLayerCurSel.id,
            objectIds: [__tileLayerCurSel.objectId]
        }).then(result => {
            //模型位置坐标
            var location = result.data[0].location;
            //bbox包围盒min
            var bboxMinArr = result.data[0].boundsMin;
            //bbox包围盒max
            var bboxMaxArr = result.data[0].boundsMax;

            //计算模型中心点 从bbox包围盒取平均值
            var locationCenterX = (bboxMinArr[0] + bboxMaxArr[0]) / 2;
            var locationCenterY = (bboxMinArr[1] + bboxMaxArr[1]) / 2;
            var locationCenterZ = (bboxMinArr[2] + bboxMaxArr[2]) / 2;

            //Actor模型的中心点
            var actorPivot = [locationCenterX, locationCenterY, locationCenterZ];

            var actorPivotStr = locationCenterX + "," + locationCenterY + "," + locationCenterZ;

            //url传参
            var urlParmas = '?tileLayerId=' + __tileLayerCurSel.id + '&actorId=' + __tileLayerCurSel.objectId + '&actorPivot=' + actorPivotStr;

            //支持地理坐标和投影坐标两种类型
            let o = {
                id: 'actorPivot',
                coordinate: actorPivot,//坐标位置
                coordinateType: 0,//默认0是投影坐标系，也可以设置为1，即地理坐标系(经纬度)
                anchors: [0, 32],//锚点
                range: [0.01, 10000],//可视范围
                imagePath: HostConfig.Path + '/locale/zh/images/ctag.png',//显示图片路径
                hoverImagePath: HostConfig.Path + '/locale/zh/images/panorama.png',// 鼠标悬停时显示的图片路径
                imageSize: [28, 28],//图片的尺寸
                fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

                text: '模型中心点',//显示的文字
                useTextAnimation: false,//打开文字展开动画效果
                textRange: [0.01, 10000],//文本可视范围[近裁距离, 远裁距离]
                textOffset: [0, 0],// 文本偏移
                textBackgroundColor: Color.White,//文本背景颜色
                fontSize: 16,//字体大小
                fontOutlineSize: 1,//字体轮廓线大小
                fontColor: Color.Black,//字体颜色
                fontOutlineColor: Color.Green,//字体轮廓线颜色
                //构造弹窗url
                popupURL: "http://" + HostConfig.Player + '/locale/zh/popup_pivot.html' + urlParmas,//包含模型详细信息的弹窗HTML链接
                popupBackgroundColor: [1.0, 1.0, 1.0, 0.8],//弹窗背景颜色
                popupSize: [400, 200],//弹窗大小
                popupOffset: [0, 100],//弹窗偏移

                showLine: true,//标注点下方是否显示垂直牵引线
                lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
                lineColor: Color.SpringGreen,//垂直牵引线颜色
                lineOffset: [0, 0],//垂直牵引线偏移

                autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
                autoHeight: false,// 自动判断下方是否有物体
                displayMode: 2,//显示模式 
                priority: 0,//避让优先级
                occlusionCull: false//是否参与遮挡剔除
            };
            console.info(o.popupURL)
            fdapi.marker.add(o);
            fdapi.marker.focus(o.id, 300, 0);
        });
    } else {
        //消息提醒
        $.toast({ content: errorMsg_1, time: 1500 });
    }

}


//空间计算：绘制圆形区域
function samples_drawCircle() {
    //1、绘制圆形
    //圆心坐标
    var centerPoint = [489679.40625, 2492437.75, 0.00015624999650754035];
    //半径
    var r = 500; //单位：米
    //待计算圆上的点 注意：半径越大需要计算的点数量越多 本示例使用360个点
    var pointArr = [];
    for (var i = 0; i < 360; i++) {
        //角度转弧度
        var radians = i * Math.PI / 180;
        //计算圆上的点X坐标
        var x1 = centerPoint[0] + r * Math.cos(radians);
        //计算圆上的点Y坐标
        var y1 = centerPoint[1] + r * Math.sin(radians);
        //赋值圆上所有点数组
        pointArr.push([x1, y1]);
    }
    //添加前清空
    fdapi.polygon.clear();
    let o1 = {
        id: 'polygon1',
        coordinates: pointArr,
        range: [1, 10000],//多边形的可视范围
        color: [1, 1, 1, 1],//多边形的填充颜色
        frameColor: Color.Green,//边框颜色
        frameThickness: 20,//边框厚度
        intensity: 1, //亮度
        style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
        depthTest: false //是否做深度检测 设置为true会被地形遮挡
    };
    fdapi.polygon.add(o1);

    //2、绘制圆环 透明填充
    //圆心坐标
    var centerPoint2 = [491208.28125, 2492282.5, 7];
    //半径
    var r2 = 500; //单位：米
    //待计算圆上的点 注意：半径越大需要计算的点数量越多 本示例使用360个点
    var pointArr2 = [];
    for (var i = 0; i < 360; i++) {
        //角度转弧度
        var radians = i * Math.PI / 180;
        //计算圆上的点X坐标
        var x1 = centerPoint2[0] + r2 * Math.cos(radians);
        //计算圆上的点Y坐标
        var y1 = centerPoint2[1] + r2 * Math.sin(radians);
        //赋值圆上所有点数组
        pointArr2.push([x1, y1]);
    }
    let o2 = {
        id: 'polygon2',
        coordinates: pointArr2,
        range: [1, 10000],//多边形的可视范围
        color: [1, 1, 1, 0.01],//多边形的透明填充 设置透明0则是圆环
        frameColor: Color.Red,//边框颜色
        frameThickness: 20,//边框厚度
        intensity: 2, //亮度
        style: PolygonStyle.SingleColor,//单色 请参照API开发文档选取枚举
        depthTest: false //是否做深度检测 设置为true会被地形遮挡
    };
    fdapi.polygon.add(o2);
    fdapi.polygon.focus('polygon2', 3000);

}

//绘制三维热力图
async function samples_heatmap3d() {
    //添加前删除已存在图层
    fdapi.tileLayer.delete('layerheatmap3d');
    await fdapi.tileLayer.add({
        id: 'layerheatmap3d',
        fileName: HostConfig.Path + "\\media\\3dt\\roadDemo.3dt",//3dt文件路径
        location: [0, 0, 0],//坐标位置
        rotation: [0, 0, 0],//旋转角度
        scale: [1, 1, 1]    //缩放大小
    });
    //开启黑暗模式 
    await fdapi.weather.setDarkMode(true);
    //开始X光特效
    await fdapi.tileLayer.setStyle('layerheatmap3d', 1, [0.12, 0.2, 0.6, 0.03]);
    //添加热力图前先删除
    await fdapi.heatmap3d.delete('heatmap3d');
    //构造16张热力图片
    let imagePathArr = [];
    for (let i = 0; i < 16; i++) {
        let imageName = "LAY" + i + ".png";
        let imagePath = HostConfig.Path + "/media/heatmap3d/" + imageName;
        imagePathArr.push(imagePath);
    }
    let heatmap3d = {
        id: "heatmap3d", //对象唯一id
        imagesArray: imagePathArr,//16张1024*1024的空间热力图图片的路径，空间位置从低到高
        volumeBoxLocation: [7.305457592010498, -8.479374885559082, -0.5], //三维热力图坐标位置（需要根据模型中心点调整）
        volumeBoxRotation: [0, 0, 0], //三维热力图坐标旋转
        volumeBoxSize: [40, 40, 26], //三维热力图盒范围 （根据bbox [max-min] 计算得出长宽高后再进行调整）
        displayMode: 0 //显示模式体积雾
    };
    await fdapi.heatmap3d.add(heatmap3d);
    //设置合适观察视角
    fdapi.camera.set(18.841563, -74.7675, 68.095972, -38.863625, -108.921654, 0);
}

//定义楼宇拆解对象 对象详细实现见\SDK\JS\samples\scripts\sample.js
var dismantleBuildingObj = null;
//记录初始化状态
var readyState = false;
//添加的自定义对象数组
var customObjectDataArr = [];
//添加的自定义对象ID数组
var customObjectIdArr = [];

/** 楼宇拆解初始化 */
function samples_floorInit() {

    //还原数据
    samples_floorReset();

    //创建包含待拆解楼宇的三维图层
    create3dt();

    //初始化楼层数据
    window.setTimeout("initFloors()", 2000);
}

//初始化楼层
async function initFloors() {

    /** 
    * 楼宇拆解实现原理：
    * 
    * 1、将acp场景中包含的建筑物楼层Actor复制为CustomObject对象
    * 2、使用CustomObject对象的setLocation()方法修改楼层位置
    * 3、启用定时器来不断动态修改CustomObject的位置，从而形成拆解楼宇的动画效果
    *
    * 使用准备：
    * 1、需准备建筑物各个楼层的3dt文件并导入acp工程
    * 2、建筑物各楼层导入acp的初始场景坐标为[0,0,0]，如初始坐标非[0,0,0]请设置defaultLocation参数
    * 3、楼宇拆解对象(DismantleBuilding)的封装详情见\SDK\JS\samples\scripts\sample.js
    *
    * 方法调用：
    * 1、升起楼层：dismantleBuildingObj.moveUp()
    * 2、下降楼层：dismantleBuildingObj.moveDown()
    * 3、抽出楼层：dismantleBuildingObj.levelShift({ val: 1, status: true })
    * 4、推入楼层：dismantleBuildingObj.levelShift({ val: 1, status: false})
    *
    **/

    //切换相机视角
    fdapi.camera.set(492775.169453, 2491890.07918, 112.044883, -36.306591, -87.154411, 0);

    //待拆解的楼层模型信息数组
    let floorInfoArr = [
        {
            Id: "4DECD1704AD8119E33CF658A64A70AD2",//图层树上的图层Id或添加的三维图层的id
            ObjectID: "zhihuizhongxin_lang_11",//模型对象ActorId
            PropertyName: "1层",//模型描述
        },
        {
            Id: "4DECD1704AD8119E33CF658A64A70AD2",
            ObjectID: "zhihuizhongxin_lang_13",
            PropertyName: "2层",
        },
        {
            Id: "4DECD1704AD8119E33CF658A64A70AD2",
            ObjectID: "zhihuizhongxin_lang_15",
            PropertyName: "3层",
        },
        {
            Id: "4DECD1704AD8119E33CF658A64A70AD2",
            ObjectID: "zhihuizhongxin_lang_17",
            PropertyName: "楼顶",
        },
    ];

    //实例化楼宇拆解对象，对象详细实现参见\SDK\JS\samples\scripts\sample.js
    dismantleBuildingObj = new DismantleBuilding({
        id: "dismantleBuildingInstance_",   //必选 楼宇拆解对象实例id
        floorInfoArr: floorInfoArr,         //必选 待拆解的楼层模型信息数组
        heightFromGround: 10,             //可选 建筑物整体离地高度  单位：米
        defaultFloorHeight: 0,              //可选 楼层每层的高度      单位：米
        defaultLocation: [492821.125, 2492015.5, 3],         //可选 建筑物位置坐标      单位：[X,Y,Z] 注意坐标系

        //单个楼层垂直方向共移动10米，且每次移动0.3米耗时30毫秒
        verticalMoveDistance: 10,      //可选 单个楼层垂直移动总距离    单位：米
        verticalMoveOnceCostTime: 30,  //可选 单个楼层每次垂直移动耗时  单位：毫秒
        verticalMoveOnceDistance: 0.3, //可选 单个楼层每次垂直移动距离  单位：米 

        //单个楼层水平方向共移动40米，且每次移动0.5米耗时20毫秒
        levelMoveDistance: 40,        //可选 单个楼层水平移动总距离    单位：米
        levelMoveOnceCostTime: 20,    //可选 单个楼层每次水平移动耗时  单位：毫秒
        levelMoveOnceDistance: 0.5,   //可选 单个楼层每次水平移动距离  单位：米 
    });

    if (readyState) {
        logWithColor('red', '楼层信息已经初始化！');
        $.toast({ content: '楼层信息初始化成功！', time: 1000 });
    } else {
        //清空自定义对象
        await fdapi.customObject.clear();
        let treeIdArr = [];
        floorInfoArr.forEach((item, index) => {
            treeIdArr.push(item.Id);
        });
        //显示图层树上被隐藏的模型
        await fdapi.infoTree.show(treeIdArr);
        //初始化待拆解楼层对象
        customObjectDataArr = await dismantleBuildingObj.addCustomObjects();
        customObjectIdArr = dismantleBuildingObj.customObjectIds;
        readyState = true;
    }
}

//楼层升起
async function samples_floorMoveUp() {
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        if (readyState) {
            //重新赋值
            dismantleBuildingObj.cObjectDatas = customObjectDataArr;
            dismantleBuildingObj.customObjectIds = customObjectIdArr;
            dismantleBuildingObj.IsOnReady = readyState;
            //楼层下降 伸缩杆动画
            dismantleBuildingObj.moveUp();
        } else {
            logWithColor('red', '请先执行初始化楼层！');
            $.toast({ content: '请先执行初始化楼层！', time: 1000 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}

//楼层下降
async function samples_floorMoveDown() {
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        if (readyState) {
            //重新赋值
            dismantleBuildingObj.cObjectDatas = customObjectDataArr;
            dismantleBuildingObj.customObjectIds = customObjectIdArr;
            dismantleBuildingObj.IsOnReady = readyState;
            //楼层下降 伸缩杆动画
            dismantleBuildingObj.moveDown();
        } else {
            logWithColor('red', '请先执行初始化楼层！');
            $.toast({ content: '请先执行初始化楼层！', time: 1500 });
        }

    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}

//楼层水平抽出
async function samples_floorMovePull() {
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        if (readyState) {
            var floorIndex = 1;//待拆解的楼层模型信息数组索引
            var floorState = true;//楼层状态：true 抽出状态 false 正常状态
            dismantleBuildingObj.levelShift({ val: floorIndex, status: floorState });
        } else {
            logWithColor('red', '请先执行初始化楼层！');
            $.toast({ content: '请先执行初始化楼层！', time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }

}

//楼层水平推入
async function samples_floorMovePush() {
    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        if (readyState) {
            var floorIndex = 1;//待拆解的楼层模型信息数组索引
            var floorState = false;//楼层状态：true 抽出状态 false 正常状态
            dismantleBuildingObj.levelShift({ val: floorIndex, status: floorState });
        } else {
            logWithColor('red', '请先执行初始化楼层！');
            $.toast({ content: '请先执行初始化楼层！', time: 1500 });
        }
    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}

//还原楼层
async function samples_floorReset() {
    //还原建筑物初始状态
    dismantleBuildingObj = null;
    readyState = false;
    window.fdapi.customObject.clear();
    window.fdapi.tileLayer.showAllActors("4DECD1704AD8119E33CF658A64A70AD2");
}

//蓝图函数
function samples_callBluePointFunction() {

    /**
     * 蓝图函数说明：UE4引擎自带的一种图形化程序开发界面，旨在降低开发人员门槛。蓝图的本质类似于宏程序脚本，包含有输入输出参数和自定的参数数据类型。
     * 
     * 以下示例代码为调用蓝图函数操作场景内模型
     */

    //是否已经创建示例所需3dt
    if (isRoad3DTCreate) {
        //注意：调用前请先确认被调用的蓝图函数已存在，并和设计蓝图函数的开发人员沟通确认相关参数取值后再调用
        let paramObj = {
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
        };
        //移动相机镜头到动画场景范围内
        fdapi.camera.set(492411.977813, 2491993.023516, 102.233096, -33.122059, 118.372009, 1);
        //调用蓝图函数
        fdapi.misc.callBPFunction(paramObj);

    } else {
        logWithColor('red', '三维图层未创建，请到图层操作导航下创建示例所需的三维图层！');
        $.toast({ content: errorMsg_2, time: 3000 });
    }
}

//静态水流场
var flowField_static = null;
function samples_waterFlowField_static() {

    /**
     * 静态水流场示例说明：添加单个时间点水流的坐标流速流速信息并展示
     * 
     * 以下为静态水流场的示例代码
     */
    //添加前先清空
    fdapi.waterFlowField.clear();
    //流场内的采集点信息
    let pointsArr = _waterFlowFieldPointArr;
    //流速流向数据的数组
    let uvsArr = _waterFlowFieldUVSArr;

    let flowField1 = {
        "id": "flowField1",//对象id
        "groupId": "flowFieldGroup1",//可选 分组id
        "userData": "myFlowFieldData",//可选 用户数据
        "coordinateType": 0,//坐标系类型 0为投影坐标系
        "displayMode": WaterFlowFieldStyle.HeapMap,//材质类型 0为热力值材质，1为水流材质
        "validUVRange": [0, 3],//用于显示热力颜色的水流速度范围
        "uvRangeMapping": [2, 3],//用于增强渲染效果而映射到的新的水流速度范围
        "particleScale": 0.2,//水流粒子大小
        //"indices": [2, 0, 3, 0, 2, 1],//顶点索引数组 可以为空，若不传则使用系统默认计算的顶点索引
        "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，传入默认值0时则自动计算最大长度
        "points": pointsArr, //坐标数组
        "uvs": uvsArr // uv流速流向数组
    };
    fdapi.waterFlowField.add(flowField1);
    fdapi.waterFlowField.focus('flowField1', 1000);
}


//动态绘制水流场三角网格
var flowField = null;
var waterFlowFieldInterval = null;

function samples_waterFlowField() {

    /**
     * 动态水流场三角网格示例说明：每隔500毫秒更新一次水流场的坐标和流速流向数据，从而模拟真实场景下的水文信息
     * 
     * 以下为动态流场的示例代码
     */

    //重置时间线
    $(".progressTime-right-now").click();
    //触发时间线播放点击事件
    $(".progressTime-left-b-start").click();
    //创建流场并启动定时器更新坐标和UV信息
    //添加前先清空
    fdapi.waterFlowField.clear();

    let pointsArr = [];
    let uvsArr = [];

    //th_lake_base_xy 默认zone40坐标系
    //th_lake_base_xy_without_zone40 去掉zone40的转换后坐标
    th_lake_base_xy = th_lake_base_xy_without_zone40;

    //流速流向按15分钟一次采集的UV数据 示例内共49组数据
    let pointZItems = th_lake_timeline_z.data.items;
    for (let i = 0; i < pointZItems.length; i++) {
        //构造points数组
        let pointZ = pointZItems[i].pointZ.z;
        for (let j = 0; j < th_lake_base_xy.length; j++) {
            th_lake_base_xy[j][2] = pointZ[j];
        }
        pointsArr.push(th_lake_base_xy);

        //构造uvs数组
        let pointUV = pointZItems[i].pointZ.uv;
        let uvArr = [];
        for (let k = 0; k < pointUV.length; k++) {
            let u = 500 * pointUV[k].u;
            let v = 500 * pointUV[k].v;
            let uv = [u, v];
            uvArr.push(uv);
        }
        uvsArr.push(uvArr);
    }

    //流场对象
    flowField = {
        "id": "waterflowFieldTimePeriod",//对象id
        "groupId": "flowFieldGroupTimePeriod",//可选 分组id
        "userData": "myFlowFieldData",//可选 用户数据
        "coordinateType": 0,//坐标系类型 0为投影坐标系
        "displayMode": WaterFlowFieldStyle.HeapMap,//材质类型 0为热力值材质，1为水流材质
        //"displayMode": WaterFlowFieldStyle.Water,//材质类型 0为热力值材质，1为水流材质
        "validUVRange": [0.01, 10],//水流速度叠加后显示的颜色热力值范围
        "particleScale": 2,//水流粒子大小
        //"indices": [2, 0, 3, 0, 2, 1],//顶点索引数组 可以为空，若不传则使用系统默认计算的顶点索引
        "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，如果设置为0则自动计算最大边长
        "points": pointsArr[0],
        "uvs": uvsArr[0]
    };

    fdapi.waterFlowField.add(flowField);
    fdapi.waterFlowField.focus(flowField.id, 2000);

    //启动定时器500毫秒更新一次流场对象的points和uvs值
    let index = 0;
    waterFlowFieldInterval = setInterval(async () => {
        index++;
        if (index > pointZItems.length) {
            clearInterval(waterFlowFieldInterval);
        } else {
            let pointsTimePeriod = pointsArr[index];
            let uvsTimePeriod = uvsArr[index];
            flowField.points = pointsTimePeriod;
            flowField.uvs = uvsTimePeriod;
            fdapi.waterFlowField.update(flowField);
        }
    }, 500);
}

function th_waterFlowField() {

    //添加前先清空
    fdapi.waterFlowField.clear();

    let pointsArr = [];
    let uvsArr = [];

    //th_lake_base_xy 默认zone40坐标系
    //th_lake_base_xy_without_zone40 去掉zone40的转换后坐标
    th_lake_base_xy = th_lake_base_xy_without_zone40;

    //流速流向按15分钟一次采集的UV数据 示例内共49组数据
    let pointZItems = th_lake_timeline_z.data.items;
    for (let i = 0; i < pointZItems.length; i++) {
        //构造points数组
        let pointZ = pointZItems[i].pointZ.z;
        for (let j = 0; j < th_lake_base_xy.length; j++) {
            th_lake_base_xy[j][2] = pointZ[j];
        }
        pointsArr.push(th_lake_base_xy);

        //构造uvs数组
        let pointUV = pointZItems[i].pointZ.uv;
        let uvArr = [];
        for (let k = 0; k < pointUV.length; k++) {
            let u = 500 * pointUV[k].u;
            let v = 500 * pointUV[k].v;
            let uv = [u, v];
            uvArr.push(uv);
        }
        uvsArr.push(uvArr);
    }

    //流场对象
    flowField = {
        "id": "waterflowFieldTimePeriod",//对象id
        "groupId": "flowFieldGroupTimePeriod",//可选 分组id
        "userData": "myFlowFieldData",//可选 用户数据
        "coordinateType": 0,//坐标系类型 0为投影坐标系
        "displayMode": WaterFlowFieldStyle.HeapMap,//材质类型 0为热力值材质，1为水流材质
        //"displayMode": WaterFlowFieldStyle.Water,//材质类型 0为热力值材质，1为水流材质
        "validUVRange": [0.01, 10],//水流速度叠加后显示的颜色热力值范围
        "particleScale": 2,//水流粒子大小
        //"indices": [2, 0, 3, 0, 2, 1],//顶点索引数组 可以为空，若不传则使用系统默认计算的顶点索引
        "maxEdgeLength": 0,//三角网格边的最大长度，用于控制流场内各三角形边的最大长度，如果设置为0则自动计算最大边长
        "points": pointsArr[0],
        "uvs": uvsArr[0]
    };

    fdapi.waterFlowField.add(flowField);
    fdapi.waterFlowField.focus(flowField.id, 20000);

    //启动定时器500毫秒更新一次流场对象的points和uvs值
    let index = 0;
    waterFlowFieldInterval = setInterval(async () => {
        index++;
        if (index > pointZItems.length) {
            clearInterval(waterFlowFieldInterval);
        } else {
            let pointsTimePeriod = pointsArr[index];
            let uvsTimePeriod = uvsArr[index];
            flowField.points = pointsTimePeriod;
            flowField.uvs = uvsTimePeriod;
            fdapi.waterFlowField.update(flowField);
        }
    }, 500);
}

//切换水流场材质
var waterDisplayModeFlag = false;
function samples_waterFlowFieldChange() {
    if (null != flowField) {
        //切换水流材质 动态流场
        if (waterDisplayModeFlag) {
            flowField.displayMode = 0;
            fdapi.waterFlowField.update(flowField);
            waterDisplayModeFlag = false;
        } else {
            flowField.displayMode = 1;
            flowField.waterColor = [0.4, 0.5, 0.4, 1];
            fdapi.waterFlowField.update(flowField);
            waterDisplayModeFlag = true;
        }
    } else {
        logWithColor('red', '水流场对象waterFlowField未创建，请先创建水流场对象waterFlowField！');
        $.toast({ content: '水流场对象waterFlowField未创建，请先创建水流场对象waterFlowField！', time: 1500 });
    }

}

//场景标注

//简单标注
async function samples_simpleMarker() {
    //清空标注
    fdapi.marker.clear();
    $("#popDiv").hide();
    let o = {
        id: 'm1',
        coordinate: [492564.3125, 2492234.5, 0],//坐标位置
        coordinateType: 0,//支持经纬度坐标和普通投影坐标两种类型，默认0是投影坐标系，也可以设置为空间坐标系值为1 
        anchors: [0, 36],//锚点 控制标注整体的偏移
        range: [1, 10000],//可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_1.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_11.png',// 鼠标悬停时显示的图片路径
        imageSize: [213, 56],//图片的尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '小别墅',//显示的文字
        useTextAnimation: false,//打开文字展开动画效果
        textRange: [1, 10000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [-160, -5],// 文本偏移
        textBackgroundColor: [1, 1, 1, 0],//文本背景颜色
        fontSize: 18,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: Color.Green,//字体颜色
        fontOutlineColor: Color.White,//字体轮廓线颜色

        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 100],//垂直牵引线宽度和高度[width, height]
        lineColor: "#3AFB8C",//垂直牵引线颜色
        lineOffset: [10, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHeight: true,// 自动判断下方是否有物体
        displayMode: 2,//显示模式 
        priority: 0,//避让优先级
        occlusionCull: false//是否参与遮挡剔除
    };
    await fdapi.marker.add(o);

    //自定义背景图片来显示模拟垂直牵引线Marker
    o.id = 'm2';
    o.text = "小别墅\r阔景阳台";
    o.textOffset = [-250, -50],// 文本偏移
        o.coordinate = [492577.78125, 2492221, 0];
    o.imagePath = HostConfig.Path + '/locale/zh/images/marker/marker_bg_3.png',//显示图片路径
        o.hoverImagePath = HostConfig.Path + '/locale/zh/images/marker/marker_bg_3.png',// 鼠标悬停时显示的图片路径
        o.anchors = [0, 158],//锚点 控制标注整体的偏移 Y值保持和图片高度一致
        o.imageSize = [465, 158],//设置图片尺寸 注意图片设置的高度就是锚点Y偏移量158
        o.showLine = false;//隐藏垂直牵引线
    await fdapi.marker.add(o);

    fdapi.marker.focus('m1', 30, 1);

}

//带弹窗的标注
function samples_popMarker() {
    //清空标注
    fdapi.marker.clear();
    $("#popDiv").hide();
    //构造带弹窗的标注
    let o = {
        id: 'm1',
        coordinate: [492589.03125, 2492229, 10.000454902648926],//坐标位置
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 80],//锚点  控制标注整体的偏移
        range: [1, 10000],//可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_11.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_11.png',// 鼠标悬停时显示的图片路径
        imageSize: [213, 56],//图片的尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '弹窗标注',//显示的文字
        useTextAnimation: true,//打开文字展开动画效果
        textRange: [1, 10000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [-160, -1],// 文本偏移
        textBackgroundColor: [0, 0, 0, 0],//文本背景颜色
        fontSize: 20,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        fontColor: [0.2274509803921569, 0.8156862745098039, 0.9843137254901961, 1],//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色

        popupURL: HostConfig.Path + '/locale/zh/popup_simple.html',//弹窗HTML链接
        popupBackgroundColor: [1.0, 1.0, 1.0, 0.6],//弹窗背景颜色
        popupSize: [600, 580],//弹窗大小
        popupOffset: [0, 0],//弹窗偏移

        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 80],//垂直牵引线宽度和高度[width, height]
        lineColor: [0.2274509803921569, 0.8156862745098039, 0.9843137254901961, 1],//垂直牵引线颜色
        lineOffset: [0, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHeight: false,// 自动判断下方是否有物体
        displayMode: 2,//显示模式 
        priority: 0,//避让优先级
        occlusionCull: false//是否参与遮挡剔除
    };
    fdapi.marker.add(o);
    //自动触发并打开弹窗
    //fdapi.marker.showPopupWindow(o.id);
    fdapi.marker.focus('m1', 50, 1);
}


//带div弹出层的标注
function samples_divMarker() {

    //清空标注
    fdapi.marker.clear();
    $("#popDiv").hide();
    var markerLocation = [492576.125, 2492218.75, 6.2899975776672363];
    //构造带弹层的标注
    let o = {
        id: 'div_marker',
        coordinate: markerLocation,//坐标位置
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 0],//锚点  控制标注整体的偏移
        range: [1, 10000],//可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_hover.png',// 鼠标悬停时显示的图片路径
        imageSize: [48, 55],//图片的尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '弹层标注',//显示的文字
        useTextAnimation: false,//打开文字展开动画效果
        textRange: [1, 10000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: [1, 1, 1, 1],//文本背景颜色
        fontSize: 20,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        //RGB(70,248,143)
        fontColor: [0.2274509803921569, 0.8156862745098039, 0.5607843137254902, 1],//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色
        showLine: true,//标注点下方是否显示垂直牵引线
        lineSize: [2, 80],//垂直牵引线宽度和高度[width, height]
        lineColor: [0.2274509803921569, 0.8156862745098039, 0.5607843137254902, 1],//垂直牵引线颜色
        lineOffset: [22, 0],//垂直牵引线偏移

        autoHidePopupWindow: true,//失去焦点后是否自动关闭弹出窗口
        autoHeight: false,// 自动判断下方是否有物体
        displayMode: 2,//显示模式 
        priority: 0,//避让优先级
        occlusionCull: false//是否参与遮挡剔除
    };
    fdapi.marker.add(o);
    fdapi.marker.focus('div_marker', 2000, 1);
}


//带弹窗的视频播放的标注
function samples_videoMarker() {
    //清空标注
    fdapi.marker.clear();
    var markerLocation = [492576, 2492218.5, 6.2899994850158691];
    //构造带弹层的标注
    let o = {
        id: 'video_marker',
        coordinate: markerLocation,//坐标位置
        coordinateType: 0,//默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        anchors: [0, 0],//锚点  控制标注整体的偏移
        range: [1, 10000],//可视范围
        imagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg.png',//显示图片路径
        hoverImagePath: HostConfig.Path + '/locale/zh/images/marker/marker_bg_hover.png',// 鼠标悬停时显示的图片路径
        imageSize: [48, 55],//图片的尺寸
        fixedSize: true,//图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false 

        text: '视频弹窗标注',//显示的文字
        useTextAnimation: false,//打开文字展开动画效果
        textRange: [1, 10000],//文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0],// 文本偏移
        textBackgroundColor: [1, 1, 1, 1],//文本背景颜色
        fontSize: 20,//字体大小
        fontOutlineSize: 1,//字体轮廓线大小
        //RGB(70,248,143)
        fontColor: [0.2274509803921569, 0.8156862745098039, 0.5607843137254902, 1],//字体颜色
        fontOutlineColor: Color.Black,//字体轮廓线颜色
        showLine: false,//标注点下方是否显示垂直牵引线

        popupURL: HostConfig.Path + '/media/video/video1.webm',//视频文件路径，也支持rtsp实时视频流格式
        popupBackgroundColor: [1.0, 1.0, 1.0, 0.6],//弹窗背景颜色
        popupSize: [400, 300],//弹窗大小
        popupOffset: [-220, -180],//弹窗偏移

        autoHidePopupWindow: false,//失去焦点后是否自动关闭弹出窗口
        autoHeight: false,// 自动判断下方是否有物体
        displayMode: 2,//显示模式 
        priority: 0,//避让优先级
        occlusionCull: false//是否参与遮挡剔除
    };
    fdapi.marker.add(o);
    fdapi.marker.showPopupWindow(o.id);
    fdapi.marker.focus('video_marker', 100, 1);
}


//车辆跟随信号源
async function followSignalSource() {

    //先移除tick事件 防止缓存
    fdapi.removeTick();


    //隐藏默认资源车辆
    fdapi.infoTree.hide('5E471BB94FF00C5865B74AB57ADAF6FD');

    //相机移动到车辆视角
    fdapi.camera.set(492551.249297, 2492271.499375, 7.646388, -44.99995, 161.199799, 0);

    //车辆运动轨迹点
    let positionArr = [
        [492544.46875, 2492269.25, -0.6],
        [492543.71875, 2492264.75, -0.6],
        [492542.75, 2492260, -0.6],
        [492541.78125, 2492255, -0.6],
        [492540.34375, 2492249, -0.6],
        [492538.90625, 2492242.25, -0.6],
        [492537.34375, 2492236.5, -0.6],
        [492536.21875, 2492230, -0.6],
        [492535.25, 2492223, -0.6],
        [492533.625, 2492216.75, -0.6],
        [492532.8125, 2492212.5, -0.6],
        [492530.9375, 2492206.5, -0.6],
        [492530.125, 2492200.5, -0.6],
        [492528.53125, 2492194.75, -0.6],
        [492523.875, 2492192.25, -0.6],
        [492519.21875, 2492192.75, -0.6],
        [492512.4375, 2492193.25, -0.6],
        [492507.5625, 2492193.25, -0.6],
        [492502.96875, 2492194.25, -0.6]
    ];

    //绘制运动路径线
    await fdapi.polyline.clear();
    let p1 = {
        id: 'p1',
        coordinates: positionArr,
        coordinateType: 0,
        range: [1, 10000],
        color: Color.Red,
        thickness: 0.5,
        intensity: 0.3,
        flowRate: 0.5,
        shape: 0,
        depthTest: true,
        style: PolylineStyle.Normal,
        tiling: 0
    };
    await fdapi.polyline.add(p1);


    fdapi.customObject.clear();
    //添加车辆
    let co_location = [492544.46875, 2492269.25, -0.6]
    let o = {
        id: 'co1',
        pakFilePath: '@path:DTS_Library.pak',
        assetPath: '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe',
        location: co_location,
        coordinateType: 0,
        rotation: [0, 90, 0],
        localRotation: [0, 0, 0],
        scale: [1, 1, 1],
        smoothMotion: 1
    };
    await fdapi.customObject.add(o);

    //添加信号波束
    let startPoint = [492544.46875, 2492269.25, -0.6];  //车辆起点位置
    let endPoint = [492547.78125, 2492251, 7.5889630317687988]; //信号源1位置
    //获取起始点获取波束姿态（欧拉角）
    let eulerAngle = fdapi.camera.getEulerAngle(startPoint, endPoint);
    let signal_line_co = {
        id: 'signal_line_co',
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/其他/标记类/BP_波束_1',
        location: endPoint,
        coordinateType: 0,
        rotation: [eulerAngle[0] + 90, eulerAngle[1], eulerAngle[2]],
        localRotation: [0, 0, 0],
        scale: [1, 0.5, 2],
        smoothMotion: 0
    };
    await fdapi.customObject.add(signal_line_co);
    //设置波束效果
    fdapi.customObject.callFunction('signal_line_co', '透明度', BPFuncParamType.Float, 0.2);
    fdapi.customObject.callFunction('signal_line_co', '亮度', BPFuncParamType.Float, 3);
    fdapi.customObject.callFunction('signal_line_co', '速度', BPFuncParamType.Float, 0.2);
    fdapi.customObject.callFunction('signal_line_co', '动效', BPFuncParamType.String, '动效1');
    fdapi.customObject.focus('signal_line_co', 20);

    //构造运动方法参数
    let pathPointArr = [];
    for (let i = 0; i < positionArr.length; i++) {
        let elementPoint = { 'time': (i) * 0.5, 'coordinate': positionArr[i] };
        pathPointArr.push(elementPoint);
    }
    //视角跟随相机
    fdapi.customObject.focus('co1', -1);
    //车辆按路径移动 
    fdapi.customObject.startMove('co1', 0, pathPointArr);

    //注册tick事件
    fdapi.registerTick(HostConfig.Path + "/locale/zh/popup_follow.html", {
        visible: true,  //是否显示调试窗口
        x: 10,          //调试窗口的位置
        y: 150,
        width: 460,     //调试窗口的尺寸
        height: 300
    })

}

//无人机跟随视频投影
async function followVideoProjection() {

    //先移除tick事件 防止缓存
    fdapi.removeTick();

    let arrbase = [[492211.15230468754, 2492390.5789453126, -0.8840820312500001], [492209.18078125, 2492372.832714844, -0.8841015625], [492207.5556640625, 2492354.83390625, -0.8840625], [492207.9176171875, 2492337.1896777344, -0.88404296875], [492206.60671875003, 2492319.6503515625, -0.8841015625], [492205.7765234375, 2492299.767861328, -0.8841015625], [492204.06546875, 2492279.1997363283, -0.88404296875], [492203.092890625, 2492260.952285156, -0.8840820312500001], [492201.81546875, 2492246.345209961, -0.8840820312500001], [492200.7296484375, 2492226.936982422, -0.8840625], [492199.574765625, 2492211.8576660156, -0.88404296875], [492194.57906250004, 2492194.46753418, -0.8840820312500001], [492186.14109375, 2492184.190668945, -0.816796875], [492179.13921875, 2492175.1917578126, -0.4240625], [492169.1214453125, 2492164.4935913086, 0.6575390625], [492159.6733984375, 2492148.7750732424, 2.444296875], [492148.80828125, 2492135.7500439454, 4.25111328125], [492139.6085546875, 2492120.589848633, 5.8591796875], [492133.5351953125, 2492105.6341064456, 6.8528125], [492131.156328125, 2492093.107373047, 7.114921875], [492130.4025, 2492078.4892578125, 7.11490234375], [492133.0330859375, 2492064.7142578126, 7.11486328125], [492137.142734375, 2492051.710214844, 7.11494140625], [492141.7938671875, 2492039.533496094, 7.08958984375], [492148.4939453125, 2492029.8236914063, 6.8641796875], [492154.7591015625, 2492022.0507519534, 6.4578125], [492166.238984375, 2492013.5414453126, 5.5981250000000005], [492181.81640625, 2492003.850292969, 4.16333984375], [492195.81289062503, 2491997.0259375, 2.81755859375], [492209.599921875, 2491994.738125, 1.63775390625], [492223.291484375, 2491989.922910156, 0.501796875], [492236.8067578125, 2491988.6815234376, -0.3178125], [492246.763828125, 2491988.725, 8.11478515625], [492244.9119140625, 2492013.0275781252, 8.1148046875], [492244.70003906253, 2492039.5202734377, 8.11478515625], [492241.408203125, 2492066.309042969, 8.11478515625], [492236.5987890625, 2492092.6010546875, 8.11482421875], [492224.673828125, 2492111.0664990237, 7.9017578125000005], [492218.077890625, 2492122.715859375, 7.119003906250001], [492208.7728125, 2492131.2113623046, 6.0328125], [492192.3051171875, 2492135.1747314455, 4.2324023437500005], [492175.3316015625, 2492133.2270239256, 2.2784375], [492165.203125, 2492127.712431641, 1.1146484375], [492159.580078125, 2492114.4689013674, -0.07396484375], [492161.1692578125, 2492101.1529052737, -0.68662109375], [492164.865546875, 2492091.5791992187, -0.8841015625], [492167.8544921875, 2492086.0670214845, -0.8840625]]

    let arr = []
    for (let i = 0; i < arrbase.length; i++) {
        arr.push([arrbase[i][0], arrbase[i][1], 20]);
    }

    console.info(arr)
    //添加前清空
    fdapi.splineMesh.clear();
    //执行添加
    await fdapi.splineMesh.add({
        id: 'splineMesh1',
        groupId: "groupAll",
        userData: "路径模型",
        coordinateType: 0,// 坐标系类型
        coordinates: arr,//路径模型坐标数组
        range: [0, 10000],// 可见范围
        scale: 5, //路径模型轴朝向的缩放值，默认值：1
        style: SplineMeshStyle.Pipe,//参考SplineMeshStyle样式枚举 
        curveType: 1,  //曲线插值
        segment: 10  //分段点数量

    });


    //添加前清空所有customObject 防止id重复
    fdapi.customObject.clear();
    let co1 = {
        id: 'co1',//自定义对象唯一id
        pakFilePath: '@path:DTS_Library.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
        assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/交通工具/其他/无人机_1',//资源目录，自定义对象在pak文件资源包里的相对路径
        location: arr[0],//位置坐标
        coordinateType: 0,// 坐标系类型 
        rotation: [0, 0, 0],// 世界坐标系旋转
        range: [0, 1000],//可见范围
        groupId: "coGroup",//分组id
        localRotation: [0, 0, 0],//模型自身旋转
        scale: [3, 3, 3],//模型缩放
        smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
        visible: true,//可选，设置自定义对象加载后是否显示，默认：true
        collision: true, //可选，设置自定义对象加载后是否开启碰撞，默认：true
        curveType: 1,  //曲线插值
        segment: 10  //分段点数量
    };
    await fdapi.customObject.add(co1);
    fdapi.customObject.focus(co1.id, 10);


    fdapi.videoProjection.delete('vp1');
    let vp = {
        id: "vp1",
        videoURL: HostConfig.Path + "/assets/video/video2.mov",//视频地址
        location: arr[0],
        rotation: [-90, 120, 0],
        fov: 90,//垂直夹角
        aspectRatio: 1.5,//纵横比
        distance: 100,//投影距离
        minDistance: 5,//近裁距离
        depthCulling: true,//是否背面剔除 即背面不显示投影
        frustumVisible: false,//是否显示投影线框
        frustumColor: [1, 1, 1, 1], //投影线框颜色
        texturePath: HostConfig.Path + '/assets/image/decal2.png' //自定义投影蒙版图片路径
    }
    await fdapi.videoProjection.add(vp);

    /**
     * 功能描述：实现无人机按GPS轨迹移动，每隔2秒移动一次 
     */

    //gps轨迹
    let positionArr = arr
    //构造移动路径点数组
    let pathPointArr = [];
    for (let i = 0; i < positionArr.length; i++) {
        //构造数组元素 每1秒移动一次
        let elementPoint = { 'time': (i) * 2, 'coordinate': positionArr[i] };
        pathPointArr.push(elementPoint);
    }
    //设置相机自动跟随
    fdapi.customObject.focus('co1', -1);
    //设置自定义相机跟随
    // fdapi.customObject.focus('co1', 5, 0, [-30, 4, 0], ActionMode.Follow);
    //无人机按GPS轨迹移动
    fdapi.customObject.startMove('co1', 0, pathPointArr);


    //注册tick事件 逐帧更新视频投影位置
    fdapi.registerTick(HostConfig.Path + "/locale/zh/popup_follow_vp.html", { x: 10, y: 150, width: 320, height: 200, visible: true });

}