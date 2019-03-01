const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const port = require('./package.json').config.port ? require('./package.json').config.port : 3000;

const sourcePath = path.join(__dirname, './src');
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
	mode: 'development',
	devtool: 'eval',
	output: {
		pathinfo: true,
		publicPath: '/',
		filename: '[path]/bundle-[name].js'
	},
	plugins: [new webpack.NamedModulesPlugin()],
	devServer: {
		contentBase: sourcePath,
		hot: true,
		host: '0.0.0.0',
		port: port,
		overlay: true
	},
	node: {
		// workaround for webpack-dev-server issue
		// https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
		fs: 'empty',
		net: 'empty'
	}
});
