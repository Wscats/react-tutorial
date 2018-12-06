# webpack

基于 NodeJS 的一个著名第三方模块，主要目的是来实现前端模块化和自动化的，在这之前还有一个跟它类似的 gulp ，也是一个自动化构建工具，主要功能是打包合并压缩重命名等...

webpack 其实也是一套自动化构建工具，在打包代码的时候也是跟 gulp 很相似的

<img src="what-is-webpack.png" />

左边比较多的文件（模块），也比较多的格式（js,css,html,jsx,scss），右边文件比较少，大部分都是转为JS格式，还有一些图片格式，所以 webpack 其实处理各种类型的文件，最终想把他们尽可能的转为JS类型的文件（打包，合并，压缩），webpack 多变少（或一个），多文件进少文件或者单文件出，而 gulp 更多的是多文件变相同多的文件，多进多出

一般开发目录是在`entry`里面,发布是在`output`文件夹

## 安装


1. 在根目录下新建`webpack.config.js`
```js
gulp gulpfile.js
webpack webpack.config.js
```
2. 用npm安装`webpack`的依赖包,全局安装一次，本地也安装一次

```bash
npm install gulp -g //全局
npm install gulp    //本地


npm install webpack -g
npm install webpack-cli -g
npm install webpack
```

3. 往配置文件里面写对应的配置

四大概念
1. 入口(entry)
2. 输出(output)
3. loader
4. 插件(plugins)

## entry

跟我们的`gulp`的`gulp.src()`，入口其实就是要导入需要处理的文件，放文件名

在`webpack.config.js`同级目录下，新建`entry`文件夹
```js
// 配置参数
module.exports = {
    // 入口 把index.js导入进来处理
    entry: './entry/index.js'
};
```

## output

在`webpack.config.js`同级目录下，新建`output`文件夹
```js
const path = require('path');
// 配置参数
module.exports = {
    // 入口 把index.js导入进来处理
    entry: './entry/index.js',
    output: {
        // 写一段路径，寻找output文件夹
        path: path.resolve(__dirname, 'output'),
        // 在output文件夹里面导出文件名为bundle.js
        filename: 'bundle.js'
    }
};
```

在入口文件夹`entry`的`index.js`里面写入以下代码
```js
import $ from "jquery";//记得先安装 npm install jquery
$("body").html("helloworld");
```

4. 编译

在`webpack.config.js`文件夹的命令行里面执行`webpack`命令,如果成功的话会在`output`文件夹下生成一份新的`bundle.js`
```js
webpack
```
`require.js`模块化，分开模块管理项目，并且能重复使用模块

> webpack = gulp + requirejs

既做打包合并也做模块化，相对于`gulp`，它就是更偏重于模块化

`vue-cli`基于`webpack`,它就的模块化就是基于webpack的


## loader

webpack 它默认只能处理JS类型文件，它不自带处理其他非JS文件的功能，如果你想 webpack 处理非 JS 类型文件，必须安装其他第三方插件来实现，webpack 里面这种插件称之为`loaders`(加载器)

> loader = 处理各种非JS类型文件

这个功能类似于 gulp 的拓展功能，需要装第三方插件
```bash
gulp-sass
gulp-minify
gulp-concat
```
比如`.vue`组件是非JS类型文件，我们就需要安装`vue-loader`来处理，类似的还有以下这些
```bash
npm install vue-loader
npm install sass-loader
npm install html-loader
npm install css-loader
npm install json-loader
```
安装完对应的loader之后，还需要在`webpack.config.js`文件里面进行配置

这些loader都是帮你处理不同类型的文件(非JS类型文件)，`test`是正则，匹配文件名字，`use`是加上你对应`loader`的名字

```js
module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
    }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }, {
        test: /\.png|jpg|jpeg$/,
        use: ['url-loader']
    }]
},
```


# React项目结构
```json
--your project
  |--app
    |--components
      |--productBox.jsx
    |--main.js
  |--build
    |--index.html
    |--bundle.js(该文件是webpack打包后生成的)
```

## 用npm安装react、webpack
默认已经安装了[NodeJS](https://nodejs.org/en/)，推荐用`cnpm`
```bash
npm install --save-dev react react-dom --save-dev
npm install -g webpack --save-dev//建议webpack全局安装，方便我们后面使用webpack命令
```
![image](https://cloud.githubusercontent.com/assets/17243165/25302403/d4e0b600-276f-11e7-9c4a-1cae78b0ceaf.png)

## 安装和配置Babel
Babel其实是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到以下目的：

> 下一代的JavaScript标准（ES6，ES7），这些标准目前并未被当前的浏览器完全的支持；
> 使用基于JavaScript进行了拓展的语言，比如React的JSX
> Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，不过webpack把它们整合在一起使用，但是对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-preset-es2015包和解析JSX的babel-preset-react包）。
```
npm install --save-dev babel-core babel-loader  babel-preset-es2015 babel-preset-react
```
在项目根目录下新建`.babelrc`文件，就是只有后缀名的文件，添加如下代码
```json
//.babelrc
{
  "presets": [
    "react",
    "es2015"
  ]
}
```

## 安装其他loader
讲到这里，我们基本上就可以迅速搭建一个简单的web项目，但不得不提的是webpack loader。它是我个人认为相比于其他模块加载更牛X的地方，将它用于react的开发，结合react与生俱来的优越性能，两者天衣无缝的配合简直就是黄金组合。

总的来说 webpack 的 loader可以实现：

> 可以将React JSX语法转为js语句
> React开发中支持ES6语法
> 支持通过import来直接引入css、less、sass甚至是图片
> 支持css中引用的图片大小在某一大小范围之内直接转为BASE64格式等等等

为了能够让以上功能奏效，我们要先安装对应的：
babel-loader
```bash
npm install babel-loader --save-dev
//css-loader
npm install css-loader --save-dev
//less-loader
npm install less-loader --save-dev
//style-loader
npm install style-loader --save-dev
//url-loader
npm install url-loader --save-dev
```
而具体的实现，我们只要在下面webpack的配置文件中加入module属性里的loaders：

## 配置webpack.config.js
webpack.config.js 是 webpack 的配置文件
```js
//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = { //注意这里是exports不是export
	devtool: 'eval-source-map', //生成Source Maps,这里选择eval-source-map
	entry: __dirname + "/app/main.js", //唯一入口文件
	output: { //输出目录
		path: __dirname + "/build", //打包后的js文件存放的地方
		filename: 'bundle.js', //打包后的js文件名
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
			loader: 'babel-loader'
			//npm install babel-loader 
			//npm install babel-core
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=25000'
		}]
	}
};
```
使用 Source Maps，使调试更容易

|devtool选项|配置结果|
|-|-|
|source-map|在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度|
|cheap-module-source-map|在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便|
|eval-source-map|使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项|
|cheap-module-eval-source-map|这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点|

## 组件productBox.jsx
新版本推荐使用ES6书写React组件
```js
var React = require('react');
//旧版本的写法，会有警告
/*var ProductBox = React.createClass({
	render: function() {
		return( 
			<div className = "productBox" >
				Hello World!
			</div>
		);
	}
});*/
//新版本的写法 推荐
class ProductBox extends React.Component {
	render() {
		return( 
			<div>Hello World!</div>
		)
	}
}
module.exports = ProductBox;
```
用旧版本写法会出现以下警告
![image](https://cloud.githubusercontent.com/assets/17243165/25302952/6f052124-277c-11e7-9377-2ebec113e1ce.png)

## 前端页面index.html
index.html是最终要呈现的页面文件，代码如下
```html
<!DOCTYPE html>
<html>
	<head lang="en">
		<meta charset="UTF-8">
		<title>React Test</title>
	</head>
	<body>
                <!--要插入React组件的位置-->
		<div id="content"></div>
		<script src="bundle.js"></script>
	</body
</html>
```

## 入口文件main.js
main.js是入口文件，用来将React组件放在真正的html中
```js
var React = require('react');
var ReactDom = require('react-dom');
var AppComponent = require('./components/productBox.jsx');
ReactDom.render(
	<AppComponent / > 
	, document.getElementById('content')
);
```

## 依赖的描述文件package.json

package.json是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等
```json
{
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "less-loader": "^4.0.3",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "style-loader": "^0.16.1",
    "url-loader": "^0.5.8",
    "webpack": "^2.4.1"
  }
}

```

## 执行打包
在命令行执行`webpack`命令
![这里写图片描述](http://img.blog.csdn.net/20170422171745796?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjcwODAyNDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 安装并启用webpack-dev-server

> 想不想让你的浏览器监测你都代码的修改，并自动刷新修改后的结果，其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖
```
npm install --save-dev webpack-dev-server
```
在webpack.config.js增加devServer的配置
```js
//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = { //注意这里是exports不是export
	devtool: 'eval-source-map', //生成Source Maps,这里选择eval-source-map
	entry: __dirname + "/app/main.js", //唯一入口文件
	output: { //输出目录
		path: __dirname + "/build", //打包后的js文件存放的地方
		filename: 'bundle.js', //打包后的js文件名
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
			loader: 'babel-loader'
				//npm install babel-loader 
				//npm install babel-core
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=25000'
		}]
	},
	devServer: {
		contentBase: './build', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
		historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //设置为true，当源文件改变时会自动刷新页面
		port: 8080, //设置默认监听端口，如果省略，默认为"8080"
	}
};
```
![这里写图片描述](http://img.blog.csdn.net/20170422175523108?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjcwODAyNDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在命令行执行`webpack-dev-server`命令就会运行服务器
```
webpack-dev-server
```
如果需要停止服务，在终端按两次`ctrl+c`


# 思考

- webpack和gulp的区别

- webpack的四大概念入口(entry)输出(output)loader插件(plugins)

- webpack如何实现模块化的

- webpack的打包后执行代码的原理`eval("console.log(1)")`