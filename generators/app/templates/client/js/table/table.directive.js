(function() {
  'use strict';

  angular.module('ape-node.table')
    .directive('eleusisTable', eleusisTable);

  /*Directive Definition*/
  function eleusisTable() {
    var directive = {
      templateUrl: 'js/table/table.template.html',
      scope: {
        allowOptions: '=',
        datafactory: '=',
        detailTable: '@',
        style: '@'
      },
      controller: eleusisTableController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisTableController(Table) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.dropdown = false;
    vm.showDropdown = false;
    vm.disableOptions = true;
    vm.showOptions = false;
    vm.table = null;
    vm.searchterm = '';

    /* Methods */
    vm.$onInit = initialize;
    vm.clickOptions = clickOptions;

    /* Method Functions */
    function initialize() {
      if(typeof vm.allowOptions !== 'undefined' && vm.allowOptions !== false) {
        vm.disableOptions = false;
      }
      vm.table = new Table(vm.datafactory);
      if(vm.style === 'dropdown') {
        vm.dropdown = true;
      }
      else {
        vm.dropdown = false;
      }
    }

    function clickOptions() {
      vm.showOptions = !vm.showOptions;
    }

  }
  /*close eleusisTableController*/

})();
