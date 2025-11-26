module.exports = {
  root: true,
  extends: [
    "airbnb-base",
    "plugin:json/recommended",
    "plugin:xwalk/recommended",
  ],
  env: {
    browser: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "import/extensions": ["error", { js: "always" }], // require js file extensions in imports
    "linebreak-style": "off", // enforce unix linebreaks
    "no-param-reassign": [2, { props: false }], // allow modifying properties of param
    "quotes": "off", // Allow flexible quotes usage
    "object-curly-newline": "off", // Allow flexible line breaks in objects
    "comma-dangle": "off", // Disable requirement for trailing commas
    "max-len": "off", // Disable max line length enforcement
    "no-console": "off", // Allow console.log statements
    "no-underscore-dangle": "off", // Allow variable names with underscores
    "implicit-arrow-linebreak": "off", // Allow flexible arrow function formatting
    "function-paren-newline": "off", // Allow flexible function parameter line breaks
    "no-mixed-operators": "off", // Allow mixing operators without extra parens,
    "xwalk/max-cells": "off"
  },
};
