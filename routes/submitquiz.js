
var express = require('express');
var router = express.Router();
var monk = require('monk');

var db = monk('61.94.163.236:27017/Quiz_db');
// var db = monk('192.168.1.99:27017/Quiz_db');
// var db = monk('localhost:27017/Quiz_db');

var SubmittedQuizcollection = db.get('SubmittedQuiz_Collection');
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

router.post('/submit/init',function(req, res) {
  var paramobj = req.body._username != "" ? {"Username":req.body._username}:{};
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
  req.body.submitquizobj.Date = new Date().toISOString()
  SubmittedQuizcollection.insert(req.body.submitquizobj,function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});

module.exports = router;

