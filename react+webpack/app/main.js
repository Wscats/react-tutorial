var React = require('react');
var ReactDom = require('react-dom');
//import { Router, Route, Switch } from 'react-router'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

var AppComponent = require('./components/productBox.jsx');
var Wscats = require('./components/wscats.jsx');
/*ReactDom.render(
		<AppComponent /> 
	, document.getElementById('content')
);*/

ReactDom.render((
	<Router>
		{/*rouer只能有一个子标签，所以用div包起来*/}
		<div>
		<ul>
			<li><Link to="/">/</Link></li>
			<li><Link to="/index">index</Link></li>
		</ul>
			<Route exact path="/" component={AppComponent}/>
			<Route path="/index" component={Wscats}/>
		</div>
	</Router>
), document.getElementById('content'))