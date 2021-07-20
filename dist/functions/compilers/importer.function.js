"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
/**
 * Resolve tilde relative imports from node_modules
 * @param {*} url
 */
function importer(url) {
    if (url[0] === '~') {
        url = path_1.default.resolve('node_modules', url.substr(1));
    }
    return { file: url };
}
exports.default = importer;
