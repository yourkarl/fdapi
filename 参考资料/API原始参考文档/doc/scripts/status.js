var __dlgLogin;
var fistGetStatusOK = false;


function log(msg, color, noLineBreak) {
    let e = document.getElementById('logsArea');
    if (typeof msg == 'object') {
        msg = JSON.stringify(msg);
    }
    else if (typeof msg == 'undefined' || msg == '') {
        e.insertAdjacentHTML('beforeend', '\n');
    }
    else {
        color ||= 'gray';
        msg = color ? `<font color="${color}">` + msg + '</font>' : msg;
        e.insertAdjacentHTML('beforeend', msg + (noLineBreak ? '' : '\n'));
    }
    e.scrollTop = e.scrollHeight + 100;
}


//管理员登录
function call_login(username, password, captcha) {

    if (!username || username.trim().length == 0) {
        alert('用户名不能为空！');
        return;
    }

    if (!password || password.trim().length == 0) {
        alert('密码不能为空！');
        return;
    }

    if (__caller.captchRequired && (!captcha || captcha.trim().length == 0)) {
        alert('请输入验证码！');
        return;
    }

    __caller.login({ username, password, captcha }, o => {
        if (o.result == dts.ManageResult.OK) {
            log('Login successful!', 'green');
            $("#adminName").text(__caller.getAdminUsername() + ' 已登录');

            __dlgLogin.dialog('close');
            __caller.connectWebSocket();
        }
        else {
            let strResult = getManageResultString(o.result);
            log(strResult, 'red');
            alert(getManageResultString(o.result));
        }
    })
}


//获取状态
function call_getStatus() {
    $('#loading').show();
    __caller.getStatus(false);
}


$(function () {

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
        onopen: () => {
            call_getStatus();
        },
        onmessage: o => {
            if (o.result == dts.ManageResult.PermissionDenied) { //检查登录是否过期
                log('Interface call error: No permission! Please sign in: ', 'red');
                __dlgLogin.dialog('open');
                fistGetStatusOK = false;
            }
            if (o.command == dts.ManageCommand.GetStatus.command) {
                if (!fistGetStatusOK) {
                    fistGetStatusOK = true;
                    $('#loading').hide();
                }
                document.getElementById('logsArea').innerText = JSON.stringify(o, null, '\t');
            }
        },
        log: log,
        onCaptchaConfirmed: (loginRequired, captchaRequired) => {
            if (loginRequired) {
                __dlgLogin = $("#dlgLogin").dialog({ //初始化对话框：管理员登录
                    autoOpen: false,
                    height: captchaRequired ? 260 : 200,
                    width: captchaRequired ? 440 : 380,
                    modal: true,
                    buttons: {
                        "登录": function () {
                            call_login($('#e_Login_Username').val(), $('#e_Login_Password').val(), $('#e_Login_Captcha').val());
                        }
                    }
                });
                if (!__caller.getLocalAuthorization()) {
                    __dlgLogin.dialog('open');
                }
                else {
                    __caller.checkLogin(true, o => {
                        if (o.checkResult > 0)
                            __caller.connectWebSocket();
                        else
                            __dlgLogin.dialog('open');
                    })
                }
            }
            else {
                __caller.connectWebSocket();
            }
        }
    }, strRestUrl);
    __caller.initCaptcha('captchaPanel', 'loginCode')


})