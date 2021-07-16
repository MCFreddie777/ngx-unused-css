import fs from 'fs';
import findUnusedCss from '../../src/functions/findUnusedCss.function';

describe('findUnusedCss.function.ts', () => {
  it('should return unused css classes', async () => {
    const basePath = 'tests/samples/sample-component';
    const templatePath = fs.readFileSync(
      `${basePath}/sample-component.component.html`,
      'utf8'
    );
    const stylesPath = `${basePath}/sample-component.component.scss`;

    const classes = await findUnusedCss(templatePath, stylesPath, {
      path: basePath,
      ignore: ['sample-component'] // ignore the component itself
    });

    expect(classes).toEqual(['.unused-class']);
  });
});
