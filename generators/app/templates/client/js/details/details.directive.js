(function() {
  'use strict';

  angular.module('ape-node.details')
    .directive('eleusisDetails', eleusisDetails);

  /*Directive Definition*/
  function eleusisDetails() {
    var directive = {
      templateUrl: 'js/details/details.template.html',
      scope: {
        parameters: '=',
        datafactory: '='
      },
      controller: eleusisDetailsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function eleusisDetailsController(Details) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.details = null;

    /* Methods */
    vm.$onInit = initialize;

    /* Method Functions */
    function initialize() {
      vm.details = new Details(vm.parameters.id_num, vm.datafactory);
      vm.fields = vm.details.from_table.fields;
      vm.data = vm.details.data;
    }

  }
  /*close eleusisDetailsController*/

})();
