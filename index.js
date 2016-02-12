'use strict';

var fs = require('fs');
var theConfig = require('./config/appconfig.js');
var configJSON = theConfig.getConfig();
// console.log(configJSON);

// Parse the command line for input parameters
var theArgs = require('minimist')(process.argv.slice(2));
var startArg = theArgs['_'][0];
var lengthArg = theArgs['_'][1];
console.log('start:'+startArg+' length:'+lengthArg);

var theOpenDataset = require('./opendataset.js');
var theOpenDataMongo = require('./openDataMongo.js');
var nextIndex = 0;

var theDataIndex = require('./ctdataindex.js');
console.log('entries in data index:' + theDataIndex.dataIndexSize());
console.log('index file name:'+ theConfig.getIndexFileName());

var x = theDataIndex.dataIndexSize();
var fileNames;
console.log('*** dataindex size:'+x);

console.log("final values *********");
console.log('nextIndex:' + nextIndex);
console.log('x:'+ x);


function insert() {
    if(nextIndex>=x) return;
    var didx;
    // var didx = theDataIndex.getIndexFile()[nextIndex].dataId;
    var lastIdx = fileNames[nextIndex].lastIndexOf('_');
    didx = fileNames[nextIndex];
  //  if(lastIdx<0) { didx = fileNames[nextIndex]; }
    // else {
    //    didx = fileNames[nextIndex].substring(0, lastIdx);
    // }
    console.log("index:"+didx+ " position:"+nextIndex);
    nextIndex+=1;
    // get _n datasets in here somehow
    if(theOpenDataset.load(didx)) {
        theOpenDataset.addIndexKV(didx);
        // call the routine to normalize municipalities
        var ds = theOpenDataset.getDataset();
        if(typeof ds[0] === "undefined") {
            console.log("it is undefined:");
            theOpenDataset.clear();
            insert();
        } else {
            theOpenDataMongo.insertDS(ds, insert);
        }
        theOpenDataset.clear();
        global.gc();
    } else {
        insert();
    }
}

fs.readdir(theConfig.getDataDirectory(), function(err, files) {
    if(err) {
        console.log('error reading data directory for file list');
    }
    files.forEach(function (name) {
   //     console.log('file name'+name);
    });
    fileNames = files;
    x = files.length;
    if(typeof startArg === "undefined") {
        nextIndex = 0;
    } else {
        nextIndex = startArg;
    }
    if(typeof lengthArg !== "undefined") {
        x = startArg + lengthArg;
    }
    insert();
});
