import express from 'express';

const app = express();
app.get('/', (req, res) => {
    res.end('Hello World');
});

app.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server is created on port 3000');
});
