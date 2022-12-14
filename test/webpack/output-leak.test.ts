import { readFixtureContent, runWebpack } from './runner';

describe('output', () => {

  const entry = './fixtures/first.js';
  const loader = 'main.js';
  const target = 'main.compiled.jsc';

  test('should not leak target code in the loader code', async () => {
    const { assets, names } = await runWebpack({ entry });
    expect(names).toStrictEqual([target, loader]);

    const entryContent = await readFixtureContent(entry);
    const loaderContent = assets[loader].content;
    expect(loaderContent).not.toContain(entryContent);
  });

  test('should import the targets compiled file', async () => {
    const { assets, names } = await runWebpack({ entry });
    expect(names).toStrictEqual([target, loader]);

    const loaderContent = assets[loader].content;
    expect(loaderContent).toContain(target);
  });

});
