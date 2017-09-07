'use strict';

var util = require('../util'),
    fs = require('fs'),
    yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash'),
    render = require('ejs').render;


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
    askUser: function() {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            default: 'core',
            message: 'Which module does this modal belongs to?',
            choices: util.listAngularModules()
        }, {
            type: 'list',
            name: 'modalSize',
            default: 'md',
            choices: ['sm', 'md', 'lg'],
            message: 'Modal size'
        }];

        this.prompt(prompts, function(props) {
            this.moduleName = props.moduleName;
            this.modalSize = props.modalSize;
            this.slugifiedModuleName = _.kebabCase(this.moduleName);
            this.camelizedModuleName = _.camelCase(this.moduleName);

            this.slugifiedName = _.kebabCase(this.name);
            this.camelizedName = _.camelCase(this.slugifiedName);
            this.classifiedName = _.camelCase(this.camelizedName);

            done();
        }.bind(this));
    },

    renderFiles: function() {
        this.template('_.modal.js', format('client/{0}/{1}.modal.js', this.slugifiedModuleName, this.slugifiedName));

        this.template('_.modal.template.html', format('client/{0}/{1}.template.html', this.slugifiedModuleName, this.slugifiedName));

        this.template('_.controller.spec.js', format('client/{0}/tests/{1}-modal.controller.spec.js', this.slugifiedModuleName, this.slugifiedName));
    }
});

module.exports = DirectiveGenerator;
