"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
// source: https://gist.github.com/victorsollozzo/4134793
/**
 * Find all html files in the project
 *
 * @param base
 * @param extension
 * @param files
 * @param result
 * @returns
 */
function findHtmlFunction(base, extension, files, result) {
    if (extension === void 0) { extension = 'html'; }
    if (files === void 0) { files = []; }
    if (result === void 0) { result = []; }
    if (!base) {
        return [];
    }
    if (!files.length) {
        files = fs_1.default.readdirSync(base);
    }
    files.forEach(function (file) {
        var newBase = path_1.default.join(base, file);
        if (fs_1.default.statSync(newBase).isDirectory()) {
            result = findHtmlFunction(newBase, extension, fs_1.default.readdirSync(newBase), result);
        }
        else {
            if (file.substr(-1 * (extension.length + 1)) === '.' + extension) {
                result.push(newBase);
            }
        }
    });
    return result;
}
exports.default = findHtmlFunction;
//# sourceMappingURL=findHtml.function.js.map