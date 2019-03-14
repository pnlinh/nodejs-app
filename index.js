const express = require('express');
const app = express();
const PORT = 3000;
// Router
const systemInfo = require('./routes/systeminfo');

app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    res.send('<h1 style="color: red">Hello Nodejs</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>This is about page</h1>');
});

app.use('/systemInfo', systemInfo);