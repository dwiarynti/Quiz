var express = require('express');
var router = express.Router();
var passport = require('passport');
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('User_Collection');
var Account = require('../models/account');


router.get('/users/login', function(req, res) {
  res.render('/#/login', {user : req.user});
});

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

router.post('/users/login/',passport.authenticate('local'), function(req,res)
{
    res.json({success:true});
});

router.get('/users/logout', function(req, res) {
    req.logout();
    res.json({success:true});
});
module.exports = router;
