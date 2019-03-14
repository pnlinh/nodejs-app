const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
// Router
const systemInfo = require('./routes/systeminfo');
const redirectRoute = require('./routes/redirect');
const books = require('./routes/books');

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
app.use('/redirectExample', redirectRoute);
app.use('/books', books);

app.use((req, res) => {
    const http404File = path.join(__dirname)+'/404.html';

    res.status(404).sendFile(http404File);
});