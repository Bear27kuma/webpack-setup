const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';
const assetFile = '[name]';

module.exports = () => merge(commonConf({ outputFile, assetFile }), {
  // バンドルするモード
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      // 対象ファイル
      template: './src/index.html',
      // インジェクトするタグ
      inject: 'body'
    })
  ]
});
