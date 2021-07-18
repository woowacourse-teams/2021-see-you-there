const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 5000,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { esmodules: true, browsers: ['last 2 versions'] } }],
            '@babel/preset-react',
          ],
          plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('v0.1.0'),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
});

module.exports = (env, argv) => config({ isDev: argv.mode === 'development' });
