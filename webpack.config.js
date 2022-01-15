const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/demo/main.js',

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'inline-source-map',

    devServer: {
        port: '8080',
        hot: true,
        clientLogLevel: 'error'
    },
    resolve: {
        extensions: ['.js', '.vue', '.tsx', '.ts', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            src: path.resolve(__dirname, './src'),
            packages: path.resolve(__dirname, './src/packages'),
            asset: path.resolve(__dirname, './src/asset'),
            style: path.resolve(__dirname, './src/theme-default')
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }
        ]
    },

    plugins: [
        // 请确保引入这个插件来施展魔法
        // new ESLintPlugin({
        //     extensions: ['js', 'vue']
        // }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'gl-ui',
            template: './src/demo/index.html',
            favicon: './src/demo/favicon.ico',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
