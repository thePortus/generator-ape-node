/**
 * <%= factoryPath %>
 * @file
 *
 * <%= documentAuthor %>
 *
 * <%= documentDescription %>
 *
 * Created with the Ape-Stack Yeoman Generator
 * Copyright (c) 2016 David J. Thomas, dave.a.base@gmail.com
 * http://thePortus.com | https://github.com/thePortus
 *
 * Formatted according to John Papa's Angular styleguide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {
  'use strict';

  angular.module('<%= slugifiedModuleName %>')
    .factory('<%= classifiedFactoryName %>', <%= camelizedFactoryName %>);

  // factory wrapper function, use factories/services as args to bring them into function scope (e.g. $http)
  function <%= camelizedFactoryName %> () {
    return <%= camelizedFactoryName %>FactoryCall;

    // put the args you want used to construct the factory here
    function <%= camelizedFactoryName %>FactoryCall(/*args_here*/) {
      return new <%= classifiedFactoryName %>Factory(/*args_here*/);

      function <%= classifiedFactoryName %>Factory(/*args_here*/) {
        /* jshint validthis: true */
        var vm = this;

        /* properties */

        // vm.foo = 'bar';

        /* methods */
        // vm.someMethod = someFunction;

        // set factory initialize method
        vm.initialize = initialize;

        // initialization function call
        vm.initialize();
        /* functions */

        function initialize() {
          // post-load logic goes here
        } // initialize

        // function someFunction() {}

      } // <%= classifiedFactoryName %>Factory
    } // <%= camelizedFactoryName %>FactoryCall
  } // <%= camelizedFactoryName %>

})();
