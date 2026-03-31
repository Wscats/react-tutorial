import React, { Component } from 'react';
const routes = require("../routes.js");
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

const IndexA = require('./index/indexA.jsx');
const IndexB = require('./index/indexB.jsx');

/** Wscats component: renders child routes with navigation links. */
class Wscats extends Component {
	render() {
		return( 
			<div>
				<div>Wscats</div>
				<Link to="/index/childA">childA</Link> <Link to="/index/childB">childB</Link>
				{renderRoutes(this.props.route.routes)}
			</div>
		)
	}
}
module.exports = Wscats;