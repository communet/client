import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: { 'no-relative-import-paths': noRelativeImportPaths, },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { rootDir: 'src', prefix: '@', allowSameFolder: false },
      ],
      'no-return-await': 'error',
      'no-async-promise-executor': 'error',
      'array-callback-return': 'error',
      'no-await-in-loop': 'error',
      'no-class-assign': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-constructor-return': 'error',
      'no-plusplus': 'error',
      'prettier/prettier': 'error',
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
    ],
  },

  ...defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended
  ),

  skipFormatting,
];
