var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'Erwins-MacBook-Pro.local',
  user     : 'bob',
  password : 'secret',
  database : 'smartmeter',

});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});