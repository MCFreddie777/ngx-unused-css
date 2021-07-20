"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sass_1 = tslib_1.__importDefault(require("sass"));
var importer_function_1 = tslib_1.__importDefault(require("./importer.function"));
/**
 * Compile SCSS
 * @param {string} cssPath
 * @param config
 */
function compileScss(cssPath, config) {
    var scssOptions = {
        file: cssPath,
        importer: [importer_function_1.default]
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
