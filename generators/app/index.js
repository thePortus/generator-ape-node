'use strict';

const util = require('../util');
const path = require('path');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const format = require('string-format');
const uuid = require('node-uuid');
const _ = require('lodash');

var MeanGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.secretKey = uuid.v4();
        this.log(chalk.green('/=============================================================================\\'));
        this.log(chalk.magenta('|                               APE Stack Generator                           |'));
        this.log(chalk.green('|=============================================================================|'));
        this.log(chalk.magenta('|                                                                             |'));
        this.log(chalk.white('  |                       By David J. Thomas, thePortus.com                     |'));
        this.log(chalk.magenta('|                                                                             |'));
        this.log(chalk.green('\\=============================================================================/'));
    },
    askForApplicationDetails: function() {
        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What would you like to call your application?',
            default: path.basename(process.cwd())
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.slugifiedAppName = _.kebabCase(this.appName);
            done();
        }.bind(this));
    },

    copyApplicationFolder: function() {
        var blacklist = ['CONTRIBUTING.md', 'README.md', '.gitignore'];
        var rendered = {
            '_README.md': 'README.md',
            '_package.json': 'package.json',
            '_.gitignore': '.gitignore',
            '_.gitattributes': '.gitattributes',
            '_CONTRIBUTING.md': 'CONTRIBUTING.md',
            '_.editorconfig': '.editorconfig',
            '_.jshintrc': 'jshintrc',
            '_gulpfile.js': 'gulpfile.js',
            '_karma.conf.js': 'karma.conf.js',
            '_assets.json': 'assets.json',
            '_config.json': 'config.json'
        };
        util.readdirrecSync(this.sourceRoot()).forEach(function (file) {
            var relativePath = file.replace(this.sourceRoot()+'/','');
            if (_.contains(blacklist, relativePath)){
                return;
            }
            if (rendered[relativePath]){
                this.template(relativePath, rendered[relativePath]);
            }
            else {
                this.bulkCopy(relativePath, relativePath);
            }
        }.bind(this));
    }
});

module.exports = MeanGenerator;
