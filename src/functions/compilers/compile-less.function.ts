import less from 'less';
import { LESSCompilerConfig } from '../../types/config.type';
import * as fs from 'fs';

/**
 * Compile Less
 * @param {string} cssPath
 * @param config
 */
export default async function compileLess(
  cssPath: string,
  config: LESSCompilerConfig
) {
  try {
    const result = await less.render(
      fs.readFileSync(cssPath).toString(),
      config
    );
    return result.css;
  } catch (error) {
    throw new Error(error);
  }
}
