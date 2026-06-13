
function loadScript(file) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    head.appendChild(script);
}

//给select分组增加导航：projection_pcs || ellipsoid_gcs
function addOption(groupId, value, text) {
    $("#"+groupId).append($("<option></option>").attr("value", value).text(text));
}



loadScript("../../assets/coords/data0.js");
loadScript("../../assets/coords/data1.js");
loadScript("scripts/china.js");
loadScript("scripts/pointssz.js");

loadScript("scripts/page_content.js");
loadScript("scripts/api_examples.js");
loadScript("scripts/api_examples_ellipsoid.js");

//工程坐标系类型 0投影 1球面
let ACP_COORD_TYPE = "";
// loadScript("scripts/1.js");
// loadScript("scripts/2.js");
// loadScript("scripts/3.js");
// loadScript("scripts/4.js");

//DigitalTwinAPI初始化参数辅助类
class ApiInitOptions {
    constructor() {
        this.numOfTimesToLog = 0;
    }

    onReady(coordSystemType) {
        //log('此时可以调API了,工程类型：'+ coordSystemType);
        //区分工程类型：投影0和球面1
        ACP_COORD_TYPE = coordSystemType;
        if(ACP_COORD_TYPE == "0"){
            if(document.getElementById("pcs")){
                document.getElementById("pcs").style.display = "block";
            }
            if(document.getElementById("gcs")){
                document.getElementById("gcs").style.display = "none";
            }
            
        }
        if(ACP_COORD_TYPE == "1"){
            if(document.getElementById("pcs")){
                document.getElementById("pcs").style.display = "none";
            }
            if(document.getElementById("gcs")){
                document.getElementById("gcs").style.display = "block";
            }
        }

        //设置scrollY初始值
        localStorage.setItem('scrollY', 0)

        //初始化下拉列表
        __initializer.initApiNavigator(ACP_COORD_TYPE);
    }

    onApiVersion() {
        var spanVer = document.getElementById('spanVer');
        if (spanVer) {
            if (fdapi.misc.isApiVersionMatched()) {
                spanVer.innerHTML = '<font color=green>' + fdapi.getVersion() + '</font>';
            }
            else {
                spanVer.innerHTML = 's:<font color=red>' + fdapi.misc.apiVersionServer + '</font>-c:' + fdapi.getVersion();
                logWithColor('red', '<b>ac.min.js版本和云渲染服务器的文件版本不一致，可能造成接口调用错误，请确保本地工程的ac.min.js版本和CloudMaster最新安装版本一致!</b>');
                log(spanVer.innerHTML);
                log('');
            }
        }
    }

    onEvent(e) {
        if (e.eventtype == 'LeftMouseButtonClick' && e.Type == 'TileLayer') {
            __tileLayerCurSel = {
                'id': e.ID || e.Id,
                'objectId': e.ObjectID,
                'location': e.MouseClickPoint
            };
        }

        //监听相机事件


        //监听marker点击事件
        if (e.eventtype == 'LeftMouseButtonClick') {
            //移除弹层div
            $("#popDiv").remove();
            if (e.Id == 'div_marker' && e.Type == 'marker') {
                //把投影坐标转换为屏幕坐标并设置弹层div的绝对定位
                fdapi.coord.world2Screen(e.MouseClickPoint[0], e.MouseClickPoint[1], e.MouseClickPoint[2]).then(result => {
                    var screenPosition = result.screenPosition;
                    //添加带div弹层的标注 相对父元素进行绝对定位 -->
                    $("#player").append('<div id="popDiv" style="display:block;position:absolute;left:' + (screenPosition[0] + 60) + 'px;top:' + (screenPosition[1] - 40) + 'px;">' +
                        '<table id="popTable">' +
                        '<tr>' +
                        '<th>类型</th>' +
                        '<th>名称</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>图层</td>' +
                        '<td>楼层1</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>图层</td>' +
                        '<td>楼层2</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Marker</td>' +
                        '<td>弹层标注</td>' +
                        '</tr>' +
                        '</table>' +
                        '</div>');
                });
            }
        }
        if (e.eventtype == 'MarkerCallBack') {
            alert(e.Data);
        }
        log('OnEvent: ' + e.eventtype);
    }

    onLog(msg, noLineBreak, color) {
        let e = document.getElementById('infoPanel');
        if (e) {

            //2022.10.20 限制一下子节点个数，避免无限添加影响性能或导致浏览器崩溃
            let cbAutoClearLog = document.getElementById('cbAutoClearLog');
            //是否开启页面的日志输出
            let closeLog = document.getElementById('closeLog').checked;

            if (closeLog) {
                let bAutoClear = cbAutoClearLog?.checked;
                if (bAutoClear && this.numOfTimesToLog++ > 100) {
                    this.numOfTimesToLog = 0;
                    e.innerHTML = '';
                }

                msg = color ? `<font color="${color}">` + msg + '</font>' : msg;
                e.insertAdjacentHTML('beforeend', msg + (noLineBreak ? '' : '\n'));
                e.scrollTop = e.scrollHeight + 100;
            }
        }
    }
}


//初始化辅助类
class Initializer {

    constructor() {

        //DigitalTwinAPI初始化选项
        let o = new ApiInitOptions();
        this.apiOptions = {
            onReady: (coordSystemType) => o.onReady(coordSystemType),
            onApiVersion: o.onApiVersion,
            onEvent: e => o.onEvent(e),
            onLog: (msg, noLineBreak, color) => o.onLog(msg, noLineBreak, color)
        };

        this.title = document.title;
    }

    //Cloud应用只需要初始化DigitalTwinPlayer
    initPlayer(from) {
        let urlParams = new URLSearchParams(window.location.search);
        let iid = urlParams.get('iid');
        let pid = urlParams.get('pid');

        //用户名
        let username = urlParams.get('username');
        if (!username) {
            let userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
            if (userLoginInfo)
                username = userLoginInfo.username;
        }

        //DigitalTwinPlayer
        let options;
        if (document.getElementById('player')) {    //需要显示视频流
            options = {
                domId: 'player',                //HTML元素ID（它将作为要创建的Video标签的父元素），如果未设置此参数，则不传输视频流，只进行API调用
                iid: iid,                       //云渲染实例的ID
                pid: pid,                       //指定实例要加载的工程ID
                reset: urlParams.get('reset'),  //指定是否重置实例。如果设置reset为true，每次连接（包括刷新）都会得到一个全新的实例
                apiOptions: this.apiOptions,    //用于指定DigitalTwinAPI的初始化选项
                keyEventTarget: 'video',        //默认值为'video'，设置键盘交互事件，可选的值：'document'、'video' 、'none'
                useBuiltinCursors: true,        //默认值为true，是否使用内置光标。
                password: urlParams.get('password'),    //设置实例的访问密码，如果服务设置了密码，那么客户端需要提供正确的密码才能连接实例
                customString: 'user-defined message',   //存储用户自定义信息
                urlExtraInfo: {                 //可以在WebSocket URL后面附加其他信息（例如认证信息等）（如果不需要，直接去掉此属性即可）
                    uid: urlParams.get('uid'),  //用于授权管理（2023.05.31）
                    username: username          //用于用户登录（2023.12.16）
                },
                enableApiCallLog: urlParams.get('apilog'),  //默认值为false，Cloud调用接口时，是否开启客户端日志（客户端日志通过apiOptions.onlog设置）
                ui: {
                    startupInfo: true,          //默认值为true，初始化过程中是否显示详细信息（如果不需要，直接去掉此属性即可）
                    statusIndicator: true,      //默认值为true，左上角闪烁的状态指示灯，可以从不同的颜色看出当前的状态
                    statusButton: true,         //默认值为false，是否在左下角显示信息按钮（如果不需要，直接去掉此属性即可）
                    fullscreenButton: true,     //默认值为false，是否在右下角显示全屏按钮（如果不需要，直接去掉此属性即可）
                    homeButton: true,           //默认值为false，是否在左下角显示“回到初始位置”按钮（如果不需要，直接去掉此属性即可）
                    taskListBar: 1,             //默认值为1，是否在下方显示“任务队列（API调用队列）”信息（0: 永不显示；1: 执行比较耗时的操作时显示；2: 一直显示）
                    debugEventsPanel: urlParams.get('debugEventsPanel'),   //是否显示事件详细信息（仅用于调试）
                    //mainUI: false,            //是否显示Cloud工具栏，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。
                    //campass: false,           //是否显示指北针，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。
                },
                events: {
                    //鼠标、键盘交互事件的回调，可以随时通过setActionEventEnabled进行开关
                    mouseKeyListener: {
                        onKeyDown: e => logWithColor('gray', `KeyDown: ${e.code}`)
                    },

                    //用于接收触摸事件，可以随时通过setActionEventEnabled进行开关
                    touchListener: (name, event) => {
                        switch (name) {
                            case 'touchstart': log('-->start touch'); break;
                            case 'touchmove': break;
                            case 'touchend': log('-->end touch'); break;
                            case 'touchcancel': break;
                        }
                    },

                    //当视频流加载成功后触发
                    onVideoLoaded: () => console.log('video stream loaded.'),

                    //服务连接断开的回调函数
                    onConnClose: e => log(`connection closed: ${e.code}`),

                    //用于接收视频流的状态信息，例如：帧率、码率、QP等
                    onRtcStatsReport: stats => document.title = `${this.title}--FPS:${stats.framesPerSecond || 0}`,

                    //如果开启了用户系统，当需要登录的时候会调用此方法（2023.12.16）
                    onLoginRequired: (captchaRequired) => {
                        //跳转到登录页面
                        let href = 'login.html?from=' + from + '&captcha=' + (captchaRequired ? 1 : 0);
                        if (options.pid)
                            href += '&pid=' + options.pid;
                        if (options.iid)
                            href += '&iid=' + options.iid;
                        location.href = href;
                    }
                }
            }
        }
        else {
            options = {
                iid: iid, //不带视频流的连接必须指定云渲染实例
                pid: pid,
                password: urlParams.get('password'),
                apiOptions: this.apiOptions,
            };
        }

        /**
         * 2023.03.21 处理服务器连接的端口映射问题
         *            仅用于SDK测试页面。 如果用户的网络环境是这样的：内网无法连接映射的公网IP和端口，需要进行内外网访问地址的处理
         * 说明：
         *      CloudMaster启动后会修改HostConfig
         *      HostConfig.Player：内网地址
         *      HostConfig.PlayerMapping：外网地址
         */
        let playerHost = HostConfig.Player;     //默认使用内网地址
        if (location.protocol != 'file:') {     //如果是通过HTTP服务访问
            if (HostConfig.Player.indexOf(location.hostname) == -1 && HostConfig.PlayerMapping)
                playerHost = HostConfig.PlayerMapping;  //如果URL不是内网地址，并且开启了端口映射，则使用映射地址和端口进行WebSocket连接
        }
        fdplayer = new DigitalTwinPlayer(playerHost, options);


        //对于Cloud应用不需要用户创建DigitalTwinAPI对象，DigitalTwinPlayer内部会自动创建
        fdapi = fdplayer.getAPI();
    }

    //Explorer的WebUI应用只需要初始化DigitalTwinAPI
    initAPI() {
        fdapi = new DigitalTwinAPI(HostConfig.API, this.apiOptions);
    }


    //初始化下拉导航
    initApiNavigator(coordSystemType) {
        let selApis = document.getElementById('apiNavigator');

        //初始化前清空
        $("#projection_pcs").empty();
        $("#ellipsoid_gcs").empty();
        
        ellipsoid_gcs

        if (!selApis)
            return;

        //遍历投影坐标系的接口名，排序填充SELECT
        let ids = [];
        let ids_ellipsoid = [];
        $('#leftPanel div').each(function (i, elem) {
            let id = $(this).attr('id');
            if(id.indexOf("ellipsoid_")){
                ids.push(id);
            }else{
                ids_ellipsoid.push(id);
            }
            
        })

        if(coordSystemType == "0"){
            $("#ellipsoid_gcs").hide();
            $("#projection_pcs").show();
            ids.sort(); 
            for (let id of ids) {
                if(id != "gcs" && id != "pcs"){
                    let text = id.replace('a_', '');
                    //selApis.add(new Option(text, id));
                    addOption("projection_pcs",id, text);
                }
                
            }
        }
        
       
         if(coordSystemType == "1"){
            $("#projection_pcs").hide();
            $("#ellipsoid_gcs").show();
            //遍历球面坐标系的接口名，排序填充SELECT
            ids_ellipsoid.sort(); 
            for (let id of ids_ellipsoid) {
                //console.info(id);
                if(id != "gcs" && id != "pcs"){
                    let text = id.replace('ellipsoid_a_', '');
                //selApis.add(new Option(text, id));
                    addOption("ellipsoid_gcs",id, text);
                }
            }
        }

        //SELECT选择事件
        selApis.onchange = e => {
            let divApi = document.getElementById(selApis.value);
            if (divApi) {
                let leftPanel = document.getElementById('leftPanel');
                let isMain = document.getElementById('player');
                if (isMain) {
                    let rcEditor = document.getElementById('codeEditor').getBoundingClientRect();
                    leftPanel.scrollTop = divApi.offsetTop - rcEditor.height - 120;
                }
                else {
                    leftPanel.scrollTop = divApi.offsetTop - 60;
                }
            }
            selApis.blur();
        }
    }

    init(iscloud, from) {
        //2022.05.13 禁止鼠标滚轮缩放网页
        document.addEventListener('mousewheel', function (e) {
            e = e || window.event;
            if ((e.wheelDelta && event.ctrlKey) || e.detail)
                e.preventDefault();
        }, { capture: false, passive: false })

        //2022.05.13 禁止快捷键缩放网页
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey === true || e.metaKey === true) && [61, 107, 173, 109, 187, 189].indexOf(e.keyCode) != -1)
                e.preventDefault();
        })

        //显示API版本号
        var spanVer = document.getElementById('spanVer');
        if (spanVer)
            spanVer.innerHTML = acapi.VERSION;


        //初始化工具提示
        ToolTip.init({
            delay: 0,
            fadeDuration: 250,
            textColor: '#fff',
            shadowColor: '#f0fff0',
            fontSize: '9pt',
            theme: 'dark'
        });

        //2021.04.16 解析参数：主要针对Cloud版的int.html
        let urlParams = new URLSearchParams(window.location.search);
        this.iscloud = parseInt(urlParams.get('iscloud')) || iscloud || false;

        //初始化接口
        if (this.iscloud)
            this.initPlayer(from);
        else
            this.initAPI();


        //初始化代码编辑器
        if (typeof CodeMirror != 'undefined') {
            window.codeEditor = CodeMirror.fromTextArea(document.getElementById("textAreaCode"), {//定义CodeMirror代码编辑器
                lineNumbers: true,
                lineWrapping: true,    // 自动换行
                styleActiveLine: true, // 当前行背景高亮
                matchBrackets: true,
                indentWithTabs: true,
                theme: "mdn-like",
                mode: "text/typescript"
            });
            window.codeEditor.on('focus', function () {
                if (!window.hasSetCode) {
                    window.hasSetCode = true;
                    window.codeEditor.setValue('');
                }
            });

            if (typeof localStorage != 'undefined') {
                let h = localStorage.getItem('CodeMirrorHeight');
                if (h)
                    window.codeEditor.setSize('100%', h - 38);
            }

            window.codeEditor.setValue(''
                + '使用说明：\n\n'
                + `    （1）当前JSSDK版本：'${fdapi.getVersion()}'\n`
                + '    （2）此处代码编辑区域，可在此处编辑原始JSON、JS代码\n'
                + '             或者点击左侧超链接，然后在此处修改显示的JS代码\n'
                + '    （3）点击上方的增加高度、减少高度，可以调整编辑器的高度\n');
        }


        //2021.04.20 Cloud显示信令服务端口， Explorer显示API(WebSocket)端口
        if (fdapi && this.iscloud) {

            let ip, port;
            if (fdplayer) {
                let host = fdplayer.getHost();
                ip = host.split(':')[0];
                port = host.split(':')[1];
            }

            let txtIp = document.getElementById('txtIP');
            let txtPort = document.getElementById('txtPort');
            let btnConnect = document.getElementById('btnConnect');

            if (txtIp) {
                txtIp.disabled = true;
                txtIp.value = ip || txtIp.value;
            }
            if (txtPort) {
                txtPort.disabled = true;
                txtPort.value = port || txtPort.value;
            }
            if (btnConnect) {
                btnConnect.disabled = true;
                btnConnect.style.display = 'none';
            }
        }


        //2021.03.18 恢复滚动条的位置
        let scrollY = localStorage.getItem('scrollY');
        if (document.getElementById('leftPanel')) {
            document.getElementById('leftPanel').scrollTop = scrollY || 0;
        }

        //2022.07.26 API导航 
        // 2025-11-25 放在onReady入口
        if(ACP_COORD_TYPE == ""){
            //未打开工程onReady没有返回坐标系类型 默认显示投影
            this.initApiNavigator("0");
        }
    }
}


var __tileLayerCurSel = null;   //当前点选的TileLayer Actor
var fdapi;                        //DigitalTwinAPI
var fdplayer;
var __initializer = new Initializer();

//页面初始化
function init(iscloud, from) {
    __initializer.init(iscloud, from);
}

function toTop() {
    document.getElementById('leftPanel').scrollTop = 0;
}

function increaseHeight(val, cat) {
    var h = window.codeEditor.getScrollInfo().height;
    if (h < 128 && val < 0) {
        logWithColor('Purple', '编辑器最小高度为：128');
        return;
    }

    if (h > 628 && val > 0) {
        logWithColor('Purple', '编辑器最大高度为：628');
        return;
    }

    h += val;
    if (typeof localStorage != 'undefined')
        //防止用户点击多次 导致页面无法恢复
        if( h> 628){
            h = 628;
        }
        localStorage.setItem('CodeMirrorHeight', h);
    window.codeEditor.setSize('100%', h);

    onResize();
}

function log(msg, noLineBreak, color) {
    __initializer.apiOptions.onLog(msg, noLineBreak, color);
}

function logWithColor(color, text, noLineBreak) {
    log(text, noLineBreak, color);
}

function clearScreen() {
    document.getElementById('infoPanel').innerHTML = '';
}

function call(fn) {

    //2021.03.18 记录滚动条的位置
    let scrollY = document.getElementById('leftPanel').scrollTop;
    localStorage.setItem('scrollY', scrollY)

    //获取函数代码内容
    var str = fn.toString();
    var n1 = str.indexOf('{');
    var n2 = str.lastIndexOf('}');
    var strBody = str.substring(n1 + 1, n2);

    //命令点击是否执行
    var notExec = document.getElementById('cbNotExecute').checked;
    if (!notExec) {
        try {
            fn();
        } catch (e) {
            logWithColor('red', e);
        }
    }

    //代码编辑区域赋值
    window.codeEditor.setValue(strBody);
    window.hasSetCode = true;
}

//匹配所有的json-command命令并返回json命令数组
function testCmdLogReg(cmdlog) {
    //20250522 新版本字符串命令索引 日志匹配正则表达式
    let regex = new RegExp('{\"__command.*?__playerId\":.*?}', "g");
    let matchResults = cmdlog.match(regex);
    //console.info(matchResults);
    return matchResults;
}

//模拟sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//延迟多少毫秒执行函数
function exeFunction(fn, millisecond) {
    setTimeout(fn, millisecond);
}

//计算相邻时间戳差值
function calcTimeDiffs(timestampArr) {
    // 使用map方法结合slice获取相邻元素的差值 
    const differences = timestampArr.map((current, index, array) => {
        if (index === 0) {
            // 第一个元素没有前一个元素，返回0或者你想要的任何值
            return 0;
        }
        // 返回当前元素和前一个元素的差值
        return current - array[index - 1];
    });
    return differences;
}


//执行日志回放 或者 json命令
function doSendJson() {
    var text = window.codeEditor.getValue();
    var cmdArr = testCmdLogReg(text);
    //console.info(cmdArr);
    //时间戳数组
    let timestampArr = [];
    if (cmdArr && cmdArr.length > 0) {
        //获取各个json命令的执行时间戳
        for (let i = 0; i < cmdArr.length; i++) {
            let cmd = cmdArr[i];
            let cmdJson = JSON.parse(cmd);
            let timestamp = cmdJson.timestamp;
            //console.info(timestamp);
            timestampArr.push(timestamp);
        }
    }

    //console.info(timestampArr)
    let differences = calcTimeDiffs(timestampArr);
    //console.info(differences)

    //console.info(cmdArr)
    if (null != cmdArr) {
        (async () => {
            for (let i = 0; i < cmdArr.length; i++) {
                let cmdLogStr = cmdArr[i];
                try {
                    fdapi.call(JSON.parse(cmdLogStr));
                } catch (e) {
                    logWithColor('red', e.message);
                    logWithColor('red', e.stack);
                    console.error(cmdLogStr)
                    console.error('JSON解析错误');
                }
                await sleep(differences[i]);//等待时间间隔后执行
            }
        })();
    } else {
        execJson(text);
    }
}

function execJson(jsonText) {
    try {
        var o = JSON.parse(jsonText);
        if (!o) {
            log('JSON解析错误');
            return;
        }
        fdapi.call(o);
    } catch (e) {
        logWithColor('red', e.message);
        logWithColor('red', e.stack);
        console.error('JSON解析错误');
    }
}

function doExecCode() {
    var text = window.codeEditor.getValue();
    try {
        eval('(async ()=>{' + text + '})()');
    } catch (e) {
        logWithColor('red', e.message);
        logWithColor('red', e.stack);
    }
}

function clearCodeEditor() {
    window.codeEditor.setValue('');
}

function onServerChanged() {
    let ip = document.getElementById('txtIP').value;
    let port = document.getElementById('txtPort').value;

    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ip.match(exp);
    if (reg != null) {
        if (/^\+?[1-9][0-9]*$/.test(port)) {
            fdapi.setHost(ip, port);
        }
    }
}

function connectServer() {
    let ip = document.getElementById('txtIP').value;
    let port = document.getElementById('txtPort').value;
    let valid = false;

    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ip.match(exp);
    if (reg != null) {
        if (/^\+?[1-9][0-9]*$/.test(port)) {
            valid = true;
        }
    }

    if (valid) {
        fdapi.destroy();
        fdapi.setHost(ip, port);
        fdapi.connectWebSocket();
    }
    else {
        alert('IP或端口格式不正确！');
    }
}