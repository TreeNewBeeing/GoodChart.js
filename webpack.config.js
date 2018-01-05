var path = require('path');
var webpack = require('webpack');
module.exports = {
		entry: ['./src/core/index.js'],
		output: {
				filename: 'out.js',
				path: path.resolve(__dirname,'public'),
				library: "chart"
		},
		module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: {
								loader:'babel-loader',
								options: {
										presets: ['env','stage-0','react'],
										plugins: []
								}
						}
					},
					{
						test: /\.css$/,
						use: ['style-loader','css-loader']
					}
				],
		}
};
