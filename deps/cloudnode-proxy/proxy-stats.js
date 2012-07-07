/**
 * Proxy statistics extension for Cloudnode
 *
 * This extension provides web statistics using Redis counters
 */

"use strict";

var redis = require('redis');
var config = require('../../config');
var util = require('util');
var crypto = require('crypto');
var lookup_app;

exports.registerLookup = function(lookup_app_) {
    lookup_app = lookup_app_;
}

var client = redis.createClient(config.opt.redis_port, 'cloudno.de');

/**
 * Authenticate with Redis
 */
client.auth(config.opt.redis_auth, function(result) {
    util.log("Redis authenticated.");
})

client.on("error", function (err) {
    util.log("Redis error: " + err);
});

/**
 * Update statistics with the current request
 */
exports.recordRequest = function(req, options) {
  util.log(req.method + ': ' + req.headers.host + req.url + ' - ' + req.headers["x-forwarded-for"]);

  // log to redis
  if (client && client.connected) {
    var host = req.headers.host;
    var pos = host.indexOf('.cloudno.de');
    var appName;

    if (lookup_app && options.port != "5984") {
        appName = lookup_app(options.port);
    } else {
        appName = host.substring(0, pos);
    }

    if (appName) {
        var ip = req.headers["x-forwarded-for"];
        var referer = req.headers.referer;
        var date = new Date;
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCFullYear() + "-" + month + "-" + date.getUTCDate();
        var urlhash;

        var keys = [
            "hits",
            "hits-by-app:" + appName,
            "hits-by-day:" + day,
            "hits-by-app-by-month:" + appName + ':' + month,
            "hits-by-ip-by-day:" + ip + ':' + day,
        ];

        if (referer) {
            urlhash = crypto.createHash("md5").update(referer).digest("hex");
            keys.push("hits-by-app-by-url-by-day:" + appName + ':' + urlhash + ":" + day);
            client.set("url:" + urlhash, referer);
        }

        for (var i in keys) {
            client.incr(keys[i]);
        }
    }
  }
}
