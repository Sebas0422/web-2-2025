import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier },
    languageOptions: { globals: globals.node },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
    },
  },
]);
