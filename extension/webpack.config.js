const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entries = {}
const srcDir = path.join(__dirname, 'src')
fs.readdirSync(srcDir)
    .filter((dir) => fs.statSync(path.join(srcDir, dir)).isDirectory())
    .forEach((dir) => (entries[dir] = './' + path.join('src', dir, dir)))

module.exports = {
    target: 'web',
    entry: entries,
    output: {
        filename: '[name]/[name].js',
        publicPath: '/dist/',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        server: 'https',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'azure-devops-extension-sdk': path.resolve(
                'node_modules/azure-devops-extension-sdk'
            ),
        },
    },
    stats: {
        warnings: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/inline',
            },
            {
                test: /\.html$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [new CopyWebpackPlugin([{ from: '**/*.html', context: 'src' }])],
}
