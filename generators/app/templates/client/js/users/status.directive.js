(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('ape-node.users')
    .directive('apeUserStatus', apeUserStatus);

  /*Directive Definition*/
  function apeUserStatus() {
    var directive = {
      templateUrl: 'js/users/status.template.html',
      scope: {},
      controller: apeUserStatusController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function apeUserStatusController(Auth, Interface) {
    /* jshint validthis: true */
    var vm = this;

    /* Properties */
    vm.auth = Auth;

    /* Methods */
    vm.$onInit = initialize;
    vm.login = login;
    vm.logout = logout;

    /* Functions */
    function initialize() {
    }

    function login() {
      Interface.go('login');
    }

    function logout() {
      Auth.logout();
      Interface.go('home');
    }
  }
  /*close apeUserStatusController*/

})();
