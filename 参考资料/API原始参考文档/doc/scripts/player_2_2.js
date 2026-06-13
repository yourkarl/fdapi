var api1 = null;
var api2 = null;

function log(s, nnl, color) {
    if (color)
        s = `<font color="${color}">${s}</font>`;
    var e = document.getElementById('infoPanel');
    e.innerHTML += s + (nnl ? '' : '\n');
    e.scrollTop = e.scrollHeight + 100;
}

function initPlayer(callbackIndex) {
    let options = {
        domId: 'player1',
        keyEventTarget: 'none',
        apiOptions: {
            onLog: log
        },
        ui: {
            statusButton: true,
            fullscreenButton: true,
            homeButton: true
        }
    }
    api1 = (new DigitalTwinPlayer(HostConfig.Player, options)).getAPI();

    options.domId = 'player2';
    options.receiveRenderEvents = false;
    api2 = (new DigitalTwinPlayer(HostConfig.Player, options)).getAPI();
}


var play1UIVisible = true;
var play2UIVisible = true;

function callPlayer1() {
    play1UIVisible = !play1UIVisible;
    api1.misc.setMainUIVisibility(play1UIVisible)
}

function callPlayer2() {
    play2UIVisible = !play2UIVisible;
    api2.misc.setMainUIVisibility(play2UIVisible)
}


window.addEventListener("load", function () {
    initPlayer();
}, true);

window.addEventListener("resize", function () {
    var e = document.getElementById('infoPanel');
    e.style.height = (window.innerHeight - 470) + 'px';
}, true);