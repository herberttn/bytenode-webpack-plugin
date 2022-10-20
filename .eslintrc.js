/* eslint-env node */

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      'tsconfig.project.json',
      'tsconfig.test.json',
    ],
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  root: true,
  rules: commonRules(),
  overrides: [
    overrideForTypeScriptFiles(),
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.js',
        '.ts',
      ],
    },
  },
};

function commonRules() {
  return {
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'import/extensions': ['error', {
      js: 'never',
      json: 'always',
    }],
    'import/first': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': ['error', {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
    }],
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxBOF: 0,
      maxEOF: 1,
    }],
    'no-tabs': 'error',
    'no-use-before-define': 'off', // enhanced by @typescript-eslint
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'quotes': ['error', 'single', {
      allowTemplateLiterals: true,
    }],
    'require-await': 'off', // enhanced by @typescript-eslint
    'rest-spread-spacing': ['error', 'never'],
    'semi': 'off', // enhanced by @typescript-eslint
    'semi-style': ['error', 'last'],
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
    }],
    'sort-keys': ['error', 'asc', {
      caseSensitive: false,
      natural: true,
    }],
    'sort-vars': ['error', {
      ignoreCase: true,
    }],
  };
}

function overrideForTypeScriptFiles() {
  return {
    files: '*.ts',
    excludedFiles: '*.js',
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/typescript',
    ],
    rules: {
      '@typescript-eslint/ban-ts-comment': ['off', {
        minimumDescriptionLength: 20,
        'ts-check': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
        'ts-nocheck': 'allow-with-description',
      }],
      '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        disallowTypeAnnotations: true,
        prefer: 'type-imports',
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/explicit-member-accessibility': 'off',

      // switching this off because it doesn't really understand type guards
      // and it's less strict than @typescript-eslint/explicit-function-return-type anyway
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/member-delimiter-style': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extra-semi': 'error',
      '@typescript-eslint/no-floating-promises': ['error', {
        ignoreIIFE: true,
        ignoreVoid: true,
      }],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/semi': ['error', 'always', {
        omitLastInOneLineBlock: false,
      }],
    },
  };
}
