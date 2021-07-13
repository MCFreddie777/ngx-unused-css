"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var __1 = require("../..");
var unusedClassMapper_1 = tslib_1.__importDefault(require("../helpers/unusedClassMapper"));
var findHtml_1 = tslib_1.__importDefault(require("./../helpers/findHtml"));
var findUnusedCss_1 = tslib_1.__importDefault(require("./findUnusedCss"));
var UnusedClasses = /** @class */ (function () {
    function UnusedClasses() {
        this.allHtmlContent = '';
    }
    UnusedClasses.prototype.getUnusedClasses = function (projectPath) {
        var list = findHtml_1.default(projectPath);
        return this.mapClasses(list).then(function (r) {
            return r.filter(function (c) {
                var unusedCssClasses = (c === null || c === void 0 ? void 0 : c.length) ? c[0] : [];
                return unusedCssClasses && unusedCssClasses.length > 0;
            });
        });
    };
    UnusedClasses.prototype.getGlobalUnusedClasses = function (globalStyles) {
        var classes = findUnusedCss_1.default(this.allHtmlContent, globalStyles);
        return classes;
    };
    UnusedClasses.prototype.mapClasses = function (list) {
        var _this = this;
        var promiseArray = list.map(function (element) {
            var htmlPath = element;
            var htmlContent = fs_1.default.readFileSync(htmlPath, 'utf8');
            // Expect same path as the template exept different extension.
            // If styleExt not provided in the config default to .scss
            var cssPath = htmlPath.replace('.html', __1.conf && __1.conf.styleExt ? __1.conf.styleExt : '.scss');
            _this.allHtmlContent += htmlContent;
            return unusedClassMapper_1.default(cssPath, htmlContent, htmlPath);
        });
        return Promise.all(promiseArray);
    };
    return UnusedClasses;
}());
exports.default = UnusedClasses;
//# sourceMappingURL=getUnusedClasses.js.map