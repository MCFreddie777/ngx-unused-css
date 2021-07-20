"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNgClass = exports.extractClassesFromNgClass = void 0;
var tslib_1 = require("tslib");
var jsdom_1 = require("jsdom");
var combine_function_1 = tslib_1.__importDefault(require("../combine.function"));
/**
 * Extract ngClass configuration and return array of all classes found
 * @param {string} value
 */
function extractClassesFromNgClass(value) {
    var found = [];
    var rxp = /{([^}]+)}/g;
    var curMatch;
    while ((curMatch = rxp.exec(value))) {
        found.push(curMatch[1].replace(/\n/g, '').replace(/ /g, ''));
    }
    var classes = [];
    if (found.length > 0) {
        classes = found[0].split(',').map(function (e) { return e.split(':')[0]; });
    }
    return classes;
}
exports.extractClassesFromNgClass = extractClassesFromNgClass;
/**
 * Create copy of reference element and add classes passed as a params
 * @param { JSDOM } dom
 * @param { element } e
 * @param { Array<string> } classes
 */
function createCopyOfElementWithClasses(dom, e, classes) {
    var el = dom.window.document.createElement(e.tagName);
    e.classList.forEach(function (c) { return el.classList.add(c); });
    classes.forEach(function (c) { return el.classList.add(c); });
    return el;
}
/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 */
function parseNgClass(html) {
    var dom = new jsdom_1.JSDOM(html);
    var all = dom.window.document.getElementsByTagName('*');
    var inputList = Array.prototype.slice.call(all);
    inputList.forEach(function (e) {
        var attrs = Array.prototype.slice.call(e.attributes);
        attrs.forEach(function (a) {
            if (a.name === '[ngclass]') {
                var classes = extractClassesFromNgClass(a.value);
                e.removeAttribute('[ngclass]');
                var classCombinations = combine_function_1.default(classes);
                classCombinations.forEach(function (c) {
                    var _a;
                    var el = createCopyOfElementWithClasses(dom, e, c);
                    (_a = e.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, e.nextSibling);
                });
            }
        });
    });
    return dom.serialize();
}
exports.parseNgClass = parseNgClass;
