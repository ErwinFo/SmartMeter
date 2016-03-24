var fs = require('fs');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var mongoose = require('mongoose');
var active = false;
var message = [];

/* 
 * This function is exported
 */
function openSerialPort() {

    console.log('Opening serialport... at ' + new Date());
    
    try {
        if (!active) {
            active = true;
            
            var serialPort = new SerialPort('/dev/ttyUSB0', {
                baudrate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                parser: serialport.parsers.readline('\n')
            });

            /* 
             * Reads the serial port per line.
             */
            serialPort.on("data", function(data) {
                data = data.replace(/\u0000/g, '');
                data = data.replace(/\r/g, '');

                // if(startsWith(data, '/')){
                //     console.log('startsWith /');
                // }

                // if (data == "" || data == " ") { return; }
                console.log('Data: ' + data);

                if (data !== '') {
                    message.push(data);
                }

                if (data.charAt(0) === '!') {
                    console.log('! found in message');

                    // console.log(message);

                    if (message.length != 25) {
                        console.log('length not 25, but: ' + message.length);
                        message = [];
                        console.log('Is there something left?' + data);
                        // serialPort.flush(function(err,results){});
                        // data = [];
                        console.log('Lenght now: ' + message.length);
                    } else {
                        // convert message to something usefull
                        var msg = obtainMeasurement(message);

                        // load mongoose schema
                        var Measurement = mongoose.model('measurement');
                        var myMeasurement = new Measurement(msg);

                        // Actual save to db.measurements
                        myMeasurement.save(function(err) {
                            if (err){
                               return handleError(err); 
                            } 
                            console.log('msg stored in db' + new Date());
                        });

                        message = [];

                        // close port and sleep for any given time
                        serialPort.close(function(err) {
                            console.log('port closed');
                            if (err) {
                                console.log('Error: ' + err);
                            }
                            active = false;
                        });
                    }
                }
            });
        }
    } catch (e) {
        // Error means port is not available for listening.
        console.log('something went wrong with the serialport');
        if(e){
            console.log(e);
        }
    }
}

/**
 * Expose methods to other files
 */
module.exports = {
    openSerialPort: function() {
        openSerialPort();
    }
}

/*
 *   Helper functions
 */
function convertToTimeStamp(date) {
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
    if (str.length < prefix.length){
        return false;
    }
    for (var i = prefix.length - 1;
        (i >= 0) && (str[i] === prefix[i]); --i){
        continue; 
    }

    return i < 0;
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

    for (var i = 0; i < message.length; i++) {
        if (startsWith(message[i], '0-0:1.0.0')) {
            // Date
            message[i] = message[i].replace('0-0:1.0.0', '');
            message[i] = replaceAll(message[i], replace, '');

            dateElectric = convertToTimeStamp(message[i]);

            convertedMessage['dateElectric'] = dateElectric;

        } else if (startsWith(message[i], '0-0:96.1.1')) {
            // Equipment identifier
            message[i] = message[i].replace('0-0:96.1.1', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceElectric = message[i];

            convertedMessage['deviceElectric'] = deviceElectric;

        } else if (startsWith(message[i], '1-0:1.8.1')) {
            // Meter Reading electricity delivered to client (Tariff 1)
            message[i] = message[i].replace('1-0:1.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter181kWh = message[i];

            convertedMessage['meter181kWh'] = meter181kWh;

        } else if (startsWith(message[i], '1-0:2.8.1')) {
            // Meter Reading electricity delivered by client (Tariff 1)
            message[i] = message[i].replace('1-0:2.8.1', '');
            message[i] = replaceAll(message[i], replace, '');
            meter281kWh = message[i];

            convertedMessage['meter281kWh'] = meter281kWh;

        } else if (startsWith(message[i], '1-0:1.8.2')) {
            // Meter Reading electricity delivered to client (Tariff 2)
            message[i] = message[i].replace('1-0:1.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter182kWh = message[i];

            convertedMessage['meter182kWh'] = meter182kWh;

        } else if (startsWith(message[i], '1-0:2.8.2')) {
            // Meter Reading electricity delivered by client (Tariff 2)
            message[i] = message[i].replace('1-0:2.8.2', '');
            message[i] = replaceAll(message[i], replace, '');
            meter282kWh = message[i];

            convertedMessage['meter282kWh'] = meter282kWh;

        } else if (startsWith(message[i], '0-0:96.14.0')) {
            // Tariff indicator electricity. The tariff indicator can be used to switch tariff dependent loads e.g boilers.
            // This is reserialPortonsibility of the P1 user
            message[i] = message[i].replace('0-0:96.14.0', '');
            message[i] = replaceAll(message[i], replace, '');
            tariff = message[i];

            convertedMessage['tariff'] = Number(tariff);

        } else if (startsWith(message[i], '1-0:1.7.0')) {
            // Actual electricity power delivered (+P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:1.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerDeliveredKw = message[i];

            convertedMessage['powerDeliveredKw'] = powerDeliveredKw;

        } else if (startsWith(message[i], '1-0:2.7.0')) {
            // Actual electricity power received (-P) in 1 Watt resolution
            message[i] = message[i].replace('1-0:2.7.0', '');
            message[i] = replaceAll(message[i], replace, '');
            powerReceivedKw = message[i];

            convertedMessage['powerReceivedKw'] = powerReceivedKw;

        } else if (startsWith(message[i], '0-0:96.7.21')) {
            // Number of power failures in any phases
            message[i] = message[i].replace('0-0:96.7.21', '');
            message[i] = replaceAll(message[i], replace, '');
            powerFailures = message[i];

            convertedMessage['powerFailures'] = Number(powerFailures);

        } else if (startsWith(message[i], '0-0:96.7.9')) {
            // Number of long power failures in any phases
            message[i] = message[i].replace('0-0:96.7.9', '');
            message[i] = replaceAll(message[i], replace, '');
            powerFailuresLong = message[i];

            convertedMessage['powerFailuresLong'] = Number(powerFailuresLong);

        } else if (startsWith(message[i], '0-1:96.1.0')) {
            // Equipment identifier
            message[i] = message[i].replace('0-1:96.1.0', '');
            message[i] = replaceAll(message[i], replace, '');
            deviceGas = message[i];

            convertedMessage['deviceGas'] = deviceGas;

        } else if (startsWith(message[i], '0-1:24.2.1')) {
            // Gas measurement
            message[i] = message[i].replace('0-1:24.2.1', '');
            message[i] = replaceAll(message[i], replace, '');

            var dateString = message[i].substring(0, 12);
            dateGas = convertToTimeStamp(dateString);

            message[i] = message[i].replace(dateString, '');
            gasMeasurementm3 = message[i].substring(0, 9);

            convertedMessage['dateGas'] = dateGas;
            convertedMessage['gasMeasurementm3'] = gasMeasurementm3;
            convertedMessage['date'] = new Date().setHours(0,0,0,0);
            convertedMessage['dateTime'] = new Date();
        }
    }
    return convertedMessage;
}