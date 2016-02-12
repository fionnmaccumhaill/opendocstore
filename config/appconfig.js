'use strict';

var theConfig = require('./appconfig.json');
var indexFileName = theConfig["repository"].indexfile;
var mdbURL = theConfig["repository"].mongoURL;
var theMongoDB = theConfig["repository"].mongodb;
var theMongoColl = theConfig["repository"].mongoCollection;
var datadirectory = theConfig["repository"].datadirectory;
console.log(mdbURL);

module.exports = {
    getConfig: function () {
        return theConfig;
    },
    getIndexFileName: function () {
        return indexFileName;
    },
    getMongoDBURL: function () {
        return mdbURL;
    },
    getMongoDB: function () {
        return theMongoDB;
    },
    getMongoCollection: function () {
        return theMongoColl;
    },
    getDataDirectory: function () {
        return datadirectory;
    }
};