import fs from 'fs';
import { conf } from '../..';
import unusedClassMapper from '../helpers/unusedClassMapper';
import findHtml from './../helpers/findHtml';
import findUnusedCss from './findUnusedCss';
export default class UnusedClasses {
  private allHtmlContent = '';

  getUnusedClasses(projectPath: string) {
    const htmlFilePaths = findHtml(projectPath);
    return Promise.all(
      htmlFilePaths.map((htmlPath) => {
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        const stylesPath = htmlPath.replace(
          '.html',
          conf && conf.styleExt ? conf.styleExt : '.scss'
        );
        this.allHtmlContent += htmlContent;
        return unusedClassMapper(stylesPath, htmlContent, htmlPath);
      })
    );
  }

  getGlobalUnusedClasses(globalStyles: string) {
    const classes = findUnusedCss(this.allHtmlContent, globalStyles);
    return classes;
  }
}
