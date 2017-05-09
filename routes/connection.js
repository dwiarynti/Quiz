

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('escuser:esc123@ds133331.mlab.com:33331/quiz_db');
module.exports = db;