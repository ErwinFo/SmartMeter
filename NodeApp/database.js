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