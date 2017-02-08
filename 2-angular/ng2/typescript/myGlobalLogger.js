/* first ref declaration files - must be at start of file */
/// <reference path="./typings/tsd.d.ts" />
var GlobalLogger = (function () {
    function GlobalLogger() {
    }
    GlobalLogger.logGlobalsToConsole = function () {
        for (var i = 0; i < CONTACTS.length; i++) {
            console.log("found contact : " + CONTACTS[i]);
        }
    };
    return GlobalLogger;
}());
window.onload = function () {
    GlobalLogger.logGlobalsToConsole(); //compile error, if no declaration file in place (due to CONTACTS_ARRAY)
};
$('.myClass').addClass('steveClass'); //compile error, if no declaration file in place (due to jquery dependency)
//# sourceMappingURL=myGlobalLogger.js.map