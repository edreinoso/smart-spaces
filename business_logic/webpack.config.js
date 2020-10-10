var nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: { handler: './notifications.js' },
    target: 'node',
    mode: 'development',
    externals: [nodeExternals()]
}