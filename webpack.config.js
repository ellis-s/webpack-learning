const path = require('path');

// 单个入口文件
const singleEntryConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'production'
};

// 多个入口文件
const multipleEntryConfig = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle-[name].js'
  },
  mode: 'production'
}


module.exports = multipleEntryConfig;