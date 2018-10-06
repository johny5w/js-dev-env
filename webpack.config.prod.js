import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {}
    },
    plugins: [
        // Generate an external css file with a hash in the filename
        // new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash the files using MD5 so that names change when content changes
        // this is useful for cachebusting if far future headers enabled on webserver
        new WebpackMd5Hash(),

        // Create HTML file that includes reference to bundled js
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctypem: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),

        // minify js
        // new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader']
            },
            {
                test: /\.css$/, 
                use: [
                    { loader: 'style-loader/url'},
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
}
