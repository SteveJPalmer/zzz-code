// my custom module

define(["jquery", "core", "anotherModule"], function($, c, am) {
  $(function() {
    $("#1").text('if jq loaded ill turn pink - & my custom module running jq');
  });

  $('#myButton').click(function() {
    // alert('test');
    am.showMsg('steves message');
    c.showAlerts('called method showAlerts from core.js');
  });

  console.log('loaded custom module - myModule');
});





