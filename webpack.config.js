var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),
    ]
};
