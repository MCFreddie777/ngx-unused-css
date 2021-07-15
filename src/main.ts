import { conf } from './../index';
import UnusedClasses from './main/getUnusedClasses';

class Main {
  constructor() {
    const unusedClasses = new UnusedClasses();

    unusedClasses.getUnusedClasses(conf.path).then((res) => {
      if (conf.globalStyles) {
        unusedClasses.getGlobalUnusedClasses(conf.globalStyles).then((r) => {
          if (r.length > 0) {
            // @ts-ignore
            res.push([r, '***** GLOBAL UNUSED CSS *****']);
          }
        });
      }

      // filter out empty classes
      res = res.filter((value) => {
        try {
          return value.classes.length !== 0;
        } catch (e) {
          console.log(' value: ', value);
          return false;
        }
      });
      console.log(JSON.stringify(res));
    });
  }
}

export default Main;

export interface Result {
  htmlPath: string;
  cssPath: string | undefined;
  classes: string[];
}
