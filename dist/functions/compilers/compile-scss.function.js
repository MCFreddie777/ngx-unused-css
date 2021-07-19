"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sass_1 = tslib_1.__importDefault(require("sass"));
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
/**
 * Compile SCSS
 * @param {string} cssPath
 * @param config
 */
function compileScss(cssPath, config) {
    var scssOptions = {
        file: cssPath,
        importer: [importer]
    };
    if (config.importer) {
        scssOptions.importer.push(config.importer);
    }
    if (config.includePaths) {
        scssOptions.includePaths = [config.includePaths];
    }
    var result = sass_1.default.renderSync(scssOptions);
    return result.css.toString();
}
exports.default = compileScss;
//# sourceMappingURL=compile-scss.function.js.map