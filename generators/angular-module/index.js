'use strict';

const fs = require('fs'),
  util = require('../../util'),
  Generator = require('yeoman-generator'),
  format = require('string-format'),
  chalk = require('chalk'),
  _ = require('lodash'),
  render = require('ejs').render;


let AngularModuleGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(chalk.white('APE-Stack Angular Module'));
  }
  prompting() {
    // read project name from app package.json
    let projectPackageJson = require(this.destinationPath('package.json'));
    let prompts = [{
      type: 'string',
      name: 'documentAuthor',
      message: 'Who is (or are) the author(s) of this document?',
      default: projectPackageJson.author
    }, {
      type: 'string',
      name: 'documentDescription',
      message: 'Enter a short description of this module (optional)',
      default: '[Description]'
    }];
    return this.prompt(prompts).then((answers) => {
      this.name = (this._args[0]);
      this.yoInfo = {
        // read project name from app package.json
        projectName: projectPackageJson.name,
        sluggifiedProjectName: _.kebabCase(projectPackageJson.name),
        componentName: this.name,
        documentAuthor: answers.documentAuthor,
        documentDescription: answers.documentDescription
      };
      // generating different cases of module and component names
      this.yoInfo.slugifiedComponentName = _.kebabCase(this.name);
      this.yoInfo.camelizedComponentName = _.camelCase(this.yoInfo.slugifiedComponentName);
      this.yoInfo.classifiedComponentName = _.capitalize(this.yoInfo.camelizedComponentName);

      // build component filepath
      this.yoInfo.componentPath = format(
        'client/js/{0}/{0}.config.js',
        this.yoInfo.slugifiedComponentName
      );

      // build fake data filepath
      this.yoInfo.fakeDataPath = format(
        'client/js/{0}/tests/{0}.fake-data.js',
        this.yoInfo.slugifiedComponentName
      );
    });
  }
  writing() {
    // add module as dependency to the main app declaration
    let appConfigFile = format('{0}/client/js/app/app.config.js', process.cwd());
    if (fs.existsSync(appConfigFile)) {
        // Read the source routes file content
        let appConfigContent = util.readFileAsString(appConfigFile).replace(
          '/* leave me here: auto module addition */',
          render(this.fs.read(this.templatePath('add-module.js')), this.yoInfo)
        );

        // Save route file
        util.writeFileFromString(appConfigContent, appConfigFile);
    }
    this.log(chalk.magenta('Rendering component template files...'));
    // copy component file
    this.fs.copyTpl(
      this.templatePath('_.module.js'),
      this.destinationPath(this.yoInfo.componentPath),
      this.yoInfo
    );
    // copy test data file
    this.fs.copyTpl(
      this.templatePath('_.fake-data.js'),
      this.destinationPath(this.yoInfo.fakeDataPath),
      this.yoInfo
    );
    // load project's assets.json
    let projectAssetsJson = require(this.destinationPath('assets.json'));
    // add relative paths of new component files, excluding the static directory prefixes
    projectAssetsJson.source.js.push(this.yoInfo.componentPath.replace('client/js/', ''));
    projectAssetsJson.source.js.push(this.yoInfo.fakeDataPath.replace('client/js/', ''));
    // save over the previous version
    util.writeJson(this.destinationPath('assets.json'), projectAssetsJson);
  }
  end() {
    this.log(chalk.magenta('Finished creating module'));
  }
};

module.exports = AngularModuleGenerator;
