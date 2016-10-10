/*
    Express app
*/
var express = require('express');
var app = express();

/*
    Load configurations
*/
var config = require('./config/config');

/*
    Middlewares
*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

/*
    Route handlers
*/
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
// var register = require('./routes/register');

/*
    view engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
    Stacking middlewares
*/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session(config.session));

/*
    Assign route handlers
*/
app.use('/', index);
app.use('/logout', logout);
app.use('/login', login);
// app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

    //
    // SOURCES:
    // HTML+JS integration for API.AI : https://gist.github.com/artemgoncharuk/b31b6a656c954a2866e8
    // BOOTSTRAP : http://bootstrapdocs.com/v3.0.3/docs/getting-started/
