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
			test: /\.js[x]?$/, //匹配到js或jsx文件后 使用 babel-loader 来处理
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
		port: 12345, //设置默认监听端口，如果省略，默认为"8080"
	}
};