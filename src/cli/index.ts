#! /usr/bin/env node
/* eslint-disable no-tabs */

/*
Find unused css inside Angular components
*/
import { Config } from '../types/config.type';
import init from './init';
import getUnusedStyles from '../index';
import chalk from 'chalk';
import { table } from 'table';
import { ResultType } from '../types/result.type';

const path = require('path');
const fs = require('fs');
const meow = require('meow');
const defaultConfigPath = '.ngx-unused-css.json';

const cli = meow(
  `
	Usage
	  $ ngx-unused-css

	Options
	  --config, -c override default config path

	Examples
	  $ ngx-unused-css --config ngx-custom-unused-css.json
`,
  {
    flags: {
      config: {
        type: 'string',
        alias: 'c'
      }
    }
  }
);

let config: Config | undefined;

// initialize configuration file
if (cli.flags.init) {
  init().then(() => process.exit(0));
}

// load config file
if (cli.flags.config) {
  config = require(path.join(__dirname, cli.flags.config));
} else if (fs.existsSync(path.resolve(defaultConfigPath))) {
  config = require(path.resolve(defaultConfigPath));
}

if (!config) {
  throw new Error(
    'Config not found, did you forgot to run ngx-unused-css --init?'
  );
}

getUnusedStyles(config).then((classes) => {
  console.log(
    chalk.red.bold('Unused CSS classes were found for the following files:\n')
  );

  // print table of files & classes
  classes.forEach((res) => {
    if (res.type === ResultType.component) {
      console.log(chalk.red(res.templatePath));
      console.log(chalk.red.bold(res.stylesPath));
    } else {
      console.log(chalk.red('**** GLOBAL STYLES ****'));
    }

    const cssClasses = res.classes.join('\n');
    console.log(table([[chalk.green(cssClasses)]]));
  });

  process.exit(1);
});
