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

function openSerialPort(){
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

                // replace close with timout of 1 hour
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
}

function obtainMeasurement(message) {

    var dateElectric;
    var deviceElectric;
    var meter181kWh;
    var meter281kWh;
    var meter182kWh;
    var meter282kWh;
    var tariff;
    var powerDeliveredKw;
    var powerReceivedKw;
    var powerFailures;
    var powerFailuresLong;
    var deviceGas;
    var dateGas;
    var gasMeasurementm3;

    var replace = '[\\s()*kWh?]';

    var convertedMessage = [];

    for(var i = 0; i < message.length; i++) {
        if(startsWith(message[i], '0-0:1.0.0')) {
            // Date
            message[i] = message[i].replace('0-0:1.0.0', '');
            message[i] = replaceAll(message[i], replace, '');
            
            dateElectric = convertToTimeStamp(message[i]);

            convertedMessage.push({'dateElectric' : dateElectric});
            
        } else if(startsWith(message[i], '0-0:96.1.1')) {
            // Equipment identifier
            message[i] = message[i].replace('0-0:96.1.1', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceElectric = message[i];

            convertedMessage.push({'deviceElectric' : deviceElectric});

        } else if(startsWith(message[i], '1-0:1.8.1')) {
            // Meter Reading electricity delivered to client (Tariff 1)
            message[i] = message[i].replace('1-0:1.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter181kWh = message[i];

            convertedMessage.push({'meter181kWh' : Number(meter181kWh)});
            
        } else if(startsWith(message[i], '1-0:2.8.1')) {
            // Meter Reading electricity delivered by client (Tariff 1)
            message[i] = message[i].replace('1-0:2.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter281kWh = message[i];
            
            convertedMessage.push({'meter281kWh' : Number(meter281kWh)});

        } else if(startsWith(message[i], '1-0:1.8.2')) {
            // Meter Reading electricity delivered to client (Tariff 2)
            message[i] = message[i].replace('1-0:1.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter182kWh = message[i];

            convertedMessage.push({'meter182kWh' : Number(meter182kWh)});

        } else if(startsWith(message[i], '1-0:2.8.2')) {
            // Meter Reading electricity delivered by client (Tariff 2)
            message[i] = message[i].replace('1-0:2.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter282kWh = message[i];
            
            convertedMessage.push({'meter282kWh' : Number(meter282kWh)});

        } else if(startsWith(message[i], '0-0:96.14.0')) {
            // Tariff indicator electricity. The tariff indicator can be used to switch tariff dependent loads e.g boilers.
            // This is responsibility of the P1 user
            message[i] = message[i].replace('0-0:96.14.0', '');
            message[i] = replaceAll(message[i], replace, '');
            tariff = message[i];

            convertedMessage.push({'tariff' : Number(tariff)});
            
        } else if(startsWith(message[i], '1-0:1.7.0')) {
            // Actual electricity power delivered (+P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:1.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerDeliveredKw = message[i];
            
            convertedMessage.push({'powerDeliveredKw' : Number(powerDeliveredKw)});

        } else if(startsWith(message[i], '1-0:2.7.0')) {
            // Actual electricity power received (-P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:2.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerReceivedKw = message[i];
            
            convertedMessage.push({'powerReceivedKw' : Number(powerReceivedKw)});

        } else if(startsWith(message[i], '0-0:96.7.21')) {
            // Number of power failures in any phases
            message[i] = message[i].replace('0-0:96.7.21', '');
            message[i] = replaceAll(message[i], replace, '');
            powerFailures = message[i];
            
            convertedMessage.push({'powerFailures' : Number(powerFailures)});

        } else if(startsWith(message[i], '0-0:96.7.9')) {
            // Number of long power failures in any phases
            message[i] = message[i].replace('0-0:96.7.9', '');
            message[i] = replaceAll(message[i], replace, '');
            powerFailuresLong = message[i];
            
            convertedMessage.push({'powerFailuresLong' : Number(powerFailuresLong)});

        } else if(startsWith(message[i], '0-1:96.1.0')) {
            // Equipment identifier
            message[i] = message[i].replace('0-1:96.1.0', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceGas = message[i];
            
            convertedMessage.push({'deviceGas' : deviceGas});

        } else if(startsWith(message[i], '0-1:24.2.1')) {
            // Gas measurement
            message[i] = message[i].replace('0-1:24.2.1', '');
            message[i] = replaceAll(message[i], replace, '');

            var dateString = message[i].substring(0, 12);
            dateGas = convertToTimeStamp(dateString);

            message[i] = message[i].replace(dateString, '');
            gasMeasurementm3 = message[i].substring(0, 9);

            convertedMessage.push({'dateGas' : dateGas});
            convertedMessage.push({'gasMeasurementm3' : Number(gasMeasurementm3)});

            console.log(convertedMessage);

            return convertedMessage;
        }
    }
}

/**
* Expose methods to other files
*/
module.exports = {
    openSerialPort: function(){
        openSerialPort();
        console.log('Opening serialport...');
    }
}

/*
*   Helper functions
*/
function convertToTimeStamp(date){
    // Dates are formatted in YYMMDDHHMMSS 
    // Example 160301083129
    return new Date(2000 + +date.substr(0, 2),
                            date.substr(2, 2) - 1,
                            date.substr(4, 2),
                            date.substr(6, 2),
                            date.substr(8, 2),
                            date.substr(10, 2)).getTime();
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
