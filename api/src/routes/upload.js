const express = require('express');
const EnapsoGraphDBClient = require('../graphdb');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });


const router = express.Router();

router.post('/', (req, res) => {

})

module.exports = router;