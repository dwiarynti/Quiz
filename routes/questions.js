
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('Question_Collection');
var ObjectId = require('mongodb').ObjectID;

router.get('/questions',function(req, res) {
    var id= ObjectId("58f5aa02a749fb2af14c0059");
	collection.find({"Subject_id":id, "isActive":true}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});
router.post('/questions', function(req,res)
{
    var id= ObjectId("58f5aa02a749fb2af14c0059");
    var obj = {"Question":req.body.Question,"Subject_id":id,"Choices":[], "isActive":true} ;
  collection.insert(obj,function(err, books)
  {
    if(err) {res.json(500,err)}
    else 
    {
        res.json({success:true});
    };
  })
})

router.get('/questions/:_id',function(req, res) {
	collection.findOne({"_id":req.params._id}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});

router.post('/questions/Update/', function(req,res)
{ 
  collection.update({'_id':req.body._id},{
    $set : { 'Question':req.body.question}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});

router.post('/questions/Delete/', function(req,res)
{ 
 collection.update({'_id':req.body._id},{
    $set : { 'isActive':false}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});


module.exports = router;

