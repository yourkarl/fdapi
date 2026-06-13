var cloudAPI;

//Render Video Stream
function render() {

    //Render the video stream by first destroying the existing acapi
    if (cloudAPI)
        cloudAPI.destroy();

    //username
    let urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username');
    if (!username) {
        let userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
        if (userLoginInfo)
            username = userLoginInfo.username;
    }

    //Get the cloud rendering host port configuration in the text dom
    let ip = document.getElementById("elemIP").value;
    let port = document.getElementById("elemPort").value;
    cloudAPI = new DigitalTwinPlayer(ip + ':' + port, {
        domId: 'player',
        urlExtraInfo: { username: username },
        events: {
            onLoginRequired: () => location.href = 'login.html?from=helloWorld'
        }
    }).getAPI();
}

//Set the camera position 
function setCamera() {
    //For more settings, please refer to the secondary development documentation
    //params：x, y, z, pitch, yaw, flyTime
    cloudAPI.camera.set(492035.37, 2488806.75, 402.62, -15.0, -173.0, 0.2);
}