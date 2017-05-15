
var express = require('express');
var router = express.Router();
var db = require('./connection');

var Profilecollection = db.get('ConfigurationFrom_Collection');
var ObjectId = require('mongodb').ObjectID;


router.get('/profile/initform',function(req, res) {
    Profilecollection.find({"formname":"Profile", "IsActive": true}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj,"authorize" : true});
        }
	});
});

router.post('/widget/update', function(req,res)
{
  Widgetcollection.update({"_id":req.body._id},{$set:{ 'IsActive':req.body.IsActive}}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj,"authorize" : true, "success" : true});
        }
	});
});

module.exports = router;
