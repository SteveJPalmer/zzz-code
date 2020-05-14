(function () {
  'use strict';
  describe('Suite A', function() {

    //before fns at Suite level
    beforeAll(function() {
      console.info('..beforeAll - SuiteA');
    });

    afterAll(function() {
      console.info('..afterAll - SuiteA');
    });

    beforeEach(function() {
      console.info('......beforeEach - SuiteA');
    });


    describe('Tests1', function () {
      //before fns at nested tests level
      beforeAll(function() {
        console.info('....beforeAll - Tests1');
      });

      afterAll(function() {
        console.info('....afterAll - Tests1');
      });

      beforeEach(function() {
        console.info('......beforeEach - Tests1');
      });

      afterEach(function() {
        console.info('......afterEach - Tests1');
      });

      it('string true: should be truthy', function () {		//matcher is for boolean casting testing
        console.log('......>>>>>executing Tests1');
        expect(true).toBeTruthy();                      	//will pass
      });

      it("mySum should add correctly", function() {
        console.log('......>>>>>executing Tests1');
        //var a = 12;
        expect(mySum(1,2)).toEqual(3,'test mgs');
      });
    });

    describe('Tests2', function () {
      //before fns at nested tests level
      beforeAll(function() {
        console.info('....beforeAll - Tests2');
      });

      afterAll(function() {
        console.info('....afterAll - Tests2');
      });

      beforeEach(function() {
        console.info('......beforeEach - Tests2');
      });
      it('string true: should be truthy', function () {		//matcher is for boolean casting testing
        console.log('......>>>>>executed Tests2');
        expect(true).toBeTruthy();                      	//will pass
      });

    });

  });

})();