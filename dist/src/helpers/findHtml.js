"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
// source: https://gist.github.com/victorsollozzo/4134793
/**
 * Find all htmls in the project
 *
 * @param base
 * @param ext
 * @param files
 * @param result
 * @returns
 */
function findHtml(base, ext, files, result) {
    if (!base) {
        return [];
    }
    files = files || fs_1.default.readdirSync(base);
    result = result || [];
    ext = 'html';
    files.forEach(function (file) {
        var newbase = path_1.default.join(base, file);
        if (fs_1.default.statSync(newbase).isDirectory()) {
            result = findHtml(newbase, 'html', fs_1.default.readdirSync(newbase), result);
        }
        else {
            if (file.substr(-1 * (ext.length + 1)) === '.' + ext) {
                result.push(newbase);
            }
        }
    });
    return result;
}
exports.default = findHtml;
//# sourceMappingURL=findHtml.js.map