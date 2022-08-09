const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: { app: './src/app.js' },
  // entry: {
  //   app: './src/app.js',
  //   sub: './src/sub.js'
  // }
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  }
};
