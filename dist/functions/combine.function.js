"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } arr - Array of strings
 */
function combine(arr) {
    function fn(n, src, got, all) {
        if (n === 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
    }
    var all = [];
    for (var i = 0; i < arr.length; i++) {
        fn(i, arr, [], all);
    }
    all.push(arr);
    return all;
}
exports.default = combine;
