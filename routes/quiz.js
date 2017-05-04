
var express = require('express');
var router = express.Router();
var monk = require('monk');
var forEach = require('async-foreach');

var db = monk('61.94.163.236:27017/Quiz_db');
// var db = monk('192.168.1.99:27017/Quiz_db');
// var db = monk('localhost:27017/Quiz_db');
var Questioncollection = db.get('Question_Collection');
var ChoicesCollection = db.get('Choices_Collection');
// var Subjectcollection = db.get('Subject_Collection');

var ObjectId = require('mongodb').ObjectID;
var DataChoice =[];

function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}

function shuffle(array) {
        // var currentIndex = array.length, temporaryValue, randomIndex;
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
}

router.get('/quiz/questions/:subject_id',ensureAuthenticated,function(req, res) {
 var subject_id= ObjectId(req.params.subject_id);
	Questioncollection.find({"isActive":true, "Subject_id":subject_id}, function(err, quiz){
		if (err) res.json(500, err);
		else 
     var username = req.user.username;
    var randomed = shuffle(quiz);
    var arr = randomed.slice(0,5)
     res.json({"obj": arr, "username":username});
	});
});

router.get('/quiz/choices/:_id',ensureAuthenticated,function(req,res)
{
  ChoicesCollection.find({"Question_id": req.body._id},function(err,choices)
  {
    if(err) res.json(500,err);
    else
    res.json({success:true, "obj":choices});
  });
});

// router.get('/quiz/getsubject/',function(req,res)
// {
//   Subjectcollection.find({},function(err,choices)
//   {
//     if(err) res.json(500,err);
//     else
//     res.json({success:true, "obj":choices});
//   });
// });

function get(QuestionId, callback){
  var obj;
  var id = QuestionId;
  ChoicesCollection.find({"Questions_id":ObjectId(id), "isActive":true}).then(function (docs) {
    var a = docs;
      obj = a;
      callback(obj);
    }); 
}





module.exports = router;