'use strict';

var theConfig = require('./config/appconfig.js');
var murl = theConfig.getMongoDBURL();
var mdb = theConfig.getMongoDB();
var mcoll = theConfig.getMongoCollection();

console.log("db:" + mdb + " : " + mcoll + " : " + murl);

var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;

// Invoke createConnection with a callback to the insert function
function insert(aDSarray, aCallback) {
    
    var myCollection;
    MongoClient.connect(murl, function(err, db) {
        if(err!=null) {
            console.log("error connecting"+err);
            return;
        }      
        if(db==null) console.log("why is the db null???");
        myCollection = db.collection(mcoll);
        if(myCollection==null) {
            console.log("myCollection is null");
        }
        else {
            myCollection.insert(aDSarray, function (errins, result) {
                if (errins) {
                    console.log(errins);
                    db.close();
                } else {
                    console.log("here are your results:"+
                                result['result'].n);
                    db.close();
                    aDSarray = null;
                }
            });
        }
      //  aCallback();
        setTimeout(aCallback,10000);
    })
}

module.exports = {
    insertDS: function (aDataset, aCallback) {
        insert(aDataset, aCallback);
        return;
    }
};