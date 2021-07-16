import PurgeCSS from 'purgecss';
import compileScss from './compilers/compile-scss.function';
import { parseNgClass } from './extractors/extractClassesFromNgClass';
import whitelist from './whitelist.function';
import { Config } from '../types/config.type';

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param {Config} config
 */
export default async function findUnusedCssFunction(
  content: string,
  cssPath: string,
  config: Config
) {
  let css = '';
  try {
    if (!cssPath) return;
    css = compileScss(cssPath, config);
  } catch (error) {
    console.error(error);
  }

  try {
    const html = parseNgClass(content, cssPath);

    const options = {
      content: [
        {
          raw: html,
          extension: 'html'
        }
      ],
      css: [{ raw: css }],
      rejected: true
    };

    const purgeCSSResult = await new PurgeCSS().purge(options);
    const result: string[] = purgeCSSResult[0].rejected ?? [];
    return whitelist(result, cssPath, config);
  } catch (error) {
    console.error(error);
  }
}
