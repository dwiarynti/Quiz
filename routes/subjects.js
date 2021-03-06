
var express = require('express');
var router = express.Router();

var db = require('./connection');

var collection = db.get('Subject_Collection');
var esnsureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var passport = require('passport'), OAuthStrategy = require('passport-oauth').OAuthStrategy;;
var ObjectId = require('mongodb').ObjectID;

function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}


router.get('/subjects/Init/', ensureAuthenticated,function(req, res) {
  if(req.user.role=="user" || req.user.role=="admin"){
    collection.find({"IsActive":true}, function(err, subjects){
      if (err) res.json(500, err);
      else res.json({"obj": subjects, "authorize":true , role: req.user.role});
    });
  }else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});



router.post('/subjects/Create/',ensureAuthenticated, function(req,res)
{
  if(req.user.role=="admin"){
      collection.insert({
      SubjectName: req.body.SubjectName,
      IsActive : true,
      Questions : []
    },function(err)
    {
      if(err) res.json(500,err)
      else res.json({success : true});
    })
  }else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }

});
router.post('/subjects/Update/:_id',ensureAuthenticated, function(req,res)
{ 
   var id= ObjectId(req.params._id);
  if(req.user.role=="admin"){
      collection.update({'_id':id},{
      $set : { 'SubjectName':req.body.SubjectName}
      },function(err) {
      if(err) res.json(500,err)
      else res.json({success : true});
    });
  }else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});    
  }
  
});

router.get('/subjects/:_id',ensureAuthenticated,function(req,res)
{
    var id= ObjectId(req.params._id);
    if(req.user.role=="user" || req.user.role=="admin"){
    collection.findOne({_id:id},function(err,subjects)
    {
    if(err) res.json(500,err);
    else
    res.json({success:true, "obj":subjects});
    });
    }
    else
    {
     res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});    
    }
});

router.post('/subjects/Delete/:_id', ensureAuthenticated,function(req,res)
{ 
   var id= ObjectId(req.params._id);
   if(req.user.role=="admin"){
    collection.update({'_id':id},{
    $set : { 'IsActive':false}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
    });
   }
   else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});    
  }
});

module.exports = router;

