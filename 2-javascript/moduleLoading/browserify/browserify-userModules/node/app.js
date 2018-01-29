var foo = require('./foo');
var bar = require('./bar');

foo();
bar.log();

module.exports.steveFn = function () {
  alert('called steveFn via browserify');
  // console.log('test');
};
