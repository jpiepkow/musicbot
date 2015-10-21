var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var url = '';
module.exports = {
    regester: function(userId, lastfm)  {
        MongoClient.connect(url, function(err, db) {
            console.log(err);
            var collection = db.collection('users');
            collection.update({doctype:'account',userid: userId},{doctype:'account',userid: userId, lastfm: lastfm},{upsert:true},function(err,r) {
                    console.log(err,r);
            })
        });
    },
    post: function(info) {

    },
    getUser: function(userId, callback) {
        var temp;
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({doctype:'account',userid: userId},function(err,r) {
                console.log(r);
                temp = r;
            })
        });
        callback(null,temp);
    },
    getSong: function(userId) {

    }
};


