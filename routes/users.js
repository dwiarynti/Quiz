var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get(' User_Collection');

router.get('/Users/Init/',function(req, res) {
	collection.find({"IsActive":true}, function(err, subjects){
		if (err) res.json(500, err);
		else res.json({"obj": subjects});
	});
});
router.post('/Users/Create/', function(req,res)
{
  collection.insert({
    FirstName: req.body.SubjectName,
    LastName : req.body.LastName,
    Username : req.body.Username,
    Password: req.body.Password,
    IsActive  : true,
  },function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});
module.exports = router;
