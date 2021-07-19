import compileLess from '../../../src/functions/compilers/compile-less.function';

describe('compileLess.function.ts', () => {
  it('should correctly compile .less file', async () => {
    const less = `
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

    const result = await compileLess(
      'tests/samples/sample-component/sample-component.component.less',
      {}
    );

    // compare values without whitespace
    expect(result.replace(/\s/g, '')).toEqual(less.replace(/\s/g, ''));
  });
});
