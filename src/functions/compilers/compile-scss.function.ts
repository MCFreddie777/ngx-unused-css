import sass, { Importer, Options } from 'sass';
import { SCSSCompilerConfig } from '../../types/config.type';
import importer from './importer.function';

/**
 * Compile SCSS
 * @param {string} cssPath
 * @param config
 */
export default function compileScss(
  cssPath: string,
  config: SCSSCompilerConfig
) {
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
