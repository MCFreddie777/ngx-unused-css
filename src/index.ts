import chalk from 'chalk';
import { table } from 'table';
import { Config } from './types/config.type';
import UnusedClasses from './main/getUnusedClasses';

export default class NgxUnusedCss {
  config: Config;

  constructor (config?: Config) {
    if (config) {
      this.config = config;
    }
  }

  async findUnusedClasses(config?: Config) {
    if (!config || !this.config) {
      throw new Error('Config not provided.');
    }
    const unusedClasses = new UnusedClasses();

    const res = await unusedClasses.getUnusedClasses(config.path);

    if (config.globalStyles) {
      const r = await unusedClasses.getGlobalUnusedClasses(config.globalStyles);

      if (r.length > 0) {
        res.push([r, '***** GLOBAL UNUSED CSS *****']);
      }

      if (res.length > 0) {
        this.log(res);
      }
    } else {
      if (res.length > 0) {
        this.log(res);
      }
    }

    return res;
  }

  private log (classes: [[string[], string]]) {
    let result = '';

    classes.forEach((e: [string[], string]) => {
      const htmlPath = e[1];
      const cssPath = e[1].replace('.html', '.scss');

      result += chalk.red(htmlPath) + '\n';
      result += chalk.red.bold(cssPath) + '\n';

      const cssClasses = e[0].join('\n');

      result += table([[chalk.green(cssClasses)]]);
    });

    console.log(
      chalk.red.bold('Unused CSS classes were found for the following files:\n')
    );

    console.log(result);
    process.exit(1);
  }
}
