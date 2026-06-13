var cloudAPI;
var __mainUIVisible = true;

function refresh() {
    location.reload(true);
}

function onReady() {
    cloudAPI.settings.setMainUIVisibility(false);
    __mainUIVisible = false;

    document.getElementById('btnConnect').disabled = true;
    document.getElementById('textPort').disabled = true;
    document.getElementById('btnShowHideMainUI').disabled = false;
}

function log(s, nnl) {
    var e = document.getElementById('infoPanel');
    e.innerHTML += (s + (nnl ? '' : '\n'));
    e.scrollTop = e.scrollHeight + 100;
}

function logWithColor(color, text, nnl) {
    log(`<font color="${color}">${text}</font>`, nnl);
}

function showHideMainUI() {
    __mainUIVisible = !__mainUIVisible;
    cloudAPI.settings.setMainUIVisibility(__mainUIVisible);
}

function showHideInfoPanel() {
    let infoPanel = document.getElementById('infoPanel');
    if (infoPanel.style.display != 'none')
        infoPanel.style.display = 'none';
    else
        infoPanel.style.display = 'block';
}

function onLoad() {
    onResize();
    $('.nstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "value_changed_callback": function (cause, leftValue, rightValue) {
            let color = `rgba(255,255,255,${leftValue / 100.0})`;
            let elem = $(this).attr('for');
            if (elem == 'body') {
                document.body.style.backgroundColor = color;
                $("#bodyTrans").text(leftValue / 100.0);
            }
            else if (elem == 'infoPanel') {
                let infoPanel = document.getElementById('infoPanel');
                infoPanel.style.backgroundColor = color;
                $("#infoPanelTrans").text(leftValue / 100.0);
            }
        }
    });
}

function connect() {
    if (!textPort.value) {
        logWithColor('red', 'WebSocket port number cannot be empty!')
        return;
    }
    let host = '127.0.0.1:' + textPort.value;
    cloudAPI = new DigitalTwinAPI(host, { onReady: onReady, onLog: log });
}

function onResize() {
    let infoPanel = document.getElementById('infoPanel');
    infoPanel.style.left = (window.innerWidth - 510) + 'px';
    infoPanel.style.height = (window.innerHeight - 50) + 'px';
}

window.addEventListener('load', onLoad, true);
window.addEventListener('resize', onResize, true);
