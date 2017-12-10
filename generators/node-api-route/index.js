'use strict';

const util = require('../../util'),
    Generator = require('yeoman-generator'),
    format = require('string-format'),
    chalk = require('chalk'),
    _ = require('lodash');

let ApiRouteGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Controller'));
  }
  prompting() {
    // read project name from app package.json
    let projectPackageJson = require(this.destinationPath('package.json'));
    let projectConfigJson = require(this.destinationPath('config.json'));
    let prompts = [{
      type: 'list',
      name: 'apiVersion',
      message: 'Which version of the api does this route belong to?',
      choices: projectConfigJson.api.versions,
      default: projectConfigJson.api.default
    }, {
      type: 'string',
      name: 'documentAuthor',
      message: 'Who is (or are) the author(s) of this document?',
      default: projectPackageJson.author
    }, {
      type: 'string',
      name: 'documentDescription',
      message: 'Enter a short description of this route (optional)',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        // read project name from app package.json
        projectName: projectPackageJson.name,
        sluggifiedProjectName: _.kebabCase(projectPackageJson.name),
        apiVersion: answers.apiVersion,
        componentName: this.name,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and component names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedComponentName = _.kebabCase(this.name);
      this.yoInfo.camelizedComponentName = _.camelCase(this.yoInfo.slugifiedComponentName);
      this.yoInfo.classifiedComponentName = _.capitalize(this.yoInfo.camelizedComponentName);
      // build component filepath
      this.yoInfo.componentPath = format(
        'server/routes/api/{0}/{1}.route.js',
        this.yoInfo.apiVersion,
        this.yoInfo.slugifiedComponentName
      );
      // build test filepath
      this.yoInfo.testPath = format(
        'server/routes/api/{0}/tests/{1}.route.spec.js',
        this.yoInfo.apiVersion,
        this.yoInfo.slugifiedComponentName
      );
    });
  }
  writing() {
    this.log(chalk.magenta('Rendering component template files...'));
    // copy component file
    this.fs.copyTpl(
      this.templatePath('_.route.js'),
      this.destinationPath(this.yoInfo.componentPath),
      this.yoInfo
    );
    // copy test file
    this.fs.copyTpl(
      this.templatePath('_.route.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
  }
  end() {
    this.log(chalk.magenta('Finished creating controller'));
  }
};

module.exports = ApiRouteGenerator;
