const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, 'src/js/', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }, {

                test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery'),
            'inputmask.dependencyLib': path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
            'inputmask' : path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/inputmask'),
            'jquery.inputmask': path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
            'inputmask.numeric.extensions': path.join(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/pug/', 'index.pug'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/images", to: "./images"},
            ],
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 8080,
    },
};