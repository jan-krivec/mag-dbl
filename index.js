var express = require('express');
var path = require('path');
const port = 3000
const app = express()

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://rentify-sp.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(express.static(path.join(__dirname, './ui/dist/ui')));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});