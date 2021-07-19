import { Importer } from 'sass';
export interface Ignore {
    file: string;
    all?: boolean;
    selectors?: string[];
}
export declare function isIgnore(arg: any): arg is Ignore;
export interface Config {
    path: string;
    styleExt?: 'scss' | 'sass' | 'css';
    ignore?: (string | Ignore)[];
    importer?: Importer;
    includePaths?: string;
    globalStyles?: string;
}
