
function onLoad() {
    document.getElementById('commonPageArea').innerHTML = getPageContent();
    onResize();
    init(true, 'main');
}

function onResize() {
    let mainTable = document.getElementById('mainTable');
    let leftPanel = document.getElementById('leftPanel');
    let infoPanel = document.getElementById('infoPanel');
    let codeEditor = document.getElementById('codeEditor');
    let player = document.getElementById('player');

    if (mainTable)
        mainTable.style.height = window.innerHeight + 'px';

    if (leftPanel) {
        let codeEditorRect = codeEditor.getBoundingClientRect();
        leftPanel.style.height = `${window.innerHeight - codeEditorRect.height - 126}px`;

        leftPanel.style.overflowY = 'auto';
        leftPanel.style.overflowX = 'hidden';

        codeEditor.style.width = `${leftPanel.clientWidth}px`;

        infoPanel.style.width = `${window.innerWidth - leftPanel.clientWidth - 18}px`;
        infoPanel.style.overflow = 'auto';

        player.style.width = `${window.innerWidth - leftPanel.clientWidth - 18}px`;
        player.style.height = `${window.innerHeight - infoPanel.clientHeight - 20}px`;
    }
}

window.addEventListener('load', onLoad, true);
window.addEventListener('resize', onResize, true);