"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var purgecss_1 = tslib_1.__importDefault(require("purgecss"));
var compile_scss_function_1 = tslib_1.__importDefault(require("./compilers/compile-scss.function"));
var extractClassesFromNgClass_1 = require("./extractors/extractClassesFromNgClass");
var whitelist_function_1 = tslib_1.__importDefault(require("./whitelist.function"));
var compile_less_function_1 = tslib_1.__importDefault(require("./compilers/compile-less.function"));
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param styleExt
 * @param {StyleConfig} config
 */
function findUnusedCss(content, cssPath, styleExt, config) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var css, _c, error_1, html, purgeCSSOptions, purgeCSSResult, result, error_2;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    css = '';
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, , 7]);
                    if (!cssPath)
                        return [2 /*return*/];
                    _c = styleExt;
                    switch (_c) {
                        case 'css': return [3 /*break*/, 2];
                        case 'scss': return [3 /*break*/, 2];
                        case 'sass': return [3 /*break*/, 2];
                        case 'less': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 2:
                    css = compile_scss_function_1.default(cssPath, ((_a = config.styleConfig) !== null && _a !== void 0 ? _a : {}));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, compile_less_function_1.default(cssPath, config.styleConfig)];
                case 4:
                    css = _d.sent();
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _d.sent();
                    console.log('Error: ', error_1);
                    if (config.verbose) {
                        console.error(error_1);
                    }
                    return [3 /*break*/, 7];
                case 7:
                    _d.trys.push([7, 9, , 10]);
                    html = extractClassesFromNgClass_1.parseNgClass(content);
                    purgeCSSOptions = {
                        content: [
                            {
                                raw: html,
                                extension: 'html'
                            }
                        ],
                        css: [{ raw: css }],
                        rejected: true
                    };
                    return [4 /*yield*/, new purgecss_1.default().purge(purgeCSSOptions)];
                case 8:
                    purgeCSSResult = _d.sent();
                    result = (_b = purgeCSSResult[0].rejected) !== null && _b !== void 0 ? _b : [];
                    return [2 /*return*/, whitelist_function_1.default(result, cssPath, config)];
                case 9:
                    error_2 = _d.sent();
                    if (config.verbose) {
                        console.error(error_2);
                    }
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.default = findUnusedCss;
