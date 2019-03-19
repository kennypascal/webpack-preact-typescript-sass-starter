const webpackConfig = require('./webpack.config');
const path = require('path');
const isProduction = process.argv.indexOf('-p') >= 0;

// variables
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');
const merge = require('webpack-merge');
const analyze = process.argv.indexOf('--env.analyze') >= 0;

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// utilities
const getAssetFilename = require('./tools/utilities').getAssetFilename;

module.exports = merge(webpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: false,
            drop_console: true
          },
          ecma: 5,
          warnings: false,
          mangle: true,
          output: {
            comments: false
          }
        },
        sourceMap: true
      })
    ]
  },
  stats: {
    modules: false,
    children: false,
    assetsSort: '!field'
  },
  output: {
    path: outPath,
    filename: (isProduction ? `assets/js/${getAssetFilename()}` : '') + `[name].js`,
    publicPath: '/'
  },
  plugins: [
    // clean the build directory
    new CleanWebpackPlugin([outPath], { verbose: false }),

    // analyze bundled javascript
    new BundleAnalyzerPlugin({ analyzerMode: analyze ? 'static' : 'disabled' })
  ]
});
