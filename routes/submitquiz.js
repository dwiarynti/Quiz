
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var SubmittedQuizcollection = db.get('SubmittedQuiz_Collection');
// var Choicescollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;

router.get('/submit',function(req, res) {
	SubmittedQuizcollection.find({}, function(err, data){
   
		if (err) res.json(500, err);
		else res.json({"obj": data});
	});
});

router.post('/submit', function(req,res)
{
  req.body.submitquizobj.Date = new Date().toISOString()
  SubmittedQuizcollection.insert(req.body.submitquizobj,function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});

module.exports = router;

