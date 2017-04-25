
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var Questioncollection = db.get('Question_Collection');
var Choicescollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;

router.get('/choices/:_id',function(req, res) {
    var id= ObjectId(req.params._id);
	Choicescollection.find({"Questions_id":id, "isActive":true}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': books});
          // res.send(books);
        }
	});
});



function get(id, callback){
  var obj;
  Choicescollection.find({"Questions_id":id, "isActive":true}).then(function (docs) {
    var a = JSON.stringify(docs);
      obj = a;
      callback(obj);
    });
    // return obj;
}
router.post('/choices', function(req,res)
{
    // var obj = {"Question":req.body.Question,"Subject_id":ObjectId(req.body.Subject_id),"Choices":[], "isActive":true} ;
    var obj = req.body.choicesObj;
    obj.Questions_id = ObjectId(obj.Questions_id);
    var returnQuestion = {};
    var _id ="";
    //insert question
    Choicescollection.insert(obj,function(err, books)
    {
      if(err) {res.json(500,err)}
      else 
      {
        returnQuestion = books;
        var questionid = returnQuestion._id.toHexString();
        _id = questionid;

        //update subject
        Questioncollection.update({_id:ObjectId(obj.Questions_id)},{$push:{Choices:ObjectId(_id)}},function(err, subject){
            if(err) {res.json(500,err)}
            else 
            {
              // returnQuestion = books;
                res.json({success:true});
            };
        });
      };
    });
  });

router.get('/choices/getby/:_id',function(req, res) {
	Choicescollection.findOne({"_id":ObjectId(req.params._id)}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});

router.post('/choices/Update/', function(req,res)
{ 
  Questioncollection.update({'_id':req.body._id},{
    $set : { 'Question':req.body.question}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});

router.post('/choices/Delete/', function(req,res)
{ 
 Questioncollection.update({'_id':req.body._id},{
    $set : { 'isActive':false}
    },function(err) {
     if(err) res.json(500,err)
     else{
       //update subject
       Subjectcollection.update({_id:ObjectId(req.body.Subject_id)},{$pull:{choices:ObjectId(req.body._id)}},function(err, books){
          if(err) {res.json(500,err)}
          else 
          {
            // returnQuestion = books;
              res.json({success:true});
          };
        });
     }
    // else res.json({success : true});
  });
    
});


module.exports = router;

