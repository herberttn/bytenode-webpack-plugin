const UNIX_PLATFORMS: NodeJS.Platform[] = ['darwin', 'linux'];
const ALL_PLATFORMS: NodeJS.Platform[] = [...UNIX_PLATFORMS, 'win32'];

async function mockPlatform(platform: NodeJS.Platform): Promise<void> {
  jest.resetModules();
  jest.doMock('os', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const os = jest.requireActual('os');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...os, platform: () => platform };
  });

  const os = await import('os');
  expect(os.platform()).toBe(platform);
}

export {
  ALL_PLATFORMS,
  mockPlatform,
  UNIX_PLATFORMS,
};
