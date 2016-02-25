/*
  baudrate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: 'none'
*/
/*
var serialport = require("serialport");

serialport.list(function (err, ports) {
   console.log("thisis the list callback");
   ports.forEach(function(port) {
       console.log(port.comName);
       console.log(port.pnpId);
       console.log(port.manufacturer);
   });
 });
 */

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200
}, false); // this is the openImmediately flag [default is true]

serialPort.on('error', function(err) {
  console.log(err); // THIS SHOULD WORK!
});

serialPort.open(function (err) {
  if (err) {
     console.log(err);
     return;
  }
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });  
  serialPort.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });  
});