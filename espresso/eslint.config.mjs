/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended" // Prettier-specific config
    ],
    plugins: ["prettier"], // Enforce Prettier rules
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_" }, // Ignore unused variables starting with _
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "camelcase": ["error", { "properties": "always" }],
      "no-empty-function": "warn",
      "vars-on-top": "error",
      "space-infix-ops": "error", // Enforce spaces around operators
      "linebreak-style": ["error", "unix"], // Enforce Unix line breaks
    },
  },
  pluginJs.configs.recommended,
];
