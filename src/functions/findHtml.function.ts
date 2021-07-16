import fs from 'fs';
import path from 'path';

// source: https://gist.github.com/victorsollozzo/4134793

/**
 * Find all html files in the project
 *
 * @param base
 * @param extension
 * @param files
 * @param result
 * @returns
 */
export default function findHtmlFunction(
  base: string,
  extension: string = 'html',
  files: string[] = [],
  result: string[] = []
): string[] {
  if (!base) {
    return [];
  }

  if (!files.length) {
    files = fs.readdirSync(base);
  }

  files.forEach((file) => {
    const newBase = path.join(base, file);

    if (fs.statSync(newBase).isDirectory()) {
      result = findHtmlFunction(newBase, extension, fs.readdirSync(newBase), result);
    } else {
      if (file.substr(-1 * (extension.length + 1)) === '.' + extension) {
        result.push(newBase);
      }
    }
  });

  return result;
}
