'use strict';

module.exports = {
    entry:  './src/test.js',
    output: {
        path:     'build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test:    /\.js/,
            loaders:  ['babel', 'eslint'],
            include: './src',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.less$/,
            loader: "style!css!less"
        },
        {
            test: /\.(png|jpg|svg)/,
            loaders: ['url', 'image-webpack']
        },{
            test:   /\.html/,
            loader: 'html'
        }]
    }
};
