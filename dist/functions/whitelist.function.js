"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var selectors_to_ignore_constant_1 = require("../constants/selectors-to-ignore.constant");
var config_type_1 = require("../types/config.type");
var path_1 = tslib_1.__importDefault(require("path"));
var _config;
function ignoreSelectors() {
    var _a;
    return tslib_1.__spread(selectors_to_ignore_constant_1.SELECTORS_TO_IGNORE, (_a = _config === null || _config === void 0 ? void 0 : _config.ignore) === null || _a === void 0 ? void 0 : _a.filter(function (entry) { return typeof entry === 'string'; }));
}
function fileToIgnore(cssPath) {
    if (_config === null || _config === void 0 ? void 0 : _config.ignore) {
        return _config.ignore
            .filter(function (entry) { return config_type_1.isIgnore(entry); })
            .find(function (ignore) { return path_1.default.join(_config.path, ignore.file) === cssPath; });
    }
}
function handle(classes, fileIgnore, ignore) {
    if (fileIgnore) {
        var selectorsToIgnore = fileIgnore.selectors;
        ignore = tslib_1.__spread(ignore, selectorsToIgnore);
        // ignore all unused classes from file
        if (fileIgnore.all) {
            return [];
        }
    }
    // filter ignored selectors
    return classes.filter(function (cls) {
        return !ignore.some(function (selector) { return cls.includes(selector); });
    });
}
function whitelist(classes, cssPath, config) {
    _config = config;
    var ignoreFileMatched = fileToIgnore(cssPath);
    return handle(classes, ignoreFileMatched, ignoreSelectors());
}
exports.default = whitelist;
//# sourceMappingURL=whitelist.function.js.map