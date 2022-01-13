(function () {
  'use strict';
  describe('Tests', function () {
    it('string true: should be truthy', function () {		      //matcher is for boolean casting testing
      expect(true).toBeTruthy();                      	//will pass
    });
    it('String true: should fail falsy', function () {
      expect(true).toBeFalsy();                       	//will fail
    });
    it("mySum should add correctly", () => {
      expect(mySum(1,2)).toEqual(3);                //will pass (fat arrow syntax)
    });
  });

  describe('Method testing', function () {
    it('Matcher testing - should pass', function () {

      let myNumber = 13;
      let myString = 'a short string';
      let myArray = ['a', 'short', 'array'];
      let myObject = { first: 13,
                       second: 'short',
                       third: 'object' };

      /** Matcher tests */
      //expect(myNumber).toBe(13);
      //expect(myNumber).not.toBe(11);

      //expect(myString).toContain('short');
      //expect(myArray).toContain('short');

      //expect(myString).toMatch(/short/);
      //expect(myArray).toMatch(/short/);

      //expect(myNumber).toEqual(13);
      //expect(myString).toEqual(jasmine.stringMatching('string'));
      //expect(myArray).toEqual(jasmine.arrayContaining(['short']));
      expect(myObject).toEqual(jasmine.objectContaining({second:'short'} ));

      //expect(myNumber).toEqual(jasmine.any(Number));
      //expect(myNumber).toBeGreaterThan(12);
      //expect(myNumber).toBeGreaterThanOrEqual(13);

    });

  });

  //local tests
  console.log(mySum(1,2));     //check is visible in global
  console.log(myConcat('a','b'));

})();