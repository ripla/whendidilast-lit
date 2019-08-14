const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src',

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            'images/**',
            'node_modules/@webcomponents/webcomponentsjs/**',
            'manifest.webmanifest'
        ]),

        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            template: 'index.html'
        }),
    ]
};
