
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var Questioncollection = db.get('Question_Collection');
var Subjectcollection = db.get('Subject_Collection');
var ObjectId = require('mongodb').ObjectID;

router.get('/questions/:_id',function(req, res) {
    var id= ObjectId(req.params._id);
    
	Questioncollection.find({"Subject_id":id, "isActive":true}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});
router.post('/questions', function(req,res)
{
    var id= ObjectId("58f5aa02a749fb2af14c0059");
    var obj = {"Question":req.body.Question,"Subject_id":ObjectId(req.body.Subject_id),"Choices":[], "isActive":true} ;
    var returnQuestion = {};
    var _id ="";
    //insert question
    Questioncollection.insert(obj,function(err, books)
    {
      if(err) {res.json(500,err)}
      else 
      {
        returnQuestion = books;
        var questionid = returnQuestion._id.toHexString();
        _id = questionid;

        //update subject
        Subjectcollection.update({_id:ObjectId(req.body.Subject_id)},{$push:{Questions:ObjectId(_id)}},function(err, subject){
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

router.get('/questions/getby/:_id',function(req, res) {
	Questioncollection.findOne({"_id":req.params._id}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});

router.post('/questions/Update/', function(req,res)
{ 
  Questioncollection.update({'_id':req.body._id},{
    $set : { 'Question':req.body.question}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});

router.post('/questions/Delete/', function(req,res)
{ 
 Questioncollection.update({'_id':req.body._id},{
    $set : { 'isActive':false}
    },function(err) {
     if(err) res.json(500,err)
     else{
       //update subject
       Subjectcollection.update({_id:ObjectId(req.body.Subject_id)},{$pull:{Questions:ObjectId(req.body._id)}},function(err, books){
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

