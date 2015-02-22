global.requirejs = require('requirejs');

global.requirejs.config({
    //paths config is relative to the baseUrl, 
    //and never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        main: '../main/js' 
    }
});

// create mocha instance and pass options
var Mocha = require("mocha");
var mocha = new Mocha({ ui: 'bdd', reporter: 'spec'});

// load assertion frameworks
global.chai = require('chai');

// define window after loading modules
global.window = global;

// add files
mocha.addFile('js/..')
mocha.run();