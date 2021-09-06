const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const package = require('./package.json');

const config = ({ isDev }) => ({
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    main: './src/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: { esmodules: true } }], '@babel/preset-react'],
          plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(package.version),
      KAKAO: JSON.stringify('1b0ee776c585e8fb3a1ab8da4a771a75'),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      deleteOriginalAssets: false,
      filename: '/static/[name][ext].webp',
      minimizerOptions: {
        plugins: ['imagemin-webp'],
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    open: true,
    hot: true,
    stats: 'errors-only',
  },
});

module.exports = (env, argv) => config({ isDev: argv.mode === 'development' });
