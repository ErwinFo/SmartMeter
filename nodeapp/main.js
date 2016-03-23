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
mongoose.connection.on('error', function(err) {
    console.log('Mongo connection error' + err);
});

// Load models
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// '* * * * * *' - runs every second
// '*/5 * * * * *' - runs every 5 seconds
// '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
// '0 * * * * *' - runs every minute
// '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)
// '0 */5 * * * *' - runs every 5 minutes
// '0 0 */2 * * *' '

var cron = '0 */5 * * * *';

try {
    console.log('Starting Cron job');
    new CronJob(cron, function() {

            var date = new Date();
            console.log('Cron Job ' + cron + ' ' + date);
            console.log('Minutes: ' + date.getMinutes());

            if(date.getMinutes() === 00){
                console.log('Whole hour: ' + date.getHours() + ':' + date.getMinutes());
                processData.openSerialPort();
            }

        }, function() {
            console.log('Something bad happened');
        },
        true, // run directly
        'Europe/Amsterdam');
} catch(ex) {
    console.log("cron pattern not valid");
}

/*
 * Find specific measurements with a supplied date.
 */
app.get('/measurements/:date', function(req, res) {

    var date = new Date(req.params.date);

    mongoose.model('measurement').find({
        date: date
    }, function(err, measurement) {
        if(err) {
            console.log('err: ' + err);
        }
        // console.log('measurement: ' + measurement);
        res.send(measurement);
    });
});

app.get('/measurements', function(req, res) {
    mongoose.model('measurement').find(function(err, measurement) {
        res.send(measurement);
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000 at:' + new Date());
});