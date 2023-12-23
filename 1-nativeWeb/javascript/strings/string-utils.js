"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.camelToKebabCase = function (text) {
        return text.replace(/[A-Z]/g, function (letter) { return "-".concat(letter.toLowerCase()); });
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
