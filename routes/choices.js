
var express = require('express');
var router = express.Router();
var monk = require('monk');

//var db = monk('192.168.1.99:27017/Quiz_db');

var db = monk('localhost:27017/Quiz_db');

var Questioncollection = db.get('Question_Collection');
var Choicescollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;

function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}
router.get('/choices/:_id',function(req, res) {
  var id= ObjectId(req.params._id);
  if(req.user.role == "admin")
  {
	Choicescollection.find({"Questions_id":id, "isActive":true}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': books,"authorize" : true});
          // res.send(books);
        }
	});
  }
  else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
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
router.post('/choices',ensureAuthenticated, function(req,res)
{
    // var obj = {"Question":req.body.Question,"Subject_id":ObjectId(req.body.Subject_id),"Choices":[], "isActive":true} ;
    var obj = req.body.choicesObj;
    obj.Questions_id = ObjectId(obj.Questions_id);
    var returnQuestion = {};
    var _id ="";
    //insert question
    if(req.user.role == "admin")
    {
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
  }
 else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
  });

router.get('/choices/getby/:_id',ensureAuthenticated,function(req, res) {
  if(req.user.role == "admin")
  {
	Choicescollection.findOne({"_id":ObjectId(req.params._id)}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
  }
  else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.post('/choices/Update/',ensureAuthenticated, function(req,res)
{
  if(req.user.role == "admin")
  { 
  Choicescollection.update({'_id': ObjectId(req.body._id)},{
    $set : { 'ChoicesName':req.body.ChoicesName,'isCorrectAnswer':req.body.isCorrectAnswer}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
  }
  else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.post('/choices/Delete/', ensureAuthenticated,function(req,res)
{ 
  if(req.user.role == "admin")
  {
 Choicescollection.update({'_id': ObjectId(req.body._id)},{
    $set : { 'isActive':false}
    },function(err) {
     if(err) res.json(500,err)
     else{
       //update subject
       Questioncollection.update({_id:ObjectId(req.body.Questions_id)},{$pull:{Choices:ObjectId(req.body._id)}},function(err, books){
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
}
else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});


module.exports = router;

