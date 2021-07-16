import { Importer } from 'sass';

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
  styleExt?: 'scss' | 'sass' | 'css';
  ignore?: (string | Ignore)[];
  importer?: Importer;
  includePaths?: string;
  globalStyles?: string;
  verbose?: boolean;
  removeEmpty?: boolean;
}
