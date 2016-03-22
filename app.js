var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongoose=require('mongoose');
var session=require('express-session');
var mongoStore = require('connect-mongo')(session);
var multipart=require('multipart');
var fs = require('fs');
var app = express();
mongoose.connect("mongodb://127.0.0.1:27017/MyKit");
// uncomment after placing your favicon in /src
//app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
// models loading

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'MyKit',
    store: new mongoStore({
        url: "mongodb://127.0.0.1:27017/MyKit",
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'src')));
routes(app);
app.use('/*', function(req, res){
  res.sendfile(__dirname + '/src/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace




module.exports = app;
