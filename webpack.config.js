const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    home: './src/home.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'none',
  module: {
    rules: [{
      test: /.jsx?$/,
      use: 'babel-loader'
    }]
  }
}