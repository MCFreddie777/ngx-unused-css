import { LESSCompilerConfig } from '../../types/config.type';
/**
 * Compile Less
 * @param {string} cssPath
 * @param config
 */
export default function compileLess(cssPath: string, config: LESSCompilerConfig): Promise<string>;
