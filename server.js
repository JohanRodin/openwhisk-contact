var connect = require('connect');

var serveStatic = require('serve-static');

var port = (process.env.VCAP_APP_PORT || 3000);

var host = (process.env.VCAP_APP_HOST || 'localhost');

var app = connect().use(function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
 });
app().use(serveStatic(__dirname)).listen(port,host);
