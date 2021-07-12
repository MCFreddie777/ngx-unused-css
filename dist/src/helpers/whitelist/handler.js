"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
function handler(classes, fileIgnore, ignore) {
    if (fileIgnore) {
        var selectorsToIgnore = fileIgnore.selectors;
        ignore = ignore.concat(selectorsToIgnore);
        // ignore all unused classes from file
        if (fileIgnore.all) {
            return [];
        }
    }
    // filter ignored selectors
    classes = classes.filter(function (c) {
        var ignoredSelectorFound = ignore.some(function (s) {
            return c.indexOf(s) > -1;
        });
        return !ignoredSelectorFound;
    });
    return classes;
}
exports.handler = handler;
//# sourceMappingURL=handler.js.map