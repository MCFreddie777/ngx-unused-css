import { Importer } from 'sass';

export type SupportedStyleExt = 'scss' | 'sass' | 'css' | 'less';

export interface SCSSCompilerConfig {
  importer?: Importer;
  includePaths?: string;
}

export type LESSCompilerConfig = Less.Options;

export type StyleConfig = SCSSCompilerConfig | LESSCompilerConfig;

export interface Ignore {
  file: string;
  all?: boolean;
  selectors?: string[];
}

export function isIgnore(arg: any): arg is Ignore {
  return arg && arg.file !== undefined && typeof arg.file === 'string';
}

export interface Config {
  path: string;
  styleExt?: SupportedStyleExt[];
  styleConfig?: StyleConfig;
  ignore?: (string | Ignore)[];
  globalStyles?: string;
  verbose?: boolean;
  removeEmpty?: boolean;
}
