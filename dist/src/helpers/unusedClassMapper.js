"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var findUnusedCss_1 = tslib_1.__importDefault(require("../main/findUnusedCss"));
/**
 * Returns array of classes/attributes not used in html
 *
 * @param cssPath - styling file path
 * @param htmlContent - html content to analyse
 * @param htmlPath - html file path
 * @returns Promise<([string[], string])>
 */
function unusedClassMapper(cssPath, htmlContent, htmlPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var classes, error_1, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // Try to read styling file path in order to determine if file exist
                    fs_1.default.readFileSync(cssPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, findUnusedCss_1.default(htmlContent, cssPath)];
                case 2:
                    classes = _a.sent();
                    if (cssPath && classes.length > 0) {
                        return [2 /*return*/, { htmlPath: htmlPath, cssPath: cssPath, classes: classes }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { htmlPath: htmlPath, cssPath: cssPath, classes: [] }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    return [2 /*return*/, { htmlPath: htmlPath, cssPath: '', classes: [] }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = unusedClassMapper;
//# sourceMappingURL=unusedClassMapper.js.map