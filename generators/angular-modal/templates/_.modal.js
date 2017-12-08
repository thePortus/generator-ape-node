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
    .factory('<%= camelizedComponentName %>Modal', <%= classifiedComponentName %>Modal)
    .controller('<%= classifiedComponentName %>ModalController', <%= classifiedComponentName %>ModalController);

  function <%= classifiedComponentName %>Modal($modal, staticPath) {

    <%= classifiedComponentName %>Modal.open = function(options) {
        return $modal.open(angular.extend({
            templateUrl: staticPath('js/<%= slugifiedModuleName %>/<%= slugifiedComponentName %>.modal.template.html'),
            controller: '<%= classifiedComponentName %>ModalController',
            controllerAs: 'vm',
            size: '<%= modalSize %>'
        }, options || {}));
    };
    return <%= classifiedComponentName %>Modal;

  } // <%= classifiedComponentName %>Modal

  function <%= classifiedComponentName %>ModalController($modalInstance) {

      // add modal controller logic here

  } // <%= classifiedComponentName %>ModalController

})();
