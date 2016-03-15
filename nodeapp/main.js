var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var processData = require('./processdata.js');
var app = express();
var CronJob = require('cron').CronJob;

// Set port for express
app.set('port', process.env.PORT || 3000);

// Connect mongoose to MongoDB
mongoose.connect('mongodb://localhost/smartmeter');
mongoose.connection.on('error', function (err) {
    console.log('Mongo connection error' + err);
});

// Load models
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

new CronJob('0 0 * * * *', function() {

    processData.openSerialPort();

}, function() {

    console.log('Something bad happened');

}, 
true, // run directly
'Europe/Amsterdam');

app.get('/measurements', function(req, res) {
  mongoose.model('measurements').find(function(err, measurements) {
    console.log(measurements);
    res.send(measurements);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
