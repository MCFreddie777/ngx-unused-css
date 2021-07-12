"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("../constants");
var __1 = require("../..");
var handler_1 = require("./whitelist/handler");
var path_1 = tslib_1.__importDefault(require("path"));
var projectPath = __1.conf.path;
var fileToIgnore = function (cssPath) {
    return __1.conf.ignore
        .filter(function (c) { return typeof c === 'object'; })
        .find(function (c) { return path_1.default.join(projectPath, c.file) === cssPath; });
};
var ignoreSelectors = constants_1.SELECTORS_TO_IGNORE.concat(
// @ts-ignore
__1.conf && __1.conf.ignore && __1.conf.ignore.filter(function (c) { return typeof c === 'string'; }));
function whitelist(classes, cssPath) {
    var ignoreFileMatched = fileToIgnore(cssPath);
    return handler_1.handler(classes, ignoreFileMatched, ignoreSelectors);
}
exports.default = whitelist;
//# sourceMappingURL=whitelist.js.map