var express = require('express');

var app = express();
app.get('/', function (req, res) {
    res.end('Hello World');
});

app.listen(3000, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Server is created on port 3000');
});
