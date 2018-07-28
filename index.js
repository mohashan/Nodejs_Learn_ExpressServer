const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const productController = require('./controller/productController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// to create a virtual path to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

process.on("unhandledRejection", (err) => {
    console.log(err);
});

app.use(function (req, res, next) {
    console.log('new Request Received to : ' + req.url);
    req.ReceivedTimer = new Date();
    next();
});



app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
    next();
});

app.post('/api/product', productController.add);

app.get('/api/product', productController.get);

app.patch('/api/product', productController.updatePatch);

app.put('/api/product', productController.updatePut);



app.use((req) => {
    console.log('Reponse Processed in : ' + ((new Date()) - req.ReceivedTimer).toString() + ' ms');
});

app.use(function (err, req, res, next) {
    console.log('Reponse Processed in : ' + ((new Date()) - req.ReceivedTimer).toString() + ' ms');

    console.error(err);
    res.end('An Error Has Occured');
});



app.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server is created on port 3000');
});

