var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = {
  entry: ['babel-polyfill', './src/sass/stApp.sass','./src/js/stApp.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: './assets/js/stApp.js',
    publicPath: '/'
  },
  devServer: {
    publicPath: '/',
    port: 8888
  },
  externals: {
    materialize: 'M'
  },
  module: {
    rules: [
      { test : /\.sass$/,
        use : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use : [
            {
              loader : 'css-loader',
              options : {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader : 'sass-loader',
              options : {
                sourceMap: true,
                importer : globImporter()
              }
            }
          ]
        })
      },
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  performance: { hints: false },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './assets/css/stApp.min.css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'web/app.html',
      inject : false
    })
  ]
};
