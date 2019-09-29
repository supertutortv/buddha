const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const globImporter = require('node-sass-glob-importer')

module.exports = (env) => {

    return {
        entry: ['./src/sass/stApp.sass','./src/js/index.js'],
        output: {
            path: path.resolve(__dirname, 'web'),
            filename: 'assets/js/[hash].js',
            chunkFilename: 'assets/js/[hash].js',
            publicPath: '/'
        },
        /* resolve: {
            alias: {
                "react": "preact-compat",
                "react-dom": "preact-compat",
            }
        }, */
        /* optimization: {
            splitChunks: {
              chunks: 'async'
            }
        }, */
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {}
                        },
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
                                sourceMap: false,
                                minimize: true,
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
            new MiniCssExtractPlugin({
                filename: 'assets/css/[hash].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'app.html',
                template: 'templates/app.html',
                title: 'SupertutorTV Courses',
                inject : true,
                minify: true
            }),
            new webpack.DefinePlugin({ 'process.env.APP_MODE': JSON.stringify(env.APP_MODE) })
        ]
    }
}