import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const port = 3000;
const dist = path.resolve(__dirname, 'dist');


export default {
    mode: 'development',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
        path: dist,
        //publicPath: '/',
        filename: '[name].[hash:8].js' //chunkhash ?
    },
    target: 'web',
    devtool: 'inline-source-map',

    plugins: [
        // keep dev server from failing if errors
        new webpack.NoEmitOnErrorsPlugin(),

        // enable hot module replacement for webpack-dev-server
        new webpack.HotModuleReplacementPlugin(),

        // create HTML with references to css and js bundles
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            inject: true
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
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // minify images
                test: /\.(jpe?g|png|gif|ico|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: { name: '[name].[ext]' }
                    }
                ]
            },
            {
                // load fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
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
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        compress: false,
        hot: true,
        https: false,
        noInfo: false,
        port: port
    }
}
