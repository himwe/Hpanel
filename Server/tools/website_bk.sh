#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

. ../options.conf

WebSite=$1
LogFile=$backup_dir/website.log
[ ! -e "$home_dir/$WebSite" ] && { echo "[$home_dir/$WebSite] not exist" >> $LogFile ;  exit 1 ; }

[ ! -e "$backup_dir" ] && mkdir -p $backup_dir

rsync -crazP --delete $home_dir/$WebSite $backup_dir
