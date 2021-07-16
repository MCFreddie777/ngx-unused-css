/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } arr - Array of strings
 */
export default function combine(arr: string[]) {
  function fn(n: number, src: string[], got: string[], all: string[][]) {
    if (n === 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
  }

  const all: string[][] = [];
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr, [], all);
  }
  all.push(arr);
  return all;
}
