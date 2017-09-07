(function() {
  'use strict';

  angular.module('ape-node.app')
    .controller('HomeCtrl', homeCtrl);

  function homeCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.message = 'Welcome to Ape-Node (Angular, Postgres, Express, Node).';

  }

})();
