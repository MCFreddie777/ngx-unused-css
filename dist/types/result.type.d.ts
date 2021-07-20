export declare enum ResultType {
    component = "component",
    global = "global"
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
