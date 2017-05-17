
var express = require('express');
var router = express.Router();
var db = require('./connection');


var ConfigurationFromcollection = db.get('ConfigurationFrom_Collection');
var ObjectId = require('mongodb').ObjectID;


router.get('/configurationform/',function(req, res) {
	ConfigurationFromcollection.findOne({}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj,"authorize" : true});
        }
	});
});

router.post('/configurationform/create', function(req,res)
{
	for(var i = 0; i < req.body.data.length; i++ )
	{
		var obj = req.body.data[i];
		ConfigurationFromcollection.insert(obj, function(err,data)
		{
		if(i == req.body.data.length)
		{
			res.json({success:true})
		}
		});
	}
});


router.get('/configurationform/init', function(req,res)
{
		ConfigurationFromcollection.find({"formname":"Profile","IsActive" : true}, function(err, obj){
		if(err) {res.json(500, err);}
		else
        { 
          res.json({'Obj': obj, success: true});
        }
	});
});
router.post('/configurationform/update/:_id', function(req,res)
{
	var id = ObjectId(req.params._id);
	ConfigurationFromcollection.update({_id :id},{
		$set :{
			'key': req.body.key,
			'type': req.body.type,
			'templateOptions' : req.body.templateOptions
		}},function(err)
		{
		if(err) res.json(500,err)
      	else res.json({success : true});
		});
});


router.get('/configurationform/:_id',function(req,res)
{
    var id = ObjectId(req.params._id);
    
    ConfigurationFromcollection.findOne({_id:id},function(err,data)
    {
    if(err) res.json(500,err);
    else
    res.json({success:true, "obj":data});
	});
});

router.post('/configurationform/delete/:_id', function(req,res)
{
	var id = ObjectId(req.params._id);
	ConfigurationFromcollection.update({_id :id},{
		$set :{
			'IsActive': false,
		}},function(err)
		{
		if(err) res.json(500,err)
      	else res.json({success : true});
		});
});
    

module.exports = router;