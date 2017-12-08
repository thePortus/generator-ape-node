/**
 * <%= fakeDataPath %>
 * @file
 *
 * <%= projectName %> : <%= componentName %>
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

/**
 * Injected in [module]/tests/[module].[controller].spec.js to provide fake data
 */
angular.module('<%= sluggifiedProjectName %>.<%= slugifiedComponentName %>')
    .factory('<%= camelizedComponentName %>FakeData', fakeData);

    function fakeData(coreFakeData) {
        return angular.extend({}, coreFakeData, {
            // TODO: add your own test data here
            foo: 'bar'
        });
    }

})();
