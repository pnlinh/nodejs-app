const express = require('express');
let router = express.Router();
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

router.get('/', async (req, res) => {
    try {
        const currentFolder = path.join(__dirname);
        const files = await readdir(currentFolder);

        let numberOfFolders = 0;
        let numberOfFiles = 0;
        let i = 0;
        let content = '';

        if (files.length === 0) {
            content = `<p>This folder: ${currentFolder} is empty</p>`;
            res.send(content);

            return;
        }

        files.forEach(async (file) => {
            const stat = await lstat(`${currentFolder}/${file}`);

            if (stat.isFile()) {
                numberOfFiles++;
            } else {
                numberOfFolders++;
            }

            content = `${content}<li><a href="">${i + 1}. ${file}</a></li>`;
            if (i === files.length - 1) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');

                content = `${content} <p>There are ${numberOfFiles} files and ${numberOfFolders} folders</p>`;
                res.send(content);

                return;
            }
            i++;
        });
    } catch (e) {
        res.send(`Error when readling files in folder: ${e}`);
    }
});

module.exports = router;