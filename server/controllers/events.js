var mongo = require('mongodb');
    BSON = mongo.BSONPure,
    Boom = require('boom');
    db = require('../config/db').db;
/*
Events look like this in JSON

  {
    "title": "News flash 6",
    "_id": "521d8970a1b6cd31a3000001"
  }

*/


exports.findById = function(req, res) {
  var id = req.params.id;
  db.collection('events').findOne({'_id':new BSON.ObjectID(id)}, function(err, result) {
    if (!err) {
        return res.json(result);
    } else {
        return res.send(Boom.badImplementation(err)); // 500 error
    }
  });
}

 
exports.findAll = function(req, res) {
    db.collection('events').find().toArray(function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
    });
}
 
exports.addEvent = function(req, res) {
  var event = req.body;
  db.collection('events').insert(event, {safe:true}, function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
  });
}
 
exports.updateEvent = function(req, res) {
  var id = req.params.id;
  var event = req.body;
  db.collection('events').update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
  });
}
 
exports.deleteEvent = function(req, res) {
  var id = req.params.id;
  db.collection('events').remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(Boom.badImplementation(err)); // 500 error
      }
  });
}
 