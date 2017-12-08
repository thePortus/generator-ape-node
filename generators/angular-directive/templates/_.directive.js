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
    .directive('<%= camelizedComponentName %>', <%= camelizedComponentName %>);

  function <%= camelizedComponentName %> (staticPath) {
    var directive = {
      templateUrl: staticPath('js/<%= slugifiedModuleName %>/<%= slugifiedComponentName %>.template.html'),
      // variables to pass to directive controller
      scope: {
          // foo: '=',
          // bar: '=',
      },
      controller: <%= camelizedComponentName %>Controller,
      controllerAs: 'vm',
      bindToController: true // b/c isolated scope
    };
    return directive;
  }

  function <%= camelizedComponentName %>Controller() {
    /* jshint validthis: true */
    var vm = this;

    /* properties */

    // vm.foo = 'bar';

    /* methods */
    // vm.someMethod = someFunction;

    // assign controller init function
    vm.$onInit = initialize;

    /* functions */

    function initialize() {
      // post-load logic goes here
    } // initialize

    // function someFunction() {}

  } // <%= camelizedComponentName %>Controller

})();
