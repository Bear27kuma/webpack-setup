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
こちらに記載した設定を`webpack`コマンドを実行した際に自動的に読み込んでバンドルしてくれるようになる

Node環境なので、CommonJSの`module.exports`を使ってエクスポートする


主なオプション

| オプション名 | 内容 |
| ----- | ----- |
| `entry` | エントリーポイントという全てのファイルの基準となるファイルを指定する<br>Webpackのエントリーポイントは`src/app.js`がデフォルトで指定されている<br>インポートしたモジュールファイルも一緒にバンドルされる<br>複数存在する場合は配列にして設定するとまとめて1ファイルにバンドルしてくれる<br>オブジェクトリテラルで記述すると出力先ファイルを分けることもできる |
| `output` | 出力先のファイルとフォルダを指定する（デフォルトの設定は`dist`ディレクトリと`main.js`）<br>`path`の設定は絶対参照なので、`path`モジュールを`require`して使用する<br>`filename`ではファイル名を変更する（`[name]`は`entry`でオブジェクトリテラルを指定した場合のキーが入ってくる） |

## Sassファイルをバンドルする
必要なパッケージをインストールする

| パッケージ名 | 役割 |
| ----- | ----- |
| sass | Sass本体 |
| sass-loader | SassファイルをCSSに変関するツールを呼び出す |
| css-loader | CSSファイルをJSモジュール用に変換する |
| style-loader | CSSをstyleタグでHTMLに埋め込む |

webpack.config.js
```js
{
  module: {
    rules: [
      {
        // 対象となる拡張子
        test: /\*.scss$/,
        // どのloaderを使用するか
        use: [
          // 下から実行されるため、最初に実行したいものを末尾に記述
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```

バンドルするには.scssファイルを`app.js`に読み込む必要がある

実際にバンドルされた情報がブラウザに配信され、その後style-loaderを通してstyleタグとしてHTMLファイルにインジェクト（注入）される

## PostCSSでより実践的なCSSローダーを作成
PostCSSとはCSSを操作するためのJavaScriptプラグインで、PostCSSの機能を使うとベンダープレフィックスの追加や構文チェック、圧縮などを行ってくれる

`autoprefixer`というプラグインではベンダープレフィックスを自動で付与してくれる

`postcss.config.js`という設定ファイルが必要
```js
module.exports = {
  plugins: [
    // autoprefixerを使用するよう設定
    require('autoprefixer')
  ] 
};
```

対応するブラウザリストの設定ファイル（`.browserlistrc`）を追加

## ファイルローダーで画像を扱う
