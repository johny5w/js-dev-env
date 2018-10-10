import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import path from 'path';

const dist = path.resolve(__dirname, 'dist');

export default {
    mode: 'production',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
        path: dist,
        //publicPath: '/',
        filename: '[name].[chunkhash:8].js'
    },
    target: 'web',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },

    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(['dist']),

        // Copy static files
        new CopyWebpackPlugin([
            { from: 'src/*.txt', to: dist, flatten: true},
            { from: 'src/.htaccess', to: dist}
        ]),

        // create HTML index with references to css and js bundles
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),

        // create HTML 404
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src/404.html',
            favicon: 'src/favicon.ico',
            minify: {
                removeComments: false,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: false
        }),

        // extract css to individual files
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        })
    ],

    module: {
        rules: [
            {
                // transpile js/jsx files
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                // compile sass/css
                test: /\.(css|scss|sass)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // minify & load images
                test: /\.(jpe?g|png|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/images/' }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                // load fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/fonts/' }
                    }
                ]
            },
            {
                // load csv files
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
            // load xml files
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
}
