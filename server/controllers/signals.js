var mongo = require('mongodb'),
    BSON = mongo.BSONPure,
    db = require('../config/db').db,
    mailer = require('../lib/mailer.js'),
    _ = require ('underscore');
 
/*

Signals look like this:

  {
     "eventTitle": "New CLM Build Available",
     "instancedata": "This one weighed more than 16 megatons!!"
  }


*/


function processMatch(subscription, signal) {

   opts = {
     from: 'Simple Notification Service <sonipandey.71@gmail.com>',
     to: subscription.alertEndpoint,
     subject: subscription.eventTitle + ' happened at: ' + new Date(),
     body: signal.instancedata
   }
   mailer.sendMail(opts);

}

  
exports.processSignal = function(req, res) {
    var signal = req.body;

    console.log('Processing Signal: ' + JSON.stringify(signal));

    db.collection('subscriptions').find().toArray(function(err, items) {
        matches = _.filter(items, function(sub){return sub.eventTitle == signal.eventTitle});
        _.each(matches, function (sub) {processMatch(sub, signal)});
        res.send(matches);
      });   

    db.collection('signalLog').insert(signal, {safe:true}, function(err, result) {
    });
}
 
 