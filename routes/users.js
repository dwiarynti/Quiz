var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('./connection');

// var db = monk('localhost:27017/Quiz_db');
var collection = db.get('User_Collection');
var Account = require('../models/account');
var userCollection = db.get('accounts');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;


router.get('/users/login', function(req, res) {
  res.render('/#/login', {user : req.user});
});

router.get('/users/isAuthenticate', ensureAuthenticated, function(req, res) {
    console.log(req.session.passport);
    res.json({"authenticate":true, "username":req.session.passport.user, "role":req.user.role, "user_id":req.user._id});
});


router.get('/users/',ensureAuthenticated, function(req,res)
{
 if(req.user.role == "admin")
 {
   userCollection.find({}, function(err, user){
        if(err)
        res.json(500,err);
        else
        res.json({success:true,"obj": user,"authorize":true});
    })
 }
else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});


router.post('/users/create/', function(req,res)
{
  const user = {
      username : req.body.username,
      fullname : req.body.fullname,
      role     : "user"
  };
  Account.register(new Account(user), req.body.password, function(err, account) {
        if (err) {
            return res.json({success:false, "errormsg":err.message})
        }
        else
        {
            res.json({success:true});
        }
    });
});


router.post('/users/login/',
passport.authenticate('local'), function(req,res)
{
    res.json({success:true, "role":req.user.role, "user_id":req.user._id});
});

router.get('/users/logout', function(req, res) {
    req.logout();
    res.json({success:true});
});
router.get('/users/session', function(req, res) {
    res.json({"obj":req.session});
});
router.get('/users/:_id',ensureAuthenticated,function(req,res)
{
    if(req.user.role == "admin")
    {
    userCollection.findOne({_id:req.params._id},function(err,user)
    {
    if(err) res.json(500,err);
    else
    res.json({success:true, "obj":user});
    });
    }
    else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.post('/users/update/:_id', ensureAuthenticated,function(req,res)
{
    if(req.user.role == "admin")
    {
    userCollection.update({_id:req.params._id},{
        $set :{'fullname': req.body.fullname,
                'username': req.body.username}
    },function(err,user)
    {
    if(err) res.json(500,err);
    else
    res.json({success:true});
});
    }
    else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.post('/users/reset/:_id',ensureAuthenticated,function(req,res)
{
    async.waterfall([
        function(done)
        {
            userCollection.findOne({_id:req.params._id},function(err,user,next)
            {
                if(err) res.json(500,err)
                 var SALT_FACTOR = 5;
              var pass = req.body.password;
              bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                if (err) return next(err);

                bcrypt.hash(pass, salt, null, function(err, hash) {
                if (err) return next(err);
                pass = hash;
                Account.update(new Account(user),pass, function(err, account)
                {
                    
                    if(err)
                    {
                        res.json(500,err)
                    }
                    else
                    {
                    res.json({success:true})
                    }
                });
                });
            });
                
            });
        }
    ])
});

router.get('/users/getusername/:_id',ensureAuthenticated,function(req,res)
{
    userCollection.findOne({_id:ObjectId(req.params._id)},function(err,user)
    {
        if(err) res.json(500,err);
        else
            res.json({success:true, "authorize":true, "user_id":req.params._id, "username":user.username});
    });
});


function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}

module.exports = router;
