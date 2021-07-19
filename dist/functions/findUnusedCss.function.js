"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var purgecss_1 = tslib_1.__importDefault(require("purgecss"));
var compile_scss_function_1 = tslib_1.__importDefault(require("./compilers/compile-scss.function"));
var extractClassesFromNgClass_1 = require("./extractors/extractClassesFromNgClass");
var whitelist_function_1 = tslib_1.__importDefault(require("./whitelist.function"));
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param {Config} config
 */
function findUnusedCssFunction(content, cssPath, config) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var css, html, options, purgeCSSResult, result, error_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    css = '';
                    try {
                        if (!cssPath)
                            return [2 /*return*/];
                        css = compile_scss_function_1.default(cssPath, config);
                    }
                    catch (error) {
                        console.error(error);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    html = extractClassesFromNgClass_1.parseNgClass(content, cssPath);
                    options = {
                        content: [
                            {
                                raw: html,
                                extension: 'html'
                            }
                        ],
                        css: [{ raw: css }],
                        rejected: true
                    };
                    return [4 /*yield*/, new purgecss_1.default().purge(options)];
                case 2:
                    purgeCSSResult = _b.sent();
                    result = (_a = purgeCSSResult[0].rejected) !== null && _a !== void 0 ? _a : [];
                    return [2 /*return*/, whitelist_function_1.default(result, cssPath, config)];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = findUnusedCssFunction;
//# sourceMappingURL=findUnusedCss.function.js.map