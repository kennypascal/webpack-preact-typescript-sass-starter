/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const { getAssetFilename, getTitle } = require('./tools/utilities');

const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const inlineSource = process.argv.indexOf('--env.inline-source') >= 0;

const appEntryPoint = './index.tsx';
const devServerEntryPoint = ['webpack/hot/only-dev-server', 'react-hot-loader/patch', appEntryPoint];

module.exports = {
  context: sourcePath,
  entry: {
    app: isProduction ? appEntryPoint : devServerEntryPoint
  },
  target: 'web',
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, './node_modules'),
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    },
    extensions: ['.ts', '.js', '.tsx', 'jsx', 'json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      // typescript
      // ts-loader: convert typescript (es6) to javascript (es6),
      // babel-loader: converts javascript (es6) to javascript (es5)
      {
        test: /\.(ts)x?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: [path.resolve(__dirname, './node_modules')]
      },

      // babel-loader for pure javascript (es6) => javascript (es5)
      {
        test: /\.(js)x?$/,
        use: ['source-map-loader'],
        exclude: [path.resolve(__dirname, './node_modules')]
      },
      // .ejs
      { test: /\.ejs$/, loader: 'ejs-loader' },
      // scss
      {
        test: /\.(sa|sc|c)ss$/,
        use: [!isProduction ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.svg$/, use: 'raw-loader' },
      {
        test: /\.(jpe?g|png|gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '/',
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Define environment
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
        }
      },
      isProduction: isProduction ? 'true' : 'false'
    }),

    // Determines whether to embed source files (css & js) based on HtmlWebpackPlugin plugin data
    new webpack.DefinePlugin({
      inlineSource: (htmlWebpackPlugin, compilation, sourceType) => {
        let extension;
        if (sourceType === 'script') {
          extension = 'js';
        }
        if (sourceType === 'style') {
          extension = 'css';
        }
        return htmlWebpackPlugin.options.inlineSource && extension
          ? htmlWebpackPlugin.files[extension].map(file => `<${sourceType}>${compilation.assets[file.substr(1)].source()}</${sourceType}>`)
          : '';
      }
    }),

    // extract css
    new MiniCssExtractPlugin({ filename: `${isProduction ? `assets/css/${getAssetFilename()}` : ''}[name].css`, chunkFilename: '[id].css' }),

    // html
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      chunks: ['app'],
      template: 'index.ejs',
      filename: 'index.html',
      title: getTitle()
    })
  ]
};
