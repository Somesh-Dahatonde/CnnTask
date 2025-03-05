module.exports = {
  parser: "@typescript-eslint/parser", // Ensures TypeScript files are parsed correctly
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module", // Ensures ES Modules are allowed
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
