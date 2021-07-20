/// <reference types="less" />
import { Importer } from 'sass';
export declare type SupportedStyleExt = 'scss' | 'sass' | 'css' | 'less';
export interface SCSSCompilerConfig {
    importer?: Importer;
    includePaths?: string;
}
export declare type LESSCompilerConfig = Less.Options;
export declare type StyleConfig = SCSSCompilerConfig | LESSCompilerConfig;
export interface Ignore {
    file: string;
    all?: boolean;
    selectors?: string[];
}
export declare function isIgnore(arg: any): arg is Ignore;
export interface Config {
    path: string;
    styleExt?: SupportedStyleExt[];
    styleConfig?: StyleConfig;
    ignore?: (string | Ignore)[];
    globalStyles?: string;
    verbose?: boolean;
    removeEmpty?: boolean;
}
