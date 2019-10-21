# Neutrino middleware to support eslint in typescript project

Adds typescript support for eslint 6.x and typescript 3.x.

## Usage

Middleware accepts options eslint options object that will be merged with base options.

Example:
```
const typescriptEslint = require('neutrino-typescript-eslint');

module.exports = {
    use: [
        react(),
        eslint(),
        typescriptEslint({ parserOptions: { project: './tsconfig.eslint.json' } }),
    ]
}
```
