#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

Install_hhvm_CentOS()
{
cd $lnmp_dir/src
. ../functions/download.sh 
. ../options.conf

useradd -M -s /sbin/nologin www

if [ -n "$(cat /etc/redhat-release | grep ' 7\.')" ];then
	CentOS_RHL=7
elif [ -n "$(cat /etc/redhat-release | grep ' 6\.')" ];then
	CentOS_RHL=6
fi

if [ "$CentOS_RHL" == '7' ];then
if [ -e /etc/yum.repos.d/epel.repo_bk ];then
	/bin/mv /etc/yum.repos.d/epel.repo{_bk,}
elif [ ! -e /etc/yum.repos.d/epel.repo ];then
cat > /etc/yum.repos.d/epel.repo << EOF
[epel]
name=Extra Packages for Enterprise Linux 7 - \$basearch
#baseurl=http://download.fedoraproject.org/pub/epel/7/\$basearch
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-7&arch=\$basearch
failovermethod=priority
enabled=1
gpgcheck=0
EOF
fi
cat > /etc/yum.repos.d/gleez.repo << EOF
[gleez]
name=Gleez repo
baseurl=http://yum.gleez.com/7/\$basearch/
enabled=0
gpgcheck=0
EOF
yum --enablerepo=gleez -y install hhvm
fi

if [ "$CentOS_RHL" == '6' ];then
if [ -e /etc/yum.repos.d/epel.repo_bk ];then
	/bin/mv /etc/yum.repos.d/epel.repo{_bk,}
elif [ ! -e /etc/yum.repos.d/epel.repo ];then
cat > /etc/yum.repos.d/epel.repo << EOF 
[epel]
name=Extra Packages for Enterprise Linux 6 - \$basearch
#baseurl=http://download.fedoraproject.org/pub/epel/6/\$basearch
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-6&arch=\$basearch
failovermethod=priority
enabled=1
gpgcheck=0
EOF
fi
yum -y install libmcrypt-devel glog-devel jemalloc-devel tbb-devel libdwarf-devel mysql-devel \
libxml2-devel libicu-devel pcre-devel gd-devel boost-devel sqlite-devel pam-devel \
bzip2-devel oniguruma-devel openldap-devel readline-devel libc-client-devel libcap-devel \
libevent-devel libcurl-devel libmemcached-devel

cat > /etc/yum.repos.d/remi.repo << EOF
[remi]
name=Les RPM de remi pour Enterprise Linux 6 - \$basearch
#baseurl=http://rpms.famillecollet.com/enterprise/6/remi/\$basearch/
mirrorlist=http://rpms.famillecollet.com/enterprise/6/remi/mirror
enabled=0
gpgcheck=0
EOF

yum --enablerepo=remi -y install libwebp mysql mysql-devel mysql-libs

yum -y remove boost-system boost-filesystem

cat > /etc/yum.repos.d/gleez.repo << EOF
[gleez]
name=Gleez repo
baseurl=http://yum.gleez.com/6/\$basearch/
enabled=0
gpgcheck=0
EOF
yum --enablerepo=gleez -y install hhvm
fi

userdel -r nginx;userdel -r saslauth
rm -rf /var/run/hhvm/ /var/log/hhvm/
mkdir /var/run/hhvm/ /var/log/hhvm/
chown -R www.www /var/run/hhvm /var/log/hhvm
cat > /etc/hhvm/config.hdf << EOF
ResourceLimit {
  CoreFileSize = 0          # in bytes
  MaxSocket = 10000         # must be not 0, otherwise HHVM will not start
  SocketDefaultTimeout = 5  # in seconds
  MaxRSS = 0
  MaxRSSPollingCycle = 0    # in seconds, how often to check max memory
  DropCacheCycle = 0        # in seconds, how often to drop disk cache
}

Log {
  Level = Info
  AlwaysLogUnhandledExceptions = true
  RuntimeErrorReportingLevel = 8191
  UseLogFile = true
  UseSyslog = false
  File = /var/log/hhvm/error.log
  Access {
    * {
      File = /var/log/hhvm/access.log
      Format = %h %l %u % t \"%r\" %>s %b
    }
  }
}

MySQL {
  ReadOnly = false
  ConnectTimeout = 1000      # in ms
  ReadTimeout = 1000         # in ms
  SlowQueryThreshold = 1000  # in ms, log slow queries as errors
  KillOnTimeout = false
}

Mail {
  SendmailPath = /usr/sbin/sendmail -t -i
  ForceExtraParameters =
}
EOF

cat > /etc/hhvm/server.ini << EOF
; php options
pid = /var/run/hhvm/pid

; hhvm specific
;hhvm.server.port = 9001
hhvm.server.file_socket = /var/run/hhvm/sock
hhvm.server.type = fastcgi
hhvm.server.default_document = index.php
hhvm.log.use_log_file = true
hhvm.log.file = /var/log/hhvm/error.log
hhvm.repo.central.path = /var/run/hhvm/hhvm.hhbc
EOF

cat > /etc/hhvm/php.ini << EOF
hhvm.mysql.socket = /tmp/mysql.sock
expose_php = 0
memory_limit = 400000000
post_max_size = 50000000
EOF

if [ "$CentOS_RHL" == '7' ];then
cat > /etc/systemd/system/hhvm.service << EOF
[Unit]
Description=HHVM HipHop Virtual Machine (FCGI)

[Service]
ExecStartPre=/usr/bin/rm -rf /var/run/hhvm ; /usr/bin/mkdir /var/run/hhvm ; /usr/bin/chown www.www /var/run/hhvm
ExecStart=/usr/bin/hhvm --mode daemon --user www --config /etc/hhvm/server.ini --config /etc/hhvm/php.ini --config /etc/hhvm/config.hdf

[Install]
WantedBy=multi-user.target
EOF

systemctl enable hhvm
systemctl start hhvm
elif [ "$CentOS_RHL" == '6' ];then
/bin/cp ../init/hhvm-init-CentOS6 /etc/init.d/hhvm
chmod +x /etc/init.d/hhvm
chkconfig hhvm on
service hhvm start
fi
if [ -e "/usr/bin/hhvm" ];then
	sed -i 's@/dev/shm/php-cgi.sock@/var/run/hhvm/sock@' $web_install_dir/conf/nginx.conf 
	[ -z "`grep 'fastcgi_param SCRIPT_FILENAME' $web_install_dir/conf/nginx.conf`" ] && sed -i "s@fastcgi_index index.php;@&\n\t\tfastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;@" $web_install_dir/conf/nginx.conf 
	sed -i 's@include fastcgi.conf;@include fastcgi_params;@' $web_install_dir/conf/nginx.conf 
	service nginx reload
fi

rm -rf /etc/ld.so.conf.d/*_64.conf
ldconfig
# Supervisor
#yum -y install python-setuptools
#easy_install supervisor
#echo_supervisord_conf > /etc/supervisord.conf
#sed -i 's@pidfile=/tmp/supervisord.pid@pidfile=/var/run/supervisord.pid@' /etc/supervisord.conf
#[ -z "`grep 'program:hhvm' /etc/supervisord.conf`" ] && cat >> /etc/supervisord.conf << EOF
#[program:hhvm]
#command=/usr/bin/hhvm --mode daemon --user www --config /etc/hhvm/server.ini --config /etc/hhvm/php.ini --config /etc/hhvm/config.hdf
#numprocs=1 ; number of processes copies to start (def 1)
#directory=/tmp ; directory to cwd to before exec (def no cwd)
#autostart=true ; start at supervisord start (default: true)
#autorestart=unexpected ; whether/when to restart (default: unexpected)
#stopwaitsecs=10 ; max num secs to wait b4 SIGKILL (default 10)
#EOF
#src_url=https://github.com/Supervisor/initscripts/raw/master/redhat-init-mingalevme && Download_src
#/bin/mv redhat-init-mingalevme /etc/init.d/supervisord
#chmod +x /etc/init.d/supervisord
#chkconfig supervisord on
#service supervisord start
cd ..
}
