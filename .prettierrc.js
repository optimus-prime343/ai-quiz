/**
 * @type {import("prettier").Config}
 */
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  endOfLine: 'auto',
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
}
