export declare enum ResultType {
    component = 0,
    global = 1
}
interface GlobalStylesResult {
    type: ResultType.global;
    classes: string[];
}
interface ComponentResult {
    type: ResultType.component;
    templatePath: string;
    stylesPath: string;
    classes: string[];
}
export declare type Result = ComponentResult | GlobalStylesResult;
export {};
