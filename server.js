// install express server
const express = require('express');
const path = require('path');
const app = express();
const forceSsl = require('force-ssl-heroku');

//serve only static files from dist directory, require ssl
app.use(express.static(__dirname + '/dist/personal-site'), forceSsl);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/personal-site/index.html'));
});
app.listen(process.env.PORT || 8080);