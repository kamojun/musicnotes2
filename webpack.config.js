
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: __dirname + '/src/index.tsx',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  output: {
    path: __dirname + '/build',
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.(mp3)$/i, type: 'asset/resource',}
      ]
    }
  }