"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("./../index");
var getUnusedClasses_1 = tslib_1.__importDefault(require("./main/getUnusedClasses"));
var Main = /** @class */ (function () {
    function Main() {
        var unusedClasses = new getUnusedClasses_1.default();
        unusedClasses.getUnusedClasses(index_1.conf.path).then(function (res) {
            if (index_1.conf.globalStyles) {
                unusedClasses.getGlobalUnusedClasses(index_1.conf.globalStyles).then(function (r) {
                    if (r.length > 0) {
                        // @ts-ignore
                        res.push([r, '***** GLOBAL UNUSED CSS *****']);
                    }
                });
            }
            // filter out empty classes
            res = res.filter(function (value) {
                try {
                    return value.classes.length !== 0;
                }
                catch (e) {
                    console.log(' value: ', value);
                    return false;
                }
            });
            console.log(JSON.stringify(res));
        });
    }
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=main.js.map