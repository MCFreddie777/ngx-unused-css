import { SELECTORS_TO_IGNORE } from '../constants/selectors-to-ignore.constant';
import { Config, Ignore, isIgnore } from '../types/config.type';
import path from 'path';

let _config: Config;

function ignoreSelectors() {
  return [
    ...SELECTORS_TO_IGNORE,
    ..._config?.ignore?.filter(
      (entry): entry is string => typeof entry === 'string'
    )
  ];
}

function fileToIgnore(cssPath: string): Ignore | undefined {
  if (_config?.ignore) {
    return _config.ignore
      .filter((entry): entry is Ignore => isIgnore(entry))
      .find((ignore) => path.join(_config.path, ignore.file) === cssPath);
  }
}

function handle(
  classes: string[],
  fileIgnore: Ignore | undefined,
  ignore: string[]
) {
  if (fileIgnore) {
    const selectorsToIgnore = fileIgnore.selectors;
    ignore = [...ignore, ...selectorsToIgnore];

    // ignore all unused classes from file
    if (fileIgnore.all) {
      return [];
    }
  }

  // filter ignored selectors
  return classes.filter((cls) => {
    return !ignore.some((selector) => cls.includes(selector));
  });
}

export default function whitelist(
  classes: string[],
  cssPath: string,
  config: Config
) {
  _config = config;
  const ignoreFileMatched = fileToIgnore(cssPath);
  return handle(classes, ignoreFileMatched, ignoreSelectors());
}
