
var express = require('express');
var router = express.Router();


// var db = monk('61.94.163.236:27017/Quiz_db');
// var db = monk('192.168.1.99:27017/Quiz_db');
var db = require('./connection');

// var db = monk('localhost:27017/Quiz_db');

var Questioncollection = db.get('Question_Collection');
var Subjectcollection = db.get('Subject_Collection');
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

router.get('/questions/:_id',ensureAuthenticated,function(req, res) {
    var id= ObjectId(req.params._id);
  if(req.user.role == "admin")
  {
	Questioncollection.find({"Subject_id":id, "isActive":true}, function(err, questions){
		if(err) {res.json(500, err);}
		else
    { 
      res.json({'Obj': questions ,"authorize":true ,role:req.user.role});
    }
	  });
  }
  else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});
router.post('/questions',ensureAuthenticated,function(req,res)
{
  
    //question obj
    req.body.questionobj._id = ObjectId();
    req.body.questionobj.Subject_id = ObjectId(req.body.questionobj.Subject_id);

    //choices obj
    for(var i = 0; i < req.body.choicesobj.length; i++){
      var choicesobj = req.body.choicesobj[i];
      choicesobj._id = ObjectId();
      choicesobj.Questions_id = req.body.questionobj._id;
      req.body.questionobj.Choices.push(choicesobj._id);
    }
    // req.body.choicesobj

    var obj = req.body.questionobj;
    var returnQuestion = {};
    var _id ="";
    //insert question
    if(req.user.role == "admin")
    {
    Questioncollection.insert(obj,function(err, books)
    {
      if(err) {res.json(500,err)}
      else 
      {
        returnQuestion = books;
        var questionid = returnQuestion._id.toHexString();
        _id = questionid;

        //update subject
        Subjectcollection.update({_id:ObjectId(req.body.questionobj.Subject_id)},{$push:{Questions:req.body.questionobj.Subject_id}},function(err, subject){
            if(err) {res.json(500,err)}
            else 
            {
              // returnQuestion = books;
              if(req.body.choicesobj.length != 0){
                for(var j = 0; j < req.body.choicesobj.length; j++){
                var choicesobj = req.body.choicesobj[j];
                  
                  Choicescollection.insert(choicesobj,function(err, choices)
                  {
                    // choicesobj
                    // var no = j;
                    if(j == req.body.choicesobj.length)
                      {
                        res.json({success:true});  
                        // break;                                      
                      }
                      
                  });
                  
                }
              }else{
                res.json({success:true});  
              }

              

            };
        });
      };
    });
  }
  else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
  });

router.get('/questions/getby/:_id',ensureAuthenticated,function(req, res) {
  if(req.user.role == "admin")
    {
    var id = ObjectId(req.params._id);
	  Questioncollection.findOne({"_id":id}, function(err, books){
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

router.post('/questions/Update/', ensureAuthenticated,function(req,res)
{ 
  if(req.user.role == "admin")
  {
  Questioncollection.update({'_id':ObjectId(req.body._id)},{
    $set : { 'Question':req.body.question}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
    }
     else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.post('/questions/Delete/',ensureAuthenticated, function(req,res)
{ 
   if(req.user.role == "admin")
    {
 Questioncollection.update({'_id':ObjectId(req.body._id)},{
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
}
 else{
    res.json({"errmsg":"this user is not authorize", "role":req.user.role, "authorize":false});
  }
});

router.get('/questions/getsinglerandom',function(req, res) {
  var data = Questioncollection.find({}).skip(Math.random()*10).limit(1);
  res.json({'Obj': data});
	// Questioncollection.findOne({"_id":req.params._id}, function(err, books){
	// 	if(err) {res.json(500, err);}
	// 	else
  //       { res.json({'Obj': books});
  //       }
	// });
});

	// Choicescollection.find({"Subject_id":id, "isActive":true});

module.exports = router;

