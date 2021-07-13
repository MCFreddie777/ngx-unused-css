/// <reference types="ngx-unused-css" />

import { Config } from './types/config.type';

declare namespace NgxUnusedCss {
  class NgxUnusedCss {
    constructor(config?: Config);
    findUnusedClasses(config?: Config): any;
  }
}
