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
通常は毎回コマンドを叩くわけにもいかないので、`webpack.common.js`を作成して、そちらにバンドルに関する設定を記述する
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

webpack.common.js
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

## 画像などのアセットファイルをバンドルする
画像などのファイルに関しては以前は`file-loader`をインストールしてバンドル設定を行わないと、画像を読み込んでいる場合はエラーになったが、Webpack5からは標準でAsset Modulesという機能が追加されて対応するようになったので、インストール不要になった

画像のURLはデフォルトではハッシュ値になるので、buildして吐き出される画像の名前が元の名前とは異なるものになる。

```js
{
  // Webpack5からはfile-loaderはインストール不要になったので、loaderの設定はしない
  test: /\.(jpg?g|gif|png|svg|woff2?|tff|eot)$/,
  generator: {
    // 出力先の指定
    filename: './images/[contenthash].[ext]]'
  },
  // アセットモジュールタイプの指定（個別にファイルを生成して、そのURLを出力する
  type: 'asset/resource'
}
```

## ブラウザキャッシュとハッシュについて
端的に言うとウェブサイトの表示を高速化するためにハッシュをつけている

ウェブサイトを初回ロードした時に、ウェブサーバーから全てのファイル（CSSファイル、JSファイル、画像ファイルなど）がクライアント（ユーザー）の使っているブラウザに配信されるが、2回目以降は変更点のないものに関してはブラウザのローカルメモリやディスクに保存しているものをサーバー上に取得しに行かずに表示している（**キャッシュ**）

このように変更点がないものはローカルにストレージしているファイルを表示することで、表示の高速化を図っている

ページ内容を更新した際に、同じファイル名だとブラウザ側が変更を認識できずにローカルからファイルを持ってきて、変更が反映されない場合があるため、**ハッシュ値**を用いることでファイルに変更があったことをブラウザに示せる

Webpackの場合はファイル名自体をハッシュ値で出力するのが一般的


[Webpack - Output/Template String](https://webpack.js.org/configuration/output/#template-strings)

Outputのテンプレートに使えるハッシュは以下の3つ

| テンプレート | 説明 |
| ----- | ----- |
| `fullhash`（`hash`） | ビルド毎につくビルド番号をハッシュ値としてつける<br>複数ファイルに出力する場合は同じハッシュ値がつく<br>データが更新されるたびに全てのファイルのハッシュ値が更新されてしまう |
| `contenthash` | 生成されたファイル毎につく一意のハッシュ値<br>ファイルに変更があればハッシュ値が変わる<br>画像ファイルなどのアセットファイルによく使われる |
| `chunkhash` | 生成されたファイル毎につくハッシュ値で、chunkという単位で割り振られる |

## Babelを連携してES5に変換する
`babel-loader`をWebpackに追加すると、ES6以降の記述をES5に変換することができる

`babel-loader`、`@babel/core`、`@babel/preset-env`のパッケージをインストールする

## Babelを詳しく設定する
babelの設定は`.babelrc`にJSON形式で記述するか、`babel.config.js`でJS形式で記述する

オプションの`target`部分は[browserlist](https://github.com/browserslist/browserslist)を参照

古いブラウザが持っていない機能を補ってくれる`core-js`モジュールと`regenerator-runtime`をインストールする


## ESLintを連携してJavaScriptの文法をチェックする
ESLintとWebpackを連携させるために、`eslint`、`eslint-loader`、`babel-eslint`をインストールする

別途ESLintの設定ファイル（今回は`.eslintrc.js`）を作成して、そちらにESLintの設定を記述していく

ESLintの設定で以下がないと、ブラウザで使用できる関数など（`console`や`alert`など）が引っかかってエラーになってしまう

```js
env: {
  // ブラウザ用のグローバルオブジェクト（変数・関数）を一括でglobalsプロパティに登録する
  browser: true
}
```

Webpackとの連携はloaderの`use`設定に追加するでOK

```js
{
  test: /\.js$/,
  // 対象外にしたいフォルダ・ファイル
  exclude: /node_modules/,
  use: [
    'babel-loader',
    'eslint-loader'
  ]
}
```

## ESLintの設定を深掘りする
```js
module.exports = {
  // あらかじめ用意されているグローバル変数を設定しておく設定
  env: {
    // ブラウザ用のグローバルオブジェクト（変数・関数）を一括でglobalsプロパティに登録する
    // ブラウザ上で動かす場合はこちらの設定をtrueにしておく
    browser: true,
    // すべてのECMAScript2021をグローバルに追加し、自動的にecmaVersionパーサーオブションを12（= 2021）に設定する
    es2021: true
  },
  // ESLintのおすすめの初期設定が反映される
  extends: 'eslint:recommended',
  // ESLintを処理するプロセッサの指定
  parser: 'babel-eslint',
  parserOptions: {
    // env側での設定と重複するため、設定する必要なし
    // ecmaVersion: latest
    // モジュール単位で管理するのでmoduleに設定
    sourceType: 'module'  // script
  },
  // 意図的にグローバルオブジェクトをESLint側に認識させる
  globals: {
    jQuery: 'readonly',  // writable
    $: 'readonly',
  },
  // 個別にカスタマイズされたチェックを行うための設定（eslint:recommendedの設定を上書きする）
  rules: {
    'no-undef': 'off',
    semi: ['error', 'always']
  }
};
```

設定ファイルの記述が大変な場合は`eslint --init`コマンドで、対話形式で設定していくことができる

## CSSファイルを分離させる
`mini-css-extract-plugin`を使用すると、JSファイルとしてバンドルさせるスタイルファイルが分離して出力される

メリットとしては、CSSファイルに変更がない場合は画面の初期表示のキャッシュによるパフォーマンスが向上するので、商用環境では分離した方が良い

```js
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css'
  })
]
```

## HTMLにスクリプトタグを自動挿入する
バンドルされたファイルにハッシュ値が入っていたりする場合、毎回読み込みのファイル名を更新するのは大変

`html-webpack-plugin`でこちらを実現することができる

```js
plugins: [
  new HtmlWebpackPlugin({
    // 対象ファイル
    template: './src/index.html',
    // インジェクトするタグ
    inject: 'body'
  })
]
```

## HTMLファイルで読み込んだ画像ファイルをJSファイルにバンドルする
HTML側でもimgタグで画像を読み込むので、CSS同様に`html-loader`を使ってバンドルする

```js
{
  test: /\.html$/,
  use: ['html-loader']
}
```


`html-loader`の設定だけでなく、`plugins`に`html-webpack-plugin`の設定を入れておかないと画像ファイルがバンドルされない

## 商用ファイルと開発用ファイルを分離する
商用ファイルと開発用ファイルでWebpackの設定ファイルを分離させる

分割する理由としては、商用はミニファイなどのパフォーマンスの最適化を行う必要があり、開発用は効率重視やデバッグのしやすさで設定するのが良い

共通の設定ファイルを`webpack.common.js`、開発用を`webpack.dev.js`、商用を`webpack.prod.js`として、`webpack-merge`プラグインを使用してWebpackの設定をマージさせる

環境によって実行するコマンドが変わってくるので、`package.json`の`scripts`に登録する

```json
{
  "scripts": {
    "dev": "webpack --config ./webpack.dev.js",
    "build": "webpack --config ./webpack.prod.js"
  }
}
```

出力先フォルダを一度クリアするコマンドも用意しておくことで、毎回ファイルを削除する必要がなくなる（`rimraf`パッケージをインストール）

```json
{
  "scripts": {
    "cleanup": "rimraf ./public",
    "dev": "npm run cleanup && webpack --config ./webpack.dev.js",
    "build": "npm run cleanup && webpack --config ./webpack.prod.js"
  }
}
```

## ファイルのミニファイ（最適化）を行う
バンドルする際に`mode`を`production`にすることで自動的にミニファイ処理を行ってくれる

JavaScriptのミニファイは`TeserPlugin`で自動的に行われるが、HTMLやCSSはミニファイされないので、自ら設定する必要がある

プラグインの設定を行うと`TeserPlugin`の設定が上書きされてしまうため、合わせて設定する

Webpack5からは`css-minimizer-webpack-plugin`が推奨されている

## Webpackの開発サーバーを設定する
Webpackの開発サーバーを使用するために`webpack-dev-server`をインストールする

開発用設定ファイル（`webpack.dev.js`）

```js
devServer: {
  // サーバーを立ち上げたいパス
  contentBase: './public'
}
```

`package.json`に実行用のコマンドを登録する

```json
{
  "server": "webpack-dev-server --config ./webpack.dev.js"
}
```

## 共通モジュールをプロバイダーに登録しよう
複数のファイルで共通しているモジュールは`ProvidePlugin`を用いてまとめることができる

```js
const { ProvidePlugin } = require('webpack');

plugins: [
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery'
  })
]
```

ESLintの`globals`と合わせて使うと良い

## SplitChunksを使ってファイルを適切に分割する
例えば、JavaScriptファイルの中にjQueryの記述が存在すると、そのファイルに何らかの変更が入るとjQueryも一緒にバンドルされてしまうう（jQuery自体に変更はないので毎回バンドルする必要なし）

`optimization.splitChunks`を使用することでファイルの分割が実現できる

```js
optimization: {
  splitChunks: {
    // asyncだとダイナミックインポートのみ分割する
    chunks: 'all',
      minSize: 0,
      cacheGroups: {
      defaultVendor: {
        // ファイル名を指定する
        name: 'vendor',
          // ファイルを分割するディレクトリを指定
          test: /node_modules/,
          // cacheGroupsは複数指定でき、priorityの大きいものから実行される
          priority: -10,
          reuseExistingChunk: true
      },
    default: false
    }
  },
}
```

ダイナミックインポートは非同期で処理されるため、初期画面で使用しないモジュールなどに有効

```js
import('./app.scss');
```

プロジェクト内で共通で使用するモジュールなどを作成し（`utils`ディレクトリ）、そちらを別ファイルとして分割することもできる

```js
utils: {
  name: 'utils',
    test: /src[\\/]utils/,
    reuseExistingChunk: true
}
```

## Resolveを使った効率化
相対パスが複雑になってくると、指定が大変になるので、そちらはResolveを使って効率化する

```js
resolve: {
  // 特定の文字列にパスを紐づける
  alias: {
    '@scss': path.resolve(__dirname, 'src/scss/'),
    '@images': path.resolve(__dirname, 'src/images/')
  },
  // 拡張子を省略する設定
  extensions: ['.js', '.scss'],
  // モジュールの検索対象
  modules: [path.resolve(__dirname, 'src'), 'node_modules']
}
```

