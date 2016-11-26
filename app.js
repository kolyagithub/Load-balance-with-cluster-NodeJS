/**
 * Created by qudrat on 05/10/16.
 */

var http = require('http')
    , express = require('express')
    , config = require('./config/config.json')
    , bodyParser = require('body-parser')
    , routeOther = require('./routes/other')
    , routeUser = require('./routes/users')
    , morgan = require('morgan');

var app = express();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//logging
var logMorgan = morgan('common');

app.use('/other', logMorgan, routeOther);
app.use('/users', logMorgan, routeUser);
app.use(function(err, req, res, next) {
    console.error('Express error: ', err);
    res.status(500).send('Something broke in express!');
});
app.use(function(req, res, next) {
    if(req.url !== "/favicon.ico"){
        res.status(404).send('Sorry cant find this URL!');
        console.error('Route not found: ', req.url);
    }
});

if(config.app.cluster) {
    const cluster = require('./clustering/cluster')
        , worker = require('./clustering/workers');

    worker.setApp = app;
    cluster.init();
}
else {
    var server = http.createServer(app);
    server.listen(config.app.port, function () {
        console.info('Server listening on port %d ', config.app.port);
    });
}

