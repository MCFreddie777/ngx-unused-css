import { Config, SupportedStyleExt } from '../types/config.type';
/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param styleExt
 * @param {StyleConfig} config
 */
export default function findUnusedCss(content: string, cssPath: string, styleExt: SupportedStyleExt, config: Config): Promise<string[] | undefined>;
