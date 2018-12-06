var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry: './src/app.js',//唯一入口文件
	output: {//输出目录
		path: path.resolve(__dirname, './dist'),//打包后的js文件存放的地方(build 后的文件)
		publicPath: '/dist/',//指定资源文件引用的目录(build 在内存中的位置)
        filename: 'bundle.js'//打包后输出的js的文件名
	},
	module: {
        rules: [{
            test: /\.css$/,
            exclude: '/node_modules/',
            loader: 'style-loader!css-loader?sourceMap' 
        },      {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
            // loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
        }  ,{
			test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
			exclude: '/node_modules/', //屏蔽不需要处理的文件（文件夹）（可选）
			use: ['babel-loader']
		},{ 
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    query: {
                    name:'assets/[name].[ext]'
                }
                }
            },{
                loader: 'image-webpack-loader',
                options: {
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: true,
                        },
                        optipng: {
                            optimizationLevel: 7,
                        }
                    }
                }
            }]
      }]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ProgressBarPlugin(),
        new ExtractTextPlugin('styles.css')
	]	
};