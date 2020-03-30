# Webpack, Preact & Typescript

A bare minimum preact-webpack-typescript boilerplate for quickly creating interactive applications.

**Note:** This project does not include **Server-Side Rendering**,  **Testing Frameworks** or any other items that would make this package unnecessarily complicated.

## Contains

- [x] [Typescript](https://www.typescriptlang.org)
- [x] [Preact](https://preactjs.com/)
- [x] [Preact Compat](https://github.com/developit/preact-compat)

## Build tools

- [x] [Webpack](https://webpack.github.io)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [SASS](https://sass-lang.com)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)

## Preparation
Before you start developing you will need:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) (version 8.12.0 is recommended for this repo)
- [NVM](https://github.com/creationix/nvm) (manage multiple versions of Node and NPM)

## Setup
```
$ npm run setup
```
When running setup you will be prompted to enter information regarding your project.

## Running
```
$ npm run start 
```

## Build

When building the final project and template for deployment run:
```
$ npm run build
```

To add a report analyzing the javascript bundle run:
```
$ npm run build:analyze
```

This will create a build folder with html, javascript and css files along with an assets folder.

# License

MIT