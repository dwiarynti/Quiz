var express = require('express');
var router = express.Router();
var db = require('./connection');


var UserProfilecollection = db.get('UserProfile_Collection');
var ObjectId = require('mongodb').ObjectID;


router.post('/userprofile',function(req, res) {
    req.body.userprofileobj._userid = ObjectId(req.body.userprofileobj._userid);
	UserProfilecollection.insert(req.body.userprofileobj,function(err, data){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'return': true,"authorize" : true});
        }
	});
});
module.exports = router;