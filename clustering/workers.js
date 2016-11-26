/**
 * Created by qudrat on 05/10/16.
 */
'use strict';

const config = require('../config/config');

class Workers {
    constructor() {
        this.app = null;
    }
    get getApp() {}
    set setApp(value) {
        this.app = value;
    }
    init() {
        var app = this.app;
        // Create HTTP server
        var http = require('http');
        var server = http.createServer(app);
        // start HTTP
        server.listen(0, function () {
            console.info('Server listening on port %d ', config.app.port);
        });
        // listen master
        process.on('message', function(message, connection) {
            if (message !== 'sticky-session:connection') {
                return;
            }
            server.emit('connection', connection);
        });
    }
}
module.exports = new Workers();
