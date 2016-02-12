'use strict';

var theConfig = require('./config/appconfig.js');
// var configJSON = theConfig.getConfig();

var theDataset;
var theDataDirectory = theConfig.getDataDirectory();

// console.log(configJSON);

module.exports = {
    size: function () {
        return theDataset.length;
    },
    addIndexKV: function(aDataIndex) {
       // console.log(theDataset);
        if(Array.isArray(theDataset)) {
            theDataset.forEach(function(indexEntry) {
                indexEntry.dataindex = aDataIndex;
            })
        }     
    },
    normalizeMuni: function() {
      return true;  
    },
    getDataset: function() {
      return theDataset;  
    },
    clear: function() {
        theDataset = null;
        return true;
    },
    load: function (aDataIndex) {
        console.log("data dir:"+theDataDirectory+" : "+aDataIndex);
        try {
            theDataset = require(theDataDirectory+
                                 '/'+aDataIndex);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
};