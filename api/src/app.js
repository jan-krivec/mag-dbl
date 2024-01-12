var express = require('express');
var path = require('path');
const app = express();
const bodyParser = require("body-parser");
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

app.use(multipartyMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/upload', require('./routes/upload.js'));

app.use(express.static(path.join(__dirname, '../ui/dist/ui')));

module.exports = app;

