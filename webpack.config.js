const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                useBuiltIns: "usage",
                corejs: 3
              }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
		new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: "./src/images/blogging.png"
		}),
		new CopyPlugin([
      { from: './src/views/', to: 'views/' },
      { from: './src/app/', to: 'app/' },
      { from: './src/images/', to: 'images/' },
		]),
	]
};