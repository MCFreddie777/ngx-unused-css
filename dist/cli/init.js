"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var prompts_1 = tslib_1.__importDefault(require("prompts"));
var questions = [
    {
        type: 'confirm',
        name: 'isDefaultSrc',
        message: 'Is your app located in src/app?'
    },
    {
        type: 'confirm',
        name: 'isDefaultGlobalStylingSrc',
        message: 'Is your global styling located in src/styles.scss?'
    },
    {
        type: 'confirm',
        name: 'hasMaterialLib',
        message: 'Does your project use Angular Material library?'
    },
    {
        type: 'select',
        name: 'styleExt',
        message: 'Which style extension is your project using?',
        choices: [
            { title: 'SCSS', value: '.scss' },
            { title: 'SASS', value: '.sass' },
            { title: 'CSS', value: '.css' }
        ],
        initial: 0
    }
];
function init() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result, feedback, config;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompts_1.default(questions)];
                case 1:
                    result = _a.sent();
                    feedback = [];
                    config = {
                        path: '',
                        ignore: []
                    };
                    if (result.isDefaultSrc) {
                        config.path = 'src/app';
                    }
                    else {
                        feedback.push('App is not located in the src/app, pls provide correct path in the config');
                    }
                    if (result.isDefaultGlobalStylingSrc) {
                        config.globalStyles = 'src/styles.scss';
                    }
                    else {
                        feedback.push('Looks like configuration for global styling is missing, pls provide correct globalStyles in the config if there is any');
                    }
                    if (result.hasMaterialLib) {
                        if (config.ignore === undefined) {
                            config.ignore = [];
                        }
                        config.ignore.push('.mat-');
                    }
                    config.styleExt = result.styleExt;
                    if (feedback.length > 0) {
                        console.log(chalk_1.default.red.bold('INFO: Following changes in the .ngx-unused-css.json are required:\n'));
                        feedback.forEach(function (f, idx) {
                            console.log(chalk_1.default.red.bold(idx + 1 + ". " + f));
                        });
                    }
                    fs_1.default.writeFileSync('.ngx-unused-css.json', JSON.stringify(config, null, 2));
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = init;
//# sourceMappingURL=init.js.map