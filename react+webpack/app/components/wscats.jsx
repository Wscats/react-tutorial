var React = require('react');
var routes = require("../routes.js");
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
//新版本的写法 推荐
class Wscats extends React.Component {
	render() {
		return( 
			<div>
				<div>Wscats</div>
				<Link to="/index/childA">childA</Link> <Link to="/index/childB">childB</Link>
				{renderRoutes(routes)}
			</div>
		)
	}
}
module.exports = Wscats;