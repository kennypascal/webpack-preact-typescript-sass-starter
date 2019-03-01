// variables
const webpack = require('webpack');
const path = require('path');
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const inlineSource = false; // css & js files are inlined or linked files.

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// entry points
const appEntryPoint = `./index.tsx`;
const devServerEntryPoint = [`webpack/hot/only-dev-server`, `react-hot-loader/patch`, appEntryPoint];

// utilities
const getAssetFilename = require('./tools/utilities').getAssetFilename;

module.exports = {
	context: sourcePath,
	entry: {
		app: isProduction ? appEntryPoint : devServerEntryPoint
	},
	target: 'web',
	resolve: {
		alias: {
			assets: path.resolve(__dirname, './src/assets'),
			data: path.resolve(__dirname, './src/data'),
			node_modules: path.resolve(__dirname, './node_modules'),
			scss: path.resolve(__dirname, './src/scss'),

			react: 'preact-compat',
			'react-dom': 'preact-compat'
		},
		extensions: ['.js', '.ts', '.tsx'],
		// Fix webpack's default behavior to not load packages with jsnext:main module
		// (jsnext:main directs not usually distributable es6 format, but es6 sources)
		mainFields: ['module', 'browser', 'main']
	},
	module: {
		rules: [
			// typescript
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: { loader: 'ts-loader' }
			},
			// .ejs
			{ test: /\.ejs$/, loader: 'ejs-loader' },
			// scss
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					!isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader'
					}
				]
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
		// Determines whether to embed source files based on HtmlWebpackPlugin plugin data
		new webpack.DefinePlugin({
			inlineSource: (htmlPlugin, compilation, sourceType) => {
				var extension = sourceType === 'script' ? 'js' : sourceType === 'style' ? 'css' : undefined;
				return htmlWebpackPlugin.options.inlineSource && extension
					? htmlWebpackPlugin.files[extension].map((file) => {
							return '<' + sourceType + '>' + compilation.assets[file.substr(1)].source() + '</' + sourceType + '>';
					  })
					: '';
			}
		}),
		// extract css
		new MiniCssExtractPlugin({ filename: (isProduction ? `assets/css/${getAssetFilename()}` : ``) + `[name].css`, chunkFilename: '[id].css' }),

		// html
		new HtmlWebpackPlugin({
			inject: !inlineSource,
			inlineSource: inlineSource,
			minimize: false,
			chunks: ['app'],
			template: 'index.ejs',
			filename: 'index.html'
		})
	]
};
