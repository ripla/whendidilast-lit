const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        historyApiFallback: true,
        open: false,
        overlay: true,
        hot: true,
    },

    devtool: 'inline-source-map',
});
