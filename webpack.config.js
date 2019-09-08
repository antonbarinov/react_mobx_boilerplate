const webpack = require('webpack');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
// Plugins -- END

const path = require('path');
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const NODE_ENV = process.env.NODE_ENV;
const dev = NODE_ENV !== 'production';
const hashType = dev ? '[hash]' : '[contenthash]';

let devPlugins = [];
let prodPlugins = [];
if (dev) {
    devPlugins = [
        new webpack.HotModuleReplacementPlugin(),
    ];
}
if (!dev) {
    prodPlugins = [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `[name].${ hashType }.css`,
            chunkFilename: `[id].${ hashType }.css`,
        }),
    ];
}


module.exports = {
    mode: dev ? 'development' : 'production',
    entry: {
        bundle: [ './src/index.jsx' ],
    },
    output: {
        filename: `[name].${ hashType }.js`,
        path: __dirname + '/dist',
        publicPath: '/',
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    devServer: {
        openPage: '../../',
        open: true,
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        liveReload: false,
        publicPath: '/',
        contentBase: path.join(__dirname, 'src'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: dev ? 'source-map' : 'none',

    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
        ],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                },
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loaders: dev ? [ 'source-map-loader' ] : [],
            },

            {
                test: /\.json$/,
                loaders: [ 'json' ],
            },
            {
                test: /\.module\.(c|sa|sc)ss$/,
                use: [
                    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(c|sa|sc)ss$/,
                exclude: /\.module\.(c|sa|sc)ss$/,
                use: [
                    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: [ 'raw-loader' ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `[name]__${hashType}.[ext]`,
                            outputPath: './assets/file-loader/',
                            publicPath: '',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: dev === false,
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: './assets',
            },
            {
                from: './src/move_this_static_files_to_root_dir',
                to: './',
            }
        ]),
        new CaseSensitivePathsPlugin(),
        new DuplicatesPlugin(),
        ...devPlugins,
        ...prodPlugins,
    ],
};
