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
            default: 'app',
            message: 'Which module does this directive belongs to?',
            choices: util.listAngularModules()
        }, {
            type: 'confirm',
            name: 'haveTemplate',
            default: 'true',
            message: 'Does it require a dedicated template?'
        }];

        this.prompt(prompts, function(props) {
            this.moduleName = props.moduleName;
            this.haveTemplate = props.haveTemplate;
            this.slugifiedModuleName = _.kebabCase(this.moduleName);

            this.slugifiedName = _.kebabCase(this.name);
            this.camelizedName = _.camelCase(this.slugifiedName);

            done();
        }.bind(this));
    },

    renderFiles: function() {
        this.template('_.directive.js', format('client/{0}/{1}.directive.js', this.slugifiedModuleName, this.slugifiedName));
        if (this.haveTemplate) {
            this.template('_.directive.template.html', format('client/{0}/{1}.template.html', this.slugifiedModuleName, this.slugifiedName));
        }
        this.template('_.directive.spec.js', format('client/{0}/tests/{1}.directive.spec.js', this.slugifiedModuleName, this.slugifiedName));
    }
});

module.exports = DirectiveGenerator;
