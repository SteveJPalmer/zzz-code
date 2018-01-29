//app.js
console.log('executing app.js');

//RequireJS config - param obj  - no need for .js ext on paths
//note: doesn't load file, just provides name & path/url
requirejs.config({
  baseUrl:'js',
  paths: {
    //library files
    jquery: ['https://code.jquery.com/jquery-2.1.1.minINVALID',   // add INVALID to test fallback
             'lib/jquery'],                                       // 1st fb - Local loaded if CDN fails
    //custom modules
    core: 'custom/core'                                           // custom module- uses define()
  }
});

//can require() - to load dependent scripts asynchronously
//load my custom module
require(['custom/myModule']);

//can define() to create modules within app.js (Tip:use module pattern)
//can add as [dep] via name
define('anotherModule', [], function() {
  var methods = {};
  methods.showMsg = function(msg) {
    console.log(msg);
  };
  return methods;
});
