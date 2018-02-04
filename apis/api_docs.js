const app = require('../custom_modules/routing');
const db = require('../custom_modules/database');
const dateFormat = require('dateformat');
const path = require('path');

var api_path = function (path) {
    return '/api/docs' + path;
};


var function_to_get_file = function (req, res) {
    var myfilename = req.params.myfilename;
    var location = './uploads';
    res.sendFile(path.resolve(location + '/' + myfilename));
};
app.get(api_path('/getmyfile/:myfilename'), function_to_get_file);


var function_to_get_requested_data = function (req, res) {
    var _id = req.query.id;
    db.images.findById(_id, {files: 1}, function (err, data) {
        if (err)
            app.sendError(req, res, 'Something went wrong!!!', err);
        else {
            var result = data['files'].map(function (item) {
                return 'http://localhost:9000/api/docs/getmyfile/' + item;
            });
            app.send(req, res, result);
        }
    })
};
app.get(api_path('/get_requested_data/'), function_to_get_requested_data);
app.post(api_path('/get_requested_data/'), function_to_get_requested_data);