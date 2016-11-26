/**
 * Created by qudrat on 05/10/16.
 */
'use strict';

const config = require('../config/config')
    , _ = require('underscore')._
    , net = require('net')
    , async = require('async')
    , redisCl = require('../redis/redisClient')
    , num_processes = require('os').cpus().length
    , helper = require('../utils/helper');

class Master {
    constructor() {
        this.cluster = null;
    }

    get getCluster() {
    }

    set setCluster(value) {
        this.cluster = value;
    }

    init() {
        var workers = [];
        var worker_pids = [];
        var cluster = this.cluster;
        var spawn = function (i) {
            workers[i] = cluster.fork();
            worker_pids.push({"idx": i, "pid": workers[i].process.pid});
            workers[i].on('exit', function (worker, code, signal) {
                console.log('restarting worker', i);
                worker_pids = _.without(worker_pids, _.findWhere(worker_pids, {"idx": i}));
                spawn(i);
            });
        };
        for (var i = 0; i < num_processes; i++) {
            spawn(i);
        }
        var server = net.createServer({pauseOnConnect: true}, function (connection) {
            var remote = connection.remoteAddress, ip;
            if (remote.match(/[0-9]+/g).length > 1) {
                ip = remote.match(/[0-9]+/g)[0] + '.'
                    + remote.match(/[0-9]+/g)[1] + '.'
                    + remote.match(/[0-9]+/g)[2] + '.'
                    + remote.match(/[0-9]+/g)[3];
            }
            else {
                ip = '127.0.0.1';
            }
            redisCl.keys(config.redis.PID + ip, function (err, keys) {
                if (_.contains(keys, config.redis.PID + ip)) {
                    redisCl.hget([config.redis.PID + ip, 'idx'], function (err, idx) {
                        if (err != null) {
                            console.error("get PID idx error");
                            return;
                        }
                        var worker = workers[idx];
                        worker.send('sticky-session:connection', connection);
                    });
                }
                else {
                    async.map(worker_pids, helper.getCPU_Percent, function (err, result) {
                        var resultArrWithoutNull = _.without(result, null);
                        var minObject = _.min(resultArrWithoutNull, function (resultArrWithoutNull) {
                            return resultArrWithoutNull.cpu;
                        });
                        var multi = redisCl.multi();
                        multi.hset([config.redis.PID + ip, 'idx', minObject.idx]);
                        multi.hset([config.redis.PID + ip, 'pid', minObject.pid]);
                        multi.exec();
                        var worker = workers[minObject.idx];
                        worker.send('sticky-session:connection', connection);
                    });
                }
            });
        });
        server.maxConnections = Infinity;
        server.listen(config.app.port);
    }
}
module.exports = new Master();