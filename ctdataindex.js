'use strict';

var theConfig = require('./config/appconfig.js');
var configJSON = theConfig.getConfig();
var theIndexFileName = theConfig.getIndexFileName();
var theDataIndex = require(theIndexFileName);

// console.log(configJSON);

module.exports = {
    dataIndexSize: function () {
        return theDataIndex.length;
    },
    addIndexKV: function(aDataIndex) {
        theDataIndex.forEach(function(indexEntry) {
            indexEntry.dataindex = aDataIndex;
        })
    },
    getIndex: function (aEntry) {
        return theDataIndex[aEntry].dataId;
    },
    getIndexFile: function () {
        return theDataIndex;
    }
};