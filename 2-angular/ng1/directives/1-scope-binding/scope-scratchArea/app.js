
angular.module('app', [])
  .controller('ProductCtrl', function($rootScope) {
    var vm = this;

    /* model definitions */

    //isolated scope test variables
    vm.name = 'initialSteveValue';

    //test for ng-model attr being passed (used at CliniSys) - check no side effects due to name of attr
    vm.selectedValue = '';

    //test for @string attr being passed
    vm.myString = 'initialStringValue';

    //check access to root level models
    $rootScope.steveTest = 'testRootScope';   //need to inject $rootScope into ctrl

  })



  /* Link access to scope */

  /* testing the binding techniques - basic passing & setting of model scope */
  .directive('myBindingTests', function() {
    return {
      template: '<h2>Test Isolate Binding Techniques</h2> ',
      scope: {
        test: '=',         //2-way binding to passed model var created - can ref inside directive as scope.test    (test     in html elem)
        ngModel: '=',      //         ,,                ,,                 ,,             ,,         scope.ngModel (ng-model  ,,     ,,
        myStringBind: '@'  //pass string value into directive
      },
      link: function(scope, element, attr) {

        var typeOf = function (v){ return (typeof v)};

        console.info('Link fn objs');
        //tbc...//console.debug('element: ' + JSON.stringify(scope));   //TypeError: Converting circular structure to JSON
        console.debug('element: ' + JSON.stringify(element));
        console.debug('attr: ' + JSON.stringify(attr));

        console.info('Initial Values');
        console.log('scope.test: ' + scope.test + '(type is: ' + typeOf(scope.test) + ')');
        console.log('attr.test: ' + attr.test + '(type is: ' + typeOf(attr.test) + ')');

        console.info('Update Values');
        scope.test = 'newTestValue';
        console.log('scope.test: ' + scope.test + '(type is: ' + typeOf(scope.test) + ')');
        console.log('attr.test: ' + attr.test + '(type is: ' + typeOf(attr.test) + ')');



        /* Note: can also get to $root scope if required (as ref defined on scope obj - view in debug breakpoint) */
        console.info('Access $root & $parent scope (behind scenes)');
        console.debug('scope: ' + scope.$root.steveTest);
        //      & $parent scope if required
        console.debug('scope: ' + scope.$parent.vm.name);
        //      but can't ref parent vm scope naturally (isolate scope hides parent scope)
        //console.debug('scope: ' + vm.name);



        //tests for ng-model attr
        scope.ngModel = 'selectedValueSet';
        console.info('Update ngModel model var');
        console.log('scope.ngModel: ' + scope.ngModel );
        console.log('attr.ngModel: ' + attr.ngModel );


        //tests for myStringBind attr
        console.info('@ String binding tests');
        console.log('before: scope.myStringBind: ' + scope.myStringBind );

        scope.myStringBind = 'tryToChange@String';
        console.log('after change attempt: scope.myStringBind: ' + scope.myStringBind );   // but vm.myString does not change





      }
    }
  });
