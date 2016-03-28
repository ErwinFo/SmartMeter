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

var cronOne = '0 */1 * * * *';
var cronFive = '0 */5 * * * *';

try {
    console.log('Starting Cron job');
    new CronJob(cronFive, function() {

            var date = new Date();
            // console.log('Cron Job ' + cron + ' ' + date);
            // console.log('Minutes: ' + date.getMinutes());
            if(date.getMinutes() === 00){
                // console.log('Whole hour: ' + date.getHours() + ':' + date.getMinutes());
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
    var start = new Date(2010, 11, 1);
    var end = new Date(2010, 11, 30);

    db.posts.find({created_on: {$gte: start, $lt: end}});
    //taken from http://cookbook.mongodb.org/patterns/date_range/
 */
app.get('/measurements/:date', function(req, res) {

    var date = new Date(req.params.date);

    mongoose.model('measurement').find({
        date: date
    }, function(err, measurement) {
        if(err) {
            console.log('err: ' + err);
        }
        res.send(measurement);
    });
});

app.get('/calculatedmeasurement/:date', function(req, res) {

    var Measurement = mongoose.model('measurement');

    var dateMostEarliest;
    var dateMostRecent;

    // Year, get most recent and latest for given year
    if(req.params.date.length === 4){

        dateMostEarliest = req.params.date + '-01-01';
        dateMostRecent = req.params.date + '-12-31';
        console.log('4: ' + dateMostRecent);

    // Month, get most recent and latest for given month
    } else if(req.params.date.length === 7){

        var year = req.params.date.substring(0,4);
        var month = req.params.date.substring(5,7);
        
        var nrDaysInDate = new Date(year, month, 0).getDate();

        dateMostEarliest = req.params.date + '-01';
        dateMostRecent = req.params.date + '-' + nrDaysInDate;
        console.log('7: ' + dateMostRecent);

    // Day, get most recent and latest for given day
    } else if(req.params.date.length === 10){

        var year = req.params.date.substring(0,4);
        var month = req.params.date.substring(5,7);
        
        var nrDaysInDate = new Date(year, month, 0).getDate();

        dateMostEarliest = req.params.date;
        dateMostRecent = req.params.date;
        console.log('10: ' + dateMostRecent);

    } else {
        res.send('Wrong input, should be year, year-month, or year-month-day');
    }

    //gte greater than or equals to
    Measurement.findOne({date: { $gte: new Date(dateMostEarliest)}
        }, function(err, firstMeasurement) { 
            if(err) {
                console.log('err: ' + err);
            }
            // Nest, when the first one is done, find the second one.

            console.log('dateMostRecent: ' + dateMostRecent);

            Measurement.findOne({date: { $lte: new Date(dateMostRecent)}}, {}, { sort: { 'date' : -1 } 
                }, function(err, secondMeasurement) {
            if(err) {
                console.log('err: ' + err);
            }
                res.json({ first: firstMeasurement, second: secondMeasurement });        
            });
        }
    );
});

app.get('/measurements', function(req, res) {
    mongoose.model('measurement').find(function(err, measurement) {
        res.send(measurement);
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000 at:' + new Date());
});
