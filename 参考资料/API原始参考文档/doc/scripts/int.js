
function onLoad() {
    document.getElementById('commonPageArea').innerHTML = getPageContent();
    let ip = '127.0.0.1';
    let port = 4321;
    if (HostConfig.API) {
        ip = HostConfig.API.split(':')[0];
        port = HostConfig.API.split(':')[1];
    }
    else {
        HostConfig.API = ip + ':' + port;
    }
    document.getElementById('txtIP').value = ip;
    document.getElementById('txtPort').value = port;

    onResize();
    init();
}

function onResize() {
    let mainTable = document.getElementById('mainTable');
    let leftPanel = document.getElementById('leftPanel');
    let infoPanel = document.getElementById('infoPanel');
    let codeEditor = document.getElementById('codeEditor');

    mainTable.style.height = window.innerHeight + 'px';
    let codeEditorRect = codeEditor.getBoundingClientRect();

    leftPanel.style.width = "600px";
    leftPanel.style.height = `${window.innerHeight - 72}px`;
    leftPanel.style.overflow = 'auto';

    infoPanel.style.width = `${window.innerWidth - leftPanel.clientWidth - 30}px`;
    infoPanel.style.height = `${window.innerHeight - codeEditorRect.height - 88}px`;
    infoPanel.style.overflow = 'auto';

    codeEditor.style.width = `${window.innerWidth - leftPanel.clientWidth - 30}px`;
}

window.addEventListener('load', onLoad, true);
window.addEventListener('resize', onResize, true);