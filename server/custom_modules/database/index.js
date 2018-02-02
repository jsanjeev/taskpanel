const mongoose = require('mongoose');
const objectID=mongoose.Types.ObjectId();

// Connection For MongoDatabase
const uri = 'mongodb://127.0.0.1:27017/admin';
mongoose.createConnection(uri, function (err, resp) {
    if (!err) {
        console.log('DB Connected to: ', uri);
    } else {
        console.log('Error: ', err)
    }
});

//Create Database Schema
var conn={};
var schema=mongoose.Schema;

imageSchema=schema({
    search_key: {type:String},
    searched_on: {type: Date},
    files: {type: Array}
},{timestamps:true});

conn.objectId=objectID;
conn.images =mongoose.model('image',imageSchema);
module.exports =conn;
