
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('Quiz_Collection');


router.get('/subjects',function(req, res) {
	collection.find({}, function(err, subjects){
		if (err) res.json(500, err);
		else res.json({"obj": subjects});
	});
});
router.post('/subjects', function(req,res)
{
  collection.insert({
    SubjectName: req.body.SubjectName,
    Questions : []
  },function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});
router.post('/subjects/:_id', function(req,res)
{ 
  collection.update({_id:req.params._id},{
    SubjectName:req.body.SubjectName
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});

router.get('/subjects/:_id',function(req,res)
{
  collection.findOne({_id:req.params._id},function(err,subjects)
  {
    if(err) res.json(500,err);
    else
    res.json({success:true, "obj":subjects});
  });
});

router.post('/subjects/:_id', function(req,res)
{ 
  collection.remove({_id:req.params._id},function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});


module.exports = router;

