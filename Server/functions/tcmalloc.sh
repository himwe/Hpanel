#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

Install_tcmalloc()
{
cd $lnmp_dir/src
. ../functions/download.sh

src_url=https://googledrive.com/host/0B6NtGsLhIcf7MWxMMF9JdTN3UVk/gperftools-2.4.tar.gz && Download_src

tar xzf gperftools-2.4.tar.gz 
cd gperftools-2.4
./configure --enable-frame-pointers
make && make install
cd ..
/bin/rm -rf gperftools-2.4

if [ -f "/usr/local/lib/libtcmalloc.so" ];then
	echo '/usr/local/lib' > /etc/ld.so.conf.d/local.conf
	ldconfig
else
	echo -e "\033[31mgperftools install failed, Please contact the author! \033[0m"
	kill -9 $$
fi
cd ..
}
