var express = require('express');
var router = express.Router();
var db = require('./connection');


var UserProfilecollection = db.get('UserProfile_Collection');
var ObjectId = require('mongodb').ObjectID;


router.post('/userprofile',function(req, res) {
    req.body.userprofileobj._userid = ObjectId(req.body.userprofileobj._userid);
    if(req.body.userprofileobj._id == 0){
        req.body.userprofileobj._id = ObjectId();
        UserProfilecollection.insert(req.body.userprofileobj,function(err, data){
            if(err) {res.json(500, err);}
            else
            { 
            res.json({'return': true,"authorize" : true});
            }
        });
    }else{
        var _id = ObjectId(req.body.userprofileobj._id); 
        var obj =req.body.userprofileobj;

        delete obj["_id"];       
        delete obj["_userid"];       
        UserProfilecollection.update({"_id":_id},{$set:req.body.userprofileobj},function(err, data){
            if(err) {res.json(500, err);}
            else
            { 
            res.json({'return': true,"authorize" : true});
            }
        });
    }
});

router.get('/userprofile/:_userid',function(req, res) {
    UserProfilecollection.findOne({"_userid":ObjectId(req.params._userid)}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj,"authorize" : true});
        }
	});
});




module.exports = router;