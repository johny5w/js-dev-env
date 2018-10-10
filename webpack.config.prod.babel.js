import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    entry: {
        index: './src/index.js',
        vendor: './src/vendor.js'
    },
    target: 'web',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(['dist']),

        // Copy static files to dist
        new CopyWebpackPlugin([
            { from: 'src/.htaccess', to: '' },
            { from: 'src/404.html', to: '' },
            { from: 'src/humans.txt', to: '' },
            { from: 'src/LICENSE.txt', to: '' },
            { from: 'src/robots.txt', to: '' }
        ]),
        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin(GLOBALS),

        // Generate an external css file with a hash in the filename
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),

        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
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
            inject: true,
            // Note that you can add custom options here if you need to handle other custom logic in index.html
            // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
            trackJSToken: ''
        }),

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
                // load fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                // minify images
                test: /\.(jpe?g|png|gif|ico|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: { 
                            name: '[name].[ext]'
                        }
                    }   
                ]
            },            
            {
                // compile sass
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    //'postcss-loader',
                    'sass-loader'                    
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
};