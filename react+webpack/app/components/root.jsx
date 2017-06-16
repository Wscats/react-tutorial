//var React = require('react');
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
//新版本的写法 推荐
//class Wscats extends React.Component {
class Wscats extends Component {
	render() {
		return( 
			<div>
				<h1>Root</h1>
					<Link to="/">home</Link> <Link to="/index">index</Link>
					{/* child routes won't render without this */}
					{renderRoutes(this.props.route.routes)}
					{console.log(this)}
			</div>
		)
	}
}
module.exports = Wscats;