// forever start -c nodemon main.js
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

// at some point implement weeks
// in all cases implement real time date.
// 
app.get('/calculatedmeasurement/:date', function(req, res) {

    var Measurement = mongoose.model('measurement');

    var dateMostEarliest;
    var dateMostRecent;
    var sort;

    /*
    *   Check if the param is larger than var today
    */
    var today = new Date();

    // Year, get most recent and latest for given year
    if(req.params.date.length === 4){

        var addYear = parseInt(req.params.date) + 1;
        dateMostEarliest = req.params.date + '-01-01';
        dateMostRecent = addYear + '-01-01';

    // Month, get most recent and latest for given month
    } else if(req.params.date.length === 7){
        
        var year = parseInt(req.params.date.substring(0,4));
        var month = parseInt(req.params.date.substring(5,7));

        if(month == 12){
            year = year + 1;
            month = 1;
        } else {
            month = month + 1;
        }
        
        dateMostEarliest = req.params.date + '-01';
        dateMostRecent = year.toString() + '-' +  month.toString();

    // Day, get most recent and latest for given day
    } else if(req.params.date.length === 10){
        
        var year = req.params.date.substring(0,4);
        var month = req.params.date.substring(5,7);
        
        dateMostEarliest = req.params.date;
        dateMostRecent = req.params.date;

        var newDate = new Date(dateMostRecent);
        newDate.setDate(newDate.getDate() + 1);

        dateMostRecent = newDate;

        console.log('NewDate updated' + newDate);
    } else {
        res.send('Wrong input, should be:     \n' + 
            '- /calculatedmeasurement/YYYY    \n' +
            '- /calculatedmeasurement/YYYY-MM \n '+
            '- /calculatedmeasurement/YYYY-MM-DD');
    }

    //gte greater than or equals to
    Measurement.findOne({dateTime: { $gte: new Date(dateMostEarliest)}
        }, function(err, firstMeasurement) { 
            if(err) {
                console.log('err: ' + err);
            }
            // Nest, when the first one is done, find the second one.
            Measurement.findOne({dateTime: { $gte: new Date(dateMostRecent)}
                }, function(err, secondMeasurement) {
                if(err) {
                    console.log('err: ' + err);
                }
                res.json({ dateMostEarliest: firstMeasurement, dateMostRecent: secondMeasurement });        
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
