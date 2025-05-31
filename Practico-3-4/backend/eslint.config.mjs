import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";


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