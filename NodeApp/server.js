var mysql      = require('mysql');
var connection = mysql.createConnection({
<<<<<<< HEAD
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
=======
  host     : 'localhost',
  user     : 'erwin',
  password : '1234',
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  console.log("connected");
});

var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
  // Neat!
});
console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
>>>>>>> fa32240887b69b0700de45955a389147507f97a2
