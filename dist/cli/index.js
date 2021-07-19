#! /usr/bin/env node
"use strict";
/* eslint-disable no-tabs */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var init_1 = tslib_1.__importDefault(require("./init"));
var index_1 = tslib_1.__importDefault(require("../index"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var table_1 = require("table");
var result_type_1 = require("../types/result.type");
var path = require('path');
var fs = require('fs');
var meow = require('meow');
var defaultConfigPath = '.ngx-unused-css.json';
var cli = meow("\n\tUsage\n\t  $ ngx-unused-css\n\n\tOptions\n\t  --config, -c override default config path\n\n\tExamples\n\t  $ ngx-unused-css --config ngx-custom-unused-css.json\n", {
    flags: {
        config: {
            type: 'string',
            alias: 'c'
        }
    }
});
var config;
// initialize configuration file
if (cli.flags.init) {
    init_1.default().then(function () { return process.exit(0); });
}
// load config file
if (cli.flags.config) {
    config = require(path.join(__dirname, cli.flags.config));
}
else if (fs.existsSync(path.resolve(defaultConfigPath))) {
    config = require(path.resolve(defaultConfigPath));
}
if (!config) {
    throw new Error('Config not found, did you forgot to run ngx-unused-css --init?');
}
index_1.default(config).then(function (classes) {
    console.log(chalk_1.default.red.bold('Unused CSS classes were found for the following files:\n'));
    // print table of files & classes
    classes.forEach(function (res) {
        if (res.type === result_type_1.ResultType.component) {
            console.log(chalk_1.default.red(res.templatePath));
            console.log(chalk_1.default.red.bold(res.stylesPath));
        }
        else {
            console.log(chalk_1.default.red('**** GLOBAL STYLES ****'));
        }
        var cssClasses = res.classes.join('\n');
        console.log(table_1.table([[chalk_1.default.green(cssClasses)]]));
    });
    process.exit(1);
});
//# sourceMappingURL=index.js.map