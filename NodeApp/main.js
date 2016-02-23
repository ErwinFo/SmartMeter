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

})