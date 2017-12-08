/**
 * <%= componentPath %>
 * @file
 *
 * <%= projectName %> : <%= moduleName %> : <%= componentName %>
 * <%= documentAuthor %>
 *
 * <%= documentDescription %>
 *
 * Created with the Ape-Stack Yeoman Generator
 * Copyright (c) 2016 David J. Thomas, dave.a.base@gmail.com
 * http://thePortus.com | https://github.com/thePortus
 *
 * Formatted according to John Papa's Angular styleguide
 * https://github.com/johnpapa/angular-style guide
 */

(function() {
  'use strict';

  angular.module('<%= sluggifiedProjectName %>.<%= slugifiedModuleName %>')
    .factory('<%= classifiedComponentName %>', <%= camelizedComponentName %>);

  // factory wrapper function, use factories/services as args to bring them into function scope (e.g. $http)
  function <%= camelizedComponentName %> () {
    return <%= camelizedComponentName %>FactoryCall;

    // put the args you want used to construct the factory here
    function <%= camelizedComponentName %>FactoryCall(/*args_here*/) {
      return new <%= classifiedComponentName %>Factory(/*args_here*/);

      function <%= classifiedComponentName %>Factory(/*args_here*/) {
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

      } // <%= classifiedComponentName %>Factory
    } // <%= camelizedComponentName %>FactoryCall
  } // <%= camelizedComponentName %>

})();
