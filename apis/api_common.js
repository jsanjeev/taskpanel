const app = require('../custom_modules/routing');
const db = require('../custom_modules/database');
const dateFormat = require('dateformat');
const Scraper = require('images-scraper');
const Jimp = require('jimp');
const async = require('async');

var api_path = function (path) {
    return '/api/common' + path;
};

var compressed_images_and_save = function (key, images, callback) {
    var path = './uploads/';
    var img_array = [];
    var county = 0;
    async.eachSeries(images,
        function (img, callback) {
            var filename = img.size + '_' + new Date().getTime() + '_' + key + '.jpg';
            Jimp.read(img.url).then(function (output) {
                output.resize(256, 256)            // resize
                    .quality(60)                 // set JPEG quality
                    .greyscale()                 // set greyscale
                    .write(path + filename);      // save
                img_array.push(filename);
                county++;
                console.log('Image Processed: ' + county);
                callback();
            }).catch(function (err) {
                console.error(err);
            });
        }, function (err) {
            if (!err) {
                callback(img_array)
            }
        })
};

var search_on_requested_server = function (key, engine, callback) {
    switch (engine) {
        case 'bing':
            var server = new Scraper.Bing();
            break;
        case 'google':
            var server = new Scraper.Google();
            break;
        case 'yahoo':
            var server = new Scraper.Yahoo();
            break;
    }
    server.list({
        keyword: key,
        num:5,
        detail: false
    }).then(function (res) {
        console.log(res);
        compressed_images_and_save(key, res, function (data) {
            callback(data)
        })
    }).catch(function (err) {
        console.log('err', err);
    });
};

var function_for_search_key = function (req, res) {
    var args = req.body;
    search_on_requested_server(args.key, args.engine, function (response) {
        var data = {
            "search_key": args.key,
            "searched_on": new Date().getTime(),
            "searched_engine":args.engine,
            "files": response
        };
        var images = new db.images(data);
        images.save(function (err, data) {
            if (err)
                app.sendError(req, res, 'Something went wrong!!!', err);
            else
                app.send(req, res, data);
        });
    });
};
app.get(api_path('/search_images/'), function_for_search_key);
app.post(api_path('/search_images/'), function_for_search_key);


var function_to_get_searched_data = function (req, res) {
    db.images.find({}, {search_key: 1, searched_on: 1}, function (err, data) {
        if (err)
            app.sendError(req, res, 'Something went wrong!!!', err);
        else {
            var result = data.map(function (item) {
                return {
                    _id: item._id,
                    search_key: item.search_key + '  ' + '(Searched At ' + dateFormat(item.searched_on, 'hh:MM:TT') + ')'
                }
            });
            app.send(req, res, result);
        }
    })
};
app.get(api_path('/get_searched_data/'), function_to_get_searched_data);
app.post(api_path('/get_searched_data/'), function_to_get_searched_data);


