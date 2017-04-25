
var express = require('express');
var router = express.Router();
var monk = require('monk');
var forEach = require('async-foreach');
var db = monk('192.168.1.99:27017/Quiz_db');
var Questioncollection = db.get('Question_Collection');
var ChoicesCollection = db.get('Choices_Collection');
var ObjectId = require('mongodb').ObjectID;
var DataChoice =[];


function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
}
router.get('/quiz',function(req, res) {
 
	Questioncollection.find({"isActive":true}, function(err, quiz){
		if (err) res.json(500, err);
		else 
    var randomed = shuffle(quiz);
    var count = randomed.length;
    for(var i = 0; i < count; i++)
    {

      var id = randomed[i]._id.toHexString();   
      get(id,function(data)
      {
        randomed[i].Choice = data; 
       
      });
    }
  
     res.json({"obj": randomed});
	});
});




function get(QuestionId, callback){
  var obj;
  var id = QuestionId.toHexString();
  ChoicesCollection.find({"Questions_id":id, "isActive":true}).then(function (docs) {
    var a = JSON.stringify(docs);
      obj = a;
      callback(obj);
    }); 
}





module.exports = router;