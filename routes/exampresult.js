
var express = require('express');
var router = express.Router();


// var db = monk('61.94.163.236:27017/Quiz_db');
// var db = monk('192.168.1.99:27017/Quiz_db');
var db = require('./connection');

// var db = monk('localhost:27017/Quiz_db');

var SubmittedQuizcollection = db.get('SubmittedQuiz_Collection');

function ensureAuthenticated (req, res, next) {
  var isAuthenticated  = req.isAuthenticated();
  if (isAuthenticated) { 
      return next();
  }else{
    res.json({"authorize":isAuthenticated});
  }
}
router.get('/exampresult/:_username',function(req, res) {
	SubmittedQuizcollection.find({}, function(err, data){
   
		if (err) res.json(500, err);
		else res.json({"obj": data});
	});
  
});
router.post('/subjects/Create/', function(req,res)
{
  collection.insert({
    SubjectName: req.body.SubjectName,
    IsActive : true,
    Questions : []
  },function(err)
  {
    if(err) res.json(500,err)
    else res.json({success : true});
  })
});
router.post('/subjects/Update/:_id', function(req,res)
{ 
  collection.update({'_id':req.params._id},{
    $set : { 'SubjectName':req.body.SubjectName}
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

router.post('/subjects/Delete/:_id', function(req,res)
{ 
 collection.update({'_id':req.params._id},{
    $set : { 'IsActive':false}
    },function(err) {
     if(err) res.json(500,err)
    else res.json({success : true});
  });
});

module.exports = router;

