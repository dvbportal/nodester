var config = require('../config'),
fs = require('fs'),
path = require('path'),
cradle = require('cradle'),
lib = require('./lib'),
util = require('util'),
exec = require('child_process').exec;

module.exports = {
    // OK
    logs: function(req, res, next) {
        var port = req.doc.port;

        fs.readFile(config.opt.redis_dir + '/' + port + '/redis.log', function(err, body) {
            if (err) {
				util.log('Failed to read redis log. (' + err + ')');
                res.send({status: "error", message: "Failed to read redis log"});
				return;
            }
            var lines = body.toString().split("\n");
            lines = lines.slice( - 100);
			res.send({status: "ok", data: lines});
        });
    },
    // OK
    config: function(req, res, next) {
        var port = req.doc.port;

        fs.readFile(config.opt.redis_dir + '/' + port + '.conf', function(err, body) {
            if (err) {
				util.log('Failed to read redis config file. (' + err + ')');
                res.send({status: "error", message: "Failed to read redis config file"});
				return;
            }
            var lines = body.toString().split("\n");
            lines = lines.slice( - 100);
			res.send({status: "ok", data: lines});
        });
    },
    // OK
    delete: function(req, res, next) {
        var dbName = req.param("dbname").toLowerCase();
        var user = req.user;
        var doc = req.doc;
        var redis = lib.get_couchdb_database('redis');

       	redis.remove(dbName, doc._rev, function(err, resp) {
           	if (failed(err, res)) 
				return;
					
            redis_stop(doc.port, function() {
            	var cmd = config.opt.app_dir + '/bin/redis_del.sh ' + config.opt.redis_dir + ' ' + doc.port;
				util.log('Redis delete cmd: ' + cmd);
				res.send({status: "ok", message: "Database " + dbName + " deleted"});
           	});
        });
    },
    // OK
    redis_start: function(req, res, next) {
        var port = req.doc.port;
		redis_start(port, function(rv) {
		    if (rv == false) {
		        res.send({status: "error", message:"failed to start"});
		    } else {
		        res.send({status: "ok", message: "database started"});
		    }
		});
    },
    // OK
    redis_stop: function(req, res, next) {
        var port = req.doc.port;
		redis_stop(port, function(rv) {
		    if (rv == false) {
		        res.send({status: "error", message:"failed to stop"});
		    } else {
		        res.send({status: "ok", message: "database stopped"});
		    }
		});
    },
    // OK
    redis_restart: function(req, res, next) {
        var port = req.doc.port;
		redis_restart(port, function(rv) {
		    if (rv == false) {
		        res.send({status: "error", message:"failed to restart"});
		    } else {
		        res.send({status: "ok", message: "database restarted"});
		    }
		}, true);
    },
    // OK
    get: function(req, res, next) {
		var port = req.doc.port;
		redis_status(port, function(rv) {
			if (rv) {
		        res.send({status: "ok", port: req.doc.port, authorization: req.doc.auth, running: true});
			} else {
		        res.send({status: "ok", port: req.doc.port, authorization: req.doc.auth, running: false});
			}
		});
    },
    // OK
    get_all: function(req, res, next) {
	    var user = req.user;
	    var db = lib.get_couchdb_database('redis');
	    db.view('dbs/by_user', { key: user._id }, function(err, resp) {
	      	if (failed(err, res))
				return;
				
		   	var dbs = [];
	      	resp.forEach(function(row) {
	          	dbs.push({name: row._id, port: row.port, authorization: row.auth});
	      	});
	      	res.send({status: "ok", data: dbs});
	    });
    },
    // OK
    post: function(req, res, next) {
        var dbName = req.body.dbname;
        if (!dbName) {
			res.statusCode = 500;
            res.send({status: "error",  message: "Database name required"});
            return;
        }
        var user = req.user;
        var redis = lib.get_couchdb_database('redis');
        redis.get(dbName, function(err, doc) {
            if (err == undefined) {
				res.statusCode = 500;
				res.send({status: "error", message: "Database " + dbName + " already exists"});
				return;
			}
			// new redis db, determine free port
            var redisPort = lib.get_couchdb_database('nextport');
            redisPort.get('redis_port', function(err, redis_port) {
                if (failed(err, res)) {
					return;
				}
                var dbPort = redis_port.address;
                var auth = redis_port._rev;
				var pos = auth.indexOf('-');
				if (pos != -1) {
					auth = auth.substring(pos + 1);
				}
				// save next port
                redisPort.merge('redis_port', {address: dbPort + 1}, function(err, resp) {
                    if (failed(err, res)) {
						return;
                    }
                    // save redis record
					var redis = lib.get_couchdb_database('redis');
                    redis.save(dbName, {port: dbPort, username: user._id, auth: auth}, function (err, resp) {
                      	if (failed(err, res)) {
							return;
                      	}
                    	var cmd = config.opt.app_dir + '/bin/redis_setup.sh ' + config.opt.redis_dir + ' ' + dbPort + ' ' + auth; 
                    	util.log('Redis setup cmd: ' + cmd);
                    	exec(cmd, function(err, stdout, stderr) {
		                	if (err) console.error('Redis setup error: %s', err);
		                	if (stdout.length > 0) util.log('Redis setup stdout: ' + stdout);
		                	if (stderr.length > 0) console.error('Redis setup stderr: %s', stderr);
		                });
		                res.send({status: "success", port: dbPort});
            		});
				});
            });
        });
    }
}

/**
 * Global result check function
 */ 
function failed(err, res, message) {
	if (err) {
		util.log('Error: ' + (message ? message : err.error + ' - ' + err.reason));
		res.statusCode = 500;
		res.send({status: "error", message: (message ? message : err.error + ' - ' + err.reason)});
		return true;
	}
	return false;
}

// OK
var redis_stop = function(port, callback) {
	util.log('### Redis ' + port + ' stopping...');
	var cmd = '/etc/init.d/redis stop ' + port;
	util.log('Redis stop cmd: ' + cmd);
	exec(cmd, function(err, stdout, stderr) {
    	if (err) console.error('Redis stop error: %s', err);
    	if (stdout.length > 0) util.log('Redis stop stdout: ' + stdout);
    	if (stderr.length > 0) console.error('Redis stop stderr: %s', stderr);
		callback(err == null);
    });
};

// OK
var redis_start = function(port, callback) {
	util.log('### Redis ' + port + ' starting...');
	var cmd = '/etc/init.d/redis start ' + port;
	util.log('Redis start cmd: ' + cmd);
	exec(cmd, function(err, stdout, stderr) {
    	if (err) console.error('Redis start error: %s', err);
    	if (stdout.length > 0) util.log('Redis start stdout: ' + stdout);
    	if (stderr.length > 0) console.error('Redis start stderr: %s', stderr);
		callback(err == null);
    });
};

// OK
var redis_restart = function(port, callback) {
    redis_stop(port, function(rv) {
        setTimeout(function() {
            redis_start(port, function(rv, pid) {
                if (rv == false) {
                    callback(false);
                } else {
                    callback(true, pid);
                }
            });
        }, 1000);
    });
};

// OK
var redis_status = function(port, callback) {
	util.log('### Redis ' + port + ' status');
	var cmd = '/etc/init.d/redis status ' + port;
	util.log('Redis status cmd: ' + cmd);
	exec(cmd, function(err, stdout, stderr) {
    	if (err) console.error('Redis status error: %s', err);
    	if (stdout.length > 0) util.log('Redis status stdout: ' + stdout);
    	if (stderr.length > 0) console.error('Redis status stderr: %s', stderr);
		callback(stdout.length > 0 && stdout.indexOf('not running') == -1);
    });
};
