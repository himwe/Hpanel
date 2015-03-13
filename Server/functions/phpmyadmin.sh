#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

Install_phpMyAdmin()
{
cd $lnmp_dir/src
. ../functions/download.sh 
. ../options.conf 

src_url=http://downloads.sourceforge.net/project/phpmyadmin/phpMyAdmin/4.3.11.1/phpMyAdmin-4.3.11.1-all-languages.tar.gz && Download_src

tar xzf phpMyAdmin-4.3.11.1-all-languages.tar.gz
/bin/mv phpMyAdmin-4.3.11.1-all-languages $home_default/phpMyAdmin
/bin/cp $home_default/phpMyAdmin/{config.sample.inc.php,config.inc.php}
mkdir $home_default/phpMyAdmin/{upload,save}
sed -i "s@UploadDir.*@UploadDir'\] = 'upload';@" $home_default/phpMyAdmin/config.inc.php
sed -i "s@SaveDir.*@SaveDir'\] = 'save';@" $home_default/phpMyAdmin/config.inc.php
chown -R www.www $home_default/phpMyAdmin
cd ..
}
