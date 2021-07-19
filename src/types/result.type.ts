export enum ResultType {
  component = 'component',
  // eslint-disable-next-line no-unused-vars
  global = 'global'
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
