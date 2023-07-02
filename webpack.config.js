const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
	// Set the mode based on the command used to run webpack
	mode: argv.mode === 'production' ? 'production' : 'development',

	// Set the devtool based on the command used to run webpack
	// This is necessary because Figma's 'eval' works differently than normal eval
	devtool: argv.mode === 'production' ? false : 'inline-source-map',

	// Set the entry point for the plugin code
	entry: {
		code: './src/code.ts',
	},

	// Define the rules for how webpack should handle different file types
	module: {
		rules: [
			// Convert TypeScript code to JavaScript
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			// Load HTML files and handle their sources
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: {
						list: [
							{
								tag: 'style',
								attribute: 'data-src',
								type: 'src',
							},
						],
					},
				},
			},
			// Load CSS files and inject them into the head of the HTML file
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	// Define the output file name and path
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},

	// Define the plugins to use
	plugins: [
		// Generate an HTML file with the plugin UI
		new HtmlWebpackPlugin({
			template: 'src/ui.html',
			filename: 'ui.html',
			inject: false,
		}),
	],

	// Define the file extensions to try when importing files
	resolve: {
		extensions: ['.ts', '.js'],
	},
});
