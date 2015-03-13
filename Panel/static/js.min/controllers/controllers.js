var LoginCtrl=["$scope","$rootScope","$location","Module","Message","Request",function(b,a,h,c,f,e){var d="login";c.init(d,"登录");b.loginText="登录";b.showForgetPwdMsg=false;b.showLoginForm=true;b.username="";b.password="";var g=function(m){var l=new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$","g");var k=new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g");var j=new RegExp("(?=.{6,}).*","g");if(false==j.test(m)){return"无安全性可言"}else{if(l.test(m)){return"高"}else{if(k.test(m)){return"一般"}else{return"低"}}}};b.login=function(j){b.loginText="登录中...";e.post("/login",{username:b.username,password:j?b.password:hex_md5(b.password)},function(k){if(k.code>=0){b.showLoginForm=false;var m=a.loginto?a.loginto:"/main";var l=a.loginto_section;if(k.code==0){h.path(m);if(l){h.search("s",l)}}else{b.pwdStrength=g(b.password);if(b.pwdStrength!="高"){f.setError(false);f.setWarning(false);$("#main").hide();b.loginMessage=k.msg;b.loginWarning=true}else{h.path(m);if(l){h.search("s",l)}}}}else{b.loginText="登录"}})}}];var LogoutCtrl=["$scope","$location","Module","Request","Timeout",function(a,f,b,d,e){var c="logout";b.init(c,"退出登录");a.loaded=false;e(function(){a.loaded=true;d.get("/xsrf",function(){d.post("/logout",{},function(g){e(function(){f.path("/")},3000,c)})})},1000,c)}];var deepUpdate=function(b,a){for(i in a){if(typeof(a[i])=="object"){deepUpdate(b[i],a[i])}else{if(b[i]!=a[i]){b[i]=a[i]}}}};var MainCtrl=["$scope","$routeParams","$location","Module","Timeout","Request","version",function(b,g,h,c,f,e,a){var d="main";c.init(d,"首页");c.initSection("server");b.version=a;b.info=null;b.loaded=false;b.detectVer=true;b.hasNewver=false;e.get("/setting/upver",function(k){if(k.code==-1){b.upverMessage=k.msg}else{if(k.code==0){var j=k.data;if(parseFloat(j.version)>parseFloat(a.version)||(parseFloat(j.version)==parseFloat(a.version)&&parseInt(j.build)>parseInt(a.build))){b.detectVer=false;b.hasNewver=true}}}});b.checkUpdate=function(){h.path("/setting");h.search("s","upversion")};b.loadInfo=function(j){if(!j){j="*"}e.get("/query/"+j,function(n){if(b.info==null){b.info=n;b.info["server.cpustat"]["total"]["used_rate"]="获取中...";for(var p=0;p<n["server.netifaces"].length;p++){b.info["server.netifaces"][p]["rx_speed"]="0";b.info["server.netifaces"][p]["tx_speed"]="0"}if(!b.loaded){b.loaded=true}}else{if(b.info){var o=n["server.cpustat"]["total"];var r=b.info["server.cpustat"]["total"];var s=(o.used-r.used)/(o.all-r.all);s=Math.round(s*10000)*10;var m=100000-s;s=((s+1)/1000).toString();m=((m+1)/1000).toString();o.used_rate=s.substring(0,s.length-1)+"%";o.idle_rate=m.substring(0,m.length-1)+"%";var l=n["server.netifaces"];var q=b.info["server.netifaces"];for(var p=0;p<l.length;p++){var k=l[p]["timestamp"]-q[p]["timestamp"];if(k>0){l[p]["rx_speed"]=Math.round((l[p]["rx_bytes"]-q[p]["rx_bytes"])/k);l[p]["tx_speed"]=Math.round((l[p]["tx_bytes"]-q[p]["tx_bytes"])/k)}}}deepUpdate(b.info,n)}f(b.loadInfo,1000,d)})}}];var FtpCtrl=["$scope","Module",function(a,b){var c="ftp";b.init(c,"FTP管理");a.loaded=true}];var TaskCtrl=["$scope","Module",function(a,b){var c="task";b.init(c,"计划任务");a.loaded=true}];var SettingCtrl=["$scope","$routeParams","Module","Timeout","Message","Request","version",function(b,h,c,g,f,e,a){var d="setting";c.init(d,"系统设置");c.initSection("authinfo");b.version=a;b.showUpdateBtn=false;b.showRestartBtn=true;b.loaded=true;b.password=b.passwordc="";b.loadAuthInfo=function(){e.get("/setting/auth",function(j){b.username=j.username;b.passwordcheck=j.passwordcheck})};b.loadServerInfo=function(){e.get("/setting/server",function(j){b.ip=j.ip;b.port=j.port})};b.loadAccessKey=function(){e.get("/setting/accesskey",function(j){b.accesskey=j.accesskey;b.accesskeyenable=j.accesskeyenable})};b.updateAuthInfo=function(){e.post("/setting/auth",{username:b.username,password:b.password?hex_md5(b.password):"",passwordc:b.passwordc?hex_md5(b.passwordc):"",passwordcheck:b.passwordcheck},function(j){if(j.code==0){b.loadAuthInfo()}})};b.updateServerInfo=function(){e.post("/setting/server",{port:b.port,ip:b.ip},function(){if(data.code==0){b.loadServerInfo()}})};b.updateAccessKey=function(){e.post("/setting/accesskey",{accesskey:b.accesskey,accesskeyenable:b.accesskeyenable},function(j){if(j.code==0){b.loadAccessKey()}})};b.checkUpVersion=function(){b.upverMessage="正在检测新版本...";e.get("/setting/upver?force=1",function(k){if(k.code==-1){b.upverMessage=k.msg}else{if(k.code==0){var j=k.data;if(parseFloat(j.version)>parseFloat(a.version)||(parseFloat(j.version)==parseFloat(a.version)&&parseInt(j.build)>parseInt(a.build))){b.upverMessage='<table class="table table-condensed"><thead><tr><th colspan="2">有可用的新版本</th></tr></thead><tbody><tr><td>版本信息：</td><td>v'+j.version+" b"+j.build+"</td></tr><tr><td>发布时间：</td><td>"+j.releasetime+'</td></tr><tr><td>变更记录：</td><td><a href="'+j.changelog+'" target="_blank">查看版本变更记录</a></td></tr></tbody></table>';b.updateBtnText="开始在线升级";b.showUpdateBtn=true}else{b.upverMessage="当前已是最新版本！"}}}})};b.update=function(){b.upverMessage="正在升级，请稍候...";b.showUpdateBtn=false;e.post("/backend/update",{},function(k){var j=function(){e.get("backend/update",function(l){f.setInfo("");if(l.msg){b.upverMessage=l.msg}if(l.status=="finish"&&l.code==0){b.upverMessage="正在重启 黑沐唯VPS管理面板...";g(function(){e.post("/backend/service_restart",{service:"hpanel"},function(n){var m=function(){e.get("backend/service_restart_hpanel",function(o){f.setInfo("");if(o.msg){b.upverMessage=o.msg}g(m,500,d)},function(p,o){if(o==403||o==0){b.upverMessage="升级成功！请刷新页面重新登录。";return false}return true})};g(m,500,d)})},1000,d)}else{g(j,500,d)}})};g(j,500,d)})};b.restartMessage="是否要重启 黑沐唯VPS管理面板？";b.restart=function(){b.restartMessage="正在重启，请稍候...";b.showRestartBtn=false;g(function(){e.post("/backend/service_restart",{service:"hpanel"},function(k){var j=function(){e.get("backend/service_restart_hpanel",function(l){if(l.msg){b.restartMessage=l.msg}g(j,500,d)},function(m,l){if(l==403||l==0){b.restartMessage="重启成功！请刷新页面重新登录。";return false}return true})};g(j,500,d)})},1000,d)};b.genaccesskey=function(){var l="";for(var k=0;k<32;k++){l+=String.fromCharCode(Math.floor(256*Math.random()))}var j=function(p){var m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var n="";var w,u,s,v,t,r,q;var o=0;while(o<p.length){w=p.charCodeAt(o++);u=p.charCodeAt(o++);s=p.charCodeAt(o++);v=w>>2;t=((w&3)<<4)|(u>>4);r=((u&15)<<2)|(s>>6);q=s&63;if(isNaN(u)){r=q=64}else{if(isNaN(s)){q=64}}n=n+m.charAt(v)+m.charAt(t)+m.charAt(r)+m.charAt(q)}return n};b.accesskey=j(l)}}];var SorryCtrl=["$scope","Module","$timeout",function(a,b,d){var c="sorry";b.init(c,"页面不存在");a.loaded=true}];