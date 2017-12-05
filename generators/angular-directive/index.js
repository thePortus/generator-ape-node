'use strict';

const util = require('../../util'),
    Generator = require('yeoman-generator'),
    format = require('string-format'),
    chalk = require('chalk'),
    _ = require('lodash');

let DirectiveGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Directive'));
  }
  prompting() {
    let prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module does this directive belongs to?',
      choices: util.listAngularModules(),
      default: 'app'
    }, {
      type: 'string',
      name: 'documentAuthor',
      message: 'Who is (or are) the author(s) of this document?',
      default: '[Author]'
    }, {
      type: 'string',
      name: 'documentDescription',
      message: 'Enter a short description of this directive',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        moduleName: answers.moduleName,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and directive names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedDirectiveName = _.kebabCase(this.name);
      this.yoInfo.camelizedDirectiveName = _.camelCase(this.yoInfo.slugifiedDirectiveName);
      this.yoInfo.classifiedDirectiveName = _.capitalize(this.yoInfo.camelizedDirectiveName);
      // building directive file path
      this.yoInfo.directivePath = format(
        'client/js/{0}/{1}.directive.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedDirectiveName
      );
      // building test file path
      this.yoInfo.testPath = format(
        'client/js/{0}/tests/{1}.directive.spec.js', this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedDirectiveName
      );
      // building less file path
      this.yoInfo.lessPath = format(
        'client/less/{0}/{1}.less', this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedDirectiveName
      );
    });
  }
  writing() {
    this.log(chalk.magenta('Rendering component template files...'));
    // copy directive
    this.fs.copyTpl(
      this.templatePath('_.directive.js'),
      this.destinationPath(this.yoInfo.directivePath),
      this.yoInfo
    );
    // copy test
    this.fs.copyTpl(
      this.templatePath('_.directive.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
    // copy less
    this.fs.copyTpl(
      this.templatePath('_.less'),
      this.destinationPath(this.yoInfo.lessPath),
      this.yoInfo
    );
  }
  end() {
    this.log(chalk.magenta('Finished creating directive'));
  }
};

module.exports = DirectiveGenerator;
