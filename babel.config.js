module.exports = api => {
  // キャッシュを有効にする
  api.cache(true);

  return {
    'presets': [
      ['@babel/preset-env', {
        // 対象となるブラウザを絞り込む → .browserlistrc
        // targets: {
        //   ie: '11',
        //   chrome: '60'
        // }
        // 必要な機能だけをJSファイルから静的に解析して追加してくれる
        useBuiltIns: 'usage',
        // core-jsのバージョン指定
        corejs: 3
      }]
    ]
  }
};
