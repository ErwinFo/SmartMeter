var mysql = require('mysql');

var Singleton = (function () {
    var connection;
 
    function createConnection() {
        var connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : 'test1234',
			database : 'smartmeter'
		});	
        return connection;
    }
 
    return {
        getConnection: function () {
            if (!connection) {
                connection = createConnection();
            }
            return connection;
        }
    };
})();

function createDatabase(){

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'test1234',
	});	

	connection.connect();
	connection.query('CREATE DATABASE IF NOT EXISTS smartmeter', function(err) {
	    if (err) throw err;
	    if (err != null) {
	        console.log('DB smartmeter creation error: ' + err);
	    } 
	});
	connection.end();

	var connection = Singleton.getConnection();
	connection.connect();

	console.log('Connected to smartmeter database')

	connection.query('CREATE TABLE IF NOT EXISTS measurements'
	+ '( id                 INTEGER         NOT NULL AUTO_INCREMENT'
	+ ', date               DATE        '
	+ ', time               TIMESTAMP   '
	+ ', dateElectric       DATE        '
	+ ', deviceElectric     VARCHAR(100)'
	+ ', meter181kWh        NUMERIC(8,3)'
	+ ', meter281kWh        NUMERIC(8,3)'
	+ ', meter182kWh        NUMERIC(8,3)'
	+ ', meter282kWh        NUMERIC(8,3)'
	+ ', tarif              VARCHAR(100)'
	+ ', powerDeliveredKw   NUMERIC(5,0)'
	+ ', powerReceivedKw    NUMERIC(5,0)'
	+ ', powerFailures      VARCHAR(100)'
	+ ', longPowerFailures  VARCHAR(100)'
	+ ', deviceGas          VARCHAR(100)'
	+ ', dateGas            DATE        '
	+ ', gasMeasurementm3   NUMERIC(8,3)'
	+ ', PRIMARY KEY (id)'
	+ ')', 
	function(err) {
	  	if(err) throw err;
	  	if(err != null){
			console.log('DB smartmeter creation error: ' + err);  
			} else {
				console.log('DB smartmeter created');
			}
	});
		
	connection.query('INSERT INTO measurements (date) VALUES (CURRENT_DATE)',

	function(err) {
	  	if(err) throw err;
	  	if(err != null){
			console.log('DB price_per_period creation error: ' + err);  
  		} else {
  			console.log('DB price_per_period created');
  		}
	});
		
	connection.query('CREATE TABLE IF NOT EXISTS price_per_period'
	+ '( id                     INTEGER         NOT NULL AUTO_INCREMENT'
	+ ', start                  DATE            NOT NULL'
	+ ', end                    DATE            NOT NULL'
	+ ', provider_name          VARCHAR(100)	NOT NULL'
	+ ', priceElectricPeak      NUMERIC(8,3)'
	+ ', priceElectricOffPeak   NUMERIC(8,3)'
	+ ', PRIMARY KEY (id)'
	+ ')', 
	function(err) {
	  	if(err) throw err;
	  	if(err != null){
			console.log('DB price_per_period creation error: ' + err);  
  		} else {
  			console.log('DB price_per_period created');
  		}
	});
}

/*
connection.query('SELECT * FROM measurements', req.params.id, function(err, rows, fields) {
        res.json('.. assume you translated your database response a javascript object .. ')
        connection.release();
    });
*/

/**
* Expose methods to other files
*/
module.exports = {
	getConnection: function(){
		return Singleton.getConnection();
		console.log('Got singletond connection');
	},
	createDB: function(){
		createDatabase();
		console.log('Done');
	}
}
