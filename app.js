var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petStore', { useMongoClient: true });

var app = express();

app.io = require('socket.io')();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//require("./tests/customer_crud_tests.js");
//require("./tests/aggregate_test.js");

//// Nuevas Rutas van aqui:
//const customers = require('./routes/customers')(router);
//const pets = require('./routes/pets')(router);

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/customers'));
app.use('/api', require('./routes/pets'));
app.use('/api', require('./routes/appointments'));

require("./routes/socketio-manager.js")(app.io);

//Front End: SPA with Angular + HTML5 urls
app.all("*", (req, res) => {
	res.sendFile(path.resolve("public/index.html"));
})

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

  // log the error
  console.error(err)
  res.sendStatus(err.status || 500);
});

module.exports = app;
