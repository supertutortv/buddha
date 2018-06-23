var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = {
  entry: ['./src/index.js','./src/sass/main.sass'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: './assets/js/main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
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
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'web/index.html',
      inject : false
    }),
    new ExtractTextPlugin({ 
      filename: './assets/css/final.min.css'
    })
  ]
};
