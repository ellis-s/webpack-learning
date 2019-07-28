# webpack-learning
跟着极客学习webpack

## Day 1

1. 安装nvm
2. 安装node&npm
3. 本地新建wepack-learning文件夹
4. 初始化项目并且安装wepack、webpack-cli

>nvm是用来安装和管理node版本的。

初始化项目并且安装wepack、webpack-cli
```
  npm init -y
  npm install webpack webpack-cli --save-dev
```

## Day 2

1. 配置package.json 里面的scripts: ``` "build": "webpack" ```;可以通过 ```npm run build``` 代替 ./node_modules/.bin/webpack 执行打包。
2. entry 可以接收一个对象，通过键值对的形式配置多个打包入口，output没有多个出口的概念。通过[name].js 占位符的形式保证输出的文件名和入口文件的key值保持一致。
3. 常见的Loaders有哪些
  
  名称|描述
  -|-
  babel-loader | 转换ES6、ES7等JS新特性语法
  css-loader | 支持.css 文件的加载和解析
  less-loader | 将less文件转换成.css
  ts-loader | 将TS转换成JS
  file-loader | 进行图片、字体等的打包
  raw-loader | 将文件以字符串的形式导入
  thread-loader | 多进程打包JS和CSS

4. Loaders 是用来解析webpack不识别的其他文件，比如说 .jsx .less .vue 字体文件 等
5. Plugins （插件），用于bundle文件的优化，资源管理和环境变量注入。
6. 任何Loaders不能完成的，都可以用Plugins去完成。
7. 常见的Plugins：

  名称|描述
  -|-
  CommonsChunckPlugin | 将chunks相同的模块代码提取成公共的js
  CleanWebpackPlugin | 清理构建目录
  ExtractTextWebpackPlugin | 将CSS从bundle文件里提取成一个独立的css文件
  CopyWebpackPlugin | 将文件或者文件夹拷贝到构建的输出目录
  HtmlWebpackPlugin | 创建html文件承载输出的bundle
  UglifyjsWebpackPlugin | 压缩JS
  ZipWebpackPlugin | 将打包出的资源生成一个zip包

8. Mode, （webpack 4提出来的一个概念）Mode用来指定当前的构建环境是： production、development还是none。设置mode可以使用webpack内置的函数，默认值为production
9. Mode 的内置函数功能：

  选项|描述
  -|-
  development|设置```process.env.NODE_ENV```的值为```developement``` 开启```NamedChunksPlugin```和```NamedModulesPlugin```
  production| 设置 ```process.env.NODE_ENV```的值为```production``` 开启 ```FlagDependencyUsagePlugin,FlagIncludedChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugin,OccurrenceOrderPlugin,SideEffectsFlagPlugin和TerserPlugin```
  none | 不开启任何优化选项

## Day 3

### 1. webpack 中使用 ES6.

首先要解析ES6

使用 babel-loader，babel的配置文件是： .babelrc

.babelrc
```
{
  "presets": [ // preset 是一些列babel plugins的一个集合
+   "@babel/preset-env" // 这行是 ES6 的 babel preset 配置
  ],
  "plugins": [ // 一个 plugin 对应一个功能。
    "@babel/proposal-class-properties"
  ]
}
```
webpack.config.js
```
  const path = require('path');
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rule: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        }
      ]
    }
  }
```
安装babel相关的loaders：
```
npm i @babel/core @bable/preset-env babel-loader -D
// i => install
// -D => --save-dev
```

### 2. 解析 React JSX

首先在.babelrc文件中新增 ```"@babel/preset-react"```
.babelrc
```
{
  "presets": [
    "@babel/preset-env",
+   "@babel/preset-react"
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}
```
其次，安装react、react-dom和@bable/preset-react
```
npm i react react-dom @bable/preset-react -D
```
然后再在search.js中写入以下代码：
```
'use strict';

import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {

  render() {
    return <div>Search Text</div>;
  }

}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);
```
再新建一个 search.html 文件
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <div id="root"></div>

  <script src="./search.js" type="text/javascript"></script>
</body>
</html>
```
最后执行打包： ```npm run build```, 在浏览器中打开search.html就可以看到```Search Text```内容

### 3. 解析CSS

> - css-loader 用于加载 .css文件，并且转换成 commonjs 对象
> - style-loader 将样式通过```<style>```标签插入到head中

第一步：安装依赖
``` npm i style-loader css-loader -D ```

第二步：新建search.css文件

第三步：在search.js中引入search.css文件
```
import './search.css';
```

第四步：在webpack.config.js 中新增css的解析
```
module: {
  rules: [
    ...
    {
      test: /.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}

// 注意：loader的调用是链式的调用。执行顺序是从右到左的。
// 因此，是先执行css-loader，解析css。然后再把解析好的css传递给style-loader,最后插入到head中。
```

### 解析 LESS & SaSS

> less-loader 用于将 less 转换成 css

第一步：安装依赖 ``` npm i less less-loader -D ```

第二步：修改search.css 后缀名为 .less， 修改search.js中的引入。改成```import './search.less' ```

第三步：在 webpack.config.js 中新增对less文件的loader

```
module: {
  rules: [
    {
      test: /.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    }
  ]
}
```

第四步：执行```npm run build```

## Day4

### 1. 解析图片

> 使用 file-loader 处理文件

1. 安装依赖``` npm i file-loader -D ```
2. 在webpack.config.js文件中新增配置

```
  module: {
    rules: [
      ...
      {
        test: /.(png|jpe?g|gif)$/,
        use: 'file-loader'
      }
    ]
  }
```
3. 在search.js中新增代码：
```
'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import zipcy from './image/zipcy01.jpg';
import './search.less';

class Search extends React.Component {

  render() {
    return <div class="search-text">
              Search Text
+             <img src={zipcy} />
           </div>;
  }

}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);
```

### 解析字体

> file-laoder 也可以解析字体


123123