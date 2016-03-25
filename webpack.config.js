'use strict';

module.exports = {
    entry:  './src/test.js',
    output: {
        path:     'build',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: "./build",
    },
    devTool: 'eval',
    eslint: {
        emitError: true
    },
    resolve: {
        modulesDirectories: ["node_modules", "bower_components"]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ],
    module: {
        loaders: [{
            test: /\.js/,
            loaders:  ['babel-loader', 'eslint-loader'],
            include: './src',
            exclude: /node_modules/,
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
