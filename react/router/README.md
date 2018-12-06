# 路由
通过 URL 映射到对应的功能实现，React 的路由使用要先引入 react-router.js。  
注意：  
react-router 4.0 以上的版本和 3.0 及以下的版本有很大的差别，本教程使用的是 3.0.2 的版本，后续会更新 4.0 以上版本的教程。  
在使用 npm 安装时默认是安装最新版本，如果安装的版本是最新的，而使用上用的是 3.0 版本的用法，则会报错。  
所以在 npm 安装时要指定版本 `npm install react-router@3.0.2 --save-dev`。

# 路由背景-SPA
传统的前端基本都是通过页面之间跳转来实现各功能模块的切换，这种做法会导致一个项目下来存在大量的 html 页面，而且每个页面都有一大堆的静态资源文件需要引入，在性能一直被垢病。后来有了随着 ajax 的普及，还有 jQuery 对 ajax 的封装后的便捷使用，开发者会大量的使用 ajax 来加载一个 html 页面到当前页面的某个容器当中来实现无刷新加载，但依然没有解决大量存在 html 页面和每个页面加载大量的静态资源文件而导致性能上的问题。随着移动互联网的普及，移动端对页面加载的性能要求和流量的限制越来越高，所以主流的前端框架都往 SPA 方向靠齐。
SPA，Single Page Application 的缩写，单页面应用，其目的是整个应用程序只有一个 html 页面，结合构建 webpack 的统一打包思想，把所有静态资源文件打包成一个 js 文件，在唯一的一个 html　页面引用，从而真正意义上实现一个 html 文件，一个 js 文件完成一个应用的构想。
SPA 优化了静态加载的性能，但一个应用程序还是有很多的功能模块，功能模块之间的切换，就变成了组件之间的切换，所以到目前为止基本上主流的前端框架都会有路由和组件两个概念，而且实现思想都是一致的。

# 路由引用与使用
```javascript
//es5
var {Router, Route, hashHistory, Link, IndexRoute, browserHistory} = require("react-router");

//es6
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router';

//es5 和 es6 的使用都是一样的
<Link to="/">Root</Link>
<Router>
    <Route path='/' component={RootComponent}/>
</Router>

//使用 `<script>` 标签 
<script src="../js/ReactRouter.js"></script>
<ReactRouter.Link to="/">Root</ReactRouter.Link>
<ReactRouter.Router>
    <ReactRouter.Route path='/' component={RootComponent}/>
</ReactRouter.Router>
```

# 路由组件与属性
## Link
* 用于路由之间跳转，功能等同于 `a` 标签。
* 属性 `to` 等同于 `a` 标签的 `href`。
* `<Link to="/page">page</Link>`，作用等同于 `<a href="#/page">page</a>`。

## Router
* 是最外层的路由组件，整个 Application 仅一个。
* 属性 `history` 有两个属性值：
    * `hashHistory` 路由将通过URL的hash部分（#）切换，推荐使用。
    * `<Router history={hashHistory}>` 对应的 URL 形式类似 example.com/#/some/path
    * `browserHistory` 这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
    * `<Router history={browserHistory}>` 对应的 URL 形式类似 example.com/some/path。

## Route 组件的属性
* `Route` 是组件 `Router` 子组件，可以通过嵌套 `route` 来实现路由嵌套。
* 属性 `path`：指定路由的匹配规则，这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。
* 属性 `component`：指当 URL 映射到路由的匹配规则时会渲染对应的组件。
* `<Route path="/" component={RootComponent}/>` 当 URL 为 example.com/#/ 时会渲染组件 RootComponent
* `<Route path="/page1" component={Page1Component}/>` 当 URL 为 example.com/#/page1 时会渲染组件 Page1Component

# 基本用法
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, browserHistory} from 'react-router'

const html = (
    <ul>
        <li><Link to="/">Root</Link></li>
        <li><Link to="/page">page</Link></li>
    </ul>
)

class RootComponent extends React.Component{
    render(){
        return (
            <div>
                <h1>RootComponent</h1>
                {html}
            </div>
        )       
    }
}

class PageComponent extends React.Component{
    render(){
        return (
            <div>
                <h1>PageComponent</h1>
                {html}
            </div>
        )       
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={RootComponent}/>
        <Route path='/page' component={PageComponent}/>
    </Router>,
    document.getElementById('app')
)
```

### 效果预览

- [路由DEMO](https://wscats.github.io/react-tutorial/react/router/index.html)

# 路由参数
* 路由的参数传递是通过 Route 组件的 path 属性来指定的。
* 参数值可通过 `this.props.params.paramName` 来获取。
* `:paramName`
    * 匹配URL的一个部分，直到遇到下一个/、?、#为止。
    * `<Route path="/user/:name">` 。
    * 匹配 URL：/#/user/sam，参数 sam 为必须存在。
    * `this.props.params.name` 的值为 sam。
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, browserHistory} from 'react-router'

class UserComponent extends React.Component{
    render(){
        return (
            <div>
                <h3>UserComponent 单个参数 </h3>
                <p>路由规则：path='/user/:username'</p>
                <p>URL 映射：{this.props.location.pathname}</p>
                <p>username：{this.props.params.username}</p>
            </div>
        )       
    }
}
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/user/:username' component={UserComponent}/>
    </Router>,
    document.getElementById('app')
)
``` 
* `(:paramName)`
    * 表示URL的这个部分是可选的。
    * `<Route path="/order(/:orderid)">` 。
    * 匹配 URL：/#/order，`this.props.params.orderid` 获取的值为 undefined。
    * 匹配 URL：/#/order/001，`this.props.params.orderid`获取参数的值为 001。
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory, browserHistory} from 'react-router'

class UserComponent extends React.Component{
    render(){
        return (
            <div>
                <h3>OrderComponent 可选参数 </h3>
                <p>路由规则：path='/order(/:orderid)'</p>
                <p>URL 映射：{this.props.location.pathname}</p>
                <p>orderid：{this.props.params.orderid}</p>
            </div>
        )       
    }
}
ReactDOM.render(
    <Router history={hashHistory}>
        <ReactRouter.Route path='/order(/:orderid)' component={UserComponent}/>
    </Router>,
    document.getElementById('app')
)
``` 
* `*.*`
    * 匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
    * `<Route path="/all1/*.*">` 。
    * `this.props.params` 获取的参数为一个固定的对象： `{splat: [*, *]}`。
    * 匹配 URL：/all1/001.jpg，参数为 `{splat: ['001', 'jpg']}`。
    * 匹配 URL：/all1/001.html，参数为 `{splat: ['001', 'html']}`。 
* `*`
    * 匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
    * `<Route path="/all2/*">`。
    * `this.props.params` 获取的参数为一个固定的对象： `{splat: '*'}`。
    * 匹配 URL：/all2/，参数为 `{splat: ''}`。
    * 匹配 URL：/all2/a，参数为 `{splat: 'a'}`。
    * 匹配 URL：/all2/a/b，参数为 `{splat: 'a/b'}`。
* `**`
    * 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。
    * `<Route path="/**/*.jpg">`
    * `this.props.params` 获取的参数为一个固定的对象： `{splat: [**, *]}`。
    * 匹配 URL：/all3/a/001.jpg，参数为 `{splat: ['a', '001']}`。
    * 匹配 URL：/all3/a/b/001.jpg，参数为 `{splat: ['a/b', '001']}`。

### 效果预览

- [路由传参](https://wscats.github.io/react-tutorial/react/router/params.html)

# IndexRoute
当访问一个嵌套路由时，指定默认显示的组件
#### AppComponent.js
```javascript
import React from 'react'

export default class AppComponent extends React.Component{
    render(){
        return <div>{this.props.children}</div>
    }
}
```

#### LoginComponent.js
```javascript
import React, {Component} from 'react'

export default class LoginComponent extends Component{
    login(){}
    render(){
        return <h1>Login</h1>
    }
}
```

#### HomeComponent.js
```javascript
import React, {Component} from 'react'

export default class HomeComponent extends Component{
    login(){}
    render(){
        return <h1>Home</h1>
    }
}
```

#### Router.js
```javascript
import React from 'react'
import {Route, IndexRoute} from 'react-router'

import AppComponent from '../components/app/app'
import HomeComponent from '../components/home/home'
import LoginComponent from '../components/login/login'

const routes = (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={HomeComponent} />
        <Route path="login" component={LoginComponent} />
        <Route path="home" component={HomeComponent} />
    </Route>
)

export default routes;
```

- 如果没有加`IndexRoute`，则在访问 `http://localhost/#/` 时页面是空白的
- 访问 `http://localhost/#/login` 才会显示内容
- 加上 `IndexRoute`，在访问`http://localhost/#/`时会默认渲染`HomeComponent`

# 模块化
可利用组件`Router`的属性`routes`来实现组件模块化
#### router.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import {Route, Router, IndexRoute, hashHistory} from 'react-router'

import AppComponent from '../components/app/app'
import HomeComponent from '../components/home/home'
import LoginComponent from '../components/login/login'

const routes = (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={HomeComponent} />
        <Route path="login" component={LoginComponent} />
        <Route path="home" component={HomeComponent} />
    </Route>
)

ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('app')
)
```
# 编程式导航
- 普通跳转 `this.props.router.push('/home/cnode')`
- 带参数跳转`this.props.router.push({pathname: '/home/cnode', query: {name: 'tom'}})`

# 路由钩子函数
每个路由都有`enter`和`leave`两个钩子函数，分别代表用户进入时和离开时触发。
### onEnter
进入路由`/home`前会先触发`onEnter`方法，如果已登录，则直接`next()`正常进入目标路由，否则就先修改目标路径`replace({ pathname: 'login' })`，再`next()`跳转。
```javascript
let isLogin = (nextState, replace, next) => {
    if(window.localStorage.getItem('auth') == 'admin'){
        next()
    } else {
        replace({ pathname: 'login' })
        next();
    }
    
}
const routes = (
    <Route path="/" component={AppComponent}>
        <Route path="login" component={LoginComponent} />
        <Route path="home" component={HomeComponent} onEnter={isLogin}/>
    </Route>
)
```
### onLeave
对应的`setRouteLeaveHook`方法，如果`return true`则正常离开，否则则还是停留在原路由
```javascript
import React from 'react'
import {Link} from 'react-router'

export default class Component1 extends React.Component{
    componentDidMount(){
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    }
    routerWillLeave(){
        return '确认要离开？'
    }
    render(){
        return (
            <div>
                <Link to="/login">Login</Ling>
            </div>
        )
    }
}
```