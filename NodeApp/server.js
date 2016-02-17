var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'erwin',
  password : '1234',
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  console.log("connected");
});