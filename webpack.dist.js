var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.common');

config.devtool = false;

config.output = {
    path: path.resolve('./dist'),
    filename: 'react-imageTags.min.js',
    libraryTarget: 'umd',
    library: 'ReactTags'
};

config.plugins = [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
          drop_console:true
        },
        minimize: true
    })
];

module.exports = config;