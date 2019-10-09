/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const webpack = path.join(__dirname, 'webpack');

const isProduction = process.argv.indexOf('-p') >= 0;

const postcssImport = require('postcss-import')({ addDependencyTo: webpack, path: ['node_modules', 'src'] });
const postcssUrl = require('postcss-url')();
const postcssCssNext = require('postcss-cssnext')({ browsers: ['last 2 versions', 'ie >= 9', 'iOS 7'] });
const postcssCssReporter = require('postcss-reporter')({ clearReportedMessages: true });
const postcssCssDiscardComments = require('postcss-discard-comments')({ removeAll: true });
const postcssCssBrowserReporter = require('postcss-browser-reporter')({ disabled: isProduction });
const postcssFailOnWarn = require('postcss-fail-on-warn');

module.exports = {
  plugins: [postcssImport, postcssUrl, postcssCssNext, postcssCssReporter, postcssCssDiscardComments, postcssCssBrowserReporter, postcssFailOnWarn],
};
