module.exports = {
  env: {
    // ブラウザ用のグローバル変数（変数）を一括でglobalsプロパティに登録する
    browser: true,
    // すべてのECMAScript2021をグローバルに追加し、サポートする
    es2021: true
  },
  // ESLintのおすすめの初期設定が反映される
  extends: 'eslint:recommended',
  // ESLintを処理するプロセッサの指定
  parser: 'babel-eslint'
};
