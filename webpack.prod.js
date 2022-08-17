const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = () => merge(commonConf({ outputFile, assetFile }), {
  // バンドルするモード
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      // 対象ファイル
      template: './src/index.html',
      // インジェクトするタグ
      inject: 'body'  // 分割
    })
  ]
});
