module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 8,
  },
  rules: {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"],
    "linebreak-style": 1
  },
  root: true,
  extends: ["eslint:recommended"],
};
