

const app=require('./custom_modules/routing');

// Just Checking for server response
app.get('*', function (req, res) {
    res.send('Everything is running good...');
});

//Application Listening on given port
var port = 8100;
app.listen(port, function (err) {
    if (!err) {
        console.log('Listening on port...' + port);
    }
});