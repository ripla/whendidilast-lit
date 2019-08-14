const merge = require('webpack-merge')
const common = require('./webpack.common')

const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
    mode: "production",

    devtool: 'source-map',

    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            include: ['index.html', 'manifest.webmanifest', /\.js$/],
            exclude: [/\/@webcomponents\/webcomponentsjs\//],
            navigateFallback: 'index.html',
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: /\/@webcomponents\/webcomponentsjs\//,
                    handler: 'StaleWhileRevalidate'
                },
                {
                    urlPattern: /^https:\/\/fonts.gstatic.com\//,
                    handler: 'StaleWhileRevalidate'
                }
            ]
        })
    ]
});
