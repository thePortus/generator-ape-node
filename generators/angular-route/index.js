'use strict';

const fs = require('fs'),
  util = require('../../util'),
  Generator = require('yeoman-generator'),
  format = require('string-format'),
  chalk = require('chalk'),
  _ = require('lodash'),
  render = require('ejs').render;

let AngularRouteGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Directive'));
  }
  prompting() {
    // read project name from app package.json
    let projectPackageJson = require(this.destinationPath('package.json'));
    let prompts = [{
        type: 'list',
        name: 'moduleName',
        default: 'core',
        message: 'Which module does this route belongs to?',
        choices: util.listAngularModules()
    }, {
        name: 'routePath',
        message: 'What do you want your route path to be?',
        default: this.slugifiedName
    }, {
      type: 'string',
      name: 'documentAuthor',
      message: 'Who is (or are) the author(s) of this document?',
      default: projectPackageJson.author
    }, {
      type: 'string',
      name: 'documentDescription',
      message: 'Enter a short description of this factory (optional)',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);

      this.yoInfo = {
        // read project name from app package.json
        projectName: projectPackageJson.name,
        sluggifiedProjectName: _.kebabCase(projectPackageJson.name),
        moduleName: answers.moduleName,
        componentName: this.name,
        routePath: answers.routePath,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and component names
      this.yoInfo.slugifiedModuleName = _.kebabCase(this.yoInfo.moduleName);
      this.yoInfo.camelizedModuleName = _.camelCase(this.yoInfo.slugifiedModuleName);
      this.yoInfo.slugifiedComponentName = _.kebabCase(this.name);
      this.yoInfo.camelizedComponentName = _.camelCase(this.yoInfo.slugifiedComponentName);
      this.yoInfo.classifiedComponentName = _.capitalize(this.yoInfo.camelizedComponentName);
      this.yoInfo.slugifiedRoutePath = _.kebabCase(this.yoInfo.routePath);
      // build component filepath
      this.yoInfo.componentPath = format(
        'client/js/{0}/{1}.controller.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedComponentName
      );
      // build template filepath
      this.yoInfo.templatePath = format(
        'client/js/{0}/{1}.view.template.html',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedComponentName
      );
      // building less file path
      this.yoInfo.lessPath = format(
        'client/less/{0}/{1}.less',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedComponentName
      );
      // build test filepath
      this.yoInfo.testPath = format(
        'client/js/{0}/tests/{1}.controller.spec.js',
        this.yoInfo.slugifiedModuleName,
        this.yoInfo.slugifiedComponentName
      );
    });
  }
  writing() {
    // add UI routing state to main app config file
    let appConfigFile = format('{0}/client/js/app/app.config.js', process.cwd());
    if (fs.existsSync(appConfigFile)) {
        // Read the source routes file content
        let appConfigContent = util.readFileAsString(appConfigFile)
            .replace(';/* leave me here: auto route addition */', render(this.fs.read(this.templatePath('add-route.js')), this.yoInfo));

        // Save route file
        util.writeFileFromString(appConfigContent, appConfigFile);
    }
    this.log(chalk.magenta('Rendering component template files...'));
    // copy component file
    this.fs.copyTpl(
      this.templatePath('_.controller.js'),
      this.destinationPath(this.yoInfo.componentPath),
      this.yoInfo
    );
    // copy template file
    this.fs.copyTpl(
      this.templatePath('_.view.template.html'),
      this.destinationPath(this.yoInfo.templatePath),
      this.yoInfo
    );
    // copy less file
    this.fs.copyTpl(
      this.templatePath('_.less'),
      this.destinationPath(this.yoInfo.lessPath),
      this.yoInfo
    );
    // copy test file
    this.fs.copyTpl(
      this.templatePath('_.controller.spec.js'),
      this.destinationPath(this.yoInfo.testPath),
      this.yoInfo
    );
    // load project's assets.json
    let projectAssetsJson = require(this.destinationPath('assets.json'));
    // add relative paths of new component files, excluding the static directory prefixes
    projectAssetsJson.source.js.push(this.yoInfo.componentPath.replace('client/js/', ''));
    projectAssetsJson.source.less.push(this.yoInfo.lessPath.replace('client/less/', ''));
    // save over the previous version
    util.writeJson(this.destinationPath('assets.json'), projectAssetsJson);
  }
  end() {
    this.log(chalk.magenta('Finished creating directive'));
  }
};

module.exports = AngularRouteGenerator;
