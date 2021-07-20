"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var less_1 = tslib_1.__importDefault(require("less"));
var fs = tslib_1.__importStar(require("fs"));
/**
 * Compile Less
 * @param {string} cssPath
 * @param config
 */
function compileLess(cssPath, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, less_1.default.render(fs.readFileSync(cssPath).toString(), config)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.css];
                case 2:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = compileLess;
