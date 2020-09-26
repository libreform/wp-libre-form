const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

export default ({ NODE_ENV: env }) => ({
  mode: env,
  entry: {
    'wplf-admin': [
      'regenerator-runtime',
      path.join(__dirname, 'assets/scripts/wplf-admin-bundle.ts'),
    ],
    'wplf-frontend': [
      'regenerator-runtime',
      path.join(__dirname, 'assets/scripts/wplf-frontend-bundle.ts'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    library: 'WPLF',
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js'],
    // uncomment if enabling webpack-dev-server
    // alias:
    //   env === "development"
    //     ? {
    //         "react-dom": "@hot-loader/react-dom",
    //       }
    //     : {},
  },
  externals: {
    // Any libraries provided by WordPress should be excluded from the bundle.
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization:
    env === 'production'
      ? {
          minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        }
      : {},
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  // stats: 'errors-warnings',
  devtool: env !== 'production' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

      {
        test: /\.(js)x?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },

      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },

          {
            loader: 'ts-loader',
          },
        ],
      },

      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader' },

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
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // autoprefixer etc
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
})
