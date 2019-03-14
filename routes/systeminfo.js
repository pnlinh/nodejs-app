const express = require('express');
let router = express.Router();
const os = require('os');

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    let {type = ''} = req.query;
    switch (type.toLocaleLowerCase()) {
        case 'os':
            const osPlatform = os.platform();
            const osType = os.type();
            res.send(`<h1 style="color: blue">Operating system platform: ${osPlatform}, type: ${osType}</h1>`);
            break;
        case 'framework':
            res.send('<h1 style="color: green">This is Express framework</h1>');
            break;
        case 'date':
            let currentDate = new Date();
            res.send(`Current date is: ${currentDate.toUTCString()}`);
            break;
        default:
            res.send('<h1 style="color: red;">You enter wrong os type</h1>');
    }
});

module.exports = router;