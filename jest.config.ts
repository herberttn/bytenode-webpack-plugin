import { resolve } from 'path';

const ignorePatterns = [
  '<rootDir>/node_modules/',
  '<rootDir>/test/webpack/fixtures/',
  '<rootDir>/test/webpack/output/',
];

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ignorePatterns,
  globals: {
    'ts-jest': {
      tsconfig: resolve(__dirname, './tsconfig.test.json'),
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  watchPathIgnorePatterns: ignorePatterns,
};
