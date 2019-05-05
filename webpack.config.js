const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    globImporter = require('node-sass-glob-importer')

module.exports = (env) => {

    return {
        entry: [
            './src/js/stApp.js',
            './src/sass/stApp.sass'
        ],
        output: {
            path: path.resolve(__dirname, 'web'),
            filename: 'assets/js/stApp.js',
            publicPath: 'http://localhost:9000/'
        },
        devServer: {
            publicPath: 'http://localhost:9000/',
            contentBase: 'web',
            index: 'app.html',
            compress: true,
            port: 9000
        },
        externals: {
            materialize: 'M'
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
                hash: true
            }),
            new ScriptExtHtmlWebpackPlugin({
                async: /\.js$/,
                defaultAttribute: 'async'
            }),
            new webpack.DefinePlugin({ 'process.env.APP_MODE': JSON.stringify(env.APP_MODE) })
        ]
    }
}