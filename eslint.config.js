// ESLint v9 flat configuration (CommonJS format)
// Migrated from .eslintrc.js for compatibility with ESLint 9.x

const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'build/**',
      '.docusaurus/**',
      'dist/**',
      '*.config.js',
      '*.config.ts',
    ],
  },

  // Base JavaScript config
  js.configs.recommended,

  // TypeScript and React files
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        node: true,
        es6: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 18+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off', // Allow require() for Docusaurus assets
      'no-undef': 'off', // TypeScript handles this
    },
  },

  // Prettier config (disable conflicting rules)
  prettierConfig,
];
