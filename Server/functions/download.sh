#!/bin/bash
# Author:  himwe <Hpanel AT himwe.com>
# Support Site:  http://Hpanel.himwe.com

Download_src()
{
	[ -s "${src_url##*/}" ] && echo "${src_url##*/} found" || wget -c --no-check-certificate $src_url
        if [ ! -e "${src_url##*/}" ];then
                echo -e "\033[31m${src_url##*/} download failed, Please contact the author! \033[0m"
                kill -9 $$
        fi
}
