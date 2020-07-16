const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const createEnvironment = require('./env/env');

module.exports = wrap(function(_env) {
    const env = Object.assign({}, process.env, _env);
    const environment = (env.NODE_ENV || 'development').toLowerCase();
    const packagePath = (env.PACKAGE_PATH || 'latest');
    const envConfig = createEnvironment(environment);

    const config = {
        node: false,
        mode: environment === 'development' ? 'development' : 'production',
        devtool: environment === 'production' ? 'none' : 'source-map',
        entry: {
            'app': './src/app/index.ts'
        },
        output: {
            filename: `${packagePath}/[name].js`,
            chunkFilename: getAssetFilename('js'),
            path: path.resolve(__dirname, 'dist'),
            publicPath: `${envConfig.urls.cdn}/`,
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts', '.vue'],
            modules: [path.resolve('./src'), 'node_modules']
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    // Split each npm module into its own file, allowing the browser to cache each dependency independently
                    // Combine this with a [contenthash] in the filename and you can enforce a very aggressive caching strategy.
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageParts = module.context.match(/[\\/]node_modules[\\/](.+)/)[1].split(/[\\/]/);
                            const packageName = (packageParts[0][0] !== '@' ? packageParts[0] : `_${packageParts[0].substring(1)}-${packageParts[1]}`);
                            return `npm.${packageName}`;
                        },
                    }
                }
            }
        },
        module: {
            rules: [{
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /[\/\\](node_modules|tests)[\/\\]/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            // This is required to have ts-loader process TypeScript blocks in vue files.
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({ 'ENV': JSON.stringify(envConfig) }),
            new MiniCssExtractPlugin({ filename: getAssetFilename('css') }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: true,
                chunks: ['app'],
                template: './src/app/index.template.html',
                env: envConfig
            })
        ]
    };

    return config;

    function getAssetFilename(path, ext) {
        if (typeof(ext) === 'undefined') {
            ext = path;
            path = '';
        }

        switch (environment) {
            case 'production':
            case 'test':
                return `lib/[name]-[contenthash].${ext}`;
            default:
                return `lib/${path}[name].${ext}`;
        }
    }
});

// Get around webpack failing without an error message.
function wrap(fn) {
    return function() {
        try {
            return fn.apply(this, arguments);
        } 
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}