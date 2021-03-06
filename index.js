const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    limits: {fileSize: 105 * 1024 * 1024} // Limit 150mb
}));

const path = require('path');
const PORT = 3000;
// Set view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'javascripts')));

// Router
const systemInfo = require('./routes/systeminfo');
const redirectRoute = require('./routes/redirect');
const books = require('./routes/books');
const files = require('./routes/files');
const users = require('./routes/users');
const tasks = require('./routes/tasks');

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
app.use('/files', files);
app.use('/users', users);
app.use('/tasks', tasks);

app.use((req, res) => {
    const http404File = path.join(__dirname)+'/404.html';

    res.status(404).sendFile(http404File);
});