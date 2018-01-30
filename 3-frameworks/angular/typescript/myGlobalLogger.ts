/* first ref declaration files - must be at start of file */

/// <reference path="./typings/tsd.d.ts" />

class GlobalLogger {
  static logGlobalsToConsole() {
    for (var i = 0; i < CONTACTS.length; i++) {
      console.log("found contact : " + CONTACTS[i]);
    }
  }
}

window.onload = () => {
  GlobalLogger.logGlobalsToConsole();  //compile error, if no declaration file in place (due to CONTACTS_ARRAY)
};

$('.myClass').addClass('steveClass');  //compile error, if no declaration file in place (due to jquery dependency)
