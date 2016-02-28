
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
 