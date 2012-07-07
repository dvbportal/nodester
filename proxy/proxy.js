#!/usr/bin/env node

/*
 Nodester - Nodejs hosting
 This app runs on port 80 and forwards traffic to the appropriate node app 
*/

var httpProxy = require('../deps/node-http-proxy/lib/node-http-proxy.js'),
    proxyStats = require('../deps/cloudnode-proxy/proxy-stats'),
    proxyError = require('../deps/cloudnode-proxy/proxy-error'),
    http = require('http'),
    net = require('net'),
    policyfile = require('policyfile'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    lib = require('../lib/lib'),
    config = require('../config');

var daemon = require('daemon');
var proxymap = {};
var sub_domains = {};
var proxy_refresh_timer = null;

var queue_proxy_map_refresh = function() {
    if (proxy_refresh_timer === null) {
        proxy_refresh_timer = setTimeout(function() {
            load_proxymap(config.opt.proxy_table_file, function(err, res) {
                if (err) {
                    console.error('failed to load proxymap: %s', err.toString());
                }
                proxy_refresh_timer = null;
            });
        },
        5 * 1000);
    }
};

fs.watchFile(config.opt.proxy_table_file,
function(oldts, newts) {
    queue_proxy_map_refresh();
});

var load_proxymap = function(fname, cb) {
    fs.readFile(fname, function(err, data) {
        if (err) {
            console.error('load_proxymap read error: %s', err.toString());
            cb(err, undefined);
        } else {
            try {
                var map = JSON.parse(data);
                if (typeof map.router != 'null') {
                    proxymap = {};
                    for (var i in map.router) {
                        if (map.router.hasOwnProperty(i)) {
                            var prts = map.router[i].split(':');
                            proxymap[i] = {
                                host: prts[0],
                                port: prts[1]
                            };
                            // port to app lookup
                            var pos = i.indexOf('.cloudno.de');
                            if (pos != -1) {
                                var subdomain = i.substring(0, pos);
                                sub_domains[prts[1]] = subdomain;
                            }
                        }
                    }
                    cb(undefined, true);
                } else {
                    cb('no_map_defined', undefined);
                }
            } catch(e) {
                console.error('load_proxymap parse error: %s', e.toString());
                cb(e, undefined);
            }
        }
    });
};

var lookup_hostport = function(hostport) {
    if (proxymap.hasOwnProperty(hostport)) {
        return proxymap[hostport];
    } else if (hostport.indexOf(':') > -1) {
        var prts = hostport.split(':');
        if (proxymap.hasOwnProperty(prts[0])) {
            return proxymap[prts[0]];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

var lookup_app = function(hostport) {
    return sub_domains[hostport];
}

proxyStats.registerLookup(lookup_app);

var handle_http_request = function(req, res) {
    if (typeof req.headers.host == 'string') {
        if (req.headers.host == 'www.cloudno.de') {
            res.writeHead(301, {
                Location: 'http://cloudno.de'
            });
            res.end();
        } else if (req.headers.host == 'cloudno.de' && 
            (req.url.indexOf('/user') == 0 ||
             req.url.indexOf('/login') == 0 ||
             req.url.indexOf('/admin') == 0 ||
             req.url.indexOf('/signup') == 0)) {
                var proxy = new httpProxy.HttpProxy({host: "81.169.133.153", port: 80});
                proxy.proxyRequest(req, res);
        } else {
            var options = lookup_hostport(req.headers.host);
            if (options !== null) {
                if (!options.port) options.port = '80';
                var proxy = new httpProxy.HttpProxy(options);
                proxy.proxyRequest(req, res);
            } else {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end(proxyError.getErrorPage('Page not found', 404, 'Application does not exist!'));
            }
        }
    } else {
        res.writeHead(406, {
            'Content-Type': 'text/html'
        });
        res.end(proxyError.getErrorPage('Page not found', 406, 'You didn\'t specify a hostname!'));
    }
};

var handle_upgrade_request = function(req, socket, head) {
    if (typeof req.headers.host == 'string') {
        var options = lookup_hostport(req.headers.host);
        if (options !== null) {
            var proxy = new httpProxy.HttpProxy(options);
            proxy.proxyWebSocketRequest(req, socket, head);
        } else {
            socket.end();
            socket.destroy();
        }
    } else {
        socket.end();
        socket.destroy();
    }
};

var switch_user = function() {
    console.log('Setting user to ' + config.opt.uid);
    daemon.setreuid(config.opt.uid);
    console.log('Switched to ' + process.getuid() + '.');
};

lib.update_proxytable_map(function(err) {
    if (err) {
        console.log("err: " + JSON.stringify(err));
    } else {
        queue_proxy_map_refresh();
        var http_server = http.createServer(handle_http_request);
        http_server.on('upgrade', handle_upgrade_request);
        http_server.listen(80, '0.0.0.0');
        console.log('Nodester started on port 80');
        var flash_server = policyfile.createServer();
        flash_server.listen(843);
        console.log('Flash Policy Server started on port 843.');
        if (config.opt.enable_ssl === true) {
            var tls = require('tls');
            tls.CLIENT_RENEG_LIMIT = 0;
            var https = require('https');
            var ssl_options = {
                ca: [
                fs.readFileSync(config.opt.app_dir + '/' + config.opt.ssl_ca_file),
                fs.readFileSync(config.opt.app_dir + '/' + config.opt.ssl_sub1_file)
                ],
                key: fs.readFileSync(config.opt.app_dir + '/' + config.opt.ssl_key_file),
                cert: fs.readFileSync(config.opt.app_dir + '/' + config.opt.ssl_cert_file),
                ciphers: "ECDHE-RSA-AES256-SHA384:AES256-SHA256:RC4-SHA:RC4:HIGH:+TLSv1:!SSLv2:+SSLv3:!MD5:!aNULL:!EDH:!AESGCM",
                secureOptions: require('constants').SSL_OP_CIPHER_SERVER_PREFERENCE
            };
            var httpSsl = https.createServer(ssl_options, function(req, res) {
                if (req.headers.host == 'cloudno.de' &&
                (req.url.indexOf('/lead') == 0 ||
                req.url.indexOf('/api') == 0 ||
                req.url.indexOf('/beta') == 0 ||
                req.url.indexOf('/account') == 0 ||
                req.url.indexOf('/contact') == 0 ||
                req.url.indexOf('/myapps') == 0 ||
                req.url.indexOf('/database') == 0 ||
                req.url.indexOf('/user') == 0 ||
                req.url.indexOf('/rpx') == 0 ||
                req.url.indexOf('/signup') == 0 ||
                req.url.indexOf('/admin') == 0 ||
                req.url.indexOf('/request') == 0 ||
                req.url.indexOf('/login') == 0 || req.url == '/')) {
                    var proxy = new httpProxy.HttpProxy({host: "81.169.133.153", port: 80});
                    proxy.proxyRequest(req, res);
                }
                else if (req.headers.host == 'cloudno.de' &&
                (req.url.indexOf('/monit') == 0)) {
                    var proxy = new httpProxy.HttpProxy({host: "127.0.0.1", port: 2812});
                    req.url = req.url.substring(6);
                    proxy.proxyRequest(req, res);
                }
                else if (req.headers.host == 'cloudno.de' &&
                (req.url.indexOf('/couchdb') == 0)) {
                    var proxy = new httpProxy.HttpProxy({host: "81.169.133.153", port: 5984});
                    req.url = req.url.substring(8);
                    proxy.proxyRequest(req, res);
                }
                else {
                    var proxy = new httpProxy.HttpProxy({host: "127.0.0.1", port: 4001});
                    proxy.proxyRequest(req, res);
                }
            });
            httpSsl.setMaxListeners(1000);
            httpSsl.listen(443);
            console.log('Nodester API/WWW started on port 443');
            // We need SNI in node.js
        }
        setTimeout(function() {
            switch_user();
        },
        1000);
        console.log('Nodester started on port 80');
    }
});

process.on('uncaughtException',
function(err) {
    console.log(err.stack);
});
