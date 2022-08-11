const path = require('path');

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
        // 対象となる拡張子
        test: /\.scss$/,
        // どのloaderを使用するか
        use: [
          // 下から実行されるため、最初に実行したいものを末尾に記述
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
