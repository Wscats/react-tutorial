const React = require('react');
const ReactDom = require('react-dom');
import { matchRoutes, renderRoutes } from 'react-router-config'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const routes = require("./routes.js");
matchRoutes(routes, '/index');
// Default route
const branch = matchRoutes(routes, '/index')
ReactDom.render((
		<Router>
			{renderRoutes(routes)}
		</Router>
), document.getElementById('content'))