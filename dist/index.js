"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var findUnusedCss_function_1 = tslib_1.__importDefault(require("./functions/findUnusedCss.function"));
var findHtml_function_1 = tslib_1.__importDefault(require("./functions/findHtml.function"));
var result_type_1 = require("./types/result.type");
var allHtmlContent = '';
function getUnusedStyles(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var templatePaths, result, unusedGlobalStyles;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePaths = findHtml_function_1.default(config.path);
                    return [4 /*yield*/, Promise.all(templatePaths.map(function (templatePath) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var templateFileContents, stylesPath, classes, error_1;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        templateFileContents = fs_1.default.readFileSync(templatePath, 'utf8');
                                        allHtmlContent += templateFileContents;
                                        stylesPath = templatePath.replace('.html', (_a = config === null || config === void 0 ? void 0 : config.styleExt) !== null && _a !== void 0 ? _a : '.scss');
                                        // Try to read styling file path in order to determine if file exist
                                        try {
                                            fs_1.default.readFileSync(stylesPath);
                                        }
                                        catch (error) {
                                            console.log(error);
                                        }
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, findUnusedCss_function_1.default(templatePath, stylesPath, config)];
                                    case 2:
                                        classes = _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _b.sent();
                                        console.log(error_1);
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
                case 1:
                    result = _a.sent();
                    if (!config.globalStyles) return [3 /*break*/, 3];
                    return [4 /*yield*/, findUnusedCss_function_1.default(allHtmlContent, config.globalStyles, config)];
                case 2:
                    unusedGlobalStyles = _a.sent();
                    if (unusedGlobalStyles === null || unusedGlobalStyles === void 0 ? void 0 : unusedGlobalStyles.length) {
                        result.push({ type: result_type_1.ResultType.global, classes: unusedGlobalStyles });
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.default = getUnusedStyles;
//# sourceMappingURL=index.js.map