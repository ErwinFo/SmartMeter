
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