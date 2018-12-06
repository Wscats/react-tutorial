# 脚手架

以系统管理员的身份，安装该脚手架全局命令
```bash
npm install create-react-app -g
```

你就会在全局命令行里面拥有一个`create-react-app`命令，可以用以下命令检查是否安装成功
```bash
create-react-app -V
```

创建第一个项目，如果安装不成功可以考虑换这两个尝试一次`yarn`和`cnpm`
```bash
create-react-app [项目名字]
create-react-app my-app //例如这样
```

启动项目
```bash
cd my-app
npm start //或者 npm run start
```

在浏览器里面，查看该地址
```bash
http://localhost:3000/
```

```bash
public 单页面应用的主页（ico，index.html）
src 开发文件夹(组件，自定义模块，样式，模板)
```

React 和 Vue 的脚手架都是基于 webpack 的

其他具体内容也可以参考[creact react app的官方文档](https://github.com/facebook/create-react-app)