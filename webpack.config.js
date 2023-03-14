const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env || 'production';

module.exports = {
  target: ['web', 'es5'],
  mode: NODE_ENV,
  context: path.join(__dirname, './src'),
  entry: {
    application: ['./index.js'],
  },
  output: {
    path: path.join(__dirname, './dist'),
    clean: true,
    filename: '[name].js'
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    // aggregateTimeout: 100,
    ignored: /node_modules/,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
      cleanOnceBeforeBuildPatterns: ['!settings.cmake'],
    }),
    new HtmlWebpackPlugin({
      title: 'Модуль "Автоматизация"',
      chunks: ['application'],
      template: path.join(__dirname, './public/index.html'),
      minify: false,
      inject: 'head',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.(useable|module)\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { esModule: false } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.module.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, esModule: false } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.useable\.scss$/,
        use: [
          { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
          { loader: 'css-loader', options: { esModule: false } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
      watch: true,
    },
    liveReload: true,
    compress: true,
    port: 5000,
  },
};
