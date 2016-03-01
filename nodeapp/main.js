var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var processData = require('./processdata.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/smartmeter');
mongoose.connection.on('error', function (err) {
    console.log('something has gone wrong' + err);
});

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

processData.openSerialPort(mongoose);

app.get('/measurements', function(req, res) {
  mongoose.model('measurements').find(function(err, measurements) {
    console.log(measurements);
    res.send(measurements);
  });
});


app.get('/users', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    console.log(users);
    res.send(users);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
