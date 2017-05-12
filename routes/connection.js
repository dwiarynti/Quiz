

var mongo = require('mongodb');
var monk = require('monk');
// var db = monk('escuser:esc123@ds133331.mlab.com:33331/quiz_db');
var db = monk('192.168.1.99:27017/Quiz_db');

module.exports = db;