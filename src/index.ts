import fs from 'fs';
import { Config } from './types/config.type';
import findUnusedCss from './functions/findUnusedCss.function';
import findHtmlFunction from './functions/findHtml.function';
import { Result, ResultType } from './types/result.type';

let allHtmlContent = '';

export default async function getUnusedStyles(
  config: Config
): Promise<Result[]> {
  // find path to html files in project
  const templatePaths = findHtmlFunction(config.path);

  // extract all css classes from templates
  const result: Result[] = await Promise.all(
    templatePaths.map(async (templatePath) => {
      const templateFileContents = fs.readFileSync(templatePath, 'utf8');
      allHtmlContent += templateFileContents;

      // Expect same path as the template except different extension.
      // If styleExt not provided in the config default to .scss
      const stylesPath = templatePath.replace(
        '.html',
        config?.styleExt ?? '.scss'
      );

      let classes: string[] | undefined;

      // Try to read styling file path in order to determine if file exist
      try {
        fs.readFileSync(stylesPath);
      } catch (error) {
        console.log(error);
      }

      // Try to compile styles and extract unused styles
      try {
        classes = await findUnusedCss(templatePath, stylesPath, config);
      } catch (error) {
        console.log(error);
      }

      return {
        type: ResultType.component,
        templatePath,
        stylesPath,
        classes: classes ?? []
      };
    })
  );

  // Check the global styles
  if (config.globalStyles) {
    const unusedGlobalStyles = await findUnusedCss(
      allHtmlContent,
      config.globalStyles,
      config
    );

    if (unusedGlobalStyles?.length) {
      result.push({ type: ResultType.global, classes: unusedGlobalStyles });
    }
  }

  return result;
}
