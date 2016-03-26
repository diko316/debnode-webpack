'use strict';

var webpack = require("webpack"),
    ResolverPlugin = webpack.ResolverPlugin,
    ProvidePlugin = webpack.ProvidePlugin,
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = require('./webpack/config.js')({
    entry: {
        app: './src/app.js',
        vendor: ["jquery"]
    },
    
    output: {
        path:     './public/assets',
        publicPath: '/assets/',
        filename: '[name].js'
    },
    
    devServer: {
        contentBase: "./public"
    },
    
    devTool: 'eval',
    
    resolve: {
        modulesDirectories: ["node_modules", "bower_components"]
    },
    
    plugins: [
        
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        
        new ResolverPlugin([
                new ResolverPlugin.DirectoryDescriptionFilePlugin(
                        ".bower.json",
                        ["main"]
                    )
            ],
            ["normal", "loader"]),
        
        new ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        }),
        
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html'
        }),
        
        new ExtractTextPlugin('[name].css')

    ],
    
    module: {
        loaders: [{
            test: /\.js/,
            loaders:  ['babel-loader', 'eslint-loader'],
            include: './src',
            exclude: /node_modules|bower_components/,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /styles\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
        },
        {
            test: /\.css/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        },
        {
            test: /\.eot|\.ttf|\.svg|\.woff2?/,
            loader: 'file?name=[name].[ext]'
        },
        {
            test: /\.(png|jpg|svg)/,
            loaders: ['url', 'image-webpack']
        },{
            test:   /\.html/,
            loader: 'html'
        }]
    }
    
});
