import fs from 'fs';
import findUnusedCss from '../main/findUnusedCss';
import { Result } from '../main';

/**
 * Returns array of classes/attributes not used in html
 *
 * @param cssPath - styling file path
 * @param htmlContent - html content to analyse
 * @param htmlPath - html file path
 * @returns Promise<([string[], string])>
 */
async function unusedClassMapper(
  cssPath: string,
  htmlContent: string,
  htmlPath: string
): Promise<Result> {
  try {
    // Try to read styling file path in order to determine if file exist
    fs.readFileSync(cssPath);
    try {
      const classes = await findUnusedCss(htmlContent, cssPath);
      if (cssPath && classes.length > 0) {
        return { htmlPath, cssPath, classes };
      }
    } catch (error) {
      return { htmlPath, cssPath, classes: [] };
    }
  } catch (error) {
    return { htmlPath, cssPath: '', classes: [] };
  }
}

export default unusedClassMapper;
