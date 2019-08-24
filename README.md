# Gulp and Webpack - Core Configuration
HTML, SCSS, ES6+, Gulp, Webpack (Import and Export Modules), Translations.

## Getting Started
`$ npm install`

## How to use
Work with the following directories and files:
- src/index.html
- src/assets
- src/js
- src/scss
- src/translations

## Commands
Just build and finish

`$ gulp build`

Build and serve

`$ gulp serve`

Build, serve and watch for changes

`$ gulp watch`

## Custom Config
Open `gulpfile.js` and find the following peace of code:
```
const PORT = 3000;
const SRC_DIR = 'src';
const OUT_DIR = 'dist';
const WEBPACK_OUT_DIR = OUT_DIR + '/';
const SRC_TRANS = 'en_GB.json'; // If it's changed on watch, you have to call $ gulp watch again
const IMG_EXT = '{jpg,gif,png}'; // Available image extensions
const DEFAULT_TASKS = [cleanDest, copy, translate, processJs, processCss];
 ```

## Related Topics
Any problems with an architecture your Angular App? Visit https://github.com/bartuck/angular-best-boilerplate
