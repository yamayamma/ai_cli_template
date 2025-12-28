// Prettier configuration
// https://prettier.io/docs/en/configuration.html

export default {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  endOfLine: "lf",
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 100,
      },
    },
  ],
};
