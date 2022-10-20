// eslint-disable-next-line @typescript-eslint/consistent-type-imports
async function mockBytenode(mock: Partial<typeof import('bytenode')>): Promise<void> {
  jest.doMock('bytenode', () => {
    const bytenode = jest.requireActual('bytenode');

    return { ...bytenode, ...mock };
  });

  const bytenode = await import('bytenode');
  expect(bytenode).toMatchObject(mock);
}

export {
  mockBytenode,
};
