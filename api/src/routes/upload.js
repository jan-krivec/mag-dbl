const express = require('express');
const EnapsoGraphDBClient = require('../graphdb');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
    if (req.files.length !== 0 && req.files.data && req.files.data.length === 1) {
        const reqFile  = req.files.data[0];
        fs.readFile(reqFile.path, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading the file.');
            }
            EnapsoGraphDBClient
                .uploadFromData({
                    data: data,
                    format: 'text/turtle'
                })
                .then((result) => {
                    console.log(result);
                })
                    .catch((err) => {
                        console.log(err, 'process error here...');
                    });
        })
    }
})

module.exports = router;