var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = {
  entry: ['./src/sass/main.sass','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: './assets/js/main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.sass$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
                importer: globImporter()
              }
          }
        ])
      },
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin({ 
      filename: './assets/css/final.min.css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'web/index.html',
      inject : false
    })
  ]
};
