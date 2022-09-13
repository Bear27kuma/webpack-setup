const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';
const assetFile = '[name]';

module.exports = () => merge(commonConf({ outputFile, assetFile }), {
  // バンドルするモード
  mode: 'development',
  devtool: 'source-map',
  /** @see https://webpack.js.org/configuration/dev-server/ */
  devServer: {
    open: true,
    // サーバーを立ち上げたいディレクトリ
    static: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8000,
    hot: true,
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 対象ファイル
      template: './src/index.html',
      // インジェクトするタグ
      inject: 'body',
      // インジェクトしたいchunks名を指定
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: './src/other.html',
      // index.html以外ならfilenameの指定が必要
      filename: 'other.html',
      inject: 'body',
      chunks: ['sub']
    })
  ]
});
