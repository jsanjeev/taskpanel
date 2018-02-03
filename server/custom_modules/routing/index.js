const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db=require('../database');

// Use BodyParser to parse data to json coming in req.body
app.use(bodyParser.json());


// Allow CORS Policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Username, SourceKey");
    next();
});


// Customize Server Response To Client
app.ErrorResponse = function (msg, stackTrace) {
    var self = {};
    self.status = 'error';
    self.msg = msg;
    self.isError = true;
    self.error = stackTrace;
    return self;
};

app.SuccessResponse = function (_data) {
    var self = {};
    self.data = _data;
    self.status = 'success';
    self.msg = 'success';
    self.isError = false;
    return self;
};

app.send = function (req, res, data) {
    res.send(new app.SuccessResponse(data));
};
app.sendError = function (req, res, msg, err) {
    res.send(new app.ErrorResponse(msg, err));
};


// Console All Data coming in query/params/body and send it to next middleware
app.use(function (req, res, next) {
    console.log('----------- New Request --------------');
    console.log('Method: ' + req.method);
    console.log('url: ' + req.url);
    console.log('body: ' + JSON.stringify(req.body));
    console.log('query:' + JSON.stringify(req.query));
    console.log('params:' + JSON.stringify(req.params));
    next();
});

module.exports = app;
