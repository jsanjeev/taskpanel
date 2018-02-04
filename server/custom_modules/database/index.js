const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId();

// Connection For MongoDatabase
// const uri = 'mongodb://127.0.0.1:27017/admin'; // Local DB Connection
const uri='mongodb://admin:nimda@ds225038.mlab.com:25038/ffa_db'; // Live DB Connection

mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB Connected to: ', uri);
});

//Create Database Schema
var conn = {};
var schema = mongoose.Schema;
imageSchema = schema({
    search_key: {type: String},
    searched_on: {type: Date},
    searched_engine:{type:String},
    files: {type: Array}
}, {timestamps: true});

conn.objectId = objectID;
conn.images = mongoose.model('images', imageSchema);
module.exports = conn;
