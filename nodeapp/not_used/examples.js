
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