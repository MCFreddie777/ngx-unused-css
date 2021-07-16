import sass, { Importer, Options } from 'sass';
import path from 'path';
import { Config } from '../../types/config.type';

/**
 * Resolve tilde relative imports from node_modules
 * @param {*} url
 */
function importer(url: string) {
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1));
  }
  return { file: url };
}

/**
 * Compile SCSS
 * @param {string} cssPath
 * @param config
 */
export default function compileScss(cssPath: string, config: Config) {
  const scssOptions: Options = {
    file: cssPath,
    importer: [importer]
  };

  if (config.importer) {
    (scssOptions.importer as Importer[]).push(config.importer);
  }

  if (config.includePaths) {
    scssOptions.includePaths = [config.includePaths];
  }

  const result = sass.renderSync(scssOptions);
  return result.css.toString();
}
