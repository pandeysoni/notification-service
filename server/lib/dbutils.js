var mongo = require('mongodb'),
    db = require('../config/db').db;

if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   console.log('Env: ', env);
}

exports.BSON = mongo.BSONPure;

/** clear database*/
exports.cleardb = function(doneit) {
  console.log('Clearing Database'); 
  db.collection('signalLog').remove({},{w:1}, function(err, result) {
    if (err) {return console.dir(err);}
    db.collection('events').remove({},{w:1}, function(err, result) {
      if (err) {return console.dir(err);}
        db.collection('subscriptions').remove({},{w:1}, function(err, result) {
          if (err) {return console.dir(err);}
          console.log('Event and Subscription and SignalLog documents deleted');
          console.log('Database cleared');
          doneit();
	     }); 
	  }); 
  });    
}
