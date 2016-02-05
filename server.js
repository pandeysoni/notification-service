var express = require('express'),
	config = require('./server/config/config'),
	Db = require('./server/config/db'),
	app = express(),
	port = config.server.port
	path = require('path');
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'client/')));
});

require('./server/routes')(app);

console.log ('About to start listening');
app.listen(port);
console.log('App started on port ', port);