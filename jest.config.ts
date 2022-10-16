import { resolve } from 'path';

import type { Config } from 'jest';

const ignorePatterns = [
  '<rootDir>/node_modules/',
  '<rootDir>/test/webpack/fixtures/',
  '<rootDir>/test/webpack/output/',
];

export default function(): Config {
  return {
    collectCoverage: true,
    coveragePathIgnorePatterns: ignorePatterns,
    preset: 'ts-jest/presets/default',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: resolve(__dirname, './tsconfig.test.json'),
      }],
    },
    verbose: true,
    watchPathIgnorePatterns: ignorePatterns,
  };
}
