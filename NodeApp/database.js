<<<<<<< HEAD
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
=======
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'erwin',
  password : '1234',
  database : 'smartmeter'
});

// connected! (unless `err` is set)
connection.connect(function(err) {
  console.log("connected");
});

var queryMeasurements = connection.query('CREATE TABLE measurements' 
	+ '( id                 INTEGER         NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1) CONSTRAINT DEVICE_PK PRIMARY KEY'
>>>>>>> fa32240887b69b0700de45955a389147507f97a2
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
<<<<<<< HEAD
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
=======
	, function(err, result) {
	// console.log(err + " " + result);
});

var insertQuery = connection.query('INSERT INTO measurements ' 
	+'( date'             
	+', time'             
	+', dateElectric'     
	+', deviceElectric'   
	+', meter181kWh'    	
	+', meter281kWh'    	
	+', meter182kWh'    	
	+', meter282kWh'    	
	+', tarif'            
	+', powerDeliveredKw' 
	+', powerReceivedKw'  
	+', powerFailures'    
	+', longPowerFailures'
	+', deviceGas'        
	+', dateGas'          
	+', gasMeasurementm3)'
	+ ' VALUES ('         
	+' CURRENT_DATE'      
	+',CURRENT_TIMESTAMP', function(err, result) {
});

console.log(insertQuery.sql);

var querySelect = connection.query('SELECT * FROM measurements', function(err, result) {
});
console.log(querySelect.sql);
>>>>>>> fa32240887b69b0700de45955a389147507f97a2
