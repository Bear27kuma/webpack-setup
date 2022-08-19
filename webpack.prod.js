const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConf = require('./webpack.common');
const { minimizerPlugin } = require('html-loader/dist/plugins');
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
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
});
