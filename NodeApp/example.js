// a GET request = a database READ or (a.k.a SELECT)
app.get('/path', function(req, res) {
    connection.query('SELECT * FROM ' + req.params.table + ' ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows, fields) {
        res.json('.. assume you translated your database response a javascript object .. ')
        connection.release();
    });
});

// a POST request = a database CREATE (a.k.a INSERT)
app.post('/path', function(req, res) {
    connection.query('INSERT INTO ' + req.params.table + ' SOME OTHER PARTS OF YOUR SQL QUERY', req.params.id, function(err, rows, fields) {
        res.json('.. assume you translated your database response a javascript object again .. ')
        connection.release();
    });
});

// a PUT request = a database UPDATE
app.put('/path', function(req, res) {
    connection.query('UPDATE ' + req.params.id + ' SOME OTHER PARTS OF YOUR SQL QUERY', req.params.id, function(err, rows, fields) {
        res.json('.. assume you translated your database response a javascript object yet again .. ')
        connection.release();
    });
});

// a DELETE request = a database DELETE
app.delete('/path', function(req, res) {
    connection.query('DELETE FROM ' + req.params.table + ' SOME OTHER PARTS OF YOUR SQL QUERY', req.params.id, function(err, rows, fields) {
        res.json('.. assume you translated your database response a javascript object once again .. ')
        connection.release();
    });
});
