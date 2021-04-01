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
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test/input/',
    '<rootDir>/test/output/',
  ],
};
