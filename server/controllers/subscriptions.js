var mongo = require('mongodb'),
    BSON = mongo.BSONPure,
    db = require('../config/db').db;

/*
Subscriptions look like this in JSON

  {
    "eventTitle": "New CLM Build Available",
    "alertEndpoint": "sonipandey.71@gmail.com",
    "_id": "521a5af259b05b8099000002"
  }
*/


exports.findById = function(req, res) {
  var id = req.params.id;
    db.collection('subscriptions').findOne({'_id':new BSON.ObjectID(id)}, function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
    });
}
 
exports.findAll = function(req, res) {
    db.collection('subscriptions').find().toArray(function(err, result) {
     if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
    });
}
 
exports.addSubscription = function(req, res) {
  var subscription = req.body;
    db.collection('subscriptions').insert(subscription, {safe:true}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
}
 
exports.updateSubscription = function(req, res) {
  var id = req.params.id;
  var subscription = req.body;
    db.collection('subscriptions').update({'_id':new BSON.ObjectID(id)}, subscription, {safe:true}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
      });
}
 
exports.deleteSubscription = function(req, res) {
  var id = req.params.id;
    db.collection('subscriptions').remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
      });
}
 
