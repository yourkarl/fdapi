var __caller;


function setText(domId, text, notFormat) {
    let elem = get(domId);
    if (!elem)
        return;

    if (typeof text == 'object')
        text = JSON.stringify(text);

    elem.innerText = text;

    if (!notFormat) {
        try {
            let o = JSON.parse(text)
            elem.innerText = JSON.stringify(o, null, '\t');
        }
        catch (e) {
        }
    }
}

function log(msg, color, noLineBreak) {

    if (typeof msg == 'object')
        msg = JSON.stringify(msg);

    let e = document.getElementById('logsArea');
    if (typeof msg == 'undefined' || msg == '') {
        e.insertAdjacentHTML('beforeend', '\n');
    }
    else {
        color ||= 'black';
        msg = color ? `<font color="${color}">` + msg + '</font>' : msg;
        e.insertAdjacentHTML('beforeend', msg + (noLineBreak ? '' : '\n'));
    }
    e.scrollTop = e.scrollHeight + 100;
}

function get(domId) {
    return document.getElementById(domId);
}

function getValue(domId) {
    let val = get(domId).value;
    if (typeof val == 'string')
        val = val.trim();
    return val;
}

function getChecked(domId) {
    return get(domId).checked;
}

function setLoginPanelVisible(bVisible) {
    if (get('loginPanel'))
        get('loginPanel').style.display = bVisible ? 'block' : 'none';

    if (get('logoutPanel'))
        get('logoutPanel').style.display = !bVisible ? 'block' : 'none';
}


$(function () {

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500)
            $('#logsArea').fadeIn(300);
        else
            $('#logsArea').fadeOut(300);
    });

    //是否修改管理员密码
    $('#e_Change_IncludePassword').click(function (e) {
        get('e_Change_Pasword').disabled = !e.target.checked;
        get('e_Change_Pasword2').disabled = !e.target.checked;
    })


    //2023.06.26 处理端口映射问题
    let strRestUrl;
    let playerHost = HostConfig.Player;                     //默认使用内网地址
    if (location.protocol != 'file:') {                     //如果是通过HTTP服务访问
        if (HostConfig.Player.indexOf(location.hostname) == -1 && HostConfig.PlayerMapping) {
            playerHost = HostConfig.PlayerMapping;          //如果URL不是内网地址，并且开启了端口映射，则使用映射地址和端口进行WebSocket连接
            playerHost = playerHost.replace(/\/$/, '');     //2024.01.08 去掉末尾的斜杠
            strRestUrl = `${HostConfig.UseHttps ? 'https' : 'http'}://${playerHost}`;
        }
    }
    let strWsUrl = `${HostConfig.UseHttps ? 'wss' : 'ws'}://${playerHost}/manager`;
    __caller = new dts.Caller(strWsUrl, {
        onmessage: o => {
            if (o.result == dts.ManageResult.PermissionDenied) {//检查登录是否过期
                log('Permission Denied! Please login again!', 'red');
                location.href = "#d_login";
            }
        },
        log: (text, color) => log(text, color)
    }, strRestUrl);
    __caller.connectWebSocket();

    //初始化验证码
    __caller.initCaptcha('captchaPanel', 'loginCode');
})

//检查是否已登录
function call_checkLogin(byRest) {
    __caller.checkLogin(byRest)
}

function call_getCaptchaRequired(byRest) {
    __caller.getCaptchaRequired(byRest);
}

//管理员登录
function call_login() {

    let username = getValue('e_Login_Username');
    let password = getValue('e_Login_Password');
    let captcha = getValue('e_Login_Captcha');

    if (username.length == 0) {
        log('用户名不能为空！', 'red');
        return;
    }

    if (password.length == 0) {
        log('密码不能为空！', 'red');
        return;
    }

    if (__caller.captchRequired && (captcha.length == 0)) {
        log('请输入验证码！', 'red');
        return;
    }

    __caller.login({ username, password, captcha }, data => {
        let strResult = 'Server returns information: ' + JSON.stringify(data);
        if (data.result == dts.ManageResult.OK) {
            strResult += '\nLogin successful!';
            log(strResult, 'green')
        }
        else {
            strResult += '\nLogin failed!';
            log(strResult, 'red');
        }
    })
}

//注销登录
function call_logout(byRest) {
    __caller.logout(byRest);
}

//获取管理员设置
function call_getAccount(byRest) {
    __caller.getAccount(byRest, o => {
        $('#e_Change_Username').val(o.username);
        $('#e_Change_Period').val(o.period);
        $('#e_Change_CaptchaRequired').prop('checked', o.captchaRequired);
    });
}

//修改管理员账号设置
function call_changeAccount(byRest) {
    let username = getValue('e_Change_Username');
    let includePassword = getChecked('e_Change_IncludePassword');
    let password = getValue('e_Change_Pasword');
    let password2 = getValue('e_Change_Pasword2');
    let period = parseInt(getValue('e_Change_Period'));
    let captchaRequired = getChecked('e_Change_CaptchaRequired');

    let data;
    if (username.length == 0) {
        log('用户名不能为空！', 'red');
        return;
    }

    if (isNaN(period) || period < 15) {
        log('登录有效期不正确（最小15分钟）！', 'red');
        return;
    }

    if (includePassword) {
        if (password != password2) {
            log('两次输入的密码不一致！', 'red');
            return;
        }
        data = { username, password, period, captchaRequired };
    }
    else {
        data = { username, period, captchaRequired };
    }

    __caller.changeAccount(byRest, data);
}

//获取实时状态
function call_getStatus(byRest) {
    __caller.getStatus(byRest);
}

//Message: 踢出用户
function call_KickPlayer(byRest) {

    let o = {
        id: getValue('e_KickPlayer_IID')
    }
    if (getValue('e_KickPlayer_PlayerId') != '')
        o.playerId = parseInt(getValue('e_KickPlayer_PlayerId'));

    __caller.kickPlayer(byRest, o);
}

//获取授权信息
function call_GetLicenseInfo(byRest) {
    __caller.getLicenseInfo(byRest);
}

function call_DeleteUserLogin(byRest) {
    let o = {
        name: getValue('e_DeleteUserLogin_username')
    }
    __caller.deleteUserLogin(byRest, o);
}

//Message: 获取端口信息
function call_GetPorts(byRest) {
    __caller.getPorts(byRest)
}

//Message: 添加工程
function call_AddProject(byRest) {
    let o = {
        path: getValue('e_AddProject_FullPath')
    }
    __caller.addProject(byRest, o);
}

//Message: 删除工程
function call_DeleteProject(byRest) {

    let o = {};
    let val = getValue('e_DeleteProject_ID');
    if (val == '') {
        log('Please enter the project ID or project name!', 'red')
        return;
    }
    if (/^\d+$/.test(val))
        o.id = parseInt(val);   //工程ID
    else
        o.name = val;           //工程名

    __caller.deleteProject(byRest, o);
}

//Message: 获取工程列表
function call_GetProjectList(byRest) {
    __caller.getProjectList(byRest);
}

//Message: 获取实例列表
function call_GetInstanceList(byRest) {

    let o = {
        details: getChecked('e_GetInstanceList_IncludeInstInfo'),
        connections: getChecked('e_GetInstanceList_IncludeConnInfo')
    }

    __caller.getInstanceList(byRest, o);
}

//Message: 获取指定实例的详细信息
function call_GetInstanceInformation(byRest) {

    let o = {
        id: getValue('e_GetInstanceInformation_IID')
    }
    __caller.getInstanceInformation(byRest, o);
}

//Message: 获取一个空闲的实例信息（正在运行或者尚未启动）
function call_GetOneFreeInstance(byRest) {

    let o = {}
    // let pid = getValue('e_GetOneFreeInstance_Pid');
    // if (pid != '')
    //     o.pid = pid;

    __caller.getOneFreeInstance(byRest, o);
}

//Message: 设置实例运行参数并启动
function call_SetInstanceParams(byRest) {

    let bAsync = !getChecked('e_SetInstP_Wait');
    let bQuiet = getChecked('e_SetInstP_Quiet');

    let o = {
        quiet: bQuiet ? bQuiet : null,     //传递null，生成 JSON字符串的时候就不会有quiet属性
        async: bAsync,                     //async参数是可选的，如果设置为true，那么立即返回结果，如果设置为false或者没有此参数，会等待实例启动结果，然后再返回
        startup: getChecked('e_SetInstP_Startup'),  //是否启动实例 
        restart: getChecked('e_SetInstP_Restart'),  //设置此参数后，如果实例未运行则会像startup参数一样启动实例；如果实例正在运行，则会重启实例
        staticInstance: {
            id: getValue('e_SetInstP_IID'),
            adjustResolution: getChecked('e_SetInstP_AdjustResolution'),
            limitOneClient: getChecked('e_SetInstP_LimitOneClient'),
            locked: getChecked('e_SetInstP_Lock'),
            pauseWhenIdle: getChecked('e_SetInstP_PauseWhenIdle'),
            websocketPort: getValue('e_SetInstP_WebSocketPort')
        }
    }

    //单独处理工程文件
    let project = getValue('e_SetInstP_Project');
    let projectId = parseInt(project);
    if (isNaN(projectId))
        o.staticInstance.project = project;
    else
        o.staticInstance.projectId = projectId;

    __caller.setInstanceParams(byRest, o);
}

//Message: 停止实例运行
function call_StopInstance(byRest) {

    let o = {
        id: getValue('e_StopInstance_IID')
    }
    __caller.stopInstance(byRest, o);
}

//Message: 根据实例ID停止指定实例的运行
function call_StopAllInstances(byRest) {
    let o = {
        id: getValue('e_StopNodeInstances_Id')
    }
    __caller.stopAllInstance(byRest, o);
}

//Message: 取消锁定
function call_UnlockInstance(byRest) {

    let o = {
        id: getValue('e_UnlockInstance_IID')
    }
    __caller.unlockInstance(byRest, o);
}

function call_AddUserAuth(byRest) {
    let o = {
        uid: getValue('e_ua_uid')
    }
    __caller.addUserAuth(byRest, o);
}

function call_DeleteUserAuth(byRest) {
    let o = {
        uid: getValue('e_delua_uid')
    }
    __caller.deleteUserAuth(byRest, o);
}

function call_GetUserAuthList(byRest) {
    __caller.getUserAuthList(byRest);
}