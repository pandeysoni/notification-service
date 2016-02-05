var mongo = require('mongodb'),
	db = require('../config/db').db;

exports.findRecent = function(req, res) {
    db.collection('signalLog').find().sort({_id:-1}).limit(5).toArray(function(err, result) {
        if (!err) {
	        return res.json(result);
	    } else {
	        return res.send(Boom.badImplementation(err)); // 500 error
	    }
    });
}
 