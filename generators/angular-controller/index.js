'use strict';

const util = require('../../util'),
    Generator = require('yeoman-generator'),
    format = require('string-format'),
    chalk = require('chalk'),
    _ = require('lodash');

let ControllerGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Controller'));
  }
  prompting() {
    let prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module does this controller belongs to?',
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
      message: 'Enter a short description of this controller',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        moduleName: answers.moduleName,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and controller names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedControllerName = _.kebabCase(this.name);
      this.yoInfo.camelizedControllerName = _.camelCase(this.yoInfo.slugifiedControllerName);
      this.yoInfo.classifiedControllerName = _.capitalize(this.yoInfo.camelizedControllerName);
      // determining destination of controller file
      this.yoInfo.controllerPath = format(
        'client/js/{0}/{1}.controller.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedControllerName
      );
      // determining destination of controller test file
      this.yoInfo.testPath = format(
        'client/js/{0}/tests/{1}.controller.spec.js', this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedControllerName
      );
    });
  }
  writing() {
    this.log(chalk.magenta('Rendering component template files...'));
    this.fs.copyTpl(
      this.templatePath('_.controller.js'),
      this.destinationPath(this.yoInfo.controllerPath),
      this.yoInfo
    );

    this.fs.copyTpl(
      this.templatePath('_.controller.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
  }
  end() {
    this.log(chalk.magenta('Finished creating controller'));
  }
};

module.exports = ControllerGenerator;
