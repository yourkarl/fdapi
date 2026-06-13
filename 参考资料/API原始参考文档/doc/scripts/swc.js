var fdplayer;


function $(id) {
    return document.getElementById(id)
}

function setText(id, text) {
    $(id).style.display = 'block';
    $(id).innerText = text;
}

function setPos(id, pos) {
    $(id).style.display = 'block';
    $(id).style.left = pos[0] + 'px';
    $(id).style.top = pos[1] + 'px';
}

function formatDoubleArray(a) {
    let x = Number(a[0]).toFixed(2);
    let y = Number(a[1]).toFixed(2);

    if (a.length > 2) {
        let z = Number(a[2]).toFixed(2);
        return JSON.stringify([x, y, z]);
    }
    else
        return JSON.stringify([x, y]);
}


async function onReady() {

    fdplayer.getVideoElement().onclick = async function (e) {

        let res = await fdplayer.screen2World(e.offsetX, e.offsetY)
        setText('info_s2w', ' Screen2World: ' + JSON.stringify([e.offsetX, e.offsetY]) + ' -> ' + formatDoubleArray(res.worldLocation));

        fdapi.marker.clear();
        let o1 = {
            id: 'm1',
            coordinate: [res.worldLocation[0], res.worldLocation[1], res.worldLocation[2]],
            text: 'Screen2World',
            useTextAnimation: false,
            showLine: true,
            lineSize: [2, 100],
            displayMode: 2,
            occlusionCull: false//是否参与遮挡剔除
        };
        fdapi.marker.add(o1);
    }
}



async function onEvent(e) {

    if (e.eventtype == "LeftMouseButtonClick") {

        let pos = e.MouseClickPoint;
        let res = await fdplayer.world2Screen(pos[0], pos[1], pos[2])

        setText('info_w2s', ' Wolrd2Screen: ' + formatDoubleArray(pos) + ' -> ' + formatDoubleArray(res.screenPosition));
        setPos('pointer', res.screenPosition);
    }
}


function onResize() {
    let player = $('player');
    player.style.height = window.innerHeight + "px";
    player.style.width = window.innerWidth + "px";
}



function onLoaded() {
    fdplayer = new DigitalTwinPlayer(HostConfig.Player, {
        domId: 'player',
        apiOptions: {
            onReady: onReady,
            onEvent: onEvent
        },

        ui: {
            startupInfo: true,
            statusButton: true,
            fullscreenButton: true
        }
    });

    onResize();
}

window.addEventListener("load", onLoaded, true);
window.addEventListener('resize', onResize, true);



