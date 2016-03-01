var db = require('./database');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort; // localize object constructor
var message = [];

var sp = new SerialPort('/dev/ttyUSB0', {
    baudrate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    parser: serialport.parsers.readline('\n')
}, false); // this is the openImmediately flag [default is true]

sp.on('error', function(err) {
    console.log(err);
});

sp.open(function(err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('open\n');

    sp.on('data', function(data) {

        data = data.replace(/\u0000/g, '');
        data = data.replace(/\r/g, '');

        if(data != '') {
            message.push(data);
        }

        if(data.charAt(0) === '!') {
            console.log('Done');
            sp.close();
            obtainMeasurement(message);
        }
    });

    sp.write('ls', function(err, results) {
        if(err) {
            console.log('err ' + err);
        }
    });
});

function obtainMeasurement(message) {

    var dateElectric;
    var deviceElectric;
    var meter181;
    var meter281;
    var meter182;
    var meter282;
    var tariff;
    var powerDeliveredKw;
    var powerReceivedKw;
    var powerFailures;
    var longPowerFailures;
    var deviceGas;
    var dateGas;
    var gasMeasurement;

    var replace = '[\\s()*kWh?]';

    for(var i = 0; i < message.length; i++) {
        if(startsWith(message[i], '0-0:1.0.0')) {
            // Date
            message[i] = message[i].replace('0-0:1.0.0', '');
            message[i] = replaceAll(message[i], replace, '');
            dateElectric = message[i];
			// output 160301083129
			// 		  YYMMDDHHMMSS
			
			var newDate = new Date(2000 + +message[i].substr(0, 2),
								message[i].substr(2, 2) - 1,
								message[i].substr(4, 2),
								message[i].substr(6, 2),
								message[i].substr(8, 2),
								message[i].substr(10, 2));
								
            console.log('Date: ' + newDate);
        } else if(startsWith(message[i], '0-0:96.1.1')) {
            // Equipment identifier
            message[i] = message[i].replace('0-0:96.1.1', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceElectric = message[i];
            console.log('Equipment ID: ' + deviceElectric);
        } else if(startsWith(message[i], '1-0:1.8.1')) {
            // Meter Reading electricity delivered to client (Tariff 1)
            message[i] = message[i].replace('1-0:1.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter181 = message[i];
            console.log('Mtr Read 181: ' + meter181);
        } else if(startsWith(message[i], '1-0:2.8.1')) {
            // Meter Reading electricity delivered by client (Tariff 1)
            message[i] = message[i].replace('1-0:2.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter281 = message[i];
            console.log('Mtr Read 281: ' + meter281);
        } else if(startsWith(message[i], '1-0:1.8.2')) {
            // Meter Reading electricity delivered to client (Tariff 2)
            message[i] = message[i].replace('1-0:1.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter182 = message[i];
            console.log('Mtr Read 182: ' + meter182);
        } else if(startsWith(message[i], '1-0:2.8.2')) {
            // Meter Reading electricity delivered by client (Tariff 2)
            message[i] = message[i].replace('1-0:2.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter282 = message[i];
            console.log('Mtr Read 282: ' + meter282);
        } else if(startsWith(message[i], '0-0:96.14.0')) {
            // Tariff indicator electricity. The tariff indicator can be used to switch tariff dependent loads e.g boilers.
            // This is responsibility of the P1 user
            message[i] = message[i].replace('0-0:96.14.0', '');
            message[i] = replaceAll(message[i], replace, '');
            tariff = message[i];
            console.log('Tariff: ' + tariff);
        } else if(startsWith(message[i], '1-0:1.7.0')) {
            // Actual electricity power delivered (+P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:1.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerDeliveredKw = message[i];
            console.log('Pwr del: ' + powerDeliveredKw);
        } else if(startsWith(message[i], '1-0:2.7.0')) {
            // Actual electricity power received (-P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:2.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerReceivedKw = message[i];
            console.log('Pwr rec: ' + powerReceivedKw);
        } else if(startsWith(message[i], '0-0:96.7.21')) {
            // Number of power failures in any phases
            message[i] = message[i].replace('0-0:96.7.21', '');
            message[i] = replaceAll(message[i], replace, '');
            powerFailures = message[i];
            console.log('Pwr failures' + powerFailures);
        } else if(startsWith(message[i], '0-0:96.7.9')) {
            // Number of long power failures in any phases
            message[i] = message[i].replace('0-0:96.7.9', '');
            message[i] = replaceAll(message[i], replace, '');
            longPowerFailures = message[i];
            console.log('Lng pwr fail: ' + longPowerFailures);
        } else if(startsWith(message[i], '0-1:96.1.0')) {
            // Equipment identifier
            message[i] = message[i].replace('0-1:96.1.0', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceGas = message[i];
            console.log('Equipment ID: ' + deviceGas);
        } else if(startsWith(message[i], '0-1:24.2.1')) {
            // Gas measurement
            message[i] = message[i].replace('0-1:24.2.1', '');
            message[i] = replaceAll(message[i], replace, '');

            var dateString = message[i].substring(0, 12);
            dateGas = dateString;

            message[i] = message[i].replace(dateString, '');
            gasMeasurement = message[i].substring(0, 9);

            console.log('Gas measurement: ' + gasMeasurement);
        }
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function startsWith(str, prefix) {
    if(str.length < prefix.length)
        return false;
    for(var i = prefix.length - 1;
        (i >= 0) && (str[i] === prefix[i]); --i)
        continue;
    return i < 0;
}
