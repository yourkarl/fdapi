
function getPageContent() {

    var s = `<div id="leftPanel">       
        <div id="pcs">
        <p id="pcsNav" style="text-align:left;font-size:22px;color:#0063e4;font-weight:bold;">投影坐标系API示例代码</p>

        <!-- 内置全局类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">内置全局类对象</p>
        <div id="a_DigitalTwinPlayer" >
            <img width="24" height="24" src="images/player.png" /><strong>&nbsp;视频流初始化：DigitalTwinPlayer</strong>
            <br> &emsp;
            <a href="doc/DigitalTwinPlayer.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_player_setInstanceOptions"  href="javascript:call(test_player_setInstanceOptions)"><font color="#555">设置实例参数：</font>SetInstanceOptions</a><br> &emsp;
            <a id="test_player_fullscreen"  href="javascript:call(test_player_fullscreen)"><font color="#555">全屏显示：</font>Fullscreen</a><br> &emsp;
        </div>  

        <div id="a_DigitalTwinAPI" >
            <img width="24" height="24" src="images/acp.png" /><strong>&nbsp;API初始化：DigitalTwinAPI</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/DigitalTwinAPI.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ac_getVersion"  href="javascript:call(test_ac_getVersion)" class="tip-hotspot" data-tip="获取SDK完整版本号">GetVersion</a> &emsp;
            <a id="test_ac_reset"  href="javascript:call(test_ac_reset)" class="tip-hotspot" data-tip="重置场景到刚打开工程的状态">Reset</a> &emsp;
            <a id="test_ac_saveProject"  href="javascript:call(test_ac_saveProject)" class="tip-hotspot" data-tip="保存场景">SaveProject</a> &emsp;
            <a id="test_ac_getProjectInfo"  href="javascript:call(test_ac_getProjectInfo)" class="tip-hotspot" data-tip="获取工程信息">GetProjectInfo</a> &emsp;
            
            <a id="test_ac_destroy"  href="javascript:call(test_ac_destroy)" class="tip-hotspot" data-tip="断开API和视频流">Destroy</a><br> &emsp;
            <a id="test_ac_registerTick"  href="javascript:call(test_ac_registerTick)" class="tip-hotspot" data-tip="注册每帧调用JS">RegisterTick</a> &emsp;            
            <a id="test_ac_removeTick"  href="javascript:call(test_ac_removeTick)" class="tip-hotspot" data-tip="移除每帧调用JS">RemoveTick</a>&emsp;          
            <a id="test_ac_showTickWindow"  href="javascript:call(test_ac_showTickWindow)" class="tip-hotspot" data-tip="显示/隐藏tick调试窗口">ShowTickWindow</a>&emsp;          
            <a id="test_ac_executeJsInTickPage"  href="javascript:call(test_ac_executeJsInTickPage)" class="tip-hotspot" data-tip="在tick页面里执行Javascript代码">ExecuteJsInTickPage</a><br>&emsp;          
        </div>

        
        <div id="a_Camera">
            <img width="24" height="24" src="images/camera.png" /><strong>&nbsp;相机操作：Camera</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Camera.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_camera_get"  href="javascript:call(test_camera_get)"><font color="#555">获取相机位置：</font>Get</a><br> &emsp;
            <a id="test_camera_set"  href="javascript:call(test_camera_set)"><font color="#555">设置相机位置：</font>Set</a><br> &emsp;

            <a id="test_camera_lockBBox"  href="javascript:call(test_camera_lockBBox)"><font color="#555">锁定相机交互范围：</font>LockByBBox</a><br> &emsp;
            <a id="test_camera_unLockBBox"  href="javascript:call(test_camera_unLockBBox)"><font color="#555">解锁相机交互范围：</font>UnLock</a><br> &emsp;

            <a id="test_camera_getEulerAngle"  href="javascript:call(test_camera_getEulerAngle)"><font color="#555">获取两点的欧拉角：</font>GetEulerAngle</a><br> &emsp;
            <a id="test_camera_set_byArray"  href="javascript:call(test_camera_set_byArray)"><font color="#555">设置相机位置（通过数组参数）：</font>Set</a><br> &emsp;
            <a id="test_camera_set_byObject"  href="javascript:call(test_camera_set_byObject)"><font color="#555">设置相机位置（通过对象参数）：</font>Set</a><br> &emsp;
            <a id="test_camera_lookAt"  href="javascript:call(test_camera_lookAt)"><font color="#555">通过观察点设置相机位置：</font>LookAt</a><br> &emsp;
            
            <a id="test_camera_flyAround"  href="javascript:call(test_camera_flyAround)"><font color="#555">设置相机环绕：</font>FlyAround</a><br> &emsp;

            <a id="test_camera_lookAtBBox2"  href="javascript:call(test_camera_lookAtBBox2)"><font color="#555">进入物体观察模式：</font>LookAtBBox</a><br> &emsp;
            <a id="test_camera_lookAtBBox1"  href="javascript:call(test_camera_lookAtBBox1)"><font color="#555">进入自由交互模式：</font>LookAtBBox</a><br> &emsp;

            <a id="test_camera_getAnimationList"  href="javascript:call(test_camera_getAnimationList)"><font color="#555">获取导览列表：</font>GetAnimationList</a><br> &emsp;
            <a id="test_camera_getAnimationImage"  href="javascript:call(test_camera_getAnimationImage)"><font color="#555">获取导览缩略图：</font>GetAnimationImage</a><br> &emsp;
            <a id="test_camera_playAnimation"  href="javascript:call(test_camera_playAnimation)"><font color="#555">开始播放动画导航：</font>PlayAnimation</a><br> &emsp;
            <a id="test_camera_pauseAnimation"  href="javascript:call(test_camera_pauseAnimation)"><font color="#555">暂停播放动画导航：</font>PauseAnimation</a><br> &emsp;
            <a id="test_camera_resumeAnimation"  href="javascript:call(test_camera_resumeAnimation)"><font color="#555">恢复播放动画导航：</font>ResumeAnimation</a><br> &emsp;
            <a id="test_camera_stopAnimation"  href="javascript:call(test_camera_stopAnimation)"><font color="#555">停止播放动画导航：</font>StopAnimation</a><br><br> &emsp;

            <a id="test_camera_exportOrthoImage"  href="javascript:call(test_camera_exportOrthoImage)"><font color="#555">导出正交投影图片：</font>ExportOrthoImage</a><br><br> &emsp;


            <a id="test_camera_enterWorld"  href="javascript:call(test_camera_enterWorld)"><font color="#555">进入世界：</font>EnterWorld</a><br> &emsp;
            <a id="test_camera_exitWorld"  href="javascript:call(test_camera_exitWorld)"><font color="#555">退出世界：</font>ExitWorld</a><br><br> &emsp;

            <a id="test_camera_cancelFollow"  href="javascript:call(test_camera_cancelFollow)"><font color="#555">取消相机跟随：</font>CancelFollow</a><br><br> &emsp;

            <a id="test_camera_moveForward"  href="javascript:call(test_camera_moveForward)"><font color="#555">相机控制-前进：</font>MoveForward</a><br> &emsp;
            <a id="test_camera_moveBackward"  href="javascript:call(test_camera_moveBackward)"><font color="#555">相机控制-后退：</font>MoveBackward</a><br> &emsp;
            <a id="test_camera_moveLeft"  href="javascript:call(test_camera_moveLeft)"><font color="#555">相机控制-左移：</font>MoveLeft</a><br> &emsp;
            <a id="test_camera_moveRight"  href="javascript:call(test_camera_moveRight)"><font color="#555">相机控制-右移：</font>MoveRight</a><br> &emsp;
            <a id="test_camera_moveUp"  href="javascript:call(test_camera_moveUp)"><font color="#555">相机控制-上升：</font>MoveUp</a><br> &emsp;
            <a id="test_camera_moveDown"  href="javascript:call(test_camera_moveDown)"><font color="#555">相机控制-下降：</font>MoveDown</a><br> &emsp;
            <a id="test_camera_turnLeft"  href="javascript:call(test_camera_turnLeft)"><font color="#555">相机控制-左转：</font>TurnLeft</a><br> &emsp;
            <a id="test_camera_turnRight"  href="javascript:call(test_camera_turnRight)"><font color="#555">相机控制-右转：</font>TurnRight</a><br> &emsp;
            <a id="test_camera_turnUp"  href="javascript:call(test_camera_turnUp)"><font color="#555">相机控制-抬头：</font>TurnUp</a><br> &emsp;
            <a id="test_camera_turnDown"  href="javascript:call(test_camera_turnDown)"><font color="#555">相机控制-低头：</font>TurnDown</a><br> &emsp;
            <a id="test_camera_stop"  href="javascript:call(test_camera_stop)"><font color="#555">相机控制-停止：</font>Stop</a><br> &emsp;
        </div>

        <div id="a_EditHelper">
            <img width="24" height="24" src="images/cb.png" /><strong>&nbsp;绘制助手：EditHelper</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/EditHelper.html" target="_blank">API帮助</a> &emsp;
            <a id="test_editHelper_setParam"  href="javascript:call(test_editHelper_setParam)" class="tip-hotspot" data-tip="设置参数">SetParam</a> &emsp;
            <a id="test_editHelper_start"  href="javascript:call(test_editHelper_start)" class="tip-hotspot" data-tip="开始编辑">Start</a> &emsp;
            <a id="test_editHelper_cancel"  href="javascript:call(test_editHelper_cancel)" class="tip-hotspot" data-tip="取消编辑">Cancel</a> &emsp;
            <a id="test_editHelper_finish"  href="javascript:call(test_editHelper_finish)" class="tip-hotspot" data-tip="完成编辑">Finish</a> &emsp;
        </div>

        <div id="a_Coord" >
            <img width="24" height="24" src="images/coord.png" /><strong>&nbsp;坐标转换：Coord</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Coord.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_coord_screen2World"  href="javascript:call(test_coord_screen2World)"><font color="#555">屏幕坐标转为世界坐标：</font>Screen2World</a><br> &emsp;
            <a id="test_coord_world2Screen"  href="javascript:call(test_coord_world2Screen)"><font color="#555">世界坐标转为屏幕坐标：</font>World2Screen</a><br> &emsp;
            <a id="test_coord_pcs2gcs"  href="javascript:call(test_coord_pcs2gcs)"><font color="#555">投影坐标转为地理坐标：</font>PCS2GCS</a><br> &emsp;
            <a id="test_coord_gcs2pcs"  href="javascript:call(test_coord_gcs2pcs)"><font color="#555">地理坐标转为投影坐标：</font>GCS2PCS</a><br> &emsp;
        </div>

        <div id="a_InfoTree" >
            <img width="24" height="24" src="images/layers.png" /><strong>&nbsp;图层树：InfoTree</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/InfoTree.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_layers_focus"  href="javascript:call(test_layers_focus)"><font color="#555">定位图层：</font>Focus</a><br> &emsp;   
            <a id="test_layers_hide"  href="javascript:call(test_layers_hide)"><font color="#555">隐藏图层：</font>Hide</a><br> &emsp;   
            <a id="test_layers_show"  href="javascript:call(test_layers_show)"><font color="#555">显示图层：</font>Show</a><br> &emsp;   
            <a id="test_layers_get"  href="javascript:call(test_layers_get)"><font color="#555">获取图层树信息：</font>Get</a><br><br> &emsp;

            <a id="test_layers_getBPFunction"  href="javascript:call(test_layers_getBPFunction)"><font color="#555">查询图层树上对象的蓝图函数：</font>GetBPFunction</a><br> &emsp;   
            <a id="test_layers_callBPFunction"  href="javascript:call(test_layers_callBPFunction)"><font color="#555">调用图层树上对象的蓝图函数：</font>CallBPFunction</a><br><br> &emsp;   

        </div>

        <div id="a_Weather" >
            <img width="24" height="24" src="images/weather.png" /><strong>&nbsp;天气环境：Weather</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Weather.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_weather_getParams"  href="javascript:call(test_weather_getParams)"><font color="#555">获取天气参数：</font>GetParams</a><br> &emsp;
            <a id="test_weather_getDateTime"  href="javascript:call(test_weather_getDateTime)"><font color="#555">获取日期时间：</font>GetDateTime</a><br> &emsp;

            <a id="test_weather_setSunIntensity"  href="javascript:call(test_weather_setSunIntensity)"><font color="#555">设置太阳光照强度：</font>SetSunIntensity</a><br> &emsp;
            <a id="test_weather_setMoonIntensity"  href="javascript:call(test_weather_setMoonIntensity)"><font color="#555">设置月亮光照强度：</font>SetMoonIntensity</a><br> &emsp;

            <a id="test_weather_setSunSize"  href="javascript:call(test_weather_setSunSize)"><font color="#555">设置太阳尺寸：</font>SetSunSize</a><br> &emsp;
            <a id="test_weather_setSunColor"  href="javascript:call(test_weather_setSunColor)"><font color="#555">设置太阳颜色：</font>SetSunColor</a><br> &emsp;
            <a id="test_weather_setMoonSize"  href="javascript:call(test_weather_setMoonSize)"><font color="#555">设置月亮尺寸：</font>SetMoonSize</a><br> &emsp;


            <a id="test_weather_setAmbientLightIntensity"  href="javascript:call(test_weather_setAmbientLightIntensity)"><font color="#555">设置环境光强度：</font>SetAmbientLightIntensity</a><br> &emsp;
            <a id="test_weather_setTemperature"  href="javascript:call(test_weather_setTemperature)"><font color="#555">设置色温值：</font>SetTemperature</a><br><br> &emsp;

            <a id="test_weather_setShadowIntensity"  href="javascript:call(test_weather_setShadowIntensity)"><font color="#555">设置阴影强度：</font>SetShadowIntensity</a><br> &emsp;
            <a id="test_weather_setShadowQuality"  href="javascript:call(test_weather_setShadowQuality)"><font color="#555">设置阴影质量：</font>SetShadowQuality</a><br> &emsp;
            <a id="test_weather_setShadowDistance"  href="javascript:call(test_weather_setShadowDistance)"><font color="#555">设置阴影可视距离：</font>SetShadowDistance</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            <a id="test_weather_setDateTime"  href="javascript:call(test_weather_setDateTime)"><font color="#555">设置日期时间：</font>SetDateTime</a><br> &emsp;
            <a id="test_weather_setRainParam"  href="javascript:call(test_weather_setRainParam)"><font color="#555">设置下雨效果：</font>SetRainParam</a><br> &emsp;
            <a id="test_weather_setSnowParam"  href="javascript:call(test_weather_setSnowParam)"><font color="#555">设置下雪效果：</font>SetSnowParam</a><br> &emsp;
            <a id="test_weather_disableRainSnow"  href="javascript:call(test_weather_disableRainSnow)"><font color="#555">禁用雨雪效果：</font>DisableRainSnow</a><br> &emsp;
            <a id="test_weather_setFogParam"  href="javascript:call(test_weather_setFogParam)"><font color="#555">设置雾效：</font>SetFogParam</a><br> &emsp;
            <a id="test_weather_setCloudDensity"  href="javascript:call(test_weather_setCloudDensity)"><font color="#555">设置云层密度：</font>SetCloudDensity</a><br> &emsp;
            <a id="test_weather_setCloudThickness"  href="javascript:call(test_weather_setCloudThickness)"><font color="#555">设置云层厚度：</font>SetCloudThickness</a><br> &emsp;
            
            <a id="test_weather_setSkyVisibleMaxHeight"  href="javascript:call(test_weather_setSkyVisibleMaxHeight)"><font color="#555">设置天空球效果的失效高度：</font>SetSkyVisibleMaxHeight</a><br><br> &emsp;

            <a id="test_weather_setCloudParam"  href="javascript:call(test_weather_setCloudParam)"><font color="#555">设置云效参数：</font>SetCloudParam</a><br> &emsp;
            <a id="test_weather_setLowCloud"  href="javascript:call(test_weather_setLowCloud)"><font color="#555">设置低云层参数：</font>SetLowCloud</a><br> &emsp;
            <a id="test_weather_setHighCloud"  href="javascript:call(test_weather_setHighCloud)"><font color="#555">设置高云层参数：</font>SetHighCloud</a><br><br> &emsp;

            <a id="test_weather_setRayleighScatterCoeff"  href="javascript:call(test_weather_setRayleighScatterCoeff)"><font color="#555">设置大气环境的瑞利散射系数：</font>SetRayleighScatter</a><br><br> &emsp;

            <a id="test_weather_setDarkMode"  href="javascript:call(test_weather_setDarkMode)"><font color="#555">设置黑暗模式：</font>SetDarkMode</a><br> &emsp;
            <a id="test_weather_simulateTime"  href="javascript:call(test_weather_simulateTime)"><font color="#555">模拟时间播放：</font>SimulateTime</a><br><br> &emsp;

            <a id="test_weather_setOceanWave"  href="javascript:call(test_weather_setOceanWave)"><font color="#555">设置海浪参数：</font>SetOceanWave</a><br> &emsp;
            <a id="test_weather_getOceanWave"  href="javascript:call(test_weather_getOceanWave)"><font color="#555">查询海浪参数：</font>GetOceanWave</a><br><br> &emsp;
            
        </div>

        <div id="a_Tools" >
            <img width="24" height="24" src="images/tools.png" /><strong>&nbsp;系统工具：Tools</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Tools.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_tools_startPolygonClip"  href="javascript:call(test_tools_startPolygonClip)"><font color="#555">多边形剖切：</font>StartPolygonClip</a><br> &emsp;
            <a id="test_tools_stopPolygonClip"  href="javascript:call(test_tools_stopPolygonClip)"><font color="#555">停止多边形剖切：</font>StopPolygonClip</a><br><br> &emsp;

            <a id="test_tools_startPlaneClip"  href="javascript:call(test_tools_startPlaneClip)"><font color="#555">开始面剖切：</font>StartPlaneClip</a><br> &emsp;
            <a id="test_tools_stopPlaneClip"  href="javascript:call(test_tools_stopPlaneClip)"><font color="#555">停止面剖切：</font>StopPlaneClip</a><br><br> &emsp;

            <a id="test_tools_startVolumeClip"  href="javascript:call(test_tools_startVolumeClip)"><font color="#555">开始体剖切：</font>StartVolumeClip</a><br> &emsp;
            <a id="test_tools_updateVolumeClip"  href="javascript:call(test_tools_updateVolumeClip)"><font color="#555">更新体剖切：</font>UpdateVolumeClip</a><br> &emsp;
            <a id="test_tools_stopVolumeClip"  href="javascript:call(test_tools_stopVolumeClip)"><font color="#555">停止体剖切：</font>StopVolumeClip</a><br><br> &emsp;

            <a id="test_tools_startMeasurement"  href="javascript:call(test_tools_startMeasurement)"><font color="#555">进入测量模式并开始测量：</font>StartMeasurement</a><br> &emsp;
            <a id="test_tools_startMeasurement1"  href="javascript:call(test_tools_startMeasurement1)"><font color="#555">根据坐标值直接测量结果：</font>StartMeasurement</a><br> &emsp;
            <a id="test_tools_stopMeasurement"  href="javascript:call(test_tools_stopMeasurement)"><font color="#555">停止测量：</font>StopMeasurement</a><br><br> &emsp;

            <a id="test_tools_lineIntersect"  href="javascript:call(test_tools_lineIntersect)"><font color="#555">单条线段求交：</font>LineIntersect</a><br> &emsp;
            <a id="test_tools_linesIntersect"  href="javascript:call(test_tools_linesIntersect)"><font color="#555">多条线段求交：</font>LinesIntersect</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            <a id="test_tools_startGeometryEdit"  href="javascript:call(test_tools_startGeometryEdit)"><font color="#555">顶点编辑：</font>StartGeometryEdit</a><br> &emsp;
            <a id="test_tools_stopGeometryEdit"  href="javascript:call(test_tools_stopGeometryEdit)"><font color="#555">退出顶点编辑：</font>StopGeometryEdit</a><br><br> &emsp;

            <a id="test_tools_startSkylineAnalysis"  href="javascript:call(test_tools_startSkylineAnalysis)"><font color="#555">开始天际线分析：</font>StartSkylineAnalysis</a><br> &emsp;
            <a id="test_tools_stopSkylineAnalysis"  href="javascript:call(test_tools_stopSkylineAnalysis)"><font color="#555">停止天际线分析：</font>StopSkylineAnalysis</a><br> &emsp;
            <a id="test_tools_exportSkyline"  href="javascript:call(test_tools_exportSkyline)"><font color="#555">导出天际线：</font>ExportSkyline</a><br><br> &emsp;


            <a id="test_tools_startViewshedAnalysis"  href="javascript:call(test_tools_startViewshedAnalysis)"><font color="#555">开始视域分析：</font>StartViewshedAnalysis</a><br> &emsp;
            <a id="test_tools_stopViewshedAnalysis"  href="javascript:call(test_tools_stopViewshedAnalysis)"><font color="#555">停止视域分析：</font>StopViewshedAnalysis</a><br><br> &emsp;


            <a id="test_tools_startFloodFill"  href="javascript:call(test_tools_startFloodFill)"><font color="#555">开始水淹分析：</font>StartFloodFill</a><br> &emsp;
            <a id="test_tools_stopFloodFill"  href="javascript:call(test_tools_stopFloodFill)"><font color="#555">停止水淹分析：</font>StopFloodFill</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            <a id="test_tools_startVisiblityAnalysis"  href="javascript:call(test_tools_startVisiblityAnalysis)"><font color="#555">开始通视分析：</font>StartVisiblityAnalysis</a><br> &emsp;
            <a id="test_tools_stopVisiblityAnalysis"  href="javascript:call(test_tools_stopVisiblityAnalysis)"><font color="#555">停止通视分析：</font>StopVisiblityAnalysis</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

            <a id="test_tools_startViewDomeAnalysis"  href="javascript:call(test_tools_startViewDomeAnalysis)"><font color="#555">开始开敞度分析：</font>StartViewDomeAnalysis</a><br> &emsp;
            <a id="test_tools_stopViewDomeAnalysis"  href="javascript:call(test_tools_stopViewDomeAnalysis)"><font color="#555">停止开敞度分析：</font>StopViewDomeAnalysis</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            <a id="test_tools_startCutFillAnalysis"  href="javascript:call(test_tools_startCutFillAnalysis)"><font color="#555">开始填挖方分析：</font>StartCutFillAnalysis</a><br> &emsp;
            <a id="test_tools_stopCutFillAnalysis"  href="javascript:call(test_tools_stopCutFillAnalysis)"><font color="#555">停止填挖方分析：</font>StopCutFillAnalysis</a><br><br> &emsp;   

            <a id="test_tools_startSunshineAnalysis"  href="javascript:call(test_tools_startSunshineAnalysis)"><font color="#555">开始日照分析：</font>StartSunshineAnalysis</a><br> &emsp;
            <a id="test_tools_stopSunshineAnalysis"  href="javascript:call(test_tools_stopSunshineAnalysis)"><font color="#555">停止日照分析：</font>StopSunshineAnalysis</a><br><br> &emsp;    

            <a id="test_tools_startTerrainSlopeAnalysis"  href="javascript:call(test_tools_startTerrainSlopeAnalysis)"><font color="#555">开始坡度坡向分析：</font>StartTerrainSlopeAnalysis</a><br> &emsp;
            <a id="test_tools_stopTerrainSlopeAnalysis"  href="javascript:call(test_tools_stopTerrainSlopeAnalysis)"><font color="#555">停止坡度坡向分析：</font>StopTerrainSlopeAnalysis</a><br><br> &emsp;    

            <a id="test_tools_startContourLineAnalysis"  href="javascript:call(test_tools_startContourLineAnalysis)"><font color="#555">开始等高线分析：</font>StartContourLineAnalysis</a><br> &emsp;
            <a id="test_tools_stopContourLineAnalysis"  href="javascript:call(test_tools_stopContourLineAnalysis)"><font color="#555">停止等高线分析：</font>StopContourLineAnalysis</a><br><br> &emsp;   
         
            <a id="test_tools_riverCrossSectionByShp"  href="javascript:call(test_tools_riverCrossSectionByShp)"><font color="#555">根据shp计算河道横断面：</font>RiverCrossSectionByShp</a><br> &emsp;
            <a id="test_tools_riverCrossSection"  href="javascript:call(test_tools_riverCrossSection)"><font color="#555">根据河道点计算河道横断面：</font>RiverCrossSection</a><br><br> &emsp;


            <a id="test_tools_showUIPanel"  href="javascript:call(test_tools_showUIPanel)"><font color="#555">显示操作面板：</font>ShowUIPanel</a><br> &emsp;
            <a id="test_tools_showMeasurePanel"  href="javascript:call(test_tools_showMeasurePanel)"><font color="#555">显示测量面板：</font>ShowMeasurePanel</a><br> &emsp;
            <a id="test_tools_showClipPanel"  href="javascript:call(test_tools_showClipPanel)"><font color="#555">显示剖切面板：</font>ShowClipPanel</a><br> &emsp;
            <a id="test_tools_hideUIPanel"  href="javascript:call(test_tools_hideUIPanel)"><font color="#555">隐藏操作面板状态：</font>HideUIPanel</a><br>  &emsp;
            <a id="test_tools_getUIPanel"  href="javascript:call(test_tools_getUIPanel)"><font color="#555">查询操作面板状态：</font>GetUIPanel</a><br><br>  &emsp;
           
            
            <a id="test_tools_replaceTextureByVideo"  href="javascript:call(test_tools_replaceTextureByVideo)"><font color="#555">使用视频流替换纹理：</font>ReplaceTextureByVideo</a><br> &emsp;   
            <a id="test_tools_replaceTextureByImage"  href="javascript:call(test_tools_replaceTextureByImage)"><font color="#555">使用图片替换纹理：</font>ReplaceTextureByImage</a><br> &emsp;   
            <a id="test_tools_replaceTextureByUrl"  href="javascript:call(test_tools_replaceTextureByUrl)"><font color="#555">使用网页替换纹理：</font>ReplaceTextureByUrl</a><br> &emsp;   
            <a id="test_tools_restoreTexture"  href="javascript:call(test_tools_restoreTexture)"><font color="#555">恢复纹理：</font>RestoreTexture</a><br> &emsp;   
        </div>

        <div id="a_Settings">
            <img width="24" height="24" src="images/settings.png" /><strong>&nbsp;系统设置：Settings</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Settings.html" target="_blank">API帮助</a><br> &emsp;
                
            <br>
            <b>系统UI：<br></b>&emsp;
            <a id="test_settings_setMainUIVisibility"  href="javascript:call(test_settings_setMainUIVisibility)"><font color="#555">显示|隐藏主界面UI：</font>SetMainUIVisibility</a><br> &emsp;
            <a id="test_settings_setJoystickVisible"  href="javascript:call(test_settings_setJoystickVisible)"><font color="#555">显示|隐藏操纵杆UI：</font>SetScreenControlsVisible</a><br> &emsp;
            
            <a id="test_settings_setToolbarVisible"  href="javascript:call(test_settings_setToolbarVisible)"><font color="#555">显示|隐藏右侧工具栏：</font>SetToolbarVisible</a><br> &emsp;
        
            <a id="test_setings_setMainPanelPos"  href="javascript:call(test_setings_setMainPanelPos)"><font color="#555">设置资源面板位置偏移：</font>SetMainPanelPos</a><br> &emsp;  
            <a id="test_setings_showPropertiesPanel"  href="javascript:call(test_setings_showPropertiesPanel)"><font color="#555">显示图层树上对象的属性面板：</font>ShowPropertiesPanel</a><br> &emsp;  
            <a id="test_setings_hidePropertiesPanel"  href="javascript:call(test_setings_hidePropertiesPanel)"><font color="#555">隐藏图层树上对象的属性面板：</font>HidePropertiesPanel</a><br> &emsp;  
            <a id="test_setings_setPropertiesPanelPos"  href="javascript:call(test_setings_setPropertiesPanelPos)"><font color="#555">设置图层树上对象属性面板的位置偏移：</font>SetPropertiesPanelPos</a><br> &emsp;  

            
            <a id="test_settings_setCampassVisible"  href="javascript:call(test_settings_setCampassVisible)"><font color="#555">显示|隐藏指北针：</font>SetCampassVisible</a><br> &emsp;
            <a id="test_settings_setCampassPosition"  href="javascript:call(test_settings_setCampassPosition)"><font color="#555">设置指北针位置：</font>SetCampassPosition</a><br> &emsp;
            
            <br>
            <b>相机：<br></b>&emsp;
            <a id="test_settings_setEnableCameraMovingEvent"  href="javascript:call(test_settings_setEnableCameraMovingEvent)"><font color="#555">开启相机事件：</font>SetEnableCameraMovingEvent</a><br> &emsp;
            <a id="test_settings_setFovX"  href="javascript:call(test_settings_setFovX)"><font color="#555">设置相机水平视场角：</font>SetFovX</a><br> &emsp;
            <a id="test_settings_setNearClipPlane"  href="javascript:call(test_settings_setNearClipPlane)"><font color="#555">设置相机近裁距离：</font>SetNearClipPlane</a><br> &emsp;
            <a id="test_settings_setMinCameraHeight"  href="javascript:call(test_settings_setMinCameraHeight)"><font color="#555">设置相机最小高度：</font>SetMinCameraHeight</a><br> &emsp;
            <a id="test_settings_setMaxCameraHeight"  href="javascript:call(test_settings_setMaxCameraHeight)"><font color="#555">设置相机最大高度：</font>SetMaxCameraHeight</a><br> &emsp;


            <br>
            <b>鼠标：<br></b>&emsp;
            <a id="test_settings_setMousePickMask"  href="javascript:call(test_settings_setMousePickMask)"><font color="#555">开启鼠标事件：</font>SetMousePickMask</a><br> &emsp;
            <a id="test_settings_setMouseHoverTime"  href="javascript:call(test_settings_setMouseHoverTime)"><font color="#555">设置鼠标悬浮事件返回的时间间隔：</font>SetMouseHoverTime</a><br> &emsp;
            <a id="test_settings_setMouseMoveTime"  href="javascript:call(test_settings_setMouseMoveTime)"><font color="#555">设置鼠标移动事件返回的时间间隔：</font>SetMouseMoveTime</a><br> &emsp;
            <a id="test_settings_setCursorAutoSync"  href="javascript:call(test_settings_setCursorAutoSync)"><font color="#555">设置渲染端鼠标显示：</font>SetRenderedCursorVisible</a><br> &emsp;
            <a id="test_settings_enableMouseRightClick"  href="javascript:call(test_settings_enableMouseRightClick)"><font color="#555">开启鼠标右键点击拾取：</font>EnableRightClickMousePick</a><br> &emsp;
            <a id="test_settings_setAutoRotateOnRightDoubleClick"  href="javascript:call(test_settings_setAutoRotateOnRightDoubleClick)"><font color="#555">设置双击鼠标右键是否控制相机自转：</font>SetCameraAutoRotateOnRightDoubleClick</a><br> &emsp;
            
            <br>
            <b>地图模式：<br></b>&emsp;
            <a id="test_settings_setMapMode"  href="javascript:call(test_settings_setMapMode)"><font color="#555">设置地图模式：</font>SetMapMode</a><br> &emsp;
            <a id="test_settings_getMapMode"  href="javascript:call(test_settings_getMapMode)"><font color="#555">获取地图模式：</font>GetMapMode</a><br> &emsp;

            <br>
            <b>交互控制：<br></b>&emsp;
            <a id="test_settings_setEnableInteract"  href="javascript:call(test_settings_setEnableInteract)"><font color="#555">设置交互开关：</font>SetEnableInteract</a><br> &emsp;
            <a id="test_settings_setCharacterRoaming"  href="javascript:call(test_settings_setCharacterRoaming)"><font color="#555">设置人物漫游：</font>SetCharacterRoaming</a><br><br> &emsp;
            
            <a id="test_settings_setRoleGender"  href="javascript:call(test_settings_setRoleGender)"><font color="#555">设置第三人称角色性别：</font>SetRoleGender</a><br> &emsp;
            <a id="test_settings_setRoamViewMode"  href="javascript:call(test_settings_setRoamViewMode)"><font color="#555">设置漫游视角：</font>SetRoamViewModeractiveMode</a><br><br> &emsp;
            

            <a id="test_settings_setInteractiveMode"  href="javascript:call(test_settings_setInteractiveMode)"><font color="#555">设置交互模式：</font>SetInteractiveMode</a><br> &emsp;
            <a id="test_settings_getInteractiveMode"  href="javascript:call(test_settings_getInteractiveMode)"><font color="#555">获取交互模式：</font>GetInteractiveMode</a><br><br> &emsp;
            
            <a id="test_settings_setMoveSpeed"  href="javascript:call(test_settings_setMoveSpeed)"><font color="#555">设置交互移动速度：</font>SetMoveSpeed</a><br> &emsp;
            <a id="test_settings_setYawSpeed"  href="javascript:call(test_settings_setYawSpeed)"><font color="#555">设置视角旋转速度：</font>SetYawSpeed</a><br><br> &emsp;


            <a id="test_settings_setCharacterAssetPath"  href="javascript:call(test_settings_setCharacterAssetPath)"><font color="#555">角色漫游下设置人物模型：</font>SetCharacterAssetPath</a><br> &emsp;
            <a id="test_settings_setDroneAssetPath"  href="javascript:call(test_settings_setDroneAssetPath)"><font color="#555">无人机漫游下设置无人机模型：</font>SetDroneAssetPath</a><br> &emsp;
            <a id="test_settings_setPlayerName"  href="javascript:call(test_settings_setPlayerName)"><font color="#555">无人机漫游/角色漫游时设置模型上方显示的文字名字：</font>SetPlayerName</a><br> &emsp;
        
            <br>
            <b>VTPK：<br></b>&emsp;
            <a id="test_settings_getVTPK"  href="javascript:call(test_settings_getVTPK)"><font color="#555">获取所有的VTPK标注：</font>GetLabelLayer</a><br> &emsp;
            <a id="test_settings_setVTPK"  href="javascript:call(test_settings_setVTPK)"><font color="#555">设置当前显示的VTPK标注：</font>SetLabelLayer</a><br> &emsp;
            <a id="test_settings_removeVTPK"  href="javascript:call(test_settings_removeVTPK)"><font color="#555">移除当前显示的VTPK标注：</font>RemoveLabelLayer</a><br> &emsp;
            
            <a id="test_settings_setLabelLayerDepthTestHeight"  href="javascript:call(test_settings_setLabelLayerDepthTestHeight)"><font color="#555">设置VTPK标注的深度检测的相机高度阈值：</font>SetLabelLayerDepthTestHeight</a><br> &emsp;
            
            <a id="test_settings_setLabelLayerScaleRatio"  href="javascript:call(test_settings_setLabelLayerScaleRatio)"><font color="#555">设置VTPK标注显示百分比：</font>SetLabelLayerScaleRatio</a><br> &emsp;
            <a id="test_settings_setLabelLayerLineSpace"  href="javascript:call(test_settings_setLabelLayerLineSpace)"><font color="#555">设置VTPK线性标注间隔：</font>SetLabelLayerLineSpace</a><br> &emsp;
            <a id="test_settings_setLabelLayerSymbolAvoidance"  href="javascript:call(test_settings_setLabelLayerSymbolAvoidance)"><font color="#555">设置VTPK标注符号避让方式：</font>SetLabelLayerSymbolAvoidance</a><br> &emsp;
            
            <br>
            <b>图层服务：<br></b>&emsp;
            <a id="test_settings_setWMTSLayerVisible"  href="javascript:call(test_settings_setWMTSLayerVisible)"><font color="#555">设置WMTS图层的可见性：</font>SetWMTSLayerVisible</a><br> &emsp;
            <a id="test_settings_setWMTSLayerOpacity"  href="javascript:call(test_settings_setWMTSLayerOpacity)"><font color="#555">设置WMTS图层的透明度：</font>SetWMTSLayerOpacity</a><br> &emsp;
            <a id="test_settings_setGroundHeight"  href="javascript:call(test_settings_setGroundHeight)" class="tip-hotspot" data-tip="设置图层服务的高度"><font color="#555">设置图层服务的高度：</font>SetGroundHeight</a><br> &emsp;
            <a id="test_settings_setWMTSLayerEnableDecal"  href="javascript:call(test_settings_setWMTSLayerEnableDecal)" class="tip-hotspot" data-tip="设置网络图层服务是否贴合地形或对象"><font color="#555">设置网络图层服务是否贴合地形或对象：</font>SetImageryLayerEnableDecal</a> <br> &emsp;
            <a id="test_settings_setImageryLayerLevelOffset"  href="javascript:call(test_settings_setImageryLayerLevelOffset)" class="tip-hotspot" data-tip="设置网络图层服务的裂分等级的偏移量"><font color="#555">设置网络图层服务的裂分等级的偏移量：</font>SetImageryLayerLevelOffset</a> <br>&emsp;
        
            <br>
            <b>工程设置：<br></b>&emsp;
            <a id="test_settings_getProjectWKT"  href="javascript:call(test_settings_getProjectWKT)"><font color="#555">获取ACP工程的坐标系配准：</font>GetProjectWKT</a><br> &emsp;
            
            
            <br>
            <b>全局颜色：<br></b>&emsp;
            <a id="test_settings_setHighlightColor"  href="javascript:call(test_settings_setHighlightColor)"><font color="#555">设置全局高亮的颜色：</font>SetHighlightColor</a><br> &emsp;
            <a id="test_settings_setOceanColor"  href="javascript:call(test_settings_setOceanColor)"><font color="#555">设置全局海洋颜色：</font>SetOceanColor</a><br> &emsp;
            
            <br>
            <b>全局光照：<br></b>&emsp;
            <a id="test_settings_setGlobalIllumination" href="javascript:call(test_settings_setGlobalIllumination)"><font color="#555">设置屏幕空间全局光照：</font>SetGlobalIllumination</a><br> &emsp;
            <a id="test_settings_setChromaticAberration" href="javascript:call(test_settings_setChromaticAberration)"><font color="#555">设置透镜色差强度：</font>SetChromaticAberration</a><br> &emsp;
            
            <br>
            <b>环境光照：<br></b>&emsp;
            <a id="test_settings_setAmbientRadius" href="javascript:call(test_settings_setAmbientRadius)"><font color="#555">设置环境光遮罩采样半径：</font>SetAmbientRadius</a><br> &emsp;
            <a id="test_settings_setAmbientFadeDistance" href="javascript:call(test_settings_setAmbientFadeDistance)"><font color="#555">设置环境光遮罩淡出距离：</font>SetAmbientFadeDistance</a><br> &emsp;
            <a id="test_settings_setAmbientIntensity" href="javascript:call(test_settings_setAmbientIntensity)"><font color="#555">设置环境光遮罩强度：</font>SetAmbientIntensity</a><br> &emsp;
            
            <br>
            <b>曝光：<br></b>&emsp;
            <a id="test_settings_setExposureEnabled" href="javascript:call(test_settings_setExposureEnabled)"><font color="#555">设置自动曝光开关：</font>SetExposureEnabled</a><br> &emsp;
            <a id="test_settings_setExposureCompensation" href="javascript:call(test_settings_setExposureCompensation)"><font color="#555">设置曝光补偿值：</font>SetExposureCompensation</a><br> &emsp;
            
            <br>
            <b>景深：<br></b>&emsp;
            <a id="test_settings_setDepthFiethSwitch" href="javascript:call(test_settings_setDepthFiethSwitch)"><font color="#555">设置景深开关：</font>SetDepthFiethSwitch</a><br> &emsp;
            <a id="test_settings_setFocalLength" href="javascript:call(test_settings_setFocalLength)"><font color="#555">设置景深焦距：</font>SetFocalLength</a><br> &emsp;
            <a id="test_settings_setAperture" href="javascript:call(test_settings_setAperture)"><font color="#555">设置景深光圈大小：</font>SetAperture</a><br> &emsp;
            <a id="test_settings_setDeepBlur" href="javascript:call(test_settings_setDeepBlur)"><font color="#555">设置景深深度模糊强度：</font>SetDeepBlur</a><br> &emsp;
            <a id="test_settings_setDofMode" href="javascript:call(test_settings_setDofMode)"><font color="#555">设置景深对焦距离模式：</font>SetDofMode</a><br> &emsp;
            
            <br>
            <b>色彩：<br></b>&emsp;
            <a id="test_settings_setContrast" href="javascript:call(test_settings_setContrast)"><font color="#555">设置画面对比度：</font>SetContrast</a><br> &emsp;
            <a id="test_settings_setSaturation" href="javascript:call(test_settings_setSaturation)"><font color="#555">设置画面饱和度：</font>SetSaturation</a><br> &emsp;
            <a id="test_settings_setTonemapper" href="javascript:call(test_settings_setTonemapper)"><font color="#555">设置色彩优化开关：</font>SetTonemapper</a><br> &emsp;
            
            <br>
            <b>LUT 调色：<br></b>&emsp;
            <a id="test_settings_setLutMode" href="javascript:call(test_settings_setLutMode)"><font color="#555">设置LUT调色模式：</font>SetLutMode</a><br> &emsp;
            <a id="test_settings_setLutIntensity" href="javascript:call(test_settings_setLutIntensity)"><font color="#555">设置LUT调色强度：</font>SetLutIntensity</a><br> &emsp;
            
            <br>
            <b>特效：<br></b>&emsp;
            <a id="test_settings_setLensFlareIntensity" href="javascript:call(test_settings_setLensFlareIntensity)"><font color="#555">设置镜头光晕强度：</font>SetLensFlareIntensity</a><br> &emsp;
            <a id="test_settings_setBloomIntensity" href="javascript:call(test_settings_setBloomIntensity)"><font color="#555">设置泛光强度：</font>SetBloomIntensity</a><br> &emsp;
            <a id="test_settings_setDarkCorner" href="javascript:call(test_settings_setDarkCorner)"><font color="#555">设置暗角强度：</font>SetDarkCorner</a><br> &emsp;
            <a id="test_settings_setPostProcessEffects" href="javascript:call(test_settings_setPostProcessEffects)"><font color="#555">设置滤镜后期处理效果：</font>SetPostProcessEffects</a><br> &emsp;
            
            <br>
            <b>渲染质量：<br></b>&emsp;
            <a id="test_settings_setScreenPercentage" href="javascript:call(test_settings_setScreenPercentage)"><font color="#555">设置屏幕渲染百分比：</font>SetScreenPercentage</a><br> &emsp;
            <a id="test_settings_setAntiAliasing" href="javascript:call(test_settings_setAntiAliasing)"><font color="#555">设置反走样开关：</font>SetAntiAliasing</a><br> &emsp;
            
            <br>
            <b>地形全局透明度和参与光照：<br></b>&emsp;
            <a id="test_settings_setTerrainGlobalAlpha" href="javascript:call(test_settings_setTerrainGlobalAlpha)"><font color="#555">设置地形全局不透明度：</font>SetTerrainGlobalAlpha</a><br> &emsp;
            <a id="test_settings_setTerrainGlobalLitStatus" href="javascript:call(test_settings_setTerrainGlobalLitStatus)"><font color="#555">设置地形是否参与光照：</font>SetTerrainGlobalLitStatus</a><br> &emsp;
            
            <br>
            <b>倾斜全局透明度和参与光照：<br></b>&emsp;
            <a id="test_settings_setOsgbGlobalLitStatus" href="javascript:call(test_settings_setOsgbGlobalLitStatus)"><font color="#555">设置倾斜摄影是否参与光照：</font>SetOsgbGlobalLitStatus</a><br> &emsp;
            <a id="test_settings_setOsgbGlobalAlpha" href="javascript:call(test_settings_setOsgbGlobalAlpha)"><font color="#555">设置倾斜摄影全局不透明度：</font>SetOsgbGlobalAlpha</a><br> &emsp;
            
            <br>
            <b>对象贴合：<br></b>&emsp;
            <a id="test_settings_setReceiveDecalMode" href="javascript:call(test_settings_setReceiveDecalMode)"><font color="#555">设置对象贴合模式：</font>SetReceiveDecalMode</a><br> &emsp;
        
        </div>

        <div id="a_SettingsPanel" >
            <img width="24" height="24" src="images/settingsPanel.png" /><strong>&nbsp;设置面板：SettingsPanel</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/SettingsPanel.html" target="_blank">API帮助</a><br> &emsp;

            <a id="test_settingsPanel_setReportMode"  href="javascript:call(test_settingsPanel_setReportMode)"><font color="#555">设置面板--设置汇报模式：</font>SetReportMode</a><br> &emsp;
            <a id="test_settingsPanel_getReportMode"  href="javascript:call(test_settingsPanel_getReportMode)"><font color="#555">设置面板--获取汇报模式：</font>GetReportMode</a><br><br> &emsp;

            <a id="test_settingsPanel_setControlMode"  href="javascript:call(test_settingsPanel_setControlMode)"><font color="#555">设置面板--设置控制参数：</font>SetControlMode</a><br> &emsp;
            <a id="test_settingsPanel_getControlMode"  href="javascript:call(test_settingsPanel_getControlMode)"><font color="#555">设置面板--获取控制参数：</font>GetControlMode</a><br><br> &emsp;

            <a id="test_settingsPanel_setPostProcessMode"  href="javascript:call(test_settingsPanel_setPostProcessMode)"><font color="#555">设置面板--设置后期参数：</font>SetPostProcessMode</a><br> &emsp;
            <a id="test_settingsPanel_getPostProcessMode"  href="javascript:call(test_settingsPanel_getPostProcessMode)"><font color="#555">设置面板--获取后期参数：</font>GetPostProcessMode</a><br><br> &emsp;

            <a id="test_settingsPanel_setCameraMode"  href="javascript:call(test_settingsPanel_setCameraMode)"><font color="#555">设置面板--设置相机参数：</font>SetCameraMode</a><br> &emsp;
            <a id="test_settingsPanel_getCameraMode"  href="javascript:call(test_settingsPanel_getCameraMode)"><font color="#555">设置面板--获取相机参数：</font>GetCameraMode</a><br><br> &emsp;

            <a id="test_settingsPanel_setMapMode"  href="javascript:call(test_settingsPanel_setMapMode)"><font color="#555">设置面板--设置地图模式：</font>SetMapMode</a><br> &emsp;
            <a id="test_settingsPanel_getMapMode"  href="javascript:call(test_settingsPanel_getMapMode)"><font color="#555">设置面板--获取地图模式：</font>GetMapMode</a><br> &emsp;
        </div>

        <div id="a_Misc" >
            <img width="24" height="24" src="images/misc.png" /><strong>&nbsp;杂项：Misc</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Misc.html" target="_blank">API帮助</a><br> &emsp;     
            <a id="test_misc_addImageButton"  href="javascript:call(test_misc_addImageButton)"><font color="#555">添加图片按钮：</font>AddImageButton</a><br> &emsp;
            <a id="test_misc_deleteImageButton"  href="javascript:call(test_misc_deleteImageButton)"><font color="#555">删除图片按钮：</font>DeleteImageButton</a><br><br> &emsp;
            
            <a id="test_misc_getConvexPolygon"  href="javascript:call(test_misc_getConvexPolygon)"><font color="#555">获取凸多边形顶点索引：</font>GetConvexPolygon</a><br><br> &emsp;

            <!--
            <a id="test_misc_addAnimatedImageButton"  href="javascript:call(test_misc_addAnimatedImageButton)"><font color="#555">添加动画按钮：</font>AddAnimatedImageButton</a><br><br> &emsp;
            -->

            <a id="test_misc_playVideo"  href="javascript:call(test_misc_playVideo)"><font color="#555">在窗口指定位置播放视频：</font>PlayVideo</a><br> &emsp;
            <a id="test_misc_stopPlayVideo"  href="javascript:call(test_misc_stopPlayVideo)"><font color="#555">停止视频播放并隐藏视频窗口：</font>StopPlayVideo</a><br> &emsp;
            <a id="test_misc_playMovie"  href="javascript:call(test_misc_playMovie)"><font color="#555">全屏播放影片：</font>PlayMovie</a><br> &emsp;
            <a id="test_misc_stopMovie"  href="javascript:call(test_misc_stopMovie)"><font color="#555">停止全屏播放影片：</font>StopMovie</a><br> &emsp;
            <a id="test_misc_playVideoAlone"  href="javascript:call(test_misc_playVideoAlone)"><font color="#555">在独立的进程播放视频：</font>PlayVideoAlone</a><br> &emsp;
            <a id="test_misc_stopPlayVideoAlone"  href="javascript:call(test_misc_stopPlayVideoAlone)"><font color="#555">停止在独立的进程播放视频：</font>StopPlayVideoAlone</a><br><br> &emsp;
            <a id="test_misc_callBPFunction"  href="javascript:call(test_misc_callBPFunction)"><font color="#555">调用蓝图函数：</font>CallBPFunction</a><br> &emsp;
            
            <a id="test_misc_enterReportMode"  href="javascript:call(test_misc_enterReportMode)"><font color="#555">进入汇报演示模式：</font>EnterReportMode</a><br> &emsp;
            <a id="test_misc_setReportModeAlign"  href="javascript:call(test_misc_setReportModeAlign)"><font color="#555">设置汇报模式下的窗口位置：</font>SetReportModeAlign</a><br> &emsp;
            <a id="test_misc_setReportModePlayMode"  href="javascript:call(test_misc_setReportModePlayMode)"><font color="#555">设置汇报模式下窗口的播放模式：</font>SetReportModePlayMode</a><br> &emsp;
            <a id="test_misc_setReportModeViewPortLinkage"  href="javascript:call(test_misc_setReportModeViewPortLinkage)"><font color="#555">设置汇报模式下展示多视口时相机是否联动：</font>SetReportModeViewPortLinkage</a><br> &emsp;
            <a id="test_misc_exitReportMode"  href="javascript:call(test_misc_exitReportMode)"><font color="#555">退出汇报演示模式：</font>ExitReportMode</a><br><br><br> &emsp;



            <a id="test_misc_enterMultiViewportMode"  href="javascript:call(test_misc_enterMultiViewportMode)"><font color="#555">进入多视口模式：</font>EnterMultiViewportMode</a><br> &emsp;
            <a id="test_misc_setMultiviewportInteractSync"  href="javascript:call(test_misc_setMultiviewportInteractSync)"><font color="#555">设置多视口同步：</font>SetMultiviewportInteractSync</a><br> &emsp;
            <a id="test_misc_setActiveViewport"  href="javascript:call(test_misc_setActiveViewport)"><font color="#555">设置当前激活视口：</font>SetActiveViewport</a><br> &emsp;
            <a id="test_misc_getActiveViewport"  href="javascript:call(test_misc_getActiveViewport)"><font color="#555">获取当前激活视口：</font>GetActiveViewport</a><br> &emsp;
            <a id="test_misc_exitMultiViewportMode"  href="javascript:call(test_misc_exitMultiViewportMode)"><font color="#555">退出多视口模式：</font>ExitMultiViewportMode</a><br><br> &emsp;
            

            <a id="test_misc_projectCountAll"  href="javascript:call(test_misc_projectCountAll)"><font color="#555">统计工程包含的全部资产：</font>ProjectCountAll</a><br><br> &emsp;
            <a id="test_misc_projectCount"  href="javascript:call(test_misc_projectCount)"><font color="#555">统计工程包含的各类资产：</font>ProjectCount</a><br><br> &emsp;

            <a id="test_misc_getMaterial"  href="javascript:call(test_misc_getMaterial)"><font color="#555">查询模型材质信息：</font>GetMaterial</a><br> &emsp;
            <a id="test_misc_getBPFunction"  href="javascript:call(test_misc_getBPFunction)"><font color="#555">查询蓝图函数信息：</font>GetBPFunction</a><br><br> &emsp;

            <a id="test_misc_reloadPak"  href="javascript:call(test_misc_reloadPak)"><font color="#555">重新加载pak文件：</font>ReloadPak</a><br> &emsp;
         
            

            <a id="test_misc_hideAllFoliages"  href="javascript:call(test_misc_hideAllFoliages)"><font color="#555">隐藏所有植物：</font>HideAllFoliages</a><br> &emsp;
            <a id="test_misc_showAllFoliages"  href="javascript:call(test_misc_showAllFoliages)"><font color="#555">显示所有植物：</font>ShowAllFoliages</a><br><br> &emsp;
        
        </div>

        <!-- 图层类对象 -->

        <p style="text-align:left;font-size:18px;color:#0063e4">图层类对象</p>
        <div id="a_TileLayer" >
            <img width="24" height="24" src="images/tilelayer.png" /><strong>&nbsp;3DT图层：TileLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/TileLayer.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_tileLayer_add"  href="javascript:call(test_tileLayer_add)"><font color="#555">从文件添加TileLayer图层：</font>Add</a><br> &emsp;
            <a id="test_tileLayer_update"  href="javascript:call(test_tileLayer_update)"><font color="#555">修改TileLayer图层：</font>Update</a><br> &emsp;
            <a id="test_tileLayer_delete"  href="javascript:call(test_tileLayer_delete)"><font color="#555">删除TileLayer图层：</font>Delete</a><br> &emsp;
            <a id="test_tileLayer_focus"  href="javascript:call(test_tileLayer_focus)"><font color="#555">定位TileLayer：</font>Focus</a><br> &emsp;
            <a id="test_tileLayer_clear"  href="javascript:call(test_tileLayer_clear)"><font color="#555">清空TileLayer：</font>Clear</a><br> &emsp;
            
            <a id="test_tileLayer_get"  href="javascript:call(test_tileLayer_get)"><font color="#555">获取TileLayer图层信息：</font>Get</a><br> &emsp;                                                                                                                                                                                                                                     
            <a id="test_tileLayer_get_flattenSupported"  href="javascript:call(test_tileLayer_get_flattenSupported)"><font color="#555">查询所有图层是否支持压平：</font>GetAllFlattenInfo</a><br> &emsp;
            <a id="test_tileLayer_setViewHeightRange"  href="javascript:call(test_tileLayer_setViewHeightRange)"><font color="#555">设置TileLayer可视高度范围：</font>SetViewHeightRange</a><br><br> &emsp;
            <a id="test_tileLayer_setViewportVisible"  href="javascript:call(test_tileLayer_setViewportVisible)"><font color="#555">设置图层在多视口下可见性：</font>SetViewportVisible</a><br><br>&emsp;

            <a id="test_tileLayer_getObjectIDs"  href="javascript:call(test_tileLayer_getObjectIDs)"><font color="#555">获取指定TileLayer包含的所有Actor对象的ID：</font>GetObjectIDs</a><br> &emsp;
            <a id="test_tileLayer_getActorInfoFromDB"  href="javascript:call(test_tileLayer_getActorInfoFromDB)"><font color="#555">查询空间库的Actor信息：</font>GetActorInfoFromDB</a><br> &emsp;
            <a id="test_tileLayer_getActorInfo"  href="javascript:call(test_tileLayer_getActorInfo)"><font color="#555">查询Actor的矩阵和bound信息：</font>GetActorInfo</a><br><br> &emsp;
            
            <a id="test_tileLayer_hide"  href="javascript:call(test_tileLayer_hide)"><font color="#555">隐藏TileLayer图层：</font>Hide</a><br> &emsp;
            <a id="test_tileLayer_show"  href="javascript:call(test_tileLayer_show)"><font color="#555">显示TileLayer图层：</font>Show</a><br><br> &emsp;
            
            <a id="test_tileLayer_enableXRay"  href="javascript:call(test_tileLayer_enableXRay)"><font color="#555">启用X光效果：</font>EnableXRay</a><br> &emsp;
            <a id="test_tileLayer_disableXRay"  href="javascript:call(test_tileLayer_disableXRay)"><font color="#555">停用X光效果：</font>DisableXRay</a><br><br> &emsp;
            
            <a id="test_tileLayer_actor_hide"  href="javascript:call(test_tileLayer_actor_hide)"><font color="#555">隐藏Actor：</font>HideActor</a><br> &emsp;
            <a id="test_tileLayer_actor_show"  href="javascript:call(test_tileLayer_actor_show)"><font color="#555">显示Actor：</font>ShowActor</a><br> &emsp;
            
            <a id="test_tileLayer_actors_hide"  href="javascript:call(test_tileLayer_actors_hide)"><font color="#555">隐藏图层中指定的多个Actor：</font>HideActors</a><br> &emsp; 
            <a id="test_tileLayer_actors_show"  href="javascript:call(test_tileLayer_actors_show)"><font color="#555">显示图层中指定的多个Actor：</font>ShowActors</a><br> &emsp; 
            
            <a id="test_tileLayer_actor_hideAllActors"  href="javascript:call(test_tileLayer_actor_hideAllActors)"><font color="#555">隐藏图层的所有Actor：</font>HideAllActors</a><br> &emsp;
            <a id="test_tileLayer_actor_showAllActors"  href="javascript:call(test_tileLayer_actor_showAllActors)"><font color="#555">显示图层的所有Actor：</font>ShowAllActors</a><br> &emsp;

            <a id="test_tileLayer_actor_focus"  href="javascript:call(test_tileLayer_actor_focus)"><font color="#555">定位当前选中的Actor：</font>FocusActor</a><br> &emsp;
            <a id="test_tileLayer_actors_focus"  href="javascript:call(test_tileLayer_actors_focus)"><font color="#555">定位多个Actors：</font>FocusActors</a><br><br><br> &emsp; 

            <a id="testcase_simulate_building_process"  href="javascript:call(testcase_simulate_building_process)"><font color="#555">模拟建筑建造过程：</font>BuildingDemo</a><br><br> &emsp; 

            <a id="test_tileLayer_actor_highlight"  href="javascript:call(test_tileLayer_actor_highlight)"><font color="#555">高亮Actor：</font>HighlightActor</a><br> &emsp;
            <a id="test_tileLayer_actor_highlight_by_color"  href="javascript:call(test_tileLayer_actor_highlight_by_color)"><font color="#555">自定义颜色高亮Actor：</font>HighlightActorWithColor</a><br> &emsp;
            
            <a id="test_tileLayer_actor_stopHighlight"  href="javascript:call(test_tileLayer_actor_stopHighlight)"><font color="#555">停止高亮Actor：</font>UnHighlightActor</a><br> &emsp;
            <a id="test_tileLayer_actor_highlight_actors"  href="javascript:call(test_tileLayer_actor_highlight_actors)"><font color="#555">高亮多个Actors：</font>HighlightActors</a><br> &emsp;
            <a id="test_tileLayer_actor_highlight_actors_by_color"  href="javascript:call(test_tileLayer_actor_highlight_actors_by_color)"><font color="#555">高亮多个Actors：</font>HighlightActorsWithColor</a><br> &emsp;

            <a id="test_tileLayer_actor_stopHighlight_actors"  href="javascript:call(test_tileLayer_actor_stopHighlight_actors)"><font color="#555">停止高亮多个Actors：</font>UnHighlightActors</a><br> &emsp;
            <a id="test_tileLayer_actor_stopHighlightAllActors"  href="javascript:call(test_tileLayer_actor_stopHighlightAllActors)"><font color="#555">停止高亮所有Actors：</font>UnHighlightAllActors</a><br><br> &emsp;

            <a id="test_tileLayer_setDecalAttach"  href="javascript:call(test_tileLayer_setDecalAttach)"><font color="#555">设置图层对贴花类型对象的贴合支持：</font>EnableDecal</a><br> &emsp;
            
            <a id="test_tileLayer_enableFluid"  href="javascript:call(test_tileLayer_enableFluid)"><font color="#555">打开支持流体仿真功能：</font>EnableFluid</a><br> &emsp;
        
            <a id="test_tileLayer_actor_enableClip"  href="javascript:call(test_tileLayer_actor_enableClip)"><font color="#555">开启图层剖切：</font>EnableClip</a><br> &emsp;
            <a id="test_tileLayer_actor_disableClip"  href="javascript:call(test_tileLayer_actor_disableClip)"><font color="#555">关闭图层剖切：</font>DisableClip</a><br><br> &emsp;
            <a id="test_tileLayer_actor_setStyle"  href="javascript:call(test_tileLayer_actor_setStyle)"><font color="#555">设置图层样式：</font>SetStyle</a><br> &emsp;
            <a id="test_tileLayer_actor_setHeatMapStyle"  href="javascript:call(test_tileLayer_actor_setHeatMapStyle)"><font color="#555">设置图层海拔热力样式：</font>SetAltitudeHeatMap</a><br> &emsp;
            
            <a id="test_tileLayer_actor_resetStyle"  href="javascript:call(test_tileLayer_actor_resetStyle)"><font color="#555">为TileLayer图层恢复样式：</font>ResetStyle</a><br><br> &emsp;
            <a id="test_tileLayer_actor_setCollision"  href="javascript:call(test_tileLayer_actor_setCollision)"><font color="#555">设置TileLayer图层碰撞信息：</font>SetCollision</a><br> &emsp;
            <a id="test_tileLayer_actor_getCollision"  href="javascript:call(test_tileLayer_actor_getCollision)"><font color="#555">获取TileLayer图层碰撞信息：</font>GetCollision</a><br><br> &emsp;
            

            <a id="test_tileLayer_setPointCloudSize"  href="javascript:call(test_tileLayer_setPointCloudSize)"><font color="#555">设置点云尺寸(仅对点云模型生效)：</font>SetPointCloudSize</a><br> &emsp;
            <a id="test_tileLayer_setPointCloudStyle"  href="javascript:call(test_tileLayer_setPointCloudStyle)"><font color="#555">设置点云样式(仅对点云模型生效)：</font>SetPointCloudStyle</a><br> &emsp;
            <a id="test_tileLayer_highlightPoints"  href="javascript:call(test_tileLayer_highlightPoints)"><font color="#555">高亮点云对应的特征值点(仅对点云模型生效)：</font>HighlightPoints</a><br> &emsp;
            <a id="test_tileLayer_unHighlightPoints"  href="javascript:call(test_tileLayer_unHighlightPoints)"><font color="#555">取消高亮点云对应的特征值点(仅对点云模型生效)：</font>UnHighlightPoints</a><br>&emsp;
            <a id="test_tileLayer_unHighlightAllPoints"  href="javascript:call(test_tileLayer_unHighlightAllPoints)"><font color="#555">取消点云所有点高亮(仅对点云模型生效)：</font>UnHighlightAllPoints</a><br><br> &emsp;
            
            

            
            <a id="test_tileLayer_setAttachWMTSLayer"  href="javascript:call(test_tileLayer_setAttachWMTSLayer)"><font color="#555">设置TileLayer是否支持对网络图层服务进行贴合：</font>EnableImageLayerDecal</a><br><br> &emsp;
            

            <a id="test_tileLayer_modifier_add"  href="javascript:call(test_tileLayer_modifier_add)"><font color="#555">添加单个压平：</font>AddModifier</a><br> &emsp;
            <a id="test_tileLayer_modifier_update"  href="javascript:call(test_tileLayer_modifier_update)"><font color="#555">修改压平操作：</font>UpdateModifier</a><br> &emsp;
            <a id="test_tileLayer_modifier_delete"  href="javascript:call(test_tileLayer_modifier_delete)"><font color="#555">删除压平操作：</font>DeleteModifier</a><br> &emsp;

            <a id="test_tileLayer_modifier_addModifierByCoordinates"  href="javascript:call(test_tileLayer_modifier_addModifierByCoordinates)"><font color="#555">添加多个压平：</font>AddModifiers</a><br> &emsp;
            <a id="test_tileLayer_modifier_addModifierByShapeFile"  href="javascript:call(test_tileLayer_modifier_addModifierByShapeFile)"><font color="#555">添加ShapeFile压平：</font>AddModifierByShapeFile</a><br> &emsp;
            <a id="test_tileLayer_modifier_clear"  href="javascript:call(test_tileLayer_modifier_clear)"><font color="#555">清空压平操作：</font>ClearModifier</a><br><br> &emsp;

            <a id="test_tileLayer_hole_addHoleByShapeFile"  href="javascript:call(test_tileLayer_hole_addHoleByShapeFile)"><font color="#555">添加ShapeFile挖洞：</font>AddHoleByShapeFile</a><br> &emsp;
            <a id="test_tileLayer_hole_addHoleByCoordinates"  href="javascript:call(test_tileLayer_hole_addHoleByCoordinates)"><font color="#555">添加挖洞：</font>AddHole</a><br> &emsp;
            <a id="test_tileLayer_hole_update"  href="javascript:call(test_tileLayer_hole_update)"><font color="#555">修改挖洞操作：</font>UpdateHole</a><br> &emsp;
            <a id="test_tileLayer_hole_delete"  href="javascript:call(test_tileLayer_hole_delete)"><font color="#555">删除挖洞操作：</font>DeleteHole</a><br> &emsp;
            <a id="test_tileLayer_hole_clear"  href="javascript:call(test_tileLayer_hole_clear)"><font color="#555">清空挖洞操作：</font>ClearHole</a><br><br> &emsp;
        </div>

        <div id="a_ShapeFileLayer" >
            <img width="24" height="24" src="images/misc.png" /><strong>&nbsp;SHP图层：ShapeFileLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/ShapeFileLayer.html" target="_blank">API帮助</a> &emsp;
            <a id="test_shapeFile_add"  href="javascript:call(test_shapeFile_add)" class="tip-hotspot" data-tip="添加ShapeFileLayer">Add</a> &emsp;
            <a id="test_shapeFile_update"  href="javascript:call(test_shapeFile_update)" class="tip-hotspot" data-tip="修改ShapeFileLayer">Update</a> &emsp;
            <a id="test_shapeFile_delete"  href="javascript:call(test_shapeFile_delete)" class="tip-hotspot" data-tip="删除ShapeFileLayer">Delete</a> &emsp;
            <a id="test_shapeFile_clear"  href="javascript:call(test_shapeFile_clear)" class="tip-hotspot" data-tip="清空ShapeFileLayer">Clear</a> &emsp;
            <a id="test_shapeFile_focus"  href="javascript:call(test_shapeFile_focus)" class="tip-hotspot" data-tip="定位ShapeFileLayer">Focus</a>  &emsp;
            <a id="test_shapeFile_show"  href="javascript:call(test_shapeFile_show)" class="tip-hotspot" data-tip="显示ShapeFileLayer">Show</a> &emsp;
            <a id="test_shapeFile_hide"  href="javascript:call(test_shapeFile_hide)" class="tip-hotspot" data-tip="隐藏ShapeFileLayer">Hide</a> &emsp;
            <a id="test_shapeFile_showAll"  href="javascript:call(test_shapeFile_showAll)" class="tip-hotspot" data-tip="显示全部ShapeFileLayer">ShowAll</a> &emsp;
            <a id="test_shapeFile_hideAll"  href="javascript:call(test_shapeFile_hideAll)" class="tip-hotspot" data-tip="隐藏全部ShapeFileLayer">HideAll</a> &emsp;
            <a id="test_shapeFile_open"  href="javascript:call(test_shapeFile_open)" class="tip-hotspot" data-tip="打开ShapeFileLayer">Open</a> &emsp;
            <a id="test_shapeFile_get"  href="javascript:call(test_shapeFile_get)" class="tip-hotspot" data-tip="获取ShapeFileLayer信息">Get</a> &emsp;

            <br><br>&emsp;&nbsp;<b>ShapeFile要素区域操作：</b><br><br>&emsp;
            <a id="test_shapeFile_highlightFeature"  href="javascript:call(test_shapeFile_highlightFeature)"> <font color="#555">高亮ShapeFileLayer内部单个要素区域：</font>HighlightFeature</a><br>&emsp;
            <a id="test_shapeFile_stopHighlightFeature"  href="javascript:call(test_shapeFile_stopHighlightFeature)"> <font color="#555">取消高亮ShapeFileLayer内部单个要素区域：</font>UnHighlightFeature</a><br>&emsp;
            <a id="test_shapeFile_highlightFeatures"  href="javascript:call(test_shapeFile_highlightFeatures)"> <font color="#555">高亮ShapeFileLayer内部多个要素区域：</font>HighlightFeatures</a><br>&emsp;
            <a id="test_shapeFile_stopHighlightFeatures"  href="javascript:call(test_shapeFile_stopHighlightFeatures)"> <font color="#555">取消高亮ShapeFileLayer内部多个要素区域：</font>UnHighlightFeatures</a><br>&emsp;
            <a id="test_shapeFile_focusFeature"  href="javascript:call(test_shapeFile_focusFeature)"> <font color="#555">定位ShapeFileLayer内部某个要素区域：</font>FocusFeature</a><br>&emsp;
            <a id="test_shapeFile_getFeature"  href="javascript:call(test_shapeFile_getFeature)"> <font color="#555">查询ShapeFileLayer内部多个要素区域：</font>GetFeature</a><br>&emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        </div>

        <div id="a_GeoJSONLayer" >
            <img width="24" height="24" src="images/geojson.png" /><strong>&nbsp;GeoJSON图层：GeoJSONLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/GeoJSONLayer.html" target="_blank">API帮助</a> &emsp;

            
            <a id="test_geoJSONLayer_load_point_json"  href="javascript:call(test_geoJSONLayer_load_point_json)" class="tip-hotspot" data-tip="简单渲染器-添加点">AddJson(simple-point)</a> &emsp;

            <a id="test_geoJSONLayer_load_point"  href="javascript:call(test_geoJSONLayer_load_point)" class="tip-hotspot" data-tip="简单渲染器-添加点">AddFile(simple-point)</a> &emsp;
            <a id="test_geoJSONLayer_load_polyline"  href="javascript:call(test_geoJSONLayer_load_polyline)" class="tip-hotspot" data-tip="简单渲染器-添加线">AddFile(simple-polyline)</a> &emsp;
            <a id="test_geoJSONLayer_load_polygon"  href="javascript:call(test_geoJSONLayer_load_polygon)" class="tip-hotspot" data-tip="简单渲染器-添加贴地面带文字标注">AddFile(simple-polygon)</a> &emsp;

            <a id="test_geoJSONLayer_load_unique"  href="javascript:call(test_geoJSONLayer_load_unique)" class="tip-hotspot" data-tip="唯一值渲染器">AddFile(unique)</a> &emsp;
            <a id="test_geoJSONLayer_load_class"  href="javascript:call(test_geoJSONLayer_load_class)" class="tip-hotspot" data-tip="分类渲染器">AddFile(class)</a> &emsp;

            <a id="test_geoJSONLayer_load_visible"  href="javascript:call(test_geoJSONLayer_load_visible)" class="tip-hotspot" data-tip="可见性渲染器">AddFile(visible)</a> &emsp;

            <a id="test_geoJSONLayer_load_materials"  href="javascript:call(test_geoJSONLayer_load_materials)" class="tip-hotspot" data-tip="自定义材质渲染器">AddFile(materials)</a> &emsp;

            
            <a id="test_geoJSONLayer_update"  href="javascript:call(test_geoJSONLayer_update)" class="tip-hotspot" data-tip="更新GeoJSONLayer">Update</a> &emsp;

            <a id="test_geoJSONLayer_focus"  href="javascript:call(test_geoJSONLayer_focus)" class="tip-hotspot" data-tip="定位GeoJSONLayer">Focus</a>&emsp;

            <a id="test_geoJSONLayer_hide"  href="javascript:call(test_geoJSONLayer_hide)" class="tip-hotspot" data-tip="隐藏GeoJSONLayer">Hide</a> &emsp;
            <a id="test_geoJSONLayer_show"  href="javascript:call(test_geoJSONLayer_show)" class="tip-hotspot" data-tip="显示GeoJSONLayer">Show</a> &emsp;
            <a id="test_geoJSONLayer_delete"  href="javascript:call(test_geoJSONLayer_delete)" class="tip-hotspot" data-tip="删除GeoJSONLayer">Delete</a> &emsp;
            <a id="test_geoJSONLayer_clear"  href="javascript:call(test_geoJSONLayer_clear)" class="tip-hotspot" data-tip="清空GeoJSONLayer">Clear</a> &emsp;

            <a id="test_geoJSONLayer_setViewHeightRange"  href="javascript:call(test_geoJSONLayer_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            

            <br><br>&emsp;&nbsp;<b>GeoJSONLayer要素区域操作：</b><br><br>&emsp;
            <a id="test_geoJSONLayer_highlightFeature"  href="javascript:call(test_geoJSONLayer_highlightFeature)"> <font color="#555">高亮GeoJSONLayer内部单个要素区域：</font>HighlightFeature</a><br>&emsp;
            <a id="test_geoJSONLayer_stopHighlightFeature"  href="javascript:call(test_geoJSONLayer_stopHighlightFeature)"> <font color="#555">取消高亮GeoJSONLayer内部单个要素区域：</font>UnHighlightFeature</a><br>&emsp;
            
            <a id="test_geoJSONLayer_highlightFeatureByProperty"  href="javascript:call(test_geoJSONLayer_highlightFeatureByProperty)"> <font color="#555">根据字段属性高亮GeoJSONLayer内部要素区域：</font>HighlightFeatureByProperty</a><br>&emsp;
            <a id="test_geoJSONLayer_unHighlightFeatureByProperty"  href="javascript:call(test_geoJSONLayer_unHighlightFeatureByProperty)"> <font color="#555">根据字段属性取消高亮GeoJSONLayer内部要素区域：</font>UnHighlightFeatureByProperty</a><br>&emsp;
            
            
            
            <a id="test_geoJSONLayer_highlightFeatures"  href="javascript:call(test_geoJSONLayer_highlightFeatures)"> <font color="#555">高亮GeoJSONLayer内部多个要素区域：</font>HighlightFeatures</a><br>&emsp;
            <a id="test_geoJSONLayer_stopHighlightFeatures"  href="javascript:call(test_geoJSONLayer_stopHighlightFeatures)"> <font color="#555">取消高亮GeoJSONLayer内部多个要素区域：</font>UnHighlightFeatures</a><br>&emsp;
            <a id="test_geoJSONLayer_stopAllHighlightFeaturesById"  href="javascript:call(test_geoJSONLayer_stopAllHighlightFeaturesById)"> <font color="#555">取消高亮GeoJSONLayer内部所有要素区域：</font>UnHighlightAllFeaturesById</a><br>&emsp;
            <a id="test_geoJSONLayer_focusFeature"  href="javascript:call(test_geoJSONLayer_focusFeature)"> <font color="#555">定位GeoJSONLayer内部某个要素区域：</font>FocusFeature</a><br>&emsp;
    
        </div>

        <div id="a_Cesium3DTileset">
            <img width="24" height="24" src="images/cesium3DTile.png" /><strong>&nbsp;Cesium图层：Cesium3DTileset</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/cesium3DTileset.html" target="_blank">API帮助</a> &emsp;
            <a id="test_cesium3DTileset_add"  href="javascript:call(test_cesium3DTileset_add)" class="tip-hotspot" data-tip="添加Cesium3DTileset">Add</a> &emsp;
            <a id="test_cesium3DTileset_update"  href="javascript:call(test_cesium3DTileset_update)" class="tip-hotspot" data-tip="修改Cesium3DTileset">Update</a> &emsp;
            <a id="test_cesium3DTileset_delete"  href="javascript:call(test_cesium3DTileset_delete)" class="tip-hotspot" data-tip="删除指定的Cesium3DTileset">Delete</a> &emsp;
            <a id="test_cesium3DTileset_clear"  href="javascript:call(test_cesium3DTileset_clear)" class="tip-hotspot" data-tip="清空所有的Cesium3DTileset">Clear</a> &emsp;
            <a id="test_cesium3DTileset_focus"  href="javascript:call(test_cesium3DTileset_focus)" class="tip-hotspot" data-tip="定位Cesium3DTileset">Focus</a>  &emsp;
            <a id="test_cesium3DTileset_show"  href="javascript:call(test_cesium3DTileset_show)" class="tip-hotspot" data-tip="显示指定的Cesium3DTileset">Show</a> &emsp;
            <a id="test_cesium3DTileset_showAll"  href="javascript:call(test_cesium3DTileset_showAll)" class="tip-hotspot" data-tip="显示所有的Cesium3DTileset">ShowAll</a> &emsp;
            <a id="test_cesium3DTileset_hide"  href="javascript:call(test_cesium3DTileset_hide)" class="tip-hotspot" data-tip="隐藏指定的Cesium3DTileset">Hide</a> &emsp;
            <a id="test_cesium3DTileset_hideAll"  href="javascript:call(test_cesium3DTileset_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Cesium3DTileset">HideAll</a> &emsp;
            <a id="test_cesium3DTileset_get"  href="javascript:call(test_cesium3DTileset_get)" class="tip-hotspot" data-tip="获取指定的Cesium3DTileset信息">Get</a> &emsp;
        </div>        

        <div id="a_ImageryLayer">
            <img width="24" height="24" src="images/acp.png" /><strong>&nbsp;栅格图层(投影)：ImageryLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/imageryLayer.html" target="_blank">API帮助</a> &emsp;
            <a id="test_imageryLayer_init"  href="javascript:call(test_imageryLayer_init)" class="tip-hotspot" data-tip="初始化图层服务">Init</a> &emsp;
            <a id="test_imageryLayer_add"  href="javascript:call(test_imageryLayer_add)" class="tip-hotspot" data-tip="添加图层服务">Add</a> &emsp;
            <a id="test_imageryLayer_addVTPK"  href="javascript:call(test_imageryLayer_addVTPK)" class="tip-hotspot" data-tip="图层服务叠加VTPK标注显示">AddVTPK</a> &emsp;
            <a id="test_imageryLayer_deleteVTPK"  href="javascript:call(test_imageryLayer_deleteVTPK)" class="tip-hotspot" data-tip="删除叠加的VTPK标注显示">DeleteVTPK</a> &emsp;
            <a id="test_imageryLayer_setVTPKVisable"  href="javascript:call(test_imageryLayer_setVTPKVisable)" class="tip-hotspot" data-tip="设置叠加的VTPK标注可见性">SetVTPKVisable</a> &emsp;

            <a id="test_imageryLayer_setDrawOrder"  href="javascript:call(test_imageryLayer_setDrawOrder)" class="tip-hotspot" data-tip="设置图层服务的顺序">SetDrawOrder</a> &emsp;
            <a id="test_imageryLayer_setDrawTop"  href="javascript:call(test_imageryLayer_setDrawTop)" class="tip-hotspot" data-tip="设置图层置顶显示">SetDrawTop</a> &emsp;
            <a id="test_imageryLayer_setDrawBottom"  href="javascript:call(test_imageryLayer_setDrawBottom)" class="tip-hotspot" data-tip="设置图层置底显示">SetDrawBottom</a> &emsp;

            <a id="test_imageryLayer_focus"  href="javascript:call(test_imageryLayer_focus)" class="tip-hotspot" data-tip="定位图层服务">Focus</a> &emsp;
            <a id="test_imageryLayer_show"  href="javascript:call(test_imageryLayer_show)" class="tip-hotspot" data-tip="显示图层服务">Show</a> &emsp;
            <a id="test_imageryLayer_hide"  href="javascript:call(test_imageryLayer_hide)" class="tip-hotspot" data-tip="隐藏图层服务">Hide</a> &emsp;
            <a id="test_imageryLayer_delete"  href="javascript:call(test_imageryLayer_delete)" class="tip-hotspot" data-tip="删除图层服务">Delete</a> &emsp;
        </div>
        
        <div id="a_MarkerLayer">
            <img width="24" height="24" src="images/markerLayer.png" /><strong>&nbsp;标注图层：MarkerLayer</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/MarkerLayer.html" target="_blank">API帮助</a>&emsp;
            <a id="test_markerLayer_add"  href="javascript:call(test_markerLayer_add)" class="tip-hotspot" data-tip="添加标注图层对象">Add</a>&emsp;
            <a id="test_markerLayer_update"  href="javascript:call(test_markerLayer_update)" class="tip-hotspot" data-tip="修改标注图层对象">Update</a>&emsp;
            <a id="test_markerLayer_delete"  href="javascript:call(test_markerLayer_delete)" class="tip-hotspot" data-tip="删除标注图层对象">Delete</a>&emsp;
            <a id="test_markerLayer_clear"  href="javascript:call(test_markerLayer_clear)" class="tip-hotspot" data-tip="清空所有标注图层对象">Clear</a>&emsp;
            <a id="test_markerLayer_focus"  href="javascript:call(test_markerLayer_focus)" class="tip-hotspot" data-tip="定位标注图层对象">Focus</a>            &emsp;
            <a id="test_markerLayer_focus_marker"  href="javascript:call(test_markerLayer_focus_marker)" class="tip-hotspot" data-tip="定位标注图层对象内部的某个标记点">FocusByMarkerId</a>            &emsp;
            
            <a id="test_markerLayer_show"  href="javascript:call(test_markerLayer_show)" class="tip-hotspot" data-tip="显示指定标注图层对象">Show</a>&emsp;
            <a id="test_markerLayer_hide"  href="javascript:call(test_markerLayer_hide)" class="tip-hotspot" data-tip="隐藏指定标注图层对象">Hide</a>&emsp;
            <a id="test_markerLayer_showAll"  href="javascript:call(test_markerLayer_showAll)" class="tip-hotspot" data-tip="显示所有标注图层对象">ShowAll</a> &emsp;
            <a id="test_markerLayer_hideAll"  href="javascript:call(test_markerLayer_hideAll)" class="tip-hotspot" data-tip="隐藏所有标注图层对象">HideAll</a>&emsp;
            <a id="test_markerLayer_setViewHeightRange"  href="javascript:call(test_markerLayer_setViewHeightRange)" class="tip-hotspot" data-tip="设置标注图层对象的可视高度范围">SetViewHeightRange</a>&emsp;
            
        </div>
        

        <!-- 模型类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">模型类对象</p>
        <div id="a_CustomObject" >
            <img width="24" height="24" src="images/custom.png" /><strong>&nbsp;自定义模型：CustomObject</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CustomObject.html" target="_blank">API帮助</a> &emsp;
            <a id="test_customObject_add"  href="javascript:call(test_customObject_add)" class="tip-hotspot" data-tip="添加CustomObject">Add</a> &emsp;
            <a id="test_customObject_update"  href="javascript:call(test_customObject_update)" class="tip-hotspot" data-tip="修改CustomObject">Update</a> &emsp;
            <a id="test_customObject_delete"  href="javascript:call(test_customObject_delete)" class="tip-hotspot" data-tip="删除CustomObject">Delete</a> &emsp;
            <a id="test_customObject_clear"  href="javascript:call(test_customObject_clear)" class="tip-hotspot" data-tip="清空CustomObject">Clear</a> &emsp;
            <a id="test_customObject_focus"  href="javascript:call(test_customObject_focus)" class="tip-hotspot" data-tip="定位CustomObject">Focus</a> &emsp;
            <a id="test_customObject_show"  href="javascript:call(test_customObject_show)" class="tip-hotspot" data-tip="显示CustomObject">Show</a> &emsp;
            <a id="test_customObject_hide"  href="javascript:call(test_customObject_hide)" class="tip-hotspot" data-tip="隐藏CustomObject">Hide</a> &emsp;
            
            <a id="test_customObject_showByGroupId"  href="javascript:call(test_customObject_showByGroupId)" class="tip-hotspot" data-tip="按分组id显示CustomObject">ShowByGroupId</a> &emsp;
            <a id="test_customObject_hideByGroupId"  href="javascript:call(test_customObject_hideByGroupId)" class="tip-hotspot" data-tip="按分组id隐藏CustomObject">HideByGroupId</a> &emsp;
            
            <a id="test_customObject_highlight"  href="javascript:call(test_customObject_highlight)" class="tip-hotspot" data-tip="高亮CustomObject">Highlight</a> &emsp;
            <a id="test_customObject_unhighlight"  href="javascript:call(test_customObject_unhighlight)" class="tip-hotspot" data-tip="取消高亮CustomObject">Unhighlight</a> &emsp;

            <a id="test_customObject_startGlow"  href="javascript:call(test_customObject_startGlow)" class="tip-hotspot" data-tip="闪烁CustomObject">Glow</a> &emsp;
            <a id="test_customObject_stopGlow"  href="javascript:call(test_customObject_stopGlow)" class="tip-hotspot" data-tip="停止闪烁CustomObject">StopGlow</a> &emsp;

            <a id="test_customObject_get"  href="javascript:call(test_customObject_get)" class="tip-hotspot" data-tip="获取CustomObject信息">Get</a> &emsp;
            
            <a id="test_customObject_addByTileLayer"  href="javascript:call(test_customObject_addByTileLayer)" class="tip-hotspot" data-tip="从TileLayer图层添加CustomObject对象">AddByTileLayer</a> &emsp;
            <a id="test_customObject_showGrowth"  href="javascript:call(test_customObject_showGrowth)" class="tip-hotspot" data-tip="复制后对象的生长动画效果">ShowGrowth</a> &emsp;
            <a id="test_customObject_cutFloor"  href="javascript:call(test_customObject_cutFloor)" class="tip-hotspot" data-tip="按建筑的层高拆分楼层">CutFloor</a> &emsp;
            

            <a id="test_customObject_getBPFunction"  href="javascript:call(test_customObject_getBPFunction)" class="tip-hotspot" data-tip="获取CustomObject对象包含的蓝图函数信息">GetBPFunction</a> &emsp;
            <a id="test_customObject_callFunction"  href="javascript:call(test_customObject_callFunction)" class="tip-hotspot" data-tip="调用蓝图函数">CallBPFunction</a> &emsp;
         
            
            <a id="test_customObject_setRotation"  href="javascript:call(test_customObject_setRotation)" class="tip-hotspot" data-tip="设置场景旋转">SetRotation</a> &emsp;
            <a id="test_customObject_setLocalRotation"  href="javascript:call(test_customObject_setLocalRotation)" class="tip-hotspot" data-tip="设置CustomObject模型旋转">SetLocalRotation</a> &emsp;
            <a id="test_customObject_setPos"  href="javascript:call(test_customObject_setPos)" class="tip-hotspot" data-tip="设置CustomObject位置">SetLocation</a> &emsp;
            <a id="test_customObject_setSmoothTime"  href="javascript:call(test_customObject_setSmoothTime)" class="tip-hotspot" data-tip="设置CustomObject平滑运动插值时间">SetSmoothTime</a> &emsp;
            
            <a id="test_customObject_setScale"  href="javascript:call(test_customObject_setScale)" class="tip-hotspot" data-tip="设置CustomObject缩放">SetScale</a> &emsp;
            <a id="test_customObject_setSmoothMotion"  href="javascript:call(test_customObject_setSmoothMotion)" class="tip-hotspot" data-tip="设置平滑插值|跳跃">SetSmoothMotion</a> &emsp;
            <a id="test_customObject_setTintColor"  href="javascript:call(test_customObject_setTintColor)" class="tip-hotspot" data-tip="设置模型叠加颜色">SetTintColor</a> &emsp;

            <a id="test_customObject_overrideMaterial"  href="javascript:call(test_customObject_overrideMaterial)" class="tip-hotspot" data-tip="替换模型材质">OverrideMaterial</a> &emsp;
            <a id="test_customObject_restoreMaterial"  href="javascript:call(test_customObject_restoreMaterial)" class="tip-hotspot" data-tip="恢复模型材质">RestoreMaterial</a> &emsp;

            <a id="test_customObject_setViewportVisible"  href="javascript:call(test_customObject_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;

            <a id="test_customObject_startMove"  href="javascript:call(test_customObject_startMove)" class="tip-hotspot" data-tip="按轨迹路线移动">StartMove</a> &emsp;

            <a id="test_customObject_pause"  href="javascript:call(test_customObject_pause)" class="tip-hotspot" data-tip="暂停移动">Pause</a> &emsp;
            <a id="test_customObject_resume"  href="javascript:call(test_customObject_resume)" class="tip-hotspot" data-tip="恢复移动">Resume</a> &emsp;
            <a id="test_customObject_setMoveRate"  href="javascript:call(test_customObject_setMoveRate)" class="tip-hotspot" data-tip="设置移动倍速">SetMoveRate</a> &emsp;
            <a id="test_customObject_stop"  href="javascript:call(test_customObject_stop)" class="tip-hotspot" data-tip="停止移动">Stop</a> &emsp;

            <a id="test_customObject_MoveTo"  href="javascript:call(test_customObject_MoveTo)" class="tip-hotspot" data-tip="实时GPS移动">MoveTo</a> &emsp;
            
        </div>

        <div id="a_Vehicle" >
            <img width="24" height="24" src="images/Vehicle.png" /><strong>&nbsp;车辆载具：Vehicle</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Vehicle.html" target="_blank">API帮助</a> &emsp;
            <a id="test_vehicle_add"  href="javascript:call(test_vehicle_add)" class="tip-hotspot" data-tip="添加Vehicle">Add</a> &emsp;
            
            <a id="test_vehicle_addWayPoint"  href="javascript:call(test_vehicle_addWayPoint)" class="tip-hotspot" data-tip="设置Vehicle路径点">SetWayPoint</a> &emsp;

            <a id="test_vehicle_moveTo"  href="javascript:call(test_vehicle_moveTo)" class="tip-hotspot" data-tip="设置Vehicle实时移动路径点">MoveTo</a> &emsp;

            <a id="test_vehicle_start"  href="javascript:call(test_vehicle_start)" class="tip-hotspot" data-tip="启动载具运动">Start</a> &emsp;
            <a id="test_vehicle_pause"  href="javascript:call(test_vehicle_pause)" class="tip-hotspot" data-tip="暂停载具运动">Pause</a> &emsp;
            <a id="test_vehicle_resume"  href="javascript:call(test_vehicle_resume)" class="tip-hotspot" data-tip="恢复载具运动">Resume</a> &emsp;
            <a id="test_vehicle_stop"  href="javascript:call(test_vehicle_stop)" class="tip-hotspot" data-tip="停止载具运动">Stop</a> &emsp;

            <a id="test_vehicle_get"  href="javascript:call(test_vehicle_get)" class="tip-hotspot" data-tip="查询Vehicle">Get</a> &emsp;
            <a id="test_vehicle_update"  href="javascript:call(test_vehicle_update)" class="tip-hotspot" data-tip="修改Vehicle">Update</a> &emsp;
            <a id="test_vehicle_delete"  href="javascript:call(test_vehicle_delete)" class="tip-hotspot" data-tip="删除Vehicle">Delete</a> &emsp;
            <a id="test_vehicle_clear"  href="javascript:call(test_vehicle_clear)" class="tip-hotspot" data-tip="清空Vehicle">Clear</a> &emsp;
            <a id="test_vehicle_focus"  href="javascript:call(test_vehicle_focus)" class="tip-hotspot" data-tip="定位Vehicle">Focus</a> &emsp;
            <a id="test_vehicle_show"  href="javascript:call(test_vehicle_show)" class="tip-hotspot" data-tip="显示Vehicle">Show</a> &emsp;
            <a id="test_vehicle_hide"  href="javascript:call(test_vehicle_hide)" class="tip-hotspot" data-tip="隐藏Vehicle">Hide</a> &emsp;
        </div>

        <div id="a_GaussianSplatting" >
                <img width="24" height="24" src="images/gaussianSplatting.png" /><strong>&nbsp;高斯泼溅对象：GaussianSplatting</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
                <br> &emsp;
                <a href="doc/gaussianSplatting.html" target="_blank">API帮助</a> &emsp;
                <a id="test_gaussianSplatting_add"  href="javascript:call(test_gaussianSplatting_add)" class="tip-hotspot" data-tip="添加gaussianSplatting">Add</a> &emsp;
                <a id="test_gaussianSplatting_update"  href="javascript:call(test_gaussianSplatting_update)" class="tip-hotspot" data-tip="修改gaussianSplatting">Update</a> &emsp;
                <a id="test_gaussianSplatting_delete"  href="javascript:call(test_gaussianSplatting_delete)" class="tip-hotspot" data-tip="删除gaussianSplatting">Delete</a> &emsp;
                <a id="test_gaussianSplatting_clear"  href="javascript:call(test_gaussianSplatting_clear)" class="tip-hotspot" data-tip="清空gaussianSplatting">Clear</a> &emsp;
                <a id="test_gaussianSplatting_focus"  href="javascript:call(test_gaussianSplatting_focus)" class="tip-hotspot" data-tip="定位gaussianSplatting">Focus</a> &emsp;
                <a id="test_gaussianSplatting_show"  href="javascript:call(test_gaussianSplatting_show)" class="tip-hotspot" data-tip="显示gaussianSplatting">Show</a> &emsp;
                <a id="test_gaussianSplatting_hide"  href="javascript:call(test_gaussianSplatting_hide)" class="tip-hotspot" data-tip="隐藏gaussianSplatting">Hide</a> &emsp;
                <a id="test_gaussianSplatting_get"  href="javascript:call(test_gaussianSplatting_get)" class="tip-hotspot" data-tip="查询gaussianSplatting">Get</a> &emsp;
        </div>

        <div id="a_ExcavationAnalysis" >
            <img width="24" height="24" src="images/excavationAnalysis.png" /><strong>&nbsp;超欠挖分析模型：ExcavationAnalysis</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/excavationAnalysis.html" target="_blank">API帮助</a> &emsp;
            <a id="test_excavationAnalysis_add"  href="javascript:call(test_excavationAnalysis_add)" class="tip-hotspot" data-tip="添加excavationAnalysis">Add</a> &emsp;
            <a id="test_excavationAnalysis_update"  href="javascript:call(test_excavationAnalysis_update)" class="tip-hotspot" data-tip="修改excavationAnalysis">Update</a> &emsp;
            <a id="test_excavationAnalysis_delete"  href="javascript:call(test_excavationAnalysis_delete)" class="tip-hotspot" data-tip="删除excavationAnalysis">Delete</a> &emsp;
            <a id="test_excavationAnalysis_clear"  href="javascript:call(test_excavationAnalysis_clear)" class="tip-hotspot" data-tip="清空excavationAnalysis">Clear</a> &emsp;
            <a id="test_excavationAnalysis_focus"  href="javascript:call(test_excavationAnalysis_focus)" class="tip-hotspot" data-tip="定位excavationAnalysis">Focus</a> &emsp;
            <a id="test_excavationAnalysis_show"  href="javascript:call(test_excavationAnalysis_show)" class="tip-hotspot" data-tip="显示excavationAnalysis">Show</a> &emsp;
            <a id="test_excavationAnalysis_hide"  href="javascript:call(test_excavationAnalysis_hide)" class="tip-hotspot" data-tip="隐藏excavationAnalysis">Hide</a> &emsp;
            <a id="test_excavationAnalysis_get"  href="javascript:call(test_excavationAnalysis_get)" class="tip-hotspot" data-tip="查询excavationAnalysis">Get</a> &emsp;
        </div>

        

        <!-- 标记类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">标记类对象</p>
        <div id="a_Marker">
            <img width="24" height="24" src="images/tag.png" /><strong>&nbsp;点标记：Marker</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Marker.html" target="_blank">API帮助</a>&emsp;
            <a id="test_marker_add"  href="javascript:call(test_marker_add)" class="tip-hotspot" data-tip="添加标注">Add</a>&emsp;
            <a id="test_marker_update"  href="javascript:call(test_marker_update)" class="tip-hotspot" data-tip="修改标注">Update</a>&emsp;
            <a id="test_marker_delete"  href="javascript:call(test_marker_delete)" class="tip-hotspot" data-tip="删除标注">Delete</a>&emsp;
            <a id="test_marker_clear"  href="javascript:call(test_marker_clear)" class="tip-hotspot" data-tip="清空所有标注">Clear</a>&emsp;
            <a id="test_marker_focus"  href="javascript:call(test_marker_focus)" class="tip-hotspot" data-tip="定位标注">Focus</a>            &emsp;
            <a id="test_marker_focusAll"  href="javascript:call(test_marker_focusAll)" class="tip-hotspot" data-tip="定位显示所有标注">FocusAll</a>&emsp;
            <a id="test_marker_show"  href="javascript:call(test_marker_show)" class="tip-hotspot" data-tip="显示指定标注">Show</a>&emsp;
            <a id="test_marker_showAll"  href="javascript:call(test_marker_showAll)" class="tip-hotspot" data-tip="显示所有标注">ShowAll</a> &emsp;
            <a id="test_marker_hideAll"  href="javascript:call(test_marker_hideAll)" class="tip-hotspot" data-tip="隐藏所有标注">HideAll</a>&emsp;
            <a id="test_marker_hide"  href="javascript:call(test_marker_hide)" class="tip-hotspot" data-tip="隐藏指定标注">Hide</a>&emsp;

            <a id="test_marker_showByGroupId"  href="javascript:call(test_marker_showByGroupId)" class="tip-hotspot" data-tip="按分组显示标注">ShowByGroupId</a>&emsp;
            <a id="test_marker_hideByGroupId"  href="javascript:call(test_marker_hideByGroupId)" class="tip-hotspot" data-tip="按分组隐藏标注">HideByGroupId</a>&emsp;
            <a id="test_marker_deleteByGroupId"  href="javascript:call(test_marker_deleteByGroupId)" class="tip-hotspot" data-tip="按分组删除标注">DeleteByGroupId</a>&emsp;


            <a id="test_marker_setViewportVisible"  href="javascript:call(test_marker_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;


            <a id="test_marker_get"  href="javascript:call(test_marker_get)" class="tip-hotspot" data-tip="获取指定标注信息">Get</a><br><br>&emsp;
            <a id="test_marker_setAttachCustomObject"  href="javascript:call(test_marker_setAttachCustomObject)"><font color="#555">标注贴合对象：</font>AttachObject</a><br><br>&emsp;
            <a id="test_marker_showPopupWindow"  href="javascript:call(test_marker_showPopupWindow)"><font color="#555">显示标注的弹出窗口：</font>ShowPopupWindow</a><br>&emsp;
            <a id="test_marker_hidePopupWindow"  href="javascript:call(test_marker_hidePopupWindow)"><font color="#555">隐藏标注的弹出窗口：</font>HidePopupWindow</a><br>&emsp;
            <a id="test_marker_showAllPopupWindow"  href="javascript:call(test_marker_showAllPopupWindow)"><font color="#555">显示所有弹出窗口：</font>ShowAllPopupWindow</a><br>&emsp;
            <a id="test_marker_hideAllPopupWindow"  href="javascript:call(test_marker_hideAllPopupWindow)"><font color="#555">隐藏所有弹出窗口：</font>HideAllPopupWindow</a><br><br>&emsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            <a id="test_marker_add_canvas"  href="javascript:call(test_marker_add_canvas)"><font color="#555">用canvas绘制标签的imagePath属性：</font>Add</a> <br><br>&emsp;
            
            <font color="#555">属性修改测试：</font><br />&emsp;&emsp;
            <a id="test_marker_setAnchors"  href="javascript:call(test_marker_setAnchors)" class="tip-hotspot" data-tip="修改标注的属性：锚点">Anchors</a>&emsp;
            <a id="test_marker_setCoordinate"  href="javascript:call(test_marker_setCoordinate)" class="tip-hotspot" data-tip="修改标注的属性：坐标值">Coordinate</a>&emsp;
            <a id="test_marker_setImagePath"  href="javascript:call(test_marker_setImagePath)" class="tip-hotspot" data-tip="修改标注的属性：图片地址">ImagePath</a>&emsp;
            <a id="test_marker_setImageSize"  href="javascript:call(test_marker_setImageSize)" class="tip-hotspot" data-tip="修改标注的属性：图片大小">ImageSize</a>&emsp;
            <a id="test_marker_setURL"  href="javascript:call(test_marker_setURL)" class="tip-hotspot" data-tip="修改标注的属性：URL">URL</a>&emsp;
            <a id="test_marker_setText"  href="javascript:call(test_marker_setText)" class="tip-hotspot" data-tip="修改标注的属性：显示文本">Text</a>&emsp;
            <a id="test_marker_setRange"  href="javascript:call(test_marker_setRange)" class="tip-hotspot" data-tip="修改标注的属性：可见距离">Range</a>&emsp;
            <a id="test_marker_setFontColor"  href="javascript:call(test_marker_setFontColor)" class="tip-hotspot" data-tip="修改标注的属性：文本颜色">FontColor</a>&emsp;
            <a id="test_marker_setTextBackgroundColor"  href="javascript:call(test_marker_setTextBackgroundColor)" class="tip-hotspot" data-tip="修改标注的属性：文本背景颜色">TextBackgroundColor</a>&emsp;
            <a id="test_marker_setTextOutlineColor"  href="javascript:call(test_marker_setTextOutlineColor)" class="tip-hotspot" data-tip="修改标注的属性：文本边框颜色">SetFontOutlineColor</a>&emsp;

            <a id="test_marker_setFontOutlineSize"  href="javascript:call(test_marker_setFontOutlineSize)" class="tip-hotspot" data-tip="修改标注的属性：文本边框尺寸">SetFontOutlineSize</a>&emsp;
            <a id="test_marker_setGroupId"  href="javascript:call(test_marker_setGroupId)" class="tip-hotspot" data-tip="修改标注的属性：分组GroupId">SetGroupId</a>&emsp;
            <a id="test_marker_setUserData"  href="javascript:call(test_marker_setUserData)" class="tip-hotspot" data-tip="修改标注的属性：自定义数据">SetUserData</a>&emsp;
            <a id="test_marker_setHoverImagePath"  href="javascript:call(test_marker_setHoverImagePath)" class="tip-hotspot" data-tip="修改标注的属性：hover图片路径">SetHoverImagePath</a>&emsp;
            <a id="test_marker_setTextOffset"  href="javascript:call(test_marker_setTextOffset)" class="tip-hotspot" data-tip="修改标注的属性：文本偏移">SetTextOffset</a>&emsp;
            <a id="test_marker_setFontSize"  href="javascript:call(test_marker_setFontSize)" class="tip-hotspot" data-tip="修改标注的属性：字体大小">SetFontSize</a>&emsp;
            <a id="test_marker_setTextRange"  href="javascript:call(test_marker_setTextRange)" class="tip-hotspot" data-tip="修改标注的属性：文本可见范围">SetTextRange</a>&emsp;
            <a id="test_marker_setAutoHidePopupWindow"  href="javascript:call(test_marker_setAutoHidePopupWindow)" class="tip-hotspot" data-tip="修改标注的属性：自动隐藏弹窗">SetAutoHidePopupWindow</a>&emsp;
            <a id="test_marker_setPopupSize"  href="javascript:call(test_marker_setPopupSize)" class="tip-hotspot" data-tip="修改标注的属性：弹窗尺寸">SetPopupSize</a>&emsp;
            <a id="test_marker_setPopupOffset"  href="javascript:call(test_marker_setPopupOffset)" class="tip-hotspot" data-tip="修改标注的属性：弹窗偏移">SetPopupOffset</a>&emsp;
            <a id="test_marker_setLineSize"  href="javascript:call(test_marker_setLineSize)" class="tip-hotspot" data-tip="修改标注的属性：牵引线尺寸">SetLineSize</a>&emsp;
            <a id="test_marker_setLineColor"  href="javascript:call(test_marker_setLineColor)" class="tip-hotspot" data-tip="修改标注的属性：牵引线颜色">SetLineColor</a>&emsp;
            <a id="test_marker_setLineOffset"  href="javascript:call(test_marker_setLineOffset)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetLineOffset</a>&emsp;
            <a id="test_marker_setPriority"  href="javascript:call(test_marker_setPriority)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetPriority</a>&emsp;
            <a id="test_marker_setOcclusionCull"  href="javascript:call(test_marker_setOcclusionCull)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetOcclusionCull</a>&emsp;
            <a id="test_marker_setClusterStyle"  href="javascript:call(test_marker_setClusterStyle)" class="tip-hotspot" data-tip="设置聚合后的样式">SetClusterStyle</a>&emsp;
            
        </div>
        
        
        <div id="a_Marker3D" >
            <img width="24" height="24" src="images/tag.png" /><strong>&nbsp;三维点标记：Marker3D</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Marker3D.html" target="_blank">API帮助</a>&emsp;
            <a id="test_marker3d_add"  href="javascript:call(test_marker3d_add)" class="tip-hotspot" data-tip="添加3D标注">Add</a>&emsp;
            <a id="test_marker3d_update"  href="javascript:call(test_marker3d_update)" class="tip-hotspot" data-tip="修改3D标注">Update</a>&emsp;
            <a id="test_marker3d_delete"  href="javascript:call(test_marker3d_delete)" class="tip-hotspot" data-tip="删除3D标注">Delete</a>&emsp;
            <a id="test_marker3d_clear"  href="javascript:call(test_marker3d_clear)" class="tip-hotspot" data-tip="清空所有3D标注">Clear</a>&emsp;
            <a id="test_marker3d_focus"  href="javascript:call(test_marker3d_focus)" class="tip-hotspot" data-tip="定位3D标注">Focus</a>&emsp;
            <a id="test_marker3d_show"  href="javascript:call(test_marker3d_show)" class="tip-hotspot" data-tip="显示指定3D标注">Show</a>&emsp;
            <a id="test_marker3d_hide"  href="javascript:call(test_marker3d_hide)" class="tip-hotspot" data-tip="隐藏指定3D标注">Hide</a>&emsp;
            <a id="test_marker3d_showAll"  href="javascript:call(test_marker3d_showAll)" class="tip-hotspot" data-tip="显示所有3D标注">ShowAll</a> &emsp;
            <a id="test_marker3d_hideAll"  href="javascript:call(test_marker3d_hideAll)" class="tip-hotspot" data-tip="隐藏所有3D标注">HideAll</a>&emsp;
            <a id="test_marker3d_get"  href="javascript:call(test_marker3d_get)" class="tip-hotspot" data-tip="获取指定3D标注信息">Get</a><br><br>&emsp;

            <a id="test_marker3d_setViewHeightRange"  href="javascript:call(test_marker3d_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            <a id="test_marker3d_setAttachCustomObject" title="3D标注贴合对象："  href="javascript:call(test_marker3d_setAttachCustomObject)">AttachObject</a><br><br>&emsp;


            <a id="test_marker3d_getBPFunction"  href="javascript:call(test_marker3d_getBPFunction)" class="tip-hotspot" data-tip="获取3D标注包含的蓝图函数信息">GetBPFunction</a> &emsp;
            <a id="test_marker3d_callBatchFunction"  href="javascript:call(test_marker3d_callBatchFunction)" class="tip-hotspot" data-tip="调用多个蓝图函数">CallBPFunction</a> &emsp;
            

            <a id="test_marker3d_showByGroupId"  href="javascript:call(test_marker3d_showByGroupId)" class="tip-hotspot" data-tip="按分组显示3D标注">ShowByGroupId</a>&emsp;
            <a id="test_marker3d_hideByGroupId"  href="javascript:call(test_marker3d_hideByGroupId)" class="tip-hotspot" data-tip="按分组隐藏3D标注">HideByGroupId</a>&emsp;
            <a id="test_marker3d_deleteByGroupId"  href="javascript:call(test_marker3d_deleteByGroupId)" class="tip-hotspot" data-tip="按分组删除3D标注">DeleteByGroupId</a>&emsp;
            
        </div>

        <!-- 
        <div id="a_Tag" >
            <img width="24" height="24" src="images/tag.png" /><strong>&nbsp;标注：Tag</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Tag.html" target="_blank">API帮助</a> &emsp;
            <a id="test_tag_add"  href="javascript:call(test_tag_add)" class="tip-hotspot" data-tip="添加标签">Add</a> &emsp;
            <a id="test_tag_update"  href="javascript:call(test_tag_update)" class="tip-hotspot" data-tip="修改标签">Update</a> &emsp;
            <a id="test_tag_delete"  href="javascript:call(test_tag_delete)" class="tip-hotspot" data-tip="删除标签">Delete</a> &emsp;
            <a id="test_tag_clear"  href="javascript:call(test_tag_clear)" class="tip-hotspot" data-tip="清空所有标签">Clear</a> &emsp;
            <a id="test_tag_focus"  href="javascript:call(test_tag_focus)" class="tip-hotspot" data-tip="定位标签">Focus</a> &emsp;
            <a id="test_tag_focusAll"  href="javascript:call(test_tag_focusAll)" class="tip-hotspot" data-tip="定位显示所有标签">FocusAll</a> &emsp;
            <a id="test_tag_show"  href="javascript:call(test_tag_show)" class="tip-hotspot" data-tip="显示指定标签">Show</a> &emsp;
            <a id="test_tag_showAll"  href="javascript:call(test_tag_showAll)" class="tip-hotspot" data-tip="显示所有标签">ShowAll</a>  &emsp;
            <a id="test_tag_hideAll"  href="javascript:call(test_tag_hideAll)" class="tip-hotspot" data-tip="隐藏所有标签">HideAll</a> &emsp;
            <a id="test_tag_hide"  href="javascript:call(test_tag_hide)" class="tip-hotspot" data-tip="隐藏指定标签">Hide</a> &emsp;
            <a id="test_tag_get"  href="javascript:call(test_tag_get)" class="tip-hotspot" data-tip="获取指定标签信息">Get</a> <br><br>&emsp;
            <a id="test_tag_showPopupWindow"  href="javascript:call(test_tag_showPopupWindow)"><font color="#555">显示标签的弹出窗口：</font>ShowPopupWindow</a><br>&emsp;
            <a id="test_tag_hidePopupWindow"  href="javascript:call(test_tag_hidePopupWindow)"><font color="#555">隐藏标签的弹出窗口：</font>HidePopupWindow</a><br>&emsp;
            <a id="test_tag_showAllPopupWindow"  href="javascript:call(test_tag_showAllPopupWindow)"><font color="#555">显示所有弹出窗口：</font>ShowAllPopupWindow</a><br>&emsp;
            <a id="test_tag_hideAllPopupWindow"  href="javascript:call(test_tag_hideAllPopupWindow)"><font color="#555">隐藏所有弹出窗口：</font>HideAllPopupWindow</a><br><br>&emsp;
            <a id="test_tag_add_canvas"  href="javascript:call(test_tag_add_canvas)"><font color="#555">用canvas绘制标签的imagePath属性：</font>Add</a> <br><br>&emsp;                                                                                                                                                                                                                                                                                                                                                                                                                        
            <font color="#555">属性修改测试：</font><br /> &emsp; &emsp;
            <a id="test_tag_setCoordinate"  href="javascript:call(test_tag_setCoordinate)" class="tip-hotspot" data-tip="修改标签的属性：坐标值">Coordinate</a> &emsp;
            <a id="test_tag_setImagePath"  href="javascript:call(test_tag_setImagePath)" class="tip-hotspot" data-tip="修改标签的属性：图片地址">ImagePath</a> &emsp;
            <a id="test_tag_setImageSize"  href="javascript:call(test_tag_setImageSize)" class="tip-hotspot" data-tip="修改标签的属性：图片大小">ImageSize</a> &emsp;
            <a id="test_tag_setURL"  href="javascript:call(test_tag_setURL)" class="tip-hotspot" data-tip="修改标签的属性：URL">URL</a> &emsp;
            <a id="test_tag_setText"  href="javascript:call(test_tag_setText)" class="tip-hotspot" data-tip="修改标签的属性：显示文本">Text</a> &emsp;
            <a id="test_tag_setRange"  href="javascript:call(test_tag_setRange)" class="tip-hotspot" data-tip="修改标签的属性：可见距离">Range</a> &emsp;
            <a id="test_tag_setTextColor"  href="javascript:call(test_tag_setTextColor)" class="tip-hotspot" data-tip="修改标签的属性：文本颜色">TextColor</a> &emsp;
            <a id="test_tag_setTextBackgroundColor"  href="javascript:call(test_tag_setTextBackgroundColor)" class="tip-hotspot" data-tip="修改标签的属性：文本背景颜色">TextBackgroundColor</a> &emsp;
            <a id="test_tag_setTextBorderColor"  href="javascript:call(test_tag_setTextBorderColor)" class="tip-hotspot" data-tip="修改标签的属性：文本边框颜色">TextBorderColor</a> &emsp;
            <a id="test_tag_setShowLine"  href="javascript:call(test_tag_setShowLine)" class="tip-hotspot" data-tip="修改标签的属性：是否显示牵引线">ShowLine</a> &emsp;
        </div>

        <div id="a_CustomTag" >
            <img width="24" height="24" src="images/ctag.png" /><strong>CustomTag</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CustomTag.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ctag_add"  href="javascript:call(test_ctag_add)" class="tip-hotspot" data-tip="添加自定义标签">Add</a> &emsp;
            <a id="test_ctag_update"  href="javascript:call(test_ctag_update)" class="tip-hotspot" data-tip="修改自定义标签">Update</a> &emsp;
            <a id="test_ctag_delete"  href="javascript:call(test_ctag_delete)" class="tip-hotspot" data-tip="删除自定义标签">Delete</a> &emsp;
            <a id="test_ctag_clear"  href="javascript:call(test_ctag_clear)" class="tip-hotspot" data-tip="清空自定义标签">Clear</a> &emsp;
            <a id="test_ctag_focus"  href="javascript:call(test_ctag_focus)" class="tip-hotspot" data-tip="定位自定义标签">Focus</a>
             &emsp;
            <a id="test_ctag_show"  href="javascript:call(test_ctag_show)" class="tip-hotspot" data-tip="显示指定的自定义标签">Show</a> &emsp;
            <a id="test_ctag_showAll"  href="javascript:call(test_ctag_showAll)" class="tip-hotspot" data-tip="显示所有自定义标签">ShowAll</a>  &emsp;
            <a id="test_ctag_hideAll"  href="javascript:call(test_ctag_hideAll)" class="tip-hotspot" data-tip="隐藏所有自定义标签">HideAll</a> &emsp;
            <a id="test_ctag_hide"  href="javascript:call(test_ctag_hide)" class="tip-hotspot" data-tip="隐藏指定的自定义标签">Hide</a> &emsp;
            <a id="test_ctag_get"  href="javascript:call(test_ctag_get)" class="tip-hotspot" data-tip="获取指定的自定义标签信息">Get</a> &emsp;
        </div>
        -->

        <!-- 矢量图形类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">矢量图形类对象</p>
        <div id="a_Polyline" >
            <img width="24" height="24" src="images/polyline.png" /><strong>&nbsp;折线：Polyline</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polyline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_polyline_add"  href="javascript:call(test_polyline_add)" class="tip-hotspot" data-tip="添加Polyline">Add</a> &emsp;
            <a id="test_polyline_update"  href="javascript:call(test_polyline_update)" class="tip-hotspot" data-tip="修改Polyline">Update</a> &emsp;
            <a id="test_polyline_delete"  href="javascript:call(test_polyline_delete)" class="tip-hotspot" data-tip="删除Polyline">Delete</a> &emsp;
            <a id="test_polyline_clear"  href="javascript:call(test_polyline_clear)" class="tip-hotspot" data-tip="清空Polyline">Clear</a> &emsp;
            <a id="test_polyline_focus"  href="javascript:call(test_polyline_focus)" class="tip-hotspot" data-tip="定位Polyline">Focus</a>  &emsp;
            <a id="test_polyline_show"  href="javascript:call(test_polyline_show)" class="tip-hotspot" data-tip="显示指定的Polyline">Show</a> &emsp;
            <a id="test_polyline_showAll"  href="javascript:call(test_polyline_showAll)" class="tip-hotspot" data-tip="显示所有的Polyline">ShowAll</a> &emsp;
            <a id="test_polyline_hide"  href="javascript:call(test_polyline_hide)" class="tip-hotspot" data-tip="隐藏指定的Polyline">Hide</a> &emsp;
            <a id="test_polyline_hideAll"  href="javascript:call(test_polyline_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Polyline">HideAll</a> &emsp;
            <a id="test_polyline_get"  href="javascript:call(test_polyline_get)" class="tip-hotspot" data-tip="获取指定的Polyline信息">Get</a> &emsp;

            <a id="test_polyline_attachObject"  href="javascript:call(test_polyline_attachObject)" class="tip-hotspot" data-tip="折线贴合模型">AttachObject</a><br><br> &emsp;

            <font color="#555">属性修改测试：</font><br><br>&emsp;
            <a id="test_polyline_setCoordinates"  href="javascript:call(test_polyline_setCoordinates)"> <font color="#555">设置坐标值：</font>SetCoordinates</a><br>&emsp;
            <a id="test_polyline_setStyle"  href="javascript:call(test_polyline_setStyle)"> <font color="#555">设置新的样式：</font>SetStyle</a><br> &emsp;
            <a id="test_polyline_setThickness"  href="javascript:call(test_polyline_setThickness)"> <font color="#555">设置新的厚度：</font>SetThickness</a><br> &emsp;
            <a id="test_polyline_setColor"  href="javascript:call(test_polyline_setColor)"> <font color="#555">设置新的颜色值：</font>SetColor</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <a id="test_polyline_setFlowRate"  href="javascript:call(test_polyline_setFlowRate)"> <font color="#555">设置新的流速：</font>SetFlowRate</a><br> &emsp;
            <a id="test_polyline_setBrightness"  href="javascript:call(test_polyline_setBrightness)"> <font color="#555">设置新的亮度：</font>SetBrightness</a> <br>&emsp;
            <a id="test_polyline_setShape"  href="javascript:call(test_polyline_setShape)"> <font color="#555">设置新的形状：</font>SetShape</a><br> &emsp;
            <a id="test_polyline_setDepthTest"  href="javascript:call(test_polyline_setDepthTest)"> <font color="#555">设置是否做深度检测：</font>SetDepthTest</a><br>&emsp;

            <a id="test_polyline_setViewHeightRange"  href="javascript:call(test_polyline_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围"><font color="#555">设置可视高度范围：</font>SetViewHeightRange</a>&emsp;
            
            
        </div>

        <div id="a_GuideLine">
            <img width="24" height="24" src="images/guideline.png" /><strong>&nbsp;引导线：GuideLine</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/guideline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_guideline_add"  href="javascript:call(test_guideline_add)" class="tip-hotspot" data-tip="添加">Add</a> &emsp;
            <a id="test_guideline_update"  href="javascript:call(test_guideline_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_guideline_delete"  href="javascript:call(test_guideline_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_guideline_clear"  href="javascript:call(test_guideline_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_guideline_focus"  href="javascript:call(test_guideline_focus)" class="tip-hotspot" data-tip="定位">Focus</a>  &emsp;
            <a id="test_guideline_show"  href="javascript:call(test_guideline_show)" class="tip-hotspot" data-tip="显示">Show</a> &emsp;
            <a id="test_guideline_hide"  href="javascript:call(test_guideline_hide)" class="tip-hotspot" data-tip="隐藏">Hide</a> &emsp;
            <!--
            <a id="test_guideline_showAll"  href="javascript:call(test_guideline_showAll)" class="tip-hotspot" data-tip="显示所有">ShowAll</a> &emsp;
            <a id="test_guideline_hideAll"  href="javascript:call(test_guideline_hideAll)" class="tip-hotspot" data-tip="隐藏所有">HideAll</a> &emsp;
            -->
            <a id="test_guideline_get"  href="javascript:call(test_guideline_get)" class="tip-hotspot" data-tip="查询">Get</a> &emsp;
        </div>        


        <div id="a_TopologyLine" >
            <img width="24" height="24" src="images/topologyLine.png" /><strong>&nbsp;拓扑线：TopologyLine</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/TopologyLine.html" target="_blank">API帮助</a> &emsp;
            <a id="test_topologyLine_add"  href="javascript:call(test_topologyLine_add)" class="tip-hotspot" data-tip="添加TopologyLine">Add</a> &emsp;
            <a id="test_topologyLine_update"  href="javascript:call(test_topologyLine_update)" class="tip-hotspot" data-tip="修改TopologyLine">Update</a> &emsp;
            <a id="test_topologyLine_delete"  href="javascript:call(test_topologyLine_delete)" class="tip-hotspot" data-tip="删除TopologyLine">Delete</a> &emsp;
            <a id="test_topologyLine_clear"  href="javascript:call(test_topologyLine_clear)" class="tip-hotspot" data-tip="清空TopologyLine">Clear</a> &emsp;
            <a id="test_topologyLine_focus"  href="javascript:call(test_topologyLine_focus)" class="tip-hotspot" data-tip="定位TopologyLine">Focus</a>  &emsp;
            <a id="test_topologyLine_show"  href="javascript:call(test_topologyLine_show)" class="tip-hotspot" data-tip="显示指定的TopologyLine">Show</a> &emsp;
            <a id="test_topologyLine_showAll"  href="javascript:call(test_topologyLine_showAll)" class="tip-hotspot" data-tip="显示所有的TopologyLine">ShowAll</a> &emsp;
            <a id="test_topologyLine_hide"  href="javascript:call(test_topologyLine_hide)" class="tip-hotspot" data-tip="隐藏指定的TopologyLine">Hide</a> &emsp;
            <a id="test_topologyLine_hideAll"  href="javascript:call(test_topologyLine_hideAll)" class="tip-hotspot" data-tip="隐藏所有的TopologyLine">HideAll</a> &emsp;
            <a id="test_topologyLine_get"  href="javascript:call(test_topologyLine_get)" class="tip-hotspot" data-tip="获取指定的TopologyLine信息">Get</a><br><br> &emsp;

        </div>

        
        <div id="a_ODLine" >
            <img width="24" height="24" src="images/odline.png" /><strong>&nbsp;迁徙线：ODLine</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/odline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_odline_add"  href="javascript:call(test_odline_add)" class="tip-hotspot" data-tip="添加ODLine">Add</a> &emsp;
            <a id="test_odline_update"  href="javascript:call(test_odline_update)" class="tip-hotspot" data-tip="修改ODLine">Update</a> &emsp;
            <a id="test_odline_delete"  href="javascript:call(test_odline_delete)" class="tip-hotspot" data-tip="删除指定的ODLine">Delete</a> &emsp;
            <a id="test_odline_clear"  href="javascript:call(test_odline_clear)" class="tip-hotspot" data-tip="清空所有的ODLine">Clear</a> &emsp;
            <a id="test_odline_focus"  href="javascript:call(test_odline_focus)" class="tip-hotspot" data-tip="定位ODLine">Focus</a>  &emsp;
            <a id="test_odline_show"  href="javascript:call(test_odline_show)" class="tip-hotspot" data-tip="显示指定的ODLine">Show</a> &emsp;
            <a id="test_odline_showAll"  href="javascript:call(test_odline_showAll)" class="tip-hotspot" data-tip="显示所有的ODLine">ShowAll</a> &emsp;
            <a id="test_odline_hide"  href="javascript:call(test_odline_hide)" class="tip-hotspot" data-tip="隐藏指定的ODLine">Hide</a> &emsp;
            <a id="test_odline_hideAll"  href="javascript:call(test_odline_hideAll)" class="tip-hotspot" data-tip="隐藏所有的ODLine">HideAll</a> &emsp;
            <a id="test_odline_get"  href="javascript:call(test_odline_get)" class="tip-hotspot" data-tip="获取指定的ODLine信息">Get</a> &emsp;
        </div>

        


        <div id="a_Polygon" >
            <img width="24" height="24" src="images/polygon.png" /><strong>&nbsp;多边形：Polygon</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polygon.html" target="_blank">API帮助</a> &emsp;
            <a id="test_polygon_add"  href="javascript:call(test_polygon_add)" class="tip-hotspot" data-tip="添加Polygon">Add</a> &emsp;
            <a id="test_polygon_update"  href="javascript:call(test_polygon_update)" class="tip-hotspot" data-tip="修改Polygon">Update</a> &emsp;
            <a id="test_polygon_delete"  href="javascript:call(test_polygon_delete)" class="tip-hotspot" data-tip="删除Polygon">Delete</a> &emsp;
            <a id="test_polygon_clear"  href="javascript:call(test_polygon_clear)" class="tip-hotspot" data-tip="清空Polygon">Clear</a> &emsp;
            <a id="test_polygon_focus"  href="javascript:call(test_polygon_focus)" class="tip-hotspot" data-tip="定位Polygon">Focus</a>  &emsp;
            <a id="test_polygon_show"  href="javascript:call(test_polygon_show)" class="tip-hotspot" data-tip="显示Polygon">Show</a> &emsp;
            <a id="test_polygon_hide"  href="javascript:call(test_polygon_hide)" class="tip-hotspot" data-tip="隐藏Polygon">Hide</a> &emsp;
            <a id="test_polygon_highlight"  href="javascript:call(test_polygon_highlight)" class="tip-hotspot" data-tip="高亮Polygon">Highlight</a> &emsp;
            <a id="test_polygon_stophighlight"  href="javascript:call(test_polygon_stophighlight)" class="tip-hotspot" data-tip="取消高亮Polygon">UnHighlight</a> &emsp;
            <a id="test_polygon_get"  href="javascript:call(test_polygon_get)" class="tip-hotspot" data-tip="获取Polygon信息">Get</a> &emsp;

            <a id="test_polygon_setViewHeightRange"  href="javascript:call(test_polygon_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            

        </div>

        <div id="a_Polygon3D" >
            <img width="24" height="24" src="images/polygon3d.png" /><strong>&nbsp;三维多边形：Polygon3D</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polygon3D.html" target="_blank">API帮助</a> &emsp;
            <a id="test_polygon3d_add"  href="javascript:call(test_polygon3d_add)" class="tip-hotspot" data-tip="添加Polygon3D">Add</a> &emsp;
            <a id="test_polygon3d_update"  href="javascript:call(test_polygon3d_update)" class="tip-hotspot" data-tip="修改Polygon3D">Update</a>  &emsp;
            <a id="test_polygon3d_delete"  href="javascript:call(test_polygon3d_delete)" class="tip-hotspot" data-tip="删除Polygon3D">Delete</a> &emsp;
            <a id="test_polygon3d_clear"  href="javascript:call(test_polygon3d_clear)" class="tip-hotspot" data-tip="清空Polygon3D">Clear</a> &emsp;
            <a id="test_polygon3d_focus"  href="javascript:call(test_polygon3d_focus)" class="tip-hotspot" data-tip="定位Polygon3D">Focus</a> &emsp;
            <a id="test_polygon3d_show"  href="javascript:call(test_polygon3d_show)" class="tip-hotspot" data-tip="显示Polygon3D">Show</a>  &emsp;
            <a id="test_polygon3d_hide"  href="javascript:call(test_polygon3d_hide)" class="tip-hotspot" data-tip="隐藏Polygon3D">Hide</a> &emsp;

            <a id="test_polygon3d_showAll"  href="javascript:call(test_polygon3d_showAll)" class="tip-hotspot" data-tip="显示所有Polygon3D">ShowAll</a>  &emsp;
            <a id="test_polygon3d_hideAll"  href="javascript:call(test_polygon3d_hideAll)" class="tip-hotspot" data-tip="隐藏所有Polygon3D">HideAll</a> &emsp;

            <a id="test_polygon3d_highlight"  href="javascript:call(test_polygon3d_highlight)" class="tip-hotspot" data-tip="高亮Polygon3D">Highlight</a> &emsp;
            <a id="test_polygon3d_stopHighlight"  href="javascript:call(test_polygon3d_stopHighlight)" class="tip-hotspot" data-tip="停止高亮Polygon3D">UnHighlight</a> &emsp;

            <a id="test_polygon3d_glow"  href="javascript:call(test_polygon3d_glow)" class="tip-hotspot" data-tip="闪烁Polygon3D">Glow</a> &emsp;
            <a id="test_polygon3d_stopGlow"  href="javascript:call(test_polygon3d_stopGlow)" class="tip-hotspot" data-tip="停止闪烁Polygon3D">StopGlow</a> &emsp;

            <a id="test_polygon3d_get"  href="javascript:call(test_polygon3d_get)" class="tip-hotspot" data-tip="获取Polygon3D信息">Get</a> &emsp;

            <a id="test_polygon3d_enableClip"  href="javascript:call(test_polygon3d_enableClip)" title="设置Polygon3D的剖切支持">EnableClip</a> &emsp;
            <a id="test_polygon3d_disableClip"  href="javascript:call(test_polygon3d_disableClip)" title="禁止Polygon3D的剖切支持：">DisableClip</a> &emsp;
            <a id="test_polygon3d_setViewHeightRange"  href="javascript:call(test_polygon3d_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
          
        </div>

        <div id="a_CustomMesh" >
            <img width="24" height="24" src="images/mesh.png" /><strong>&nbsp;自定义网格面：CustomMesh</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CustomMesh.html" target="_blank">API帮助</a> &emsp;
            <a id="test_customMesh_add"  href="javascript:call(test_customMesh_add)" class="tip-hotspot" data-tip="添加CustomMesh">Add</a> &emsp;
            <a id="test_customMesh_update"  href="javascript:call(test_customMesh_update)" class="tip-hotspot" data-tip="修改CustomMesh">Update</a> &emsp;
            <a id="test_customMesh_delete"  href="javascript:call(test_customMesh_delete)" class="tip-hotspot" data-tip="删除CustomMesh">Delete</a> &emsp;
            <a id="test_customMesh_clear"  href="javascript:call(test_customMesh_clear)" class="tip-hotspot" data-tip="清空CustomMesh">Clear</a> &emsp;
            <a id="test_customMesh_focus"  href="javascript:call(test_customMesh_focus)" class="tip-hotspot" data-tip="定位CustomMesh">Focus</a> &emsp;
            <a id="test_customMesh_show"  href="javascript:call(test_customMesh_show)" class="tip-hotspot" data-tip="显示CustomMesh">Show</a> &emsp;
            <a id="test_customMesh_hide"  href="javascript:call(test_customMesh_hide)" class="tip-hotspot" data-tip="隐藏CustomMesh">Hide</a> &emsp;
            <a id="test_customMesh_get"  href="javascript:call(test_customMesh_get)" class="tip-hotspot" data-tip="获取CustomMesh信息">Get</a> &emsp;
        </div>

        <div id="a_WaterMesh" >
            <img width="24" height="24" src="images/mesh.png" /><strong>&nbsp;水网格面：WaterMesh</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/WaterMesh.html" target="_blank">API帮助</a> &emsp;
            <a id="test_waterMesh_add"  href="javascript:call(test_waterMesh_add)" class="tip-hotspot" data-tip="添加WaterMesh">Add</a> &emsp;
            <a id="test_waterMesh_update"  href="javascript:call(test_waterMesh_update)" class="tip-hotspot" data-tip="修改WaterMesh">Update</a> &emsp;
            <a id="test_waterMesh_delete"  href="javascript:call(test_waterMesh_delete)" class="tip-hotspot" data-tip="删除WaterMesh">Delete</a> &emsp;
            <a id="test_waterMesh_clear"  href="javascript:call(test_waterMesh_clear)" class="tip-hotspot" data-tip="清空WaterMesh">Clear</a> &emsp;
            <a id="test_waterMesh_focus"  href="javascript:call(test_waterMesh_focus)" class="tip-hotspot" data-tip="定位WaterMesh">Focus</a> &emsp;
            <a id="test_waterMesh_show"  href="javascript:call(test_waterMesh_show)" class="tip-hotspot" data-tip="显示WaterMesh">Show</a> &emsp;
            <a id="test_waterMesh_hide"  href="javascript:call(test_waterMesh_hide)" class="tip-hotspot" data-tip="隐藏WaterMesh">Hide</a> &emsp;
            <a id="test_waterMesh_get"  href="javascript:call(test_waterMesh_get)" class="tip-hotspot" data-tip="获取WaterMesh信息">Get</a> &emsp;
        </div>

        <div id="a_SplineMesh" >
            <img width="24" height="24" src="images/splineMesh.png" /><strong>&nbsp;样条网格面：SplineMesh</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/SplineMesh.html" target="_blank">API帮助</a> &emsp;
            <a id="test_splineMesh_add"  href="javascript:call(test_splineMesh_add)" class="tip-hotspot" data-tip="添加SplineMesh">Add</a> &emsp;
            <a id="test_splineMesh_update"  href="javascript:call(test_splineMesh_update)" class="tip-hotspot" data-tip="修改SplineMesh">Update</a> &emsp;
            <a id="test_splineMesh_delete"  href="javascript:call(test_splineMesh_delete)" class="tip-hotspot" data-tip="删除SplineMesh">Delete</a> &emsp;
            <a id="test_splineMesh_clear"  href="javascript:call(test_splineMesh_clear)" class="tip-hotspot" data-tip="清空SplineMesh">Clear</a> &emsp;
            <a id="test_splineMesh_focus"  href="javascript:call(test_splineMesh_focus)" class="tip-hotspot" data-tip="定位SplineMesh">Focus</a> &emsp;
            <a id="test_splineMesh_show"  href="javascript:call(test_splineMesh_show)" class="tip-hotspot" data-tip="显示SplineMesh">Show</a> &emsp;
            <a id="test_splineMesh_hide"  href="javascript:call(test_splineMesh_hide)" class="tip-hotspot" data-tip="隐藏SplineMesh">Hide</a> &emsp;
            <a id="test_splineMesh_get"  href="javascript:call(test_splineMesh_get)" class="tip-hotspot" data-tip="获取SplineMesh信息">Get</a> &emsp;

            <a id="test_splineMesh_showAll"  href="javascript:call(test_splineMesh_showAll)" class="tip-hotspot" data-tip="显示所有SplineMesh">ShowAll</a> &emsp;
            <a id="test_splineMesh_hideAll"  href="javascript:call(test_splineMesh_hideAll)" class="tip-hotspot" data-tip="隐藏所有SplineMesh">HideAll</a> &emsp;

            <a id="test_splineMesh_showByGroupId"  href="javascript:call(test_splineMesh_showByGroupId)" class="tip-hotspot" data-tip="按组显示SplineMesh">ShowByGroupId</a> &emsp;
            <a id="test_splineMesh_hideByGroupId"  href="javascript:call(test_splineMesh_hideByGroupId)" class="tip-hotspot" data-tip="按组隐藏SplineMesh">HideByGroupId</a> &emsp;
            <a id="test_splineMesh_deleteByGroupId"  href="javascript:call(test_splineMesh_deleteByGroupId)" class="tip-hotspot" data-tip="按组删除SplineMesh">DeleteByGroupId</a> &emsp;

            
            <a id="test_splineMesh_getBPFunction"  href="javascript:call(test_splineMesh_getBPFunction)" class="tip-hotspot" data-tip="获取SplineMesh的蓝图函数">GetBPFunction</a> &emsp;
            <a id="test_splineMesh_callBPFunction"  href="javascript:call(test_splineMesh_callBPFunction)" class="tip-hotspot" data-tip="调用多个蓝图函数">CallBPFunction</a><br> &emsp;
            
        </div>

        <div id="a_DynamicWater" >
            <img width="24" height="24" src="images/dynamicwater.png" /><strong>&nbsp;动态水面：DynamicWater</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/DynamicWater.html" target="_blank">API帮助</a> &emsp;
            <a id="test_dynamicWater_add"  href="javascript:call(test_dynamicWater_add)" class="tip-hotspot" data-tip="添加动态水">Add</a> &emsp;
            <a id="test_dynamicWater_update"  href="javascript:call(test_dynamicWater_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_dynamicWater_delete"  href="javascript:call(test_dynamicWater_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_dynamicWater_clear"  href="javascript:call(test_dynamicWater_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_dynamicWater_focus"  href="javascript:call(test_dynamicWater_focus)" class="tip-hotspot" data-tip="定位">Focus</a> &emsp;
            <!--
            <a id="test_dynamicWater_focusAll"  href="javascript:call(test_dynamicWater_focusAll)" class="tip-hotspot" data-tip="定位所有">FocusAll</a> &emsp;
            -->
            <a id="test_dynamicWater_get"  href="javascript:call(test_dynamicWater_get)" class="tip-hotspot" data-tip="获取信息">Get</a> &emsp;
        </div>

        <div id="a_BoxTrigger">
            <img width="24" height="24" src="images/boxTrigger.png" /><strong>&nbsp;包围盒热区：BoxTrigger</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/boxTrigger.html" target="_blank">API帮助</a>&emsp;
            <a id="test_boxTrigger_add"  href="javascript:call(test_boxTrigger_add)" class="tip-hotspot" data-tip="添加盒子热区范围对象">Add</a>&emsp;
            <a id="test_boxTrigger_delete"  href="javascript:call(test_boxTrigger_delete)" class="tip-hotspot" data-tip="删除盒子热区范围对象">Delete</a>&emsp;
            <a id="test_boxTrigger_clear"  href="javascript:call(test_boxTrigger_clear)" class="tip-hotspot" data-tip="清空盒子热区范围对象">Clear</a>&emsp;

        </div>


        <!-- 覆盖物类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">覆盖物类对象</p>

        <div id="a_Decal" >
            <img width="24" height="24" src="images/decal.png" /><strong>&nbsp;贴花：Decal</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Decal.html" target="_blank">API帮助</a> &emsp;
            <a id="test_decal_add"  href="javascript:call(test_decal_add)" class="tip-hotspot" data-tip="添加贴花">Add</a> &emsp;
            <a id="test_decal_update"  href="javascript:call(test_decal_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_decal_delete"  href="javascript:call(test_decal_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_decal_clear"  href="javascript:call(test_decal_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_decal_focus"  href="javascript:call(test_decal_focus)" class="tip-hotspot" data-tip="定位">Focus</a> &emsp;
            <a id="test_decal_focusAll"  href="javascript:call(test_decal_focusAll)" class="tip-hotspot" data-tip="定位显示所有">FocusAll</a> &emsp;
            <a id="test_decal_get"  href="javascript:call(test_decal_get)" class="tip-hotspot" data-tip="获取信息">Get</a> &emsp;
        </div>
        
        <div id="a_HeatMap">
            <img width="24" height="24" src="images/heatmap.png" /><strong>&nbsp;热力图：HeatMap</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HeatMap.html" target="_blank">API帮助</a> &emsp;
            
            <a id="test_heatmap_add1"  href="javascript:call(test_heatmap_add1)" class="tip-hotspot" data-tip="根据热力点构建HeatMap">AddByHeatPoints</a> &emsp;
            <a id="test_heatmap_addPoints"  href="javascript:call(test_heatmap_addPoints)" class="tip-hotspot" data-tip="热力图添加热力点H">AddPoints</a> &emsp;
            

            <a id="test_heatmap_update"  href="javascript:call(test_heatmap_update)" class="tip-hotspot" data-tip="修改HeatMap">UpdateByPoints</a> &emsp;


            <a id="test_heatmap_add2"  href="javascript:call(test_heatmap_add2)" class="tip-hotspot" data-tip="添加自定义颜色HeatMap">AddByHeatPoints(CustomColor)</a> &emsp;
            <a id="test_heatmap_add3"  href="javascript:call(test_heatmap_add3)" class="tip-hotspot" data-tip="添加自定义样式HeatMap">AddByHeatPoints(CustomStyle)</a> &emsp;
            <a id="test_heatmap_add4"  href="javascript:call(test_heatmap_add4)" class="tip-hotspot" data-tip="云图">AddByBin(云图)</a> &emsp;
           

            <a id="test_heatmap_add5"  href="javascript:call(test_heatmap_add5)" class="tip-hotspot" data-tip="添加HeatMap(从tif文件构建)">AddByTif(tifFile)</a> &emsp;
            <a id="test_heatmap_add6"  href="javascript:call(test_heatmap_add6)" class="tip-hotspot" data-tip="添加HeatMap贴地(从tif文件构建)">AddByTif(tifFile-onTerrain)</a> &emsp;

            <a id="test_heatmap_highlightPixels"  href="javascript:call(test_heatmap_highlightPixels)" class="tip-hotspot" data-tip="高亮Tif内像素块">HighlightPixels</a> &emsp;
            <a id="test_heatmap_unHighlightAllPixels"  href="javascript:call(test_heatmap_unHighlightAllPixels)" class="tip-hotspot" data-tip="取消所有像素块高亮">UnHighlightAllPixels</a> &emsp;

            
            <a id="test_heatmap_delete"  href="javascript:call(test_heatmap_delete)" class="tip-hotspot" data-tip="删除HeatMap">Delete</a> &emsp;
            <a id="test_heatmap_clear"  href="javascript:call(test_heatmap_clear)" class="tip-hotspot" data-tip="清空HeatMap">Clear</a> &emsp;
            <a id="test_heatmap_focus"  href="javascript:call(test_heatmap_focus)" class="tip-hotspot" data-tip="定位HeatMap">Focus</a> &emsp;
            <a id="test_heatmap_show"  href="javascript:call(test_heatmap_show)" class="tip-hotspot" data-tip="显示HeatMap">Show</a> &emsp;
            <a id="test_heatmap_hide"  href="javascript:call(test_heatmap_hide)" class="tip-hotspot" data-tip="隐藏HeatMap">Hide</a> &emsp;
            <a id="test_heatmap_get"  href="javascript:call(test_heatmap_get)" class="tip-hotspot" data-tip="获取HeatMap">Get</a> &emsp;
        </div>

        <div id="a_HeatMap3D" >
            <img width="24" height="24" src="images/heatmap3d.png" /><strong>&nbsp;三维热力图：HeatMap3D</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HeatMap3D.html" target="_blank">API帮助</a> &emsp;
            
            
            <a id="test_heatmap3d_addByImages"  href="javascript:call(test_heatmap3d_addByImages)" class="tip-hotspot" data-tip="根据16张空间图片构建HeatMap3D">AddByImages</a> &emsp;
            
            <a id="test_heatmap3d_addByHeatPoints"  href="javascript:call(test_heatmap3d_addByHeatPoints)" class="tip-hotspot" data-tip="根据离散点对应的热力值构建HeatMap3D">AddByHeatPoints</a> &emsp;

            <a id="test_heatmap3d_addHeatPointsToBox"  href="javascript:call(test_heatmap3d_addHeatPointsToBox)" class="tip-hotspot" data-tip="往HeatMap3D对象内添加离散热力点">AddHeatPointsToBox</a> &emsp;

            <a id="test_heatmap3d_addByVoxels"  href="javascript:call(test_heatmap3d_addByVoxels)" class="tip-hotspot" data-tip="根据空间体素的热力值构建HeatMap3D">AddByVoxels</a> &emsp;
            
            <a id="test_heatmap3d_addBySparseVoxels"  href="javascript:call(test_heatmap3d_addBySparseVoxels)" class="tip-hotspot" data-tip="根据稀疏体素构建HeatMap3D">AddBySparseVoxels</a> &emsp;
            
            <a id="test_heatmap3d_load"  href="javascript:call(test_heatmap3d_load)" class="tip-hotspot" data-tip="根据tif文件加载HeatMap3D动画">Load</a> &emsp;
            <a id="test_heatmap3d_play"  href="javascript:call(test_heatmap3d_play)" class="tip-hotspot" data-tip="播放HeatMap3D动画">Play</a> &emsp;
            <a id="test_heatmap3d_pause"  href="javascript:call(test_heatmap3d_pause)" class="tip-hotspot" data-tip="暂停HeatMap3D动画">Pause</a> &emsp;
            <a id="test_heatmap3d_setTime"  href="javascript:call(test_heatmap3d_setTime)" class="tip-hotspot" data-tip="设置从第几秒开始播放HeatMap3D动画">SetTime</a> &emsp;

            <a id="test_heatmap3d_setViewportVisible"  href="javascript:call(test_heatmap3d_setViewportVisible)" class="tip-hotspot" data-tip="设置HeatMap3D视口可见性">SetViewportVisible</a> &emsp;

            <!-- <a id="test_heatmap3d_add_addVoxels"  href="javascript:call(test_heatmap3d_add_addVoxels)" class="tip-hotspot" data-tip="往HeatMap3D对象内添加三维像素块">AddVoxels</a> &emsp; -->
            <!-- <a id="test_heatmap3d_clip"  href="javascript:call(test_heatmap3d_clip)" class="tip-hotspot" data-tip="动态剖切(仅对display=2盒子模式生效)">ClipTest</a> &emsp; -->
            
            <a id="test_heatmap3d_update"  href="javascript:call(test_heatmap3d_update)" class="tip-hotspot" data-tip="修改HeatMap3D">Update</a> &emsp;
            <a id="test_heatmap3d_delete"  href="javascript:call(test_heatmap3d_delete)" class="tip-hotspot" data-tip="删除HeatMap3D">Delete</a> &emsp;
            <a id="test_heatmap3d_clear"  href="javascript:call(test_heatmap3d_clear)" class="tip-hotspot" data-tip="清空HeatMap3D">Clear</a> &emsp;
            <a id="test_heatmap3d_focus"  href="javascript:call(test_heatmap3d_focus)" class="tip-hotspot" data-tip="定位HeatMap3D">Focus</a> &emsp;
            <a id="test_heatmap3d_show"  href="javascript:call(test_heatmap3d_show)" class="tip-hotspot" data-tip="显示HeatMap3D">Show</a> &emsp;
            <a id="test_heatmap3d_hide"  href="javascript:call(test_heatmap3d_hide)" class="tip-hotspot" data-tip="隐藏HeatMap3D">Hide</a> &emsp;
            <a id="test_heatmap3d_get"  href="javascript:call(test_heatmap3d_get)" class="tip-hotspot" data-tip="获取HeatMap3D">Get</a> &emsp;

            <a id="test_heatmap3d_queryVoxel"  href="javascript:call(test_heatmap3d_queryVoxel)" class="tip-hotspot" data-tip="查询HeatMap3D的体素信息">QueryVoxel</a> &emsp;
        </div>

        <div id="a_OceanHeatMap" >
            <img width="24" height="24" src="images/oceanHeatmap.png" /><strong>&nbsp;海洋热力图：OceanHeatMap</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/oceanHeatMap.html" target="_blank">API帮助</a>&emsp;
       
            <a id="test_oceanHeatmap_add_flow"  href="javascript:call(test_oceanHeatmap_add_flow)" class="tip-hotspot" data-tip="流场样式">Add(流场)</a>&emsp;
            <a id="test_oceanHeatmap_add_arrow"  href="javascript:call(test_oceanHeatmap_add_arrow)" class="tip-hotspot" data-tip="箭头样式">Add(箭头)</a>&emsp;
            <a id="test_oceanHeatmap_add_wave"  href="javascript:call(test_oceanHeatmap_add_wave)" class="tip-hotspot" data-tip="波浪样式">Add(波浪)</a>&emsp;
            

            <a id="test_oceanHeatmap_update_new"  href="javascript:call(test_oceanHeatmap_update_new)" class="tip-hotspot" data-tip="修改海洋热力图">Update</a>&emsp;
            <a id="test_oceanHeatmap_delete_new"  href="javascript:call(test_oceanHeatmap_delete_new)" class="tip-hotspot" data-tip="删除海洋热力图">Delete</a>&emsp;
            <a id="test_oceanHeatmap_clear_new"  href="javascript:call(test_oceanHeatmap_clear_new)" class="tip-hotspot" data-tip="清空所有海洋热力图">Clear</a>&emsp;
            <a id="test_oceanHeatmap_focus_new"  href="javascript:call(test_oceanHeatmap_focus_new)" class="tip-hotspot" data-tip="定位海洋热力图">Focus</a>&emsp;
            <a id="test_oceanHeatmap_show_new"  href="javascript:call(test_oceanHeatmap_show_new)" class="tip-hotspot" data-tip="显示指定海洋热力图">Show</a>&emsp;
            <a id="test_oceanHeatmap_hide_new"  href="javascript:call(test_oceanHeatmap_hide_new)" class="tip-hotspot" data-tip="隐藏指定海洋热力图">Hide</a>&emsp;
            <a id="test_oceanHeatmap_get_new"  href="javascript:call(test_oceanHeatmap_get_new)" class="tip-hotspot" data-tip="获取海洋热力图信息">Get</a><br>&emsp;
        </div>

        
        <div id="a_HighlightArea">
            <img width="24" height="24" src="images/hilightarea.png" /><strong>&nbsp;高亮区域：HighlightArea</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HighlightArea.html" target="_blank">API帮助</a> &emsp;
            <a id="test_highlightArea_add"  href="javascript:call(test_highlightArea_add)" class="tip-hotspot" data-tip="添加高亮区">Add</a> &emsp;
            <a id="test_highlightArea_update"  href="javascript:call(test_highlightArea_update)" class="tip-hotspot" data-tip="修改高亮区">Update</a> &emsp;
            <a id="test_highlightArea_delete"  href="javascript:call(test_highlightArea_delete)" class="tip-hotspot" data-tip="删除高亮区">Delete</a> &emsp;
            <a id="test_highlightArea_clear"  href="javascript:call(test_highlightArea_clear)" class="tip-hotspot" data-tip="清空高亮区">Clear</a> &emsp;
            <a id="test_highlightArea_focus"  href="javascript:call(test_highlightArea_focus)" class="tip-hotspot" data-tip="定位高亮区">Focus</a> &emsp;
            <a id="test_highlightArea_show"  href="javascript:call(test_highlightArea_show)" class="tip-hotspot" data-tip="显示高亮区">Show</a> &emsp;
            <a id="test_highlightArea_hide"  href="javascript:call(test_highlightArea_hide)" class="tip-hotspot" data-tip="隐藏高亮区">Hide</a> &emsp;
            <a id="test_highlightArea_get"  href="javascript:call(test_highlightArea_get)" class="tip-hotspot" data-tip="获取高亮区">Get</a> &emsp;
        </div>


        <div id="a_VideoProjection" >
            <img width="24" height="24" src="images/vp.png" /><strong>&nbsp;视频投影：VideoProjection</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/VideoProjection.html" target="_blank">API帮助</a> &emsp;
            <a id="test_vp_add"  href="javascript:call(test_vp_add)" class="tip-hotspot" data-tip="添加视频投影">Add</a> &emsp;
            <a id="test_vp_update"  href="javascript:call(test_vp_update)" class="tip-hotspot" data-tip="修改视频投影">Update</a> &emsp;
            <a id="test_vp_delete"  href="javascript:call(test_vp_delete)" class="tip-hotspot" data-tip="删除视频投影">Delete</a> &emsp;
            <a id="test_vp_clear"  href="javascript:call(test_vp_clear)" class="tip-hotspot" data-tip="清空视频投影">Clear</a> &emsp;
            <a id="test_vp_focus"  href="javascript:call(test_vp_focus)" class="tip-hotspot" data-tip="定位视频投影">Focus</a> &emsp;
            <a id="test_vp_show"  href="javascript:call(test_vp_show)" class="tip-hotspot" data-tip="显示视频投影">Show</a> &emsp;
            <a id="test_vp_hide"  href="javascript:call(test_vp_hide)" class="tip-hotspot" data-tip="隐藏视频投影">Hide</a> &emsp;
            <a id="test_vp_get"  href="javascript:call(test_vp_get)" class="tip-hotspot" data-tip="获取视频投影">Get</a> <br><br>&emsp;

            <a id="test_vp_setVideoURL"  href="javascript:call(test_vp_setVideoURL)"><font color="#555">设置视频地址：</font>SetVideoURL</a><br> &emsp;
            <a id="test_vp_setLocation"  href="javascript:call(test_vp_setLocation)"><font color="#555">设置位置：</font>SetLocation</a><br> &emsp;
            <a id="test_vp_setRotation"  href="javascript:call(test_vp_setRotation)"><font color="#555">设置旋转值：</font>SetRotation</a><br> &emsp;
            <a id="test_vp_setFovy"  href="javascript:call(test_vp_setFovy)"><font color="#555">设置垂直夹角：</font>SetFovy</a><br><br> &emsp;

            <a id="test_vp_setAspectRatio"  href="javascript:call(test_vp_setAspectRatio)"><font color="#555">设置纵横比：</font>SetAspectRatio</a><br> &emsp;
            <a id="test_vp_setDistance"  href="javascript:call(test_vp_setDistance)"><font color="#555">设置距离：</font>SetDistance</a><br> &emsp;
            <a id="test_vp_setDepthCulling"  href="javascript:call(test_vp_setDepthCulling)"><font color="#555">设置是否背面剔除：</font>SetDepthCulling</a><br> &emsp;
            <a id="test_vp_setFrustumColor"  href="javascript:call(test_vp_setFrustumColor)"><font color="#555">设置投影线框颜色：</font>SetFrustumColor</a><br><br> &emsp;

        </div>

        <!--
        <div id="a_DaHuaVideoFusion" >
            <img width="24" height="24" src="images/vp.png" /><strong>DaHuaVideoFusion</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/DaHuaVideoFusion.html" target="_blank">API帮助</a> &emsp;
            <a id="test_dahuavf_add"  href="javascript:call(test_dahuavf_add)" class="tip-hotspot" data-tip="添加大华视频融合">Add</a> &emsp;
            <a id="test_dahuavf_update"  href="javascript:call(test_dahuavf_update)" class="tip-hotspot" data-tip="修改大华视频融合及包含的摄像头信息">Update</a> &emsp;
            <a id="test_dahuavf_delete"  href="javascript:call(test_dahuavf_delete)" class="tip-hotspot" data-tip="删除大华视频融合">Delete</a> &emsp;
            <a id="test_dahuavf_clear"  href="javascript:call(test_dahuavf_clear)" class="tip-hotspot" data-tip="清空大华视频融合">Clear</a> &emsp;
            <a id="test_dahuavf_focus"  href="javascript:call(test_dahuavf_focus)" class="tip-hotspot" data-tip="定位大华视频融合包含的摄像头">Focus</a> &emsp;
            <a id="test_dahuavf_show"  href="javascript:call(test_dahuavf_show)" class="tip-hotspot" data-tip="显示大华视频融合包含的摄像头信息">Show</a> &emsp;
            <a id="test_dahuavf_hide"  href="javascript:call(test_dahuavf_hide)" class="tip-hotspot" data-tip="隐藏大华视频融合包含的摄像头信息">Hide</a> &emsp;
            <a id="test_dahuavf_get"  href="javascript:call(test_dahuavf_get)" class="tip-hotspot" data-tip="获取大华视频融合包含的摄像头信息">Get</a> <br><br>&emsp;

        </div>
        -->
        
        <div id="a_Panorama" >
            <img width="24" height="24" src="images/panorama.png" /><strong>&nbsp;全景图：Panorama</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Panorama.html" target="_blank">API帮助</a> &emsp;
            <a id="test_panorama_add"  href="javascript:call(test_panorama_add)" class="tip-hotspot" data-tip="添加全景图">Add</a> &emsp;
            <a id="test_panorama_update"  href="javascript:call(test_panorama_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_panorama_delete"  href="javascript:call(test_panorama_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_panorama_clear"  href="javascript:call(test_panorama_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_panorama_focus"  href="javascript:call(test_panorama_focus)" class="tip-hotspot" data-tip="定位">Focus</a> &emsp;
            <a id="test_panorama_get"  href="javascript:call(test_panorama_get)" class="tip-hotspot" data-tip="获取信息">Get</a> &emsp;

            <a id="test_panorama_enter"  href="javascript:call(test_panorama_enter)" class="tip-hotspot" data-tip="进入全景图">Enter</a> &emsp;
            <a id="test_panorama_switchMode"  href="javascript:call(test_panorama_switchMode)" class="tip-hotspot" data-tip="切换显示模式">SwitchMode</a> &emsp;
            <a id="test_panorama_exit"  href="javascript:call(test_panorama_exit)" class="tip-hotspot" data-tip="退出全景图">Exit</a> &emsp;
        </div>


        <!-- 水仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">水仿真对象</p>
        <div id="a_FloodFill">
            <img width="24" height="24" src="images/floodFill.png" /><strong>&nbsp;水淹分析：FloodFill</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/floodFill.html" target="_blank">API帮助</a> &emsp;
            <a id="test_floodFill_add"  href="javascript:call(test_floodFill_add)" class="tip-hotspot" data-tip="添加FloodFill">Add</a> &emsp;
            <a id="test_floodFill_update"  href="javascript:call(test_floodFill_update)" class="tip-hotspot" data-tip="修改FloodFill">Update</a> &emsp;
            <a id="test_floodFill_delete"  href="javascript:call(test_floodFill_delete)" class="tip-hotspot" data-tip="删除指定的FloodFill">Delete</a> &emsp;
            <a id="test_floodFill_clear"  href="javascript:call(test_floodFill_clear)" class="tip-hotspot" data-tip="清空所有的FloodFill">Clear</a> &emsp;
            <a id="test_floodFill_focus"  href="javascript:call(test_floodFill_focus)" class="tip-hotspot" data-tip="定位FloodFill">Focus</a>  &emsp;
            <a id="test_floodFill_show"  href="javascript:call(test_floodFill_show)" class="tip-hotspot" data-tip="显示指定的FloodFill">Show</a> &emsp;
            <a id="test_floodFill_showAll"  href="javascript:call(test_floodFill_showAll)" class="tip-hotspot" data-tip="显示所有的FloodFill">ShowAll</a> &emsp;
            <a id="test_floodFill_hide"  href="javascript:call(test_floodFill_hide)" class="tip-hotspot" data-tip="隐藏指定的FloodFill">Hide</a> &emsp;
            <a id="test_floodFill_hideAll"  href="javascript:call(test_floodFill_hideAll)" class="tip-hotspot" data-tip="隐藏所有的FloodFill">HideAll</a> &emsp;
            <a id="test_floodFill_get"  href="javascript:call(test_floodFill_get)" class="tip-hotspot" data-tip="获取指定的FloodFill信息">Get</a> &emsp;
        </div>

        
        <div id="a_WaterFlowField" >
            <img width="24" height="24" src="images/flowField.png" /><strong>&nbsp;水流场：WaterFlowField</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/WaterFlowField.html" target="_blank">API帮助</a>&emsp;
            <a id="test_waterflowField_add"  href="javascript:call(test_waterflowField_add)" class="tip-hotspot" data-tip="添加流场">Add</a>&emsp;
            <a id="test_waterflowField_update"  href="javascript:call(test_waterflowField_update)" class="tip-hotspot" data-tip="修改流场">Update</a>&emsp;
            <a id="test_waterflowField_delete"  href="javascript:call(test_waterflowField_delete)" class="tip-hotspot" data-tip="删除流场">Delete</a>&emsp;
            <a id="test_waterflowField_clear"  href="javascript:call(test_waterflowField_clear)" class="tip-hotspot" data-tip="清空所有流场">Clear</a>&emsp;
            <a id="test_waterflowField_focus"  href="javascript:call(test_waterflowField_focus)" class="tip-hotspot" data-tip="定位流场">Focus</a>&emsp;
            <a id="test_waterflowField_show"  href="javascript:call(test_waterflowField_show)" class="tip-hotspot" data-tip="显示指定流场">Show</a>&emsp;
            <a id="test_waterflowField_hide"  href="javascript:call(test_waterflowField_hide)" class="tip-hotspot" data-tip="隐藏指定流场">Hide</a>&emsp;
            <a id="test_waterflowField_get"  href="javascript:call(test_waterflowField_get)" class="tip-hotspot" data-tip="获取指定流场详细信息">Get</a><br><br>&emsp;
            <a id="test_waterflowField_setViewportVisible"  href="javascript:call(test_waterflowField_setViewportVisible)" class="tip-hotspot" data-tip="设置水流场视口可见性">SetViewportVisible</a> &emsp;

        </div>

         <div id="a_HydroDynamic1D">
            <img width="24" height="24" src="images/river.png" /><strong>&nbsp;一维水动力模型：HydroDynamic1D</strong> &emsp;<a class='totop' href="javascript:toTop()"> ↑Top</a>
            <br> &emsp;
            <a href="doc/HydroDynamic1D.html" target="_blank">API Help</a> &emsp;
            <a id="test_hydrodynamic1d_add"  href="javascript:call(test_hydrodynamic1d_add)" class="tip-hotspot" data-tip="添加一维水动力模型">Add</a> &emsp;
            <a id="test_hydrodynamic1d_update"  href="javascript:call(test_hydrodynamic1d_update)" class="tip-hotspot" data-tip="更新一维水动力模型">Update</a> &emsp;
            <a id="test_hydrodynamic1d_delete"  href="javascript:call(test_hydrodynamic1d_delete)" class="tip-hotspot" data-tip="删除一维水动力模型">Delete</a> &emsp;
            <a id="test_hydrodynamic1d_clear"  href="javascript:call(test_hydrodynamic1d_clear)" class="tip-hotspot" data-tip="清空一维水动力模型">Clear</a> &emsp;
            <a id="test_hydrodynamic1d_focus"  href="javascript:call(test_hydrodynamic1d_focus)" class="tip-hotspot" data-tip="定位一维水动力模型">Focus</a> &emsp;
            <a id="test_hydrodynamic1d_show"  href="javascript:call(test_hydrodynamic1d_show)" class="tip-hotspot" data-tip="显示一维水动力模型">Show</a> &emsp;
            <a id="test_hydrodynamic1d_hide"  href="javascript:call(test_hydrodynamic1d_hide)" class="tip-hotspot" data-tip="隐藏一维水动力模型">Hide</a> &emsp;
            <a id="test_hydrodynamic1d_get"  href="javascript:call(test_hydrodynamic1d_get)" class="tip-hotspot" data-tip="查询一维水动力模型">Get</a> &emsp;
            
        </div>

        
        <div id="a_HydroDynamic2D" >
            <img width="24" height="24" src="images/hydrodynamicModel.png" /><strong>&nbsp;二维水动力模型：HydroDynamic2D</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/HydroDynamic2D.html" target="_blank">API帮助</a>&emsp;
           
            <a id="test_hydrodynamic2d_add_new_shp_clip_water"  href="javascript:call(test_hydrodynamic2d_add_new_shp_clip_water)" class="tip-hotspot" data-tip="添加二维水动力模型-真实水">AddByShp(水面)</a>&emsp;
          
            <a id="test_hydrodynamic2d_add_new_shp_clip_heat"  href="javascript:call(test_hydrodynamic2d_add_new_shp_clip_heat)" class="tip-hotspot" data-tip="添加二维水动力模型-热力">AddByShp(热力)</a>&emsp;

            <a id="test_hydrodynamic2d_add_new_shp_clip_flow"  href="javascript:call(test_hydrodynamic2d_add_new_shp_clip_flow)" class="tip-hotspot" data-tip="添加二维水动力模型-流场">AddByShp(流场)</a>&emsp;

            
            <a id="test_hydrodynamic2d_add_new_tif"  href="javascript:call(test_hydrodynamic2d_add_new_tif)" class="tip-hotspot" data-tip="添加二维水动力模型-真实水">AddByTif(水面)</a>&emsp;
            
            
            <a id="test_hydrodynamic2d_update_new"  href="javascript:call(test_hydrodynamic2d_update_new)" class="tip-hotspot" data-tip="修改二维水动力模型">Update</a>&emsp;
            <a id="test_hydrodynamic2d_delete_new"  href="javascript:call(test_hydrodynamic2d_delete_new)" class="tip-hotspot" data-tip="删除二维水动力模型">Delete</a>&emsp;
            <a id="test_hydrodynamic2d_clear_new"  href="javascript:call(test_hydrodynamic2d_clear_new)" class="tip-hotspot" data-tip="清空所有二维水动力模型">Clear</a>&emsp;
            <a id="test_hydrodynamic2d_focus_new"  href="javascript:call(test_hydrodynamic2d_focus_new)" class="tip-hotspot" data-tip="定位二维水动力模型">Focus</a>&emsp;
            <a id="test_hydrodynamic2d_show_new"  href="javascript:call(test_hydrodynamic2d_show_new)" class="tip-hotspot" data-tip="显示指定二维水动力模型">Show</a>&emsp;
            <a id="test_hydrodynamic2d_hide_new"  href="javascript:call(test_hydrodynamic2d_hide_new)" class="tip-hotspot" data-tip="隐藏指定二维水动力模型">Hide</a>&emsp;
            <a id="test_hydrodynamic2d_get_new"  href="javascript:call(test_hydrodynamic2d_get_new)" class="tip-hotspot" data-tip="获取二维水动力模型信息">Get</a><br>&emsp;
        </div>

        <div id="a_Fluid">
             <img width="24" height="24" src="images/fluid.png" /><strong>&nbsp;三维水体仿真：Fluid</strong>&emsp;<a class='totop' href="javascript:toTop()"> ↑Top</a>
             <br>&emsp;
             <a href="doc/Fluid.html" target="_blank">API 帮助</a>&emsp;
             <a id="test_fluid_add"  href="javascript:call(test_fluid_add)" class="tip-hotspot" data-tip="添加">Add</a>&emsp;

             <a id="test_fluid_addSource"  href="javascript:call(test_fluid_addSource)" class="tip-hotspot" data-tip="添加出水点">AddSource</a>&emsp;
             <a id="test_fluid_continueSource"  href="javascript:call(test_fluid_continueSource)" class="tip-hotspot" data-tip="激活出水点">ContinueSource</a>&emsp;
             <a id="test_fluid_stopSource"  href="javascript:call(test_fluid_stopSource)" class="tip-hotspot" data-tip="停止出水点">StopSource</a>&emsp;
             <a id="test_fluid_removeSource"  href="javascript:call(test_fluid_removeSource)" class="tip-hotspot" data-tip="移除出水点">RemoveSource</a>&emsp;

             <a id="test_fluid_update"  href="javascript:call(test_fluid_update)" class="tip-hotspot" data-tip="修改">Update</a>&emsp;
             <a id="test_fluid_pause"  href="javascript:call(test_fluid_pause)" class="tip-hotspot" data-tip="暂停">Pause</a>&emsp;
             <a id="test_fluid_continue"  href="javascript:call(test_fluid_continue)" class="tip-hotspot" data-tip="继续">Continue</a>&emsp;
             <a id="test_fluid_reset"  href="javascript:call(test_fluid_reset)" class="tip-hotspot" data-tip="重置">Reset</a>&emsp;
            
             <a id="test_fluid_delete"  href="javascript:call(test_fluid_delete)" class="tip-hotspot" data-tip="删除">Delete</a>&emsp;
             <a id="test_fluid_clear"  href="javascript:call(test_fluid_clear)" class="tip-hotspot" data-tip="清空">Clear</a>&emsp;
             <a id="test_fluid_focus"  href="javascript:call(test_fluid_focus)" class="tip-hotspot" data-tip="定位">Focus</a>&emsp;
             <a id="test_fluid_show"  href="javascript:call(test_fluid_show)" class="tip-hotspot" data-tip="显示">Show</a>&emsp;
             <a id="test_fluid_hide"  href="javascript:call(test_fluid_hide)" class="tip-hotspot" data-tip="隐藏">Hide</a>&emsp;
             <a id="test_fluid_get"  href="javascript:call(test_fluid_get)" class="tip-hotspot" data-tip="查询">Get</a>&emsp;
             <a id="test_tileLayer_enableFluid"  href="javascript:call(test_tileLayer_enableFluid)" class="tip-hotspot" data-tip="开启图层支持流体">EnableFluid</a><br><br>&emsp;
         </div>

         <div id="a_SmoothedParticleHydrodynamics" >
            <img width="24" height="24" src="images/smoothedParticleHydrodynamics.png" /><strong>&nbsp;光滑粒子流体动力学仿真模型：SmoothedParticleHydrodynamics</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/smoothedParticleHydrodynamics.html" target="_blank">API帮助</a>&emsp;
           
            <a id="test_smoothedParticleHydrodynamics_add_bin"  href="javascript:call(test_smoothedParticleHydrodynamics_add_bin)" class="tip-hotspot" data-tip="添加光滑粒子流体动力学仿真模型-bin">AddByBin</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_add_vtk"  href="javascript:call(test_smoothedParticleHydrodynamics_add_vtk)" class="tip-hotspot" data-tip="添加光滑粒子流体动力学仿真模型-vtk">AddByVtk</a>&emsp;
          

            <a id="test_smoothedParticleHydrodynamics_update"  href="javascript:call(test_smoothedParticleHydrodynamics_update)" class="tip-hotspot" data-tip="修改光滑粒子流体动力学仿真模型">Update</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_delete"  href="javascript:call(test_smoothedParticleHydrodynamics_delete)" class="tip-hotspot" data-tip="删除光滑粒子流体动力学仿真模型">Delete</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_clear"  href="javascript:call(test_smoothedParticleHydrodynamics_clear)" class="tip-hotspot" data-tip="清空所有光滑粒子流体动力学仿真模型">Clear</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_focus"  href="javascript:call(test_smoothedParticleHydrodynamics_focus)" class="tip-hotspot" data-tip="定位光滑粒子流体动力学仿真模型">Focus</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_show"  href="javascript:call(test_smoothedParticleHydrodynamics_show)" class="tip-hotspot" data-tip="显示指定光滑粒子流体动力学仿真模型">Show</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_hide"  href="javascript:call(test_smoothedParticleHydrodynamics_hide)" class="tip-hotspot" data-tip="隐藏指定光滑粒子流体动力学仿真模型">Hide</a>&emsp;
            <a id="test_smoothedParticleHydrodynamics_get"  href="javascript:call(test_smoothedParticleHydrodynamics_get)" class="tip-hotspot" data-tip="获取光滑粒子流体动力学仿真模型信息">Get</a><br>&emsp;
        </div>

        <!-- 信号仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">信号仿真对象</p>
        <div id="a_Antenna">
            <img width="24" height="24" src="images/antennaPattern.png" /><strong>&nbsp;天线方向图：Antenna</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Antenna.html" target="_blank">API帮助</a>&emsp;
            <a id="test_Antenna_add"  href="javascript:call(test_Antenna_add)" class="tip-hotspot" data-tip="添加天线方向图">Add</a>&emsp;
            <a id="test_Antenna_update"  href="javascript:call(test_Antenna_update)" class="tip-hotspot" data-tip="修改天线方向图">Update</a>&emsp;
            <a id="test_Antenna_delete"  href="javascript:call(test_Antenna_delete)" class="tip-hotspot" data-tip="删除天线方向图">Delete</a>&emsp;
            <a id="test_Antenna_clear"  href="javascript:call(test_Antenna_clear)" class="tip-hotspot" data-tip="清空所有天线方向图">Clear</a>&emsp;
            <a id="test_Antenna_focus"  href="javascript:call(test_Antenna_focus)" class="tip-hotspot" data-tip="定位天线方向图">Focus</a>&emsp;
            <a id="test_Antenna_show"  href="javascript:call(test_Antenna_show)" class="tip-hotspot" data-tip="显示指定天线方向图">Show</a>&emsp;
            <a id="test_Antenna_hide"  href="javascript:call(test_Antenna_hide)" class="tip-hotspot" data-tip="隐藏指定天线方向图">Hide</a>&emsp;
            <a id="test_Antenna_get"  href="javascript:call(test_Antenna_get)" class="tip-hotspot" data-tip="获取指定天线方向图详细信息">Get</a><br><br>&emsp;
        </div>

        <div id="a_SignalWave">
             <img width="24" height="24" src="images/signalWave.png" /><strong>&nbsp;信号波束：SignalWave</strong> &emsp;<a class='totop' href="javascript:toTop()"> ↑Top</a>
             <br> &emsp;
             <a href="doc/SignalWave.html" target="_blank">API Help</a> &emsp;
             <a id="test_signalWave_add"  href="javascript:call(test_signalWave_add)" class="tip-hotspot" data-tip="添加波束">Add</a> &emsp;
             <a id="test_signalWave_update"  href="javascript:call(test_signalWave_update)" class="tip-hotspot" data-tip="更新波束">Update</a> &emsp;
             <a id="test_signalWave_delete"  href="javascript:call(test_signalWave_delete)" class="tip-hotspot" data-tip="删除波束">Delete</a> &emsp;
             <a id="test_signalWave_clear"  href="javascript:call(test_signalWave_clear)" class="tip-hotspot" data-tip="清空波束">Clear</a> &emsp;
             <a id="test_signalWave_focus"  href="javascript:call(test_signalWave_focus)" class="tip-hotspot" data-tip="定位波束">Focus</a> &emsp;
             <a id="test_signalWave_show"  href="javascript:call(test_signalWave_show)" class="tip-hotspot" data-tip="显示波束">Show</a> &emsp;
             <a id="test_signalWave_hide"  href="javascript:call(test_signalWave_hide)" class="tip-hotspot" data-tip="隐藏波束">Hide</a> &emsp;
             <a id="test_signalWave_get"  href="javascript:call(test_signalWave_get)" class="tip-hotspot" data-tip="查询波束">Get</a> &emsp;
         </div>


        <!-- 交通仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">交通仿真对象</p>
        <div id="a_TrafficSimulation" >
            <img width="24" height="24" src="images/trafficSimulation.png" /><strong>&nbsp;城市交通（宏观）：TrafficSimulation</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/TrafficSimulation.html" target="_blank">API帮助</a> &emsp;
            <a id="test_trafficSimulation_add"  href="javascript:call(test_trafficSimulation_add)" class="tip-hotspot" data-tip="初始化添加TrafficSimulation">Add</a> &emsp;
            <a id="test_trafficSimulation_update"  href="javascript:call(test_trafficSimulation_update)" class="tip-hotspot" data-tip="修改TrafficSimulation">Update</a> &emsp;
            <a id="test_trafficSimulation_delete"  href="javascript:call(test_trafficSimulation_delete)" class="tip-hotspot" data-tip="删除TrafficSimulation">Delete</a> &emsp;
            <a id="test_trafficSimulation_focus"  href="javascript:call(test_trafficSimulation_focus)" class="tip-hotspot" data-tip="定位TrafficSimulation">Focus</a> &emsp;
            <a id="test_trafficSimulation_show"  href="javascript:call(test_trafficSimulation_show)" class="tip-hotspot" data-tip="显示TrafficSimulation">Show</a> &emsp;
            <a id="test_trafficSimulation_hide"  href="javascript:call(test_trafficSimulation_hide)" class="tip-hotspot" data-tip="隐藏TrafficSimulation">Hide</a> &emsp;

            <a id="test_trafficSimulation_highlight"  href="javascript:call(test_trafficSimulation_highlight)" class="tip-hotspot" data-tip="高亮车辆">Highlight</a> &emsp;
            <a id="test_trafficSimulation_unHighlight"  href="javascript:call(test_trafficSimulation_unHighlight)" class="tip-hotspot" data-tip="取消高亮">UnHighlight</a> &emsp;
            <a id="test_trafficSimulation_autoHighlight"  href="javascript:call(test_trafficSimulation_autoHighlight)" class="tip-hotspot" data-tip="按高度自动切换高亮">AutoHighlight</a> &emsp;


            <a id="test_trafficSimulation_showTextLabel"  href="javascript:call(test_trafficSimulation_showTextLabel)" class="tip-hotspot" data-tip="显示文字标签">ShowTextLabel</a> &emsp;
            <a id="test_trafficSimulation_hideTextLabel"  href="javascript:call(test_trafficSimulation_hideTextLabel)" class="tip-hotspot" data-tip="隐藏文字标签">HideTextLabel</a> &emsp;

            <a id="test_trafficSimulation_showHeatMap"  href="javascript:call(test_trafficSimulation_showHeatMap)" class="tip-hotspot" data-tip="显示热力效果">ShowHeatMap</a> &emsp;
            <a id="test_trafficSimulation_hideHeatMap"  href="javascript:call(test_trafficSimulation_hideHeatMap)" class="tip-hotspot" data-tip="隐藏热力效果">HideHeatMap</a> &emsp;
        </div>

        <div id="a_Vehicle2" >
            <img width="24" height="24" src="images/Vehicle2.png" /><strong>&nbsp;高级载具（微观）：Vehicle2</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Vehicle2.html" target="_blank">API帮助</a> &emsp;
            <a id="test_vehicle2_add"  href="javascript:call(test_vehicle2_add)" class="tip-hotspot" data-tip="添加Vehicle">Add</a> &emsp;
            <a id="test_vehicle2_update"  href="javascript:call(test_vehicle2_update)" class="tip-hotspot" data-tip="修改Vehicle">Update</a> &emsp;
         
            <a id="test_vehicle2_moveTo"  href="javascript:call(test_vehicle2_moveTo)" class="tip-hotspot" data-tip="设置Vehicle实时移动路径点">MoveTo</a> &emsp;

            <a id="test_vehicle2_get"  href="javascript:call(test_vehicle2_get)" class="tip-hotspot" data-tip="查询Vehicle">Get</a> &emsp;
           
            <a id="test_vehicle2_delete"  href="javascript:call(test_vehicle2_delete)" class="tip-hotspot" data-tip="删除Vehicle">Delete</a> &emsp;
            <a id="test_vehicle2_clear"  href="javascript:call(test_vehicle2_clear)" class="tip-hotspot" data-tip="清空Vehicle">Clear</a> &emsp;
            <a id="test_vehicle2_focus"  href="javascript:call(test_vehicle2_focus)" class="tip-hotspot" data-tip="定位Vehicle">Focus</a> &emsp;
            
            <a id="test_vehicle2_setFollow"  href="javascript:call(test_vehicle2_setFollow)" class="tip-hotspot" data-tip="设置自动跟随">SetFollow</a> &emsp;
            <a id="test_vehicle2_cancelFollow"  href="javascript:call(test_vehicle2_cancelFollow)" class="tip-hotspot" data-tip="取消自动跟随">CancelFollow</a> &emsp;

            <a id="test_vehicle2_setViewportVisible"  href="javascript:call(test_vehicle2_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;

            
            <a id="test_vehicle2_show"  href="javascript:call(test_vehicle2_show)" class="tip-hotspot" data-tip="显示Vehicle">Show</a> &emsp;
            <a id="test_vehicle2_hide"  href="javascript:call(test_vehicle2_hide)" class="tip-hotspot" data-tip="隐藏Vehicle">Hide</a> &emsp;

        </div>

        <div id="a_Drone" >
            <img width="24" height="24" src="images/Drone.png" /><strong>&nbsp;无人机：Drone</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Drone.html" target="_blank">API帮助</a> &emsp;
            <a id="test_drone_add"  href="javascript:call(test_drone_add)" class="tip-hotspot" data-tip="添加Drone">Add</a> &emsp;
            
            
            <a id="test_drone_moveTo"  href="javascript:call(test_drone_moveTo)" class="tip-hotspot" data-tip="设置Drone实时移动路径点">MoveTo</a> &emsp;

            <a id="test_drone_update"  href="javascript:call(test_drone_update)" class="tip-hotspot" data-tip="修改Drone">Update</a> &emsp;

            <a id="test_drone_get"  href="javascript:call(test_drone_get)" class="tip-hotspot" data-tip="查询Drone">Get</a> &emsp;
           
            <a id="test_drone_delete"  href="javascript:call(test_drone_delete)" class="tip-hotspot" data-tip="删除Drone">Delete</a> &emsp;
            <a id="test_drone_clear"  href="javascript:call(test_drone_clear)" class="tip-hotspot" data-tip="清空Drone">Clear</a> &emsp;
            <a id="test_drone_focus"  href="javascript:call(test_drone_focus)" class="tip-hotspot" data-tip="定位Drone">Focus</a> &emsp;
            
            <a id="test_drone_show"  href="javascript:call(test_drone_show)" class="tip-hotspot" data-tip="显示Drone">Show</a> &emsp;
            <a id="test_drone_hide"  href="javascript:call(test_drone_hide)" class="tip-hotspot" data-tip="隐藏Drone">Hide</a> &emsp;
        </div>

        <div id="a_Train" >
            <img width="24" height="24" src="images/train.png" /><strong>&nbsp;高速铁路：Train</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Train.html" target="_blank">API帮助</a> &emsp;
            <a id="test_train_add"  href="javascript:call(test_train_add)" class="tip-hotspot" data-tip="添加火车">Add</a> &emsp;
            <a id="test_train_moveTo"  href="javascript:call(test_train_moveTo)" class="tip-hotspot" data-tip="火车移动">MoveTo</a> &emsp;
            
            <a id="test_train_pause"  href="javascript:call(test_train_pause)" class="tip-hotspot" data-tip="火车暂停">Pause</a> &emsp;
            <a id="test_train_resume"  href="javascript:call(test_train_resume)" class="tip-hotspot" data-tip="火车恢复">Resume</a> &emsp;
            

            <a id="test_train_delete"  href="javascript:call(test_train_delete)" class="tip-hotspot" data-tip="删除火车">Delete</a> &emsp;
            <a id="test_train_clear"  href="javascript:call(test_train_clear)" class="tip-hotspot" data-tip="清除火车">Clear</a> &emsp;
            <a id="test_train_focus"  href="javascript:call(test_train_focus)" class="tip-hotspot" data-tip="定位火车">Focus</a> &emsp;

            <a id="test_train_setFollow"  href="javascript:call(test_train_setFollow)" class="tip-hotspot" data-tip="设置相机跟随火车">SetFollow</a> &emsp;
            <a id="test_camera_cancelFollow"  href="javascript:call(test_camera_cancelFollow)" class="tip-hotspot" data-tip="取消相机跟随火车">CancelFollow</a> &emsp;

            <a id="test_train_show"  href="javascript:call(test_train_show)" class="tip-hotspot" data-tip="显示火车">Show</a> &emsp;
            <a id="test_train_hide"  href="javascript:call(test_train_hide)" class="tip-hotspot" data-tip="隐藏火车">Hide</a> &emsp;
            <a id="test_train_get"  href="javascript:call(test_train_get)" class="tip-hotspot" data-tip="获取火车">Get</a>&emsp;

        </div>


        <p style="text-align:left;font-size:18px;color:#0063e4">军事仿真对象</p>
        <!-- 军事仿真对象 -->
        <div id="a_BattlefieldSimulation" >
            <img width="24" height="24" src="images/battlefieldSimulation.png" /><strong>&nbsp;战场仿真：BattlefieldSimulation</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/BattlefieldSimulation.html" target="_blank">API帮助</a> &emsp;
            <a id="test_battlefieldSimulation_add"  href="javascript:call(test_battlefieldSimulation_add)" class="tip-hotspot" data-tip="初始化添加BattlefieldSimulation">Add</a> &emsp;
            <a id="test_battlefieldSimulation_update"  href="javascript:call(test_battlefieldSimulation_update)" class="tip-hotspot" data-tip="修改BattlefieldSimulation">Update</a> &emsp;
            <a id="test_battlefieldSimulation_delete"  href="javascript:call(test_battlefieldSimulation_delete)" class="tip-hotspot" data-tip="删除BattlefieldSimulation">Delete</a> &emsp;
            <a id="test_battlefieldSimulation_focus"  href="javascript:call(test_battlefieldSimulation_focus)" class="tip-hotspot" data-tip="定位BattlefieldSimulation">Focus</a> &emsp;
            
        </div>

        <div id="a_Plot" >
            <img width="24" height="24" src="images/plot.png" /><strong>&nbsp;态势标绘：Plot</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Plot.html" target="_blank">API帮助</a> &emsp;
            <a id="test_plot_add"  href="javascript:call(test_plot_add)" class="tip-hotspot" data-tip="根据坐标添加Plot">Add</a> &emsp;

            <a id="test_plot_update"  href="javascript:call(test_plot_update)" class="tip-hotspot" data-tip="修改Plot">Update</a> &emsp;
            <a id="test_plot_delete"  href="javascript:call(test_plot_delete)" class="tip-hotspot" data-tip="删除Plot">Delete</a> &emsp;
            <a id="test_plot_clear"  href="javascript:call(test_plot_clear)" class="tip-hotspot" data-tip="清空Plot">Clear</a> &emsp;
            <a id="test_plot_focus"  href="javascript:call(test_plot_focus)" class="tip-hotspot" data-tip="定位Plot">Focus</a>  &emsp;
            <a id="test_plot_show"  href="javascript:call(test_plot_show)" class="tip-hotspot" data-tip="显示指定的Plot">Show</a> &emsp;
            <a id="test_plot_showAll"  href="javascript:call(test_plot_showAll)" class="tip-hotspot" data-tip="显示所有的Plot">ShowAll</a> &emsp;
            <a id="test_plot_hide"  href="javascript:call(test_plot_hide)" class="tip-hotspot" data-tip="隐藏指定的Plot">Hide</a> &emsp;
            <a id="test_plot_hideAll"  href="javascript:call(test_plot_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Plot">HideAll</a> &emsp;
            <a id="test_plot_get"  href="javascript:call(test_plot_get)" class="tip-hotspot" data-tip="获取指定的Plot信息">Get</a> &emsp;
            <a id="test_plot_getStrokeCoordinates"  href="javascript:call(test_plot_getStrokeCoordinates)" class="tip-hotspot" data-tip="获取指定的Plot对象的描边坐标集合">GetStrokeCoordinates</a><br><br> &emsp;

            <b>通过鼠标交互创建对象：</b><br><br>&emsp;

            <a id="test_plot_stopDraw"  href="javascript:call(test_plot_stopDraw)" class="tip-hotspot" data-tip="停止绘制Plot">停止绘制：StopDraw</a> <br><br>&emsp;
            
            <a id="test_plot_add_polyline"  href="javascript:call(test_plot_add_polyline)" class="tip-hotspot" data-tip="鼠标左键连续点击多个坐标点后，点击鼠标右键结束绘制折线">绘制折线：StartDraw(Polyline)</a> <br>&emsp;
            <a id="test_plot_add_circle"  href="javascript:call(test_plot_add_circle)" class="tip-hotspot" data-tip="鼠标左键点击获取圆心后，移动鼠标确定圆的半径，鼠标左键再次点击结束绘制圆">绘制圆形：StartDraw(Circle)</a> <br>&emsp;
            <a id="test_plot_add_triangle"  href="javascript:call(test_plot_add_triangle)" class="tip-hotspot" data-tip="鼠标左键连续点击三个点完成绘制三角形">绘制三角形：StartDraw(Triangle)</a> <br>&emsp;
            <a id="test_plot_add_rectangle"  href="javascript:call(test_plot_add_rectangle)" class="tip-hotspot" data-tip="鼠标左键点击后移动鼠标位置确定矩形的对角线，再次点击鼠标左键完成绘制">绘制矩形：StartDraw(Rectangle)</a> <br>&emsp;
            <a id="test_plot_add_polygon"  href="javascript:call(test_plot_add_polygon)" class="tip-hotspot" data-tip="鼠标左键连续点击多个坐标点后，点击鼠标右键结束绘制面">绘制多边形：StartDraw(Polygon)</a> <br>&emsp;
            <a id="test_plot_add_gatheringPlace"  href="javascript:call(test_plot_add_gatheringPlace)" class="tip-hotspot" data-tip="鼠标左键点击后移动鼠标位置确定聚集地范围，然后点击鼠标左键确定后，再移动鼠标位置点击鼠标左键完成绘制">绘制聚集地：StartDraw(GatheringPlace)</a> <br>&emsp;
            <a id="test_plot_add_betzCurveArrow"  href="javascript:call(test_plot_add_betzCurveArrow)" class="tip-hotspot" data-tip="鼠标左键连续点击多个坐标点后，点击鼠标右键完成绘制">绘制贝兹曲线箭头：StartDraw(BetzCurveArrow)</a> <br>&emsp;
            
            <a id="test_plot_add_polylineArrow"  href="javascript:call(test_plot_add_polylineArrow)" class="tip-hotspot" data-tip="鼠标左键连续点击多个坐标点后，点击鼠标右键完成绘制">绘制折线箭头：StartDraw(PolylineArrow)</a> <br>&emsp;
            <a id="test_plot_add_straightArrow"  href="javascript:call(test_plot_add_straightArrow)" class="tip-hotspot" data-tip="鼠标左键点击后移动鼠标位置确定直箭头的目标点，再次点击鼠标左键完成绘制">绘制直箭头：StartDraw(StraightArrow)</a> <br>&emsp;
            
            <a id="test_plot_add_assaultDirectionArrow"  href="javascript:call(test_plot_add_assaultDirectionArrow)" class="tip-hotspot" data-tip="鼠标左键点击后移动鼠标位置确定突击箭头的目标点，再次点击鼠标左键完成绘制">绘制突击方向箭头：StartDraw(AssaultDirectionArrow)</a> <br>&emsp;
            <a id="test_plot_add_attackArrow"  href="javascript:call(test_plot_add_attackArrow)" class="tip-hotspot" data-tip="鼠标左键点击两个点确定进攻箭头的宽度，然后移动鼠标连续多次点击鼠标左键确定进攻的方向后，点击右键完成绘制">绘制进攻方向箭头：StartDraw(AttackArrow)</a> <br>&emsp;
            <a id="test_plot_add_tailedAttackArrow"  href="javascript:call(test_plot_add_tailedAttackArrow)" class="tip-hotspot" data-tip="鼠标左键点击两个点确定进攻箭头尾部的宽度，然后移动鼠标连续多次点击鼠标左键确定进攻的方向后，点击右键完成绘制">绘制进攻方向箭头（尾）：StartDraw(TailedAttackArrow)</a> <br>&emsp;
            <a id="test_plot_add_squadCombatArrow"  href="javascript:call(test_plot_add_squadCombatArrow)" class="tip-hotspot" data-tip="鼠标左键点击确定分队战斗行动箭头的起始位置，然后移动鼠标连续多次点击鼠标左键确定分队战斗方向后，点击右键完成绘制">绘制分队战斗行动箭头：StartDraw(SquadCombatArrow)</a> <br>&emsp;
            <a id="test_plot_add_tailedSquadCombatArrow"  href="javascript:call(test_plot_add_tailedSquadCombatArrow)" class="tip-hotspot" data-tip="鼠标左键点击确定分队战斗行动箭头尾部的起始位置，然后移动鼠标连续多次点击鼠标左键确定分队战斗方向后，点击右键完成绘制">绘制分队战斗行动箭头（尾）：StartDraw(TailedSquadCombatArrow)</a> <br>&emsp;
            <a id="test_plot_add_doubleArrow"  href="javascript:call(test_plot_add_doubleArrow)" class="tip-hotspot" data-tip="鼠标左键点击两个点确定双箭头尾部的宽度，然后移动鼠标依次点击两次鼠标左键分别确定双箭头的位置并完成绘制">绘制双箭头：StartDraw(DoubleArrow)</a> <br>&emsp;
           
            <a id="test_plot_add_freehandline"  href="javascript:call(test_plot_add_freehandline)" class="tip-hotspot" data-tip="按住鼠标左键不松开移动光标进入自由绘制线，松开鼠标左键结束自由线绘制">绘制自由线：StartDraw(FreehandLineString)</a> <br>&emsp;
            <a id="test_plot_add_freehandpolygon"  href="javascript:call(test_plot_add_freehandpolygon)" class="tip-hotspot" data-tip="按住鼠标左键不松开移动光标进入自由绘制面，松开鼠标左键结束自由面绘制">绘制自由面：StartDraw(FreehandPolygon)</a> <br>&emsp;


        </div>

        <!-- 海洋仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">向量场仿真对象（风场、洋流、海浪等）</p>
        <div id="a_VectorField" >
            <img width="24" height="24" src="images/vectorField.png" /><strong>&nbsp;向量场仿真：VectorField</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/VectorField.html" target="_blank">API帮助</a>&emsp;
            <a id="test_vectorField_add"  href="javascript:call(test_vectorField_add)" class="tip-hotspot" data-tip="添加向量场">Add</a>&emsp;
            <a id="test_vectorField_update"  href="javascript:call(test_vectorField_update)" class="tip-hotspot" data-tip="修改向量场">Update</a>&emsp;
            <a id="test_vectorField_delete"  href="javascript:call(test_vectorField_delete)" class="tip-hotspot" data-tip="删除向量场">Delete</a>&emsp;
            <a id="test_vectorField_clear"  href="javascript:call(test_vectorField_clear)" class="tip-hotspot" data-tip="清空所有向量场">Clear</a>&emsp;
            <a id="test_vectorField_focus"  href="javascript:call(test_vectorField_focus)" class="tip-hotspot" data-tip="定位向量场">Focus</a>&emsp;
            <a id="test_vectorField_show"  href="javascript:call(test_vectorField_show)" class="tip-hotspot" data-tip="显示指定向量场">Show</a>&emsp;
            <a id="test_vectorField_hide"  href="javascript:call(test_vectorField_hide)" class="tip-hotspot" data-tip="隐藏指定向量场">Hide</a>&emsp;
            <a id="test_vectorField_get"  href="javascript:call(test_vectorField_get)" class="tip-hotspot" data-tip="获取向量场详细信息">Get</a><br><br>&emsp;
            <a id="test_vectorField_setViewportVisible"  href="javascript:call(test_vectorField_setViewportVisible)" class="tip-hotspot" data-tip="设置向量场视口可见性">SetViewportVisible</a> &emsp;

        </div>

        <!-- 海岸线对象 -->
        <div id="a_Coastline">
            <img width="24" height="24" src="images/river.png" /><strong>&nbsp;海岸线：Coastline</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/coastline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_coastline_add"  href="javascript:call(test_coastline_add)" class="tip-hotspot" data-tip="添加Coastline">Add</a> &emsp;
            <a id="test_coastline_update"  href="javascript:call(test_coastline_update)" class="tip-hotspot" data-tip="修改Coastline">Update</a> &emsp;
            <a id="test_coastline_delete"  href="javascript:call(test_coastline_delete)" class="tip-hotspot" data-tip="删除指定的Coastline">Delete</a> &emsp;
            <a id="test_coastline_clear"  href="javascript:call(test_coastline_clear)" class="tip-hotspot" data-tip="清空所有的Coastline">Clear</a> &emsp;
            <a id="test_coastline_focus"  href="javascript:call(test_coastline_focus)" class="tip-hotspot" data-tip="定位Coastline">Focus</a>  &emsp;
            <a id="test_coastline_show"  href="javascript:call(test_coastline_show)" class="tip-hotspot" data-tip="显示指定的Coastline">Show</a> &emsp;
            
            <a id="test_coastline_hide"  href="javascript:call(test_coastline_hide)" class="tip-hotspot" data-tip="隐藏指定的Coastline">Hide</a> &emsp;
            <!--
            <a id="test_coastline_hideAll"  href="javascript:call(test_coastline_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Coastline">HideAll</a> &emsp;
            <a id="test_coastline_showAll"  href="javascript:call(test_coastline_showAll)" class="tip-hotspot" data-tip="显示所有的Coastline">ShowAll</a> &emsp;
            -->
            <a id="test_coastline_get"  href="javascript:call(test_coastline_get)" class="tip-hotspot" data-tip="获取指定的Coastline信息">Get</a> &emsp;
        </div>        

        <!-- 有限元仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">有限元仿真对象</p>
        <div id="a_FiniteElement">
             <img width="24" height="24" src="images/finiteElement.png" /><strong>&nbsp;有限元仿真：FiniteElement</strong>&emsp;<a class='totop' href="javascript:toTop()"> ↑Top</a>
             <br>&emsp;
             <a href="doc/FiniteElement.html" target="_blank">API 帮助</a>&emsp;
             <a id="test_finiteElement_add"  href="javascript:call(test_finiteElement_add)" class="tip-hotspot" data-tip="添加">Add</a>&emsp;
             <a id="test_finiteElement_update"  href="javascript:call(test_finiteElement_update)" class="tip-hotspot" data-tip="修改">Update</a>&emsp;
             <a id="test_finiteElement_delete"  href="javascript:call(test_finiteElement_delete)" class="tip-hotspot" data-tip="删除">Delete</a>&emsp;
             <a id="test_finiteElement_clear"  href="javascript:call(test_finiteElement_clear)" class="tip-hotspot" data-tip="清空">Clear</a>&emsp;
             <a id="test_finiteElement_focus"  href="javascript:call(test_finiteElement_focus)" class="tip-hotspot" data-tip="定位">Focus</a>&emsp;
             <a id="test_finiteElement_show"  href="javascript:call(test_finiteElement_show)" class="tip-hotspot" data-tip="显示">Show</a>&emsp;
             <a id="test_finiteElement_hide"  href="javascript:call(test_finiteElement_hide)" class="tip-hotspot" data-tip="隐藏">Hide</a>&emsp;
             <a id="test_finiteElement_get"  href="javascript:call(test_finiteElement_get)" class="tip-hotspot" data-tip="查询">Get</a><br><br>&emsp;
         </div>

         <!-- 有限元仿真对象2 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">有限元仿真对象2</p>
        <div id="a_FiniteElement2">
             <img width="24" height="24" src="images/finiteElement.png" /><strong>&nbsp;有限元仿真：FiniteElement2</strong>&emsp;<a class='totop' href="javascript:toTop()"> ↑Top</a>
             <br>&emsp;
             <a href="doc/FiniteElement2.html" target="_blank">API 帮助</a>&emsp;
             
             <a id="test_finiteElement2_add_arrow"  href="javascript:call(test_finiteElement2_add_arrow)" class="tip-hotspot" data-tip="添加">Add(Arrow)</a>&emsp;
             <a id="test_finiteElement2_add"  href="javascript:call(test_finiteElement2_add)" class="tip-hotspot" data-tip="添加">Add(PointField)</a>&emsp;
             <a id="test_finiteElement2_update"  href="javascript:call(test_finiteElement2_update)" class="tip-hotspot" data-tip="修改">Update</a>&emsp;

             <a id="test_finiteElement2_applyThresholdFilter"  href="javascript:call(test_finiteElement2_applyThresholdFilter)" class="tip-hotspot" data-tip="按属性区间添加过滤器">ApplyThresholdFilter</a>&emsp;
             <a id="test_finiteElement2_applyContourFilter"  href="javascript:call(test_finiteElement2_applyContourFilter)" class="tip-hotspot" data-tip="按属性区间添加过滤器">ApplyContourFilter</a>&emsp;
             <a id="test_finiteElement2_applyPlaneClipFilter"  href="javascript:call(test_finiteElement2_applyPlaneClipFilter)" class="tip-hotspot" data-tip="切面过滤器">ApplyPlaneClipFilter</a>&emsp;
             <a id="test_finiteElement2_applyBoxClipFilter"  href="javascript:call(test_finiteElement2_applyBoxClipFilter)" class="tip-hotspot" data-tip="盒子过滤器">ApplyBoxClipFilter</a>&emsp;
             <a id="test_finiteElement2_applySphereClipFilter"  href="javascript:call(test_finiteElement2_applySphereClipFilter)" class="tip-hotspot" data-tip="球型过滤器">ApplySphereClipFilter</a>&emsp;
             <a id="test_finiteElement2_applyCylinderClipFilter"  href="javascript:call(test_finiteElement2_applyCylinderClipFilter)" class="tip-hotspot" data-tip="圆柱体过滤器">ApplyCylinderClipFilter</a>&emsp;
             
             <a id="test_finiteElement2_removeFilter"  href="javascript:call(test_finiteElement2_removeFilter)" class="tip-hotspot" data-tip="移除过滤器">RemoveFilter</a>&emsp;
             <a id="test_finiteElement2_clearFilter"  href="javascript:call(test_finiteElement2_clearFilter)" class="tip-hotspot" data-tip="清空过滤器">ClearFilter</a>&emsp;
    


             
             <a id="test_finiteElement2_focus"  href="javascript:call(test_finiteElement2_focus)" class="tip-hotspot" data-tip="定位">Focus</a>&emsp;
             <a id="test_finiteElement2_delete"  href="javascript:call(test_finiteElement2_delete)" class="tip-hotspot" data-tip="删除">Delete</a>&emsp;
             <a id="test_finiteElement2_clear"  href="javascript:call(test_finiteElement2_clear)" class="tip-hotspot" data-tip="清空">Clear</a>&emsp;
             <a id="test_finiteElement2_show"  href="javascript:call(test_finiteElement2_show)" class="tip-hotspot" data-tip="显示">Show</a>&emsp;
             <a id="test_finiteElement2_hide"  href="javascript:call(test_finiteElement2_hide)" class="tip-hotspot" data-tip="隐藏">Hide</a>&emsp;
             <a id="test_finiteElement2_get"  href="javascript:call(test_finiteElement2_get)" class="tip-hotspot" data-tip="查询">Get</a><br><br>&emsp;
    
         </div>



        
        <!-- 动画及特效对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">动画及特效对象</p>
        <div id="a_CameraTour" >
            <img width="24" height="24" src="images/cameraTour.png" /><strong>&nbsp;导览动画：CameraTour</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CameraTour.html" target="_blank">API帮助</a> &emsp;
            <a id="test_cameraTour_add"  href="javascript:call(test_cameraTour_add)" class="tip-hotspot" data-tip="添加动画导览">Add</a> &emsp;
            <a id="test_cameraTour_update"  href="javascript:call(test_cameraTour_update)" class="tip-hotspot" data-tip="修改动画导览">Update</a> &emsp;
            <a id="test_cameraTour_play"  href="javascript:call(test_cameraTour_play)" class="tip-hotspot" data-tip="播放动画导览">Play</a> &emsp;
            
            <a id="test_cameraTour_setMouseClickToPause"  href="javascript:call(test_cameraTour_setMouseClickToPause)" class="tip-hotspot" data-tip="设置导览播放时鼠标点击是否暂停">SetMouseClickToPause</a> &emsp;
            <a id="test_cameraTour_setTime"  href="javascript:call(test_cameraTour_setTime)" class="tip-hotspot" data-tip="设置导览从某时刻播放">SetTime</a> &emsp;
            
            
            <a id="test_cameraTour_pause"  href="javascript:call(test_cameraTour_pause)" class="tip-hotspot" data-tip="暂停">Pause</a> &emsp;
            <a id="test_cameraTour_resume"  href="javascript:call(test_cameraTour_resume)" class="tip-hotspot" data-tip="继续">Resume</a> &emsp;
            <a id="test_cameraTour_stop"  href="javascript:call(test_cameraTour_stop)" class="tip-hotspot" data-tip="停止动画导览">Stop</a> &emsp;
            <a id="test_cameraTour_delete"  href="javascript:call(test_cameraTour_delete)" class="tip-hotspot" data-tip="删除动画导览">Delete</a> &emsp;

            
        </div>

        <div id="a_Light">
            <img width="24" height="24" src="images/light.png" /><strong>&nbsp;光源：Light</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Light.html" target="_blank">API帮助</a>&emsp;
            <a id="test_light_add"  href="javascript:call(test_light_add)" class="tip-hotspot" data-tip="添加光源">Add</a>&emsp;
            <a id="test_light_update"  href="javascript:call(test_light_update)" class="tip-hotspot" data-tip="修改光源">Update</a>&emsp;
            <a id="test_light_delete"  href="javascript:call(test_light_delete)" class="tip-hotspot" data-tip="删除光源">Delete</a>&emsp;
            <a id="test_light_clear"  href="javascript:call(test_light_clear)" class="tip-hotspot" data-tip="清空所有光源">Clear</a>&emsp;
            <a id="test_light_focus"  href="javascript:call(test_light_focus)" class="tip-hotspot" data-tip="定位光源">Focus</a>&emsp;
            <a id="test_light_show"  href="javascript:call(test_light_show)" class="tip-hotspot" data-tip="显示指定光源">Show</a>&emsp;
            <a id="test_light_hide"  href="javascript:call(test_light_hide)" class="tip-hotspot" data-tip="隐藏指定光源">Hide</a>&emsp;
            <a id="test_light_get"  href="javascript:call(test_light_get)" class="tip-hotspot" data-tip="获取指定光源详细信息">Get</a><br><br>&emsp;
            <a id="test_light_showAll"  href="javascript:call(test_light_showAll)" class="tip-hotspot" data-tip="显示所有光源">ShowAll</a> &emsp;
            <a id="test_light_hideAll"  href="javascript:call(test_light_hideAll)" class="tip-hotspot" data-tip="隐藏所有光源">HideAll</a><br>&emsp;
        </div>

        <div id="a_Beam" >
            <img width="24" height="24" src="images/beam.png" /><strong>&nbsp;光流：Beam</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Beam.html" target="_blank">API帮助</a> &emsp;
            <a id="test_beam_add"  href="javascript:call(test_beam_add)" class="tip-hotspot" data-tip="添加Beam">Add</a> &emsp;
            <a id="test_beam_update"  href="javascript:call(test_beam_update)" class="tip-hotspot" data-tip="修改Beam">Update</a> &emsp;
            <a id="test_beam_delete"  href="javascript:call(test_beam_delete)" class="tip-hotspot" data-tip="删除Beam">Delete</a> &emsp;
            <a id="test_beam_clear"  href="javascript:call(test_beam_clear)" class="tip-hotspot" data-tip="清空Beam">Clear</a> &emsp;
            <a id="test_beam_focus"  href="javascript:call(test_beam_focus)" class="tip-hotspot" data-tip="定位Beam">Focus</a> &emsp;
            <a id="test_beam_get"  href="javascript:call(test_beam_get)" class="tip-hotspot" data-tip="获取Beam">Get</a> &emsp;
            <a id="test_beam_show"  href="javascript:call(test_beam_show)" class="tip-hotspot" data-tip="显示Beam">Show</a> &emsp;
            <a id="test_beam_hide"  href="javascript:call(test_beam_hide)" class="tip-hotspot" data-tip="隐藏Beam">Hide</a> &emsp;
            <a id="test_beam_showAll"  href="javascript:call(test_beam_showAll)" class="tip-hotspot" data-tip="显示所有Beam">ShowAll</a> &emsp;
            <a id="test_beam_hideAll"  href="javascript:call(test_beam_hideAll)" class="tip-hotspot" data-tip="隐藏所有Beam">HideAll</a> &emsp;

            <a id="test_beam_setThickness"  href="javascript:call(test_beam_setThickness)" class="tip-hotspot" data-tip="设置厚度">SetThickness</a> &emsp;
        </div>


        <div id="a_RadiationPoint" >
            <img width="24" height="24" src="images/radiation.png" /><strong>&nbsp;辐射圈：RadiationPoint</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/RadiationPoint.html" target="_blank">API帮助</a> &emsp;
            <a id="test_radiationPoint_add"  href="javascript:call(test_radiationPoint_add)" class="tip-hotspot" data-tip="添加辐射圈">Add</a> &emsp;
            <a id="test_radiationPoint_update"  href="javascript:call(test_radiationPoint_update)" class="tip-hotspot" data-tip="修改辐射圈">Update</a> &emsp;
            <a id="test_radiationPoint_delete"  href="javascript:call(test_radiationPoint_delete)" class="tip-hotspot" data-tip="删除辐射圈">Delete</a> &emsp;
            <a id="test_radiationPoint_clear"  href="javascript:call(test_radiationPoint_clear)" class="tip-hotspot" data-tip="清空辐射圈">Clear</a> &emsp;
            <a id="test_radiationPoint_focus"  href="javascript:call(test_radiationPoint_focus)" class="tip-hotspot" data-tip="定位辐射圈">Focus</a>  &emsp;
            <a id="test_radiationPoint_focusAll"  href="javascript:call(test_radiationPoint_focusAll)" class="tip-hotspot" data-tip="定位所有辐射圈">FocusAll</a> &emsp;
            <a id="test_radiationPoint_show"  href="javascript:call(test_radiationPoint_show)" class="tip-hotspot" data-tip="显示辐射圈">Show</a> &emsp;
            <a id="test_radiationPoint_hide"  href="javascript:call(test_radiationPoint_hide)" class="tip-hotspot" data-tip="隐藏辐射圈">Hide</a>&emsp;
            <a id="test_radiationPoint_showAll"  href="javascript:call(test_radiationPoint_showAll)" class="tip-hotspot" data-tip="显示所有辐射圈">ShowAll</a> &emsp;
            <a id="test_radiationPoint_hideAll"  href="javascript:call(test_radiationPoint_hideAll)" class="tip-hotspot" data-tip="隐藏所有辐射圈">HideAll</a>&emsp;
            <a id="test_radiationPoint_get"  href="javascript:call(test_radiationPoint_get)" class="tip-hotspot" data-tip="获取辐射圈信息">Get</a> &emsp;
        </div>
        

        <p style="text-align:left;font-size:18px;color:#0063e4">压力测试</p>
        <div id="a_压力测试">
            <img width="24" height="24" src="images/stress.png" /><strong>&nbsp;压力测试：</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>
            <ul>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_3000_markers"  href="javascript:call(test_stress_add_3000_markers)">一次性创建3000个Marker</a>（测试批量创建接口）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_update_3000_markers"  href="javascript:call(test_stress_update_3000_markers)">一次性修改3000个Marker</a>（测试批量修改性能）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_1000_tags"  href="javascript:call(test_stress_add_1000_tags)">一次性创建1000个标签</a>（测试批量创建接口）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_update_1000_tags"  href="javascript:call(test_stress_update_1000_tags)">一次性修改1000个标签</a>（测试批量修改性能）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_odline_creat"  href="javascript:call(test_stress_odline_creat)">一次性创建3000个ODLine </a>（测试批量创建接口）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_customObject_3000"  href="javascript:call(test_stress_add_customObject_3000)">一次性创建3000个CustomObject模拟车辆移动 </a>（测试批量创建接口）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_drone_3000"  href="javascript:call(test_stress_add_drone_3000)">一次性创建3000个Drone模拟无人机移动轨迹 </a>（测试批量创建接口）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_update_tagpos_200"  href="javascript:call(test_stress_update_tagpos_200)">连续200次修改标签位置</a>（测试频繁调用接口的效率）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_update_delete_3dpolygon"  href="javascript:call(test_stress_add_update_delete_3dpolygon)">频繁添加修改删除Polygon3D</a>（测试崩溃问题）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_heatmap_3000"  href="javascript:call(test_stress_add_heatmap_3000)">创建3000个热力点的HeatMap对象</a>（热力图压力测试）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_800_polygon"  href="javascript:call(test_stress_add_800_polygon)">创建800多个点的Polygon</a>（Polygon性能测试）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_800_3dpolygon"  href="javascript:call(test_stress_add_800_3dpolygon)">创建800多个点的Polygon3D</a>（Polygon3D性能测试）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_10000_polygon"  href="javascript:call(test_stress_add_10000_polygon)">创建超过10000个点的Polygon</a>（Polygon性能测试）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_add_10000_3dpolygon"  href="javascript:call(test_stress_add_10000_3dpolygon)">创建超过10000个点的Polygon3D</a>（Polygon3D性能测试）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_polygon_from_geojson"  href="javascript:call(test_stress_polygon_from_geojson)">从GeoJson创建多个Polygon</a>（测试GeoJson）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_3dpolygon_from_geojson"  href="javascript:call(test_stress_3dpolygon_from_geojson)">从GeoJson创建多个不同样式的Polygon3D</a>（测试GeoJson）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_polyline_show_hide_frequently"  href="javascript:call(test_stress_polyline_show_hide_frequently)">频繁显示|隐藏Polyline</a>（测试是否有部分对象无法显隐）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_polygon_show_hide_frequently"  href="javascript:call(test_stress_polygon_show_hide_frequently)">频繁显示|隐藏Polygon</a>（测试是否有部分对象无法显隐）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_3dpolygon_show_hide_frequently"  href="javascript:call(test_stress_3dpolygon_show_hide_frequently)">频繁显示|隐藏Polygon3D</a>（测试是否有部分对象无法显隐）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_3dpolygon_show_hide_frequently2"  href="javascript:call(test_stress_3dpolygon_show_hide_frequently2)">频繁显示|隐藏Polygon3D</a>（测试显示|隐藏引起的崩溃）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_callback_frequently"  href="javascript:call(test_stress_callback_frequently)">测试回调函数顺序是否错乱</a>（频繁调用接口看回调函数是否正确）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_playVideo_frequently"  href="javascript:call(test_stress_playVideo_frequently)">测试视频播放功能</a>（测试频繁开关视频引起的崩溃）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_cameratour_1000_keyframes"  href="javascript:call(test_stress_cameratour_1000_keyframes)">CameraTour添加1000个关键帧</a>（测试CameraTour关键帧的数量）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_disable_callback"  href="javascript:call(test_stress_disable_callback)">禁用回调测试</a>（测试禁用回调后的性能）<br />
                </li>
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_api_queue"  href="javascript:call(test_stress_api_queue)">测试API收发队列</a><br />
                </li> 
                <li> &emsp;<img src="images/stress_i.png" style="width:20px" /> <a id="test_stress_rtc_performence"  href="javascript:call(test_stress_rtc_performence)">测试WebRTC数据发送效率</a><br />
                </li>                                  
            </ul>
        </div>
        </div>



        <!-- 球面坐标系导航 -->
        <div id="gcs">
        <p id="gcsNav" style="text-align:left;font-size:22px;color:#0063e4;font-weight:bold;">球面坐标系API示例代码</p>
        
        <p style="text-align:left;font-size:18px;color:#0063e4">内置全局类对象</p>
        <div id="ellipsoid_a_Camera">
            <img width="24" height="24" src="images/camera.png" /><strong>&nbsp;相机操作：Camera</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Camera.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_camera_get"  href="javascript:call(test_ellipsoid_camera_get)"><font color="#555">获取相机位置：</font>Get</a><br> &emsp;
            <a id="test_ellipsoid_camera_set"  href="javascript:call(test_ellipsoid_camera_set)"><font color="#555">设置相机位置：</font>Set</a><br> &emsp;

            <a id="test_ellipsoid_camera_lockBBox"  href="javascript:call(test_ellipsoid_camera_lockBBox)"><font color="#555">锁定相机交互范围：</font>LockByBBox</a><br> &emsp;
            <a id="test_ellipsoid_camera_unLockBBox"  href="javascript:call(test_ellipsoid_camera_unLockBBox)"><font color="#555">解锁相机交互范围：</font>UnLock</a><br> &emsp;

            <a id="test_ellipsoid_camera_getEulerAngle"  href="javascript:call(test_ellipsoid_camera_getEulerAngle)"><font color="#555">获取两点的欧拉角：</font>GetEulerAngle</a><br> &emsp;
            <a id="test_ellipsoid_camera_set_byArray"  href="javascript:call(test_ellipsoid_camera_set_byArray)"><font color="#555">设置相机位置（通过数组参数）：</font>Set</a><br> &emsp;
            <a id="test_ellipsoid_camera_set_byObject"  href="javascript:call(test_ellipsoid_camera_set_byObject)"><font color="#555">设置相机位置（通过对象参数）：</font>Set</a><br> &emsp;
            <a id="test_ellipsoid_camera_lookAt"  href="javascript:call(test_ellipsoid_camera_lookAt)"><font color="#555">通过观察点设置相机位置：</font>LookAt</a><br> &emsp;
            
            <a id="test_ellipsoid_camera_flyAround"  href="javascript:call(test_ellipsoid_camera_flyAround)"><font color="#555">设置相机环绕：</font>FlyAround</a><br> &emsp;

            <a id="test_ellipsoid_camera_lookAtBBox2"  href="javascript:call(test_ellipsoid_camera_lookAtBBox2)"><font color="#555">进入物体观察模式：</font>LookAtBBox</a><br> &emsp;
            <a id="test_ellipsoid_camera_lookAtBBox1"  href="javascript:call(test_ellipsoid_camera_lookAtBBox1)"><font color="#555">进入自由交互模式：</font>LookAtBBox</a><br> &emsp;

            <a id="test_ellipsoid_camera_getAnimationList"  href="javascript:call(test_ellipsoid_camera_getAnimationList)"><font color="#555">获取导览列表：</font>GetAnimationList</a><br> &emsp;
            <a id="test_ellipsoid_camera_getAnimationImage"  href="javascript:call(test_ellipsoid_camera_getAnimationImage)"><font color="#555">获取导览缩略图：</font>GetAnimationImage</a><br> &emsp;
            <a id="test_ellipsoid_camera_playAnimation"  href="javascript:call(test_ellipsoid_camera_playAnimation)"><font color="#555">开始播放动画导航：</font>PlayAnimation</a><br> &emsp;
            <a id="test_ellipsoid_camera_pauseAnimation"  href="javascript:call(test_ellipsoid_camera_pauseAnimation)"><font color="#555">暂停播放动画导航：</font>PauseAnimation</a><br> &emsp;
            <a id="test_ellipsoid_camera_resumeAnimation"  href="javascript:call(test_ellipsoid_camera_resumeAnimation)"><font color="#555">恢复播放动画导航：</font>ResumeAnimation</a><br> &emsp;
            <a id="test_ellipsoid_camera_stopAnimation"  href="javascript:call(test_ellipsoid_camera_stopAnimation)"><font color="#555">停止播放动画导航：</font>StopAnimation</a><br><br> &emsp;

            <a id="test_ellipsoid_camera_exportOrthoImage"  href="javascript:call(test_ellipsoid_camera_exportOrthoImage)"><font color="#555">导出正交投影图片：</font>ExportOrthoImage</a><br><br> &emsp;

<!--
            <a id="test_ellipsoid_camera_enterWorld"  href="javascript:call(test_ellipsoid_camera_enterWorld)"><font color="#555">进入世界：</font>EnterWorld</a><br> &emsp;
            <a id="test_ellipsoid_camera_exitWorld"  href="javascript:call(test_ellipsoid_camera_exitWorld)"><font color="#555">退出世界：</font>ExitWorld</a><br><br> &emsp;
-->
            <a id="test_ellipsoid_camera_cancelFollow"  href="javascript:call(test_ellipsoid_camera_cancelFollow)"><font color="#555">取消相机跟随：</font>CancelFollow</a><br><br> &emsp;

            <a id="test_ellipsoid_camera_moveForward"  href="javascript:call(test_ellipsoid_camera_moveForward)"><font color="#555">相机控制-前进：</font>MoveForward</a><br> &emsp;
            <a id="test_ellipsoid_camera_moveBackward"  href="javascript:call(test_ellipsoid_camera_moveBackward)"><font color="#555">相机控制-后退：</font>MoveBackward</a><br> &emsp;
            <a id="test_ellipsoid_camera_moveLeft"  href="javascript:call(test_ellipsoid_camera_moveLeft)"><font color="#555">相机控制-左移：</font>MoveLeft</a><br> &emsp;
            <a id="test_ellipsoid_camera_moveRight"  href="javascript:call(test_ellipsoid_camera_moveRight)"><font color="#555">相机控制-右移：</font>MoveRight</a><br> &emsp;
            <a id="test_ellipsoid_camera_moveUp"  href="javascript:call(test_ellipsoid_camera_moveUp)"><font color="#555">相机控制-上升：</font>MoveUp</a><br> &emsp;
            <a id="test_ellipsoid_camera_moveDown"  href="javascript:call(test_ellipsoid_camera_moveDown)"><font color="#555">相机控制-下降：</font>MoveDown</a><br> &emsp;
            <a id="test_ellipsoid_camera_turnLeft"  href="javascript:call(test_ellipsoid_camera_turnLeft)"><font color="#555">相机控制-左转：</font>TurnLeft</a><br> &emsp;
            <a id="test_ellipsoid_camera_turnRight"  href="javascript:call(test_ellipsoid_camera_turnRight)"><font color="#555">相机控制-右转：</font>TurnRight</a><br> &emsp;
            <a id="test_ellipsoid_camera_turnUp"  href="javascript:call(test_ellipsoid_camera_turnUp)"><font color="#555">相机控制-抬头：</font>TurnUp</a><br> &emsp;
            <a id="test_ellipsoid_camera_turnDown"  href="javascript:call(test_ellipsoid_camera_turnDown)"><font color="#555">相机控制-低头：</font>TurnDown</a><br> &emsp;
            <a id="test_ellipsoid_camera_stop"  href="javascript:call(test_ellipsoid_camera_stop)"><font color="#555">相机控制-停止：</font>Stop</a><br> &emsp;
        </div>

        <div id="ellipsoid_a_EditHelper">
            <img width="24" height="24" src="images/cb.png" /><strong>&nbsp;绘制助手：EditHelper</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/EditHelper.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_editHelper_setParam"  href="javascript:call(test_ellipsoid_editHelper_setParam)" class="tip-hotspot" data-tip="设置参数">SetParam</a> &emsp;
            <a id="test_ellipsoid_editHelper_start"  href="javascript:call(test_ellipsoid_editHelper_start)" class="tip-hotspot" data-tip="开始编辑">Start</a> &emsp;
            <a id="test_ellipsoid_editHelper_cancel"  href="javascript:call(test_ellipsoid_editHelper_cancel)" class="tip-hotspot" data-tip="取消编辑">Cancel</a> &emsp;
            <a id="test_ellipsoid_editHelper_finish"  href="javascript:call(test_ellipsoid_editHelper_finish)" class="tip-hotspot" data-tip="完成编辑">Finish</a> &emsp;
        </div>

        <div id="ellipsoid_a_Coord" >
            <img width="24" height="24" src="images/coord.png" /><strong>&nbsp;坐标转换：Coord</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Coord.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_coord_screen2World"  href="javascript:call(test_ellipsoid_coord_screen2World)"><font color="#555">屏幕坐标转为世界坐标：</font>Screen2World</a><br> &emsp;
            <a id="test_ellipsoid_coord_world2Screen"  href="javascript:call(test_ellipsoid_coord_world2Screen)"><font color="#555">世界坐标转为屏幕坐标：</font>World2Screen</a><br> &emsp;
            <a id="test_ellipsoid_coord_pcs2gcs"  href="javascript:call(test_ellipsoid_coord_pcs2gcs)"><font color="#555">投影坐标转为地理坐标：</font>PCS2GCS</a><br> &emsp;
            <a id="test_ellipsoid_coord_gcs2pcs"  href="javascript:call(test_ellipsoid_coord_gcs2pcs)"><font color="#555">地理坐标转为投影坐标：</font>GCS2PCS</a><br> &emsp;
        </div>

        <div id="ellipsoid_a_InfoTree" >
            <img width="24" height="24" src="images/layers.png" /><strong>&nbsp;图层树：InfoTree</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/InfoTree.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_layers_focus"  href="javascript:call(test_ellipsoid_layers_focus)"><font color="#555">定位图层：</font>Focus</a><br> &emsp;   
            <a id="test_ellipsoid_layers_hide"  href="javascript:call(test_ellipsoid_layers_hide)"><font color="#555">隐藏图层：</font>Hide</a><br> &emsp;   
            <a id="test_ellipsoid_layers_show"  href="javascript:call(test_ellipsoid_layers_show)"><font color="#555">显示图层：</font>Show</a><br> &emsp;   
            <a id="test_ellipsoid_layers_get"  href="javascript:call(test_ellipsoid_layers_get)"><font color="#555">获取图层树信息：</font>Get</a><br><br> &emsp;

            <a id="test_ellipsoid_layers_getBPFunction"  href="javascript:call(test_ellipsoid_layers_getBPFunction)"><font color="#555">查询图层树上对象的蓝图函数：</font>GetBPFunction</a><br> &emsp;   
            <a id="test_ellipsoid_layers_callBPFunction"  href="javascript:call(test_ellipsoid_layers_callBPFunction)"><font color="#555">调用图层树上对象的蓝图函数：</font>CallBPFunction</a><br><br> &emsp;   

        </div>

        <div id="ellipsoid_a_Weather" >
            <img width="24" height="24" src="images/weather.png" /><strong>&nbsp;天气环境：Weather</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Weather.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_weather_getParams"  href="javascript:call(test_ellipsoid_weather_getParams)"><font color="#555">获取天气参数：</font>GetParams</a><br> &emsp;
            <a id="test_ellipsoid_weather_getDateTime"  href="javascript:call(test_ellipsoid_weather_getDateTime)"><font color="#555">获取日期时间：</font>GetDateTime</a><br> &emsp;

            <a id="test_ellipsoid_weather_setSunIntensity"  href="javascript:call(test_ellipsoid_weather_setSunIntensity)"><font color="#555">设置太阳光照强度：</font>SetSunIntensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setMoonIntensity"  href="javascript:call(test_ellipsoid_weather_setMoonIntensity)"><font color="#555">设置月亮光照强度：</font>SetMoonIntensity</a><br> &emsp;

            <a id="test_ellipsoid_weather_setSunSize"  href="javascript:call(test_ellipsoid_weather_setSunSize)"><font color="#555">设置太阳尺寸：</font>SetSunSize</a><br> &emsp;
            <a id="test_ellipsoid_weather_setMoonSize"  href="javascript:call(test_ellipsoid_weather_setMoonSize)"><font color="#555">设置月亮尺寸：</font>SetMoonSize</a><br> &emsp;

            <a id="test_ellipsoid_weather_setAmbientLightIntensity"  href="javascript:call(test_ellipsoid_weather_setAmbientLightIntensity)"><font color="#555">设置环境光强度：</font>SetAmbientLightIntensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setTemperature"  href="javascript:call(test_ellipsoid_weather_setTemperature)"><font color="#555">设置色温值：</font>SetTemperature</a><br><br> &emsp;

            <a id="test_ellipsoid_weather_setShadowIntensity"  href="javascript:call(test_ellipsoid_weather_setShadowIntensity)"><font color="#555">设置阴影强度：</font>SetShadowIntensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setShadowQuality"  href="javascript:call(test_ellipsoid_weather_setShadowQuality)"><font color="#555">设置阴影质量：</font>SetShadowQuality</a><br> &emsp;
            <a id="test_ellipsoid_weather_setShadowDistance"  href="javascript:call(test_ellipsoid_weather_setShadowDistance)"><font color="#555">设置阴影可视距离：</font>SetShadowDistance</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            <a id="test_ellipsoid_weather_setDateTime"  href="javascript:call(test_ellipsoid_weather_setDateTime)"><font color="#555">设置日期时间：</font>SetDateTime</a><br> &emsp;
            <a id="test_ellipsoid_weather_setRainParam"  href="javascript:call(test_ellipsoid_weather_setRainParam)"><font color="#555">设置下雨效果：</font>SetRainParam</a><br> &emsp;
            <a id="test_ellipsoid_weather_setSnowParam"  href="javascript:call(test_ellipsoid_weather_setSnowParam)"><font color="#555">设置下雪效果：</font>SetSnowParam</a><br> &emsp;
            <a id="test_ellipsoid_weather_disableRainSnow"  href="javascript:call(test_ellipsoid_weather_disableRainSnow)"><font color="#555">禁用雨雪效果：</font>DisableRainSnow</a><br> &emsp;
            <a id="test_ellipsoid_weather_setFogParam"  href="javascript:call(test_ellipsoid_weather_setFogParam)"><font color="#555">设置雾效：</font>SetFogParam</a><br> &emsp;
            <a id="test_ellipsoid_weather_setCloudDensity"  href="javascript:call(test_ellipsoid_weather_setCloudDensity)"><font color="#555">设置云层密度：</font>SetCloudDensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setCloudThickness"  href="javascript:call(test_ellipsoid_weather_setCloudThickness)"><font color="#555">设置云层厚度：</font>SetCloudThickness</a><br> &emsp;
            
            <a id="test_ellipsoid_weather_setSkyVisibleMaxHeight"  href="javascript:call(test_ellipsoid_weather_setSkyVisibleMaxHeight)"><font color="#555">设置天空球效果的失效高度：</font>SetSkyVisibleMaxHeight</a><br><br> &emsp;

            <a id="test_ellipsoid_weather_setCloudParam"  href="javascript:call(test_ellipsoid_weather_setCloudParam)"><font color="#555">设置云效参数：</font>SetCloudParam</a><br> &emsp;
            <a id="test_ellipsoid_weather_setLowCloud"  href="javascript:call(test_ellipsoid_weather_setLowCloud)"><font color="#555">设置低云层参数：</font>SetLowCloud</a><br> &emsp;
            <a id="test_ellipsoid_weather_setHighCloud"  href="javascript:call(test_ellipsoid_weather_setHighCloud)"><font color="#555">设置高云层参数：</font>SetHighCloud</a><br><br> &emsp;


            <a id="test_ellipsoid_weather_setDarkMode"  href="javascript:call(test_ellipsoid_weather_setDarkMode)"><font color="#555">设置黑暗模式：</font>SetDarkMode</a><br> &emsp;
            <a id="test_ellipsoid_weather_simulateTime"  href="javascript:call(test_ellipsoid_weather_simulateTime)"><font color="#555">模拟时间播放：</font>SimulateTime</a><br><br> &emsp;

            <a id="test_ellipsoid_weather_setOceanWave"  href="javascript:call(test_ellipsoid_weather_setOceanWave)"><font color="#555">设置海浪参数：</font>SetOceanWave</a><br> &emsp;
            <a id="test_ellipsoid_weather_getOceanWave"  href="javascript:call(test_ellipsoid_weather_getOceanWave)"><font color="#555">查询海浪参数：</font>GetOceanWave</a><br><br> &emsp;
            
            <a id="test_ellipsoid_weather_setEarthCloudIntensity"  href="javascript:call(test_ellipsoid_weather_setEarthCloudIntensity)"><font color="#555">设置地球大气云层的亮度：</font>SetEarthCloudIntensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setEarthNightLightIntensity"  href="javascript:call(test_ellipsoid_weather_setEarthNightLightIntensity)"><font color="#555">设置地球夜晚灯光的亮度：</font>SetEarthNightLightIntensity</a><br> &emsp;
            <a id="test_ellipsoid_weather_setEarthStarBackgroundIntensity"  href="javascript:call(test_ellipsoid_weather_setEarthStarBackgroundIntensity)"><font color="#555">设置地球夜晚星空背景的亮度：</font>SetEarthStarBackgroundIntensity</a><br><br> &emsp;


        </div>

        <div id="ellipsoid_a_Tools" >
            <img width="24" height="24" src="images/tools.png" /><strong>&nbsp;系统工具：Tools</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Tools.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_tools_startPolygonClip"  href="javascript:call(test_ellipsoid_tools_startPolygonClip)"><font color="#555">多边形剖切：</font>StartPolygonClip</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopPolygonClip"  href="javascript:call(test_ellipsoid_tools_stopPolygonClip)"><font color="#555">停止多边形剖切：</font>StopPolygonClip</a><br><br> &emsp;

            <a id="test_ellipsoid_tools_startPlaneClip"  href="javascript:call(test_ellipsoid_tools_startPlaneClip)"><font color="#555">开始面剖切：</font>StartPlaneClip</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopPlaneClip"  href="javascript:call(test_ellipsoid_tools_stopPlaneClip)"><font color="#555">停止面剖切：</font>StopPlaneClip</a><br><br> &emsp;

            <a id="test_ellipsoid_tools_startVolumeClip"  href="javascript:call(test_ellipsoid_tools_startVolumeClip)"><font color="#555">开始体剖切：</font>StartVolumeClip</a><br> &emsp;
            <a id="test_ellipsoid_tools_updateVolumeClip"  href="javascript:call(test_ellipsoid_tools_updateVolumeClip)"><font color="#555">更新体剖切：</font>UpdateVolumeClip</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopVolumeClip"  href="javascript:call(test_ellipsoid_tools_stopVolumeClip)"><font color="#555">停止体剖切：</font>StopVolumeClip</a><br><br> &emsp;

            <a id="test_ellipsoid_tools_startMeasurement"  href="javascript:call(test_ellipsoid_tools_startMeasurement)"><font color="#555">进入测量模式并开始测量：</font>StartMeasurement</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopMeasurement"  href="javascript:call(test_ellipsoid_tools_stopMeasurement)"><font color="#555">停止测量：</font>StopMeasurement</a><br><br> &emsp;

            <a id="test_ellipsoid_tools_lineIntersect"  href="javascript:call(test_ellipsoid_tools_lineIntersect)"><font color="#555">单条线段求交：</font>LineIntersect</a><br> &emsp;
            <a id="test_ellipsoid_tools_linesIntersect"  href="javascript:call(test_ellipsoid_tools_linesIntersect)"><font color="#555">多条线段求交：</font>LinesIntersect</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            <a id="test_ellipsoid_tools_startGeometryEdit"  href="javascript:call(test_ellipsoid_tools_startGeometryEdit)"><font color="#555">顶点编辑：</font>StartGeometryEdit</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopGeometryEdit"  href="javascript:call(test_ellipsoid_tools_stopGeometryEdit)"><font color="#555">退出顶点编辑：</font>StopGeometryEdit</a><br><br> &emsp;

            <a id="test_ellipsoid_tools_startSkylineAnalysis"  href="javascript:call(test_ellipsoid_tools_startSkylineAnalysis)"><font color="#555">开始天际线分析：</font>StartSkylineAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopSkylineAnalysis"  href="javascript:call(test_ellipsoid_tools_stopSkylineAnalysis)"><font color="#555">停止天际线分析：</font>StopSkylineAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_exportSkyline"  href="javascript:call(test_ellipsoid_tools_exportSkyline)"><font color="#555">导出天际线：</font>ExportSkyline</a><br><br> &emsp;


            <a id="test_ellipsoid_tools_startViewshedAnalysis"  href="javascript:call(test_ellipsoid_tools_startViewshedAnalysis)"><font color="#555">开始视域分析：</font>StartViewshedAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopViewshedAnalysis"  href="javascript:call(test_ellipsoid_tools_stopViewshedAnalysis)"><font color="#555">停止视域分析：</font>StopViewshedAnalysis</a><br><br> &emsp;


            <a id="test_ellipsoid_tools_startFloodFill"  href="javascript:call(test_ellipsoid_tools_startFloodFill)"><font color="#555">开始水淹分析：</font>StartFloodFill</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopFloodFill"  href="javascript:call(test_ellipsoid_tools_stopFloodFill)"><font color="#555">停止水淹分析：</font>StopFloodFill</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            <a id="test_ellipsoid_tools_startVisiblityAnalysis"  href="javascript:call(test_ellipsoid_tools_startVisiblityAnalysis)"><font color="#555">开始通视分析：</font>StartVisiblityAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopVisiblityAnalysis"  href="javascript:call(test_ellipsoid_tools_stopVisiblityAnalysis)"><font color="#555">停止通视分析：</font>StopVisiblityAnalysis</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

            <a id="test_ellipsoid_tools_startViewDomeAnalysis"  href="javascript:call(test_ellipsoid_tools_startViewDomeAnalysis)"><font color="#555">开始开敞度分析：</font>StartViewDomeAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopViewDomeAnalysis"  href="javascript:call(test_ellipsoid_tools_stopViewDomeAnalysis)"><font color="#555">停止开敞度分析：</font>StopViewDomeAnalysis</a><br><br> &emsp;    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            <a id="test_ellipsoid_tools_startCutFillAnalysis"  href="javascript:call(test_ellipsoid_tools_startCutFillAnalysis)"><font color="#555">开始填挖方分析：</font>StartCutFillAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopCutFillAnalysis"  href="javascript:call(test_ellipsoid_tools_stopCutFillAnalysis)"><font color="#555">停止填挖方分析：</font>StopCutFillAnalysis</a><br><br> &emsp;   

            <a id="test_ellipsoid_tools_startSunshineAnalysis"  href="javascript:call(test_ellipsoid_tools_startSunshineAnalysis)"><font color="#555">开始日照分析：</font>StartSunshineAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopSunshineAnalysis"  href="javascript:call(test_ellipsoid_tools_stopSunshineAnalysis)"><font color="#555">停止日照分析：</font>StopSunshineAnalysis</a><br><br> &emsp;    

            <a id="test_ellipsoid_tools_startTerrainSlopeAnalysis"  href="javascript:call(test_ellipsoid_tools_startTerrainSlopeAnalysis)"><font color="#555">开始坡度坡向分析：</font>StartTerrainSlopeAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopTerrainSlopeAnalysis"  href="javascript:call(test_ellipsoid_tools_stopTerrainSlopeAnalysis)"><font color="#555">停止坡度坡向分析：</font>StopTerrainSlopeAnalysis</a><br><br> &emsp;    

            <a id="test_ellipsoid_tools_startContourLineAnalysis"  href="javascript:call(test_ellipsoid_tools_startContourLineAnalysis)"><font color="#555">开始等高线分析：</font>StartContourLineAnalysis</a><br> &emsp;
            <a id="test_ellipsoid_tools_stopContourLineAnalysis"  href="javascript:call(test_ellipsoid_tools_stopContourLineAnalysis)"><font color="#555">停止等高线分析：</font>StopContourLineAnalysis</a><br><br> &emsp;   
         

            
            <a id="test_ellipsoid_tools_showUIPanel"  href="javascript:call(test_ellipsoid_tools_showUIPanel)"><font color="#555">显示操作面板窗口：</font>ShowUIPanel</a><br> &emsp;
            <a id="test_ellipsoid_tools_hideUIPanel"  href="javascript:call(test_ellipsoid_tools_hideUIPanel)"><font color="#555">隐藏操作面板状态：</font>HideUIPanel</a><br>  &emsp;
            <a id="test_ellipsoid_tools_getUIPanel"  href="javascript:call(test_ellipsoid_tools_getUIPanel)"><font color="#555">查询操作面板状态：</font>GetUIPanel</a><br><br>  &emsp;
           
            
            <a id="test_ellipsoid_tools_replaceTextureByVideo"  href="javascript:call(test_ellipsoid_tools_replaceTextureByVideo)"><font color="#555">使用视频流替换纹理：</font>ReplaceTextureByVideo</a><br> &emsp;   
            <a id="test_ellipsoid_tools_replaceTextureByImage"  href="javascript:call(test_ellipsoid_tools_replaceTextureByImage)"><font color="#555">使用图片替换纹理：</font>ReplaceTextureByImage</a><br> &emsp;   
            <a id="test_ellipsoid_tools_replaceTextureByUrl"  href="javascript:call(test_ellipsoid_tools_replaceTextureByUrl)"><font color="#555">使用网页替换纹理：</font>ReplaceTextureByUrl</a><br> &emsp;   
            <a id="test_ellipsoid_tools_restoreTexture"  href="javascript:call(test_ellipsoid_tools_restoreTexture)"><font color="#555">恢复纹理：</font>RestoreTexture</a><br> &emsp;   
        </div>

        <div id="ellipsoid_a_Settings">
            <img width="24" height="24" src="images/settings.png" /><strong>&nbsp;系统设置：Settings</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Settings.html" target="_blank">API帮助</a><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <a id="test_ellipsoid_settings_setMainUIVisibility"  href="javascript:call(test_ellipsoid_settings_setMainUIVisibility)"><font color="#555">显示|隐藏主界面UI：</font>SetMainUIVisibility</a><br> &emsp;
            <a id="test_ellipsoid_settings_setJoystickVisible"  href="javascript:call(test_ellipsoid_settings_setJoystickVisible)"><font color="#555">显示|隐藏操纵杆UI：</font>SetScreenControlsVisible</a><br> &emsp;
            
            <a id="test_ellipsoid_settings_setToolbarVisible"  href="javascript:call(test_ellipsoid_settings_setToolbarVisible)"><font color="#555">显示|隐藏右侧工具栏：</font>SetToolbarVisible</a><br> &emsp;
            

            <a id="test_setings_setMainPanelPos"  href="javascript:call(test_setings_setMainPanelPos)"><font color="#555">设置资源面板位置偏移：</font>SetMainPanelPos</a><br> &emsp;  

            <a id="test_setings_showPropertiesPanel"  href="javascript:call(test_setings_showPropertiesPanel)"><font color="#555">显示图层树上对象的属性面板：</font>ShowPropertiesPanel</a><br> &emsp;  
            <a id="test_setings_hidePropertiesPanel"  href="javascript:call(test_setings_hidePropertiesPanel)"><font color="#555">隐藏图层树上对象的属性面板：</font>HidePropertiesPanel</a><br> &emsp;  
            <a id="test_setings_setPropertiesPanelPos"  href="javascript:call(test_setings_setPropertiesPanelPos)"><font color="#555">设置图层树上对象属性面板的位置偏移：</font>SetPropertiesPanelPos</a><br> &emsp;  

            
            <a id="test_ellipsoid_settings_setCampassVisible"  href="javascript:call(test_ellipsoid_settings_setCampassVisible)"><font color="#555">显示|隐藏指北针：</font>SetCampassVisible</a><br> &emsp;
            <a id="test_ellipsoid_settings_setCampassPosition"  href="javascript:call(test_ellipsoid_settings_setCampassPosition)"><font color="#555">设置指北针位置：</font>SetCampassPosition</a><br> &emsp;
            
            <a id="test_ellipsoid_settings_setMousePickMask"  href="javascript:call(test_ellipsoid_settings_setMousePickMask)"><font color="#555">开启鼠标事件：</font>SetMousePickMask</a><br> &emsp;
            <a id="test_ellipsoid_settings_enableMouseRightClick"  href="javascript:call(test_ellipsoid_settings_enableMouseRightClick)"><font color="#555">开启鼠标右键点击拾取：</font>EnableRightClickMousePick</a><br> &emsp;
        
            
            <a id="test_ellipsoid_settings_setMapMode"  href="javascript:call(test_ellipsoid_settings_setMapMode)"><font color="#555">设置地图模式：</font>SetMapMode</a><br> &emsp;
            <a id="test_ellipsoid_settings_getMapMode"  href="javascript:call(test_ellipsoid_settings_getMapMode)"><font color="#555">获取地图模式：</font>GetMapMode</a><br> &emsp;
            <a id="test_ellipsoid_settings_setHighlightColor"  href="javascript:call(test_ellipsoid_settings_setHighlightColor)"><font color="#555">设置高亮的颜色：</font>SetHighlightColor</a><br> &emsp;
            <a id="test_ellipsoid_settings_setFovX"  href="javascript:call(test_ellipsoid_settings_setFovX)"><font color="#555">设置水平视场角：</font>SetFovX</a><br> &emsp;
            <a id="test_ellipsoid_settings_setOceanColor"  href="javascript:call(test_ellipsoid_settings_setOceanColor)"><font color="#555">设置海洋颜色：</font>SetOceanColor</a><br> &emsp;
            <a id="test_ellipsoid_settings_setEnableInteract"  href="javascript:call(test_ellipsoid_settings_setEnableInteract)"><font color="#555">设置交互开关：</font>SetEnableInteract</a><br> &emsp;
            <a id="test_ellipsoid_settings_setCharacterRoaming"  href="javascript:call(test_ellipsoid_settings_setCharacterRoaming)"><font color="#555">设置人物漫游：</font>SetCharacterRoaming</a><br><br> &emsp;
            
            <a id="test_ellipsoid_settings_setInteractiveMode"  href="javascript:call(test_ellipsoid_settings_setInteractiveMode)"><font color="#555">设置交互模式：</font>SetInteractiveMode</a><br> &emsp;
            <a id="test_ellipsoid_settings_getInteractiveMode"  href="javascript:call(test_ellipsoid_settings_getInteractiveMode)"><font color="#555">获取交互模式：</font>GetInteractiveMode</a><br> &emsp;
            
            <a id="test_ellipsoid_settings_setCharacterAssetPath"  href="javascript:call(test_ellipsoid_settings_setCharacterAssetPath)"><font color="#555">角色漫游下设置人物模型：</font>SetCharacterAssetPath</a><br> &emsp;
            <a id="test_ellipsoid_settings_setDroneAssetPath"  href="javascript:call(test_ellipsoid_settings_setDroneAssetPath)"><font color="#555">无人机漫游下设置无人机模型：</font>SetDroneAssetPath</a><br> &emsp;
        
            
            <a id="test_ellipsoid_settings_setTerrainAlpha"  href="javascript:call(test_ellipsoid_settings_setTerrainAlpha)"><font color="#555">设置地形透明度：</font>SetTerrainAlpha</a><br> &emsp;
            <a id="test_ellipsoid_settings_setEnableCameraMovingEvent"  href="javascript:call(test_ellipsoid_settings_setEnableCameraMovingEvent)"><font color="#555">设置是否触发CameraMoving：</font>SetEnableCameraMovingEvent</a><br> &emsp;
            <a id="test_ellipsoid_settings_setWMTSLayerVisible"  href="javascript:call(test_ellipsoid_settings_setWMTSLayerVisible)"><font color="#555">设置WMTS图层的可见性：</font>SetWMTSLayerVisible</a><br> &emsp;
            <a id="test_ellipsoid_settings_setWMTSLayerOpacity"  href="javascript:call(test_ellipsoid_settings_setWMTSLayerOpacity)"><font color="#555">设置WMTS图层的透明度：</font>SetWMTSLayerOpacity</a><br> &emsp;
            <a id="test_ellipsoid_settings_getProjectWKT"  href="javascript:call(test_ellipsoid_settings_getProjectWKT)"><font color="#555">获取ACP工程的坐标系配准：</font>GetProjectWKT</a><br> &emsp;
            <a id="test_ellipsoid_settings_getVTPK"  href="javascript:call(test_ellipsoid_settings_getVTPK)"><font color="#555">获取场景内所有的VTPK标注：</font>GetLabelLayer</a><br> &emsp;
            <a id="test_ellipsoid_settings_setVTPK"  href="javascript:call(test_ellipsoid_settings_setVTPK)"><font color="#555">设置VTPK标注：</font>SetLabelLayer</a><br> &emsp;
            <a id="test_ellipsoid_settings_removeVTPK"  href="javascript:call(test_ellipsoid_settings_removeVTPK)"><font color="#555">移除VTPK标注：</font>RemoveLabelLayer</a><br> &emsp;
            <a id="test_ellipsoid_settings_setCursorAutoSync"  href="javascript:call(test_ellipsoid_settings_setCursorAutoSync)"><font color="#555">设置鼠标同步：</font>SetCursorAutoSync</a><br> &emsp;

            <a id="test_ellipsoid_settings_setGroundHeight"  href="javascript:call(test_ellipsoid_settings_setGroundHeight)" class="tip-hotspot" data-tip="设置图层服务的高度"><font color="#555">设置图层服务的高度：</font>SetGroundHeight</a><br> &emsp;
            <a id="test_ellipsoid_settings_setLabelScale"  href="javascript:call(test_ellipsoid_settings_setLabelScale)" class="tip-hotspot" data-tip="设置VTPK标注的显示比例"><font color="#555">设置VTPK标注的显示比例：</font>SetLabelLayerScale</a> <br> &emsp;
            
            <a id="test_ellipsoid_settings_setWMTSLayerEnableDecal"  href="javascript:call(test_ellipsoid_settings_setWMTSLayerEnableDecal)" class="tip-hotspot" data-tip="设置网络图层服务是否贴合地形或对象"><font color="#555">设置网络图层服务是否贴合地形或对象：</font>SetImageryLayerEnableDecal</a> &emsp;

            
        
        </div>

        <div id="ellipsoid_a_SettingsPanel" >
            <img width="24" height="24" src="images/settingsPanel.png" /><strong>&nbsp;设置面板：SettingsPanel</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/SettingsPanel.html" target="_blank">API帮助</a><br> &emsp;

            <a id="test_ellipsoid_settingsPanel_setReportMode"  href="javascript:call(test_ellipsoid_settingsPanel_setReportMode)"><font color="#555">设置面板--设置汇报模式：</font>SetReportMode</a><br> &emsp;
            <a id="test_ellipsoid_settingsPanel_getReportMode"  href="javascript:call(test_ellipsoid_settingsPanel_getReportMode)"><font color="#555">设置面板--获取汇报模式：</font>GetReportMode</a><br><br> &emsp;

            <a id="test_ellipsoid_settingsPanel_setControlMode"  href="javascript:call(test_ellipsoid_settingsPanel_setControlMode)"><font color="#555">设置面板--设置控制参数：</font>SetControlMode</a><br> &emsp;
            <a id="test_ellipsoid_settingsPanel_getControlMode"  href="javascript:call(test_ellipsoid_settingsPanel_getControlMode)"><font color="#555">设置面板--获取控制参数：</font>GetControlMode</a><br><br> &emsp;

            <a id="test_ellipsoid_settingsPanel_setPostProcessMode"  href="javascript:call(test_ellipsoid_settingsPanel_setPostProcessMode)"><font color="#555">设置面板--设置后期参数：</font>SetPostProcessMode</a><br> &emsp;
            <a id="test_ellipsoid_settingsPanel_getPostProcessMode"  href="javascript:call(test_ellipsoid_settingsPanel_getPostProcessMode)"><font color="#555">设置面板--获取后期参数：</font>GetPostProcessMode</a><br><br> &emsp;

            <a id="test_ellipsoid_settingsPanel_setCameraMode"  href="javascript:call(test_ellipsoid_settingsPanel_setCameraMode)"><font color="#555">设置面板--设置相机参数：</font>SetCameraMode</a><br> &emsp;
            <a id="test_ellipsoid_settingsPanel_getCameraMode"  href="javascript:call(test_ellipsoid_settingsPanel_getCameraMode)"><font color="#555">设置面板--获取相机参数：</font>GetCameraMode</a><br><br> &emsp;

            <a id="test_ellipsoid_settingsPanel_setMapMode"  href="javascript:call(test_ellipsoid_settingsPanel_setMapMode)"><font color="#555">设置面板--设置地图模式：</font>SetMapMode</a><br> &emsp;
            <a id="test_ellipsoid_settingsPanel_getMapMode"  href="javascript:call(test_ellipsoid_settingsPanel_getMapMode)"><font color="#555">设置面板--获取地图模式：</font>GetMapMode</a><br> &emsp;
        </div>

        <div id="ellipsoid_a_Misc" >
            <img width="24" height="24" src="images/misc.png" /><strong>&nbsp;杂项：Misc</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Misc.html" target="_blank">API帮助</a><br> &emsp;     
            <a id="test_ellipsoid_misc_addImageButton"  href="javascript:call(test_ellipsoid_misc_addImageButton)"><font color="#555">添加图片按钮：</font>AddImageButton</a><br> &emsp;
            <a id="test_ellipsoid_misc_deleteImageButton"  href="javascript:call(test_ellipsoid_misc_deleteImageButton)"><font color="#555">删除图片按钮：</font>DeleteImageButton</a><br><br> &emsp;
            <a id="test_ellipsoid_misc_getConvexPolygon"  href="javascript:call(test_ellipsoid_misc_getConvexPolygon)"><font color="#555">获取凸多边形顶点索引：</font>GetConvexPolygon</a><br><br> &emsp;

            <!--
            <a id="test_ellipsoid_misc_addAnimatedImageButton"  href="javascript:call(test_ellipsoid_misc_addAnimatedImageButton)"><font color="#555">添加动画按钮：</font>AddAnimatedImageButton</a><br><br> &emsp;
            -->

            <a id="test_ellipsoid_misc_playVideo"  href="javascript:call(test_ellipsoid_misc_playVideo)"><font color="#555">在窗口指定位置播放视频：</font>PlayVideo</a><br> &emsp;
            <a id="test_ellipsoid_misc_stopPlayVideo"  href="javascript:call(test_ellipsoid_misc_stopPlayVideo)"><font color="#555">停止视频播放并隐藏视频窗口：</font>StopPlayVideo</a><br> &emsp;
            <a id="test_ellipsoid_misc_playMovie"  href="javascript:call(test_ellipsoid_misc_playMovie)"><font color="#555">全屏播放影片：</font>PlayMovie</a><br> &emsp;
            <a id="test_ellipsoid_misc_stopMovie"  href="javascript:call(test_ellipsoid_misc_stopMovie)"><font color="#555">停止全屏播放影片：</font>StopMovie</a><br> &emsp;
            <a id="test_ellipsoid_misc_playVideoAlone"  href="javascript:call(test_ellipsoid_misc_playVideoAlone)"><font color="#555">在独立的进程播放视频：</font>PlayVideoAlone</a><br> &emsp;
            <a id="test_ellipsoid_misc_stopPlayVideoAlone"  href="javascript:call(test_ellipsoid_misc_stopPlayVideoAlone)"><font color="#555">停止在独立的进程播放视频：</font>StopPlayVideoAlone</a><br><br> &emsp;
            <a id="test_ellipsoid_misc_callBPFunction"  href="javascript:call(test_ellipsoid_misc_callBPFunction)"><font color="#555">调用蓝图函数：</font>CallBPFunction</a><br> &emsp;
            
            <a id="test_ellipsoid_misc_enterReportMode"  href="javascript:call(test_ellipsoid_misc_enterReportMode)"><font color="#555">进入汇报演示模式：</font>EnterReportMode</a><br> &emsp;
            <a id="test_ellipsoid_misc_exitReportMode"  href="javascript:call(test_ellipsoid_misc_exitReportMode)"><font color="#555">退出汇报演示模式：</font>ExitReportMode</a><br><br><br> &emsp;

            <a id="test_ellipsoid_misc_enterMultiViewportMode"  href="javascript:call(test_ellipsoid_misc_enterMultiViewportMode)"><font color="#555">进入多视口模式：</font>EnterMultiViewportMode</a><br> &emsp;
            <a id="test_ellipsoid_misc_setMultiviewportInteractSync"  href="javascript:call(test_ellipsoid_misc_setMultiviewportInteractSync)"><font color="#555">设置多视口同步：</font>SetMultiviewportInteractSync</a><br> &emsp;
            <a id="test_ellipsoid_misc_setActiveViewport"  href="javascript:call(test_ellipsoid_misc_setActiveViewport)"><font color="#555">设置当前激活视口：</font>SetActiveViewport</a><br> &emsp;
            <a id="test_ellipsoid_misc_getActiveViewport"  href="javascript:call(test_ellipsoid_misc_getActiveViewport)"><font color="#555">获取当前激活视口：</font>GetActiveViewport</a><br> &emsp;
            <a id="test_ellipsoid_misc_exitMultiViewportMode"  href="javascript:call(test_ellipsoid_misc_exitMultiViewportMode)"><font color="#555">退出多视口模式：</font>ExitMultiViewportMode</a><br><br> &emsp;
            

            <a id="test_ellipsoid_misc_projectCountAll"  href="javascript:call(test_ellipsoid_misc_projectCountAll)"><font color="#555">统计工程包含的全部资产：</font>ProjectCountAll</a><br><br> &emsp;
            <a id="test_ellipsoid_misc_projectCount"  href="javascript:call(test_ellipsoid_misc_projectCount)"><font color="#555">统计工程包含的各类资产：</font>ProjectCount</a><br><br> &emsp;

            <a id="test_ellipsoid_misc_getMaterial"  href="javascript:call(test_ellipsoid_misc_getMaterial)"><font color="#555">查询模型材质信息：</font>GetMaterial</a><br> &emsp;
            <a id="test_ellipsoid_misc_getBPFunction"  href="javascript:call(test_ellipsoid_misc_getBPFunction)"><font color="#555">查询蓝图函数信息：</font>GetBPFunction</a><br><br> &emsp;

            <a id="test_ellipsoid_misc_reloadPak"  href="javascript:call(test_ellipsoid_misc_reloadPak)"><font color="#555">重新加载pak文件：</font>ReloadPak</a><br> &emsp;
         
            

            <a id="test_ellipsoid_misc_hideAllFoliages"  href="javascript:call(test_ellipsoid_misc_hideAllFoliages)"><font color="#555">隐藏所有植物：</font>HideAllFoliages</a><br> &emsp;
            <a id="test_ellipsoid_misc_showAllFoliages"  href="javascript:call(test_ellipsoid_misc_showAllFoliages)"><font color="#555">显示所有植物：</font>ShowAllFoliages</a><br><br> &emsp;
        
        </div>



        <p style="text-align:left;font-size:18px;color:#0063e4">标记类对象</p>
        <div id="ellipsoid_a_Marker">
            <img width="24" height="24" src="images/tag.png" /><strong>&nbsp;点标记：Marker</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Marker.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_marker_add"  href="javascript:call(test_ellipsoid_marker_add)" class="tip-hotspot" data-tip="添加标注">Add</a>&emsp;
            <a id="test_ellipsoid_marker_update"  href="javascript:call(test_ellipsoid_marker_update)" class="tip-hotspot" data-tip="修改标注">Update</a>&emsp;
            <a id="test_ellipsoid_marker_delete"  href="javascript:call(test_ellipsoid_marker_delete)" class="tip-hotspot" data-tip="删除标注">Delete</a>&emsp;
            <a id="test_ellipsoid_marker_clear"  href="javascript:call(test_ellipsoid_marker_clear)" class="tip-hotspot" data-tip="清空所有标注">Clear</a>&emsp;
            <a id="test_ellipsoid_marker_focus"  href="javascript:call(test_ellipsoid_marker_focus)" class="tip-hotspot" data-tip="定位标注">Focus</a>            &emsp;
            <a id="test_ellipsoid_marker_focusAll"  href="javascript:call(test_ellipsoid_marker_focusAll)" class="tip-hotspot" data-tip="定位显示所有标注">FocusAll</a>&emsp;
            <a id="test_ellipsoid_marker_show"  href="javascript:call(test_ellipsoid_marker_show)" class="tip-hotspot" data-tip="显示指定标注">Show</a>&emsp;
            <a id="test_ellipsoid_marker_showAll"  href="javascript:call(test_ellipsoid_marker_showAll)" class="tip-hotspot" data-tip="显示所有标注">ShowAll</a> &emsp;
            <a id="test_ellipsoid_marker_hideAll"  href="javascript:call(test_ellipsoid_marker_hideAll)" class="tip-hotspot" data-tip="隐藏所有标注">HideAll</a>&emsp;
            <a id="test_ellipsoid_marker_hide"  href="javascript:call(test_ellipsoid_marker_hide)" class="tip-hotspot" data-tip="隐藏指定标注">Hide</a>&emsp;

            <a id="test_ellipsoid_marker_showByGroupId"  href="javascript:call(test_ellipsoid_marker_showByGroupId)" class="tip-hotspot" data-tip="按分组显示标注">ShowByGroupId</a>&emsp;
            <a id="test_ellipsoid_marker_hideByGroupId"  href="javascript:call(test_ellipsoid_marker_hideByGroupId)" class="tip-hotspot" data-tip="按分组隐藏标注">HideByGroupId</a>&emsp;
            <a id="test_ellipsoid_marker_deleteByGroupId"  href="javascript:call(test_ellipsoid_marker_deleteByGroupId)" class="tip-hotspot" data-tip="按分组删除标注">DeleteByGroupId</a>&emsp;


            <a id="test_ellipsoid_marker_setViewportVisible"  href="javascript:call(test_ellipsoid_marker_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;


            <a id="test_ellipsoid_marker_get"  href="javascript:call(test_ellipsoid_marker_get)" class="tip-hotspot" data-tip="获取指定标注信息">Get</a><br><br>&emsp;
            <a id="test_ellipsoid_marker_setAttachCustomObject"  href="javascript:call(test_ellipsoid_marker_setAttachCustomObject)"><font color="#555">标注贴合对象：</font>AttachObject</a><br><br>&emsp;
            <a id="test_ellipsoid_marker_showPopupWindow"  href="javascript:call(test_ellipsoid_marker_showPopupWindow)"><font color="#555">显示标注的弹出窗口：</font>ShowPopupWindow</a><br>&emsp;
            <a id="test_ellipsoid_marker_hidePopupWindow"  href="javascript:call(test_ellipsoid_marker_hidePopupWindow)"><font color="#555">隐藏标注的弹出窗口：</font>HidePopupWindow</a><br>&emsp;
            <a id="test_ellipsoid_marker_showAllPopupWindow"  href="javascript:call(test_ellipsoid_marker_showAllPopupWindow)"><font color="#555">显示所有弹出窗口：</font>ShowAllPopupWindow</a><br>&emsp;
            <a id="test_ellipsoid_marker_hideAllPopupWindow"  href="javascript:call(test_ellipsoid_marker_hideAllPopupWindow)"><font color="#555">隐藏所有弹出窗口：</font>HideAllPopupWindow</a><br><br>&emsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            <a id="test_ellipsoid_marker_add_canvas"  href="javascript:call(test_ellipsoid_marker_add_canvas)"><font color="#555">用canvas绘制标签的imagePath属性：</font>Add</a> <br><br>&emsp;
            
            <font color="#555">属性修改测试：</font><br />&emsp;&emsp;
            <a id="test_ellipsoid_marker_setAnchors"  href="javascript:call(test_ellipsoid_marker_setAnchors)" class="tip-hotspot" data-tip="修改标注的属性：锚点">Anchors</a>&emsp;
            <a id="test_ellipsoid_marker_setCoordinate"  href="javascript:call(test_ellipsoid_marker_setCoordinate)" class="tip-hotspot" data-tip="修改标注的属性：坐标值">Coordinate</a>&emsp;
            <a id="test_ellipsoid_marker_setImagePath"  href="javascript:call(test_ellipsoid_marker_setImagePath)" class="tip-hotspot" data-tip="修改标注的属性：图片地址">ImagePath</a>&emsp;
            <a id="test_ellipsoid_marker_setImageSize"  href="javascript:call(test_ellipsoid_marker_setImageSize)" class="tip-hotspot" data-tip="修改标注的属性：图片大小">ImageSize</a>&emsp;
            <a id="test_ellipsoid_marker_setURL"  href="javascript:call(test_ellipsoid_marker_setURL)" class="tip-hotspot" data-tip="修改标注的属性：URL">URL</a>&emsp;
            <a id="test_ellipsoid_marker_setText"  href="javascript:call(test_ellipsoid_marker_setText)" class="tip-hotspot" data-tip="修改标注的属性：显示文本">Text</a>&emsp;
            <a id="test_ellipsoid_marker_setRange"  href="javascript:call(test_ellipsoid_marker_setRange)" class="tip-hotspot" data-tip="修改标注的属性：可见距离">Range</a>&emsp;
            <a id="test_ellipsoid_marker_setFontColor"  href="javascript:call(test_ellipsoid_marker_setFontColor)" class="tip-hotspot" data-tip="修改标注的属性：文本颜色">FontColor</a>&emsp;
            <a id="test_ellipsoid_marker_setTextBackgroundColor"  href="javascript:call(test_ellipsoid_marker_setTextBackgroundColor)" class="tip-hotspot" data-tip="修改标注的属性：文本背景颜色">TextBackgroundColor</a>&emsp;
            <a id="test_ellipsoid_marker_setTextOutlineColor"  href="javascript:call(test_ellipsoid_marker_setTextOutlineColor)" class="tip-hotspot" data-tip="修改标注的属性：文本边框颜色">SetFontOutlineColor</a>&emsp;

            <a id="test_ellipsoid_marker_setFontOutlineSize"  href="javascript:call(test_ellipsoid_marker_setFontOutlineSize)" class="tip-hotspot" data-tip="修改标注的属性：文本边框尺寸">SetFontOutlineSize</a>&emsp;
            <a id="test_ellipsoid_marker_setGroupId"  href="javascript:call(test_ellipsoid_marker_setGroupId)" class="tip-hotspot" data-tip="修改标注的属性：分组GroupId">SetGroupId</a>&emsp;
            <a id="test_ellipsoid_marker_setUserData"  href="javascript:call(test_ellipsoid_marker_setUserData)" class="tip-hotspot" data-tip="修改标注的属性：自定义数据">SetUserData</a>&emsp;
            <a id="test_ellipsoid_marker_setHoverImagePath"  href="javascript:call(test_ellipsoid_marker_setHoverImagePath)" class="tip-hotspot" data-tip="修改标注的属性：hover图片路径">SetHoverImagePath</a>&emsp;
            <a id="test_ellipsoid_marker_setTextOffset"  href="javascript:call(test_ellipsoid_marker_setTextOffset)" class="tip-hotspot" data-tip="修改标注的属性：文本偏移">SetTextOffset</a>&emsp;
            <a id="test_ellipsoid_marker_setFontSize"  href="javascript:call(test_ellipsoid_marker_setFontSize)" class="tip-hotspot" data-tip="修改标注的属性：字体大小">SetFontSize</a>&emsp;
            <a id="test_ellipsoid_marker_setTextRange"  href="javascript:call(test_ellipsoid_marker_setTextRange)" class="tip-hotspot" data-tip="修改标注的属性：文本可见范围">SetTextRange</a>&emsp;
            <a id="test_ellipsoid_marker_setAutoHidePopupWindow"  href="javascript:call(test_ellipsoid_marker_setAutoHidePopupWindow)" class="tip-hotspot" data-tip="修改标注的属性：自动隐藏弹窗">SetAutoHidePopupWindow</a>&emsp;
            <a id="test_ellipsoid_marker_setPopupSize"  href="javascript:call(test_ellipsoid_marker_setPopupSize)" class="tip-hotspot" data-tip="修改标注的属性：弹窗尺寸">SetPopupSize</a>&emsp;
            <a id="test_ellipsoid_marker_setPopupOffset"  href="javascript:call(test_ellipsoid_marker_setPopupOffset)" class="tip-hotspot" data-tip="修改标注的属性：弹窗偏移">SetPopupOffset</a>&emsp;
            <a id="test_ellipsoid_marker_setLineSize"  href="javascript:call(test_ellipsoid_marker_setLineSize)" class="tip-hotspot" data-tip="修改标注的属性：牵引线尺寸">SetLineSize</a>&emsp;
            <a id="test_ellipsoid_marker_setLineColor"  href="javascript:call(test_ellipsoid_marker_setLineColor)" class="tip-hotspot" data-tip="修改标注的属性：牵引线颜色">SetLineColor</a>&emsp;
            <a id="test_ellipsoid_marker_setLineOffset"  href="javascript:call(test_ellipsoid_marker_setLineOffset)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetLineOffset</a>&emsp;
            <a id="test_ellipsoid_marker_setPriority"  href="javascript:call(test_ellipsoid_marker_setPriority)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetPriority</a>&emsp;
            <a id="test_ellipsoid_marker_setOcclusionCull"  href="javascript:call(test_ellipsoid_marker_setOcclusionCull)" class="tip-hotspot" data-tip="修改标注的属性：牵引线偏移">SetOcclusionCull</a>&emsp;
            <a id="test_ellipsoid_marker_setClusterStyle"  href="javascript:call(test_ellipsoid_marker_setClusterStyle)" class="tip-hotspot" data-tip="设置聚合后的样式">SetClusterStyle</a>&emsp;
            
        </div>
        
        <div id="ellipsoid_a_Marker3D" >
            <img width="24" height="24" src="images/tag.png" /><strong>&nbsp;三维点标记：Marker3D</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Marker3D.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_marker3d_add"  href="javascript:call(test_ellipsoid_marker3d_add)" class="tip-hotspot" data-tip="添加3D标注">Add</a>&emsp;
            <a id="test_ellipsoid_marker3d_update"  href="javascript:call(test_ellipsoid_marker3d_update)" class="tip-hotspot" data-tip="修改3D标注">Update</a>&emsp;
            <a id="test_ellipsoid_marker3d_delete"  href="javascript:call(test_ellipsoid_marker3d_delete)" class="tip-hotspot" data-tip="删除3D标注">Delete</a>&emsp;
            <a id="test_ellipsoid_marker3d_clear"  href="javascript:call(test_ellipsoid_marker3d_clear)" class="tip-hotspot" data-tip="清空所有3D标注">Clear</a>&emsp;
            <a id="test_ellipsoid_marker3d_focus"  href="javascript:call(test_ellipsoid_marker3d_focus)" class="tip-hotspot" data-tip="定位3D标注">Focus</a>&emsp;
            <a id="test_ellipsoid_marker3d_show"  href="javascript:call(test_ellipsoid_marker3d_show)" class="tip-hotspot" data-tip="显示指定3D标注">Show</a>&emsp;
            <a id="test_ellipsoid_marker3d_hide"  href="javascript:call(test_ellipsoid_marker3d_hide)" class="tip-hotspot" data-tip="隐藏指定3D标注">Hide</a>&emsp;
            <a id="test_ellipsoid_marker3d_showAll"  href="javascript:call(test_ellipsoid_marker3d_showAll)" class="tip-hotspot" data-tip="显示所有3D标注">ShowAll</a> &emsp;
            <a id="test_ellipsoid_marker3d_hideAll"  href="javascript:call(test_ellipsoid_marker3d_hideAll)" class="tip-hotspot" data-tip="隐藏所有3D标注">HideAll</a>&emsp;
            <a id="test_ellipsoid_marker3d_get"  href="javascript:call(test_ellipsoid_marker3d_get)" class="tip-hotspot" data-tip="获取指定3D标注信息">Get</a><br><br>&emsp;

            <a id="test_ellipsoid_marker3d_setViewHeightRange"  href="javascript:call(test_ellipsoid_marker3d_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            <a id="test_ellipsoid_marker3d_setAttachCustomObject" title="3D标注贴合对象"  href="javascript:call(test_ellipsoid_marker3d_setAttachCustomObject)">AttachObject</a><br><br>&emsp;


            <a id="test_ellipsoid_marker3d_getBPFunction"  href="javascript:call(test_ellipsoid_marker3d_getBPFunction)" class="tip-hotspot" data-tip="获取3D标注包含的蓝图函数信息">GetBPFunction</a> &emsp;
            <a id="test_ellipsoid_marker3d_callBatchFunction"  href="javascript:call(test_ellipsoid_marker3d_callBatchFunction)" class="tip-hotspot" data-tip="调用多个蓝图函数">CallBPFunction</a> &emsp;
            

            <a id="test_ellipsoid_marker3d_showByGroupId"  href="javascript:call(test_ellipsoid_marker3d_showByGroupId)" class="tip-hotspot" data-tip="按分组显示3D标注">ShowByGroupId</a>&emsp;
            <a id="test_ellipsoid_marker3d_hideByGroupId"  href="javascript:call(test_ellipsoid_marker3d_hideByGroupId)" class="tip-hotspot" data-tip="按分组隐藏3D标注">HideByGroupId</a>&emsp;
            <a id="test_ellipsoid_marker3d_deleteByGroupId"  href="javascript:call(test_ellipsoid_marker3d_deleteByGroupId)" class="tip-hotspot" data-tip="按分组删除3D标注">DeleteByGroupId</a>&emsp;
            
        </div>

        <!-- 动画及特效对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">动画及特效对象</p>
        <div id="ellipsoid_a_CameraTour" >
            <img width="24" height="24" src="images/cameraTour.png" /><strong>&nbsp;导览动画：CameraTour</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CameraTour.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_cameraTour_add"  href="javascript:call(test_ellipsoid_cameraTour_add)" class="tip-hotspot" data-tip="添加动画导览">Add</a> &emsp;
            <a id="test_ellipsoid_cameraTour_update"  href="javascript:call(test_ellipsoid_cameraTour_update)" class="tip-hotspot" data-tip="修改动画导览">Update</a> &emsp;
            <a id="test_ellipsoid_cameraTour_play"  href="javascript:call(test_ellipsoid_cameraTour_play)" class="tip-hotspot" data-tip="播放动画导览">Play</a> &emsp;
            
            <a id="test_ellipsoid_cameraTour_setMouseClickToPause"  href="javascript:call(test_ellipsoid_cameraTour_setMouseClickToPause)" class="tip-hotspot" data-tip="设置导览播放时鼠标点击是否暂停">SetMouseClickToPause</a> &emsp;
            <a id="test_ellipsoid_cameraTour_setTime"  href="javascript:call(test_ellipsoid_cameraTour_setTime)" class="tip-hotspot" data-tip="设置导览从某时刻播放">SetTime</a> &emsp;
            
            
            <a id="test_ellipsoid_cameraTour_pause"  href="javascript:call(test_ellipsoid_cameraTour_pause)" class="tip-hotspot" data-tip="暂停">Pause</a> &emsp;
            <a id="test_ellipsoid_cameraTour_resume"  href="javascript:call(test_ellipsoid_cameraTour_resume)" class="tip-hotspot" data-tip="继续">Resume</a> &emsp;
            <a id="test_ellipsoid_cameraTour_stop"  href="javascript:call(test_ellipsoid_cameraTour_stop)" class="tip-hotspot" data-tip="停止动画导览">Stop</a> &emsp;
            <a id="test_ellipsoid_cameraTour_delete"  href="javascript:call(test_ellipsoid_cameraTour_delete)" class="tip-hotspot" data-tip="删除动画导览">Delete</a> &emsp;

        </div>

        <div id="ellipsoid_a_Light">
            <img width="24" height="24" src="images/light.png" /><strong>&nbsp;光源：Light</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/Light.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_light_add"  href="javascript:call(test_ellipsoid_light_add)" class="tip-hotspot" data-tip="添加光源">Add</a>&emsp;
            <a id="test_ellipsoid_light_update"  href="javascript:call(test_ellipsoid_light_update)" class="tip-hotspot" data-tip="修改光源">Update</a>&emsp;
            <a id="test_ellipsoid_light_delete"  href="javascript:call(test_ellipsoid_light_delete)" class="tip-hotspot" data-tip="删除光源">Delete</a>&emsp;
            <a id="test_ellipsoid_light_clear"  href="javascript:call(test_ellipsoid_light_clear)" class="tip-hotspot" data-tip="清空所有光源">Clear</a>&emsp;
            <a id="test_ellipsoid_light_focus"  href="javascript:call(test_ellipsoid_light_focus)" class="tip-hotspot" data-tip="定位光源">Focus</a>&emsp;
            <a id="test_ellipsoid_light_show"  href="javascript:call(test_ellipsoid_light_show)" class="tip-hotspot" data-tip="显示指定光源">Show</a>&emsp;
            <a id="test_ellipsoid_light_hide"  href="javascript:call(test_ellipsoid_light_hide)" class="tip-hotspot" data-tip="隐藏指定光源">Hide</a>&emsp;
            <a id="test_ellipsoid_light_get"  href="javascript:call(test_ellipsoid_light_get)" class="tip-hotspot" data-tip="获取指定光源详细信息">Get</a><br><br>&emsp;
            <a id="test_ellipsoid_light_showAll"  href="javascript:call(test_ellipsoid_light_showAll)" class="tip-hotspot" data-tip="显示所有光源">ShowAll</a> &emsp;
            <a id="test_ellipsoid_light_hideAll"  href="javascript:call(test_ellipsoid_light_hideAll)" class="tip-hotspot" data-tip="隐藏所有光源">HideAll</a><br>&emsp;
        </div>

        <div id="ellipsoid_a_Beam" >
            <img width="24" height="24" src="images/beam.png" /><strong>&nbsp;光流：Beam</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Beam.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_beam_add"  href="javascript:call(test_ellipsoid_beam_add)" class="tip-hotspot" data-tip="添加Beam">Add</a> &emsp;
            <a id="test_ellipsoid_beam_update"  href="javascript:call(test_ellipsoid_beam_update)" class="tip-hotspot" data-tip="修改Beam">Update</a> &emsp;
            <a id="test_ellipsoid_beam_delete"  href="javascript:call(test_ellipsoid_beam_delete)" class="tip-hotspot" data-tip="删除Beam">Delete</a> &emsp;
            <a id="test_ellipsoid_beam_clear"  href="javascript:call(test_ellipsoid_beam_clear)" class="tip-hotspot" data-tip="清空Beam">Clear</a> &emsp;
            <a id="test_ellipsoid_beam_focus"  href="javascript:call(test_ellipsoid_beam_focus)" class="tip-hotspot" data-tip="定位Beam">Focus</a> &emsp;
            <a id="test_ellipsoid_beam_get"  href="javascript:call(test_ellipsoid_beam_get)" class="tip-hotspot" data-tip="获取Beam">Get</a> &emsp;
            <a id="test_ellipsoid_beam_show"  href="javascript:call(test_ellipsoid_beam_show)" class="tip-hotspot" data-tip="显示Beam">Show</a> &emsp;
            <a id="test_ellipsoid_beam_hide"  href="javascript:call(test_ellipsoid_beam_hide)" class="tip-hotspot" data-tip="隐藏Beam">Hide</a> &emsp;
            <a id="test_ellipsoid_beam_showAll"  href="javascript:call(test_ellipsoid_beam_showAll)" class="tip-hotspot" data-tip="显示所有Beam">ShowAll</a> &emsp;
            <a id="test_ellipsoid_beam_hideAll"  href="javascript:call(test_ellipsoid_beam_hideAll)" class="tip-hotspot" data-tip="隐藏所有Beam">HideAll</a> &emsp;

            <a id="test_ellipsoid_beam_setThickness"  href="javascript:call(test_ellipsoid_beam_setThickness)" class="tip-hotspot" data-tip="设置厚度">SetThickness</a> &emsp;
        </div>

        <div id="ellipsoid_a_RadiationPoint" >
            <img width="24" height="24" src="images/radiation.png" /><strong>&nbsp;辐射圈：RadiationPoint</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/RadiationPoint.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_add"  href="javascript:call(test_ellipsoid_radiationPoint_add)" class="tip-hotspot" data-tip="添加辐射圈">Add</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_update"  href="javascript:call(test_ellipsoid_radiationPoint_update)" class="tip-hotspot" data-tip="修改辐射圈">Update</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_delete"  href="javascript:call(test_ellipsoid_radiationPoint_delete)" class="tip-hotspot" data-tip="删除辐射圈">Delete</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_clear"  href="javascript:call(test_ellipsoid_radiationPoint_clear)" class="tip-hotspot" data-tip="清空辐射圈">Clear</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_focus"  href="javascript:call(test_ellipsoid_radiationPoint_focus)" class="tip-hotspot" data-tip="定位辐射圈">Focus</a>  &emsp;
            <a id="test_ellipsoid_radiationPoint_focusAll"  href="javascript:call(test_ellipsoid_radiationPoint_focusAll)" class="tip-hotspot" data-tip="定位所有辐射圈">FocusAll</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_show"  href="javascript:call(test_ellipsoid_radiationPoint_show)" class="tip-hotspot" data-tip="显示辐射圈">Show</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_hide"  href="javascript:call(test_ellipsoid_radiationPoint_hide)" class="tip-hotspot" data-tip="隐藏辐射圈">Hide</a>&emsp;
            <a id="test_ellipsoid_radiationPoint_showAll"  href="javascript:call(test_ellipsoid_radiationPoint_showAll)" class="tip-hotspot" data-tip="显示所有辐射圈">ShowAll</a> &emsp;
            <a id="test_ellipsoid_radiationPoint_hideAll"  href="javascript:call(test_ellipsoid_radiationPoint_hideAll)" class="tip-hotspot" data-tip="隐藏所有辐射圈">HideAll</a>&emsp;
            <a id="test_ellipsoid_radiationPoint_get"  href="javascript:call(test_ellipsoid_radiationPoint_get)" class="tip-hotspot" data-tip="获取辐射圈信息">Get</a> &emsp;
        </div>

        <!-- 矢量图形类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">矢量图形类对象</p>
        <div id="ellipsoid_a_Polyline" >
            <img width="24" height="24" src="images/polyline.png" /><strong>&nbsp;折线：Polyline</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polyline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_polyline_add"  href="javascript:call(test_ellipsoid_polyline_add)" class="tip-hotspot" data-tip="添加Polyline">Add</a> &emsp;
            <a id="test_ellipsoid_polyline_add_arcType"  href="javascript:call(test_ellipsoid_polyline_add_arcType)" class="tip-hotspot" data-tip="添加Polyline">Add(弧线)</a> &emsp;
            
            <a id="test_ellipsoid_polyline_update"  href="javascript:call(test_ellipsoid_polyline_update)" class="tip-hotspot" data-tip="修改Polyline">Update</a> &emsp;
            <a id="test_ellipsoid_polyline_delete"  href="javascript:call(test_ellipsoid_polyline_delete)" class="tip-hotspot" data-tip="删除Polyline">Delete</a> &emsp;
            <a id="test_ellipsoid_polyline_clear"  href="javascript:call(test_ellipsoid_polyline_clear)" class="tip-hotspot" data-tip="清空Polyline">Clear</a> &emsp;
            <a id="test_ellipsoid_polyline_focus"  href="javascript:call(test_ellipsoid_polyline_focus)" class="tip-hotspot" data-tip="定位Polyline">Focus</a>  &emsp;
            <a id="test_ellipsoid_polyline_show"  href="javascript:call(test_ellipsoid_polyline_show)" class="tip-hotspot" data-tip="显示指定的Polyline">Show</a> &emsp;
            <a id="test_ellipsoid_polyline_showAll"  href="javascript:call(test_ellipsoid_polyline_showAll)" class="tip-hotspot" data-tip="显示所有的Polyline">ShowAll</a> &emsp;
            <a id="test_ellipsoid_polyline_hide"  href="javascript:call(test_ellipsoid_polyline_hide)" class="tip-hotspot" data-tip="隐藏指定的Polyline">Hide</a> &emsp;
            <a id="test_ellipsoid_polyline_hideAll"  href="javascript:call(test_ellipsoid_polyline_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Polyline">HideAll</a> &emsp;
            <a id="test_ellipsoid_polyline_get"  href="javascript:call(test_ellipsoid_polyline_get)" class="tip-hotspot" data-tip="获取指定的Polyline信息">Get</a><br><br> &emsp;

            <font color="#555">属性修改测试：</font><br><br>&emsp;
            <a id="test_ellipsoid_polyline_setCoordinates"  href="javascript:call(test_ellipsoid_polyline_setCoordinates)"> <font color="#555">设置坐标值：</font>SetCoordinates</a><br>&emsp;
            <a id="test_ellipsoid_polyline_setStyle"  href="javascript:call(test_ellipsoid_polyline_setStyle)"> <font color="#555">设置新的样式：</font>SetStyle</a><br> &emsp;
            <a id="test_ellipsoid_polyline_setThickness"  href="javascript:call(test_ellipsoid_polyline_setThickness)"> <font color="#555">设置新的厚度：</font>SetThickness</a><br> &emsp;
            <a id="test_ellipsoid_polyline_setColor"  href="javascript:call(test_ellipsoid_polyline_setColor)"> <font color="#555">设置新的颜色值：</font>SetColor</a><br><br> &emsp;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <a id="test_ellipsoid_polyline_setFlowRate"  href="javascript:call(test_ellipsoid_polyline_setFlowRate)"> <font color="#555">设置新的流速：</font>SetFlowRate</a><br> &emsp;
            <a id="test_ellipsoid_polyline_setBrightness"  href="javascript:call(test_ellipsoid_polyline_setBrightness)"> <font color="#555">设置新的亮度：</font>SetBrightness</a> <br>&emsp;
            <a id="test_ellipsoid_polyline_setShape"  href="javascript:call(test_ellipsoid_polyline_setShape)"> <font color="#555">设置新的形状：</font>SetShape</a><br> &emsp;
            <a id="test_ellipsoid_polyline_setDepthTest"  href="javascript:call(test_ellipsoid_polyline_setDepthTest)"> <font color="#555">设置是否做深度检测：</font>SetDepthTest</a><br>&emsp;

            <a id="test_ellipsoid_polyline_setViewHeightRange"  href="javascript:call(test_ellipsoid_polyline_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围"><font color="#555">设置可视高度范围：</font>SetViewHeightRange</a>&emsp;
            
            
        </div>

        
        <div id="ellipsoid_a_ODLine" >
            <img width="24" height="24" src="images/odline.png" /><strong>&nbsp;迁徙线：ODLine</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/odline.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_odline_add"  href="javascript:call(test_ellipsoid_odline_add)" class="tip-hotspot" data-tip="添加ODLine">Add</a> &emsp;
            <a id="test_ellipsoid_odline_update"  href="javascript:call(test_ellipsoid_odline_update)" class="tip-hotspot" data-tip="修改ODLine">Update</a> &emsp;
            <a id="test_ellipsoid_odline_delete"  href="javascript:call(test_ellipsoid_odline_delete)" class="tip-hotspot" data-tip="删除指定的ODLine">Delete</a> &emsp;
            <a id="test_ellipsoid_odline_clear"  href="javascript:call(test_ellipsoid_odline_clear)" class="tip-hotspot" data-tip="清空所有的ODLine">Clear</a> &emsp;
            <a id="test_ellipsoid_odline_focus"  href="javascript:call(test_ellipsoid_odline_focus)" class="tip-hotspot" data-tip="定位ODLine">Focus</a>  &emsp;
            <a id="test_ellipsoid_odline_show"  href="javascript:call(test_ellipsoid_odline_show)" class="tip-hotspot" data-tip="显示指定的ODLine">Show</a> &emsp;
            <a id="test_ellipsoid_odline_showAll"  href="javascript:call(test_ellipsoid_odline_showAll)" class="tip-hotspot" data-tip="显示所有的ODLine">ShowAll</a> &emsp;
            <a id="test_ellipsoid_odline_hide"  href="javascript:call(test_ellipsoid_odline_hide)" class="tip-hotspot" data-tip="隐藏指定的ODLine">Hide</a> &emsp;
            <a id="test_ellipsoid_odline_hideAll"  href="javascript:call(test_ellipsoid_odline_hideAll)" class="tip-hotspot" data-tip="隐藏所有的ODLine">HideAll</a> &emsp;
            <a id="test_ellipsoid_odline_get"  href="javascript:call(test_ellipsoid_odline_get)" class="tip-hotspot" data-tip="获取指定的ODLine信息">Get</a> &emsp;
        </div>

        


        <div id="ellipsoid_a_Polygon" >
            <img width="24" height="24" src="images/polygon.png" /><strong>&nbsp;多边形：Polygon</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polygon.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_polygon_add"  href="javascript:call(test_ellipsoid_polygon_add)" class="tip-hotspot" data-tip="添加Polygon">Add</a> &emsp;
            <a id="test_ellipsoid_polygon_update"  href="javascript:call(test_ellipsoid_polygon_update)" class="tip-hotspot" data-tip="修改Polygon">Update</a> &emsp;
            <a id="test_ellipsoid_polygon_delete"  href="javascript:call(test_ellipsoid_polygon_delete)" class="tip-hotspot" data-tip="删除Polygon">Delete</a> &emsp;
            <a id="test_ellipsoid_polygon_clear"  href="javascript:call(test_ellipsoid_polygon_clear)" class="tip-hotspot" data-tip="清空Polygon">Clear</a> &emsp;
            <a id="test_ellipsoid_polygon_focus"  href="javascript:call(test_ellipsoid_polygon_focus)" class="tip-hotspot" data-tip="定位Polygon">Focus</a>  &emsp;
            <a id="test_ellipsoid_polygon_show"  href="javascript:call(test_ellipsoid_polygon_show)" class="tip-hotspot" data-tip="显示Polygon">Show</a> &emsp;
            <a id="test_ellipsoid_polygon_hide"  href="javascript:call(test_ellipsoid_polygon_hide)" class="tip-hotspot" data-tip="隐藏Polygon">Hide</a> &emsp;
            <a id="test_ellipsoid_polygon_highlight"  href="javascript:call(test_ellipsoid_polygon_highlight)" class="tip-hotspot" data-tip="高亮Polygon">Highlight</a> &emsp;
            <a id="test_ellipsoid_polygon_stophighlight"  href="javascript:call(test_ellipsoid_polygon_stophighlight)" class="tip-hotspot" data-tip="取消高亮Polygon">UnHighlight</a> &emsp;
            <a id="test_ellipsoid_polygon_get"  href="javascript:call(test_ellipsoid_polygon_get)" class="tip-hotspot" data-tip="获取Polygon信息">Get</a> &emsp;

            <a id="test_ellipsoid_polygon_setViewHeightRange"  href="javascript:call(test_ellipsoid_polygon_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            

        </div>

        <div id="ellipsoid_a_Polygon3D" >
            <img width="24" height="24" src="images/polygon3d.png" /><strong>&nbsp;三维多边形：Polygon3D</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Polygon3D.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_polygon3d_add"  href="javascript:call(test_ellipsoid_polygon3d_add)" class="tip-hotspot" data-tip="添加Polygon3D">Add</a> &emsp;
            <a id="test_ellipsoid_polygon3d_update"  href="javascript:call(test_ellipsoid_polygon3d_update)" class="tip-hotspot" data-tip="修改Polygon3D">Update</a>  &emsp;
            <a id="test_ellipsoid_polygon3d_delete"  href="javascript:call(test_ellipsoid_polygon3d_delete)" class="tip-hotspot" data-tip="删除Polygon3D">Delete</a> &emsp;
            <a id="test_ellipsoid_polygon3d_clear"  href="javascript:call(test_ellipsoid_polygon3d_clear)" class="tip-hotspot" data-tip="清空Polygon3D">Clear</a> &emsp;
            <a id="test_ellipsoid_polygon3d_focus"  href="javascript:call(test_ellipsoid_polygon3d_focus)" class="tip-hotspot" data-tip="定位Polygon3D">Focus</a> &emsp;
            <a id="test_ellipsoid_polygon3d_show"  href="javascript:call(test_ellipsoid_polygon3d_show)" class="tip-hotspot" data-tip="显示Polygon3D">Show</a>  &emsp;
            <a id="test_ellipsoid_polygon3d_hide"  href="javascript:call(test_ellipsoid_polygon3d_hide)" class="tip-hotspot" data-tip="隐藏Polygon3D">Hide</a> &emsp;

            <a id="test_ellipsoid_polygon3d_showAll"  href="javascript:call(test_ellipsoid_polygon3d_showAll)" class="tip-hotspot" data-tip="显示所有Polygon3D">ShowAll</a>  &emsp;
            <a id="test_ellipsoid_polygon3d_hideAll"  href="javascript:call(test_ellipsoid_polygon3d_hideAll)" class="tip-hotspot" data-tip="隐藏所有Polygon3D">HideAll</a> &emsp;

            <a id="test_ellipsoid_polygon3d_highlight"  href="javascript:call(test_ellipsoid_polygon3d_highlight)" class="tip-hotspot" data-tip="高亮Polygon3D">Highlight</a> &emsp;
            <a id="test_ellipsoid_polygon3d_stopHighlight"  href="javascript:call(test_ellipsoid_polygon3d_stopHighlight)" class="tip-hotspot" data-tip="停止高亮Polygon3D">UnHighlight</a> &emsp;

            <a id="test_ellipsoid_polygon3d_glow"  href="javascript:call(test_ellipsoid_polygon3d_glow)" class="tip-hotspot" data-tip="闪烁Polygon3D">Glow</a> &emsp;
            <a id="test_ellipsoid_polygon3d_stopGlow"  href="javascript:call(test_ellipsoid_polygon3d_stopGlow)" class="tip-hotspot" data-tip="停止闪烁Polygon3D">StopGlow</a> &emsp;

            <a id="test_ellipsoid_polygon3d_get"  href="javascript:call(test_ellipsoid_polygon3d_get)" class="tip-hotspot" data-tip="获取Polygon3D信息">Get</a> &emsp;

            <a id="test_ellipsoid_polygon3d_enableClip"  href="javascript:call(test_ellipsoid_polygon3d_enableClip)" title="设置Polygon3D的剖切支持">EnableClip</a> &emsp;
            <a id="test_ellipsoid_polygon3d_disableClip"  href="javascript:call(test_ellipsoid_polygon3d_disableClip)" title="禁止Polygon3D的剖切支持：">DisableClip</a> &emsp;
            <a id="test_ellipsoid_polygon3d_setViewHeightRange"  href="javascript:call(test_ellipsoid_polygon3d_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
          
        </div>


        <div id="ellipsoid_a_BoxTrigger">
            <img width="24" height="24" src="images/boxTrigger.png" /><strong>&nbsp;包围盒热区：BoxTrigger</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/boxTrigger.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_boxTrigger_add"  href="javascript:call(test_ellipsoid_boxTrigger_add)" class="tip-hotspot" data-tip="添加盒子热区范围对象">Add</a>&emsp;
            <a id="test_ellipsoid_boxTrigger_delete"  href="javascript:call(test_ellipsoid_boxTrigger_delete)" class="tip-hotspot" data-tip="删除盒子热区范围对象">Delete</a>&emsp;
            <a id="test_ellipsoid_boxTrigger_clear"  href="javascript:call(test_ellipsoid_boxTrigger_clear)" class="tip-hotspot" data-tip="清空盒子热区范围对象">Clear</a>&emsp;

        </div>


        <!-- 覆盖物类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">覆盖物类对象</p>

        <div id="ellipsoid_a_Decal">
            <img width="24" height="24" src="images/decal.png" /><strong>&nbsp;贴花：Decal</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Decal.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_decal_add"  href="javascript:call(test_ellipsoid_decal_add)" class="tip-hotspot" data-tip="添加贴花">Add</a> &emsp;
            <a id="test_ellipsoid_decal_update"  href="javascript:call(test_ellipsoid_decal_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_ellipsoid_decal_delete"  href="javascript:call(test_ellipsoid_decal_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_ellipsoid_decal_clear"  href="javascript:call(test_ellipsoid_decal_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_ellipsoid_decal_focus"  href="javascript:call(test_ellipsoid_decal_focus)" class="tip-hotspot" data-tip="定位">Focus</a> &emsp;
            <a id="test_ellipsoid_decal_focusAll"  href="javascript:call(test_ellipsoid_decal_focusAll)" class="tip-hotspot" data-tip="定位显示所有">FocusAll</a> &emsp;
            <a id="test_ellipsoid_decal_get"  href="javascript:call(test_ellipsoid_decal_get)" class="tip-hotspot" data-tip="获取信息">Get</a> &emsp;
        </div>

        <div id="ellipsoid_a_HeatMap">
            <img width="24" height="24" src="images/heatmap.png" /><strong>&nbsp;热力图：HeatMap</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HeatMap.html" target="_blank">API帮助</a> &emsp;
            
            <a id="test_ellipsoid_heatmap_add1"  href="javascript:call(test_ellipsoid_heatmap_add1)" class="tip-hotspot" data-tip="根据热力点构建HeatMap">AddByPoints</a> &emsp;
            <a id="test_ellipsoid_heatmap_update"  href="javascript:call(test_ellipsoid_heatmap_update)" class="tip-hotspot" data-tip="修改HeatMap">UpdateByPoints</a> &emsp;

            <a id="test_ellipsoid_heatmap_add2"  href="javascript:call(test_ellipsoid_heatmap_add2)" class="tip-hotspot" data-tip="添加自定义颜色HeatMap">AddByPoints(CustomColor)</a> &emsp;
            <a id="test_ellipsoid_heatmap_add3"  href="javascript:call(test_ellipsoid_heatmap_add3)" class="tip-hotspot" data-tip="添加自定义样式HeatMap">AddByPoints(CustomStyle)</a> &emsp;
           

            <a id="test_ellipsoid_heatmap_add5"  href="javascript:call(test_ellipsoid_heatmap_add5)" class="tip-hotspot" data-tip="添加HeatMap(从tif文件构建)">Add(tifFile)</a> &emsp;
            <a id="test_ellipsoid_heatmap_add6"  href="javascript:call(test_ellipsoid_heatmap_add6)" class="tip-hotspot" data-tip="添加HeatMap贴地(从tif文件构建)">Add(tifFile-onTerrain)</a> &emsp;

            <a id="test_ellipsoid_heatmap_highlightPixels"  href="javascript:call(test_ellipsoid_heatmap_highlightPixels)" class="tip-hotspot" data-tip="高亮Tif内像素块">HighlightPixels</a> &emsp;
            <a id="test_ellipsoid_heatmap_unHighlightAllPixels"  href="javascript:call(test_ellipsoid_heatmap_unHighlightAllPixels)" class="tip-hotspot" data-tip="取消所有像素块高亮">UnHighlightAllPixels</a> &emsp;

            <a id="test_ellipsoid_heatmap_update"  href="javascript:call(test_ellipsoid_heatmap_update)" class="tip-hotspot" data-tip="修改HeatMap">Update</a> &emsp;
            <a id="test_ellipsoid_heatmap_delete"  href="javascript:call(test_ellipsoid_heatmap_delete)" class="tip-hotspot" data-tip="删除HeatMap">Delete</a> &emsp;
            <a id="test_ellipsoid_heatmap_clear"  href="javascript:call(test_ellipsoid_heatmap_clear)" class="tip-hotspot" data-tip="清空HeatMap">Clear</a> &emsp;
            <a id="test_ellipsoid_heatmap_focus"  href="javascript:call(test_ellipsoid_heatmap_focus)" class="tip-hotspot" data-tip="定位HeatMap">Focus</a> &emsp;
            <a id="test_ellipsoid_heatmap_show"  href="javascript:call(test_ellipsoid_heatmap_show)" class="tip-hotspot" data-tip="显示HeatMap">Show</a> &emsp;
            <a id="test_ellipsoid_heatmap_hide"  href="javascript:call(test_ellipsoid_heatmap_hide)" class="tip-hotspot" data-tip="隐藏HeatMap">Hide</a> &emsp;
            <a id="test_ellipsoid_heatmap_get"  href="javascript:call(test_ellipsoid_heatmap_get)" class="tip-hotspot" data-tip="获取HeatMap">Get</a> &emsp;
        </div>

        <div id="ellipsoid_a_HeatMap3D" >
            <img width="24" height="24" src="images/heatmap3d.png" /><strong>&nbsp;三维热力图：HeatMap3D</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HeatMap3D.html" target="_blank">API帮助</a> &emsp;
            
            
            <a id="test_ellipsoid_heatmap3d_addByImages"  href="javascript:call(test_ellipsoid_heatmap3d_addByImages)" class="tip-hotspot" data-tip="根据16张空间图片构建HeatMap3D">AddByImages</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_addByHeatPoints"  href="javascript:call(test_ellipsoid_heatmap3d_addByHeatPoints)" class="tip-hotspot" data-tip="根据离散点对应的热力值构建HeatMap3D">AddByHeatPoints</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_addHeatPointsToBox"  href="javascript:call(test_ellipsoid_heatmap3d_addHeatPointsToBox)" class="tip-hotspot" data-tip="往HeatMap3D对象内添加离散热力点">AddHeatPointsToBox</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_addByVoxels"  href="javascript:call(test_ellipsoid_heatmap3d_addByVoxels)" class="tip-hotspot" data-tip="根据空间体素的热力值构建HeatMap3D">AddByVoxels</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_addBySparseVoxels"  href="javascript:call(test_ellipsoid_heatmap3d_addBySparseVoxels)" class="tip-hotspot" data-tip="根据稀疏体素构建HeatMap3D">AddBySparseVoxels</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_setViewportVisible"  href="javascript:call(test_ellipsoid_heatmap3d_setViewportVisible)" class="tip-hotspot" data-tip="设置HeatMap3D视口可见性">SetViewportVisible</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_update"  href="javascript:call(test_ellipsoid_heatmap3d_update)" class="tip-hotspot" data-tip="修改HeatMap3D">Update</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_delete"  href="javascript:call(test_ellipsoid_heatmap3d_delete)" class="tip-hotspot" data-tip="删除HeatMap3D">Delete</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_clear"  href="javascript:call(test_ellipsoid_heatmap3d_clear)" class="tip-hotspot" data-tip="清空HeatMap3D">Clear</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_focus"  href="javascript:call(test_ellipsoid_heatmap3d_focus)" class="tip-hotspot" data-tip="定位HeatMap3D">Focus</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_show"  href="javascript:call(test_ellipsoid_heatmap3d_show)" class="tip-hotspot" data-tip="显示HeatMap3D">Show</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_hide"  href="javascript:call(test_ellipsoid_heatmap3d_hide)" class="tip-hotspot" data-tip="隐藏HeatMap3D">Hide</a> &emsp;
            <a id="test_ellipsoid_heatmap3d_get"  href="javascript:call(test_ellipsoid_heatmap3d_get)" class="tip-hotspot" data-tip="获取HeatMap3D">Get</a> &emsp;

            <a id="test_ellipsoid_heatmap3d_queryVoxel"  href="javascript:call(test_ellipsoid_heatmap3d_queryVoxel)" class="tip-hotspot" data-tip="查询HeatMap3D的体素信息">QueryVoxel</a> &emsp;
        </div>

        <div id="ellipsoid_a_OceanHeatMap" >
            <img width="24" height="24" src="images/oceanHeatmap.png" /><strong>&nbsp;海洋热力图：OceanHeatMap</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/oceanHeatMap.html" target="_blank">API帮助</a>&emsp;
       
            <a id="test_ellipsoid_oceanHeatmap_add_flow"  href="javascript:call(test_ellipsoid_oceanHeatmap_add_flow)" class="tip-hotspot" data-tip="流场样式">Add(流场)</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_add_arrow"  href="javascript:call(test_ellipsoid_oceanHeatmap_add_arrow)" class="tip-hotspot" data-tip="箭头样式">Add(箭头)</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_add_wave"  href="javascript:call(test_ellipsoid_oceanHeatmap_add_wave)" class="tip-hotspot" data-tip="波浪样式">Add(波浪)</a>&emsp;
            

            <a id="test_ellipsoid_oceanHeatmap_update_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_update_new)" class="tip-hotspot" data-tip="修改海洋热力图">Update</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_delete_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_delete_new)" class="tip-hotspot" data-tip="删除海洋热力图">Delete</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_clear_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_clear_new)" class="tip-hotspot" data-tip="清空所有海洋热力图">Clear</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_focus_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_focus_new)" class="tip-hotspot" data-tip="定位海洋热力图">Focus</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_show_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_show_new)" class="tip-hotspot" data-tip="显示指定海洋热力图">Show</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_hide_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_hide_new)" class="tip-hotspot" data-tip="隐藏指定海洋热力图">Hide</a>&emsp;
            <a id="test_ellipsoid_oceanHeatmap_get_new"  href="javascript:call(test_ellipsoid_oceanHeatmap_get_new)" class="tip-hotspot" data-tip="获取海洋热力图信息">Get</a><br>&emsp;
        </div>

         <div id="ellipsoid_a_HighlightArea">
            <img width="24" height="24" src="images/hilightarea.png" /><strong>&nbsp;高亮区域：HighlightArea</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/HighlightArea.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_highlightArea_add"  href="javascript:call(test_ellipsoid_highlightArea_add)" class="tip-hotspot" data-tip="添加高亮区">Add</a> &emsp;
            <a id="test_ellipsoid_highlightArea_update"  href="javascript:call(test_ellipsoid_highlightArea_update)" class="tip-hotspot" data-tip="修改高亮区">Update</a> &emsp;
            <a id="test_ellipsoid_highlightArea_delete"  href="javascript:call(test_ellipsoid_highlightArea_delete)" class="tip-hotspot" data-tip="删除高亮区">Delete</a> &emsp;
            <a id="test_ellipsoid_highlightArea_clear"  href="javascript:call(test_ellipsoid_highlightArea_clear)" class="tip-hotspot" data-tip="清空高亮区">Clear</a> &emsp;
            <a id="test_ellipsoid_highlightArea_focus"  href="javascript:call(test_ellipsoid_highlightArea_focus)" class="tip-hotspot" data-tip="定位高亮区">Focus</a> &emsp;
            <a id="test_ellipsoid_highlightArea_show"  href="javascript:call(test_ellipsoid_highlightArea_show)" class="tip-hotspot" data-tip="显示高亮区">Show</a> &emsp;
            <a id="test_ellipsoid_highlightArea_hide"  href="javascript:call(test_ellipsoid_highlightArea_hide)" class="tip-hotspot" data-tip="隐藏高亮区">Hide</a> &emsp;
            <a id="test_ellipsoid_highlightArea_get"  href="javascript:call(test_ellipsoid_highlightArea_get)" class="tip-hotspot" data-tip="获取高亮区">Get</a> &emsp;
        </div>

        <div id="ellipsoid_a_VideoProjection" >
            <img width="24" height="24" src="images/vp.png" /><strong>&nbsp;视频投影：VideoProjection</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/VideoProjection.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_vp_add"  href="javascript:call(test_ellipsoid_vp_add)" class="tip-hotspot" data-tip="添加视频投影">Add</a> &emsp;
            <a id="test_ellipsoid_vp_update"  href="javascript:call(test_ellipsoid_vp_update)" class="tip-hotspot" data-tip="修改视频投影">Update</a> &emsp;
            <a id="test_ellipsoid_vp_delete"  href="javascript:call(test_ellipsoid_vp_delete)" class="tip-hotspot" data-tip="删除视频投影">Delete</a> &emsp;
            <a id="test_ellipsoid_vp_clear"  href="javascript:call(test_ellipsoid_vp_clear)" class="tip-hotspot" data-tip="清空视频投影">Clear</a> &emsp;
            <a id="test_ellipsoid_vp_focus"  href="javascript:call(test_ellipsoid_vp_focus)" class="tip-hotspot" data-tip="定位视频投影">Focus</a> &emsp;
            <a id="test_ellipsoid_vp_show"  href="javascript:call(test_ellipsoid_vp_show)" class="tip-hotspot" data-tip="显示视频投影">Show</a> &emsp;
            <a id="test_ellipsoid_vp_hide"  href="javascript:call(test_ellipsoid_vp_hide)" class="tip-hotspot" data-tip="隐藏视频投影">Hide</a> &emsp;
            <a id="test_ellipsoid_vp_get"  href="javascript:call(test_ellipsoid_vp_get)" class="tip-hotspot" data-tip="获取视频投影">Get</a> <br><br>&emsp;

            <a id="test_ellipsoid_vp_setVideoURL"  href="javascript:call(test_ellipsoid_vp_setVideoURL)"><font color="#555">设置视频地址：</font>SetVideoURL</a><br> &emsp;
            <a id="test_ellipsoid_vp_setLocation"  href="javascript:call(test_ellipsoid_vp_setLocation)"><font color="#555">设置位置：</font>SetLocation</a><br> &emsp;
            <a id="test_ellipsoid_vp_setRotation"  href="javascript:call(test_ellipsoid_vp_setRotation)"><font color="#555">设置旋转值：</font>SetRotation</a><br> &emsp;
            <a id="test_ellipsoid_vp_setFovy"  href="javascript:call(test_ellipsoid_vp_setFovy)"><font color="#555">设置垂直夹角：</font>SetFovy</a><br><br> &emsp;

            <a id="test_ellipsoid_vp_setAspectRatio"  href="javascript:call(test_ellipsoid_vp_setAspectRatio)"><font color="#555">设置纵横比：</font>SetAspectRatio</a><br> &emsp;
            <a id="test_ellipsoid_vp_setDistance"  href="javascript:call(test_ellipsoid_vp_setDistance)"><font color="#555">设置距离：</font>SetDistance</a><br> &emsp;
            <a id="test_ellipsoid_vp_setDepthCulling"  href="javascript:call(test_ellipsoid_vp_setDepthCulling)"><font color="#555">设置是否背面剔除：</font>SetDepthCulling</a><br> &emsp;
            <a id="test_ellipsoid_vp_setFrustumColor"  href="javascript:call(test_ellipsoid_vp_setFrustumColor)"><font color="#555">设置投影线框颜色：</font>SetFrustumColor</a><br><br> &emsp;

        </div>

        <div id="ellipsoid_a_Panorama" >
            <img width="24" height="24" src="images/panorama.png" /><strong>&nbsp;全景图：Panorama</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Panorama.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_panorama_add"  href="javascript:call(test_ellipsoid_panorama_add)" class="tip-hotspot" data-tip="添加全景图">Add</a> &emsp;
            <a id="test_ellipsoid_panorama_update"  href="javascript:call(test_ellipsoid_panorama_update)" class="tip-hotspot" data-tip="修改">Update</a> &emsp;
            <a id="test_ellipsoid_panorama_delete"  href="javascript:call(test_ellipsoid_panorama_delete)" class="tip-hotspot" data-tip="删除">Delete</a> &emsp;
            <a id="test_ellipsoid_panorama_clear"  href="javascript:call(test_ellipsoid_panorama_clear)" class="tip-hotspot" data-tip="清空">Clear</a> &emsp;
            <a id="test_ellipsoid_panorama_focus"  href="javascript:call(test_ellipsoid_panorama_focus)" class="tip-hotspot" data-tip="定位">Focus</a> &emsp;
            <a id="test_ellipsoid_panorama_get"  href="javascript:call(test_ellipsoid_panorama_get)" class="tip-hotspot" data-tip="获取信息">Get</a> &emsp;

            <a id="test_ellipsoid_panorama_enter"  href="javascript:call(test_ellipsoid_panorama_enter)" class="tip-hotspot" data-tip="进入全景图">Enter</a> &emsp;
            <a id="test_ellipsoid_panorama_switchMode"  href="javascript:call(test_ellipsoid_panorama_switchMode)" class="tip-hotspot" data-tip="切换显示模式">SwitchMode</a> &emsp;
            <a id="test_ellipsoid_panorama_exit"  href="javascript:call(test_ellipsoid_panorama_exit)" class="tip-hotspot" data-tip="退出全景图">Exit</a> &emsp;
        </div>


        <!-- 图层类对象 -->

        <p style="text-align:left;font-size:18px;color:#0063e4">图层类对象</p>
        <div id="ellipsoid_a_TileLayer" >
            <img width="24" height="24" src="images/tilelayer.png" /><strong>&nbsp;3DT图层：TileLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/TileLayer.html" target="_blank">API帮助</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_add"  href="javascript:call(test_ellipsoid_tileLayer_add)"><font color="#555">从文件添加TileLayer图层：</font>Add</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_update"  href="javascript:call(test_ellipsoid_tileLayer_update)"><font color="#555">修改TileLayer图层：</font>Update</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_delete"  href="javascript:call(test_ellipsoid_tileLayer_delete)"><font color="#555">删除TileLayer图层：</font>Delete</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_focus"  href="javascript:call(test_ellipsoid_tileLayer_focus)"><font color="#555">定位TileLayer：</font>Focus</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_clear"  href="javascript:call(test_ellipsoid_tileLayer_clear)"><font color="#555">清空TileLayer：</font>Clear</a><br> &emsp;
            
            <a id="test_ellipsoid_tileLayer_get"  href="javascript:call(test_ellipsoid_tileLayer_get)"><font color="#555">获取TileLayer图层信息：</font>Get</a><br> &emsp;                                                                                                                                                                                                                                     
            <a id="test_ellipsoid_tileLayer_get_flattenSupported"  href="javascript:call(test_ellipsoid_tileLayer_get_flattenSupported)"><font color="#555">查询所有图层是否支持压平：</font>GetAllFlattenInfo</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_setViewHeightRange"  href="javascript:call(test_ellipsoid_tileLayer_setViewHeightRange)"><font color="#555">设置TileLayer可视高度范围：</font>SetViewHeightRange</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_setViewportVisible"  href="javascript:call(test_ellipsoid_tileLayer_setViewportVisible)"><font color="#555">设置图层在多视口下可见性：</font>SetViewportVisible</a><br>&emsp;
            <a id="test_ellipsoid_tileLayer_getObjectIDs"  href="javascript:call(test_ellipsoid_tileLayer_getObjectIDs)"><font color="#555">获取指定TileLayer包含的所有Actor对象的ID：</font>GetObjectIDs</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_getActorInfoFromDB"  href="javascript:call(test_ellipsoid_tileLayer_getActorInfoFromDB)"><font color="#555">查询空间库的Actor信息：</font>GetActorInfoFromDB</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_getActorInfo"  href="javascript:call(test_ellipsoid_tileLayer_getActorInfo)"><font color="#555">查询Actor的矩阵和bound信息：</font>GetActorInfo</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_show"  href="javascript:call(test_ellipsoid_tileLayer_show)"><font color="#555">显示当前选中的TileLayer图层：</font>Show</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_hide"  href="javascript:call(test_ellipsoid_tileLayer_hide)"><font color="#555">隐藏当前选中的TileLayer图层：</font>Hide</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_enableXRay"  href="javascript:call(test_ellipsoid_tileLayer_enableXRay)"><font color="#555">启用X光效果：</font>EnableXRay</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_disableXRay"  href="javascript:call(test_ellipsoid_tileLayer_disableXRay)"><font color="#555">停用X光效果：</font>DisableXRay</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_show"  href="javascript:call(test_ellipsoid_tileLayer_actor_show)"><font color="#555">显示当前选中的Actor：</font>ShowActor</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_hide"  href="javascript:call(test_ellipsoid_tileLayer_actor_hide)"><font color="#555">隐藏当前选中的Actor：</font>HideActor</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actors_show"  href="javascript:call(test_ellipsoid_tileLayer_actors_show)"><font color="#555">显示图层中指定的多个Actor：</font>ShowActors</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actors_hide"  href="javascript:call(test_ellipsoid_tileLayer_actors_hide)"><font color="#555">隐藏图层中指定的多个Actor：</font>HideActors</a><br> &emsp;                                                                                                                                                                                                                                                                                   
            <a id="test_ellipsoid_tileLayer_actor_focus"  href="javascript:call(test_ellipsoid_tileLayer_actor_focus)"><font color="#555">定位当前选中的Actor：</font>FocusActor</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actors_focus"  href="javascript:call(test_ellipsoid_tileLayer_actors_focus)"><font color="#555">定位多个Actors：</font>FocusActors</a><br><br> &emsp; 

            <a id="testcase_simulate_building_process"  href="javascript:call(testcase_simulate_building_process)"><font color="#555">模拟建筑建造过程：</font>BuildingDemo</a><br><br> &emsp; 

            <a id="test_ellipsoid_tileLayer_actor_highlight"  href="javascript:call(test_ellipsoid_tileLayer_actor_highlight)"><font color="#555">高亮当前选中的Actor：</font>HighlightActor</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_highlight_by_color"  href="javascript:call(test_ellipsoid_tileLayer_actor_highlight_by_color)"><font color="#555">高亮当前选中的Actor：</font>HighlightActorWithColor</a><br> &emsp;
            
            <a id="test_ellipsoid_tileLayer_actor_stopHighlight"  href="javascript:call(test_ellipsoid_tileLayer_actor_stopHighlight)"><font color="#555">停止高亮当前选中的Actor：</font>UnHighlightActor</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_highlight_actors"  href="javascript:call(test_ellipsoid_tileLayer_actor_highlight_actors)"><font color="#555">高亮多个Actors：</font>HighlightActors</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_highlight_actors_by_color"  href="javascript:call(test_ellipsoid_tileLayer_actor_highlight_actors_by_color)"><font color="#555">高亮多个Actors：</font>HighlightActorsWithColor</a><br> &emsp;

            <a id="test_ellipsoid_tileLayer_actor_stopHighlight_actors"  href="javascript:call(test_ellipsoid_tileLayer_actor_stopHighlight_actors)"><font color="#555">停止高亮多个Actors：</font>UnHighlightActors</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_stopHighlightAllActors"  href="javascript:call(test_ellipsoid_tileLayer_actor_stopHighlightAllActors)"><font color="#555">停止高亮所有Actors：</font>UnHighlightAllActors</a><br><br> &emsp;

            
            

            <a id="test_ellipsoid_tileLayer_actor_showAllActors"  href="javascript:call(test_ellipsoid_tileLayer_actor_showAllActors)"><font color="#555">显示当前TileLayer的所有Actor：</font>ShowAllActors</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_hideAllActors"  href="javascript:call(test_ellipsoid_tileLayer_actor_hideAllActors)"><font color="#555">隐藏当前TileLayer的所有Actor：</font>HideAllActors</a><br><br> &emsp;

            <a id="test_ellipsoid_tileLayer_enableFluid"  href="javascript:call(test_ellipsoid_tileLayer_enableFluid)"><font color="#555">打开支持流体仿真功能：</font>EnableFluid</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_setDecalAttach"  href="javascript:call(test_ellipsoid_tileLayer_setDecalAttach)"><font color="#555">设置图层对贴花类型对象的贴合支持：</font>EnableDecal</a><br&emsp;
            
            <a id="test_ellipsoid_tileLayer_actor_enableClip"  href="javascript:call(test_ellipsoid_tileLayer_actor_enableClip)"><font color="#555">打开TileLayer的裁切功能：</font>EnableClip</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_disableClip"  href="javascript:call(test_ellipsoid_tileLayer_actor_disableClip)"><font color="#555">关闭TileLayer的裁切功能：</font>DisableClip</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_setStyle"  href="javascript:call(test_ellipsoid_tileLayer_actor_setStyle)"><font color="#555">为TileLayer图层设置样式：</font>SetStyle</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_setHeatMapStyle"  href="javascript:call(test_ellipsoid_tileLayer_actor_setHeatMapStyle)"><font color="#555">为TileLayer图层设置海拔热力样式：</font>SetAltitudeHeatMap</a><br> &emsp;
            
            <a id="test_ellipsoid_tileLayer_actor_resetStyle"  href="javascript:call(test_ellipsoid_tileLayer_actor_resetStyle)"><font color="#555">为TileLayer图层恢复样式：</font>ResetStyle</a><br><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_setCollision"  href="javascript:call(test_ellipsoid_tileLayer_actor_setCollision)"><font color="#555">设置TileLayer图层碰撞信息：</font>SetCollision</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_actor_getCollision"  href="javascript:call(test_ellipsoid_tileLayer_actor_getCollision)"><font color="#555">获取TileLayer图层碰撞信息：</font>GetCollision</a><br><br> &emsp;
            

            <a id="test_ellipsoid_tileLayer_setPointCloudSize"  href="javascript:call(test_ellipsoid_tileLayer_setPointCloudSize)"><font color="#555">设置点云尺寸(仅对点云模型生效)：</font>SetPointCloudSize</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_setPointCloudStyle"  href="javascript:call(test_ellipsoid_tileLayer_setPointCloudStyle)"><font color="#555">设置点云样式(仅对点云模型生效)：</font>SetPointCloudStyle</a><br><br> &emsp;
            
            

            
            <a id="test_ellipsoid_tileLayer_setAttachWMTSLayer"  href="javascript:call(test_ellipsoid_tileLayer_setAttachWMTSLayer)"><font color="#555">设置TileLayer是否支持对网络图层服务进行贴合：</font>EnableImageLayerDecal</a><br><br> &emsp;
            

            <a id="test_ellipsoid_tileLayer_modifier_add"  href="javascript:call(test_ellipsoid_tileLayer_modifier_add)"><font color="#555">添加单个压平：</font>AddModifier</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_modifier_update"  href="javascript:call(test_ellipsoid_tileLayer_modifier_update)"><font color="#555">修改压平操作：</font>UpdateModifier</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_modifier_delete"  href="javascript:call(test_ellipsoid_tileLayer_modifier_delete)"><font color="#555">删除压平操作：</font>DeleteModifier</a><br> &emsp;

            <a id="test_ellipsoid_tileLayer_modifier_addModifierByCoordinates"  href="javascript:call(test_ellipsoid_tileLayer_modifier_addModifierByCoordinates)"><font color="#555">添加多个压平：</font>AddModifiers</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_modifier_addModifierByShapeFile"  href="javascript:call(test_ellipsoid_tileLayer_modifier_addModifierByShapeFile)"><font color="#555">添加ShapeFile压平：</font>AddModifierByShapeFile</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_modifier_clear"  href="javascript:call(test_ellipsoid_tileLayer_modifier_clear)"><font color="#555">清空压平操作：</font>ClearModifier</a><br><br> &emsp;

            <a id="test_ellipsoid_tileLayer_hole_addHoleByShapeFile"  href="javascript:call(test_ellipsoid_tileLayer_hole_addHoleByShapeFile)"><font color="#555">添加ShapeFile挖洞：</font>AddHoleByShapeFile</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_hole_addHoleByCoordinates"  href="javascript:call(test_ellipsoid_tileLayer_hole_addHoleByCoordinates)"><font color="#555">添加挖洞：</font>AddHole</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_hole_update"  href="javascript:call(test_ellipsoid_tileLayer_hole_update)"><font color="#555">修改挖洞操作：</font>UpdateHole</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_hole_delete"  href="javascript:call(test_ellipsoid_tileLayer_hole_delete)"><font color="#555">删除挖洞操作：</font>DeleteHole</a><br> &emsp;
            <a id="test_ellipsoid_tileLayer_hole_clear"  href="javascript:call(test_ellipsoid_tileLayer_hole_clear)"><font color="#555">清空挖洞操作：</font>ClearHole</a><br><br> &emsp;
        </div>

        <div id="ellipsoid_a_MarkerLayer">
            <img width="24" height="24" src="images/markerLayer.png" /><strong>&nbsp;标注图层：MarkerLayer</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/MarkerLayer.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_markerLayer_add"  href="javascript:call(test_ellipsoid_markerLayer_add)" class="tip-hotspot" data-tip="添加标注图层对象">Add</a>&emsp;
            <a id="test_ellipsoid_markerLayer_update"  href="javascript:call(test_ellipsoid_markerLayer_update)" class="tip-hotspot" data-tip="修改标注图层对象">Update</a>&emsp;
            <a id="test_ellipsoid_markerLayer_delete"  href="javascript:call(test_ellipsoid_markerLayer_delete)" class="tip-hotspot" data-tip="删除标注图层对象">Delete</a>&emsp;
            <a id="test_ellipsoid_markerLayer_clear"  href="javascript:call(test_ellipsoid_markerLayer_clear)" class="tip-hotspot" data-tip="清空所有标注图层对象">Clear</a>&emsp;
            <a id="test_ellipsoid_markerLayer_focus"  href="javascript:call(test_ellipsoid_markerLayer_focus)" class="tip-hotspot" data-tip="定位标注图层对象">Focus</a>            &emsp;
            <a id="test_ellipsoid_markerLayer_focus_marker"  href="javascript:call(test_ellipsoid_markerLayer_focus_marker)" class="tip-hotspot" data-tip="定位标注图层对象内部的某个标记点">FocusByMarkerId</a>            &emsp;
            
            <a id="test_ellipsoid_markerLayer_show"  href="javascript:call(test_ellipsoid_markerLayer_show)" class="tip-hotspot" data-tip="显示指定标注图层对象">Show</a>&emsp;
            <a id="test_ellipsoid_markerLayer_hide"  href="javascript:call(test_ellipsoid_markerLayer_hide)" class="tip-hotspot" data-tip="隐藏指定标注图层对象">Hide</a>&emsp;
            <a id="test_ellipsoid_markerLayer_showAll"  href="javascript:call(test_ellipsoid_markerLayer_showAll)" class="tip-hotspot" data-tip="显示所有标注图层对象">ShowAll</a> &emsp;
            <a id="test_ellipsoid_markerLayer_hideAll"  href="javascript:call(test_ellipsoid_markerLayer_hideAll)" class="tip-hotspot" data-tip="隐藏所有标注图层对象">HideAll</a>&emsp;
            <a id="test_ellipsoid_markerLayer_setViewHeightRange"  href="javascript:call(test_ellipsoid_markerLayer_setViewHeightRange)" class="tip-hotspot" data-tip="设置标注图层对象的可视高度范围">SetViewHeightRange</a>&emsp;
            
        </div>

        <div id="ellipsoid_a_GeoJSONLayer" >
            <img width="24" height="24" src="images/geojson.png" /><strong>&nbsp;GeoJSON图层：GeoJSONLayer</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/GeoJSONLayer.html" target="_blank">API帮助</a> &emsp;

            
            <a id="test_ellipsoid_geoJSONLayer_load_point_json"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_point_json)" class="tip-hotspot" data-tip="简单渲染器-添加点">AddJson(simple-point)</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_load_point"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_point)" class="tip-hotspot" data-tip="简单渲染器-添加点">AddFile(simple-point)</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_load_polyline"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_polyline)" class="tip-hotspot" data-tip="简单渲染器-添加线">AddFile(simple-polyline)</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_load_polygon"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_polygon)" class="tip-hotspot" data-tip="简单渲染器-添加贴地面带文字标注">AddFile(simple-polygon)</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_load_unique"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_unique)" class="tip-hotspot" data-tip="唯一值渲染器">AddFile(unique)</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_load_class"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_class)" class="tip-hotspot" data-tip="分类渲染器">AddFile(class)</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_load_visible"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_visible)" class="tip-hotspot" data-tip="可见性渲染器">AddFile(visible)</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_load_materials"  href="javascript:call(test_ellipsoid_geoJSONLayer_load_materials)" class="tip-hotspot" data-tip="自定义材质渲染器">AddFile(materials)</a> &emsp;

            
            <a id="test_ellipsoid_geoJSONLayer_update"  href="javascript:call(test_ellipsoid_geoJSONLayer_update)" class="tip-hotspot" data-tip="更新GeoJSONLayer">Update</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_focus"  href="javascript:call(test_ellipsoid_geoJSONLayer_focus)" class="tip-hotspot" data-tip="定位GeoJSONLayer">Focus</a>&emsp;

            <a id="test_ellipsoid_geoJSONLayer_hide"  href="javascript:call(test_ellipsoid_geoJSONLayer_hide)" class="tip-hotspot" data-tip="隐藏GeoJSONLayer">Hide</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_show"  href="javascript:call(test_ellipsoid_geoJSONLayer_show)" class="tip-hotspot" data-tip="显示GeoJSONLayer">Show</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_delete"  href="javascript:call(test_ellipsoid_geoJSONLayer_delete)" class="tip-hotspot" data-tip="删除GeoJSONLayer">Delete</a> &emsp;
            <a id="test_ellipsoid_geoJSONLayer_clear"  href="javascript:call(test_ellipsoid_geoJSONLayer_clear)" class="tip-hotspot" data-tip="清空GeoJSONLayer">Clear</a> &emsp;

            <a id="test_ellipsoid_geoJSONLayer_setViewHeightRange"  href="javascript:call(test_ellipsoid_geoJSONLayer_setViewHeightRange)" class="tip-hotspot" data-tip="设置可视高度范围">SetViewHeightRange</a>&emsp;
            

            <br><br>&emsp;&nbsp;<b>GeoJSONLayer要素区域操作：</b><br><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_highlightFeature"  href="javascript:call(test_ellipsoid_geoJSONLayer_highlightFeature)"> <font color="#555">高亮GeoJSONLayer内部单个要素区域：</font>HighlightFeature</a><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_stopHighlightFeature"  href="javascript:call(test_ellipsoid_geoJSONLayer_stopHighlightFeature)"> <font color="#555">取消高亮GeoJSONLayer内部单个要素区域：</font>UnHighlightFeature</a><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_highlightFeatures"  href="javascript:call(test_ellipsoid_geoJSONLayer_highlightFeatures)"> <font color="#555">高亮GeoJSONLayer内部多个要素区域：</font>HighlightFeatures</a><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_stopHighlightFeatures"  href="javascript:call(test_ellipsoid_geoJSONLayer_stopHighlightFeatures)"> <font color="#555">取消高亮GeoJSONLayer内部多个要素区域：</font>UnHighlightFeatures</a><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_stopAllHighlightFeaturesById"  href="javascript:call(test_ellipsoid_geoJSONLayer_stopAllHighlightFeaturesById)"> <font color="#555">取消高亮GeoJSONLayer内部所有要素区域：</font>UnHighlightAllFeaturesById</a><br>&emsp;
            <a id="test_ellipsoid_geoJSONLayer_focusFeature"  href="javascript:call(test_ellipsoid_geoJSONLayer_focusFeature)"> <font color="#555">定位GeoJSONLayer内部某个要素区域：</font>FocusFeature</a><br>&emsp;
    
        </div>

        <div id="ellipsoid_a_ImageryLayer2">
            <img width="24" height="24" src="images/acp.png" /><strong>&nbsp;栅格图层(球面)：ImageryLayer2</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/imageryLayer2.html" target="_blank">API帮助</a> &emsp;

            <a id="test_ellipsoid_imageryLayer2_addByUrl"  href="javascript:call(test_ellipsoid_imageryLayer2_addByUrl)" class="tip-hotspot" data-tip="添加图层服务">AddByUrl</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_addBySchemaParams"  href="javascript:call(test_ellipsoid_imageryLayer2_addBySchemaParams)" class="tip-hotspot" data-tip="添加图层服务">AddBySchemaParams</a> &emsp;
    
            <a id="test_ellipsoid_imageryLayer2_setDrawOrder"  href="javascript:call(test_ellipsoid_imageryLayer2_setDrawOrder)" class="tip-hotspot" data-tip="设置显示顺序">SetDrawOrder</a> &emsp;
    
            <a id="test_ellipsoid_imageryLayer2_delete"  href="javascript:call(test_ellipsoid_imageryLayer2_delete)" class="tip-hotspot" data-tip="删除图层服务">Delete</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_clear"  href="javascript:call(test_ellipsoid_imageryLayer2_clear)" class="tip-hotspot" data-tip="清空图层服务">Clear</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_show"  href="javascript:call(test_ellipsoid_imageryLayer2_show)" class="tip-hotspot" data-tip="显示图层服务">Show</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_hide"  href="javascript:call(test_ellipsoid_imageryLayer2_hide)" class="tip-hotspot" data-tip="隐藏图层服务">Hide</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_showAll"  href="javascript:call(test_ellipsoid_imageryLayer2_showAll)" class="tip-hotspot" data-tip="显示所有图层服务">ShowAll</a> &emsp;
            <a id="test_ellipsoid_imageryLayer2_hideAll"  href="javascript:call(test_ellipsoid_imageryLayer2_hideAll)" class="tip-hotspot" data-tip="隐藏所有图层服务">HideAll</a> &emsp;

        </div>

        <div id="ellipsoid_a_GlobeTerrain">
            <img width="24" height="24" src="images/acp.png" /><strong>&nbsp;球面地形：GlobeTerrain</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/globeTerrain.html" target="_blank">API帮助</a> &emsp;

            <a id="test_ellipsoid_globeTerrain_init"  href="javascript:call(test_ellipsoid_globeTerrain_init)" class="tip-hotspot" data-tip="初始化Cesium球面地形影像">Init</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_setImageryResourceUrl"  href="javascript:call(test_ellipsoid_globeTerrain_setImageryResourceUrl)" class="tip-hotspot" data-tip="更新初始化的球面影像">SetImagery</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_setImageryBySchemaParams"  href="javascript:call(test_ellipsoid_globeTerrain_setImageryBySchemaParams)" class="tip-hotspot" data-tip="自定义服务更新初始化的球面影像">SetImageryBySchemaParams</a> &emsp;
           

            <a id="test_ellipsoid_globeTerrain_show"  href="javascript:call(test_ellipsoid_globeTerrain_show)" class="tip-hotspot" data-tip="显示Cesium球面地形影像">Show</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_hide"  href="javascript:call(test_ellipsoid_globeTerrain_hide)" class="tip-hotspot" data-tip="隐藏Cesium球面地形影像">Hide</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_destroy"  href="javascript:call(test_ellipsoid_globeTerrain_destroy)" class="tip-hotspot" data-tip="销毁Cesium球面地形影像">Destroy</a> &emsp;

            <a id="test_ellipsoid_globeTerrain_addImageryLayer"  href="javascript:call(test_ellipsoid_globeTerrain_addImageryLayer)" class="tip-hotspot" data-tip="添加球面的图层服务">AddImageryLayer</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_addImageryLayerBySchemaParams"  href="javascript:call(test_ellipsoid_globeTerrain_addImageryLayerBySchemaParams)" class="tip-hotspot" data-tip="添加球面自定义图层服务">AddImageryLayerBySchemaParams</a> &emsp;
            
            <a id="test_ellipsoid_globeTerrain_setImageryLayerDrawOrder"  href="javascript:call(test_ellipsoid_globeTerrain_setImageryLayerDrawOrder)" class="tip-hotspot" data-tip="设置显示顺序">SetImageryLayerDrawOrder</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_deleteImageryLayer"  href="javascript:call(test_ellipsoid_globeTerrain_deleteImageryLayer)" class="tip-hotspot" data-tip="删除球面的图层服务">DeleteImageryLayer</a> &emsp;
            <a id="test_ellipsoid_globeTerrain_clearImageryLayer"  href="javascript:call(test_ellipsoid_globeTerrain_clearImageryLayer)" class="tip-hotspot" data-tip="清空球面的图层服务">ClearImageryLayer</a> &emsp;

        </div>

        
        <div id="ellipsoid_a_Cesium3DTileset">
            <img width="24" height="24" src="images/cesium3DTile.png" /><strong>&nbsp;3DTiles图层：Cesium3DTileset</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/cesium3DTileset.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_add"  href="javascript:call(test_ellipsoid_cesium3DTileset_add)" class="tip-hotspot" data-tip="添加Cesium3DTileset">Add</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_update"  href="javascript:call(test_ellipsoid_cesium3DTileset_update)" class="tip-hotspot" data-tip="修改Cesium3DTileset">Update</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_delete"  href="javascript:call(test_ellipsoid_cesium3DTileset_delete)" class="tip-hotspot" data-tip="删除指定的Cesium3DTileset">Delete</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_clear"  href="javascript:call(test_ellipsoid_cesium3DTileset_clear)" class="tip-hotspot" data-tip="清空所有的Cesium3DTileset">Clear</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_focus"  href="javascript:call(test_ellipsoid_cesium3DTileset_focus)" class="tip-hotspot" data-tip="定位Cesium3DTileset">Focus</a>  &emsp;
            <a id="test_ellipsoid_cesium3DTileset_show"  href="javascript:call(test_ellipsoid_cesium3DTileset_show)" class="tip-hotspot" data-tip="显示指定的Cesium3DTileset">Show</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_showAll"  href="javascript:call(test_ellipsoid_cesium3DTileset_showAll)" class="tip-hotspot" data-tip="显示所有的Cesium3DTileset">ShowAll</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_hide"  href="javascript:call(test_ellipsoid_cesium3DTileset_hide)" class="tip-hotspot" data-tip="隐藏指定的Cesium3DTileset">Hide</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_hideAll"  href="javascript:call(test_ellipsoid_cesium3DTileset_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Cesium3DTileset">HideAll</a> &emsp;
            <a id="test_ellipsoid_cesium3DTileset_get"  href="javascript:call(test_ellipsoid_cesium3DTileset_get)" class="tip-hotspot" data-tip="获取指定的Cesium3DTileset信息">Get</a> &emsp;
        </div>      

        <!-- 模型类对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">模型类对象</p>
        <div id="ellipsoid_a_CustomObject" >
            <img width="24" height="24" src="images/custom.png" /><strong>&nbsp;自定义模型：CustomObject</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/CustomObject.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_customObject_add"  href="javascript:call(test_ellipsoid_customObject_add)" class="tip-hotspot" data-tip="添加CustomObject">Add</a> &emsp;
            <a id="test_ellipsoid_customObject_update"  href="javascript:call(test_ellipsoid_customObject_update)" class="tip-hotspot" data-tip="修改CustomObject">Update</a> &emsp;
            <a id="test_ellipsoid_customObject_delete"  href="javascript:call(test_ellipsoid_customObject_delete)" class="tip-hotspot" data-tip="删除CustomObject">Delete</a> &emsp;
            <a id="test_ellipsoid_customObject_clear"  href="javascript:call(test_ellipsoid_customObject_clear)" class="tip-hotspot" data-tip="清空CustomObject">Clear</a> &emsp;
            <a id="test_ellipsoid_customObject_focus"  href="javascript:call(test_ellipsoid_customObject_focus)" class="tip-hotspot" data-tip="定位CustomObject">Focus</a> &emsp;
            <a id="test_ellipsoid_customObject_show"  href="javascript:call(test_ellipsoid_customObject_show)" class="tip-hotspot" data-tip="显示CustomObject">Show</a> &emsp;
            <a id="test_ellipsoid_customObject_hide"  href="javascript:call(test_ellipsoid_customObject_hide)" class="tip-hotspot" data-tip="隐藏CustomObject">Hide</a> &emsp;
            
            <a id="test_ellipsoid_customObject_showByGroupId"  href="javascript:call(test_ellipsoid_customObject_showByGroupId)" class="tip-hotspot" data-tip="按分组id显示CustomObject">ShowByGroupId</a> &emsp;
            <a id="test_ellipsoid_customObject_hideByGroupId"  href="javascript:call(test_ellipsoid_customObject_hideByGroupId)" class="tip-hotspot" data-tip="按分组id隐藏CustomObject">HideByGroupId</a> &emsp;
            
            <a id="test_ellipsoid_customObject_highlight"  href="javascript:call(test_ellipsoid_customObject_highlight)" class="tip-hotspot" data-tip="高亮CustomObject">Highlight</a> &emsp;
            <a id="test_ellipsoid_customObject_unhighlight"  href="javascript:call(test_ellipsoid_customObject_unhighlight)" class="tip-hotspot" data-tip="取消高亮CustomObject">Unhighlight</a> &emsp;

            <a id="test_ellipsoid_customObject_startGlow"  href="javascript:call(test_ellipsoid_customObject_startGlow)" class="tip-hotspot" data-tip="闪烁CustomObject">Glow</a> &emsp;
            <a id="test_ellipsoid_customObject_stopGlow"  href="javascript:call(test_ellipsoid_customObject_stopGlow)" class="tip-hotspot" data-tip="停止闪烁CustomObject">StopGlow</a> &emsp;

            <a id="test_ellipsoid_customObject_get"  href="javascript:call(test_ellipsoid_customObject_get)" class="tip-hotspot" data-tip="获取CustomObject信息">Get</a> &emsp;
            
            <a id="test_ellipsoid_customObject_addByTileLayer"  href="javascript:call(test_ellipsoid_customObject_addByTileLayer)" class="tip-hotspot" data-tip="从TileLayer图层添加CustomObject对象">AddByTileLayer</a> &emsp;
            <a id="test_ellipsoid_customObject_showGrowth"  href="javascript:call(test_ellipsoid_customObject_showGrowth)" class="tip-hotspot" data-tip="复制后对象的生长动画效果">ShowGrowth</a> &emsp;
            

            <a id="test_ellipsoid_customObject_getBPFunction"  href="javascript:call(test_ellipsoid_customObject_getBPFunction)" class="tip-hotspot" data-tip="获取CustomObject对象包含的蓝图函数信息">GetBPFunction</a> &emsp;
            <a id="test_ellipsoid_customObject_callFunction"  href="javascript:call(test_ellipsoid_customObject_callFunction)" class="tip-hotspot" data-tip="调用蓝图函数">CallBPFunction</a> &emsp;
         
            
            <a id="test_ellipsoid_customObject_setRotation"  href="javascript:call(test_ellipsoid_customObject_setRotation)" class="tip-hotspot" data-tip="设置场景旋转">SetRotation</a> &emsp;
            <a id="test_ellipsoid_customObject_setLocalRotation"  href="javascript:call(test_ellipsoid_customObject_setLocalRotation)" class="tip-hotspot" data-tip="设置CustomObject模型旋转">SetLocalRotation</a> &emsp;
            <a id="test_ellipsoid_customObject_setPos"  href="javascript:call(test_ellipsoid_customObject_setPos)" class="tip-hotspot" data-tip="设置CustomObject位置">SetLocation</a> &emsp;
            <a id="test_ellipsoid_customObject_setSmoothTime"  href="javascript:call(test_ellipsoid_customObject_setSmoothTime)" class="tip-hotspot" data-tip="设置CustomObject平滑运动插值时间">SetSmoothTime</a> &emsp;
            
            <a id="test_ellipsoid_customObject_setScale"  href="javascript:call(test_ellipsoid_customObject_setScale)" class="tip-hotspot" data-tip="设置CustomObject缩放">SetScale</a> &emsp;
            <a id="test_ellipsoid_customObject_setSmoothMotion"  href="javascript:call(test_ellipsoid_customObject_setSmoothMotion)" class="tip-hotspot" data-tip="设置平滑插值|跳跃">SetSmoothMotion</a> &emsp;
            <a id="test_ellipsoid_customObject_setTintColor"  href="javascript:call(test_ellipsoid_customObject_setTintColor)" class="tip-hotspot" data-tip="设置模型叠加颜色">SetTintColor</a> &emsp;

            <a id="test_ellipsoid_customObject_overrideMaterial"  href="javascript:call(test_ellipsoid_customObject_overrideMaterial)" class="tip-hotspot" data-tip="替换模型材质">OverrideMaterial</a> &emsp;
            <a id="test_ellipsoid_customObject_restoreMaterial"  href="javascript:call(test_ellipsoid_customObject_restoreMaterial)" class="tip-hotspot" data-tip="恢复模型材质">RestoreMaterial</a> &emsp;

            <a id="test_ellipsoid_customObject_setViewportVisible"  href="javascript:call(test_ellipsoid_customObject_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;

            <a id="test_ellipsoid_customObject_startMove"  href="javascript:call(test_ellipsoid_customObject_startMove)" class="tip-hotspot" data-tip="按轨迹路线移动">StartMove</a> &emsp;

            <a id="test_ellipsoid_customObject_pause"  href="javascript:call(test_ellipsoid_customObject_pause)" class="tip-hotspot" data-tip="暂停移动">Pause</a> &emsp;
            <a id="test_ellipsoid_customObject_resume"  href="javascript:call(test_ellipsoid_customObject_resume)" class="tip-hotspot" data-tip="恢复移动">Resume</a> &emsp;
            <a id="test_ellipsoid_customObject_setMoveRate"  href="javascript:call(test_ellipsoid_customObject_setMoveRate)" class="tip-hotspot" data-tip="设置移动倍速">SetMoveRate</a> &emsp;
            <a id="test_ellipsoid_customObject_stop"  href="javascript:call(test_ellipsoid_customObject_stop)" class="tip-hotspot" data-tip="停止移动">Stop</a> &emsp;

            <a id="test_ellipsoid_customObject_MoveTo"  href="javascript:call(test_ellipsoid_customObject_MoveTo)" class="tip-hotspot" data-tip="实时GPS移动">MoveTo</a> &emsp;
            
        </div>


        <div id="ellipsoid_a_Satellite" >
            <img width="24" height="24" src="images/satellite.png" /><strong>&nbsp;卫星仿真：Satellite</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Satellite.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_satellite_add1"  href="javascript:call(test_ellipsoid_satellite_add1)" class="tip-hotspot" data-tip="添加Satellite">Add(像素点)</a> &emsp;
            <a id="test_ellipsoid_satellite_add"  href="javascript:call(test_ellipsoid_satellite_add)" class="tip-hotspot" data-tip="添加Satellite">Add(缩略图)</a> &emsp;

            <a id="test_ellipsoid_satellite_highlight"  href="javascript:call(test_ellipsoid_satellite_highlight)" class="tip-hotspot" data-tip="高亮">Highlight(缩略图)</a> &emsp;
            <a id="test_ellipsoid_satellite_unHighlight"  href="javascript:call(test_ellipsoid_satellite_unHighlight)" class="tip-hotspot" data-tip="取消高亮">UnHighlight(缩略图)</a> &emsp;
            <a id="test_ellipsoid_satellite_unHighlightAll"  href="javascript:call(test_ellipsoid_satellite_unHighlightAll)" class="tip-hotspot" data-tip="取消所有高亮">UnHighlightAll(缩略图)</a> &emsp;

            
            


            <a id="test_ellipsoid_satellite_addLinkage"  href="javascript:call(test_ellipsoid_satellite_addLinkage)" class="tip-hotspot" data-tip="添加Satellite连接线">AddLinkage(连接线)</a> &emsp;
            <a id="test_ellipsoid_satellite_updateLinkage"  href="javascript:call(test_ellipsoid_satellite_updateLinkage)" class="tip-hotspot" data-tip="更新Satellite连接线">UpdateLinkage(连接线)</a> &emsp;
            <a id="test_ellipsoid_satellite_deleteLinkage"  href="javascript:call(test_ellipsoid_satellite_deleteLinkage)" class="tip-hotspot" data-tip="删除Satellite连接线">DeleteLinkage(连接线)</a> &emsp;
            <a id="test_ellipsoid_satellite_clearLinkage"  href="javascript:call(test_ellipsoid_satellite_clearLinkage)" class="tip-hotspot" data-tip="清空Satellite连接线">ClearLinkage(连接线)</a> &emsp;

            

            <a id="test_ellipsoid_satellite_focus"  href="javascript:call(test_ellipsoid_satellite_focus)" class="tip-hotspot" data-tip="定位卫星模型">Focus</a> &emsp;
            <a id="test_ellipsoid_satellite_setFollow"  href="javascript:call(test_ellipsoid_satellite_setFollow)" class="tip-hotspot" data-tip="跟随卫星模型">SetFollow</a> &emsp;

            <a id="test_ellipsoid_satellite_cancelFollow"  href="javascript:call(test_ellipsoid_satellite_cancelFollow)" class="tip-hotspot" data-tip="取消跟随卫星模型">CancelFollow</a> &emsp;

            <a id="test_ellipsoid_satellite_getBPFunction"  href="javascript:call(test_ellipsoid_satellite_getBPFunction)" data-tips="查询卫星模型的蓝图函数">GetBPFunction</a>&emsp;   
            <a id="test_ellipsoid_satellite_callBPFunction"  href="javascript:call(test_ellipsoid_satellite_callBPFunction)" data-tips="调用卫星模型的蓝图函数">CallBPFunction</a> &emsp;   


            <a id="test_ellipsoid_satellite_get"  href="javascript:call(test_ellipsoid_satellite_get)" class="tip-hotspot" data-tip="查询卫星实时位置">Get</a> &emsp;

            <a id="test_ellipsoid_satellite_showSatellite"  href="javascript:call(test_ellipsoid_satellite_showSatellite)" class="tip-hotspot" data-tip="显示Satellite">ShowSatellite</a> &emsp;
            <a id="test_ellipsoid_satellite_hideSatellite"  href="javascript:call(test_ellipsoid_satellite_hideSatellite)" class="tip-hotspot" data-tip="隐藏Satellite">HideSatellite</a> &emsp;
            <a id="test_ellipsoid_satellite_deleteSatellite"  href="javascript:call(test_ellipsoid_satellite_deleteSatellite)" class="tip-hotspot" data-tip="删除Satellite">DeleteSatellite</a> &emsp;


            <a id="test_ellipsoid_satellite_showModel"  href="javascript:call(test_ellipsoid_satellite_showModel)" class="tip-hotspot" data-tip="显示卫星模型">ShowModel</a> &emsp;
            <a id="test_ellipsoid_satellite_hideModel"  href="javascript:call(test_ellipsoid_satellite_hideModel)" class="tip-hotspot" data-tip="隐藏卫星模型">HideModel</a> &emsp;

            <a id="test_ellipsoid_satellite_showText"  href="javascript:call(test_ellipsoid_satellite_showText)" class="tip-hotspot" data-tip="显示卫星文字标签">ShowText</a> &emsp;
            <a id="test_ellipsoid_satellite_hideText"  href="javascript:call(test_ellipsoid_satellite_hideText)" class="tip-hotspot" data-tip="隐藏卫星文字标签">HideText</a> &emsp;

            <a id="test_ellipsoid_satellite_clear"  href="javascript:call(test_ellipsoid_satellite_clear)" class="tip-hotspot" data-tip="清空Satellite">Clear</a> &emsp;

            <!--
            <a id="test_ellipsoid_satellite_delete"  href="javascript:call(test_ellipsoid_satellite_delete)" class="tip-hotspot" data-tip="删除Satellite">Delete</a> &emsp;
            
            
            -->

        </div>


        <!-- 交通仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">交通仿真对象</p>
        <div id="ellipsoid_a_Vehicle2" >
            <img width="24" height="24" src="images/Vehicle2.png" /><strong>&nbsp;高级载具（微观）：Vehicle2</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Vehicle2.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_vehicle2_add"  href="javascript:call(test_ellipsoid_vehicle2_add)" class="tip-hotspot" data-tip="添加Vehicle">Add</a> &emsp;
            <a id="test_ellipsoid_vehicle2_update"  href="javascript:call(test_ellipsoid_vehicle2_update)" class="tip-hotspot" data-tip="修改Vehicle">Update</a> &emsp;
         
            <a id="test_ellipsoid_vehicle2_moveTo"  href="javascript:call(test_ellipsoid_vehicle2_moveTo)" class="tip-hotspot" data-tip="设置Vehicle实时移动路径点">MoveTo</a> &emsp;

            <a id="test_ellipsoid_vehicle2_get"  href="javascript:call(test_ellipsoid_vehicle2_get)" class="tip-hotspot" data-tip="查询Vehicle">Get</a> &emsp;
           
            <a id="test_ellipsoid_vehicle2_delete"  href="javascript:call(test_ellipsoid_vehicle2_delete)" class="tip-hotspot" data-tip="删除Vehicle">Delete</a> &emsp;
            <a id="test_ellipsoid_vehicle2_clear"  href="javascript:call(test_ellipsoid_vehicle2_clear)" class="tip-hotspot" data-tip="清空Vehicle">Clear</a> &emsp;
            <a id="test_ellipsoid_vehicle2_focus"  href="javascript:call(test_ellipsoid_vehicle2_focus)" class="tip-hotspot" data-tip="定位Vehicle">Focus</a> &emsp;
            
            <a id="test_ellipsoid_vehicle2_setFollow"  href="javascript:call(test_ellipsoid_vehicle2_setFollow)" class="tip-hotspot" data-tip="设置自动跟随">SetFollow</a> &emsp;
            <a id="test_ellipsoid_vehicle2_cancelFollow"  href="javascript:call(test_ellipsoid_vehicle2_cancelFollow)" class="tip-hotspot" data-tip="取消自动跟随">CancelFollow</a> &emsp;

            <a id="test_ellipsoid_vehicle2_setViewportVisible"  href="javascript:call(test_ellipsoid_vehicle2_setViewportVisible)" class="tip-hotspot" data-tip="设置多视口可见">SetViewportVisible</a> &emsp;

            
            <a id="test_ellipsoid_vehicle2_show"  href="javascript:call(test_ellipsoid_vehicle2_show)" class="tip-hotspot" data-tip="显示Vehicle">Show</a> &emsp;
            <a id="test_ellipsoid_vehicle2_hide"  href="javascript:call(test_ellipsoid_vehicle2_hide)" class="tip-hotspot" data-tip="隐藏Vehicle">Hide</a> &emsp;

        </div>

        
        <div id="ellipsoid_a_Drone" >
                    <img width="24" height="24" src="images/Drone.png" /><strong>&nbsp;无人机：Drone</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
                    <br> &emsp;
                    <a href="doc/Drone.html" target="_blank">API帮助</a> &emsp;
                    <a id="test_ellipsoid_drone_add"  href="javascript:call(test_ellipsoid_drone_add)" class="tip-hotspot" data-tip="添加Drone">Add</a> &emsp;
                    
                    
                    <a id="test_ellipsoid_drone_moveTo"  href="javascript:call(test_ellipsoid_drone_moveTo)" class="tip-hotspot" data-tip="设置Drone实时移动路径点">MoveTo</a> &emsp;

                    <a id="test_ellipsoid_drone_update"  href="javascript:call(test_ellipsoid_drone_update)" class="tip-hotspot" data-tip="修改Drone">Update</a> &emsp;

                    <a id="test_ellipsoid_drone_get"  href="javascript:call(test_ellipsoid_drone_get)" class="tip-hotspot" data-tip="查询Drone">Get</a> &emsp;
                
                    <a id="test_ellipsoid_drone_delete"  href="javascript:call(test_ellipsoid_drone_delete)" class="tip-hotspot" data-tip="删除Drone">Delete</a> &emsp;
                    <a id="test_ellipsoid_drone_clear"  href="javascript:call(test_ellipsoid_drone_clear)" class="tip-hotspot" data-tip="清空Drone">Clear</a> &emsp;
                    <a id="test_ellipsoid_drone_focus"  href="javascript:call(test_ellipsoid_drone_focus)" class="tip-hotspot" data-tip="定位Drone">Focus</a> &emsp;
                    
                    <a id="test_ellipsoid_drone_show"  href="javascript:call(test_ellipsoid_drone_show)" class="tip-hotspot" data-tip="显示Drone">Show</a> &emsp;
                    <a id="test_ellipsoid_drone_hide"  href="javascript:call(test_ellipsoid_drone_hide)" class="tip-hotspot" data-tip="隐藏Drone">Hide</a> &emsp;
        </div>



        <p style="text-align:left;font-size:18px;color:#0063e4">军事仿真对象</p>
        <!-- 军事仿真对象 -->
       

        <div id="ellipsoid_a_Plot" >
            <img width="24" height="24" src="images/plot.png" /><strong>&nbsp;态势标绘：Plot</strong> &emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br> &emsp;
            <a href="doc/Plot.html" target="_blank">API帮助</a> &emsp;
            <a id="test_ellipsoid_plot_add"  href="javascript:call(test_ellipsoid_plot_add)" class="tip-hotspot" data-tip="添加Plot">Add</a> &emsp;
            <a id="test_ellipsoid_plot_update"  href="javascript:call(test_ellipsoid_plot_update)" class="tip-hotspot" data-tip="修改Plot">Update</a> &emsp;
            <a id="test_ellipsoid_plot_delete"  href="javascript:call(test_ellipsoid_plot_delete)" class="tip-hotspot" data-tip="删除Plot">Delete</a> &emsp;
            <a id="test_ellipsoid_plot_clear"  href="javascript:call(test_ellipsoid_plot_clear)" class="tip-hotspot" data-tip="清空Plot">Clear</a> &emsp;
            <a id="test_ellipsoid_plot_focus"  href="javascript:call(test_ellipsoid_plot_focus)" class="tip-hotspot" data-tip="定位Plot">Focus</a>  &emsp;
            <a id="test_ellipsoid_plot_show"  href="javascript:call(test_ellipsoid_plot_show)" class="tip-hotspot" data-tip="显示指定的Plot">Show</a> &emsp;
            <a id="test_ellipsoid_plot_showAll"  href="javascript:call(test_ellipsoid_plot_showAll)" class="tip-hotspot" data-tip="显示所有的Plot">ShowAll</a> &emsp;
            <a id="test_ellipsoid_plot_hide"  href="javascript:call(test_ellipsoid_plot_hide)" class="tip-hotspot" data-tip="隐藏指定的Plot">Hide</a> &emsp;
            <a id="test_ellipsoid_plot_hideAll"  href="javascript:call(test_ellipsoid_plot_hideAll)" class="tip-hotspot" data-tip="隐藏所有的Plot">HideAll</a> &emsp;
            <a id="test_ellipsoid_plot_get"  href="javascript:call(test_ellipsoid_plot_get)" class="tip-hotspot" data-tip="获取指定的Plot信息">Get</a><br><br> &emsp;

        </div>

        <!-- 向量场仿真对象 -->
        <p style="text-align:left;font-size:18px;color:#0063e4">向量场仿真对象</p>
        <div id="ellipsoid_a_VectorField" >
            <img width="24" height="24" src="images/vectorField.png" /><strong>&nbsp;向量场仿真：VectorField</strong>&emsp;<a class='totop' href="javascript:toTop()">↑Top</a>
            <br>&emsp;
            <a href="doc/VectorField.html" target="_blank">API帮助</a>&emsp;
            <a id="test_ellipsoid_vectorField_add1"  href="javascript:call(test_ellipsoid_vectorField_add1)" class="tip-hotspot" data-tip="添加向量场-洋流">Add(洋流)</a>&emsp;
            <a id="test_ellipsoid_vectorField_add2"  href="javascript:call(test_ellipsoid_vectorField_add2)" class="tip-hotspot" data-tip="添加向量场-台风">Add(台风)</a>&emsp;
            <a id="test_ellipsoid_vectorField_add3"  href="javascript:call(test_ellipsoid_vectorField_add3)" class="tip-hotspot" data-tip="添加向量场-波浪">Add(波浪)</a>&emsp;

            <a id="test_ellipsoid_vectorField_update"  href="javascript:call(test_ellipsoid_vectorField_update)" class="tip-hotspot" data-tip="修改向量场">Update</a>&emsp;
            <a id="test_ellipsoid_vectorField_delete"  href="javascript:call(test_ellipsoid_vectorField_delete)" class="tip-hotspot" data-tip="删除向量场">Delete</a>&emsp;
            <a id="test_ellipsoid_vectorField_clear"  href="javascript:call(test_ellipsoid_vectorField_clear)" class="tip-hotspot" data-tip="清空所有向量场">Clear</a>&emsp;
            <a id="test_ellipsoid_vectorField_focus"  href="javascript:call(test_ellipsoid_vectorField_focus)" class="tip-hotspot" data-tip="定位向量场">Focus</a>&emsp;
            <a id="test_ellipsoid_vectorField_show"  href="javascript:call(test_ellipsoid_vectorField_show)" class="tip-hotspot" data-tip="显示指定向量场">Show</a>&emsp;
            <a id="test_ellipsoid_vectorField_hide"  href="javascript:call(test_ellipsoid_vectorField_hide)" class="tip-hotspot" data-tip="隐藏指定向量场">Hide</a>&emsp;
            <a id="test_ellipsoid_vectorField_get"  href="javascript:call(test_ellipsoid_vectorField_get)" class="tip-hotspot" data-tip="获取向量场详细信息">Get</a><br><br>&emsp;
            <a id="test_ellipsoid_vectorField_setViewportVisible"  href="javascript:call(test_ellipsoid_vectorField_setViewportVisible)" class="tip-hotspot" data-tip="设置向量场视口可见性">SetViewportVisible</a> &emsp;

        </div>

        <p>
        </p>
        </div>
    </div>
`;

    return s;
}
