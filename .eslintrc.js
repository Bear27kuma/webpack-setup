module.exports = {
  /** @see https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments */
  // あらかじめ用意されているグローバル変数を設定しておく設定
  env: {
    // ブラウザ用のグローバルオブジェクト（変数・関数）を一括でglobalsプロパティに登録する
    // ブラウザ上で動かす場合はこちらの設定をtrueにしておく
    browser: true,
    // すべてのECMAScript2021をグローバルに追加し、自動的にecmaVersionパーサーオブションを12（= 2021）に設定する
    es2021: true
  },
  // ESLintのおすすめの初期設定が反映される（他にもairbnbやgoogleの推奨設定がある）
  // TODO:ルールを変更する
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
  /** @see https://eslint.org/docs/latest/rules/ */
  rules: {
    'no-undef': 'off',
    semi: ['error', 'always']
  }
};
