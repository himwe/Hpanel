#!/usr/bin/env python2.6
#-*- coding: utf-8 -*-
#
# Copyright (c) 2012, VPSMate development team
# All rights reserved.
#
# VPSMate is distributed under the terms of the (new) BSD License.
# The full license can be found in 'LICENSE.txt'.

import os
import sys
root_path = os.path.dirname(__file__)
sys.path.insert(0, os.path.join(root_path, 'lib'))

import ssl
import tornado.ioloop
import tornado.httpserver
import ipanel.web
import ipanel.config
from ipanel.utils import make_cookie_secret


def write_pid():
    pidfile = '/var/run/vpsmate.pid'
    pidfp = open(pidfile, 'w')
    pidfp.write(str(os.getpid()))
    pidfp.close()

def main():
    # settings of tornado application
    settings = {
        'root_path': root_path,
        'data_path': os.path.join(root_path, 'data'),
        'static_path': os.path.join(root_path, 'static'),
        'xsrf_cookies': True,
        'cookie_secret': make_cookie_secret(),
    }
    
    application = ipanel.web.Application([
        (r'/xsrf', ipanel.web.XsrfHandler),
        (r'/authstatus', ipanel.web.AuthStatusHandler),
        (r'/login', ipanel.web.LoginHandler),
        (r'/logout', ipanel.web.LogoutHandler),
        (r'/query/(.+)', ipanel.web.QueryHandler),
        (r'/utils/network/(.+?)(?:/(.+))?', ipanel.web.UtilsNetworkHandler),
        (r'/utils/time/(.+?)(?:/(.+))?', ipanel.web.UtilsTimeHandler),
        (r'/setting/(.+)', ipanel.web.SettingHandler),
        (r'/operation/(.+)', ipanel.web.OperationHandler),
        (r'/page/(.+)/(.+)', ipanel.web.PageHandler),
        (r'/backend/(.+)', ipanel.web.BackendHandler),
        (r'/sitepackage/(.+)', ipanel.web.SitePackageHandler),
        (r'/client/(.+)', ipanel.web.ClientHandler),
        (r'/((?:css|js|js.min|lib|partials|images|favicon\.ico|robots\.txt)(?:\/.*)?)',
            ipanel.web.StaticFileHandler, {'path': settings['static_path']}),
        (r'/($)', ipanel.web.StaticFileHandler,
            {'path': settings['static_path'] + '/index.html'}),
        (r'/file/(.+)', ipanel.web.FileDownloadHandler, {'path': '/'}),
        (r'/fileupload', ipanel.web.FileUploadHandler),
        (r'/version', ipanel.web.VersionHandler),
        (r'/.*', ipanel.web.ErrorHandler, {'status_code': 404}),
    ], **settings)

    # read configuration from config.ini
    cfg = ipanel.config.Config(settings['data_path'] + '/config.ini')
    server_ip = cfg.get('server', 'ip')
    server_port = cfg.get('server', 'port')

    server = tornado.httpserver.HTTPServer(application)
    server.listen(server_port, address=server_ip)
    write_pid()
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()