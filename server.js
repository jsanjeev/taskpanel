const app = require('./custom_modules/routing');
const express = require('express');


// require all apis
require('./apis/api_common');
require('./apis/api_docs');

app.use(express.static('public'));

// Send index.html file on startup
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: 'public'});
});

//Application Listening on given port
var port = 9000;
app.listen(port, function (err) {
    if (!err) {
        console.log('Listening on port...' + port);
    }
});