'use strict';

var webpack = require('webpack');

module.exports = {
    devTool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};