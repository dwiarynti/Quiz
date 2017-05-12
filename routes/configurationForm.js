
var express = require('express');
var router = express.Router();
var db = require('./connection');


var ConfigurationFromcollection = db.get('ConfigurationFrom_Collection');
var ObjectId = require('mongodb').ObjectID;


router.get('/configurationform/',function(req, res) {
	ConfigurationFromcollection.find({}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj,"authorize" : true});
        }
	});
});
module.exports = router;