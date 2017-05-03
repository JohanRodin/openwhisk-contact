var connect = require('connect');

var app = connect()

    .use(connect.logger('dev'))

    .use(connect.static('home'))

    .use(function(req, res){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end('hello world\n');

 });

var serveStatic = require('serve-static');
var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
app().use(serveStatic(__dirname)).listen(port,host);
