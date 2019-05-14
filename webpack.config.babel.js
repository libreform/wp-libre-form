const path = require('path');

export default ({ NODE_ENV: env }) => ({
  mode: env,
  entry: {
    'wplf-admin': [path.join(__dirname, 'assets/scripts/wplf-admin.js')],
    'wplf-frontend': [path.join(__dirname, 'assets/scripts/wplf-frontend.js')],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    library: 'WPLF'
  },
  externals: {
    // Any libraries provided by WordPress should be excluded from the bundle.
    // 'lodash': {
    //   commonjs: 'lodash',
    //   commonjs2: 'lodash',
    //   amd: 'lodash',
    //   root: '_'
    // }
  },
  optimization: {
    minimize: env === 'production',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
});