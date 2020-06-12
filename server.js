// install express server
const express = require('express');
const path = require('path');
const secure = require('ssl-express-www');
const app = express();

//serve only static files from dist directory, require ssl
app.use(express.static(__dirname + '/dist/personal-site'));
app.use(secure);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/personal-site/index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port %s', port));