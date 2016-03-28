var mongoose = require('mongoose');
var fs = require('fs');

// Connect mongoose to MongoDB
mongoose.connect('mongodb://localhost/smartmeter');
mongoose.connection.on('error', function(err) {
    console.log('Mongo connection error' + err);
});

// Load models
fs.readdirSync('../models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require('../models/' + filename)
});

var Measurement = mongoose.model('measurement');


// Measurement.findOne({date: { $gt: new Date('01/01/2016') }}, function(err,obj) { console.log(obj); });
// Measurement.findOne({date: { $gt: new Date('2016-01-01') }}, function(err,obj) { console.log(obj); });
// function findOne (conditions, fields, options, callback) 
// forever start -c nodemon main.js 

// forever -c nodemon --exitcrash app.js
// this makes sure nodemon actually exits (rather than giving you the "app crashed" message) and then forever picks it up again.

var date = new Date('2016-12-31');

// Measurement.findOne({date: { $lte: new Date(date)}
//     }, function(err, secondMeasurement) { 
//         if(err) {
//             console.log('err: ' + err);
//         }
//         console.log(secondMeasurement);
//     }
// );

// Measurement.findOne({date: { $lte: new Date(date)}}).sort({date: -1}).exec(function(err, secondMeasurement) {
// 	if(err) {
// 	    console.log('err: ' + err);
// 	}
// 	console.log(secondMeasurement); 
// });

// function findOne (conditions, fields, options, callback)
Measurement.findOne({date: { $lte: new Date(date)}}, {}, { sort: { 'date' : -1 } }, function(err, post) {
  console.log( post );
});