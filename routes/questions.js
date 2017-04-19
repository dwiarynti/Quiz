
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('Quiz_Collection');
var ObjectId = require('mongodb').ObjectID;

router.get('/questions',function(req, res) {
    var id= "58f5aa02a749fb2af14c0059";
	collection.findOne({_id:id}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});
router.post('/questions', function(req,res)
{
    var id= "58f5aa02a749fb2af14c0059";
    var obj = {"_id":new ObjectId(),"Question":req.body.Question,"Choices":[]} ;
  collection.update({_id:id},{$push:{Questions:obj}},function(err, books)
  {
    if(err) {res.json(500,err)}
    else 
    {
        res.json({success:true});
    };
  })
})

router.get('/questions/:id',function(req, res) {
	collection.find({},{"Questions":{$elemMatch:{"_id":req.params.id}}}, function(err, books){
		if(err) {res.json(500, err);}
		else
        { res.json({'Obj': books});
        }
	});
});


module.exports = router;

