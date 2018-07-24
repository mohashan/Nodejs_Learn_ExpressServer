const express = require('express');
const path = require('path');

const app = express();

// to create a virtual path to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log('new Request Received to : ' + req.url);
    req.ReceivedTimer = new Date();
    next();
});



app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
    next();
});

app.use((req) => {
    console.log('Reponse Processed in(ms) : ' + ((new Date()) - (req.ReceivedTimer?req.ReceivedTimer:(new Date()))).toString());
});

app.use(function (err, req, res, next) {
    console.log('Reponse Processed in(ms) : ' + ((new Date()) - req.ReceivedTimer).toString());

    console.error(err);
    res.end('An Error Has Occured');
});

app.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server is created on port 3000');
});

