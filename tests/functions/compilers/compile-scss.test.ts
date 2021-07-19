import compileScss from '../../../src/functions/compilers/compile-scss.function';

describe('compileScss.function.ts', () => {
  it('should correctly compile .scss file', async () => {
    const scss = `
sample-component {
  display: inline-flex;
}

.centered,
.anchor {
  color: #bada55;
}

.classInNgClass {
  color: #bada55;
}

.class1,
.class2,
.class3,
.class4 {
  color: #bada55;
}

.unused-class {
  color: #bada55;
}

span.class1 {
  color: #bada55;
}
`;

    const result = await compileScss(
      'tests/samples/sample-component/sample-component.component.scss',
      {}
    );

    // compare values without whitespace
    expect(result.replace(/\s/g, '')).toEqual(scss.replace(/\s/g, ''));
  });
});
