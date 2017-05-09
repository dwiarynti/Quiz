var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'), OAuthStrategy = require('passport-oauth').OAuthStrategy;;
var LocalStrategy = require('passport-local').Strategy;
var expresssession = require('express-session');
var esnsureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var index = require('./routes/index');
var users = require('./routes/users');
var subjects = require('./routes/subjects');
var questions = require('./routes/questions');
var quiz = require('./routes/quiz');
var choices = require('./routes/choices');
var submitquiz = require('./routes/submitquiz');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', index);
app.use('/api', users);
app.use('/api',subjects);
app.use('/api',questions);
app.use('/api',quiz);
app.use('/api',choices);
app.use('/api',submitquiz);
app.get('/', function(req, res){
  res.sendfile('index.html',{user : req.user});
});


//passport config
var Account = require('./models/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// passport.use('provider', new OAuthStrategy({
//     requestTokenURL: 'https://www.provider.com/oauth/request_token',
//     accessTokenURL: 'https://www.provider.com/oauth/access_token',
//     userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
//     consumerKey: '123-456-789',
//     consumerSecret: 'shhh-its-a-secret',
//     callbackURL: 'https://www.example.com/auth/provider/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     Account.findOrCreate({"username":profile.username}, function(err, user) {
//       done(err, user);
//     });
//   }
// ));
//conncet to database

// mongoose.connect('mongodb://61.94.163.236:27017/Quiz_db');
// mongoose.connect('mongodb://192.168.1.99:27017/Quiz_db');
mongoose.connect('mongodb://escuser:esc123@ds133331.mlab.com:33331/quiz_db');

// mongoose.connect('mongodb://localhost:27017/Quiz_db');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;