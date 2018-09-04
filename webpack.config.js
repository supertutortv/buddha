const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

const appConfig = {
    entry: ['babel-polyfill','./src/js/stApp.js'],
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
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            importer: globImporter()
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader'
              }
        ]
    },
    performance: {
        hints: false
    },
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
}

module.exports = [appConfig]