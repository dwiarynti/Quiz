
var express = require('express');
var router = express.Router();

var db = require('./connection');

// var db = monk('localhost:27017/Quiz_db');

var SubmittedQuizcollection = db.get('SubmittedQuiz_Collection');
var userCollection = db.get('accounts');

// var Choicescollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;

function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}

//get examp result
router.post('/submit/init',function(req, res) {
  var paramobj = req.body._userid != "" ? {"UserId":ObjectId(req.body._userid)}:{};
	SubmittedQuizcollection.find(paramobj, function(err, data){
   
		if (err) res.json(500, err);
		else{ 
      data.sort(function(a,b){
        return new Date(b.Date) - new Date(a.Date);
      });
      res.json({"obj": data, "authorize":true});      
    };
	});
});

router.post('/submit',ensureAuthenticated, function(req,res)
{
  req.body.submitquizobj.Date = new Date().toISOString();
  // var userid = ObjectId(req.body.submitquizobj.UserId);
  req.body.submitquizobj.UserId = ObjectId(req.body.submitquizobj.UserId);
  console.log(req.body.submitquizobj);
  SubmittedQuizcollection.insert(req.body.submitquizobj,function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});

module.exports = router;

