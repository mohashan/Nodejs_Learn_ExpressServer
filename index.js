const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// to create a virtual path to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server is created on port 3000');
});