/**
 * <%= classifiedComponentName %>
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
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {
    'use strict';

    angular.module('<%= sluggifiedProjectName %>.<%= slugifiedModuleName %>')
      .factory('<%= classifiedComponentName %>', <%= camelizedComponentName %>);

    // service wrapper function, use factories/services as args to bring them into function scope (e.g. $http)
    function <%= camelizedComponentName %> () {
      return new <%= classifiedComponentName %>Service();

        function <%= classifiedComponentName %>Service() {
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

        } // <%= classifiedComponentName %>Service
    } // <%= camelizedComponentName %>

})();
