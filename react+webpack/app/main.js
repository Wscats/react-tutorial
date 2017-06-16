var React = require('react');
var ReactDom = require('react-dom');
//npm install --save react-router-config
import { matchRoutes, renderRoutes } from 'react-router-config'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'


var routes = require("./routes.js");
matchRoutes(routes, '/index');
console.log(routes)
//默认路由
const branch = matchRoutes(routes, '/index')
ReactDom.render((
		<Router>
			{renderRoutes(routes)}
		</Router>
), document.getElementById('content'))