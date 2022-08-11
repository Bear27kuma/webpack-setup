const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // バンドルするモード
  mode: 'development',
  devtool: false,
  // 全てのファイルの基準となるファイル
  entry: { app: './src/app.js' },
  // 複数の指定も可能
  // entry: {
  //   app: './src/app.js',
  //   sub: './src/sub.js'
  // }
  // 出力先フォルダとファイル名
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        // preがついていないloaderより早く実行される
        // enforce: 'pre',
        // 対象となる拡張子
        test: /\.(sass|scss)$/,
        // 使用するloader
        use: [
          // 下から実行されるため、最初に実行したいものを末尾に記述
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new StylelintPlugin({
      fix: true
    })
  ]
};
