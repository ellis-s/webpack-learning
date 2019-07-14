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

