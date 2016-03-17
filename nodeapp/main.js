var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var processData = require('./processdata.js');
var app = express();
var CronJob = require('cron').CronJob;

app.use(express.static(process.cwd() + '/public'));
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

/*
.---------------- Minute (0 - 59) 
|  .------------- Hour (0 - 23)
|  |  .---------- Day of month (1 - 31)
|  |  |  .------- Month (1 - 12) 
|  |  |  |  .---- Day of week (0 - 6) (sunday is 0 of 7)
|  |  |  |  |
*  *  *  *  *  commando dat uitgevoerd moet worden
*/
new CronJob('0 0 * * * *', function() {
	processData.openSerialPort();
}, function() {
    console.log('Something bad happened');
}, 
true, // run directly
'Europe/Amsterdam');

console.log('after cron');

/*
*	$eq		Specifies equality condition.
*	$lte 	Less than or equal to (i.e. <=) the specified value.
*	$gte 	Greater than or equal to (i.e. >=) a specified value.
*
*	model.find({"dateElectric": {"eq": new Date(2012, 7, 14) }})
*	mongoose.model('measurements').find({"dateElectric": {"eq": new Date(2012, 7, 14) }}).exec(function (err, measurements) {
*/
app.get('/measurements', function(req, res) {
  mongoose.model('measurements').find(function(err, measurements) {
  
    // console.log(measurements);
    res.send(measurements);
  });
});

console.log('after get');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
