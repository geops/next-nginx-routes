import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  jest.configs["flat/recommended"],
  prettier,
];
