var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('User_Collection');

router.get('/users/Init/',function(req, res) {
	collection.find({"IsActive":true}, function(err, subjects){
		if (err) res.json(500, err);
		else res.json({"obj": subjects});
	});
});
router.post('/users/Create/', function(req,res)
{
  collection.insert({
    FullName:  req.body.FullName,
    Username :  req.body.Username,
    Password:   req.body.Password,
    IsActive  : true,
  },function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});
module.exports = router;
