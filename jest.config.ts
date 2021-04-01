import { resolve } from 'path';

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: resolve(__dirname, './tsconfig.test.json'),
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};
