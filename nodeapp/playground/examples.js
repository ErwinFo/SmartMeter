
var serialport = require('serialport');

serialport.list(function (err, ports) {
   console.log('thisis the list callback');
   ports.forEach(function(port) {
       console.log(port.comName);
       console.log(port.pnpId);
       console.log(port.manufacturer);
   });
 });
 // console.log(Object.prototype.toString.call(data));
 
 // a GET request = a database READ or (a.k.a SELECT)
app.get('/measurements', function(req, res) {
    var connection = database.getConnection();

    connection.query('SELECT * FROM measurements', req.params.id, function(err, rows, fields) {

        res.send({
            result: 'success',
            err: '',
            // fields: fields,
            json: rows,
            length: rows.length
        });
    });
});

var dataTest = { 'dateElectric': 1457262943000 
              ,'deviceElectric': '4530303034303031353733393431363134'
              ,'meter181kWh': '001709.321'
              ,'meter281kWh': '000000.000'
              ,'meter182kWh': '002146.860'
              ,'meter282kWh': '000000.000'
              ,'tariff': 1
              ,'powerDeliveredKw': '00.241'
              ,'powerReceivedKw': '00.000'
              ,'powerFailures': 2
              ,'powerFailuresLong': 0
              ,'deviceGas': '4730303233353631323233353431363134'
              ,'dateGas': 1457262000000
              ,'gasMeasurementm3': '03208.999' };
			  
			  
// define our function with the callback argument
function some_function(arg1, arg2, callback) {
    // this generates a random number between
    // arg1 and arg2
    var my_number = Math.ceil(Math.random() *
        (arg1 - arg2) + arg2);
    // then we're done, so we'll call the callback and
    // pass our result
    callback(my_number);
}

// call the function
some_function(5, 15, function(num) {
    // this anonymous function will run when the
    // callback is called
    console.log("callback called! " + num);

});


var cron = require('cron');
var cronJob = cron.job("0 */10 * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    console.info('cron job completed');
}); 
cronJob.start();