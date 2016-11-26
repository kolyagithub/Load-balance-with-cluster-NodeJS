/**
 * Created by qudrat on 05/10/16.
 */
'use strict';

const cluster = require('cluster')
    , master = require('./master')
    , workers = require('./workers');

class Cluster {
    constructor() {}
    init() {
        if (cluster.isMaster) {
            master.setCluster = cluster;
            master.init();
        }
        else {
            workers.init();
        }
    }
}
module.exports = new Cluster();