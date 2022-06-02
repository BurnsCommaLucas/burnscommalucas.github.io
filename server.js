// install express server
const express = require('express');
const path = require('path');
const secure = require('ssl-express-www');
const compression = require('compression');
const app = express();

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }))

//serve only static files from dist directory, require ssl
app.use(
    (req, res, next) => {
        secure(req, res, next);
    }
);
app.use(express.static(__dirname + '/dist/personal-site'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/personal-site/index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port %s', port));