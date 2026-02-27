// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [{
  files: ["**/*.{js,mjs,cjs,jsx}"],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    globals: globals.browser,
  },
}, pluginJs.configs.recommended, // Konfigurasi React dengan penambahan 'settings'
{
  ...pluginReactConfig,
  // <-- PERUBAHAN: Blok ini ditambahkan untuk deteksi versi React
  settings: {
    react: {
      version: "detect", // Otomatis mendeteksi versi React dari package.json
    },
  },
}, ...storybook.configs["flat/recommended"]];