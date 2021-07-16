import combine from '../../src/functions/combine.function';

describe('Combine function', () => {
  it('should return correct output for array with a single entry', () => {
    const results = combine(['a']);
    expect(results).toEqual([['a']]);
  });

  it('should return correct output for array with multiple entries', () => {
    const results = combine(['a', 'b']);
    expect(results).toEqual([['a'], ['b'], ['a', 'b']]);
  });
});
