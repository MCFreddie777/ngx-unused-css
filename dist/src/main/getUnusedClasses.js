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
        var _this = this;
        var htmlFilePaths = findHtml_1.default(projectPath);
        return Promise.all(htmlFilePaths.map(function (htmlPath) {
            var htmlContent = fs_1.default.readFileSync(htmlPath, 'utf8');
            var stylesPath = htmlPath.replace('.html', __1.conf && __1.conf.styleExt ? __1.conf.styleExt : '.scss');
            _this.allHtmlContent += htmlContent;
            return unusedClassMapper_1.default(stylesPath, htmlContent, htmlPath);
        }));
    };
    UnusedClasses.prototype.getGlobalUnusedClasses = function (globalStyles) {
        var classes = findUnusedCss_1.default(this.allHtmlContent, globalStyles);
        return classes;
    };
    return UnusedClasses;
}());
exports.default = UnusedClasses;
//# sourceMappingURL=getUnusedClasses.js.map