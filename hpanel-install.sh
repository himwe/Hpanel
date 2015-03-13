#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com
#
# Check if user is root
[ $(id -u) != "0" ] && echo "Error: You must be root to run this script" && exit 1 

export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
clear
printf "
#############################################################
 #          Hpanel For HimWe Linux Web Server Control Panel                                  #
  #  LNMP/LAMP/LANMP for CentOS/RadHat 5+ Debian 6+ and Ubuntu 12+    #
 #       For more information please visit http://hpanel.himwe.com/                       #
#############################################################

# Universal variable
SYSTEM="uname -s"

# Install LNMP/LAMP/LANMP Server
if[ $SYSTEM="CentOS" -o $SYSTEM="Redhat" ];then
   yum -y install wget screen
elif[ $SYSTEM="Debian" -o $SYSTEM="Ubuntu" ];then
   apt-get -y install wget screen
 fi
  
mkdir /tmp/Hpanel/Server/src
cd /tmp/Hpanel/Server
wget -c http://mirrors.linuxeye.com/lnmp-full.tar.gz
tar xzf lnmp-full.tar.gz
cd lnmp
mv -fi src/* /tmp/Hpanel/Server/src
cd /tmp/Hpanel/Server
screen -S Server
./install.sh

# Install Control Panel
cd  /tmp/Hpanel/Panel
python install.py
