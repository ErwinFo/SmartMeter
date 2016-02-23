<<<<<<< HEAD
var express = require("express");
var http = require("http");
var database = require("./database.js");
var app = express();

database.createDB();

// a GET request = a database READ or (a.k.a SELECT)
app.get('/measurements', function(req, res) {
    var connection = database.getConnection();

    connection.query('SELECT * FROM measurements', req.params.id, function(err, rows, fields) {

        res.send({
            result: 'success',
            err: '',
            // fields: fields,
            json: rows,
            length: rows.length
        });
    });
});


var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://localhost", host, port)
=======
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listData', function (req, res) {
   fs.readFile( __dirname + "/" + "2016_01_19.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
>>>>>>> fa32240887b69b0700de45955a389147507f97a2

})