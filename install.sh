#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

#echo ""
printf "
*******************************************************************
*         欢迎使用Hpanel VPS控制面板，请根据提示进行安装              *
*                              By HimWe & ShiLin                                         *
*  支持站点: Hpanel.HimWe.Com   E-Mail: Hpanel@Himwe.Com   *
*******************************************************************
"
cd /tmp
yum install -y zip unzip wget python bzip2
apt-get install -y zip wget python
wget -c http://ftp196131.host513.zhujiwu.cn/Hpanel.rar
unzip Hpanel.zip
cd Hpanel
screen -S Hpanel
./hpanel-install.sh

apt-get update
apt-get install unzip