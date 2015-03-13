#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

TEST()
{
cd $lnmp_dir/src
. ../functions/download.sh 
. ../options.conf

public_IP=`../functions/get_public_ip.py`
if [ "`../functions/get_ip_area.py $public_IP`" == 'CN' ];then
	FLAG_IP=CN
fi

if [ "$FLAG_IP"x == "CN"x ];then
	src_url=http://www.yahei.net/tz/tz.zip && Download_src
	unzip -q tz.zip -d $home_default
	/bin/cp $lnmp_dir/conf/index_cn.html $home_default/index.html
else
	src_url=http://www.yahei.net/tz/tz_e.zip && Download_src
	unzip -q tz_e.zip -d $home_default;/bin/mv $home_default/{tz_e.php,proberv.php}
	sed -i 's@https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js@http://lib.sinaapp.com/js/jquery/1.7/jquery.min.js@' $home_default/proberv.php 
	/bin/cp $lnmp_dir/conf/index.html $home_default
fi
src_url=https://gist.githubusercontent.com/ck-on/4959032/raw/0b871b345fd6cfcd6d2be030c1f33d1ad6a475cb/ocp.php && Download_src

echo '<?php phpinfo() ?>' > $home_default/phpinfo.php
[ "$PHP_cache" == '1' ] && /bin/cp ocp.php $home_default && sed -i 's@<a href="/xcache" target="_blank" class="links">xcache</a>@<a href="/ocp.php" target="_blank" class="links">Opcache</a>@' $home_default/index.html
[ "$PHP_cache" == '3' ] && sed -i 's@<a href="/xcache" target="_blank" class="links">xcache</a>@<a href="/apc.php" target="_blank" class="links">APC</a>@' $home_default/index.html
[ "$PHP_cache" == '4' ] && /bin/cp eaccelerator-*/control.php $home_default && sed -i 's@<a href="/xcache" target="_blank" class="links">xcache</a>@<a href="/control.php" target="_blank" class="links">eAccelerator</a>@' $home_default/index.html
[ "$Web_yn" == 'y' -a "$Nginx_version" != '3' -a "$Apache_version" != '3' ] && sed -i 's@LNMP@LANMP@g' $home_default/index.html
[ "$Web_yn" == 'y' -a "$Nginx_version" == '3' -a "$Apache_version" != '3' ] && sed -i 's@LNMP@LAMP@g' $home_default/index.html
chown -R www.www $home_default
[ -e "$db_install_dir" -a -z "`ps -ef | grep -v grep | grep mysql`" ] && /etc/init.d/mysqld restart 
[ -e "$apache_install_dir" -a -z "`ps -ef | grep -v grep | grep apache`" ] && /etc/init.d/httpd restart 
cd ..
}
