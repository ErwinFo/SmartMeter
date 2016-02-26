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

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var message = "";

var sp = new SerialPort("/dev/ttyUSB0", {
    baudrate: 115200,
	dataBits: 8,
	stopBits: 1,
	parity: 'none',
	parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

sp.on('error', function(err) {
  console.log(err); 
});

sp.open(function (err) {
  if (err) {
     console.log(err);
     return;
  }
  console.log('open');

  sp.on('data', function(data) {
  	console.log(data);
  	message = message.concat(data);

  	
    //console.log('data received: ' + data);
  });

  sp.write("ls", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });  
});