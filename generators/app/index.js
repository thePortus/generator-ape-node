'use strict';

const fs = require('fs');
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const format = require('string-format');
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.secretKey = uuid.v4();
    this.log(chalk.green('/=============================================================================\\'));
    this.log(chalk.magenta('|                               APE Stack Generator                           |'));
    this.log(chalk.green('|=============================================================================|'));
    this.log(chalk.magenta('|                                                                             |'));
    this.log(chalk.white('  |                       By David J. Thomas, thePortus.com                     |'));
    this.log(chalk.magenta('|                                                                             |'));
    this.log(chalk.green('\\=============================================================================/'));
  }
  prompting() {
    var done = this.async();

    var prompts = [{
      name: 'appTitle',
      message: 'What do you want the full title of your application to be? (e.g. \'Ape Stack Generator\')',
      default: path.basename(process.cwd()),
      store: true
    }, {
      name: 'appName',
      message: 'What do you want the short name of your application to be? (no spaces) (e.g. \'ape-stack\')',
      default: path.basename(process.cwd()),
      store: true
    }, {
      name: 'appPrefix',
      message: 'What do you want your app prefix to be? (preferrably no more than 3 characters) (e.g. \'ape\')',
      default: 'ape',
      store: true
    },
    {
      name: 'appCredits',
      message: 'What do you want the main credits message to read?',
      default: 'David J. Thomas, © 2017',
      store: true
    },
    {
      name: 'appVersion',
      message: 'What version is this? (follow semver format) (e.g. \'0.0.0\')',
      default: '0.0.0',
      store: true
    },
    {
      name: 'appRepo',
      message: '(Optional) Provide the URL of the project repository (for package.json)',
      default: ''
    },
    {
      name: 'appRepoPrivacy',
      message: '(Optional) If there is a repository, is it private? (y/n) (for package.json)',
      default: 'n'
    },
    {
      name: 'appDescription',
      message: '(Optional) Write a description of your app here (for package.json)',
      default: ''
    },
    {
      name: 'appHomepage',
      message: '(Optional) Provide the URL of the project homepage (for package.json)',
      default: ''
    },
    {
      name: 'appLicense',
      type: 'list',
      message: 'Provide the name of the license you want listed (for package.json)',
      choices: ['UNLICENSED', 'MIT', 'Apache-2.0', 'GPL-3.0'],
      default: 'UNLICENSED',
      store: true
    },
    {
      name: 'appSecret',
      message: 'Provide the a desired secret key',
      default: 'secret-ape'
    },
    {
      name: 'dbHost',
      message: 'Enter the address for the development database (for config.json)',
      default: '127.0.0.1'
    },
    {
      name: 'dbPort',
      message: 'Enter the port of the development database (for config.json)',
      default: '5432'
    },
    {
      name: 'dbDevName',
      message: 'Enter the name of the development database (for config.json)',
      default: 'ape-dev'
    },
    {
      name: 'dbTestName',
      message: 'Enter the name of the testing database (for config.json)',
      default: 'ape-test'
    },
    {
      name: 'dbProductionName',
      message: 'Enter the name of the production database (for config.json)',
      default: 'ape-production'
    },
    {
      name: 'dbUsername',
      message: 'Enter the development database login username (for config.json)',
      default: 'postgres'
    },
    {
      name: 'dbPassword',
      message: 'Enter the development database login password (for config.json)',
      default: null
    }];

    return this.prompt(prompts)
      .then((answers) => {
        this.appInfo = {
          appTitle: answers.appTitle,
          appName: answers.appName,
          appPrefix: answers.appPrefix,
          appCredits: answers.appCredits,
          appVersion: answers.appVersion,
          appRepo: answers.appRepo,
          appDescription: answers.appDescription,
          appHomepage: answers.appHomepage,
          appLicense: answers.appLicense,
          appSecret: answers.appSecret,
          dbHost: answers.devDbHost,
          dbPort: answers.devDbPort,
          dbDevName: answers.dbDevName,
          dbTestName: answers.dbTestName,
          dbProductionName: answers.dbProductionName,
          dbUsername: answers.dbUsername,
          dbPassword: answers.dbPassword,
          slugifiedAppName: _.kebabCase(this.appName)
        };
        this.appInfo.appRepoPrivacy = answers.appRepoPrivacy.toLowerCase();
        if(this.appInfo.appRepoPrivacy === 'y' || this.appInfo.appRepoPrivacy === 'yes' || this.appInfo.appRepoPrivacy === 'true' || this.appInfo.appRepoPrivacy === 't') {
          this.appInfo.appRepoPrivacy = 'true';
        }
        else {
          this.appInfo.appRepoPrivacy = 'false';
        }
        done();
      }
    );
  }
  writing() {
    var templateFiles = [
      '_package.json',
      '_config.json',
      '_README.md'
    ];
    var source = this.sourceRoot();
    var destination = this.destinationRoot();
    this.log(chalk.magenta('Writing project files...'));
    var files = fs.readdirSync(source);
    // copying files
    for(var x = 0; x <= files.length; x += 1) {
      var file = files[x];
      var destinationFile = file;

      if(typeof(file) !== 'undefined') {
        // rename files starting with _
        if(file[0] === '_') {
          destinationFile = file.slice(1, file.length);
        }
        // ignore files that will be created via templates
        if(!templateFiles.includes(file)) {
          this.fs.copy(path.join(source, file), path.join(destination, destinationFile));
        }
      }
    }
    this.log(chalk.magenta('Rendering project template files...'));
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.appInfo
    );
  }
  end() {
    this.log(chalk.magenta('Ape Stack Generator Finished'));
  }
};
