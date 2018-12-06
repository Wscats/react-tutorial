# 路由

关于路由，我们得先了解，什么是单页面应用程序和多页面应用程序，因为路由是帮助我们实现单页面应用程序的关键
|type|des|
|-|-|
|实现单页面应用程序single page application(SPA)|不刷新整个页面，永远在一个`index.html`，依靠路由切换具体的场景，首次加载大部分大部分东西，后面异步加载具体要更新的内容|
|多页面应用程序|页面跳转，整体刷新，资源文件重新加载|


在[React-Router-DOM官方文档](https://reacttraining.com/react-router/web/guides/quick-start)中你会看到关于 React 路由有以下可以选装的模块

|引用|作用|
|-|-|
|react-router|React Router 核心|
|react-router-dom|用于DOM绑定的React Router|
|react-router-native|用于React Native的React Router|
|react-router-redux|React Router和Redux的集成|
|react-router-config|静态路由配置的小助手|

## react-router和react-router-dom的区别
在React的使用中，我们一般要引入两个包，react 和 react-dom，react-router 和react-router-dom 并不是两个都要引用的
他们两个只要引用一个就行了，不同之处就是后者比前者多出了`<Link>`和`<BrowserRouter>`这样的 DOM 类组件。
因此我们只需引用react-router-dom这个包就行了。当然，如果搭配 redux，你还需要使用 react-router-redux 或者 react-redux

那现在我们选用的是 react-router-dom，所以先安装路由模块 react-router-dom

```bash
npm install react-router-dom
```

## BrowserRouter和HashRouter

**react-router4**的[官方文档](https://reacttraining.com/react-router/web/guides/quick-start)默认使用的是`BrowserRouter，BroswerRouter`是需要服务端配合的，服务端重定向到首页，`BrowserRouter`是基于html5的`pushState`和`replaceState`的，很多浏览器不支持，存在兼容性问题。所以新手推荐使用`HashRouter`

简单总结`BrowserRouter`称为浏览器路由，使用的时候是url上面不带`#`，兼容性比较差，需要后端配合，比较好看，`HashRouter`称之为哈希路由，兼容性比较高


react-router-dom 有三个内置组件
```js
import { HashRouter as Router , Link , Route} from "react-router-dom";
```
`Router`的作用是让包裹的子组件产生路由场景，相当于 Vue 中的`<router-view>`
```js
ReactDOM.render(
    <Router>
        <App />
    </Router>
, document.getElementById('root'));
```
`Link`相当于`<a>`标签，提供跳转路由的功能
```html
<link to = "/xxxx">
```
Route相当于`vue-router`里面的配置参数
```html
<Route path="/" exact component={Index} />
<Route path="/detail/" component={Detail} />
```
上面代码的含义为

url匹配到`#/`切换到`Index`组件

url匹配到`#/detail/`切换到`Detail`组件

## 嵌套路由


路由里面放路由，第一层路由`/home/`，
```html
<Route path="/home/" exact component={Index} />
```
嵌套路由就是在Index组件里面在放一个`<Route>`组件，当进入`/home/hot`路径时，既加载`Index`组件，也加载`Wpannel`组件
```html
<Route path="/home/hot/" exact component={Wpannel} />
```
注意，嵌套路由的`path`是要把第一层路由的路径加上

## 编程式导航

除了使用`<Link>`标签跳转路由，还可以使用路由提供给你的`this.props.history`进行跳转

## 路由传参

|状态|方式|
|-|-|
|Route component|以this.props.match方式|
|Route render|以({ match })=>()方式|
|Route children|以({ match })=>()方式|
|withRouter|以this.props.match方式|
