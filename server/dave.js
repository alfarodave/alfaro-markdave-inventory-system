import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO WORLD!');
});

app.get('/home', (req, res) => {
    res.send('THIS IS A SAMPLE HOME');
});

app.get('/author', (req, res) => {
    res.send('ALFARO,MARKDAVE');
});

app.get('/contact', (req, res) => {
    res.send('davealfaro233@gmail.com');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});