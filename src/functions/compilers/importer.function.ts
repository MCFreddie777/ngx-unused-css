import path from 'path';

/**
 * Resolve tilde relative imports from node_modules
 * @param {*} url
 */
export default function importer(url: string) {
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1));
  }
  return { file: url };
}
