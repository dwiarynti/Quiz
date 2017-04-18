
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('192.168.1.99:27017/Quiz_db');
var collection = db.get('Quiz_Collection');


router.get('/subjects',function(req, res) {
	collection.find({}, function(err, books){
		if (err) res.json(500, err);
		else res.json(books);
	});
});
router.post('/subjects', function(req,res)
{
  collection.insert({
    SubjectName: req.body.SubjectName,
    Questions : [req.body.Questions]
  },function(err, books)
  {
    if(err) res.json(500,err)
    else res.json(books);
  })
})


module.exports = router;

