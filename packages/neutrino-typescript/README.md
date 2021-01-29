# Neutrino typescript middleware

Adds typescript 3+ support via `@babel/preset-typescript`.

## Usage

Options:

- forkTSChecker.enable - bool, enables [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin), true by default.
- forkTSChecker.options - object, options to pass to `fork-ts-checker-webpack-plugin`

Example:

```
const typescript = require('neutrino-typescript');

module.exports = {
    use: [
        react(),
        typescript({
            forkTSChecker: {
                options: {
                    typescript: { memoryLimit: 3000 },
                },
            },
        }),
    ]
}
```
