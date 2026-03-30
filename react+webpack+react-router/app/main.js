const React = require('react');
const ReactDom = require('react-dom');
//import { Router, Route, Switch } from 'react-router'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const AppComponent = require('./components/productBox.jsx');
const Wscats = require('./components/wscats.jsx');
const IndexA = require('./components/index/indexA.jsx');
const IndexB = require('./components/index/indexB.jsx');
/*ReactDom.render(
		<AppComponent /> 
	, document.getElementById('content')
);*/

ReactDom.render((
	<Router>
		{/*Route 组件就是用于配置路由， path 属性用于配置路径， component 就是对应的 React Component*/}
		{/*rouer只能有一个子标签，所以用div包起来*/}
		<div>
		<ul>
			<li><Link to="/">/</Link></li>
			<li><Link to="/index">index</Link></li>
		</ul>
			<Route exact path="/" component={AppComponent} />
			<Route path="/index" component={Wscats}>
			</Route>
		</div>
	</Router>
), document.getElementById('content'))