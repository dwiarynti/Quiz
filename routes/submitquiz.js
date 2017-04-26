
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var SubmittedQuizcollection = db.get('SubmittedQuiz_Collection');
// var Choicescollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;
var ISODate = require('mongodb').ISODate;

// router.get('/choices/:_id',function(req, res) {
//     var id= ObjectId(req.params._id);
// 	Choicescollection.find({"Questions_id":id, "isActive":true}, function(err, books){
// 		if(err) {res.json(500, err);}
// 		else
//         { 
//           res.json({'Obj': books});
//           // res.send(books);
//         }
// 	});
// });

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

