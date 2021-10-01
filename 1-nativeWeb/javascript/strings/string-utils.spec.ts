import { StringUtils } from './string-utils';

describe('String Utilities', () => {
  describe('#camelToKebabCase', () => {
    it('should format single word', () => {
      expect(StringUtils.camelToKebabCase('foo')).toEqual('foo');
    });
    it('should format multiple words', () => {
      expect(StringUtils.camelToKebabCase('fooBarBaz')).toEqual('foo-bar-baz');
    });
    it('should handle empty string', () => {
      expect(StringUtils.camelToKebabCase('')).toEqual('');
    });
  });
});
