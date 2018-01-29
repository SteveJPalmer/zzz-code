// incorporating existing fn/methods into require prj

define([], function() {

  var methods = {};

  methods.showAlerts = function(msg) {
    alert(msg);
  };

  console.log('loaded custom module - core.js');
  return methods;

});