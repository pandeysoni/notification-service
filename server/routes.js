var event = require('./controllers/events');
var sub = require('./controllers/subscriptions');
var signal = require('./controllers/signals');
var signallog = require('./controllers/signallog');

module.exports = function(app){
	console.log ('registering event routes with express');
	app.get('/events', event.findAll);
	app.get('/events/:id', event.findById);
	app.post('/events', event.addEvent);
	app.put('/events/:id', event.updateEvent);
	app.delete('/events/:id', event.deleteEvent);
	 
	console.log ('registering subscription routes with express');
	app.get('/subscriptions', sub.findAll);
	app.get('/subscriptions/:id', sub.findById);
	app.post('/subscriptions', sub.addSubscription);
	app.put('/subscriptions/:id', sub.updateSubscription);
	app.delete('/subscriptions/:id', sub.deleteSubscription);

	console.log ('registering signal routes with express');
	app.post('/signals', signal.processSignal);

	console.log ('registering log routes with express');
	app.get('/signallog', signallog.findRecent);
}