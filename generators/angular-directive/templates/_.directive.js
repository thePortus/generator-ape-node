/**
 * <%= directivePath %>
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
    .directive('<%= camelizedDirectiveName %>', <%= camelizedDirectiveName %>);

  function <%= camelizedDirectiveName %> (staticPath) {
    var directive = {
      templateUrl: staticPath('js/<%= slugifiedModuleName %>/<%= slugifiedDirectiveName %>.template.html'),
      // variables to pass to directive controller
      scope: {
          // foo: '=',
          // bar: '=',
      },
      controller: <%= camelizedDirectiveName %>Controller,
      controllerAs: 'vm',
      bindToController: true // b/c isolated scope
    };
    return directive;
  }

  function <%= camelizedDirectiveName %>Controller() {
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

  } // <%= camelizedDirectiveName %>Controller

})();
