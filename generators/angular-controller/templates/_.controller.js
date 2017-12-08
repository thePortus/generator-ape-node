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
 * Formatted according to John Papa's Angular style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {
  'use strict';

  angular.module('<%= sluggifiedProjectName %>.<%= slugifiedModuleName %>')
    .controller('<%= classifiedComponentName %>Controller', <%= camelizedComponentName %>Controller);

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

  } // <%= classifiedComponentName %>Controller

})();
