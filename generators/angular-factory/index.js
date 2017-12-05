'use strict';

const util = require('../../util'),
    Generator = require('yeoman-generator'),
    format = require('string-format'),
    chalk = require('chalk'),
    _ = require('lodash');

let FactoryGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Factory'));
  }
  prompting() {
    let prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module does this factory belongs to?',
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
      message: 'Enter a short description of this factory',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        moduleName: answers.moduleName,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and factory names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedFactoryName = _.kebabCase(this.name);
      this.yoInfo.camelizedFactoryName = _.camelCase(this.yoInfo.slugifiedFactoryName);
      this.yoInfo.classifiedFactoryName = _.capitalize(this.yoInfo.camelizedFactoryName);
      // determining destination of factory file
      this.yoInfo.factoryPath = format(
        'client/js/{0}/{1}.factory.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedFactoryName
      );
      // determining destination of factory test file
      this.yoInfo.testPath = format(
        'client/js/{0}/tests/{1}.factory.spec.js', this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedFactoryName
      );
    });
  }
  writing() {
    this.log(chalk.magenta('Rendering component template files...'));
    this.fs.copyTpl(
      this.templatePath('_.factory.js'),
      this.destinationPath(this.yoInfo.factoryPath),
      this.yoInfo
    );

    this.fs.copyTpl(
      this.templatePath('_.factory.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
  }
  end() {
    this.log(chalk.magenta('Finished creating factory'));
  }
};

module.exports = FactoryGenerator;
