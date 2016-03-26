'use strict';

var webpack = require("webpack");

module.exports = {
    eslint: {
        emitError: true
    },
    devServer: {
        inline: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
