const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

module.exports = (env) => {

    return {
        entry: ['@babel/polyfill','./src/sass/stApp.sass','./src/js/stApp.js'],
        output: {
            path: path.resolve(__dirname, 'web'),
            filename: 'assets/js/stApp.js',
            publicPath: '/'
        },
        devServer: {
            publicPath: '/',
            port: 8888
        },
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'resolve-url-loader'
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    importer: globImporter()
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|gif|png|jpg)$/,
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
                filename: 'assets/css/stApp.min.css',
                disable: false,
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                filename: 'app.html',
                template: 'templates/app.html',
                title: 'SupertutorTV Courses',
                inject : true,
                hash: true,
                minify: true
            }),
            new webpack.DefinePlugin({ 'process.env.APP_MODE': JSON.stringify(env.APP_MODE) })
        ]
    }
}