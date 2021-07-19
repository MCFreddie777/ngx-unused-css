import PurgeCSS from 'purgecss';
import compileScss from './compilers/compile-scss.function';
import { parseNgClass } from './extractors/extractClassesFromNgClass';
import whitelist from './whitelist.function';
import {
  Config,
  LESSCompilerConfig,
  SCSSCompilerConfig,
  SupportedStyleExt
} from '../types/config.type';
import compileLess from './compilers/compile-less.function';

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 * @param styleExt
 * @param {StyleConfig} config
 */
export default async function findUnusedCss(
  content: string,
  cssPath: string,
  styleExt: SupportedStyleExt,
  config: Config
) {
  let css = '';

  try {
    if (!cssPath) return;

    switch (styleExt) {
      case 'css':
      case 'scss':
      case 'sass':
        css = compileScss(
          cssPath,
          (config.styleConfig ?? {}) as SCSSCompilerConfig
        );
        break;
      case 'less':
        css = await compileLess(
          cssPath,
          config.styleConfig as LESSCompilerConfig
        );
        break;
    }
  } catch (error) {
    console.log('Error: ', error);
    if (config.verbose) {
      console.error(error);
    }
  }

  try {
    const html = parseNgClass(content);

    const purgeCSSOptions = {
      content: [
        {
          raw: html,
          extension: 'html'
        }
      ],
      css: [{ raw: css }],
      rejected: true
    };

    const purgeCSSResult = await new PurgeCSS().purge(purgeCSSOptions);

    const result: string[] = purgeCSSResult[0].rejected ?? [];
    return whitelist(result, cssPath, config);
  } catch (error) {
    if (config.verbose) {
      console.error(error);
    }
  }
}
