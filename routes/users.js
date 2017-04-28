var express = require('express');
var router = express.Router();
var passport = require('passport');
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('User_Collection');
var Account = require('../models/account');
var userCollection = db.get('accounts');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

router.get('/users/login', function(req, res) {
  res.render('/#/login', {user : req.user});
});

router.get('/users/', function(req,res)
{
   userCollection.find({}, function(err, user){
        if(err)
        res.json(500,err);
        else
        res.json({success:true,"obj": user});
    })
})

router.post('/users/create/', function(req,res)
{
  const user = {
      username : req.body.username,
      fullname : req.body.fullname
  };
  Account.register(new Account(user), req.body.password, function(err, account) {
        if (err) {
            return res.json({success:false})
        }
        passport.authenticate('local')(req, res, function () {
            res.json({success:true});
        });
    });
});

router.get('/users/:_id',function(req,res)
{
  userCollection.findOne({_id:req.params._id},function(err,user)
  {
    if(err) res.json(500,err);
    else
    
    res.json({success:true, "obj":user});
  });
});

router.post('/users/update/:_id', function(req,res)
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
});

router.post('/users/reset/:_id',function(req,res)
{
    async.waterfall([
        function(done)
        {
            userCollection.findOne({_id:req.params._id},function(err,user)
            {
                if(err) res.json(500,err)
                
                Account.update(new Account(user), req.body.password, function(err, account)
                {
                    
                    res.json({success:true})
                });
            });
        }
    ])
})

router.post('/users/login/',
passport.authenticate('local'), function(req,res)
{
    res.json({success:true});
});

router.get('/users/logout', function(req, res) {
    req.logout();
    res.json({success:true});
});
module.exports = router;
