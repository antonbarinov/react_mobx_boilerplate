const path = require('path');

const dev = process.env.NODE_ENV !== 'production';


module.exports = {
    mode: dev ? 'development' : 'production',
    entry: [ 'whatwg-fetch', './src/index.jsx' ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: dev ? "source-map" : "none",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".jsx", ".json"],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
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
                    babelrc: false,
                    presets: [
                        ["@babel/preset-env", { "targets": { "browsers": "last 2 versions" } }],
                        "@babel/preset-react"
                    ],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        'react-hot-loader/babel'
                    ],
                },
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.json$/,
                loaders: ['json'],
            },
            {
                test: /\.(scss|sass)$/,
                //exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash]__[name].[ext]',
                        outputPath: './assets/file-loader/',
                        publicPath: ''
                    }
                }]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "mobx": "mobx",
    }
};