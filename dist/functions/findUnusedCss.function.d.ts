import { Config } from '../types/config.type';
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param {Config} config
 */
export default function findUnusedCssFunction(content: string, cssPath: string, config: Config): Promise<string[] | undefined>;
