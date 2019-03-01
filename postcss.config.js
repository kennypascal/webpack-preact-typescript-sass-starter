const webpack = require('webpack');
const isProduction = process.argv.indexOf('-p') >= 0;

module.exports = {
	plugins: [
		require('postcss-import')({ addDependencyTo: webpack }),
		require('postcss-url')(),
		require('postcss-custom-properties')(),
		require('postcss-cssnext')({ browsers: ['last 2 versions', 'ie >= 9', 'iOS 7'] }),
		require('postcss-flexibility')(),
		require('postcss-reporter')(),
		require('postcss-discard-comments')({ removeAll: true }),
		require('postcss-browser-reporter')({ disabled: isProduction })
	]
};
