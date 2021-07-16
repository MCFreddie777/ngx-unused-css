export enum ResultType {
  // eslint-disable-next-line no-unused-vars
  component,
  // eslint-disable-next-line no-unused-vars
  global
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

export type Result = ComponentResult | GlobalStylesResult;
