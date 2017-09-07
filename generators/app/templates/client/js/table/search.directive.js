(function() {
  'use strict';

  angular.module('ape-node.table')
    .directive('eleusisTableSearch', eleusisTableSearch);

  /*Directive Definition*/
  function eleusisTableSearch() {
    var directive = {
      templateUrl: 'js/table/search.template.html',
      scope: {
        searchterm: '=',
        table: '='
      },
      controller: eleusisTableSearchController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisTableSearchController() {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */

    /* Methods */
    vm.$onInit = initialize;
    vm.sortField = sortField;

    /* Method Functions */
    function initialize() {
    }

    function sortField(fieldName) {
      if(vm.table.sorting.field === fieldName) {
        vm.table.sorting.reverse = !vm.table.sorting.reverse;
      }
      else {
        vm.table.sorting.field = fieldName;
        vm.table.sorting.reverse = false;
      }
    }
  }
  /*close eleusisTableController*/

})();
