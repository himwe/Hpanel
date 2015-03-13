angular.module("hpanel.directives",[]).directive("navbar",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope","$rootScope",function(b,a){a.navbar_loaded=true}],template:'<div class="navbar">				<div class="navbar-inner">					<div class="container">						<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">							<span class="icon-bar"></span>							<span class="icon-bar"></span>							<span class="icon-bar"></span>						</button>						<a class="brand" href="#/main">黑沐唯VPS管理面板</a>						<div class="nav-collapse collapse">							<ul class="nav">\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'main\']"><a href="#/main">首页</a></li>\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'service(\..*)?\']"><a href="#/service">服务管理</a></li>\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'file\']"><a href="#/file">文件管理</a></li>\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'site(\..*)?\']"><a href="#/site">网站管理</a></li>\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'database\']"><a href="http://107.182.143.17/shilin/phpsql/" target="_blank">数据库管理</a></li>\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'ftp\']"><a href="http://107.182.143.17/shilin/ftp/"  target="_blank">FTP管理</a></li>\
								<!-- <li ng-class="\'active\' | ifmatch:[currentItem,\'secure\']"><a href="#/secure">安全管理</a></li> -->\
								<!-- <li ng-class="\'active\' | ifmatch:[currentItem,\'backup\']"><a href="#/backup">备份管理</a></li> -->\
								<!-- <li ng-class="\'active\' | ifmatch:[currentItem,\'log\']"><a href="#/log">日志管理</a></li> -->\
								<!-- <li ng-class="\'active\' | ifmatch:[currentItem,\'task\']"><a href="#/task">计划任务</a></li> -->\
								<li ng-class="\'active\' | ifmatch:[currentItem,\'utils(\..*)?\']"><a href="#/utils">系统工具</a></li>\
							</ul>\						<ul class="nav pull-right">								<li ng-class="\'active\' | ifmatch:[currentItem,\'setting(..*)?\']"><a href="#/setting">设置</a></li>								<li class="divider-vertical"></li>								<li ng-class="\'active\' | ifmatch:[currentItem,\'logout\']"><a href="#/logout">退出</a></li>							</ul>						</div>					</div>				</div>			</div>',replace:true}}).directive("loading",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope",function(a){if(!a.loadingText){a.loadingText="模块加载中，请稍候......"}}],template:'<div style="padding:30px 0 10px 30px;">			<h6>{{loadingText}}</h6>			<div class="progress progress-striped active" style="width:230px">			<div class="bar" style="width:100%;"></div>			</div></div>',replace:true}}).directive("message",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope","$rootScope",function(b,a){a.showErrorMsg=false;a.errorMessage="";a.showSuccessMsg=false;a.successMessage="";a.showWarningMsg=false;a.warningMessage="";a.showInfoMsg=false;a.infoMessage="";b.$rootScope=a;if(!b.id){b.id="message"}}],template:'<div id="{{id}}" style="position:fixed;left:0;bottom:0;width:100%;z-index:100">			<div class="container">				<div class="alert alert-error" style="display:none;margin-bottom:3px" ng-show="$rootScope.showErrorMsg">				<button ng-click="$rootScope.showErrorMsg=false" type="button" class="close">&times;</button>				<span ng-bind-html-unsafe="$rootScope.errorMessage"></span></div>				<div class="alert alert-success" style="display:none;margin-bottom:3px" ng-show="$rootScope.showSuccessMsg">				<button ng-click="$rootScope.showSuccessMsg=false" type="button" class="close">&times;</button>				<span ng-bind-html-unsafe="$rootScope.successMessage"></span></div>				<div class="alert alert-warning" style="display:none;margin-bottom:3px" ng-show="$rootScope.showWarningMsg">				<button ng-click="$rootScope.showWarningMsg=false" type="button" class="close">&times;</button>				<span ng-bind-html-unsafe="$rootScope.warningMessage"></span></div>				<div class="alert alert-info" style="display:none;margin-bottom:3px" ng-show="$rootScope.showInfoMsg">				<button ng-click="$rootScope.showInfoMsg=false" type="button" class="close">&times;</button>				<span ng-bind-html-unsafe="$rootScope.infoMessage"></span></div>			</div>			</div>',replace:true}}).directive("srvminiop",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope",function(a){a.$scope=a.$parent}],template:'<div><div class="btn-group" ng-show="$scope.info[\'service.\'+service]">					<button class="btn btn-small" ng-class="\'active\' | iftrue:$scope.info[\'service.\'+service].autostart" data-toggle="button" title="自动启动"						ng-disabled="$scope.waiting" ng-click="$scope.toggleAutostart(name, service)">						<i class="icon-check"></i>					</button>					<button class="btn btn-small" ng-show="$scope.info[\'service.\'+service].status==\'stopped\'" title="启动" ng-disabled="$scope.waiting"						ng-click="$scope.start(name, service)">						<i class="icon-play"></i>					</button>					<button class="btn btn-small" ng-show="$scope.info[\'service.\'+service].status==\'running\'" title="停止" ng-disabled="$scope.waiting"						ng-click="$scope.stop(name, service)">						<i class="icon-stop"></i>					</button>					<button class="btn btn-small" ng-disabled="$scope.info[\'service.\'+service].status==\'stopped\'||$scope.waiting" title="重启"						ng-click="$scope.restart(name, service)">						<i class="icon-refresh"></i>					</button>					<a class="btn btn-small" href="#/service/{{urlname}}" ng-show="$scope.info[\'service.\'+service]!=null" title="设置">						<i class="icon-wrench"></i>					</a>				</div>				<a class="btn btn-small" href="#/service/{{urlname}}" ng-show="!$scope.info[\'service.\'+service]">安装服务</a></div>',replace:true}}).directive("srvbase",function(){return{restrict:"A",transclude:true,scope:{},controller:["$rootScope","$scope","Request","Backend",function(a,c,d,b){c.$scope=c.$parent;c.pkginfo=null;c.$parent.checkVersion=function(){b.call(c.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+c.pkg,{pkg:c.pkg,repo:"installed"},{success:function(f){c.$parent.pkginfo=c.pkginfo=f.data[0]},error:function(f){c.pkginfo={name:"获取失败！"}}},true)};c.toggleAutostart=function(){d.post("/operation/chkconfig",{name:c.name,service:c.service,autostart:!c.$parent.autostart},function(f){c.$parent.checkInstalled()})};var e=function(f){return function(){b.call(c.$parent,a.module,"/backend/service_"+f,"/backend/service_"+f+"_"+c.service,{name:c.name,service:c.service},c.$parent.checkInstalled)}};c.start=e("start");c.stop=e("stop");c.restart=e("restart")}],template:'<table class="table table-button" style="width:600px;">				<thead>					<tr>						<th colspan="2">{{name}} 服务操作</th>					</tr>				</thead>				<tbody>					<tr>						<td style="width:120px;">当前软件版本：</td>						<td>							<span ng-show="!pkginfo">正在获取...</span>							<span style="display:none" ng-show="pkginfo">							{{pkginfo.name}} {{\'v\'+pkginfo.version+\'-\'+pkginfo.release | iftrue:pkginfo.version}} {{"("+pkginfo.from_repo+")" | iftrue:pkginfo.from_repo}}							</span>						</td>					</tr>					<tr>						<td style="width:120px;">当前服务状态：</td>						<td ng-bind-html-unsafe="$scope.status | service.status"></td>					</tr>					<tr>						<td>开机是否启动：</td>						<td>							<button class="btn btn-small" ng-class="\'active\' | iftrue:$scope.autostart" data-toggle="button"								ng-click="toggleAutostart()">								<i class="icon-check"></i> 开机自动启动							</button>						</td>					</tr>					<tr>						<td>启动/停止服务：</td>						<td>							<button class="btn btn-small" ng-show="$scope.status==\'stopped\'" ng-disabled="$scope.waiting"								ng-click="start()">								<i class="icon-play"></i> 启动服务							</button>							<button class="btn btn-small" ng-show="$scope.status==\'running\'" ng-disabled="$scope.waiting"								ng-click="stop()">								<i class="icon-stop"></i> 停止服务							</button>							<button class="btn btn-small" ng-disabled="$scope.status==\'stopped\'||$scope.waiting"								ng-click="restart()">								<i class="icon-refresh"></i> 重启服务							</button>						</td>					</tr>				</tbody>				</table>',replace:true}}).directive("srvinstall",function(){return{restrict:"A",transclude:true,scope:{},controller:["$rootScope","$scope","Request","Timeout","Backend",function(a,d,e,f,c){d.$scope=d.$parent;var b=[];d.installing=false;d.installMsg="";d.startInstall=function(){d.installMsg="正在检测软件源...";d.installing=true;c.call(d.$parent,a.module,"/backend/yum_repolist","/backend/yum_repolist",{},{wait:function(g){d.installMsg=g.msg},success:function(g){d.installMsg=g.msg;b=g.data;d.installRepo()},error:function(g){d.installMsg=g.msg;f(function(){d.installing=false},3000,a.module)}},true)};d.installRepo=function(){var h=false;for(var l=0;l<d.expected_repolist.length;l++){var g=false;for(var k=0;k<b.length;k++){if(b[k]==d.expected_repolist[l]){g=true;break}}if(g){continue}h=true;c.call(d.$parent,a.module,"/backend/yum_installrepo","/backend/yum_installrepo_"+d.expected_repolist[l],{repo:d.expected_repolist[l]},{wait:function(i){d.installMsg=i.msg},success:function(i){d.installMsg=i.msg;b.push(d.expected_repolist[l]);d.installRepo()},error:function(i){d.installMsg=i.msg;f(function(){d.installing=false},3000,a.module)}},true);break}if(!h){d.checkVersion()}};d.showVerList=false;d.checkVersion=function(){c.call(d.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+d.pkg,{pkg:d.pkg},{wait:function(g){d.installMsg=g.msg},success:function(g){d.installMsg=g.msg;d.pkgs=g.data;d.showVerList=true},error:function(g){d.installMsg=g.msg;f(function(){d.installing=false},3000,a.module)}},true)};d.install=function(j,i,h,g){d.installMsg="开始安装...";d.showVerList=false;c.call(d.$parent,a.module,"/backend/yum_install","/backend/yum_install_"+j+"_"+i+"_"+h+"_"+g,{repo:j,pkg:i,version:h,release:g},{wait:function(k){d.installMsg=k.msg},success:function(k){d.installMsg=k.msg;d.$parent.activeTabName="base";f(function(){d.installing=false;d.$parent.checkInstalled()},3000,a.module)},error:function(k){d.installMsg=k.msg;f(function(){d.installing=false},3000,a.module)}},true)};d.uninstall=function(j,i,h,g){d.installMsg="正在清理...";d.showVerList=false;c.call(d.$parent,a.module,"/backend/yum_uninstall","/backend/yum_uninstall_"+i+"_"+h+"_"+g,{repo:j,pkg:i,version:h,release:g},{wait:function(k){d.installMsg=k.msg},success:function(k){d.installMsg=k.msg;f(function(){d.installing=false;d.$parent.checkInstalled()},3000,a.module)},error:function(k){d.installMsg=k.msg;f(function(){d.installing=false},3000,a.module)}},true)}}],template:'<div class="well" style="width:600px;display:none" ng-show="!$scope.installed&&!$scope.checking">				<div ng-show="!installing">					<p>系统检测到 {{name}} 当前尚未安装。</p>					<p>是否要开始安装？</p>				</div>				<div ng-show="installing" ng-bind-html-unsafe="installMsg"></div>				<p ng-show="!installing"><button class="btn btn-small" style="margin-top:10px" ng-click="startInstall()">开始安装</button></p>				<table class="table table-condensed" style="margin-top:20px;display:none" ng-show="showVerList&&pkgs.length>0">					<thead>						<tr>							<th>版本</th>							<th style="width:70px">大小</th>							<th style="width:70px">软件源</th>							<th style="width:80px"></th>						</tr>					</thead>					<tbody>						<tr ng-repeat="pkg in pkgs">							<td>{{pkg.name}} v{{pkg.version}}-{{pkg.release}}</td>							<td>{{pkg.size}}</td>							<td>{{\'已安装\'|iftrue:pkg.repo==\'installed\'}}{{pkg.repo|iftrue:pkg.repo!=\'installed\'}}</td>							<td>								<button class="btn btn-mini" ng-show="pkg.repo==\'installed\'" ng-click="uninstall(pkg.repo, pkg.name, pkg.version, pkg.release)">清除此版本</button>								<button class="btn btn-mini" ng-show="pkg.repo!=\'installed\'" ng-click="install(pkg.repo, pkg.name, pkg.version, pkg.release)">安装此版本</button>							</td>						</tr>					</tbody>				</table>			</div>',replace:true}}).directive("srvupdate",function(){return{restrict:"A",transclude:true,scope:{},controller:["$rootScope","$scope","Request","Timeout","Backend",function(a,c,d,e,b){c.$scope=c.$parent;c.updating=false;c.updateMsg="";c.startUpdate=function(){c.updating=true;c.updateMsg="正在检测当前版本信息...";b.call(c.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+c.pkg,{pkg:c.pkg,repo:"installed"},{wait:function(f){c.updateMsg=f.msg},success:function(f){c.updateMsg=f.msg;c.pkginfo=f.data[0];c.checkVersion(c.pkginfo.name)},error:function(f){c.updateMsg=f.msg;e(function(){c.updating=false},3000,a.module)}},true)};c.showVerList=false;c.checkVersion=function(f){c.updateMsg="正在检测新版本...";b.call(c.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+f,{pkg:f,option:"update"},{wait:function(g){c.updateMsg=g.msg},success:function(g){c.updateMsg=g.msg;c.pkgs=g.data;c.showVerList=true},error:function(g){c.updateMsg=g.msg;e(function(){c.updating=false},3000,a.module)}},true)};c.update=function(i,h,g,f){c.updateMsg="开始升级...";c.showVerList=false;b.call(c.$parent,a.module,"/backend/yum_update","/backend/yum_update_"+i+"_"+h+"_"+g+"_"+f,{repo:i,pkg:h,version:g,release:f},{wait:function(j){c.updateMsg=j.msg},success:function(j){c.updateMsg=j.msg;c.$parent.activeTabName="base";e(function(){c.updating=false;c.$parent.checkInstalled()},3000,a.module)},error:function(j){c.updateMsg=j.msg;e(function(){c.updating=false},3000,a.module)}},true)}}],template:'<div class="well" style="width:600px;display:none" ng-show="$scope.installed&&!$scope.checking">				<div ng-show="!updating">					<p>在此检测并查找可用的新版本并升级。</p>				</div>				<div ng-show="updating" ng-bind-html-unsafe="updateMsg"></div>				<p ng-show="!updating"><button class="btn btn-small" style="margin-top:10px" ng-click="startUpdate()">检测新版本</button></p>				<table class="table table-condensed" style="margin-top:20px;display:none" ng-show="showVerList&&pkgs.length>0">					<thead>						<tr>							<th>版本</th>							<th style="width:70px">大小</th>							<th style="width:70px">软件源</th>							<th style="width:90px"></th>						</tr>					</thead>					<tbody>						<tr ng-repeat="pkg in pkgs">							<td>{{pkg.name}} v{{pkg.version}}-{{pkg.release}}</td>							<td>{{pkg.size}}</td>							<td>{{\'已安装\'|iftrue:pkg.repo==\'installed\'}}{{pkg.repo|iftrue:pkg.repo!=\'installed\'}}</td>							<td>								<button class="btn btn-mini" ng-show="pkg.repo!=\'installed\'" ng-click="update(pkg.repo, pkg.name, pkg.version, pkg.release)">升级到此版本</button>							</td>						</tr>					</tbody>				</table>			</div>',replace:true}}).directive("srvext",function(){return{restrict:"A",transclude:true,scope:{},controller:["$rootScope","$scope","Request","Timeout","Backend",function(a,c,d,e,b){c.$scope=c.$parent;c.operating=false;c.showMsg="";c.start=function(){c.operating=true;c.showMsg="正在检测版本信息...";b.call(c.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+c.pkg,{pkg:c.pkg,repo:"installed"},{wait:function(f){c.showMsg=f.msg},success:function(f){c.showMsg=f.msg;c.pkginfo=f.data[0];c.checkExt()},error:function(f){c.showMsg=f.msg;e(function(){c.operating=false},3000,a.module)}},true)};c.showExtList=false;c.checkExt=function(){c.operating=true;c.showExtList=false;c.showMsg="正在检测扩展...";b.call(c.$parent,a.module,"/backend/yum_ext_info","/backend/yum_ext_info_"+c.pkginfo.name,{pkg:c.pkginfo.name},{wait:function(f){c.showMsg=f.msg},success:function(f){c.showMsg=f.msg;c.exts=f.data;c.showExtList=true},error:function(f){c.showMsg=f.msg;e(function(){c.operating=false},3000,a.module)}},true)};c.install=function(i,h,g,f){c.showMsg="开始安装...";c.showExtList=false;b.call(c.$parent,a.module,"/backend/yum_install","/backend/yum_install_"+i+"_"+c.pkginfo.name+"_"+h+"_"+g+"_"+f,{repo:i,pkg:c.pkginfo.name,ext:h,version:g,release:f},{wait:function(j){c.showMsg=j.msg},success:function(j){c.showMsg=j.msg;e(function(){c.operating=false;c.checkExt()},3000,a.module)},error:function(j){c.showMsg=j.msg;e(function(){c.operating=false},3000,a.module)}},true)};c.uninstall=function(i,h,g,f){c.showMsg="正在删除...";c.showExtList=false;b.call(c.$parent,a.module,"/backend/yum_uninstall","/backend/yum_uninstall_"+c.pkginfo.name+"_"+h+"_"+g+"_"+f,{repo:i,pkg:c.pkginfo.name,ext:h,version:g,release:f},{wait:function(j){c.showMsg=j.msg},success:function(j){c.showMsg=j.msg;e(function(){c.operating=false;c.checkExt()},3000,a.module)},error:function(j){c.showMsg=j.msg;e(function(){c.operating=false},3000,a.module)}},true)}}],template:'<div class="well" style="width:600px;display:none" ng-show="$scope.installed&&!$scope.checking">				<div ng-show="!operating">					<p>点击下面的按钮检测扩展安装情况。</p>				</div>				<div ng-show="operating" ng-bind-html-unsafe="showMsg"></div>				<p ng-show="!operating"><button class="btn btn-small" style="margin-top:10px" ng-click="start()">检测扩展</button></p>				<table class="table table-condensed" style="margin-top:20px;display:none" ng-show="showExtList&&exts.length>0">					<thead>						<tr>							<th>扩展名称</th>							<th>版本</th>							<th style="width:70px">软件源</th>							<th style="width:90px"></th>						</tr>					</thead>					<tbody>						<tr ng-repeat="ext in exts">							<td>{{ext.name}}</td>							<td>{{ext.version}}-{{ext.release}}</td>							<td>{{\'已安装\'|iftrue:ext.repo==\'installed\'}}{{ext.repo|iftrue:ext.repo!=\'installed\'}}</td>							<td>								<button class="btn btn-mini" ng-show="ext.repo==\'installed\'" ng-click="uninstall(ext.repo, ext.name, ext.version, ext.release)">删除扩展</button>								<button class="btn btn-mini" ng-show="ext.repo!=\'installed\'" ng-click="install(ext.repo, ext.name, ext.version, ext.release)">安装该扩展</button>							</td>						</tr>					</tbody>				</table>			</div>',replace:true}}).directive("srvuninstall",function(){return{restrict:"A",transclude:true,scope:{},controller:["$rootScope","$scope","Request","Timeout","Backend",function(a,c,d,e,b){c.$scope=c.$parent;c.uninstalling=false;c.uninstallMsg="";c.startUninstall=function(){c.uninstallMsg="开始卸载...";c.uninstalling=true;b.call(c.$parent,a.module,"/backend/yum_info","/backend/yum_info_"+c.pkg,{pkg:c.pkg,repo:"installed"},{wait:function(f){c.uninstallMsg=f.msg},success:function(f){c.uninstallMsg=f.msg;c.pkginfo=f.data[0];c.showVersion=true},error:function(f){c.uninstallMsg=f.msg;e(function(){c.uninstalling=false},3000,a.module)}},true)};c.uninstall=function(i,h,g,f){c.uninstallMsg="正在卸载...";c.showVersion=false;b.call(c.$parent,a.module,"/backend/yum_uninstall","/backend/yum_uninstall_"+h+"_"+g+"_"+f,{repo:i,pkg:h,version:g,release:f},{wait:function(j){c.uninstallMsg=j.msg},success:function(j){c.uninstallMsg=j.msg;e(function(){c.uninstalling=false;c.$parent.checkInstalled()},3000,a.module)},error:function(j){c.uninstallMsg=j.msg;e(function(){c.uninstalling=false},3000,a.module)}},true)}}],template:'<div class="well" style="width:600px;" ng-show="$scope.installed&&!$scope.checking">				<div ng-show="!uninstalling">					<p>确定要卸载 {{name}} 吗？</p>				</div>				<div ng-show="uninstalling" ng-bind-html-unsafe="uninstallMsg"></div>				<p ng-show="!uninstalling"><button class="btn btn-small" style="margin-top:10px" ng-click="startUninstall()">开始卸载</button></p>				<table class="table table-condensed" style="margin-top:20px;display:none" ng-show="showVersion">					<thead>						<tr><th colspan="2">请确认要卸载的软件信息：</th></tr>					</thead>					<tbody>						<tr><td style="width:80px">名称：</td><td>{{pkginfo.name}}</td></tr>						<tr><td>版本：</td><td>{{pkginfo.version}}-{{pkginfo.release}}</td></tr>						<tr><td>大小：</td><td>{{pkginfo.size}}</td></tr>						<tr ng-show="pkginfo.from_repo"><td>软件源：</td><td>{{pkginfo.from_repo}}</td></tr>					</tbody>				</table>				<p ng-show="showVersion"><button class="btn btn-mini" ng-click="uninstall(pkginfo.repo, pkginfo.name, pkginfo.version, pkginfo.release)">确认并卸载</button>			</div>',replace:true}}).directive("srvfile",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope",function(a){}],template:'			<table class="table table-button" style="width:600px;">				<tbody>					<tr class="warning">						<td colspan="3" class="text-error">注意：如果您没有配置文件修改经验，请勿随意修改，否则可能导致服务无法启动。</td>					</tr>					<tr ng-repeat="item in items">						<td style="width:120px;">{{item.name}}</td>						<td>							<i class="icon-folder-open" ng-show="item.isdir"></i>							<i class="icon-file" ng-show="item.isfile"></i>							{{item.path}}						</td>						<td style="width:100px">							<a class="btn btn-small" href="#/file?path={{item.path}}" ng-show="item.isdir">								打开 <i class="icon-chevron-right"></i>							</a>							<a class="btn btn-small" href="#/file?file={{item.path}}" ng-show="item.isfile">								打开 <i class="icon-chevron-right"></i>							</a>						</td>					</tr>				</tbody>			</table>',replace:true}}).directive("srvlog",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope",function(a){}],template:'			<table class="table table-button" style="width:600px;">				<tbody>					<tr class="warning">						<td colspan="3" class="text-error">注意：尽量不要对日志文件进行修改，否则可能导致新日志无法写入。</td>					</tr>					<tr ng-repeat="item in items">						<td style="width:120px;">{{item.name}}</td>						<td>							<i class="icon-folder-open" ng-show="item.isdir"></i>							<i class="icon-file" ng-show="item.isfile"></i>							{{item.path}}						</td>						<td style="width:100px">							<a class="btn btn-small" href="#/file?path={{item.path}}" ng-show="item.isdir">								打开 <i class="icon-chevron-right"></i>							</a>							<a class="btn btn-small" href="#/file?file={{item.path}}" ng-show="item.isfile">								打开 <i class="icon-chevron-right"></i>							</a>						</td>					</tr>				</tbody>			</table>',replace:true}}).directive("selector",function(){return{restrict:"A",transclude:true,scope:{},controller:["$scope","Request",function(a,b){a.$scope=a.$parent;a.onlydir=true;a.onlyfile=true;a.path="/";var c=function(){if(!a.curpath){return}var g=a.curpath.split("/");var d=[];for(var e=1;e<g.length;e++){if(!g[e]){continue}var f=g[e-1]+"/"+g[e];d.push({name:g[e],path:f});g[e]=f}a.pathinfos=d};a.load=function(d){if(a.onlyfile){a.otherdir=true;a.listdir(d)}else{a.otherdir=false;a.path=d}};a.listdir=function(d){if(d){a.path=d}if(!a.path){a.path="/root"}else{if(a.path!="/"&&a.path.substr(-1)=="/"){a.path=a.path.substr(0,a.path.length-1)}}a.path=a.path.replace("//","/");var e=a.path;b.post("/operation/file",{action:"listdir",path:e,showhidden:false,remember:false,onlydir:a.onlydir},function(f){if(f.code==0){a.items=f.data;a.curpath=e;a.lastpath=e;a.curpath_pre=e=="/"?"":e}else{a.path=a.lastpath}c()},false,true)};a.$parent.selector=a}],template:'<div>			<div ng-show="onlydir&&!onlyfile&&!otherdir">				<p>当前目录为：{{path}}</p>				<p>					<button class="btn" ng-click="selecthandler(path)">选择当前目录</button>					<button class="btn" ng-click="otherdir=true;listdir(path)">选择其它目录</button>				</p>			</div>			<div ng-show="otherdir">			<ul class="breadcrumb" style="margin-bottom:0">				<li><a ng-click="listdir(\'/\')">根目录</a> <span class="divider">/</span></li>				<li ng-repeat="pathinfo in pathinfos" ng-show="pathinfos.length>0"><a ng-click="listdir(pathinfo.path)">{{pathinfo.name}}</a> <span class="divider">/</span></li>				<li><button class="btn btn-mini" ng-show="onlydir" ng-click="selecthandler(curpath)">选取该目录</button></li>			</ul>			<table class="table table-condensed table-hover">				<thead>					<tr>						<th></th>						<th style="width:80px"></th>					</tr>				</thead>				<tbody>					<tr ng-repeat="item in items">						<td>							<i class="icon-folder-open" title="文件夹" ng-show="item.isdir"></i>							<i class="icon-file" title="文件" ng-show="item.isreg"></i>							<i class="icon-asterisk" title="链接" ng-show="item.islnk&&(item.link_isdir||item.link_isreg)"></i>							<i class="icon-ban-circle" title="未知" ng-show="!item.isdir&&!item.isreg&&(!item.islnk||(item.islnk&&!item.link_isdir&&!item.link_isreg))"></i>							<a class="black" ng-click="listdir(curpath_pre+\'/\'+item.name)" ng-show="item.isdir||(item.islnk&&item.link_isdir)">{{item.name}}</a>							<a class="black" ng-show="item.isreg||(item.islnk&&!item.link_isdir)">{{item.name}}</a>							<span class="text-info" ng-show="item.islnk">-> {{item.linkto}}</span>						</td>						<td>							<button class="btn btn-mini" ng-show="onlydir&&(item.isdir||(item.islnk&&item.link_isdir))" ng-click="selecthandler(curpath_pre+\'/\'+item.name)">选取该目录</button>							<button class="btn btn-mini" ng-show="onlyfile&&(item.isreg||(item.islnk&&item.link_isreg))" ng-click="selecthandler(curpath_pre+\'/\'+item.name)">选取该文件</button>						</td>					</tr>				</tbody>			</table>			</div>',replace:true}}).directive("autofocus",function(){return function(a,b){b[0].focus()}});