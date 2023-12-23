"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_utils_1 = require("./string-utils");
describe('String Utilities', function () {
    describe('#camelToKebabCase', function () {
        it('should format single word', function () {
            expect(string_utils_1.StringUtils.camelToKebabCase('foo')).toEqual('foo');
        });
        it('should format multiple words', function () {
            expect(string_utils_1.StringUtils.camelToKebabCase('fooBarBaz')).toEqual('foo-bar-baz');
        });
        it('should handle empty string', function () {
            expect(string_utils_1.StringUtils.camelToKebabCase('')).toEqual('');
        });
    });
});
