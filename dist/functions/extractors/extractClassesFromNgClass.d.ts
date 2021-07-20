/**
 * Extract ngClass configuration and return array of all classes found
 * @param {string} value
 */
export declare function extractClassesFromNgClass(value: string): string[];
/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 */
export declare function parseNgClass(html: string): string;
