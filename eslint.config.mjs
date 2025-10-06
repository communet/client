import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
      eslintPluginImport.flatConfigs.react,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2025,
      globals: globals.browser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2025,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.eslint.json',
        projectService: true,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/no-absolute-path': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'class-methods-use-this': 'error',
      'import/order': [
        'error',
        {
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'after' }],
          groups: ['builtin', 'external', 'index', 'internal', 'parent', 'sibling', 'object', 'type'],
          'newlines-between': 'always',
        },
      ],
    },
  },
])
