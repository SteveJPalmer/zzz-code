
angular.module('app', [])
  .controller('TodoCtrl', function() {
    var vm = this;

    //model
    vm.title = 'ToDo List';
    vm.todolist = [{name:'finish code', done: false},
                   {name:'test it', done: false}
                  ];
    vm.newItem = null;

    //methods
    vm.addToDo = function() {
      console.log(vm);
      vm.todolist.push({name: vm.newItem, done: false});
      vm.newItem = null;
    }
    //to cater for 'enter' keypress - Note: better to use <form> & implicit submit on enter
    vm.addToDo2 = function(e) {
      console.log(vm);
      console.log(e);
      if(e.type == 'click' || (e.type='keyup' && e.keyCode == 13)) {
        vm.todolist.push({name: vm.newItem2, done: false});
        vm.newItem2 = null;
      }
    }

    //remove items selected as done
    vm.remove = function() {
      var oldList = vm.todolist;
      vm.todolist = [];
      angular.forEach(oldList, function(item) {
        if(!item.done) {
          vm.todolist.push(item);
        }
      });
    }


  });
