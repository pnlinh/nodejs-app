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

const handleValidateFileExtension = async (files) => {
    const extentionAllowed = ['png', 'jpg', 'jpeg', 'gif'];
    const keys = await Object.keys(files);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const fileObj = files[key];
        const fileExt = fileObj.name.split('.').pop();
        const fileExceed = fileObj.truncated === true;

        if (extentionAllowed.indexOf(fileExt.toLocaleLowerCase()) < 0 || fileExceed) {
            return false;
        }
    }

    return true;
};

// Upload files
router.post('/uploads', async (req, res) => {
    try {
        if (!req.files) {
            return res.json({
                status: 'fail',
                msg: 'Please select files to upload'
            });
        }

        const keys = Object.keys(req.files);
        if (0 === keys.length) {
            return res.json({
                status: 'fail',
                msg: 'Please select files to upload'
            });
        }

        const validateExtension = await handleValidateFileExtension(req.files);
        if (!validateExtension) {
            return res.json({
                status: 'fail',
                msg: `You can only upload \'png\', \'jpg\', \'jpeg\', \'gif\' files or file size > 0.5MB`
            });
        }

        keys.forEach(async (key) => {
            const fileName = `${Math.random().toString(32)}`;
            const fileObj = await req.files[key];
            const fileExt = fileObj.name.split('.').pop();
            const destination = `${path.join(__dirname, '..')}/uploads/${fileName}.${fileExt}`;
            let error = await fileObj.mv(destination);

            if (error) {
                res.json({
                    status: 'fail',
                    msg: `Error when upload file: ${error}`
                });
            }

            if (key === keys[keys.length - 1]) {
                return res.json({
                    status: 'success',
                    msg: `Upload files successfully`,
                    numberOfFiles: keys.length
                });
            }
        });
    } catch (e) {
        res.json({
            status: 'fail',
            msg: `Error when upload file: ${e}`
        });
    }
});

module.exports = router;