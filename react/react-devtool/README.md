# react-devtool

与 Vue 的 vue-devtool 类似 react 也有一个非常有用的调试工具叫 react-devtool，下面展示 Vue 的调试工具怎么安装，React 同理，如果能访问 Chrome 的扩展商店，则更方便，直接在商场搜索安装即可。

1. 在命令行中执行下面命令，用 git 克隆该仓库到本地，并进入 vue-devtool 
```bash
git clone https://github.com/vuejs/vue-devtools.git
cd vue-devtool
```
2. 安装该依赖包，你也可以使用 yarn 安装

```bash
npm install 
```

3. 执行打包，生成插件
```bash
npm run build
```

4. 打开谷歌浏览器的`扩展程序`,打开右上角的`开发者模式`,点击左上角`加载已加压的扩展程序`，打开该`shells/chrome`目录，加载插件