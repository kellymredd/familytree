var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var routes = require('./server/routes');
var cors = require('cors');

var PORT = 3001;
var HOST = 'localhost';
var app = express();

allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use('/api', routes);

router.use(function (req, res, next) {
    res.header('X-Frame-Options', 'DENY');
    return next();
});

app.listen(PORT, () => console.log('Biblepedia app listening on port 3001!'))