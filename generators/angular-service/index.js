'use strict';

const util = require('../../util'),
    Generator = require('yeoman-generator'),
    format = require('string-format'),
    chalk = require('chalk'),
    _ = require('lodash');

let ServiceGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Service'));
  }
  prompting() {
    let prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module does this service belongs to?',
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
      message: 'Enter a short description of this service',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        moduleName: answers.moduleName,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and service names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedServiceName = _.kebabCase(this.name);
      this.yoInfo.camelizedServiceName = _.camelCase(this.yoInfo.slugifiedServiceName);
      this.yoInfo.classifiedServiceName = _.capitalize(this.yoInfo.camelizedServiceName);
      // determining destination of service file
      this.yoInfo.servicePath = format(
        'client/js/{0}/{1}.service.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedServiceName
      );
      // determining destination of service test file
      this.yoInfo.testPath = format(
        'client/js/{0}/tests/{1}.service.spec.js', this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedServiceName
      );
    });
  }
  writing() {
    this.log(chalk.magenta('Rendering component template files...'));
    this.fs.copyTpl(
      this.templatePath('_.service.js'),
      this.destinationPath(this.yoInfo.servicePath),
      this.yoInfo
    );

    this.fs.copyTpl(
      this.templatePath('_.service.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
  }
  end() {
    this.log(chalk.magenta('Finished creating service'));
  }
};

module.exports = ServiceGenerator;
