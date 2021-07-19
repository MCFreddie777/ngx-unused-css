import fs from 'fs';
import { flatten } from 'lodash';
import { Config } from './types/config.type';
import findUnusedCss from './functions/findUnusedCss.function';
import findHtmlFunction from './functions/findHtml.function';
import { Result, ResultType } from './types/result.type';

let allHtmlContent = '';

export default async function getUnusedStyles(
  config: Config
): Promise<Result[]> {
  // default config
  config = {
    styleExt: ['scss'],
    verbose: false,
    removeEmpty: true,
    ...config
  };

  // find path to html files in project
  const templatePaths = findHtmlFunction(config.path);

  // extract all unused css classes from templates
  let result: Result[] = flatten(
    await Promise.all(
      templatePaths.map(async (templatePath) => {
        const templateFileContents = fs.readFileSync(templatePath, 'utf8');
        allHtmlContent += templateFileContents;

        return Promise.all(
          (config.styleExt ?? []).map(async (styleExt) => {
            const stylesPath = templatePath.replace('.html', `.${styleExt}`);
            let classes: string[] | undefined;

            // Try to read styling file path in order to determine if file exist
            try {
              fs.readFileSync(stylesPath);
            } catch (error) {
              if (config.verbose) {
                console.log(error);
              }
            }

            // Try to compile styles and extract unused styles
            try {
              classes = await findUnusedCss(
                templatePath,
                stylesPath,
                styleExt,
                config
              );
            } catch (error) {
              if (config.verbose) {
                console.log(error);
              }
            }

            return {
              type: ResultType.component,
              templatePath,
              stylesPath,
              classes: classes ?? []
            };
          })
        );
      })
    )
  );

  // Check the global styles
  if (config.globalStyles) {
    (config.styleExt ?? []).map(async (styleExt) => {
      const unusedGlobalStyles = await findUnusedCss(
        allHtmlContent,
        config.globalStyles!,
        styleExt,
        config
      );

      if (unusedGlobalStyles?.length) {
        result.push({ type: ResultType.global, classes: unusedGlobalStyles });
      }
    });
  }

  if (config.removeEmpty) {
    result = result.filter((entry) => !!entry.classes.length);
  }

  return result;
}
