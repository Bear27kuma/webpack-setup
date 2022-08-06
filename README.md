# Webpackによる環境構築
## 使用するパッケージマネージャー
- npm
- yarn
どちらもNode.jsで動作するパッケージマネージャーで、コンピュータに何のソフトウェアがインストールされたかを記録し、新しいソフトウェアのインストールや更新、以前インストールしたソフトウェアの削除などが容易に行えるプログラム

## webpackとwebpack-cliのインストール
`npm install webpack webpack-cli --dev`で各パッケージをインストール
`--dev`をつけると開発環境用にインストールする

## webpackの実行
`npx webpck`で実行もしくは、`package.json`のscriptsに`"webpack": "webpack"`を記述した上で`npm run webpack`を実行する
実行モードは`development`と`production`があるが、`development`にするとデバッグがしやすいように圧縮されずにバンドルされる

## webpackの設定ファイル
通常は毎回コマンドを叩くわけにもいかないので、`webpack.config.js`を作成して、そちらにバンドルに関する設定を記述する
