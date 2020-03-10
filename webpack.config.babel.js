const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default ({ NODE_ENV: env }) => ({
  mode: env,
  entry: {
    'wplf-admin': ['regenerator-runtime', path.join(__dirname, 'assets/scripts/wplf-admin-bundle.js')],
    'wplf-frontend': ['regenerator-runtime', path.join(__dirname, 'assets/scripts/wplf-frontend-bundle.js')],
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
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },

      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
});