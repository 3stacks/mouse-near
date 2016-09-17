const webpack = require('webpack');

module.exports = {
    entry: './demo/src-app.js',
    output: {
        path: '',
        filename: './demo/app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: [
                        'transform-runtime'
                    ],
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    }
};