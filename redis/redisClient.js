/**
 * Created by qudrat on 05/10/16.
 */

var redis = require("redis")
    , config = require('../config/config.json');


var redisCl = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

redisCl.on('error', function (err) {
    console.error('Cannot connect to Redis. Error - ', err);
});

module.exports = redisCl;