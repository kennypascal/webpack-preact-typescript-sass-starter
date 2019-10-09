const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');
const port = require('./package.json').config.port ? require('./package.json').config.port : 3000;

const sourcePath = path.join(__dirname, './src');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval',
  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[path]/bundle-[name].js',
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    host: '0.0.0.0',
    port,
    overlay: true,
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
});
