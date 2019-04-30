// install express server
const express = require('express');
const path = require('path');
const app = express();

//serve only static files from dist directory
app.use(express.static(__dirname + '/dist/personal-site'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/personal-site/index.html'));
});

app.listen(process.env.PORT || 8080);