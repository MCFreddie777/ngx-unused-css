import { JSDOM } from 'jsdom';
import combine from '../combine.function';

/**
 * Extract ngClass configuration and return array of all classes found
 * @param {string} value
 */
export function extractClassesFromNgClass(value: string) {
  const found = [];
  const rxp = /{([^}]+)}/g;
  let curMatch;

  while ((curMatch = rxp.exec(value))) {
    found.push(curMatch[1].replace(/\n/g, '').replace(/ /g, ''));
  }

  let classes: string[] = [];

  if (found.length > 0) {
    classes = found[0].split(',').map((e) => e.split(':')[0]);
  }

  return classes;
}

/**
 * Create copy of reference element and add classes passed as a params
 * @param { JSDOM } dom
 * @param { element } e
 * @param { Array<string> } classes
 */
function createCopyOfElementWithClasses(
  dom: JSDOM,
  e: Element,
  classes: string[]
) {
  const el = dom.window.document.createElement(e.tagName);
  e.classList.forEach((c) => el.classList.add(c));
  classes.forEach((c) => el.classList.add(c));
  return el;
}

/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 * @param {string} cssPath
 */
export function parseNgClass(html: string, cssPath: string) {
  const dom = new JSDOM(html);

  const all = dom.window.document.getElementsByTagName('*');

  const inputList = Array.prototype.slice.call(all);
  inputList.forEach((e: Element) => {
    const attrs = Array.prototype.slice.call(e.attributes);
    attrs.forEach((a) => {
      if (a.name === '[ngclass]') {
        const classes = extractClassesFromNgClass(a.value);
        e.removeAttribute('[ngclass]');
        const classCombinations = combine(classes);
        classCombinations.forEach((c) => {
          const el = createCopyOfElementWithClasses(dom, e, c);
          e.parentNode?.insertBefore(el, e.nextSibling);
        });
      }
    });
  });

  return dom.serialize();
}
