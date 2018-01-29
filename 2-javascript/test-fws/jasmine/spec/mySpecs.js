(function () {
  'use strict';
  describe('Tests', function () {
    it('string true: should be truthy', function () {		//matcher is for boolean casting testing
      expect(true).toBeTruthy();                      	//will pass
    });
    it('String true: should fail falsy', function () {
      expect(true).toBeFalsy();                       	//will fail
    });

    it("mySum should add correctly", function() {
      //var a = 12;
      expect(mySum(1,2)).toEqual(3,'test mgs');
    });
  });

  describe('Tests2', function () {
    it('string true: should be truthy', function () {		//matcher is for boolean casting testing
      expect(true).toBeTruthy();                      	//will pass
      expect(false).toBeFalsy();                      	//will pass
      expect('boo!').toBeTruthy();                      //will pass
    });

  });

})();