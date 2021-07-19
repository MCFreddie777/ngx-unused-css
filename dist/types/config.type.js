"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnore = void 0;
function isIgnore(arg) {
    return arg && arg.file !== undefined && typeof arg.file === 'string';
}
exports.isIgnore = isIgnore;
//# sourceMappingURL=config.type.js.map