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

  angular.module('<%= slugifiedModuleName %>')
    .filter('<%= sluggifiedProjectName %>.<%= camelizedComponentName %>', <%= camelizedComponentName %>);

  // put angular service/factory args here to expose to the function
  function <%= camelizedComponentName %> (/*args_here*/) {
    return filterFunction;

      // put arguments you want to pass to filter here
      function filterFunction(/*args_here*/) {
        // add filter logic here
        // let filteredItems = [];
        // return filteredItems
      }

  } // <%= camelizedComponentName %>

})();
