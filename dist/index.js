"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var lodash_1 = require("lodash");
var findUnusedCss_function_1 = tslib_1.__importDefault(require("./functions/findUnusedCss.function"));
var findHtml_function_1 = tslib_1.__importDefault(require("./functions/findHtml.function"));
var result_type_1 = require("./types/result.type");
var allHtmlContent = '';
function getUnusedStyles(config) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var templatePaths, result, _b;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // default config
                    config = tslib_1.__assign({ styleExt: ['scss'], verbose: false, removeEmpty: true }, config);
                    templatePaths = findHtml_function_1.default(config.path);
                    _b = lodash_1.flatten;
                    return [4 /*yield*/, Promise.all(templatePaths.map(function (templatePath) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var templateFileContents;
                            var _this = this;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                templateFileContents = fs_1.default.readFileSync(templatePath, 'utf8');
                                allHtmlContent += templateFileContents;
                                return [2 /*return*/, Promise.all(((_a = config.styleExt) !== null && _a !== void 0 ? _a : []).map(function (styleExt) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var stylesPath, classes, error_1;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    stylesPath = templatePath.replace('.html', "." + styleExt);
                                                    // Try to read styling file path in order to determine if file exist
                                                    try {
                                                        fs_1.default.readFileSync(stylesPath);
                                                    }
                                                    catch (error) {
                                                        if (config.verbose) {
                                                            console.log(error);
                                                        }
                                                    }
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, findUnusedCss_function_1.default(templatePath, stylesPath, styleExt, config)];
                                                case 2:
                                                    classes = _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_1 = _a.sent();
                                                    if (config.verbose) {
                                                        console.log(error_1);
                                                    }
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/, {
                                                        type: result_type_1.ResultType.component,
                                                        templatePath: templatePath,
                                                        stylesPath: stylesPath,
                                                        classes: classes !== null && classes !== void 0 ? classes : []
                                                    }];
                                            }
                                        });
                                    }); }))];
                            });
                        }); }))];
                case 1:
                    result = _b.apply(void 0, [_c.sent()]);
                    // Check the global styles
                    if (config.globalStyles) {
                        ((_a = config.styleExt) !== null && _a !== void 0 ? _a : []).map(function (styleExt) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var unusedGlobalStyles;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, findUnusedCss_function_1.default(allHtmlContent, config.globalStyles, styleExt, config)];
                                    case 1:
                                        unusedGlobalStyles = _a.sent();
                                        if (unusedGlobalStyles === null || unusedGlobalStyles === void 0 ? void 0 : unusedGlobalStyles.length) {
                                            result.push({ type: result_type_1.ResultType.global, classes: unusedGlobalStyles });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (config.removeEmpty) {
                        result = result.filter(function (entry) { return !!entry.classes.length; });
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.default = getUnusedStyles;
